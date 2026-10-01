import { useLanding } from '../../shared/landing/useLanding';
import { categories, type CategoryId } from '../../shared/catalog/catalog';

export function useDirectoryCategoryFilters() {
    const { category, selectCategory } = useLanding();

    const changeCategory = (nextCategory: CategoryId | null) => {
        const id = nextCategory ?? category;
        if (id) selectCategory(id);
    };

    return { category, categories, changeCategory };
}
