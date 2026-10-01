import '../LandingPage/LandingPage.scss';
import './DiscoverPage.scss';
import Icon from '../Icon/Icon';
import Head from 'expo-router/head';
import { useHero } from '../Hero/useHero';
import SiteFooter from '../SiteFooter/SiteFooter';
import SiteHeader from '../SiteHeader/SiteHeader';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import CategoryGrid from '../CategoryGrid/CategoryGrid';
import DirectoryPreview from '../DirectoryPreview/DirectoryPreview';
import DirectoryExplorer from '../DirectoryExplorer/DirectoryExplorer';
import { searchScopes } from '../../shared/landing/searchScopes';
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement';

export default function DiscoverPage() {
    const scrollToSection = (id: string) => smoothScrollToElement(`#${id}`);
    const { query, search, setQuery, searchScope } = useHero(scrollToSection);
    const placeholder = searchScopes.find((scope) => scope.id === searchScope)?.placeholder;

    return (
        <>
            <Head>
                <title id={`discover-page-title`} className={`discover-page__title`}>
                    {`Discover — Directory Directory`}
                </title>
                <meta
                    name={`description`}
                    id={`discover-page-description`}
                    className={`discover-page__description`}
                    content={`Browse categories and explore directories for tools, communities, creativity, and places.`}
                />
            </Head>
            <button
                type={`button`}
                id={`discover-skip-link`}
                className={`landing-skip-link discover-page__skip-link`}
                onClick={() => {
                    scrollToSection(`explore`);
                    document.querySelector<HTMLElement>(`#explore`)?.focus({ preventScroll: true });
                }}
            >
                {`Skip to directories`}
            </button>
            <div id={`landing-page`} className={`landing-page discover-page`}>
                <div id={`discover-page-shell`} className={`landing-page__shell discover-page__shell`}>
                    <SiteHeader />
                    <main id={`landing-main`} className={`landing-main discover-page__main`}>
                        <section
                            id={`top`}
                            className={`discover-page__intro`}
                            aria-labelledby={`discover-heading`}
                        >
                            <div id={`discover-copy`} className={`discover-page__copy`}>
                                <p id={`discover-eyebrow`} className={`discover-page__eyebrow dd-eyebrow`}>
                                    <Icon
                                        size={14}
                                        name={`globe`}
                                        id={`discover-eyebrow-icon`}
                                        className={`discover-page__eyebrow-icon`}
                                    />
                                    <span id={`discover-eyebrow-label`} className={`discover-page__eyebrow-label`}>
                                        {`Find your next favorite`}
                                    </span>
                                </p>
                                <h1 id={`discover-heading`} className={`discover-page__heading`}>
                                    {`Discover directories.`}
                                </h1>
                                <p id={`discover-summary`} className={`discover-page__summary`}>
                                    {`Browse a category or search the collection to find a good place to start.`}
                                </p>
                            </div>
                            <form
                                role={`search`}
                                onSubmit={search}
                                id={`discover-search-form`}
                                className={`discover-page__search`}
                            >
                                <label
                                    htmlFor={`hero-search-input`}
                                    id={`discover-search-label`}
                                    className={`discover-page__search-label dd-visually-hidden`}
                                >
                                    {`Search directories or topics`}
                                </label>
                                <Icon
                                    size={18}
                                    name={`search`}
                                    id={`discover-search-icon`}
                                    className={`discover-page__search-icon`}
                                />
                                <input
                                    type={`search`}
                                    value={query}
                                    autoComplete={`off`}
                                    placeholder={placeholder}
                                    id={`hero-search-input`}
                                    className={`discover-page__search-input`}
                                    onChange={(event) => setQuery(event.target.value)}
                                />
                                <button
                                    type={`submit`}
                                    id={`discover-search-submit`}
                                    className={`discover-page__search-submit dd-button dd-button--primary`}
                                >
                                    <span id={`discover-search-submit-label`} className={`discover-page__search-submit-label`}>
                                        {`Explore`}
                                    </span>
                                    <Icon
                                        size={16}
                                        name={`arrow-right`}
                                        id={`discover-search-submit-icon`}
                                        className={`discover-page__search-submit-icon`}
                                    />
                                </button>
                            </form>
                        </section>
                        <CategoryGrid onExplore={() => scrollToSection(`explore`)} />
                        <DirectoryExplorer />
                    </main>
                    <SiteFooter />
                </div>
                <DirectoryPreview />
                <ScrollToTop />
            </div>
        </>
    );
}
