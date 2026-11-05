import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WHO_WE_ARE_DATA, WhoWeAreContent } from '../../data/whoWeAre.data';

export interface WhoWeAreProps {
  content?: WhoWeAreContent;
}

export const WhoWeAre: React.FC<WhoWeAreProps> = ({ content = WHO_WE_ARE_DATA }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="who-we-are"
      className="w-full bg-[#f3f0e8] py-16 sm:py-20 lg:py-24 border-b border-[#171717]/10"
      aria-label="About ChaseHorse"
    >
      <div className="max-w-[1180px] mx-auto px-6 space-y-12 sm:space-y-16">
        
        {/* ================= TOP TWO-COLUMN BLOCK ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (5/12): Eyebrow, H2, and Lead */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center text-xs font-mono font-bold tracking-wider text-[#171717] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff4d12] inline-block mr-2.5 animate-pulse" />
              <span>{content.eyebrow}</span>
            </div>

            {/* Left-Aligned H2 */}
            <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold text-[#171717] tracking-tight leading-[1.12]">
              {content.heading}
            </h2>

            {/* Lead Line */}
            <p className="text-[17px] sm:text-[18px] text-[#625E58] font-normal leading-relaxed pt-1">
              {content.lead}
            </p>
          </motion.div>

          {/* Right Column (7/12): Dark #171717 Story Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-[#171717] text-[#f3f0e8] rounded-[24px] p-7 sm:p-9 lg:p-[36px] shadow-2xl border border-white/10 relative overflow-hidden">
              <p className="text-base sm:text-[19px] lg:text-[20px] leading-[1.65] font-normal text-[#f3f0e8]/85">
                {content.story.prefix}
                <motion.span 
                  initial={shouldReduceMotion ? {} : { scale: 0.95 }}
                  whileInView={shouldReduceMotion ? {} : { scale: [0.95, 1.03, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#ff4d12]/20 border border-[#ff4d12]/50 text-[#ff4d12] font-bold text-sm sm:text-base mx-1 align-baseline tracking-normal shadow-sm"
                >
                  {content.story.badgeText}
                </motion.span>
                {content.story.suffix}
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

