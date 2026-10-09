import Icon from '../Icon/Icon';
import { useFocusEffect } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { blogArticles } from '../../shared/blog/articles';
import { elementProps } from '../../shared/ui/elementProps';
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle';
import { styles } from './FeaturedArticleCarousel.native.styles';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getCarouselOffset, useFeaturedCarousel } from './useFeaturedCarousel';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import type { FeaturedArticleCarouselProps } from './FeaturedArticleCarousel.types';
import { AppState, Animated, AccessibilityInfo, Easing, PanResponder, Pressable, Text, View } from 'react-native';

const dotPositions = [`top`, `bottom`] as const;
const dotGrid = Array.from({ length: 48 }, (_, index) => ({
  id: index,
  cx: 10 + (index % 8) * 18,
  cy: 10 + Math.floor(index / 8) * 18,
}));
type CarouselMeasurements = { width: number; maximum: number; heights: Record<string, number> };

const FeaturedArticleCarousel = ({ scope, horizontalInset = 0 }: FeaturedArticleCarouselProps) => {
  const accent = useSearchAccent();
  const { width, padding, palette, styles: common } = useBlogPresentation();
  const [focused, setFocused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const [appActive, setAppActive] = useState(AppState.currentState !== `background` && AppState.currentState !== `inactive`);
  const [measurements, setMeasurements] = useState<CarouselMeasurements>({ width: 0, maximum: 0, heights: {} });
  const gestureActive = useRef(false);
  const activeSlide = useRef(0);
  const settling = useRef(false);
  const settleVersion = useRef(0);
  const dragOffset = useRef(new Animated.Value(0)).current;
  const offsets = useRef(blogArticles.map((_, index) => new Animated.Value(getCarouselOffset(index, 0, blogArticles.length)))).current;
  const available = focused && appActive;
  const stageWidth = Math.min(width, 1280);
  const cardWidth = Math.round(width >= 900 ? Math.min(1000, stageWidth * 0.76) : Math.max(220, stageWidth - padding * 2));
  const dragDistance = cardWidth * 0.64;
  const positions = useMemo(() => {
    const dragProgress = Animated.divide(dragOffset, dragDistance);
    return offsets.map((offset) => Animated.add(offset, dragProgress));
  }, [dragDistance, dragOffset, offsets]);
  const heights = measurements.width === cardWidth ? measurements.heights : {};
  const stageHeight = measurements.width === cardWidth && measurements.maximum > 0 ? measurements.maximum : width >= 900 ? 480 : 760;
  const bandInk = accent.color === palette.green ? `#14213d` : palette.white;
  const { activeIndex, isAutoplaying, selectSlide, nextSlide, previousSlide } = useFeaturedCarousel({ count: blogArticles.length, available, paused: interacting });
  activeSlide.current = activeIndex;

  const resetDrag = useCallback(() => {
    settleVersion.current += 1;
    gestureActive.current = false;
    settling.current = false;
    dragOffset.stopAnimation();
    dragOffset.setValue(0);
    offsets.forEach((offset, index) => {
      offset.stopAnimation();
      offset.setValue(getCarouselOffset(index, activeSlide.current, blogArticles.length));
    });
    setInteracting(false);
  }, [dragOffset, offsets]);

  const settleDrag = useCallback(() => {
    const version = ++settleVersion.current;
    gestureActive.current = false;
    dragOffset.stopAnimation();
    if (reduceMotion || !available) {
      dragOffset.setValue(0);
      settling.current = false;
      setInteracting(false);
      return;
    }
    settling.current = true;
    Animated.timing(dragOffset, { toValue: 0, duration: 430, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start(() => {
      if (version !== settleVersion.current) return;
      settling.current = false;
      if (!gestureActive.current) setInteracting(false);
    });
  }, [available, dragOffset, reduceMotion]);

  const endTouch = useCallback(() => {
    if (!gestureActive.current && !settling.current) setInteracting(false);
  }, []);

  useFocusEffect(useCallback(() => {
    setFocused(true);
    return () => { setFocused(false); resetDrag(); };
  }, [resetDrag]));

  useEffect(() => {
    let mounted = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled);
    }).catch(() => {});
    const motionSubscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, setReduceMotion);
    const appSubscription = AppState.addEventListener(`change`, (state) => {
      setAppActive(state === `active`);
      if (state !== `active`) resetDrag();
    });
    return () => { mounted = false; resetDrag(); motionSubscription.remove(); appSubscription.remove(); };
  }, [resetDrag]);

  useEffect(() => resetDrag(), [cardWidth, resetDrag]);

  useEffect(() => {
    let cancelled = false;
    offsets.forEach((offset, index) => {
      const target = getCarouselOffset(index, activeIndex, blogArticles.length);
      offset.stopAnimation((current) => {
        if (cancelled || gestureActive.current) return;
        if (reduceMotion || !available || Math.abs(current - target) > blogArticles.length / 2) {
          offset.setValue(target);
          return;
        }
        Animated.timing(offset, { toValue: target, duration: 430, useNativeDriver: true, easing: Easing.out(Easing.cubic) }).start();
      });
    });
    return () => { cancelled = true; offsets.forEach((offset) => offset.stopAnimation()); };
  }, [activeIndex, available, offsets, reduceMotion]);

  const measureCard = useCallback((id: string, height: number) => {
    const measuredHeight = Math.ceil(height);
    if (!measuredHeight) return;
    setMeasurements((current) => {
      const sameWidth = current.width === cardWidth;
      if (sameWidth && current.heights?.[id] === measuredHeight) return current;
      return {
        width: cardWidth,
        maximum: Math.max(sameWidth ? current.maximum : 0, measuredHeight),
        heights: { ...(sameWidth ? current.heights : {}), [id]: measuredHeight },
      };
    });
  }, [cardWidth]);

  const swipe = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponderCapture: (_, gesture) => gesture.numberActiveTouches === 1 && Math.abs(gesture.dx) > 16 && Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.5,
    onPanResponderGrant: (_, gesture) => {
      settleVersion.current += 1;
      gestureActive.current = true;
      settling.current = false;
      setInteracting(true);
      dragOffset.stopAnimation();
      offsets.forEach((offset, index) => {
        offset.stopAnimation();
        offset.setValue(getCarouselOffset(index, activeIndex, blogArticles.length));
      });
      dragOffset.setValue(Math.max(-dragDistance, Math.min(dragDistance, gesture.dx)));
    },
    onPanResponderMove: (_, gesture) => {
      if (gesture.numberActiveTouches !== 1) { resetDrag(); return; }
      if (gestureActive.current) dragOffset.setValue(Math.max(-dragDistance, Math.min(dragDistance, gesture.dx)));
    },
    onPanResponderRelease: (_, gesture) => {
      if (!gestureActive.current) { resetDrag(); return; }
      const crossedDistance = Math.abs(gesture.dx) > Math.max(40, cardWidth * 0.14);
      if (crossedDistance || Math.abs(gesture.dx) > 12 && Math.abs(gesture.vx) > 0.5) {
        const direction = crossedDistance ? gesture.dx : gesture.vx;
        if (direction < 0) nextSlide(); else previousSlide();
      }
      settleDrag();
    },
    onPanResponderTerminate: settleDrag,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  }), [activeIndex, cardWidth, dragDistance, dragOffset, nextSlide, offsets, previousSlide, resetDrag, settleDrag]);

  return (
    <View
      {...elementProps(`featured-carousel`, scope)}
      style={[styles.band, { width, marginHorizontal: -horizontalInset, backgroundColor: accent.color, paddingTop: width >= 760 ? 72 : 48 }]}
    >
      {dotPositions.map((position) => (
        <Svg
          key={position}
          width={160}
          height={120}
          accessible={false}
          pointerEvents={`none`}
          viewBox={`0 0 160 120`}
          accessibilityElementsHidden
          importantForAccessibility={`no-hide-descendants`}
          {...elementProps(`featured-carousel-dot-grid`, `${scope}-${position}`)}
          style={[styles.dotGrid, position === `top` ? styles.dotGridTop : styles.dotGridBottom]}
        >
          {dotGrid.map((dot) => <Circle key={dot.id} r={1.5} cx={dot.cx} cy={dot.cy} fill={palette.white} {...elementProps(`featured-carousel-dot`, `${scope}-${position}-${dot.id}`)} />)}
        </Svg>
      ))}
      <View
        {...swipe.panHandlers}
        {...elementProps(`featured-carousel-stage`, scope)}
        onTouchStart={() => setInteracting(true)}
        onTouchEnd={endTouch}
        onTouchCancel={endTouch}
        style={[styles.stage, { width: stageWidth, height: stageHeight }]}
      >
        {blogArticles.map((article, index) => {
          const position = positions?.[index];
          if (!position) return null;
          const relative = getCarouselOffset(index, activeIndex, blogArticles.length);
          const active = index === activeIndex;
          return (
            <Animated.View
              key={article.id}
              accessible={false}
              pointerEvents={active ? `auto` : `none`}
              accessibilityElementsHidden={!active}
              importantForAccessibility={active ? `auto` : `no-hide-descendants`}
              {...elementProps(`featured-carousel-slide`, `${scope}-${article.id}`)}
              onLayout={(event) => measureCard(article.id, event.nativeEvent.layout.height)}
              style={[styles.slide, {
                width: cardWidth,
                left: (stageWidth - cardWidth) / 2,
                top: Math.max(0, (stageHeight - (heights?.[article.id] ?? stageHeight)) / 2),
                zIndex: active ? 3 : Math.abs(relative) === 1 ? 2 : 1,
                opacity: position.interpolate({ inputRange: [-3, -2, -1, 0, 1, 2, 3], outputRange: [0, 0, 0.5, 1, 0.5, 0, 0], extrapolate: `clamp` }),
                transform: [
                  { perspective: 1100 },
                  { translateX: position.interpolate({ inputRange: [-1, 0, 1], outputRange: [-dragDistance, 0, dragDistance] }) },
                  { scale: position.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [0.62, 0.78, 1, 0.78, 0.62], extrapolate: `clamp` }) },
                  { rotateY: position.interpolate({ inputRange: [-3, 0, 3], outputRange: [`72deg`, `0deg`, `-72deg`], extrapolate: `clamp` }) },
                ],
              }]}
            >
              <FeaturedArticle article={article} fullBleed={false} accentColor={accent.color} scope={`${scope}-${article.id}`} showBlogLink />
            </Animated.View>
          );
        })}
      </View>
      <View {...elementProps(`featured-carousel-controls`, scope)} style={[styles.controls, { paddingHorizontal: padding }]}>
        <View {...elementProps(`featured-carousel-dots`, scope)} style={styles.dots}>
          {blogArticles.map((article, index) => (
            <Pressable
              key={article.id}
              accessibilityRole={`button`}
              onPress={() => selectSlide(index)}
              accessibilityState={{ selected: index === activeIndex }}
              accessibilityLabel={`Show story ${index + 1} of ${blogArticles.length}: ${article.title}`}
              {...elementProps(`featured-carousel-dot-button`, `${scope}-${article.id}`)}
              style={({ pressed }) => [styles.dotButton, pressed && common.pressed]}
            >
              <View {...elementProps(`featured-carousel-dot-indicator`, `${scope}-${article.id}`)} style={[styles.dot, { backgroundColor: bandInk, opacity: index === activeIndex ? 1 : 0.35, width: index === activeIndex ? 22 : 8 }]} />
            </Pressable>
          ))}
        </View>
        <View {...elementProps(`featured-carousel-actions`, scope)} style={styles.actions}>
          <Pressable accessibilityRole={`button`} accessibilityLabel={`Previous story`} onPress={previousSlide} {...elementProps(`featured-carousel-previous`, scope)} style={({ pressed }) => [styles.button, pressed && common.pressed]}>
            <View style={styles.previousIcon} {...elementProps(`featured-carousel-previous-icon-frame`, scope)}><Icon size={18} name={`arrow-right`} color={accent.color} id={`featured-carousel-previous-icon-${scope}`} className={`featured-carousel-previous-icon`} /></View>
          </Pressable>
          <Text {...elementProps(`featured-carousel-position`, scope)} accessibilityLabel={`Story ${activeIndex + 1} of ${blogArticles.length}`} accessibilityLiveRegion={isAutoplaying ? `none` : `polite`} style={[common.metaLabel, styles.position, { color: bandInk }]}>{`${activeIndex + 1} / ${blogArticles.length}`}</Text>
          <Pressable accessibilityRole={`button`} accessibilityLabel={`Next story`} onPress={nextSlide} {...elementProps(`featured-carousel-next`, scope)} style={({ pressed }) => [styles.button, pressed && common.pressed]}>
            <Icon size={18} name={`arrow-right`} color={accent.color} id={`featured-carousel-next-icon-${scope}`} className={`featured-carousel-next-icon`} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default FeaturedArticleCarousel;
