import './DirectoryPreview.scss';
import Icon from '../Icon/Icon';
import useDirectoryPreview from './useDirectoryPreview';
import { categories } from '../../shared/catalog/catalog';
import { useLanding } from '../../shared/landing/useLanding';

export default function DirectoryPreview() {
    const { savedIds, toggleSaved } = useLanding();
    const {
        dialogRef,
        handleCancel,
        closeDirectory,
        selectedDirectory,
        handleBackdropClick,
    } = useDirectoryPreview();

    const saved = selectedDirectory ? savedIds.includes(selectedDirectory.id) : false;
    const category = categories.find((item) => item.id === selectedDirectory?.category);

    return (
        <dialog
            ref={dialogRef}
            id={`directory-preview`}
            className={`directory-preview`}
            onClose={closeDirectory}
            onCancel={handleCancel}
            onClick={handleBackdropClick}
            aria-labelledby={`directory-preview-title`}
            aria-describedby={`directory-preview-summary`}
        >
            {selectedDirectory && (
                <div
                    id={`directory-preview-content-${selectedDirectory.id}`}
                    className={`directory-preview__content directory-preview__content--${selectedDirectory.accent}`}
                >
                    <button
                        autoFocus
                        type={`button`}
                        onClick={closeDirectory}
                        aria-label={`Close directory preview`}
                        id={`directory-preview-close`}
                        className={`directory-preview__close dd-icon-button`}
                    >
                        <Icon
                            size={20}
                            name={`close`}
                            id={`directory-preview-close-icon`}
                            className={`directory-preview__close-icon`}
                        />
                    </button>

                    <span
                        aria-hidden={true}
                        id={`directory-preview-monogram`}
                        className={`directory-preview__monogram`}
                    >
                        {selectedDirectory.initials}
                    </span>

                    <span
                        id={`directory-preview-category`}
                        className={`directory-preview__category dd-eyebrow`}
                    >
                        <Icon
                            size={13}
                            name={selectedDirectory.category}
                            id={`directory-preview-category-icon`}
                            className={`directory-preview__category-icon`}
                        />

                        <span
                            id={`directory-preview-category-label`}
                            className={`directory-preview__category-label`}
                        >
                            {category?.label}
                        </span>
                    </span>

                    <h2
                        id={`directory-preview-title`}
                        className={`directory-preview__title`}
                    >
                        {selectedDirectory.name}
                    </h2>

                    <p
                        id={`directory-preview-label`}
                        className={`directory-preview__label`}
                    >
                        {selectedDirectory.label}
                    </p>

                    <p
                        id={`directory-preview-summary`}
                        className={`directory-preview__summary`}
                    >
                        {selectedDirectory.summary}
                    </p>

                    <div
                        id={`directory-preview-sample-note`}
                        className={`directory-preview__sample-note`}
                    >
                        <Icon
                            size={17}
                            name={`globe`}
                            id={`directory-preview-sample-icon`}
                            className={`directory-preview__sample-icon`}
                        />

                        <p
                            id={`directory-preview-sample-description`}
                            className={`directory-preview__sample-description`}
                        >
                            {`This is a sample listing in the Directory Directory collection.`}
                        </p>
                    </div>

                    <button
                        type={`button`}
                        aria-pressed={saved}
                        id={`directory-preview-save`}
                        onClick={() => toggleSaved(selectedDirectory.id)}
                        className={`directory-preview__save dd-button dd-button--${saved ? `secondary` : `primary`}`}
                    >
                        <Icon
                            size={18}
                            name={saved ? `check` : `bookmark`}
                            id={`directory-preview-save-icon`}
                            className={`directory-preview__save-icon`}
                        />

                        <span
                            id={`directory-preview-save-label`}
                            className={`directory-preview__save-label`}
                        >
                            {saved ? `Saved to your collection` : `Save directory`}
                        </span>
                    </button>

                    <p
                        id={`directory-preview-save-note`}
                        className={`directory-preview__save-note`}
                    >
                        {`Your saved collection stays here for this session.`}
                    </p>
                </div>
            )}
        </dialog>
    );
}
