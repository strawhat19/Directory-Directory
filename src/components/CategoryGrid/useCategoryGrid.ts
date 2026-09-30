import { useLanding } from '../../shared/landing/useLanding'
import type { CategoryId } from '../../shared/catalog/catalog'
import { directories } from '../../shared/catalog/catalog'

export function useCategoryGrid(onExplore: () => void) {
  const { category, setQuery, clearFilters, selectCategory, visibleCategories } = useLanding()
  const categoryItems = visibleCategories.map((item) => ({
    ...item,
    count: directories.filter((directory) => directory.category === item.id).length,
  }))

  const exploreCategory = (id: CategoryId) => {
    setQuery(``)
    selectCategory(id)
    onExplore()
  }

  return { category, clearFilters, categoryItems, exploreCategory }
}
