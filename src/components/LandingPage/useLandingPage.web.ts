import { useCallback } from 'react'
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement'

export function useLandingPage() {
  const scrollToSection = useCallback((id: string) => {
    smoothScrollToElement(`#${id}`)
  }, [])

  return { scrollToSection }
}
