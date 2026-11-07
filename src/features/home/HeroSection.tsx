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
  Zap,
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
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-[#FF4D16] uppercase">
              <span className="w-2.5 h-2.5 border-2 border-[#FF4D16] rounded-sm bg-[#FF4D16]/20 inline-block" />
              <span>LOGISTICS &amp; SUPPLY CHAIN · INDIA</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-5">
              <h1 className="text-[#171717]">
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-hero font-extrabold text-[32px] sm:text-[50px] lg:text-[40px] xl:text-[50px] leading-[1.02] tracking-[-0.035em]"
                >
                  You grow the business.
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-1 inline-flex flex-col"
                >
                  <span className="font-serif italic font-normal text-[#FF4D16] text-[54px] sm:text-[80px] lg:text-[68px] xl:text-[86px] leading-[0.95] tracking-[-0.02em] pr-2">
                    We move it.
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

                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="mt-2 flex items-center justify-between gap-3 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] whitespace-nowrap"
                  >
                    <span className="text-[#8C877D]">First mile</span>
                    <span className="text-[#FF4D16]">Every mile tracked</span>
                    <span className="text-[#171717]">Last mile, done</span>
                  </motion.span>
                </motion.span>
              </h1>
              <div className="text-sm sm:text-base font-mono font-bold text-[#FF4D16]">
                Growth Enabler Logiworkx Platform [ GELP ]
              </div>
            </div>

            {/* Subtitle Paragraph (From Who We Are in Image 2) */}
            <p className="text-sm sm:text-base text-[#625E58] leading-relaxed max-w-xl">
              From warehousing and fleet management to freight and last-mile delivery, Chasehorse handles your logistics end to end. Our Logistics-as-a-Service (LaaS) platform gives you a plug-and-play setup with ready-to-deploy resources. One partner, one platform, full visibility.
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

            {/* Onboarding Thunderspeed Strip (From Image 3) */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E2DED5] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs shadow-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[#FF4D16] fill-[#FF4D16]/20" />
                <span className="font-bold text-[#171717]">Thunderspeed Onboarding:</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-mono">
                <span className="text-[#FF4D16] font-bold">24h Tier 1 Strategy Deployment</span>
                <span className="hidden sm:inline text-[#8C877D]">•</span>
                <span className="text-[#171717] font-bold">48h Tier 2 Operations Scale</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/solutions"
                className="px-6 py-3.5 bg-[#FF4D16] hover:bg-[#E53E0B] text-white font-bold rounded-xl text-sm flex items-center space-x-2 shadow-lg shadow-[#FF4D16]/25 transition-all group"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/design-your-solution"
                className="px-5 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#171717] border border-[#E2DED5] hover:border-[#171717] font-bold rounded-xl text-sm transition-all shadow-sm"
              >
                <span>Design Your Solution</span>
              </Link>

              {/* Third CTA: same white style as Design Your Solution */}
              <Link
                to="/contact"
                className="group/contact px-5 py-3.5 bg-white hover:bg-[#FAF8F5] text-[#171717] border border-[#E2DED5] hover:border-[#171717] font-bold rounded-xl text-sm inline-flex items-center gap-2 transition-all shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D16]"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/contact:translate-x-0.5 motion-reduce:transition-none" />
              </Link>
            </div>

          </div>

          {/* ================= RIGHT: TRACK + ENQUIRY ================= */}
          <div className="lg:col-span-5">
            <HeroTrackEnquiry />
          </div>

        </div>

      </div>
    </section>
  );
};
