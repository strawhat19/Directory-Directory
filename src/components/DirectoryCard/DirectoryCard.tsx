import './DirectoryCard.scss';
import Icon from '../Icon/Icon';
import useDirectoryCard from './useDirectoryCard';
import type { DirectoryEntry } from '../../shared/catalog/catalog';

interface DirectoryCardProps {
    directory: DirectoryEntry;
}

export default function DirectoryCard({ directory }: DirectoryCardProps) {
    const {
        saved,
        category,
        identity,
        previewDirectory,
        toggleDirectorySaved,
    } = useDirectoryCard(directory);

    return (
        <article
            id={identity}
            className={`directory-card directory-card--${directory.accent}`}
        >
            <button
                type={`button`}
                id={`${identity}-preview`}
                className={`directory-card__main`}
                aria-label={`Preview ${directory.name}`}
                onClick={previewDirectory}
            >
                <span
                    aria-hidden={true}
                    id={`${identity}-monogram`}
                    className={`directory-card__monogram`}
                >
                    {directory.initials}
                </span>

                <span
                    id={`${identity}-body`}
                    className={`directory-card__body`}
                >
                    <span
                        id={`${identity}-category`}
                        className={`directory-card__category dd-eyebrow`}
                    >
                        {category?.label}
                    </span>

                    <span
                        id={`${identity}-name`}
                        className={`directory-card__name`}
                    >
                        {directory.name}
                    </span>

                    <span
                        id={`${identity}-summary`}
                        className={`directory-card__summary`}
                    >
                        {directory.summary}
                    </span>
                </span>

                <span
                    id={`${identity}-footer`}
                    className={`directory-card__footer`}
                >
                    <span
                        id={`${identity}-label`}
                        className={`directory-card__label`}
                    >
                        {directory.label}
                    </span>

                    <span
                        id={`${identity}-preview-label`}
                        className={`directory-card__preview-label`}
                    >
                        <span
                            id={`${identity}-preview-text`}
                            className={`directory-card__preview-text`}
                        >
                            {`Preview`}
                        </span>

                        <Icon
                            size={16}
                            name={`arrow-up-right`}
                            id={`${identity}-preview-icon`}
                            className={`directory-card__preview-icon`}
                        />
                    </span>
                </span>
            </button>

            <button
                type={`button`}
                aria-pressed={saved}
                id={`${identity}-save`}
                onClick={toggleDirectorySaved}
                className={`directory-card__save dd-icon-button${saved ? ` is-saved` : ``}`}
                aria-label={saved ? `Remove ${directory.name} from saved` : `Save ${directory.name}`}
            >
                <Icon
                    size={18}
                    name={`bookmark`}
                    id={`${identity}-save-icon`}
                    className={`directory-card__save-icon`}
                />
            </button>
        </article>
    );
}
