import './CommunityFeeds.scss';
import Icon from '../Icon/Icon';
import type { CSSProperties } from 'react';
import { useCommunityFeeds } from './useCommunityFeeds';
import { formatBlogDate } from '../BlogCard/formatBlogDate';
import { redditFeedSources, youtubeFeedSources } from '../../shared/blog/communityFeeds';

const CommunityFeeds = () => {
  const { feeds, loading, refreshing, connected, refresh } = useCommunityFeeds();

  return (
    <section id={`blog-community-feeds`} className={`community-feeds`} aria-labelledby={`blog-community-feeds-heading`}>
      <div id={`blog-community-feeds-intro`} className={`community-feeds__intro`}>
        <p id={`blog-community-feeds-eyebrow`} className={`community-feeds__eyebrow dd-eyebrow`}>{`Keep Your Curiosity Going`}</p>
        <h2 id={`blog-community-feeds-heading`} className={`community-feeds__heading`}>{`Around the Directory World`}</h2>
        <p id={`blog-community-feeds-summary`} className={`community-feeds__summary`}>{`Follow conversations, discover new collections, and learn from the people building directories.`}</p>
      </div>
      <div id={`blog-reddit-feeds-header`} className={`community-feeds__group-header`}>
        <h3 id={`blog-reddit-feeds-heading`} className={`community-feeds__group-title`}>
          <Icon size={20} name={`communities`} id={`blog-reddit-feeds-icon`} className={`community-feeds__group-icon`} />
          <span id={`blog-reddit-feeds-label`} className={`community-feeds__group-label`}>{`Reddit Communities`}</span>
        </h3>
        {connected ? (
          <button type={`button`} onClick={refresh} disabled={loading || refreshing} id={`blog-reddit-feeds-refresh`} className={`community-feeds__refresh`}>
            <Icon size={15} name={`clock`} id={`blog-reddit-feeds-refresh-icon`} className={`community-feeds__refresh-icon`} />
            <span id={`blog-reddit-feeds-refresh-label`} className={`community-feeds__refresh-label`}>{loading || refreshing ? `Refreshing…` : `Refresh Feeds`}</span>
          </button>
        ) : null}
      </div>
      <div id={`blog-reddit-feeds-grid`} className={`community-feeds__grid community-feeds__grid--reddit`} aria-busy={loading || refreshing}>
        {redditFeedSources.map((source) => {
          const feed = feeds.find((item) => item.sourceId === source.id);

          return (
            <article key={source.id} id={`community-feed-${source.id}`} className={`community-feed`} style={{ [`--feed-color`]: source.color } as CSSProperties} aria-labelledby={`community-feed-title-${source.id}`}>
              <span aria-hidden={true} id={`community-feed-tab-${source.id}`} className={`community-feed__tab`} />
              <div id={`community-feed-top-${source.id}`} className={`community-feed__top`}>
                <span id={`community-feed-symbol-${source.id}`} className={`community-feed__symbol`}>
                  <Icon size={22} name={`communities`} id={`community-feed-symbol-icon-${source.id}`} className={`community-feed__symbol-icon`} />
                </span>
                <span id={`community-feed-platform-${source.id}`} className={`community-feed__platform dd-eyebrow`}>{`Reddit`}</span>
              </div>
              <h4 id={`community-feed-title-${source.id}`} className={`community-feed__title`}>
                <a href={source.url} target={`_blank`} rel={`noopener noreferrer`} id={`community-feed-title-link-${source.id}`} className={`community-feed__title-link`}>{source.name}</a>
              </h4>
              <p id={`community-feed-description-${source.id}`} className={`community-feed__description`}>{source.description}</p>
              {loading ? (
                <div id={`community-feed-loading-${source.id}`} className={`community-feed__loading`} role={`status`} aria-label={`Loading ${source.name} posts`}>
                  {[0, 1, 2].map((index) => <span key={index} aria-hidden={true} id={`community-feed-skeleton-${source.id}-${index}`} className={`community-feed__skeleton`} />)}
                  <span id={`community-feed-loading-label-${source.id}`} className={`community-feed__state`}>{`Loading Latest Posts…`}</span>
                </div>
              ) : feed?.status === `ready` ? (
                feed.posts.length ? (
                  <ul id={`community-feed-posts-${source.id}`} className={`community-feed__posts`}>
                    {feed.posts.map((post) => (
                      <li key={post.id} id={`community-feed-post-${source.id}-${post.id}`} className={`community-feed__post`}>
                        <a href={post.url} target={`_blank`} rel={`noopener noreferrer`} id={`community-feed-post-link-${source.id}-${post.id}`} className={`community-feed__post-link`}>{post.title}</a>
                        <time dateTime={post.publishedAt} id={`community-feed-post-date-${source.id}-${post.id}`} className={`community-feed__post-date`}>{formatBlogDate(post.publishedAt.slice(0, 10))}</time>
                      </li>
                    ))}
                  </ul>
                ) : <p id={`community-feed-empty-${source.id}`} className={`community-feed__state`}>{`No Recent Posts`}</p>
              ) : <p id={`community-feed-unavailable-${source.id}`} className={`community-feed__state`}>{`Live posts are unavailable here. Browse the latest conversations on Reddit.`}</p>}
              <a href={source.url} target={`_blank`} rel={`noopener noreferrer`} id={`community-feed-browse-${source.id}`} className={`community-feed__link`}>
                <span id={`community-feed-browse-label-${source.id}`} className={`community-feed__link-label`}>{`Browse Latest Posts`}</span>
                <Icon size={15} name={`arrow-up-right`} id={`community-feed-browse-icon-${source.id}`} className={`community-feed__link-icon`} />
              </a>
            </article>
          );
        })}
      </div>
      <section id={`blog-youtube-feeds`} className={`youtube-feeds`} aria-labelledby={`blog-youtube-feeds-heading`}>
        <span aria-hidden={true} id={`blog-youtube-feeds-decoration`} className={`youtube-feeds__decoration`} />
        <div id={`blog-youtube-feeds-content`} className={`youtube-feeds__content`}>
          <div id={`blog-youtube-feeds-header`} className={`community-feeds__group-header`}>
            <h3 id={`blog-youtube-feeds-heading`} className={`community-feeds__group-title`}>
              <Icon size={24} name={`play`} id={`blog-youtube-feeds-icon`} className={`community-feeds__group-icon`} />
              <span id={`blog-youtube-feeds-label`} className={`community-feeds__group-label`}>{`YouTube Channels`}</span>
            </h3>
            <p id={`blog-youtube-feeds-note`} className={`community-feeds__note`}>{`Channel playlists update as new videos are added.`}</p>
          </div>
          <div id={`blog-youtube-feeds-grid`} className={`community-feeds__grid`}>
            {youtubeFeedSources.map((source) => (
              <article key={source.id} id={`community-feed-${source.id}`} className={`community-feed community-feed--video`} style={{ [`--feed-color`]: source.color } as CSSProperties} aria-labelledby={`community-feed-title-${source.id}`}>
                <span aria-hidden={true} id={`community-feed-tab-${source.id}`} className={`community-feed__tab`} />
                <div id={`community-feed-top-${source.id}`} className={`community-feed__top`}>
                  <span id={`community-feed-symbol-${source.id}`} className={`community-feed__symbol`}>
                    <Icon size={22} name={`play`} id={`community-feed-symbol-icon-${source.id}`} className={`community-feed__symbol-icon`} />
                  </span>
                  <span id={`community-feed-platform-${source.id}`} className={`community-feed__platform dd-eyebrow`}>{`YouTube`}</span>
                </div>
                <h4 id={`community-feed-title-${source.id}`} className={`community-feed__title`}>{source.name}</h4>
                <p id={`community-feed-description-${source.id}`} className={`community-feed__description`}>{source.description}</p>
                <iframe
                  loading={`lazy`}
                  allowFullScreen
                  id={`community-feed-player-${source.id}`}
                  className={`community-feed__player`}
                  title={`${source.name} Latest YouTube Videos`}
                  referrerPolicy={`strict-origin-when-cross-origin`}
                  allow={`encrypted-media; picture-in-picture; web-share`}
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${source.playlistId}&playsinline=1&rel=0`}
                />
                <a href={source.url} target={`_blank`} rel={`noopener noreferrer`} id={`community-feed-browse-${source.id}`} className={`community-feed__link`}>
                  <span id={`community-feed-browse-label-${source.id}`} className={`community-feed__link-label`}>{`Visit Channel`}</span>
                  <Icon size={15} name={`arrow-up-right`} id={`community-feed-browse-icon-${source.id}`} className={`community-feed__link-icon`} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default CommunityFeeds;
