import { useRef, useState, useEffect } from 'react';
import { useLanding } from '../../shared/landing/useLanding';
import type { DirectoryTopic } from '../../shared/landing/LandingProvider';
import useDirectoryPagination from '../../shared/landing/useDirectoryPagination';
import { categories, directories, directoryStatuses } from '../../shared/catalog/catalog';

export default function useDirectoryExplorer() {
    const {
        query,
        topic,
        status,
        savedIds,
        searchDirectoryIds,
        viewMode,
        category,
        setTopic,
        setStatus,
        clearFilters,
        setViewMode,
        directoryTopic,
        visibleDirectories,
    } = useLanding();

    const [gridColumnCount, setGridColumnCount] = useState(3);
    const controls = useRef<HTMLDivElement>(null);
    const results = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateColumns = () => {
            setGridColumnCount(window.innerWidth <= 600 ? 1 : window.innerWidth <= 1000 ? 2 : 3);
        };

        updateColumns();
        window.addEventListener(`resize`, updateColumns);
        return () => window.removeEventListener(`resize`, updateColumns);
    }, []);

    const { pagedDirectories, currentPage, totalPages, pageNumbers, setPage } = useDirectoryPagination(
        visibleDirectories,
        viewMode === `list` ? 1 : gridColumnCount,
        JSON.stringify([query, category, topic, status, directoryTopic, viewMode, searchDirectoryIds]),
    );
    const selectedCategory = categories.find((item) => item.id === category);
    const emptySaved = topic === `Saved` && savedIds.length === 0;
    const hasFilters = Boolean(query.trim() || selectedCategory || status || directoryTopic || searchDirectoryIds.length);
    const resultCount = visibleDirectories.length;
    const topics: { id: string; label: DirectoryTopic; count: number }[] = [
        { id: `all`, label: `All`, count: directories.length },
        { id: `featured`, label: `Featured`, count: directories.filter((item) => item.featured).length },
    ];
    const statusItems = directoryStatuses.map((item) => ({
        ...item,
        count: directories.filter((directory) => directory.statuses.includes(item.id)).length,
    }));
    const selectedStatus = directoryStatuses.find((item) => item.id === status);
    const changeTopic = (value: DirectoryTopic) => {
        setStatus(null);
        setTopic(value);
    };
    const changeStatus = (value: string) => {
        setTopic(`All`);
        setStatus(directoryStatuses.find((item) => item.id === value)?.id ?? null);
    };
    const changePage = (value: number) => {
        if (value === currentPage) return;
        setPage(value);

        window.requestAnimationFrame(() => {
            const grid = results.current;
            const page = grid?.closest<HTMLElement>(`.landing-page`);
            if (!grid || !page) return;

            const headerHeight = page.querySelector(`#site-header`)?.getBoundingClientRect().height ?? 56;
            const controlsHeight = controls.current?.getBoundingClientRect().height ?? 0;
            const gridOffset = grid.getBoundingClientRect().top - page.getBoundingClientRect().top;
            const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

            page.scrollTo({
                behavior: reducedMotion ? `auto` : `smooth`,
                top: Math.max(0, page.scrollTop + gridOffset - headerHeight - controlsHeight - 16),
            });
        });
    };

    return {
        query,
        topic,
        status,
        topics,
        results,
        controls,
        viewMode,
        totalPages,
        changePage,
        currentPage,
        pageNumbers,
        changeTopic,
        emptySaved,
        hasFilters,
        resultCount,
        clearFilters,
        setViewMode,
        changeStatus,
        selectedStatus,
        directoryTopic,
        directoryStatuses: statusItems,
        selectedCategory,
        pagedDirectories,
    };
}
