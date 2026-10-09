import { Image, Text, View } from 'react-native';
import { elementProps } from '../../shared/ui/elementProps';
import { styles } from './DirectoryCardPreview.native.styles';
import useDirectoryCardPreview from './useDirectoryCardPreview';
import type { DirectoryEntry } from '../../shared/catalog/catalog';
import { directoryPreviewAssets } from '../../shared/catalog/directoryPreviewAssets.native';

interface DirectoryCardPreviewProps {
    color: string;
    fontFamily?: string;
    backgroundColor: string;
    directory: DirectoryEntry;
}

export default function DirectoryCardPreview({ color, directory, fontFamily, backgroundColor }: DirectoryCardPreviewProps) {
    const source = directoryPreviewAssets[directory.id] ?? (directory.previewImage?.startsWith(`https://`) ? { uri: directory.previewImage } : undefined);
    const { hideImage, imageSource } = useDirectoryCardPreview(source ? directory.previewImage ?? directory.id : undefined);

    return (
        <View
            {...elementProps(`landing-directory-banner`, directory.id)}
            style={[styles.preview, { backgroundColor }]}
        >
            {imageSource && source ? (
                <Image
                    key={imageSource}
                    resizeMode={`cover`}
                    onError={hideImage}
                    style={styles.image}
                    source={source}
                    accessibilityLabel={`${directory.name} website preview`}
                    {...elementProps(`landing-directory-banner-image`, directory.id)}
                />
            ) : (
                <Text
                    {...elementProps(`landing-directory-banner-initials`, directory.id)}
                    style={[styles.initials, { color, fontFamily }]}
                >
                    {directory.initials}
                </Text>
            )}
        </View>
    );
}
