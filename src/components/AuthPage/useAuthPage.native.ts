import { useMemo } from 'react';
import { useAuthPage } from './useAuthPage';
import type { AuthMode } from './AuthPage.types';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { createAuthStyles } from './AuthPage.native.styles';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useNativeAuthPage(mode: AuthMode) {
    const form = useAuthPage(mode);
    const { year } = useCopyrightYear();
    const { isDark } = useTheme();
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const palette = getNativePalette(isDark);
    const styles = useMemo(() => createAuthStyles(fontsLoaded, isDark), [fontsLoaded, isDark]);

    return {
        year,
        ...form,
        styles,
        palette,
        padding: width >= 760 ? 32 : 20,
    };
}
