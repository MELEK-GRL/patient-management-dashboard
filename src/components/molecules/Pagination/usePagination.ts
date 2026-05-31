import { useMemo, useState } from 'react';

export const PAGE_SIZE = 10;

export function usePagination<T>(items: T[]) {
  const [page, setPage] = useState(1);
  const [prevItems, setPrevItems] = useState(items);

  if (items !== prevItems) {
    setPrevItems(items);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedItems = useMemo(
    () =>
      items.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE,
      ),
    [items, currentPage],
  );

  return {
    paginatedItems,
    page: currentPage,
    totalPages,
    setPage,
    showPagination: items.length > PAGE_SIZE,
  };
}
