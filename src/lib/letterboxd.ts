import { cache, fetchedAt as cacheFetchedAt } from '../data/letterboxd-cache';
import { dedupeRecent, parseFeed, type LoggedFilm } from './parse-letterboxd';

const FEED_URL = 'https://letterboxd.com/NaufalFahrozi/rss/';

interface Feed {
  logs: LoggedFilm[];
  fetchedAt: string;
  live: boolean;
}

let memo: Feed | null = null;

/**
 * Live feed when the network allows it (dev and Vercel builds),
 * committed cache when it does not. The site never breaks because
 * Letterboxd is having a moment.
 */
export async function getFeed(): Promise<Feed> {
  if (memo) return memo;

  try {
    const res = await fetch(FEED_URL, {
      headers: {
        'user-agent': 'mynameisnopal/1.0 (build-time ledger sync)',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const logs = parseFeed(await res.text());
    if (!logs.length) throw new Error('feed parsed to zero entries');
    memo = { logs, fetchedAt: new Date().toISOString(), live: true };
  } catch (error) {
    console.warn(
      `[letterboxd] live fetch unavailable (${(error as Error).message}); using committed cache from ${cacheFetchedAt}`,
    );
    memo = { logs: cache as LoggedFilm[], fetchedAt: cacheFetchedAt, live: false };
  }

  return memo;
}

export async function recentFilms(limit = 8) {
  const feed = await getFeed();
  return {
    films: dedupeRecent(feed.logs, limit),
    fetchedAt: feed.fetchedAt,
    live: feed.live,
  };
}

export type { LoggedFilm };
