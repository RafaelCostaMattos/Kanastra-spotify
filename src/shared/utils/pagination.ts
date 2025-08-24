export const paginate = <T>(items: T[], currentPage: number, itemsPerPage: number): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
};

export const totalPages = (items: any[], itemsPerPage: number): number => {
    return Math.ceil(items.length / itemsPerPage);
};