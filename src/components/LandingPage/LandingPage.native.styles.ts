import { StyleSheet } from 'react-native';
import { createCategoryGridStyles } from '../CategoryGrid/CategoryGrid.native.styles';
import { createDirectoryExplorerStyles } from '../DirectoryExplorer/DirectoryExplorer.native.styles';
import { getNativePalette } from '../../shared/theme/nativePalette';
import type { SearchAccent } from '../../shared/landing/searchScopes';

export const palette = {
    ...getNativePalette(false),
    pink: `#cd4c8c`,
    yellow: `#b7860b`,
    orange: `#d97722`,
};

export const getLandingPalette = (isDark: boolean) => ({
    ...getNativePalette(isDark),
    pink: palette.pink,
    yellow: palette.yellow,
    orange: palette.orange,
});

export const accents = {
    ink: { color: palette.ink, background: `#eef0f5` },
    red: { color: palette.red, background: `#fff0ee` },
    blue: { color: palette.blue, background: `#edf4ff` },
    pink: { color: palette.pink, background: `#fdeef5` },
    green: { color: palette.green, background: `#edf8f1` },
    yellow: { color: palette.yellow, background: `#fff8db` },
    purple: { color: palette.purple, background: `#f3edff` },
    orange: { color: palette.orange, background: `#fff1e6` },
};

export const getLandingAccents = (isDark: boolean) => isDark
    ? { ...accents, ink: { color: getLandingPalette(true).ink, background: `#25354c` } }
    : accents;

