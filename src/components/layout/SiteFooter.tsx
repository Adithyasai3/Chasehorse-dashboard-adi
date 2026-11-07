import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Mail } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-12 border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pre-footer Banner: CTA */}
        <div className="bg-gradient-to-r from-[#222222] to-[#1c1c1c] rounded-3xl p-8 sm:p-10 mb-16 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16]">
              ● PAN-INDIA FIELD EXECUTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to eliminate transit damages, dock delays, and logistics blind spots?
            </h3>
            <p className="text-sm text-[#E2DED5]/80 leading-relaxed">
              Deploy vetted field supervisors, digitize E-way bill tracking, or customize a Tier 1-3 operational framework for your supply chain today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/design-your-solution"
              className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-all shadow-lg hover:shadow-[#FF4D16]/20 flex items-center space-x-2 text-sm"
            >
              <span>Design Your Solution</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20want%20to%20connect%20regarding%20logistics%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1EBE5D] transition-all flex items-center space-x-2 text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Logo, Hub Cities, Copyright, Disclaimers */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src="/chasehorse-logo.png"
              alt="Chasehorse"
              className="h-8 w-auto filter invert"
            />
            <span className="text-xs text-[#E2DED5]/60 text-center sm:text-left">
              Growth Enabling Logiworkx Partner (GELP) • © {new Date().getFullYear()} Chasehorse. All rights reserved.
            </span>
          </div>

          {/* Company link */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#FF4D16] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF4D16]" />
            <span>Contact Us</span>
          </Link>

          {/* Hub cities pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-[#E2DED5]/60">
            <span className="text-[#FF4D16] font-semibold">Operating Hubs:</span>
            <span>New Delhi</span> • 
            <span>Mumbai</span> • 
            <span>Bengaluru (HQ)</span> • 
            <span>Chennai</span> • 
            <span>Kolkata</span> • 
            <span>Hyderabad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

