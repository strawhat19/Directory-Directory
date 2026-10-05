import { createSecureUuid } from './password';

export const createUserId = async (number: number, name: string, date: string) => {
  const uuid = await createSecureUuid();
  const label = name.trim().replace(/[^a-z\d]+/gi, `-`).replace(/^-|-$/g, ``) || `Account`;
  return `User_${number}_${label}_${date.slice(0, 10)}_${uuid}`;
};
