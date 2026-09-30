import { useMemo } from 'react';
import { useContactForm } from './useContactForm';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { createContactStyles } from './ContactPage.native.styles';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useContactPage() {
    const form = useContactForm();
    const { year } = useCopyrightYear();
    const { isDark } = useTheme();
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const palette = getNativePalette(isDark);
    const styles = useMemo(() => createContactStyles(fontsLoaded, isDark), [fontsLoaded, isDark]);

    return {
        year,
        ...form,
        styles,
        palette,
        padding: width >= 760 ? 32 : 20,
    };
}
