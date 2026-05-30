import LanguageSwitcher from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import LogoTitle from '../../molecules/LogoTitle/LogoTitle';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_1px_3px_rgba(15,23,42,0.04)] backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-16 xl:px-20">
        <LogoTitle />

        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;
