import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Warehouse, ShieldCheck, Fingerprint, PackageCheck, ArrowRight } from 'lucide-react';
import { SubPageShell, SubSectionHeading, InfoCard, StepList } from '../../components/layout/SubPageShell';
import { EnquiryModal } from '../../components/ui/EnquiryModal';

/** HSE Shop › Request On-site Store — its own page. */
export const OnsiteStorePage: React.FC = () => {
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <SubPageShell
      navId="hse-shop"
      eyebrow="Store Services"
      title="Request On-site Store"
      intro="We deploy and manage a compliant HSE store inside your facility — stocked, staffed, and audited by Chasehorse."
      actions={
        <>
          <button
            onClick={() => setRequestOpen(true)}
            className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm inline-flex items-center gap-2 shadow-lg"
          >
            <Warehouse className="w-4 h-4" /> Request On-Site Managed Store
          </button>
          <Link
            to="/hse-shop"
            className="px-5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-[#171717] border border-white/20 font-bold rounded-xl transition-all text-sm inline-flex items-center gap-2"
          >
            Browse the HSE Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      }
    >
      <SubSectionHeading
        eyebrow="TURNKEY FACILITY DEPLOYMENT"
        title="We Deploy Our Store & Manage Compliance"
        text="Chasehorse installs and stocks a managed safety dispensing depot directly inside your manufacturing plant or distribution center."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard icon={PackageCheck} title="Zero Inventory Cost" text="Zero inventory carrying cost for the client — we stock and replenish the store." />
        <InfoCard icon={Fingerprint} title="Controlled Allocation" text="Workers access approved PPE with biometric/ID allocation." />
        <InfoCard icon={ShieldCheck} title="Standards Compliance" text="Gear and records aligned to recognised safety standards." footer="OSHA • IS 2925 • DGMS" />
      </div>

      <SubSectionHeading eyebrow="HOW IT WORKS" title="From Request to Running Store" />
      <StepList
        steps={[
          { title: 'Share your requirement', text: 'Tell us about your facility, headcount, and the PPE your workforce needs.' },
          { title: 'Store set up on site', text: 'Chasehorse installs and stocks the dispensing depot inside your facility.' },
          { title: 'Allocation by worker ID', text: 'Approved PPE is issued against biometric or ID records.' },
          { title: 'Managed & replenished', text: 'We keep the store stocked and the compliance records up to date.' },
        ]}
      />

      <EnquiryModal
        isOpen={requestOpen}
        onClose={() => setRequestOpen(false)}
        title="Request On-Site Managed HSE Store"
        defaultService="On-Site Managed HSE Store & Compliance Ledger"
      />
    </SubPageShell>
  );
};
