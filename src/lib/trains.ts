export interface IntermediateStop {
  stationCode: string;
  stationName: string;
  arrivalTime: string;
  departureTime: string;
  haltMinutes: number;
  distanceKm: number;
  day: number;
}

export interface ClassAvailability {
  classCode: string; // "1A" | "2A" | "3A" | "3E" | "SL" | "CC" | "EC"
  className: string;
  fare: number;
  status: "AVAILABLE" | "RAC" | "WL";
  seatsLeft?: number;
  racNumber?: number;
  wlNumber?: number;
  confirmationProbability?: number; // e.g. 92%
  tatkalSeatsLeft?: number;
  tatkalFare?: number;
  updatedAt: string;
}

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  trainNameHi: string;
  trainType: "VANDE BHARAT" | "RAJDHANI" | "SHATABDI" | "DURONTO" | "SUPERFAST" | "EXPRESS";
  fromStationCode: string;
  fromStationName: string;
  toStationCode: string;
  toStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  runningDays: string[]; // ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  pantryAvailable: boolean;
  classes: string[];
  stops: IntermediateStop[];
  onTimeRating: number; // e.g. 94%
}

export const TRAINS_DATABASE: Train[] = [
  {
    id: "train-22436",
    trainNumber: "22436",
    trainName: "Vande Bharat Express",
    trainNameHi: "वंदे भारत एक्सप्रेस",
    trainType: "VANDE BHARAT",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "BSB",
    toStationName: "Varanasi Junction",
    departureTime: "06:00",
    arrivalTime: "14:00",
    duration: "8h 00m",
    distanceKm: 759,
    runningDays: ["Tue", "Wed", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["CC", "EC"],
    onTimeRating: 98,
    stops: [
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "--:--", departureTime: "06:00", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "CNB", stationName: "Kanpur Central", arrivalTime: "10:08", departureTime: "10:10", haltMinutes: 2, distanceKm: 440, day: 1 },
      { stationCode: "PRYJ", stationName: "Prayagraj Junction", arrivalTime: "12:08", departureTime: "12:10", haltMinutes: 2, distanceKm: 635, day: 1 },
      { stationCode: "BSB", stationName: "Varanasi Junction", arrivalTime: "14:00", departureTime: "--:--", haltMinutes: 0, distanceKm: 759, day: 1 },
    ],
  },
  {
    id: "train-12952",
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani Express",
    trainNameHi: "मुंबई राजधानी एक्सप्रेस",
    trainType: "RAJDHANI",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "MMCT",
    toStationName: "Mumbai Central",
    departureTime: "16:55",
    arrivalTime: "08:35",
    duration: "15h 40m",
    distanceKm: 1384,
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["1A", "2A", "3A"],
    onTimeRating: 96,
    stops: [
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "--:--", departureTime: "16:55", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "AGC", stationName: "Agra Cantt", arrivalTime: "18:40", departureTime: "18:45", haltMinutes: 5, distanceKm: 195, day: 1 },
      { stationCode: "GWL", stationName: "Gwalior Junction", arrivalTime: "20:00", departureTime: "20:05", haltMinutes: 5, distanceKm: 313, day: 1 },
      { stationCode: "VGLJ", stationName: "Virangana Lakshmibai Jhansi", arrivalTime: "21:10", departureTime: "21:15", haltMinutes: 5, distanceKm: 410, day: 1 },
      { stationCode: "BPL", stationName: "Bhopal Junction", arrivalTime: "00:50", departureTime: "00:55", haltMinutes: 5, distanceKm: 702, day: 2 },
      { stationCode: "MMCT", stationName: "Mumbai Central", arrivalTime: "08:35", departureTime: "--:--", haltMinutes: 0, distanceKm: 1384, day: 2 },
    ],
  },
  {
    id: "train-12951",
    trainNumber: "12951",
    trainName: "Tejas Rajdhani Express",
    trainNameHi: "तेजस राजधानी एक्सप्रेस",
    trainType: "RAJDHANI",
    fromStationCode: "MMCT",
    fromStationName: "Mumbai Central",
    toStationCode: "NDLS",
    toStationName: "New Delhi",
    departureTime: "17:00",
    arrivalTime: "08:32",
    duration: "15h 32m",
    distanceKm: 1384,
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["1A", "2A", "3A"],
    onTimeRating: 97,
    stops: [
      { stationCode: "MMCT", stationName: "Mumbai Central", arrivalTime: "--:--", departureTime: "17:00", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "BPL", stationName: "Bhopal Junction", arrivalTime: "00:30", departureTime: "00:35", haltMinutes: 5, distanceKm: 682, day: 2 },
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "08:32", departureTime: "--:--", haltMinutes: 0, distanceKm: 1384, day: 2 },
    ],
  },
  {
    id: "train-12009",
    trainNumber: "12009",
    trainName: "Mumbai - Ahmedabad Shatabdi",
    trainNameHi: "मुंबई - अहमदाबाद शताब्दी एक्सप्रेस",
    trainType: "SHATABDI",
    fromStationCode: "MMCT",
    fromStationName: "Mumbai Central",
    toStationCode: "ADI",
    toStationName: "Ahmedabad Junction",
    departureTime: "06:20",
    arrivalTime: "12:45",
    duration: "6h 25m",
    distanceKm: 491,
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    pantryAvailable: true,
    classes: ["CC", "EC"],
    onTimeRating: 95,
    stops: [
      { stationCode: "MMCT", stationName: "Mumbai Central", arrivalTime: "--:--", departureTime: "06:20", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "ADI", stationName: "Ahmedabad Junction", arrivalTime: "12:45", departureTime: "--:--", haltMinutes: 0, distanceKm: 491, day: 1 },
    ],
  },
  {
    id: "train-12301",
    trainNumber: "12301",
    trainName: "Howrah Rajdhani Express (Via Gaya)",
    trainNameHi: "हावड़ा राजधानी एक्सप्रेस",
    trainType: "RAJDHANI",
    fromStationCode: "HWH",
    fromStationName: "Howrah Junction",
    toStationCode: "NDLS",
    toStationName: "New Delhi",
    departureTime: "16:50",
    arrivalTime: "10:05",
    duration: "17h 15m",
    distanceKm: 1450,
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    pantryAvailable: true,
    classes: ["1A", "2A", "3A"],
    onTimeRating: 94,
    stops: [
      { stationCode: "HWH", stationName: "Howrah Junction", arrivalTime: "--:--", departureTime: "16:50", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "PRYJ", stationName: "Prayagraj Junction", arrivalTime: "03:50", departureTime: "03:55", haltMinutes: 5, distanceKm: 818, day: 2 },
      { stationCode: "CNB", stationName: "Kanpur Central", arrivalTime: "05:30", departureTime: "05:35", haltMinutes: 5, distanceKm: 1012, day: 2 },
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "10:05", departureTime: "--:--", haltMinutes: 0, distanceKm: 1450, day: 2 },
    ],
  },
  {
    id: "train-12626",
    trainNumber: "12626",
    trainName: "Kerala Superfast Express",
    trainNameHi: "केरल सुपरफास्ट एक्सप्रेस",
    trainType: "SUPERFAST",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "TVC",
    toStationName: "Thiruvananthapuram Central",
    departureTime: "20:10",
    arrivalTime: "14:15",
    duration: "42h 05m",
    distanceKm: 3036,
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["2A", "3A", "3E", "SL"],
    onTimeRating: 89,
    stops: [
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "--:--", departureTime: "20:10", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "AGC", stationName: "Agra Cantt", arrivalTime: "22:20", departureTime: "22:25", haltMinutes: 5, distanceKm: 195, day: 1 },
      { stationCode: "BPL", stationName: "Bhopal Junction", arrivalTime: "05:20", departureTime: "05:25", haltMinutes: 5, distanceKm: 702, day: 2 },
      { stationCode: "NGP", stationName: "Nagpur Junction", arrivalTime: "11:45", departureTime: "11:50", haltMinutes: 5, distanceKm: 1092, day: 2 },
      { stationCode: "MAS", stationName: "Chennai Central", arrivalTime: "04:15", departureTime: "04:30", haltMinutes: 15, distanceKm: 2185, day: 3 },
      { stationCode: "TVC", stationName: "Thiruvananthapuram Central", arrivalTime: "14:15", departureTime: "--:--", haltMinutes: 0, distanceKm: 3036, day: 3 },
    ],
  },
  {
    id: "train-12007",
    trainNumber: "12007",
    trainName: "Mysuru Shatabdi Express",
    trainNameHi: "मैसूर शताब्दी एक्सप्रेस",
    trainType: "SHATABDI",
    fromStationCode: "MAS",
    fromStationName: "Chennai Central",
    toStationCode: "SBC",
    toStationName: "KSR Bengaluru City",
    departureTime: "06:00",
    arrivalTime: "10:50",
    duration: "4h 50m",
    distanceKm: 359,
    runningDays: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["CC", "EC"],
    onTimeRating: 99,
    stops: [
      { stationCode: "MAS", stationName: "Chennai Central", arrivalTime: "--:--", departureTime: "06:00", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "SBC", stationName: "KSR Bengaluru City", arrivalTime: "10:50", departureTime: "--:--", haltMinutes: 0, distanceKm: 359, day: 1 },
    ],
  },
  {
    id: "train-12259",
    trainNumber: "12259",
    trainName: "Sealdah - Bikaner AC Duronto",
    trainNameHi: "सियालदह - बीकानेर एसी दुरंतो",
    trainType: "DURONTO",
    fromStationCode: "SDAH",
    fromStationName: "Sealdah",
    toStationCode: "NDLS",
    toStationName: "New Delhi",
    departureTime: "17:00",
    arrivalTime: "11:00",
    duration: "18h 00m",
    distanceKm: 1458,
    runningDays: ["Mon", "Wed", "Thu", "Sun"],
    pantryAvailable: true,
    classes: ["1A", "2A", "3A"],
    onTimeRating: 93,
    stops: [
      { stationCode: "SDAH", stationName: "Sealdah", arrivalTime: "--:--", departureTime: "17:00", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "CNB", stationName: "Kanpur Central", arrivalTime: "06:20", departureTime: "06:25", haltMinutes: 5, distanceKm: 1018, day: 2 },
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "11:00", departureTime: "--:--", haltMinutes: 0, distanceKm: 1458, day: 2 },
    ],
  },
  {
    id: "train-12424",
    trainNumber: "12424",
    trainName: "Dibrugarh Rajdhani Express",
    trainNameHi: "डिब्रूगढ़ राजधानी एक्सप्रेस",
    trainType: "RAJDHANI",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "GHY",
    toStationName: "Guwahati",
    departureTime: "16:20",
    arrivalTime: "19:35",
    duration: "27h 15m",
    distanceKm: 1912,
    runningDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["1A", "2A", "3A"],
    onTimeRating: 91,
    stops: [
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "--:--", departureTime: "16:20", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "CNB", stationName: "Kanpur Central", arrivalTime: "21:02", departureTime: "21:07", haltMinutes: 5, distanceKm: 440, day: 1 },
      { stationCode: "PRYJ", stationName: "Prayagraj Junction", arrivalTime: "22:50", departureTime: "22:52", haltMinutes: 2, distanceKm: 635, day: 1 },
      { stationCode: "PNBE", stationName: "Patna Junction", arrivalTime: "04:20", departureTime: "04:30", haltMinutes: 10, distanceKm: 998, day: 2 },
      { stationCode: "GHY", stationName: "Guwahati", arrivalTime: "19:35", departureTime: "--:--", haltMinutes: 0, distanceKm: 1912, day: 2 },
    ],
  },
  {
    id: "train-22439",
    trainNumber: "22439",
    trainName: "Vande Bharat Express (Katra)",
    trainNameHi: "वंदे भारत एक्सप्रेस (कटरा)",
    trainType: "VANDE BHARAT",
    fromStationCode: "NDLS",
    fromStationName: "New Delhi",
    toStationCode: "SVDK",
    toStationName: "SMVD Katra",
    departureTime: "06:00",
    arrivalTime: "14:00",
    duration: "8h 00m",
    distanceKm: 655,
    runningDays: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
    pantryAvailable: true,
    classes: ["CC", "EC"],
    onTimeRating: 98,
    stops: [
      { stationCode: "NDLS", stationName: "New Delhi", arrivalTime: "--:--", departureTime: "06:00", haltMinutes: 0, distanceKm: 0, day: 1 },
      { stationCode: "JAT", stationName: "Jammu Tawi", arrivalTime: "12:38", departureTime: "12:40", haltMinutes: 2, distanceKm: 577, day: 1 },
      { stationCode: "SVDK", stationName: "SMVD Katra", arrivalTime: "14:00", departureTime: "--:--", haltMinutes: 0, distanceKm: 655, day: 1 },
    ],
  },
];

