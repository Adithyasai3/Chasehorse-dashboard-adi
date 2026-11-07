import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ALL_SERVICES } from '../../data/services';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  Layers, 
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { ServiceSpotlight, AccentTitle, HighlightMetrics } from '../../components/ui/ServiceSpotlight';

export const ServiceDetailPage: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const navigate = useNavigate();
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const service = ALL_SERVICES.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#171717]">Service Not Found</h2>
        <p className="text-sm text-[#625E58]">The requested service could not be located in our catalogue.</p>
        <Link
          to="/solutions"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#FF4D16] text-white rounded-xl text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Solutions</span>
        </Link>
      </div>
    );
  }

  const indexInTier =
    ALL_SERVICES.filter((s) => s.tier === service.tier).findIndex((s) => s.id === service.id) + 1;

  // Related services in the same tier or complementary
  const relatedServices = ALL_SERVICES.filter(
    (s) => s.tier === service.tier && s.id !== service.id
  ).slice(0, 3);

  return (
    <div className="w-full bg-[#F4F1EA] py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb Hierarchy (Home → Solutions → Tier → Service) */}
        <nav className="flex items-center space-x-2 text-xs text-[#625E58] overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#FF4D16]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <Link to="/solutions" className="hover:text-[#FF4D16]">Solutions</Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <Link to={`/solutions/tier-${service.tier}`} className="hover:text-[#FF4D16]">
            Tier {service.tier}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#8C877D]" />
          <span className="font-bold text-[#171717]">{service.title}</span>
        </nav>

        {/* Hero Banner with Background Image */}
        <div className="relative rounded-3xl overflow-hidden bg-[#171717] text-white border border-[#E2DED5] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6 z-10">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[#FF4D16] text-xs font-mono font-bold uppercase tracking-wider">
                  <span>{service.tierName} • {service.category}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  <AccentTitle title={service.title} />
                </h1>

                <p className="text-sm sm:text-base text-[#E2DED5]/90 leading-relaxed max-w-xl">
                  {service.shortDesc}
                </p>
              </div>

              {/* Subservices Badges */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E2DED5]/70">
                  Included Subservices & Modules:
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.subservices.map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-white/10 text-white font-medium border border-white/10 backdrop-blur-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm flex items-center space-x-2 shadow-lg"
                >
                  <span>Book Consultation / Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1EBE5D] transition-colors text-sm flex items-center space-x-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Specialist</span>
                </a>

                <Link
                  to="/design-your-solution"
                  className="px-4 py-3.5 text-xs text-[#E2DED5] hover:text-white transition-colors"
                >
                  Add to DIY Proposal →
                </Link>
              </div>
            </div>

            {/* Right Typographic Outcomes Panel */}
            <ServiceSpotlight
              index={String(indexInTier).padStart(2, '0')}
              title="Measurable Outcomes"
              category={service.category}
              tierLabel={`Tier ${service.tier} • Capability ${String(indexInTier).padStart(2, '0')}`}
              headline={service.expectedOutcomes[0]}
              points={service.expectedOutcomes.slice(1, 3)}
              stats={[
                { value: service.subservices.length, label: 'Modules' },
                { value: service.workflow.length, label: 'Phases' },
                { value: 'SLA', label: 'Governed' },
              ]}
              size="md"
              className="lg:col-span-5 min-h-[260px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-white/10"
            />

          </div>
        </div>

        {/* Detailed Explanation & Problems Solved Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Detailed Narrative (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E2DED5] p-8 space-y-6 shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
                ● SERVICE DEEP DIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171717]">
                Executive Overview & Operational Context
              </h2>
              <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            {/* Target Audience */}
            <div className="pt-4 border-t border-[#E2DED5] space-y-3">
              <h3 className="font-bold text-base text-[#171717] flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#FF4D16]" />
                <span>Who This Service Is Engineered For:</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#625E58]">
                {service.targetAudience.map((target, tIdx) => (
                  <li key={tIdx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Business Problems Solved (5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] rounded-3xl border border-[#E2DED5] p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold">
                ● PAIN POINTS ELIMINATED
              </span>
              <h3 className="text-xl font-bold text-[#171717]">
                Bottlenecks This Service Solves
              </h3>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#625E58]">
              {service.problemsSolved.map((prob, pIdx) => (
                <li key={pIdx} className="p-3 bg-white rounded-xl border border-[#E2DED5] flex items-start space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 bg-[#FFF0EB] rounded-2xl border border-[#FF4D16]/20 text-xs text-[#FF4D16] space-y-1">
              <strong className="block font-bold">Guaranteed SLA Delivery</strong>
              <p className="text-[#625E58]">All field deployments and digital tracking modules are governed by legally binding enterprise SLAs.</p>
            </div>
          </div>

        </div>

        {/* Step-by-Step Customized Workflow (MANDATORY REQUIREMENT) */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
              ● STEP-BY-STEP EXECUTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#171717]">
              Service Workflow & Delivery Model
            </h2>
            <p className="text-xs sm:text-sm text-[#625E58]">
              From initial dock assessment to ongoing quality governance, here is how our team executes this service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {service.workflow.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] flex flex-col justify-between space-y-3 relative group hover:border-[#FF4D16] transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF4D16] text-white flex items-center justify-center font-bold text-xs">
                    0{step.step}
                  </div>
                  <h4 className="font-bold text-sm text-[#171717]">{step.title}</h4>
                  <p className="text-xs text-[#625E58] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono font-bold text-[#FF4D16] uppercase">
                  Phase {step.step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables vs Expected Business Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Key Deliverables */}
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 space-y-4 shadow-sm">
            <h3 className="font-bold text-lg text-[#171717] flex items-center space-x-2">
              <Layers className="w-5 h-5 text-[#FF4D16]" />
              <span>Tangible Deliverables Provided</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#625E58]">
              {service.deliverables.map((del, dIdx) => (
                <li key={dIdx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expected Business Outcomes */}
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 space-y-4 shadow-sm">
            <h3 className="font-bold text-lg text-[#171717] flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#FF4D16]" />
              <span>Measurable Business Outcomes</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#625E58]">
              {service.expectedOutcomes.map((out, oIdx) => (
                <li key={oIdx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                  <span><HighlightMetrics text={out} tone="dark" /></span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Related Services Navigation */}
        {relatedServices.length > 0 && (
          <div className="space-y-4 pt-6">
            <h3 className="font-bold text-lg text-[#171717]">Complementary Services in Tier {service.tier}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/services/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white border border-[#E2DED5] hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-[#FF4D16] uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#171717] group-hover:text-[#FF4D16] transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#625E58] line-clamp-2">{rel.shortDesc}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#E2DED5] text-xs font-bold text-[#FF4D16] flex items-center justify-between">
                    <span>View Service →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={`Inquire About ${service.title}`}
        defaultService={service.title}
      />
    </div>
  );
};

