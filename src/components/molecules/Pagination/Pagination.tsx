import clsx from 'clsx';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

import { getPaginationItems } from '../../../utils/paginationItems';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const iconButtonClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:pointer-events-none disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-300';

const pageButtonClass = (isActive: boolean) =>
  clsx(
    'flex h-8 min-w-8 shrink-0 items-center justify-center rounded-md px-2 text-sm transition-colors',
    isActive
      ? 'bg-blue-600 font-medium text-white'
      : 'text-slate-600 hover:bg-slate-100',
  );

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const { t } = useTranslation();

  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems(page, totalPages);

  return (
    <nav
      aria-label={t('paginationLabel')}
      className={clsx(
        'flex max-w-full justify-center overflow-x-auto',
        className,
      )}
    >
      <div className="flex items-center gap-1 px-1">
        <button
          type="button"
          aria-label={t('paginationPrevious')}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className={iconButtonClass}
        >
          <HiOutlineChevronLeft className="h-4 w-4" />
        </button>

        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-8 w-6 shrink-0 items-center justify-center text-sm text-slate-400"
              aria-hidden
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={t('paginationPage', { page: item })}
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onPageChange(item)}
              className={pageButtonClass(item === page)}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label={t('paginationNext')}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className={iconButtonClass}
        >
          <HiOutlineChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
