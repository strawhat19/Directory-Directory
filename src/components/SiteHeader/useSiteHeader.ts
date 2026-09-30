import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'expo-router'
import { useTheme } from '../../shared/theme/useTheme'
import { siteNavigation } from '../../shared/navigation/siteNavigation'

export function useSiteHeader() {
  const header = useRef<HTMLElement>(null)
  const notifications = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { isDark, toggleTheme } = useTheme()
  const [headerHeight, setHeaderHeight] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchVisible, setSearchVisible] = useState(pathname !== `/`)
  const links = siteNavigation.map((link) => ({
    ...link,
    active: pathname === link.href,
  }))

  useEffect(() => {
    const element = header.current
    const page = element?.closest<HTMLElement>(`.landing-page, .information-page, .contact-page, .auth-page`)
    if (!element || !page) return

    const updateHeight = () => {
      const height = element.getBoundingClientRect().height
      page.style.setProperty(`--site-header-height`, `${height}px`)
      setHeaderHeight(height)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)

    return () => {
      observer.disconnect()
      page.style.removeProperty(`--site-header-height`)
    }
  }, [])

  useEffect(() => {
    if (pathname !== `/`) {
      setSearchVisible(true)
      return
    }

    const page = document.querySelector<HTMLElement>(`.landing-page`)
    const search = document.getElementById(`hero-search-panel`)
    if (!page || !search) return

    const observer = new IntersectionObserver(([entry]) => {
      setSearchVisible(!entry.isIntersecting)
    }, {
      root: page,
      threshold: 0,
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
    })

    observer.observe(search)

    if (window.sessionStorage.getItem(`dd-focus-search`) === `true`) {
      window.sessionStorage.removeItem(`dd-focus-search`)
      requestAnimationFrame(() => {
        const input = document.getElementById(`hero-search-input`) as HTMLInputElement | null
        const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
        input?.scrollIntoView({ block: `center`, behavior: reducedMotion ? `auto` : `smooth` })
        input?.focus({ preventScroll: true })
      })
    }

    return () => observer.disconnect()
  }, [pathname, headerHeight])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === `Escape`) setMenuOpen(false)
    }

    document.addEventListener(`pointerdown`, closeOnOutsideClick)
    document.addEventListener(`keydown`, closeOnEscape)

    return () => {
      document.removeEventListener(`pointerdown`, closeOnOutsideClick)
      document.removeEventListener(`keydown`, closeOnEscape)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!notificationsOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!notifications.current?.contains(event.target as Node)) setNotificationsOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === `Escape`) setNotificationsOpen(false)
    }

    document.addEventListener(`pointerdown`, closeOnOutsideClick)
    document.addEventListener(`keydown`, closeOnEscape)

    return () => {
      document.removeEventListener(`pointerdown`, closeOnOutsideClick)
      document.removeEventListener(`keydown`, closeOnEscape)
    }
  }, [notificationsOpen])

  const openSearch = () => {
    setMenuOpen(false)
    const input = document.getElementById(`hero-search-input`) as HTMLInputElement | null

    if (!input) {
      window.sessionStorage.setItem(`dd-focus-search`, `true`)
      router.push(`/`)
      return
    }

    const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    input.scrollIntoView({ block: `center`, behavior: reducedMotion ? `auto` : `smooth` })
    input.focus({ preventScroll: true })
  }

  return {
    links,
    header,
    isDark,
    menuOpen,
    openSearch,
    closeMenu: () => setMenuOpen(false),
    toggleMenu: () => setMenuOpen((open) => !open),
    toggleTheme,
    notifications,
    searchVisible,
    notificationsOpen,
    toggleNotifications: () => setNotificationsOpen((open) => !open),
  }
}
