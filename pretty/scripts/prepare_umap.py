#!/usr/bin/env python3
"""Prepare cotten.io UMAP viz: watermark tokens, split assets, thin HTML shell.

Reads the standalone HTML artifact (multi-MB embedded JSON + binary), patches the
dataset in Python, and writes:

  public/research/tokens/llama-8b-token-3d-viewer/app/index.html   — thin app shell (iframe target)
  public/research/tokens/llama-8b-token-3d-viewer/manifest.json
  public/research/tokens/llama-8b-token-3d-viewer/search.idx
  public/research/tokens/llama-8b-token-3d-viewer/displays.bin
  public/research/tokens/llama-8b-token-3d-viewer/data.bin

Do not edit generated artifacts by hand — always re-run this script.
"""

from __future__ import annotations

import argparse
import base64
import json
import re
import struct
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from umap_compiled_assets import build_displays_bin, build_search_idx

MAGIC = b"VUMAP3D\0"

EASTER_EGGS = (
    "Tim Cotten",
    "from Scrypted",
    "built this 3D",
    "UMAP visualizer of",
    "Llama-3-8B's Tokens",
)

TOWN_CENTER = (0.94, -0.68, 0.91)
TOWN_SPREAD = 0.008
MERGE_CAT_ID = 6

EMBEDDED_RE = re.compile(
    r'\n?\s*<script id="vumap3d-embedded" type="application/json">.*?</script>\n?',
    re.DOTALL,
)

TOKEN_SEARCH_INDEX_RE = re.compile(
    r"    /\*\* Prefix index.*?\n    class TokenSearchIndex \{.*?\n    \}\n",
    re.DOTALL,
)

LOAD_DATASET_RE = re.compile(
    r"    async function loadDataset\(\) \{.*?\n    \}\n",
    re.DOTALL,
)

LOAD_DATASET_REPLACEMENT = """    async function loadDataset() {
      const embedded = loadEmbedded();
      if (embedded) return embedded;

      const assetRoot = new URL("../", window.location.href);
      const manifestFile = new URL("manifest.json", assetRoot).href;
      const mResp = await fetch(manifestFile);
      if (!mResp.ok) throw new Error(`Failed to fetch ${manifestFile}`);
      const manifest = await mResp.json();
      const { positions, labels } = await loadBinary(
        new URL(manifest.data_file, assetRoot).href,
        manifest.n_points,
      );

      const searchFile = manifest.search_file || "search.idx";
      const displaysFile = manifest.displays_file || "displays.bin";
      const [searchResp, displaysResp] = await Promise.all([
        fetch(new URL(searchFile, assetRoot).href),
        fetch(new URL(displaysFile, assetRoot).href),
      ]);
      if (!searchResp.ok) throw new Error(`Failed to fetch ${searchFile}: ${searchResp.status}`);
      if (!displaysResp.ok) throw new Error(`Failed to fetch ${displaysFile}: ${displaysResp.status}`);

      const searchCompiled = parseSearchIdx(await searchResp.arrayBuffer());
      const tokenDisplay = parseDisplaysBin(await displaysResp.arrayBuffer());
      return { manifest, positions, labels, tokenDisplay, searchCompiled };
    }
"""

MAIN_LET_OLD = "      let manifest, positions, labels, tokenDisplay;\n"
MAIN_LET_NEW = "      let manifest, positions, labels, tokenDisplay, searchCompiled;\n"

MAIN_DESTRUCTURE_OLD = (
    "        ({ manifest, positions, labels, tokenDisplay = [] } = await loadDataset());"
)
MAIN_DESTRUCTURE_NEW = (
    "        ({ manifest, positions, labels, tokenDisplay = [], searchCompiled } = await loadDataset());"
)

