import './Hero.scss'
import Icon from '../Icon/Icon'
import { useHero } from './useHero'
import HeroArtwork from '../HeroArtwork/HeroArtwork'
import { useHeroMagicType } from './useHeroMagicType'
import DirectorySearch from '../DirectorySearch/DirectorySearch'
import { searchScopes } from '../../shared/landing/searchScopes'

type HeroProps = {
  onExplore: (id: string) => void
}

export default function Hero({ onExplore }: HeroProps) {
  const { searchScope, selectScope } = useHero(onExplore)
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
          {`A directory brings useful resources together by category. Directory Directory helps you discover directories for tools, design, learning, communities, and more—all in one place.`}
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
          <DirectorySearch
            variant={`hero`}
            idPrefix={`hero-search`}
            placeholder={searchPlaceholder}
            onSearch={() => onExplore(`explore`)}
          />
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
