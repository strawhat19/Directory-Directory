import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import Icon from '../Icon/Icon';
import BrandMark from '../BrandMark/BrandMark';
import AuthActions from '../AuthActions/AuthActions';
import DirectoryMarquee from '../DirectoryMarquee/DirectoryMarquee';
import { useLandingPage } from './useLandingPage.native';
import { palette } from './LandingPage.native.styles';
import { elementProps } from '../../shared/ui/elementProps';
import { siteNavigation } from '../../shared/navigation/siteNavigation';

export default function LandingPage() {
    const {
        wide,
        year,
        scroll,
        styles,
        dotStyle,
        landing,
        padding,
        selected,
        scopeItems,
        cardWidth,
        viewItems,
        topicItems,
        artworkRows,
        categoryItems,
        selectCategory,
        categoryWidth,
        entranceStyle,
        radarRingStyles,
        directoryItems,
        searchIconItems,
        searchThemeStyle,
        searchPlaceholder,
        selectedAccent,
        selectedIsSaved,
        searchBoxThemeStyle,
        showSearchResults,
        selectSearchScope,
        setMainOffset,
        setHeaderHeight,
        setExploreOffset,
    } = useLandingPage();

    return (
        <SafeAreaView
            {...elementProps(`directory-directory-screen`)}
            edges={[`top`, `bottom`]}
            style={styles.screen}
        >
            <ScrollView
                {...elementProps(`directory-directory-scroll`)}
                stickyHeaderIndices={[0]}
                ref={scroll}
                style={styles.scroll}
                keyboardShouldPersistTaps={`handled`}
                contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
            >
                <View
                    {...elementProps(`landing-sticky-header`)}
                    style={styles.stickyHeader}
                    onLayout={(event) => {
                        setHeaderHeight(event.nativeEvent.layout.height);
                    }}
                >
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
                            <View
                                {...elementProps(`landing-header-menu`)}
                                style={styles.menu}
                            >
                                {siteNavigation.map((item) => (
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
                                ))}
                            </View>
                            <AuthActions scope={`landing-header`} />
                        </View>
                    </View>
                    <DirectoryMarquee scope={`landing-header`} />
                </View>

                <Animated.View
                    {...elementProps(`landing-main`)}
                    style={entranceStyle}
                    onLayout={(event) => {
                        setMainOffset(event.nativeEvent.layout.y);
                    }}
                >
                    <View {...elementProps(`landing-hero`)} style={[styles.hero, wide && styles.heroWide]}>
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
                                <Text
                                    {...elementProps(`landing-hero-eyebrow`)}
                                    style={styles.eyebrow}
                                >
                                    {`The Directory of Directories`}
                                </Text>
                            </View>
                            <Text
                                {...elementProps(`landing-hero-heading`)}
                                accessibilityRole={`header`}
                                style={[styles.heading, wide && styles.headingWide]}
                            >
                                {`Good things.\nWorth finding.`}
                            </Text>
                            <Text {...elementProps(`landing-hero-description`)} style={styles.heroDescription}>
                                {`Discover the directories that help you find your next favorite thing. One thoughtful collection, endless rabbit holes.`}
                            </Text>
                        </View>
                        <View
                            {...elementProps(`landing-hero-artwork`)}
                            style={[styles.heroArtwork, wide && styles.heroArtworkWide]}
                        >
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

                    <View {...elementProps(`landing-search-section`)} style={styles.searchSection}>
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
                                            id={`landing-search-tab-icon-${item.id}`}
                                            className={`landing-search-tab-icon`}
                                            name={item.icon}
                                            color={palette.white}
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
                                value={landing.query}
                                returnKeyType={`search`}
                                onChangeText={landing.setQuery}
                                onSubmitEditing={showSearchResults}
                                style={styles.searchInput}
                                placeholder={searchPlaceholder}
                                placeholderTextColor={palette.muted}
                                accessibilityLabel={`Search directories`}
                            />
                            <Animated.View
                                {...elementProps(`landing-search-button-container`)}
                                style={[styles.searchButtonContainer, searchThemeStyle]}
                            >
                                <Pressable
                                    {...elementProps(`landing-search-button`)}
                                    onPress={showSearchResults}
                                    accessibilityRole={`button`}
                                    accessibilityLabel={`Show search results`}
                                    style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}
                                >
                                    <Icon id={`landing-search-button-icon`} className={`landing-search-button-icon`} name={`arrow-right`} color={palette.white} size={17} />
                                    <Text {...elementProps(`landing-search-button-label`)} style={styles.searchButtonLabel}>
                                        {`Search`}
                                    </Text>
                                </Pressable>
                            </Animated.View>
                        </Animated.View>
                        <Text {...elementProps(`landing-search-hint`)} style={styles.searchHint}>
                            {`A few good starting points: design, useful tools, communities, places.`}
                        </Text>
                    </View>

                    <View
                            {...elementProps(`landing-categories-section`)}
                            style={styles.categorySection}
                        >
                            <View {...elementProps(`landing-categories-heading`)} style={styles.sectionHeader}>
                                <Text {...elementProps(`landing-categories-title`)} accessibilityRole={`header`} style={styles.sectionTitle}>
                                    {`Browse by category`}
                                </Text>
                            </View>
                            <View {...elementProps(`landing-categories`)} style={styles.categories}>
                                {categoryItems.map((item) => (
                                <Pressable
                                    {...elementProps(`landing-category`, item.id)}
                                    key={item.id}
                                    onPress={() => selectCategory(item.id)}
                                    accessibilityRole={`button`}
                                    accessibilityState={{ selected: item.active }}
                                    accessibilityLabel={`${item.label}, ${item.count} directories`}
                                    style={({ pressed }) => [
                                        styles.category,
                                        { width: categoryWidth },
                                        item.active && styles.categorySelected,
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    <View
                                        {...elementProps(`landing-category-icon-container`, item.id)}
                                        style={[styles.categoryIcon, { backgroundColor: item.accent.background }]}
                                    >
                                        <Icon
                                            id={`landing-category-icon-${item.id}`}
                                            className={`landing-category-icon`}
                                            name={item.icon}
                                            color={item.accent.color}
                                            size={23}
                                        />
                                    </View>
                                    <Text {...elementProps(`landing-category-label`, item.id)} style={styles.categoryLabel}>
                                        {item.label}
                                    </Text>
                                    <Text {...elementProps(`landing-category-description`, item.id)} style={styles.categoryDescription}>
                                        {item.description}
                                    </Text>
                                    <Text {...elementProps(`landing-category-count`, item.id)} style={styles.categoryCount}>
                                        {`${item.count} directories`}
                                    </Text>
                                </Pressable>
                                ))}
                            </View>
                            {categoryItems.length === 0 && (
                                <View
                                    {...elementProps(`landing-categories-empty-state`)}
                                    style={styles.emptyState}
                                >
                                    <Icon
                                        id={`landing-categories-empty-icon`}
                                        className={`landing-categories-empty-icon`}
                                        name={`search`}
                                        color={palette.blue}
                                        size={28}
                                    />
                                    <Text
                                        {...elementProps(`landing-categories-empty-title`)}
                                        style={styles.emptyTitle}
                                    >
                                        {`No categories found.`}
                                    </Text>
                                    <Text
                                        {...elementProps(`landing-categories-empty-description`)}
                                        style={styles.emptyDescription}
                                    >
                                        {`Try another search or explore all categories.`}
                                    </Text>
                                    <Pressable
                                        {...elementProps(`landing-categories-empty-clear-button`)}
                                        onPress={landing.clearFilters}
                                        accessibilityRole={`button`}
                                        style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
                                    >
                                        <Icon
                                            id={`landing-categories-empty-clear-icon`}
                                            className={`landing-categories-empty-clear-icon`}
                                            name={`arrow-right`}
                                            color={palette.blue}
                                            size={15}
                                        />
                                        <Text
                                            {...elementProps(`landing-categories-empty-clear-label`)}
                                            style={styles.clearButtonLabel}
                                        >
                                            {`Explore all categories`}
                                        </Text>
                                    </Pressable>
                                </View>
                            )}
                    </View>

                    <View
                        {...elementProps(`landing-explore`)}
                        style={styles.explore}
                        onLayout={(event) => {
                            setExploreOffset(event.nativeEvent.layout.y);
                        }}
                    >
                        <View {...elementProps(`landing-explore-heading`)} style={styles.sectionHeader}>
                            <Text {...elementProps(`landing-explore-title`)} accessibilityRole={`header`} style={styles.sectionTitle}>
                                {`Explore the collection`}
                            </Text>
                            <Text {...elementProps(`landing-explore-count`)} style={styles.sectionCaption}>
                                {`${landing.visibleDirectories.length} directories`}
                            </Text>
                        </View>
                        <View {...elementProps(`landing-explore-controls`)} style={styles.exploreControls}>
                            <View {...elementProps(`landing-topic-tabs`)} style={styles.topicTabs}>
                                {topicItems.map((item) => (
                                        <Pressable
                                            {...elementProps(`landing-topic-tab`, item.id)}
                                            key={item.topic}
                                            onPress={() => landing.setTopic(item.topic)}
                                            accessibilityRole={`tab`}
                                            accessibilityState={{ selected: item.active }}
                                            style={({ pressed }) => [
                                                styles.topicTab,
                                                item.active && styles.topicTabActive,
                                                pressed && styles.pressed,
                                            ]}
                                        >
                                            <Icon
                                                id={`landing-topic-tab-icon-${item.id}`}
                                                className={`landing-topic-tab-icon`}
                                                name={item.icon}
                                                size={13}
                                                color={item.active ? palette.white : palette.muted}
                                            />
                                            <Text
                                                {...elementProps(`landing-topic-tab-label`, item.id)}
                                                style={[styles.topicTabLabel, item.active && styles.topicTabLabelActive]}
                                            >
                                                {item.topic}
                                            </Text>
                                        </Pressable>
                                ))}
                            </View>
                            <View {...elementProps(`landing-view-controls`)} style={styles.viewControls}>
                                {viewItems.map((item) => (
                                    <Pressable
                                        {...elementProps(`landing-view-button`, item.mode)}
                                        key={item.mode}
                                        onPress={() => landing.setViewMode(item.mode)}
                                        accessibilityRole={`button`}
                                        accessibilityLabel={`Show ${item.mode} view`}
                                        accessibilityState={{ selected: item.active }}
                                        style={({ pressed }) => [
                                            styles.viewButton,
                                            item.active && styles.viewButtonActive,
                                            pressed && styles.pressed,
                                        ]}
                                    >
                                        <Icon
                                            id={`landing-view-icon-${item.mode}`}
                                            className={`landing-view-icon`}
                                            name={item.mode}
                                            size={17}
                                            color={item.active ? palette.ink : palette.muted}
                                        />
                                    </Pressable>
                                ))}
                            </View>
                        </View>

                        <View {...elementProps(`landing-directory-grid`)} style={styles.directoryGrid}>
                            {directoryItems.map((directory) => (
                                    <View
                                        {...elementProps(`landing-directory-card`, directory.id)}
                                        key={directory.id}
                                        style={[styles.directoryCard, { width: cardWidth }]}
                                    >
                                        <Pressable
                                            {...elementProps(`landing-directory-preview`, directory.id)}
                                            onPress={() => landing.openDirectory(directory)}
                                            accessibilityRole={`button`}
                                            accessibilityLabel={`Preview ${directory.name}`}
                                            style={({ pressed }) => [styles.directoryPreview, pressed && styles.pressed]}
                                        >
                                            <View {...elementProps(`landing-directory-card-header`, directory.id)} style={styles.directoryCardHeader}>
                                                <View
                                                    {...elementProps(`landing-directory-monogram`, directory.id)}
                                                    style={[styles.directoryMonogram, { backgroundColor: directory.accentStyle.background }]}
                                                >
                                                    <Text
                                                        {...elementProps(`landing-directory-initials`, directory.id)}
                                                        style={[styles.directoryInitials, { color: directory.accentStyle.color }]}
                                                    >
                                                        {directory.initials}
                                                    </Text>
                                                </View>
                                                {directory.featured && (
                                                    <View {...elementProps(`landing-directory-featured`, directory.id)} style={styles.featuredBadge}>
                                                        <Icon id={`landing-directory-featured-icon-${directory.id}`} className={`landing-directory-featured-icon`} name={`sparkles`} color={palette.muted} size={11} />
                                                        <Text {...elementProps(`landing-directory-featured-label`, directory.id)} style={styles.featuredBadgeLabel}>
                                                            {`Featured`}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>
                                            <View {...elementProps(`landing-directory-title-row`, directory.id)} style={styles.directoryTitleRow}>
                                                <Text {...elementProps(`landing-directory-title`, directory.id)} style={styles.directoryTitle}>
                                                    {directory.name}
                                                </Text>
                                                <Icon id={`landing-directory-preview-arrow-${directory.id}`} className={`landing-directory-preview-arrow`} name={`arrow-up-right`} color={palette.muted} size={16} />
                                            </View>
                                            <Text {...elementProps(`landing-directory-description`, directory.id)} style={styles.directoryDescription}>
                                                {directory.summary}
                                            </Text>
                                        </Pressable>
                                        <View {...elementProps(`landing-directory-footer`, directory.id)} style={styles.directoryFooter}>
                                            <Text {...elementProps(`landing-directory-category`, directory.id)} style={styles.directoryLabel}>
                                                {directory.label}
                                            </Text>
                                            <Pressable
                                                {...elementProps(`landing-directory-save`, directory.id)}
                                                onPress={() => landing.toggleSaved(directory.id)}
                                                accessibilityRole={`button`}
                                                accessibilityState={{ selected: directory.saved }}
                                                accessibilityLabel={`${directory.saved ? `Unsave` : `Save`} ${directory.name}`}
                                                style={({ pressed }) => [
                                                    styles.bookmarkButton,
                                                    directory.saved && styles.bookmarkButtonSaved,
                                                    pressed && styles.pressed,
                                                ]}
                                            >
                                                <Icon
                                                    id={`landing-directory-save-icon-${directory.id}`}
                                                    className={`landing-directory-save-icon`}
                                                    name={directory.saved ? `check` : `bookmark`}
                                                    color={directory.saved ? palette.blue : palette.muted}
                                                    size={18}
                                                />
                                            </Pressable>
                                        </View>
                                    </View>
                            ))}
                        </View>

                        {landing.visibleDirectories.length === 0 && (
                            <View {...elementProps(`landing-empty-state`)} style={styles.emptyState}>
                                <Icon id={`landing-empty-icon`} className={`landing-empty-icon`} name={landing.topic === `Saved` ? `bookmark` : `search`} color={palette.blue} size={28} />
                                <Text {...elementProps(`landing-empty-title`)} style={styles.emptyTitle}>
                                    {landing.topic === `Saved` ? `Your next good find is waiting.` : `No finds here just yet.`}
                                </Text>
                                <Text {...elementProps(`landing-empty-description`)} style={styles.emptyDescription}>
                                    {landing.topic === `Saved` ? `Tap the bookmark on any directory to keep it in your collection, or clear your filters to explore more.` : `Try a different search or clear your filters to see the whole collection.`}
                                </Text>
                                <Pressable
                                    {...elementProps(`landing-empty-clear-button`)}
                                    onPress={landing.clearFilters}
                                    accessibilityRole={`button`}
                                    style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}
                                >
                                    <Icon id={`landing-empty-clear-icon`} className={`landing-empty-clear-icon`} name={`arrow-right`} color={palette.blue} size={15} />
                                    <Text {...elementProps(`landing-empty-clear-label`)} style={styles.clearButtonLabel}>
                                        {`Explore all directories`}
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>

                    <View {...elementProps(`landing-footer`)} style={styles.footer}>
                        <Text {...elementProps(`landing-footer-statement`)} style={styles.footerStatement}>
                            {`A little direction\ngoes a long way.`}
                        </Text>
                        <View {...elementProps(`landing-footer-bottom`)} style={styles.footerBottom}>
                            <View {...elementProps(`landing-footer-brand`)} style={styles.footerBrand}>
                                <BrandMark id={`landing-footer-mark`} className={`landing-footer-mark`} size={26} />
                                <Text {...elementProps(`landing-footer-brand-label`)} style={styles.footerBrandLabel}>
                                    {`Directory Directory`}
                                </Text>
                            </View>
                            <Text {...elementProps(`landing-footer-copyright`)} style={styles.copyright}>
                                {`© ${year ?? `—`} Directory Directory`}
                            </Text>
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
                                    <Text
                                        {...elementProps(`landing-footer-piratechs-label`)}
                                        style={styles.footerLinkLabel}
                                    >
                                        {`Piratechs`}
                                    </Text>
                                    <Icon
                                        id={`landing-footer-piratechs-icon`}
                                        className={`landing-footer-piratechs-icon`}
                                        name={`arrow-up-right`}
                                        color={palette.blue}
                                        size={14}
                                    />
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>

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
                                <View
                                    {...elementProps(`landing-modal-monogram`, selected.id)}
                                    style={[styles.directoryMonogram, { backgroundColor: selectedAccent.background }]}
                                >
                                    <Text
                                        {...elementProps(`landing-modal-initials`, selected.id)}
                                        style={[styles.directoryInitials, { color: selectedAccent.color }]}
                                    >
                                        {selected.initials}
                                    </Text>
                                </View>
                                <Pressable
                                    {...elementProps(`landing-modal-close`, selected.id)}
                                    onPress={landing.closeDirectory}
                                    accessibilityRole={`button`}
                                    accessibilityLabel={`Close directory preview`}
                                    style={({ pressed }) => [styles.bookmarkButton, pressed && styles.pressed]}
                                >
                                    <Icon id={`landing-modal-close-icon`} className={`landing-modal-close-icon`} name={`close`} color={palette.ink} size={22} />
                                </Pressable>
                            </View>
                            <Text {...elementProps(`landing-modal-title`, selected.id)} accessibilityRole={`header`} style={styles.modalTitle}>
                                {selected.name}
                            </Text>
                            <Text {...elementProps(`landing-modal-description`, selected.id)} style={styles.modalDescription}>
                                {selected.summary}
                            </Text>
                            <Text {...elementProps(`landing-modal-category`, selected.id)} style={styles.directoryLabel}>
                                {selected.label}
                            </Text>
                            <Text {...elementProps(`landing-modal-sample-notice`, selected.id)} style={styles.sampleNotice}>
                                {`This is a sample listing for the Directory Directory collection. Explore the front-end preview and save your favorites on this device.`}
                            </Text>
                            <Pressable
                                {...elementProps(`landing-modal-save`, selected.id)}
                                onPress={() => landing.toggleSaved(selected.id)}
                                accessibilityRole={`button`}
                                accessibilityState={{ selected: selectedIsSaved }}
                                style={({ pressed }) => [styles.modalSaveButton, pressed && styles.pressed]}
                            >
                                <Icon id={`landing-modal-save-icon`} className={`landing-modal-save-icon`} name={selectedIsSaved ? `check` : `bookmark`} color={palette.white} size={18} />
                                <Text {...elementProps(`landing-modal-save-label`, selected.id)} style={styles.searchButtonLabel}>
                                    {selectedIsSaved ? `Saved to your collection` : `Save to your collection`}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}
