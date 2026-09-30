import { useEffect, useRef } from 'react'
import { usePathname } from 'expo-router'
import { siteNavigation } from '../../shared/navigation/siteNavigation'

export function useSiteHeader() {
  const header = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const links = siteNavigation.map((link) => ({
    ...link,
    active: pathname === link.href,
  }))

  useEffect(() => {
    const element = header.current
    const page = element?.closest<HTMLElement>(`.landing-page, .information-page, .contact-page, .auth-page`)
    if (!element || !page) return

    const updateHeight = () => {
      page.style.setProperty(`--site-header-height`, `${element.getBoundingClientRect().height}px`)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)

    return () => {
      observer.disconnect()
      page.style.removeProperty(`--site-header-height`)
    }
  }, [])

  return { links, header }
}
