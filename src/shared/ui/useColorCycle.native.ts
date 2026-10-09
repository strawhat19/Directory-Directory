import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, AppState, AccessibilityInfo } from 'react-native';

export const useColorCycle = (enabled = true) => {
  const background = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(true);
  const [appActive, setAppActive] = useState(AppState.currentState !== `background` && AppState.currentState !== `inactive`);

  useEffect(() => {
    let mounted = true;
    const updateMotion = (reduced: boolean) => {
      if (mounted) setReduceMotion(reduced);
    };

    AccessibilityInfo.isReduceMotionEnabled().then(updateMotion).catch(() => updateMotion(false));
    const motionSubscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, updateMotion);
    const appSubscription = AppState.addEventListener(`change`, (state) => setAppActive(state === `active`));

    return () => {
      mounted = false;
      appSubscription.remove();
      motionSubscription.remove();
    };
  }, []);

  useEffect(() => {
    background.setValue(0);
    if (!enabled || reduceMotion || !appActive) return;

    const animation = Animated.loop(Animated.timing(background, {
      toValue: 1,
      duration: 36000,
      isInteraction: false,
      easing: Easing.linear,
      useNativeDriver: false,
    }));

    animation.start();
    return () => animation.stop();
  }, [enabled, appActive, background, reduceMotion]);

  return { backgroundStyle: { backgroundColor: background.interpolate({ inputRange: [0, 1 / 3, 2 / 3, 1], outputRange: [`#0869df`, `#6d43bb`, `#157b4a`, `#0869df`] }) } };
};
