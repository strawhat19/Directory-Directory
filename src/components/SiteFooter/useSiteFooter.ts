import { usePathname } from 'expo-router'
import { useCopyrightYear } from '../../shared/time/useCopyrightYear'

export function useSiteFooter() {
  const pathname = usePathname()
  const { year } = useCopyrightYear()

  return {
    year,
    isHome: pathname === `/`,
  }
}
