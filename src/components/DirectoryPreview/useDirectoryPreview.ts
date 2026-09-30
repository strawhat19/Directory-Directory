import { useRef, useEffect, type MouseEvent, type SyntheticEvent } from 'react';
import { useLanding } from '../../shared/landing/useLanding';

export default function useDirectoryPreview() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { selectedDirectory, closeDirectory } = useLanding();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (selectedDirectory && !dialog.open) {
            dialog.showModal();
        } else if (!selectedDirectory && dialog.open) {
            dialog.close();
        }
    }, [selectedDirectory]);

    const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault();
        closeDirectory();
    };

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === event.currentTarget) {
            closeDirectory();
        }
    };

    return {
        dialogRef,
        handleCancel,
        closeDirectory,
        selectedDirectory,
        handleBackdropClick,
    };
}
