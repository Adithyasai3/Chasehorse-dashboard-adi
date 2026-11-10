import React from 'react';
import { HeroSection } from './HeroSection';
import { GelpLayersBand } from './GelpLayersBand';
import { ThreeTierSection } from './ThreeTierSection';
import { IndiaLogisticsNetwork } from '../discover/network/IndiaLogisticsNetwork';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-[#f3f0e8]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* What sits inside GELP: dark band with the four operational layers */}
      <GelpLayersBand />

      {/* 2. Our Service Categories (Tier 1, Tier 2, Tier 3) */}
      <ThreeTierSection />

      {/* 3. India Logistics Network */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <IndiaLogisticsNetwork />
      </div>
    </div>
  );
};

export default HomePage;
