import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Warehouse, ClipboardCheck, Truck, Route, Radio, GraduationCap, Building2, Cpu, ShieldCheck } from 'lucide-react';
import { SubPageShell, SubSectionHeading, InfoCard, StepList } from '../../components/layout/SubPageShell';
import { JobsBoard } from './JobsBoard';
import { CultureCards } from './CareersPage';

export type CareersTopic = 'jobs' | 'on-field' | 'transportation' | 'culture' | 'graduates';

const allRolesLink = (
  <Link
    to="/careers/jobs"
    className="px-6 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm inline-flex items-center gap-2 shadow-lg"
  >
    View All Open Roles →
  </Link>
);

export const CareersTopicPage: React.FC<{ topic: CareersTopic }> = ({ topic }) => {
  let page: { eyebrow: string; title: string; intro: string; actions?: React.ReactNode; body: React.ReactNode };

  switch (topic) {
    case 'jobs':
      page = {
        eyebrow: 'Career Tracks',
        title: 'Jobs on Platform',
        intro: 'Engineering, product, sales, and business roles building the physical and digital backbone of Indian logistics.',
        body: <JobsBoard />,
      };
      break;

    case 'on-field':
      page = {
        eyebrow: 'Career Tracks',
        title: 'On-field Logistics Leads',
        intro: 'Dock leads, warehouse supervisors, and auditors — the people who keep freight moving safely on the ground.',
        body: (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon={HardHat} title="Dock Leads" text="Supervise loading and unloading, verify lashing, and keep every handover documented." />
              <InfoCard icon={Warehouse} title="Warehouse Supervisors" text="Run inspections, inventory checks, and daily floor coordination at client sites." />
              <InfoCard icon={ClipboardCheck} title="Auditors" text="Audit 3PL warehouses and processes against Chasehorse quality and safety standards." />
            </div>
            <SubSectionHeading eyebrow="OPEN NOW" title="Operations Roles" />
            <JobsBoard initialDept="Operations" />
          </>
        ),
      };
      break;

    case 'transportation':
      page = {
        eyebrow: 'Career Tracks',
        title: 'Transportation Specialists',
        intro: 'Fleet coordinators, dispatchers, and lane leads who plan, place, and track every truck on the network.',
        actions: allRolesLink,
        body: (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon={Truck} title="Fleet Coordinators" text="Match vehicles to loads, manage transporter relationships, and keep fleet utilisation high." />
              <InfoCard icon={Radio} title="Dispatchers" text="Plan daily dispatches, place trucks on time, and resolve on-road exceptions." />
              <InfoCard icon={Route} title="Lane Leads" text="Own the performance of key corridors — cost, transit time, and on-time delivery." />
            </div>
            <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm text-[#625E58]">
                Transportation openings are listed with all current roles as they open.
              </span>
              <Link
                to="/careers/jobs"
                className="px-5 py-2.5 bg-[#171717] text-white text-xs font-bold rounded-xl hover:bg-[#FF4D16] transition-colors whitespace-nowrap"
              >
                See current openings →
              </Link>
            </div>
          </>
        ),
      };
      break;

    case 'culture':
      page = {
        eyebrow: 'Why Chasehorse',
        title: 'Culture & Benefits',
        intro: 'Health cover, ownership, and a clear path to grow — for every team member from dock lead to engineer.',
        actions: allRolesLink,
        body: <CultureCards />,
      };
      break;

    case 'graduates':
    default:
      page = {
        eyebrow: 'Why Chasehorse',
        title: 'Graduate Trainee Program',
        intro: 'A 12-month rotation across India operations hubs for graduates who want to learn logistics where it actually happens.',
        actions: allRolesLink,
        body: (
          <>
            <SubSectionHeading eyebrow="THE PROGRAM" title="12 Months, Across the Network" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard icon={Building2} title="Operations Hubs" text="Work on the ground at Chasehorse hubs and client sites alongside experienced leads." />
              <InfoCard icon={Cpu} title="Platform & Data" text="See how GELP turns on-ground activity into dashboards, alerts, and decisions." />
              <InfoCard icon={ShieldCheck} title="Quality & Safety" text="Learn the 8D, audit, and HSE practices behind zero-defect operations." />
            </div>
            <SubSectionHeading eyebrow="HOW IT WORKS" title="Your Path Through the Program" />
            <StepList
              steps={[
                { title: 'Apply', text: 'Submit your application through our open roles.' },
                { title: 'Rotate across hubs', text: 'Spend the year rotating through India operations hubs.' },
                { title: 'Learn by doing', text: 'Take real responsibility on live lanes, sites, and projects.' },
                { title: 'Grow into a role', text: 'Move into a team that fits your strengths at the end of the rotation.' },
              ]}
            />
            <div className="flex items-center gap-3 text-sm text-[#625E58]">
              <GraduationCap className="w-5 h-5 text-[#FF4D16]" />
              <span>Over 40% of our zonal leadership began as on-ground dock leads.</span>
            </div>
          </>
        ),
      };
  }

  return (
    <SubPageShell navId="discover" eyebrow={page.eyebrow} title={page.title} intro={page.intro} actions={page.actions}>
      {page.body}
    </SubPageShell>
  );
};
