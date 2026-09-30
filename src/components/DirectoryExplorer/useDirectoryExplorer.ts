import { useLanding } from '../../shared/landing/useLanding';
import { categories, directories } from '../../shared/catalog/catalog';
import type { DirectoryTopic } from '../../shared/landing/LandingProvider';

export default function useDirectoryExplorer() {
    const {
        query,
        topic,
        savedIds,
        viewMode,
        category,
        setTopic,
        clearFilters,
        setViewMode,
        visibleDirectories,
    } = useLanding();

    const selectedCategory = categories.find((item) => item.id === category);
    const emptySaved = topic === `Saved` && savedIds.length === 0;
    const hasFilters = Boolean(query.trim() || selectedCategory);
    const resultCount = visibleDirectories.length;
    const topics: { id: string; label: DirectoryTopic; count: number }[] = [
        { id: `all`, label: `All`, count: directories.length },
        { id: `featured`, label: `Featured`, count: directories.filter((item) => item.featured).length },
        { id: `saved`, label: `Saved`, count: savedIds.length },
    ];

    return {
        query,
        topic,
        topics,
        viewMode,
        setTopic,
        emptySaved,
        hasFilters,
        resultCount,
        clearFilters,
        setViewMode,
        selectedCategory,
        visibleDirectories,
    };
}
