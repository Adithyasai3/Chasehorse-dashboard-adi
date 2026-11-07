import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICE_TIERS, ALL_SERVICES } from '../../data/services';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { ServiceSpotlight } from '../../components/ui/ServiceSpotlight';

export const TierDetailPage: React.FC = () => {
  const { tierId } = useParams<{ tierId: string }>();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  // Parse tier number from "tier-1", "tier-2", "tier-3"
  const tierNumber = parseInt(tierId?.replace('tier-', '') || '1') as 1 | 2 | 3;
  const tierInfo = SERVICE_TIERS.find((t) => t.tier === tierNumber) || SERVICE_TIERS[0];
  const servicesInTier = ALL_SERVICES.filter((s) => s.tier === tierNumber);

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#625E58]">
          <Link to="/" className="hover:text-[#FF4D16]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <Link to="/solutions" className="hover:text-[#FF4D16]">Solutions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <span className="font-bold text-[#171717]">{tierInfo.title}</span>
        </nav>

        {/* Tier Hero Header */}
        <div className="bg-[#171717] rounded-3xl text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#FF4D16] text-xs font-mono font-bold uppercase tracking-wider">
              <span>{tierInfo.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {tierInfo.title}
            </h1>

            <p className="text-base sm:text-lg text-[#E2DED5]/90 leading-relaxed font-light">
              {tierInfo.description}
            </p>

            <div className="pt-2 text-xs text-[#E2DED5]/70">
              <strong className="text-white">Primary Beneficiaries:</strong> {tierInfo.target}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-6 py-3 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm flex items-center space-x-2 shadow-md"
              >
                <span>Deploy Tier {tierNumber} Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/design-your-solution"
                className="px-5 py-3 bg-white/10 hover:bg-white text-white hover:text-[#171717] border border-white/20 font-bold rounded-xl transition-all text-sm"
              >
                Configure in DIY Estimator
              </Link>
            </div>
          </div>
        </div>

        {/* All Services in this Tier */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
                ● CATALOGUE BREAKDOWN
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                Included Services ({servicesInTier.length})
              </h2>
            </div>
            <span className="text-xs text-[#625E58]">
              Click any service for detailed workflows, deliverables, and problems solved.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesInTier.map((service, sIndex) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#E2DED5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <ServiceSpotlight
                    index={String(sIndex + 1).padStart(2, '0')}
                    title={service.title}
                    category={service.category}
                    tierLabel={`Tier ${service.tier}`}
                    headline={service.expectedOutcomes[0]}
                    size="sm"
                    className="min-h-[192px]"
                  />

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-[#625E58] leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    <div className="pt-2 border-t border-[#E2DED5]/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C877D] block mb-1.5">
                        Key Subservices:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {service.subservices.slice(0, 3).map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] px-2 py-0.5 bg-[#FAF8F5] text-[#171717] rounded border border-[#E2DED5]"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-[#E2DED5]/60 mt-4 flex items-center justify-end">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-[#171717] group-hover:text-[#FF4D16] transition-colors"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Connection & Upgrades */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 space-y-4 shadow-sm">
          <h3 className="font-bold text-lg text-[#171717]">
            How Tier {tierNumber} Connects to the Rest of the Platform
          </h3>
          <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">
            {tierNumber === 1 && (
              'Tier 1 provides the bedrock of certified dock supervision, inward visibility, and 8D complaint management. Once operational stability is reached, organizations seamlessly activate Tier 2 optimization tools and automated lane rationalization.'
            )}
            {tierNumber === 2 && (
              'Tier 2 builds upon Tier 1 field discipline by layering data science, telematics, freight bill authentication, and DEPLOY-CDX Pro field engineering. Organizations achieving scale can graduate to Tier 3 autonomous technologies.'
            )}
            {tierNumber === 3 && (
              'Tier 3 deploys autonomous AI agents, drone scans, IoT environmental telemetry, and specialized transhipment hubs for enterprises seeking industry 4.0 autonomous supply chain leadership.'
            )}
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            {tierNumber !== 1 && (
              <Link
                to="/solutions/tier-1"
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#171717]"
              >
                ← View Tier 1 Core Services
              </Link>
            )}
            {tierNumber !== 2 && (
              <Link
                to="/solutions/tier-2"
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#171717]"
              >
                {tierNumber === 1 ? 'Explore Tier 2 Strategic Services →' : '← View Tier 2 Strategic Services'}
              </Link>
            )}
            {tierNumber !== 3 && (
              <Link
                to="/solutions/tier-3"
                className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] text-xs font-bold text-[#171717] hover:border-[#171717]"
              >
                Explore Tier 3 Advanced Tech →
              </Link>
            )}
          </div>
        </div>

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={`Deploy Tier ${tierNumber} Services`}
        defaultService={`Tier ${tierNumber} — ${tierInfo.title}`}
      />
    </div>
  );
};

