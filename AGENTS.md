# mynameisnopal: project context

Personal site of **Naufal Fahrozi** (Samarinda: informatics student, cinephile, reader, keeper of
ledgers). This file exists so any future session, human or agent, can pick the work up without
losing the story. It is the memory of this repository.

## Concept

**The projection room.** Not a portfolio, not a book. Dark auditorium, one warm projector beam as
the only accent. Devices currently in the film:

- Film-leader countdown on the home page: 3, 2, 1, gone. Skippable, once per session, and it can
  never get stuck (CSS auto-hide as a no-JS safety net).
- Live film grain over everything (canvas, low-res noise, opacity 0.05).
- Hero spotlight that follows the cursor, and magnetic letters in the big name.
- Custom lens cursor on desktop (a circle that grows on links and buttons).
- A synthesized projector hum behind a "sound: off" toggle in the header. WebAudio only, no files.
  **VETOED by the author: no sound at all. Removed.**
- Per-page devices, one each: About has "AUDITED" stamps on hover; Reading has a pull-out spine
  shelf; Commonplace has a toggle that refuses to be a smartwatch; Projects has a one-tap
  SebatSense demo; Notes rows slide; Contact copies the email on click; Films has two charts and
  "putar reel"; Appendix has an A to Z jump rail and a glitching dead link (the Zone entry).
- `src/data/letterboxd-archive.ts`: full-diary stats generated from the author's Letterboxd export
  by `scripts/build-archive.mjs <extracted-export-dir>`. Regenerate when he sends a new export.
- Rating-distribution chart on Films, built by hand from the Letterboxd cache.
- Sections numbered as reels, in this order: 01 Films, 02 Reading, 03 Commonplace, 04 Projects,
  05 Notes, 06 About, 07 Contact, 08 Appendix. Nav order follows the same numbering. The appendix
  page is called **Appendix** (never "Index": too many people read that as the homepage).

**Author vetoes (do not bring these back):** end credits block, sprocket-strip progress bar,
self-running marquee, film posters, any and all sound. All were tried and explicitly rejected.

## Stack & conventions

- **Astro 7** + TypeScript (strict), MDX, content collections. Static output.
- **No CSS framework.** All styles handmade in `src/styles/global.css` (tokens at the top) plus
  scoped `<style>` blocks per page. Keep it that way.
- **Palette (token names are legacy, values are cinema)**: `--paper` is the auditorium black
  `#0d0b09`, `--ink` is the screen `#f2efe6`, `--rubric` is the projector beam `#e07b54`. Do not
  rename the tokens casually; every page's scoped styles depend on them.
- **Type**: Instrument Serif (display) · Geist (body) · Geist Mono (metadata).
- **Language**: chrome in English; personal prose Indonesian-first, **informal** ("ga", not "tidak").
- **Punctuation law: no em dashes, with one exception: quote attributions.** Attributions use an em
  dash (`— Diogenes of Sinope, allegedly`). Everything else uses commas, colons, semicolons,
  parentheses, or the middle dot `·`.
- **Voice law**: verdict, not diary. Minimal first person, zero over-exposition. Never explain who
  the author is; let the work talk.
- **Motion**: everything respects `prefers-reduced-motion`. Countdown is once per session.
- **Client-side navigation**: scripts that touch the DOM must re-init on `astro:page-load`, because
  ClientRouter replaces the DOM and stale observers/scripts cause blank sections. This bit us once.

## Components & pages

- `src/components/Countdown.astro`: film-leader intro, home only.
- `src/layouts/Base.astro`: grain canvas, lens cursor, scroll reveals, `astro:page-load` re-init.
- `src/components/Header.astro`: numbered nav + sound toggle (projector hum).
- `src/components/Footer.astro`: colophon + socials. Nothing else.
- `src/pages/index.astro`: hero (spotlight + magnetic letters), switchboard (the four ledgers),
  micro-nav, now showing, epigraph.

## Data & content

- `src/data/site.ts`: identity, socials, email.
- `src/data/films.ts`: top ten + the Fitzcarraldo epigraph. Directors verified; do not "fix" them back.
- `src/data/books.ts`: currently reading, five favourites.
- `src/data/letterboxd-cache.ts`: **generated**, do not edit by hand. Run `npm run sync`
  (also runs daily via `.github/workflows/sync-letterboxd.yml`). The Letterboxd feed is fetched live
  at build (`src/lib/letterboxd.ts`); the committed cache is the fallback so builds never break.
  Imported review text may contain long dashes; the Films page tames them at render time.
- `src/content/notes/*.mdx`: essays. First one: *The Audience Is the Antagonist* (Fitzcarraldo),
  republished from Letterboxd with credit.
- `docs/*.png`: README screenshots, taken from the live site. Regenerate after big redesigns.

## Voice rules (the Satire Charter)

1. Show, never claim.
2. Bahasa santai. First person seminimal mungkin. Ga ada over-eksposisi.
3. Never name fallacies (straw man, ad hominem...). Using the vocabulary is the tell.
4. Satire targets systems, absurdities, and the author himself, never down.
5. Every satirical line is logged in `SATIRE.md` and must be reviewed by the author before launch.

## Commands

```bash
npm run dev      # local preview
npm run build    # production build
npm run sync     # refresh the Letterboxd cache
```

Deploy target: **Vercel**, `https://mynameisnopal.vercel.app`. Repo: `NaufalFahrozi/mynameisnopal`.

## Red lines for future agents

- Do not add a CSS framework, animation library, or icon set.
- No posters, no marquee, no end credits, no sprocket bar. Author vetoed; respect it.
- Do not add new sections/pages without the author's approval.
- Do not "improve" the copy into generic English or formal Indonesian: the voice is the product.
- Mobile stays first-class: readable at 360px, tap targets 44px or more, no hover-only interactions.
