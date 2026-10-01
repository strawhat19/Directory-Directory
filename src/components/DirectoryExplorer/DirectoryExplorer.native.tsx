import Icon from '../Icon/Icon';
import { elementProps } from '../../shared/ui/elementProps';
import DirectoryFeedback from '../DirectoryFeedback/DirectoryFeedback';
import type { LandingPageModel } from '../LandingPage/LandingPage.native.types';
import DirectoryPagination from '../DirectoryPagination/DirectoryPagination.native';
import { Alert, Animated, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import DirectoryCategoryFilters from '../DirectoryCategoryFilters/DirectoryCategoryFilters';

export default function DirectoryExplorer({ model }: { model: LandingPageModel }) {
    const {
        styles,
        colors,
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
        searchThemeStyle,
        setExploreLayout,
        exploreStickyStyle,
        setExploreGridOffset,
        selectDirectoryTopic,
        setExploreControlsLayout,
    } = model;
    const visitDirectory = (href: string) => {
        void Linking.openURL(href).catch(() => Alert.alert(`Unable To Open Website`, `Please Try Again`));
    };

    return (
        <View
            {...elementProps(`landing-explore`)}
            style={styles.explore}
            onLayout={(event) => {
                const { y, height } = event.nativeEvent.layout;
                setExploreLayout(y, height);
            }}
        >
            <Animated.View
                {...elementProps(`landing-explore-sticky-controls`)}
                style={[styles.exploreStickyControls, exploreStickyStyle]}
                onLayout={(event) => {
                    const { y, height } = event.nativeEvent.layout;
                    setExploreControlsLayout(y, height);
                }}
            >
                <View {...elementProps(`landing-explore-heading`)} style={styles.sectionHeader}>
                    <View
                        {...elementProps(`landing-explore-title-group`)}
                        style={styles.exploreTitleGroup}
                    >
                        <Animated.View
                            {...elementProps(`landing-explore-title-accent`)}
                            style={[styles.exploreTitleAccent, searchThemeStyle]}
                        >
                            <Icon
                                size={17}
                                name={`grid`}
                                color={colors.white}
                                id={`landing-explore-title-icon`}
                                className={`landing-explore-title-icon`}
                            />
                    </Animated.View>
                    <Text
                        {...elementProps(`landing-explore-title`)}
                        accessibilityRole={`header`}
                        style={[styles.sectionTitle, styles.exploreTitle]}
                    >
                        {`Explore Directories`}
                    </Text>
                </View>
                <Text {...elementProps(`landing-explore-count`)} style={styles.exploreCaption}>
                    {`${landing.visibleDirectories.length} directories`}
                </Text>
            </View>

            <DirectoryCategoryFilters />

            <View {...elementProps(`landing-explore-controls`)} style={styles.exploreControls}>
                <ScrollView
                    {...elementProps(`landing-topic-tabs`)}
                    horizontal
                    style={styles.topicTabsScroll}
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
                                item.active && styles.topicTabActive,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Icon
                                id={`landing-topic-tab-icon-${item.id}`}
                                className={`landing-topic-tab-icon`}
                                name={item.icon}
                                size={13}
                                color={item.active ? colors.white : colors.muted}
                            />
                            <Text
                                {...elementProps(`landing-topic-tab-label`, item.id)}
                                style={[styles.topicTabLabel, item.active && styles.topicTabLabelActive]}
                            >
                                {item.topic}
                            </Text>
                        </Pressable>
                    ))}
                    {statusItems.map((item) => (
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
                                item.active && styles.topicTabActive,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Icon
                                size={13}
                                name={item.icon}
                                className={`landing-status-filter-icon`}
                                id={`landing-status-filter-icon-${item.id}`}
                                color={item.active ? colors.white : item.color}
                            />
                            <Text
                                {...elementProps(`landing-status-filter-label`, item.id)}
                                style={[styles.topicTabLabel, item.active && styles.topicTabLabelActive]}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
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
            </View>
            </Animated.View>

            <View
                {...elementProps(`landing-directory-grid`)}
                style={styles.directoryGrid}
                onLayout={(event) => setExploreGridOffset(event.nativeEvent.layout.y)}
            >
                {directoryItems.map((directory) => (
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
                                        <Icon id={`landing-directory-featured-icon-${directory.id}`} className={`landing-directory-featured-icon`} name={`sparkles`} color={colors.muted} size={11} />
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
                                <Icon id={`landing-directory-preview-arrow-${directory.id}`} className={`landing-directory-preview-arrow`} name={`arrow-up-right`} color={colors.muted} size={16} />
                            </View>
                            <Text {...elementProps(`landing-directory-description`, directory.id)} style={styles.directoryDescription}>
                                {directory.summary}
                            </Text>
                        </Pressable>
                        <View {...elementProps(`landing-directory-metadata`, directory.id)} style={styles.directoryMetadata}>
                            <View {...elementProps(`landing-directory-statuses`, directory.id)} style={styles.directoryStatuses}>
                                {directory.statusItems.map((item) => (
                                    <View
                                        {...elementProps(`landing-directory-row-status`, `${directory.id}-${item.id}`)}
                                        key={item.id}
                                        accessibilityLabel={`${item.label}: ${item.description}`}
                                        style={styles.directoryStatus}
                                    >
                                        <View {...elementProps(`landing-directory-status-dot`, `${directory.id}-${item.id}`)} style={[styles.statusDot, { backgroundColor: item.color }]} />
                                        <Text {...elementProps(`landing-directory-status-text`, `${directory.id}-${item.id}`)} style={[styles.directoryStatusLabel, { color: item.color }]}>
                                            {item.label}
                                        </Text>
                                    </View>
                                ))}
                                </View>
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
                                <Pressable
                                    {...elementProps(`landing-directory-website`, directory.id)}
                                    onPress={() => visitDirectory(directory.href)}
                                    accessibilityRole={`link`}
                                    accessibilityLabel={`Visit ${directory.name} Website`}
                                    style={({ pressed }) => [styles.directoryWebsite, pressed && styles.pressed]}
                                >
                                    <Text {...elementProps(`landing-directory-website-label`, directory.id)} style={styles.directoryWebsiteLabel}>
                                        {`Visit Website`}
                                    </Text>
                                    <Icon id={`landing-directory-website-icon-${directory.id}`} className={`landing-directory-website-icon`} name={`arrow-up-right`} size={13} color={colors.blue} />
                                </Pressable>
                            </View>
                            <View {...elementProps(`landing-directory-feedback`, directory.id)} style={styles.directoryFeedback}>
                                <DirectoryFeedback directoryId={directory.id} directoryName={directory.name} />
                            </View>
                            <View {...elementProps(`landing-directory-footer`, directory.id)} style={styles.directoryFooter}>
                                <Text {...elementProps(`landing-directory-category`, directory.id)} style={styles.directoryLabel}>
                                    {directory.label}
                                </Text>
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
                ))}
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
