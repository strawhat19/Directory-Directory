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
    paginationCompact: {
        flexDirection: `column`,
        justifyContent: `center`,
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
        marginLeft: `auto`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-end`,
    },
    controlsCompact: {
        gap: 3,
        padding: 4,
        marginLeft: 0,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: palette.border,
        justifyContent: `center`,
        backgroundColor: palette.surface,
    },
    button: {
        minWidth: 44,
        minHeight: 44,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: `center`,
        justifyContent: `center`,
        borderColor: palette.border,
        backgroundColor: palette.surface,
    },
    buttonCompact: {
        borderWidth: 0,
        backgroundColor: `transparent`,
    },
    activeButton: {
        borderColor: palette.blue,
        backgroundColor: palette.blueSoft,
    },
    activeButtonCompact: {
        backgroundColor: palette.blue,
    },
    ellipsis: {
        width: 12,
        fontSize: 12,
        lineHeight: 44,
        textAlign: `center`,
        color: palette.muted,
    },
    label: {
        fontSize: 12,
        color: palette.ink,
        fontWeight: `600`,
    },
    activeLabel: {
        color: palette.blue,
    },
    activeLabelCompact: {
        color: `#ffffff`,
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
