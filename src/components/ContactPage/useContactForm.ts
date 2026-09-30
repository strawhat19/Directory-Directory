import { useState } from 'react';

export const contactFields = [
    { id: `name`, label: `Your name`, placeholder: `What should we call you?` },
    { id: `email`, label: `Email address`, placeholder: `you@example.com` },
    { id: `message`, label: `Your message`, placeholder: `An idea, a question, or a good find…` },
] as const;

type ContactValues = {
    name: string;
    email: string;
    message: string;
};

export function useContactForm() {
    const [status, setStatus] = useState(``);
    const [preview, setPreview] = useState<ContactValues | null>(null);
    const [values, setValues] = useState<ContactValues>({ name: ``, email: ``, message: `` });

    const updateField = (field: keyof ContactValues, value: string) => {
        setStatus(``);
        setPreview(null);
        setValues((current) => ({ ...current, [field]: value }));
    };

    const previewMessage = () => {
        const draft = {
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
        };

        if (!draft.name || !draft.email || !draft.message) {
            setStatus(`Add your name, email, and message to preview your note.`);
            return;
        }

        setPreview(draft);
        setStatus(`This is a local preview. Nothing has been sent.`);
    };

    return {
        status,
        values,
        preview,
        updateField,
        previewMessage,
    };
}
