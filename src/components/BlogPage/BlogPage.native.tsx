import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import BlogCard from '../BlogCard/BlogCard';
import { styles } from './BlogPage.native.styles';
import BlogLayout from '../BlogLayout/BlogLayout';
import { Pressable, Text, View } from 'react-native';
import PageEyebrow from '../PageEyebrow/PageEyebrow';
import { elementProps } from '../../shared/ui/elementProps';
import CommunityFeeds from '../CommunityFeeds/CommunityFeeds';
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle';
import BlogDirectoryCta from '../BlogDirectoryCta/BlogDirectoryCta';
import { blogArticles, featuredArticle } from '../../shared/blog/articles';
import { getPageNavigation } from '../../shared/navigation/siteNavigation';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const BlogPage = () => {
  const { width, padding, styles: common, palette } = useBlogPresentation();
  const cardWidth = width >= 1100 ? `31.8%` : width >= 760 ? `48%` : `100%`;

  return (
    <BlogLayout scope={`index`} hero={(
      <>
        <Link href={`/`} asChild>
          <Pressable {...elementProps(`blog-back-directories`)} style={({ pressed }) => [common.backLink, pressed && common.pressed]}>
            <Icon size={14} name={`grid`} color={palette.muted} id={`blog-back-directories-icon`} className={`blog-back-directories-icon`} />
            <Text {...elementProps(`blog-back-directories-label`)} style={common.backLabel}>{`Back to Directories`}</Text>
          </Pressable>
        </Link>
        <View {...elementProps(`blog-index-hero-intro`)} style={[styles.heroIntro, width >= 760 && styles.heroIntroWide]}>
          <View {...elementProps(`blog-index-hero-copy`)} style={[styles.heroCopy, width >= 760 && styles.heroCopyWide]}>
            <Text {...elementProps(`blog-heading-index`)} accessibilityRole={`header`} style={common.heading}>{`Blog`}</Text>
            <Text {...elementProps(`blog-index-summary`)} style={common.summary}>{`Learn what directories are, discover their story, and find practical ways to explore collections of websites, tools, communities, and resources.`}</Text>
          </View>
          <PageEyebrow
            page={`blog`}
            id={`blog-index-eyebrow`}
            label={`The Directory Journal`}
            iconId={`blog-index-eyebrow-icon`}
            labelId={`blog-index-eyebrow-label`}
            style={[styles.heroBadge, width >= 760 && styles.heroBadgeWide]}
          />
        </View>
      </>
    )}>
      <FeaturedArticle fullBleed showBlogLink={false} scope={`blog-index`} backgroundColor={getPageNavigation(`blog`).color} horizontalInset={padding + Math.max(0, (width - 1260) / 2)} />
      <View {...elementProps(`blog-articles`)} style={styles.section}>
        <View {...elementProps(`blog-articles-intro`)} style={styles.intro}>
          <Text {...elementProps(`blog-articles-eyebrow`)} style={common.eyebrowLabel}>{`Keep Exploring`}</Text>
          <Text {...elementProps(`blog-articles-heading`)} accessibilityRole={`header`} style={common.title}>{`Good Finds Start With Curiosity.`}</Text>
          <Text {...elementProps(`blog-articles-summary`)} style={common.paragraph}>{`A few useful guides to help you browse with purpose and follow your interests further.`}</Text>
        </View>
        <View {...elementProps(`blog-articles-grid`)} style={styles.grid}>
          {blogArticles.filter((article) => article.id !== featuredArticle.id).map((article) => (
            <View key={article.id} {...elementProps(`blog-card-wrapper`, article.id)} style={{ width: cardWidth }}>
              <BlogCard article={article} scope={`blog-index`} />
            </View>
          ))}
        </View>
      </View>
      <BlogDirectoryCta />
      <CommunityFeeds />
    </BlogLayout>
  );
};

export default BlogPage;
