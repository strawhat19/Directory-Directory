'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { BrandMark, CategoryIcon, UiIcon } from './Icons'
import { categories, directories, placeholderPublicDirectoryCount, topics } from '../data/directories'
import type { CategoryId, TopicId } from '../data/directories'

type Theme = `light` | `dark`
type ViewMode = `grid` | `table` | `list`
type DialogKind = `signin` | `submit` | null

const viewModes: ViewMode[] = [`grid`, `table`, `list`]
const headingWords = [`Start`, `somewhere`, `better.`]

export default function LandingPage({ year }: { year: number }) {
  const [theme, setTheme] = useState<Theme>(`dark`)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialog, setDialog] = useState<DialogKind>(null)
  const [searchText, setSearchText] = useState(``)
  const [activeQuery, setActiveQuery] = useState(``)
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null)
  const [activeTopic, setActiveTopic] = useState<TopicId>(`Featured`)
  const [viewMode, setViewMode] = useState<ViewMode>(`grid`)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(`directory-directory-theme`)
    const initialTheme: Theme = storedTheme === `light` ? `light` : `dark`

    setTheme(initialTheme)
    document.documentElement.dataset.theme = initialTheme
  }, [])

  useEffect(() => {
    if (!dialog) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === `Escape`) setDialog(null)
    }

    document.addEventListener(`keydown`, closeOnEscape)
    return () => document.removeEventListener(`keydown`, closeOnEscape)
  }, [dialog])

  const visibleDirectories = useMemo(() => {
    const query = activeQuery.toLowerCase()
    const matches = directories.filter((directory) => {
      const matchesTopic = activeTopic !== `Featured` || directory.featured
      const matchesCategory = !activeCategory || directory.category === activeCategory
      const searchableText = `${directory.name} ${directory.summary} ${directory.label} ${directory.category}`.toLowerCase()
      return matchesTopic && matchesCategory && (!query || searchableText.includes(query))
    })

    if (activeTopic === `Popular`) return matches.sort((a, b) => b.popularity - a.popularity)
    if (activeTopic === `Latest`) return matches.sort((a, b) => a.freshness - b.freshness)
    if (activeTopic === `Trending`) return matches.sort((a, b) => b.momentum - a.momentum)
    return matches
  }, [activeCategory, activeQuery, activeTopic])

  const toggleTheme = () => {
    const nextTheme: Theme = theme === `dark` ? `light` : `dark`
    setTheme(nextTheme)
    document.documentElement.dataset.theme = nextTheme
    window.localStorage.setItem(`directory-directory-theme`, nextTheme)
  }

  const scrollToExplore = () => {
    window.requestAnimationFrame(() => {
      document.getElementById(`explore`)?.scrollIntoView({ behavior: `smooth`, block: `start` })
    })
  }

  const selectCategory = (category: CategoryId) => {
    setActiveCategory(activeCategory === category ? null : category)
    setActiveTopic(`All`)
    setActiveQuery(``)
    setSearchText(``)
    scrollToExplore()
  }

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setActiveQuery(searchText.trim())
    setActiveCategory(null)
    setActiveTopic(`All`)
    scrollToExplore()
  }

  const clearFilters = () => {
    setActiveQuery(``)
    setSearchText(``)
    setActiveCategory(null)
    setActiveTopic(`All`)
  }

  return (
    <main id={`landing-page`} className={`landing-page`}>
      <div id={`page-shell`} className={`page-shell`}>
        <header id={`site-header`} className={`site-header`}>
          <a id={`brand-link`} className={`brand-link`} href={`#top`} onClick={() => setMenuOpen(false)}>
            <BrandMark id={`header-brand-mark`} className={`brand-link__mark`} />
            <span id={`brand-name`} className={`brand-link__name`}>
              <span id={`brand-name-first`} className={`brand-link__name-line`}>Directory</span>
              <span id={`brand-name-second`} className={`brand-link__name-line`}>Directory</span>
            </span>
          </a>

          <nav id={`site-navigation`} className={`site-navigation${menuOpen ? ` site-navigation--open` : ``}`} aria-label={`Main navigation`}>
            <a id={`navigation-explore`} className={`site-navigation__link`} href={`#explore`} onClick={() => setMenuOpen(false)}>
              Explore
            </a>
            <a id={`navigation-categories`} className={`site-navigation__link`} href={`#categories`} onClick={() => setMenuOpen(false)}>
              Categories
            </a>
            <button
              id={`navigation-submit`}
              className={`site-navigation__link site-navigation__button`}
              type={`button`}
              onClick={() => { setDialog(`submit`); setMenuOpen(false) }}
            >
              Submit a directory
            </button>
            <button
              id={`mobile-sign-in`}
              className={`tab-button tab-button--mobile-sign-in`}
              type={`button`}
              onClick={() => { setDialog(`signin`); setMenuOpen(false) }}
            >
              Sign in
            </button>
          </nav>

          <div id={`header-actions`} className={`header-actions`}>
            <button
              id={`theme-toggle`}
              className={`theme-toggle`}
              type={`button`}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === `dark` ? `light` : `dark`} mode`}
              title={`Switch to ${theme === `dark` ? `light` : `dark`} mode`}
            >
              <UiIcon id={`theme-toggle-icon`} className={`theme-toggle__icon`} name={theme === `dark` ? `sun` : `moon`} />
            </button>
            <button id={`header-sign-in`} className={`tab-button tab-button--sign-in`} type={`button`} onClick={() => setDialog(`signin`)}>
              Sign in
            </button>
            <button
              id={`mobile-menu-toggle`}
              className={`mobile-menu-toggle`}
              type={`button`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? `Close menu` : `Open menu`}
              aria-expanded={menuOpen}
              aria-controls={`site-navigation`}
            >
              <UiIcon id={`mobile-menu-icon`} className={`mobile-menu-toggle__icon`} name={menuOpen ? `close` : `menu`} />
            </button>
          </div>
        </header>

        <section id={`top`} className={`hero-section`} aria-labelledby={`hero-heading`}>
          <div id={`hero-copy`} className={`hero-copy`}>
            <p id={`hero-eyebrow`} className={`hero-eyebrow reveal-fade`}>
              <span id={`hero-eyebrow-dot`} className={`hero-eyebrow__dot`} aria-hidden={true} />
              The directory of directories
            </p>
            <h1 id={`hero-heading`} className={`hero-heading`} aria-label={`Start somewhere better.`}>
              {headingWords.map((word, index) => (
                <span id={`hero-word-wrap-${index}`} className={`hero-heading__word-wrap`} key={word} aria-hidden={true}>
                  <span
                    id={`hero-word-${index}`}
                    className={`hero-heading__word`}
                    style={{ animationDelay: `${120 + index * 95}ms` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>
            <p id={`hero-description`} className={`hero-description reveal-fade`}>
              A thoughtful starting point for discovering useful places, people, and ideas online.
            </p>

            <form id={`hero-search-form`} className={`hero-search reveal-fade`} role={`search`} onSubmit={submitSearch}>
              <div id={`search-field`} className={`hero-search__field`}>
                <svg id={`search-field-tab`} className={`hero-search__tab`} viewBox={`0 0 71 23`} fill={`none`} aria-hidden={`true`}>
                  <path id={`search-field-tab-fill`} className={`hero-search__tab-fill`} d={`M1 23V9C1 4 4 1 10 1h24c4 0 6 2 8 6l6 12c1 3 3 4 7 4h16V23H1Z`} />
                  <path id={`search-field-tab-line`} className={`hero-search__tab-line`} d={`M1 23V9C1 4 4 1 10 1h24c4 0 6 2 8 6l6 12c1 3 3 4 7 4h16`} />
                </svg>
                <UiIcon id={`search-input-icon`} className={`hero-search__icon`} name={`search`} />
                <input
                  id={`directory-search-input`}
                  className={`hero-search__input`}
                  type={`search`}
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder={`Search directories or topics...`}
                  aria-label={`Search directories or topics`}
                />
              </div>
              <button id={`directory-search-button`} className={`tab-button tab-button--search`} type={`submit`}>
                <UiIcon id={`directory-search-button-icon`} className={`tab-button__icon`} name={`search`} />
                <span id={`directory-search-button-label`} className={`tab-button__label`}>Search</span>
              </button>
            </form>
            <p id={`hero-search-hint`} className={`hero-search-hint`}>
              Explore curated directories across four interests.
            </p>
          </div>

          <div id={`hero-mark-panel`} className={`hero-mark-panel`} aria-hidden={true}>
            <span id={`hero-mark-panel-index`} className={`hero-mark-panel__index`}>DD / 001</span>
            <BrandMark id={`hero-brand-mark`} className={`hero-mark-panel__mark`} />
            <span id={`hero-mark-panel-caption`} className={`hero-mark-panel__caption`}>Good places to begin.</span>
            <div id={`hero-mark-panel-accents`} className={`hero-mark-panel__accents`}>
              <span id={`hero-mark-panel-blue`} className={`hero-mark-panel__accent hero-mark-panel__accent--blue`} />
              <span id={`hero-mark-panel-red`} className={`hero-mark-panel__accent hero-mark-panel__accent--red`} />
              <span id={`hero-mark-panel-green`} className={`hero-mark-panel__accent hero-mark-panel__accent--green`} />
            </div>
          </div>

          <div id={`categories-heading-group`} className={`categories-heading-group`}>
            <div id={`categories-heading-copy`} className={`categories-heading-copy`}>
              <p id={`categories-eyebrow`} className={`section-kicker`}>Browse by interest</p>
              <h2 id={`categories-heading`} className={`section-heading`}>Start with what interests you.</h2>
            </div>
            <p id={`categories-description`} className={`section-description`}>Four paths into a more interesting web.</p>
          </div>
          <div id={`categories`} className={`category-grid`} role={`group`} aria-label={`Browse directory categories`}>
            {categories.map((category, index) => (
              <button
                id={`category-folder-${category.id}`}
                className={`category-folder category-folder--${category.id}${category.id === `tools` ? ` category-folder--preview-open` : ``}${activeCategory === category.id ? ` category-folder--active` : ``}`}
                key={category.id}
                type={`button`}
                onClick={() => selectCategory(category.id)}
                aria-pressed={activeCategory === category.id}
                style={{ animationDelay: `${380 + index * 65}ms` }}
              >
                <span id={`category-folder-back-${category.id}`} className={`category-folder__back`} aria-hidden={true} />
                <span id={`category-folder-interior-${category.id}`} className={`category-folder__interior`} aria-hidden={true} />
                <span id={`category-folder-front-${category.id}`} className={`category-folder__front`}>
                  <span id={`category-icon-tile-${category.id}`} className={`category-folder__icon-tile category-folder__icon-tile--${category.id}`}>
                    <CategoryIcon id={`category-icon-${category.id}`} className={`category-folder__icon`} name={category.id} />
                  </span>
                  <span id={`category-folder-bottom-${category.id}`} className={`category-folder__bottom`}>
                    <span id={`category-folder-label-${category.id}`} className={`category-folder__label`}>{category.label}</span>
                    <UiIcon id={`category-folder-chevron-${category.id}`} className={`category-folder__chevron`} name={`chevron`} />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id={`explore`} className={`explore-section`} aria-labelledby={`explore-heading`}>
          <div id={`explore-title-tab`} className={`explore-title-tab`}>
            <svg id={`explore-title-tab-shape`} className={`explore-title-tab__shape`} viewBox={`0 0 367 58`} preserveAspectRatio={`none`} fill={`none`} aria-hidden={`true`}>
              <path id={`explore-title-tab-fill`} className={`explore-title-tab__fill`} d={`M1 58V17C1 8 6 2 15 2h29c4 0 6 2 8 6l4 8h260c7 0 11 3 14 9l17 29c2 3 4 4 9 4h11v1H1Z`} />
              <path id={`explore-title-tab-line`} className={`explore-title-tab__line`} d={`M1 58V17C1 8 6 2 15 2h29c4 0 6 2 8 6l4 8h260c7 0 11 3 14 9l17 29c2 3 4 4 9 4h11`} />
            </svg>
            <h2 id={`explore-heading`} className={`explore-title-tab__heading`}>Explore Directories</h2>
          </div>

          <div id={`explore-controls`} className={`explore-controls`}>
            <div id={`topic-tabs`} className={`topic-tabs`} role={`tablist`} aria-label={`Directory topics`}>
              {topics.map((topic) => (
                <button
                  id={`topic-tab-${topic.toLowerCase()}`}
                  className={`folder-tab topic-tab${activeTopic === topic ? ` folder-tab--selected` : ``}`}
                  key={topic}
                  type={`button`}
                  role={`tab`}
                  aria-selected={activeTopic === topic}
                  aria-controls={`directory-results`}
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
            <div id={`view-mode-controls`} className={`view-mode-controls`} role={`group`} aria-label={`Directory view`}>
              {viewModes.map((mode) => (
                <button
                  id={`view-mode-${mode}`}
                  className={`folder-tab view-mode-button${viewMode === mode ? ` folder-tab--selected` : ``}`}
                  key={mode}
                  type={`button`}
                  aria-label={`${mode[0].toUpperCase()}${mode.slice(1)} view`}
                  aria-pressed={viewMode === mode}
                  onClick={() => setViewMode(mode)}
                >
                  <UiIcon id={`view-mode-icon-${mode}`} className={`view-mode-button__icon`} name={mode} />
                </button>
              ))}
            </div>
          </div>

          {(activeQuery || activeCategory) && (
            <div id={`active-filter-summary`} className={`active-filter-summary`}>
              <p id={`active-filter-label`} className={`active-filter-summary__label`}>
                {activeQuery ? `Results for “${activeQuery}”` : `${categories.find((category) => category.id === activeCategory)?.label} directories`}
              </p>
              <button id={`clear-filters-button`} className={`active-filter-summary__clear`} type={`button`} onClick={clearFilters}>Clear filters</button>
            </div>
          )}

          <div
            id={`directory-results`}
            className={`directory-results directory-results--${viewMode}`}
            role={`tabpanel`}
            aria-labelledby={`topic-tab-${activeTopic.toLowerCase()}`}
            aria-live={`polite`}
          >
            {visibleDirectories.length > 0 ? visibleDirectories.map((directory) => (
              <article id={`directory-card-${directory.id}`} className={`directory-card directory-card--${directory.category}`} key={directory.id}>
                <div id={`directory-card-top-${directory.id}`} className={`directory-card__top`}>
                  <span id={`directory-card-icon-tile-${directory.id}`} className={`directory-card__icon-tile directory-card__icon-tile--${directory.category}`}>
                    <CategoryIcon id={`directory-card-icon-${directory.id}`} className={`directory-card__icon`} name={directory.category} />
                  </span>
                  <span id={`directory-card-category-${directory.id}`} className={`directory-card__category`}>
                    {categories.find((category) => category.id === directory.category)?.label}
                  </span>
                </div>
                <div id={`directory-card-copy-${directory.id}`} className={`directory-card__copy`}>
                  <h3 id={`directory-card-title-${directory.id}`} className={`directory-card__title`}>{directory.name}</h3>
                  <p id={`directory-card-summary-${directory.id}`} className={`directory-card__summary`}>{directory.summary}</p>
                </div>
                <span id={`directory-card-label-${directory.id}`} className={`directory-card__label`}>{directory.label}</span>
              </article>
            )) : (
              <div id={`empty-results`} className={`empty-results`}>
                <p id={`empty-results-title`} className={`empty-results__title`}>No directories found yet.</p>
                <p id={`empty-results-description`} className={`empty-results__description`}>Try another topic or a broader search.</p>
                <button id={`empty-results-reset`} className={`empty-results__reset`} type={`button`} onClick={clearFilters}>
                  Show all directories
                </button>
              </div>
            )}
          </div>
        </section>

        <footer id={`site-footer`} className={`site-footer`}>
          <div id={`footer-brand`} className={`site-footer__brand`}>
            <BrandMark id={`footer-brand-mark`} className={`site-footer__mark`} />
            <span id={`footer-brand-name`} className={`site-footer__name`}>Directory Directory</span>
          </div>
          <p id={`footer-directory-count`} className={`site-footer__count`}>
            {placeholderPublicDirectoryCount.toLocaleString(`en-US`)} public directories
          </p>
          <p id={`footer-copyright`} className={`site-footer__copyright`}>
            © {year} Directory Directory · Made by{` `}
            <a id={`footer-piratechs-link`} className={`site-footer__link`} href={`https://piratechs.com/`} target={`_blank`} rel={`noopener noreferrer`}>
              Piratechs
            </a>
          </p>
        </footer>
      </div>

      {dialog && (
        <div
          id={`preview-dialog-backdrop`}
          className={`preview-dialog-backdrop`}
          onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null) }}
        >
          <section id={`preview-dialog`} className={`preview-dialog`} role={`dialog`} aria-modal={true} aria-labelledby={`preview-dialog-title`}>
            <button
              id={`preview-dialog-close`}
              className={`preview-dialog__close`}
              type={`button`}
              onClick={() => setDialog(null)}
              aria-label={`Close dialog`}
            >
              <UiIcon id={`preview-dialog-close-icon`} className={`preview-dialog__close-icon`} name={`close`} />
            </button>
            <span id={`preview-dialog-eyebrow`} className={`preview-dialog__eyebrow`}>Coming soon</span>
            <h2 id={`preview-dialog-title`} className={`preview-dialog__title`}>
              {dialog === `signin` ? `Your directory home is on its way.` : `Share a directory soon.`}
            </h2>
            <p id={`preview-dialog-description`} className={`preview-dialog__description`}>This landing page is a preview. In the meantime, explore the directories below.</p>
            <button id={`preview-dialog-explore`} className={`tab-button preview-dialog__action`} type={`button`} onClick={() => { setDialog(null); scrollToExplore() }}>
              Explore Directories
            </button>
          </section>
        </div>
      )}
    </main>
  )
}
