import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar/Navbar';
import { Footer } from '@/components/common/Footer/Footer';
import { useHashScroll } from '@/hooks/useHashScroll';

export const Mainlayout: React.FC = () => {
  useHashScroll();

  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f10] text-white selection:bg-[#E50914] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
