// ============================================================================
// CHASEHORSE SERVICE TIERS CATALOGUE DATA
// Easy to update: Add, edit, or remove services and modules here.
// ============================================================================

export interface ServiceCategoryItem {
  id: string;
  slug: string;
  title: string;
  tier: 1 | 2 | 3;
  tierName: string;
  category: string;
  indexInTier: string;
  shortDesc: string;
  modules: string[];
}

export interface TierGroup {
  tier: 1 | 2 | 3;
  title: string;
  badge: string;
  subtitle: string;
  services: ServiceCategoryItem[];
  exploreLink: string;
}

export const TIER_GROUPS: TierGroup[] = [
  {
    tier: 1,
    title: 'Tier 1 → Core Business Services',
    badge: 'Operational Foundation',
    subtitle: 'Essential on-ground field execution, digital visibility, quality audits, and complaint resolution.',
    exploreLink: '/solutions/tier-1',
    services: [
      {
        id: 'digital-transformation',
        slug: 'digital-transformation',
        title: 'Digital Transformation',
        tier: 1,
        tierName: 'Tier 1 — Core Business Services',
        category: 'Digital Systems',
        indexInTier: '01',
        shortDesc: 'End-to-end digitisation of freight contracts, RFQ approvals, inward visibility, and management information systems.',
        modules: [
          'Transport Management System (TMS)',
          'Online Procurement',
          'Contracts — RFQ & Approvals',
          'Inward Consignment Visibility',
          'Data Analytics — MIS'
        ]
      },
      {
        id: 'ch-deploy',
        slug: 'ch-deploy',
        title: 'CH Deploy',
        tier: 1,
        tierName: 'Tier 1 — Core Business Services',
        category: 'Field Operations',
        indexInTier: '02',
        shortDesc: 'Vetted on-ground logistics professionals deployed at warehouses, loading/unloading sites, and 3PL hubs.',
        modules: [
          'Warehouse Inspection',
          'Unloading Site Monitoring',
          'Loading Site Monitoring',
          'Audits at 3PL Warehouses',
          'GST Office Coordination'
        ]
      },
      {
        id: '8d-customer-complaints',
        slug: '8d-customer-complaints',
        title: '8D Customer Complaints',
        tier: 1,
        tierName: 'Tier 1 — Core Business Services',
        category: 'Quality Engineering',
        indexInTier: '03',
        shortDesc: 'Disciplined root-cause analysis, stakeholder alignment, time-based resolution, and E-way bill reconciliation.',
        modules: [
          'E-way Bill Management',
          'Stakeholder Collaboration',
          'Time-Based Closure',
          'Root Cause Analysis (RCA)',
          'Linked to CX Command Center',
          'KPI Tracker & Analytics'
        ]
      },
      {
        id: 'merchandise-ppe',
        slug: 'merchandise-ppe',
        title: 'Merchandise & PPEs',
        tier: 1,
        tierName: 'Tier 1 — Core Business Services',
        category: 'Safety & Merchandise',
        indexInTier: '04',
        shortDesc: 'Certified safety gear, high-visibility apparel, steel-toe boots, and turnkey on-site managed stores.',
        modules: [
          'Turnkey PPE Safety Kits',
          'Industrial Helmets & Visors',
          'Reflective High-Vis Jackets',
          'Anti-Skid Safety Footwear',
          'On-site Facility Managed Store'
        ]
      },
      {
        id: 'returns-management',
        slug: 'returns-management',
        title: 'Returns Management',
        tier: 1,
        tierName: 'Tier 1 — Core Business Services',
        category: 'Reverse Logistics',
        indexInTier: '05',
        shortDesc: 'Reverse supply chain management, return consignment verification, salvage grading, and restocking.',
        modules: [
          'Reverse Cargo Inspection',
          'SKU Grading & Restocking',
          'RTV Reconciliation',
          'Packaging Salvage & Refurbishment',
          'Reverse Route Optimization'
        ]
      }
    ]
  },
  {
    tier: 2,
    title: 'Tier 2 → Strategic & Growth Services',
    badge: 'Growth & Optimization',
    subtitle: 'Strategic optimizations, advanced analytics, lane rationalization, and dedicated field engineering.',
    exploreLink: '/solutions/tier-2',
    services: [
      {
        id: 'digital-advancement',
        slug: 'digital-advancement',
        title: 'Digital Advancement',
        tier: 2,
        tierName: 'Tier 2 — Strategic & Growth Services',
        category: 'AI & Automations',
        indexInTier: '01',
        shortDesc: 'Advanced TMS orchestration, predictive machine-learning lane models, automated tender execution, and tech upskilling.',
        modules: [
          'TMS Advanced Architecture',
          'Data Science & Predictive ML',
          'Autonomous Dispatch Automations',
          'Generic AI Document Extraction',
          'On-Job Tech Training'
        ]
      },
      {
        id: 'optimization-tools',
        slug: 'optimization-tools',
        title: 'Optimization Tools',
        tier: 2,
        tierName: 'Tier 2 — Strategic & Growth Services',
        category: 'Freight Analytics',
        indexInTier: '02',
        shortDesc: 'Algorithmic route rationalization, freight invoice audits, multi-vendor carrier benchmarking, and load density modeling.',
        modules: [
          'Dynamic Freight Optimization',
          'Routes & Arterial Lanes Rationalization',
          'Multi-Tier Supplier Integration',
          'Payload & Volumetric Capacity Optimizer',
          'Automated Freight Bills Authentication'
        ]
      },
      {
        id: 'deploy-cdx-pro',
        slug: 'deploy-cdx-pro',
        title: 'DEPLOY-CDX Pro',
        tier: 2,
        tierName: 'Tier 2 — Strategic & Growth Services',
        category: 'Specialized Engineering',
        indexInTier: '03',
        shortDesc: 'Continuous daily improvement engineering, technical field managers, on-site incident command, and Kaizen.',
        modules: [
          'Senior Technical On-field Leads',
          'Rapid On-field Incident Support',
          'Six Sigma Kaizen Programs',
          'Continuous Stock Taking',
          'Specialized Packaging Quality Testing'
        ]
      },
      {
        id: 'fleet-driver-management',
        slug: 'fleet-driver-management',
        title: 'Fleet & Driver Management',
        tier: 2,
        tierName: 'Tier 2 — Strategic & Growth Services',
        category: 'Driver Operations',
        indexInTier: '04',
        shortDesc: 'Driver telematics, in-cab safety diagnostics, professional welfare amenities, and fleet preventive maintenance.',
        modules: [
          'Truck Telematics & Speed Limiting',
          'Driver Welfare Rest Points & Kits',
          'Fatigue & Safety Monitoring',
          'Vehicle Fitness & Emission Checkpoints',
          'In-Transit Emergency Assistance'
        ]
      },
      {
        id: 'esg-sustainability',
        slug: 'esg-sustainability',
        title: 'ESG Sustainability',
        tier: 2,
        tierName: 'Tier 2 — Strategic & Growth Services',
        category: 'Green Logistics',
        indexInTier: '05',
        shortDesc: 'Freight carbon footprint telemetry, green route deployment, EV fleet integration, and statutory sustainability audits.',
        modules: [
          'Scope 1-3 Carbon Footprint Audits',
          'Green Highway Corridors',
          'EV Commercial Feeder Deployment',
          'Reusable Transit Packaging (RTP)',
          'Statutory ESG Disclosure Reports'
        ]
      },
      {
        id: 'customer-experience-management',
        slug: 'customer-experience-management',
        title: 'Customer Experience Management',
        tier: 2,
        tierName: 'Tier 2 — Strategic & Growth Services',
        category: 'SLA & Retention',
        indexInTier: '06',
        shortDesc: 'Real-time delivery milestone communication, proactive exception handling, and enterprise SLA management.',
        modules: [
          'Real-time Milestone Alerts (SMS/WhatsApp)',
          'Proactive Exception Resolution',
          'SLA Violation Guardrails',
          'CSAT & Net Promoter Scoring',
          'Dedicated Client Operations Command'
        ]
      }
    ]
  },
  {
    tier: 3,
    title: 'Tier 3 → Advanced Operations & Technology Services',
    badge: 'Frontier Tech & Automation',
    subtitle: 'Frontier technologies including AI agent orchestration, drone surveying, IoT telemetry, and robotics.',
    exploreLink: '/solutions/tier-3',
    services: [
      {
        id: 'it-advanced-technologies',
        slug: 'it-advanced-technologies',
        title: 'IT & Advanced Technologies',
        tier: 3,
        tierName: 'Tier 3 — Advanced Operations & Technology Services',
        category: 'Emerging Tech',
        indexInTier: '01',
        shortDesc: 'Autonomous logistics agents, aerial drone yard surveys, IoT environmental sensors, and neural network routing.',
        modules: [
          'Autonomous AI Agent Dispatch',
          'Drone-Assisted Yard Surveys',
          'IoT Sensor Cold-Chain Mesh',
          'Neural Network Fleet Forecasting',
          'Automated Sortation Conveyors'
        ]
      },
      {
        id: 'operational-advancement',
        slug: 'operational-advancement',
        title: 'Operational Advancement',
        tier: 3,
        tierName: 'Tier 3 — Advanced Operations & Technology Services',
        category: 'Heavy Material Handling',
        indexInTier: '02',
        shortDesc: 'Specialized cargo lashing, heavy palletization, computer-aided warehouse management systems, and robotics.',
        modules: [
          'Heavy Industrial Cargo Lashing',
          'Standardized Euro-Pallet Movement',
          'Computer-Aided Warehouse Systems (CAMS)',
          'Autonomous Mobile Robots (AMR)',
          'Automated Guided Vehicles (AGV)'
        ]
      },
      {
        id: 'fleet-operations',
        slug: 'fleet-operations',
        title: 'Fleet Operations',
        tier: 3,
        tierName: 'Tier 3 — Advanced Operations & Technology Services',
        category: 'Dedicated Fleet',
        indexInTier: '03',
        shortDesc: 'Dedicated prime-mover truck placement, 24/7 incident command, specialized express delivery, and cross-docking.',
        modules: [
          'Dedicated Fleet Deployment',
          '24/7 Incident Emergency Operations',
          'Special Express Time-Definite Freight',
          'Terminal Transhipment Hubs',
          'GPS-Locked Bonded Container Movement'
        ]
      },
      {
        id: 'scm-process',
        slug: 'scm-process',
        title: 'SCM & Process',
        tier: 3,
        tierName: 'Tier 3 — Advanced Operations & Technology Services',
        category: 'Supply Chain Advisory',
        indexInTier: '04',
        shortDesc: 'Supply chain workflow re-engineering, pan-India lane cost reports, strategic vendor sourcing, and procurement.',
        modules: [
          'SCM Standardization Frameworks',
          'Quarterly National Freight Market Reports',
          'Strategic Carrier Vetting & Sourcing',
          'Direct Materials SCM Procurement',
          'Network Redesign & Node Consolidation'
        ]
      },
      {
        id: 'adv-sustainability-monitoring',
        slug: 'adv-sustainability-monitoring',
        title: 'Sustainability & Monitoring',
        tier: 3,
        tierName: 'Tier 3 — Advanced Operations & Technology Services',
        category: 'Carbon Telemetry',
        indexInTier: '05',
        shortDesc: 'Real-time telemetry emissions auditing, green fleet transition roadmaps, and international ESG certification.',
        modules: [
          'Real-time Emissions Telemetry Hub',
          'Multi-Corridor Decarbonization Roadmap',
          'Green Warehouse Energy Certification',
          'Eco-Driving Sensor Verification',
          'Global GLEC Framework Auditing'
        ]
      },
      {
        id: 'compliance-governance',
        slug: 'compliance-governance',
        title: 'Compliance & Governance',
        tier: 3,
        tierName: 'Tier 3 — Advanced Operations & Technology Services',
        category: 'Legal & Statutory',
        indexInTier: '06',
        shortDesc: 'National E-way bill validation, statutory motor transport compliance, toll tax clearance, and legal liaison.',
        modules: [
          'E-way Bill Real-Time Reconciliation',
          'Motor Vehicles Act Compliance Auditing',
          'State Border FASTag Liaison',
          'Statutory Labor & Safety Governance',
          'Dispute Arbitration & Resolution'
        ]
      }
    ]
  }
];

