import { useLocalStorage } from '../storage/storageConfig';
import { landingStorageKey, type LandingStorageState } from './feedback.types';

export const readLandingState = async () => useLocalStorage ? window.localStorage.getItem(landingStorageKey) : null;

export const writeLandingState = async (state: LandingStorageState) => {
    if (useLocalStorage) window.localStorage.setItem(landingStorageKey, JSON.stringify(state));
};
