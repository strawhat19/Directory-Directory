import './DirectoryDetails.scss';
import Icon from '../Icon/Icon';
import { Link, type Href } from 'expo-router';
import { useDirectoryDetails } from './useDirectoryDetails';
import type { DirectoryEntry } from '../../shared/catalog/catalog';
import DirectoryFeedback from '../DirectoryFeedback/DirectoryFeedback';
import { directoryCommentLimit } from '../../shared/landing/feedback.types';
import useDirectoryCardPreview from '../DirectoryCardPreview/useDirectoryCardPreview';
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement';

type DirectoryDetailsProps = {
  scope?: string;
  directory: DirectoryEntry;
  onNavigate?: () => void;
};

export default function DirectoryDetails({ directory, scope = `page`, onNavigate }: DirectoryDetailsProps) {
  const {
    user, entry, saved, ready, error, domain, message, identity, category, statuses,
    authReady, canComment, submitting, detailHref, description, toggleSaved,
    commentDraft, storageNotice, setCommentDraft, addComment, removeComment,
  } = useDirectoryDetails(directory, scope);
  const { hideImage, imageSource } = useDirectoryCardPreview(directory.previewImage);
  const Title = scope === `modal` ? `h2` : `h1`;
  const comments = entry.comments ?? [];
  const scrollToSection = (section: string) => {
    const selector = `#${identity}-${section.toLowerCase()}`;
    if (scope !== `modal`) return smoothScrollToElement(selector);
    const target = document.querySelector<HTMLElement>(selector);
    const dialog = target?.closest(`dialog`);
    if (!target || !dialog) return;
    const toolbarHeight = dialog.querySelector<HTMLElement>(`.directory-preview__toolbar`)?.offsetHeight ?? 0;
    dialog.scrollTo({
      top: dialog.scrollTop + target.getBoundingClientRect().top - dialog.getBoundingClientRect().top - toolbarHeight - 12,
      behavior: window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ? `auto` : `smooth`,
    });
  };

  return (
    <article id={identity} className={`directory-details directory-details--${directory.accent}`}>
      <header id={`${identity}-header`} className={`directory-details__header`}>
        <div id={`${identity}-heading-row`} className={`directory-details__heading-row`}>
          <span aria-hidden={`true`} id={`${identity}-monogram`} className={`directory-details__monogram`}>{directory.initials}</span>
          <div id={`${identity}-heading`} className={`directory-details__heading`}>
            <p id={`${identity}-eyebrow`} className={`directory-details__eyebrow`}>
              <Icon size={14} name={category?.icon ?? `folder`} id={`${identity}-category-icon`} />
              <span id={`${identity}-category-name`} className={`directory-details__category-name`}>{`${category?.label ?? `Directory`} / Directory Details`}</span>
            </p>
            <Title id={`${identity}-title`} className={`directory-details__title`}>{directory.name}</Title>
          </div>
        </div>
        <p id={`${identity}-description`} className={`directory-details__description`}>{description}</p>
        <div id={`${identity}-actions`} className={`directory-details__actions`}>
          <a target={`_blank`} href={directory.href} rel={`noopener noreferrer`} id={`${identity}-visit`} className={`directory-details__action directory-details__action--primary`}>
            <Icon size={16} name={`arrow-up-right`} id={`${identity}-visit-icon`} />
            <span id={`${identity}-visit-label`} className={`directory-details__action-label`}>{`Visit Directory`}</span>
          </a>
          {scope === `modal` && (
            <Link href={detailHref as Href} onClick={onNavigate} id={`${identity}-page-link`} className={`directory-details__action`}>
              <Icon size={15} name={`file-text`} id={`${identity}-page-icon`} />
              <span id={`${identity}-page-label`} className={`directory-details__action-label`}>{`Open Details Page`}</span>
            </Link>
          )}
          <button type={`button`} disabled={!ready} onClick={toggleSaved} aria-pressed={saved} id={`${identity}-save`} className={`directory-details__action${saved ? ` is-saved` : ``}`}>
            <Icon size={15} name={saved ? `check` : `bookmark`} id={`${identity}-save-icon`} />
            <span id={`${identity}-save-label`} className={`directory-details__action-label`}>{saved ? `Saved` : `Save Directory`}</span>
          </button>
        </div>
      </header>
      <nav id={`${identity}-section-navigation`} className={`directory-details__section-navigation`} aria-label={`Directory details sections`}>
        {([`Overview`, `Reviews`, `Comments`] as const).map((section) => (
          <button key={section} type={`button`} id={`${identity}-nav-${section.toLowerCase()}`} className={`directory-details__section-link`} onClick={() => scrollToSection(section)}>
            <span id={`${identity}-nav-label-${section.toLowerCase()}`} className={`directory-details__section-label`}>{section}</span>
            {section === `Comments` && <span id={`${identity}-comment-count`} className={`directory-details__section-count`}>{comments.length}</span>}
          </button>
        ))}
      </nav>
      <div id={`${identity}-layout`} className={`directory-details__layout`}>
        <div id={`${identity}-content`} className={`directory-details__content`}>
          <section id={`${identity}-overview`} className={`directory-details__panel`} aria-labelledby={`${identity}-overview-heading`}>
            <h2 id={`${identity}-overview-heading`} className={`directory-details__section-title`}><Icon size={17} name={`info`} id={`${identity}-overview-icon`} />{`Overview`}</h2>
            <div id={`${identity}-preview`} className={`directory-details__preview`}>
              {imageSource ? (
                <img width={1200} height={675} decoding={`async`} src={imageSource} onError={hideImage} alt={`${directory.name} directory preview`} id={`${identity}-preview-image`} className={`directory-details__preview-image`} />
              ) : <span aria-hidden={`true`} id={`${identity}-preview-initials`} className={`directory-details__preview-initials`}>{directory.initials}</span>}
            </div>
            <p id={`${identity}-overview-copy`} className={`directory-details__copy`}>{directory.summary}</p>
            <div id={`${identity}-topics`} className={`directory-details__topics`} aria-label={`Directory topics`}>
              {directory.topics.map((topic, index) => <span key={topic} id={`${identity}-topic-${index}`} className={`directory-details__topic`}>{topic}</span>)}
            </div>
          </section>
          <section id={`${identity}-reviews`} className={`directory-details__panel`} aria-labelledby={`${identity}-reviews-heading`}>
            <div id={`${identity}-reviews-heading-row`} className={`directory-details__panel-heading`}>
              <h2 id={`${identity}-reviews-heading`} className={`directory-details__section-title`}><Icon size={17} name={`star`} id={`${identity}-reviews-icon`} />{`Reviews & Rating`}</h2>
              <span id={`${identity}-rating-value`} className={`directory-details__rating-value`}>{!ready ? `Loading Your Rating…` : entry.rating ? `Your Rating: ${entry.rating} / 5` : `Your Rating: Not Rated Yet`}</span>
            </div>
            <p id={`${identity}-reviews-intro`} className={`directory-details__hint`}>{`What worked well? Share a useful review and choose your rating.`}</p>
            <DirectoryFeedback key={`${scope}-${directory.id}`} variant={`details`} scope={`${scope}-details`} directoryId={directory.id} directoryName={directory.name} />
          </section>
          <section id={`${identity}-comments`} className={`directory-details__panel`} aria-labelledby={`${identity}-comments-heading`}>
            <h2 id={`${identity}-comments-heading`} className={`directory-details__section-title`}><Icon size={17} name={`communities`} id={`${identity}-comments-icon`} />{`Comments`}</h2>
            {comments.length ? (
              <ol id={`${identity}-comment-list`} className={`directory-details__comment-list`}>
                {comments.map((comment) => (
                  <li key={comment.id} id={`${identity}-comment-${comment.id}`} className={`directory-details__comment`}>
                    <span aria-hidden={`true`} id={`${identity}-comment-avatar-${comment.id}`} className={`directory-details__avatar`}>{comment.authorName?.[0]?.toUpperCase() ?? `D`}</span>
                    <div id={`${identity}-comment-content-${comment.id}`} className={`directory-details__comment-content`}>
                      <div id={`${identity}-comment-meta-${comment.id}`} className={`directory-details__comment-meta`}>
                        <strong id={`${identity}-comment-author-${comment.id}`} className={`directory-details__comment-author`}>{comment.authorName}</strong>
                        <time dateTime={comment.created} id={`${identity}-comment-time-${comment.id}`} className={`directory-details__comment-time`}>{new Date(comment.created).toLocaleString()}</time>
                        {user?.id === comment.authorId && <button type={`button`} onClick={() => void removeComment(comment.id)} aria-label={`Delete your comment`} id={`${identity}-comment-delete-${comment.id}`} className={`directory-details__comment-delete`}><Icon size={13} name={`close`} id={`${identity}-comment-delete-icon-${comment.id}`} /></button>}
                      </div>
                      <p id={`${identity}-comment-text-${comment.id}`} className={`directory-details__comment-text`}>{comment.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : <p id={`${identity}-comments-empty`} className={`directory-details__empty`}>{`No comments yet. Start a conversation about this directory.`}</p>}
            <form id={`${identity}-comment-form`} className={`directory-details__comment-form`} onSubmit={(event) => { event.preventDefault(); if (!user) onNavigate?.(); void addComment(); }}>
              <label htmlFor={`${identity}-comment-input`} id={`${identity}-comment-label`} className={`directory-details__comment-label`}>{`Add a Comment`}</label>
              <textarea rows={3} maxLength={directoryCommentLimit} value={commentDraft} disabled={!ready || !canComment || submitting} onChange={(event) => setCommentDraft(event.target.value)} id={`${identity}-comment-input`} className={`directory-details__comment-input`} placeholder={canComment ? `Add a useful note or question…` : `Sign in to join the conversation`} />
              <div id={`${identity}-comment-actions`} className={`directory-details__comment-actions`}>
                {!user && <Link href={{ pathname: `/sign-up`, params: { redirect: detailHref } }} onClick={onNavigate} id={`${identity}-comment-sign-up`} className={`directory-details__sign-up`}>{`Create an Account`}</Link>}
                <button type={`submit`} disabled={!ready || !authReady || submitting || (canComment && !commentDraft.trim())} id={`${identity}-comment-submit`} className={`directory-details__action directory-details__action--primary`}>
                  <Icon size={14} name={canComment ? `plus` : `log-in`} id={`${identity}-comment-submit-icon`} />
                  <span id={`${identity}-comment-submit-label`} className={`directory-details__action-label`}>{submitting ? `Saving…` : canComment ? `Add Comment` : `Sign In to Comment`}</span>
                </button>
              </div>
            </form>
            {message || error ? <p role={`status`} id={`${identity}-message`} className={`directory-details__message${error ? ` is-error` : ``}`}>{error ?? message}</p> : null}
          </section>
        </div>
        <aside id={`${identity}-sidebar`} className={`directory-details__sidebar`} aria-label={`Directory information`}>
          <section id={`${identity}-facts`} className={`directory-details__panel directory-details__facts`}>
            <h2 id={`${identity}-facts-heading`} className={`directory-details__section-title`}>{`Directory Information`}</h2>
            <dl id={`${identity}-facts-list`} className={`directory-details__facts-list`}>
              <div id={`${identity}-fact-category`} className={`directory-details__fact`}><dt id={`${identity}-fact-category-label`} className={`directory-details__fact-label`}>{`Category`}</dt><dd id={`${identity}-fact-category-value`} className={`directory-details__fact-value`}><Icon size={14} name={category?.icon ?? `folder`} id={`${identity}-fact-category-icon`} />{category?.label}</dd></div>
              <div id={`${identity}-fact-website`} className={`directory-details__fact`}><dt id={`${identity}-fact-website-label`} className={`directory-details__fact-label`}>{`Website`}</dt><dd id={`${identity}-fact-website-value`} className={`directory-details__fact-value`}><a href={directory.href} target={`_blank`} rel={`noopener noreferrer`} id={`${identity}-domain-link`} className={`directory-details__domain-link`}><Icon size={14} name={`globe`} id={`${identity}-domain-icon`} /><span id={`${identity}-domain-name`} className={`directory-details__domain-name`}>{domain.name}<span id={`${identity}-domain-extension`} className={`directory-details__domain-extension`}>{domain.extension}</span></span></a></dd></div>
              <div id={`${identity}-fact-status`} className={`directory-details__fact`}><dt id={`${identity}-fact-status-label`} className={`directory-details__fact-label`}>{`Status & Reach`}</dt><dd id={`${identity}-fact-status-value`} className={`directory-details__fact-value directory-details__status-list`}>{statuses.map((status) => <span key={status.id} title={status.description} id={`${identity}-status-${status.id}`} className={`directory-details__status`}><Icon size={13} name={status.icon} id={`${identity}-status-icon-${status.id}`} />{status.label}</span>)}</dd></div>
              <div id={`${identity}-fact-featured`} className={`directory-details__fact`}><dt id={`${identity}-fact-featured-label`} className={`directory-details__fact-label`}>{`Collection`}</dt><dd id={`${identity}-fact-featured-value`} className={`directory-details__fact-value`}><Icon size={14} name={directory.featured ? `sparkles` : `folder`} id={`${identity}-fact-featured-icon`} />{directory.featured ? `Featured Directory` : `Directory Catalog`}</dd></div>
            </dl>
          </section>
          <p id={`${identity}-storage-notice`} className={`directory-details__storage-notice`}><Icon size={14} name={`info`} id={`${identity}-storage-icon`} /><span id={`${identity}-storage-label`} className={`directory-details__storage-label`}>{storageNotice}</span></p>
        </aside>
      </div>
    </article>
  );
}
