import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../shared/auth/useAuth';
import { useLanding } from '../../shared/landing/useLanding';
import { useLocalStorage } from '../../shared/storage/storageConfig';
import { directoryCommentLimit, emptyDirectoryFeedback } from '../../shared/landing/feedback.types';
import { categories, directoryStatuses, type DirectoryEntry } from '../../shared/catalog/catalog';
import { getDirectoryHref, getDirectoryDomain, getDirectoryDescription } from '../../shared/catalog/directoryDetails';

export const useDirectoryDetails = (directory: DirectoryEntry, scope = `page`) => {
  const auth = useAuth();
  const router = useRouter();
  const landing = useLanding();
  const pending = useRef(false);
  const [message, setMessage] = useState(``);
  const [submitting, setSubmitting] = useState(false);
  const [commentDraft, updateCommentDraft] = useState(``);
  const entry = landing.feedback?.[directory.id] ?? emptyDirectoryFeedback;
  const detailHref = getDirectoryHref(directory);
  const canComment = auth.ready && Boolean(auth.user);
  const storageMode = useLocalStorage && !landing.feedbackError ? `local` : `session`;
  const storageNotice = storageMode === `local`
    ? `Ratings, Reviews, And Comments Are Saved On This Device Only`
    : `Changes Stay In This Session Only`;

  useEffect(() => {
    setMessage(``);
    updateCommentDraft(``);
  }, [directory.id, auth.user?.id]);

  const setCommentDraft = (value: string) => {
    setMessage(``);
    updateCommentDraft(value.slice(0, directoryCommentLimit));
  };
  const requireCommentIdentity = () => {
    if (!auth.ready) {
      setMessage(`Please Wait While Your Saved Account Loads`);
      return false;
    }
    if (auth.user) return true;
    setMessage(`Sign In To Comment`);
    router.push({ pathname: `/sign-in`, params: { redirect: detailHref } });
    return false;
  };
  const addComment = async () => {
    if (pending.current || !landing.feedbackReady || !requireCommentIdentity()) return;
    if (!commentDraft.trim()) {
      setMessage(`Enter A Comment`);
      return;
    }
    pending.current = true;
    setSubmitting(true);
    try {
      await landing.addDirectoryComment(directory.id, commentDraft);
      updateCommentDraft(``);
      setMessage(`Comment Added`);
    } catch (failure) {
      setMessage(failure instanceof Error ? failure.message : `Comment Could Not Be Added`);
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  };
  const removeComment = async (commentId: string) => {
    if (pending.current || !landing.feedbackReady || !requireCommentIdentity()) return;
    pending.current = true;
    setSubmitting(true);
    try {
      await landing.removeDirectoryComment(directory.id, commentId);
      setMessage(`Comment Removed`);
    } catch (failure) {
      setMessage(failure instanceof Error ? failure.message : `Comment Could Not Be Removed`);
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  };

  return {
    entry,
    message,
    detailHref,
    addComment,
    canComment,
    submitting,
    storageMode,
    commentDraft,
    removeComment,
    storageNotice,
    setCommentDraft,
    user: auth.user,
    authReady: auth.ready,
    ready: landing.feedbackReady,
    error: landing.feedbackError,
    domain: getDirectoryDomain(directory.href),
    saved: landing.savedIds.includes(directory.id),
    identity: `directory-details-${scope}-${directory.id}`,
    toggleSaved: () => landing.toggleSaved(directory.id),
    description: getDirectoryDescription(directory),
    category: categories.find((category) => category.id === directory.category),
    statuses: directoryStatuses.filter((status) => directory.statuses.includes(status.id)),
  };
};
