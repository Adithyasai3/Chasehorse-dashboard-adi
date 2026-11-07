import { Layers, ShieldCheck, LucideIcon } from 'lucide-react';

export interface GelpDossierCard {
  id: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  chips: string[];
  paragraph: string;
  keyHighlights: string[];
}

export interface WhyGelpStat {
  value: number;
  suffix: string;
  label: string;
}

export interface WhyGelpContent {
  heading: string;
  taglineChips: string[];
  statBand: {
    title: string;
    stats: WhyGelpStat[];
  };
  cards: GelpDossierCard[];
}

export const WHY_GELP_DATA: WhyGelpContent = {
  heading: 'Why Chasehorse G.E.L.P.?',
  taglineChips: [
    'Value creation',
    'Futuristic',
    'Practical',
    'One transparent platform',
  ],
  statBand: {
    title: 'Thunderspeed in onboarding',
    stats: [
      {
        value: 24,
        suffix: 'h',
        label: 'Tier 1 strategy deployment',
      },
      {
        value: 48,
        suffix: 'h',
        label: 'Tier 2 operations scale',
      },
    ],
  },
  cards: [
    {
      id: 'growth-platform-architecture',
      eyebrow: 'SCALABILITY & INFRASTRUCTURE',
      title: 'Elastic Platform Architecture & Rapid Deployment',
      icon: Layers,
      chips: [
        'Rapid business scalability',
        'Plug & play resources',
        'Live market intelligence',
        'Audit & compliance',
      ],
      paragraph:
        'The Growth Enabler Logiworkx Platform engineered a paradigm shift by delivering rapid business scalability coupled with immediately accessible plug & play resources. Backed by live market intelligence, flexible finance options, and highly feasible cost models, the framework drives profound operational efficiency across systems. With continuous infrastructure updates, critical support tech transformations, and systematic audit & compliance management metrics, it provides an elastic architecture built for sustainable, continuous ecosystem improvement.',
      keyHighlights: [
        'rapid business scalability',
        'plug & play resources',
        'live market intelligence',
        'finance options',
        'feasible cost models',
        'audit & compliance management',
      ],
    },
    {
      id: 'security-governance-manpower',
      eyebrow: 'SECURITY & EXECUTION',
      title: 'Enterprise Data Security & Governed Operations',
      icon: ShieldCheck,
      chips: [
        'Enterprise data layers',
        'Targeted KPIs',
        'Future-prepared manpower',
        'Regulatory frameworks',
      ],
      paragraph:
        'Our platform prioritizes high-grade security of internal enterprise data layers while maximizing targeted KPIs and total ease of supply chain management (SCM) execution. Powered by a specialized customer experience system and proactive on-job technology training, CH helps form a future-prepared manpower matrix. Built upon the core pillars of technology integration and customizable network design, G.E.L.P incorporates real-time government and regulatory policy frameworks to construct completely transparent workflows across all operational models.',
      keyHighlights: [
        'security of internal enterprise data layers',
        'on-job technology training',
        'future-prepared manpower matrix',
        'regulatory policy frameworks',
        'transparent workflows',
      ],
    },
  ],
};
