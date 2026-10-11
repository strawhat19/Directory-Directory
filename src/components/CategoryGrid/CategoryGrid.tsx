import './CategoryGrid.scss'
import Icon from '../Icon/Icon'
import { useCategoryGrid } from './useCategoryGrid'

type CategoryGridProps = {
  onExplore: () => void
}

export default function CategoryGrid({ onExplore }: CategoryGridProps) {
  const { stuck, header, category, categoryItems, clearFilters, exploreCategory } = useCategoryGrid(onExplore)

  return (
    <section
      id={`categories`}
      className={`category-section`}
      aria-labelledby={`category-section-heading`}
    >
      <div
        ref={header}
        id={`category-section-header`}
        className={`category-section__header${stuck ? ` is-stuck` : ``}`}
      >
        <h2 id={`category-section-heading`} className={`category-section__heading`}>
          <Icon
            size={28}
            name={`grid`}
            id={`category-section-heading-icon`}
            className={`category-section__heading-icon`}
          />
          <span id={`category-section-heading-label`} className={`category-section__heading-label`}>
            {`Categories`}
          </span>
        </h2>
        <span
          id={`category-section-count`}
          className={`category-section__count`}
          aria-label={`${categoryItems.length} ${categoryItems.length === 1 ? `category` : `categories`}`}
        >
          <span
            aria-hidden={`true`}
            id={`category-section-count-prefix`}
            className={`category-section__count-prefix`}
          >
            {`#`}
          </span>
          <span id={`category-section-count-number`} className={`category-section__count-number`}>
            {categoryItems.length}
          </span>
        </span>
      </div>
      {categoryItems.length === 0 && (
        <div id={`category-empty-state`} className={`category-section__empty`}>
          <p id={`category-empty-message`} className={`category-section__empty-message`}>
            {`No categories match your search.`}
          </p>
          <button
            type={`button`}
            onClick={clearFilters}
            id={`category-empty-reset`}
            className={`category-section__empty-reset dd-button dd-button--secondary`}
          >
            <Icon name={`close`} id={`category-empty-reset-icon`} size={14} />
            <span id={`category-empty-reset-label`} className={`category-section__empty-reset-label`}>
              {`Clear search`}
            </span>
          </button>
        </div>
      )}
      <div id={`category-grid`} className={`category-grid`}>
        {categoryItems.map((item) => (
          <div
            key={item.id}
            id={`category-card-${item.id}`}
            className={`category-folder-card category-folder--${item.accent}`}
          >
            <button
              type={`button`}
              aria-pressed={category === item.id}
              id={`category-folder-${item.id}`}
              className={`category-folder category-folder--${item.accent}`}
              onClick={() => exploreCategory(item.id)}
            >
              <span id={`category-folder-top-${item.id}`} className={`category-folder__top`}>
                <span
                  id={`category-folder-icon-box-${item.id}`}
                  className={`category-folder__icon-box`}
                >
                  <Icon name={item.icon} id={`category-folder-icon-${item.id}`} size={21} />
                </span>
                <span
                  id={`category-folder-count-${item.id}`}
                  className={`category-folder__count`}
                >
                  {`${item.count.toString().padStart(2, `0`)} directories`}
                </span>
              </span>
              <span
                id={`category-folder-heading-${item.id}`}
                className={`category-folder__heading`}
              >
                <span
                  id={`category-folder-label-${item.id}`}
                  className={`category-folder__label`}
                >
                  {item.label}
                </span>
                <Icon
                  size={17}
                  name={`arrow-up-right`}
                  id={`category-folder-arrow-${item.id}`}
                  className={`category-folder__arrow`}
                />
              </span>
              <span
                id={`category-folder-description-${item.id}`}
                className={`category-folder__description`}
              >
                {item.description}
              </span>
              <span id={`category-folder-topics-${item.id}`} className={`category-folder__topics`}>
                {item.topics.slice(0, 3).map((topic, index) => (
                  <span
                    key={topic}
                    title={topic}
                    className={`category-folder__topic`}
                    id={`category-folder-topic-${item.id}-${index}`}
                  >
                    {topic}
                  </span>
                ))}
                {item.topics.length > 3 && (
                  <span id={`category-folder-more-topics-${item.id}`} className={`category-folder__more-topics`}>
                    {`+${item.topics.length - 3}`}
                  </span>
                )}
              </span>
            </button>
            <button
              type={`button`}
              title={`Follow ${item.label}`}
              aria-label={`Follow ${item.label}`}
              id={`category-folder-follow-${item.id}`}
              className={`category-folder__follow`}
            >
              <Icon
                size={17}
                name={`plus`}
                id={`category-folder-follow-icon-${item.id}`}
                className={`category-folder__follow-icon`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
