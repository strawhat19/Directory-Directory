import './Hero.scss'
import Icon from '../Icon/Icon'
import { suggestedSearches, useHero } from './useHero'
import HeroArtwork from '../HeroArtwork/HeroArtwork'
import { useHeroMagicType } from './useHeroMagicType'
import { searchScopes } from '../../shared/landing/searchScopes'

type HeroProps = {
  onExplore: (id: string) => void
}

export default function Hero({ onExplore }: HeroProps) {
  const { query, search, setQuery, searchScope, selectScope, searchSuggestion } = useHero(onExplore)
  const searchPlaceholder = searchScopes.find((scope) => scope.id === searchScope)?.placeholder

  return (
    <section id={`top`} className={`hero`} aria-labelledby={`hero-heading`}>
      <div id={`hero-copy`} className={`hero__copy`}>
        <h2 id={`hero-eyebrow`} className={`hero__eyebrow dd-eyebrow`}>
          <span id={`hero-status-dot`} className={`hero__status-dot`} aria-hidden={true} />
          {`Directory Database`}
        </h2>
        <HeroMagicHeading />
        <p id={`hero-description`} className={`hero__description`}>
          {`Discover the directories that help you find your next favorite thing. One thoughtful collection, endless rabbit holes.`}
        </p>
        <div
          id={`hero-search-panel`}
          className={`hero__search-panel hero__search-panel--${searchScope}`}
        >
          <div
            role={`group`}
            id={`hero-search-scopes`}
            className={`hero__search-scopes`}
            aria-label={`Search scope`}
          >
            {searchScopes.map(({ id, label, icon }) => (
              <button
                key={id}
                type={`button`}
                aria-pressed={searchScope === id}
                id={`hero-search-scope-${id}`}
                onClick={() => selectScope(id)}
                className={`hero__scope`}
              >
                <Icon name={icon} id={`hero-search-scope-${id}-icon`} size={14} />
                <span
                  id={`hero-search-scope-${id}-label`}
                  className={`hero__scope-label`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
          <form
            role={`search`}
            id={`hero-search-form`}
            className={`hero__search`}
            onSubmit={search}
          >
            <label
              htmlFor={`hero-search-input`}
              id={`hero-search-label`}
              className={`hero__search-label dd-visually-hidden`}
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
              placeholder={searchPlaceholder}
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
        </div>
        {/* <div id={`hero-suggestions`} className={`hero__suggestions`}>
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
        </div> */}
      </div>
      <HeroArtwork />
    </section>
  )
}

const HeroMagicHeading = () => {
  const magicTypeText = useHeroMagicType()

  return (
    <h1 id={`hero-heading`} className={`hero__heading`} aria-label={`The Directory of Directories.`}>
      <span id={`hero-heading-first-line`} className={`hero__heading-line hero__heading-line--magic`} aria-hidden={true}>
        {`The `}
        <span id={`hero-heading-magic-text`} className={`hero__magic-text`}>
          {magicTypeText}
        </span>
        <span id={`hero-heading-magic-cursor`} className={`hero__magic-cursor`} />
      </span>
      <span
        id={`hero-heading-second-line`}
        className={`hero__heading-line hero__heading-line--blue`}
        aria-hidden={true}
      >
        {`of Directories.`}
      </span>
    </h1>
  )
}
