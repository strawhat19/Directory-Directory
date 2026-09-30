import './DirectoryExplorer.scss';
import Icon from '../Icon/Icon';
import useDirectoryExplorer from './useDirectoryExplorer';
import DirectoryCard from '../DirectoryCard/DirectoryCard';

export default function DirectoryExplorer() {
    const {
        query,
        topic,
        topics,
        viewMode,
        setTopic,
        emptySaved,
        hasFilters,
        resultCount,
        clearFilters,
        setViewMode,
        selectedCategory,
        visibleDirectories,
    } = useDirectoryExplorer();

    return (
        <section
            id={`explore`}
            aria-labelledby={`directory-explorer-title`}
            className={`directory-explorer directory-explorer--${viewMode}`}
        >
            <div
                id={`directory-explorer-header`}
                className={`directory-explorer__header`}
            >
                <div
                    id={`directory-explorer-intro`}
                    className={`directory-explorer__intro`}
                >
                    <h2
                        id={`directory-explorer-title`}
                        className={`directory-explorer__title`}
                    >
                        {`Explore directories`}
                    </h2>

                    <p
                        id={`directory-explorer-subtitle`}
                        className={`directory-explorer__subtitle`}
                    >
                        {`Thoughtful collections. A good place to start.`}
                    </p>
                </div>

                <div
                    id={`directory-explorer-metadata`}
                    className={`directory-explorer__metadata`}
                >
                    <span
                        id={`directory-explorer-sample-label`}
                        className={`directory-explorer__sample-label dd-eyebrow`}
                    >
                        {`Sample collection`}
                    </span>

                    <span
                        aria-live={`polite`}
                        id={`directory-explorer-result-count`}
                        className={`directory-explorer__result-count`}
                    >
                        {`${resultCount} ${resultCount === 1 ? `directory` : `directories`}`}
                    </span>
                </div>
            </div>

            <div
                id={`directory-explorer-toolbar`}
                className={`directory-explorer__toolbar`}
            >
                <div
                    role={`group`}
                    aria-label={`Directory collection`}
                    id={`directory-explorer-topics`}
                    className={`directory-explorer__topics`}
                >
                    {topics.map((item) => (
                        <button
                            key={item.id}
                            type={`button`}
                            aria-pressed={topic === item.label}
                            onClick={() => setTopic(item.label)}
                            id={`directory-explorer-topic-${item.id}`}
                            className={`directory-explorer__topic${topic === item.label ? ` is-active` : ``}`}
                        >
                            <Icon
                                size={14}
                                name={item.label === `All` ? `grid` : item.label === `Featured` ? `sparkles` : `bookmark`}
                                id={`directory-explorer-topic-${item.id}-icon`}
                                className={`directory-explorer__topic-icon`}
                            />

                            <span
                                id={`directory-explorer-topic-${item.id}-label`}
                                className={`directory-explorer__topic-label`}
                            >
                                {item.label}
                            </span>

                            <span
                                id={`directory-explorer-topic-${item.id}-count`}
                                className={`directory-explorer__topic-count`}
                            >
                                {item.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div
                    role={`group`}
                    aria-label={`Directory layout`}
                    id={`directory-explorer-view-controls`}
                    className={`directory-explorer__view-controls`}
                >
                    {([`grid`, `list`] as const).map((view) => (
                        <button
                            key={view}
                            type={`button`}
                            aria-label={`${view === `grid` ? `Grid` : `List`} view`}
                            aria-pressed={viewMode === view}
                            onClick={() => setViewMode(view)}
                            id={`directory-explorer-view-${view}`}
                            className={`directory-explorer__view dd-icon-button${viewMode === view ? ` is-active` : ``}`}
                        >
                            <Icon
                                size={18}
                                name={view}
                                id={`directory-explorer-view-${view}-icon`}
                                className={`directory-explorer__view-icon`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {hasFilters && (
                <div
                    id={`directory-explorer-filters`}
                    className={`directory-explorer__filters`}
                >
                    {query.trim() && (
                        <span
                            id={`directory-explorer-query-filter`}
                            className={`directory-explorer__filter`}
                        >
                            <Icon
                                size={13}
                                name={`search`}
                                id={`directory-explorer-query-filter-icon`}
                                className={`directory-explorer__filter-icon`}
                            />

                            <span
                                id={`directory-explorer-query-filter-label`}
                                className={`directory-explorer__filter-label`}
                            >
                                {query.trim()}
                            </span>
                        </span>
                    )}

                    {selectedCategory && (
                        <span
                            id={`directory-explorer-category-filter-${selectedCategory.id}`}
                            className={`directory-explorer__filter`}
                        >
                            <Icon
                                size={13}
                                name={selectedCategory.id}
                                id={`directory-explorer-category-filter-${selectedCategory.id}-icon`}
                                className={`directory-explorer__filter-icon`}
                            />

                            <span
                                id={`directory-explorer-category-filter-${selectedCategory.id}-label`}
                                className={`directory-explorer__filter-label`}
                            >
                                {selectedCategory.label}
                            </span>
                        </span>
                    )}

                    <button
                        type={`button`}
                        onClick={clearFilters}
                        id={`directory-explorer-clear-filters`}
                        className={`directory-explorer__clear-filters`}
                    >
                        <Icon
                            size={13}
                            name={`close`}
                            id={`directory-explorer-clear-filters-icon`}
                            className={`directory-explorer__clear-filters-icon`}
                        />

                        <span
                            id={`directory-explorer-clear-filters-label`}
                            className={`directory-explorer__clear-filters-label`}
                        >
                            {`Clear filters`}
                        </span>
                    </button>
                </div>
            )}

            {resultCount > 0 ? (
                <div
                    id={`directory-explorer-results`}
                    className={`directory-explorer__results`}
                >
                    {visibleDirectories.map((directory) => (
                        <DirectoryCard
                            key={directory.id}
                            directory={directory}
                        />
                    ))}
                </div>
            ) : (
                <div
                    id={`directory-explorer-empty`}
                    className={`directory-explorer__empty`}
                >
                    <span
                        aria-hidden={true}
                        id={`directory-explorer-empty-mark`}
                        className={`directory-explorer__empty-mark`}
                    >
                        <Icon
                            size={24}
                            name={emptySaved ? `bookmark` : `search`}
                            id={`directory-explorer-empty-icon`}
                            className={`directory-explorer__empty-icon`}
                        />
                    </span>

                    <h3
                        id={`directory-explorer-empty-title`}
                        className={`directory-explorer__empty-title`}
                    >
                        {emptySaved ? `Your collection starts here.` : `No directories found.`}
                    </h3>

                    <p
                        id={`directory-explorer-empty-description`}
                        className={`directory-explorer__empty-description`}
                    >
                        {emptySaved
                            ? `Save a directory that catches your eye. You’ll find it here while you explore.`
                            : `Try another search or clear your filters to find your next starting point.`}
                    </p>

                    <button
                        type={`button`}
                        onClick={clearFilters}
                        id={`directory-explorer-empty-reset`}
                        className={`directory-explorer__empty-reset dd-button dd-button--secondary`}
                    >
                        <span
                            id={`directory-explorer-empty-reset-label`}
                            className={`directory-explorer__empty-reset-label`}
                        >
                            {emptySaved ? `Explore all directories` : `Clear filters`}
                        </span>

                        <Icon
                            size={16}
                            name={emptySaved ? `arrow-right` : `close`}
                            id={`directory-explorer-empty-reset-icon`}
                            className={`directory-explorer__empty-reset-icon`}
                        />
                    </button>
                </div>
            )}
        </section>
    );
}
