import React, { useState } from 'react';
import { ExternalLink, MessageSquare } from 'lucide-react';
import { SubPageShell } from '../../components/layout/SubPageShell';
import { EnquiryModal } from '../../components/ui/EnquiryModal';
import { OnFieldPartnerSection, TransportPartnerSection, TerminalPartnerSection } from './PartnersPage';

export type PartnersTopic = 'on-field' | 'transportation' | 'terminal-space';

const PAGES: Record<PartnersTopic, { title: string; intro: string }> = {
  'on-field': {
    title: 'On-field Logistics Professionals',
    intro: 'Join our vetted network of warehouse supervisors, dock inspection leads, packaging auditors, and GST liaison specialists.',
  },
  transportation: {
    title: 'Transportation Professionals',
    intro: 'Transporters, fleet owners, drivers, and freight traders — transparent loads and fast cashflow, whether you run 2 trucks or 200.',
  },
  'terminal-space': {
    title: 'Truck Terminal Space Owners',
    intro: 'List your yard, warehouse bay, or secure truck parking on the Live Market and earn recurring lease income.',
  },
};

/** Partners › <category> — each partner category on its own page. */
export const PartnersTopicPage: React.FC<{ topic: PartnersTopic }> = ({ topic }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryTitle, setEnquiryTitle] = useState('Partner Network Application');
  const onEnquire = (title: string) => {
    setEnquiryTitle(title);
    setEnquiryOpen(true);
  };
  const page = PAGES[topic];

  return (
    <SubPageShell
      navId="partners"
      eyebrow="Partner Categories"
      title={page.title}
      intro={page.intro}
      actions={
        <>
          <a
            href="https://forms.gle/QmiddiuRkaRLbesEA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm inline-flex items-center gap-2 shadow-lg"
          >
            Complete Partner Onboarding Form <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20want%20to%20join%20the%20Partner%20Network"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-[#171717] border border-white/20 font-bold rounded-xl transition-all text-sm inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Join Partner WhatsApp Desk
          </a>
        </>
      }
    >
      {topic === 'on-field' && <OnFieldPartnerSection onEnquire={onEnquire} />}
      {topic === 'transportation' && <TransportPartnerSection onEnquire={onEnquire} />}
      {topic === 'terminal-space' && <TerminalPartnerSection onEnquire={onEnquire} />}

      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} title={enquiryTitle} />
    </SubPageShell>
  );
};
