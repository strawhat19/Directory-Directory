import { useLanding } from '../../shared/landing/useLanding';
import { categories, directories, directoryStatuses } from '../../shared/catalog/catalog';
import type { DirectoryTopic } from '../../shared/landing/LandingProvider';

export default function useDirectoryExplorer() {
    const {
        query,
        topic,
        status,
        savedIds,
        viewMode,
        category,
        setTopic,
        setStatus,
        clearFilters,
        setViewMode,
        directoryTopic,
        selectCategory,
        selectDirectoryTopic,
        visibleDirectories,
    } = useLanding();

    const selectedCategory = categories.find((item) => item.id === category);
    const emptySaved = topic === `Saved` && savedIds.length === 0;
    const hasFilters = Boolean(query.trim() || selectedCategory || status || directoryTopic);
    const resultCount = visibleDirectories.length;
    const topics: { id: string; label: DirectoryTopic; count: number }[] = [
        { id: `all`, label: `All`, count: directories.length },
        { id: `featured`, label: `Featured`, count: directories.filter((item) => item.featured).length },
        { id: `saved`, label: `Saved`, count: savedIds.length },
    ];
    const selectedStatus = directoryStatuses.find((item) => item.id === status);
    const changeStatus = (value: string) => setStatus(directoryStatuses.find((item) => item.id === value)?.id ?? null);
    const changeCategory = (value: string) => {
        const nextCategory = categories.find((item) => item.id === value);
        if (nextCategory) selectCategory(nextCategory.id);
        else if (category) selectCategory(category);
    };
    const changeDirectoryTopic = (value: string) => {
        if (!selectedCategory) return;
        const nextTopic = value || directoryTopic;
        if (nextTopic) selectDirectoryTopic(selectedCategory.id, nextTopic);
    };

    return {
        query,
        topic,
        status,
        topics,
        viewMode,
        setTopic,
        emptySaved,
        hasFilters,
        resultCount,
        clearFilters,
        setViewMode,
        changeStatus,
        selectedStatus,
        directoryTopic,
        changeCategory,
        directoryStatuses,
        categoryOptions: categories,
        changeDirectoryTopic,
        selectedCategory,
        visibleDirectories,
    };
}
