import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseTheme, themeStorageKey, type Theme } from './theme.types';

export const readTheme = async () => parseTheme(await AsyncStorage.getItem(themeStorageKey));

export const writeTheme = async (theme: Theme) => {
  await AsyncStorage.setItem(themeStorageKey, theme);
};
