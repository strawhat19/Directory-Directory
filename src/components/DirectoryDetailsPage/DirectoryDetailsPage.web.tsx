import './DirectoryDetailsPage.scss';
import Icon from '../Icon/Icon';
import { Link, type Href } from 'expo-router';
import Head from 'expo-router/head';
import SiteFooter from '../SiteFooter/SiteFooter';
import SiteHeader from '../SiteHeader/SiteHeader';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import DirectoryDetails from '../DirectoryDetails/DirectoryDetails';
import { directories } from '../../shared/catalog/catalog';
import { getDirectoryHref } from '../../shared/catalog/directoryDetails';
import { getDirectoryMetadata } from '../../shared/catalog/directorySeo';
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement';

export default function DirectoryDetailsPage({ slug }: { slug: string }) {
  const index = directories.findIndex((item) => item.id === slug);
  const directory = directories?.[index];
  const metadata = directory ? getDirectoryMetadata(directory) : null;
  const related = directory ? directories.filter((item) => item.category === directory.category && item.id !== directory.id).slice(0, 4) : [];
  const adjacent = [
    { label: `Previous Directory`, directory: directories?.[index - 1] },
    { label: `Next Directory`, directory: directories?.[index + 1] },
  ];

  return (
    <>
      <Head>
        <title id={`directory-page-title-${slug}`} className={`directory-page-title`}>{metadata?.title ?? `Directory Not Found — Directory Directory`}</title>
        {metadata ? (
          <>
            <meta name={`description`} content={metadata.description} id={`directory-page-description-${slug}`} className={`directory-page-description`} />
            {metadata.canonical && <link rel={`canonical`} href={metadata.canonical} id={`directory-page-canonical-${slug}`} className={`directory-page-canonical`} />}
            <meta property={`og:type`} content={`website`} id={`directory-page-og-type-${slug}`} className={`directory-page-og-type`} />
            <meta property={`og:title`} content={metadata.title} id={`directory-page-og-title-${slug}`} className={`directory-page-og-title`} />
            <meta property={`og:description`} content={metadata.description} id={`directory-page-og-description-${slug}`} className={`directory-page-og-description`} />
            <meta property={`og:site_name`} content={`Directory Directory`} id={`directory-page-og-site-${slug}`} className={`directory-page-og-site`} />
            {metadata.canonical && <meta property={`og:url`} content={metadata.canonical} id={`directory-page-og-url-${slug}`} className={`directory-page-og-url`} />}
            {metadata.image && <meta property={`og:image`} content={metadata.image} id={`directory-page-og-image-${slug}`} className={`directory-page-og-image`} />}
            <meta name={`twitter:card`} content={metadata.image ? `summary_large_image` : `summary`} id={`directory-page-twitter-card-${slug}`} className={`directory-page-twitter-card`} />
            <meta name={`twitter:title`} content={metadata.title} id={`directory-page-twitter-title-${slug}`} className={`directory-page-twitter-title`} />
            <meta name={`twitter:description`} content={metadata.description} id={`directory-page-twitter-description-${slug}`} className={`directory-page-twitter-description`} />
            {metadata.image && <meta name={`twitter:image`} content={metadata.image} id={`directory-page-twitter-image-${slug}`} className={`directory-page-twitter-image`} />}
            <script type={`application/ld+json`} id={`directory-page-schema-${slug}`} className={`directory-page-schema`}>{JSON.stringify(metadata.schema).replace(/</g, `\\u003c`)}</script>
          </>
        ) : <meta name={`robots`} content={`noindex`} id={`directory-page-noindex-${slug}`} className={`directory-page-noindex`} />}
      </Head>
      <button type={`button`} id={`directory-page-skip-${slug}`} className={`directory-page__skip`} onClick={() => { smoothScrollToElement(`#landing-main`); document.querySelector<HTMLElement>(`#landing-main`)?.focus({ preventScroll: true }); }}>{`Skip to directory details`}</button>
      <div id={`landing-page`} className={`landing-page directory-page`}>
        <div id={`directory-page-shell-${slug}`} className={`directory-page__shell`}>
          <SiteHeader />
          <main id={`landing-main`} tabIndex={-1} className={`directory-page__main`}>
            <nav id={`directory-page-breadcrumbs-${slug}`} className={`directory-page__breadcrumbs`} aria-label={`Breadcrumb`}>
              <Link href={`/`} id={`directory-page-home-${slug}`} className={`directory-page__breadcrumb`}>{`Home`}</Link>
              <Icon size={12} name={`chevron-right`} id={`directory-page-home-chevron-${slug}`} />
              <Link href={`/discover`} id={`directory-page-discover-${slug}`} className={`directory-page__breadcrumb`}>{`Directories`}</Link>
              <Icon size={12} name={`chevron-right`} id={`directory-page-directory-chevron-${slug}`} />
              <span aria-current={`page`} id={`directory-page-current-${slug}`} className={`directory-page__breadcrumb-current`}>{directory?.name ?? `Not Found`}</span>
            </nav>
            <section id={`top`} className={`directory-page__hero`}>
              {directory ? <DirectoryDetails directory={directory} scope={`page`} /> : (
                <div id={`directory-page-missing-${slug}`} className={`directory-page__missing`}>
                  <Icon size={38} name={`folder`} id={`directory-page-missing-icon-${slug}`} />
                  <h1 id={`directory-page-missing-heading-${slug}`} className={`directory-page__missing-title`}>{`This Directory Couldn't Be Found`}</h1>
                  <p id={`directory-page-missing-description-${slug}`} className={`directory-page__missing-description`}>{`Explore the catalog to find a directory for your next idea.`}</p>
                  <Link href={`/discover`} id={`directory-page-missing-link-${slug}`} className={`directory-page__back-link`}><Icon size={16} name={`grid`} id={`directory-page-missing-link-icon-${slug}`} />{`Browse Directories`}</Link>
                </div>
              )}
            </section>
            {related.length > 0 && (
              <section id={`directory-page-related-${slug}`} className={`directory-page__related`} aria-labelledby={`directory-page-related-heading-${slug}`}>
                <h2 id={`directory-page-related-heading-${slug}`} className={`directory-page__related-heading`}>{`More in This Category`}</h2>
                <div id={`directory-page-related-grid-${slug}`} className={`directory-page__related-grid`}>
                  {related.map((item) => <Link key={item.id} href={getDirectoryHref(item) as Href} id={`directory-page-related-link-${slug}-${item.id}`} className={`directory-page__related-link`}><strong id={`directory-page-related-title-${slug}-${item.id}`} className={`directory-page__related-title`}>{item.name}</strong><span id={`directory-page-related-summary-${slug}-${item.id}`} className={`directory-page__related-summary`}>{item.label}</span><Icon size={17} name={`chevron-right`} id={`directory-page-related-icon-${slug}-${item.id}`} className={`directory-page__related-icon`} /></Link>)}
                </div>
              </section>
            )}
            {directory && <nav id={`directory-page-catalog-navigation-${slug}`} className={`directory-page__catalog-navigation`} aria-label={`Browse directory pages`}>{adjacent.map((item) => item.directory && <Link key={item.label} href={getDirectoryHref(item.directory) as Href} id={`directory-page-adjacent-${slug}-${item.directory.id}`} className={`directory-page__adjacent`}><span id={`directory-page-adjacent-label-${slug}-${item.directory.id}`} className={`directory-page__adjacent-label`}>{item.label}</span><strong id={`directory-page-adjacent-title-${slug}-${item.directory.id}`} className={`directory-page__adjacent-title`}>{item.directory.name}</strong></Link>)}</nav>}
          </main>
          <SiteFooter />
        </div>
        <ScrollToTop heroSelector={directory ? `#directory-details-page-${directory.id}-header` : `#top`} />
      </div>
    </>
  );
}
