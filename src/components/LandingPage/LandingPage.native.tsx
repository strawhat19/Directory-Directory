import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import PageCta from '../PageCta/PageCta';
import HeroAtom from '../HeroAtom/HeroAtom';
import CategoryGrid from '../CategoryGrid/CategoryGrid.native';
import DirectoryExplorer from '../DirectoryExplorer/DirectoryExplorer.native';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import { Link, useRouter } from 'expo-router';
import { BlurTargetView } from 'expo-blur';
import BrandMark from '../BrandMark/BrandMark';
import AuthActions from '../AuthActions/AuthActions';
import PageEyebrow from '../PageEyebrow/PageEyebrow';
import { pageCtas } from '../../shared/cta/pageCtas';
import { useLandingPage } from './useLandingPage.native';
import { elementProps } from '../../shared/ui/elementProps';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlassBackdrop from '../GlassBackdrop/GlassBackdrop.native';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import PricingSection from '../PricingSection/PricingSection.native';
import DirectoryIntroCta from '../DirectoryIntroCta/DirectoryIntroCta';
import DirectoryDetails from '../DirectoryDetails/DirectoryDetails';
import { heroMagicTypeTerms } from '../../shared/landing/magicTypeTerms';
import DirectoryScrollButton from '../DirectoryScrollButton/DirectoryScrollButton';
import FeaturedArticleCarousel from '../FeaturedArticleCarousel/FeaturedArticleCarousel';
import { siteFooterNavigation, siteHeaderNavigation } from '../../shared/navigation/siteNavigation';
import { Alert, Animated, Modal, Pressable, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native';

const firstHeroMagicTerm = heroMagicTypeTerms[0] ?? `Directory`;

function HeroMagicHeading({ enabled, styles, wide, accentStyle }: {
    enabled: boolean;
    wide: boolean;
    styles: ReturnType<typeof useLandingPage>[`styles`];
    accentStyle: ReturnType<typeof useLandingPage>[`accentTextStyle`];
}) {
    const [text, setText] = useState<string>(firstHeroMagicTerm);
    const [cursorVisible, setCursorVisible] = useState(false);

    useEffect(() => {
        setText(firstHeroMagicTerm);
        if (!enabled || heroMagicTypeTerms.length < 2) return;

        let index = 0;
        let length = firstHeroMagicTerm.length;
        let erasing = true;
        let timeout: ReturnType<typeof setTimeout>;

        const typeNextCharacter = () => {
            const term = heroMagicTypeTerms[index] ?? firstHeroMagicTerm;

            if (erasing) {
                length = Math.max(0, length - 1);
                setText(term.slice(0, length));

                if (length === 0) {
                    index = (index + 1) % heroMagicTypeTerms.length;
                    erasing = false;
                    timeout = setTimeout(typeNextCharacter, 220);
                    return;
                }

                timeout = setTimeout(typeNextCharacter, 60);
                return;
            }

            const nextTerm = heroMagicTypeTerms[index] ?? firstHeroMagicTerm;
            length = Math.min(nextTerm.length, length + 1);
            setText(nextTerm.slice(0, length));

            if (length === nextTerm.length) {
                erasing = true;
                timeout = setTimeout(typeNextCharacter, 1800);
                return;
            }

            timeout = setTimeout(typeNextCharacter, 95);
        };

        timeout = setTimeout(typeNextCharacter, 1800);
        return () => clearTimeout(timeout);
    }, [enabled]);

    useEffect(() => {
        if (!enabled || heroMagicTypeTerms.length < 2) {
            setCursorVisible(false);
            return;
        }

        setCursorVisible(true);
        const interval = setInterval(() => setCursorVisible((visible) => !visible), 540);
        return () => clearInterval(interval);
    }, [enabled]);

    return (
        <View
            {...elementProps(`landing-hero-heading`)}
            accessible
            accessibilityRole={`header`}
            accessibilityLabel={`The Directory of Directories.`}
        >
            <Text
                {...elementProps(`landing-hero-heading-first-line`)}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={wide ? 0.72 : 0.45}
                style={[styles.heading, wide && styles.headingWide, styles.headingFirstLine]}
            >
                {`The `}
                <Text {...elementProps(`landing-hero-magic-term`)}>
                    {text}
                </Text>
                <Animated.Text
                    {...elementProps(`landing-hero-magic-cursor`)}
                    style={[styles.headingMagicCursor, accentStyle, !cursorVisible && styles.headingMagicCursorHidden]}
                >
                    {`|`}
                </Animated.Text>
            </Text>
            <Animated.Text
                {...elementProps(`landing-hero-heading-second-line`)}
                numberOfLines={wide ? undefined : 1}
                adjustsFontSizeToFit={!wide}
                minimumFontScale={0.45}
                style={[styles.heading, wide && styles.headingWide, styles.headingAccent, accentStyle]}
            >
                {`of Directories.`}
            </Animated.Text>
        </View>
    );
}

export default function LandingPage({ discover = false }: { discover?: boolean }) {
    const router = useRouter();
    const { width } = useWindowDimensions();
    const blurTarget = useRef<View | null>(null);
    const page = useLandingPage();
    const {
        accent,
        wide,
        year,
        scroll,
        styles,
        colors,
        isDark,
        dotStyle,
        accentTextStyle,
        landing,
        padding,
        reduceMotion,
        motionPreferenceReady,
        selected,
        scopeItems,
        onScroll,
        artworkRows,
        searchInput,
        toggleTheme,
        showHeaderSearch,
        showScrollToTop,
        scrollToTopBottomOffset,
        scrollToTopOverPricing,
        scrollToTop,
        scrollToExplore,
        scrollToCategories,
        scrollToHeroSearch,
        entranceStyle,
        radarRingStyles,
        searchIconItems,
        searchThemeStyle,
        searchPlaceholder,
        searchBoxThemeStyle,
        showSearchResults,
        selectSearchScope,
        setMainOffset,
        setHeaderHeight,
        setSearchLayout,
        setHeroLayout,
        setCategoriesOffset,
        setPricingLayout,
        setFooterOffset,
        setScrollToTopLayout,
        setViewportHeight,
        headerSearchStyle,
    } = page;

    const openNotifications = () => Alert.alert(
        `Notifications`,
        `This application is in development, sign up to let us know you are interested\n\nWe are sorry to show ads, we are only doing this to support our small business, please sign up to support us!`,
        [
            { text: `Close`, style: `cancel` },
            { text: `Sign up`, onPress: () => router.push(`/sign-up`) },
        ],
    );
    const headerMenuLinks = siteHeaderNavigation.map((item) => (
        <Link
            {...elementProps(`landing-header-menu-link`, item.id)}
            asChild
            key={item.id}
            href={item.href}
        >
            <Pressable
                {...elementProps(`landing-header-menu-button`, item.id)}
                accessibilityRole={`link`}
                style={({ pressed }) => [styles.menuButton, pressed && styles.pressed]}
            >
                <Icon
                    id={`landing-header-menu-icon-${item.id}`}
                    className={`landing-header-menu-icon`}
                    name={item.icon}
                    color={item.color}
                    size={16}
                />
                <Text
                    {...elementProps(`landing-header-menu-label`, item.id)}
                    style={styles.menuLabel}
                >
                    {item.label}
                </Text>
            </Pressable>
        </Link>
    ));

    return (
        <SafeAreaView
            {...elementProps(`directory-directory-screen`)}
            edges={[`top`, `bottom`]}
            style={styles.screen}
        >
            <ScrollView
                {...elementProps(`directory-directory-scroll`)}
                stickyHeaderIndices={[0]}
                removeClippedSubviews={false}
                ref={scroll}
                style={styles.scroll}
                onScroll={onScroll}
                scrollEventThrottle={16}
                keyboardShouldPersistTaps={`handled`}
                contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
                onLayout={(event) => {
                    const { y, height } = event.nativeEvent.layout;
                    setViewportHeight(height, y);
                }}
            >
                <View
                    {...elementProps(`landing-sticky-header`)}
                    style={styles.stickyHeader}
                    onLayout={(event) => {
                        setHeaderHeight(event.nativeEvent.layout.height);
                    }}
                >
                    <GlassBackdrop scope={`landing-header`} blurTarget={blurTarget} />
                    <DirectoryMarquee scope={`landing-header`} />
                    <View {...elementProps(`landing-header`)} style={styles.header}>
                        <View {...elementProps(`landing-header-brand`)} style={styles.brand}>
                            <BrandMark id={`landing-header-mark`} className={`landing-header-mark`} size={43} />
                            <Text {...elementProps(`landing-header-brand-name`)} style={styles.brandName}>
                                {`Directory\nDirectory`}
                            </Text>
                        </View>
                        <View
                            {...elementProps(`landing-header-controls`)}
                            style={styles.headerControls}
                        >
                            {wide ? (
                                <View
                                    {...elementProps(`landing-header-menu`)}
                                    style={styles.menu}
                                >
                                    {headerMenuLinks}
                                </View>
                            ) : (
                                <ScrollView
                                    {...elementProps(`landing-header-menu`)}
                                    horizontal
                                    style={styles.menuScroll}
                                    contentContainerStyle={styles.menuScrollContent}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {headerMenuLinks}
                                </ScrollView>
                            )}
                            <View
                                {...elementProps(`landing-header-utilities`)}
                                style={styles.headerUtilities}
                            >
                                <Pressable
                                    {...elementProps(`landing-header-notifications-button`)}
                                    onPress={openNotifications}
                                    accessibilityRole={`button`}
                                    accessibilityLabel={`Notifications, 2 updates`}
                                    style={({ pressed }) => [styles.headerUtilityButton, styles.headerNotificationButton, pressed && styles.pressed]}
                                >
                                    <Icon
                                        id={`landing-header-notifications-icon`}
                                        className={`landing-header-notifications-icon`}
                                        name={`bell`}
                                        color={isDark ? colors.white : accent.color}
                                        size={17}
                                    />
                                    <View
                                        {...elementProps(`landing-header-notifications-badge`)}
                                        style={styles.headerNotificationBadge}
                                    >
                                        <Text
                                            {...elementProps(`landing-header-notifications-badge-label`)}
                                            style={styles.headerNotificationBadgeLabel}
                                        >
                                            {`2`}
                                        </Text>
                                    </View>
                                </Pressable>
                                <Animated.View
                                    {...elementProps(`landing-header-search-container`)}
                                    pointerEvents={showHeaderSearch ? `auto` : `none`}
                                    accessibilityElementsHidden={!showHeaderSearch}
                                    importantForAccessibility={showHeaderSearch ? `auto` : `no-hide-descendants`}
                                    style={[styles.headerSearchContainer, headerSearchStyle]}
                                >
                                    <Pressable
                                        {...elementProps(`landing-header-search-button`)}
                                        onPress={scrollToHeroSearch}
                                        accessibilityRole={`button`}
                                        accessibilityLabel={`Go to search`}
                                        style={({ pressed }) => [styles.headerUtilityButton, pressed && styles.pressed]}
                                    >
                                        <Icon
                                            id={`landing-header-search-icon`}
                                            className={`landing-header-search-icon`}
                                            name={`search`}
                                            color={colors.white}
                                            size={17}
                                        />
                                    </Pressable>
                                </Animated.View>
                                <Pressable
                                    {...elementProps(`landing-header-theme-button`)}
                                    onPress={toggleTheme}
                                    accessibilityRole={`button`}
                                    accessibilityLabel={isDark ? `Switch to light mode` : `Switch to dark mode`}
                                    style={({ pressed }) => [styles.headerUtilityButton, styles.headerThemeButton, pressed && styles.pressed]}
                                >
                                    <Icon
                                        id={`landing-header-theme-icon`}
                                        className={`landing-header-theme-icon`}
                                        name={isDark ? `sun` : `moon`}
                                        color={isDark ? `#000` : colors.white}
                                        size={17}
                                    />
                                </Pressable>
                            </View>
                            <AuthActions scope={`landing-header`} />
                        </View>
                    </View>
                </View>

                <BlurTargetView
                    ref={blurTarget}
                    {...elementProps(`landing-main-blur-target`)}
                    onLayout={(event) => {
                        setMainOffset(event.nativeEvent.layout.y);
                    }}
                >
                <Animated.View
                    {...elementProps(`landing-main`)}
                    style={entranceStyle}
                >
                    {discover ? (
                        <View
                            {...elementProps(`discover-intro`)}
                            style={styles.discoverIntro}
                        >
                            <PageEyebrow page={`discover`} id={`discover-eyebrow`} label={`Find your next favorite`} />
                            <Text
                                {...elementProps(`discover-title`)}
                                accessibilityRole={`header`}
                                style={styles.sectionTitle}
                            >
                                {`Discover`}
                            </Text>
                            <Text
                                {...elementProps(`discover-description`)}
                                style={styles.heroDescription}
                            >
                                {`Browse categories and find your next favorite directory.`}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <View
                                {...elementProps(`landing-hero`)}
                                style={[styles.hero, wide && styles.heroWide]}
                                onLayout={(event) => {
                                    const { y, height } = event.nativeEvent.layout;
                                    setHeroLayout(y, height);
                                }}
                            >
                                <View {...elementProps(`landing-hero-intro`)} style={[styles.heroIntro, wide && styles.heroIntroWide]}>
                                    <View {...elementProps(`landing-hero-copy`)} style={styles.heroCopy}>
                                        <View
                                            {...elementProps(`landing-hero-eyebrow-line`)}
                                            style={styles.eyebrowLine}
                                        >
                                            <View
                                                {...elementProps(`landing-hero-eyebrow-radar`)}
                                                pointerEvents={`none`}
                                                style={styles.eyebrowRadar}
                                            >
                                                {radarRingStyles.map((ringStyle, index) => (
                                                    <Animated.View
                                                        {...elementProps(`landing-hero-eyebrow-radar-ring`, `${index}`)}
                                                        key={index}
                                                        style={[styles.eyebrowRadarRing, ringStyle]}
                                                    />
                                                ))}
                                                <Animated.View
                                                    {...elementProps(`landing-hero-eyebrow-dot`)}
                                                    style={[styles.eyebrowDot, dotStyle]}
                                                />
                                            </View>
                                            <Animated.Text
                                                {...elementProps(`landing-hero-eyebrow`)}
                                                style={[styles.eyebrow, accentTextStyle]}
                                            >
                                                {`The Directory of Directories`}
                                            </Animated.Text>
                                        </View>
                                        <HeroMagicHeading
                                            wide={wide}
                                            styles={styles}
                                            accentStyle={accentTextStyle}
                                            enabled={motionPreferenceReady && !reduceMotion}
                                        />
                                        <Text {...elementProps(`landing-hero-description`)} style={styles.heroDescription}>
                                            {`A directory brings useful resources together by category. Directory Directory helps you discover directories for tools, design, learning, communities, and more—all in one place.`}
                                        </Text>
                                    </View>
                                    <View {...elementProps(`landing-hero-vertical-actions`)} style={styles.heroVerticalActions}>
                                        <DirectoryScrollButton target={`categories`} onExplore={scrollToCategories} />
                                        <DirectoryScrollButton onExplore={scrollToExplore} />
                                    </View>
                                </View>
                                <View
                                    {...elementProps(`landing-hero-artwork`)}
                                    style={[styles.heroArtwork, wide && styles.heroArtworkWide]}
                                >
                                    {/* Comment out HeroAtom to remove the decorative animation. */}
                                    <HeroAtom />
                                    <View {...elementProps(`landing-artwork-heading`)} style={styles.artworkHeading}>
                                        <BrandMark id={`landing-artwork-mark`} className={`landing-artwork-mark`} size={72} />
                                        <View {...elementProps(`landing-artwork-heading-copy`)}>
                                            <Text {...elementProps(`landing-artwork-title`)} style={styles.artworkTitle}>
                                                {`A world of\ngood finds.`}
                                            </Text>
                                            <Text {...elementProps(`landing-artwork-subtitle`)} style={styles.artworkSubtitle}>
                                                {`ALL IN ONE PLACE`}
                                            </Text>
                                        </View>
                                    </View>
                                    <View {...elementProps(`landing-artwork-rows`)} style={styles.artworkRows}>
                                        {artworkRows.map((row, index) => (
                                            <View
                                                {...elementProps(`landing-artwork-row`, `${index}`)}
                                                key={row.icon}
                                                style={[styles.artworkRow, { backgroundColor: row.accent.background }]}
                                            >
                                                <Icon
                                                    id={`landing-artwork-row-icon-${index}`}
                                                    className={`landing-artwork-row-icon`}
                                                    name={row.icon}
                                                    color={row.accent.color}
                                                    size={20}
                                                />
                                                <Text
                                                    {...elementProps(`landing-artwork-row-label`, `${index}`)}
                                                    style={[styles.artworkRowLabel, { color: row.accent.color }]}
                                                >
                                                    {row.label}
                                                </Text>
                                                <Icon
                                                    id={`landing-artwork-row-arrow-${index}`}
                                                    className={`landing-artwork-row-arrow`}
                                                    name={`arrow-right`}
                                                    color={row.accent.color}
                                                    size={16}
                                                />
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>

                            <View
                                {...elementProps(`landing-search-section`)}
                                style={styles.searchSection}
                                onLayout={(event) => setSearchLayout(event.nativeEvent.layout.y, event.nativeEvent.layout.height)}
                            >
                                <View
                                    {...elementProps(`landing-search-tabs`)}
                                    accessibilityRole={`tablist`}
                                    style={styles.searchTabs}
                                >
                                    {scopeItems.map((item) => (
                                        <Animated.View
                                            {...elementProps(`landing-search-tab-container`, item.id)}
                                            key={item.id}
                                            style={[styles.searchTabContainer, searchThemeStyle]}
                                        >
                                            <Pressable
                                                {...elementProps(`landing-search-tab`, item.id)}
                                                accessibilityRole={`tab`}
                                                accessibilityState={{ selected: item.active }}
                                                onPress={() => selectSearchScope(item.id)}
                                                style={({ pressed }) => [
                                                    styles.searchTab,
                                                    item.active && styles.searchTabActive,
                                                    pressed && styles.pressed,
                                                ]}
                                            >
                                                <Icon
                                                    filled
                                                    id={`landing-search-tab-icon-${item.id}`}
                                                    className={`landing-search-tab-icon`}
                                                    name={item.icon}
                                                    color={colors.white}
                                                    size={14}
                                                />
                                                <Text
                                                    {...elementProps(`landing-search-tab-label`, item.id)}
                                                    style={styles.searchTabLabel}
                                                >
                                                    {item.label}
                                                </Text>
                                            </Pressable>
                                        </Animated.View>
                                    ))}
                                </View>
                                <Animated.View
                                    {...elementProps(`landing-search-box`)}
                                    style={[styles.searchBox, searchBoxThemeStyle]}
                                >
                                    <View
                                        {...elementProps(`landing-search-icon-container`)}
                                        pointerEvents={`none`}
                                        style={styles.searchIcon}
                                    >
                                        {searchIconItems.map((item) => (
                                            <Animated.View
                                                {...elementProps(`landing-search-icon-layer`, item.id)}
                                                key={item.id}
                                                style={[styles.searchIconLayer, { opacity: item.opacity }]}
                                            >
                                                <Icon
                                                    id={`landing-search-icon-${item.id}`}
                                                    className={`landing-search-icon`}
                                                    name={`search`}
                                                    color={item.color}
                                                    size={20}
                                                />
                                            </Animated.View>
                                        ))}
                                    </View>
                                    <TextInput
                                        {...elementProps(`landing-search-input`)}
                                        ref={searchInput}
                                        value={landing.query}
                                        returnKeyType={`search`}
                                        onChangeText={landing.setQuery}
                                        onSubmitEditing={showSearchResults}
                                        style={styles.searchInput}
                                        placeholder={searchPlaceholder}
                                        placeholderTextColor={colors.muted}
                                        accessibilityLabel={searchPlaceholder}
                                    />
                                    <Animated.View
                                        {...elementProps(`landing-search-button-container`)}
                                        style={[styles.searchButtonContainer, searchThemeStyle]}
                                    >
                                        <Animated.View
                                            pointerEvents={`none`}
                                            {...elementProps(`landing-search-button-folder-tab`)}
                                            style={[styles.searchButtonFolderTab, searchThemeStyle]}
                                        />
                                        <Pressable
                                            {...elementProps(`landing-search-button`)}
                                            onPress={showSearchResults}
                                            accessibilityRole={`button`}
                                            accessibilityLabel={`Show search results`}
                                            style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}
                                        >
                                            <Icon id={`landing-search-button-icon`} className={`landing-search-button-icon`} name={`arrow-right`} color={colors.white} size={17} />
                                            <Text {...elementProps(`landing-search-button-label`)} style={styles.searchButtonLabel}>
                                                {`Search`}
                                            </Text>
                                        </Pressable>
                                    </Animated.View>
                                </Animated.View>
                                <Text {...elementProps(`landing-search-hint`)} style={styles.searchHint}>
                                    {`Try AI, business, creative, travel, or a #topic.`}
                                </Text>
                            </View>

                        </>
                    )}

                    {!discover && <DirectoryIntroCta onExplore={scrollToExplore} backgroundStyle={searchThemeStyle} horizontalInset={padding + Math.max(0, (width - 1344) / 2)} />}
                    <CategoryGrid
                        model={page}
                        onLayout={(event) => {
                            const { y, height } = event.nativeEvent.layout;
                            setCategoriesOffset(y);
                            if (discover) setHeroLayout(y, height);
                        }}
                    />
                    {discover ? <PageCta parentMaxWidth={1344} content={pageCtas.discover} horizontalInset={padding + Math.max(0, (width - 1344) / 2)} /> : <FeaturedArticleCarousel scope={`landing`} horizontalInset={padding + Math.max(0, (width - 1344) / 2)} />}
                    <DirectoryExplorer joined model={page} />

                    {!discover && (
                        <PricingSection
                            horizontalInset={padding + Math.max(0, (width - 1344) / 2)}
                            onLayout={(event) => {
                                const { y, height } = event.nativeEvent.layout;
                                setPricingLayout(y, height);
                            }}
                        />
                    )}

                    <View {...elementProps(`landing-footer`)} style={styles.footer} onLayout={(event) => setFooterOffset(event.nativeEvent.layout.y)}>
                        <View {...elementProps(`landing-footer-bottom`)} style={styles.footerBottom}>
                            <View {...elementProps(`landing-footer-brand`)} style={styles.footerBrand}>
                                <BrandMark id={`landing-footer-mark`} className={`landing-footer-mark`} size={26} />
                                <Text {...elementProps(`landing-footer-brand-label`)} style={styles.footerBrandLabel}>
                                    {`Directory Directory`}
                                </Text>
                            </View>
                            <View {...elementProps(`landing-footer-legal`)} style={[styles.footerLegal, !wide && styles.footerLegalMobile]}>
                                <Text {...elementProps(`landing-footer-copyright`)} style={[styles.copyright, !wide && styles.copyrightMobile]}>
                                    <Text {...elementProps(`landing-footer-copyright-symbol`)} style={styles.copyrightAccent}>{`©`}</Text>
                                    {` ${year ?? `—`} Directory Directory`}
                                    <Text {...elementProps(`landing-footer-copyright-period`)} style={styles.copyrightAccent}>{`.`}</Text>
                                </Text>
                                <View {...elementProps(`landing-footer-navigation`)} style={[styles.menuScrollContent, styles.footerNavigation, !wide && styles.footerNavigationMobile]}>
                                    {siteFooterNavigation.map((item) => (
                                        <Link key={item.id} href={item.href} asChild>
                                            <Pressable
                                                accessibilityRole={`link`}
                                                {...elementProps(`landing-footer-navigation-link`, item.id)}
                                                style={({ pressed }) => [styles.menuButton, styles.footerNavigationLink, pressed && styles.pressed]}
                                            >
                                                <Icon size={16} name={item.icon} color={item.color} id={`landing-footer-navigation-icon-${item.id}`} className={`landing-footer-navigation-icon`} />
                                                <Text {...elementProps(`landing-footer-navigation-label`, item.id)} style={[styles.menuLabel, styles.footerNavigationLabel]}>{item.label}</Text>
                                            </Pressable>
                                        </Link>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View
                            {...elementProps(`landing-footer-details`)}
                            style={styles.footerDetails}
                        >
                            <Link
                                {...elementProps(`landing-footer-piratechs-link`)}
                                asChild
                                href={`https://piratechs.com/`}
                            >
                                <Pressable
                                    {...elementProps(`landing-footer-piratechs-button`)}
                                    accessibilityRole={`link`}
                                    style={({ pressed }) => [styles.footerLink, pressed && styles.pressed]}
                                >
                                    <Icon
                                        size={14}
                                        name={`globe`}
                                        color={colors.blue}
                                        id={`landing-footer-piratechs-globe-icon`}
                                        className={`landing-footer-piratechs-globe-icon`}
                                    />
                                    <Text
                                        {...elementProps(`landing-footer-piratechs-label`)}
                                        style={styles.footerLinkLabel}
                                    >
                                        {`Made by Piratechs`}
                                    </Text>
                                    <Icon
                                        id={`landing-footer-piratechs-icon`}
                                        className={`landing-footer-piratechs-icon`}
                                        name={`arrow-up-right`}
                                        color={colors.blue}
                                        size={14}
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </Animated.View>
                </BlurTargetView>
            </ScrollView>

            <ScrollToTop
                visible={showScrollToTop}
                onPress={scrollToTop}
                bottomOffset={scrollToTopBottomOffset}
                reduceMotion={reduceMotion}
                overPricing={scrollToTopOverPricing}
                onLayout={(event) => {
                    const { y, height } = event.nativeEvent.layout;
                    setScrollToTopLayout(y, height);
                }}
            />

            <Modal
                {...elementProps(`landing-directory-modal`)}
                transparent
                animationType={`fade`}
                visible={Boolean(selected)}
                onRequestClose={landing.closeDirectory}
            >
                <View {...elementProps(`landing-modal-backdrop`)} style={styles.modalBackdrop}>
                    {selected && (
                        <View {...elementProps(`landing-modal-card`, selected.id)} style={styles.modalCard}>
                            <View {...elementProps(`landing-modal-header`, selected.id)} style={styles.modalHeader}>
                                <Pressable
                                    {...elementProps(`landing-modal-close`, selected.id)}
                                    onPress={landing.closeDirectory}
                                    accessibilityRole={`button`}
                                    accessibilityLabel={`Close Directory Details`}
                                    style={({ pressed }) => [styles.bookmarkButton, pressed && styles.pressed]}
                                >
                                    <Icon id={`landing-modal-close-icon`} className={`landing-modal-close-icon`} name={`close`} color={colors.ink} size={22} />
                                </Pressable>
                            </View>
                            <ScrollView
                                keyboardShouldPersistTaps={`handled`}
                                style={styles.modalScroll}
                                {...elementProps(`landing-modal-content`, selected.id)}
                            >
                                <DirectoryDetails directory={selected} scope={`modal`} onNavigate={landing.closeDirectory} />
                            </ScrollView>
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}