ANIMATE_START_OLD = "      animate();\n"
EMBED_HERO_VIEW_JS = """
      if (embedMode) {
        const EMBED_HERO_TOKEN = 22107;
        const EMBED_VIEW_DISTANCE = 0.102;

        const pivot = tokenPosition(EMBED_HERO_TOKEN);
        setLockedPivot(pivot);
        controls.target.copy(pivot);
        controls.cursor.copy(pivot);
        _camOffset.copy(DEFAULT_CAMERA).sub(DEFAULT_TARGET);
        if (_camOffset.lengthSq() < 1e-12) _camOffset.set(0, 0.35, 1);
        else _camOffset.normalize();
        const distance = EMBED_VIEW_DISTANCE;
        camera.position.copy(pivot).addScaledVector(_camOffset, distance);
        camera.lookAt(pivot);
        syncControlsFrame();
        embedDistanceLock = distance;
        clearControlInertia();
        flushControls();
        controls._lastTargetPosition.copy(pivot);
        controls._lastPosition.copy(camera.position);
        controls._lastQuaternion.copy(camera.quaternion);
        autoOrbit = true;
        syncAutoOrbit();
        updateStatus();
        const embedQuery = entryPlainPreview(tokenDisplay[EMBED_HERO_TOKEN], 200).trim();
        if (embedQuery) {
          searchInput.value = embedQuery;
          runSearch();
        }
      }
"""
ANIMATE_START_NEW = (
    EMBED_HERO_VIEW_JS
    + """      animate();
      if (window.parent !== window) {
        requestAnimationFrame(() => {
          window.parent.postMessage({ type: "vumap-ready" }, window.location.origin);
          if (embedMode) {
            canvas.setAttribute("tabindex", "0");
            try { window.focus(); } catch (_) {}
            canvas.focus({ preventScroll: true });
          }
        });
      }
"""
)

SEARCH_INDEX_OLD = "      const searchIndex = new TokenSearchIndex(tokenDisplay);"
SEARCH_INDEX_NEW = "      const searchIndex = new CompiledSearchIndex(searchCompiled);"

CSS_PATCH = """
    #canvas { touch-action: none; }
    #attribution {
      position: fixed; right: 12px; bottom: 12px; z-index: 25;
      font: 11px/1.3 system-ui, sans-serif; opacity: 0.55; pointer-events: auto;
    }
    #attribution a { color: #e8eaed; text-decoration: none; }
    #attribution a:hover { opacity: 1; text-decoration: underline; }
    body.embed-mode #attribution { opacity: 0.72; font-size: 10px; }
    body.embed-mode #hud p:not(#subtitle) { display: none; }
    body.embed-mode #hud { max-width: min(320px, 55vw); }
    body.embed-mode #search-panel {
      width: min(260px, 42vw); left: auto; right: 12px; top: 12px; bottom: auto;
    }
    body.embed-mode #legend { display: none; }
    body.embed-mode #status { font-size: 9px; max-width: 70vw; opacity: 0.65; }
    @media (max-width: 640px) {
      body.embed-mode #hud {
        top: 8px;
        left: 8px;
        right: 8px;
        max-width: none;
        padding: 8px 10px;
      }
      body.embed-mode #hud h1 {
        font-size: 12px;
        line-height: 1.25;
        margin-bottom: 2px;
      }
      body.embed-mode #subtitle {
        font-size: 10px;
        margin-bottom: 0;
      }
      body.embed-mode #search-panel {
        top: auto;
        bottom: max(8px, env(safe-area-inset-bottom, 0px));
        left: 8px;
        right: 8px;
        width: auto;
        max-width: none;
        padding: 8px 10px;
        border-radius: 12px;
      }
      body.embed-mode #search-hint { display: none; }
      body.embed-mode #search-results { max-height: min(34vh, 240px); }
      body.embed-mode #search-input {
        padding: 10px 11px;
        font-size: 16px;
      }
      body.embed-mode #status { display: none; }
      body.embed-mode #attribution {
        top: 8px;
        right: 8px;
        bottom: auto;
        font-size: 9px;
      }
    }
"""

ATTR_HTML = '  <a id="attribution" href="https://cotten.io">Tim Cotten</a>\n'

EMBED_JS = """
      const embedMode = new URLSearchParams(location.search).get("embed") === "1";
      if (embedMode) document.body.classList.add("embed-mode");
"""

LOADER_PATCHES = (
    (
        'const manifestFile = "";',
        'const manifestFile = "manifest.json";',
    ),
)

