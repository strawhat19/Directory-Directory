import { useEffect, useState } from 'react'
import { heroMagicTypeTerms } from '../../shared/landing/magicTypeTerms'

type MagicTypeFrame = {
  termIndex: number
  characters: number
  phase: `hold` | `erase` | `type`
}

const firstTerm = heroMagicTypeTerms[0] ?? `Directory`
const firstFrame: MagicTypeFrame = {
  termIndex: 0,
  characters: firstTerm.length,
  phase: `hold`,
}

export const useHeroMagicType = () => {
  const [frame, setFrame] = useState(firstFrame)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia(`(prefers-reduced-motion: reduce)`)
    const updatePreference = () => {
      setReduceMotion(preference.matches)
      if (preference.matches) setFrame(firstFrame)
    }

    updatePreference()
    preference.addEventListener(`change`, updatePreference)
    return () => preference.removeEventListener(`change`, updatePreference)
  }, [])

  useEffect(() => {
    if (reduceMotion || heroMagicTypeTerms.length < 2) return

    const delay = frame.phase === `hold` ? 2200 : frame.phase === `type` ? 110 : frame.characters === 0 ? 240 : 70
    const timeout = window.setTimeout(() => {
      setFrame((current) => {
        if (current.phase === `hold`) return { ...current, phase: `erase` }
        if (current.phase === `erase`) {
          if (current.characters > 0) return { ...current, characters: current.characters - 1 }
          return { termIndex: (current.termIndex + 1) % heroMagicTypeTerms.length, characters: 0, phase: `type` }
        }

        const term = heroMagicTypeTerms[current.termIndex] ?? firstTerm
        if (current.characters < term.length) return { ...current, characters: current.characters + 1 }
        return { ...current, phase: `hold` }
      })
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [frame, reduceMotion])

  const term = heroMagicTypeTerms[frame.termIndex] ?? firstTerm
  return reduceMotion ? firstTerm : term.slice(0, frame.characters)
}
