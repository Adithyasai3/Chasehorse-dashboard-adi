/**
 * Chasehorse API & Service Abstraction Layer
 *
 * Current Phase: Frontend-first typed mock implementations with simulated latency.
 * Future Phase: Swap with real Spring Boot REST API calls and Supabase client SDK.
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  isDemoData: boolean;
  timestamp: string;
}

const SIMULATED_LATENCY_MS = 400;

function mockDelay<T>(result: T, message = 'Success (Demo API)'): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: result,
        message,
        isDemoData: true,
        timestamp: new Date().toISOString(),
      });
    }, SIMULATED_LATENCY_MS);
  });
}

// 1. Truck Booking Service
export interface TruckBookingRequest {
  origin: string;
  destination: string;
  truckTypeId: string;
  dispatchDate: string;
  cargoType: string;
}

export interface TruckBookingConfirmation {
  bookingId: string;
  status: 'PENDING_DRIVER_ASSIGNMENT' | 'CONFIRMED';
  origin: string;
  destination: string;
  estimatedFreightINR: number;
}

export const truckBookingService = {
  async createBooking(req: TruckBookingRequest): Promise<ApiResponse<TruckBookingConfirmation>> {
    const confirmation: TruckBookingConfirmation = {
      bookingId: `CH-FTL-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'PENDING_DRIVER_ASSIGNMENT',
      origin: req.origin,
      destination: req.destination,
      estimatedFreightINR: 63190,
    };
    return mockDelay(confirmation, 'Spot truck booking request logged in demo mode');
  },
};

// 2. Terminal Space Service
export interface TerminalReservationRequest {
  hubId: string;
  baysCount: number;
  durationDays: number;
}

export interface TerminalReservationConfirmation {
  reservationId: string;
  hubName: string;
  baysAllocated: number;
  totalCostINR: number;
  qrPassCode: string;
}

export const terminalSpaceService = {
  async reserveSpace(req: TerminalReservationRequest): Promise<ApiResponse<TerminalReservationConfirmation>> {
    const confirmation: TerminalReservationConfirmation = {
      reservationId: `CH-TRM-${Math.floor(100000 + Math.random() * 900000)}`,
      hubName: 'North Delhi KMP Transhipment Terminal',
      baysAllocated: req.baysCount,
      totalCostINR: req.baysCount * 450 * req.durationDays,
      qrPassCode: `QR-PERMIT-${Date.now().toString().slice(-6)}`,
    };
    return mockDelay(confirmation, 'Terminal bay allocation permit generated');
  },
};

// 3. On-Field Lead Dispatch Service
export interface LeadDispatchRequest {
  skillId: string;
  city: string;
  shiftsCount: number;
  facilityAddress?: string;
}

export interface LeadDispatchConfirmation {
  dispatchId: string;
  status: 'DISPATCH_QUEUED';
  assignedZone: string;
  etaMinutes: number;
}

export const leadDispatchService = {
  async dispatchLead(req: LeadDispatchRequest): Promise<ApiResponse<LeadDispatchConfirmation>> {
    const confirmation: LeadDispatchConfirmation = {
      dispatchId: `CH-DEP-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'DISPATCH_QUEUED',
      assignedZone: req.city,
      etaMinutes: 120,
    };
    return mockDelay(confirmation, 'Field supervisor alert dispatched to zonal operations hub');
  },
};

// 4. Trip Finance Service
export interface TripFinanceRequest {
  invoiceAmountINR: number;
  advancePercentage: number;
  tenureDays: number;
  companyGst?: string;
}

export interface TripFinanceConfirmation {
  applicationId: string;
  eligibleAdvanceINR: number;
  discountFeeINR: number;
  netDisbursementINR: number;
  approvalStatus: 'PRE_APPROVED_DEMO';
}

export const tripFinanceService = {
  async simulateFinance(req: TripFinanceRequest): Promise<ApiResponse<TripFinanceConfirmation>> {
    const advance = Math.round(req.invoiceAmountINR * (req.advancePercentage / 100));
    const fee = Math.round(advance * 0.014);
    const confirmation: TripFinanceConfirmation = {
      applicationId: `CH-FIN-${Math.floor(100000 + Math.random() * 900000)}`,
      eligibleAdvanceINR: advance,
      discountFeeINR: fee,
      netDisbursementINR: advance - fee,
      approvalStatus: 'PRE_APPROVED_DEMO',
    };
    return mockDelay(confirmation, 'Trip working capital calculation generated');
  },
};

// 5. General Consultation & DIY Proposal Service
export interface ConsultationRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  city: string;
  message?: string;
}

/** Ticket / reference ID in the existing CH-REQ-XXXXXX format. */
export function generateReferenceId(): string {
  return `CH-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
}

// Live service requests (hero Live | Track widget)
export const REQUEST_STATUSES = ['Received', 'Under Review', 'In Progress', 'Completed'] as const;
export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export interface ServiceRequestInput {
  referenceId: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  message?: string;
}

export interface ServiceRequestRecord extends ServiceRequestInput {
  createdAt: string;
  updatedAt: string;
  status: RequestStatus;
  assignedTeam?: string;
  history: { status: RequestStatus; at: string; note?: string }[];
}

/**
 * DEMO persistence: requests are kept in this browser's localStorage until the
 * backend phase replaces it with a real API + database. Tracking therefore only
 * finds requests raised from the same browser.
 */
const REQUESTS_KEY = 'chasehorse_service_requests';

function loadRequests(): ServiceRequestRecord[] {
  try {
    const raw = localStorage.getItem(REQUESTS_KEY);
    return raw ? (JSON.parse(raw) as ServiceRequestRecord[]) : [];
  } catch {
    return [];
  }
}

function saveRequests(list: ServiceRequestRecord[]) {
  try {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable (private mode etc.) — request still goes out via WhatsApp */
  }
}

const digitsOnly = (v: string) => v.replace(/\D/g, '').slice(-10);

export const enquiryService = {
  async submitEnquiry(req: ConsultationRequest): Promise<ApiResponse<{ ticketId: string }>> {
    return mockDelay(
      { ticketId: generateReferenceId() },
      'Enquiry submitted. Operations lead will reach out within 2 hours.'
    );
  },

  async createServiceRequest(req: ServiceRequestInput): Promise<ApiResponse<ServiceRequestRecord>> {
    const now = new Date().toISOString();
    const record: ServiceRequestRecord = {
      ...req,
      createdAt: now,
      updatedAt: now,
      status: 'Received',
      history: [{ status: 'Received', at: now, note: 'Request raised from website' }],
    };
    saveRequests([record, ...loadRequests()]);
    return mockDelay(record, 'Service request logged (demo mode)');
  },

  async trackServiceRequest(referenceId: string, phone: string): Promise<ApiResponse<ServiceRequestRecord | null>> {
    const id = referenceId.trim().toUpperCase();
    const match = loadRequests().find(
      (r) => r.referenceId.toUpperCase() === id && digitsOnly(r.phone) === digitsOnly(phone)
    );
    return mockDelay(match ?? null, match ? 'Request found' : 'No matching request');
  },
};

