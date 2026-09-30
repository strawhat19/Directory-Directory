import { useEffect, useMemo, useRef } from 'react';
import { AccessibilityInfo, Animated, Easing, ScrollView, useWindowDimensions } from 'react-native';
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
} from '@expo-google-fonts/inter';

import { useLanding } from '../../shared/landing/useLanding';
import { categories, directories } from '../../shared/catalog/catalog';
import { accents, createLandingStyles } from './LandingPage.native.styles';

const categoryIcons = {
    tools: `tools`,
    design: `design`,
    places: `places`,
    communities: `communities`,
} as const;

const categoryAccents = {
    tools: accents.green,
    design: accents.blue,
    places: accents.ink,
    communities: accents.red,
};

const artworkRows = [
    { label: `Find your next idea`, icon: `design`, accent: accents.blue },
    { label: `Make something good`, icon: `tools`, accent: accents.green },
    { label: `Meet your kind of people`, icon: `communities`, accent: accents.red },
] as const;

const topics = [
    { topic: `All`, icon: `globe` },
    { topic: `Featured`, icon: `sparkles` },
    { topic: `Saved`, icon: `bookmark` },
] as const;

const viewModes = [`grid`, `list`] as const;

export function useLandingPage() {
    const landing = useLanding();
    const scroll = useRef<ScrollView>(null);
    const exploreOffset = useRef(0);
    const opacity = useRef(new Animated.Value(0)).current;
    const translation = useRef(new Animated.Value(14)).current;
    const { width } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
        Inter_600SemiBold,
        Inter_800ExtraBold,
    });

    const wide = width >= 760;
    const padding = wide ? 32 : 20;
    const contentWidth = Math.min(width - padding * 2, 1280);
    const columns = width >= 1100 ? 3 : wide ? 2 : 1;
    const categoryColumns = wide ? 4 : 2;
    const styles = useMemo(() => createLandingStyles(fontsLoaded), [fontsLoaded]);
    const gridColumns = landing.viewMode === `list` ? 1 : columns;
    const cardWidth = (contentWidth - 18 * (gridColumns - 1)) / gridColumns;
    const selected = landing.selectedDirectory;
    const selectedAccent = selected ? accents[selected.accent] : accents.blue;
    const selectedIsSaved = selected ? landing.savedIds.includes(selected.id) : false;

    const categoryItems = categories.map((item) => ({
        ...item,
        icon: categoryIcons[item.id],
        accent: categoryAccents[item.id],
        active: landing.category === item.id,
        count: directories.filter((directory) => directory.category === item.id).length,
    }));

    const directoryItems = landing.visibleDirectories.map((directory) => ({
        ...directory,
        accentStyle: accents[directory.accent],
        saved: landing.savedIds.includes(directory.id),
    }));

    const topicItems = topics.map((item) => ({
        ...item,
        id: item.topic.toLowerCase(),
        active: item.topic === landing.topic,
    }));

    const viewItems = viewModes.map((mode) => ({
        mode,
        active: landing.viewMode === mode,
    }));

    const showDirectories = () => {
        scroll.current?.scrollTo({ y: exploreOffset.current, animated: true });
    };

    const showSaved = () => {
        landing.setTopic(`Saved`);
        showDirectories();
    };

    useEffect(() => {
        let active = true;
        let animation: Animated.CompositeAnimation | undefined;

        const showContent = (reduceMotion: boolean) => {
            if (!active) return;
            animation?.stop();

            if (reduceMotion) {
                opacity.setValue(1);
                translation.setValue(0);
                return;
            }

            animation = Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.cubic),
                }),
                Animated.timing(translation, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.cubic),
                }),
            ]);
            animation.start();
        };

        AccessibilityInfo.isReduceMotionEnabled()
            .then(showContent)
            .catch(() => showContent(false));

        const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, showContent);

        return () => {
            active = false;
            animation?.stop();
            subscription.remove();
        };
    }, [opacity, translation]);

    return {
        wide,
        scroll,
        styles,
        landing,
        padding,
        columns,
        selected,
        cardWidth,
        viewItems,
        showSaved,
        topicItems,
        artworkRows,
        contentWidth,
        categoryItems,
        directoryItems,
        selectedAccent,
        selectedIsSaved,
        showDirectories,
        setExploreOffset: (offset: number) => { exploreOffset.current = offset; },
        categoryWidth: (contentWidth - 12 * (categoryColumns - 1)) / categoryColumns,
        entranceStyle: { opacity, transform: [{ translateY: translation }] },
    };
}
