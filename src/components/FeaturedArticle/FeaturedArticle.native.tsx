import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './FeaturedArticle.native.styles';
import { Image, Pressable, Text, View } from 'react-native';
import { formatBlogDate } from '../BlogCard/formatBlogDate';
import { elementProps } from '../../shared/ui/elementProps';
import { featuredArticle } from '../../shared/blog/articles';
import type { FeaturedArticleProps } from './FeaturedArticle.types';
import BlogStoryArtwork from '../BlogStoryArtwork/BlogStoryArtwork';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const dotPositions = [`top`, `bottom`] as const;
const dotGrid = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  cx: 10 + (index % 8) * 18,
  cy: 10 + Math.floor(index / 8) * 18,
}));

const FeaturedArticle = ({ scope, article = featuredArticle, accentColor: suppliedAccentColor, backgroundColor, fullBleed = false, showBlogLink = true, horizontalInset = 0 }: FeaturedArticleProps) => {
  const accent = useSearchAccent();
  const { width, padding, styles: common, palette } = useBlogPresentation();
  const wide = width >= 900;
  const accentColor = suppliedAccentColor ?? (fullBleed ? accent.color : palette.blue);

  const card = (
    <View
      {...elementProps(`featured-article`, scope)}
      style={[styles.feature, { flexDirection: wide ? `row` : `column`, borderColor: palette.border, backgroundColor: palette.surface }]}
    >
      <Link href={`/blog/${article.slug}`} asChild>
        <Pressable
          accessibilityLabel={`Read ${article.title}`}
          {...elementProps(`featured-article-image-link`, scope)}
          style={({ pressed }) => [styles.imageLink, wide ? { flex: 1, minHeight: 240 } : { width: `100%`, aspectRatio: 1.65 }, pressed && common.pressed]}
        >
          {article.id === featuredArticle.id ? <Image
            resizeMode={`cover`}
            style={styles.image}
            {...elementProps(`featured-article-image`, scope)}
            source={require(`../../../public/blog/directory-history.png`)}
            accessibilityLabel={`Printed directories and address books beside a laptop showing a modern online directory`}
          /> : <BlogStoryArtwork article={article} scope={scope} />}
        </Pressable>
      </Link>
      <View {...elementProps(`featured-article-copy`, scope)} style={styles.copy}>
        <View {...elementProps(`featured-article-eyebrow`, scope)} style={common.eyebrow}>
          <Icon size={15} name={`star`} color={accentColor} id={`featured-article-eyebrow-icon-${scope}`} className={`featured-article-eyebrow-icon`} />
          <Text {...elementProps(`featured-article-eyebrow-label`, scope)} style={[common.eyebrowLabel, { color: accentColor }]}>{article.id === featuredArticle.id ? `Featured Story` : `From the Blog`}</Text>
        </View>
        <Link href={`/blog/${article.slug}`} asChild>
          <Pressable
            accessibilityRole={`link`}
            accessibilityLabel={`Read ${article.title}`}
            {...elementProps(`featured-article-title-link`, scope)}
            style={({ pressed }) => [pressed && common.pressed]}
          >
            <Text {...elementProps(`featured-article-title`, scope)} accessibilityRole={`header`} style={[common.title, styles.title]}>{article.title}</Text>
          </Pressable>
        </Link>
        <Text {...elementProps(`featured-article-excerpt`, scope)} style={[common.paragraph, styles.excerpt]}>{article.excerpt}</Text>
        <View {...elementProps(`featured-article-meta`, scope)} style={common.metadata}>
          <Text {...elementProps(`featured-article-date`, scope)} style={[common.metaLabel, styles.metadataLabel]}>{formatBlogDate(article.datePublished)}</Text>
          <Text {...elementProps(`featured-article-reading`, scope)} style={[common.metaLabel, styles.metadataLabel]}>{`${article.readMinutes} min read`}</Text>
        </View>
        <View {...elementProps(`featured-article-actions`, scope)} style={styles.actions}>
          <Link href={showBlogLink ? `/blog` : `/blog/${article.slug}`} asChild>
            <Pressable {...elementProps(`featured-article-primary-link`, scope)} style={({ pressed }) => [styles.primary, { backgroundColor: accentColor }, pressed && common.pressed]}>
              <Icon size={16} name={showBlogLink ? `file-text` : `arrow-right`} color={palette.white} id={`featured-article-primary-icon-${scope}`} className={`featured-article-primary-icon`} />
              <Text {...elementProps(`featured-article-primary-label`, scope)} style={[common.actionLabel, styles.actionLabel, { color: palette.white }]}>{showBlogLink ? `Explore the Blog` : `Read the Story`}</Text>
            </Pressable>
          </Link>
          {showBlogLink ? <Link href={`/blog/${article.slug}`} asChild>
            <Pressable {...elementProps(`featured-article-read-link`, scope)} style={({ pressed }) => [common.action, pressed && common.pressed]}>
              <Text {...elementProps(`featured-article-read-label`, scope)} style={[common.actionLabel, styles.actionLabel, { color: accentColor }]}>{`Read the Story`}</Text>
              <Icon size={15} name={`arrow-right`} color={accentColor} id={`featured-article-read-icon-${scope}`} className={`featured-article-read-icon`} />
            </Pressable>
          </Link> : null}
        </View>
      </View>
    </View>
  );

  if (!fullBleed) return card;

  return (
    <View
      {...elementProps(`featured-article-band`, scope)}
      style={[styles.fullBleed, { width, paddingHorizontal: padding, marginHorizontal: -horizontalInset, backgroundColor: backgroundColor ?? accent.color }]}
    >
      {dotPositions.map((position) => (
        <Svg
          key={position}
          width={160}
          height={120}
          accessible={false}
          pointerEvents={`none`}
          viewBox={`0 0 160 120`}
          accessibilityElementsHidden
          importantForAccessibility={`no-hide-descendants`}
          {...elementProps(`featured-article-dot-grid`, `${scope}-${position}`)}
          style={[styles.dotGrid, position === `top` ? styles.dotGridTop : styles.dotGridBottom]}
        >
          {dotGrid.map((dot) => (
            <Circle key={dot.id} r={1.5} cx={dot.cx} cy={dot.cy} fill={palette.white} {...elementProps(`featured-article-dot`, `${scope}-${position}-${dot.id}`)} />
          ))}
        </Svg>
      ))}
      <View {...elementProps(`featured-article-band-content`, scope)} style={styles.fullBleedContent}>
        {card}
      </View>
    </View>
  );
};

export default FeaturedArticle;
