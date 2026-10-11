import { useMemo } from 'react';
import Icon from '../Icon/Icon';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { Pressable, Text, View, TextInput } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';
import type { DirectoryFeedbackProps } from './DirectoryFeedback.types';
import { ratingValues, useDirectoryFeedback } from './useDirectoryFeedback';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { createDirectoryFeedbackStyles } from './DirectoryFeedback.native.styles';

export default function DirectoryFeedback(props: DirectoryFeedbackProps) {
  const { isDark } = useTheme();
  const { styles: common } = useBlogPresentation();
  const palette = getNativePalette(isDark);
  const card = props.variant === `card`;
  const color = props.color ?? palette.blue;
  const suffix = props.scope ? `${props.directoryId}-${props.scope}` : props.directoryId;
  const styles = useMemo(() => createDirectoryFeedbackStyles(isDark), [isDark]);
  const {
    rate,
    vote,
    entry,
    message,
    identity: feedbackIdentity,
    saveReview,
    reviewOpen,
    reviewDraft,
    toggleReview,
    feedbackReady,
    feedbackError,
    directoryName,
    updateReviewDraft,
  } = useDirectoryFeedback(props);
  const identity = props.scope ? `${feedbackIdentity}-${props.scope}` : feedbackIdentity;
  const actionDisabled = card ? !props.onDetails : !feedbackReady;

  return (
    <View {...elementProps(`directory-feedback`, suffix)} style={[styles.feedback, card && styles.feedbackCard]}>
      <View {...elementProps(`directory-feedback-footer`, suffix)} style={styles.footer}>
        <Pressable
          disabled={actionDisabled}
          onPress={card ? props.onDetails : toggleReview}
          accessibilityRole={`button`}
          accessibilityLabel={card ? `Details For ${directoryName}` : `${entry.review ? `Edit` : `Write`} Review For ${directoryName}`}
          accessibilityState={{ expanded: card ? undefined : reviewOpen, disabled: actionDisabled }}
          {...elementProps(card ? `directory-feedback-details-toggle` : `directory-feedback-review-toggle`, suffix)}
          style={({ pressed }) => [styles.reviewToggle, { borderColor: `${color}55`, backgroundColor: `${color}0d` }, !card && reviewOpen && styles.reviewToggleOpen, pressed && styles.pressed, actionDisabled && styles.disabled]}
        >
          <Icon
            size={14}
            color={color}
            name={card ? `info` : `file-text`}
            id={`${identity}-review-icon`}
            className={`directory-feedback-review-icon`}
          />
          <Text {...elementProps(`directory-feedback-action-label`, suffix)} style={[common.actionLabel, styles.linkLabel]}>
            {card ? `Details` : entry.review ? `Edit Review` : `Write Review`}
          </Text>
        </Pressable>
        <View {...elementProps(`directory-feedback-controls`, suffix)} style={styles.controls}>
          <View {...elementProps(`directory-feedback-votes`, suffix)} style={styles.votes}>
            <Pressable
              disabled={!feedbackReady}
              onPress={() => vote(1)}
              accessibilityRole={`button`}
              {...elementProps(`directory-feedback-upvote`, suffix)}
              accessibilityLabel={`Upvote ${directoryName}`}
              accessibilityState={{ selected: entry.vote === 1, disabled: !feedbackReady }}
              style={({ pressed }) => [styles.vote, card && styles.voteCard, entry.vote === 1 && styles.upvoteSelected, card && entry.vote === 1 && { borderColor: `${color}55`, backgroundColor: `${color}1a` }, pressed && styles.pressed, !feedbackReady && styles.disabled]}
            >
              <Icon
                size={16}
                name={`upvote`}
                id={`${identity}-upvote-icon`}
                className={`directory-feedback-vote-icon`}
                color={card ? color : entry.vote === 1 ? palette.green : palette.muted}
              />
            </Pressable>
            <Pressable
              disabled={!feedbackReady}
              onPress={() => vote(-1)}
              accessibilityRole={`button`}
              {...elementProps(`directory-feedback-downvote`, suffix)}
              accessibilityLabel={`Downvote ${directoryName}`}
              accessibilityState={{ selected: entry.vote === -1, disabled: !feedbackReady }}
              style={({ pressed }) => [styles.vote, card && styles.voteCard, entry.vote === -1 && styles.downvoteSelected, card && entry.vote === -1 && { borderColor: `${color}55`, backgroundColor: `${color}1a` }, pressed && styles.pressed, !feedbackReady && styles.disabled]}
            >
              <Icon
                size={16}
                name={`downvote`}
                id={`${identity}-downvote-icon`}
                className={`directory-feedback-vote-icon`}
                color={card ? color : entry.vote === -1 ? palette.red : palette.muted}
              />
            </Pressable>
          </View>
          {!card && <View {...elementProps(`directory-feedback-rating`, suffix)} style={styles.rating}>
            <View {...elementProps(`directory-feedback-stars`, suffix)} style={styles.stars}>
              {ratingValues.map((value) => (
                <Pressable
                  key={value}
                  disabled={!feedbackReady}
                  onPress={() => rate(value)}
                  accessibilityRole={`button`}
                  {...elementProps(`directory-feedback-star`, `${suffix}-${value}`)}
                  accessibilityState={{ selected: entry.rating === value, disabled: !feedbackReady }}
                  accessibilityLabel={entry.rating === value ? `Clear Your ${value}-Star Rating For ${directoryName}` : `Rate ${directoryName} ${value} Of 5 Stars`}
                  style={({ pressed }) => [styles.star, entry.rating >= value && styles.starSelected, pressed && styles.pressed, !feedbackReady && styles.disabled]}
                >
                  <Icon
                    size={16}
                    name={`star`}
                    filled={entry.rating >= value}
                    color={entry.rating >= value ? color : palette.muted}
                    id={`${identity}-star-${value}-icon`}
                    className={`directory-feedback-star-icon`}
                  />
                </Pressable>
              ))}
            </View>
          </View>}
        </View>
      </View>
      {!card && (reviewOpen ? (
        <View {...elementProps(`directory-feedback-review-panel`, suffix)} style={styles.reviewPanel}>
          <Text {...elementProps(`directory-feedback-review-label`, suffix)} style={styles.controlLabel}>
            {`Your Review`}
          </Text>
          <TextInput
            multiline
            maxLength={600}
            value={reviewDraft}
            style={styles.reviewInput}
            editable={feedbackReady}
            selectionColor={palette.blue}
            onChangeText={updateReviewDraft}
            accessibilityLabel={`Your Review Of ${directoryName}`}
            placeholderTextColor={palette.muted}
            placeholder={`What Was Helpful About ${directoryName}?`}
            {...elementProps(`directory-feedback-review-input`, suffix)}
          />
          <View {...elementProps(`directory-feedback-review-actions`, suffix)} style={styles.reviewActions}>
            <Text {...elementProps(`directory-feedback-review-length`, suffix)} style={styles.reviewLength}>
              {`${reviewDraft.length}/600`}
            </Text>
            <Pressable
              onPress={toggleReview}
              accessibilityRole={`button`}
              {...elementProps(`directory-feedback-review-cancel`, suffix)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
            >
              <Icon
                size={13}
                name={`close`}
                color={palette.muted}
                id={`${identity}-cancel-icon`}
                className={`directory-feedback-cancel-icon`}
              />
              <Text {...elementProps(`directory-feedback-cancel-label`, suffix)} style={[common.actionLabel, styles.actionLabel]}>
                {`Cancel`}
              </Text>
            </Pressable>
            <Pressable
              onPress={saveReview}
              disabled={!feedbackReady}
              accessibilityRole={`button`}
              {...elementProps(`directory-feedback-review-save`, suffix)}
              style={({ pressed }) => [styles.action, styles.save, pressed && styles.pressed, !feedbackReady && styles.disabled]}
            >
              <Icon
                size={13}
                name={`check`}
                color={palette.white}
                id={`${identity}-save-icon`}
                className={`directory-feedback-save-icon`}
              />
              <Text {...elementProps(`directory-feedback-save-label`, suffix)} style={[common.actionLabel, styles.actionLabel, styles.saveLabel]}>
                {`Save Review`}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : entry.review ? (
        <Text {...elementProps(`directory-feedback-review-text`, suffix)} style={styles.reviewText}>
          {entry.review}
        </Text>
      ) : null)}
      {feedbackError || message ? (
        <Text
          accessibilityLiveRegion={`polite`}
          {...elementProps(`directory-feedback-message`, suffix)}
          style={[styles.message, Boolean(feedbackError) && styles.error]}
        >
          {feedbackError ?? message}
        </Text>
      ) : null}
    </View>
  );
}
