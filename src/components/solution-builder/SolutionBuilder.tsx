import React, { useState, useMemo, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './themes.css';
import { TierId, Service } from './types';
import { tiers, services } from './servicesData';
import { useTheme } from './useTheme';
import { useServiceHover } from './useServiceHover';
import { ThemeSwitcher } from './ThemeSwitcher';
import { TierTabs } from './TierTabs';
import { GroupCard } from './GroupCard';
import { SummaryPanel } from './SummaryPanel';
import { BlueprintRequestModal } from './BlueprintRequestModal';
import { ServiceHoverCard } from './ServiceHoverCard';

export interface SolutionBuilderProps {
  initialSelectedIds?: string[];
}

export const SolutionBuilder: React.FC<SolutionBuilderProps> = ({
  initialSelectedIds = [],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { theme, setTheme, themesList } = useTheme();
  const [activeTier, setActiveTier] = useState<TierId>('T1');

  // Selection stored strictly as Set<string>
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    return new Set(initialSelectedIds);
  });

  // Floating UI Hover Hook
  const {
    activeService,
    isOpen: isHoverOpen,
    openForService,
    closeHover,
    refs,
    floatingStyles,
    placement,
    middlewareData,
    arrowRef,
    getFloatingProps,
  } = useServiceHover();

  const servicesMap = useMemo(() => {
    const map = new Map<string, Service>();
    services.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  const activeTierServices = useMemo(() => {
    return services.filter((s) => s.tier === activeTier);
  }, [activeTier]);

  const groupedActiveServices = useMemo(() => {
    const groups: Record<string, Service[]> = {};
    activeTierServices.forEach((s) => {
      if (!groups[s.group]) {
        groups[s.group] = [];
      }
      groups[s.group].push(s);
    });
    return groups;
  }, [activeTierServices]);

  const selectedServicesList = useMemo(() => {
    const list: Service[] = [];
    selectedIds.forEach((id) => {
      const s = servicesMap.get(id);
      if (s) list.push(s);
    });
    return list;
  }, [selectedIds, servicesMap]);

  const selectedCountsPerTier = useMemo(() => {
    const counts: Record<TierId, number> = {
      T1: 0,
      T2: 0,
      T3: 0,
      CX: 0,
    };
    selectedServicesList.forEach((s) => {
      counts[s.tier] = (counts[s.tier] || 0) + 1;
    });
    return counts;
  }, [selectedServicesList]);

  // Blueprint request form (contact details → WhatsApp)
  const [requestOpen, setRequestOpen] = useState(false);

  const handleToggleService = useCallback((serviceId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(serviceId)) {
        next.delete(serviceId);
      } else {
        next.add(serviceId);
      }
      return next;
    });
  }, []);

  const handleToggleGroup = useCallback((groupServices: Service[], shouldSelectAll: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      groupServices.forEach((s) => {
        if (shouldSelectAll) {
          next.add(s.id);
        } else {
          next.delete(s.id);
        }
      });
      return next;
    });
  }, []);

  const handleRemoveService = useCallback((serviceId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(serviceId);
      return next;
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const handleRowMouseEnter = useCallback(
    (service: Service, el: HTMLElement) => {
      openForService(service, el);
    },
    [openForService]
  );

  const handleRowMouseLeave = useCallback(() => {
    closeHover();
  }, [closeHover]);

  const handleRowFocus = useCallback(
    (service: Service, el: HTMLElement) => {
      openForService(service, el);
    },
    [openForService]
  );

  const handleRowBlur = useCallback(() => {
    closeHover();
  }, [closeHover]);

  const handleRowInfoClick = useCallback(
    (service: Service, el: HTMLElement, e: React.MouseEvent) => {
      e.stopPropagation();
      openForService(service, el);
    },
    [openForService]
  );

  const handleSubmitBlueprint = useCallback(() => {
    closeHover();
    setRequestOpen(true);
  }, [closeHover]);

  return (
    <div
      className="sb-theme-container min-h-screen py-10 lg:py-16 transition-colors duration-250 font-sans"
      style={{
        background: 'var(--bg)',
        color: 'var(--ink)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Theme Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b pb-8 sb-border">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border sb-card">
              <span className="w-2 h-2 rounded-full sb-accent-bg animate-pulse" />
              <span style={{ color: 'var(--acc)' }}>DESIGN YOUR SOLUTION (DIY)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: 'var(--ink)' }}>
              Design Your Solution
            </h1>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--mut)' }}>
              Configure your bespoke operational logistics deployment across four specialized tiers.
              Pick the services you need — they collect in your Solution Blueprint. Send it to us and our team will
              build a plan around your operations.
            </p>
          </div>

          <div className="shrink-0 self-start md:self-end">
            <ThemeSwitcher
              currentTheme={theme}
              onThemeChange={setTheme}
              themes={themesList}
            />
          </div>
        </div>

        {/* Tier Tabs & View Mode Selector */}
        <div className="space-y-3">
          <TierTabs
            tiers={tiers}
            activeTier={activeTier}
            onSelectTier={(tierId) => {
              closeHover();
              setActiveTier(tierId);
            }}
            selectedCounts={selectedCountsPerTier}
          />
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Group Cards with staggered entrance */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTier}
              id={`tier-panel-${activeTier}`}
              role="tabpanel"
              aria-labelledby={`tier-tab-${activeTier}`}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {Object.entries(groupedActiveServices).map(([groupName, groupServices], groupIndex) => (
                <motion.div
                  key={`${activeTier}-${groupName}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.22,
                    delay: shouldReduceMotion ? 0 : Math.min(groupIndex * 0.04, 0.25),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <GroupCard
                    groupName={groupName}
                    services={groupServices}
                    selectedIds={selectedIds}
                    onToggleService={handleToggleService}
                    onToggleGroup={handleToggleGroup}
                    onRowMouseEnter={handleRowMouseEnter}
                    onRowMouseLeave={handleRowMouseLeave}
                    onRowFocus={handleRowFocus}
                    onRowBlur={handleRowBlur}
                    onRowInfoClick={handleRowInfoClick}
                    activeHoverServiceId={activeService?.id || null}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Desktop Sticky Summary Panel */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            <SummaryPanel
              selectedServices={selectedServicesList}
              onRemoveService={handleRemoveService}
              onClearAll={handleClearAll}
              onSubmit={handleSubmitBlueprint}
            />
          </div>

          {/* Mobile Stacked Summary */}
          <div className="block lg:hidden w-full">
            <SummaryPanel
              selectedServices={selectedServicesList}
              onRemoveService={handleRemoveService}
              onClearAll={handleClearAll}
              onSubmit={handleSubmitBlueprint}
            />
          </div>
        </div>

        {/* Hover Card */}
        <ServiceHoverCard
          service={activeService}
          isOpen={isHoverOpen}
          isSelected={activeService ? selectedIds.has(activeService.id) : false}
          floatingRef={refs.setFloating}
          floatingStyles={floatingStyles}
          placement={placement}
          middlewareData={middlewareData}
          arrowRef={arrowRef}
          getFloatingProps={getFloatingProps}
          onClose={closeHover}
          onToggleSelect={handleToggleService}
        />

        <BlueprintRequestModal
          isOpen={requestOpen}
          onClose={() => setRequestOpen(false)}
          selectedServices={selectedServicesList}
          tiers={tiers}
        />

        {/* Mobile Sticky Bottom Bar */}
        <div
          className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t lg:hidden backdrop-blur-md shadow-2xl transition-all"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--line)',
            color: 'var(--ink)',
          }}
        >
          <div className="max-w-md mx-auto flex items-center justify-between space-x-3">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold" style={{ color: 'var(--mut)' }}>
                Your Blueprint
              </span>
              <span className="text-lg font-extrabold block" style={{ color: 'var(--acc)' }}>
                {selectedServicesList.length} service{selectedServicesList.length === 1 ? '' : 's'}
              </span>
            </div>

            <button
              type="button"
              disabled={selectedServicesList.length === 0}
              onClick={handleSubmitBlueprint}
              className={`py-2.5 px-5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center space-x-1.5 shadow-md cursor-pointer ${
                selectedServicesList.length === 0
                  ? 'opacity-40 cursor-not-allowed bg-gray-400 text-white'
                  : 'text-white'
              }`}
              style={{
                backgroundColor: selectedServicesList.length === 0 ? undefined : 'var(--acc)',
                boxShadow: selectedServicesList.length === 0 ? 'none' : 'var(--glow)',
              }}
            >
              <span>Send Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

