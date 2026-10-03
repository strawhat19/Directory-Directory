import { useRef, useEffect, useState } from 'react'

export const useScrollToTop = () => {
  const [visible, setVisible] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [overPricing, setOverPricing] = useState(false)
  const cancelScroll = useRef<(() => void) | null>(null)

  useEffect(() => () => cancelScroll.current?.(), [])

  useEffect(() => {
    const button = buttonRef.current
    const container = button?.closest<HTMLElement>(`#landing-page`)
    const hero = container?.querySelector<HTMLElement>(`#top`)
    const main = container?.querySelector<HTMLElement>(`#landing-main`)
    const header = container?.querySelector<HTMLElement>(`#site-header`)
    const pricing = container?.querySelector<HTMLElement>(`#pricing`)

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
    cancelScroll.current?.()

    const container = buttonRef.current?.closest<HTMLElement>(`#landing-page`)
    if (!container) return

    const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches
    const scrollers = [container, document.scrollingElement]
      .filter((element): element is Element => element !== null)
      .map((element) => ({ element, start: Math.max(0, element.scrollTop) }))

    if (reducedMotion || scrollers.every(({ start }) => start === 0)) {
      scrollers.forEach(({ element }) => element.scrollTo({ top: 0, behavior: `instant` }))
      return
    }

    let frame = 0
    const started = performance.now()
    const stop = () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener(`wheel`, stop)
      window.removeEventListener(`keydown`, stop)
      window.removeEventListener(`touchstart`, stop)
      window.removeEventListener(`pointerdown`, stop)
      cancelScroll.current = null
    }

    const animate = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - started) / 600))
      const remaining = (1 - progress) ** 3

      // Instant frame updates avoid restarting CSS smooth scrolling before it reaches zero.
      scrollers.forEach(({ element, start }) => element.scrollTo({
        top: progress === 1 ? 0 : start * remaining,
        behavior: `instant`,
      }))

      if (progress === 1) stop()
      else frame = window.requestAnimationFrame(animate)
    }

    cancelScroll.current = stop
    window.addEventListener(`wheel`, stop, { passive: true })
    window.addEventListener(`keydown`, stop)
    window.addEventListener(`touchstart`, stop, { passive: true })
    window.addEventListener(`pointerdown`, stop, { passive: true })
    frame = window.requestAnimationFrame(animate)
  }

  return { visible, buttonRef, overPricing, scrollToTop }
}
