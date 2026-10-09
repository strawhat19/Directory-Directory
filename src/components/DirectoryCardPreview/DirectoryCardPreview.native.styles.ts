import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    preview: {
        width: `100%`,
        borderRadius: 10,
        aspectRatio: 16 / 9,
        overflow: `hidden`,
        alignItems: `center`,
        justifyContent: `center`,
    },
    image: {
        width: `100%`,
        height: `100%`,
    },
    initials: {
        fontSize: 34,
        fontWeight: `700`,
        letterSpacing: -1,
    },
});
