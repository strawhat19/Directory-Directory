import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { createInformationStyles } from './InformationPage.native.styles';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useInformationPage() {
    const { year } = useCopyrightYear();
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const styles = useMemo(() => createInformationStyles(fontsLoaded), [fontsLoaded]);

    return {
        year,
        styles,
        padding: width >= 760 ? 32 : 20,
    };
}
