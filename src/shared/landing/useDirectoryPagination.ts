import { useState, useEffect } from 'react';

export default function useDirectoryPagination<T>(
    directories: readonly T[],
    columnCount: number,
    filterKey: string,
) {
    const pageSize = 3 * columnCount;
    const pageKey = `${columnCount}:${filterKey}`;
    const totalPages = Math.ceil(directories.length / pageSize);
    const lastPage = Math.max(1, totalPages);
    const [page, updatePage] = useState({ key: pageKey, number: 1 });
    const currentPage = Math.min(lastPage, page.key === pageKey ? page.number : 1);
    const startIndex = (currentPage - 1) * pageSize;
    const pagedDirectories = directories.slice(startIndex, startIndex + pageSize);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    useEffect(() => {
        updatePage((current) => {
            const number = current.key === pageKey ? Math.min(current.number, lastPage) : 1;
            return current.key === pageKey && current.number === number ? current : { key: pageKey, number };
        });
    }, [pageKey, lastPage]);

    const setPage = (number: number) => {
        updatePage({
            key: pageKey,
            number: Math.max(1, Math.min(lastPage, number)),
        });
    };

    return { pagedDirectories, currentPage, totalPages, pageNumbers, setPage };
}
