import './DirectoryCardPreview.scss';
import useDirectoryCardPreview from './useDirectoryCardPreview';
import type { DirectoryEntry } from '../../shared/catalog/catalog';

export default function DirectoryCardPreview({ directory }: { directory: DirectoryEntry }) {
    const identity = `directory-card-${directory.id}-preview`;
    const { hideImage, imageSource } = useDirectoryCardPreview(directory.previewImage);

    return (
        <div id={identity} className={`directory-card-preview`}>
            {imageSource ? (
                <img
                    width={1200}
                    height={675}
                    loading={`lazy`}
                    decoding={`async`}
                    key={imageSource}
                    src={imageSource}
                    onError={hideImage}
                    id={`${identity}-image`}
                    referrerPolicy={`no-referrer`}
                    className={`directory-card-preview__image`}
                    alt={`${directory.name} website preview`}
                />
            ) : (
                <span
                    aria-hidden={true}
                    id={`${identity}-initials`}
                    className={`directory-card-preview__initials`}
                >
                    {directory.initials}
                </span>
            )}
        </div>
    );
}
