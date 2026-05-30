import type { ReactNode } from 'react';

import Footer from '../../organisms/Footer/Footer';
import Header from '../../organisms/Header/Header';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />

      <main className="mx-auto flex-1 w-full px-4 pt-6 pb-8 sm:px-6 lg:px-16 xl:px-20">
        {children}
      </main>

      <Footer />
    </div>
  );
}
