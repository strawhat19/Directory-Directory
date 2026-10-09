import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import Svg, { Circle, Polygon } from 'react-native-svg';
import { useCommunityFeeds } from './useCommunityFeeds';
import { styles } from './CommunityFeeds.native.styles';
import { formatBlogDate } from '../BlogCard/formatBlogDate';
import { elementProps } from '../../shared/ui/elementProps';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { redditFeedSources, youtubeFeedSources } from '../../shared/blog/communityFeeds';

const dotGrid = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  cx: 10 + (index % 8) * 18,
  cy: 10 + Math.floor(index / 8) * 18,
}));

const CommunityFeeds = () => {
  const { feeds, loading, refreshing, connected, refresh } = useCommunityFeeds();
  const { width, padding, styles: common, palette } = useBlogPresentation();
  const cardWidth = width >= 1100 ? `31.8%` : width >= 760 ? `48%` : `100%`;
  const horizontalInset = padding + Math.max(0, (width - 1260) / 2);
  const busy = loading || refreshing;

  return (
    <View {...elementProps(`community-feeds`)} style={styles.section}>
      <View {...elementProps(`community-feeds-intro`)} style={styles.intro}>
        <View {...elementProps(`community-feeds-eyebrow`)} style={common.eyebrow}>
          <Icon size={15} name={`communities`} color={palette.blue} id={`community-feeds-eyebrow-icon`} className={`community-feeds-eyebrow-icon`} />
          <Text {...elementProps(`community-feeds-eyebrow-label`)} style={common.eyebrowLabel}>{`Conversations & Videos`}</Text>
        </View>
        <Text {...elementProps(`community-feeds-heading`)} accessibilityRole={`header`} style={common.title}>{`Around the Directory World`}</Text>
        <Text {...elementProps(`community-feeds-summary`)} style={common.paragraph}>{`Community discussions and videos from people building, curating, and discovering directories.`}</Text>
      </View>
      <View {...elementProps(`community-feeds-reddit`)} style={styles.group}>
        <View {...elementProps(`community-feeds-reddit-header`)} style={styles.groupHeader}>
          <Text {...elementProps(`community-feeds-reddit-heading`)} accessibilityRole={`header`} style={[common.title, styles.groupTitle]}>{`Reddit Communities`}</Text>
          {connected ? (
            <Pressable
              onPress={refresh}
              disabled={busy}
              accessibilityRole={`button`}
              accessibilityState={{ disabled: busy, busy }}
              {...elementProps(`community-feeds-refresh`)}
              style={({ pressed }) => [styles.refresh, { borderColor: palette.border, backgroundColor: palette.surface }, busy && styles.disabled, pressed && common.pressed]}
            >
              <Icon size={14} name={`clock`} color={palette.blue} id={`community-feeds-refresh-icon`} className={`community-feeds-refresh-icon`} />
              <Text {...elementProps(`community-feeds-refresh-label`)} style={common.actionLabel}>{busy ? `Refreshing Feeds` : `Refresh Feeds`}</Text>
            </Pressable>
          ) : null}
        </View>
        <View {...elementProps(`community-feeds-reddit-grid`)} style={styles.grid}>
          {redditFeedSources.map((source) => {
            const feed = feeds.find((item) => item.sourceId === source.id);
            const posts = feed?.posts?.slice(0, 4) ?? [];

            return (
              <View key={source.id} {...elementProps(`community-feed-wrapper`, source.id)} style={{ width: cardWidth }}>
                <View {...elementProps(`community-feed-card`, source.id)} style={[styles.card, { borderColor: palette.border, borderTopColor: source.color, backgroundColor: palette.surface }]}>
                  <View accessible={false} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`} {...elementProps(`community-feed-folder-tab`, source.id)} style={[styles.folderTab, { backgroundColor: source.color }]} />
                  <View {...elementProps(`community-feed-card-header`, source.id)} style={styles.cardHeader}>
                    <View {...elementProps(`community-feed-symbol`, source.id)} style={[styles.symbol, { backgroundColor: `${source.color}18` }]}>
                      <Icon size={21} name={`communities`} color={source.color} id={`community-feed-symbol-icon-${source.id}`} className={`community-feed-symbol-icon`} />
                    </View>
                    <Text {...elementProps(`community-feed-name`, source.id)} accessibilityRole={`header`} style={[common.strongTitle, styles.sourceName]}>{source.name}</Text>
                  </View>
                  <Text {...elementProps(`community-feed-description`, source.id)} style={[common.paragraph, styles.description]}>{source.description}</Text>
                  {loading && !posts.length ? (
                    <View {...elementProps(`community-feed-loading`, source.id)} style={styles.loading}>
                      <ActivityIndicator size={`small`} color={source.color} {...elementProps(`community-feed-loading-indicator`, source.id)} />
                      <Text {...elementProps(`community-feed-loading-label`, source.id)} style={common.metaLabel}>{`Loading Recent Posts`}</Text>
                    </View>
                  ) : feed?.status === `ready` ? (
                    posts.length ? (
                      <View {...elementProps(`community-feed-posts`, source.id)} style={styles.posts}>
                        {posts.map((post) => (
                          <Link key={post.id} href={post.url} asChild>
                            <Pressable {...elementProps(`community-feed-post`, `${source.id}-${post.id}`)} style={({ pressed }) => [styles.post, pressed && common.pressed]}>
                              <Text {...elementProps(`community-feed-post-title`, `${source.id}-${post.id}`)} style={[common.actionLabel, styles.postTitle, { color: palette.ink }]}>{post.title}</Text>
                              <Text {...elementProps(`community-feed-post-date`, `${source.id}-${post.id}`)} style={common.metaLabel}>{formatBlogDate(post.publishedAt.slice(0, 10))}</Text>
                            </Pressable>
                          </Link>
                        ))}
                      </View>
                    ) : <Text {...elementProps(`community-feed-empty`, source.id)} style={[common.paragraph, styles.description]}>{`No Recent Posts`}</Text>
                  ) : <Text {...elementProps(`community-feed-unavailable`, source.id)} style={[common.paragraph, styles.description]}>{`Live posts are unavailable here. Browse the latest conversations on Reddit.`}</Text>}
                  <View {...elementProps(`community-feed-footer`, source.id)} style={[styles.footer, { borderColor: palette.border }]}>
                    <Link href={source.url} asChild>
                      <Pressable {...elementProps(`community-feed-browse`, source.id)} style={({ pressed }) => [common.action, pressed && common.pressed]}>
                        <Text {...elementProps(`community-feed-browse-label`, source.id)} style={[common.actionLabel, { color: source.color }]}>{`Browse Latest`}</Text>
                        <Icon size={14} name={`arrow-up-right`} color={source.color} id={`community-feed-browse-icon-${source.id}`} className={`community-feed-browse-icon`} />
                      </Pressable>
                    </Link>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      <View
        {...elementProps(`community-feeds-youtube`)}
        style={[styles.youtubeBand, { width, backgroundColor: palette.red, paddingHorizontal: padding, marginHorizontal: -horizontalInset, paddingTop: width >= 760 ? 72 : 48, paddingBottom: width >= 760 ? 48 : 32 }]}
      >
        <Svg width={160} height={120} accessible={false} pointerEvents={`none`} viewBox={`0 0 160 120`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`} {...elementProps(`community-feeds-youtube-dot-grid`)} style={styles.youtubeDotGrid}>
          {dotGrid.map((dot) => <Circle key={dot.id} r={1.5} cx={dot.cx} cy={dot.cy} fill={palette.white} {...elementProps(`community-feeds-youtube-dot`, String(dot.id))} />)}
        </Svg>
        <Svg width={360} height={360} accessible={false} pointerEvents={`none`} viewBox={`0 0 360 360`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`} {...elementProps(`community-feeds-youtube-background-shape`)} style={styles.youtubeBackgroundShape}>
          <Circle r={154} cx={180} cy={180} fill={`none`} strokeWidth={1.5} stroke={palette.white} {...elementProps(`community-feeds-youtube-background-circle`)} />
          <Polygon fillOpacity={0.16} fill={palette.white} strokeWidth={1.5} stroke={palette.white} points={`138,106 138,254 258,180`} {...elementProps(`community-feeds-youtube-background-play`)} />
        </Svg>
        <View {...elementProps(`community-feeds-youtube-content`)} style={[styles.group, styles.youtubeContent]}>
          <Text {...elementProps(`community-feeds-youtube-heading`)} accessibilityRole={`header`} style={[common.title, styles.groupTitle, { color: palette.white }]}>{`YouTube Channels`}</Text>
          <Text {...elementProps(`community-feeds-youtube-note`)} style={[common.paragraph, styles.youtubeNote, { color: palette.white }]}>{`Channel playlists update as new videos are added.`}</Text>
          <View {...elementProps(`community-feeds-youtube-grid`)} style={styles.grid}>
            {youtubeFeedSources.map((source) => (
              <View key={source.id} {...elementProps(`community-feed-wrapper`, source.id)} style={{ width: cardWidth }}>
                <View {...elementProps(`community-feed-card`, source.id)} style={[styles.card, { borderColor: palette.border, borderTopColor: source.color, backgroundColor: palette.surface }]}>
                  <View accessible={false} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`} {...elementProps(`community-feed-folder-tab`, source.id)} style={[styles.folderTab, { backgroundColor: source.color }]} />
                  <View {...elementProps(`community-feed-card-header`, source.id)} style={styles.cardHeader}>
                    <View {...elementProps(`community-feed-symbol`, source.id)} style={[styles.symbol, { backgroundColor: `${source.color}18` }]}>
                      <Icon size={21} name={`clapperboard`} color={source.color} id={`community-feed-symbol-icon-${source.id}`} className={`community-feed-symbol-icon`} />
                    </View>
                    <Text {...elementProps(`community-feed-name`, source.id)} accessibilityRole={`header`} style={[common.strongTitle, styles.sourceName]}>{source.name}</Text>
                  </View>
                  <Text {...elementProps(`community-feed-description`, source.id)} style={[common.paragraph, styles.description]}>{source.description}</Text>
                  <View {...elementProps(`community-feed-footer`, source.id)} style={[styles.footer, { borderColor: palette.border }]}>
                    <Link href={`https://www.youtube.com/playlist?list=${source.playlistId}`} asChild>
                      <Pressable {...elementProps(`community-feed-videos`, source.id)} style={({ pressed }) => [common.action, pressed && common.pressed]}>
                        <Icon size={14} name={`play`} color={source.color} id={`community-feed-videos-icon-${source.id}`} className={`community-feed-videos-icon`} />
                        <Text {...elementProps(`community-feed-videos-label`, source.id)} style={[common.actionLabel, { color: source.color }]}>{`Watch Latest Videos`}</Text>
                      </Pressable>
                    </Link>
                    <Link href={source.url} asChild>
                      <Pressable {...elementProps(`community-feed-channel`, source.id)} style={({ pressed }) => [common.action, pressed && common.pressed]}>
                        <Text {...elementProps(`community-feed-channel-label`, source.id)} style={common.metaLabel}>{`Visit Channel`}</Text>
                        <Icon size={13} name={`arrow-up-right`} color={palette.muted} id={`community-feed-channel-icon-${source.id}`} className={`community-feed-channel-icon`} />
                      </Pressable>
                    </Link>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommunityFeeds;
