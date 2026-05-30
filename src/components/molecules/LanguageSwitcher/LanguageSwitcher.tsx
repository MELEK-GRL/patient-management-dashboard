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
      className="inline-flex rounded-lg border border-slate-200 bg-slate-100/80 p-1"
    >
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
              'min-w-11 rounded-md px-3 py-1.5 text-xs font-semibold tracking-wide transition-all',
              isActive
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                : 'text-slate-500 hover:text-slate-700',
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
