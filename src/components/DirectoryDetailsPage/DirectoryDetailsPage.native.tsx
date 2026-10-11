import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import BlogLayout from '../BlogLayout/BlogLayout';
import { Pressable, Text, View } from 'react-native';
import { directories } from '../../shared/catalog/catalog';
import { elementProps } from '../../shared/ui/elementProps';
import { styles } from './DirectoryDetailsPage.native.styles';
import DirectoryDetails from '../DirectoryDetails/DirectoryDetails';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

export default function DirectoryDetailsPage({ slug }: { slug: string }) {
  const directory = directories.find((entry) => entry.id === slug);
  const scope = `directory-${directory?.id ?? `missing`}`;
  const { palette, styles: common } = useBlogPresentation();
  const backLink = (
    <Link href={`/`} asChild>
      <Pressable {...elementProps(`directory-page-back`, scope)} accessibilityRole={`link`} style={({ pressed }) => [common.backLink, pressed && common.pressed]}>
        <Icon size={14} name={`folder`} color={palette.blue} id={`directory-page-back-icon-${scope}`} className={`directory-page-back-icon`} />
        <Text {...elementProps(`directory-page-back-label`, scope)} style={common.backLabel}>{`Back To Directories`}</Text>
      </Pressable>
    </Link>
  );

  if (!directory) return (
    <BlogLayout scope={scope} hero={(
      <View {...elementProps(`directory-page-missing-hero`, scope)} style={styles.hero}>
        {backLink}
        <Text {...elementProps(`directory-page-missing-title`, scope)} accessibilityRole={`header`} style={[common.title, styles.missingTitle]}>{`This Directory Couldn't Be Found`}</Text>
        <Text {...elementProps(`directory-page-missing-summary`, scope)} style={[common.paragraph, styles.missingSummary]}>{`Browse the collection to find directories, resources, and your next good find.`}</Text>
      </View>
    )}>
      <Link href={`/`} asChild>
        <Pressable {...elementProps(`directory-page-browse`, scope)} accessibilityRole={`link`} style={({ pressed }) => [common.action, pressed && common.pressed]}>
          <Icon size={15} name={`folder`} color={palette.blue} id={`directory-page-browse-icon-${scope}`} className={`directory-page-browse-icon`} />
          <Text {...elementProps(`directory-page-browse-label`, scope)} style={common.actionLabel}>{`Explore Directories`}</Text>
        </Pressable>
      </Link>
    </BlogLayout>
  );

  return (
    <BlogLayout scope={scope} hero={backLink}>
      <DirectoryDetails directory={directory} scope={`page`} />
    </BlogLayout>
  );
}
