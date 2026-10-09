import Icon from '../Icon/Icon';
import { useState } from 'react';
import { Text, View } from 'react-native';
import BrandMark from '../BrandMark/BrandMark';
import { useTheme } from '../../shared/theme/useTheme';
import { getBlogStoryIcon } from './getBlogStoryIcon';
import { styles } from './BlogStoryArtwork.native.styles';
import { elementProps } from '../../shared/ui/elementProps';
import { getBlogCardAccent } from '../../shared/blog/accents';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import type { BlogStoryArtworkProps } from './BlogStoryArtwork.types';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const folderLayers = [`back`, `middle`, `main`] as const;

const BlogStoryArtwork = ({ article, scope }: BlogStoryArtworkProps) => {
  const { isDark } = useTheme();
  const [compact, setCompact] = useState(false);
  const { palette, styles: common } = useBlogPresentation();
  const accent = getBlogCardAccent(article.id, isDark);
  const artworkId = `${scope}-${article.id}`;
  const patternId = `blog-story-artwork-dot-pattern-${artworkId}`;

  return (
    <View
      accessible={false}
      pointerEvents={`none`}
      accessibilityElementsHidden
      {...elementProps(`blog-story-artwork`, artworkId)}
      importantForAccessibility={`no-hide-descendants`}
      style={[styles.frame, { backgroundColor: accent.background }]}
      onLayout={({ nativeEvent }) => setCompact(nativeEvent.layout.height < 260 || nativeEvent.layout.width < 320)}
    >
      <Svg width={`100%`} height={`100%`} style={styles.dots} viewBox={`0 0 500 320`} preserveAspectRatio={`xMidYMid slice`} {...elementProps(`blog-story-artwork-dots`, artworkId)}>
        <Defs>
          <Pattern id={patternId} width={22} height={22} patternUnits={`userSpaceOnUse`}>
            <Circle r={1} cx={1} cy={1} opacity={0.18} fill={accent.color} {...elementProps(`blog-story-artwork-dot`, artworkId)} />
          </Pattern>
        </Defs>
        <Rect width={500} height={320} fill={`url(#${patternId})`} {...elementProps(`blog-story-artwork-dot-grid`, artworkId)} />
      </Svg>
      <View {...elementProps(`blog-story-artwork-ring`, artworkId)} style={[styles.ring, { borderColor: `${accent.color}3d` }]}>
        <View {...elementProps(`blog-story-artwork-ring-inner`, artworkId)} style={[styles.ringInner, { borderColor: `${accent.color}0c` }]} />
      </View>
      {folderLayers.map((layer) => {
        const main = layer === `main`;
        const backgroundColor = main ? palette.surface : accent.background;
        const borderColor = `${accent.color}${main ? `40` : `66`}`;
        const layerId = `${artworkId}-${layer}`;

        return (
          <View
            key={layer}
            {...elementProps(`blog-story-artwork-folder`, layerId)}
            style={[styles.folder, { borderColor, backgroundColor }, layer === `back` ? styles.folderBack : layer === `middle` ? styles.folderMiddle : styles.folderMain, compact && styles.folderCompact, main && compact && styles.folderMainCompact]}
          >
            {!main ? <View {...elementProps(`blog-story-artwork-folder-tint`, layerId)} style={[styles.frame, { backgroundColor: `${accent.color}${layer === `back` ? `24` : `14`}` }]} /> : null}
            <View {...elementProps(`blog-story-artwork-folder-tab`, layerId)} style={[styles.tab, { borderColor, backgroundColor }]} />
            {main ? <>
              <Icon size={compact ? 48 : 72} strokeWidth={1.8} color={accent.color} name={getBlogStoryIcon(article.id)} id={`blog-story-artwork-icon-${artworkId}`} className={`blog-story-artwork-icon`} />
              <Text {...elementProps(`blog-story-artwork-category`, artworkId)} style={[common.actionLabel, styles.category, compact && styles.categoryCompact, { color: palette.ink }]}>{article.category}</Text>
            </> : null}
          </View>
        );
      })}
      <View {...elementProps(`blog-story-artwork-brand`, artworkId)} style={[styles.brand, compact && styles.brandCompact]}>
        <BrandMark size={compact ? 30 : 38} id={`blog-story-artwork-brand-mark-${artworkId}`} className={`blog-story-artwork-brand-mark`} />
        <Text {...elementProps(`blog-story-artwork-brand-label`, artworkId)} style={[common.actionLabel, styles.brandLabel, compact && styles.brandLabelCompact, { color: palette.ink }]}>{`Directory\nDirectory`}</Text>
      </View>
    </View>
  );
};

export default BlogStoryArtwork;
