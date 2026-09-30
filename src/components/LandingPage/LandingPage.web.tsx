import './LandingPage.scss'
import Hero from '../Hero/Hero'
import Head from 'expo-router/head'
import SiteFooter from '../SiteFooter/SiteFooter'
import SiteHeader from '../SiteHeader/SiteHeader'
import CategoryGrid from '../CategoryGrid/CategoryGrid'
import { useLandingPage } from './useLandingPage.web'
import DirectoryPreview from '../DirectoryPreview/DirectoryPreview'
import DirectoryExplorer from '../DirectoryExplorer/DirectoryExplorer'

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
          content={`The Directory of Directories. Explore a thoughtful collection of directories for design, tools, communities, and places.`}
        />
        <meta
          name={`theme-color`}
          content={`#f7f8fa`}
          id={`page-theme-color`}
          className={`page-theme-color`}
        />
      </Head>
      <a
        href={`#explore`}
        id={`landing-skip-link`}
        className={`landing-skip-link`}
      >
        {`Skip to directories`}
      </a>
      <div id={`landing-page`} className={`landing-page`}>
        <div id={`landing-page-shell`} className={`landing-page__shell`}>
          <SiteHeader />
          <main id={`landing-main`} className={`landing-main`}>
            <Hero onExplore={scrollToSection} />
            <CategoryGrid onExplore={() => scrollToSection(`explore`)} />
            <DirectoryExplorer />
          </main>
          <SiteFooter onExplore={() => scrollToSection(`explore`)} />
        </div>
        <DirectoryPreview />
      </div>
    </>
  )
}
