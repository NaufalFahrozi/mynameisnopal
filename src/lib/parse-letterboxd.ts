import { XMLParser } from 'fast-xml-parser';

export interface LoggedFilm {
  slug: string;
  title: string;
  year: string;
  rating: number | null;
  stars: string | null;
  liked: boolean;
  rewatch: boolean;
  watchedDate: string | null;
  loggedAt: string | null;
  link: string;
  poster: string | null;
  posterSmall: string | null;
  review: string | null;
  isReview: boolean;
  /** Added during dedupe: how many times this film appears in the feed window. */
  logCount?: number;
  /** Added during dedupe: earliest watched date for this slug within the feed window. */
  firstLoggedDate?: string | null;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

export function decodeEntities(input: string): string {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (match, name: string) => NAMED_ENTITIES[name] ?? match);
}

export function starsFor(rating: number | null): string | null {
  if (rating === null) return null;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return '★'.repeat(full) + (half ? '½' : '');
}

export function slugFromLink(link: string): string {
  const match = link.match(/\/film\/([^/?#]+)/);
  return match ? match[1] : link;
}

function paragraphsOf(html: string): string[] {
  return html
    .split(/<\/p>/i)
    .map((chunk) =>
      decodeEntities(chunk.replace(/<[^>]*>/g, ' '))
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(Boolean);
}

export function parseFeed(xml: string): LoggedFilm[] {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  const doc = parser.parse(xml) as any;
  const channel = doc?.rss?.channel;
  if (!channel) return [];
  const rawItems = channel.item == null ? [] : Array.isArray(channel.item) ? channel.item : [channel.item];

  return rawItems.map((item: any): LoggedFilm => {
    const link = String(item.link ?? '');
    const description = String(item.description ?? '');

    const ratingRaw = item['letterboxd:memberRating'];
    const ratingNum = ratingRaw == null || ratingRaw === '' ? null : Number(ratingRaw);
    const rating = ratingNum !== null && Number.isFinite(ratingNum) ? ratingNum : null;

    const paragraphs = paragraphsOf(description);
    const reviewParagraphs = paragraphs.filter((p) => !/^Watched on /i.test(p));

    const posterMatch = description.match(/<img[^>]+src="([^"]+)"/i);
    const poster = posterMatch ? posterMatch[1] : null;

    return {
      slug: slugFromLink(link),
      title: decodeEntities(String(item['letterboxd:filmTitle'] ?? '')).trim(),
      year: String(item['letterboxd:filmYear'] ?? '').trim(),
      rating,
      stars: starsFor(rating),
      liked: String(item['letterboxd:memberLike'] ?? '') === 'Yes',
      rewatch: String(item['letterboxd:rewatch'] ?? '') === 'Yes',
      watchedDate: item['letterboxd:watchedDate'] ? String(item['letterboxd:watchedDate']) : null,
      loggedAt: item.pubDate ? new Date(String(item.pubDate)).toISOString() : null,
      link,
      poster,
      posterSmall: poster ? poster.replace(/-0-600-0-900-crop/, '-0-230-0-345-crop') : null,
      review: reviewParagraphs.length ? reviewParagraphs.join('\n\n') : null,
      isReview: reviewParagraphs.length > 0,
    };
  });
}

/**
 * Collapse the feed to one entry per film (newest log wins), counting how many
 * times each film appears so the site can say "logged 5× since October".
 */
export function dedupeRecent(logs: LoggedFilm[], limit = 8): LoggedFilm[] {
  const seen = new Map<string, LoggedFilm>();

  for (const log of logs) {
    const existing = seen.get(log.slug);
    if (!existing) {
      seen.set(log.slug, { ...log, logCount: 1, firstLoggedDate: log.watchedDate ?? null });
      continue;
    }
    existing.logCount = (existing.logCount ?? 1) + 1;
    existing.liked = existing.liked || log.liked;
    existing.rewatch = existing.rewatch || log.rewatch;
    if (log.watchedDate && (!existing.firstLoggedDate || log.watchedDate < existing.firstLoggedDate)) {
      existing.firstLoggedDate = log.watchedDate;
    }
    if (!existing.review && log.review) {
      existing.review = log.review;
      existing.isReview = true;
    }
  }

  return [...seen.values()].slice(0, limit);
}
