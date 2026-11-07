import React from 'react';
import {
  Cpu,
  Workflow,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  BarChart3,
  Terminal,
  Globe2,
  Users2,
  Truck,
  Warehouse,
  ClipboardCheck,
  FileText,
  Banknote,
  Receipt,
  HardHat,
  GraduationCap,
  MapPin,
  Building2,
  Network,
  Gauge,
} from 'lucide-react';

// Sections render inside the topic page's content column, so no page-width wrapper here.
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="mb-10">{children}</section>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs font-mono uppercase tracking-widest text-[#FF4D16] font-bold">● {children}</span>
);

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; text: string }> = ({ icon: Icon, title, text }) => (
  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
    <div className="w-8 h-8 rounded-lg bg-[#FF4D16]/10 text-[#FF4D16] flex items-center justify-center">
      <Icon className="w-4 h-4" />
    </div>
    <h4 className="font-bold text-base text-[#171717]">{title}</h4>
    <p className="text-xs text-[#625E58] leading-relaxed">{text}</p>
  </div>
);

const CheckItem: React.FC<{ title: string; text: string }> = ({ title, text }) => (
  <div className="flex items-start space-x-3">
    <CheckCircle2 className="w-5 h-5 text-[#FF4D16] shrink-0 mt-0.5" />
    <div>
      <h5 className="font-bold text-sm text-[#171717]">{title}</h5>
      <p className="text-xs text-[#625E58]">{text}</p>
    </div>
  </div>
);

