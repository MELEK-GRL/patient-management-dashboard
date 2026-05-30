import { useTranslation } from 'react-i18next';

import { colors } from '../../../styles/colors';

const LogoTitle = () => {
  const { t } = useTranslation();

  return (
    <h1
      className="min-w-0 text-left text-lg leading-snug sm:text-xl lg:text-2xl"
      aria-label={t('appTitle')}
    >
      <span
        className="block font-bold tracking-tight sm:inline"
        style={{ color: colors.buttonPrimary }}
      >
        {t('logoPrimary')}
      </span>{' '}
      <span
        className="block font-medium tracking-tight sm:inline"
        style={{ color: colors.buttonSecondary }}
      >
        {t('logoSecondary')}{' '}
        <span className="font-semibold">{t('logoAccent')}</span>
      </span>
    </h1>
  );
};

export default LogoTitle;
