import './FeaturedArticleCarousel.scss';
import Icon from '../Icon/Icon';
import { useCarouselDrag } from './useCarouselDrag.web';
import { blogArticles } from '../../shared/blog/articles';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle';
import { getCarouselOffset, useFeaturedCarousel } from './useFeaturedCarousel';
import type { FeaturedArticleCarouselProps } from './FeaturedArticleCarousel.types';

const FeaturedArticleCarousel = ({ scope }: FeaturedArticleCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const { activeIndex, selectSlide, nextSlide, previousSlide } = useFeaturedCarousel({
    paused: interacting,
    count: blogArticles.length,
    available: visible && inView,
  });
  const { dragging, progress, handlers } = useCarouselDrag({ nextSlide, previousSlide, onInteractionChange: setInteracting });

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === `visible`);
    updateVisibility();
    document.addEventListener(`visibilitychange`, updateVisibility);
    const observer = typeof IntersectionObserver === `undefined` ? null : new IntersectionObserver((entries) => {
      setInView(entries?.[0]?.isIntersecting ?? false);
    }, { threshold: 0.15 });
    if (carouselRef.current && observer) observer.observe(carouselRef.current);
    else setInView(true);
    return () => {
      observer?.disconnect();
      document.removeEventListener(`visibilitychange`, updateVisibility);
    };
  }, []);

  return (
    <div
      {...handlers}
      role={`region`}
      ref={carouselRef}
      aria-label={`Directory Stories`}
      aria-roledescription={`carousel`}
      id={`featured-story-${scope}`}
      className={`featured-story featured-carousel${dragging ? ` featured-carousel--dragging` : ``}`}
    >
      <div id={`featured-story-content-${scope}`} className={`featured-story__content`}>
        <div id={`featured-carousel-stage-${scope}`} className={`featured-carousel__stage${dragging ? ` featured-carousel__stage--dragging` : ``}`}>
          {blogArticles.map((article, index) => {
            const offset = getCarouselOffset(index, activeIndex, blogArticles.length);
            const active = offset === 0;
            const position = offset + progress;
            const distance = Math.abs(position);
            const scale = distance <= 1 ? 1 - distance * 0.22 : Math.max(0.58, 0.78 - (distance - 1) * 0.2);
            const opacity = distance <= 1 ? 1 - distance * 0.32 : Math.max(0, 0.68 * (2 - distance));
            const slideStyle = {
              opacity,
              zIndex: 10 - Math.round(distance * 2),
              visibility: distance <= 2.2 ? `visible` : `hidden`,
              '--slide-scale': scale,
              '--slide-angle': `${position * -24}deg`,
              '--slide-x': `${position * 64}%`,
              '--slide-depth': `${-Math.min(1, distance) * 140}px`,
            } as CSSProperties;
            return (
              <div
                key={article.id}
                role={`group`}
                inert={!active}
                style={slideStyle}
                aria-hidden={!active}
                aria-roledescription={`slide`}
                aria-label={`${index + 1} of ${blogArticles.length}`}
                id={`featured-carousel-slide-${scope}-${article.id}`}
                className={`featured-carousel__slide${active ? ` featured-carousel__slide--active` : ``}`}
              >
                <FeaturedArticle article={article} scope={`${scope}-carousel-${article.id}`} />
              </div>
            );
          })}
        </div>
        <div id={`featured-carousel-controls-${scope}`} className={`featured-carousel__controls`}>
          <button type={`button`} onClick={previousSlide} aria-label={`Previous Story`} id={`featured-carousel-previous-${scope}`} className={`featured-carousel__arrow featured-carousel__arrow--previous`}>
            <Icon size={18} name={`arrow-right`} id={`featured-carousel-previous-icon-${scope}`} className={`featured-carousel__arrow-icon`} />
          </button>
          <div role={`group`} aria-label={`Choose a Story`} id={`featured-carousel-dots-${scope}`} className={`featured-carousel__dots`}>
            {blogArticles.map((article, index) => (
              <button
                type={`button`}
                key={article.id}
                onClick={() => selectSlide(index)}
                aria-current={activeIndex === index ? `true` : undefined}
                aria-label={`Story ${index + 1}: ${article.title}`}
                id={`featured-carousel-dot-${scope}-${article.id}`}
                className={`featured-carousel__dot${activeIndex === index ? ` featured-carousel__dot--active` : ``}`}
              >
                <span id={`featured-carousel-dot-mark-${scope}-${article.id}`} className={`featured-carousel__dot-mark`} />
              </button>
            ))}
          </div>
          <button type={`button`} onClick={nextSlide} aria-label={`Next Story`} id={`featured-carousel-next-${scope}`} className={`featured-carousel__arrow`}>
            <Icon size={18} name={`arrow-right`} id={`featured-carousel-next-icon-${scope}`} className={`featured-carousel__arrow-icon`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticleCarousel;
