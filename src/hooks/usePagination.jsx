import { useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const usePagination = (items, initialItemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
  const [itemsPerPage, setItemsPerPage] = useLocalStorage('itemsPerPage', initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(1);
  };


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [items.length, totalPages]);

  return {
    paginatedItems,
    currentPage,
    itemsPerPage,
    totalPages,
    setItemsPerPage: handleItemsPerPageChange,
    setCurrentPage: goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};
