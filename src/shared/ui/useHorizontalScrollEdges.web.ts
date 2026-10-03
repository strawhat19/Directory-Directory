import { useEffect, useRef, useState } from 'react';

export function useHorizontalScrollEdges() {
    const track = useRef<HTMLDivElement>(null);
    const viewport = useRef<HTMLDivElement>(null);
    const [scrollEdges, setScrollEdges] = useState({ left: false, right: false });

    useEffect(() => {
        const content = track.current;
        const container = viewport.current;
        if (!container || !content) return;

        const updateScrollEdges = () => {
            const maximum = Math.max(0, container.scrollWidth - container.clientWidth);
            const position = Math.max(0, Math.min(container.scrollLeft, maximum));
            const left = position > 1;
            const right = maximum - position > 1;

            setScrollEdges((current) => current.left === left && current.right === right
                ? current
                : { left, right });
        };

        const observer = typeof ResizeObserver === `undefined` ? null : new ResizeObserver(updateScrollEdges);
        observer?.observe(content);
        observer?.observe(container);
        updateScrollEdges();
        container.addEventListener(`scroll`, updateScrollEdges, { passive: true });
        window.addEventListener(`resize`, updateScrollEdges);

        return () => {
            observer?.disconnect();
            container.removeEventListener(`scroll`, updateScrollEdges);
            window.removeEventListener(`resize`, updateScrollEdges);
        };
    }, []);

    return { track, viewport, scrollEdges };
}
