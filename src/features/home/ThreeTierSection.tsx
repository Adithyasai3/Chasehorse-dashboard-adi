import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  Check, 
  Sparkles, 
  X, 
  Layers, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TIER_GROUPS, 
  type ServiceCategoryItem, 
  type TierGroup 
} from '../../data/serviceTiers';
import { ServiceSpotlight } from '../../components/ui/ServiceSpotlight';
import { ALL_SERVICES } from '../../data/services';

const outcomeFor = (slug: string) =>
  ALL_SERVICES.find((s) => s.slug === slug)?.expectedOutcomes[0];

// Re-export types & data so existing imports remain backwards-compatible
export { TIER_GROUPS, type ServiceCategoryItem, type TierGroup };

// ==========================================
// 2. MAIN THREE TIER COMPONENT
// ==========================================
interface FloatingCardState {
  service: ServiceCategoryItem;
  left: number;
  top: number;
  arrowY: number;
  side: 'right' | 'left';
}

export const ThreeTierSection: React.FC = () => {
  const [activeTierId, setActiveTierId] = useState<1 | 2 | 3 | null>(null);
  const [activeService, setActiveService] = useState<ServiceCategoryItem | null>(null);
  const [floatingPlacement, setFloatingPlacement] = useState<FloatingCardState | null>(null);
  const [mobileModalService, setMobileModalService] = useState<ServiceCategoryItem | null>(null);

  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Position calculation with Floating UI style flip & clamp
  const updatePosition = useCallback((targetEl: HTMLElement, service: ServiceCategoryItem) => {
    if (!sectionContainerRef.current) return;

    const containerRect = sectionContainerRef.current.getBoundingClientRect();
    const lineRect = targetEl.getBoundingClientRect();

    // Line center relative to container
    const anchorX = lineRect.left - containerRect.left;
    const anchorY = lineRect.top - containerRect.top + lineRect.height / 2;
    const lineWidth = lineRect.width;

    const cardWidth = cardRef.current ? cardRef.current.offsetWidth : 320;
    const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 360;
    const offset = 16; // offset from line edge
    const pad = 16; // boundary margin

    // By default pop to the right
    let side: 'right' | 'left' = 'right';
    let left = anchorX + lineWidth + offset;
    let top = anchorY - 140; // vertically align toward upper half of card

    // Flip to left if card overflows container right edge
    if (left + cardWidth > containerRect.width - pad) {
      side = 'left';
      left = anchorX - cardWidth - offset;
    }

    // Clamp top & bottom so card never clips or overflows
    if (top < pad) top = pad;
    if (top + cardHeight > containerRect.height - pad) {
      top = containerRect.height - cardHeight - pad;
    }

    // Calculate arrow Y relative to card top
    const arrowY = Math.max(20, Math.min(cardHeight - 20, anchorY - top));

    setFloatingPlacement({
      service,
      left,
      top,
      arrowY,
      side
    });
  }, []);

  // Hover and focus handlers for service line
  const handleLineMouseEnter = (
    e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
    service: ServiceCategoryItem
  ) => {
    if (window.innerWidth < 1024) return; // on mobile, use tap modal

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setActiveService(service);
    setActiveTierId(service.tier);
    updatePosition(e.currentTarget, service);
  };

  const handleLineMouseLeave = () => {
    if (window.innerWidth < 1024) return;

    closeTimeoutRef.current = setTimeout(() => {
      setActiveService(null);
      setFloatingPlacement(null);
    }, 140);
  };

  // Card hover handlers (hover bridge)
  const handleCardMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleCardMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveService(null);
      setFloatingPlacement(null);
    }, 140);
  };

  // Mobile tap handler
  const handleLineClick = (service: ServiceCategoryItem) => {
    if (window.innerWidth < 1024) {
      setMobileModalService(service);
    }
  };

  // Close card on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveService(null);
        setFloatingPlacement(null);
        setMobileModalService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="service-categories" 
      ref={sectionContainerRef}
      className="relative w-full py-16 lg:py-24 bg-[#F4F1EA] border-b border-[#E2DED5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider text-[#FF4D16] uppercase">
            <span className="w-2.5 h-2.5 border-2 border-[#FF4D16] rounded-sm bg-[#FF4D16]/20 inline-block" />
            <span>MODULAR SERVICE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight">
            Our Service Categories
          </h2>
          <p className="text-sm sm:text-base text-[#625E58] leading-relaxed max-w-2xl mx-auto font-normal">
            Hover over any service capability to inspect live deliverables, modules, and on-ground execution workflows.
          </p>
        </div>

        {/* ================= 3 TIER CARDS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch relative">
          {TIER_GROUPS.map((group) => {
            const isTierActive = activeTierId === group.tier;

            return (
              <motion.div
                key={group.tier}
                onMouseEnter={() => setActiveTierId(group.tier)}
                onMouseLeave={() => {
                  if (!activeService) setActiveTierId(null);
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-md relative ${
                  isTierActive
                    ? 'border-[#FF4D16] shadow-[0_16px_36px_rgba(255,77,22,0.12)] ring-1 ring-[#FF4D16]'
                    : 'border-[#E2DED5] hover:border-[#171717]'
                }`}
              >
                <div>
                  {/* Top Solid Black Bar Header with White Text */}
                  <div className="bg-[#171717] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#171717]">
                    <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                      {group.title}
                    </h3>
                    <span 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        isTierActive ? 'bg-[#FF4D16] shadow-[0_0_8px_#FF4D16] animate-pulse' : 'bg-white/40'
                      }`} 
                    />
                  </div>

                  {/* Service Lines List */}
                  <div className="divide-y divide-[#E2DED5]/80">
                    {group.services.map((service) => {
                      const isHovered = activeService?.id === service.id;

                      return (
                        <div
                          key={service.id}
                          tabIndex={0}
                          role="button"
                          aria-label={`Inspect ${service.title}`}
                          onMouseEnter={(e) => handleLineMouseEnter(e, service)}
                          onMouseLeave={handleLineMouseLeave}
                          onFocus={(e) => handleLineMouseEnter(e, service)}
                          onBlur={handleLineMouseLeave}
                          onClick={() => handleLineClick(service)}
                          className={`py-3.5 px-5 flex items-center justify-between text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer outline-none relative group select-none ${
                            isHovered
                              ? 'bg-[#FAF8F5] text-[#FF4D16] font-bold pl-7'
                              : 'text-[#171717] hover:text-[#FF4D16] hover:bg-[#FAF8F5]'
                          }`}
                        >
                          {/* Active Left Indicator Bar */}
                          {isHovered && (
                            <motion.span 
                              layoutId="activeServiceBar"
                              className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF4D16]" 
                            />
                          )}

                          <span className="flex items-center space-x-2">
                            <span>{service.title}</span>
                          </span>

                          <ChevronRight 
                            className={`w-3.5 h-3.5 transition-all duration-200 ${
                              isHovered 
                                ? 'opacity-100 text-[#FF4D16] translate-x-1' 
                                : 'opacity-0 group-hover:opacity-60 text-[#8C877D]'
                            }`} 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Bar: "Explore More →" */}
                <div className="p-4 border-t border-[#E2DED5] bg-white text-[#171717]">
                  <Link
                    to={group.exploreLink}
                    className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold group text-[#171717] hover:text-[#FF4D16]"
                  >
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ================= DESKTOP ANCHORED DETAIL POPOUT CARD ================= */}
        <AnimatePresence>
          {activeService && floatingPlacement && (
            <motion.div
              ref={cardRef}
              key={activeService.id}
              initial={{ 
                opacity: 0, 
                scale: 0.92,
                x: floatingPlacement.side === 'right' ? 12 : -12
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: `${floatingPlacement.left}px`,
                top: `${floatingPlacement.top}px`,
                width: '320px',
                zIndex: 60,
                transformOrigin: floatingPlacement.side === 'right' ? '0% 40%' : '100% 40%'
              }}
              className="hidden lg:block bg-white rounded-2xl border-2 border-[#171717] shadow-2xl overflow-hidden p-0 pointer-events-auto"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Pointer Arrow on Card Edge */}
              {floatingPlacement.side === 'right' && (
                <div 
                  className="absolute -left-2 w-3.5 h-3.5 bg-white border-l-2 border-b-2 border-[#171717] rotate-45 pointer-events-none"
                  style={{ top: `${floatingPlacement.arrowY}px` }}
                />
              )}
              {floatingPlacement.side === 'left' && (
                <div 
                  className="absolute -right-2 w-3.5 h-3.5 bg-white border-r-2 border-t-2 border-[#171717] rotate-45 pointer-events-none"
                  style={{ top: `${floatingPlacement.arrowY}px` }}
                />
              )}

              {/* Typographic Header */}
              <ServiceSpotlight
                index={activeService.indexInTier}
                title={activeService.title}
                category={activeService.category}
                tierLabel={`Tier ${activeService.tier}`}
                headline={outcomeFor(activeService.slug)}
                stats={[
                  { value: activeService.modules.length, label: 'Capabilities' },
                  { value: 6, label: 'Active hubs' },
                ]}
                size="sm"
              />

              {/* Card Body with Staggered Reveal */}
              <div className="p-4 space-y-3">

                <div className="space-y-1">
                  <p className="text-xs text-[#625E58] leading-relaxed line-clamp-3">
                    {activeService.shortDesc}
                  </p>
                </div>

                {/* Included Modules Pill Chips */}
                <div className="space-y-1.5 pt-1 border-t border-[#E2DED5]/80">
                  <span className="text-[10px] font-bold text-[#171717] uppercase tracking-wider block">
                    INCLUDED MODULES:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {activeService.modules.map((mod, mIdx) => (
                      <span
                        key={mIdx}
                        className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E2DED5] text-[10px] font-semibold text-[#171717] flex items-center space-x-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#FF4D16]" />
                        <span>{mod}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="flex-1 py-2 px-3 bg-[#FF4D16] hover:bg-[#E53E0B] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1 shadow-sm"
                  >
                    <span>Explore Full Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/design-your-solution"
                    className="py-2 px-3 bg-[#FAF8F5] hover:bg-white border border-[#E2DED5] text-[#171717] text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    Add to Builder
                  </Link>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= TABLET / MOBILE BOTTOM SHEET DRAWER ================= */}
        <AnimatePresence>
          {mobileModalService && (
            <>
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileModalService(null)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              />

              {/* Bottom Sheet Modal */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl lg:hidden space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#E2DED5]">
                  <span className="text-xs font-mono font-bold text-[#FF4D16]">
                    SERVICE CAPABILITY {mobileModalService.indexInTier} • TIER {mobileModalService.tier}
                  </span>
                  <button
                    onClick={() => setMobileModalService(null)}
                    className="p-1 rounded-full bg-[#FAF8F5] border border-[#E2DED5] text-[#171717]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <ServiceSpotlight
                  index={mobileModalService.indexInTier}
                  title={mobileModalService.title}
                  category={mobileModalService.category}
                  tierLabel={`Tier ${mobileModalService.tier}`}
                  headline={outcomeFor(mobileModalService.slug)}
                  stats={[
                    { value: mobileModalService.modules.length, label: 'Capabilities' },
                    { value: 6, label: 'Active hubs' },
                  ]}
                  size="md"
                  className="rounded-xl"
                />

                <div className="space-y-1">
                  <p className="text-xs text-[#625E58] leading-relaxed">
                    {mobileModalService.shortDesc}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#171717] uppercase tracking-wider block">
                    INCLUDED MODULES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mobileModalService.modules.map((m, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E2DED5] text-xs font-medium text-[#171717]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <Link
                    to={`/services/${mobileModalService.slug}`}
                    className="flex-1 py-3 bg-[#FF4D16] text-white text-xs font-bold rounded-xl text-center shadow-md"
                  >
                    Explore Full Dossier →
                  </Link>
                  <Link
                    to="/design-your-solution"
                    className="py-3 px-4 bg-[#FAF8F5] border border-[#E2DED5] text-[#171717] text-xs font-bold rounded-xl text-center"
                  >
                    Add to Builder
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
