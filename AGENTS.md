# mynameisnopal: project context

Personal site of **Naufal Fahrozi** (Samarinda: informatics student, cinephile, reader, keeper of
ledgers). This file exists so any future session, human or agent, can pick the work up without
losing the story. It is the memory of this repository.

## Concept

**The projection room.** Not a portfolio, not a book. The site opens like a screening: a film-leader
countdown (once per session, skippable, silent), live film grain over everything, a sprocket-strip
scroll progress bar, a self-running marquee, sections numbered as reels ("Reel 02 · Films"), and an
end-credits block in the footer with deliberately ridiculous roles. Dark auditorium, one warm
projector beam as the only accent.

No film posters anywhere: the author explicitly rejected them. Type and data carry the visuals.

## Stack & conventions

- **Astro 7** + TypeScript (strict), MDX, content collections. Static output.
- **No CSS framework.** All styles handmade in `src/styles/global.css` (tokens at the top) plus
  scoped `<style>` blocks per page. Keep it that way.
- **Palette (token names are legacy, values are cinema)**: `--paper` is the auditorium black
  `#0d0b09`, `--ink` is the screen `#f2efe6`, `--rubric` is the projector beam `#e07b54`. Do not
  rename the tokens casually; every page's scoped styles depend on them.
- **Type**: Instrument Serif (display) · Geist (body) · Geist Mono (metadata). Oldstyle numerals in
  prose, tabular in data.
- **Language**: chrome in English; personal prose Indonesian-first, **informal** ("ga", not "tidak").
- **Punctuation law: no em dashes. Anywhere.** Use commas, colons, semicolons, parentheses, or the
  middle dot `·`.
- **Voice law**: verdict, not diary. Minimal first person, zero over-exposition. Never explain who
  the author is; let the work talk.
- **Motion**: countdown is skippable and once per session; grain pauses under reduced motion; reveals
  and marquee disabled under `prefers-reduced-motion`. Keep the grain subtle (opacity 0.05, 12fps-ish).

## Components & pages

- `src/components/Countdown.astro`: film-leader intro, home only, sessionStorage-gated.
- `src/layouts/Base.astro`: grain canvas, sprocket progress, scroll reveals.
- `src/components/Header.astro`: numbered nav (01..07).
- `src/components/Footer.astro`: end credits + colophon + socials.
- `src/pages/index.astro`: hero (spotlight follows cursor), marquee, program, now showing, epigraph.

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
- No film posters. No gradients that pretend to be art. No decorative emoji.
- Do not add new sections/pages without the author's approval.
- Do not "improve" the copy into generic English or formal Indonesian: the voice is the product.
- Mobile stays first-class: readable at 360px, tap targets 44px or more, no hover-only interactions.
