import { HiOutlineDocumentSearch } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

import T from '../Text/T';

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-14"
      role="status"
    >
      <span
        className="
          mb-4
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-slate-50
          ring-1
          ring-slate-200
        "
      >
        <HiOutlineDocumentSearch
          className="h-10 w-10 text-slate-400"
          aria-hidden
        />
      </span>

      <T font="small" className="text-base font-normal text-slate-600">
        {t('emptyStateTitle')}
      </T>
    </div>
  );
};

export default EmptyState;
