import type { ReactNode } from 'react';
import Header from './header';
import FooterNav from './footerNav';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="app-container">
      <header className="app-header">
        <Header />
      </header>
      <main className="app-content">
        {children}
      </main>
      <footer className="app-footer">
        <FooterNav />
      </footer>
    </div>
  );
}
