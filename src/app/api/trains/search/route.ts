import { NextResponse } from "next/server";
import { TRAINS_DATABASE, getAvailabilityForTrain } from "@/lib/trains";
import { STATIONS } from "@/lib/stations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = (searchParams.get("from") || "").toUpperCase().trim();
  const to = (searchParams.get("to") || "").toUpperCase().trim();
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const quota = searchParams.get("quota") || "GN";
  const travelClass = searchParams.get("class") || "ALL";

  // Check if stations exist or match query
  let filteredTrains = TRAINS_DATABASE.filter((train) => {
    // Direct match
    const matchesFrom = !from || train.fromStationCode === from || 
      train.stops.some((s) => s.stationCode === from);
    const matchesTo = !to || train.toStationCode === to || 
      train.stops.some((s) => s.stationCode === to);

    // If both specified, ensure 'from' stop comes before 'to' stop
    if (from && to && matchesFrom && matchesTo) {
      const fromIdx = train.stops.findIndex((s) => s.stationCode === from);
      const toIdx = train.stops.findIndex((s) => s.stationCode === to);
      if (fromIdx !== -1 && toIdx !== -1) {
        return fromIdx < toIdx;
      }
    }

    return matchesFrom && matchesTo;
  });

  // If no direct trains found for demonstration, offer smart alternatives or popular trains
  if (filteredTrains.length === 0 && (!from || !to)) {
    filteredTrains = TRAINS_DATABASE;
  } else if (filteredTrains.length === 0) {
    // Provide top trains with origin matching or destination matching
    filteredTrains = TRAINS_DATABASE.filter(
      (t) => t.fromStationCode === from || t.toStationCode === to || t.fromStationCode === "NDLS"
    );
  }

  // Calculate live availability for each train
  const enrichedTrains = filteredTrains.map((train) => {
    const availability = getAvailabilityForTrain(train, date, quota);
    return {
      ...train,
      availability,
    };
  });

  return NextResponse.json({
    success: true,
    query: { from, to, date, quota, travelClass },
    totalTrains: enrichedTrains.length,
    trains: enrichedTrains,
  });
}
