import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Store, Warehouse, Landmark } from 'lucide-react';
import { SubPageShell, SubSectionHeading, InfoCard } from '../../components/layout/SubPageShell';
import { SECTORS_AND_INDUSTRIES } from './SolutionsPage';

export type SolutionsTopic = 'sectors' | 'industries' | 'ecosystem';

const primaryBtn =
  'px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm inline-flex items-center gap-2 shadow-lg';

export const SolutionsTopicPage: React.FC<{ topic: SolutionsTopic }> = ({ topic }) => {
  const designCta = (
    <Link to="/design-your-solution" className={primaryBtn}>
      Design Your Solution (DIY) <ArrowRight className="w-4 h-4" />
    </Link>
  );

  let page: { eyebrow: string; title: string; intro: string; actions?: React.ReactNode; body: React.ReactNode };

  switch (topic) {
    case 'sectors':
      page = {
        eyebrow: 'By Market Scope',
        title: 'Sectors',
        intro: 'Shippers, 3PLs, retailers, and freight operators — each runs on a different operating model, and GELP is configured for each one.',
        actions: designCta,
        body: (
          <>
            <SubSectionHeading eyebrow="WHO WE SERVE" title="Built for Every Side of the Freight Network" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard icon={Factory} title="Shippers & Manufacturers" text="Get guaranteed truck placement, dock supervisor presence, and zero-defect transit at benchmarked rates." />
              <InfoCard icon={Warehouse} title="3PL Service Providers" text="Transparent client reporting, audited warehouse operations, and on-ground leads that protect your SLAs." />
              <InfoCard icon={Store} title="Retailers & Distributors" text="High-velocity cross-docking, rapid secondary replenishment, and inward visibility across every store and depot." />
              <InfoCard icon={Truck} title="Freight Operators & Transporters" text="Steady return loads, terminal space parking, driver safety gear, and rapid trip finance against digital PODs." />
            </div>
          </>
        ),
      };
      break;

    case 'industries':
      page = {
        eyebrow: 'By Market Scope',
        title: 'Industries',
        intro: 'Every vertical faces distinct operational challenges. Chasehorse crafts customized SOPs and staffing for specific cargo profiles.',
        actions: designCta,
        body: (
          <>
            <SubSectionHeading eyebrow="INDUSTRY SPECIALIZATION" title="Industries We Serve" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SECTORS_AND_INDUSTRIES.map((ind) => (
                <InfoCard key={ind.title} icon={ind.icon} title={ind.title} text={ind.desc} footer={`Impact: ${ind.metrics}`} />
              ))}
            </div>
          </>
        ),
      };
      break;

    case 'ecosystem':
    default:
      page = {
        eyebrow: 'By Market Scope',
        title: 'Partner Ecosystem',
        intro: 'Connecting shippers, transporters, terminal yard owners, and financial institutions into a single network with verified SLAs.',
        actions: (
          <Link to="/partners/apply" className={primaryBtn}>
            Apply as a Partner <ArrowRight className="w-4 h-4" />
          </Link>
        ),
        body: (
          <>
            <SubSectionHeading eyebrow="NATIONWIDE COHESION" title="One Network, Verified SLAs" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon={Factory} title="Shippers & Manufacturers" text="Get guaranteed truck placement, dock supervisor presence, and zero-defect transit at benchmarked rates." />
              <InfoCard icon={Truck} title="Transporters & Fleet Owners" text="Steady return loads, terminal space parking, driver safety gear, and rapid trip finance against digital PODs." />
              <InfoCard icon={Landmark} title="Terminal & Yard Owners" text="Monetize secure truck bays, cross-docking berths, and warehouse space across Indian transit corridors." />
            </div>
            <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-semibold text-[#171717]">Are you a logistics professional or transporter? Join our network.</span>
              <Link
                to="/partners/apply"
                className="px-5 py-2.5 bg-[#FF4D16] text-white text-xs font-bold rounded-xl hover:bg-[#E53E0B] transition-colors whitespace-nowrap"
              >
                Apply as a Partner →
              </Link>
            </div>
          </>
        ),
      };
      break;

  }

  return (
    <SubPageShell navId="solutions" eyebrow={page.eyebrow} title={page.title} intro={page.intro} actions={page.actions}>
      {page.body}
    </SubPageShell>
  );
};
