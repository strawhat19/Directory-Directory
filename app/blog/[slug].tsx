import { useLocalSearchParams } from 'expo-router';
import { blogArticles } from '../../src/shared/blog/articles';
import BlogArticlePage from '../../src/components/BlogArticlePage/BlogArticlePage';

export const generateStaticParams = () => blogArticles.map(({ slug }) => ({ slug }));

export default function BlogArticle() {
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  return <BlogArticlePage slug={Array.isArray(slug) ? slug?.[0] ?? `` : slug ?? ``} />;
}
