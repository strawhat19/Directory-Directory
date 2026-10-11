import { useRef, useState, useEffect } from 'react';

export function useStickySectionHeader() {
    const header = useRef<HTMLDivElement>(null);
    const [stuck, setStuck] = useState(false);

    useEffect(() => {
        const element = header.current;
        const section = element?.parentElement;
        const page = element?.closest<HTMLElement>(`.landing-page`);
        if (!element || !section || !page) return;
        let frame = 0;

        const updateStickyState = () => {
            frame = 0;
            const style = window.getComputedStyle(element);
            const inset = Number.parseFloat(style.top) || 0;
            const pinnedTop = page.getBoundingClientRect().top + page.clientTop + inset;
            const sectionPadding = Number.parseFloat(window.getComputedStyle(section).paddingTop) || 0;
            const naturalTop = section.getBoundingClientRect().top + section.clientTop + sectionPadding;
            const nextStuck = style.position === `sticky` && naturalTop < pinnedTop - 0.5
                && Math.abs(element.getBoundingClientRect().top - pinnedTop) <= 1;
            setStuck((current) => current === nextStuck ? current : nextStuck);
        };
        const scheduleUpdate = () => {
            if (!frame) frame = window.requestAnimationFrame(updateStickyState);
        };
        const observer = typeof ResizeObserver === `undefined` ? null : new ResizeObserver(scheduleUpdate);
        const shell = page.firstElementChild;
        const siteHeader = page.querySelector(`#site-header`);
        [page, shell, section, element, siteHeader].forEach((target) => {
            if (target) observer?.observe(target);
        });

        scheduleUpdate();
        page.addEventListener(`scroll`, scheduleUpdate, { passive: true });
        window.addEventListener(`resize`, scheduleUpdate);
        return () => {
            observer?.disconnect();
            window.cancelAnimationFrame(frame);
            window.removeEventListener(`resize`, scheduleUpdate);
            page.removeEventListener(`scroll`, scheduleUpdate);
        };
    }, []);

    return { stuck, header };
}
