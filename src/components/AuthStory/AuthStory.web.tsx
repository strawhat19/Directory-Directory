import './AuthStory.scss';
import Icon from '../Icon/Icon';
import { useAuthStory } from './useAuthStory';
import HeroArtwork from '../HeroArtwork/HeroArtwork';

export default function AuthStory({ scope }: { scope: string }) {
    const { active, paused, select, setPaused, setFocused, setHovered, stories } = useAuthStory();

    return (
        <aside
            id={`auth-story-${scope}`}
            className={`auth-story`}
            aria-label={`Discover Directory Directory`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
            }}
        >
            <p id={`auth-story-eyebrow-${scope}`} className={`auth-story__eyebrow dd-eyebrow`}>
                <Icon
                    size={15}
                    name={`sparkles`}
                    id={`auth-story-eyebrow-icon-${scope}`}
                    className={`auth-story__eyebrow-icon`}
                />
                {`The internet, filed under good.`}
            </p>
            <div id={`auth-story-artwork-${scope}`} className={`auth-story__artwork`}>
                <HeroArtwork />
            </div>
            <div id={`auth-story-viewport-${scope}`} className={`auth-story__viewport`}>
                <div
                    id={`auth-story-track-${scope}`}
                    className={`auth-story__track`}
                    style={{ transform: `translateX(-${active * 100}%)` }}
                >
                    {stories.map((story, index) => (
                        <div
                            key={story.title}
                            inert={index !== active}
                            aria-hidden={index !== active}
                            id={`auth-story-slide-${scope}-${index}`}
                            className={`auth-story__slide`}
                        >
                            <h2 id={`auth-story-title-${scope}-${index}`} className={`auth-story__title`}>
                                {story.title}
                                <span id={`auth-story-accent-${scope}-${index}`} className={`auth-story__accent`}>
                                    {story.accent}
                                </span>
                            </h2>
                            <p id={`auth-story-copy-${scope}-${index}`} className={`auth-story__copy`}>
                                {story.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div id={`auth-story-controls-${scope}`} className={`auth-story__controls`}>
                <div id={`auth-story-dots-${scope}`} className={`auth-story__dots`}>
                    {stories.map((story, index) => (
                        <button
                            key={story.title}
                            type={`button`}
                            onClick={() => select(index)}
                            aria-pressed={index === active}
                            aria-label={`Show story ${index + 1}: ${story.title}`}
                            id={`auth-story-dot-${scope}-${index}`}
                            className={`auth-story__dot${index === active ? ` auth-story__dot--active` : ``}`}
                        >
                            <span
                                aria-hidden={true}
                                id={`auth-story-dot-mark-${scope}-${index}`}
                                className={`auth-story__dot-mark`}
                            />
                        </button>
                    ))}
                </div>
                <button
                    type={`button`}
                    aria-pressed={paused}
                    id={`auth-story-pause-${scope}`}
                    className={`auth-story__pause`}
                    onClick={() => setPaused((current) => !current)}
                    aria-label={paused ? `Play stories` : `Pause stories`}
                >
                    <Icon
                        size={13}
                        name={paused ? `play` : `pause`}
                        id={`auth-story-pause-icon-${scope}`}
                        className={`auth-story__pause-icon`}
                    />
                </button>
            </div>
        </aside>
    );
}
