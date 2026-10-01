import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';

export function createCategoryGridStyles(fontsLoaded: boolean, isDark: boolean) {
    const colors = getNativePalette(isDark);
    const medium = fontsLoaded ? `Inter_500Medium` : undefined;
    const bold = fontsLoaded ? `Inter_700Bold` : undefined;
    const regular = fontsLoaded ? `Inter_400Regular` : undefined;

    return StyleSheet.create({
        categorySection: {
            marginBottom: 44,
        },
        categories: {
            gap: 12,
            flexWrap: `wrap`,
            flexDirection: `row`,
        },
        category: {
            padding: 16,
            minHeight: 167,
            borderWidth: 1,
            borderRadius: 14,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        categorySelected: {
            borderColor: colors.blue,
            backgroundColor: colors.blueSoft,
        },
        categoryIcon: {
            width: 39,
            height: 35,
            borderRadius: 9,
            marginBottom: 15,
            alignItems: `center`,
            justifyContent: `center`,
        },
        categoryLabel: {
            fontSize: 14,
            lineHeight: 20,
            fontFamily: bold,
            color: colors.ink,
        },
        categoryDescription: {
            fontSize: 11,
            lineHeight: 17,
            marginTop: 4,
            fontFamily: regular,
            color: colors.muted,
        },
        categoryCount: {
            fontSize: 10,
            marginTop: 12,
            fontFamily: medium,
            color: colors.muted,
        },
        categoryTopics: {
            gap: 5,
            minWidth: 0,
            marginTop: 10,
            flexWrap: `nowrap`,
            flexDirection: `row`,
            alignItems: `center`,
        },
        categoryTopic: {
            minWidth: 0,
            fontSize: 9,
            flexShrink: 1,
            borderRadius: 5,
            paddingVertical: 3,
            paddingHorizontal: 5,
            fontFamily: medium,
            color: colors.muted,
            backgroundColor: colors.background,
        },
        categoryMoreTopics: {
            flexShrink: 0,
        },
    });
}
