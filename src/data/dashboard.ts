export const MOCK_DASHBOARD_DATA = {
  clientProfile: {
    name: 'Apollo Precision Engineering Ltd',
    accountNumber: 'CH-ENT-8842',
    tier: 'Enterprise Partner (Tier 1 & 2 Active)',
    contactPerson: 'Rajesh Malhotra (VP - Global Supply Chain)',
    email: 'r.malhotra@apolloprecision.com',
    phone: '+91 98201 44552',
    billingGst: '27AAACA1234F1Z8',
    activeContract: 'Annual Master Services Agreement 2025-2026',
  },
  stats: {
    activeDeployments: 8,
    activeShipments: 24,
    monthlyHoursApproved: '1,420 hrs',
    pendingInvoices: '₹4,12,500',
    complianceScore: '99.4%',
  },
  invoices: [
    { id: 'INV-2025-089', date: '2025-10-15', dueDate: '2025-11-14', amount: '₹2,84,500', status: 'Paid', service: 'CH Deploy On-Field Leads (NCR & Mumbai)' },
    { id: 'INV-2025-094', date: '2025-10-22', dueDate: '2025-11-21', amount: '₹1,28,000', status: 'Pending Approval', service: 'HSE Shop Master Safety Kits (120 Units)' },
    { id: 'INV-2025-101', date: '2025-10-28', dueDate: '2025-11-27', amount: '₹3,45,000', status: 'Under Review', service: 'Freight Optimization & Lane Rationalization' },
  ],
  orders: [
    { id: 'ORD-7741', date: '2025-10-26', category: 'HSE Merchandise', items: 'Chasehorse Pro-Guard Helmets (x50), S3 Shoes (x50)', status: 'In Transit', total: '₹1,27,400', trackingNumber: 'CH-TRK-99042' },
    { id: 'ORD-7689', date: '2025-10-18', category: 'Spot Truck Booking', items: '2x 32ft MX Container (Delhi to Pune)', status: 'Delivered', total: '₹94,000', trackingNumber: 'CH-TRK-98711' },
    { id: 'ORD-7620', date: '2025-10-09', category: 'Terminal Space', items: 'Dedicated Truck Bays (x4) - Mumbai Hub', status: 'Active', total: '₹48,000', trackingNumber: 'CH-TRK-98402' },
  ],
  projects: [
    { id: 'PRJ-101', name: 'Auto Dock Supervision & Zero-Damage Initiative', lead: 'Vikram Singh (CDX Pro Lead)', site: 'Sriperumbudur Hub', progress: 85, status: 'On Track', deadline: '30 Nov 2025' },
    { id: 'PRJ-102', name: 'Pan-India E-Way Bill & GST Risk Reconciliation', lead: 'Ananya Sharma', site: 'All 6 Metro Hubs', progress: 60, status: 'On Track', deadline: '15 Dec 2025' },
    { id: 'PRJ-103', name: 'On-Site Managed HSE Store Setup', lead: 'Pradeep Patil', site: 'Bhiwandi Central Depot', progress: 100, status: 'Completed', deadline: '10 Oct 2025' },
  ],
  tasks: [
    { id: 'TSK-401', task: 'Review 8D Root Cause Analysis for Batch #4092 damage', priority: 'High', status: 'Pending Review', assignedTo: 'Quality Assurance Team' },
    { id: 'TSK-402', task: 'Approve timesheet for Week 42 (18 Field Leads)', priority: 'High', status: 'Action Required', assignedTo: 'Rajesh Malhotra' },
    { id: 'TSK-403', task: 'Schedule quarterly safety audit at Dankuni terminal', priority: 'Medium', status: 'In Progress', assignedTo: 'HSE Officer' },
    { id: 'TSK-404', task: 'Configure SAP TMS API Webhook for live GPS milestones', priority: 'Low', status: 'Completed', assignedTo: 'Platform Tech Ops' },
  ],
  timesheets: [
    { worker: 'Rameshwar Yadav', role: 'Loading Dock Supervisor', site: 'Gurugram Facility', hoursThisWeek: 48, status: 'Submitted', hourlyRate: '₹320/hr' },
    { worker: 'Suresh Kumar', role: '3PL Inventory Auditor', site: 'Nhava Sheva Hub', hoursThisWeek: 45, status: 'Approved', hourlyRate: '₹350/hr' },
    { worker: 'Dinesh Karthik', role: 'Cargo Lashing Specialist', site: 'Sriperumbudur Plant', hoursThisWeek: 52, status: 'Approved', hourlyRate: '₹380/hr' },
    { worker: 'Amitabh Sen', role: 'Field Incident Triage Lead', site: 'Dankuni Terminal', hoursThisWeek: 40, status: 'Pending Approval', hourlyRate: '₹400/hr' },
  ],
  addresses: [
    { label: 'Headquarters & Main Plant', address: 'Plot 44, Industrial Area Phase II, Dharuhera, Haryana 123106', contact: '+91 1274 255000' },
    { label: 'Western Distribution Depot', address: 'Building B3, Logistics Park, Bhiwandi-Kalyan Road, Mumbai 421302', contact: '+91 2522 688000' },
    { label: 'Southern Assembly Facility', address: 'SIPCOT Industrial Park, Phase 3, Sriperumbudur, Tamil Nadu 602105', contact: '+91 44 4710 9900' },
  ],
  security: {
    twoFactorEnabled: true,
    activeSessions: 3,
    lastLogin: 'Today, 08:30 AM (Bengaluru, Chrome on Windows)',
    apiKeys: [
      { keyName: 'Production SAP ERP Webhook', prefix: 'ch_live_99a...48', created: '12 Aug 2025', status: 'Active' },
      { keyName: 'Staging TMS Telemetry Stream', prefix: 'ch_test_41b...12', created: '01 Oct 2025', status: 'Active' },
    ],
  },
  knowledge: [
    { id: 'KB-01', title: 'Chasehorse Loading & Lashing Standard Operating Procedure v3.2', category: 'Standard Operating Procedures', size: '2.4 MB PDF' },
    { id: 'KB-02', title: 'Emergency Road Incident & Highway Breakdown Protocol', category: 'Incident Management', size: '1.8 MB PDF' },
    { id: 'KB-03', title: 'GST Checkpoint Verification & E-Way Bill Handbook 2025', category: 'Tax & Compliance', size: '3.1 MB PDF' },
    { id: 'KB-04', title: 'Statutory Labor & Contractor PF/ESIC Compliance Audit Guide', category: 'Labor Welfare', size: '1.2 MB PDF' },
  ],
  courses: [
    { id: 'CRS-01', title: 'Certified On-Field Logistics Supervisor (CFLS)', progress: 75, status: 'In Progress', nextModule: 'Module 4: Mobile Field Audit Tools', score: '94% Quiz Average' },
    { id: 'CRS-02', title: '8D Root Cause Analysis in Supply Chains', progress: 100, status: 'Completed', certificateId: 'CH-CERT-8D-2025-9981', issueDate: '14 Sep 2025' },
    { id: 'CRS-03', title: 'Industrial Cargo Lashing & Securing (EN 12195)', progress: 30, status: 'In Progress', nextModule: 'Module 2: Strapping & Ratchet Math', score: 'Enrolled' },
  ],
};

