import { useLocalSearchParams } from 'expo-router';
import { directories } from '../../src/shared/catalog/catalog';
import DirectoryDetailsPage from '../../src/components/DirectoryDetailsPage/DirectoryDetailsPage';

export const generateStaticParams = () => directories.map(({ id }) => ({ slug: id }));

export default function DirectoryPage() {
  const { slug } = useLocalSearchParams<{ slug?: string | string[] }>();
  return <DirectoryDetailsPage slug={Array.isArray(slug) ? slug?.[0] ?? `` : slug ?? ``} />;
}
