import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { PLATFORM_TOPICS } from './platformTopics';

export const PlatformPage: React.FC = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('Schedule GELP Demo');

  const openModal = (title: string) => {
    setEnquiryTitle(title);
    setEnquiryOpen(true);
  };

  return (
    <div className="w-full bg-[#F4F1EA] pt-8 pb-20">
      
      {/* Hero: What is GELP? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/10">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D16]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#FF4D16] text-xs font-mono font-bold uppercase tracking-wider">
              <span>● THE CHASEHORSE ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Platform (GELP)
            </h1>

            <p className="text-base sm:text-xl text-[#E2DED5]/90 leading-relaxed font-light">
              One unified, transparent platform to orchestrate and scale on-ground logistics operations across India — bringing people, process, software, and capital into real-time alignment.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openModal('Request GELP Enterprise Trial')}
                className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-all text-sm flex items-center space-x-2 shadow-lg"
              >
                <span>Get Started — Ask for Trials</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openModal('Book a Live GELP Demo')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-[#171717] border border-white/20 font-bold rounded-xl transition-all text-sm"
              >
                Book a Demo
              </button>

              <a
                href="https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20want%20to%20learn%20more%20about%20GELP%20Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1EBE5D] transition-all text-sm flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Let&apos;s Connect</span>
              </a>
            </div>
          </div>

          {/* Interactive Laptop Mockup Display (as shown in reference sheet) */}
          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center">
            <div className="w-full max-w-4xl bg-[#222222] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-[#E2DED5]/60">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="font-mono text-[11px] ml-2 text-white">gelp.chasehorse.com — Enterprise Portal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[11px] text-green-400">All 6 Metro Hubs Connected</span>
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#171717] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#FF4D16] uppercase">Fleet & Docks</span>
                  <div className="text-2xl font-bold text-white">1,420 Active</div>
                  <p className="text-xs text-[#E2DED5]/70">Live consignments with verified GPS & E-way bills</p>
                </div>
                <div className="bg-[#171717] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#FF4D16] uppercase">Field Personnel</span>
                  <div className="text-2xl font-bold text-white">412 Stationed</div>
                  <p className="text-xs text-[#E2DED5]/70">CH Deploy leads actively supervising docks today</p>
                </div>
                <div className="bg-[#171717] p-4 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-[#FF4D16] uppercase">8D Quality OTIF</span>
                  <div className="text-2xl font-bold text-white">99.82%</div>
                  <p className="text-xs text-[#E2DED5]/70">Zero-defect compliance on automotive & retail lanes</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Platform topics — each opens its own page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-3xl mb-8 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
            ● EXPLORE THE PLATFORM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            Everything Inside GELP
          </h2>
          <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
            Pick a topic to dive deeper — how the platform works, what it includes, and how it scales with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORM_TOPICS.map((t, i) => {
            const TIcon = t.icon;
            return (
              <Link
                key={t.slug}
                to={`/platform/${t.slug}`}
                className="group relative p-6 rounded-2xl bg-white border border-[#E2DED5] hover:border-[#171717] hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
              >
                <span className="absolute top-5 right-5 font-mono text-xs font-bold text-[#E2DED5] group-hover:text-[#FF4D16] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-11 h-11 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center mb-4">
                  <TIcon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#171717]">{t.title}</h3>
                <p className="mt-1.5 text-xs text-[#625E58] leading-relaxed flex-1">{t.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#171717] group-hover:text-[#FF4D16] transition-colors">
                  Open page
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>



      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={enquiryTitle}
      />
    </div>
  );
};
