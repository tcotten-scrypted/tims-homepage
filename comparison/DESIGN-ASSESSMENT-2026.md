# Design Assessment: cotten.io vs. Top AI Founder Personal Sites (2026)

**Context:** Static site, manual updates. Benchmark set: three leading AI founder personal websites used to identify what you could do differently on the design and structure of the page itself.

---

## Benchmark set

| Site | Who | Design in one line |
|------|-----|--------------------|
| **[karpathy.ai](https://karpathy.ai)** | Andrej Karpathy (Eureka Labs; ex-Tesla AI, OpenAI) | Pure HTML + CSS, two static files; text-first, personality tagline, single long scroll (timeline → talks → writing → projects → papers). |
| **[darioamodei.com](https://darioamodei.com)** | Dario Amodei (CEO, Anthropic) | Minimal: short bio, then content buckets (Essays, Short posts, Research, Op-eds, Interviews). No hero image, no experience section. |
| **[zelikman.me](https://zelikman.me)** | Eric Zelikman (CEO, xAI) | One paragraph (who + role + mission) + dual CTA; then Selected Works (papers), Education, Industry table. Research-forward, credential-heavy. |

*Reference also: [shumer.dev](https://shumer.dev) (Matt Shumer, OthersideAI)—short sections, lowercase headings, “dm on x // fastest response,” metrics (15k+ stars), viral growth stories.*

---

## What the top three do in common

1. **Text-first, minimal chrome** — No Bootstrap/nav bars, no card grids, no hero images (or at most one). Content is sections and links.
2. **“Now” first** — Current role and focus in the first 1–2 sentences. Proof (essays, talks, papers) comes after.
3. **One primary CTA** — “Reach out,” “Research chat,” “dm on x // fastest response.” One obvious next step.
4. **Lightweight stack** — Karpathy: “0 frameworks… pure HTML and CSS in two static files” (explicitly anti–“500-pound websites”). Others are similarly static and minimal.
5. **Personality in copy** — Tagline, tone, or one quirk (e.g. Karpathy’s emojis and “Order of the Unicorn”; Shumer’s sushi). Not “corporate template” voice.
6. **Structured proof** — Clear labels: Essays, Short posts, Op-eds, Interviews / Featured talks / Featured writing. Easy to scan.
7. **Recent or canonical work** — Featured content is either latest or signature pieces, not oldest.

---

## What you could do differently (design of the page)

### 1. Stack and weight

**Current:** Bootstrap 4, jQuery, Font Awesome, custom CSS, jquery.nav, gtag. Multiple requests and a heavy footprint for a static, manually updated site.

**Benchmarks:** HTML + one (or two) CSS files; no JS required for layout/nav.

**Recommendation:** For static + manual updates, move toward a single HTML file and one main CSS file. Drop Bootstrap/jQuery for layout and nav; use semantic HTML and CSS (e.g. anchor links, `:target`, or a minimal inline script for smooth scroll if needed). Keeps deployment simple and aligns with “AI founder” norms (speed, minimalism).

---

### 2. Above-the-fold: “Now” and one CTA

**Current:** Hero = tagline + name + @handle + email + location + social + large portrait. “What I’m building” (Scrypted, Inori, AVBs, Delula) is in a separate section below, and competes with four flash cards.

**Benchmarks:** First screen = who you are *now* (one to three sentences) and the single most important action (email, Cal link, or “dm on x”).

**Recommendation:** Put one clear “now” statement and one primary CTA above the fold (e.g. “Building decentralized agent infra and the Scrypted Network. [Pitch/Data Room →]” or “Demo Delula”). Move or reduce the four flash cards so they don’t crowd the opening; treat them as “proof” further down.

---

### 3. Content hierarchy: narrative vs. proof

**Current:** Hero → 4 flash cards → “What I’m Up To” → Experience (two-column cards) → Featured Posts. Narrative (what you’re building) is mixed with proof (reads, posts, experience) in one flow.

**Benchmarks:** (1) Who I am / what I’m doing now. (2) Proof in labeled buckets: Essays, Talks, Posts, Papers, etc.

**Recommendation:** Separate “current focus” (and optional short bio) from “proof.” One block for “What I’m building” + primary CTA; then clearly labeled sections such as “Writings,” “Talks,” “Projects,” “Experience,” each with scannable links or a short list. Same content, clearer hierarchy.

---

### 4. Personality in the copy

**Current:** Professional and clear; tagline “Move Fast & Make Things” is good. Rest reads like a polished template (nav, “Read More,” card copy).

**Benchmarks:** At least one voice-forward element: tagline, one-liner, or quirk (e.g. “spiritual leader of $AVB,” “accidentally became,” “I have three blogs 🤦‍♂️”).

**Recommendation:** Keep the tagline; add one line that’s unmistakably you (e.g. the “accidentally became the spiritual leader of $AVB” idea, or a single line about UO → AVBs). No layout change—copy only.

---

### 5. Featured content: recency and labeling

**Current:** “Featured Posts” are 2018–2019 (Russia’s Bitcoin, Gmail UX, SLEEPy MySQL). Flash cards mix blog posts and Vice; strong reads but not aligned with current positioning (AI/agents/AVBs).

**Benchmarks:** Featured = recent or canonical; often labeled “Recent,” “Essays,” “Short posts,” “Op-eds,” “Interviews.”

**Recommendation:** With manual updates: surface 3–5 posts that are either (a) recent or (b) canonical for AI/agents/AVBs (e.g. Scrypted raise, CRPC, AVBs, Delula). Label them (e.g. “Recent” or “On agents & infra”). Optionally keep one “classic” (e.g. Solidity, Lambda) in a separate short list. Aligns first impression with 2026 positioning.

---

### 6. Primary CTA visibility

**Current:** CTA exists (“Demo Delula | LinkedIn | X | Email for Pitch/Data Room”) but lives in a block after Experience and Blog. No single “main” action above the fold.

**Benchmarks:** One primary CTA near the top (contact, calendar, or “dm on x”).

**Recommendation:** Choose one primary action (e.g. “Email for Pitch/Data Room” or “Demo Delula”) and repeat it in the opening block and again in a sticky or footer. Make it the obvious next step for investors/collaborators.

---

### 7. Imagery

**Current:** Portrait, Worldseed graphic, four flash-card images, three blog thumbnails. Image-heavy relative to benchmarks.

**Benchmarks:** Almost no imagery (Karpathy, Amodei, Zelikman are text-only or logo-only). Shumer uses a logo strip, not a portrait.

**Recommendation:** For an “AI founder” signal, reduce imagery: either (a) text-only above the fold and one optional portrait or product visual below, or (b) keep the portrait but smaller and secondary to the opening text. You can keep one strong visual (e.g. Delula or Scrypted) and drop or simplify the rest. Fewer, higher-signal images.

---

### 8. Experience presentation

**Current:** Two-column card grid, company blurbs + bullet lists. Feels like a resume section.

**Benchmarks:** Amodei: no experience section. Zelikman: compact table (role, place, dates). Karpathy: single-column timeline in narrative form.

**Recommendation:** Prefer one column: either a compact table (role | company | dates) or a short timeline with 1–2 lines per role. Keeps EA/UO/Scrypted story without the “template resume” look. Fits static HTML (no need for cards or columns).

---

### 9. Meta and positioning

**Current:** Description: “Tim Cotten is the CEO of Scrypted Inc., building decentralized applications for the Metaverse.” Keywords include “worldseed,” “startup,” “ceo.”

**Benchmarks:** Descriptions are short and current (company, focus, sometimes “essays” or “research”).

**Recommendation:** Update meta description and keywords to 2026 positioning: Scrypted, Inori/Scrypted Network, AVBs, agent infra, Delula. Remove or de-emphasize “Metaverse” and “worldseed” unless you still want them as secondary. Helps search and sharing align with how you want to be read.

---

### 10. Navigation

**Current:** Fixed nav: Home, About, Experience, Blog. Single-page with anchor links.

**Benchmarks:** Most are single long scroll; some have no nav (Karpathy), or minimal in-page anchors (Amodei, Zelikman).

**Recommendation:** For a single-page static site, consider removing the fixed nav and using a short in-page list of sections at the top (e.g. “Now · Writings · Talks · Experience · Contact”) or no nav at all. Reduces chrome and dependency on JS; matches benchmark minimalism.

---

## Summary: design shifts that would align you with the top three

| Area | Shift |
|------|--------|
| **Stack** | Pure HTML + one CSS file; no Bootstrap/jQuery for layout. |
| **Above the fold** | One “now” sentence + one primary CTA; proof below. |
| **Hierarchy** | Clear split: “current focus” vs. labeled proof (Writings, Talks, Experience). |
| **Voice** | One unmistakably-you line (e.g. $AVB, UO→AVBs). |
| **Featured content** | Recent or canonical AI/agent work; clear labels. |
| **CTA** | One primary action repeated (e.g. Pitch/Data Room or Demo Delula). |
| **Imagery** | Text-first; one strong visual or smaller portrait. |
| **Experience** | Single-column timeline or compact table. |
| **Meta** | Description/keywords updated to Scrypted/AVBs/agent infra. |
| **Nav** | Minimal or none; single scroll. |

All of the above are compatible with static deployment and manual updates: no build step required, only HTML/CSS and content edits.

---

*Assessment based on public content of karpathy.ai, darioamodei.com, and zelikman.me (2026), plus shumer.dev. Comparison copy: `comparison/cotten-io-homepage.html`.*
