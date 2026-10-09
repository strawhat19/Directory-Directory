import Icon from '../Icon/Icon';
import { styles } from './DirectoryMarquee.native.styles';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Pressable, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useDirectoryMarquee } from './useDirectoryMarquee.native';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { getNativePalette } from '../../shared/theme/nativePalette';
import { popularDirectories } from '../../shared/navigation/popularDirectories';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

type DirectoryMarqueeProps = {
  scope?: string;
};

export default function DirectoryMarquee({ scope = `header` }: DirectoryMarqueeProps) {
  const { isDark } = useTheme();
  const palette = getNativePalette(isDark);
  const { width } = useWindowDimensions();
  const { styles: common } = useBlogPresentation();
  const fadeWidth = Math.max(32, Math.min(72, width * 0.06));
  const {
    copies,
    scroll,
    onScroll,
    onTouchMove,
    measureCycle,
    onTouchStart,
    openDirectory,
    measureViewport,
    pauseInteraction,
    releaseInteraction,
    onScrollBeginDrag,
  } = useDirectoryMarquee();

  return (
    <View
      {...elementProps(`directory-marquee`, scope)}
      style={[styles.bar, isDark && styles.darkBar, { width }]}
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
            {popularDirectories.map((directory) => {
              const darkInkPill = isDark && directory.color === getNativePalette(false).ink;
              const color = darkInkPill ? palette.ink : directory.color;

              return (
                <Pressable
                  key={directory.id}
                  hitSlop={4}
                  accessibilityRole={`link`}
                  accessibilityLabel={`${directory.label}, opens in browser`}
                  onPress={() => openDirectory(directory.href)}
                  style={({ pressed }) => [
                    styles.pill,
                    {
                      borderColor: color,
                      backgroundColor: darkInkPill ? palette.surface : directory.background,
                    },
                    pressed && styles.pressed,
                  ]}
                  {...elementProps(`directory-marquee-pill`, `${scope}-${copyIndex}-${directory.id}`)}
                >
                  <Icon
                    size={14}
                    color={color}
                    name={directory.icon}
                    className={`directory-marquee-pill-icon`}
                    id={`directory-marquee-pill-icon-${scope}-${copyIndex}-${directory.id}`}
                  />
                  <Text
                    style={[common.actionLabel, styles.label, { color }]}
                    {...elementProps(`directory-marquee-pill-label`, `${scope}-${copyIndex}-${directory.id}`)}
                  >
                    {directory.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>
      {([`left`, `right`] as const).map((side) => {
        const gradientId = `directory-marquee-fade-gradient-${scope}-${side}`;

        return (
          <View
            key={side}
            pointerEvents={`none`}
            accessibilityElementsHidden
            importantForAccessibility={`no-hide-descendants`}
            style={[
              styles.fade,
              side === `left` ? styles.fadeLeft : styles.fadeRight,
              { width: fadeWidth },
            ]}
            {...elementProps(`directory-marquee-fade`, `${scope}-${side}`)}
          >
            <Svg width={`100%`} height={`100%`}>
              <Defs>
                <LinearGradient
                  id={gradientId}
                  x1={`0%`}
                  y1={`0%`}
                  x2={`100%`}
                  y2={`0%`}
                >
                  <Stop
                    offset={`0%`}
                    stopColor={palette.background}
                    stopOpacity={side === `left` ? 0.76 : 0}
                  />
                  <Stop
                    offset={`100%`}
                    stopColor={palette.background}
                    stopOpacity={side === `left` ? 0 : 0.76}
                  />
                </LinearGradient>
              </Defs>
              <Rect width={`100%`} height={`100%`} fill={`url(#${gradientId})`} />
            </Svg>
          </View>
        );
      })}
    </View>
  );
}
