import { authStorageKey, parseAuthData, type AuthData } from './auth.types';

export async function readAuthData() {
  return parseAuthData(window.localStorage.getItem(authStorageKey));
}

export async function writeAuthData(data: AuthData) {
  window.localStorage.setItem(authStorageKey, JSON.stringify(data));
}
