import React from 'react';
import { GELP_LAYERS, GELP_LAYERS_LABEL, GelpLayerAccent } from '../../data/gelpLayers.data';

// Literal class strings per accent so Tailwind can see them at build time.
const ACCENT_CLASSES: Record<GelpLayerAccent, { number: string; bar: string; focus: string }> = {
  orange: {
    number: 'text-[#FF4D16]',
    bar: 'bg-[#FF4D16]',
    focus: 'focus-visible:outline-[#FF4D16]',
  },
  white: {
    number: 'text-white',
    bar: 'bg-white',
    focus: 'focus-visible:outline-white',
  },
  green: {
    number: 'text-[#22c55e]',
    bar: 'bg-[#22c55e]',
    focus: 'focus-visible:outline-[#22c55e]',
  },
};

export const GelpLayersBand: React.FC = () => {
  return (
    <section className="w-full bg-[#171717] py-11" aria-label={GELP_LAYERS_LABEL}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="block mb-6 text-[11px] font-mono font-bold uppercase tracking-wider text-white/50">
          {GELP_LAYERS_LABEL}
        </span>

        {/* 1px gaps over a 12% white background draw the dividers between columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.12]">
          {GELP_LAYERS.map((layer) => {
            const accent = ACCENT_CLASSES[layer.accent];

            return (
              <a
                key={layer.id}
                href="#services"
                className={`group relative block bg-[#171717] p-6 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 ${accent.focus}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none ${accent.bar}`}
                />

                <span
                  className={`block font-mono font-bold text-5xl leading-none opacity-80 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none ${accent.number}`}
                >
                  {layer.number}
                </span>

                <h3 className="mt-4 text-[22px] font-semibold text-white tracking-tight">
                  {layer.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
