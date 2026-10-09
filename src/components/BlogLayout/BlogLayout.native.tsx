import Icon from '../Icon/Icon';
import { Link } from 'expo-router';
import { BlurTargetView } from 'expo-blur';
import BrandMark from '../BrandMark/BrandMark';
import { useEffect, useRef, useState } from 'react';
import AuthActions from '../AuthActions/AuthActions';
import type { BlogLayoutProps } from './BlogLayout.types';
import ScrollToTop from '../ScrollToTop/ScrollToTop.native';
import { elementProps } from '../../shared/ui/elementProps';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassBackdrop from '../GlassBackdrop/GlassBackdrop.native';
import { useBlogPresentation } from './useBlogPresentation.native';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { AccessibilityInfo, Animated, Pressable, ScrollView, Text, View } from 'react-native';
import { siteFooterNavigation, siteHeaderNavigation } from '../../shared/navigation/siteNavigation';

const BlogLayout = ({ hero, scope, children, sticky = true }: BlogLayoutProps) => {
  const { year } = useCopyrightYear();
  const scroll = useRef<ScrollView>(null);
  const blurTarget = useRef<View | null>(null);
  const heroBottom = useRef(0);
  const bodyOffset = useRef(0);
  const headerHeight = useRef(0);
  const scrollOffset = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { styles, palette, padding } = useBlogPresentation();

  useEffect(() => {
    let active = true;
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    }).catch(() => { if (active) setReduceMotion(false); });
    const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, setReduceMotion);
    return () => { active = false; subscription.remove(); };
  }, []);

  return (
    <SafeAreaView {...elementProps(`blog-screen`, scope)} edges={[`top`, `bottom`]} style={styles.screen}>
      <ScrollView
        ref={scroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={sticky ? [0] : []}
        {...elementProps(`blog-scroll`, scope)}
        contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
        onScroll={(event) => {
          const offset = event.nativeEvent.contentOffset.y;
          scrollOffset.setValue(offset);
          setShowScrollToTop(offset + (sticky ? headerHeight.current : 0) >= bodyOffset.current + heroBottom.current);
        }}
      >
        <Animated.View
          {...elementProps(`blog-sticky-header`, scope)}
          onLayout={(event) => { headerHeight.current = event.nativeEvent.layout.height; }}
          style={[styles.stickyHeader, { backgroundColor: scrollOffset.interpolate({
            inputRange: [0, 100],
            extrapolate: `clamp`,
            outputRange: [palette.background, palette.headerScrim],
          }) }]}
        >
          <GlassBackdrop scope={`blog-header-${scope}`} blurTarget={blurTarget} />
          <DirectoryMarquee scope={`blog-header-${scope}`} />
          <View {...elementProps(`blog-header`, scope)} style={styles.header}>
            <Link href={`/`} asChild>
              <Pressable
                {...elementProps(`blog-brand-link`, scope)}
                accessibilityLabel={`Directory Directory home`}
                style={({ pressed }) => [styles.brand, pressed && styles.pressed]}
              >
                <BrandMark size={43} id={`blog-brand-mark-${scope}`} className={`blog-brand-mark`} />
                <Text {...elementProps(`blog-brand-name`, scope)} style={styles.brandName}>{`Directory\nDirectory`}</Text>
              </Pressable>
            </Link>
            <View {...elementProps(`blog-header-controls`, scope)} style={styles.controls}>
              <View {...elementProps(`blog-navigation`, scope)} style={styles.navigation}>
                {siteHeaderNavigation.map((item) => (
                  <Link key={item.id} href={item.href} asChild>
                    <Pressable
                      accessibilityState={{ selected: item.id === `blog` }}
                      {...elementProps(`blog-navigation-link`, `${scope}-${item.id}`)}
                      style={({ pressed }) => [styles.navigationLink, item.id === `blog` && styles.navigationActive, pressed && styles.pressed]}
                    >
                      <Icon size={15} name={item.icon} color={item.color} id={`blog-navigation-icon-${scope}-${item.id}`} className={`blog-navigation-icon`} />
                      <Text {...elementProps(`blog-navigation-label`, `${scope}-${item.id}`)} style={[styles.navigationLabel, item.id === `blog` && styles.activeLabel]}>{item.label}</Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
              <AuthActions scope={`blog-header-${scope}`} />
            </View>
          </View>
        </Animated.View>
        <BlurTargetView ref={blurTarget} {...elementProps(`blog-body`, scope)} style={styles.body} onLayout={(event) => { bodyOffset.current = event.nativeEvent.layout.y; }}>
          <View {...elementProps(`blog-hero`, scope)} style={styles.hero} onLayout={(event) => { const { y, height } = event.nativeEvent.layout; heroBottom.current = y + height; }}>{hero}</View>
          {children}
          <View {...elementProps(`blog-footer`, scope)} style={styles.footer}>
            <View {...elementProps(`blog-footer-legal`, scope)} style={styles.footerLegal}>
              <Text {...elementProps(`blog-copyright`, scope)} style={[styles.footerText, styles.footerCopyright]}>{year === null ? `© Directory Directory` : `© ${year} Directory Directory`}</Text>
              <View {...elementProps(`blog-footer-navigation`, scope)} style={[styles.navigation, styles.footerNavigation]}>
                {siteFooterNavigation.map((item) => (
                  <Link key={item.id} href={item.href} asChild>
                    <Pressable
                      accessibilityRole={`link`}
                      {...elementProps(`blog-footer-navigation-link`, `${scope}-${item.id}`)}
                      style={({ pressed }) => [styles.navigationLink, styles.footerNavigationLink, pressed && styles.pressed]}
                    >
                      <Icon size={15} name={item.icon} color={item.color} id={`blog-footer-navigation-icon-${scope}-${item.id}`} className={`blog-footer-navigation-icon`} />
                      <Text {...elementProps(`blog-footer-navigation-label`, `${scope}-${item.id}`)} style={[styles.navigationLabel, styles.footerNavigationLabel]}>{item.label}</Text>
                    </Pressable>
                  </Link>
                ))}
              </View>
            </View>
            <Link href={`https://piratechs.com/`} asChild>
              <Pressable {...elementProps(`blog-footer-piratechs-link`, scope)} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
                <Text {...elementProps(`blog-footer-piratechs-label`, scope)} style={styles.actionLabel}>{`Piratechs`}</Text>
                <Icon size={14} name={`arrow-up-right`} color={palette.blue} id={`blog-footer-piratechs-icon-${scope}`} className={`blog-footer-piratechs-icon`} />
              </Pressable>
            </Link>
          </View>
        </BlurTargetView>
      </ScrollView>
      <ScrollToTop visible={showScrollToTop} reduceMotion={reduceMotion} onPress={() => scroll.current?.scrollTo({ y: 0, animated: !reduceMotion })} />
    </SafeAreaView>
  );
};

export default BlogLayout;
