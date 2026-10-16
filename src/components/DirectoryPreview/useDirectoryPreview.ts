import { useLanding } from '../../shared/landing/useLanding';
import { useIsFocused, useFocusEffect } from 'expo-router';
import { useRef, useEffect, useCallback, type MouseEvent, type SyntheticEvent } from 'react';

export default function useDirectoryPreview() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const isFocused = useIsFocused();
    const { selectedDirectory, closeDirectory: clearDirectory } = useLanding();
    const closeDirectory = useCallback(() => {
        if (dialogRef.current?.open) dialogRef.current.close();
        clearDirectory();
    }, [clearDirectory]);

    useFocusEffect(useCallback(() => () => closeDirectory(), [closeDirectory]));

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isFocused && selectedDirectory) {
            if (!dialog.open) dialog.showModal();
        } else if (dialog.open) {
            dialog.close();
        }
    }, [isFocused, selectedDirectory]);

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