// Helper to calculate realistic live availability based on date, train, and quota
export function getAvailabilityForTrain(
  train: Train,
  travelDate: string,
  quota: string = "GN"
): Record<string, ClassAvailability> {
  const hash = (train.trainNumber + travelDate + quota).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const classNames: Record<string, string> = {
    "1A": "AC First Class (1A)",
    "2A": "AC 2 Tier (2A)",
    "3A": "AC 3 Tier (3A)",
    "3E": "AC 3 Economy (3E)",
    "SL": "Sleeper Class (SL)",
    "CC": "AC Chair Car (CC)",
    "EC": "Executive Chair Car (EC)",
    "2S": "Second Sitting (2S)",
  };

  const baseRatesPerKm: Record<string, number> = {
    "1A": 3.4,
    "2A": 2.1,
    "3A": 1.45,
    "3E": 1.25,
    "CC": 1.6,
    "EC": 3.1,
    "SL": 0.55,
    "2S": 0.35,
  };

  const results: Record<string, ClassAvailability> = {};

  train.classes.forEach((cls, idx) => {
    const rate = baseRatesPerKm[cls] || 1.0;
    const baseFare = Math.round(train.distanceKm * rate + 50); // plus reservation and superfast charge
    
    // Determine realistic availability pattern
    const seed = (hash * (idx + 1) * 17) % 100;
    
    let status: "AVAILABLE" | "RAC" | "WL" = "AVAILABLE";
    let seatsLeft: number | undefined;
    let racNumber: number | undefined;
    let wlNumber: number | undefined;
    let confirmationProbability: number | undefined;

    if (quota === "TQ") {
      // Tatkal
      if (seed < 40) {
        status = "AVAILABLE";
        seatsLeft = Math.floor((seed % 15) + 3);
      } else {
        status = "WL";
        wlNumber = Math.floor((seed % 25) + 1);
        confirmationProbability = Math.max(30, 95 - (wlNumber * 3));
      }
    } else {
      // General
      if (seed < 65) {
        status = "AVAILABLE";
        seatsLeft = Math.floor((seed % 42) + 6);
      } else if (seed < 82) {
        status = "RAC";
        racNumber = Math.floor((seed % 14) + 1);
        confirmationProbability = 95;
      } else {
        status = "WL";
        wlNumber = Math.floor((seed % 35) + 1);
        confirmationProbability = Math.max(40, 98 - (wlNumber * 2));
      }
    }

    const tatkalSurcharge = Math.round(baseFare * 0.3);

    results[cls] = {
      classCode: cls,
      className: classNames[cls] || cls,
      fare: baseFare,
      status,
      seatsLeft,
      racNumber,
      wlNumber,
      confirmationProbability,
      tatkalSeatsLeft: Math.floor((seed % 10) + 2),
      tatkalFare: baseFare + tatkalSurcharge,
      updatedAt: "Just now",
    };
  });

  return results;
}
