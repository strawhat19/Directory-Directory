import { useEffect, useState } from 'react';

export const authStories = [
    {
        title: `Follow your curiosity.`,
        accent: `Find something good.`,
        description: `Useful tools, thoughtful collections, and places you have yet to discover. All filed in one place.`,
    },
    {
        title: `Less searching.`,
        accent: `More discovering.`,
        description: `Explore directories by topic and turn a little inspiration into your next favorite find.`,
    },
    {
        title: `A place for you.`,
        accent: `And your next idea.`,
        description: `Start with your own account. Keep exploring the internet, one thoughtful collection at a time.`,
    },
];

export const useAuthStory = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(true);

    useEffect(() => {
        const preference = window.matchMedia(`(prefers-reduced-motion: reduce)`);
        const update = () => setReducedMotion(preference.matches);
        update();
        preference.addEventListener(`change`, update);
        return () => preference.removeEventListener(`change`, update);
    }, []);

    useEffect(() => {
        if (paused || focused || hovered || reducedMotion) return;
        const interval = window.setInterval(() => setActive((current) => (current + 1) % authStories.length), 7500);
        return () => window.clearInterval(interval);
    }, [paused, focused, hovered, reducedMotion]);

    const select = (index: number) => {
        setPaused(true);
        setActive(index);
    };

    return { active, paused, select, setPaused, setFocused, setHovered, stories: authStories };
};
