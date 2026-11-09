export interface SubNavItem {
  title: string;
  description?: string;
  path: string;
  badge?: string;
  external?: boolean;
  image?: string;
}

export interface NavSection {
  title: string;
  items: SubNavItem[];
  /** Visually emphasised column in the dropdown (e.g. Careers inside Discover). */
  highlight?: boolean;
}

export interface MegaMenuData {
  featuredTitle?: string;
  featuredDescription?: string;
  featuredImage?: string;
  featuredCtaText?: string;
  featuredCtaPath?: string;
  sections: NavSection[];
  quickActions?: {
    label: string;
    path: string;
    variant: 'primary' | 'secondary' | 'whatsapp';
  }[];
}

export interface MainNavItem {
  id: string;
  label: string;
  path: string;
  hasMegaMenu: boolean;
  megaMenu?: MegaMenuData;
}

export const MAIN_NAVIGATION: MainNavItem[] = [
  {
    id: 'platform',
    label: 'Platform',
    path: '/platform',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Platform (GELP)',
      featuredDescription: 'Everything you need to run logistics operations on ground — people, process, and performance.',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Design Your Platform',
      featuredCtaPath: '/design-your-solution',
      sections: [
        {
          title: 'Core Platform',
          items: [
            { title: 'What is GELP?', description: 'Growth Enabling Logiworkx Platform overview', path: '/platform/what-is-gelp' },
            { title: 'How it works?', description: 'On-ground operational execution engine', path: '/platform/how-it-works' },
            { title: 'Platform Features', description: 'Real-time visibility, TMS & audit tools', path: '/platform/features' },
            { title: 'Capabilities', description: 'Multi-vendor freight and workforce control', path: '/platform/capabilities' },
          ],
        },
        {
          title: 'Ecosystem & Scale',
          items: [
            { title: 'Technology Integration', description: 'ERP, WMS, GPS, and IoT connectivity', path: '/platform/technology' },
            { title: 'Flexible Finance Models', description: 'Working capital and freight settlement', path: '/platform/finance' },
            { title: 'Skilled Ready Resources', description: 'Pre-vetted field supervisors and leads', path: '/platform/resources' },
            { title: 'Business Scalability', description: 'Expanding from regional to pan-India hubs', path: '/platform/scalability' },
          ],
        },
      ],
      quickActions: [
        { label: 'Get Started', path: '/platform#get-started', variant: 'primary' },
        { label: 'Ask for Trials', path: '/platform#trials', variant: 'secondary' },
        { label: 'Book a Demo', path: '/platform#demo', variant: 'secondary' },
        { label: "Let's Connect", path: 'https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20want%20to%20learn%20more%20about%20GELP', variant: 'whatsapp' },
      ],
    },
  },
  {
    id: 'solutions',
    label: 'Solutions',
    path: '/solutions',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Custom Logistics Architecture',
      featuredDescription: 'Get supply chain solutions tailored to your business needs, volumes, and network footprint.',
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Design Your Solution (DIY)',
      featuredCtaPath: '/design-your-solution',
      sections: [
        {
          title: 'Solutions',
          items: [
            { title: 'Sectors', description: 'Shippers, 3PLs, retailers, and freight operators', path: '/solutions/sectors' },
            { title: 'Industries', description: 'Automotive, FMCG, Pharma, Heavy Machinery', path: '/solutions/industries' },
            { title: 'Partner Ecosystem', description: 'Integrations and carrier partnerships', path: '/solutions/ecosystem' },
            { title: 'Design Your Solution (DIY)', description: 'Select Tier 1-3 services by requirement & get estimate', path: '/design-your-solution', badge: 'Interactive' },
          ],
        },
      ],
    },
  },
  {
    id: 'live-market',
    label: 'Live Market',
    path: '/live-market',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Real-time Logistics Engine',
      featuredDescription: 'Real-time logistics actions, spot capacity, terminal leasing, and national freight rates.',
      featuredImage: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Check Today Freight Index',
      featuredCtaPath: '/live-market/freight-index',
      sections: [
        {
          title: 'Dispatch & Capacity',
          items: [
            { title: 'Book Truck Now', description: 'Instant FTL and part-load truck placement', path: '/live-market/book-truck', badge: 'Instant' },
            { title: 'Book Truck Terminal Space', description: 'Secure parking bays and cross-dock terminal space', path: '/live-market/terminal-space' },
            { title: 'Deploy On-field Lead', description: 'Dispatch vetted operational leads to your dock in 2 hrs', path: '/live-market/on-field-lead' },
          ],
        },
        {
          title: 'Capital & Intelligence',
          items: [
            { title: 'Secure Trip Finance', description: 'Instant working capital & freight invoice discounting', path: '/live-market/trip-finance' },
            { title: 'Today Freight Index', description: 'Live ₹/km lane rates across all Indian corridors', path: '/live-market/freight-index', badge: 'Live Demo' },
          ],
        },
      ],
    },
  },
  {
    id: 'discover',
    label: 'Discover',
    path: '/discover',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Knowledge & Operations Hub',
      featuredDescription: 'Learn, grow, and connect with India’s leading on-ground logistics community.',
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Explore Service Locations',
      featuredCtaPath: '/locations',
      sections: [
        {
          title: 'Learn & Upskill',
          items: [
            { title: 'Courses', description: 'Professional logistics, HSE & supply chain certifications', path: '/discover/courses' },
            { title: 'Resources', description: 'Whitepapers, SOP templates & compliance checklists', path: '/discover/resources' },
            { title: 'Video Guidance', description: 'SOP walk-throughs & cargo lashing demonstrations', path: '/discover/videos' },
          ],
        },
        {
          title: 'Company & Network',
          items: [
            { title: 'India Logistics Network', description: 'Explore logistics locations and potential paths across India', path: '/discover/network' },
            { title: 'Customer Stories', description: 'Enterprise case studies and verified impact metrics', path: '/discover/stories' },
            { title: 'Events & Webinars', description: 'Industry roundtables and supply chain summits', path: '/discover/events' },
            { title: 'Find Us', description: 'Our hubs on the India operations map', path: '/locations' },
            { title: 'About Us', description: 'The Chasehorse story, mission, and leadership', path: '/discover/about' },
          ],
        },
        {
          title: 'Careers',
          highlight: true,
          items: [
            { title: 'Jobs on Platform', description: 'Engineering, product, sales & business roles', path: '/careers/jobs' },
            { title: 'Internships', description: 'Ground operations and digital supply chain traineeships', path: '/discover/internships' },
            { title: 'Culture & Benefits', description: 'Health insurance, career fast-track, stock options', path: '/careers/culture' },
            { title: 'Graduate Trainee Program', description: '12-month rotation across India operations hubs', path: '/careers/graduates' },
          ],
        },
      ],
    },
  },
  {
    id: 'hse-shop',
    label: 'HSE Shop',
    path: '/hse-shop',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Official Safety Store',
      featuredDescription: 'Deploy certified safety gear across your workforce. We can also deploy on-site managed stores at your facility.',
      featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Visit HSE Shop',
      featuredCtaPath: '/hse-shop',
      sections: [
        {
          title: 'Online Store',
          items: [
            { title: 'Visit Store', description: 'Browse all certified safety products and categories', path: '/hse-shop' },
          ],
        },
        {
          title: 'Offline Store',
          items: [
            { title: 'Find Offline Store', description: 'Locate physical HSE depots near your hubs', path: '/hse-shop/offline-stores' },
            { title: 'Request On-site Store', description: 'We deploy and manage a compliant HSE store inside your facility', path: '/hse-shop/request-onsite-store', badge: 'Turnkey' },
            { title: 'Request a Callback', description: 'Our HSE store team will call you back', path: '/hse-shop/request-callback' },
          ],
        },
      ],
    },
  },
  {
    id: 'partners',
    label: 'Partners',
    path: '/partners',
    hasMegaMenu: true,
    megaMenu: {
      featuredTitle: 'Join Hands with Chasehorse',
      featuredDescription: 'Grow your logistics business with steady freight, verified clients, and rapid payment cycles.',
      featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      featuredCtaText: 'Complete Onboarding Form',
      featuredCtaPath: '/partners/apply',
      sections: [
        {
          title: 'Partner Categories',
          items: [
            { title: 'On-field Logistics Professionals', description: 'Join our vetted network of ground supervisors & auditors', path: '/partners/on-field' },
            { title: 'Transportation Professionals', description: 'Transporters, Fleet Owners, Drivers & Freight Traders', path: '/partners/transportation' },
            { title: 'Truck Terminal Space Owners', description: 'List your yard, warehouse bay, or secure truck parking', path: '/partners/terminal-space' },
          ],
        },
        {
          title: 'Fast Track Onboarding',
          items: [
            { title: 'Partner Application Form', description: 'Submit your profile and capabilities directly', path: '/partners/apply', badge: 'Apply' },
            { title: 'Partner WhatsApp Group', description: 'Direct updates on daily spot loads and lane tenders', path: 'https://wa.me/917337369111?text=Hi%20Chasehorse%2C%20I%20want%20to%20join%20the%20Partner%20Network', external: true },
          ],
        },
      ],
    },
  },
];

