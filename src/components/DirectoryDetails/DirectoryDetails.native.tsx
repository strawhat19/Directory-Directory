import Icon from '../Icon/Icon';
import { useMemo } from 'react';
import { Link, type Href } from 'expo-router';
import { useTheme } from '../../shared/theme/useTheme';
import { useDirectoryDetails } from './useDirectoryDetails';
import { elementProps } from '../../shared/ui/elementProps';
import type { DirectoryEntry } from '../../shared/catalog/catalog';
import DirectoryFeedback from '../DirectoryFeedback/DirectoryFeedback';
import { directoryCommentLimit } from '../../shared/landing/feedback.types';
import { getLandingAccents } from '../LandingPage/LandingPage.native.styles';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { createDirectoryDetailsStyles } from './DirectoryDetails.native.styles';
import useDirectoryCardPreview from '../DirectoryCardPreview/useDirectoryCardPreview';
import { Alert, Image, Linking, Pressable, Text, TextInput, View } from 'react-native';
import { directoryPreviewAssets } from '../../shared/catalog/directoryPreviewAssets.native';

type DirectoryDetailsProps = {
  scope?: string;
  directory: DirectoryEntry;
  onNavigate?: () => void;
};

export default function DirectoryDetails({ directory, scope = `page`, onNavigate }: DirectoryDetailsProps) {
  const { isDark } = useTheme();
  const details = useDirectoryDetails(directory, scope);
  const { width, palette, styles: common } = useBlogPresentation();
  const styles = useMemo(() => createDirectoryDetailsStyles(isDark), [isDark]);
  const accent = getLandingAccents(isDark)[directory.accent];
  const suffix = `${scope}-${directory.id}`;
  const wide = width >= 980 && scope !== `modal`;
  const source = directoryPreviewAssets[directory.id] ?? (directory.previewImage?.startsWith(`https://`) ? { uri: directory.previewImage } : undefined);
  const { hideImage, imageSource } = useDirectoryCardPreview(source ? directory.previewImage ?? directory.id : undefined);
  const visitDirectory = () => {
    void Linking.openURL(directory.href).catch(() => Alert.alert(`Unable To Open Website`, `Please Try Again`));
  };

  return (
    <View {...elementProps(`directory-details`, suffix)} style={styles.details}>
      <View {...elementProps(`directory-details-header`, suffix)} style={styles.header}>
        <View {...elementProps(`directory-details-title-row`, suffix)} style={styles.titleRow}>
          <View {...elementProps(`directory-details-monogram`, suffix)} style={[styles.monogram, { backgroundColor: accent.background }]}>
            <Text {...elementProps(`directory-details-initials`, suffix)} style={[styles.initials, { color: accent.color }]}>{directory.initials}</Text>
          </View>
          <Text {...elementProps(`directory-details-title`, suffix)} accessibilityRole={`header`} style={[common.strongTitle, styles.title]}>{directory.name}</Text>
        </View>
        <Text {...elementProps(`directory-details-description`, suffix)} style={[common.paragraph, styles.description]}>{details.description}</Text>
        <View {...elementProps(`directory-details-actions`, suffix)} style={styles.actions}>
          <Pressable {...elementProps(`directory-details-visit`, suffix)} onPress={visitDirectory} accessibilityRole={`link`} accessibilityLabel={`Visit ${directory.name} Website`} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
            <Icon size={14} name={`arrow-up-right`} color={accent.color} id={`${details.identity}-visit-icon`} className={`directory-details-action-icon`} />
            <Text {...elementProps(`directory-details-visit-label`, suffix)} style={[common.actionLabel, styles.actionLabel]}>{`Visit Website`}</Text>
          </Pressable>
          <Pressable {...elementProps(`directory-details-save`, suffix)} disabled={!details.ready} onPress={details.toggleSaved} accessibilityRole={`button`} accessibilityLabel={`${details.saved ? `Unsave` : `Save`} ${directory.name}`} accessibilityState={{ selected: details.saved, disabled: !details.ready }} style={({ pressed }) => [styles.action, details.saved && { backgroundColor: accent.background }, pressed && styles.pressed, !details.ready && styles.disabled]}>
            <Icon size={14} name={details.saved ? `check` : `bookmark`} color={accent.color} id={`${details.identity}-save-icon`} className={`directory-details-action-icon`} />
            <Text {...elementProps(`directory-details-save-label`, suffix)} style={[common.actionLabel, styles.actionLabel]}>{details.saved ? `Saved` : `Save Directory`}</Text>
          </Pressable>
          {scope === `modal` && (
            <Link href={details.detailHref as Href} asChild>
              <Pressable {...elementProps(`directory-details-page-link`, suffix)} onPress={onNavigate} accessibilityRole={`link`} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
                <Icon size={14} name={`file-text`} color={accent.color} id={`${details.identity}-page-icon`} className={`directory-details-action-icon`} />
                <Text {...elementProps(`directory-details-page-label`, suffix)} style={[common.actionLabel, styles.actionLabel]}>{`Directory Page`}</Text>
              </Pressable>
            </Link>
          )}
        </View>
      </View>
      <View {...elementProps(`directory-details-layout`, suffix)} style={[styles.layout, wide && styles.layoutWide]}>
        <View {...elementProps(`directory-details-main`, suffix)} style={[styles.main, wide && styles.mainWide]}>
          <View {...elementProps(`directory-details-overview`, suffix)} style={styles.panel}>
            <Text {...elementProps(`directory-details-overview-title`, suffix)} accessibilityRole={`header`} style={[common.title, styles.sectionTitle]}>{`Overview`}</Text>
            <View {...elementProps(`directory-details-preview`, suffix)} style={[styles.preview, { backgroundColor: accent.background }]}>
              {imageSource && source ? (
                <Image source={source} onError={hideImage} resizeMode={`cover`} style={styles.previewImage} accessibilityLabel={`${directory.name} Website Preview`} {...elementProps(`directory-details-preview-image`, suffix)} />
              ) : (
                <Text {...elementProps(`directory-details-preview-initials`, suffix)} style={[styles.previewInitials, { color: accent.color }]}>{directory.initials}</Text>
              )}
            </View>
            <Text {...elementProps(`directory-details-overview-summary`, suffix)} style={[common.paragraph, styles.paragraph]}>{directory.summary}</Text>
            <View {...elementProps(`directory-details-topics`, suffix)} style={styles.pills}>
              {directory.topics.map((topic, index) => (
                <View key={topic} {...elementProps(`directory-details-topic`, `${suffix}-${index}`)} style={[styles.pill, { backgroundColor: accent.background }]}>
                  <Text {...elementProps(`directory-details-topic-label`, `${suffix}-${index}`)} style={[styles.pillLabel, { color: accent.color }]}>{`#${topic}`}</Text>
                </View>
              ))}
            </View>
          </View>
          <View {...elementProps(`directory-details-feedback-panel`, suffix)} style={styles.panel}>
            <Text {...elementProps(`directory-details-feedback-title`, suffix)} accessibilityRole={`header`} style={[common.title, styles.sectionTitle]}>{`Ratings & Reviews`}</Text>
            <View {...elementProps(`directory-details-feedback`, suffix)} style={styles.feedback}>
              <DirectoryFeedback key={`${scope}-${directory.id}`} scope={scope} variant={`details`} color={accent.color} directoryId={directory.id} directoryName={directory.name} />
            </View>
          </View>
          <View {...elementProps(`directory-details-comments`, suffix)} style={styles.panel}>
            <View {...elementProps(`directory-details-comments-heading`, suffix)} style={styles.commentHeading}>
              <Text {...elementProps(`directory-details-comments-title`, suffix)} accessibilityRole={`header`} style={[common.title, styles.sectionTitle]}>{`Comments`}</Text>
              <Text {...elementProps(`directory-details-comments-count`, suffix)} accessibilityLabel={`${details.entry.comments.length} Comments`} style={styles.commentCount}>{details.entry.comments.length}</Text>
            </View>
            {details.canComment ? (
              <View {...elementProps(`directory-details-comment-form`, suffix)} style={styles.commentForm}>
                <TextInput multiline value={details.commentDraft} maxLength={directoryCommentLimit} onChangeText={details.setCommentDraft} editable={details.ready && !details.submitting} style={[common.paragraph, styles.commentInput]} placeholder={`Add A Comment About ${directory.name}`} placeholderTextColor={palette.muted} accessibilityLabel={`Your Comment About ${directory.name}`} {...elementProps(`directory-details-comment-input`, suffix)} />
                <View {...elementProps(`directory-details-comment-actions`, suffix)} style={styles.commentActions}>
                  <Text {...elementProps(`directory-details-comment-length`, suffix)} style={styles.commentLength}>{`${details.commentDraft.length}/${directoryCommentLimit}`}</Text>
                  <Pressable {...elementProps(`directory-details-comment-submit`, suffix)} onPress={() => void details.addComment()} disabled={!details.ready || details.submitting || !details.commentDraft.trim()} accessibilityRole={`button`} accessibilityState={{ disabled: !details.ready || details.submitting || !details.commentDraft.trim() }} style={({ pressed }) => [styles.action, pressed && styles.pressed, (!details.ready || details.submitting || !details.commentDraft.trim()) && styles.disabled]}>
                    <Icon size={13} name={`plus`} color={accent.color} id={`${details.identity}-comment-submit-icon`} className={`directory-details-action-icon`} />
                    <Text {...elementProps(`directory-details-comment-submit-label`, suffix)} style={styles.actionLabel}>{details.submitting ? `Posting…` : `Post Comment`}</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <Link href={{ pathname: `/sign-in`, params: { redirect: details.detailHref } }} asChild>
                <Pressable {...elementProps(`directory-details-comment-sign-in`, suffix)} onPress={onNavigate} disabled={!details.authReady} accessibilityRole={`link`} style={({ pressed }) => [styles.action, pressed && styles.pressed, !details.authReady && styles.disabled]}>
                  <Icon size={14} name={`log-in`} color={accent.color} id={`${details.identity}-comment-sign-in-icon`} className={`directory-details-action-icon`} />
                  <Text {...elementProps(`directory-details-comment-sign-in-label`, suffix)} style={styles.actionLabel}>{details.authReady ? `Sign In To Comment` : `Loading Your Account…`}</Text>
                </Pressable>
              </Link>
            )}
            {details.entry.comments.map((comment) => (
              <View key={comment.id} {...elementProps(`directory-details-comment`, `${suffix}-${comment.id}`)} style={styles.comment}>
                <View {...elementProps(`directory-details-comment-meta`, `${suffix}-${comment.id}`)} style={styles.commentMeta}>
                  <Text {...elementProps(`directory-details-comment-author`, `${suffix}-${comment.id}`)} style={styles.commentAuthor}>{comment.authorName}</Text>
                  <Text {...elementProps(`directory-details-comment-date`, `${suffix}-${comment.id}`)} style={styles.commentDate}>{new Date(comment.created).toLocaleDateString(undefined, { year: `numeric`, month: `short`, day: `numeric` })}</Text>
                  {details.user?.id === comment.authorId && (
                    <Pressable {...elementProps(`directory-details-comment-remove`, `${suffix}-${comment.id}`)} onPress={() => void details.removeComment(comment.id)} disabled={!details.ready || details.submitting} accessibilityRole={`button`} accessibilityLabel={`Remove Your Comment`} style={({ pressed }) => [styles.remove, pressed && styles.pressed, (!details.ready || details.submitting) && styles.disabled]}>
                      <Icon size={12} name={`close`} color={palette.muted} id={`${details.identity}-comment-remove-icon-${comment.id}`} className={`directory-details-action-icon`} />
                      <Text {...elementProps(`directory-details-comment-remove-label`, `${suffix}-${comment.id}`)} style={styles.removeLabel}>{`Remove`}</Text>
                    </Pressable>
                  )}
                </View>
                <Text {...elementProps(`directory-details-comment-text`, `${suffix}-${comment.id}`)} style={styles.commentText}>{comment.text}</Text>
              </View>
            ))}
            {!details.entry.comments.length && <Text {...elementProps(`directory-details-comments-empty`, suffix)} style={styles.notice}>{`No Comments Yet`}</Text>}
            <Text {...elementProps(`directory-details-storage-notice`, suffix)} style={styles.notice}>{details.storageNotice}</Text>
            {details.error || details.message ? <Text accessibilityLiveRegion={`polite`} {...elementProps(`directory-details-message`, suffix)} style={[styles.notice, Boolean(details.error) && styles.error]}>{details.error ?? details.message}</Text> : null}
          </View>
        </View>
        <View {...elementProps(`directory-details-sidebar`, suffix)} style={[styles.panel, styles.sidebar, wide && styles.sidebarWide]}>
          <Text {...elementProps(`directory-details-facts-title`, suffix)} accessibilityRole={`header`} style={[common.title, styles.sectionTitle]}>{`Details`}</Text>
          <View {...elementProps(`directory-details-website-fact`, suffix)} style={styles.fact}>
            <Text {...elementProps(`directory-details-website-fact-label`, suffix)} style={styles.factLabel}>{`Website`}</Text>
            <Pressable {...elementProps(`directory-details-domain-link`, suffix)} onPress={visitDirectory} accessibilityRole={`link`} accessibilityLabel={`Visit ${details.domain.host}`} style={({ pressed }) => [styles.factRow, pressed && styles.pressed]}>
              <Text {...elementProps(`directory-details-domain`, suffix)} style={styles.domain}>{details.domain.name}<Text {...elementProps(`directory-details-domain-extension`, suffix)} style={{ color: accent.color }}>{details.domain.extension}</Text></Text>
              <Icon size={13} name={`arrow-up-right`} color={accent.color} id={`${details.identity}-domain-icon`} className={`directory-details-action-icon`} />
            </Pressable>
          </View>
          <View {...elementProps(`directory-details-category-fact`, suffix)} style={styles.fact}>
            <Text {...elementProps(`directory-details-category-fact-label`, suffix)} style={styles.factLabel}>{`Category`}</Text>
            <View {...elementProps(`directory-details-category-value`, suffix)} style={styles.factRow}>
              {details.category && <Icon size={15} name={details.category.icon} color={accent.color} id={`${details.identity}-category-icon`} className={`directory-details-category-icon`} />}
              <Text {...elementProps(`directory-details-category-name`, suffix)} style={styles.factValue}>{details.category?.label ?? directory.category}</Text>
            </View>
          </View>
          <View {...elementProps(`directory-details-listed-fact`, suffix)} style={styles.fact}>
            <Text {...elementProps(`directory-details-listed-fact-label`, suffix)} style={styles.factLabel}>{`Listed As`}</Text>
            <Text {...elementProps(`directory-details-listed-fact-value`, suffix)} style={styles.factValue}>{directory.label}</Text>
          </View>
          <View {...elementProps(`directory-details-status-fact`, suffix)} style={styles.fact}>
            <Text {...elementProps(`directory-details-status-fact-label`, suffix)} style={styles.factLabel}>{`Status`}</Text>
            <View {...elementProps(`directory-details-statuses`, suffix)} style={styles.pills}>
              {details.statuses.map((status) => {
                const color = status.tone === `red` ? palette.red : status.tone === `green` ? palette.green : palette.muted;
                return (
                  <View key={status.id} {...elementProps(`directory-details-status`, `${suffix}-${status.id}`)} accessibilityLabel={`${status.label}: ${status.description}`} style={styles.pill}>
                    <Icon size={12} name={status.icon} color={color} id={`${details.identity}-status-icon-${status.id}`} className={`directory-details-status-icon`} />
                    <Text {...elementProps(`directory-details-status-label`, `${suffix}-${status.id}`)} style={styles.pillLabel}>{status.label}</Text>
                  </View>
                );
              })}
              {directory.featured && <View {...elementProps(`directory-details-featured`, suffix)} style={styles.pill}><Icon size={12} name={`sparkles`} color={accent.color} id={`${details.identity}-featured-icon`} className={`directory-details-status-icon`} /><Text {...elementProps(`directory-details-featured-label`, suffix)} style={styles.pillLabel}>{`Featured`}</Text></View>}
            </View>
          </View>
          <View {...elementProps(`directory-details-page-fact`, suffix)} style={[styles.fact, styles.factLast]}>
            <Text {...elementProps(`directory-details-page-fact-label`, suffix)} style={styles.factLabel}>{`Directory Page`}</Text>
            <Link href={details.detailHref as Href} asChild>
              <Pressable {...elementProps(`directory-details-permalink`, suffix)} onPress={onNavigate} accessibilityRole={`link`} style={({ pressed }) => [styles.factRow, pressed && styles.pressed]}>
                <Icon size={13} name={`file-text`} color={accent.color} id={`${details.identity}-permalink-icon`} className={`directory-details-action-icon`} />
                <Text {...elementProps(`directory-details-permalink-label`, suffix)} style={styles.factValue}>{details.detailHref}</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}
