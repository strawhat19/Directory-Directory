import { useMemo } from 'react';
import Icon from '../Icon/Icon';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { Pressable, Text, View, TextInput } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';
import type { DirectoryFeedbackProps } from './DirectoryFeedback.types';
import { ratingValues, useDirectoryFeedback } from './useDirectoryFeedback';
import { createDirectoryFeedbackStyles } from './DirectoryFeedback.native.styles';

export default function DirectoryFeedback(props: DirectoryFeedbackProps) {
  const { isDark } = useTheme();
  const palette = getNativePalette(isDark);
  const styles = useMemo(() => createDirectoryFeedbackStyles(isDark), [isDark]);
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
    <View {...elementProps(`directory-feedback`, props.directoryId)} style={styles.feedback}>
      <View {...elementProps(`directory-feedback-controls`, props.directoryId)} style={styles.controls}>
        <View {...elementProps(`directory-feedback-votes`, props.directoryId)} style={styles.votes}>
          <Text {...elementProps(`directory-feedback-vote-label`, props.directoryId)} style={styles.controlLabel}>
            {`Your Vote`}
          </Text>
          <Pressable
            disabled={!feedbackReady}
            onPress={() => vote(1)}
            accessibilityRole={`button`}
            {...elementProps(`directory-feedback-upvote`, props.directoryId)}
            accessibilityLabel={`Upvote ${directoryName}`}
            accessibilityState={{ selected: entry.vote === 1, disabled: !feedbackReady }}
            style={({ pressed }) => [styles.vote, entry.vote === 1 && styles.upvoteSelected, pressed && styles.pressed, !feedbackReady && styles.disabled]}
          >
            <Icon
              size={16}
              name={`upvote`}
              id={`${identity}-upvote-icon`}
              className={`directory-feedback-vote-icon`}
              color={entry.vote === 1 ? palette.green : palette.muted}
            />
          </Pressable>
          <Text
            style={styles.voteScore}
            {...elementProps(`directory-feedback-vote-score`, props.directoryId)}
            accessibilityLabel={`Your Vote: ${entry.vote > 0 ? `+1` : entry.vote}`}
          >
            {entry.vote > 0 ? `+1` : entry.vote}
          </Text>
          <Pressable
            disabled={!feedbackReady}
            onPress={() => vote(-1)}
            accessibilityRole={`button`}
            {...elementProps(`directory-feedback-downvote`, props.directoryId)}
            accessibilityLabel={`Downvote ${directoryName}`}
            accessibilityState={{ selected: entry.vote === -1, disabled: !feedbackReady }}
            style={({ pressed }) => [styles.vote, entry.vote === -1 && styles.downvoteSelected, pressed && styles.pressed, !feedbackReady && styles.disabled]}
          >
            <Icon
              size={16}
              name={`downvote`}
              id={`${identity}-downvote-icon`}
              className={`directory-feedback-vote-icon`}
              color={entry.vote === -1 ? palette.red : palette.muted}
            />
          </Pressable>
        </View>
        <View {...elementProps(`directory-feedback-rating`, props.directoryId)} style={styles.rating}>
          <Text {...elementProps(`directory-feedback-rating-label`, props.directoryId)} style={styles.controlLabel}>
            {entry.rating ? `Your Rating ${entry.rating}/5` : `Your Rating`}
          </Text>
          <View {...elementProps(`directory-feedback-stars`, props.directoryId)} style={styles.stars}>
            {ratingValues.map((value) => (
              <Pressable
                key={value}
                disabled={!feedbackReady}
                onPress={() => rate(value)}
                accessibilityRole={`button`}
                {...elementProps(`directory-feedback-star`, `${props.directoryId}-${value}`)}
                accessibilityState={{ selected: entry.rating === value, disabled: !feedbackReady }}
                accessibilityLabel={entry.rating === value ? `Clear Your ${value}-Star Rating For ${directoryName}` : `Rate ${directoryName} ${value} Of 5 Stars`}
                style={({ pressed }) => [styles.star, entry.rating >= value && styles.starSelected, pressed && styles.pressed, !feedbackReady && styles.disabled]}
              >
                <Icon
                  size={16}
                  name={`star`}
                  filled={entry.rating >= value}
                  color={entry.rating >= value ? palette.blue : palette.muted}
                  id={`${identity}-star-${value}-icon`}
                  className={`directory-feedback-star-icon`}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <Pressable
        disabled={!feedbackReady}
        onPress={toggleReview}
        accessibilityRole={`button`}
        accessibilityState={{ expanded: reviewOpen, disabled: !feedbackReady }}
        {...elementProps(`directory-feedback-review-toggle`, props.directoryId)}
        style={({ pressed }) => [styles.reviewToggle, pressed && styles.pressed, !feedbackReady && styles.disabled]}
      >
        <Icon
          size={13}
          name={`file-text`}
          color={palette.blue}
          id={`${identity}-review-icon`}
          className={`directory-feedback-review-icon`}
        />
        <Text {...elementProps(`directory-feedback-review-toggle-label`, props.directoryId)} style={styles.linkLabel}>
          {entry.review ? `Edit Review` : `Write Review`}
        </Text>
      </Pressable>
      {reviewOpen ? (
        <View {...elementProps(`directory-feedback-review-panel`, props.directoryId)} style={styles.reviewPanel}>
          <Text {...elementProps(`directory-feedback-review-label`, props.directoryId)} style={styles.controlLabel}>
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
            {...elementProps(`directory-feedback-review-input`, props.directoryId)}
          />
          <View {...elementProps(`directory-feedback-review-actions`, props.directoryId)} style={styles.reviewActions}>
            <Text {...elementProps(`directory-feedback-review-length`, props.directoryId)} style={styles.reviewLength}>
              {`${reviewDraft.length}/600`}
            </Text>
            <Pressable
              onPress={toggleReview}
              accessibilityRole={`button`}
              {...elementProps(`directory-feedback-review-cancel`, props.directoryId)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}
            >
              <Icon
                size={13}
                name={`close`}
                color={palette.muted}
                id={`${identity}-cancel-icon`}
                className={`directory-feedback-cancel-icon`}
              />
              <Text {...elementProps(`directory-feedback-cancel-label`, props.directoryId)} style={styles.actionLabel}>
                {`Cancel`}
              </Text>
            </Pressable>
            <Pressable
              onPress={saveReview}
              disabled={!feedbackReady}
              accessibilityRole={`button`}
              {...elementProps(`directory-feedback-review-save`, props.directoryId)}
              style={({ pressed }) => [styles.action, styles.save, pressed && styles.pressed, !feedbackReady && styles.disabled]}
            >
              <Icon
                size={13}
                name={`check`}
                color={palette.white}
                id={`${identity}-save-icon`}
                className={`directory-feedback-save-icon`}
              />
              <Text {...elementProps(`directory-feedback-save-label`, props.directoryId)} style={[styles.actionLabel, styles.saveLabel]}>
                {`Save Review`}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : entry.review ? (
        <Text {...elementProps(`directory-feedback-review-text`, props.directoryId)} style={styles.reviewText}>
          {entry.review}
        </Text>
      ) : null}
      <Text
        accessibilityLiveRegion={`polite`}
        {...elementProps(`directory-feedback-message`, props.directoryId)}
        style={[styles.message, Boolean(feedbackError) && styles.error]}
      >
        {feedbackError ?? (message || `Saved On This Device`)}
      </Text>
    </View>
  );
}
