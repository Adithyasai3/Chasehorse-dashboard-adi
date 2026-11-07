/**
 * Centralized Service Pricing Model for Chasehorse GELP
 *
 * All figures from the source PDF / mockup are strictly marked as unapproved sample data.
 * When approved: false, the UI displays "Price on request" unless the user enables demo mode pricing.
 */

export interface ServicePricing {
  serviceId: string;
  serviceSlug: string;
  title: string;
  tier: 1 | 2 | 3;
  samplePriceUSD: number;
  currency: 'USD' | 'INR';
  billingUnit: string;
  approved: boolean; // Flagged as false until Chasehorse commercial team approves rate cards
  notes: string;
}

export const PRICING_CONFIG = {
  // Whether to show sample numbers in demo banner mode
  enableSampleDemoPricing: true,
  sampleNotice: 'Sample pricing from reference mockup — not final contract rates. Final quotations subject to volume, lane density, and SLA scope.',
};

export const SERVICE_PRICING_TABLE: Record<string, ServicePricing> = {
  't1-digital-transformation': {
    serviceId: 't1-digital-transformation',
    serviceSlug: 'digital-transformation',
    title: 'Digital Transformation (TMS, RFQ, MIS)',
    tier: 1,
    samplePriceUSD: 500,
    currency: 'USD',
    billingUnit: 'per facility / month',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Mockup reference shows $500.00',
  },
  't1-ch-deploy': {
    serviceId: 't1-ch-deploy',
    serviceSlug: 'ch-deploy',
    title: 'CH Deploy (Dock Supervision & Audits)',
    tier: 1,
    samplePriceUSD: 350,
    currency: 'USD',
    billingUnit: 'per deployed lead / shift',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Mockup reference shows $350.00',
  },
  't1-8d-customer-complaints': {
    serviceId: 't1-8d-customer-complaints',
    serviceSlug: '8d-customer-complaints',
    title: '8D Customer Complaints & E-Way Bill Management',
    tier: 1,
    samplePriceUSD: 300,
    currency: 'USD',
    billingUnit: 'per incident SLA package',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't1-merchandise-ppe': {
    serviceId: 't1-merchandise-ppe',
    serviceSlug: 'merchandise-ppe',
    title: 'Merchandise & PPEs (On-site Store)',
    tier: 1,
    samplePriceUSD: 200,
    currency: 'USD',
    billingUnit: 'store management retainer',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't1-returns-management': {
    serviceId: 't1-returns-management',
    serviceSlug: 'returns-management',
    title: 'Returns Management (RMA & Reverse Logistics)',
    tier: 1,
    samplePriceUSD: 250,
    currency: 'USD',
    billingUnit: 'per month',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },

  // Tier 2
  't2-digital-advancement': {
    serviceId: 't2-digital-advancement',
    serviceSlug: 'digital-advancement',
    title: 'Digital Advancement (AI & ML Automations)',
    tier: 2,
    samplePriceUSD: 600,
    currency: 'USD',
    billingUnit: 'per month',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't2-optimization-tools': {
    serviceId: 't2-optimization-tools',
    serviceSlug: 'optimization-tools',
    title: 'Optimization Tools (Freight & Lane Rationalization)',
    tier: 2,
    samplePriceUSD: 550,
    currency: 'USD',
    billingUnit: 'per verified lane / month',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't2-deploy-cdx-pro': {
    serviceId: 't2-deploy-cdx-pro',
    serviceSlug: 'deploy-cdx-pro',
    title: 'DEPLOY-CDX Pro (Engineering Field Leads)',
    tier: 2,
    samplePriceUSD: 500,
    currency: 'USD',
    billingUnit: 'per facility deployment',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't2-fleet-driver-management': {
    serviceId: 't2-fleet-driver-management',
    serviceSlug: 'fleet-driver-management',
    title: 'Fleet & Driver Management',
    tier: 2,
    samplePriceUSD: 400,
    currency: 'USD',
    billingUnit: 'per enrolled vehicle / month',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Mockup reference shows $400.00',
  },
  't2-esg-sustainability': {
    serviceId: 't2-esg-sustainability',
    serviceSlug: 'esg-sustainability',
    title: 'ESG Sustainability (Scope 3 GHG Accounting)',
    tier: 2,
    samplePriceUSD: 450,
    currency: 'USD',
    billingUnit: 'per reporting period',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't2-customer-experience-management': {
    serviceId: 't2-customer-experience-management',
    serviceSlug: 'customer-experience-management',
    title: 'Customer Experience Management (CXM)',
    tier: 2,
    samplePriceUSD: 350,
    currency: 'USD',
    billingUnit: 'per active client account',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },

  // Tier 3
  't3-it-advanced-technologies': {
    serviceId: 't3-it-advanced-technologies',
    serviceSlug: 'it-advanced-technologies',
    title: 'IT & Advanced Technologies (Drones, AI Agents)',
    tier: 3,
    samplePriceUSD: 900,
    currency: 'USD',
    billingUnit: 'per facility deployment',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't3-operational-advancement': {
    serviceId: 't3-operational-advancement',
    serviceSlug: 'operational-advancement',
    title: 'Operational Advancement (Lashing & Robotics)',
    tier: 3,
    samplePriceUSD: 750,
    currency: 'USD',
    billingUnit: 'per facility implementation',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't3-fleet-operations': {
    serviceId: 't3-fleet-operations',
    serviceSlug: 'fleet-operations',
    title: 'Fleet Operations (Guaranteed Capacity & Transhipment)',
    tier: 3,
    samplePriceUSD: 700,
    currency: 'USD',
    billingUnit: 'per dedicated route SLA',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't3-scm-process': {
    serviceId: 't3-scm-process',
    serviceSlug: 'scm-process',
    title: 'SCM & Process (Standardizing SCM & Reports)',
    tier: 3,
    samplePriceUSD: 300,
    currency: 'USD',
    billingUnit: 'consulting retainer',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Mockup reference shows $300.00',
  },
  't3-sustainability-monitoring': {
    serviceId: 't3-sustainability-monitoring',
    serviceSlug: 'sustainability-monitoring',
    title: 'Sustainability & Monitoring (IoT Emissions)',
    tier: 3,
    samplePriceUSD: 500,
    currency: 'USD',
    billingUnit: 'per facility / month',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
  't3-compliance-governance': {
    serviceId: 't3-compliance-governance',
    serviceSlug: 'compliance-governance',
    title: 'Compliance & Governance (Statutory Audits)',
    tier: 3,
    samplePriceUSD: 550,
    currency: 'USD',
    billingUnit: 'per quarterly audit',
    approved: false, // [CONTENT TO BE APPROVED]
    notes: 'Reference document sample value',
  },
};

