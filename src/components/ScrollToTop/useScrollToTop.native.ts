import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { createScrollToTopStyles } from './ScrollToTop.native.styles';

export function useScrollToTop(visible: boolean, reduceMotion = false, overPricing = false) {
    const { isDark } = useTheme();
    const accent = useSearchAccent();
    const { bottom } = useSafeAreaInsets();
    const progress = useRef(new Animated.Value(0)).current;
    const pricingProgress = useRef(new Animated.Value(overPricing ? 1 : 0)).current;
    const palette = getNativePalette(isDark, accent);
    const styles = useMemo(() => createScrollToTopStyles(palette), [isDark, accent]);

    useEffect(() => {
        const animation = Animated.timing(progress, {
            toValue: visible ? 1 : 0,
            duration: reduceMotion ? 0 : 250,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        });

        animation.start();
        return () => animation.stop();
    }, [visible, progress, reduceMotion]);

    useEffect(() => {
        const animation = Animated.timing(pricingProgress, {
            toValue: overPricing ? 1 : 0,
            duration: reduceMotion ? 0 : 280,
            easing: Easing.inOut(Easing.cubic),
            useNativeDriver: false,
        });

        animation.start();
        return () => animation.stop();
    }, [overPricing, pricingProgress, reduceMotion]);

    return {
        styles,
        palette,
        pricingIconStyle: { opacity: pricingProgress },
        defaultIconStyle: {
            opacity: pricingProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
            }),
        },
        backgroundStyle: {
            backgroundColor: pricingProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [palette.blue, palette.background],
            }),
        },
        positionStyle: { bottom: bottom + 20 },
        animationStyle: {
            opacity: progress,
            transform: [{
                translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 0],
                }),
            }],
        },
    };
}
