import { createSecureUuid } from '../auth/password';

export const createRecordId = async (type: string, number: number, name: string, date: string) => {
  const uuid = await createSecureUuid();
  const label = name.trim().replace(/[^a-z\d]+/gi, `-`).replace(/^-|-$/g, ``) || `Record`;
  return `${type}_${number}_${label}_${date.slice(0, 10)}_${uuid}`;
};
