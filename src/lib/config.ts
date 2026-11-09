/**
 * Chasehorse Platform Configuration & Central Constants
 * Flags unapproved data and provides standardized contact/API helpers.
 */

export const APP_CONFIG = {
  // Brand details
  companyName: 'Chasehorse',
  tagline: 'Growth Enabling Logiworkx Partner',
  platformName: 'Growth Enabler Logiworkx Platform (GELP)',

  // Official contact details
  WHATSAPP_NUMBER: '917337369111', // +91 73373 69111
  WHATSAPP_GROUP_LINK: 'https://chat.whatsapp.com/DEMO_CHASEHORSE_PARTNERS', // [CONTENT TO BE APPROVED: Official Partner Group]
  SUPPORT_EMAIL: 'shravan.vibhas@chasehorse.com',
  SUPPORT_PHONE: '+91 73373 69111',
  // Receives Design Your Solution blueprints, hero enquiries and network enquiries
  ENQUIRY_WHATSAPP_NUMBER: '917337369111',

  // On-site partner onboarding form (replaces the old Google Form)
  PARTNER_APPLY_PATH: '/partners/apply',

  // Prototype & Demo state flags
  IS_DEMO_MODE: true,
  DEMO_NOTICE: 'Demo Prototype (Phase 1 — Frontend). Real-time APIs, bookings, payments and live data planned for backend phase.',

  // Operational Statistics (Flagged as placeholders pending client verification)
  STATS: [
    {
      id: 'workers',
      label: 'Field Workers Deployed',
      value: '50K+',
      approved: false, // [CONTENT TO BE APPROVED: Verify active workforce number]
      note: 'Sample metric from mockup pending business confirmation',
    },
    {
      id: 'locations',
      label: 'Service Locations Pan-India',
      value: '6',
      approved: true, // Grounded by the 6 metro hubs: Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad
      note: 'Verified: New Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad',
    },
    {
      id: 'support',
      label: 'Operations Command',
      value: '24/7',
      approved: false, // [CONTENT TO BE APPROVED]
      note: 'Planned 24/7 monitoring desk coverage',
    },
    {
      id: 'completion',
      label: 'Dock SLA Task Completion',
      value: '99.8%',
      approved: false, // [CONTENT TO BE APPROVED]
      note: 'Sample benchmark from design mockup',
    },
  ],

  // 6 Hub Cities
  METRO_HUBS: [
    'New Delhi',
    'Mumbai',
    'Bengaluru',
    'Chennai',
    'Kolkata',
    'Hyderabad',
  ],
};

/**
 * Constructs a verified WhatsApp direct connect link with a context-specific prefilled message.
 */
export function getWhatsAppUrl(prefilledText: string): string {
  const cleanNumber = APP_CONFIG.WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(prefilledText);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

