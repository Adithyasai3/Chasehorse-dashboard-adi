import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { WHY_GELP_DATA, WhyGelpContent, GelpDossierCard } from '../../data/whyGelp.data';

export interface WhyGelpProps {
  content?: WhyGelpContent;
}

// Smooth count-up number component for stats
const CountUpStat: React.FC<{ target: number; suffix: string; inView: boolean }> = ({
  target,
  suffix,
  inView,
}) => {
  const [val, setVal] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setVal(target);
      return;
    }

    const duration = 1000;
    const startTime = performance.now();

    const frame = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic easeOut
      setVal(Math.round(target * ease));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [target, inView, shouldReduceMotion]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
};

// Helper to bold specific key phrases within the paragraph
const renderHighlightedParagraph = (text: string, highlights: string[]) => {
  if (!highlights || highlights.length === 0) return text;

  const pattern = new RegExp(
    `(${highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi'
  );
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = highlights.some(
          (h) => h.toLowerCase() === part.toLowerCase()
        );
        if (isHighlight) {
          return (
            <strong key={i} className="font-bold text-[#171717]">
              {part}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
};

export const WhyGelp: React.FC<WhyGelpProps> = ({ content = WHY_GELP_DATA }) => {
  const shouldReduceMotion = useReducedMotion();
  const [statBandInView, setStatBandInView] = useState(false);

  return (
    <section
      id="why-gelp"
      className="w-full bg-[#f3f0e8] py-12 sm:py-14 lg:py-16 border-b border-[#171717]/10"
      aria-label="Why Chasehorse G.E.L.P."
    >
      <div className="max-w-[1180px] mx-auto px-6 space-y-6 sm:space-y-8">
        
        {/* ================= 1. CENTRED HEADER WITH 4 TAGLINE CHIPS ================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-2.5"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight">
            {content.heading}
          </h2>

          {/* Mono row of chips with small orange accent dots */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-medium text-[#625E58] pt-1">
            {content.taglineChips.map((chip, i) => (
              <React.Fragment key={chip}>
                <span className="px-2.5 py-1 rounded-md bg-white/70 border border-[#171717]/8 text-[#171717] font-semibold">
                  {chip}
                </span>
                {i < content.taglineChips.length - 1 && (
                  <span className="text-[#ff4d12] font-bold select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ================= 2. COMPACT STAT BAND (3-COLUMN) ================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          onViewportEnter={() => setStatBandInView(true)}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-[#171717]/8 p-5 sm:p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 items-center">
            
            {/* Column 1: Thunderspeed Title + Zap Icon */}
            <div className="flex items-center space-x-3.5 md:pr-6">
              <div className="w-11 h-11 rounded-xl bg-[#ff4d12]/10 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#ff4d12]" />
              </div>
              <h3 className="text-lg sm:text-[19px] font-bold text-[#171717] leading-snug">
                {content.statBand.title}
              </h3>
            </div>

            {/* Column 2: 24h Stat */}
            <div className="relative md:px-8 md:border-l md:border-[#171717]/10 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight leading-none font-mono">
                <CountUpStat
                  target={content.statBand.stats[0].value}
                  suffix={content.statBand.stats[0].suffix}
                  inView={statBandInView}
                />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C877D] mt-1.5 block">
                {content.statBand.stats[0].label}
              </span>
            </div>

            {/* Column 3: 48h Stat */}
            <div className="relative md:px-8 md:border-l md:border-[#171717]/10 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight leading-none font-mono">
                <CountUpStat
                  target={content.statBand.stats[1].value}
                  suffix={content.statBand.stats[1].suffix}
                  inView={statBandInView}
                />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C877D] mt-1.5 block">
                {content.statBand.stats[1].label}
              </span>
            </div>

          </div>
        </motion.div>

        {/* ================= 3. EXACT TWO CARDS IN ONE FRAME ================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6"
        >
          {content.cards.map((card: GelpDossierCard) => {
            const IconComponent = card.icon;

            return (
              <motion.div
                key={card.id}
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="group bg-white rounded-2xl p-6 sm:p-7 border border-[#171717]/8 hover:border-[#ff4d12]/30 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Bar: Eyebrow + Icon */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#171717]/6">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#ff4d12]/10 group-hover:bg-[#ff4d12] transition-colors flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4 text-[#ff4d12] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ff4d12]">
                        {card.eyebrow}
                      </span>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#171717] tracking-tight">
                    {card.title}
                  </h3>

                  {/* Full Paragraph Text with bolded highlights */}
                  <p className="text-[13.5px] sm:text-[14px] text-[#55524c] leading-relaxed">
                    {renderHighlightedParagraph(card.paragraph, card.keyHighlights)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