export function createLandingStyles(fontsLoaded: boolean, isDark = false, accent?: SearchAccent) {
    const colors = getLandingPalette(isDark);
    const selectedAccent = accent ?? { color: colors.blue, background: colors.blueSoft };
    const regular = fontsLoaded ? `Inter_400Regular` : undefined;
    const medium = fontsLoaded ? `Inter_500Medium` : undefined;
    const semibold = fontsLoaded ? `Inter_600SemiBold` : undefined;
    const bold = fontsLoaded ? `Inter_700Bold` : undefined;
    const heavy = fontsLoaded ? `Inter_800ExtraBold` : undefined;

    return StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scroll: {
            flex: 1,
        },
        discoverIntro: {
            gap: 8,
            paddingTop: 24,
            marginBottom: 28,
        },
        content: {
            width: `100%`,
            maxWidth: 1344,
            paddingBottom: 32,
            alignSelf: `center`,
        },
        stickyHeader: {
            zIndex: 10,
            paddingBottom: 16,
            backgroundColor: colors.headerScrim,
        },
        header: {
            gap: 20,
            flexWrap: `wrap`,
            paddingTop: 20,
            paddingBottom: 28,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
        },
        headerControls: {
            gap: 14,
            maxWidth: `100%`,
            flexWrap: `wrap`,
            marginLeft: `auto`,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `flex-end`,
        },
        headerUtilities: {
            flexDirection: `row`,
            alignItems: `center`,
        },
        headerUtilityButton: {
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: selectedAccent.color,
        },
        headerNotificationButton: {
            marginLeft: 8,
            backgroundColor: selectedAccent.background,
        },
        headerNotificationBadge: {
            top: -4,
            right: -4,
            width: 18,
            height: 18,
            borderRadius: 9,
            position: `absolute`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: selectedAccent.color,
        },
        headerNotificationBadgeLabel: {
            fontSize: 9,
            fontFamily: bold,
            color: colors.white,
        },
        headerSearchContainer: {
            overflow: `hidden`,
        },
        brand: {
            gap: 10,
            flexDirection: `row`,
            alignItems: `center`,
        },
        brandName: {
            fontSize: 18,
            lineHeight: 19,
            fontFamily: heavy,
            color: colors.ink,
            letterSpacing: -0.6,
        },
        menu: {
            gap: 4,
            maxWidth: `100%`,
            flexWrap: `wrap`,
            flexDirection: `row`,
        },
        menuScroll: {
            width: `100%`,
            maxWidth: `100%`,
            flexGrow: 0,
        },
        menuScrollContent: {
            gap: 4,
            flexDirection: `row`,
            alignItems: `center`,
        },
        menuButton: {
            gap: 7,
            minHeight: 44,
            paddingVertical: 10,
            paddingHorizontal: 8,
            flexDirection: `row`,
            alignItems: `center`,
        },
        menuLabel: {
            fontSize: 13,
            fontFamily: semibold,
            color: colors.ink,
        },
        pressed: {
            opacity: 0.65,
        },
        hero: {
            gap: 30,
            paddingTop: 20,
            paddingBottom: 38,
        },
        heroWide: {
            gap: 48,
            paddingTop: 46,
            paddingBottom: 60,
            flexDirection: `row`,
            alignItems: `center`,
        },
        heroIntro: {
            gap: 12,
            minWidth: 0,
            flexDirection: `row`,
            alignItems: `stretch`,
        },
        heroIntroWide: {
            flex: 1,
        },
        heroVerticalActions: {
            gap: 10,
            width: 100,
            flexShrink: 0,
            alignSelf: `stretch`,
            flexDirection: `row`,
            alignItems: `stretch`,
        },
        heroCopy: {
            flex: 1,
            minWidth: 0,
        },
        eyebrowLine: {
            gap: 8,
            marginBottom: 20,
            flexDirection: `row`,
            alignItems: `center`,
        },
        eyebrowRadar: {
            width: 7,
            height: 7,
            position: `relative`,
        },
        eyebrowRadarRing: {
            top: 0,
            left: 0,
            width: 7,
            height: 7,
            borderWidth: 1,
            borderRadius: 4,
            position: `absolute`,
        },
        eyebrowDot: {
            width: 7,
            height: 7,
            borderRadius: 4,
        },
        eyebrow: {
            fontSize: 11,
            lineHeight: 18,
            letterSpacing: 1.6,
            fontFamily: semibold,
            color: colors.blue,
            textTransform: `uppercase`,
        },
        heading: {
            fontSize: 49,
            lineHeight: 54,
            letterSpacing: -2.8,
            fontFamily: heavy,
            color: colors.ink,
        },
        headingWide: {
            fontSize: 68,
            lineHeight: 74,
            letterSpacing: -4,
        },
        headingFirstLine: {
            width: `100%`,
        },
        headingAccent: {
            color: colors.blue,
        },
        headingMagicCursor: {
            color: colors.blue,
            letterSpacing: 0,
            fontFamily: regular,
        },
        headingMagicCursorHidden: {
            opacity: 0,
        },
        heroDescription: {
            fontSize: 15,
            maxWidth: 470,
            lineHeight: 25,
            marginTop: 20,
            fontFamily: regular,
            color: colors.muted,
        },
        heroArtwork: {
            padding: 20,
            borderWidth: 1,
            borderRadius: 22,
            backgroundColor: isDark ? `#19263a` : `#eef2f8`,
            borderColor: colors.border,
        },
        heroArtworkWide: {
            width: 360,
            padding: 26,
        },
        artworkHeading: {
            gap: 18,
            marginBottom: 24,
            flexDirection: `row`,
            alignItems: `center`,
        },
        artworkTitle: {
            fontSize: 23,
            lineHeight: 27,
            fontFamily: heavy,
            color: colors.ink,
            letterSpacing: -0.7,
        },
        artworkSubtitle: {
            fontSize: 10,
            marginTop: 8,
            letterSpacing: 1.2,
            fontFamily: medium,
            color: colors.muted,
        },
        artworkRows: {
            gap: 10,
        },
        artworkRow: {
            gap: 12,
            minHeight: 52,
            borderRadius: 11,
            paddingHorizontal: 14,
            flexDirection: `row`,
            alignItems: `center`,
        },
        artworkRowLabel: {
            flex: 1,
            fontSize: 13,
            fontFamily: semibold,
        },
        searchSection: {
            marginBottom: 36,
        },
        searchTabs: {
            gap: 4,
            flexDirection: `row`,
            alignItems: `flex-end`,
        },
        searchTabContainer: {
            flex: 1,
            overflow: `hidden`,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },
        searchTab: {
            gap: 6,
            minHeight: 43,
            paddingVertical: 10,
            paddingHorizontal: 8,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
        },
        searchTabActive: {
            backgroundColor: `rgba(255, 255, 255, 0.15)`,
        },
        searchTabLabel: {
            fontSize: 11,
            fontFamily: semibold,
            color: colors.white,
        },
        searchBox: {
            gap: 10,
            height: 44,
            padding: 3,
            paddingLeft: 17,
            borderWidth: 1,
            borderRadius: 14,
            overflow: `visible`,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            flexDirection: `row`,
            alignItems: `center`,
        },
        searchIcon: {
            width: 20,
            height: 20,
            position: `relative`,
        },
        searchIconLayer: {
            top: 0,
            left: 0,
            position: `absolute`,
        },
        searchInput: {
            flex: 1,
            height: 36,
            fontSize: 14,
            paddingVertical: 0,
            fontFamily: regular,
            color: colors.ink,
        },
        searchButtonContainer: {
            zIndex: 1,
            height: 46,
            borderRadius: 9,
            overflow: `visible`,
            position: `relative`,
        },
        searchButtonFolderTab: {
            top: -7,
            left: 0,
            width: 28,
            height: 10,
            borderWidth: 1,
            position: `absolute`,
            borderBottomWidth: 0,
            borderColor: colors.surface,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
        },
        searchButton: {
            gap: 8,
            minHeight: 46,
            borderRadius: 9,
            paddingHorizontal: 15,
            flexDirection: `row`,
            alignItems: `center`,
        },
        searchButtonLabel: {
            fontSize: 13,
            fontFamily: semibold,
            color: colors.white,
        },
        searchHint: {
            fontSize: 11,
            lineHeight: 18,
            marginTop: 10,
            fontFamily: regular,
            color: colors.muted,
        },
        sectionHeader: {
            gap: 10,
            marginBottom: 18,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
        },
        sectionTitle: {
            fontSize: 21,
            lineHeight: 29,
            fontFamily: bold,
            color: colors.ink,
            letterSpacing: -0.7,
        },
        sectionCaption: {
            fontSize: 11,
            fontFamily: regular,
            color: colors.muted,
        },
        ...createCategoryGridStyles(fontsLoaded, isDark),
        ...createDirectoryExplorerStyles(fontsLoaded, isDark),
        footer: {
            gap: 24,
            borderTopWidth: 1,
            paddingTop: 32,
            borderColor: colors.border,
        },
        footerBottom: {
            gap: 18,
            flexWrap: `wrap`,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
        },
        footerBrand: {
            gap: 8,
            flexDirection: `row`,
            alignItems: `center`,
        },
        footerBrandLabel: {
            fontSize: 11,
            fontFamily: semibold,
            color: colors.ink,
        },
        copyright: {
            fontSize: 10,
            fontFamily: regular,
            color: colors.muted,
        },
        footerDetails: {
            gap: 12,
            flexWrap: `wrap`,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
        },
        footerLink: {
            gap: 7,
            minHeight: 44,
            flexDirection: `row`,
            alignItems: `center`,
        },
        footerLinkLabel: {
            fontSize: 11,
            fontFamily: semibold,
            color: colors.blue,
        },
        modalBackdrop: {
            flex: 1,
            padding: 24,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: `rgba(20, 33, 61, 0.38)`,
        },
        modalCard: {
            padding: 26,
            width: `100%`,
            maxWidth: 480,
            borderRadius: 20,
            backgroundColor: colors.surface,
        },
        modalHeader: {
            gap: 12,
            marginBottom: 24,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `space-between`,
        },
        modalTitle: {
            fontSize: 27,
            lineHeight: 34,
            marginBottom: 12,
            fontFamily: bold,
            color: colors.ink,
            letterSpacing: -0.8,
        },
        modalDescription: {
            fontSize: 14,
            lineHeight: 23,
            marginBottom: 24,
            fontFamily: regular,
            color: colors.muted,
        },
        sampleNotice: {
            fontSize: 11,
            lineHeight: 18,
            paddingTop: 18,
            borderTopWidth: 1,
            marginTop: 22,
            fontFamily: regular,
            color: colors.muted,
            borderColor: colors.border,
        },
        modalVisitButton: {
            gap: 8,
            minHeight: 48,
            marginTop: 22,
            marginBottom: 12,
            borderWidth: 1,
            borderRadius: 9,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            borderColor: colors.blue,
        },
        modalVisitLabel: {
            fontSize: 12,
            fontFamily: semibold,
            color: colors.blue,
        },
        modalSaveButton: {
            gap: 8,
            minHeight: 48,
            borderRadius: 9,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: colors.blue,
        },
    });
}
