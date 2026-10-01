import {
    useMemo,
    useState,
    useEffect,
    useCallback,
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
} from 'react';
import type { SearchScope } from './searchScopes';
import { readLandingState, writeLandingState } from './landingStorage';
import { emptyDirectoryFeedback, parseLandingState, type DirectoryFeedbackEntry } from './feedback.types';
import {
    categories,
    directories,
    type CategoryId,
    type DirectoryEntry,
    type DirectoryCategory,
    type DirectoryStatusId,
} from '../catalog/catalog';

export type ViewMode = `grid` | `list`;
export type DirectoryTopic = `All` | `Featured` | `Saved`;

export interface LandingContextValue {
    query: string;
    topic: DirectoryTopic;
    savedIds: string[];
    viewMode: ViewMode;
    searchScope: SearchScope;
    feedbackReady: boolean;
    directoryTopic: string | null;
    feedbackError: string | null;
    status: DirectoryStatusId | null;
    category: CategoryId | null;
    feedback: Record<string, DirectoryFeedbackEntry>;
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
    setStatus: Dispatch<SetStateAction<DirectoryStatusId | null>>;
    setDirectoryReview: (id: string, review: string) => void;
    setDirectoryRating: (id: string, rating: number) => void;
    setDirectoryVote: (id: string, vote: -1 | 1) => void;
    selectDirectoryTopic: (categoryId: CategoryId, topic: string) => void;
}

export const LandingContext = createContext<LandingContextValue | undefined>(undefined);
const directoryIds = new Set(directories.map((entry) => entry.id));

