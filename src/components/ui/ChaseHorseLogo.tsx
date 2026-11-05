import React from 'react';

interface ChaseHorseLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'dark' | 'light' | 'ivory';
  /** Kept for API compatibility; the image logo has no built-in animation. */
  animated?: boolean;
}

const LOGO_SRC = '/chasehorse_new_logo_cropped.png';

export const ChaseHorseLogo: React.FC<ChaseHorseLogoProps> = ({
  className = 'h-10 w-auto',
  showTagline = true,
  variant = 'dark',
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <img
        src={LOGO_SRC}
        alt="ChaseHorse"
        draggable={false}
        className={`block w-full h-auto ${isLight ? 'brightness-0 invert' : ''}`}
      />

      {showTagline && (
        <span
          className={`mt-[4%] w-full text-center font-medium uppercase tracking-[0.3em] text-[0.55em] sm:text-xs ${
            isLight ? 'text-white' : 'text-[#171717]'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Growth Enabling Logiworkx Partner
        </span>
      )}
    </div>
  );
};
