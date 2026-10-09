import { AppState, Platform } from 'react-native';
import { useRef, useState, useEffect, useCallback } from 'react';
import type { RedditFeedResult } from '../../shared/blog/communityFeeds';
import { getRedditFeeds, communityFeedsConnected, getUnavailableRedditFeeds } from '../../api/communityFeeds';

const pollInterval = 5 * 60 * 1000;
const requestTimeout = 15 * 1000;
const canPoll = () => Platform.OS === `web`
  ? typeof document !== `undefined` && document.visibilityState !== `hidden`
  : AppState.currentState !== `background` && AppState.currentState !== `inactive`;

export const useCommunityFeeds = () => {
  const connected = communityFeedsConnected;
  const refreshAction = useRef<() => void>(() => undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(connected);
  const [feeds, setFeeds] = useState<RedditFeedResult[]>(getUnavailableRedditFeeds);

  useEffect(() => {
    if (!connected) return;
    let mounted = true;
    let hasFetched = false;
    let activeRequest: AbortController | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const loadFeeds = async (manual = false) => {
      if (!mounted || activeRequest || (!manual && !canPoll())) return;
      const controller = new AbortController();
      activeRequest = controller;
      setLoading(!hasFetched);
      setRefreshing(hasFetched);
      timeout = setTimeout(() => controller.abort(), requestTimeout);
      try {
        const nextFeeds = await getRedditFeeds(controller.signal);
        if (controller.signal.aborted) throw new Error(`Feed Request Cancelled`);
        if (mounted && activeRequest === controller) setFeeds(nextFeeds);
      } catch {
        if (mounted && activeRequest === controller) setFeeds(getUnavailableRedditFeeds());
      } finally {
        clearTimeout(timeout);
        if (mounted && activeRequest === controller) {
          hasFetched = true;
          activeRequest = undefined;
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    refreshAction.current = () => { void loadFeeds(true); };
    const refreshIfVisible = () => { if (canPoll()) void loadFeeds(); };
    const pollTimer = setInterval(refreshIfVisible, pollInterval);
    const appSubscription = Platform.OS !== `web` ? AppState.addEventListener(`change`, refreshIfVisible) : undefined;
    if (Platform.OS === `web` && typeof document !== `undefined`) document.addEventListener(`visibilitychange`, refreshIfVisible);
    void loadFeeds();

    return () => {
      mounted = false;
      activeRequest?.abort();
      clearTimeout(timeout);
      clearInterval(pollTimer);
      appSubscription?.remove();
      refreshAction.current = () => undefined;
      if (Platform.OS === `web` && typeof document !== `undefined`) document.removeEventListener(`visibilitychange`, refreshIfVisible);
    };
  }, [connected]);

  const refresh = useCallback(() => refreshAction.current(), []);
  return { feeds, refresh, loading, connected, refreshing };
};
