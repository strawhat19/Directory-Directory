import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';

export const createDirectoryFeedbackStyles = (isDark: boolean) => {
  const palette = getNativePalette(isDark);

  return StyleSheet.create({
    feedback: {
      gap: 10,
      borderTopWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderTopColor: palette.border,
    },
    footer: {
      gap: 10,
      flexWrap: `wrap`,
      flexDirection: `row`,
      alignItems: `center`,
    },
    controls: {
      gap: 8,
      minWidth: 0,
      flexGrow: 1,
      flexShrink: 0,
      maxWidth: `100%`,
      flexWrap: `wrap`,
      marginLeft: `auto`,
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `flex-end`,
    },
    votes: {
      gap: 3,
      flexDirection: `row`,
      alignItems: `center`,
    },
    rating: {
      gap: 3,
      flexDirection: `row`,
      alignItems: `center`,
    },
    stars: {
      gap: 1,
      flexDirection: `row`,
      alignItems: `center`,
    },
    controlLabel: {
      fontSize: 10,
      fontWeight: `600`,
      color: palette.muted,
    },
    vote: {
      width: 32,
      height: 36,
      borderRadius: 7,
      alignItems: `center`,
      justifyContent: `center`,
    },
    upvoteSelected: {
      backgroundColor: isDark ? `#15372d` : `#ecf7f1`,
    },
    downvoteSelected: {
      backgroundColor: isDark ? `#3b2029` : `#fceff0`,
    },
    star: {
      width: 28,
      height: 36,
      borderRadius: 7,
      alignItems: `center`,
      justifyContent: `center`,
    },
    starSelected: {
      backgroundColor: palette.blueSoft,
    },
    reviewToggle: {
      gap: 6,
      flexShrink: 0,
      minHeight: 34,
      borderWidth: 1,
      borderRadius: 9,
      paddingVertical: 7,
      paddingHorizontal: 10,
      flexDirection: `row`,
      alignItems: `center`,
      borderColor: isDark ? `#294667` : `#bcd6f7`,
      backgroundColor: isDark ? `#172637` : `#f0f6fe`,
    },
    reviewToggleOpen: {
      borderColor: palette.blue,
      backgroundColor: palette.blueSoft,
    },
    linkLabel: {
      fontSize: 10,
      fontWeight: `600`,
      color: palette.ink,
    },
    reviewPanel: {
      gap: 8,
    },
    reviewInput: {
      fontSize: 11,
      borderWidth: 1,
      minHeight: 76,
      borderRadius: 9,
      lineHeight: 18,
      color: palette.ink,
      paddingVertical: 9,
      paddingHorizontal: 10,
      textAlignVertical: `top`,
      borderColor: palette.border,
      backgroundColor: palette.surface,
    },
    reviewActions: {
      gap: 8,
      flexDirection: `row`,
      alignItems: `center`,
      justifyContent: `flex-end`,
    },
    reviewLength: {
      flex: 1,
      fontSize: 10,
      color: palette.muted,
    },
    action: {
      gap: 5,
      minHeight: 36,
      borderRadius: 7,
      paddingVertical: 7,
      paddingHorizontal: 9,
      flexDirection: `row`,
      alignItems: `center`,
    },
    save: {
      backgroundColor: palette.blue,
    },
    actionLabel: {
      fontSize: 10,
      fontWeight: `600`,
      color: palette.muted,
    },
    saveLabel: {
      color: palette.white,
    },
    reviewText: {
      fontSize: 11,
      lineHeight: 18,
      color: palette.ink,
    },
    message: {
      fontSize: 10,
      lineHeight: 15,
      color: palette.muted,
    },
    error: {
      color: palette.red,
    },
    pressed: {
      opacity: 0.65,
    },
    disabled: {
      opacity: 0.45,
    },
  });
};