/** Dark panel showing a numbered step-by-step flow, ending in a highlighted outcome. */
const FlowPanel: React.FC<{ title: string; icon: React.ElementType; steps: { title: string; text: string }[]; footer: string }> = ({
  title,
  icon: Icon,
  steps,
  footer,
}) => (
  <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 text-white border border-white/10">
    <h4 className="font-bold text-lg text-white flex items-center space-x-2 mb-6">
      <Icon className="w-5 h-5 text-[#FF4D16]" />
      <span>{title}</span>
    </h4>
    <ol className="relative">
      {steps.map((st, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={st.title} className="relative flex gap-4 pb-5 last:pb-0">
            {!last && <span aria-hidden className="absolute left-[13px] top-7 bottom-0 w-px bg-white/15" />}
            <span
              className={`relative z-10 shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                last ? 'bg-[#FF4D16] text-white shadow-[0_0_16px_rgba(255,77,22,0.5)]' : 'bg-white/10 text-white/80 border border-white/15'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="pt-0.5">
              <div className={`font-bold text-sm ${last ? 'text-[#FF4D16]' : 'text-white'}`}>{st.title}</div>
              <div className="text-xs text-[#E2DED5]/60 leading-relaxed">{st.text}</div>
            </div>
          </li>
        );
      })}
    </ol>
    <div className="mt-6 pt-4 text-xs text-[#E2DED5]/70 border-t border-white/10">{footer}</div>
  </div>
);

// ---------------------------------------------------------------------------
// What is GELP?
// ---------------------------------------------------------------------------
export const WhatIsGelpSection: React.FC = () => (
  <Container>
    <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-sm space-y-6">
      <div className="max-w-3xl space-y-3">
        <Eyebrow>THE PARADIGM SHIFT</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">What is GELP?</h2>
        <p className="text-base text-[#625E58] leading-relaxed">
          <strong>Growth Enabling Logiworkx Platform (GELP)</strong> is Chasehorse&apos;s proprietary hybrid infrastructure that
          combines enterprise-grade software orchestration with real on-the-ground operational accountability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          { n: '01', t: 'People on the Ground', d: 'Vetted dock leads, warehouse inspectors, and incident responders physically present where freight moves.' },
          { n: '02', t: 'Digital Rigor & TMS', d: 'Automated RFQs, inward visibility, E-Way Bill reconciliation, and 8D failure mode diagnostics.' },
          { n: '03', t: 'Capital & Scalability', d: 'Integrated freight financing, invoice discounting, and instant terminal space access in 6 metro hubs.' },
        ].map((c) => (
          <div key={c.n} className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF4D16] flex items-center justify-center font-bold">{c.n}</div>
            <h3 className="font-bold text-lg text-[#171717]">{c.t}</h3>
            <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// How it works?
// ---------------------------------------------------------------------------
const STEPS = [
  {
    n: '01',
    t: 'Configure & Connect',
    d: 'We connect your existing ERP/WMS with GELP data pipelines. Map your shipping lanes, configure transporter SLAs, and define mandatory loading dock inspection checklists.',
    points: ['Zero legacy software replacement', 'E-Way bill & GST system sync'],
  },
  {
    n: '02',
    t: 'Deploy Workforce & Tools',
    d: 'Chasehorse deploys certified on-field leads (CH Deploy) to your distribution centers and warehouses. Drivers and loaders are equipped with standardized PPE and mobile audit apps.',
    points: ['Certified lashing and dock checklists', 'Instant photo documentation'],
  },
  {
    n: '03',
    t: 'Monitor & Scale Autonomously',
    d: 'Live MIS feeds deliver transparent cost-per-ton analytics, lane benchmarks, and automated 8D root-cause alerts for any discrepancies, freeing your leadership to focus on core growth.',
    points: ['Real-time executive dashboards', 'Quarterly freight cost rationalization'],
  },
];

export const HowItWorksSection: React.FC = () => (
  <Container>
    <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
      <Eyebrow>3-STEP INTEGRATION</Eyebrow>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">How GELP Works in Practice</h2>
      <p className="text-sm sm:text-base text-[#625E58]">
        From initial dock assessment to automated daily dispatches and continuous cost optimization.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {STEPS.map((s, i) => (
        <div key={s.n} className="bg-white rounded-2xl border border-[#E2DED5] p-8 space-y-4 shadow-sm">
          <span className={`text-4xl font-extrabold font-mono ${i === 1 ? 'text-[#FF4D16]' : 'text-[#E2DED5]'}`}>{s.n}</span>
          <h3 className="text-xl font-bold text-[#171717]">{s.t}</h3>
          <p className="text-xs sm:text-sm text-[#625E58] leading-relaxed">{s.d}</p>
          <ul className="text-xs text-[#625E58] space-y-1.5 pt-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D16]" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// Platform Features
// ---------------------------------------------------------------------------
export const FeaturesSection: React.FC = () => (
  <Container>
    <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 shadow-sm">
      <div className="max-w-3xl mb-10 space-y-3">
        <Eyebrow>MODULAR ARCHITECTURE</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">Platform Features</h2>
        <p className="text-sm sm:text-base text-[#625E58]">
          Designed modularly so you can activate specific modules or run an integrated end-to-end operational suite.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard icon={Cpu} title="Cloud Transport Management (TMS)" text="End-to-end trip creation, automated vehicle allocation, digital LR generation, and carrier rating." />
        <FeatureCard icon={Workflow} title="CH Deploy Field Command" text="Real-time task dispatch to on-ground dock leads, geo-tagged photo inspections, and vehicle fitness sign-offs." />
        <FeatureCard icon={ShieldCheck} title="8D Root Cause Engine" text="Structured complaint resolution resolving delivery discrepancies with permanent corrective actions." />
        <FeatureCard icon={Wallet} title="Trip Finance & Invoice Settlement" text="Fast-track working capital advance against verified E-PODs, keeping transporters motivated and loyal." />
        <FeatureCard icon={BarChart3} title="Freight Index & Lane Analytics" text="Live ₹/km benchmark rates across Indian arterial corridors to ensure competitive contract bidding." />
        <FeatureCard icon={Globe2} title="Pan-India Terminal Network" text="Instant booking of secured truck parking, driver rest zones, and cross-docking bays in 6 metro hubs." />
      </div>
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------
export const CapabilitiesSection: React.FC = () => (
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <Eyebrow>MULTI-VENDOR CONTROL</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">One Control Layer for Freight & Workforce</h2>
        <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
          GELP brings every transporter, warehouse partner, and field team under a single operating view — so decisions are made on
          verified data, not phone calls and spreadsheets.
        </p>
        <div className="space-y-3 pt-2">
          <CheckItem title="Multi-Transporter Orchestration" text="Allocate loads across vendors by lane, rate, and SLA score from one dispatch desk." />
          <CheckItem title="Workforce Command" text="Assign, track, and audit on-ground leads at docks, warehouses, and 3PL hubs in real time." />
          <CheckItem title="Inward & Outward Visibility" text="Milestone tracking for every consignment, from gate-in to proof of delivery." />
          <CheckItem title="Quality & Compliance Governance" text="8D complaint closure, dock audits, and safety compliance records in one place." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FeatureCard icon={Truck} title="Fleet & Carrier Control" text="Vendor onboarding, rate benchmarking, and carrier performance scorecards." />
        <FeatureCard icon={Warehouse} title="Warehouse Oversight" text="Inspections, inventory verification, and loading/unloading site monitoring." />
        <FeatureCard icon={ClipboardCheck} title="Audit & Inspection" text="Geo-tagged checklists and photo evidence for every critical handover." />
        <FeatureCard icon={FileText} title="MIS & Reporting" text="Management dashboards with cost-per-ton, OTIF, and discrepancy trends." />
      </div>
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// Technology Integration
// ---------------------------------------------------------------------------
export const TechnologySection: React.FC = () => (
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <Eyebrow>API & TELEMETRY</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">Seamless Integration with Enterprise Stacks</h2>
        <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
          GELP communicates natively via RESTful APIs, Webhooks, and EDI with SAP, Oracle NetSuite, Odoo, custom ERPs, Fastag toll
          feeds, and major telematics providers.
        </p>
        <div className="space-y-3 pt-2">
          <CheckItem title="ERP & WMS Bi-Directional Sync" text="Orders generate dispatch requests; POD uploads instantly clear financial ledgers." />
          <CheckItem title="GST E-Way Bill Direct Verification" text="Automatic validity check prior to truck gate-out prevents tax checkpoint penalties." />
          <CheckItem title="IoT Temperature & Tilt Telemetry" text="Continuous data streaming for pharma, cold-chain, and delicate industrial machinery." />
        </div>
      </div>

      <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 text-white border border-white/10 space-y-6">
        <h4 className="font-bold text-lg text-white flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-[#FF4D16]" />
          <span>GELP Integration Architecture</span>
        </h4>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-400">
            POST /api/v1/dispatch/consignment/create
            <div className="text-[11px] text-[#E2DED5]/60 mt-1">
              Payload: &lbrace; invoiceNo: &quot;INV-4029&quot;, lane: &quot;DEL-BOM&quot;, vehicle: &quot;32ft-MX&quot; &rbrace;
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-yellow-400">
            WEBHOOK: field.ch_deploy.dock_inspection_passed
            <div className="text-[11px] text-[#E2DED5]/60 mt-1">Status: 100% Lashing Verified • GeoStamp: 28.4595° N, 77.0266° E</div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400">
            EVENT: finance.trip_advance.disbursed
            <div className="text-[11px] text-[#E2DED5]/60 mt-1">Transporter Bank Account Credited in 14 minutes</div>
          </div>
        </div>
        <div className="pt-2 flex justify-between items-center text-xs text-[#E2DED5]/70 border-t border-white/10">
          <span>99.98% System Uptime SLA</span>
          <span className="text-[#FF4D16] font-bold">Encrypted End-to-End</span>
        </div>
      </div>
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// Flexible Finance Models
// ---------------------------------------------------------------------------
export const FinanceSection: React.FC = () => (
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <Eyebrow>WORKING CAPITAL</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">Finance That Keeps Freight Moving</h2>
        <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
          Trip finance, freight invoice discounting, and pay-per-dispatch terms that unlock working capital for shippers and
          transporters — settled against verified on-ground proof.
        </p>
        <div className="space-y-3 pt-2">
          <CheckItem title="Trip Finance" text="Advance against verified E-PODs so transporters are paid fast and stay loyal." />
          <CheckItem title="Freight Invoice Discounting" text="Convert approved freight invoices into cash without waiting on long credit cycles." />
          <CheckItem title="Pay-Per-Dispatch Terms" text="Pay only for the dispatches you run — no heavy fixed commitments." />
        </div>
      </div>

      <FlowPanel
        title="How a Trip Gets Paid"
        icon={Banknote}
        steps={[
          { title: 'Delivery verified', text: 'E-POD and inspection photos captured on GELP at the destination dock.' },
          { title: 'Invoice approved', text: 'Freight invoice matched against the E-Way bill and contracted rate.' },
          { title: 'Advance disbursed', text: 'Working capital released to the transporter against the verified trip.' },
          { title: 'Settled & reconciled', text: 'Shipper pays on agreed terms; ledgers clear automatically.' },
        ]}
        footer="Every disbursement is tied to a verified delivery record on GELP."
      />
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard icon={Receipt} title="For Shippers" text="Extend payment terms to vendors while transporters still get paid on time." />
      <FeatureCard icon={Truck} title="For Transporters" text="Fast access to cash after delivery, reducing dependence on informal lending." />
      <FeatureCard icon={ShieldCheck} title="Audit-Ready Records" text="Every payout linked to E-Way bills, PODs, and inspection evidence." />
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// Skilled Ready Resources
// ---------------------------------------------------------------------------
export const ResourcesSection: React.FC = () => (
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <Eyebrow>ON-FIELD WORKFORCE</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">Skilled People, Ready to Deploy</h2>
        <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
          Pre-vetted, certified on-field leads, dock supervisors, and 3PL auditors deployed across India within guaranteed
          turnaround hours.
        </p>
        <div className="space-y-3 pt-2">
          <CheckItem title="Vetted & Certified" text="Background-checked professionals trained on Chasehorse dock and safety standards." />
          <CheckItem title="Equipped for the Floor" text="Standardized PPE and mobile audit apps issued with every deployment." />
          <CheckItem title="Accountable by Design" text="Every task is geo-tagged and photo-documented on GELP." />
        </div>
      </div>

      <FlowPanel
        title="From Request to Boots on the Ground"
        icon={Users2}
        steps={[
          { title: 'Share your requirement', text: 'Site, shift pattern, role, and the checklists you need enforced.' },
          { title: 'Matched to vetted talent', text: 'Certified leads selected from the Chasehorse field network near your site.' },
          { title: 'Deployed with kit & app', text: 'Arrives with standardized PPE and the GELP mobile audit app.' },
          { title: 'Reporting from day one', text: 'Geo-tagged tasks and photo evidence flow into your dashboard daily.' },
        ]}
        footer="Deployment turnaround is covered by enterprise SLAs."
      />
    </div>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard icon={HardHat} title="Dock Supervisors" text="Loading and unloading oversight with lashing verification." />
      <FeatureCard icon={ClipboardCheck} title="3PL Auditors" text="Inventory and process audits at partner warehouses." />
      <FeatureCard icon={Workflow} title="On-Field Leads" text="Daily coordination between plants, transporters, and hubs." />
      <FeatureCard icon={GraduationCap} title="Trained Teams" text="Continuous upskilling on safety, quality, and digital tools." />
    </div>
  </Container>
);

// ---------------------------------------------------------------------------
// Business Scalability
// ---------------------------------------------------------------------------
export const ScalabilitySection: React.FC = () => (
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="space-y-4">
        <Eyebrow>REGIONAL TO PAN-INDIA</Eyebrow>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717]">Scale Without Building It Yourself</h2>
        <p className="text-sm sm:text-base text-[#625E58] leading-relaxed">
          Expand from regional operations to a pan-India distribution network without capital expenditure on physical facilities or
          heavy overhead.
        </p>
        <div className="space-y-3 pt-2">
          <CheckItem title="Plug-and-Play Hubs" text="Use Chasehorse terminal space and cross-docking bays as you enter new regions." />
          <CheckItem title="Elastic Workforce" text="Add or reduce on-ground teams as volumes change, without hiring overhead." />
          <CheckItem title="Same Platform, Every Region" text="One set of SLAs, dashboards, and processes from your first lane to your hundredth." />
        </div>
      </div>

      <FlowPanel
        title="Your Growth Path on GELP"
        icon={Network}
        steps={[
          { title: 'Pilot lane', text: 'Prove cost, quality, and visibility gains on one critical corridor.' },
          { title: 'Regional rollout', text: 'Extend the same SLAs and dashboards across your home region.' },
          { title: 'Multi-hub network', text: 'Plug into Chasehorse metro hubs and vetted partners in new cities.' },
          { title: 'Pan-India operations', text: 'One platform running every lane — without owning the infrastructure.' },
        ]}
        footer="Hubs in New Delhi, Mumbai, Kolkata, Bengaluru, Chennai, and Hyderabad."
      />
    </div>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard icon={MapPin} title="Enter New Markets" text="Launch in a new city using existing hubs and vetted local partners." />
      <FeatureCard icon={Building2} title="Asset-Light Growth" text="Grow distribution without owning warehouses or fleets." />
      <FeatureCard icon={Gauge} title="Performance at Scale" text="Lane benchmarks and cost-per-ton analytics stay consistent as you grow." />
    </div>
  </Container>
);
