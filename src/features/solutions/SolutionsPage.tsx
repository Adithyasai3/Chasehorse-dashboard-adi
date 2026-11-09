import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICE_TIERS, ALL_SERVICES } from '../../data/services';
import { ArrowRight, ChevronRight, CheckCircle2, Factory, Car, ShoppingCart, Pill, ShieldAlert, Cpu } from 'lucide-react';

export const SECTORS_AND_INDUSTRIES = [
  {
    icon: Car,
    title: 'Automotive & Heavy Engineering',
    desc: 'Just-in-Time (JIT) dock delivery, certified heavy cargo lashing, zero transit damage on precision machined parts.',
    metrics: '94% Damage Reduction',
  },
  {
    icon: ShoppingCart,
    title: 'FMCG & Fast-Moving Consumer Goods',
    desc: 'High-velocity 3PL warehouse cross-docking, truck cube optimization, and rapid secondary market replenishment.',
    metrics: '38% Faster Dock Turnaround',
  },
  {
    icon: Pill,
    title: 'Pharmaceuticals & Biologics',
    desc: 'Continuous cold-chain temperature telemetry, zero-tamper security seals, and air-freight express feeder transit.',
    metrics: '100% Cold-Chain Compliance',
  },
  {
    icon: Factory,
    title: 'Industrial Manufacturing & EPC',
    desc: 'Oversize trailer staging, highway breakdown quick-response squads, and on-site factory HSE store management.',
    metrics: 'Sub-4h Breakdown Triage',
  },
];

export const SolutionsPage: React.FC = () => {
  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● TAILORED SUPPLY CHAIN ARCHITECTURE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Enterprise Solutions & Service Tiers
            </h1>
            <p className="text-sm sm:text-base text-[#E2DED5]/90 leading-relaxed font-light">
              We design specialized logistics execution models structured across three progressive tiers. Combine ground dock personnel, digital TMS workflows, and autonomous logistics technologies tailored to your sector.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                to="/design-your-solution"
                className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm flex items-center space-x-2 shadow-lg"
              >
                <span>Design Your Solution (DIY)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Service Tiers Overview */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● SYSTEMATIC MATURITY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717]">
              The Three-Tier Operational Model
            </h2>
            <p className="text-sm text-[#625E58] max-w-2xl">
              Understand the purpose, audience, and value created by each operational tier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_TIERS.map((tier) => {
              const services = ALL_SERVICES.filter((s) => s.tier === tier.tier);

              return (
                <div
                  key={tier.tier}
                  className="bg-white rounded-3xl border border-[#E2DED5] p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#171717] text-white">
                        Tier {tier.tier}
                      </span>
                      <span className="text-xs font-bold text-[#FF4D16]">
                        {services.length} Services
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#FF4D16] transition-colors">
                      {tier.title.split('—')[1]?.trim() || tier.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
                      {tier.subtitle}
                    </p>

                    <div className="pt-2 border-t border-[#E2DED5]/60">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C877D] block mb-2">
                        Included Services:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#171717]">
                        {services.map((s) => (
                          <li key={s.id} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                            <Link to={`/services/${s.slug}`} className="hover:underline">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E2DED5]">
                    <Link
                      to={`/solutions/tier-${tier.tier}`}
                      className="w-full py-2.5 bg-[#FAF8F5] border border-[#E2DED5] text-[#171717] hover:border-[#171717] rounded-xl text-xs font-bold text-center flex items-center justify-center space-x-1 transition-colors"
                    >
                      <span>Explore Tier {tier.tier} Dossier</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sectors & Industries Section */}
        <div id="sectors" className="space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● INDUSTRY SPECIALIZATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717]">
              Sectors & Industries We Serve
            </h2>
            <p className="text-sm text-[#625E58] max-w-2xl">
              Every vertical faces distinct operational challenges. Chasehorse crafts customized SOPs and staffing for specific cargo profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTORS_AND_INDUSTRIES.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E2DED5] p-6 space-y-3 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-[#171717]">{sec.title}</h4>
                  <p className="text-xs text-[#625E58] leading-relaxed">{sec.desc}</p>
                  <div className="pt-2 text-xs font-mono font-bold text-[#FF4D16]">
                    Impact: {sec.metrics}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Ecosystem Section */}
        <div id="ecosystem" className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-sm space-y-6 scroll-mt-24">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● NATIONWIDE COHESION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
              The Chasehorse Partner Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-[#625E58]">
              Connecting shippers, transporters, terminal yard owners, and financial institutions into a single network with verified SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <h4 className="font-bold text-sm text-[#171717]">Shippers & Manufacturers</h4>
              <p className="text-xs text-[#625E58]">
                Get guaranteed truck placement, dock supervisor presence, and zero-defect transit at benchmarked rates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <h4 className="font-bold text-sm text-[#171717]">Transporters & Fleet Owners</h4>
              <p className="text-xs text-[#625E58]">
                Steady return loads, terminal space parking, driver safety gear, and rapid trip finance against digital PODs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
              <h4 className="font-bold text-sm text-[#171717]">Terminal & Yard Owners</h4>
              <p className="text-xs text-[#625E58]">
                Monetize secure truck bays, cross-docking berths, and warehouse space across Indian transit corridors.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#E2DED5]">
            <span className="text-xs font-semibold text-[#625E58]">
              Are you a logistics professional or transporter? Join our network:
            </span>
            <Link
              to="/partners/apply"
              className="px-5 py-2.5 bg-[#FF4D16] text-white text-xs font-bold rounded-xl hover:bg-[#E53E0B] transition-colors"
            >
              Apply as a Partner →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

