export type DirectoryPageItem = number | `start-gap` | `end-gap`;

export const getDirectoryPageItems = (currentPage: number, totalPages: number, compact = false): DirectoryPageItem[] => {
    if (totalPages < 1) return [];
    if (totalPages <= (compact ? 3 : 7)) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const current = Math.max(1, Math.min(totalPages, currentPage));
    const start = current <= 4 ? 2 : current >= totalPages - 3 ? totalPages - 4 : current - 1;
    const end = current <= 4 ? 5 : current >= totalPages - 3 ? totalPages - 1 : current + 1;
    const pages = compact
        ? [1, Math.max(2, Math.min(totalPages - 1, current)), totalPages]
        : [1, ...Array.from({ length: end - start + 1 }, (_, index) => start + index), totalPages];
    const items: DirectoryPageItem[] = [];

    pages.forEach((page, index) => {
        const previous = pages[index - 1];
        if (previous && page - previous > 1) items.push(previous === 1 ? `start-gap` : `end-gap`);
        items.push(page);
    });

    return items;
};
