import React from 'react';
import { FloatingPortal } from '@floating-ui/react';
import { motion, useReducedMotion } from 'framer-motion';
import { X, CheckCircle2, PlusCircle } from 'lucide-react';
import { Service } from './types';

interface ServiceHoverCardProps {
  service: Service | null;
  isOpen: boolean;
  isSelected: boolean;
  floatingRef: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
  placement: string;
  middlewareData: {
    arrow?: {
      x?: number;
      y?: number;
    };
  };
  arrowRef: React.RefObject<HTMLDivElement>;
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
  onClose: () => void;
  onToggleSelect: (serviceId: string) => void;
}

export const ServiceHoverCard: React.FC<ServiceHoverCardProps> = ({
  service,
  isOpen,
  isSelected,
  floatingRef,
  floatingStyles,
  placement,
  middlewareData,
  arrowRef,
  getFloatingProps,
  onClose,
  onToggleSelect,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (!isOpen || !service) return null;

  const basePlacement = placement.split('-')[0];
  const transformOriginMap: Record<string, string> = {
    top: 'bottom center',
    bottom: 'top center',
    left: 'right center',
    right: 'left center',
  };
  const transformOrigin = transformOriginMap[basePlacement] || 'center center';

  const arrowX = middlewareData.arrow?.x;
  const arrowY = middlewareData.arrow?.y;

  const staticSideMap: Record<string, string> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  };
  const staticSide = staticSideMap[basePlacement];

  return (
    <FloatingPortal>
      <div
        ref={floatingRef}
        style={{
          ...floatingStyles,
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
        {...getFloatingProps()}
      >
        <motion.div
          id={`service-hover-card-${service.id}`}
          role="tooltip"
          aria-label={`${service.name} details`}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.94 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: 0.94 }
          }
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin,
            background: 'var(--tip-bg)',
            borderColor: 'var(--line)',
            color: 'var(--ink)',
            boxShadow: 'var(--shadow-card)',
          }}
          className="relative w-[300px] sm:w-[320px] rounded-2xl border p-4 shadow-2xl backdrop-blur-md"
        >
          {/* Arrow */}
          <div
            ref={arrowRef}
            style={{
              position: 'absolute',
              left: arrowX != null ? `${arrowX}px` : '',
              top: arrowY != null ? `${arrowY}px` : '',
              [staticSide]: '-6px',
              width: '12px',
              height: '12px',
              transform: 'rotate(45deg)',
              background: 'var(--tip-bg)',
              borderColor: 'var(--line)',
              borderWidth: '1px',
              borderStyle: 'solid',
              ...(basePlacement === 'right' && { borderRight: 'none', borderTop: 'none' }),
              ...(basePlacement === 'left' && { borderLeft: 'none', borderBottom: 'none' }),
              ...(basePlacement === 'top' && { borderTop: 'none', borderLeft: 'none' }),
              ...(basePlacement === 'bottom' && { borderBottom: 'none', borderRight: 'none' }),
            }}
          />

          {/* Close button for touch devices */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-3 right-3 p-1 rounded-full text-xs transition-colors hover:bg-black/10 focus-visible:ring-2 sm:hidden"
            style={{ color: 'var(--mut)' }}
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Header Tag: TIER · GROUP */}
          <div className="flex items-center space-x-1.5 mb-2 pr-6 sm:pr-0">
            <span
              className="text-[10px] font-mono font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
              style={{
                background: 'var(--soft)',
                color: 'var(--acc)',
              }}
            >
              {service.tier}
            </span>
            <span className="text-[10px] font-mono text-gray-400">•</span>
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-wider truncate"
              style={{ color: 'var(--mut)' }}
            >
              {service.group}
            </span>
          </div>

          {/* Service Name */}
          <h4
            className="text-sm sm:text-base font-extrabold tracking-tight leading-snug mb-2"
            style={{ color: 'var(--ink)' }}
          >
            {service.name}
          </h4>


          {/* One-line Description */}
          <p
            className="text-xs leading-relaxed mb-3.5"
            style={{ color: 'var(--mut)' }}
          >
            {service.description}
          </p>

          {/* Footer Interactive Hint */}
          <button
            type="button"
            onClick={() => onToggleSelect(service.id)}
            className="w-full pt-2.5 border-t flex items-center justify-between text-xs font-semibold transition-colors outline-none focus-visible:ring-2 rounded-b cursor-pointer"
            style={{
              borderColor: 'var(--line)',
              color: isSelected ? 'var(--acc)' : 'var(--ink)',
            }}
          >
            <span className="flex items-center space-x-1.5">
              {isSelected ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-emerald-600">✓ Added to solution</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" style={{ color: 'var(--acc)' }} />
                  <span>Click row to add</span>
                </>
              )}
            </span>
            <span
              className="text-[10px] font-mono tracking-wider uppercase underline underline-offset-2"
              style={{ color: 'var(--mut)' }}
            >
              {isSelected ? 'Remove' : 'Select'}
            </span>
          </button>
        </motion.div>
      </div>
    </FloatingPortal>
  );
};

