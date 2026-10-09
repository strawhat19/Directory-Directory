import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { useState } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './DirectoryIntroCta.native.styles';
import { elementProps } from '../../shared/ui/elementProps';
import { directoryIntroCta } from './DirectoryIntroCta.content';
import { useDirectoryIntroCta } from './useDirectoryIntroCta.native';
import { Animated, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const ringRadii = [36, 70, 104];
const dots = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  x: 10 + index % 8 * 18,
  y: 10 + Math.floor(index / 8) * 18,
}));
const renderBlackPeriods = (text: string, scope: string) => text.split(/(\.)/).map((part, index) => part === `.` ? (
  <Text {...elementProps(`${scope}-period`, `${index}`)} key={`${scope}-period-${index}`} style={styles.period}>{part}</Text>
) : part);

type DirectoryIntroCtaProps = {
  onExplore: () => void;
  horizontalInset?: number;
  backgroundStyle?: Animated.WithAnimatedValue<ViewStyle>;
};

const DirectoryIntroCta = ({ onExplore, backgroundStyle, horizontalInset }: DirectoryIntroCtaProps) => {
  const [height, setHeight] = useState(200);
  const helixHeight = Math.max(380, height * 1.6 + 140);
  const { rungs, strands } = useDirectoryIntroCta(helixHeight);
  const { width, padding, styles: common } = useBlogPresentation();
  const id = directoryIntroCta.id;
  const wide = width >= 900;
  const centerInset = Math.max(0, (width - 1344) / 2);
  const inset = horizontalInset ?? padding + centerInset;
  const contentPadding = horizontalInset === undefined ? padding : Math.max(0, horizontalInset - centerInset);

  return (
    <Animated.View
      {...elementProps(id)}
      onLayout={(event) => {
        const measuredHeight = Math.round(event.nativeEvent.layout.height);
        setHeight((current) => current === measuredHeight ? current : measuredHeight);
      }}
      style={[styles.section, { width, marginHorizontal: -inset, paddingHorizontal: contentPadding }, backgroundStyle]}
    >
      <View {...elementProps(`${id}-decoration`)} pointerEvents={`none`} accessibilityElementsHidden importantForAccessibility={`no-hide-descendants`} style={styles.decoration}>
        <Svg {...elementProps(`${id}-dots`)} width={160} height={120} viewBox={`0 0 160 120`} style={[styles.pattern, styles.dots]}>
          {dots.map((dot) => <Circle {...elementProps(`${id}-dot`, `${dot.id}`)} key={dot.id} r={1.5} cx={dot.x} cy={dot.y} fill={`#ffffff`} />)}
        </Svg>
        <Svg {...elementProps(`${id}-rings`)} width={240} height={240} viewBox={`0 0 240 240`} style={[styles.pattern, styles.rings]}>
          {ringRadii.map((radius) => <Circle {...elementProps(`${id}-ring`, `${radius}`)} key={radius} r={radius} cx={120} cy={120} fill={`none`} strokeWidth={1.5} stroke={`#ffffff`} />)}
        </Svg>
        <View {...elementProps(`${id}-artwork`)} style={[styles.artwork, !wide && styles.artworkSmall]}>
          <View {...elementProps(`${id}-helix`)} style={[styles.helix, { height: helixHeight }]}>
            {rungs.map((rung) => <Animated.View {...elementProps(`${id}-helix-rung`, `${rung.id}`)} key={rung.id} style={[styles.helixRung, { top: helixHeight / 2 - 0.75 }, rung.style]} />)}
            {strands.map((strand) => (
              <View {...elementProps(`${id}-helix-strand`, `${strand.id}`)} key={strand.id}>
                {strand.segments.map((segment) => <Animated.View {...elementProps(`${id}-helix-segment`, `${strand.id}-${segment.id}`)} key={segment.id} style={[styles.helixSegment, { top: helixHeight / 2 - 1 }, segment.style]} />)}
                {strand.nodes.map((node) => (
                  <Animated.View {...elementProps(`${id}-helix-node`, `${strand.id}-${node.id}`)} key={node.id} style={[styles.helixNode, { top: helixHeight / 2 - 4 }, node.style]}>
                    <View {...elementProps(`${id}-helix-sphere-shading`, `${strand.id}-${node.id}`)} style={styles.helixNodeShading} />
                  </Animated.View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </View>
      <View {...elementProps(`${id}-content`)} style={[styles.content, !wide && styles.contentSmall]}>
        <View {...elementProps(`${id}-copy`)} style={[styles.copy, !wide && styles.copySmall]}>
          <View {...elementProps(`${id}-eyebrow-row`)} style={styles.eyebrowRow}>
            <Icon size={14} name={`grid`} color={`#ffffff`} id={`${id}-eyebrow-icon`} className={`${id}-eyebrow-icon`} pathStrokeColors={[`#ffffff`, `#000000`, `#000000`, `#ffffff`]} />
            <Text {...elementProps(`${id}-eyebrow`)} style={[common.eyebrowLabel, styles.eyebrow]}>{renderBlackPeriods(directoryIntroCta.eyebrow, `${id}-eyebrow`)}</Text>
          </View>
          <Text {...elementProps(`${id}-heading`)} accessibilityRole={`header`} style={[common.strongTitle, styles.heading, !wide && styles.headingSmall]}>{renderBlackPeriods(directoryIntroCta.title, `${id}-heading`)}</Text>
          <Text {...elementProps(`${id}-description`)} style={[common.paragraph, styles.description]}>{renderBlackPeriods(directoryIntroCta.description, `${id}-description`)}</Text>
        </View>
        <View {...elementProps(`${id}-actions`)} style={[styles.actions, !wide && styles.actionsSmall]}>
          <Pressable {...elementProps(`${id}-explore`)} onPress={onExplore} accessibilityRole={`button`} hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }} accessibilityLabel={`Explore Directories`} style={({ pressed }) => [styles.button, styles.exploreButton, pressed && styles.pressed]}>
            <Text {...elementProps(`${id}-explore-label`)} style={[common.actionLabel, styles.buttonLabel, styles.exploreLabel]}>{`Explore`}</Text>
            <Icon filled size={13} name={`folder`} color={`#ffffff`} id={`${id}-explore-icon`} className={`${id}-explore-icon`} />
          </Pressable>
          <Link href={directoryIntroCta.href} asChild>
            <Pressable {...elementProps(`${id}-link`)} accessibilityRole={`link`} hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }} accessibilityLabel={`Read More About What A Directory Is`} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
              <Text {...elementProps(`${id}-link-label`)} style={[common.actionLabel, styles.buttonLabel]}>{renderBlackPeriods(directoryIntroCta.label, `${id}-link-label`)}</Text>
              <Icon size={13} name={`arrow-right`} color={`#18243a`} id={`${id}-link-icon`} className={`${id}-link-icon`} />
            </Pressable>
          </Link>
        </View>
      </View>
    </Animated.View>
  );
};

export default DirectoryIntroCta;
