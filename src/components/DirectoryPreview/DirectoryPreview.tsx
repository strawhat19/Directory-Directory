import './DirectoryPreview.scss';
import Icon from '../Icon/Icon';
import useDirectoryPreview from './useDirectoryPreview';
import DirectoryDetails from '../DirectoryDetails/DirectoryDetails';

export default function DirectoryPreview() {
  const { dialogRef, handleCancel, closeDirectory, selectedDirectory, handleBackdropClick } = useDirectoryPreview();
  const identity = selectedDirectory ? `directory-details-modal-${selectedDirectory.id}` : undefined;

  return (
    <dialog
      ref={dialogRef}
      id={`directory-preview`}
      className={`directory-preview`}
      onClose={closeDirectory}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      aria-label={`Directory Details`}
      aria-labelledby={identity ? `${identity}-title` : undefined}
      aria-describedby={identity ? `${identity}-description` : undefined}
    >
      {selectedDirectory && (
        <div id={`directory-preview-content-${selectedDirectory.id}`} className={`directory-preview__content`}>
          <div id={`directory-preview-toolbar-${selectedDirectory.id}`} className={`directory-preview__toolbar`}>
            <span id={`directory-preview-toolbar-label-${selectedDirectory.id}`} className={`directory-preview__toolbar-label`}>{`Directory Details`}</span>
            <button autoFocus type={`button`} onClick={closeDirectory} aria-label={`Close Directory Details`} id={`directory-preview-close`} className={`directory-preview__close`}>
              <Icon size={18} name={`close`} id={`directory-preview-close-icon`} className={`directory-preview__close-icon`} />
            </button>
          </div>
          <DirectoryDetails directory={selectedDirectory} scope={`modal`} onNavigate={closeDirectory} />
        </div>
      )}
    </dialog>
  );
}