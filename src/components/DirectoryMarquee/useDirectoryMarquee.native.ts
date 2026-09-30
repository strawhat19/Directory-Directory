import { useEffect, useRef, useState } from 'react';
import {
  Linking,
  AppState,
  ScrollView,
  AccessibilityInfo,
  type NativeScrollEvent,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  type NativeSyntheticEvent,
} from 'react-native';

const pixelsPerSecond = 26;
const movementThreshold = 8;

export function useDirectoryMarquee() {
  const scroll = useRef<ScrollView>(null);
  const offset = useRef(0);
  const dragged = useRef(false);
  const interacting = useRef(false);
  const touchOrigin = useRef({ x: 0, y: 0 });
  const [paused, setPaused] = useState(false);
  const [cycleWidth, setCycleWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [appActive, setAppActive] = useState(
    AppState.currentState !== `background` && AppState.currentState !== `inactive`,
  );
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isPlaying = !paused && !reduceMotion;
  const copyCount = cycleWidth > 0
    ? Math.max(3, Math.ceil(viewportWidth / cycleWidth) + 3)
    : 3;
  const copies = Array.from({ length: copyCount }, (_, index) => index);

  const clearResumeTimer = () => {
    if (resumeTimer.current === null) return;

    clearTimeout(resumeTimer.current);
    resumeTimer.current = null;
  };

  const wrapOffset = () => {
    if (cycleWidth <= 0) return;

    offset.current = cycleWidth + ((offset.current % cycleWidth) + cycleWidth) % cycleWidth;
    scroll.current?.scrollTo({ x: offset.current, animated: false });
  };

  const pauseInteraction = () => {
    clearResumeTimer();
    interacting.current = true;
  };

  const releaseInteraction = () => {
    clearResumeTimer();
    resumeTimer.current = setTimeout(() => {
      wrapOffset();
      interacting.current = false;
      dragged.current = false;
      resumeTimer.current = null;
    }, 250);
  };

  const onTouchStart = (event: GestureResponderEvent) => {
    pauseInteraction();
    dragged.current = false;
    touchOrigin.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  };

  const onTouchMove = (event: GestureResponderEvent) => {
    const deltaX = Math.abs(event.nativeEvent.pageX - touchOrigin.current.x);
    const deltaY = Math.abs(event.nativeEvent.pageY - touchOrigin.current.y);

    if (deltaX > movementThreshold || deltaY > movementThreshold) {
      dragged.current = true;
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (interacting.current) offset.current = event.nativeEvent.contentOffset.x;
  };

  const onScrollBeginDrag = () => {
    pauseInteraction();
    dragged.current = true;
  };

  const openDirectory = (href: string) => {
    if (dragged.current) return;

    void Linking.openURL(href).catch(() => undefined);
  };

  const measureCycle = (event: LayoutChangeEvent) => {
    setCycleWidth(event.nativeEvent.layout.width);
  };

  const measureViewport = (event: LayoutChangeEvent) => {
    setViewportWidth(event.nativeEvent.layout.width);
  };

  useEffect(() => {
    let mounted = true;
    const updateMotion = (enabled: boolean) => {
      if (mounted) setReduceMotion(enabled);
    };

    AccessibilityInfo.isReduceMotionEnabled()
      .then(updateMotion)
      .catch(() => updateMotion(false));

    const motionSubscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, updateMotion);
    const appSubscription = AppState.addEventListener(`change`, (state) => {
      setAppActive(state === `active`);

      if (state === `active`) {
        interacting.current = false;
        dragged.current = false;
      }
    });

    return () => {
      mounted = false;
      clearResumeTimer();
      appSubscription.remove();
      motionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (cycleWidth <= 0 || interacting.current) return;

    offset.current = cycleWidth + ((offset.current % cycleWidth) + cycleWidth) % cycleWidth;
    scroll.current?.scrollTo({ x: offset.current, animated: false });
  }, [cycleWidth, viewportWidth]);

  useEffect(() => {
    if (!isPlaying || !appActive || cycleWidth <= 0) return;

    let frame = 0;
    let previousTime: number | null = null;

    const animate = (time: number) => {
      const elapsed = previousTime === null ? 0 : Math.min(time - previousTime, 64);
      previousTime = time;

      if (!interacting.current) {
        const nextOffset = offset.current + pixelsPerSecond * elapsed / 1000;
        offset.current = cycleWidth + ((nextOffset % cycleWidth) + cycleWidth) % cycleWidth;
        scroll.current?.scrollTo({ x: offset.current, animated: false });
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [appActive, cycleWidth, isPlaying]);

  return {
    copies,
    scroll,
    onScroll,
    isPlaying,
    reduceMotion,
    onTouchMove,
    measureCycle,
    onTouchStart,
    openDirectory,
    measureViewport,
    pauseInteraction,
    releaseInteraction,
    onScrollBeginDrag,
    togglePaused: () => setPaused((current) => !current),
  };
}
