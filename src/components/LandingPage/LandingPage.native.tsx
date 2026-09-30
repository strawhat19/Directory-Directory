import { SafeAreaView } from 'react-native-safe-area-context';
import { Animated, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import Icon from '../Icon/Icon';
import BrandMark from '../BrandMark/BrandMark';
import { useLandingPage } from './useLandingPage.native';
import { palette } from './LandingPage.native.styles';
import { elementProps } from '../../shared/ui/elementProps';

export default function LandingPage() {
    const {
        wide,
        scroll,
        styles,
        landing,
        padding,
        selected,
        cardWidth,
        viewItems,
        showSaved,
        topicItems,
        artworkRows,
        categoryItems,
        categoryWidth,
        entranceStyle,
        directoryItems,
        selectedAccent,
        selectedIsSaved,
        showDirectories,
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
                ref={scroll}
                style={styles.scroll}
                keyboardShouldPersistTaps={`handled`}
                contentContainerStyle={[styles.content, { paddingHorizontal: padding }]}
            >
                <View {...elementProps(`landing-header`)} style={styles.header}>
                    <View {...elementProps(`landing-header-brand`)} style={styles.brand}>
                        <BrandMark id={`landing-header-mark`} className={`landing-header-mark`} size={43} />
                        <Text {...elementProps(`landing-header-brand-name`)} style={styles.brandName}>
                            {`Directory\nDirectory`}
                        </Text>
                    </View>
                    <Pressable
                        {...elementProps(`landing-header-saved-button`)}
                        onPress={showSaved}
                        accessibilityRole={`button`}
                        accessibilityLabel={`Show saved directories`}
                        style={({ pressed }) => [styles.savedButton, pressed && styles.pressed]}
                    >
                        <Icon id={`landing-header-saved-icon`} className={`landing-header-saved-icon`} name={`bookmark`} size={17} />
                        <Text {...elementProps(`landing-header-saved-label`)} style={styles.savedLabel}>
                            {`Saved${landing.savedIds.length ? ` (${landing.savedIds.length})` : ``}`}
                        </Text>
                    </Pressable>
                </View>

                <Animated.View
                    {...elementProps(`landing-main`)}
                    style={entranceStyle}
                >
                    <View {...elementProps(`landing-hero`)} style={[styles.hero, wide && styles.heroWide]}>
                        <View {...elementProps(`landing-hero-copy`)} style={styles.heroCopy}>
                            <Text {...elementProps(`landing-hero-eyebrow`)} style={styles.eyebrow}>
                                {`The Directory of Directories`}
                            </Text>
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
                        <View {...elementProps(`landing-search-box`)} style={styles.searchBox}>
                            <Icon id={`landing-search-icon`} className={`landing-search-icon`} name={`search`} color={palette.muted} size={20} />
                            <TextInput
                                {...elementProps(`landing-search-input`)}
                                value={landing.query}
                                returnKeyType={`search`}
                                onChangeText={landing.setQuery}
                                onSubmitEditing={showDirectories}
                                style={styles.searchInput}
                                placeholder={`What are you looking for?`}
                                placeholderTextColor={palette.muted}
                                accessibilityLabel={`Search directories`}
                            />
                            <Pressable
                                {...elementProps(`landing-search-button`)}
                                onPress={showDirectories}
                                accessibilityRole={`button`}
                                accessibilityLabel={`Show search results`}
                                style={({ pressed }) => [styles.searchButton, pressed && styles.pressed]}
                            >
                                <Icon id={`landing-search-button-icon`} className={`landing-search-button-icon`} name={`arrow-right`} color={palette.white} size={17} />
                                <Text {...elementProps(`landing-search-button-label`)} style={styles.searchButtonLabel}>
                                    {`Search`}
                                </Text>
                            </Pressable>
                        </View>
                        <Text {...elementProps(`landing-search-hint`)} style={styles.searchHint}>
                            {`A few good starting points: design, useful tools, communities, places.`}
                        </Text>
                    </View>

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
                                    onPress={() => landing.selectCategory(item.id)}
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
                                {`© ${new Date().getFullYear()}`}
                            </Text>
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
