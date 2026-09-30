import type { FormEvent } from 'react'
import { useLanding } from '../../shared/landing/useLanding'

export const suggestedSearches = [`Design`, `Open source`, `Communities`]

export function useHero(onExplore: () => void) {
  const { query, setQuery, clearFilters } = useLanding()

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextQuery = query.trim()

    clearFilters()
    setQuery(nextQuery)
    onExplore()
  }

  const searchSuggestion = (suggestion: string) => {
    clearFilters()
    setQuery(suggestion)
    onExplore()
  }

  return { query, setQuery, search, searchSuggestion }
}
