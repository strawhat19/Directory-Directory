import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { styles } from './PageCta.native.styles';
import type { PageCtaProps } from './PageCta.types';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { useTheme } from '../../shared/theme/useTheme';
import { elementProps } from '../../shared/ui/elementProps';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { getPageNavigation } from '../../shared/navigation/siteNavigation';

const ringRadii = [36, 70, 104];
const darkTextColors = { red: `#e26c71`, blue: `#4697fb`, green: `#59bc8e`, purple: `#a07fe1` };
const patternPositions = [`top`, `bottom`] as const;
const gridRows = Array.from({ length: 8 }, (_, index) => index * 24);
const gridColumns = Array.from({ length: 11 }, (_, index) => index * 24);
const dotGrid = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  cx: 10 + (index % 8) * 18,
  cy: 10 + Math.floor(index / 8) * 18,
}));

const PageCta = ({ content, banner = false, compact = false, fullBleed = true, parentMaxWidth = 1260, horizontalInset, navigationPage }: PageCtaProps) => {
  const { isDark } = useTheme();
  const { width, padding, styles: common, palette } = useBlogPresentation();
  const wide = width >= 900;
  const centerInset = Math.max(0, (width - parentMaxWidth) / 2);
  const inset = horizontalInset ?? padding + centerInset;
  const contentPadding = horizontalInset === undefined ? padding : Math.max(0, horizontalInset - centerInset);
  const navigation = navigationPage ? getPageNavigation(navigationPage) : undefined;
  const tone = navigation?.tone ?? content.tone;
  const icon = navigation?.icon ?? content.icon;
  const accentColor = navigation?.color ?? palette[tone];
  const buttonColor = tone === `green` ? `#157b4a` : tone === `blue` ? `#0869df` : accentColor;
  const textColor = isDark ? darkTextColors[tone] : buttonColor;
  const bannerInk = tone === `green` ? `#000000` : palette.white;
  const primaryInk = banner ? buttonColor : palette.white;
  const patternSize = content.pattern === `dots` ? { width: 160, height: 120 } : content.pattern === `rings` ? { width: 240, height: 240 } : { width: 240, height: 168 };
  const patternStyles = content.pattern === `dots` ? [styles.dotsTop, styles.dotsBottom] : content.pattern === `rings` ? [styles.ringsTop, styles.ringsBottom] : [styles.gridTop, styles.gridBottom];
  const id = content.id;
  const isBlogCta = id === `blog-directory-cta` || id.startsWith(`article-cta-`);
  const primaryIconId = id === `blog-directory-cta` && content.primary.icon === `grid` ? `${id}-grid-icon` : `${id}-primary-icon`;

  return (
    <View
      {...elementProps(id)}
      style={[
        styles.section,
        (compact || isBlogCta) && styles.compact,
        banner && styles.banner,
        !fullBleed && styles.contained,
        { width: fullBleed ? width : `100%`, backgroundColor: accentColor, paddingHorizontal: contentPadding, marginHorizontal: fullBleed ? -inset : 0 },
      ]}
    >
      {patternPositions.map((position, positionIndex) => (
        <Svg
          key={position}
          accessible={false}
          pointerEvents={`none`}
          width={patternSize.width}
          height={patternSize.height}
          accessibilityElementsHidden
          importantForAccessibility={`no-hide-descendants`}
          {...elementProps(`${id}-pattern`, `${content.pattern}-${position}`)}
          viewBox={`0 0 ${patternSize.width} ${patternSize.height}`}
          style={[styles.pattern, patternStyles[positionIndex]]}
        >
          {content.pattern === `dots` ? dotGrid.map((dot) => (
            <Circle key={dot.id} r={1.5} cx={dot.cx} cy={dot.cy} fill={palette.white} {...elementProps(`${id}-dot`, `${position}-${dot.id}`)} />
          )) : content.pattern === `rings` ? ringRadii.map((radius) => (
            <Circle key={radius} r={radius} cx={120} cy={120} fill={`none`} strokeWidth={1.5} stroke={palette.white} {...elementProps(`${id}-ring`, `${position}-${radius}`)} />
          )) : (
            <>
              {gridRows.map((row) => <Line key={`row-${row}`} x1={0} x2={240} y1={row} y2={row} strokeWidth={1} stroke={palette.white} {...elementProps(`${id}-grid-row`, `${position}-${row}`)} />)}
              {gridColumns.map((column) => <Line key={`column-${column}`} y1={0} y2={168} x1={column} x2={column} strokeWidth={1} stroke={palette.white} {...elementProps(`${id}-grid-column`, `${position}-${column}`)} />)}
            </>
          )}
        </Svg>
      ))}
      <View {...elementProps(`${id}-content`)} style={[styles.content, { maxWidth: Math.max(0, parentMaxWidth - contentPadding * 2) }]}>
        <View
          {...elementProps(`${id}-card`)}
          style={[styles.card, (compact || isBlogCta) && styles.cardCompact, { flexDirection: wide ? `row` : `column`, borderColor: palette.border, backgroundColor: palette.surface }, banner && styles.cardBanner]}
        >
          <View {...elementProps(`${id}-copy`)} style={[styles.copy, isBlogCta && styles.blogCopy, wide ? { flex: 1 } : { width: `100%` }]}>
            {!banner ? <View {...elementProps(`${id}-eyebrow`)} style={common.eyebrow}>
              <Icon size={15} name={icon} color={textColor} id={`${id}-eyebrow-icon`} className={`${id}-eyebrow-icon`} />
              <Text {...elementProps(`${id}-eyebrow-label`)} style={[common.eyebrowLabel, { color: textColor }]}>{content.eyebrow}</Text>
            </View> : null}
            {banner ? (
              <View {...elementProps(`${id}-heading-row`)} style={styles.bannerHeading}>
                <Icon size={24} name={icon} color={bannerInk} id={`${id}-heading-icon`} className={`${id}-heading-icon`} />
                <Text {...elementProps(`${id}-heading`)} accessibilityRole={`header`} style={[common.title, styles.heading, styles.bannerHeadingLabel, { color: bannerInk }]}>{content.title}</Text>
              </View>
            ) : <Text {...elementProps(`${id}-heading`)} accessibilityRole={`header`} style={[common.title, styles.heading, compact && styles.headingCompact, isBlogCta && styles.blogHeading]}>{content.title}</Text>}
            <Text {...elementProps(`${id}-text`)} style={[common.paragraph, banner && { color: bannerInk }]}>{content.description}</Text>
          </View>
          <View {...elementProps(`${id}-actions`)} style={[styles.actions, { alignSelf: wide ? `center` : `flex-start` }]}>
            <Link href={content.primary.href} asChild>
              <Pressable
                accessibilityRole={`link`}
                {...elementProps(`${id}-link`)}
                style={({ pressed }) => [styles.primary, { backgroundColor: banner ? palette.white : buttonColor }, pressed && common.pressed]}
              >
                {content.primary.icon !== `arrow-right` ? <Icon size={16} name={content.primary.icon} color={primaryInk} id={primaryIconId} className={`${id}-primary-icon`} /> : null}
                <Text {...elementProps(`${id}-label`)} style={[common.actionLabel, styles.primaryLabel, { color: primaryInk }]}>{content.primary.label}</Text>
                <Icon size={16} name={`arrow-right`} color={primaryInk} id={`${id}-icon`} className={`${id}-icon`} />
              </Pressable>
            </Link>
            {content.secondary ? (
              <Link href={content.secondary.href} asChild>
                <Pressable accessibilityRole={`link`} {...elementProps(`${id}-secondary-link`)} style={({ pressed }) => [styles.secondary, pressed && common.pressed]}>
                  <Icon size={15} name={content.secondary.icon} color={textColor} id={`${id}-secondary-icon`} className={`${id}-secondary-icon`} />
                  <Text {...elementProps(`${id}-secondary-label`)} style={[common.actionLabel, styles.secondaryLabel, { color: textColor }]}>{content.secondary.label}</Text>
                </Pressable>
              </Link>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PageCta;
