import React from 'react';
import { JobsBoard } from './JobsBoard';

export const CareersPage: React.FC = () => {

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero */}
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● CAREERS AT CHASEHORSE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Build the Physical & Digital Backbone of Indian Logistics
            </h1>
            <p className="text-sm sm:text-base text-[#E2DED5]/90 leading-relaxed font-light">
              Join a team solving critical infrastructure challenges with software engineering, ground operational rigor, and human dignity.
            </p>
          </div>
        </div>

        {/* Culture & Perks */}
        <CultureCards />

        <JobsBoard />

      </div>


    </div>
  );
};

/** Culture & benefits cards — shared by the Careers page and the Culture & Benefits page. */
export const CultureCards: React.FC = () => (
    <div id="culture" className="grid grid-cols-1 md:grid-cols-3 gap-6 scroll-mt-24">
      <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-3 shadow-sm">
        <h3 className="font-bold text-base text-[#171717]">Comprehensive Healthcare</h3>
        <p className="text-xs text-[#625E58] leading-relaxed">
          Family health insurance, annual wellness checkups, and accidental coverage for every team member from dock lead to engineer.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-3 shadow-sm">
        <h3 className="font-bold text-base text-[#171717]">Stock Ownership (ESOPs)</h3>
        <p className="text-xs text-[#625E58] leading-relaxed">
          Meaningful equity grants across engineering, product, and regional operations leadership roles.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-3 shadow-sm">
        <h3 className="font-bold text-base text-[#171717]">Rapid Meritocracy</h3>
        <p className="text-xs text-[#625E58] leading-relaxed">
          Clear milestone-driven promotions. Over 40% of our zonal leadership began as on-ground dock leads.
        </p>
      </div>
    </div>
);
