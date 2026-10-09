import Icon from '../Icon/Icon';
import { Text, View } from 'react-native';
import HeroAtom from '../HeroAtom/HeroAtom';
import BrandMark from '../BrandMark/BrandMark';
import { styles } from './ContactArtwork.native.styles';
import { elementProps } from '../../shared/ui/elementProps';
import { contactArtworkFolders } from './contactArtworkFolders';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';

const ContactArtwork = () => {
  const { width, palette, styles: common } = useBlogPresentation();
  const compact = width < 420;

  return (
    <View
      accessible={false}
      pointerEvents={`none`}
      accessibilityElementsHidden
      {...elementProps(`contact-artwork`)}
      importantForAccessibility={`no-hide-descendants`}
      style={[styles.frame, compact && styles.frameCompact]}
    >
      <Svg id={`contact-artwork-dots`} width={`100%`} height={`100%`} viewBox={`0 0 500 236`} preserveAspectRatio={`xMidYMid slice`} style={styles.dots}>
        <Defs>
          <Pattern id={`contact-artwork-dot-pattern`} width={20} height={20} patternUnits={`userSpaceOnUse`}>
            <Circle id={`contact-artwork-dot`} r={1} cx={1} cy={1} opacity={0.18} fill={palette.blue} />
          </Pattern>
        </Defs>
        <Rect id={`contact-artwork-dot-grid`} width={500} height={236} fill={`url(#contact-artwork-dot-pattern)`} />
      </Svg>
      <View {...elementProps(`contact-artwork-atom-frame`)} style={styles.atomFrame}>
        <HeroAtom />
      </View>
      <View {...elementProps(`contact-artwork-mark-frame`)} style={styles.markFrame}>
        <BrandMark size={116} id={`contact-artwork-brand-mark`} className={`contact-artwork-brand-mark`} />
      </View>
      <View {...elementProps(`contact-artwork-folders`)} style={[styles.folders, compact && styles.foldersCompact]}>
        {contactArtworkFolders.map((folder, index) => (
          <View
            key={folder.id}
            {...elementProps(`contact-artwork-folder`, folder.id)}
            style={[styles.folder, styles.folderOffsets?.[index], { backgroundColor: palette.surface, borderColor: `${folder.color}38` }]}
          >
            <View {...elementProps(`contact-artwork-folder-tint`, folder.id)} style={[styles.tint, { backgroundColor: `${folder.color}14` }]} />
            <View {...elementProps(`contact-artwork-folder-tab`, folder.id)} style={[styles.tab, { backgroundColor: `${folder.color}33`, borderColor: `${folder.color}38` }]} />
            <Text {...elementProps(`contact-artwork-number`, folder.id)} style={[common.metaLabel, styles.number]}>{String(index + 1).padStart(2, `0`)}</Text>
            <View {...elementProps(`contact-artwork-copy`, folder.id)} style={styles.copy}>
              <Text {...elementProps(`contact-artwork-detail`, folder.id)} numberOfLines={1} style={[common.actionLabel, styles.detail, { color: palette.muted }]}>{folder.detail}</Text>
              <Text {...elementProps(`contact-artwork-label`, folder.id)} numberOfLines={1} style={[common.actionLabel, styles.label, { color: palette.ink }]}>{folder.label}</Text>
            </View>
            <Icon size={17} name={folder.icon} color={folder.color} id={`contact-artwork-icon-${folder.id}`} className={`contact-artwork-icon`} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ContactArtwork;