export function LandingProvider({ children }: PropsWithChildren) {
    const [query, setQuery] = useState(``);
    const [savedIds, setSavedIds] = useState<string[]>([]);
    const [topic, setTopic] = useState<DirectoryTopic>(`All`);
    const [viewMode, setViewMode] = useState<ViewMode>(`grid`);
    const [searchScope, setSearchScope] = useState<SearchScope>(`all`);
    const [category, setCategory] = useState<CategoryId | null>(null);
    const [feedbackReady, setFeedbackReady] = useState(false);
    const [feedbackError, setFeedbackError] = useState<string | null>(null);
    const [directoryTopic, setDirectoryTopic] = useState<string | null>(null);
    const [status, setStatus] = useState<DirectoryStatusId | null>(null);
    const [feedback, setFeedback] = useState<Record<string, DirectoryFeedbackEntry>>({});
    const [selectedDirectory, setSelectedDirectory] = useState<DirectoryEntry | null>(null);

    useEffect(() => {
        let active = true;

        readLandingState().then((raw) => {
            if (!active) return;
            const stored = parseLandingState(raw, directoryIds);
            setSavedIds(stored.savedIds);
            setFeedback(stored.feedback);
        }).catch(() => {
            if (active) setFeedbackError(`Device Storage Is Unavailable; Changes Stay In This Session`);
        }).finally(() => {
            if (active) setFeedbackReady(true);
        });

        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!feedbackReady) return;

        writeLandingState({ savedIds, feedback }).catch(() => {
            setFeedbackError(`Device Storage Is Unavailable; Changes Stay In This Session`);
        });
    }, [savedIds, feedback, feedbackReady]);

    useEffect(() => {
        if (typeof document === `undefined`) return;

        document.documentElement.dataset.searchScope = searchScope;
        return () => { delete document.documentElement.dataset.searchScope; };
    }, [searchScope]);

    const clearFilters = useCallback(() => {
        setQuery(``);
        setTopic(`All`);
        setStatus(null);
        setCategory(null);
        setDirectoryTopic(null);
    }, []);

    const closeDirectory = useCallback(() => {
        setSelectedDirectory(null);
    }, []);

    const openDirectory = useCallback((entry: DirectoryEntry) => {
        setSelectedDirectory(entry);
    }, []);

    const selectCategory = useCallback((id: CategoryId) => {
        setTopic(`All`);
        setDirectoryTopic(null);
        setCategory((current) => current === id ? null : id);
    }, []);

    const selectDirectoryTopic = useCallback((categoryId: CategoryId, nextTopic: string) => {
        const categoryItem = categories.find((item) => item.id === categoryId);
        if (!categoryItem?.topics.includes(nextTopic)) return;

        setCategory(categoryId);
        setDirectoryTopic((current) => category === categoryId && current === nextTopic ? null : nextTopic);
    }, [category]);

    const toggleSaved = useCallback((id: string) => {
        if (!feedbackReady || !directoryIds.has(id)) return;

        setSavedIds((current) => current.includes(id)
            ? current.filter((savedId) => savedId !== id)
            : [...current, id]);
    }, [feedbackReady]);

    const setDirectoryVote = useCallback((id: string, vote: -1 | 1) => {
        if (!feedbackReady || !directoryIds.has(id)) return;

        setFeedback((current) => {
            const entry = current[id] ?? emptyDirectoryFeedback;
            return { ...current, [id]: { ...entry, vote: entry.vote === vote ? 0 : vote } };
        });
    }, [feedbackReady]);

    const setDirectoryRating = useCallback((id: string, rating: number) => {
        if (!feedbackReady || !directoryIds.has(id) || !Number.isFinite(rating)) return;

        const nextRating = Math.min(5, Math.max(0, Math.round(rating)));
        setFeedback((current) => ({
            ...current,
            [id]: { ...(current[id] ?? emptyDirectoryFeedback), rating: nextRating },
        }));
    }, [feedbackReady]);

    const setDirectoryReview = useCallback((id: string, review: string) => {
        if (!feedbackReady || !directoryIds.has(id)) return;

        setFeedback((current) => ({
            ...current,
            [id]: { ...(current[id] ?? emptyDirectoryFeedback), review: review.trim().slice(0, 600) },
        }));
    }, [feedbackReady]);

    const visibleCategories = categories;

    const visibleDirectories = useMemo(() => {
        const searchTerms = query.trim().toLowerCase().replaceAll(`#`, ``).split(/\s+/).filter(Boolean);

        return directories.filter((entry) => {
            if (category && entry.category !== category) return false;
            if (status && !entry.statuses.includes(status)) return false;
            if (directoryTopic && !entry.topics.includes(directoryTopic)) return false;
            if (topic === `Featured` && !entry.featured) return false;
            if (topic === `Saved` && !savedIds.includes(entry.id)) return false;

            const categoryItem = categories.find((item) => item.id === entry.category);
            const categoryText = `${categoryItem?.label ?? ``} ${categoryItem?.description ?? ``}`;
            const searchableText = `${entry.name} ${entry.summary} ${entry.label} ${categoryText} ${entry.topics.join(` `)} ${entry.statuses.join(` `)}`.toLowerCase();
            const compactText = searchableText.replaceAll(/[^a-z0-9]/g, ``);

            return searchTerms.every((term) => searchableText.includes(term) || compactText.includes(term.replaceAll(/[^a-z0-9]/g, ``)));
        });
    }, [query, status, category, topic, savedIds, directoryTopic]);

    const value = useMemo<LandingContextValue>(() => ({
        query,
        topic,
        status,
        feedback,
        savedIds,
        viewMode,
        category,
        setQuery,
        setTopic,
        setStatus,
        searchScope,
        feedbackReady,
        feedbackError,
        directoryTopic,
        clearFilters,
        toggleSaved,
        setViewMode,
        setSearchScope,
        openDirectory,
        selectCategory,
        closeDirectory,
        setDirectoryVote,
        setDirectoryReview,
        setDirectoryRating,
        selectDirectoryTopic,
        visibleCategories,
        visibleDirectories,
        selectedDirectory,
    }), [
        query,
        topic,
        status,
        feedback,
        savedIds,
        viewMode,
        category,
        searchScope,
        feedbackReady,
        feedbackError,
        directoryTopic,
        clearFilters,
        toggleSaved,
        openDirectory,
        selectCategory,
        closeDirectory,
        setDirectoryVote,
        setDirectoryReview,
        setDirectoryRating,
        selectDirectoryTopic,
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
