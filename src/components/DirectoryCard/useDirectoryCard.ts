import { useLanding } from '../../shared/landing/useLanding';
import { getDirectoryDomain, getDirectoryHref } from '../../shared/catalog/directoryDetails';
import { categories, directoryStatuses, type DirectoryEntry } from '../../shared/catalog/catalog';

export default function useDirectoryCard(directory: DirectoryEntry) {
    const { savedIds, toggleSaved, openDirectory, feedbackReady, category: selectedCategory, directoryTopic, selectDirectoryTopic } = useLanding();
    const category = categories.find((item) => item.id === directory.category);
    const saved = savedIds.includes(directory.id);
    const identity = `directory-card-${directory.id}`;
    const statuses = directoryStatuses.filter((status) => directory.statuses.includes(status.id));
    const domain = getDirectoryDomain(directory.href);
    const detailsHref = getDirectoryHref(directory);
    const openDetails = () => openDirectory(directory);
    const isTopicSelected = (topic: string) => selectedCategory === directory.category && directoryTopic === topic;
    const selectTopic = (topic: string) => selectDirectoryTopic(directory.category, topic);

    const toggleDirectorySaved = () => {
        toggleSaved(directory.id);
    };

    return {
        saved,
        domain,
        statuses,
        category,
        identity,
        selectTopic,
        openDetails,
        detailsHref,
        feedbackReady,
        isTopicSelected,
        toggleDirectorySaved,
    };
}
