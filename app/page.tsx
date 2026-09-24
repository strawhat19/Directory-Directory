import LandingPage from '../src/components/LandingPage'

export const dynamic = 'force-dynamic'

export default function Page() {
  return <LandingPage year={new Date().getFullYear()} />
}
