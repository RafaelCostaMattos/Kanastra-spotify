import { useState } from 'react';

const usePagination = (itemsPerPage: number, items: any[]) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const resetPagination = () => {
        setCurrentPage(1);
    };

    const currentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };

    return {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        resetPagination,
        currentItems,
    };
};

export default usePagination;