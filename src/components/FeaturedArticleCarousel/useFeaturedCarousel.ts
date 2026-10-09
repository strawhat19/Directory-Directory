import { useEffect, useCallback, useState } from 'react';

type FeaturedCarouselOptions = {
  count: number;
  paused?: boolean;
  available?: boolean;
};

export const getCarouselOffset = (index: number, activeIndex: number, count: number) => {
  if (count <= 1) return 0;
  const offset = (index - activeIndex + count) % count;
  return offset > count / 2 ? offset - count : offset;
};

export const useFeaturedCarousel = ({ count, paused = false, available = true }: FeaturedCarouselOptions) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAutoplaying = available && !paused && count > 1;
  const selectSlide = useCallback((index: number) => {
    if (count > 0) setActiveIndex(((index % count) + count) % count);
  }, [count]);
  const nextSlide = useCallback(() => {
    if (count > 0) setActiveIndex((index) => (index + 1) % count);
  }, [count]);
  const previousSlide = useCallback(() => {
    if (count > 0) setActiveIndex((index) => (index - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (!isAutoplaying) return;
    const timer = setTimeout(nextSlide, 6000);
    return () => clearTimeout(timer);
  }, [activeIndex, isAutoplaying, nextSlide]);

  return { activeIndex, isAutoplaying, selectSlide, nextSlide, previousSlide };
};
