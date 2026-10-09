import './DirectorySearch.scss';
import Icon from '../Icon/Icon';
import { useDirectorySearch } from './useDirectorySearch';
import type { DirectorySearchProps } from './DirectorySearch.types';

export default function DirectorySearch({
    idPrefix,
    onSearch,
    className = ``,
    variant = `hero`,
    submitLabel = `Search`,
    placeholder = `Directories, etc.`,
}: DirectorySearchProps) {
    const {
        query,
        isOpen,
        formRef,
        inputRef,
        focusInput,
        activeIndex,
        suggestions,
        changeQuery,
        clearSearch,
        leaveSearch,
        submitSearch,
        matchingCount,
        categoryById,
        setActiveIndex,
        activeDirectory,
        selectDirectory,
        removeDirectory,
        selectedDirectories,
        navigateSuggestions,
    } = useDirectorySearch(idPrefix, onSearch);
    const resultLabel = matchingCount === 1 ? `directory` : `directories`;
    const countLabel = matchingCount > suggestions.length
        ? `${suggestions.length} of ${matchingCount}`
        : `${matchingCount}`;
    const suggestionSummary = matchingCount
        ? `${countLabel} ${resultLabel} · select multiple`
        : `No matching directories`;

    return (
        <form
            ref={formRef}
            role={`search`}
            onBlur={leaveSearch}
            id={`${idPrefix}-form`}
            onSubmit={submitSearch}
            className={`directory-search directory-search--${variant} ${isOpen ? `directory-search--open` : ``} ${className}`.trim()}
        >
            <label
                htmlFor={`${idPrefix}-input`}
                id={`${idPrefix}-label`}
                className={`directory-search__label dd-visually-hidden`}
            >
                {`Search and select directories`}
            </label>
            <Icon
                size={20}
                name={`search`}
                id={`${idPrefix}-icon`}
                className={`directory-search__icon`}
            />
            <div id={`${idPrefix}-field`} className={`directory-search__field`}>
                {selectedDirectories.length > 0 && (
                    <div
                        role={`group`}
                        aria-label={`Selected directories`}
                        id={`${idPrefix}-selections`}
                        className={`directory-search__selections`}
                    >
                        {selectedDirectories.map((entry) => (
                            <span
                                key={entry.id}
                                title={entry.name}
                                id={`${idPrefix}-selection-${entry.id}`}
                                className={`directory-search__selection`}
                            >
                                <span
                                    id={`${idPrefix}-selection-${entry.id}-label`}
                                    className={`directory-search__selection-label`}
                                >
                                    {entry.name}
                                </span>
                                <button
                                    type={`button`}
                                    onClick={() => removeDirectory(entry.id)}
                                    aria-label={`Remove ${entry.name} from search`}
                                    id={`${idPrefix}-selection-${entry.id}-remove`}
                                    className={`directory-search__selection-remove`}
                                >
                                    <Icon
                                        size={12}
                                        name={`close`}
                                        id={`${idPrefix}-selection-${entry.id}-remove-icon`}
                                        className={`directory-search__selection-remove-icon`}
                                    />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <input
                    type={`text`}
                    value={query}
                    ref={inputRef}
                    role={`combobox`}
                    autoComplete={`off`}
                    onFocus={focusInput}
                    onClick={focusInput}
                    aria-expanded={isOpen}
                    aria-autocomplete={`list`}
                    id={`${idPrefix}-input`}
                    placeholder={placeholder}
                    aria-haspopup={`listbox`}
                    onKeyDown={navigateSuggestions}
                    className={`directory-search__input`}
                    aria-controls={`${idPrefix}-options`}
                    onChange={(event) => changeQuery(event.target.value)}
                    aria-activedescendant={activeDirectory ? `${idPrefix}-option-${activeDirectory.id}` : undefined}
                />
            </div>
            {(query || selectedDirectories.length > 0) && (
                <button
                    type={`button`}
                    onClick={clearSearch}
                    aria-label={`Clear directory search`}
                    id={`${idPrefix}-clear`}
                    className={`directory-search__clear`}
                >
                    <Icon
                        size={14}
                        name={`close`}
                        id={`${idPrefix}-clear-icon`}
                        className={`directory-search__clear-icon`}
                    />
                </button>
            )}
            <button
                type={`submit`}
                id={`${idPrefix}-submit`}
                aria-label={`${submitLabel} directories`}
                className={`directory-search__submit dd-button dd-button--primary`}
            >
                <span
                    id={`${idPrefix}-submit-label`}
                    className={`directory-search__submit-label`}
                >
                    {submitLabel}
                </span>
                <Icon
                    size={17}
                    name={`arrow-right`}
                    id={`${idPrefix}-submit-icon`}
                    className={`directory-search__submit-icon`}
                />
            </button>
            {isOpen && (
                <div id={`${idPrefix}-menu`} className={`directory-search__menu`}>
                    <p
                        role={`status`}
                        aria-live={`polite`}
                        id={`${idPrefix}-suggestion-summary`}
                        className={`directory-search__summary`}
                    >
                        {suggestionSummary}
                    </p>
                    <div
                        role={`listbox`}
                        aria-multiselectable={true}
                        aria-label={`Directory suggestions`}
                        id={`${idPrefix}-options`}
                        className={`directory-search__options`}
                    >
                        {suggestions.map((entry, index) => (
                            <button
                                key={entry.id}
                                type={`button`}
                                role={`option`}
                                tabIndex={-1}
                                title={entry.name}
                                aria-selected={false}
                                onClick={() => selectDirectory(entry.id)}
                                onMouseEnter={() => setActiveIndex(index)}
                                onPointerDown={(event) => event.preventDefault()}
                                id={`${idPrefix}-option-${entry.id}`}
                                className={`directory-search__option ${activeIndex === index ? `is-active` : ``}`.trim()}
                            >
                                <Icon
                                    size={16}
                                    name={`plus`}
                                    id={`${idPrefix}-option-${entry.id}-icon`}
                                    className={`directory-search__option-icon`}
                                />
                                <span
                                    id={`${idPrefix}-option-${entry.id}-name`}
                                    className={`directory-search__option-name`}
                                >
                                    {entry.name}
                                </span>
                                <span
                                    id={`${idPrefix}-option-${entry.id}-category`}
                                    className={`directory-search__option-category`}
                                >
                                    {categoryById.get(entry.category)?.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </form>
    );
}
