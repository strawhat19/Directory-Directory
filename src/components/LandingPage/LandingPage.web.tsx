import './LandingPage.scss'
import Hero from '../Hero/Hero'
import Head from 'expo-router/head'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import CategoryGrid from '../CategoryGrid/CategoryGrid'
import { useLandingPage } from './useLandingPage.web'
import PricingSection from '../PricingSection/PricingSection'
import DirectoryPreview from '../DirectoryPreview/DirectoryPreview'
import DirectoryIntroCta from '../DirectoryIntroCta/DirectoryIntroCta'
import DirectoryExplorer from '../DirectoryExplorer/DirectoryExplorer'
import FeaturedArticleCarousel from '../FeaturedArticleCarousel/FeaturedArticleCarousel'
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement'

export default function LandingPage() {
  const { scrollToSection } = useLandingPage()

  return (
    <>
      <Head>
        <title id={`page-title`} className={`page-title`}>
          {`Directory Directory — The Directory of Directories`}
        </title>
        <meta
          name={`description`}
          id={`page-description`}
          className={`page-description`}
          content={`Discover directories organized by category. Directory Directory brings together resource collections for tools, design, learning, communities, and more.`}
        />
      </Head>
      <button
        type={`button`}
        onClick={() => {
          smoothScrollToElement(`#explore`)
          document.querySelector<HTMLElement>(`#explore`)?.focus({ preventScroll: true })
        }}
        id={`landing-skip-link`}
        className={`landing-skip-link`}
      >
        {`Skip to directories`}
      </button>
      <div id={`landing-page`} className={`landing-page`}>
        <div id={`landing-page-shell`} className={`landing-page__shell`}>
          <SiteHeader />
          <main id={`landing-main`} className={`landing-main`}>
            <Hero onExplore={scrollToSection} />
            <DirectoryIntroCta onExplore={() => scrollToSection(`explore`)} />
            <CategoryGrid onExplore={() => scrollToSection(`explore`)} />
            <FeaturedArticleCarousel scope={`landing`} />
            <DirectoryExplorer />
            <PricingSection />
          </main>
          <SiteFooter />
        </div>
        <DirectoryPreview />
        <ScrollToTop />
      </div>
    </>
  )
}
