import type { FormEvent } from 'react'
import { useLanding } from '../../shared/landing/useLanding'
import type { SearchScope } from '../../shared/landing/searchScopes'

export const suggestedSearches = [`Design`, `Open source`, `Communities`]

export function useHero(onExplore: (id: string) => void) {
  const { query, setQuery, searchScope, clearFilters, setSearchScope } = useLanding()

  const selectScope = (scope: SearchScope) => {
    setSearchScope(scope)
  }

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextQuery = query.trim()

    clearFilters()
    setQuery(nextQuery)
    onExplore(`explore`)
  }

  const searchSuggestion = (suggestion: string) => {
    clearFilters()
    setQuery(suggestion)
    onExplore(`explore`)
  }

  return { query, search, setQuery, searchScope, selectScope, searchSuggestion }
}
