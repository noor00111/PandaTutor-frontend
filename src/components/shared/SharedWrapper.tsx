'use client';

import Navbar from './Navbar';
import Footer from './Footer';

export default function SharedWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar />
      <main className="flex-1 w-full relative z-0">{children}</main>
      <Footer />
    </div>
  );
}