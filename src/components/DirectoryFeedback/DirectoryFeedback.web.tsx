import './DirectoryFeedback.scss';
import Icon from '../Icon/Icon';
import type { DirectoryFeedbackProps } from './DirectoryFeedback.types';
import { ratingValues, useDirectoryFeedback } from './useDirectoryFeedback';

export default function DirectoryFeedback(props: DirectoryFeedbackProps) {
  const {
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
  } = useDirectoryFeedback(props);

  return (
    <div id={identity} className={`directory-feedback`}>
      <div id={`${identity}-footer`} className={`directory-feedback__footer`}>
        <button
          type={`button`}
          onClick={toggleReview}
          disabled={!feedbackReady}
          aria-expanded={reviewOpen}
          id={`${identity}-review-toggle`}
          className={`directory-feedback__review-toggle`}
          aria-controls={`${identity}-review-panel`}
        >
          <Icon
            size={14}
            name={`file-text`}
            id={`${identity}-review-icon`}
            className={`directory-feedback__review-icon`}
          />
          <span id={`${identity}-review-toggle-label`} className={`directory-feedback__review-toggle-label`}>
            {entry.review ? `Edit Review` : `Write Review`}
          </span>
        </button>
        <div id={`${identity}-controls`} className={`directory-feedback__controls`}>
          <div
            role={`group`}
            id={`${identity}-votes`}
            className={`directory-feedback__votes`}
            aria-label={`Your Vote For ${directoryName}`}
          >
            <button
              type={`button`}
              disabled={!feedbackReady}
              onClick={() => vote(1)}
              id={`${identity}-upvote`}
              aria-pressed={entry.vote === 1}
              aria-label={`Upvote ${directoryName}`}
              className={`directory-feedback__vote directory-feedback__vote--up${entry.vote === 1 ? ` is-selected` : ``}`}
            >
              <Icon
                size={16}
                name={`upvote`}
                id={`${identity}-upvote-icon`}
                className={`directory-feedback__vote-icon`}
              />
            </button>
            <button
              type={`button`}
              disabled={!feedbackReady}
              onClick={() => vote(-1)}
              id={`${identity}-downvote`}
              aria-pressed={entry.vote === -1}
              aria-label={`Downvote ${directoryName}`}
              className={`directory-feedback__vote directory-feedback__vote--down${entry.vote === -1 ? ` is-selected` : ``}`}
            >
              <Icon
                size={16}
                name={`downvote`}
                id={`${identity}-downvote-icon`}
                className={`directory-feedback__vote-icon`}
              />
            </button>
          </div>
          <div
            role={`group`}
            id={`${identity}-rating`}
            className={`directory-feedback__rating`}
            aria-label={`Your Rating For ${directoryName}`}
          >
            <div id={`${identity}-stars`} className={`directory-feedback__stars`}>
              {ratingValues.map((value) => (
                <button
                  key={value}
                  type={`button`}
                  disabled={!feedbackReady}
                  onClick={() => rate(value)}
                  id={`${identity}-star-${value}`}
                  aria-pressed={entry.rating === value}
                  aria-label={entry.rating === value ? `Clear Your ${value}-Star Rating For ${directoryName}` : `Rate ${directoryName} ${value} Of 5 Stars`}
                  className={`directory-feedback__star${entry.rating >= value ? ` is-selected` : ``}`}
                >
                  <Icon
                    size={16}
                    name={`star`}
                    filled={entry.rating >= value}
                    id={`${identity}-star-${value}-icon`}
                    className={`directory-feedback__star-icon`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {reviewOpen ? (
        <form
          id={`${identity}-review-panel`}
          className={`directory-feedback__review-panel`}
          onSubmit={(event) => {
            event.preventDefault();
            saveReview();
          }}
        >
          <label
            id={`${identity}-review-label`}
            className={`directory-feedback__review-label`}
            htmlFor={`${identity}-review-input`}
          >
            {`Your Review`}
          </label>
          <textarea
            rows={3}
            maxLength={600}
            value={reviewDraft}
            id={`${identity}-review-input`}
            className={`directory-feedback__review-input`}
            placeholder={`What Was Helpful About ${directoryName}?`}
            onChange={(event) => updateReviewDraft(event.target.value)}
          />
          <div id={`${identity}-review-actions`} className={`directory-feedback__review-actions`}>
            <span id={`${identity}-review-length`} className={`directory-feedback__review-length`}>
              {`${reviewDraft.length}/600`}
            </span>
            <button
              type={`button`}
              onClick={toggleReview}
              id={`${identity}-review-cancel`}
              className={`directory-feedback__review-cancel`}
            >
              <Icon
                size={13}
                name={`close`}
                id={`${identity}-cancel-icon`}
                className={`directory-feedback__cancel-icon`}
              />
              <span id={`${identity}-cancel-label`} className={`directory-feedback__cancel-label`}>
                {`Cancel`}
              </span>
            </button>
            <button
              type={`submit`}
              disabled={!feedbackReady}
              id={`${identity}-review-save`}
              className={`directory-feedback__review-save`}
            >
              <Icon
                size={13}
                name={`check`}
                id={`${identity}-save-icon`}
                className={`directory-feedback__save-icon`}
              />
              <span id={`${identity}-save-label`} className={`directory-feedback__save-label`}>
                {`Save Review`}
              </span>
            </button>
          </div>
        </form>
      ) : entry.review ? (
        <p id={`${identity}-review-text`} className={`directory-feedback__review-text`}>
          {entry.review}
        </p>
      ) : null}
      {feedbackError || message ? (
        <p id={`${identity}-message`} className={`directory-feedback__message${feedbackError ? ` is-error` : ``}`} role={`status`}>
          {feedbackError ?? message}
        </p>
      ) : null}
    </div>
  );
}
