const storageError = () => new Error(`Local Storage Is Unavailable. Enable Storage And Try Again`);

export async function readStorage(key: string): Promise<string | null> {
  if (typeof window === `undefined`) return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    throw storageError();
  }
}

export async function removeStorage(key: string): Promise<void> {
  try {
    window.localStorage.removeItem(key);
  } catch {
    throw storageError();
  }
}

export async function writeStorage(key: string, value: string): Promise<void> {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    throw storageError();
  }
}
