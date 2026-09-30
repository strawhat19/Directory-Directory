import { useContext } from 'react';
import { LandingContext } from './LandingProvider';

export function useLanding() {
    const context = useContext(LandingContext);

    if (!context) {
        throw new Error(`useLanding must be used within LandingProvider.`);
    }

    return context;
}
