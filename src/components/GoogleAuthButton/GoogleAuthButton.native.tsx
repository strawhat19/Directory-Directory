import { styles } from './GoogleAuthButton.native.styles';
import { Image, Pressable, Text, View } from 'react-native';
import { elementProps } from '../../shared/ui/elementProps';
import type { GoogleAuthButtonProps } from './GoogleAuthButton.types';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const GoogleAuthButton = ({ mode }: GoogleAuthButtonProps) => {
  const { palette, styles: common } = useBlogPresentation();
  const label = mode === `sign-up` ? `Sign up with Google` : `Sign in with Google`;

  return (
    <View {...elementProps(`auth-google-option`, mode)} style={styles.option}>
      <Pressable
        disabled
        style={[styles.button, { borderColor: palette.border }]}
        accessibilityLabel={label}
        accessibilityRole={`button`}
        accessibilityState={{ disabled: true }}
        {...elementProps(`auth-google-button`, mode)}
        accessibilityHint={`Google sign-in is coming soon`}
      >
        <Image
          accessible={false}
          resizeMode={`contain`}
          style={styles.logo}
          accessibilityElementsHidden
          {...elementProps(`auth-google-logo`, mode)}
          importantForAccessibility={`no-hide-descendants`}
          source={require(`../../../public/brand/google-g.png`)}
        />
        <Text {...elementProps(`auth-google-label`, mode)} style={[common.actionLabel, styles.label]}>{label}</Text>
      </Pressable>
      <Text {...elementProps(`auth-google-notice`, mode)} style={[common.metaLabel, styles.notice]}>{`Google sign-in is coming soon.`}</Text>
      <View {...elementProps(`auth-google-divider`, mode)} style={styles.divider}>
        <View accessible={false} {...elementProps(`auth-google-divider-line`, `${mode}-before`)} style={[styles.dividerLine, { backgroundColor: palette.border }]} />
        <Text {...elementProps(`auth-google-divider-label`, mode)} style={[common.metaLabel, styles.dividerLabel]}>{`Or continue with email`}</Text>
        <View accessible={false} {...elementProps(`auth-google-divider-line`, `${mode}-after`)} style={[styles.dividerLine, { backgroundColor: palette.border }]} />
      </View>
    </View>
  );
};

export default GoogleAuthButton;
