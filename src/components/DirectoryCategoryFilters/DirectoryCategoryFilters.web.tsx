import Icon from '../Icon/Icon';
import './DirectoryCategoryFilters.scss';
import { useDirectoryCategoryFilters } from './useDirectoryCategoryFilters';

export default function DirectoryCategoryFilters() {
    const { category, categories, changeCategory } = useDirectoryCategoryFilters();

    return (
        <div
            role={`group`}
            aria-label={`Filter directories by category`}
            id={`directory-explorer-category-filters`}
            className={`directory-category-filters`}
        >
            <button
                type={`button`}
                aria-pressed={!category}
                onClick={() => changeCategory(null)}
                id={`directory-explorer-category-all`}
                className={`directory-category-filters__button${!category ? ` is-active` : ``}`}
            >
                <Icon
                    size={14}
                    name={`grid`}
                    id={`directory-explorer-category-all-icon`}
                    className={`directory-category-filters__icon`}
                />
                <span
                    id={`directory-explorer-category-all-label`}
                    className={`directory-category-filters__label`}
                >
                    {`All`}
                </span>
            </button>
            {categories.map((item) => (
                <button
                    key={item.id}
                    type={`button`}
                    title={item.description}
                    aria-pressed={category === item.id}
                    onClick={() => changeCategory(item.id)}
                    id={`directory-explorer-category-${item.id}`}
                    className={`directory-category-filters__button directory-category-filters__button--${item.accent}${category === item.id ? ` is-active` : ``}`}
                >
                    <Icon
                        size={14}
                        name={item.icon}
                        id={`directory-explorer-category-${item.id}-icon`}
                        className={`directory-category-filters__icon`}
                    />
                    <span
                        id={`directory-explorer-category-${item.id}-label`}
                        className={`directory-category-filters__label`}
                    >
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
