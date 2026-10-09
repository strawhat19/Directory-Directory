import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from '../../shared/theme/useTheme';
import { createBlogStyles } from './BlogLayout.native.styles';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold } from '@expo-google-fonts/inter';

export const useBlogPresentation = () => {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_800ExtraBold });
  const palette = getNativePalette(isDark);
  const styles = useMemo(() => createBlogStyles(fontsLoaded, isDark), [fontsLoaded, isDark]);

  return { width, styles, palette, padding: width >= 760 ? 32 : 20 };
};
