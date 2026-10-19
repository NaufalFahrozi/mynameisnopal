# mynameisnopal: project context

Personal site of **Naufal Fahrozi** (Samarinda, Borneo: informatics student, cinephile, reader,
keeper of ledgers). This file exists so any future session, human or agent, can pick the work up
without losing the story. It is the memory of this repository.

## Concept

A **book**, not a portfolio. Front matter homepage (roman-numeral table of contents), margin notes,
typographic ledgers instead of poster grids, an alphabetical index in the appendix. Form is
dead-serious; humour lives only in the content.

## Stack & conventions

- **Astro 7** + TypeScript (strict), MDX, content collections. Static output.
- **No CSS framework.** All styles handmade in `src/styles/global.css` (tokens at the top) plus
  scoped `<style>` blocks per page. Keep it that way.
- **Palette**: paper `#faf7ef`, ink `#1a1714`, rubric (single accent) `#b8452a`. The accent is
  "rubrication": used for structure and interaction only. **No gradients, no glass, no purple,
  no decorative emoji, no icon fonts, no stock illustrations.**
- **Type**: Instrument Serif (display) · Geist (body) · Geist Mono (metadata). Oldstyle numerals in
  prose, tabular in data.
- **Language**: chrome in English; personal prose Indonesian-first (mixed ID/EN is authentic).
- **Punctuation law: no em dashes. Anywhere.** Not in copy, not in comments, not in commit
  messages. The author's rule: they read as machine-written. Use commas, colons, semicolons,
  parentheses, or the middle dot `·`. En dashes may appear only in numeric ranges, and a plain
  hyphen is always acceptable instead.

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

1. Show, never claim. The site never says it is smart.
2. One punchline per screen, one epigraph per page, 1 or 2 sidenotes per essay.
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
- Do not add new sections/pages without the author's approval.
- Do not let any builder "improve" the copy into generic English: the voice is the product.
- Mobile must stay first-class: readable at 360px, tap targets 44px or more, no hover-only interactions.
