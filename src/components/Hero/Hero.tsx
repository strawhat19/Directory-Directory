import './Hero.scss'
import Icon from '../Icon/Icon'
import { suggestedSearches, useHero } from './useHero'
import HeroArtwork from '../HeroArtwork/HeroArtwork'

type HeroProps = {
  onExplore: () => void
}

export default function Hero({ onExplore }: HeroProps) {
  const { query, setQuery, search, searchSuggestion } = useHero(onExplore)

  return (
    <section id={`top`} className={`hero`} aria-labelledby={`hero-heading`}>
      <div id={`hero-copy`} className={`hero__copy`}>
        <p id={`hero-eyebrow`} className={`hero__eyebrow dd-eyebrow`}>
          <span id={`hero-status-dot`} className={`hero__status-dot`} aria-hidden={true} />
          {`The Directory of Directories`}
        </p>
        <h1 id={`hero-heading`} className={`hero__heading`}>
          <span id={`hero-heading-first-line`} className={`hero__heading-line`}>
            {`Good things.`}
          </span>
          <span
            id={`hero-heading-second-line`}
            className={`hero__heading-line hero__heading-line--blue`}
          >
            {`Worth finding.`}
          </span>
        </h1>
        <p id={`hero-description`} className={`hero__description`}>
          {`Discover the directories that help you find your next favorite thing. One thoughtful collection, endless rabbit holes.`}
        </p>
        <form
          role={`search`}
          id={`hero-search-form`}
          className={`hero__search`}
          onSubmit={search}
        >
          <label
            htmlFor={`hero-search-input`}
            id={`hero-search-label`}
            className={`dd-visually-hidden`}
          >
            {`Search directories or topics`}
          </label>
          <Icon
            size={20}
            name={`search`}
            id={`hero-search-icon`}
            className={`hero__search-icon`}
          />
          <input
            type={`search`}
            value={query}
            autoComplete={`off`}
            id={`hero-search-input`}
            className={`hero__search-input`}
            placeholder={`What are you looking for?`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type={`submit`}
            id={`hero-search-submit`}
            aria-label={`Explore directories`}
            className={`hero__search-submit dd-button dd-button--primary`}
          >
            <span id={`hero-search-submit-label`} className={`hero__search-submit-label`}>
              {`Explore`}
            </span>
            <Icon name={`arrow-right`} id={`hero-search-submit-icon`} size={17} />
          </button>
        </form>
        <div id={`hero-suggestions`} className={`hero__suggestions`}>
          <span id={`hero-suggestions-label`} className={`hero__suggestions-label`}>
            {`A few places to start:`}
          </span>
          {suggestedSearches.map((suggestion, index) => (
            <button
              type={`button`}
              key={suggestion}
              id={`hero-suggestion-${index}`}
              className={`hero__suggestion`}
              onClick={() => searchSuggestion(suggestion)}
            >
              {suggestion}
              <Icon
                size={11}
                name={`arrow-up-right`}
                id={`hero-suggestion-icon-${index}`}
              />
            </button>
          ))}
        </div>
      </div>
      <HeroArtwork />
    </section>
  )
}
