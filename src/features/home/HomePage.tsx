import React from 'react';
import { HeroSection } from './HeroSection';
import { WhoWeAre } from './WhoWeAre';
import { GelpLayersBand } from './GelpLayersBand';
import { WhyGelp } from './WhyGelp';
import { ThreeTierSection } from './ThreeTierSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-[#f3f0e8]">
      {/* 1. Hero Section: Split 50/50 with India Map */}
      <HeroSection />

      {/* 2. Section 1: Who We Are (Redesigned) */}
      <WhoWeAre />

      {/* What sits inside GELP: dark band with the four operational layers */}
      <GelpLayersBand />

      {/* 3. Section 2: Why Chasehorse G.E.L.P.? (Redesigned) */}
      <WhyGelp />

      {/* 4. Our Service Categories (Tier 1, Tier 2, Tier 3) */}
      <ThreeTierSection />
    </div>
  );
};

export default HomePage;
