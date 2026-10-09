import Icon from '../Icon/Icon';
import { elementProps } from '../../shared/ui/elementProps';
import { Animated, Pressable, Text, View } from 'react-native';
import { styles } from './DirectoryScrollButton.native.styles';
import { directoryScrollActions } from './DirectoryScrollButton.content';
import { useDirectoryScrollButton } from './useDirectoryScrollButton.native';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import type { DirectoryScrollButtonProps } from './DirectoryScrollButton.types';

const DirectoryScrollButton = ({ onExplore, target = `directories` }: DirectoryScrollButtonProps) => {
  const { styles: common } = useBlogPresentation();
  const { backgroundStyle } = useDirectoryScrollButton(target === `directories`);
  const action = directoryScrollActions[target];
  const id = `directory-scroll-button-${target}`;

  return (
    <Animated.View {...elementProps(`${id}-container`)} style={[styles.container, backgroundStyle, target === `categories` && styles.categories]}>
      <Pressable
        onPress={onExplore}
        {...elementProps(id)}
        accessibilityRole={`button`}
        accessibilityLabel={action.ariaLabel}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <View {...elementProps(`${id}-icon-container`)} style={styles.icon} pointerEvents={`none`}>
          <Icon size={16} color={`#ffffff`} name={action.icon} id={`${id}-icon`} className={`${id}-icon`} />
        </View>
        <View {...elementProps(`${id}-label-container`)} style={styles.labelContainer} pointerEvents={`none`}>
          {action.letters.map((letter, index) => (
            <Text
              key={index}
              {...elementProps(`${id}-letter`, `${index}`)}
              style={[common.actionLabel, styles.label, !common.actionLabel.fontFamily && styles.labelFallback]}
            >
              {letter}
            </Text>
          ))}
        </View>
        <View {...elementProps(`${id}-arrow-container`)} style={styles.arrow} pointerEvents={`none`}>
          <Icon size={16} color={`#ffffff`} name={`arrow-up`} id={`${id}-arrow`} className={`${id}-arrow`} />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default DirectoryScrollButton;
