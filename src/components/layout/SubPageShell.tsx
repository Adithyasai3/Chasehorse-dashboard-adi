import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { MAIN_NAVIGATION } from '../../data/navigation';

interface SubPageShellProps {
  /** Navbar item this page belongs to (e.g. 'solutions', 'careers') — drives the breadcrumb and sidebar. */
  navId: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Optional buttons shown in the banner. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Standard layout for a page opened from a navbar dropdown link:
 * breadcrumb, banner, a sidebar listing the same links as that dropdown, and the page content.
 */
export const SubPageShell: React.FC<SubPageShellProps> = ({ navId, eyebrow, title, intro, actions, children }) => {
  const location = useLocation();
  const nav = MAIN_NAVIGATION.find((n) => n.id === navId);
  const sections = nav?.megaMenu?.sections ?? [];
  const current = location.pathname + location.search;
  const links = sections.flatMap((s) => s.items).filter((l) => !l.external && !l.path.startsWith('http'));

  return (
    <div className="w-full bg-[#F4F1EA] pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-xs text-[#625E58] overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#FF4D16]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          {nav && (
            <>
              <Link to={nav.path} className="hover:text-[#FF4D16]">{nav.label}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
            </>
          )}
          <span className="font-bold text-[#171717]">{title}</span>
        </nav>

        {/* Banner */}
        <section
          className="relative overflow-hidden rounded-3xl bg-[#141414] text-white border border-white/10 shadow-2xl mb-10"
          style={{
            backgroundImage: [
              'radial-gradient(90% 120% at 100% 0%, rgba(255,77,22,0.22) 0%, rgba(255,77,22,0) 55%)',
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)',
              'linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: '100% 100%, 32px 32px, 32px 32px',
          }}
        >
          <div className="relative p-8 sm:p-12 space-y-4 max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.18em] text-[#FF4D16]">
              {nav ? `${nav.label} · ` : ''}{eyebrow}
            </span>
            <h1 className="font-hero text-4xl sm:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05]">{title}</h1>
            <p className="text-base sm:text-lg text-[#E2DED5]/85 leading-relaxed">{intro}</p>
            {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
          </div>
        </section>

        {/* Mobile: sibling links as a scrollable row */}
        {links.length > 0 && (
          <div className="lg:hidden -mx-4 px-4 mb-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
            {links.map((l) => {
              const active = l.path === current;
              return (
                <Link
                  key={l.path + l.title}
                  to={l.path}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold border transition-colors ${
                    active ? 'bg-[#171717] text-white border-[#171717]' : 'bg-white text-[#171717] border-[#E2DED5] hover:border-[#171717]'
                  }`}
                >
                  {l.title}
                </Link>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Desktop sidebar — same links as the navbar dropdown */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 bg-white rounded-2xl border border-[#E2DED5] p-2">
              {sections.map((section, sIdx) => (
                <div key={section.title} className={sIdx > 0 ? 'mt-2 pt-2 border-t border-[#E2DED5]' : ''}>
                  <div
                    className={`px-3 pt-2 pb-1.5 text-[11px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 ${
                      section.highlight ? 'text-[#FF4D16]' : 'text-[#8C877D]'
                    }`}
                  >
                    {section.title}
                  </div>
                  {section.items.map((l) => {
                    const active = l.path === current;
                    const external = l.external || l.path.startsWith('http');
                    const cls = `relative block px-3 py-2.5 rounded-xl text-sm transition-colors ${
                      active ? 'bg-[#FAF8F5] text-[#171717] font-bold' : 'text-[#625E58] hover:text-[#171717] hover:bg-[#FAF8F5]'
                    }`;
                    return external ? (
                      <a key={l.path + l.title} href={l.path} target="_blank" rel="noopener noreferrer" className={cls}>
                        {l.title}
                      </a>
                    ) : (
                      <Link key={l.path + l.title} to={l.path} aria-current={active ? 'page' : undefined} className={cls}>
                        {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-[#FF4D16]" />}
                        {l.title}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </aside>

          <main className="lg:col-span-9 min-w-0 space-y-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

/* ---------- Small shared building blocks for sub-page content ---------- */

export const SubSectionHeading: React.FC<{ eyebrow: string; title: string; text?: string }> = ({ eyebrow, title, text }) => (
  <div className="space-y-2 max-w-3xl">
    <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">● {eyebrow}</span>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">{title}</h2>
    {text && <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">{text}</p>}
  </div>
);

export const InfoCard: React.FC<{ icon?: React.ElementType; title: string; text: string; footer?: string }> = ({
  icon: Icon,
  title,
  text,
  footer,
}) => (
  <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 space-y-3 shadow-sm">
    {Icon && (
      <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
    )}
    <h4 className="font-bold text-base text-[#171717]">{title}</h4>
    <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">{text}</p>
    {footer && <div className="pt-1 text-xs font-mono font-bold text-[#FF4D16]">{footer}</div>}
  </div>
);

export const StepList: React.FC<{ steps: { title: string; text: string }[] }> = ({ steps }) => (
  <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {steps.map((s, i) => (
      <li key={s.title} className="bg-white rounded-2xl border border-[#E2DED5] p-6 flex gap-4">
        <span className="shrink-0 w-9 h-9 rounded-xl bg-[#171717] text-white font-mono text-xs font-bold flex items-center justify-center">
          {String(i + 1).padStart(2, '0')}
        </span>
        <div>
          <h4 className="font-bold text-sm text-[#171717]">{s.title}</h4>
          <p className="mt-1 text-xs sm:text-sm text-[#625E58] leading-relaxed">{s.text}</p>
        </div>
      </li>
    ))}
  </ol>
);
