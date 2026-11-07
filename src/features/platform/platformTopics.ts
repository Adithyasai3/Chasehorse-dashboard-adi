import React from 'react';
import {
  Sparkles,
  Workflow,
  Layers,
  Network,
  Cpu,
  Wallet,
  Users2,
  TrendingUp,
} from 'lucide-react';
import {
  WhatIsGelpSection,
  HowItWorksSection,
  FeaturesSection,
  CapabilitiesSection,
  TechnologySection,
  FinanceSection,
  ResourcesSection,
  ScalabilitySection,
} from './sections';

export interface PlatformTopic {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  intro: string;
  icon: React.ElementType;
  /** Three headline numbers shown in the topic banner. */
  highlights: { value: string; label: string }[];
  Section: React.FC;
}

// Each topic gets its own page at /platform/<slug>
export const PLATFORM_TOPICS: PlatformTopic[] = [
  {
    slug: 'what-is-gelp',
    title: 'What is GELP?',
    eyebrow: 'Platform Overview',
    summary: 'Growth Enabling Logiworkx Platform overview',
    intro: 'A hybrid platform that combines enterprise software with real people on the ground — so logistics runs on verified data and accountable execution.',
    icon: Sparkles,
    highlights: [{ value: '3', label: 'Pillars: people, process, capital' }, { value: '6', label: 'Metro hubs' }, { value: '50K+', label: 'Field workers' }],
    Section: WhatIsGelpSection,
  },
  {
    slug: 'how-it-works',
    title: 'How it works?',
    eyebrow: 'Execution Engine',
    summary: 'On-ground operational execution engine',
    intro: 'Three steps take you from first dock assessment to automated daily dispatches and continuous cost optimization.',
    icon: Workflow,
    highlights: [{ value: '3', label: 'Steps to go live' }, { value: '24h', label: 'Tier 1 deployment' }, { value: '48h', label: 'Tier 2 scale-up' }],
    Section: HowItWorksSection,
  },
  {
    slug: 'features',
    title: 'Platform Features',
    eyebrow: 'Modular Suite',
    summary: 'Real-time visibility, TMS & audit tools',
    intro: 'Activate only the modules you need, or run the full suite end to end — TMS, field command, 8D, finance, analytics, and terminals.',
    icon: Layers,
    highlights: [{ value: '6', label: 'Core modules' }, { value: '99.98%', label: 'Uptime SLA' }, { value: '8D', label: 'Root-cause engine' }],
    Section: FeaturesSection,
  },
  {
    slug: 'capabilities',
    title: 'Capabilities',
    eyebrow: 'Multi-Vendor Control',
    summary: 'Multi-vendor freight and workforce control',
    intro: 'Run every transporter, warehouse partner, and field team from a single control layer with verified, real-time data.',
    icon: Network,
    highlights: [{ value: '1', label: 'Control layer for all vendors' }, { value: '6', label: 'Metro hubs' }, { value: '8D', label: 'Quality governance' }],
    Section: CapabilitiesSection,
  },
  {
    slug: 'technology',
    title: 'Technology Integration',
    eyebrow: 'API & Telemetry',
    summary: 'ERP, WMS, GPS, and IoT connectivity',
    intro: 'Connect GELP to the systems you already run — no rip-and-replace, just APIs, webhooks, and live telemetry.',
    icon: Cpu,
    highlights: [{ value: '99.98%', label: 'Uptime SLA' }, { value: '0', label: 'Rip-and-replace' }, { value: 'E2E', label: 'Encrypted' }],
    Section: TechnologySection,
  },
  {
    slug: 'finance',
    title: 'Flexible Finance Models',
    eyebrow: 'Working Capital',
    summary: 'Working capital and freight settlement',
    intro: 'Trip finance, invoice discounting, and pay-per-dispatch terms that keep cash flowing for shippers and transporters.',
    icon: Wallet,
    highlights: [{ value: 'Sub-24h', label: 'Liquidity' }, { value: '14 min', label: 'Sample trip advance' }, { value: 'E-POD', label: 'Verified settlement' }],
    Section: FinanceSection,
  },
  {
    slug: 'resources',
    title: 'Skilled Ready Resources',
    eyebrow: 'On-Field Workforce',
    summary: 'Pre-vetted field supervisors and leads',
    intro: 'Certified dock supervisors, on-field leads, and auditors deployed across India within guaranteed turnaround times.',
    icon: Users2,
    highlights: [{ value: '50K+', label: 'Field workers' }, { value: '24h', label: 'Tier 1 deployment' }, { value: '48h', label: 'Tier 2 scale-up' }],
    Section: ResourcesSection,
  },
  {
    slug: 'scalability',
    title: 'Business Scalability',
    eyebrow: 'Regional to Pan-India',
    summary: 'Expanding from regional to pan-India hubs',
    intro: 'Grow from a single region to a national network without building warehouses, fleets, or overhead of your own.',
    icon: TrendingUp,
    highlights: [{ value: '6', label: 'Metro hub gateways' }, { value: 'Pan-India', label: 'Reach' }, { value: 'Asset-light', label: 'Growth model' }],
    Section: ScalabilitySection,
  },
];

export const getPlatformTopic = (slug?: string) => PLATFORM_TOPICS.find((t) => t.slug === slug);
