import { useLanding } from '../../shared/landing/useLanding';
import { categories, directories, type CategoryId } from '../../shared/catalog/catalog';

const countedCategories = categories.map((item) => ({
    ...item,
    count: directories.filter((directory) => directory.category === item.id).length,
}));

export function useDirectoryCategoryFilters() {
    const { category, selectCategory } = useLanding();

    const changeCategory = (nextCategory: CategoryId | null) => {
        const id = nextCategory ?? category;
        if (id) selectCategory(id);
    };

    return { category, changeCategory, categories: countedCategories, totalCount: directories.length };
}
