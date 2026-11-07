import { Service, TierMeta } from './types';

/* ==========================================================================
   HOW TO ADD A NEW SERVICE:
   --------------------------------------------------------------------------
   1. Choose the TierId ('T1' | 'T2' | 'T3' | 'CX').
   2. Assign a unique id string (e.g., 't1-your-service-name').
   3. Provide the group name matching an existing group or creating a new one.
   4. Set the display name, integer price in INR, and a concise 1-line description.
   5. The SolutionBuilder UI will automatically group, tally, and calculate totals.
   ========================================================================== */

export const tiers: TierMeta[] = [
  {
    id: 'T1',
    title: 'Tier 1 Core Business',
    tagline: '90° AdvantageC+'
  },
  {
    id: 'T2',
    title: 'Tier 2 Strategic & Growth',
    tagline: '180° World Class'
  },
  {
    id: 'T3',
    title: 'Tier 3 Advanced Tech',
    tagline: '360° Futuristic'
  },
  {
    id: 'CX',
    title: 'CX Centre',
    tagline: 'Strategy, engineering & growth'
  }
];

export const services: Service[] = [
  // =========================================================================
  // TIER 1 → CORE BUSINESS (90° AdvantageC+)
  // =========================================================================
  
  // Group: Digital Transformation
  {
    id: 't1-tms',
    tier: 'T1',
    group: 'Digital Transformation',
    name: 'Transport Management System (TMS)',
    price: 42000,
    description: 'Centralised digital orchestration for pan-India freight dispatches and carrier tracking.' // TODO: review
  },
  {
    id: 't1-online-procurement',
    tier: 'T1',
    group: 'Digital Transformation',
    name: 'Online Procurement',
    price: 18000,
    description: 'Automated reverse auctions and digital spot-market vehicle procurement portal.' // TODO: review
  },
  {
    id: 't1-contracts-rfq-approvals',
    tier: 'T1',
    group: 'Digital Transformation',
    name: 'Contracts – RFQ / Approvals',
    price: 15000,
    description: 'Digital RFQ lifecycle governance with multi-level workflow approval matrices.' // TODO: review
  },
  {
    id: 't1-inward-consignment-visibility',
    tier: 'T1',
    group: 'Digital Transformation',
    name: 'Inward Consignment Visibility',
    price: 12000,
    description: 'Live milestone alerts and ETA tracking for supplier inward materials.' // TODO: review
  },
  {
    id: 't1-data-analytics-mis',
    tier: 'T1',
    group: 'Digital Transformation',
    name: 'Data Analytics – MIS',
    price: 20000,
    description: 'Automated executive MIS dashboards for logistics spend and operational performance.' // TODO: review
  },

  // Group: DEPLOY – Onfield CX Lead
  {
    id: 't1-warehouse-inspection',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'Warehouse Inspection',
    price: 12500,
    description: 'Physical premise audits verifying storage compliance, pallet safety, and handling.' // TODO: review
  },
  {
    id: 't1-unloading-site',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'Unloading Site',
    price: 12500,
    description: 'Dedicated on-ground supervisors ensuring damage-free bay unloading operations.' // TODO: review
  },
  {
    id: 't1-loading-site',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'Loading Site',
    price: 12500,
    description: 'Trained marshals verifying cargo stowage, lashing, and axle load limits.' // TODO: review
  },
  {
    id: 't1-audits-3pl-wh-sites-suppliers',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'Audits at 3PL WH / Sites / Suppliers',
    price: 29000,
    description: 'Comprehensive third-party vendor facility audits and operational scorecards.' // TODO: review
  },
  {
    id: 't1-gst-offices',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'GST Offices',
    price: 16500,
    description: 'Direct field liaison with tax offices for transit vehicle clearances.' // TODO: review
  },
  {
    id: 't1-onfield-truck-track',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'Onfield Truck Track',
    price: 14000,
    description: 'Physical checkpoint tracking along arterial transit corridors and toll barriers.' // TODO: review
  },
  {
    id: 't1-documentation-exchange',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'Documentation Exchange',
    price: 11000,
    description: 'Secure physical handover and verification of physical consignment bills.' // TODO: review
  },
  {
    id: 't1-pod-compliance',
    tier: 'T1',
    group: 'DEPLOY – Onfield CX Lead',
    name: 'POD Compliance',
    price: 12000,
    description: 'Same-day Proof of Delivery validation, digitisation, and customer sign-off.' // TODO: review
  },

  // Group: 8D Customer Complaints
  {
    id: 't1-ewaybill-management',
    tier: 'T1',
    group: '8D Customer Complaints',
    name: 'Ewaybill Management',
    price: 10000,
    description: 'Validation and proactive extension of expiring national GST E-way bills.' // TODO: review
  },
  {
    id: 't1-stakeholder-collaboration',
    tier: 'T1',
    group: '8D Customer Complaints',
    name: 'Stakeholder Collaboration',
    price: 12000,
    description: 'Rapid alignment between shippers, carriers, and consignees during operational snags.' // TODO: review
  },
  {
    id: 't1-time-based-closure',
    tier: 'T1',
    group: '8D Customer Complaints',
    name: 'Time Based Closure',
    price: 9000,
    description: 'Strict SLA-governed complaint turnaround with guaranteed resolution windows.' // TODO: review
  },
  {
    id: 't1-linked-to-deep-research',
    tier: 'T1',
    group: '8D Customer Complaints',
    name: 'Linked to Deep Research',
    price: 18000,
    description: 'Forensic root cause analysis using supply chain historical issue data.' // TODO: review
  },
  {
    id: 't1-linked-to-cx',
    tier: 'T1',
    group: '8D Customer Complaints',
    name: 'Linked to CX',
    price: 14000,
    description: 'Direct escalation bridge to senior customer success operational directors.' // TODO: review
  },
  {
    id: 't1-tracker-with-kpi',
    tier: 'T1',
    group: '8D Customer Complaints',
    name: 'Tracker with KPI',
    price: 16000,
    description: 'Live ticketing telemetry monitoring complaint resolution against contractual targets.' // TODO: review
  },

  // Group: Merchandise & PPEs
  {
    id: 't1-onsite-ppe-outlet',
    tier: 'T1',
    group: 'Merchandise & PPEs',
    name: 'On-site PPE Outlet',
    price: 8000,
    description: 'Turnkey on-demand safety gear dispensary deployed directly inside customer facilities.' // TODO: review
  },
  {
    id: 't1-hse-compliances-checklist',
    tier: 'T1',
    group: 'Merchandise & PPEs',
    name: 'HSE Compliances Checklist',
    price: 7000,
    description: 'Daily audit checklists ensuring factory health, safety, and equipment standards.' // TODO: review
  },
  {
    id: 't1-tool-box-talk-to-users',
    tier: 'T1',
    group: 'Merchandise & PPEs',
    name: 'Tool Box Talk to Users',
    price: 6000,
    description: 'Daily hazard briefing sessions and safety protocol training for yard crews.' // TODO: review
  },

  // Group: Returns Management
  {
    id: 't1-sales-returns',
    tier: 'T1',
    group: 'Returns Management',
    name: 'Sales Returns',
    price: 11000,
    description: 'Streamlined customer return authorization, pickup scheduling, and inventory intake.' // TODO: review
  },
  {
    id: 't1-transit-damages',
    tier: 'T1',
    group: 'Returns Management',
    name: 'Transit Damages',
    price: 10000,
    description: 'Independent physical damage assessment, photo evidence, and insurance claims.' // TODO: review
  },
  {
    id: 't1-quality-rejections',
    tier: 'T1',
    group: 'Returns Management',
    name: 'Quality Rejections',
    price: 10000,
    description: 'Technical inspection of rejected shipments and quarantine segregation protocol.' // TODO: review
  },
  {
    id: 't1-pallets-lashing-items',
    tier: 'T1',
    group: 'Returns Management',
    name: 'Pallets / Lashing Items',
    price: 9000,
    description: 'Reverse pooling, inspection, and refurbishment of industrial transit equipment.' // TODO: review
  },
  {
    id: 't1-packing-material-returns',
    tier: 'T1',
    group: 'Returns Management',
    name: 'Packing Material Returns',
    price: 8500,
    description: 'Collection and circular recycling of corrugated cartons and transit dunnage.' // TODO: review
  },

  // =========================================================================
  // TIER 2 → STRATEGIC & GROWTH (180° World Class)
  // =========================================================================

  // Group: Digital Advancement
  {
    id: 't2-tms-advanced',
    tier: 'T2',
    group: 'Digital Advancement',
    name: 'TMS Advanced',
    price: 35000,
    description: 'Dynamic load builder, multi-stop routing engine, and API integration hub.' // TODO: review
  },
  {
    id: 't2-data-science-ml',
    tier: 'T2',
    group: 'Digital Advancement',
    name: 'Data Science & ML',
    price: 45000,
    description: 'Predictive freight arrival models and seasonal volume demand forecasting.' // TODO: review
  },
  {
    id: 't2-automations',
    tier: 'T2',
    group: 'Digital Advancement',
    name: 'Automations',
    price: 28000,
    description: 'Robotic process automation for invoice matching, dispatch triggers, and notices.' // TODO: review
  },
  {
    id: 't2-generic-ai-utilization',
    tier: 'T2',
    group: 'Digital Advancement',
    name: 'Generic AI Utilization',
    price: 32000,
    description: 'LLM-powered document understanding for commercial invoices and transport permits.' // TODO: review
  },
  {
    id: 't2-onjob-tech-training',
    tier: 'T2',
    group: 'Digital Advancement',
    name: 'Onjob Tech Training',
    price: 15000,
    description: 'Practical training modules upskilling field handlers on modern supply chain software.' // TODO: review
  },

  // Group: Optimization Tools
  {
    id: 't2-freight-optimization',
    tier: 'T2',
    group: 'Optimization Tools',
    name: 'Freight Optimization',
    price: 22000,
    description: 'Algorithmic rate benchmarking and lane cost rationalization across carriers.' // TODO: review
  },
  {
    id: 't2-routes-lanes-rationalization',
    tier: 'T2',
    group: 'Optimization Tools',
    name: 'Routes / Lanes Rationalization',
    price: 20000,
    description: 'Network route analysis eliminating empty return miles and transit bottlenecks.' // TODO: review
  },
  {
    id: 't2-supplier-integration',
    tier: 'T2',
    group: 'Optimization Tools',
    name: 'Supplier Integration',
    price: 18000,
    description: 'Direct EDI and webhook connectivity linking tier-1 vendors into unified TMS.' // TODO: review
  },
  {
    id: 't2-load-capacity-optimization',
    tier: 'T2',
    group: 'Optimization Tools',
    name: 'Load & Capacity Optimization',
    price: 19000,
    description: '3D container packing algorithms maximizing cubic space utilization per truck.' // TODO: review
  },
  {
    id: 't2-freight-bills-authentication',
    tier: 'T2',
    group: 'Optimization Tools',
    name: 'Freight Bills Authentication',
    price: 14000,
    description: 'Automated 3-way freight invoice auditing preventing duplicate or inflated billings.' // TODO: review
  },

  // Group: DEPLOY – CDX Pro
  {
    id: 't2-technical-onfield-leads',
    tier: 'T2',
    group: 'DEPLOY – CDX Pro',
    name: 'Technical On-field Leads',
    price: 25000,
    description: 'Senior industrial engineers on-site managing operational throughput and quality.' // TODO: review
  },
  {
    id: 't2-onfield-incident-support',
    tier: 'T2',
    group: 'DEPLOY – CDX Pro',
    name: 'Onfield Incident Support',
    price: 18000,
    description: 'Rapid emergency response team managing transit breakdowns, accidents, and diversions.' // TODO: review
  },
  {
    id: 't2-training-programs',
    tier: 'T2',
    group: 'DEPLOY – CDX Pro',
    name: 'Training Programs',
    price: 12000,
    description: 'Structured continuous training for material handlers, supervisors, and dock staff.' // TODO: review
  },
  {
    id: 't2-stock-taking',
    tier: 'T2',
    group: 'DEPLOY – CDX Pro',
    name: 'Stock Taking',
    price: 10000,
    description: 'Cyclic perpetual inventory counting and shrinkage mitigation in distribution hubs.' // TODO: review
  },
  {
    id: 't2-quality-testing',
    tier: 'T2',
    group: 'DEPLOY – CDX Pro',
    name: 'Quality Testing',
    price: 14000,
    description: 'Pre-dispatch laboratory and stress testing of outbound packaging integrity.' // TODO: review
  },

  // Group: Fleet & Driver Management
  {
    id: 't2-accessories-driver-trucks',
    tier: 'T2',
    group: 'Fleet & Driver Management',
    name: 'Accessories Driver / Trucks',
    price: 9000,
    description: 'Cabin comfort accessories, mobile mounts, and essential driver safety kits.' // TODO: review
  },
  {
    id: 't2-maintenance',
    tier: 'T2',
    group: 'Fleet & Driver Management',
    name: 'Maintenance',
    price: 16000,
    description: 'Scheduled preventive maintenance regimens and roadworthiness certifications.' // TODO: review
  },
  {
    id: 't2-planning-scheduling',
    tier: 'T2',
    group: 'Fleet & Driver Management',
    name: 'Planning & Scheduling',
    price: 18000,
    description: 'Automated vehicle roster scheduling and driver rest-hour compliance monitoring.' // TODO: review
  },

  // Group: ESG – Sustainability
  {
    id: 't2-framework-setup',
    tier: 'T2',
    group: 'ESG – Sustainability',
    name: 'Framework Setup',
    price: 22000,
    description: 'Establishing baseline enterprise logistics emissions metrics and ESG compliance roadmap.' // TODO: review
  },
  {
    id: 't2-basic-esg-analytics',
    tier: 'T2',
    group: 'ESG – Sustainability',
    name: 'Basic ESG Analytics',
    price: 18000,
    description: 'Quarterly carbon emission tracking per ton-kilometer across operational routes.' // TODO: review
  },
  {
    id: 't2-tracking-methods-deployment',
    tier: 'T2',
    group: 'ESG – Sustainability',
    name: 'Tracking Methods Deployment',
    price: 16000,
    description: 'Deploying GPS fuel-burn monitors and eco-driving sensors across fleet.' // TODO: review
  },
  {
    id: 't2-sustainability-esg-dashboard',
    tier: 'T2',
    group: 'ESG – Sustainability',
    name: 'Sustainability ESG Dashboard',
    price: 20000,
    description: 'Live interactive dashboard presenting sustainability metrics for corporate disclosures.' // TODO: review
  },

  // Group: Customer Xperience Management
  {
    id: 't2-chcx',
    tier: 'T2',
    group: 'Customer Xperience Management',
    name: 'CHCX',
    price: 20000,
    description: 'Chasehorse customer experience command center monitoring brand delivery satisfaction.' // TODO: review
  },
  {
    id: 't2-customized-checklist',
    tier: 'T2',
    group: 'Customer Xperience Management',
    name: 'Customized Checklist',
    price: 12000,
    description: 'Tailored customer SLA compliance checklists for high-value enterprise accounts.' // TODO: review
  },
  {
    id: 't2-customer-surveys',
    tier: 'T2',
    group: 'Customer Xperience Management',
    name: 'Customer Surveys',
    price: 14000,
    description: 'Automated post-delivery CSAT and Net Promoter Score survey pipelines.' // TODO: review
  },
  {
    id: 't2-vendor-surveys',
    tier: 'T2',
    group: 'Customer Xperience Management',
    name: 'Vendor Surveys',
    price: 14000,
    description: 'Periodic supplier feedback assessments identifying dock and payment friction points.' // TODO: review
  },

  // =========================================================================
  // TIER 3 → ADVANCED TECH (360° Futuristic)
  // =========================================================================

  // Group: IT & Advanced Technologies
  {
    id: 't3-ai-deployment',
    tier: 'T3',
    group: 'IT & Advanced Technologies',
    name: 'AI Deployment',
    price: 55000,
    description: 'Autonomous dispatch agents that negotiate carrier rates and assign loads.' // TODO: review
  },
  {
    id: 't3-drone-utilization',
    tier: 'T3',
    group: 'IT & Advanced Technologies',
    name: 'Drone Utilization',
    price: 48000,
    description: 'Automated drone flyovers for outdoor yard inventory and container tagging.' // TODO: review
  },
  {
    id: 't3-iot-automations',
    tier: 'T3',
    group: 'IT & Advanced Technologies',
    name: 'IOT Automations',
    price: 42000,
    description: 'Mesh wireless temperature, shock, and tilt sensors for sensitive consignments.' // TODO: review
  },
  {
    id: 't3-data-science-ml',
    tier: 'T3',
    group: 'IT & Advanced Technologies',
    name: 'Data Science & ML',
    price: 50000,
    description: 'Neural network traffic forecasting and dynamic real-time lane pricing engines.' // TODO: review
  },

  // Group: Operational Advancement
  {
    id: 't3-cargo-lashing-techniques',
    tier: 'T3',
    group: 'Operational Advancement',
    name: 'Cargo Lashing Techniques',
    price: 15000,
    description: 'Heavy machinery and project cargo engineered tie-down securing certifications.' // TODO: review
  },
  {
    id: 't3-palletized-movement',
    tier: 'T3',
    group: 'Operational Advancement',
    name: 'Palletized Movement',
    price: 14000,
    description: 'Standardised Euro-pallet cross-docking workflows eliminating manual loose handling.' // TODO: review
  },
  {
    id: 't3-bar-coding-cams',
    tier: 'T3',
    group: 'Operational Advancement',
    name: 'Bar Coding & Cams',
    price: 18000,
    description: 'Computer-vision dimensional scanning cameras and 2D barcode parcel sorting.' // TODO: review
  },
  {
    id: 't3-robotics',
    tier: 'T3',
    group: 'Operational Advancement',
    name: 'Robotics',
    price: 60000,
    description: 'Autonomous Mobile Robots (AMR) deployment inside high-density consolidation centers.' // TODO: review
  },

  // Group: Fleet Operations
  {
    id: 't3-truck-deployment',
    tier: 'T3',
    group: 'Fleet Operations',
    name: 'Truck Deployment',
    price: 22000,
    description: 'Guaranteed 24-hour dedicated multi-axle vehicle placement across major hubs.' // TODO: review
  },
  {
    id: 't3-indent-management',
    tier: 'T3',
    group: 'Fleet Operations',
    name: 'Indent Management',
    price: 18000,
    description: 'Centralised booking indent tracking matching daily supply with plant requirements.' // TODO: review
  },
  {
    id: 't3-special-express-delivery',
    tier: 'T3',
    group: 'Fleet Operations',
    name: 'Special Express Delivery',
    price: 20000,
    description: 'Dual-driver non-stop express linehaul for urgent manufacturing line-stoppage cargo.' // TODO: review
  },
  {
    id: 't3-transhipment',
    tier: 'T3',
    group: 'Fleet Operations',
    name: 'Transhipment',
    price: 16000,
    description: 'Rapid vehicle-to-vehicle cargo transfer and hub-and-spoke deconsolidation.' // TODO: review
  },

  // Group: SCM & Process
  {
    id: 't3-standardizing-scm',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Standardizing SCM',
    price: 25000,
    description: 'End-to-end supply chain SOP harmonization and process mapping across facilities.' // TODO: review
  },
  {
    id: 't3-market-report',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Market Report',
    price: 12000,
    description: 'Monthly national freight rate index and fuel price trend intelligence reports.' // TODO: review
  },
  {
    id: 't3-vendor-sourcing',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Vendor Sourcing',
    price: 18000,
    description: 'Rigorous vetting and rate negotiations with verified pan-India fleet operators.' // TODO: review
  },
  {
    id: 't3-forecasting',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Forecasting',
    price: 20000,
    description: 'Predictive seasonal volume modeling and pre-committed vehicle capacity reserves.' // TODO: review
  },
  {
    id: 't3-procurement',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Procurement',
    price: 20000,
    description: 'Strategic long-term contract procurement governance for national freight tenders.' // TODO: review
  },
  {
    id: 't3-storage',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Storage',
    price: 18000,
    description: 'Buffer stock warehouse leasing and flexible overflow storage solutions.' // TODO: review
  },
  {
    id: 't3-network-designing',
    tier: 'T3',
    group: 'SCM & Process',
    name: 'Network Designing',
    price: 24000,
    description: 'Facility location modeling determining optimal warehouse and hub geographic nodes.' // TODO: review
  },

  // Group: Sustainability & Monitoring
  {
    id: 't3-sustainability-reportings',
    tier: 'T3',
    group: 'Sustainability & Monitoring',
    name: 'Sustainability Reportings',
    price: 22000,
    description: 'Global GLEC-compliant carbon footprint auditing and regulatory ESG documentation.' // TODO: review
  },
  {
    id: 't3-advanced-framework',
    tier: 'T3',
    group: 'Sustainability & Monitoring',
    name: 'Advanced Framework',
    price: 28000,
    description: 'Comprehensive net-zero roadmap with EV transition milestones and corridor blueprints.' // TODO: review
  },

  // Group: Compliance & Governance
  {
    id: 't3-virtual-office-compliance',
    tier: 'T3',
    group: 'Compliance & Governance',
    name: 'Virtual Office Compliance',
    price: 18000,
    description: 'Statutory multi-state principal place of business registrations and documentation.' // TODO: review
  },
  {
    id: 't3-gst-reconciliation',
    tier: 'T3',
    group: 'Compliance & Governance',
    name: 'GST Reconciliation',
    price: 16000,
    description: 'Automated 2B/2A input tax credit reconciliation across all transport billings.' // TODO: review
  },

  // =========================================================================
  // CX CENTRE (Strategy, engineering & growth)
  // =========================================================================

  // Group: Strategy Consultation
  {
    id: 'cx-business-strategy',
    tier: 'CX',
    group: 'Strategy Consultation',
    name: 'Business Strategy',
    price: 30000,
    description: 'Executive advisory aligning logistics footprint directly with corporate expansion goals.' // TODO: review
  },
  {
    id: 'cx-corporate-strategy',
    tier: 'CX',
    group: 'Strategy Consultation',
    name: 'Corporate Strategy',
    price: 35000,
    description: 'Strategic M&A logistics due diligence, synergy audits, and partnership frameworks.' // TODO: review
  },

  // Group: Engineering
  {
    id: 'cx-process',
    tier: 'CX',
    group: 'Engineering',
    name: 'Process',
    price: 25000,
    description: 'Six Sigma lean re-engineering of inbound docks and cross-docking operations.' // TODO: review
  },
  {
    id: 'cx-product',
    tier: 'CX',
    group: 'Engineering',
    name: 'Product',
    price: 25000,
    description: 'Packaging redesign optimizing dimensional volume and reducing tare shipping weight.' // TODO: review
  },

  // Group: Research & Development
  {
    id: 'cx-cx-centric-process',
    tier: 'CX',
    group: 'Research & Development',
    name: 'CX Centric Process',
    price: 28000,
    description: 'Customer journey mapping identifying delay friction points from dispatch to delivery.' // TODO: review
  },
  {
    id: 'cx-new-product',
    tier: 'CX',
    group: 'Research & Development',
    name: 'New Product',
    price: 32000,
    description: 'Prototyping specialised transit containers for sensitive electronics and perishables.' // TODO: review
  },

  // Group: Core Competency
  {
    id: 'cx-review',
    tier: 'CX',
    group: 'Core Competency',
    name: 'Review',
    price: 15000,
    description: 'Critical assessment of in-house versus outsourced 3PL logistics competencies.' // TODO: review
  },
  {
    id: 'cx-reset',
    tier: 'CX',
    group: 'Core Competency',
    name: 'Reset',
    price: 20000,
    description: 'Re-aligning operational resources and renegotiating master carrier contracts.' // TODO: review
  },
  {
    id: 'cx-new-markets',
    tier: 'CX',
    group: 'Core Competency',
    name: 'New Markets',
    price: 30000,
    description: 'Logistics readiness assessment and distribution network design for entering new territories.' // TODO: review
  },

  // Group: Business Models
  {
    id: 'cx-reposition',
    tier: 'CX',
    group: 'Business Models',
    name: 'Reposition',
    price: 22000,
    description: 'Transforming cost-center logistics divisions into competitive customer delivery advantages.' // TODO: review
  },
  {
    id: 'cx-segmentation',
    tier: 'CX',
    group: 'Business Models',
    name: 'Segmentation',
    price: 18000,
    description: 'Differentiating delivery SLAs for high-priority versus standard customer tiers.' // TODO: review
  },
  {
    id: 'cx-e-business',
    tier: 'CX',
    group: 'Business Models',
    name: 'e-Business',
    price: 26000,
    description: 'Omnichannel fulfillment integration linking D2C storefronts with regional distribution.' // TODO: review
  },

  // Group: Organisation Structure
  {
    id: 'cx-integration',
    tier: 'CX',
    group: 'Organisation Structure',
    name: 'Integration',
    price: 20000,
    description: 'Consolidating regional logistics teams into a unified centralized national command.' // TODO: review
  },
  {
    id: 'cx-rationalization',
    tier: 'CX',
    group: 'Organisation Structure',
    name: 'Rationalization',
    price: 18000,
    description: 'Eliminating duplicate operational roles and streamlining reporting hierarchies.' // TODO: review
  },
  {
    id: 'cx-expansion',
    tier: 'CX',
    group: 'Organisation Structure',
    name: 'Expansion',
    price: 24000,
    description: 'Scalable organizational staffing blueprints for doubling distribution throughput.' // TODO: review
  },

  // Group: Ecology Partner
  {
    id: 'cx-eco-partner-truck-booking',
    tier: 'CX',
    group: 'Ecology Partner',
    name: 'Eco Partner Truck Booking',
    price: 15000,
    description: 'Dedicated booking portal prioritizing certified low-emission and CNG freight carriers.' // TODO: review
  },
  {
    id: 'cx-eco-partner-terminal',
    tier: 'CX',
    group: 'Ecology Partner',
    name: 'Eco Partner Terminal',
    price: 15000,
    description: 'Certified green terminal space with solar recharging for electric commercial vehicles.' // TODO: review
  },
  {
    id: 'cx-policy-integration',
    tier: 'CX',
    group: 'Ecology Partner',
    name: 'Policy Integration',
    price: 12000,
    description: 'Embedding corporate ecological guidelines directly into freight procurement contracts.' // TODO: review
  }
];

