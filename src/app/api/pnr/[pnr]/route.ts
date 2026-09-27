import { NextResponse } from "next/server";
import { BOOKING_STORE } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pnr: string }> }
) {
  const { pnr } = await params;
  const booking = BOOKING_STORE.get(pnr);

  if (!booking) {
    return NextResponse.json(
      { success: false, message: `No booking found for PNR: ${pnr}` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    pnr: booking.pnr,
    booking,
  });
}
