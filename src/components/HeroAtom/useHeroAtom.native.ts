import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing } from 'react-native';

export const heroAtomOrbits = [
    { id: `green`, color: `#21a668`, tilt: -60, phase: 0.12, duration: 12000 },
    { id: `blue`, color: `#0874f9`, tilt: 0, phase: 0.48, duration: 15000 },
    { id: `red`, color: `#d83b42`, tilt: 60, phase: 0.76, duration: 18000 },
];

const orbitSteps = Array.from({ length: 97 }, (_, index) => index / 96);

export function useHeroAtom() {
    const pulse = useRef(new Animated.Value(0)).current;
    const [reduceMotion, setReduceMotion] = useState(true);
    const progress = useRef(heroAtomOrbits.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        let active = true;
        const updateMotion = (enabled: boolean) => {
            if (active) setReduceMotion(enabled);
        };

        AccessibilityInfo.isReduceMotionEnabled()
            .then(updateMotion)
            .catch(() => updateMotion(false));

        const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, updateMotion);

        return () => {
            active = false;
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        pulse.setValue(0);
        progress.forEach((value) => value.setValue(0));
        if (reduceMotion) return;

        const animation = Animated.parallel([
            ...progress.map((value, index) => Animated.loop(Animated.timing(value, {
                toValue: 1,
                easing: Easing.linear,
                isInteraction: false,
                useNativeDriver: true,
                duration: heroAtomOrbits[index].duration,
            }))),
            Animated.loop(Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1,
                    duration: 2400,
                    isInteraction: false,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.sin),
                }),
                Animated.timing(pulse, {
                    toValue: 0,
                    duration: 2400,
                    isInteraction: false,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.sin),
                }),
            ])),
        ]);

        animation.start();
        return () => animation.stop();
    }, [progress, pulse, reduceMotion]);

    const electronStyles = heroAtomOrbits.map((orbit, index) => {
        const tilt = orbit.tilt * Math.PI / 180;
        const positions = orbitSteps.map((step) => {
            const angle = (step + orbit.phase) * Math.PI * 2;
            const x = 140 * Math.cos(angle);
            const y = 56 * Math.sin(angle);

            return {
                x: x * Math.cos(tilt) - y * Math.sin(tilt),
                y: x * Math.sin(tilt) + y * Math.cos(tilt),
            };
        });

        return {
            transform: [
                { translateX: progress[index].interpolate({
                    inputRange: orbitSteps,
                    outputRange: positions.map((position) => position.x),
                }) },
                { translateY: progress[index].interpolate({
                    inputRange: orbitSteps,
                    outputRange: positions.map((position) => position.y),
                }) },
            ],
        };
    });

    return {
        electronStyles,
        nucleusStyle: {
            transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }) }],
        },
    };
}
