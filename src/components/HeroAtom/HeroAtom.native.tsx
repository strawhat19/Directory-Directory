import { useMemo } from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { heroAtomOrbits, useHeroAtom } from './useHeroAtom.native';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { createHeroAtomStyles } from './HeroAtom.native.styles';

export default function HeroAtom() {
    const { isDark } = useTheme();
    const palette = getNativePalette(isDark);
    const { electronStyles, nucleusStyle } = useHeroAtom();
    const styles = useMemo(() => createHeroAtomStyles(palette.ink), [palette.ink]);

    return (
        <View
            {...elementProps(`hero-atom`)}
            style={styles.atom}
            pointerEvents={`none`}
            accessibilityElementsHidden
            importantForAccessibility={`no-hide-descendants`}
        >
            <View
                {...elementProps(`hero-atom-stage`)}
                style={styles.stage}
            >
                <View
                    {...elementProps(`hero-atom-halo`)}
                    style={styles.halo}
                />
                {heroAtomOrbits.map((orbit, index) => (
                    <View
                        {...elementProps(`hero-atom-orbit`, orbit.id)}
                        key={orbit.id}
                        style={styles.orbit}
                    >
                        <View
                            {...elementProps(`hero-atom-track`, orbit.id)}
                            style={[
                                styles.track,
                                { borderColor: orbit.color, transform: [{ rotate: `${orbit.tilt}deg` }] },
                            ]}
                        />
                        <Animated.View
                            {...elementProps(`hero-atom-electron`, orbit.id)}
                            style={[styles.electron, electronStyles[index]]}
                        >
                            <View
                                {...elementProps(`hero-atom-electron-glow`, orbit.id)}
                                style={[styles.electronGlow, { backgroundColor: orbit.color }]}
                            />
                            <View
                                {...elementProps(`hero-atom-electron-core`, orbit.id)}
                                style={[styles.electronCore, { backgroundColor: orbit.color }]}
                            />
                        </Animated.View>
                    </View>
                ))}
                <Animated.View
                    {...elementProps(`hero-atom-nucleus`)}
                    style={[styles.nucleus, nucleusStyle]}
                >
                    <View
                        {...elementProps(`hero-atom-nucleus-core`)}
                        style={styles.nucleusCore}
                    />
                </Animated.View>
            </View>
        </View>
    );
}
