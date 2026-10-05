import AsyncStorage from '@react-native-async-storage/async-storage';

const storageError = () => new Error(`Device Storage Is Unavailable. Enable Storage And Try Again`);

export async function readStorage(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    throw storageError();
  }
}

export async function removeStorage(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    throw storageError();
  }
}

export async function writeStorage(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    throw storageError();
  }
}
