import Icon from '../Icon/Icon';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { Animated, Pressable, Text, View } from 'react-native';
import { styles } from './DirectoryScrollButton.native.styles';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { directoryScrollActions } from './DirectoryScrollButton.content';
import { useDirectoryScrollButton } from './useDirectoryScrollButton.native';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import type { DirectoryScrollButtonProps } from './DirectoryScrollButton.types';

const DirectoryScrollButton = ({ onExplore, target = `directories` }: DirectoryScrollButtonProps) => {
  const { isDark } = useTheme();
  const accent = useSearchAccent();
  const { styles: common, palette } = useBlogPresentation();
  const { backgroundStyle } = useDirectoryScrollButton(target === `directories`);
  const darkCategory = target === `categories` && isDark;
  const foreground = darkCategory ? palette.ink : palette.white;
  const action = directoryScrollActions[target];
  const id = `directory-scroll-button-${target}`;

  return (
    <Animated.View
      {...elementProps(`${id}-container`)}
      style={[styles.container, backgroundStyle, target === `categories` && styles.categories, darkCategory && { backgroundColor: accent.background }]}
    >
      <Pressable
        onPress={onExplore}
        {...elementProps(id)}
        accessibilityRole={`button`}
        accessibilityLabel={action.ariaLabel}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <View {...elementProps(`${id}-icon-container`)} style={styles.icon} pointerEvents={`none`}>
          <Icon size={16} color={foreground} name={action.icon} filled={action.icon === `folder`} id={`${id}-icon`} className={`${id}-icon`} />
        </View>
        <View {...elementProps(`${id}-label-container`)} style={styles.labelContainer} pointerEvents={`none`}>
          {action.letters.map((letter, index) => (
            <Text
              key={index}
              {...elementProps(`${id}-letter`, `${index}`)}
              style={[common.actionLabel, styles.label, { color: foreground }, !common.actionLabel.fontFamily && styles.labelFallback]}
            >
              {letter}
            </Text>
          ))}
        </View>
        <View {...elementProps(`${id}-arrow-container`)} style={styles.arrow} pointerEvents={`none`}>
          <Icon size={16} color={foreground} name={`arrow-up`} id={`${id}-arrow`} className={`${id}-arrow`} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default DirectoryScrollButton;
