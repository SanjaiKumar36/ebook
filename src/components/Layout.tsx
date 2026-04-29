import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-purple/20 overflow-x-hidden bg-white relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(237,233,254,0.3)_0%,transparent_50%),radial-gradient(circle_at_100%_100%,rgba(251,191,36,0.05)_0%,transparent_50%)] pointer-events-none" />
      <Navbar />
      
      <main className="relative z-10 min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
