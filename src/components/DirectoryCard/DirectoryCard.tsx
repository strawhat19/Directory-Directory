import './DirectoryCard.scss';
import Icon from '../Icon/Icon';
import useDirectoryCard from './useDirectoryCard';
import type { DirectoryEntry } from '../../shared/catalog/catalog';
import DirectoryFeedback from '../DirectoryFeedback/DirectoryFeedback';
import DirectoryCardPreview from '../DirectoryCardPreview/DirectoryCardPreview';

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

            <div
                id={`${identity}-main`}
                className={`directory-card__main`}
            >
                <DirectoryCardPreview directory={directory} />

                <div
                    id={`${identity}-body`}
                    className={`directory-card__body`}
                >
                    <div
                        id={`${identity}-category-row`}
                        className={`directory-card__category-row`}
                    >
                        <span
                            id={`${identity}-category`}
                            className={`directory-card__category dd-eyebrow`}
                        >
                            {category?.label}
                        </span>

                        <a
                            target={`_blank`}
                            href={directory.href}
                            title={directory.href}
                            rel={`noopener noreferrer`}
                            id={`${identity}-website`}
                            className={`directory-card__website`}
                        >
                            <Icon
                                size={14}
                                name={`arrow-up-right`}
                                id={`${identity}-website-icon`}
                                className={`directory-card__website-icon`}
                            />
                            <span id={`${identity}-website-label`} className={`directory-card__website-label`}>
                                {websiteLabel}
                            </span>
                        </a>
                    </div>

                    <h3
                        id={`${identity}-name`}
                        className={`directory-card__name`}
                    >
                        {directory.name}
                    </h3>

                    <p
                        id={`${identity}-summary`}
                        className={`directory-card__summary`}
                    >
                        {directory.summary}
                    </p>
                </div>

                <div
                    id={`${identity}-footer`}
                    className={`directory-card__footer`}
                >
                    <span
                        id={`${identity}-label`}
                        className={`directory-card__label`}
                    >
                        {directory.label}
                    </span>
                    <div id={`${identity}-statuses`} className={`directory-card__statuses actionsCell`}>
                        {statuses.map((status) => (
                            <span
                                key={status.id}
                                title={status.description}
                                id={`${identity}-status-${status.id}`}
                                className={`directory-card__status rowStatus rowStatus--${status.tone}`}
                            >
                                <Icon
                                    size={13}
                                    name={status.icon}
                                    id={`${identity}-status-icon-${status.id}`}
                                    className={`directory-card__status-icon`}
                                />
                                <span id={`${identity}-status-text-${status.id}`} className={`statusText`}>
                                    {status.label}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div id={`${identity}-details`} className={`directory-card__details`}>
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
                            {topic}
                        </button>
                    ))}
                </div>
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
