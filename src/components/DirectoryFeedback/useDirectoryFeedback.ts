import { useEffect, useState } from 'react';
import { useLanding } from '../../shared/landing/useLanding';
import type { DirectoryFeedbackProps } from './DirectoryFeedback.types';
import { emptyDirectoryFeedback } from '../../shared/landing/feedback.types';

export const ratingValues = [1, 2, 3, 4, 5] as const;

export const useDirectoryFeedback = ({ directoryId, directoryName }: DirectoryFeedbackProps) => {
  const {
    feedback,
    feedbackReady,
    feedbackError,
    setDirectoryVote,
    setDirectoryRating,
    setDirectoryReview,
  } = useLanding();
  const entry = feedback[directoryId] ?? emptyDirectoryFeedback;
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewDraft, setReviewDraft] = useState(entry.review);
  const [message, setMessage] = useState(``);
  const identity = `directory-feedback-${directoryId}`;

  useEffect(() => {
    if (!reviewOpen) setReviewDraft(entry.review);
  }, [entry.review, reviewOpen]);

  const updateReviewDraft = (value: string) => {
    setMessage(``);
    setReviewDraft(value.slice(0, 600));
  };
  const toggleReview = () => {
    setMessage(``);
    setReviewOpen((open) => !open);
  };
  const saveReview = () => {
    if (reviewDraft.trim() && !entry.rating) {
      setMessage(`Choose A Star Rating To Save Your Review`);
      return;
    }
    setDirectoryReview(directoryId, reviewDraft);
    setMessage(reviewDraft.trim() ? `Review Saved` : `Review Removed`);
    setReviewOpen(false);
  };
  const vote = (value: -1 | 1) => {
    setDirectoryVote(directoryId, value);
    setMessage(entry.vote === value ? `Vote Removed` : `Vote Saved`);
  };
  const rate = (value: number) => {
    setDirectoryRating(directoryId, entry.rating === value ? 0 : value);
    setMessage(entry.rating === value ? `Rating Removed` : `Rating Saved`);
  };

  return {
    rate,
    vote,
    entry,
    message,
    identity,
    saveReview,
    reviewOpen,
    reviewDraft,
    toggleReview,
    feedbackReady,
    feedbackError,
    directoryName,
    updateReviewDraft,
  };
};
