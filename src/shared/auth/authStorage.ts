import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStorageKey, parseAuthData, type AuthData } from './auth.types';

export async function readAuthData() {
  return parseAuthData(await AsyncStorage.getItem(authStorageKey));
}

export async function writeAuthData(data: AuthData) {
  await AsyncStorage.setItem(authStorageKey, JSON.stringify(data));
}
