import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLanguage,
  type AppLanguage,
} from '../../../store/language.store';
import type { RootState } from '../../../store/store';

const languages: AppLanguage[] = ['tr', 'en'];

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const lang = useSelector(
    (state: RootState) => state.language.lang,
  );

  const changeLanguage = (next: AppLanguage) => {
    if (next === lang) {
      return;
    }

    dispatch(setLanguage(next));
  };

  return (
    <div
      role="group"
      aria-label={t('languageSelection')}
      className="relative inline-grid grid-cols-2 rounded-full border border-slate-200/80 bg-slate-100/90 p-0.5 sm:p-1"
    >
      <span
        aria-hidden
        className={clsx(
          'pointer-events-none absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-white sm:top-1 sm:bottom-1 sm:left-1 sm:w-[calc(50%-4px)]',
          'shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_12px_rgba(15,23,42,0.05)]',
          'transition-transform duration-200 ease-out',
          lang === 'en' && 'translate-x-full',
        )}
      />

      {languages.map((code) => {
        const isActive = lang === code;
        const labelKey =
          code === 'tr' ? 'languageTr' : 'languageEn';

        return (
          <button
            key={code}
            type="button"
            aria-pressed={isActive}
            onClick={() => changeLanguage(code)}
            className={clsx(
              'relative z-10 min-w-[2.75rem] rounded-full px-2.5 py-1 sm:min-w-[3.25rem] sm:px-4 sm:py-2',
              'text-[11px] font-bold tracking-wide sm:text-xs',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/80 focus-visible:ring-offset-2',
              isActive
                ? 'text-slate-900'
                : 'text-slate-400 hover:text-slate-600',
            )}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
