import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalStorage } from '../storage/storageConfig';
import { landingStorageKey, type LandingStorageState } from './feedback.types';

let pendingWrite = Promise.resolve();

export const readLandingState = async () => useLocalStorage ? AsyncStorage.getItem(landingStorageKey) : null;

export const writeLandingState = (state: LandingStorageState) => {
    if (!useLocalStorage) return Promise.resolve();

    const snapshot = JSON.stringify(state);
    pendingWrite = pendingWrite.catch(() => {}).then(() => AsyncStorage.setItem(landingStorageKey, snapshot));
    return pendingWrite;
};
