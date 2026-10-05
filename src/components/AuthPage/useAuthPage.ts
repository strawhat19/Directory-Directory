import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../shared/auth/useAuth';
import { useLocalStorage } from '../../shared/storage/storageConfig';
import type { AuthField, AuthMode } from './AuthPage.types';

const steps = [
    { id: `name`, label: `Your name` },
    { id: `email`, label: `Your email` },
    { id: `password`, label: `Your password` },
] as const;

const inputFields = [
    { id: `name`, icon: `user-plus`, label: `Your name`, autoComplete: `name`, placeholder: `What should we call you?` },
    { id: `email`, icon: `mail`, label: `Email address`, autoComplete: `email`, placeholder: `you@example.com` },
    { id: `password`, icon: `shield`, label: `Password`, autoComplete: `new-password`, placeholder: `Choose a password` },
    { id: `confirmPassword`, icon: `shield`, label: `Confirm password`, autoComplete: `new-password`, placeholder: `Enter your password again` },
] as const;

const pageContent = {
    [`sign-in`]: {
        icon: `log-in`,
        label: `Sign In`,
        title: `Welcome back.`,
        description: `Pick up where your curiosity left off.`,
        switchPrompt: `New around here?`,
        switchLabel: `Create Account`,
        switchIcon: `user-plus`,
    },
    [`sign-up`]: {
        icon: `user-plus`,
        label: `Create Account`,
        title: `Make yourself at home.`,
        description: `A few little details, then a world of directories to discover.`,
        switchPrompt: `Already have an account?`,
        switchLabel: `Sign In`,
        switchIcon: `log-in`,
    },
} as const;

const signupContent = [
    { heading: `First, a little hello.`, description: `What name would you like on your profile?` },
    { heading: `Where can we find you?`, description: `Use your email to sign in to this account next time.` },
    { heading: `Make it yours.`, description: `Choose a password to finish setting up your account.` },
];

export const authDemoNotice = useLocalStorage
    ? `Your demo account is saved in this browser or on this device.`
    : `Connect the account service to enable sign-in and sign-up.`;

export function useAuthPage(mode: AuthMode) {
    const auth = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [error, setError] = useState(``);
    const [pending, setPending] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldError, setFieldError] = useState<AuthField | null>(null);
    const [values, setValues] = useState({ name: ``, email: ``, password: ``, confirmPassword: `` });
    const signingUp = mode === `sign-up`;
    const lastStep = step === steps.length - 1;
    const content = pageContent[mode];

    useEffect(() => {
        if (auth.ready && auth.user) router.replace(`/`);
    }, [auth.ready, auth.user, router]);

    useEffect(() => {
        setStep(0);
        setError(``);
        setFieldError(null);
        setShowPassword(false);
        setValues({ name: ``, email: ``, password: ``, confirmPassword: `` });
        auth.clearError();
    }, [mode]);

    const updateField = (field: AuthField, value: string) => {
        setError(``);
        setFieldError(null);
        auth.clearError();
        setValues((current) => ({ ...current, [field]: value }));
    };

    const fail = (field: AuthField, message: string) => {
        setError(message);
        setFieldError(field);
        return false;
    };

    const validate = (currentStep: number) => {
        if (signingUp && currentStep === 0 && !values.name.trim()) {
            return fail(`name`, `Enter Your Name`);
        }
        if ((!signingUp || currentStep === 1) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
            return fail(`email`, `Enter A Valid Email Address`);
        }
        if ((!signingUp || currentStep === 2) && !values.password) {
            return fail(`password`, `Enter A Password`);
        }
        if (signingUp && currentStep === 2 && values.password !== values.confirmPassword) {
            return fail(`confirmPassword`, `Passwords Do Not Match`);
        }
        return true;
    };

    const submit = async () => {
        if (pending || auth.busy || !auth.ready) return;
        setError(``);
        setFieldError(null);
        auth.clearError();
        if (!validate(step)) return;
        if (signingUp && !lastStep) {
            setStep((current) => current + 1);
            return;
        }

        setPending(true);
        try {
            if (signingUp) await auth.signUp(values.name.trim(), values.email.trim(), values.password);
            else await auth.signIn(values.email.trim(), values.password);
            setValues({ name: ``, email: ``, password: ``, confirmPassword: `` });
            router.replace(`/`);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : `Could Not Access Your Account`);
        } finally {
            setPending(false);
        }
    };

    const back = () => {
        if (pending) return;
        setError(``);
        setFieldError(null);
        auth.clearError();
        setStep((current) => Math.max(0, current - 1));
    };

    const fields = inputFields.filter((field) => signingUp
        ? step === 0 ? field.id === `name` : step === 1 ? field.id === `email` : field.id === `password` || field.id === `confirmPassword`
        : field.id === `email` || field.id === `password`);

    return {
        back,
        step,
        steps,
        values,
        fields,
        submit,
        content,
        pending,
        lastStep,
        fieldError,
        signingUp,
        updateField,
        showPassword,
        ready: auth.ready,
        error: error || auth.error,
        disabled: pending || auth.busy || !auth.ready,
        togglePassword: () => setShowPassword((current) => !current),
        switchHref: signingUp ? `/sign-in` as const : `/sign-up` as const,
        progressLabel: `Step ${step + 1} of ${steps.length}`,
        heading: signingUp ? signupContent[step].heading : content.title,
        description: signingUp ? signupContent[step].description : content.description,
        submitLabel: pending ? signingUp ? `Creating Account…` : `Signing In…` : signingUp && !lastStep ? `Continue` : content.label,
    };
}
