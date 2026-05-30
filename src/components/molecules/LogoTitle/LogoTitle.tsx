import { useTranslation } from 'react-i18next';

import { colors } from '../../../styles/colors';

const LogoTitle = () => {
  const { t } = useTranslation();

  return (
    <h1
      className="inline-flex flex-wrap items-baseline gap-x-1 sm:gap-x-1.5"
      aria-label={t('appTitle')}
    >
      <span
        className="text-xl font-bold tracking-tight sm:text-2xl"
        style={{ color: colors.buttonPrimary }}
      >
        {t('logoPrimary')}
      </span>

      <span
        className="text-xl font-medium tracking-tight sm:text-2xl"
        style={{ color: colors.buttonSecondary }}
      >
        {t('logoSecondary')}
      </span>

      <span
        className="text-xl font-semibold tracking-tight sm:text-2xl"
        style={{ color: colors.buttonSecondary }}
      >
        {t('logoAccent')}
      </span>
    </h1>
  );
};

export default LogoTitle;
