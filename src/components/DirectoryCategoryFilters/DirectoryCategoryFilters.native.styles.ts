import { StyleSheet } from 'react-native';

export function createDirectoryCategoryFilterStyles() {
    return StyleSheet.create({
        filters: {
            gap: 10,
            width: `100%`,
            paddingTop: 4,
            marginBottom: 12,
        },
        row: {
            gap: 8,
            width: `100%`,
            flexDirection: `row`,
        },
        button: {
            gap: 7,
            flex: 1,
            minWidth: 0,
            minHeight: 40,
            borderWidth: 1,
            borderRadius: 8,
            borderTopWidth: 2,
            position: `relative`,
            paddingHorizontal: 10,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
        },
        tab: {
            top: -5,
            left: 11,
            width: 22,
            height: 4,
            position: `absolute`,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
        },
        label: {
            minWidth: 0,
            fontSize: 11,
            flexShrink: 1,
            lineHeight: 16,
            fontWeight: `600`,
        },
        pressed: {
            opacity: 0.7,
        },
    });
}
