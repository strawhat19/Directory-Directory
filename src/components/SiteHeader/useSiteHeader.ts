import { useLanding } from '../../shared/landing/useLanding'

export function useSiteHeader(onNavigate: (id: string) => void) {
  const { savedIds, clearFilters, setTopic } = useLanding()

  const showSaved = () => {
    clearFilters()
    setTopic(`Saved`)
    onNavigate(`explore`)
  }

  return { savedCount: savedIds.length, showSaved }
}