COPY_PATCHES: tuple[tuple[str, str], ...] = (
    (
        "<title>Llama-3-8B token embeddings — 3D UMAP</title>",
        "<title>Token Relationships in 3D (Llama-3-8B)</title>",
    ),
    (
        '<h1 id="title">Llama-3-8B token embeddings — 3D UMAP</h1>',
        '<h1 id="title">Token Relationships in 3D (Llama-3-8B)</h1>',
    ),
    (
        'document.getElementById("title").textContent = manifest.model + " — 3D UMAP";',
        'document.getElementById("title").textContent = "Token Relationships in 3D (" + manifest.model + ")";',
    ),
    (
        "`${manifest.n_points.toLocaleString()} tokens · ${manifest.umap.metric} · seed ${manifest.umap.seed}`;",
        "`${manifest.n_points.toLocaleString()} tokens`;",
    ),
    (
        '`Ready — WASD fly · R reset · O orbit ${orbitLabel} (${orbitSpeed.toFixed(2)}) · H/L J/K N/M view`;',
        '`WASD fly · R reset · O orbit ${orbitLabel} (${orbitSpeed.toFixed(2)}) · H/L J/K N/M view`;',
    ),
    (
        "        const mat = makeParticleMaterial(HIGHLIGHT_COLOR, 0.014, 1.0);",
        "        const mat = makeParticleMaterial(HIGHLIGHT_COLOR, embedMode ? 0.036 : 0.014, 1.0);",
    ),
    (
        "        searchHighlight.renderOrder = 10;",
        "        searchHighlight.renderOrder = embedMode ? 20 : 10;",
    ),
    (
        "      canvas.addEventListener(\"pointerdown\", (e) => {\n"
        "        if (e.button !== 0) return;\n"
        "        leftPointer = { x: e.clientX, y: e.clientY, id: e.pointerId };",
        "      canvas.addEventListener(\"pointerdown\", (e) => {\n"
        "        if (e.pointerType === \"mouse\" && e.button !== 0) return;\n"
        "        if (autoOrbit) {\n"
        "          stopAutoOrbit();\n"
        "          updateStatus();\n"
        "        }\n"
        "        leftPointer = { x: e.clientX, y: e.clientY, id: e.pointerId };",
    ),
    (
        "      canvas.addEventListener(\"pointerup\", (e) => {\n"
        "        if (e.button !== 0 || !leftPointer || e.pointerId !== leftPointer.id) return;",
        "      canvas.addEventListener(\"pointerup\", (e) => {\n"
        "        if ((e.pointerType === \"mouse\" && e.button !== 0) || !leftPointer || e.pointerId !== leftPointer.id) return;",
    ),
    (
        "      window.addEventListener(\"resize\", resize);\n"
        "      resize();\n",
        "      canvas.addEventListener(\"wheel\", () => {\n"
        "        if (!autoOrbit) return;\n"
        "        stopAutoOrbit();\n"
        "        updateStatus();\n"
        "      }, { passive: true });\n"
        "\n"
        "      window.addEventListener(\"resize\", resize);\n"
        "      resize();",
    ),
)


ORBIT_DISTANCE_PATCHES: tuple[tuple[str, str], ...] = (
    (
        "      let orbitDistanceLock = null;",
        "      let orbitDistanceLock = null;\n      let embedDistanceLock = null;",
    ),
    (
        """      function stopAutoOrbit() {
        autoOrbit = false;
        controls.autoRotate = false;
      }""",
        """      function stopAutoOrbit() {
        autoOrbit = false;
        controls.autoRotate = false;
        embedDistanceLock = null;
      }""",
    ),
    (
        """        if (orbitDistanceLock !== null) {
          const d = camera.position.distanceTo(controls.target);
          if (Math.abs(d - orbitDistanceLock) > 1e-5) {
            _camOffset.copy(camera.position).sub(controls.target);
            if (_camOffset.lengthSq() > 1e-12) {
              _camOffset.normalize().multiplyScalar(orbitDistanceLock);
              camera.position.copy(controls.target).add(_camOffset);
            }
            clearControlInertia();
          }
          orbitDistanceLock = null;
        }""",
        """        const activeDistanceLock = embedDistanceLock !== null ? embedDistanceLock : orbitDistanceLock;
        if (activeDistanceLock !== null) {
          const d = camera.position.distanceTo(controls.target);
          if (Math.abs(d - activeDistanceLock) > 1e-5) {
            _camOffset.copy(camera.position).sub(controls.target);
            if (_camOffset.lengthSq() > 1e-12) {
              _camOffset.normalize().multiplyScalar(activeDistanceLock);
              camera.position.copy(controls.target).add(_camOffset);
            }
            clearControlInertia();
          }
          if (orbitDistanceLock !== null) orbitDistanceLock = null;
        }""",
    ),
    (
        """    window.addEventListener("blur", () => keys.clear());

    function hexToRgb(hex) {""",
        """    window.addEventListener("blur", () => keys.clear());
    window.addEventListener("message", (event) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "vumap-key") return;
      if (data.phase === "down") keys.add(data.code);
      else if (data.phase === "up") keys.delete(data.code);
      else if (data.phase === "clear") keys.clear();
    });

    function hexToRgb(hex) {""",
    ),
)


