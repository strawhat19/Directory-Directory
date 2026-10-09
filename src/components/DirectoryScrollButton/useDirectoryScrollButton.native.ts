import { useEffect, useMemo, useRef, useState } from 'react';
import { searchScopes } from '../../shared/landing/searchScopes';
import { Animated, Easing, AccessibilityInfo } from 'react-native';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';

const scopeIndices = searchScopes.map((_, index) => index);
const scopeColors = searchScopes.map((scope) => scope.color);

export const useDirectoryScrollButton = (enabled = true) => {
  const accent = useSearchAccent();
  const scopeIndex = Math.max(0, searchScopes.findIndex((scope) => scope.color === accent.color));
  const background = useRef(new Animated.Value(scopeIndex)).current;
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    let mounted = true;
    const updateMotion = (reduced: boolean) => {
      if (mounted) setReduceMotion(reduced);
    };

    AccessibilityInfo.isReduceMotionEnabled().then(updateMotion).catch(() => updateMotion(true));
    const motionSubscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, updateMotion);

    return () => {
      mounted = false;
      motionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!enabled || reduceMotion) {
      background.setValue(scopeIndex);
      return;
    }

    const animation = Animated.timing(background, {
      duration: 350,
      toValue: scopeIndex,
      isInteraction: false,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.cubic),
    });

    animation.start();
    return () => animation.stop();
  }, [enabled, background, scopeIndex, reduceMotion]);

  const backgroundStyle = useMemo(() => ({
    backgroundColor: background.interpolate({ inputRange: scopeIndices, outputRange: scopeColors }),
  }), [background]);

  return { backgroundStyle };
};
