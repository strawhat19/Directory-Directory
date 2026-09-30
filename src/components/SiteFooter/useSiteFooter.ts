import { usePathname, useRouter } from 'expo-router'
import { useLanding } from '../../shared/landing/useLanding'
import { useCopyrightYear } from '../../shared/time/useCopyrightYear'

export function useSiteFooter(onExplore?: () => void) {
  const router = useRouter()
  const pathname = usePathname()
  const { year } = useCopyrightYear()
  const { clearFilters } = useLanding()

  const exploreAll = () => {
    clearFilters()

    if (onExplore) {
      onExplore()
      return
    }

    router.push(`/`)
  }

  return {
    year,
    exploreAll,
    isHome: pathname === `/`,
  }
}
