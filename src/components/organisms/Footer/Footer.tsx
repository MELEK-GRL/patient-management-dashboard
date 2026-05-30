import { useTranslation } from 'react-i18next';

import T from '../../atoms/Text/T';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white shadow-[0_-4px_20px_-8px_rgba(15,23,42,0.08)]">
      <div className="mx-auto px-4 py-5 sm:px-6 lg:px-16 xl:px-20">
        <T
          as="span"
          font="xsmall"
          className="block text-center font-bold tracking-wide text-slate-500"
        >
          {t('appTitle')}
        </T>
      </div>
    </footer>
  );
};

export default Footer;
