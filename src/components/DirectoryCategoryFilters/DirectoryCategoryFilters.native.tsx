import Icon from '../Icon/Icon';
import { Pressable, Text, View } from 'react-native';
import { elementProps } from '../../shared/ui/elementProps';
import { useBlogPresentation } from '../BlogLayout/useBlogPresentation.native';
import { useNativeDirectoryCategoryFilters } from './useNativeDirectoryCategoryFilters';

export default function DirectoryCategoryFilters() {
    const { styles: common } = useBlogPresentation();
    const { rows, colors, styles, accents, category, changeCategory, setContainerWidth } = useNativeDirectoryCategoryFilters();

    return (
        <View
            {...elementProps(`directory-category-filters`)}
            style={styles.filters}
            accessibilityLabel={`Filter directories by category`}
            onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
        >
            {rows.map((row, index) => (
                <View
                    {...elementProps(`directory-category-filter-row`, `${index}`)}
                    key={index}
                    style={styles.row}
                >
                    {row.map((item) => {
                        const id = item.id ?? `all`;
                        const active = category === item.id;
                        const accent = accents[item.accent];

                        return (
                            <Pressable
                                {...elementProps(`directory-category-filter`, id)}
                                key={id}
                                onPress={() => changeCategory(item.id)}
                                accessibilityRole={`tab`}
                                accessibilityLabel={item.id ? `Filter by ${item.label}` : `All categories`}
                                accessibilityState={{ selected: active }}
                                style={({ pressed }) => [
                                    styles.button,
                                    {
                                        borderColor: active ? accent.color : `${accent.color}33`,
                                        borderTopColor: accent.color,
                                        backgroundColor: `${accent.color}${active ? `22` : `0d`}`,
                                    },
                                    pressed && styles.pressed,
                                ]}
                            >
                                <View
                                    {...elementProps(`directory-category-filter-tab`, id)}
                                    pointerEvents={`none`}
                                    style={[styles.tab, { backgroundColor: accent.color }]}
                                />
                                <Icon
                                    size={14}
                                    name={item.icon}
                                    color={accent.color}
                                    className={`directory-category-filter-icon`}
                                    id={`directory-category-filter-icon-${id}`}
                                />
                                <Text
                                    {...elementProps(`directory-category-filter-label`, id)}
                                    numberOfLines={1}
                                    style={[common.actionLabel, styles.label, { color: active ? accent.color : colors.ink }]}
                                >
                                    {item.label}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            ))}
        </View>
    );
}
