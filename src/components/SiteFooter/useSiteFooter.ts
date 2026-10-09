import { usePathname } from 'expo-router'
import { useCopyrightYear } from '../../shared/time/useCopyrightYear'
import { siteFooterNavigation } from '../../shared/navigation/siteNavigation'

export function useSiteFooter() {
  const pathname = usePathname()
  const { year } = useCopyrightYear()
  const links = siteFooterNavigation.map((link) => ({
    ...link,
    active: pathname === link.href,
  }))

  return {
    year,
    links,
    isHome: pathname === `/`,
  }
}
