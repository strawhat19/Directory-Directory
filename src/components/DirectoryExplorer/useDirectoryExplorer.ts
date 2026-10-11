import { useRef, useState, useEffect } from 'react';
import { useLanding } from '../../shared/landing/useLanding';
import type { DirectoryTopic } from '../../shared/landing/LandingProvider';
import { useStickySectionHeader } from '../../shared/ui/useStickySectionHeader.web';
import useDirectoryPagination from '../../shared/landing/useDirectoryPagination';
import { getDirectoryPageItems } from '../../shared/landing/directoryPagination';
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

    const { header: controls, stuck: controlsStuck } = useStickySectionHeader();
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [gridColumnCount, setGridColumnCount] = useState(3);
    const results = useRef<HTMLDivElement>(null);
    const filterPanel = useRef<HTMLDivElement>(null);
    const filterButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const updateColumns = () => {
            setGridColumnCount(window.innerWidth <= 600 ? 1 : window.innerWidth <= 1000 ? 2 : 3);
            if (window.innerWidth > 600) setFiltersOpen(false);
        };

        updateColumns();
        window.addEventListener(`resize`, updateColumns);
        return () => window.removeEventListener(`resize`, updateColumns);
    }, []);

    useEffect(() => {
        const element = controls.current;
        const search = element?.querySelector<HTMLElement>(`#directory-explorer-search-form`);
        if (!element || !search) return;

        const updateTitleOffset = () => {
            const offset = Math.max(0, search.getBoundingClientRect().top - element.getBoundingClientRect().top);
            const value = `${offset}px`;
            if (element.style.getPropertyValue(`--directory-explorer-title-offset`) !== value) {
                element.style.setProperty(`--directory-explorer-title-offset`, value);
            }
        };
        const observer = typeof ResizeObserver === `undefined` ? null : new ResizeObserver(updateTitleOffset);
        observer?.observe(search);
        observer?.observe(element);
        updateTitleOffset();
        window.addEventListener(`resize`, updateTitleOffset);
        return () => {
            observer?.disconnect();
            window.removeEventListener(`resize`, updateTitleOffset);
        };
    }, [controls]);

    useEffect(() => {
        if (!filtersOpen) return;

        const closeOutside = (event: PointerEvent) => {
            if (!(event.target instanceof Node)) return;
            if (filterPanel.current?.contains(event.target) || filterButton.current?.contains(event.target)) return;
            setFiltersOpen(false);
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key !== `Escape`) return;
            setFiltersOpen(false);
            if (filterPanel.current?.contains(document.activeElement)) filterButton.current?.focus();
        };

        document.addEventListener(`pointerdown`, closeOutside);
        document.addEventListener(`keydown`, closeOnEscape);
        return () => {
            document.removeEventListener(`pointerdown`, closeOutside);
            document.removeEventListener(`keydown`, closeOnEscape);
        };
    }, [filtersOpen]);

    const { pagedDirectories, currentPage, totalPages, setPage } = useDirectoryPagination(
        visibleDirectories,
        viewMode === `list` ? 1 : gridColumnCount,
        JSON.stringify([query, category, topic, status, directoryTopic, viewMode, searchDirectoryIds]),
    );
    const pageItems = getDirectoryPageItems(currentPage, totalPages, gridColumnCount === 1);
    const selectedCategory = categories.find((item) => item.id === category);
    const emptySaved = topic === `Saved` && savedIds.length === 0;
    const activeFilterCount = [
        status,
        category,
        directoryTopic,
        topic !== `All`,
        query.trim() || searchDirectoryIds.length,
    ].filter(Boolean).length;
    const hasFilters = activeFilterCount > 0;
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
            const titleOffset = gridColumnCount === 1
                ? Number.parseFloat(controls.current?.style.getPropertyValue(`--directory-explorer-title-offset`) ?? `0`) || 0
                : 0;
            const gridOffset = grid.getBoundingClientRect().top - page.getBoundingClientRect().top;
            const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

            page.scrollTo({
                behavior: reducedMotion ? `auto` : `smooth`,
                top: Math.max(0, page.scrollTop + gridOffset - headerHeight - controlsHeight + titleOffset - 16),
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
        mobile: gridColumnCount === 1,
        viewMode,
        totalPages,
        changePage,
        currentPage,
        pageItems,
        changeTopic,
        emptySaved,
        hasFilters,
        filterPanel,
        filtersOpen,
        resultCount,
        filterButton,
        clearFilters,
        setViewMode,
        changeStatus,
        setFiltersOpen,
        selectedStatus,
        directoryTopic,
        controlsStuck,
        activeFilterCount,
        directoryStatuses: statusItems,
        selectedCategory,
        pagedDirectories,
    };
}
