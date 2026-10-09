import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import PageCta from '../PageCta/PageCta';
import BlogCard from '../BlogCard/BlogCard';
import BlogLayout from '../BlogLayout/BlogLayout';
import PageEyebrow from '../PageEyebrow/PageEyebrow';
import { styles } from './BlogArticlePage.native.styles';
import { getArticleCta } from '../../shared/cta/pageCtas';
import { Image, Pressable, Text, View } from 'react-native';
import { formatBlogDate } from '../BlogCard/formatBlogDate';
import { elementProps } from '../../shared/ui/elementProps';
import type { BlogArticlePageProps } from './BlogArticlePage.types';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { featuredArticle, getBlogArticle, getRelatedArticles } from '../../shared/blog/articles';

const BlogArticlePage = ({ slug }: BlogArticlePageProps) => {
  const article = getBlogArticle(slug);
  const scope = article?.slug ?? `missing`;
  const { width, styles: common, palette } = useBlogPresentation();
  const cardWidth = width >= 1100 ? `31.8%` : width >= 760 ? `48%` : `100%`;
  const backLink = (
    <Link href={`/blog`} asChild>
      <Pressable {...elementProps(`blog-article-back`, scope)} style={({ pressed }) => [common.backLink, pressed && common.pressed]}>
        <Icon size={14} name={`file-text`} color={palette.muted} id={`blog-article-back-icon-${scope}`} className={`blog-article-back-icon`} />
        <Text {...elementProps(`blog-article-back-label`, scope)} style={common.backLabel}>{`Back to the Blog`}</Text>
      </Pressable>
    </Link>
  );

  if (!article) return (
    <BlogLayout scope={scope} hero={(
      <>
        {backLink}
        <PageEyebrow page={`blog`} label={`The Directory Journal`} id={`blog-article-eyebrow-${scope}`} />
        <Text {...elementProps(`blog-heading`, scope)} accessibilityRole={`header`} style={[common.title, styles.heading]}>{`This Article Couldn't Be Found`}</Text>
        <Text {...elementProps(`blog-missing-summary`)} style={[common.summary, styles.summary]}>{`Browse the journal to find stories and guides about directories, resources, and discovery.`}</Text>
      </>
    )}>
      <Link href={`/blog`} asChild>
        <Pressable {...elementProps(`blog-missing-link`)} style={({ pressed }) => [common.action, pressed && common.pressed]}>
          <Text {...elementProps(`blog-missing-label`)} style={[common.actionLabel, styles.actionLabel]}>{`Explore the Blog`}</Text>
          <Icon size={16} name={`arrow-right`} color={palette.blue} id={`blog-missing-icon`} className={`blog-missing-icon`} />
        </Pressable>
      </Link>
    </BlogLayout>
  );

  return (
    <BlogLayout article scope={scope} hero={(
      <>
        {backLink}
        <PageEyebrow
          page={`blog`}
          label={article.category}
          id={`blog-article-eyebrow-${scope}`}
          labelId={`blog-article-category-${scope}`}
          iconId={`blog-article-eyebrow-icon-${scope}`}
        />
        <Text {...elementProps(`blog-heading`, scope)} accessibilityRole={`header`} style={[common.title, styles.heading]}>{article.title}</Text>
        <Text {...elementProps(`blog-article-summary`, scope)} style={[common.summary, styles.summary]}>{article.excerpt}</Text>
        <View {...elementProps(`blog-article-meta`, scope)} style={common.metadata}>
          <Text {...elementProps(`blog-article-byline`, scope)} style={[common.metaLabel, styles.metadataLabel]}>{`By Directory Directory`}</Text>
          <Text {...elementProps(`blog-article-date`, scope)} style={[common.metaLabel, styles.metadataLabel]}>{formatBlogDate(article.datePublished)}</Text>
          <View {...elementProps(`blog-article-reading`, scope)} style={common.metaItem}>
            <Icon size={13} name={`clock`} color={palette.muted} id={`blog-article-clock-${scope}`} className={`blog-article-clock`} />
            <Text {...elementProps(`blog-article-reading-label`, scope)} style={[common.metaLabel, styles.metadataLabel]}>{`${article.readMinutes} min read`}</Text>
          </View>
        </View>
      </>
    )}>
      {article.id === featuredArticle.id ? (
        <View {...elementProps(`blog-article-figure`, scope)} style={styles.figure}>
          <Image resizeMode={`cover`} style={styles.image} source={require(`../../../public/blog/directory-history.png`)} {...elementProps(`blog-article-image`, scope)} accessibilityLabel={`Printed directories and address books beside a laptop showing a modern online directory`} />
          <Text {...elementProps(`blog-article-caption`, scope)} style={[common.paragraph, styles.caption]}>{`The format changed. The idea stayed familiar: organize resources so people can find a useful next step.`}</Text>
        </View>
      ) : null}
      <View {...elementProps(`blog-article-tags`, scope)} style={styles.tags}>
        {article.tags.map((tag) => <Text key={tag} {...elementProps(`blog-article-tag`, `${scope}-${tag}`)} style={[common.metaLabel, styles.tag, { color: palette.blue, backgroundColor: palette.blueSoft }]}>{tag}</Text>)}
      </View>
      <View {...elementProps(`blog-article-prose`, scope)} style={[styles.prose, { borderColor: palette.border, backgroundColor: palette.surface }]}>
        {article.sections.map((section) => (
          <View key={section.id} {...elementProps(`blog-article-section`, `${scope}-${section.id}`)} style={[styles.section, { borderColor: palette.border }]}>
            <Text {...elementProps(`blog-article-section-title`, `${scope}-${section.id}`)} accessibilityRole={`header`} style={[common.title, styles.sectionTitle]}>{section.title}</Text>
            {section.paragraphs.map((paragraph, index) => <Text key={index} {...elementProps(`blog-article-paragraph`, `${scope}-${section.id}-${index}`)} style={[common.paragraph, styles.paragraph]}>{paragraph}</Text>)}
          </View>
        ))}
        {article.sources?.length ? (
          <View {...elementProps(`blog-article-sources`, scope)} style={styles.sources}>
            <Text {...elementProps(`blog-article-sources-heading`, scope)} accessibilityRole={`header`} style={[common.title, styles.sectionTitle]}>{`Sources & Further Reading`}</Text>
            {article.sources.map((source, index) => (
              <Link key={source.url} href={source.url} asChild>
                <Pressable {...elementProps(`blog-article-source-link`, `${scope}-${index}`)} style={({ pressed }) => [styles.source, pressed && common.pressed]}>
                  <Text {...elementProps(`blog-article-source-label`, `${scope}-${index}`)} style={[common.actionLabel, styles.sourceLabel]}>{source.label}</Text>
                  <Icon size={13} name={`arrow-up-right`} color={palette.blue} id={`blog-article-source-icon-${scope}-${index}`} className={`blog-article-source-icon`} />
                </Pressable>
              </Link>
            ))}
          </View>
        ) : null}
      </View>
      <PageCta content={getArticleCta(article)} />
      <View {...elementProps(`blog-related`, scope)} style={styles.related}>
        <View {...elementProps(`blog-related-intro`, scope)} style={styles.relatedIntro}>
          <Text {...elementProps(`blog-related-eyebrow`, scope)} style={common.eyebrowLabel}>{`Follow Your Curiosity`}</Text>
          <Text {...elementProps(`blog-related-heading`, scope)} accessibilityRole={`header`} style={[common.title, styles.relatedHeading]}>{`Related Articles`}</Text>
        </View>
        <View {...elementProps(`blog-related-grid`, scope)} style={styles.relatedGrid}>
          {getRelatedArticles(article).map((related) => (
            <View key={related.id} {...elementProps(`blog-related-card-wrapper`, `${scope}-${related.id}`)} style={{ width: cardWidth }}>
              <BlogCard article={related} scope={`related-${scope}`} />
            </View>
          ))}
        </View>
        <View {...elementProps(`blog-article-browse`, scope)} style={styles.browse}>
          <Link href={`/blog`} asChild>
            <Pressable {...elementProps(`blog-article-browse-blog`, scope)} style={({ pressed }) => [common.action, pressed && common.pressed]}>
              <Icon size={15} name={`file-text`} color={palette.blue} id={`blog-article-browse-blog-icon-${scope}`} className={`blog-article-browse-blog-icon`} />
              <Text {...elementProps(`blog-article-browse-blog-label`, scope)} style={[common.actionLabel, styles.actionLabel]}>{`Browse All Articles`}</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </BlogLayout>
  );
};

export default BlogArticlePage;
