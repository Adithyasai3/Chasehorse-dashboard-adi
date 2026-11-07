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

export const enquiryService = {
  async submitEnquiry(req: ConsultationRequest): Promise<ApiResponse<{ ticketId: string }>> {
    return mockDelay(
      { ticketId: `CH-REQ-${Math.floor(100000 + Math.random() * 900000)}` },
      'Enquiry submitted. Operations lead will reach out within 2 hours.'
    );
  },
};

