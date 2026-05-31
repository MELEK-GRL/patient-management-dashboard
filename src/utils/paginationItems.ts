export type PaginationItem = number | 'ellipsis';

export function getPaginationItems(
  page: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
    .sort((a, b) => a - b);

  const items: PaginationItem[] = [];

  pages.forEach((pageNumber, index) => {
    const previous = pages[index - 1];

    if (previous && pageNumber - previous > 1) {
      items.push('ellipsis');
    }

    items.push(pageNumber);
  });

  return items;
}
