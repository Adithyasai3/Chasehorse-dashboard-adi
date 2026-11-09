import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_NAVIGATION, SubNavItem, NavSection } from '../../data/navigation';
import { ChaseHorseLogo } from '../ui/ChaseHorseLogo';
import { useCart } from '../../hooks/useCart';
import { Search, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

// Navbar items shown in the header, in order
const NAV_IDS = ['platform', 'solutions', 'live-market', 'discover', 'hse-shop', 'partners'];
const NAV_ITEMS = MAIN_NAVIGATION.filter((item) => NAV_IDS.includes(item.id));

/** Column heading in the accent colour. */
const SectionTitle: React.FC<{ section: NavSection; className: string }> = ({ section, className }) => (
  <div className={`${className} flex items-center gap-2 !text-[#FF4D16] font-semibold`}>
    <span>{section.title}</span>
  </div>
);

const isExternal = (link: SubNavItem) => link.external || link.path.startsWith('http');

/** A single dropdown link — internal routes use the router, external ones open in a new tab. */
const NavLink: React.FC<{ link: SubNavItem; onNavigate: () => void; className: string }> = ({ link, onNavigate, className }) =>
  isExternal(link) ? (
    <a href={link.path} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
      {link.title}
    </a>
  ) : (
    <Link to={link.path} onClick={onNavigate} className={className}>
      {link.title}
    </Link>
  );

export const SiteHeader: React.FC<{ onOpenSearch?: () => void }> = ({ onOpenSearch }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();

  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // Hover: open immediately, close after a short grace period so the cursor
  // can travel from the nav item down into the dropdown without it flickering shut.
  const hoverOpen = (id: string) => {
    cancelClose();
    setOpenId(id);
  };
  const hoverClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenId(null), 150);
  };

  useEffect(() => cancelClose, []);

  const closeAll = () => {
    cancelClose();
    setOpenId(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  // Close on route change
  useEffect(() => {
    closeAll();
  }, [location.pathname, location.search, location.hash]);

  // Close on outside click and on Escape
  useEffect(() => {
    if (!openId && !mobileOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeAll();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openId, mobileOpen]);

  const openItem = NAV_ITEMS.find((item) => item.id === openId);
  const sections = openItem?.megaMenu?.sections ?? [];

  return (
    <header ref={headerRef} onMouseLeave={hoverClose} className="sticky top-0 z-40 w-full bg-white">
      <div className="relative z-20 bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="shrink-0" aria-label="Chasehorse home">
              <ChaseHorseLogo variant="dark" showTagline={false} className="w-36 sm:w-40 h-auto" />
            </Link>

            {/* Desktop navigation — centred, opens on hover (click/keyboard also work) */}
            <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1" aria-label="Main">
              {NAV_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="site-nav-dropdown"
                    onMouseEnter={() => hoverOpen(item.id)}
                    onFocus={() => hoverOpen(item.id)}
                    onClick={() => hoverOpen(item.id)}
                    className={`px-4 py-1.5 rounded text-sm font-semibold text-[#171A20] transition-colors ${
                      isOpen ? 'bg-[#F4F4F4]' : 'hover:bg-[#F4F4F4]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 rounded text-[#171A20] hover:bg-[#F4F4F4] transition-colors"
                title="Search (Ctrl+K)"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.75} />
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded text-[#171A20] hover:bg-[#F4F4F4] transition-colors"
                title="View Cart"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-[#FF4D16] rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Login — opens the portal in a new tab (existing behaviour) */}
              <Link
                to="/login"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex px-4 py-1.5 rounded text-sm font-semibold text-[#171A20] hover:bg-[#F4F4F4] transition-colors"
                title="Open Client & Partner Portal in new tab"
              >
                Login
              </Link>

              {/* Mobile / tablet menu toggle */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(!mobileOpen);
                  setMobileExpanded(null);
                }}
                className="lg:hidden ml-1 px-3 py-1.5 rounded text-sm font-medium text-[#171A20] bg-[#F4F4F4] hover:bg-[#EAEAEA] transition-colors inline-flex items-center gap-1.5"
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP DROPDOWN ================= */}
      {openItem && (
        <>
          <div
            id="site-nav-dropdown"
            onMouseEnter={cancelClose}
            className="hidden lg:block absolute z-20 left-0 right-0 top-full bg-white"
          >
            <div className="mx-auto max-w-5xl px-12 pt-5 pb-7">
              <div className="flex justify-center gap-x-20 xl:gap-x-24">
                {sections.map((section) => (
                  <div key={section.title} className="min-w-[180px]">
                    <SectionTitle section={section} className="text-[13px] text-[#5C5E62] mb-2.5" />
                    <ul className="space-y-2">
                      {section.items.map((link) => (
                        <li key={link.path + link.title}>
                          <NavLink
                            link={link}
                            onNavigate={closeAll}
                            className="text-sm font-semibold text-[#171A20] hover:underline underline-offset-4"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Page dimmer — clicking it closes the dropdown */}
          <div
            aria-hidden
            onClick={closeAll}
            onMouseEnter={hoverClose}
            className="hidden lg:block fixed inset-0 top-16 z-10 bg-black/10 backdrop-blur-[2px]"
          />
        </>
      )}

      {/* ================= MOBILE / TABLET MENU ================= */}
      {mobileOpen && (
        <div className="lg:hidden absolute z-20 left-0 right-0 top-full bg-white border-t border-[#EEEEEE] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <ul className="px-4 sm:px-6 py-3">
            {NAV_ITEMS.map((item) => {
              const expanded = mobileExpanded === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setMobileExpanded(expanded ? null : item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded text-[15px] font-medium text-[#171A20] ${
                      expanded ? 'bg-[#F4F4F4]' : 'hover:bg-[#F4F4F4]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 text-[#5C5E62] ${expanded ? 'rotate-180' : ''}`} />
                  </button>

                  {expanded && (
                    <div className="px-3 pt-2 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                      {item.megaMenu?.sections.map((section) => (
                        <div key={section.title}>
                          <SectionTitle section={section} className="text-[13px] text-[#5C5E62] mb-2" />
                          <ul className="space-y-2">
                            {section.items.map((link) => (
                              <li key={link.path + link.title}>
                                <NavLink
                                  link={link}
                                  onNavigate={closeAll}
                                  className="text-sm font-semibold text-[#171A20] hover:underline underline-offset-4"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}

            <li className="sm:hidden">
              <Link
                to="/login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeAll}
                className="block px-3 py-3 rounded text-[15px] font-medium text-[#171A20] hover:bg-[#F4F4F4]"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
      {mobileOpen && (
        <div aria-hidden onClick={closeAll} className="lg:hidden fixed inset-0 top-16 z-10 bg-black/10 backdrop-blur-[2px]" />
      )}
    </header>
  );
};
