import {
    useMemo,
    useState,
    useCallback,
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
} from 'react';
import type { SearchScope } from './searchScopes';
import {
    categories,
    directories,
    type CategoryId,
    type DirectoryEntry,
    type DirectoryCategory,
} from '../catalog/catalog';

export type ViewMode = `grid` | `list`;
export type DirectoryTopic = `All` | `Featured` | `Saved`;

export interface LandingContextValue {
    query: string;
    topic: DirectoryTopic;
    savedIds: string[];
    viewMode: ViewMode;
    searchScope: SearchScope;
    category: CategoryId | null;
    visibleCategories: DirectoryCategory[];
    visibleDirectories: DirectoryEntry[];
    selectedDirectory: DirectoryEntry | null;
    closeDirectory: () => void;
    clearFilters: () => void;
    toggleSaved: (id: string) => void;
    selectCategory: (id: CategoryId) => void;
    openDirectory: (entry: DirectoryEntry) => void;
    setQuery: Dispatch<SetStateAction<string>>;
    setTopic: Dispatch<SetStateAction<DirectoryTopic>>;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
    setSearchScope: Dispatch<SetStateAction<SearchScope>>;
}

export const LandingContext = createContext<LandingContextValue | undefined>(undefined);

export function LandingProvider({ children }: PropsWithChildren) {
    const [query, setQuery] = useState(``);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [topic, setTopic] = useState<DirectoryTopic>(`All`);
    const [viewMode, setViewMode] = useState<ViewMode>(`grid`);
    const [searchScope, setSearchScope] = useState<SearchScope>(`all`);
    const [category, setCategory] = useState<CategoryId | null>(null);
    const [selectedDirectory, setSelectedDirectory] = useState<DirectoryEntry | null>(null);

    const clearFilters = useCallback(() => {
        setQuery(``);
        setTopic(`All`);
        setCategory(null);
    }, []);

    const closeDirectory = useCallback(() => {
        setSelectedDirectory(null);
    }, []);

    const openDirectory = useCallback((entry: DirectoryEntry) => {
        setSelectedDirectory(entry);
    }, []);

    const selectCategory = useCallback((id: CategoryId) => {
        setTopic(`All`);
        setCategory((current) => current === id ? null : id);
    }, []);

    const toggleSaved = useCallback((id: string) => {
        setSavedIds((current) => current.includes(id)
            ? current.filter((savedId) => savedId !== id)
            : [...current, id]);
    }, []);

    const visibleCategories = categories;

    const visibleDirectories = useMemo(() => {
        const search = query.trim().toLowerCase();

        return directories.filter((entry) => {
            if (category && entry.category !== category) return false;
            if (topic === `Featured` && !entry.featured) return false;
            if (topic === `Saved` && !savedIds.includes(entry.id)) return false;

            const categoryItem = categories.find((item) => item.id === entry.category);
            const categoryText = `${categoryItem?.label ?? ``} ${categoryItem?.description ?? ``}`;
            const searchableText = `${entry.name} ${entry.summary} ${entry.label} ${categoryText}`;

            return !search || searchableText.toLowerCase().includes(search);
        });
    }, [query, category, topic, savedIds]);

    const value = useMemo<LandingContextValue>(() => ({
        query,
        topic,
        savedIds,
        viewMode,
        category,
        setQuery,
        setTopic,
        searchScope,
        clearFilters,
        toggleSaved,
        setViewMode,
        setSearchScope,
        openDirectory,
        selectCategory,
        closeDirectory,
        visibleCategories,
        visibleDirectories,
        selectedDirectory,
    }), [
        query,
        topic,
        savedIds,
        viewMode,
        category,
        searchScope,
        clearFilters,
        toggleSaved,
        openDirectory,
        selectCategory,
        closeDirectory,
        visibleCategories,
        visibleDirectories,
        selectedDirectory,
    ]);

    return (
        <LandingContext.Provider value={value}>
            {children}
        </LandingContext.Provider>
    );
}
