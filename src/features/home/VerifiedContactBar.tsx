import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const VerifiedContactBar: React.FC = () => {
  return (
    <div className="w-full bg-[#f3f0e8] py-8 border-b border-[#171717]/10">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="p-6 sm:p-8 bg-white rounded-[18px] border border-[#171717]/8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center shadow-sm text-xs">
          <div>
            <span className="font-extrabold text-sm text-[#171717] block">CHASEHORSE</span>
            <span className="text-[#8C877D] text-[11px]">Intelligent platform frameworks for enterprise scale.</span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D] font-bold block mb-0.5">
              DIRECT LINK
            </span>
            <a 
              href="mailto:shravan.vibhas@chasehorse.com" 
              className="font-bold text-[#171717] hover:text-[#ff4d12] transition-colors flex items-center space-x-1"
            >
              <Mail className="w-3.5 h-3.5 text-[#ff4d12]" />
              <span>shravan.vibhas@chasehorse.com</span>
            </a>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D] font-bold block mb-0.5">
              OPERATIONS
            </span>
            <a 
              href="tel:+917337369111" 
              className="font-bold text-[#171717] hover:text-[#ff4d12] transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#ff4d12]" />
              <span>+91 7337369111</span>
            </a>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D] font-bold block mb-0.5">
              REGIONAL HQ
            </span>
            <span className="font-bold text-[#171717] flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#ff4d12]" />
              <span>Bangalore, India</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

