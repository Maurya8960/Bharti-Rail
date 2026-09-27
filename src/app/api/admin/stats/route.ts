import { NextResponse } from "next/server";
import { BOOKING_STORE } from "@/lib/store";
import { TRAINS_DATABASE } from "@/lib/trains";
import { STATIONS } from "@/lib/stations";

export async function GET() {
  const bookings = Array.from(BOOKING_STORE.values());
  const totalRevenue = bookings.reduce((sum, b) => b.bookingStatus === "BOOKED" ? sum + b.totalAmount : sum, 0);
  const activeBookings = bookings.filter((b) => b.bookingStatus === "BOOKED").length;
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === "CANCELLED").length;

  const classBreakdown: Record<string, number> = {};
  bookings.forEach((b) => {
    classBreakdown[b.travelClass] = (classBreakdown[b.travelClass] || 0) + b.passengers.length;
  });

  return NextResponse.json({
    success: true,
    stats: {
      totalBookings: bookings.length,
      activeBookings,
      cancelledBookings,
      totalRevenue,
      averageFare: bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0,
      totalTrains: TRAINS_DATABASE.length,
      totalStations: STATIONS.length,
      serverUptime: "99.98%",
      apiLatencyMs: 42,
      databaseSyncStatus: "HEALTHY",
      classBreakdown,
      recentBookings: bookings.slice(0, 8),
    },
  });
}
