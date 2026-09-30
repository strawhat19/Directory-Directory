import { useLanding } from '../../shared/landing/useLanding'
import { categories, directories } from '../../shared/catalog/catalog'
import type { CategoryId } from '../../shared/catalog/catalog'

export function useCategoryGrid(onExplore: () => void) {
  const { category, setQuery, selectCategory } = useLanding()
  const categoryItems = categories.map((item) => ({
    ...item,
    count: directories.filter((directory) => directory.category === item.id).length,
  }))

  const exploreCategory = (id: CategoryId) => {
    setQuery(``)
    selectCategory(id)
    onExplore()
  }

  return { category, categoryItems, exploreCategory }
}
