    function readUtf8(view, byteOffset) {
      const len = view.getUint16(byteOffset, true);
      const start = byteOffset + 2;
      const bytes = new Uint8Array(view.buffer, view.byteOffset + start, len);
      return [new TextDecoder().decode(bytes), start + len];
    }

    function parseSearchIdx(buf) {
      const view = new DataView(buf);
      const magic = new TextDecoder().decode(new Uint8Array(buf, 0, 8));
      if (magic !== "VUMAPIDX") throw new Error("Bad search.idx magic");
      const version = view.getUint32(8, true);
      if (version !== 1) throw new Error(`Unsupported search.idx version ${version}`);
      const entryCount = view.getUint32(12, true);
      const poolBytes = view.getUint32(16, true);
      const poolOffset = 20;
      const indexOffset = poolOffset + poolBytes;
      const pool = new Uint8Array(buf, poolOffset, poolBytes);
      const poolView = new DataView(buf, poolOffset, poolBytes);

      function poolStringAt(offset) {
        const len = poolView.getUint16(offset, true);
        const start = offset + 2;
        return new TextDecoder().decode(pool.subarray(start, start + len));
      }

      const entries = new Array(entryCount);
      for (let i = 0; i < entryCount; i++) {
        const base = indexOffset + i * 8;
        entries[i] = {
          poolOff: view.getUint32(base, true),
          tid: view.getUint32(base + 4, true),
        };
      }

      return { entryCount, poolStringAt, entries };
    }

    function parseDisplaysBin(buf) {
      const view = new DataView(buf);
      const magic = new TextDecoder().decode(new Uint8Array(buf, 0, 8));
      if (magic !== "VUMAPDIS") throw new Error("Bad displays.bin magic");
      const version = view.getUint32(8, true);
      if (version !== 1) throw new Error(`Unsupported displays.bin version ${version}`);
      const count = view.getUint32(12, true);
      const tableOffset = 16;
      const recordsOffset = tableOffset + count * 4;
      const displays = new Array(count);

      for (let tid = 0; tid < count; tid++) {
        const recOff = view.getUint32(tableOffset + tid * 4, true);
        let pos = recordsOffset + recOff;
        const format = view.getUint8(pos);
        pos += 1;
        if (format === 0) {
          displays[tid] = null;
          continue;
        }

        let note;
        [note, pos] = readUtf8(view, pos);
        const segCount = view.getUint8(pos);
        pos += 1;
        const seg = [];
        for (let s = 0; s < segCount; s++) {
          const kindCode = view.getUint8(pos);
          pos += 1;
          let text;
          [text, pos] = readUtf8(view, pos);
          seg.push([kindCode === 2 ? "e" : "g", text]);
        }
        displays[tid] = { format, seg, note };
      }

      return displays;
    }

    /** Precompiled prefix index (sorted keys + string pool). */
    class CompiledSearchIndex {
      constructor(compiled) {
        this.compiled = compiled;
      }

      _prefix(q, limit) {
        const { entries, poolStringAt } = this.compiled;
        let lo = 0;
        let hi = entries.length;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          const midQ = poolStringAt(entries[mid].poolOff);
          if (midQ < q) lo = mid + 1;
          else hi = mid;
        }
        const out = [];
        for (let i = lo; i < entries.length && out.length < limit; i++) {
          const row = entries[i];
          const rowQ = poolStringAt(row.poolOff);
          if (!rowQ.startsWith(q)) break;
          out.push(row.tid);
        }
        return out;
      }

      _regex(re, limit) {
        const { entries, poolStringAt } = this.compiled;
        const out = [];
        for (const row of entries) {
          if (re.test(poolStringAt(row.poolOff))) {
            out.push(row.tid);
            if (out.length >= limit) break;
          }
        }
        return out;
      }

      _substring(needle, limit) {
        const { entries, poolStringAt } = this.compiled;
        const out = [];
        for (const row of entries) {
          if (poolStringAt(row.poolOff).includes(needle)) {
            out.push(row.tid);
            if (out.length >= limit) break;
          }
        }
        return out;
      }

      search(raw, limit = 80) {
        const query = raw.trim();
        if (!query) return [];

        const slash = query.match(/^\/(.+)\/([gimsuy]*)$/);
        if (slash) {
          try {
            return this._regex(new RegExp(slash[1], slash[2] || "i"), limit);
          } catch (_) {
            return [];
          }
        }

        if (query.length >= 2 && query.startsWith("*") && query.endsWith("*")) {
          const inner = query.slice(1, -1).toLowerCase();
          if (inner) return this._substring(inner, limit);
        }

        if (query.includes("*")) {
          const escaped = query.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
          try {
            return this._regex(new RegExp(`^${escaped}$`, "i"), limit);
          } catch (_) {
            return [];
          }
        }

        const q = query.toLowerCase();
        const prefixHits = this._prefix(q, limit);
        if (prefixHits.length >= limit) return prefixHits;

        const seen = new Set(prefixHits);
        const out = [...prefixHits];
        for (const row of this.compiled.entries) {
          const rowQ = this.compiled.poolStringAt(row.poolOff);
          if (rowQ.includes(q) && !seen.has(row.tid)) {
            out.push(row.tid);
            seen.add(row.tid);
            if (out.length >= limit) break;
          }
        }
        return out;
      }
    }
