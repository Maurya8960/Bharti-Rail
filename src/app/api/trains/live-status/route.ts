import { NextResponse } from "next/server";
import { TRAINS_DATABASE } from "@/lib/trains";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trainNumber = searchParams.get("trainNumber") || "22436";

  const train = TRAINS_DATABASE.find(
    (t) => t.trainNumber === trainNumber || t.id.includes(trainNumber)
  );

  if (!train) {
    return NextResponse.json(
      { success: false, message: "Train not found" },
      { status: 404 }
    );
  }

  // Realistic live simulated status
  const stops = train.stops;
  const currentStopIndex = Math.min(1, stops.length - 1);
  const currentStop = stops[currentStopIndex];
  const nextStop = stops[Math.min(currentStopIndex + 1, stops.length - 1)];

  return NextResponse.json({
    success: true,
    trainNumber: train.trainNumber,
    trainName: train.trainName,
    trainType: train.trainType,
    statusText: "RUNNING ON TIME",
    delayMinutes: 0,
    currentSpeedKmh: 110,
    currentStation: currentStop.stationName,
    currentStationCode: currentStop.stationCode,
    nextStation: nextStop.stationName,
    nextStationCode: nextStop.stationCode,
    platform: 2,
    lastUpdated: "2 mins ago via GPS Tracker",
    stopsProgress: stops.map((s, idx) => ({
      ...s,
      isPassed: idx <= currentStopIndex,
      isCurrent: idx === currentStopIndex,
      actualArrival: s.arrivalTime,
      actualDeparture: s.departureTime,
      platform: ((idx + 2) % 6) + 1,
    })),
  });
}