def parse_binary(buf: bytes) -> tuple[int, int, list[float], list[int]]:
    if buf[:8] != MAGIC:
        raise ValueError(f"Bad binary magic: {buf[:8]!r}")
    version, count = struct.unpack_from("<II", buf, 8)
    pos_off = 16
    pos_size = count * 12
    positions = list(struct.unpack(f"<{count * 3}f", buf[pos_off : pos_off + pos_size]))
    labels_off = pos_off + pos_size
    labels = list(buf[labels_off : labels_off + count])
    if len(labels) != count:
        raise ValueError(f"Label count mismatch: {len(labels)} vs {count}")
    return version, count, positions, labels


def build_binary(version: int, count: int, positions: list[float], labels: list[int]) -> bytes:
    if len(positions) != count * 3:
        raise ValueError(f"Position float count {len(positions)} != {count * 3}")
    if len(labels) != count:
        raise ValueError(f"Label count {len(labels)} != {count}")
    header = MAGIC + struct.pack("<II", version, count)
    pos_bytes = struct.pack(f"<{len(positions)}f", *positions)
    return header + pos_bytes + bytes(labels)


def make_token_display(text: str) -> dict:
    note = "cotten.io — hidden watermark cluster"
    return {
        "format": 4,
        "seg": [["g", text]],
        "note": note,
        "q": f"{text}\n{note}",
    }


