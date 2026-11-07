import React from 'react';
import { Link } from 'react-router-dom';
import { ALL_SERVICES } from '../../data/services';
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';
import { ServiceSpotlight, HighlightMetrics } from '../../components/ui/ServiceSpotlight';

const FEATURED_SLUGS = [
  'digital-transformation',
  'ch-deploy',
  '8d-customer-complaints',
  'merchandise-ppe',
  'returns-management',
];

export const FeaturedServicesSection: React.FC = () => {
  const featured = FEATURED_SLUGS.map((slug) =>
    ALL_SERVICES.find((s) => s.slug === slug)
  ).filter(Boolean);

  return (
    <section className="w-full py-16 lg:py-24 bg-white border-t border-b border-[#E2DED5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">
            ● PROVEN ON-GROUND CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight">
            Featured Enterprise Services
          </h2>
          <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
            Delivering measurable operational improvements across India’s manufacturing plants, distribution warehouses, transit corridors, and retail supply chains.
          </p>
        </div>

        {/* Alternating Featured Service Cards */}
        <div className="space-y-16 lg:space-y-24">
          {featured.map((service, idx) => {
            if (!service) return null;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Typographic Spotlight Column */}
                <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <ServiceSpotlight
                    index={String(idx + 1).padStart(2, '0')}
                    title={service.title}
                    category={service.category}
                    tierLabel={`Tier ${service.tier} • Featured`}
                    headline={service.expectedOutcomes[0]}
                    stats={[
                      { value: service.subservices.length, label: 'Subservices' },
                      { value: service.deliverables.length, label: 'Deliverables' },
                      { value: service.workflow.length, label: 'Phase workflow' },
                    ]}
                    className="rounded-3xl border border-[#171717] shadow-lg min-h-[320px] sm:min-h-[400px] transition-transform duration-500 hover:-translate-y-1"
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="mt-6 inline-flex px-4 py-2 bg-white hover:bg-[#FF4D16] text-[#171717] hover:text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Details →
                    </Link>
                  </ServiceSpotlight>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#171717] text-xs font-bold border border-[#E2DED5]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D16]" />
                      <span>{service.tierName}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Deliverables Bullet List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Core Deliverables:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#625E58]">
                      {service.deliverables.slice(0, 4).map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#FF4D16] shrink-0 mt-0.5" />
                          <span><HighlightMetrics text={del} tone="dark" /></span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Subservices Pills */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#8C877D] block mb-2">
                      Included Subservices:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.subservices.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF8F5] text-[#171717] font-medium border border-[#E2DED5]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      to={`/services/${service.slug}`}
                      className="px-5 py-3 bg-[#171717] text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-[#FF4D16] transition-colors flex items-center space-x-2 shadow-sm"
                    >
                      <span>Explore Dedicated Workflow</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/design-your-solution"
                      className="px-4 py-3 bg-white border border-[#E2DED5] text-[#171717] text-xs sm:text-sm font-semibold rounded-xl hover:border-[#171717] transition-colors"
                    >
                      Add to DIY Solution
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

