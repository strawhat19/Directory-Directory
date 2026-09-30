import './CategoryGrid.scss'
import Icon from '../Icon/Icon'
import { useCategoryGrid } from './useCategoryGrid'

type CategoryGridProps = {
  onExplore: () => void
}

export default function CategoryGrid({ onExplore }: CategoryGridProps) {
  const { category, categoryItems, clearFilters, exploreCategory } = useCategoryGrid(onExplore)

  return (
    <section
      id={`categories`}
      className={`category-section`}
      aria-labelledby={`category-section-heading`}
    >
      <div id={`category-section-header`} className={`category-section__header`}>
        <h2 id={`category-section-heading`} className={`category-section__heading`}>
          {`Find your corner of the internet.`}
        </h2>
        <span id={`category-section-note`} className={`category-section__note`}>
          <Icon name={`globe`} id={`category-section-note-icon`} size={12} />
          {`A world of possibilities`}
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
          <button
            key={item.id}
            type={`button`}
            aria-pressed={category === item.id}
            id={`category-folder-${item.id}`}
            className={`category-folder category-folder--${item.id}`}
            onClick={() => exploreCategory(item.id)}
          >
            <span id={`category-folder-top-${item.id}`} className={`category-folder__top`}>
              <span
                id={`category-folder-icon-box-${item.id}`}
                className={`category-folder__icon-box`}
              >
                <Icon name={item.id} id={`category-folder-icon-${item.id}`} size={21} />
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
          </button>
        ))}
      </div>
    </section>
  )
}
