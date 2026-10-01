import './DirectoryCard.scss';
import Icon from '../Icon/Icon';
import useDirectoryCard from './useDirectoryCard';
import DirectoryFeedback from '../DirectoryFeedback/DirectoryFeedback';
import type { DirectoryEntry } from '../../shared/catalog/catalog';

interface DirectoryCardProps {
    directory: DirectoryEntry;
}

export default function DirectoryCard({ directory }: DirectoryCardProps) {
    const {
        saved,
        statuses,
        category,
        identity,
        selectTopic,
        websiteLabel,
        feedbackReady,
        isTopicSelected,
        previewDirectory,
        toggleDirectorySaved,
    } = useDirectoryCard(directory);

    return (
        <article
            id={identity}
            className={`directory-card directory-card--${directory.accent}`}
        >
            <span
                aria-hidden={true}
                id={`${identity}-tab`}
                className={`directory-card__tab`}
            />

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

            <div id={`${identity}-details`} className={`directory-card__details`}>
                <div id={`${identity}-statuses`} className={`directory-card__statuses actionsCell`}>
                    {statuses.map((status) => (
                        <span
                            key={status.id}
                            title={status.description}
                            id={`${identity}-status-${status.id}`}
                            className={`directory-card__status rowStatus rowStatus--${status.tone}`}
                        >
                            <span id={`${identity}-status-dot-wrap-${status.id}`} className={`statusDotWrap`}>
                                <span id={`${identity}-status-dot-${status.id}`} className={`statusDot`} />
                            </span>
                            <span id={`${identity}-status-text-${status.id}`} className={`statusText`}>
                                {status.label}
                            </span>
                        </span>
                    ))}
                </div>
                <div id={`${identity}-topics`} className={`directory-card__topics`}>
                    {directory.topics.map((topic, index) => (
                        <button
                            key={topic}
                            type={`button`}
                            onClick={() => selectTopic(topic)}
                            aria-pressed={isTopicSelected(topic)}
                            id={`${identity}-topic-${index}`}
                            className={`directory-card__topic`}
                        >
                            {`#${topic.replaceAll(/[^a-zA-Z0-9]/g, ``)}`}
                        </button>
                    ))}
                </div>
                <a
                    target={`_blank`}
                    href={directory.href}
                    title={directory.href}
                    rel={`noopener noreferrer`}
                    id={`${identity}-website`}
                    className={`directory-card__website`}
                >
                    <Icon
                        size={13}
                        name={`arrow-up-right`}
                        id={`${identity}-website-icon`}
                        className={`directory-card__website-icon`}
                    />
                    <span id={`${identity}-website-label`} className={`directory-card__website-label`}>
                        {websiteLabel}
                    </span>
                </a>
                <DirectoryFeedback directoryId={directory.id} directoryName={directory.name} />
            </div>

            <button
                type={`button`}
                disabled={!feedbackReady}
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
