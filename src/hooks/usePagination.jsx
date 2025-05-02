import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage'; // Імпортуємо наш хук

export const usePagination = (items, initialItemsPerPage = 5) => {
  // Використовуємо useLocalStorage для збереження сторінки і кількості елементів на сторінку
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
  const [itemsPerPage, setItemsPerPage] = useLocalStorage('itemsPerPage', initialItemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(1); // Після зміни кількості елементів на сторінці повертаємось на першу сторінку
  };

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
