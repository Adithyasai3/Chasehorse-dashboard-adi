import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Phone,
  Layers,
  ChevronRight,
  ExternalLink,
  Zap,
  Building2
} from 'lucide-react';
import { IndiaOperationsMap } from '../../components/maps/IndiaOperationsMap';

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
        
        {/* ================= 2-COLUMN SPLIT HERO ================= */}
        {/* First Half (Left, 50%): Content from Odoo & Team Docs */}
        {/* Second Half (Right, 50%): India Map with Interactive Hover Details & Maps Redirect */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================= LEFT HALF: EDITORIAL CONTENT & PILLARS ================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-[#FF4D16] uppercase">
              <span className="w-2.5 h-2.5 border-2 border-[#FF4D16] rounded-sm bg-[#FF4D16]/20 inline-block" />
              <span>LOGISTICS &amp; SUPPLY CHAIN · INDIA</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-5">
              <h1 className="font-display text-[30px] sm:text-5xl lg:text-[42px] xl:text-[52px] font-extrabold text-[#171717] tracking-tight leading-[1.05]">
                <span className="block">You grow the business.</span>
                <span className="block">
                  We move it.
                </span>
              </h1>
              <div className="text-sm sm:text-base font-mono font-bold text-[#FF4D16]">
                Growth Enabler Logiworkx Platform [ GELP ]
              </div>
            </div>

            {/* Subtitle Paragraph (From Who We Are in Image 2) */}
            <p className="text-sm sm:text-base text-[#625E58] leading-relaxed max-w-xl">
              From warehousing and fleet management to freight and last-mile delivery, ChaseHorse handles your logistics end to end. Our Logistics-as-a-Service (LaaS) platform gives you a plug-and-play setup with ready-to-deploy resources. One partner, one platform, full visibility.
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
            <div className="pt-2 flex flex-wrap items-center gap-x-2 gap-y-3">
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

              <a
                href="tel:+917337369111"
                className="group/phone px-1 py-2.5 rounded-lg text-lg font-mono font-bold tracking-tight text-[#171717] hover:text-[#FF4D16] transition-colors duration-200 flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D16]"
              >
                <span className="relative flex w-2 h-2 shrink-0" aria-hidden="true">
                  <span className="absolute inset-0 rounded-full bg-[#107C41] opacity-60 motion-safe:animate-pulse-ring" />
                  <span className="relative w-2 h-2 rounded-full bg-[#107C41]" />
                </span>
                <Phone className="w-5 h-5 transition-transform duration-200 group-hover/phone:scale-110 motion-reduce:transition-none" />
                <span className="relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-[#FF4D16] after:origin-left after:scale-x-0 after:transition-transform after:duration-200 after:ease-out group-hover/phone:after:scale-x-100 motion-reduce:after:transition-none">
                  +91 7337369111
                </span>
              </a>
            </div>

          </div>

          {/* ================= RIGHT HALF: ACCURATE INDIA OPERATIONS MAP ================= */}
          <div className="lg:col-span-6">
            <IndiaOperationsMap compact={true} />
          </div>

        </div>

      </div>
    </section>
  );
};
