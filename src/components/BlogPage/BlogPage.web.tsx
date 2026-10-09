import './BlogPage.scss';
import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import BlogSeo from '../BlogSeo/BlogSeo';
import BlogCard from '../BlogCard/BlogCard';
import BlogLayout from '../BlogLayout/BlogLayout';
import PageEyebrow from '../PageEyebrow/PageEyebrow';
import CommunityFeeds from '../CommunityFeeds/CommunityFeeds';
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle';
import BlogDirectoryCta from '../BlogDirectoryCta/BlogDirectoryCta';
import { blogArticles, featuredArticle } from '../../shared/blog/articles';
import { getPageNavigation } from '../../shared/navigation/siteNavigation';

const BlogPage = () => (
  <>
    <BlogSeo />
    <BlogLayout scope={`index`} hero={(
      <>
        <Link href={`/`} id={`blog-back-directories`} className={`blog-back-link`}>
          <Icon size={14} name={`grid`} id={`blog-back-directories-icon`} className={`blog-back-link__icon`} />
          <span id={`blog-back-directories-label`} className={`blog-back-link__label`}>{`Back to Directories`}</span>
        </Link>
        <div id={`blog-index-hero-intro`} className={`blog-page__hero-intro`}>
          <div id={`blog-index-hero-copy`} className={`blog-page__hero-copy`}>
            <h1 id={`blog-heading-index`} className={`blog-heading`}>{`Blog`}</h1>
            <p id={`blog-index-summary`} className={`blog-summary`}>{`Learn what directories are, discover their story, and find practical ways to explore collections of websites, tools, communities, and resources.`}</p>
          </div>
          <PageEyebrow
            page={`blog`}
            id={`blog-index-eyebrow`}
            label={`The Directory Journal`}
            iconId={`blog-index-eyebrow-icon`}
            labelId={`blog-index-eyebrow-label`}
            className={`blog-page__hero-eyebrow`}
          />
        </div>
      </>
    )}>
      <FeaturedArticle fullBleed scope={`blog-index`} showBlogLink={false} backgroundColor={getPageNavigation(`blog`).color} />
      <section id={`blog-articles`} className={`blog-page__articles`} aria-labelledby={`blog-articles-heading`}>
        <div id={`blog-articles-intro`} className={`blog-page__section-intro`}>
          <p id={`blog-articles-eyebrow`} className={`blog-page__eyebrow dd-eyebrow`}>{`Keep Exploring`}</p>
          <h2 id={`blog-articles-heading`} className={`blog-page__section-heading`}>{`Good Finds Start With Curiosity.`}</h2>
          <p id={`blog-articles-summary`} className={`blog-page__section-summary`}>{`A few useful guides to help you browse with purpose and follow your interests further.`}</p>
        </div>
        <div id={`blog-articles-grid`} className={`blog-grid blog-page__grid`}>
          {blogArticles.filter((article) => article.id !== featuredArticle.id).map((article) => <BlogCard key={article.id} article={article} scope={`blog-index`} />)}
        </div>
      </section>
      <BlogDirectoryCta />
      <CommunityFeeds />
    </BlogLayout>
  </>
);

export default BlogPage;
