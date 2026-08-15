"""Compile token search + display payloads into compact binary artifacts."""

from __future__ import annotations

import struct
from typing import Any

SEARCH_MAGIC = b"VUMAPIDX\0"
DISP_MAGIC = b"VUMAPDIS\0"
SEARCH_VERSION = 1
DISP_VERSION = 1

SEG_KIND_GLYPH = 1
SEG_KIND_ESCAPE = 2


def entry_query_key(entry: dict[str, Any] | None) -> str:
    """Lowercase search key matching the in-browser entryQuery helper."""
    if not entry:
        return ""
    if entry.get("q"):
        return str(entry["q"])
    if entry.get("seg"):
        plain = "".join(text for _, text in entry["seg"])
    else:
        plain = str(entry.get("render") or "")
    note = entry.get("note") or ""
    combined = plain + (f"\n{note}" if note else "")
    return combined.lower()


def _pack_utf8(text: str) -> bytes:
    data = text.encode("utf-8")
    if len(data) > 0xFFFF:
        raise ValueError(f"string too long ({len(data)} bytes)")
    return struct.pack("<H", len(data)) + data


def build_search_idx(token_display: list[dict[str, Any]]) -> bytes:
    rows: list[tuple[str, int]] = []
    for tid, entry in enumerate(token_display):
        q = entry_query_key(entry)
        if q:
            rows.append((q, tid))
    rows.sort(key=lambda item: item[0])

    pool = bytearray()
    pool_offsets: list[int] = []
    for q, _tid in rows:
        pool_offsets.append(len(pool))
        pool.extend(_pack_utf8(q))

    index = bytearray()
    for (q, tid), pool_off in zip(rows, pool_offsets, strict=True):
        index.extend(struct.pack("<II", pool_off, tid))

    header = struct.pack(
        "<8sIII",
        SEARCH_MAGIC,
        SEARCH_VERSION,
        len(rows),
        len(pool),
    )
    return bytes(header) + bytes(pool) + bytes(index)


def _encode_display_entry(entry: dict[str, Any] | None) -> bytes:
    if not entry:
        return struct.pack("<B", 0)

    out = bytearray()
    out.extend(struct.pack("<B", int(entry.get("format") or 4)))

    note = str(entry.get("note") or "")
    out.extend(_pack_utf8(note))

    segs = entry.get("seg") or []
    if not segs and entry.get("render"):
        segs = [["g", str(entry["render"])]]
    if len(segs) > 255:
        raise ValueError(f"too many segments: {len(segs)}")
    out.extend(struct.pack("<B", len(segs)))

    for seg in segs:
        kind_raw, text = seg[0], str(seg[1])
        kind = SEG_KIND_ESCAPE if kind_raw == "e" else SEG_KIND_GLYPH
        out.extend(struct.pack("<B", kind))
        out.extend(_pack_utf8(text))

    return bytes(out)


def build_displays_bin(token_display: list[dict[str, Any]]) -> bytes:
    records = bytearray()
    offsets: list[int] = []
    for entry in token_display:
        offsets.append(len(records))
        records.extend(_encode_display_entry(entry))

    table = bytearray()
    for off in offsets:
        table.extend(struct.pack("<I", off))

    header = struct.pack(
        "<8sII",
        DISP_MAGIC,
        DISP_VERSION,
        len(token_display),
    )
    return bytes(header) + bytes(table) + bytes(records)
