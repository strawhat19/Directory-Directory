import './BlogLayout.scss';
import SiteFooter from '../SiteFooter/SiteFooter';
import SiteHeader from '../SiteHeader/SiteHeader';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import type { BlogLayoutProps } from './BlogLayout.types';
import { smoothScrollToElement } from '../../shared/navigation/smoothScrollToElement';

const BlogLayout = ({ hero, scope, children, article = false }: BlogLayoutProps) => {
  const Content = article ? `article` : `div`;

  return (
    <>
      <button
        type={`button`}
        className={`blog-skip-link`}
        id={`blog-skip-link-${scope}`}
        onClick={() => {
          document.querySelector<HTMLElement>(`#landing-main`)?.focus({ preventScroll: true });
          smoothScrollToElement(`#landing-main`);
        }}
      >
        {`Skip to blog content`}
      </button>
      <div id={`landing-page`} className={`landing-page blog-layout`}>
        <div id={`blog-shell-${scope}`} className={`blog-layout__shell`}>
          <SiteHeader />
          <main id={`landing-main`} className={`blog-layout__main${scope === `index` ? ` blog-layout__main--index` : ``}`} tabIndex={-1}>
            <Content id={`blog-content-${scope}`} className={`blog-layout__content`} aria-labelledby={`blog-heading-${scope}`}>
              <section id={`top`} className={`blog-layout__hero`} aria-labelledby={`blog-heading-${scope}`}>
                {hero}
              </section>
              {children}
            </Content>
          </main>
          <SiteFooter />
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default BlogLayout;
