import React, { forwardRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Info, Check } from 'lucide-react';
import { Service } from './types';

interface ServiceRowProps {
  service: Service;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  onMouseEnter: (service: Service, el: HTMLElement) => void;
  onMouseLeave: () => void;
  onFocus: (service: Service, el: HTMLElement) => void;
  onBlur: () => void;
  onInfoClick: (service: Service, el: HTMLElement, e: React.MouseEvent) => void;
  isHoveredOrActive: boolean;
}

export const ServiceRow = React.memo(
  forwardRef<HTMLLabelElement, ServiceRowProps>(function ServiceRow(
    {
      service,
      isSelected,
      onToggle,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onInfoClick,
      isHoveredOrActive,
    },
    ref
  ) {
    const shouldReduceMotion = useReducedMotion();

    return (
      <label
        ref={ref}
        htmlFor={`service-checkbox-${service.id}`}
        aria-describedby={`service-hover-card-${service.id}`}
        onMouseEnter={(e) => onMouseEnter(service, e.currentTarget)}
        onMouseLeave={onMouseLeave}
        onFocus={(e) => onFocus(service, e.currentTarget)}
        onBlur={onBlur}
        className={`group relative flex items-center justify-between py-3 px-4 sm:px-5 transition-all duration-150 cursor-pointer outline-none select-none border-b last:border-b-0 ${
          isSelected ? 'font-medium' : ''
        }`}
        style={{
          borderColor: 'var(--line)',
          background: isSelected
            ? 'var(--soft)'
            : isHoveredOrActive
            ? 'var(--soft)'
            : 'transparent',
          transform: !shouldReduceMotion && isHoveredOrActive ? 'translateX(4px)' : 'none',
          transition: 'transform 150ms ease, background-color 150ms ease',
        }}
      >
        {/* Left Accent Indicator Bar */}
        {(isSelected || isHoveredOrActive) && (
          <span
            className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-150"
            style={{
              backgroundColor: 'var(--acc)',
              boxShadow: 'var(--glow)',
            }}
          />
        )}

        {/* Left Side: Real accessible Checkbox + Service Name */}
        <div className="flex items-center space-x-3 pr-2 min-w-0 flex-1">
          <div className="relative flex items-center justify-center shrink-0">
            <input
              type="checkbox"
              id={`service-checkbox-${service.id}`}
              checked={isSelected}
              onChange={() => onToggle(service.id)}
              className="peer sr-only"
            />
            <div
              className="w-4 h-4 rounded border transition-all flex items-center justify-center peer-focus-visible:ring-2"
              style={{
                borderColor: isSelected ? 'var(--acc)' : 'var(--line)',
                backgroundColor: isSelected ? 'var(--acc)' : 'var(--card)',
                boxShadow: isSelected ? 'var(--glow)' : 'none',
              }}
            >
              {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
            </div>
          </div>

          <span
            className="text-xs sm:text-sm font-semibold tracking-tight transition-colors line-clamp-2"
            style={{
              color: isSelected ? 'var(--ink)' : 'var(--ink)',
            }}
          >
            {service.name}
          </span>
        </div>

        {/* Right Side: Mobile Touch Info Button */}
        <div className="flex items-center space-x-2.5 shrink-0 ml-2">
          {/* Info pill button for touch devices */}
          <button
            type="button"
            aria-label={`View details for ${service.name}`}
            onClick={(e) => {
              const labelEl = e.currentTarget.closest('label');
              if (labelEl) {
                onInfoClick(service, labelEl, e);
              }
            }}
            className="p-1 rounded-md transition-colors hover:bg-black/5 active:bg-black/10 focus-visible:ring-2 outline-none"
            style={{ color: 'var(--mut)' }}
            title="Inspect service details"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </label>
    );
  })
);

