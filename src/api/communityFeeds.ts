import { redditFeedSources, type RedditFeedPost, type RedditFeedResult } from '../shared/blog/communityFeeds';

const configuredFeedUrl = process.env.EXPO_PUBLIC_REDDIT_FEED_URL?.trim() ?? ``;
const redditHosts = new Set([`reddit.com`, `www.reddit.com`, `old.reddit.com`]);
const knownSourceIds = new Set(redditFeedSources.map(source => source.id));

const getFeedEndpoint = () => {
  if (!configuredFeedUrl) return ``;
  try {
    const url = new URL(configuredFeedUrl);
    const isReddit = url.hostname === `reddit.com` || url.hostname.endsWith(`.reddit.com`) || url.hostname === `redd.it` || url.hostname.endsWith(`.redd.it`);
    return url.protocol === `https:` && !url.username && !url.password && !isReddit ? url.href : ``;
  } catch {
    return ``;
  }
};

const feedEndpoint = getFeedEndpoint();
export const communityFeedsConnected = Boolean(feedEndpoint);
export const getUnavailableRedditFeeds = (): RedditFeedResult[] => redditFeedSources.map(source => ({
  posts: [],
  status: `unavailable`,
  sourceId: source.id,
}));

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === `object` && value !== null && !Array.isArray(value);
const normalizePublishedAt = (value: string) => {
  const dateParts = value.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/);
  if (!dateParts) throw new Error(`Invalid Feed Date`);
  const localTimestamp = `${dateParts[1]}${(dateParts[2] ?? `.`).padEnd(4, `0`)}Z`;
  const localDate = new Date(localTimestamp);
  const publishedDate = new Date(value);
  if (!Number.isFinite(localDate.getTime()) || !Number.isFinite(publishedDate.getTime()) || localDate.toISOString() !== localTimestamp) throw new Error(`Invalid Feed Date`);
  return publishedDate.toISOString();
};

const normalizePost = (value: unknown): RedditFeedPost => {
  if (!isRecord(value) || typeof value.id !== `string` || typeof value.url !== `string` || typeof value.title !== `string` || typeof value.publishedAt !== `string`) throw new Error(`Invalid Feed Post`);
  const id = value.id.trim();
  const title = value.title.trim();
  const url = new URL(value.url.trim());
  if (!id || !title || url.protocol !== `https:` || !redditHosts.has(url.hostname) || url.username || url.password || url.port) throw new Error(`Invalid Feed Post`);
  return {
    id,
    title,
    url: url.href,
    publishedAt: normalizePublishedAt(value.publishedAt.trim()),
  };
};

const normalizeFeeds = (value: unknown): RedditFeedResult[] => {
  if (!isRecord(value) || !Array.isArray(value.sources)) throw new Error(`Invalid Feed Response`);
  const feeds = new Map<string, RedditFeedResult>();
  for (const source of value.sources) {
    if (!isRecord(source) || typeof source.id !== `string` || !Array.isArray(source.posts)) throw new Error(`Invalid Feed Source`);
    const sourceId = source.id.trim();
    if (!knownSourceIds.has(sourceId)) throw new Error(`Unknown Feed Source`);
    const seenIds = new Set<string>();
    const seenUrls = new Set<string>();
    const posts: RedditFeedPost[] = [];
    for (const value of source.posts) {
      const post = normalizePost(value);
      if (seenIds.has(post.id) || seenUrls.has(post.url)) continue;
      seenIds.add(post.id);
      seenUrls.add(post.url);
      if (posts.length < 4) posts.push(post);
    }
    if (!feeds.has(sourceId)) feeds.set(sourceId, { posts, sourceId, status: `ready` });
  }
  return redditFeedSources.map(source => feeds.get(source.id) ?? { posts: [], sourceId: source.id, status: `unavailable` });
};

export const getRedditFeeds = async (signal: AbortSignal): Promise<RedditFeedResult[]> => {
  if (!feedEndpoint) return getUnavailableRedditFeeds();
  const response = await fetch(feedEndpoint, {
    signal,
    cache: `no-store`,
    redirect: `error`,
    credentials: `omit`,
    headers: { Accept: `application/json` },
  });
  if (response.status !== 200) throw new Error(`Feed Request Failed (${response.status})`);
  const payload: unknown = await response.json();
  return normalizeFeeds(payload);
};
