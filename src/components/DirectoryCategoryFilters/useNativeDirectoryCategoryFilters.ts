import { useMemo, useState } from 'react';
import { useTheme } from '../../shared/theme/useTheme';
import { useDirectoryCategoryFilters } from './useDirectoryCategoryFilters';
import { createDirectoryCategoryFilterStyles } from './DirectoryCategoryFilters.native.styles';
import { getLandingAccents, getLandingPalette } from '../LandingPage/LandingPage.native.styles';

export function useNativeDirectoryCategoryFilters() {
    const { isDark } = useTheme();
    const [containerWidth, setContainerWidth] = useState(0);
    const { category, categories, changeCategory } = useDirectoryCategoryFilters();
    const columns = containerWidth >= 720 ? 6 : containerWidth >= 480 ? 4 : 2;
    const colors = useMemo(() => getLandingPalette(isDark), [isDark]);
    const accents = useMemo(() => getLandingAccents(isDark), [isDark]);
    const styles = useMemo(() => createDirectoryCategoryFilterStyles(), []);
    const items = [
        { id: null, label: `All`, icon: `grid`, accent: `ink` } as const,
        ...categories,
    ];
    const rows = Array.from(
        { length: Math.ceil(items.length / columns) },
        (_, index) => items.slice(index * columns, (index + 1) * columns),
    );

    return { rows, colors, styles, accents, category, changeCategory, setContainerWidth };
}
