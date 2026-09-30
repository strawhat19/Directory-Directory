import Icon from '../Icon/Icon';
import { styles } from './DirectoryMarquee.native.styles';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useDirectoryMarquee } from './useDirectoryMarquee.native';
import { elementProps } from '../../shared/ui/elementProps';
import { popularDirectories } from '../../shared/navigation/popularDirectories';

type DirectoryMarqueeProps = {
  scope?: string;
};

export default function DirectoryMarquee({ scope = `header` }: DirectoryMarqueeProps) {
  const {
    copies,
    scroll,
    onScroll,
    isPlaying,
    reduceMotion,
    onTouchMove,
    measureCycle,
    onTouchStart,
    openDirectory,
    measureViewport,
    pauseInteraction,
    releaseInteraction,
    onScrollBeginDrag,
    togglePaused,
  } = useDirectoryMarquee();

  return (
    <View
      {...elementProps(`directory-marquee`, scope)}
      style={styles.bar}
    >
      <ScrollView
        horizontal
        ref={scroll}
        bounces={false}
        onScroll={onScroll}
        style={styles.viewport}
        scrollEventThrottle={16}
        onTouchMove={onTouchMove}
        onTouchStart={onTouchStart}
        onLayout={measureViewport}
        onTouchEnd={releaseInteraction}
        onTouchCancel={releaseInteraction}
        onScrollBeginDrag={onScrollBeginDrag}
        contentContainerStyle={styles.track}
        showsHorizontalScrollIndicator={false}
        onScrollEndDrag={releaseInteraction}
        onMomentumScrollBegin={pauseInteraction}
        onMomentumScrollEnd={releaseInteraction}
        {...elementProps(`directory-marquee-viewport`, scope)}
      >
        {copies.map((copyIndex) => (
          <View
            key={copyIndex}
            style={styles.cycle}
            accessibilityElementsHidden={copyIndex !== 1}
            onLayout={copyIndex === 0 ? measureCycle : undefined}
            importantForAccessibility={copyIndex === 1 ? `auto` : `no-hide-descendants`}
            {...elementProps(`directory-marquee-cycle`, `${scope}-${copyIndex}`)}
          >
            {popularDirectories.map((directory) => (
              <Pressable
                key={directory.id}
                hitSlop={4}
                accessibilityRole={`link`}
                accessibilityLabel={`${directory.label}, opens in browser`}
                onPress={() => openDirectory(directory.href)}
                style={({ pressed }) => [
                  styles.pill,
                  { borderColor: directory.color, backgroundColor: directory.background },
                  pressed && styles.pressed,
                ]}
                {...elementProps(`directory-marquee-pill`, `${scope}-${copyIndex}-${directory.id}`)}
              >
                <Icon
                  size={14}
                  name={directory.icon}
                  color={directory.color}
                  className={`directory-marquee-pill-icon`}
                  id={`directory-marquee-pill-icon-${scope}-${copyIndex}-${directory.id}`}
                />
                <Text
                  style={[styles.label, { color: directory.color }]}
                  {...elementProps(`directory-marquee-pill-label`, `${scope}-${copyIndex}-${directory.id}`)}
                >
                  {directory.label}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
      <Pressable
        disabled={reduceMotion}
        onPress={togglePaused}
        accessibilityRole={`button`}
        accessibilityState={{ disabled: reduceMotion }}
        accessibilityLabel={isPlaying ? `Pause directory scrolling` : `Play directory scrolling`}
        accessibilityHint={reduceMotion ? `Automatic scrolling is off because reduced motion is enabled.` : undefined}
        style={({ pressed }) => [
          styles.control,
          pressed && styles.pressed,
          reduceMotion && styles.disabled,
        ]}
        {...elementProps(`directory-marquee-control`, scope)}
      >
        <Icon
          size={13}
          color={`#6b7280`}
          name={isPlaying ? `pause` : `play`}
          className={`directory-marquee-control-icon`}
          id={`directory-marquee-control-icon-${scope}`}
        />
        <Text
          style={styles.controlLabel}
          {...elementProps(`directory-marquee-control-label`, scope)}
        >
          {isPlaying ? `Pause` : `Play`}
        </Text>
      </Pressable>
    </View>
  );
}
