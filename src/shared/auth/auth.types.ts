export type DemoUser = {
  name: string;
  email: string;
};

export type AuthData = {
  profiles: DemoUser[];
  sessionEmail: string | null;
};

export const emptyAuthData: AuthData = { profiles: [], sessionEmail: null };
export const authStorageKey = `directory-directory.demo-auth.v1`;

export function parseAuthData(value: string | null): AuthData {
  if (!value) return emptyAuthData;

  try {
    const data: unknown = JSON.parse(value);

    if (!data || typeof data !== `object` || !(`profiles` in data)) return emptyAuthData;
    if (!Array.isArray(data.profiles)) return emptyAuthData;

    const profiles = data.profiles.filter((profile): profile is DemoUser => (
      Boolean(profile)
      && typeof profile === `object`
      && typeof profile.name === `string`
      && typeof profile.email === `string`
    ));
    const sessionEmail = `sessionEmail` in data && typeof data.sessionEmail === `string`
      ? data.sessionEmail
      : null;

    return { profiles, sessionEmail };
  } catch {
    return emptyAuthData;
  }
}
