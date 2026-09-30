import { useCallback } from 'react'

export function useLandingPage() {
  const scrollToSection = useCallback((id: string) => {
    const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

    document.getElementById(id)?.scrollIntoView({
      block: `start`,
      behavior: reducedMotion ? `auto` : `smooth`,
    })
  }, [])

  return { scrollToSection }
}
