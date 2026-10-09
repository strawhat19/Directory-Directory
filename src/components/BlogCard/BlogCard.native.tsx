import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { formatBlogDate } from './formatBlogDate';
import { styles } from './BlogCard.native.styles';
import { Pressable, Text, View } from 'react-native';
import type { BlogCardProps } from './BlogCard.types';
import { useTheme } from '../../shared/theme/useTheme';
import { getBlogCardAccent } from '../../shared/blog/accents';
import { elementProps } from '../../shared/ui/elementProps';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const BlogCard = ({ scope, article }: BlogCardProps) => {
  const id = `${scope}-${article.id}`;
  const { isDark } = useTheme();
  const accent = getBlogCardAccent(article.id, isDark);
  const { styles: common, palette } = useBlogPresentation();

  return (
    <Link href={`/blog/${article.slug}`} asChild>
      <Pressable
        accessibilityRole={`link`}
        accessibilityLabel={`Read ${article.title}`}
        {...elementProps(`blog-card`, id)}
        style={({ pressed }) => [styles.card, { borderColor: palette.border, borderTopColor: accent.color, backgroundColor: palette.surface }, pressed && common.pressed]}
      >
        <View
          accessible={false}
          pointerEvents={`none`}
          accessibilityElementsHidden
          {...elementProps(`blog-card-folder-tab`, id)}
          importantForAccessibility={`no-hide-descendants`}
          style={[styles.folderTab, { backgroundColor: accent.color }]}
        />
        <View {...elementProps(`blog-card-top`, id)} style={styles.top}>
          <View {...elementProps(`blog-card-symbol`, id)} style={[styles.symbol, { backgroundColor: accent.background }]}>
            <Icon size={23} name={`file-text`} color={accent.color} id={`blog-card-symbol-icon-${id}`} className={`blog-card-symbol-icon`} />
          </View>
          <Text {...elementProps(`blog-card-category`, id)} style={[common.eyebrowLabel, styles.category, { color: accent.color }]}>{article.category}</Text>
        </View>
        <Text {...elementProps(`blog-card-title`, id)} accessibilityRole={`header`} style={[common.title, styles.title]}>{article.title}</Text>
        <Text {...elementProps(`blog-card-excerpt`, id)} style={[common.paragraph, styles.excerpt]}>{article.excerpt}</Text>
        <View {...elementProps(`blog-card-footer`, id)} style={[styles.footer, { borderColor: palette.border }]}>
          <View {...elementProps(`blog-card-meta`, id)} style={common.metadata}>
            <Text {...elementProps(`blog-card-date`, id)} style={[common.metaLabel, styles.metadataLabel]}>{formatBlogDate(article.datePublished)}</Text>
            <Text {...elementProps(`blog-card-reading`, id)} style={[common.metaLabel, styles.metadataLabel]}>{`${article.readMinutes} min read`}</Text>
          </View>
          <View {...elementProps(`blog-card-read`, id)} style={common.action}>
            <Text {...elementProps(`blog-card-read-label`, id)} style={[common.actionLabel, styles.actionLabel, { color: accent.color }]}>{`Read Article`}</Text>
            <Icon size={15} name={`arrow-right`} color={accent.color} id={`blog-card-read-icon-${id}`} className={`blog-card-read-icon`} />
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default BlogCard;
