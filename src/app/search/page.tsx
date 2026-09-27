"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchWidget from "@/components/SearchWidget";
import TrainCard from "@/components/TrainCard";
import { Train, ClassAvailability } from "@/lib/trains";
import { STATIONS } from "@/lib/stations";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calendar,
  Filter,
  Train as TrainIcon,
  Sparkles,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();

  const from = searchParams.get("from") || "NDLS";
  const to = searchParams.get("to") || "MMCT";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const travelClass = searchParams.get("class") || "ALL";
  const quota = searchParams.get("quota") || "GN";

  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState<Array<Train & { availability?: Record<string, ClassAvailability> }>>([]);

  const [selectedTrainTypes, setSelectedTrainTypes] = useState<string[]>([]);
  const [departureTimeFilter, setDepartureTimeFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"DEPARTURE" | "DURATION" | "RATING">("DEPARTURE");

  useEffect(() => {
    async function fetchTrains() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          from,
          to,
          date,
          class: travelClass,
          quota,
        });
        const res = await fetch(`/api/trains/search?${query.toString()}`);
        const data = await res.json();
        if (data.success) {
          setTrains(data.trains);
        }
      } catch (err) {
        console.error("Error fetching trains:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrains();
  }, [from, to, date, travelClass, quota]);

  const fromStation = STATIONS.find((s) => s.code === from);
  const toStation = STATIONS.find((s) => s.code === to);

  const dateRange = useMemo(() => {
    const list = [];
    const baseDate = new Date(date);
    for (let i = -2; i <= 4; i++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + i);
      list.push(d.toISOString().split("T")[0]);
    }
    return list;
  }, [date]);

  const handleDateChange = (newDate: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("date", newDate);
    router.push(`/search?${params.toString()}`);
  };

  const filteredTrains = useMemo(() => {
    let result = [...trains];

    if (selectedTrainTypes.length > 0) {
      result = result.filter((t) => selectedTrainTypes.includes(t.trainType));
    }

    if (departureTimeFilter !== "ALL") {
      result = result.filter((t) => {
        const hour = parseInt(t.departureTime.split(":")[0], 10);
        if (departureTimeFilter === "EARLY_MORNING") return hour >= 0 && hour < 6;
        if (departureTimeFilter === "MORNING") return hour >= 6 && hour < 12;
        if (departureTimeFilter === "AFTERNOON") return hour >= 12 && hour < 18;
        if (departureTimeFilter === "NIGHT") return hour >= 18 && hour < 24;
        return true;
      });
    }

    result.sort((a, b) => {
      if (sortBy === "DEPARTURE") {
        return a.departureTime.localeCompare(b.departureTime);
      }
      if (sortBy === "DURATION") {
        const getMins = (dur: string) => {
          const parts = dur.match(/(\d+)h\s*(\d*)m?/);
          if (!parts) return 0;
          return parseInt(parts[1] || "0", 10) * 60 + parseInt(parts[2] || "0", 10);
        };
        return getMins(a.duration) - getMins(b.duration);
      }
      if (sortBy === "RATING") {
        return b.onTimeRating - a.onTimeRating;
      }
      return 0;
    });

    return result;
  }, [trains, selectedTrainTypes, departureTimeFilter, sortBy]);

  const toggleTrainType = (type: string) => {
    setSelectedTrainTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-7xl">
      {/* Compact Search Header */}
      <SearchWidget
        compact
        initialFrom={from}
        initialTo={to}
        initialDate={date}
        initialClass={travelClass}
        initialQuota={quota}
      />

      {/* 7-DAY INTERACTIVE DATE STRIP */}
      <div className="ios-glass p-2.5 rounded-3xl flex items-center gap-2 overflow-x-auto">
        <div className="px-4 py-2 text-xs sm:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-2 border-r border-slate-200 dark:border-white/10">
          <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Dates:</span>
        </div>
        <div className="flex items-center gap-2">
          {dateRange.map((dStr) => {
            const d = new Date(dStr);
            const isSelected = dStr === date;
            const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
            const dayNum = d.toLocaleDateString("en-US", { day: "numeric", month: "short" });

            return (
              <button
                key={dStr}
                onClick={() => handleDateChange(dStr)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 flex flex-col items-center cursor-pointer ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30 scale-105"
                    : "ios-glass-pill hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                }`}
              >
                <span className="text-[10px] uppercase opacity-80">{dayName}</span>
                <span className="font-black">{dayNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Meta Info Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 ios-glass-pill p-5 rounded-3xl">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {language === "hi" && fromStation?.cityHi ? fromStation.cityHi : fromStation?.city || from}{" "}
              <span className="text-slate-400">→</span>{" "}
              {language === "hi" && toStation?.cityHi ? toStation.cityHi : toStation?.city || to}
            </h1>
            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300/30">
              {quota === "TQ" ? "Tatkal" : "General"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
            Showing {filteredTrains.length} direct services for{" "}
            {new Date(date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs sm:text-sm font-bold px-4 py-2 ios-glass-pill rounded-xl text-slate-800 dark:text-slate-100 focus:outline-none cursor-pointer"
          >
            <option value="DEPARTURE" className="dark:bg-slate-900">Departure Time (Earliest)</option>
            <option value="DURATION" className="dark:bg-slate-900">Travel Duration (Fastest)</option>
            <option value="RATING" className="dark:bg-slate-900">On-Time Performance</option>
          </select>
        </div>
      </div>

      {/* MAIN CONTENT: FILTERS + TRAIN CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* FILTERS */}
        <div className="lg:col-span-3 ios-glass-card p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-2 font-black text-base text-slate-900 dark:text-white">
              <Filter className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <span>Filters</span>
            </div>
            {(selectedTrainTypes.length > 0 || departureTimeFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSelectedTrainTypes([]);
                  setDepartureTimeFilter("ALL");
                }}
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-bold cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Departure Time
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              {[
                { id: "ALL", label: "Any Time" },
                { id: "EARLY_MORNING", label: "Early Morning (00:00 - 06:00)" },
                { id: "MORNING", label: "Morning (06:00 - 12:00)" },
                { id: "AFTERNOON", label: "Afternoon (12:00 - 18:00)" },
                { id: "NIGHT", label: "Night (18:00 - 24:00)" },
              ].map((slot) => (
                <label
                  key={slot.id}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer text-slate-700 dark:text-slate-200"
                >
                  <input
                    type="radio"
                    name="departureSlot"
                    checked={departureTimeFilter === slot.id}
                    onChange={() => setDepartureTimeFilter(slot.id)}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>{slot.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Train Category
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              {["VANDE BHARAT", "RAJDHANI", "SHATABDI", "DURONTO", "SUPERFAST"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/60 dark:hover:bg-slate-800/60 cursor-pointer text-slate-700 dark:text-slate-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedTrainTypes.includes(type)}
                    onChange={() => toggleTrainType(type)}
                    className="text-sky-600 focus:ring-sky-500 rounded"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* TRAIN CARDS */}
        <div className="lg:col-span-9 space-y-5">
          {loading ? (
            <div className="p-16 text-center ios-glass-card space-y-3">
              <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-base font-black text-slate-800 dark:text-slate-100">Fetching Seat Availability...</p>
            </div>
          ) : filteredTrains.length === 0 ? (
            <div className="p-16 text-center ios-glass-card space-y-4">
              <TrainIcon className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">No Direct Trains Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try clearing your filters or selecting an alternative travel date.
              </p>
            </div>
          ) : (
            filteredTrains.map((train) => (
              <TrainCard
                key={train.id}
                train={train}
                travelDate={date}
                quota={quota}
                selectedClass={travelClass !== "ALL" ? travelClass : undefined}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
