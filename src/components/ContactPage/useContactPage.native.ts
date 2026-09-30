import { useMemo } from 'react';
import { useContactForm } from './useContactForm';
import { useWindowDimensions } from 'react-native';
import { createContactStyles } from './ContactPage.native.styles';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useContactPage() {
    const form = useContactForm();
    const { year } = useCopyrightYear();
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const styles = useMemo(() => createContactStyles(fontsLoaded), [fontsLoaded]);

    return {
        year,
        ...form,
        styles,
        padding: width >= 760 ? 32 : 20,
    };
}