def patch_payload(payload: dict) -> dict:
    raw = base64.b64decode(payload["dataBase64"])
    version, count, positions, labels = parse_binary(raw)

    token_display: list = payload.get("tokenDisplay") or []
    if len(token_display) != count:
        raise ValueError(f"tokenDisplay length {len(token_display)} != point count {count}")

    manifest = json.loads(json.dumps(payload["manifest"]))
    cx, cy, cz = TOWN_CENTER

    for i, text in enumerate(EASTER_EGGS):
        ox = (i % 3 - 1) * TOWN_SPREAD
        oy = ((i // 3) % 2 - 0.5) * TOWN_SPREAD * 2
        oz = (i / max(len(EASTER_EGGS) - 1, 1) - 0.5) * TOWN_SPREAD * 3
        positions.extend([cx + ox, cy + oy, cz + oz])
        labels.append(MERGE_CAT_ID)
        token_display.append(make_token_display(text))

    new_count = count + len(EASTER_EGGS)
    new_raw = build_binary(version, new_count, positions, labels)

    manifest["n_points"] = new_count
    manifest["data_file"] = "data.bin"
    manifest["search_file"] = "search.idx"
    manifest["displays_file"] = "displays.bin"
    for cat in manifest["categories"]:
        if cat["id"] == MERGE_CAT_ID:
            cat["count"] += len(EASTER_EGGS)
            break
    else:
        raise ValueError(f"Category id {MERGE_CAT_ID} not found in manifest")

    return {
        "manifest": manifest,
        "binary": new_raw,
        "tokenDisplay": token_display,
    }


def inject_html_patches(html: str) -> str:
    if "</style>" not in html:
        raise ValueError("Expected </style> in source HTML")
    html = html.replace("</style>", CSS_PATCH + "\n  </style>", 1)

    marker = '<div id="load-error"><div class="box"></div></div>\n'
    if marker not in html:
        raise ValueError("Expected load-error marker in source HTML")
    html = html.replace(marker, marker + ATTR_HTML, 1)

    main_marker = "    async function main() {\n"
    if main_marker not in html:
        raise ValueError("Expected main() in source HTML")
    html = html.replace(main_marker, main_marker + EMBED_JS, 1)

    for old, new in LOADER_PATCHES:
        if old not in html:
            raise ValueError(f"Expected loader snippet: {old!r}")
        html = html.replace(old, new, 1)

    for old, new in COPY_PATCHES:
        if old not in html:
            raise ValueError(f"Expected copy patch: {old!r}")
        html = html.replace(old, new, 1)

    for old, new in ORBIT_DISTANCE_PATCHES:
        if old not in html:
            raise ValueError(f"Expected orbit distance patch: {old!r}")
        html = html.replace(old, new, 1)

    if ANIMATE_START_OLD not in html:
        raise ValueError("Expected animate() call in source HTML")
    html = html.replace(ANIMATE_START_OLD, ANIMATE_START_NEW, 1)

    return html


def _replace_once(pattern: re.Pattern[str], html: str, replacement: str, label: str) -> str:
    """String splice — never use re.sub(repl=...) on JS; it eats backslashes."""
    match = pattern.search(html)
    if not match:
        raise ValueError(f"Could not find {label}")
    return html[: match.start()] + replacement + html[match.end() :]


def patch_compiled_loader(html: str, scripts_dir: Path) -> str:
    snippet = (scripts_dir / "umap_loader_snippet.js").read_text(encoding="utf-8")
    updated = _replace_once(TOKEN_SEARCH_INDEX_RE, html, snippet + "\n", "TokenSearchIndex")
    updated = _replace_once(LOAD_DATASET_RE, updated, LOAD_DATASET_REPLACEMENT + "\n", "loadDataset()")

    if MAIN_LET_OLD not in updated:
        raise ValueError("Could not find manifest let bindings in main()")
    updated = updated.replace(MAIN_LET_OLD, MAIN_LET_NEW, 1)

    if MAIN_DESTRUCTURE_OLD not in updated:
        raise ValueError("Could not find loadDataset destructure in main()")
    updated = updated.replace(MAIN_DESTRUCTURE_OLD, MAIN_DESTRUCTURE_NEW, 1)

    if SEARCH_INDEX_OLD not in updated:
        raise ValueError("Could not find TokenSearchIndex construction")
    updated = updated.replace(SEARCH_INDEX_OLD, SEARCH_INDEX_NEW, 1)

    return updated


def strip_embedded_data(html: str) -> str:
    updated, n = EMBEDDED_RE.subn("\n", html, count=1)
    if n != 1:
        raise ValueError("Could not find vumap3d-embedded script block to remove")
    return updated


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--source",
        type=Path,
        default=Path.home() / "Downloads" / "interactive-3d-umap-tokens.html",
        help="Source standalone UMAP HTML artifact",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=Path("public/research/tokens/llama-8b-token-3d-viewer"),
        help="Output directory (served at /research/tokens/llama-8b-token-3d-viewer/)",
    )
    args = parser.parse_args()

    if not args.source.is_file():
        print(f"error: source not found: {args.source}", file=sys.stderr)
        return 1

    html = args.source.read_text(encoding="utf-8")
    match = re.search(
        r'<script id="vumap3d-embedded" type="application/json">(.*?)</script>',
        html,
        re.DOTALL,
    )
    if not match:
        print("error: vumap3d-embedded block not found", file=sys.stderr)
        return 1

    payload = json.loads(match.group(1))
    patched = patch_payload(payload)

    html = strip_embedded_data(html)
    html = inject_html_patches(html)
    html = patch_compiled_loader(html, Path(__file__).resolve().parent)

    search_idx = build_search_idx(patched["tokenDisplay"])
    displays_bin = build_displays_bin(patched["tokenDisplay"])

    out_dir = args.out_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    app_dir = out_dir / "app"
    app_dir.mkdir(parents=True, exist_ok=True)

    paths = {
        "app/index.html": app_dir / "index.html",
        "manifest.json": out_dir / "manifest.json",
        "search.idx": out_dir / "search.idx",
        "displays.bin": out_dir / "displays.bin",
        "data.bin": out_dir / "data.bin",
    }

    paths["app/index.html"].write_text(html, encoding="utf-8")
    paths["manifest.json"].write_text(
        json.dumps(patched["manifest"], indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    paths["search.idx"].write_bytes(search_idx)
    paths["displays.bin"].write_bytes(displays_bin)
    paths["data.bin"].write_bytes(patched["binary"])

    # Remove legacy JSON displays if present from an earlier build.
    legacy_displays = out_dir / "displays.json"
    if legacy_displays.exists():
        legacy_displays.unlink()

    # Remove legacy root index.html from before the React shell route.
    legacy_index = out_dir / "index.html"
    if legacy_index.exists():
        legacy_index.unlink()

    print(
        f"wrote {out_dir}/\n"
        f"  app/index.html {paths['app/index.html'].stat().st_size:>12,} bytes\n"
        f"  manifest.json  {paths['manifest.json'].stat().st_size:>12,} bytes\n"
        f"  search.idx     {paths['search.idx'].stat().st_size:>12,} bytes\n"
        f"  displays.bin   {paths['displays.bin'].stat().st_size:>12,} bytes\n"
        f"  data.bin       {paths['data.bin'].stat().st_size:>12,} bytes\n"
        f"  n_points={patched['manifest']['n_points']}, watermark_tokens={len(EASTER_EGGS)}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
