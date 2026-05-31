import { HiOutlineSearch } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

import { sanitizeNameInput } from '../../../utils/inputValidation';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full focus-within:[&_svg]:text-slate-500">
      <HiOutlineSearch
        className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        aria-hidden
      />

      <input
        type="search"
        value={value}
        placeholder={t('searchPlaceholder')}
        onChange={(e) => onChange(sanitizeNameInput(e.target.value))}
        aria-label={t('searchAriaLabel')}
        className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-none outline-none ring-0 transition-colors placeholder:text-slate-400 focus:border-[#CBD5E1] focus:shadow-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
};

export default SearchInput;
