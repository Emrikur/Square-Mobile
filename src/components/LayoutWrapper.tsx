import type { ReactNode } from 'react';
import Header from './header';
import FooterNav from './footerNav';
import AdminFooterNav from "./AdminFooterNav"
import {useAuth} from "../hooks/useAuth"

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {

const {role} = useAuth()

  return (
    <div className="app-container">
      <header className="app-header">
        <Header />
      </header>
      <main className="app-content">
        {children}
      </main>
      <footer className="app-footer">
       {role && role === "admin" ? <AdminFooterNav /> : <FooterNav />}
      </footer>
    </div>
  );
}
