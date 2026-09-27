export interface Passenger {
  id: string;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
  berthPreference: "LOWER" | "MIDDLE" | "UPPER" | "SIDE_LOWER" | "SIDE_UPPER" | "WINDOW" | "NO_PREFERENCE";
  allocatedCoach?: string;
  allocatedBerth?: number;
  allocatedBerthType?: string;
  status: "CONFIRMED" | "RAC" | "WL";
  foodChoice: "VEG" | "NON_VEG" | "JAIN" | "NO_FOOD";
  seniorCitizen: boolean;
  aadhaarLastFour?: string;
}

export interface Booking {
  pnr: string;
  trainNumber: string;
  trainName: string;
  trainType: string;
  fromStationCode: string;
  fromStationName: string;
  toStationCode: string;
  toStationName: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  travelClass: string;
  quota: string;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
  baseFare: number;
  convenienceFee: number;
  insuranceFee: number;
  gstAmount: number;
  tatkalCharge: number;
  totalAmount: number;
  paymentMethod: string;
  paymentId: string;
  bookingStatus: "BOOKED" | "CANCELLED" | "PARTIALLY_CANCELLED";
  chartPrepared: boolean;
  bookedAt: string;
  cancellationDetails?: {
    cancelledAt: string;
    refundAmount: number;
    cancellationCharges: number;
    refundStatus: "PROCESSED" | "INITIATED";
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedPassengers: Array<{
    name: string;
    age: number;
    gender: "MALE" | "FEMALE" | "OTHER";
    berthPreference: "LOWER" | "MIDDLE" | "UPPER" | "SIDE_LOWER" | "SIDE_UPPER" | "WINDOW" | "NO_PREFERENCE";
    foodChoice: "VEG" | "NON_VEG" | "JAIN" | "NO_FOOD";
  }>;
}

// Global in-memory storage for realistic simulation
declare global {
  var __GLOBAL_BOOKINGS__: Map<string, Booking> | undefined;
}

if (!globalThis.__GLOBAL_BOOKINGS__) {
  globalThis.__GLOBAL_BOOKINGS__ = new Map<string, Booking>();
}

export const BOOKING_STORE = globalThis.__GLOBAL_BOOKINGS__;

// Seed initial realistic bookings if empty
if (BOOKING_STORE.size === 0) {
  const sampleBooking: Booking = {
    pnr: "2849103852",
    trainNumber: "22436",
    trainName: "Vande Bharat Express",
    trainType: "VANDE BHARAT",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "BSB",
    toStationName: "Varanasi Junction",
    journeyDate: "2026-10-05",
    departureTime: "06:00",
    arrivalTime: "14:00",
    duration: "8h 00m",
    travelClass: "CC",
    quota: "GN",
    contactEmail: "rahul.sharma@example.com",
    contactPhone: "9876543210",
    baseFare: 1750,
    convenienceFee: 35.4,
    insuranceFee: 0.45,
    gstAmount: 87.5,
    tatkalCharge: 0,
    totalAmount: 1873,
    paymentMethod: "UPI (Google Pay)",
    paymentId: "UPI-PAY-882390192",
    bookingStatus: "BOOKED",
    chartPrepared: false,
    bookedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    passengers: [
      {
        id: "p-1",
        name: "Rahul Sharma",
        age: 32,
        gender: "MALE",
        berthPreference: "WINDOW",
        allocatedCoach: "C4",
        allocatedBerth: 24,
        allocatedBerthType: "Window Seat",
        status: "CONFIRMED",
        foodChoice: "VEG",
        seniorCitizen: false,
      },
      {
        id: "p-2",
        name: "Pooja Sharma",
        age: 29,
        gender: "FEMALE",
        berthPreference: "NO_PREFERENCE",
        allocatedCoach: "C4",
        allocatedBerth: 25,
        allocatedBerthType: "Aisle Seat",
        status: "CONFIRMED",
        foodChoice: "VEG",
        seniorCitizen: false,
      },
    ],
  };

  const sampleBooking2: Booking = {
    pnr: "4920194821",
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani Express",
    trainType: "RAJDHANI",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "MMCT",
    toStationName: "Mumbai Central",
    journeyDate: "2026-10-12",
    departureTime: "16:55",
    arrivalTime: "08:35",
    duration: "15h 40m",
    travelClass: "3A",
    quota: "GN",
    contactEmail: "rahul.sharma@example.com",
    contactPhone: "9876543210",
    baseFare: 2150,
    convenienceFee: 35.4,
    insuranceFee: 0.45,
    gstAmount: 107.5,
    tatkalCharge: 0,
    totalAmount: 2293,
    paymentMethod: "Credit Card (HDFC)",
    paymentId: "PAY-CC-99238472",
    bookingStatus: "BOOKED",
    chartPrepared: false,
    bookedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    passengers: [
      {
        id: "p-3",
        name: "Rahul Sharma",
        age: 32,
        gender: "MALE",
        berthPreference: "LOWER",
        allocatedCoach: "B2",
        allocatedBerth: 19,
        allocatedBerthType: "Lower Berth",
        status: "CONFIRMED",
        foodChoice: "NON_VEG",
        seniorCitizen: false,
      },
    ],
  };

  BOOKING_STORE.set(sampleBooking.pnr, sampleBooking);
  BOOKING_STORE.set(sampleBooking2.pnr, sampleBooking2);
}

// Generate realistic Indian Railways 10-digit PNR
export function generatePNR(): string {
  // First digit usually 2, 4, 6 or 8 depending on PRS zone
  const prefix = ["2", "4", "6", "8"][Math.floor(Math.random() * 4)];
  let remaining = "";
  for (let i = 0; i < 9; i++) {
    remaining += Math.floor(Math.random() * 10).toString();
  }
  return prefix + remaining;
}

// Berth assignment logic based on class
export function allocateSeat(travelClass: string, index: number, preference?: string) {
  const coachesByClass: Record<string, string[]> = {
    "1A": ["H1", "H2"],
    "2A": ["A1", "A2", "A3"],
    "3A": ["B1", "B2", "B3", "B4", "B5"],
    "3E": ["M1", "M2", "M3"],
    "CC": ["C1", "C2", "C3", "C4", "C5"],
    "EC": ["E1", "E2"],
    "SL": ["S1", "S2", "S3", "S4", "S5", "S6"],
    "2S": ["D1", "D2", "D3"],
  };

  const coaches = coachesByClass[travelClass] || ["B1", "B2"];
  const coach = coaches[Math.floor(Math.random() * coaches.length)];
  const seatNum = (index * 7 + Math.floor(Math.random() * 10) + 12) % 64 + 1;

  let berthType = "Window Seat";
  if (travelClass === "CC" || travelClass === "EC") {
    berthType = seatNum % 3 === 0 ? "Window Seat" : seatNum % 2 === 0 ? "Aisle Seat" : "Middle Seat";
  } else if (travelClass === "1A") {
    berthType = seatNum % 2 === 0 ? "Cabin (Upper)" : "Coupe (Lower)";
  } else {
    // 2A, 3A, SL
    const mod = seatNum % 8;
    if (mod === 1 || mod === 4) berthType = "Lower Berth";
    else if (mod === 2 || mod === 5) berthType = "Middle Berth";
    else if (mod === 3 || mod === 6) berthType = "Upper Berth";
    else if (mod === 7) berthType = "Side Lower";
    else berthType = "Side Upper";
  }

  // If user requested Lower and it matches or can be granted
  if (preference === "LOWER" && berthType !== "Lower Berth") {
    berthType = "Lower Berth (Allotted as preferred)";
  }

  return {
    coach,
    berth: seatNum,
    berthType,
  };
}
