import Icon from '../Icon/Icon';
import { useState } from 'react';
import { elementProps } from '../../shared/ui/elementProps';
import { categories } from '../../shared/catalog/catalog';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import DirectoryFeedback from '../DirectoryFeedback/DirectoryFeedback';
import type { LandingPageModel } from '../LandingPage/LandingPage.native.types';
import DirectoryPagination from '../DirectoryPagination/DirectoryPagination.native';
import DirectoryCardPreview from '../DirectoryCardPreview/DirectoryCardPreview.native';
import DirectoryCategoryFilters from '../DirectoryCategoryFilters/DirectoryCategoryFilters';
import { getDirectoryDomain, getDirectoryDescription } from '../../shared/catalog/directoryDetails';
import { Alert, Animated, Linking, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function DirectoryExplorer({ model, joined = false }: { model: LandingPageModel; joined?: boolean }) {
    const accent = useSearchAccent();
    const mobile = !model.wide;
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterMenuTop, setFilterMenuTop] = useState(0);
    const {
        styles,
        colors,
        isDark,
        landing,
        cardWidth,
        viewItems,
        topicItems,
        statusItems,
        currentPage,
        totalPages,
        pageNumbers,
        selectPage,
        directoryItems,
        setExploreLayout,
        exploreStickyStyle,
        explorePinnedBackgroundStyle,
        setExploreGridOffset,
        selectDirectoryTopic,
        setExploreControlsLayout,
    } = model;
    const activeFilterCount = [
        Boolean(landing.status),
        Boolean(landing.category),
        landing.topic !== `All`,
        Boolean(landing.directoryTopic),
        Boolean(landing.query.trim() || landing.searchDirectoryIds.length),
    ].filter(Boolean).length;
    const visitDirectory = (href: string) => {
        void Linking.openURL(href).catch(() => Alert.alert(`Unable To Open Website`, `Please Try Again`));
    };

    const directoryCount = (
        <View {...elementProps(`landing-explore-count-row`)} style={styles.exploreCountRow}>
            <Text
                accessible={false}
                accessibilityElementsHidden
                importantForAccessibility={`no-hide-descendants`}
                {...elementProps(`landing-explore-count-prefix`)}
                style={[styles.exploreCountPrefix, { color: accent.color }]}
            >
                {`#`}
            </Text>
            <Text
                style={styles.exploreCaption}
                {...elementProps(`landing-explore-count`)}
                accessibilityLabel={`${landing.visibleDirectories.length} ${landing.visibleDirectories.length === 1 ? `directory` : `directories`}`}
            >
                {landing.visibleDirectories.length}
            </Text>
        </View>
    );
    const directoryHeading = (
        <View {...elementProps(`landing-explore-heading`)} style={[styles.sectionHeader, mobile && styles.exploreHeadingMobile]}>
            <View
                {...elementProps(`landing-explore-title-group`)}
                style={styles.exploreTitleGroup}
            >
                <Icon
                    filled
                    size={28}
                    name={`folder`}
                    color={accent.color}
                    id={`landing-explore-title-icon`}
                    className={`landing-explore-title-icon`}
                />
                <Text
                    {...elementProps(`landing-explore-title`)}
                    accessibilityRole={`header`}
                    style={[styles.sectionTitle, styles.exploreTitle]}
                >
                    {`Directories`}
                </Text>
            </View>
            {directoryCount}
        </View>
    );
    const statusFilters = (
        <ScrollView
            {...elementProps(`landing-topic-tabs`)}
            horizontal
            keyboardShouldPersistTaps={`handled`}
            style={[styles.topicTabsScroll, mobile && styles.exploreMenuScroll]}
            contentContainerStyle={styles.topicTabs}
            showsHorizontalScrollIndicator={false}
        >
            {topicItems.map((item) => (
                <Pressable
                    {...elementProps(`landing-topic-tab`, item.id)}
                    key={item.topic}
                    onPress={() => {
                        landing.setStatus(null);
                        landing.setTopic(item.topic);
                    }}
                    accessibilityRole={`tab`}
                    accessibilityState={{ selected: item.active }}
                    style={({ pressed }) => [
                        styles.topicTab,
                        {
                            borderTopColor: colors.ink,
                            borderColor: item.active ? colors.ink : `${colors.ink}33`,
                            backgroundColor: `${colors.ink}${item.active ? `22` : `0d`}`,
                        },
                        pressed && styles.topicTabPressed,
                    ]}
                >
                    <View
                        pointerEvents={`none`}
                        {...elementProps(`landing-topic-tab-folder-tab`, item.id)}
                        style={[styles.topicTabFolderTab, { backgroundColor: colors.ink }]}
                    />
                    <Icon
                        id={`landing-topic-tab-icon-${item.id}`}
                        className={`landing-topic-tab-icon`}
                        name={item.icon}
                        size={14}
                        color={colors.ink}
                    />
                    <Text
                        numberOfLines={1}
                        {...elementProps(`landing-topic-tab-label`, item.id)}
                        style={[styles.topicTabLabel, { color: colors.ink }]}
                    >
                        {item.topic}
                    </Text>
                </Pressable>
            ))}
            {statusItems.map((item) => {
                const statusColor = item.tone === `gray` ? colors.ink : item.color;

                return (
                    <Pressable
                        {...elementProps(`landing-status-filter`, item.id)}
                        key={item.id}
                        onPress={() => {
                            landing.setTopic(`All`);
                            landing.setStatus(item.active ? null : item.id);
                        }}
                        accessibilityRole={`tab`}
                        accessibilityLabel={`${item.label}: ${item.description}`}
                        accessibilityState={{ selected: item.active }}
                        style={({ pressed }) => [
                            styles.topicTab,
                            {
                                borderTopColor: statusColor,
                                borderColor: item.active ? statusColor : `${statusColor}33`,
                                backgroundColor: `${statusColor}${item.active ? `22` : `0d`}`,
                            },
                            pressed && styles.topicTabPressed,
                        ]}
                    >
                        <View
                            pointerEvents={`none`}
                            {...elementProps(`landing-status-filter-tab`, item.id)}
                            style={[styles.topicTabFolderTab, { backgroundColor: statusColor }]}
                        />
                        <Icon
                            size={14}
                            name={item.icon}
                            color={statusColor}
                            className={`landing-status-filter-icon`}
                            id={`landing-status-filter-icon-${item.id}`}
                        />
                        <Text
                            numberOfLines={1}
                            {...elementProps(`landing-status-filter-label`, item.id)}
                            style={[styles.topicTabLabel, { color: item.active ? statusColor : colors.ink }]}
                        >
                            {item.label}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
    const viewControls = (
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
                        color={item.active ? colors.ink : colors.muted}
                    />
                </Pressable>
            ))}
        </View>
    );

    return (
        <View
            {...elementProps(`landing-explore`)}
            style={[styles.explore, mobile && styles.exploreMobile, joined && { borderTopWidth: 0 }]}
            onLayout={(event) => {
                const { y, height } = event.nativeEvent.layout;
                setExploreLayout(y, height);
            }}
        >
            {mobile && directoryHeading}
            <Animated.View
                {...elementProps(`landing-explore-sticky-controls`)}
                style={[styles.exploreStickyControls, exploreStickyStyle, explorePinnedBackgroundStyle]}
                onLayout={(event) => {
                    const { y, height } = event.nativeEvent.layout;
                    setExploreControlsLayout(y, height);
                    if (mobile) setFilterMenuTop(y + height + 4);
                }}
            >
                {!mobile && directoryHeading}

                {mobile && (
                    <View {...elementProps(`landing-explore-mobile-toolbar`)} style={styles.exploreMobileToolbar}>
                        <View {...elementProps(`landing-explore-search`)} style={styles.exploreSearch}>
                            <Icon
                                size={14}
                                name={`search`}
                                color={accent.color}
                                id={`landing-explore-search-icon`}
                                className={`landing-explore-search-icon`}
                            />
                            <TextInput
                                autoCorrect={false}
                                value={landing.query}
                                autoCapitalize={`none`}
                                returnKeyType={`search`}
                                style={styles.exploreSearchInput}
                                placeholder={`Search ${landing.visibleDirectories.length} Directories`}
                                onChangeText={landing.setQuery}
                                placeholderTextColor={colors.muted}
                                {...elementProps(`landing-explore-search-input`)}
                                accessibilityLabel={`Search Directories`}
                            />
                        </View>
                        <Pressable
                            accessibilityRole={`button`}
                            hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }}
                            {...elementProps(`landing-explore-filter-button`)}
                            accessibilityState={{ expanded: filtersOpen }}
                            onPress={() => setFiltersOpen((current) => !current)}
                            accessibilityLabel={`${filtersOpen ? `Close Filters` : `Open Filters`}, ${activeFilterCount} Active Filter${activeFilterCount === 1 ? `` : `s`}`}
                            style={({ pressed }) => [
                                styles.headerUtilityButton,
                                styles.headerNotificationButton,
                                styles.exploreFilterToggle,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Icon
                                size={17}
                                name={`filter`}
                                color={isDark ? colors.white : accent.color}
                                id={`landing-explore-filter-icon`}
                                className={`landing-explore-filter-icon`}
                            />
                            {activeFilterCount > 0 && (
                                <View
                                    pointerEvents={`none`}
                                    accessibilityElementsHidden
                                    style={styles.headerNotificationBadge}
                                    importantForAccessibility={`no-hide-descendants`}
                                    {...elementProps(`landing-explore-filter-badge`)}
                                >
                                    <Text
                                        style={styles.headerNotificationBadgeLabel}
                                        {...elementProps(`landing-explore-filter-badge-label`)}
                                    >
                                        {activeFilterCount}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                )}
                {!mobile && (
                    <>
                        <DirectoryCategoryFilters />
                        <View {...elementProps(`landing-explore-controls`)} style={styles.exploreControls}>
                            {statusFilters}
                            {viewControls}
                        </View>
                    </>
                )}
            </Animated.View>

            {mobile && filtersOpen && (
                <Animated.View
                    {...elementProps(`landing-explore-filter-menu`)}
                    style={[styles.exploreFilterMenu, exploreStickyStyle, { top: filterMenuTop }]}
                >
                    <View {...elementProps(`landing-explore-status-group`)} style={styles.exploreFilterGroup}>
                        <View {...elementProps(`landing-explore-status-heading`)} style={styles.exploreFilterGroupHeading}>
                            <Text
                                accessibilityRole={`header`}
                                style={styles.exploreFilterLabel}
                                {...elementProps(`landing-explore-status-label`)}
                            >
                                {`Status`}
                            </Text>
                            <View {...elementProps(`landing-explore-filter-menu-actions`)} style={styles.exploreFilterMenuActions}>
                                {viewControls}
                                <Pressable
                                    accessibilityRole={`button`}
                                    onPress={() => setFiltersOpen(false)}
                                    accessibilityLabel={`Close Filters`}
                                    hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }}
                                    {...elementProps(`landing-explore-filter-close`)}
                                    style={({ pressed }) => [styles.exploreFilterButton, pressed && styles.pressed]}
                                >
                                    <Icon
                                        size={15}
                                        name={`close`}
                                        color={colors.ink}
                                        id={`landing-explore-filter-close-icon`}
                                        className={`landing-explore-filter-close-icon`}
                                    />
                                </Pressable>
                            </View>
                        </View>
                        {statusFilters}
                    </View>
                    <View {...elementProps(`landing-explore-category-group`)} style={styles.exploreFilterGroup}>
                        <Text
                            accessibilityRole={`header`}
                            style={styles.exploreFilterLabel}
                            {...elementProps(`landing-explore-category-label`)}
                        >
                            {`Categories`}
                        </Text>
                        <DirectoryCategoryFilters horizontal />
                    </View>
                </Animated.View>
            )}

            <View
                {...elementProps(`landing-directory-grid`)}
                style={[styles.directoryGrid, mobile && styles.directoryGridMobile]}
                onLayout={(event) => setExploreGridOffset(event.nativeEvent.layout.y)}
            >
                {directoryItems.map((directory) => {
                    const domain = getDirectoryDomain(directory.href);
                    const category = categories.find((item) => item.id === directory.category);

                    return (
                    <View
                        {...elementProps(`landing-directory-card`, directory.id)}
                        key={directory.id}
                        style={[styles.directoryCard, { width: cardWidth, borderTopColor: directory.accentStyle.color }]}
                    >
                        <View
                            {...elementProps(`landing-directory-folder-tab`, directory.id)}
                            pointerEvents={`none`}
                            style={[styles.directoryFolderTab, { backgroundColor: directory.accentStyle.color }]}
                        />
                        <Pressable
                            {...elementProps(`landing-directory-preview`, directory.id)}
                            onPress={() => landing.openDirectory(directory)}
                            accessibilityRole={`button`}
                            accessibilityLabel={`Details For ${directory.name}`}
                            style={({ pressed }) => [styles.directoryPreview, pressed && styles.pressed]}
                        >
                            <View {...elementProps(`landing-directory-card-header`, directory.id)} style={styles.directoryCardHeader}>
                                <DirectoryCardPreview
                                    directory={directory}
                                    color={directory.accentStyle.color}
                                    fontFamily={styles.directoryInitials.fontFamily}
                                    backgroundColor={directory.accentStyle.background}
                                />
                                {directory.featured && (
                                    <View {...elementProps(`landing-directory-featured`, directory.id)} style={styles.featuredBadge}>
                                        <Icon id={`landing-directory-featured-icon-${directory.id}`} className={`landing-directory-featured-icon`} name={`sparkles`} color={directory.accentStyle.color} size={11} />
                                        <Text {...elementProps(`landing-directory-featured-label`, directory.id)} style={styles.featuredBadgeLabel}>
                                            {`Featured`}
                                        </Text>
                                    </View>
                                )}
                            </View>
                            <View {...elementProps(`landing-directory-title-row`, directory.id)} style={styles.directoryTitleRow}>
                                <Text {...elementProps(`landing-directory-title`, directory.id)} style={styles.directoryTitle}>
                                    {domain.name}
                                    <Text {...elementProps(`landing-directory-domain-extension`, directory.id)} style={{ color: directory.accentStyle.color }}>{domain.extension}</Text>
                                </Text>
                                <Icon id={`landing-directory-preview-arrow-${directory.id}`} className={`landing-directory-preview-arrow`} name={`arrow-up-right`} color={directory.accentStyle.color} size={16} />
                            </View>
                            <View
                                pointerEvents={`none`}
                                {...elementProps(`landing-directory-title-divider`, directory.id)}
                                style={[styles.directoryTitleDivider, { backgroundColor: directory.accentStyle.color }]}
                            />
                            <Text {...elementProps(`landing-directory-description`, directory.id)} style={styles.directoryDescription}>
                                {getDirectoryDescription(directory)}
                            </Text>
                        </Pressable>
                        <View {...elementProps(`landing-directory-metadata`, directory.id)} style={styles.directoryMetadata}>
                                <View {...elementProps(`landing-directory-topics`, directory.id)} style={styles.directoryTopics}>
                                    {directory.topics.map((topic, index) => (
                                        <Pressable
                                            {...elementProps(`landing-directory-topic`, `${directory.id}-${index}`)}
                                            key={topic}
                                            onPress={() => selectDirectoryTopic(directory.category, topic)}
                                            accessibilityRole={`button`}
                                            accessibilityLabel={`Filter By ${topic}`}
                                            accessibilityState={{ selected: landing.category === directory.category && landing.directoryTopic === topic }}
                                            style={({ pressed }) => [styles.directoryTopic, pressed && styles.pressed]}
                                        >
                                            <Text {...elementProps(`landing-directory-topic-label`, `${directory.id}-${index}`)} style={styles.directoryTopicLabel}>
                                                {`#${topic}`}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                                <View {...elementProps(`landing-directory-status-row`, directory.id)} style={styles.directoryStatusRow}>
                                <View {...elementProps(`landing-directory-statuses`, directory.id)} style={styles.directoryStatuses}>
                                    {directory.statusItems.map((item) => (
                                        <View
                                            key={item.id}
                                            style={styles.directoryStatus}
                                            accessibilityLabel={`${item.label}: ${item.description}`}
                                            {...elementProps(`landing-directory-row-status`, `${directory.id}-${item.id}`)}
                                        >
                                            <Icon size={11} name={item.icon} color={item.color} id={`landing-directory-status-icon-${directory.id}-${item.id}`} className={`landing-directory-status-icon`} />
                                            <Text {...elementProps(`landing-directory-status-text`, `${directory.id}-${item.id}`)} style={[styles.directoryStatusLabel, { color: colors.ink }]}>{item.label}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View {...elementProps(`landing-directory-category`, directory.id)} style={[styles.directoryStatus, styles.directoryCategory]}>
                                    {category && <Icon size={11} name={category.icon} color={directory.accentStyle.color} id={`landing-directory-category-icon-${directory.id}`} className={`landing-directory-category-icon`} />}
                                    <Text {...elementProps(`landing-directory-category-label`, directory.id)} style={styles.directoryStatusLabel}>{category?.label ?? directory.category}</Text>
                                </View>
                                </View>
                                <Pressable
                                    {...elementProps(`landing-directory-website`, directory.id)}
                                    onPress={() => visitDirectory(directory.href)}
                                    accessibilityRole={`link`}
                                    accessibilityLabel={`Visit ${directory.name} Website`}
                                    style={({ pressed }) => [styles.directoryWebsite, pressed && styles.pressed]}
                                >
                                    <Text {...elementProps(`landing-directory-website-label`, directory.id)} style={[styles.directoryWebsiteLabel, { color: colors.ink }]}>
                                        {`Visit Website`}
                                    </Text>
                                    <Icon id={`landing-directory-website-icon-${directory.id}`} className={`landing-directory-website-icon`} name={`arrow-up-right`} size={13} color={directory.accentStyle.color} />
                                </Pressable>
                            </View>
                            <View {...elementProps(`landing-directory-footer`, directory.id)} style={styles.directoryFooter}>
                                <View {...elementProps(`landing-directory-feedback`, directory.id)} style={styles.directoryFeedback}>
                                    <DirectoryFeedback
                                        scope={`card`}
                                        variant={`card`}
                                        directoryId={directory.id}
                                        directoryName={directory.name}
                                        color={directory.accentStyle.color}
                                        onDetails={() => landing.openDirectory(directory)}
                                    />
                                </View>
                                <Pressable
                                    {...elementProps(`landing-directory-save`, directory.id)}
                                    disabled={!landing.feedbackReady}
                                    onPress={() => landing.toggleSaved(directory.id)}
                                    accessibilityRole={`button`}
                                    accessibilityState={{ selected: directory.saved, disabled: !landing.feedbackReady }}
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
                                        color={directory.saved ? colors.blue : colors.muted}
                                        size={18}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    );
                })}
            </View>

            <DirectoryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onPageChange={selectPage}
            />

            {landing.visibleDirectories.length === 0 && (
                <View {...elementProps(`landing-empty-state`)} style={styles.emptyState}>
                    <Icon id={`landing-empty-icon`} className={`landing-empty-icon`} name={landing.topic === `Saved` ? `bookmark` : `search`} color={colors.blue} size={28} />
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
                        <Icon id={`landing-empty-clear-icon`} className={`landing-empty-clear-icon`} name={`arrow-right`} color={colors.blue} size={15} />
                        <Text {...elementProps(`landing-empty-clear-label`)} style={styles.clearButtonLabel}>
                            {`Explore all directories`}
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}
