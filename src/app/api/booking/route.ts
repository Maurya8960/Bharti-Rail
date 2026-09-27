import { NextResponse } from "next/server";
import { BOOKING_STORE, generatePNR, allocateSeat, Booking, Passenger } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      trainNumber,
      trainName,
      trainType,
      fromStationCode,
      fromStationName,
      toStationCode,
      toStationName,
      journeyDate,
      departureTime,
      arrivalTime,
      duration,
      travelClass,
      quota = "GN",
      passengers,
      contactEmail,
      contactPhone,
      baseFare,
      convenienceFee = 35.4,
      insuranceFee = 0.45,
      gstAmount = 0,
      tatkalCharge = 0,
      paymentMethod = "UPI",
      paymentId = "PAY-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    } = body;

    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one passenger is required." },
        { status: 400 }
      );
    }

    const pnr = generatePNR();

    // Allocate coach & berth for each passenger
    const enrichedPassengers: Passenger[] = passengers.map((p: any, idx: number) => {
      const seat = allocateSeat(travelClass, idx, p.berthPreference);
      return {
        id: "pax-" + (idx + 1) + "-" + Date.now(),
        name: p.name,
        age: Number(p.age),
        gender: p.gender,
        berthPreference: p.berthPreference || "NO_PREFERENCE",
        allocatedCoach: seat.coach,
        allocatedBerth: seat.berth,
        allocatedBerthType: seat.berthType,
        status: "CONFIRMED",
        foodChoice: p.foodChoice || "VEG",
        seniorCitizen: Number(p.age) >= 60,
      };
    });

    const totalFare = Number(baseFare) * passengers.length;
    const totalInsurance = Number(insuranceFee) * passengers.length;
    const finalGst = Math.round(totalFare * 0.05);
    const finalTotal = Math.round(totalFare + convenienceFee + totalInsurance + finalGst + Number(tatkalCharge));

    const newBooking: Booking = {
      pnr,
      trainNumber,
      trainName,
      trainType: trainType || "SUPERFAST",
      fromStationCode,
      fromStationName,
      toStationCode,
      toStationName,
      journeyDate,
      departureTime,
      arrivalTime,
      duration,
      travelClass,
      quota,
      passengers: enrichedPassengers,
      contactEmail: contactEmail || "passenger@example.com",
      contactPhone: contactPhone || "9876543210",
      baseFare: totalFare,
      convenienceFee,
      insuranceFee: totalInsurance,
      gstAmount: finalGst,
      tatkalCharge: Number(tatkalCharge),
      totalAmount: finalTotal,
      paymentMethod,
      paymentId,
      bookingStatus: "BOOKED",
      chartPrepared: false,
      bookedAt: new Date().toISOString(),
    };

    BOOKING_STORE.set(pnr, newBooking);

    return NextResponse.json({
      success: true,
      message: "Ticket booked successfully!",
      booking: newBooking,
      pnr,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const bookings = Array.from(BOOKING_STORE.values()).sort(
    (a, b) => new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
  );

  return NextResponse.json({
    success: true,
    count: bookings.length,
    bookings,
  });
}
