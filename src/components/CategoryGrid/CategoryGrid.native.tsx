import Icon from '../Icon/Icon';
import { elementProps } from '../../shared/ui/elementProps';
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native';
import type { LandingPageModel } from '../LandingPage/LandingPage.native.types';

type CategoryGridProps = {
    model: LandingPageModel;
    onLayout?: (event: LayoutChangeEvent) => void;
};

export default function CategoryGrid({ model, onLayout }: CategoryGridProps) {
    const {
        styles,
        colors,
        landing,
        categoryItems,
        categoryWidth,
        selectCategory,
    } = model;

    return (
        <View
            {...elementProps(`landing-categories-section`)}
            style={styles.categorySection}
            onLayout={onLayout}
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
