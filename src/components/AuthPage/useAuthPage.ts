import type { AuthMode } from './AuthPage.types';
import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/auth/useAuth';
import { getAuthRedirect } from '../../shared/auth/redirects';
import { useLocalSearchParams, useRouter, type Href } from 'expo-router';

const fields = [
    { id: `name`, label: `Your name`, placeholder: `What should we call you?` },
    { id: `email`, label: `Email address`, placeholder: `you@example.com` },
] as const;

const pageContent = {
    [`sign-in`]: {
        icon: `log-in`,
        label: `Sign In`,
        title: `Welcome back.`,
        description: `Continue with a local demo profile saved in this browser or on this device.`,
        switchPrompt: `Need a local profile?`,
        switchLabel: `Sign Up`,
        switchIcon: `user-plus`,
    },
    [`sign-up`]: {
        icon: `user-plus`,
        label: `Sign Up`,
        title: `Make yourself at home.`,
        description: `Create a local demo profile to personalize your visit in this browser or on this device.`,
        switchPrompt: `Already have a local profile?`,
        switchLabel: `Sign In`,
        switchIcon: `log-in`,
    },
} as const;

export const authDemoNotice = `This is a local demo. Names and email addresses are saved on this browser or device. Email selects a profile without verifying ownership; no password or server account is involved. Use sample details for the demo.`;

export function useAuthPage(mode: AuthMode) {
    const router = useRouter();
    const auth = useAuth();
    const [error, setError] = useState(``);
    const [pending, setPending] = useState(false);
    const [values, setValues] = useState({ name: ``, email: `` });
    const { redirect } = useLocalSearchParams<{ redirect?: string | string[] }>();
    const destination = getAuthRedirect(redirect);

    useEffect(() => {
        if (auth.ready && auth.user) {
            router.replace(destination as Href);
        }
    }, [auth.ready, auth.user, destination, router]);

    const updateField = (field: keyof typeof values, value: string) => {
        setError(``);
        setValues((current) => ({ ...current, [field]: value }));
    };

    const submit = async () => {
        if (pending || !auth.ready) return;

        setError(``);
        setPending(true);

        try {
            if (mode === `sign-up`) {
                await auth.signUp(values.name, values.email);
            } else {
                await auth.signIn(values.email);
            }

            router.replace(destination as Href);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : `Unable to open your local profile. Please try again.`);
        } finally {
            setPending(false);
        }
    };

    return {
        error,
        values,
        submit,
        pending,
        updateField,
        ready: auth.ready,
        content: pageContent[mode],
        disabled: pending || !auth.ready,
        fields: fields.filter((field) => mode === `sign-up` || field.id === `email`),
        switchHref: {
            pathname: mode === `sign-in` ? `/sign-up` as const : `/sign-in` as const,
            params: { redirect: destination },
        },
    };
}
