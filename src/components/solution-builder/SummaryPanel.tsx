import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ClipboardList } from 'lucide-react';
import { Service } from './types';

interface SummaryPanelProps {
  selectedServices: Service[];
  onRemoveService: (serviceId: string) => void;
  onClearAll: () => void;
  /** Opens the blueprint request form. */
  onSubmit: (selected: Service[]) => void;
}

/** "Your Solution Blueprint" — the list of services the visitor has picked (no prices). */
export const SummaryPanel: React.FC<SummaryPanelProps> = ({ selectedServices, onRemoveService, onClearAll, onSubmit }) => {
  const isEmpty = selectedServices.length === 0;

  return (
    <aside
      aria-label="Your Solution Blueprint"
      className="sb-card rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-center space-x-2">
            <ClipboardList className="w-4 h-4" style={{ color: 'var(--acc)' }} />
            <h3 className="text-base font-extrabold tracking-tight" style={{ color: 'var(--ink)' }}>
              Your Solution Blueprint
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
              style={{
                background: !isEmpty ? 'var(--soft)' : 'var(--line)',
                color: !isEmpty ? 'var(--acc)' : 'var(--mut)',
              }}
            >
              {selectedServices.length}
            </span>

            {!isEmpty && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] font-mono hover:underline transition-colors cursor-pointer"
                style={{ color: 'var(--mut)' }}
                title="Remove all services from your blueprint"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Selected services */}
        <div className="py-3 max-h-[360px] overflow-y-auto space-y-2 pr-1">
          <AnimatePresence initial={false}>
            {isEmpty ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center" style={{ background: 'var(--soft)' }}>
                  <ClipboardList className="w-5 h-5" style={{ color: 'var(--acc)' }} />
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--mut)' }}>
                  Your blueprint is empty.
                </p>
                <p className="text-[11px] font-mono" style={{ color: 'var(--mut)' }}>
                  Tick the services you need — they&apos;ll appear here.
                </p>
              </motion.div>
            ) : (
              selectedServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="p-2.5 rounded-xl border flex items-center justify-between group transition-colors"
                  style={{ background: 'var(--soft)', borderColor: 'var(--line)' }}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span
                        className="text-[9px] font-mono font-bold px-1 rounded uppercase tracking-wider"
                        style={{ background: 'var(--card)', color: 'var(--acc)', border: '1px solid var(--line)' }}
                      >
                        {service.tier}
                      </span>
                      <span className="text-[10px] font-mono truncate" style={{ color: 'var(--mut)' }}>
                        {service.group}
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold tracking-tight truncate" style={{ color: 'var(--ink)' }} title={service.name}>
                      {service.name}
                    </h5>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveService(service.id)}
                    aria-label={`Remove ${service.name}`}
                    className="p-1.5 rounded-lg transition-colors hover:bg-black/10 active:bg-black/15 focus-visible:ring-2 outline-none shrink-0 cursor-pointer"
                    style={{ color: 'var(--mut)' }}
                    title="Remove from blueprint"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Send action */}
      <div className="pt-4 border-t space-y-3" style={{ borderColor: 'var(--line)' }}>
        <button
          type="button"
          disabled={isEmpty}
          onClick={() => onSubmit(selectedServices)}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2 outline-none focus-visible:ring-2 ${
            isEmpty ? 'opacity-40 cursor-not-allowed bg-gray-400 text-white' : 'hover:brightness-110 active:scale-[0.99] text-white shadow-lg cursor-pointer'
          }`}
          style={{
            backgroundColor: isEmpty ? undefined : 'var(--acc)',
            boxShadow: isEmpty ? 'none' : 'var(--glow)',
          }}
        >
          <span>Send My Blueprint</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-[11px] font-mono" style={{ color: 'var(--mut)' }}>
          Our team will call you with a tailored plan.
        </p>
      </div>
    </aside>
  );
};
