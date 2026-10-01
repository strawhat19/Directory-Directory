import { useLanding } from '../../shared/landing/useLanding';
import { categories, directoryStatuses, type DirectoryEntry } from '../../shared/catalog/catalog';

export default function useDirectoryCard(directory: DirectoryEntry) {
    const { savedIds, toggleSaved, openDirectory, feedbackReady, category: selectedCategory, directoryTopic, selectDirectoryTopic } = useLanding();
    const category = categories.find((item) => item.id === directory.category);
    const saved = savedIds.includes(directory.id);
    const identity = `directory-card-${directory.id}`;
    const statuses = directoryStatuses.filter((status) => directory.statuses.includes(status.id));
    const websiteLabel = directory.href.split(`/`)?.[2]?.replace(/^www\./, ``) ?? `Visit Website`;
    const isTopicSelected = (topic: string) => selectedCategory === directory.category && directoryTopic === topic;
    const selectTopic = (topic: string) => selectDirectoryTopic(directory.category, topic);

    const previewDirectory = () => {
        openDirectory(directory);
    };

    const toggleDirectorySaved = () => {
        toggleSaved(directory.id);
    };

    return {
        saved,
        statuses,
        category,
        identity,
        selectTopic,
        websiteLabel,
        feedbackReady,
        isTopicSelected,
        previewDirectory,
        toggleDirectorySaved,
    };
}
