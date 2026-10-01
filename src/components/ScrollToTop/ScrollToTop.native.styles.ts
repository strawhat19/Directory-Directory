import { StyleSheet } from 'react-native';
import { getNativePalette } from '../../shared/theme/nativePalette';

export const createScrollToTopStyles = (palette: ReturnType<typeof getNativePalette>) => StyleSheet.create({
    container: {
        right: 20,
        zIndex: 10,
        position: `absolute`,
    },
    button: {
        width: 34,
        height: 34,
        elevation: 4,
        borderRadius: 17,
        shadowRadius: 9,
        shadowOpacity: 0.17,
        alignItems: `center`,
        shadowColor: palette.blue,
        justifyContent: `center`,
        backgroundColor: palette.blue,
        shadowOffset: { width: 0, height: 4 },
    },
    buttonBackground: {
        borderRadius: 17,
        ...StyleSheet.absoluteFillObject,
    },
    iconLayer: {
        alignItems: `center`,
        justifyContent: `center`,
        ...StyleSheet.absoluteFillObject,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ translateY: -2 }],
    },
});
