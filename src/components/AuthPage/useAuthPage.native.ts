import { useMemo } from 'react';
import { useAuthPage } from './useAuthPage';
import type { AuthMode } from './AuthPage.types';
import { useWindowDimensions } from 'react-native';
import { createAuthStyles } from './AuthPage.native.styles';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export function useNativeAuthPage(mode: AuthMode) {
    const form = useAuthPage(mode);
    const { year } = useCopyrightYear();
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const styles = useMemo(() => createAuthStyles(fontsLoaded), [fontsLoaded]);

    return {
        year,
        ...form,
        styles,
        padding: width >= 760 ? 32 : 20,
    };
}
