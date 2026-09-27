import { NextResponse } from "next/server";
import { BOOKING_STORE } from "@/lib/store";
import { calculateCancellationRefund } from "@/lib/pricing";

export async function POST(request: Request) {
  try {
    const { pnr, reason } = await request.json();

    if (!pnr) {
      return NextResponse.json(
        { success: false, message: "PNR is required for cancellation." },
        { status: 400 }
      );
    }

    const booking = BOOKING_STORE.get(pnr);
    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking with specified PNR not found." },
        { status: 404 }
      );
    }

    if (booking.bookingStatus === "CANCELLED") {
      return NextResponse.json(
        { success: false, message: "This booking is already cancelled." },
        { status: 400 }
      );
    }

    // Calculate refund using authentic Indian Railways formula
    const refundDetails = calculateCancellationRefund(
      booking.totalAmount,
      booking.travelClass,
      72, // 72 hours before journey
      booking.passengers.length
    );

    booking.bookingStatus = "CANCELLED";
    booking.cancellationDetails = {
      cancelledAt: new Date().toISOString(),
      refundAmount: refundDetails.refundAmount,
      cancellationCharges: refundDetails.cancellationFee + refundDetails.clerkageFee,
      refundStatus: "PROCESSED",
    };

    BOOKING_STORE.set(pnr, booking);

    return NextResponse.json({
      success: true,
      message: "Ticket cancelled successfully. Refund initiated.",
      booking,
      refundDetails,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to cancel ticket" },
      { status: 500 }
    );
  }
}
