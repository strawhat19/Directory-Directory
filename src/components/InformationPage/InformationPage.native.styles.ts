import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';

export function createInformationStyles(fontsLoaded: boolean, isDark: boolean) {
    const palette = getNativePalette(isDark);
    const regular = fontsLoaded ? `Inter_400Regular` : undefined;
    const semibold = fontsLoaded ? `Inter_600SemiBold` : undefined;
    const heavy = fontsLoaded ? `Inter_800ExtraBold` : undefined;

    return StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: palette.background,
        },
        content: {
            gap: 24,
            width: `100%`,
            maxWidth: 900,
            paddingBottom: 32,
            alignSelf: `center`,
        },
        body: {
            gap: 24,
        },
        stickyHeader: {
            gap: 16,
            zIndex: 10,
            paddingBottom: 16,
            backgroundColor: palette.headerScrim,
        },
        header: {
            gap: 20,
            flexWrap: `wrap`,
            flexDirection: `row`,
            alignItems: `center`,
        },
        headerControls: {
            gap: 10,
            maxWidth: `100%`,
            flexWrap: `wrap`,
            marginLeft: `auto`,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `flex-end`,
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
            color: palette.ink,
            letterSpacing: -0.6,
        },
        navigation: {
            gap: 8,
            maxWidth: `100%`,
            flexWrap: `wrap`,
            flexDirection: `row`,
        },
        navigationLink: {
            gap: 6,
            minHeight: 44,
            borderRadius: 9,
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection: `row`,
            alignItems: `center`,
            backgroundColor: palette.surface,
        },
        navigationLinkActive: {
            backgroundColor: palette.blueSoft,
        },
        navigationLabel: {
            fontSize: 12,
            fontFamily: semibold,
            color: palette.ink,
        },
        activeLabel: {
            color: palette.blue,
        },
        backLink: {
            gap: 8,
            minHeight: 44,
            flexDirection: `row`,
            alignItems: `center`,
            alignSelf: `flex-start`,
        },
        backLabel: {
            fontSize: 12,
            fontFamily: regular,
            color: palette.muted,
        },
        hero: {
            gap: 18,
        },
        heroIntro: {
            gap: 28,
        },
        heroIntroWide: {
            flexDirection: `row`,
            alignItems: `center`,
        },
        heroCopy: {
            gap: 18,
            minWidth: 0,
        },
        heroCopyWide: {
            flex: 1,
        },
        eyebrow: {
            maxWidth: 260,
            alignSelf: `flex-end`,
        },
        eyebrowWide: {
            alignSelf: `center`,
        },
        heading: {
            fontSize: 42,
            lineHeight: 47,
            letterSpacing: -1.9,
            fontFamily: heavy,
            color: palette.ink,
        },
        summary: {
            fontSize: 15,
            lineHeight: 25,
            fontFamily: regular,
            color: palette.muted,
        },
        updated: {
            fontSize: 11,
            fontFamily: regular,
            color: palette.muted,
        },
        note: {
            gap: 12,
            padding: 22,
            borderWidth: 1,
            borderRadius: 14,
            borderColor: palette.border,
            backgroundColor: palette.blueSoft,
        },
        noteTitle: {
            fontSize: 15,
            fontFamily: semibold,
            color: palette.ink,
        },
        paragraph: {
            fontSize: 13,
            lineHeight: 24,
            fontFamily: regular,
            color: palette.muted,
        },
        sections: {
            padding: 22,
            borderWidth: 1,
            borderRadius: 16,
            borderColor: palette.border,
            backgroundColor: palette.surface,
        },
        section: {
            gap: 14,
            paddingVertical: 22,
            borderBottomWidth: 1,
            borderColor: palette.border,
        },
        sectionTitle: {
            fontSize: 20,
            lineHeight: 28,
            fontFamily: semibold,
            color: palette.ink,
            letterSpacing: -0.5,
        },
        contact: {
            gap: 12,
            paddingTop: 24,
        },
        externalLink: {
            gap: 7,
            minHeight: 44,
            flexDirection: `row`,
            alignItems: `center`,
            alignSelf: `flex-start`,
        },
        externalLabel: {
            fontSize: 13,
            fontFamily: semibold,
            color: palette.blue,
        },
        footer: {
            gap: 16,
            paddingTop: 22,
            borderTopWidth: 1,
            borderColor: palette.border,
        },
        footerText: {
            fontSize: 11,
            lineHeight: 19,
            fontFamily: regular,
            color: palette.muted,
        },
        footerLegal: { width: `100%`, marginVertical: -7.5, alignItems: `center` },
        footerNavigation: { justifyContent: `center` },
        footerNavigationLink: { minHeight: 0, paddingVertical: 0, paddingHorizontal: 0 },
        footerNavigationLabel: { fontSize: 11, lineHeight: 15 },
        footerCopyright: { textAlign: `center` },
        pressed: {
            opacity: 0.65,
        },
    });
}
