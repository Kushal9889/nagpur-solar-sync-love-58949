import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  // Determine active section based on path for Navigation highlighting if needed
  // This might need adjustment based on how Navigation expects activeSection
  const getActiveSection = (pathname: string) => {
    if (pathname === '/') return 'home';
    return pathname.substring(1); // e.g. '/plans' -> 'plans'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] flex flex-col">
      <Navigation 
        activeSection={getActiveSection(location.pathname)} 
        // onSectionChange is no longer needed for routing, but Navigation might need it for UI state
        // We will refactor Navigation to use Links
        onSectionChange={() => {}} 
      />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
