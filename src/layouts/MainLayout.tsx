import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import AdBannerComponent from '../components/Ads/AdComponent';

function MainLayout() {
  return (
    <div className="bg-[#DCDCDC] min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Top Ad */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-screen-lg">
          <AdBannerComponent />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 w-full max-w-screen-lg mx-auto">
        <Outlet />
      </div>

      {/* Bottom Ad */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-screen-lg">
          <AdBannerComponent />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
