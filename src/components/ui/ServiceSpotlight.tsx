import React from 'react';

// Matches metric-style phrases such as "100%", "Sub-2-hour", "Under 24 hours", "3x", "ISO 9001"
const METRIC_SOURCE =
  '((?<![\\w-])(?:Sub-|Under |Over |Up to )?\\d[\\d.,]*(?:%|\\+|x)?(?:[-\\s](?:hours?|days?|minutes?|weeks?|months?|hubs?))?|\\bISO \\d+)';

const metricSplit = () => new RegExp(METRIC_SOURCE, 'gi');

/** Pulls the leading metric out of an outcome sentence, if it has one. */
export const extractMetric = (text: string): { metric: string | null; rest: string } => {
  const match = new RegExp(METRIC_SOURCE, 'i').exec(text);
  if (!match || match.index > 0) return { metric: null, rest: text };
  const rest = text.slice(match[0].length).replace(/^[\s-]+/, '');
  return { metric: match[0], rest: rest.charAt(0).toUpperCase() + rest.slice(1) };
};

/**
 * Renders text with numeric outcomes emphasised in bold accent colour.
 * tone="dark" is for light backgrounds, tone="light" for dark backgrounds.
 */
export const HighlightMetrics: React.FC<{ text: string; tone?: 'dark' | 'light' }> = ({
  text,
  tone = 'light',
}) => {
  const parts = text.split(metricSplit());
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 && part ? (
          <strong
            key={i}
            className={`font-extrabold text-[#FF4D16] ${
              tone === 'dark' ? 'bg-[#FF4D16]/10 px-1 rounded' : ''
            }`}
          >
            {part}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

/** Title with the last word set in the accent colour and an underline (used for page H1s). */
export const AccentTitle: React.FC<{ title: string }> = ({ title }) => {
  const words = title.trim().split(' ');
  const last = words.pop();
  return (
    <>
      {words.length > 0 && <>{words.join(' ')} </>}
      <span className="relative inline-block text-[#FF4D16]">
        {last}
        <span className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-[#FF4D16]/40" />
      </span>
    </>
  );
};

const panelBackground: React.CSSProperties = {
  backgroundColor: '#141414',
  backgroundImage: [
    'radial-gradient(120% 80% at 100% 0%, rgba(255,77,22,0.28) 0%, rgba(255,77,22,0) 55%)',
    'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
  ].join(','),
  backgroundSize: '100% 100%, 28px 28px, 28px 28px',
};

const SIZES = {
  lg: { pad: 'p-7 sm:p-10', num: 'text-[120px] sm:text-[150px]', title: 'text-3xl sm:text-4xl', metric: 'text-6xl sm:text-7xl', caption: 'text-base sm:text-lg', gap: 'gap-7' },
  md: { pad: 'p-6 sm:p-8', num: 'text-[96px]', title: 'text-2xl', metric: 'text-5xl', caption: 'text-sm sm:text-base', gap: 'gap-6' },
  sm: { pad: 'p-5', num: 'text-[64px]', title: 'text-lg', metric: 'text-4xl', caption: 'text-xs', gap: 'gap-4' },
};

interface ServiceSpotlightProps {
  index: string;
  title: string;
  category: string;
  tierLabel: string;
  /** Outcome sentence; its leading number is shown as a large hero stat. */
  headline?: string;
  points?: string[];
  stats?: { value: string | number; label: string }[];
  size?: 'lg' | 'md' | 'sm';
  className?: string;
  children?: React.ReactNode;
}

/**
 * Typographic replacement for a service photo: dark panel with an outlined
 * index number, bold title, and a hero outcome metric.
 */
export const ServiceSpotlight: React.FC<ServiceSpotlightProps> = ({
  index,
  title,
  category,
  tierLabel,
  headline,
  points,
  stats,
  size = 'lg',
  className = '',
  children,
}) => {
  const s = SIZES[size];
  const hero = headline ? extractMetric(headline) : null;

  return (
    <div
      className={`relative overflow-hidden text-white flex flex-col ${s.gap} ${s.pad} ${className}`}
      style={panelBackground}
    >
      {/* Orange accent rail */}
      <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#FF4D16] via-[#FF4D16]/40 to-transparent" />

      {/* Outlined index number, fully inside the panel */}
      <span
        aria-hidden
        className={`pointer-events-none select-none absolute top-3 right-4 font-black leading-[0.85] tracking-tighter text-transparent ${s.num}`}
        style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.14)' }}
      >
        {index}
      </span>

      {/* Header */}
      <div className="relative space-y-2.5 pr-16 sm:pr-24">
        <div className="flex items-center gap-2 min-w-0 whitespace-nowrap">
          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#FF4D16] shadow-[0_0_8px_#FF4D16]" />
          <span className="shrink-0 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#FF4D16]">
            {tierLabel}
          </span>
          <span className="shrink-0 text-white/25">/</span>
          <span className="truncate text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-white/60">
            {category}
          </span>
        </div>
        <h3 className={`font-extrabold tracking-tight leading-[1.08] text-white ${s.title}`}>{title}</h3>
      </div>

      {/* Hero outcome metric */}
      {hero && (
        <div className="relative">
          {hero.metric ? (
            <>
              <div
                className={`font-black tracking-tight leading-none bg-gradient-to-br from-[#FF7A4D] to-[#FF4D16] bg-clip-text text-transparent ${s.metric}`}
              >
                {hero.metric}
              </div>
              <p className={`mt-2 font-medium leading-snug text-white/80 max-w-md ${s.caption}`}>
                {hero.rest}
              </p>
            </>
          ) : (
            <p className={`font-semibold leading-snug text-white border-l-2 border-[#FF4D16] pl-3 ${s.caption}`}>
              {hero.rest}
            </p>
          )}
        </div>
      )}

      {/* Supporting outcome points */}
      {points && points.length > 0 && (
        <ul className="relative divide-y divide-white/10 border-y border-white/10">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-3 py-3 text-sm text-white/85 leading-snug">
              <span className="font-mono text-[11px] font-bold text-[#FF4D16] pt-0.5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>
                <HighlightMetrics text={p} />
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Stats row pinned to the bottom */}
      {stats && stats.length > 0 && (
        <div className="relative mt-auto grid grid-flow-col auto-cols-fr gap-px rounded-xl overflow-hidden bg-white/10 border border-white/10">
          {stats.map((st, i) => (
            <div key={i} className="bg-[#141414]/90 px-3 py-2.5">
              <div className={`font-black text-white leading-none ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>
                {st.value}
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-white/50">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {children && <div className="relative">{children}</div>}
    </div>
  );
};
