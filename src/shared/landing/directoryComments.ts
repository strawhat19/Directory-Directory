import { authAPI } from '../../api/auth';
import { createRecordId } from '../common/ids';
import { useLocalStorage } from '../storage/storageConfig';
import { readStorage, writeStorage } from '../auth/authStorage';
import { directoryCommentLimit, type DirectoryComment } from './feedback.types';

const counterKey = `directory-directory:comments:next-number:v1`;
let pendingOperation: Promise<unknown> = Promise.resolve();

const runCommentOperation = <T,>(operation: () => Promise<T>): Promise<T> => {
  const run = () => typeof navigator !== `undefined` && navigator.locks?.request
    ? navigator.locks.request(counterKey, operation)
    : operation();
  const result = pendingOperation.then(run, run);
  pendingOperation = result.then(() => undefined, () => undefined);
  return result;
};

export const getCommentAuthor = async () => {
  const session = await authAPI.restoreSession();
  if (!session?.user) throw new Error(`Sign In To Comment`);
  return session.user;
};

export const createDirectoryComment = (textValue: string, minimumNumber: number): Promise<DirectoryComment> => runCommentOperation(async () => {
  const author = await getCommentAuthor();
  const text = textValue.trim();
  if (!text || text.length > directoryCommentLimit) throw new Error(`Enter A Comment Of 1 To ${directoryCommentLimit} Characters`);
  const stored = useLocalStorage ? await readStorage(counterKey) : null;
  let savedNumber = 1;
  if (stored !== null) {
    savedNumber = Number(stored);
    if (!Number.isSafeInteger(savedNumber) || savedNumber < 1) throw new Error(`Saved Comment Numbers Could Not Be Read`);
  }
  const number = Math.max(savedNumber, minimumNumber);
  if (!Number.isSafeInteger(number) || number >= Number.MAX_SAFE_INTEGER) throw new Error(`Comment Numbers Are Unavailable`);
  const created = new Date().toISOString();
  const id = await createRecordId(`Comment`, number, author.name, created);
  if (useLocalStorage) await writeStorage(counterKey, String(number + 1));
  return { id, text, number, created, authorId: author.id, authorName: author.name };
});
