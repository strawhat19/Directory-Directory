import './DirectoryExplorer.scss';
import Icon from '../Icon/Icon';
import useDirectoryExplorer from './useDirectoryExplorer';
import DirectoryCard from '../DirectoryCard/DirectoryCard';
import DirectorySearch from '../DirectorySearch/DirectorySearch';
import { useHorizontalScrollEdges } from '../../shared/ui/useHorizontalScrollEdges.web';
import DirectoryCategoryFilters from '../DirectoryCategoryFilters/DirectoryCategoryFilters';

export default function DirectoryExplorer() {
    const { track, viewport, scrollEdges } = useHorizontalScrollEdges();
    const {
        query,
        topic,
        status,
        topics,
        mobile,
        results,
        controls,
        viewMode,
        totalPages,
        changePage,
        currentPage,
        pageItems,
        changeTopic,
        emptySaved,
        hasFilters,
        filterPanel,
        filtersOpen,
        resultCount,
        filterButton,
        clearFilters,
        setViewMode,
        changeStatus,
        setFiltersOpen,
        selectedStatus,
        directoryTopic,
        controlsStuck,
        activeFilterCount,
        directoryStatuses,
        selectedCategory,
        pagedDirectories,
    } = useDirectoryExplorer();

    return (
        <section
            id={`explore`}
            tabIndex={-1}
            aria-labelledby={`directory-explorer-title`}
            className={`directory-explorer directory-explorer--${viewMode}`}
        >
            <div
                ref={controls}
                id={`directory-explorer-sticky-controls`}
                className={`directory-explorer__sticky-controls${controlsStuck ? ` is-stuck` : ``}`}
            >
                <div
                    id={`directory-explorer-header`}
                    className={`directory-explorer__header`}
                >
                    <div
                        id={`directory-explorer-intro`}
                        className={`directory-explorer__intro`}
                    >
                        <div
                            id={`directory-explorer-title-row`}
                            className={`directory-explorer__title-row`}
                        >
                            <span
                                aria-hidden={`true`}
                                id={`directory-explorer-title-mark`}
                                className={`directory-explorer__title-mark`}
                            >
                                <Icon
                                    filled
                                    size={28}
                                    name={`folder`}
                                    id={`directory-explorer-title-icon`}
                                    className={`directory-explorer__title-icon`}
                                />
                            </span>

                            <h2
                                id={`directory-explorer-title`}
                                className={`directory-explorer__title`}
                            >
                                {`Directories`}
                            </h2>
                        </div>

                        {/* <p
                            id={`directory-explorer-subtitle`}
                            className={`directory-explorer__subtitle`}
                        >
                            {`Thoughtful collections. A good place to start.`}
                        </p> */}
                    </div>

                    <DirectorySearch
                        variant={`explorer`}
                        idPrefix={`directory-explorer-search`}
                        placeholder={mobile ? `Search ${resultCount} Directories` : `Search`}
                        className={`directory-explorer__search`}
                    />

                    <button
                        type={`button`}
                        ref={filterButton}
                        aria-expanded={filtersOpen}
                        aria-label={`Directory filters${activeFilterCount ? `, ${activeFilterCount} active` : ``}`}
                        id={`directory-explorer-filter-toggle`}
                        aria-controls={`directory-explorer-filter-row`}
                        onClick={() => setFiltersOpen((open) => !open)}
                        className={`directory-explorer__filter-toggle site-header__icon-button site-header__icon-button--secondary${activeFilterCount ? ` is-active` : ``}`}
                    >
                        <Icon
                            size={17}
                            name={`filter`}
                            id={`directory-explorer-filter-toggle-icon`}
                            className={`directory-explorer__filter-toggle-icon`}
                        />
                        {activeFilterCount > 0 ? (
                            <span
                                aria-hidden={`true`}
                                id={`directory-explorer-filter-badge`}
                                className={`directory-explorer__filter-badge site-header__notification-badge`}
                            >
                                {activeFilterCount}
                            </span>
                        ) : null}
                    </button>

                    <div
                        id={`directory-explorer-metadata`}
                        className={`directory-explorer__metadata`}
                    >
                        <span
                            aria-live={`polite`}
                            id={`directory-explorer-collection-label`}
                            className={`directory-explorer__collection-label`}
                            aria-label={`${resultCount} ${resultCount === 1 ? `directory` : `directories`}`}
                        >
                            <span
                                aria-hidden={`true`}
                                id={`directory-explorer-collection-prefix`}
                                className={`directory-explorer__collection-prefix`}
                            >
                                {`#`}
                            </span>
                            <span
                                id={`directory-explorer-collection-number`}
                                className={`directory-explorer__collection-number`}
                            >
                                {resultCount}
                            </span>
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
                    role={`group`}
                    ref={filterPanel}
                    aria-label={`Directory filters`}
                    id={`directory-explorer-filter-row`}
                    className={`directory-explorer__filter-row${filtersOpen ? ` is-open` : ``}`}
                >
                    <div id={`directory-explorer-status-group`} className={`directory-explorer__filter-group`}>
                        <span id={`directory-explorer-status-heading`} className={`directory-explorer__filter-heading`}>
                            {`Status`}
                        </span>
                        <div
                            id={`directory-explorer-toolbar`}
                            className={`directory-explorer__toolbar`}
                            data-scroll-left={scrollEdges.left ? `true` : undefined}
                            data-scroll-right={scrollEdges.right ? `true` : undefined}
                        >
                            <div
                                ref={viewport}
                                role={`group`}
                                aria-label={`Filter directories by status`}
                                id={`directory-explorer-topics`}
                                className={`directory-explorer__topics`}
                            >
                                <div
                                    ref={track}
                                    id={`directory-explorer-topics-track`}
                                    className={`directory-explorer__topics-track`}
                                >
                                    {topics.map((item) => (
                                        <button
                                            key={item.id}
                                            type={`button`}
                                            aria-pressed={!status && topic === item.label}
                                            onClick={() => changeTopic(item.label)}
                                            id={`directory-explorer-topic-${item.id}`}
                                            className={`directory-explorer__topic directory-category-filters__button${!status && topic === item.label ? ` is-active` : ``}`}
                                        >
                                            <Icon
                                                size={14}
                                                name={item.label === `All` ? `grid` : `sparkles`}
                                                id={`directory-explorer-topic-${item.id}-icon`}
                                                className={`directory-explorer__topic-icon directory-category-filters__icon`}
                                            />

                                            <span
                                                id={`directory-explorer-topic-${item.id}-label`}
                                                className={`directory-explorer__topic-label directory-category-filters__label`}
                                            >
                                                {item.label}
                                            </span>

                                            <span
                                                id={`directory-explorer-topic-${item.id}-count`}
                                                className={`directory-explorer__topic-count directory-category-filters__count`}
                                            >
                                                {item.count}
                                            </span>
                                        </button>
                                    ))}
                                    {directoryStatuses.map((item) => (
                                        <button
                                            key={item.id}
                                            type={`button`}
                                            title={item.description}
                                            aria-pressed={status === item.id}
                                            id={`directory-explorer-status-${item.id}`}
                                            onClick={() => changeStatus(status === item.id ? `` : item.id)}
                                            className={`directory-explorer__status directory-category-filters__button directory-category-filters__button--${item.tone === `gray` ? `ink` : item.tone}${status === item.id ? ` is-active` : ``}`}
                                        >
                                            <Icon
                                                size={14}
                                                name={item.icon}
                                                id={`directory-explorer-status-${item.id}-icon`}
                                                className={`directory-explorer__status-icon directory-category-filters__icon`}
                                            />
                                            <span
                                                id={`directory-explorer-status-${item.id}-label`}
                                                className={`directory-explorer__status-label directory-category-filters__label`}
                                            >
                                                {item.label}
                                            </span>
                                            <span
                                                id={`directory-explorer-status-${item.id}-count`}
                                                className={`directory-explorer__status-count directory-category-filters__count`}
                                            >
                                                {item.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* <div
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
                            </div> */}
                        </div>
                    </div>

                    <div id={`directory-explorer-category-group`} className={`directory-explorer__filter-group`}>
                        <span id={`directory-explorer-category-heading`} className={`directory-explorer__filter-heading`}>
                            {`Categories`}
                        </span>
                        <DirectoryCategoryFilters />
                    </div>

                    {/* <p id={`directory-explorer-feedback-note`} className={`directory-explorer__feedback-note`}>
                        {`New Means Recently Added Here • Your Votes And Reviews Stay On This Device`}
                    </p> */}

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
                </div>
            </div>

            {resultCount > 0 ? (
                <div
                    ref={results}
                    id={`directory-explorer-results`}
                    className={`directory-explorer__results`}
                >
                    {pagedDirectories.map((directory) => (
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

            {totalPages > 1 && (
                <nav
                    aria-label={`Directory pages`}
                    id={`directory-explorer-pagination`}
                    className={`directory-explorer__pagination`}
                >
                    <p
                        aria-live={`polite`}
                        id={`directory-explorer-pagination-summary`}
                        className={`directory-explorer__pagination-summary`}
                    >
                        {`Page ${currentPage} of ${totalPages}`}
                    </p>
                    <div
                        id={`directory-explorer-pagination-pages`}
                        className={`directory-explorer__pagination-pages`}
                    >
                        <button
                            type={`button`}
                            disabled={currentPage === 1}
                            aria-label={`Previous page`}
                            onClick={() => changePage(currentPage - 1)}
                            aria-controls={`directory-explorer-results`}
                            id={`directory-explorer-page-previous`}
                            className={`directory-explorer__page directory-explorer__page--previous dd-icon-button`}
                        >
                            <Icon
                                size={16}
                                name={`arrow-right`}
                                id={`directory-explorer-page-previous-icon`}
                                className={`directory-explorer__page-icon directory-explorer__page-icon--previous`}
                            />
                        </button>

                        {pageItems.map((page) => typeof page === `number` ? (
                            <button
                                key={page}
                                type={`button`}
                                aria-label={`Page ${page}`}
                                onClick={() => changePage(page)}
                                aria-controls={`directory-explorer-results`}
                                aria-current={currentPage === page ? `page` : undefined}
                                id={`directory-explorer-page-${page}`}
                                className={`directory-explorer__page dd-icon-button${currentPage === page ? ` is-active` : ``}`}
                            >
                                <span
                                    id={`directory-explorer-page-${page}-label`}
                                    className={`directory-explorer__page-label`}
                                >
                                    {page}
                                </span>
                            </button>
                        ) : (
                            <span
                                key={page}
                                aria-hidden={true}
                                id={`directory-explorer-page-${page}`}
                                className={`directory-explorer__page-gap`}
                            >
                                {`…`}
                            </span>
                        ))}

                        <button
                            type={`button`}
                            aria-label={`Next page`}
                            disabled={currentPage === totalPages}
                            onClick={() => changePage(currentPage + 1)}
                            aria-controls={`directory-explorer-results`}
                            id={`directory-explorer-page-next`}
                            className={`directory-explorer__page directory-explorer__page--next dd-icon-button`}
                        >
                            <Icon
                                size={16}
                                name={`arrow-right`}
                                id={`directory-explorer-page-next-icon`}
                                className={`directory-explorer__page-icon`}
                            />
                        </button>
                    </div>
                </nav>
            )}
        </section>
    );
}
