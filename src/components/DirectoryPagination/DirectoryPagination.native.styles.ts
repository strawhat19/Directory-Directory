import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';

export const createDirectoryPaginationStyles = (palette: ReturnType<typeof getNativePalette>) => StyleSheet.create({
    pagination: {
        gap: 12,
        width: `100%`,
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        flexWrap: `wrap`,
        flexDirection: `row`,
        alignItems: `center`,
        borderColor: palette.border,
        justifyContent: `space-between`,
    },
    summary: {
        fontSize: 12,
        color: palette.muted,
        fontWeight: `500`,
    },
    controls: {
        gap: 7,
        minWidth: 0,
        flexShrink: 1,
        flexWrap: `wrap`,
        marginLeft: `auto`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-end`,
    },
    button: {
        minWidth: 40,
        minHeight: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: `center`,
        justifyContent: `center`,
        borderColor: palette.border,
        backgroundColor: palette.surface,
    },
    activeButton: {
        borderColor: palette.blue,
        backgroundColor: palette.blueSoft,
    },
    label: {
        fontSize: 12,
        color: palette.ink,
        fontWeight: `600`,
    },
    activeLabel: {
        color: palette.blue,
    },
    previousIcon: {
        transform: [{ rotate: `180deg` }],
    },
    disabled: {
        opacity: 0.4,
    },
    pressed: {
        opacity: 0.7,
    },
});
