import { useEffect, useState } from 'react';
import type { RefObject } from 'react';
import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { styles } from './GlassBackdrop.native.styles';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';

type GlassBackdropProps = {
    scope: string;
    blurTarget: RefObject<View | null>;
};

export default function GlassBackdrop({ scope, blurTarget }: GlassBackdropProps) {
    const { isDark } = useTheme();
    const [targetMounted, setTargetMounted] = useState(Platform.OS !== `android`);

    useEffect(() => {
        setTargetMounted(true);
    }, []);

    if (!targetMounted) {
        return (
            <View
                {...elementProps(`glass-backdrop`, scope)}
                pointerEvents={`none`}
                style={[styles.backdrop, isDark && styles.darkBackdrop]}
            />
        );
    }

    return (
        <BlurView
            {...elementProps(`glass-backdrop`, scope)}
            tint={isDark ? `dark` : `light`}
            intensity={50}
            blurTarget={blurTarget}
            blurMethod={`dimezisBlurView`}
            pointerEvents={`none`}
            style={[styles.backdrop, isDark && styles.darkBackdrop]}
        />
    );
}
