import { useEffect, useRef } from 'react'

export const atomOrbitPath = `M 30 200 a 170 65 0 1 0 340 0 a 170 65 0 1 0 -340 0`
export const atomOrbits = [
  { id: `green`, angle: -60, duration: 12, delay: -2 },
  { id: `blue`, angle: 0, duration: 15, delay: -7 },
  { id: `red`, angle: 60, duration: 18, delay: -12 },
] as const

export function useHeroAtom() {
  const atom = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const motion = window.matchMedia(`(prefers-reduced-motion: reduce)`)
    const updateMotion = () => {
      if (motion.matches) atom.current?.pauseAnimations()
      else atom.current?.unpauseAnimations()
    }

    updateMotion()
    motion.addEventListener(`change`, updateMotion)
    return () => motion.removeEventListener(`change`, updateMotion)
  }, [])

  return { atom }
}
