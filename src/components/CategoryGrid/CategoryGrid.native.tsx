import Icon from '../Icon/Icon';
import { elementProps } from '../../shared/ui/elementProps';
import { useSearchAccent } from '../../shared/landing/useSearchAccent';
import type { LandingPageModel } from '../LandingPage/LandingPage.native.types';
import { Animated, Pressable, Text, View, type LayoutChangeEvent } from 'react-native';

type CategoryGridProps = {
    model: LandingPageModel;
    onLayout?: (event: LayoutChangeEvent) => void;
};

export default function CategoryGrid({ model, onLayout }: CategoryGridProps) {
    const accent = useSearchAccent();
    const {
        wide,
        styles,
        colors,
        landing,
        categoryItems,
        categoryWidth,
        selectCategory,
        setCategoriesLayout,
        categoryStickyStyle,
        setCategoriesControlsLayout,
    } = model;

    return (
        <View
            {...elementProps(`landing-categories-section`)}
            style={styles.categorySection}
            onLayout={(event) => {
                const { y, height } = event.nativeEvent.layout;
                setCategoriesLayout(y, height);
                onLayout?.(event);
            }}
        >
            <Animated.View
                {...elementProps(`landing-categories-heading`)}
                style={[styles.sectionHeader, styles.categoryStickyHeading, categoryStickyStyle]}
                onLayout={(event) => {
                    const { y, height } = event.nativeEvent.layout;
                    setCategoriesControlsLayout(y, height);
                }}
            >
                <View {...elementProps(`landing-categories-heading-label`)} style={styles.categoryHeading}>
                    <Icon
                        size={28}
                        name={`grid`}
                        color={accent.color}
                        id={`landing-categories-heading-icon`}
                        className={`landing-categories-heading-icon`}
                    />
                    <Text {...elementProps(`landing-categories-title`)} accessibilityRole={`header`} style={styles.sectionTitle}>
                        {`Categories`}
                    </Text>
                </View>
                <View {...elementProps(`landing-categories-heading-count-row`)} style={styles.categoryHeadingCountRow}>
                    <Text
                        accessible={false}
                        accessibilityElementsHidden
                        importantForAccessibility={`no-hide-descendants`}
                        {...elementProps(`landing-categories-heading-count-prefix`)}
                        style={[styles.categoryHeadingCountPrefix, { color: accent.color }]}
                    >
                        {`#`}
                    </Text>
                    <Text
                        style={styles.categoryHeadingCount}
                        {...elementProps(`landing-categories-heading-count`)}
                        accessibilityLabel={`${categoryItems.length} ${categoryItems.length === 1 ? `category` : `categories`}`}
                    >
                        {categoryItems.length}
                    </Text>
                </View>
            </Animated.View>
            <View {...elementProps(`landing-categories`)} style={styles.categories}>
                {categoryItems.map((item) => (
                    <View
                        key={item.id}
                        style={{ width: categoryWidth }}
                        {...elementProps(`landing-category-card`, item.id)}
                    >
                        <Pressable
                            {...elementProps(`landing-category`, item.id)}
                            onPress={() => selectCategory(item.id)}
                            accessibilityRole={`button`}
                            accessibilityState={{ selected: item.active }}
                            accessibilityLabel={`${item.label}, ${item.count} directories`}
                            style={({ pressed }) => [
                                styles.category,
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
                            <View {...elementProps(`landing-category-title-row`, item.id)} style={styles.categoryTitleRow}>
                                <Text {...elementProps(`landing-category-label`, item.id)} style={[styles.categoryLabel, styles.categoryTitleLabel]}>
                                    {item.label}
                                </Text>
                                <Icon
                                    size={14}
                                    name={`arrow-up-right`}
                                    color={item.accent.color}
                                    className={`landing-category-arrow`}
                                    id={`landing-category-arrow-${item.id}`}
                                />
                            </View>
                            <Text {...elementProps(`landing-category-description`, item.id)} style={styles.categoryDescription}>
                                {item.description}
                            </Text>
                            <View {...elementProps(`landing-category-topics`, item.id)} style={styles.categoryTopics}>
                                {item.topics.slice(0, 3).map((topic, index) => (
                                    <Text
                                        {...elementProps(`landing-category-topic`, `${item.id}-${index}`)}
                                        key={topic}
                                        numberOfLines={1}
                                        ellipsizeMode={`tail`}
                                        style={styles.categoryTopic}
                                        accessibilityLabel={`#${topic}`}
                                    >
                                        {`#${topic}`}
                                    </Text>
                                ))}
                                {item.topics.length > 3 && (
                                    <Text
                                        {...elementProps(`landing-category-more-topics`, item.id)}
                                        numberOfLines={1}
                                        style={[styles.categoryTopic, styles.categoryMoreTopics]}
                                    >
                                        {`+${item.topics.length - 3}`}
                                    </Text>
                                )}
                            </View>
                            <Text {...elementProps(`landing-category-count`, item.id)} style={styles.categoryCount}>
                                {`${item.count} directories`}
                            </Text>
                        </Pressable>
                        <Pressable
                            accessibilityRole={`button`}
                            accessibilityLabel={`Follow ${item.label}`}
                            hitSlop={{ top: 6, left: 6, right: 6, bottom: 6 }}
                            {...elementProps(`landing-category-follow-button`, item.id)}
                            style={({ pressed }) => [
                                styles.categoryFollowButton,
                                wide ? styles.categoryFollowButtonWide : styles.categoryFollowButtonMobile,
                                { backgroundColor: item.accent.background },
                                pressed && styles.pressed,
                            ]}
                        >
                            <Icon
                                size={16}
                                name={`plus`}
                                color={item.accent.color}
                                className={`landing-category-follow-icon`}
                                id={`landing-category-follow-icon-${item.id}`}
                            />
                        </Pressable>
                    </View>
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
                        color={colors.blue}
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
                            color={colors.blue}
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
    );
}
