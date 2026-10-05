import { useAuthPage } from './useAuthPage';
import type { AuthMode } from './AuthPage.types';
import { useTheme } from '../../shared/theme/useTheme';
import { useRef, useMemo, useState, useEffect } from 'react';
import { createAuthStyles } from './AuthPage.native.styles';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { Easing, Animated, AccessibilityInfo, useWindowDimensions } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useNativeAuthPage(mode: AuthMode) {
    const form = useAuthPage(mode);
    const { isDark } = useTheme();
    const { year } = useCopyrightYear();
    const { width } = useWindowDimensions();
    const reveal = useRef(new Animated.Value(1)).current;
    const [reducedMotion, setReducedMotion] = useState(true);
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const palette = getNativePalette(isDark);
    const styles = useMemo(() => createAuthStyles(fontsLoaded, isDark), [fontsLoaded, isDark]);

    useEffect(() => {
        let mounted = true;
        void AccessibilityInfo.isReduceMotionEnabled()
            .then(value => { if (mounted) setReducedMotion(value); })
            .catch(() => undefined);
        const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, setReducedMotion);
        return () => { mounted = false; subscription.remove(); };
    }, []);

    useEffect(() => {
        reveal.stopAnimation();
        if (reducedMotion) { reveal.setValue(1); return; }
        reveal.setValue(0);
        const animation = Animated.timing(reveal, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
            easing: Easing.out(Easing.cubic),
        });
        animation.start();
        return () => animation.stop();
    }, [form.step, form.ready, reducedMotion, reveal]);

    return {
        year,
        ...form,
        styles,
        palette,
        wide: width >= 900,
        padding: width >= 760 ? 32 : 20,
        revealStyle: {
            opacity: reveal,
            transform: [{ translateY: reveal.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
        },
    };
}
