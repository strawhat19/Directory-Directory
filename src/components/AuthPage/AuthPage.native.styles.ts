import { StyleSheet } from 'react-native';
import { palette } from '../LandingPage/LandingPage.native.styles';

export function createAuthStyles(fontsLoaded: boolean) {
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
            paddingTop: 20,
            paddingBottom: 32,
            alignSelf: `center`,
        },
        stickyHeader: {
            gap: 16,
            zIndex: 10,
            paddingBottom: 16,
            backgroundColor: palette.background,
        },
        header: {
            gap: 18,
            flexWrap: `wrap`,
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
        navigationLabel: {
            fontSize: 12,
            fontFamily: semibold,
            color: palette.ink,
        },
        panel: {
            gap: 22,
            width: `100%`,
            padding: 24,
            maxWidth: 540,
            borderWidth: 1,
            borderRadius: 16,
            alignSelf: `center`,
            borderColor: palette.border,
            backgroundColor: palette.white,
        },
        eyebrow: {
            gap: 8,
            flexDirection: `row`,
            alignItems: `center`,
        },
        eyebrowLabel: {
            fontSize: 10,
            letterSpacing: 1.4,
            fontFamily: semibold,
            color: palette.blue,
            textTransform: `uppercase`,
        },
        heading: {
            fontSize: 36,
            lineHeight: 41,
            letterSpacing: -1.6,
            fontFamily: heavy,
            color: palette.ink,
        },
        paragraph: {
            fontSize: 13,
            lineHeight: 23,
            fontFamily: regular,
            color: palette.muted,
        },
        notice: {
            padding: 16,
            fontSize: 11,
            lineHeight: 21,
            borderWidth: 1,
            borderRadius: 10,
            fontFamily: regular,
            color: palette.muted,
            borderColor: `#dce8fc`,
            backgroundColor: `#edf4ff`,
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
        button: {
            gap: 8,
            minHeight: 48,
            borderRadius: 9,
            paddingHorizontal: 18,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
            backgroundColor: palette.blue,
        },
        buttonLabel: {
            fontSize: 13,
            fontFamily: semibold,
            color: palette.white,
        },
        error: {
            fontSize: 12,
            lineHeight: 22,
            fontFamily: regular,
            color: palette.red,
        },
        switch: {
            gap: 10,
            flexWrap: `wrap`,
            flexDirection: `row`,
            alignItems: `center`,
            justifyContent: `center`,
        },
        link: {
            gap: 7,
            minHeight: 44,
            flexDirection: `row`,
            alignItems: `center`,
            alignSelf: `flex-start`,
        },
        linkLabel: {
            fontSize: 12,
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
        disabled: {
            opacity: 0.6,
        },
        pressed: {
            opacity: 0.65,
        },
    });
}
