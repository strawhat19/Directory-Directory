export const smoothScrollToElement = (selector: string) => {
  if (typeof window === `undefined`) return

  window.requestAnimationFrame(() => {
    const target = document.querySelector<HTMLElement>(selector)
    const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches

    target?.scrollIntoView({
      block: `start`,
      behavior: reducedMotion ? `auto` : `smooth`,
    })
  })
}
