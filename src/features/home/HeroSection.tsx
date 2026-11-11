import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroTrackEnquiry } from './HeroTrackEnquiry';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ChevronRight,
  ExternalLink,
  Building2,
  Check
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F4F1EA] pt-8 pb-16 lg:pt-12 lg:pb-20 overflow-hidden border-b border-[#E2DED5]">
      
      {/* Background Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D5CEBE 1.2px, transparent 1.2px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= 2-COLUMN HERO: content (left) + Track / Enquiry card (right) ================= */}
        {/* The India map now lives on Discover → Find Us */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Editorial Headline */}
            <div className="space-y-4">
              {/* Sub-headline (sits above the headline) */}
              <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-base sm:text-lg lg:text-xl font-bold text-[#171717] tracking-tight">
                <span className="font-mono text-[#FF4D16]">GELP</span>
                <span aria-hidden className="text-[#8C877D]">&ndash;</span>
                <span>Growth Enabled Logiworkx Platform</span>
              </p>
              <h1 className="text-[#171717]">
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-hero font-extrabold text-[34px] sm:text-[52px] lg:text-[44px] xl:text-[54px] leading-[1.02] tracking-[-0.035em]"
                >
                  India&rsquo;s First
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-1 inline-flex flex-col"
                >
                  <span className="font-serif italic font-normal text-[#FF4D16] text-[40px] min-[400px]:text-[44px] sm:text-[68px] lg:text-[56px] xl:text-[70px] leading-[0.98] tracking-[-0.02em] pr-2">
                    Muscled Supply Chain
                  </span>
                  <span className="font-hero font-extrabold text-[#171717] text-[34px] sm:text-[52px] lg:text-[44px] xl:text-[54px] leading-[1.02] tracking-[-0.035em]">
                    Network.
                  </span>

                  {/* Route: origin → line draws in once → delivered */}
                  <span aria-hidden className="mt-3 sm:mt-4 flex items-center gap-2">
                    <span className="shrink-0 w-3 h-3 rounded-full border-[2.5px] border-[#FF4D16] bg-[#F4F1EA]" />

                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.9, delay: 0.45, ease: [0.65, 0, 0.35, 1] }}
                      className="flex-1 h-[2px] origin-left rounded-full bg-[#171717]"
                    />

                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex shrink-0 items-center justify-center w-5 h-5 rounded-full bg-[#FF4D16] text-white ring-4 ring-[#FF4D16]/15"
                    >
                      <Check className="w-3 h-3" strokeWidth={3.5} />
                    </motion.span>
                  </span>
                </motion.span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[15px] sm:text-base lg:text-[17px] text-[#625E58] leading-[1.7] max-w-xl">
              <strong className="font-bold text-[#171717]">ChaseHorse</strong> brings together ready-to-deploy vetted on-ground talent, intelligent logistics tech, sustainability frameworks and an established market ecosystem seamlessly integrated to scale your operations without bottlenecks, at the best cost and with a high-CX model, enabling businesses to scale rapidly.
            </p>

            {/* The 4 Core Capability Pillars (From Odoo Website in Image 1 & 2) */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#8C877D] font-bold block">
                Integrated Operational Layers:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                  <span>Human Interface +</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                  <span>Technology +</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" />
                  <span>ESG-Sustainability +</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#FF4D16] transition-colors flex items-center space-x-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
                  <span>Market Integrated</span>
                </span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/discover/network"
                className="w-full sm:w-auto justify-center px-6 py-3.5 bg-[#FF4D16] hover:bg-[#E53E0B] text-white font-bold rounded-xl text-sm flex items-center space-x-2 shadow-lg shadow-[#FF4D16]/25 transition-all group"
              >
                <span>Explore the Network</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/partners"
                className="group/partner w-full sm:w-auto justify-center px-5 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#171717] border border-[#E2DED5] hover:border-[#171717] font-bold rounded-xl text-sm inline-flex items-center gap-2 transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D16]"
              >
                <span>Partner with GELP</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/partner:translate-x-0.5 motion-reduce:transition-none" />
              </Link>
            </div>

          </div>

          {/* ================= RIGHT: LIVE + TRACK ================= */}
          <div className="lg:col-span-5">
            <HeroTrackEnquiry />
          </div>

        </div>

      </div>
    </section>
  );
};
