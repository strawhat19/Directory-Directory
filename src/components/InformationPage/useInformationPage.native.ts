import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { createInformationStyles } from './InformationPage.native.styles';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useInformationPage() {
    const { year } = useCopyrightYear();
    const { isDark } = useTheme();
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const palette = getNativePalette(isDark);
    const styles = useMemo(() => createInformationStyles(fontsLoaded, isDark), [fontsLoaded, isDark]);

    return {
        year,
        styles,
        palette,
        padding: width >= 760 ? 32 : 20,
    };
}
