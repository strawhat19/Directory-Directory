import { useLanding } from '../../shared/landing/useLanding';
import { categories, type DirectoryEntry } from '../../shared/catalog/catalog';

export default function useDirectoryCard(directory: DirectoryEntry) {
    const { savedIds, toggleSaved, openDirectory } = useLanding();
    const category = categories.find((item) => item.id === directory.category);
    const saved = savedIds.includes(directory.id);
    const identity = `directory-card-${directory.id}`;

    const previewDirectory = () => {
        openDirectory(directory);
    };

    const toggleDirectorySaved = () => {
        toggleSaved(directory.id);
    };

    return {
        saved,
        category,
        identity,
        previewDirectory,
        toggleDirectorySaved,
    };
}
