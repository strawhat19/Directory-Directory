import { useRef, useMemo, useState, useEffect } from 'react';
import type { FocusEvent, FormEvent, KeyboardEvent } from 'react';
import { useLanding } from '../../shared/landing/useLanding';
import { categories, directories, type DirectoryEntry } from '../../shared/catalog/catalog';

const directoryById = new Map(directories.map((entry) => [entry.id, entry]));
const categoryById = new Map(categories.map((entry) => [entry.id, entry]));

export function useDirectorySearch(idPrefix: string, onSearch?: () => void) {
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { query, setQuery, searchDirectoryIds, setSearchDirectoryIds } = useLanding();

    const selectedDirectories = useMemo(() => searchDirectoryIds
        .map((id) => directoryById.get(id))
        .filter((entry): entry is DirectoryEntry => Boolean(entry)), [searchDirectoryIds]);

    const matchingDirectories = useMemo(() => {
        const terms = query.trim().toLowerCase().replaceAll(`#`, ``).split(/\s+/).filter(Boolean);

        return directories.filter((entry) => {
            if (searchDirectoryIds.includes(entry.id)) return false;

            const category = categoryById.get(entry.category);
            const text = `${entry.name} ${entry.label} ${category?.label ?? ``} ${entry.topics.join(` `)}`.toLowerCase();
            const compactText = text.replaceAll(/[^a-z0-9]/g, ``);

            return terms.every((term) => text.includes(term)
                || compactText.includes(term.replaceAll(/[^a-z0-9]/g, ``)));
        });
    }, [query, searchDirectoryIds]);

    const suggestions = matchingDirectories.slice(0, 8);
    const activeDirectory = isOpen ? suggestions[activeIndex] : undefined;

    useEffect(() => {
        if (!isOpen) return;

        const closeOutside = (event: PointerEvent) => {
            if (!formRef.current?.contains(event.target as Node)) setIsOpen(false);
        };

        document.addEventListener(`pointerdown`, closeOutside);
        return () => document.removeEventListener(`pointerdown`, closeOutside);
    }, [isOpen]);

    useEffect(() => {
        if (!activeDirectory) return;

        document.getElementById(`${idPrefix}-option-${activeDirectory.id}`)
            ?.scrollIntoView({ block: `nearest` });
    }, [idPrefix, activeDirectory]);

    const focusInput = () => {
        inputRef.current?.focus();
        setIsOpen(true);
        setActiveIndex(-1);
    };

    const selectDirectory = (id: string) => {
        setSearchDirectoryIds((current) => current.includes(id) ? current : [...current, id]);
        setQuery(``);
        focusInput();
    };

    const removeDirectory = (id: string) => {
        setSearchDirectoryIds((current) => current.filter((entryId) => entryId !== id));
        focusInput();
    };

    const clearSearch = () => {
        setSearchDirectoryIds([]);
        setQuery(``);
        focusInput();
    };

    const changeQuery = (value: string) => {
        setQuery(value);
        setIsOpen(true);
        setActiveIndex(value.trim() ? 0 : -1);
    };

    const submitSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery(query.trim());
        setIsOpen(false);
        setActiveIndex(-1);
        onSearch?.();
    };

    const leaveSearch = (event: FocusEvent<HTMLFormElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
    };

    const navigateSuggestions = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.nativeEvent.isComposing) return;

        if (event.key === `ArrowDown` || event.key === `ArrowUp`) {
            event.preventDefault();
            setIsOpen(true);
            if (!suggestions.length) return;

            const direction = event.key === `ArrowDown` ? 1 : -1;
            setActiveIndex((current) => {
                if (!isOpen || current < 0) return direction === 1 ? 0 : suggestions.length - 1;
                return (current + direction + suggestions.length) % suggestions.length;
            });
        } else if (event.key === `Enter` && activeDirectory) {
            event.preventDefault();
            selectDirectory(activeDirectory.id);
        } else if (event.key === `Escape`) {
            event.preventDefault();
            setIsOpen(false);
            setActiveIndex(-1);
        } else if (event.key === `Backspace` && !query && searchDirectoryIds.length) {
            event.preventDefault();
            removeDirectory(searchDirectoryIds[searchDirectoryIds.length - 1]);
        }
    };

    return {
        query,
        isOpen,
        formRef,
        inputRef,
        suggestions,
        activeIndex,
        focusInput,
        changeQuery,
        clearSearch,
        leaveSearch,
        submitSearch,
        setActiveIndex,
        selectDirectory,
        removeDirectory,
        activeDirectory,
        selectedDirectories,
        matchingCount: matchingDirectories.length,
        navigateSuggestions,
        categoryById,
    };
}
