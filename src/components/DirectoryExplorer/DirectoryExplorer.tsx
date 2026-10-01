import './DirectoryExplorer.scss';
import Icon from '../Icon/Icon';
import useDirectoryExplorer from './useDirectoryExplorer';
import DirectoryCard from '../DirectoryCard/DirectoryCard';

export default function DirectoryExplorer() {
    const {
        query,
        topic,
        status,
        topics,
        viewMode,
        setTopic,
        emptySaved,
        hasFilters,
        resultCount,
        clearFilters,
        setViewMode,
        changeStatus,
        selectedStatus,
        directoryTopic,
        changeCategory,
        categoryOptions,
        directoryStatuses,
        changeDirectoryTopic,
        selectedCategory,
        visibleDirectories,
    } = useDirectoryExplorer();

    return (
        <section
            id={`explore`}
            tabIndex={-1}
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
                        {`Directories`}
                    </h2>

                    {/* <p
                        id={`directory-explorer-subtitle`}
                        className={`directory-explorer__subtitle`}
                    >
                        {`Thoughtful collections. A good place to start.`}
                    </p> */}
                </div>

                <div
                    id={`directory-explorer-metadata`}
                    className={`directory-explorer__metadata`}
                >
                    <span
                        id={`directory-explorer-collection-label`}
                        className={`directory-explorer__collection-label dd-eyebrow`}
                    >
                        {`${resultCount} ${resultCount === 1 ? `directory` : `directories`}`}
                    </span>

                    {/* <span
                        aria-live={`polite`}
                        id={`directory-explorer-result-count`}
                        className={`directory-explorer__result-count`}
                    >
                        {`${resultCount} ${resultCount === 1 ? `directory` : `directories`}`}
                    </span> */}
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

            <div id={`directory-explorer-taxonomy`} className={`directory-explorer__taxonomy`}>
                <label id={`directory-explorer-category-label`} className={`directory-explorer__field`} htmlFor={`directory-explorer-category-select`}>
                    <span id={`directory-explorer-category-caption`} className={`directory-explorer__field-caption`}>
                        {`Category`}
                    </span>
                    <select
                        value={selectedCategory?.id ?? ``}
                        onChange={(event) => changeCategory(event.target.value)}
                        id={`directory-explorer-category-select`}
                        className={`directory-explorer__select`}
                    >
                        <option id={`directory-explorer-category-option-all`} className={`directory-explorer__option`} value={``}>
                            {`All Categories`}
                        </option>
                        {categoryOptions.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                                id={`directory-explorer-category-option-${category.id}`}
                                className={`directory-explorer__option`}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label id={`directory-explorer-topic-label`} className={`directory-explorer__field`} htmlFor={`directory-explorer-topic-select`}>
                    <span id={`directory-explorer-topic-caption`} className={`directory-explorer__field-caption`}>
                        {`Topic${selectedCategory ? ` In ${selectedCategory.label}` : ``}`}
                    </span>
                    <select
                        disabled={!selectedCategory}
                        value={directoryTopic ?? ``}
                        onChange={(event) => changeDirectoryTopic(event.target.value)}
                        id={`directory-explorer-topic-select`}
                        className={`directory-explorer__select`}
                    >
                        <option id={`directory-explorer-topic-option-all`} className={`directory-explorer__option`} value={``}>
                            {selectedCategory ? `All Topics` : `Choose A Category`}
                        </option>
                        {selectedCategory?.topics.map((topic, index) => (
                            <option
                                key={topic}
                                value={topic}
                                id={`directory-explorer-topic-option-${selectedCategory.id}-${index}`}
                                className={`directory-explorer__option`}
                            >
                                {topic}
                            </option>
                        ))}
                    </select>
                </label>
                <label id={`directory-explorer-status-label`} className={`directory-explorer__field`} htmlFor={`directory-explorer-status-select`}>
                    <span id={`directory-explorer-status-caption`} className={`directory-explorer__field-caption`}>
                        {`Status`}
                    </span>
                    <select
                        value={status ?? ``}
                        onChange={(event) => changeStatus(event.target.value)}
                        id={`directory-explorer-status-select`}
                        className={`directory-explorer__select`}
                    >
                        <option id={`directory-explorer-status-option-all`} className={`directory-explorer__option`} value={``}>
                            {`All Statuses`}
                        </option>
                        {directoryStatuses.map((status) => (
                            <option
                                key={status.id}
                                value={status.id}
                                title={status.description}
                                id={`directory-explorer-status-option-${status.id}`}
                                className={`directory-explorer__option`}
                            >
                                {status.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <p id={`directory-explorer-feedback-note`} className={`directory-explorer__feedback-note`}>
                {`New Means Recently Added Here • Your Votes And Reviews Stay On This Device`}
            </p>

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
                                name={selectedCategory.icon}
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

                    {directoryTopic && (
                        <span id={`directory-explorer-topic-filter`} className={`directory-explorer__filter`}>
                            {`#${directoryTopic.replaceAll(/[^a-zA-Z0-9]/g, ``)}`}
                        </span>
                    )}
                    {selectedStatus && (
                        <span id={`directory-explorer-status-filter`} className={`directory-explorer__filter`} title={selectedStatus.description}>
                            {selectedStatus.label}
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
