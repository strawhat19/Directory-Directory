import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useCopyrightYear } from '../../shared/time/useCopyrightYear';
import { directories, type CategoryId } from '../../shared/catalog/catalog';
import { searchScopes, type SearchScope } from '../../shared/landing/searchScopes';
import { palette, accents, createLandingStyles } from './LandingPage.native.styles';

const categoryIcons = {
    tools: `tools`,
    design: `design`,
    places: `places`,
    learning: `learning`,
    business: `business`,
    lifestyle: `lifestyle`,
    technology: `technology`,
    communities: `communities`,
} as const;

const categoryAccents = {
    tools: accents.green,
    design: accents.blue,
    places: accents.ink,
    learning: accents.yellow,
    business: accents.orange,
    lifestyle: accents.pink,
    technology: accents.purple,
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
    const { year } = useCopyrightYear();
    const [reduceMotion, setReduceMotion] = useState(false);
    const scroll = useRef<ScrollView>(null);
    const mainOffset = useRef(0);
    const headerHeight = useRef(0);
    const exploreOffset = useRef(0);
    const pendingScroll = useRef(false);
    const searchTheme = useRef(new Animated.Value(0)).current;
    const dotPulse = useRef(new Animated.Value(0)).current;
    const dotColor = useRef(new Animated.Value(0)).current;
    const radarFirst = useRef(new Animated.Value(1)).current;
    const radarSecond = useRef(new Animated.Value(1)).current;
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

    const categoryItems = landing.visibleCategories.map((item) => ({
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

    const scopeItems = searchScopes.map((item) => ({
        ...item,
        active: item.id === landing.searchScope,
    }));
    const selectedScope = searchScopes.find((item) => item.id === landing.searchScope) ?? searchScopes[0];

    const scrollToResults = () => {
        const offset = mainOffset.current + exploreOffset.current - headerHeight.current;
        scroll.current?.scrollTo({ y: Math.max(0, offset), animated: true });
    };

    const queueResultsScroll = () => {
        pendingScroll.current = true;

        requestAnimationFrame(() => requestAnimationFrame(() => {
            if (!pendingScroll.current) return;
            scrollToResults();
            pendingScroll.current = false;
        }));
    };

    const setExploreOffset = (offset: number) => {
        exploreOffset.current = offset;

        if (pendingScroll.current) {
            scrollToResults();
            pendingScroll.current = false;
        }
    };

    const selectSearchScope = (scope: SearchScope) => {
        landing.setSearchScope(scope);
    };

    const selectCategory = (id: CategoryId) => {
        landing.setQuery(``);
        landing.selectCategory(id);
        queueResultsScroll();
    };

    const showSearchResults = () => {
        const query = landing.query.trim();
        landing.clearFilters();
        landing.setQuery(query);
        queueResultsScroll();
    };

    useEffect(() => {
        const themeIndex = searchScopes.findIndex((item) => item.id === landing.searchScope);

        if (reduceMotion) {
            searchTheme.setValue(themeIndex);
            return;
        }

        const animation = Animated.timing(searchTheme, {
            duration: 350,
            toValue: themeIndex,
            isInteraction: false,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.cubic),
        });
        animation.start();

        return () => animation.stop();
    }, [reduceMotion, searchTheme, landing.searchScope]);

    useEffect(() => {
        let active = true;
        let animation: Animated.CompositeAnimation | undefined;
        let pulseAnimation: Animated.CompositeAnimation | undefined;
        let colorAnimation: Animated.CompositeAnimation | undefined;
        let radarAnimation: Animated.CompositeAnimation | undefined;

        const createRadarLoop = (progress: Animated.Value) => Animated.loop(Animated.sequence([
            Animated.timing(progress, {
                toValue: 0,
                duration: 0,
                isInteraction: false,
                useNativeDriver: false,
            }),
            Animated.timing(progress, {
                toValue: 1,
                duration: 2800,
                isInteraction: false,
                useNativeDriver: false,
                easing: Easing.out(Easing.quad),
            }),
        ]));

        const showContent = (reduceMotion: boolean) => {
            if (!active) return;
            setReduceMotion(reduceMotion);
            animation?.stop();
            pulseAnimation?.stop();
            colorAnimation?.stop();
            radarAnimation?.stop();
            dotPulse.setValue(0);
            dotColor.setValue(0);
            radarFirst.setValue(1);
            radarSecond.setValue(1);

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

            pulseAnimation = Animated.loop(Animated.sequence([
                Animated.timing(dotPulse, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.sin),
                }),
                Animated.timing(dotPulse, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.inOut(Easing.sin),
                }),
            ]));
            colorAnimation = Animated.loop(Animated.timing(dotColor, {
                toValue: 1,
                duration: 12000,
                easing: Easing.linear,
                useNativeDriver: false,
            }));
            radarAnimation = Animated.parallel([
                createRadarLoop(radarFirst),
                Animated.sequence([
                    Animated.delay(1400),
                    createRadarLoop(radarSecond),
                ]),
            ]);
            pulseAnimation.start();
            colorAnimation.start();
            radarAnimation.start();
        };

        AccessibilityInfo.isReduceMotionEnabled()
            .then(showContent)
            .catch(() => showContent(false));

        const subscription = AccessibilityInfo.addEventListener(`reduceMotionChanged`, showContent);

        return () => {
            active = false;
            animation?.stop();
            pulseAnimation?.stop();
            colorAnimation?.stop();
            radarAnimation?.stop();
            subscription.remove();
        };
    }, [opacity, dotPulse, dotColor, radarFirst, radarSecond, translation]);

    const statusColor = dotColor.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [palette.blue, palette.green, palette.blue],
    });
    const searchThemeColor = searchTheme.interpolate({
        inputRange: [0, 1, 2],
        outputRange: searchScopes.map((item) => item.color),
    });
    const searchBackgroundColor = searchTheme.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [accents.blue.background, accents.green.background, accents.red.background],
    });

    return {
        wide,
        year,
        scroll,
        styles,
        landing,
        padding,
        columns,
        selected,
        scopeItems,
        cardWidth,
        viewItems,
        topicItems,
        artworkRows,
        contentWidth,
        categoryItems,
        selectCategory,
        directoryItems,
        selectedAccent,
        selectedIsSaved,
        setExploreOffset,
        showSearchResults,
        selectSearchScope,
        setMainOffset: (offset: number) => { mainOffset.current = offset; },
        setHeaderHeight: (height: number) => { headerHeight.current = height; },
        searchPlaceholder: selectedScope.placeholder,
        searchThemeStyle: { backgroundColor: searchThemeColor },
        searchBoxThemeStyle: { borderColor: searchThemeColor, backgroundColor: searchBackgroundColor },
        searchIconItems: searchScopes.map((item, index) => ({
            ...item,
            opacity: searchTheme.interpolate({
                inputRange: [0, 1, 2],
                outputRange: searchScopes.map((_, colorIndex) => colorIndex === index ? 1 : 0),
            }),
        })),
        categoryWidth: (contentWidth - 12 * (categoryColumns - 1)) / categoryColumns,
        entranceStyle: { opacity, transform: [{ translateY: translation }] },
        dotStyle: {
            opacity: dotPulse.interpolate({ inputRange: [0, 1], outputRange: [0.65, 1] }),
            transform: [{ scale: dotPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) }],
            backgroundColor: statusColor,
        },
        radarRingStyles: [radarFirst, radarSecond].map((progress) => ({
            borderColor: statusColor,
            opacity: progress.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0, 0.6, 0] }),
            transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 3] }) }],
        })),
    };
}
