import LandingPage from '../src/components/LandingPage'

export default function Index() {
  return <LandingPage year={new Date().getFullYear()} />
}
