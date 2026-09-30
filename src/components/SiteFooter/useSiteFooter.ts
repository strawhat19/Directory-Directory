import { useLanding } from '../../shared/landing/useLanding'

export function useSiteFooter(onExplore: () => void) {
  const { clearFilters } = useLanding()
  const year = new Date().getFullYear()

  const exploreAll = () => {
    clearFilters()
    onExplore()
  }

  return { year, exploreAll }
}
