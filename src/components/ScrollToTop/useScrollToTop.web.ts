import { useRef, useEffect, useState } from 'react'

export const useScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [overPricing, setOverPricing] = useState(false)

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(`#top`)
    const button = buttonRef.current
    const main = document.querySelector<HTMLElement>(`#landing-main`)
    const header = document.querySelector<HTMLElement>(`#site-header`)
    const pricing = document.querySelector<HTMLElement>(`#pricing`)
    const container = document.querySelector<HTMLElement>(`#landing-page`)

    if (!hero || !container) return

    let frame = 0

    const measure = () => {
      frame = 0
      const headerHeight = header?.getBoundingClientRect().height ?? 0
      const containerBounds = container.getBoundingClientRect()
      const contentTop = containerBounds.top + headerHeight

      setVisible(hero.getBoundingClientRect().bottom <= contentTop)

      const buttonBounds = button?.getBoundingClientRect()
      const pricingBounds = pricing?.getBoundingClientRect()
      const pricingVisible = Boolean(pricingBounds
        && pricingBounds.top < containerBounds.bottom
        && pricingBounds.bottom > contentTop)
      const pricingVisibility = pricingVisible ? `true` : `false`

      if (container.dataset.pricingVisible !== pricingVisibility) {
        container.dataset.pricingVisible = pricingVisibility
      }

      setOverPricing(Boolean(buttonBounds && pricingBounds
        && buttonBounds.top < pricingBounds.bottom
        && buttonBounds.bottom > pricingBounds.top
        && buttonBounds.left < pricingBounds.right
        && buttonBounds.right > pricingBounds.left))
    }

    const scheduleMeasure = () => {
      if (!frame) frame = window.requestAnimationFrame(measure)
    }

    const observer = typeof ResizeObserver === `undefined` ? null : new ResizeObserver(scheduleMeasure)

    measure()
    observer?.observe(hero)
    observer?.observe(container)
    if (main) observer?.observe(main)
    if (button) observer?.observe(button)
    if (header) observer?.observe(header)
    if (pricing) observer?.observe(pricing)
    window.addEventListener(`resize`, scheduleMeasure)
    container.addEventListener(`scroll`, scheduleMeasure, { passive: true })

    return () => {
      delete container.dataset.pricingVisible
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener(`resize`, scheduleMeasure)
      container.removeEventListener(`scroll`, scheduleMeasure)
    }
  }, [])

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

    document.querySelector<HTMLElement>(`#landing-page`)?.scrollTo({
      top: 0,
      behavior: reducedMotion ? `auto` : `smooth`,
    })
  }

  return { visible, buttonRef, overPricing, scrollToTop }
}
