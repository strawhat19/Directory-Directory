import { StyleSheet } from 'react-native';
import { palette } from '../LandingPage/LandingPage.native.styles';

export function createContactStyles(fontsLoaded: boolean) {
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
            backgroundColor: `rgba(247, 248, 250, 0.4)`,
        },
        header: {
            gap: 20,
            flexWrap: `wrap`,
            flexDirection: `row`,
            alignItems: `center`,
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
            gap: 10,
            maxWidth: `100%`,
            flexWrap: `wrap`,
            flexDirection: `row`,
        },
        navigationLink: {
            gap: 7,
            minHeight: 44,
            borderRadius: 9,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flexDirection: `row`,
            alignItems: `center`,
            backgroundColor: palette.white,
        },
        activeLink: {
            backgroundColor: `#f3edff`,
        },
        navigationLabel: {
            fontSize: 12,
            fontFamily: semibold,
            color: palette.ink,
        },
        backLink: {
            gap: 8,
            minHeight: 44,
            flexDirection: `row`,
            alignItems: `center`,
            alignSelf: `flex-start`,
        },
        eyebrow: {
            gap: 8,
            flexDirection: `row`,
            alignItems: `center`,
        },
        eyebrowLabel: {
            fontSize: 10,
            color: `#8054d7`,
            letterSpacing: 1.4,
            fontFamily: semibold,
            textTransform: `uppercase`,
        },
        heading: {
            fontSize: 42,
            lineHeight: 47,
            letterSpacing: -1.9,
            fontFamily: heavy,
            color: palette.ink,
        },
        paragraph: {
            fontSize: 13,
            lineHeight: 24,
            fontFamily: regular,
            color: palette.muted,
        },
        notice: {
            gap: 10,
            padding: 22,
            borderWidth: 1,
            borderRadius: 14,
            borderColor: `#e7ddfb`,
            backgroundColor: `#f3edff`,
        },
        title: {
            fontSize: 19,
            lineHeight: 27,
            fontFamily: semibold,
            color: palette.ink,
            letterSpacing: -0.4,
        },
        panel: {
            gap: 22,
            padding: 22,
            borderWidth: 1,
            borderRadius: 16,
            borderColor: palette.border,
            backgroundColor: palette.white,
        },
        field: {
            gap: 9,
        },
        label: {
            fontSize: 12,
            fontFamily: semibold,
            color: palette.ink,
        },
        input: {
            fontSize: 13,
            minHeight: 48,
            lineHeight: 24,
            borderWidth: 1,
            borderRadius: 9,
            paddingVertical: 12,
            paddingHorizontal: 14,
            fontFamily: regular,
            color: palette.ink,
            borderColor: palette.border,
            backgroundColor: palette.background,
        },
        messageInput: {
            minHeight: 150,
            textAlignVertical: `top`,
        },
        button: {
            gap: 8,
            minHeight: 48,
            borderRadius: 9,
            paddingHorizontal: 18,
            flexDirection: `row`,
            alignItems: `center`,
            alignSelf: `flex-start`,
            backgroundColor: palette.blue,
        },
        buttonLabel: {
            fontSize: 13,
            fontFamily: semibold,
            color: palette.white,
        },
        preview: {
            gap: 12,
            paddingTop: 22,
            borderTopWidth: 1,
            borderColor: palette.border,
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
            gap: 12,
            paddingTop: 24,
            borderTopWidth: 1,
            borderColor: palette.border,
        },
        footerText: {
            fontSize: 11,
            lineHeight: 19,
            fontFamily: regular,
            color: palette.muted,
        },
        pressed: {
            opacity: 0.65,
        },
    });
}
