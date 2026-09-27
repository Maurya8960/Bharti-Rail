"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Compass,
  Train,
  Clock,
  MapPin,
  Search,
  CheckCircle2,
  Gauge,
  AlertTriangle,
} from "lucide-react";
import { TRAINS_DATABASE } from "@/lib/trains";
import { useLanguage } from "@/context/LanguageContext";

function LiveStatusContent() {
  const searchParams = useSearchParams();
  const initialTrain = searchParams.get("train") || "22436";
  const { language, t } = useLanguage();

  const [trainInput, setTrainInput] = useState(initialTrain);
  const [loading, setLoading] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLiveStatus = async (trainNum: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/trains/live-status?trainNumber=${trainNum}`);
      const data = await res.json();
      if (data.success) {
        setLiveData(data);
      } else {
        setError(data.message || `No live GPS tracking data for train ${trainNum}`);
        setLiveData(null);
      }
    } catch (e) {
      setError("Failed to connect to Indian Railways RTIS GPS system.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialTrain) {
      fetchLiveStatus(initialTrain);
    }
  }, [initialTrain]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainInput.trim()) return;
    fetchLiveStatus(trainInput.trim());
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      {/* SEARCH HEADER */}
      <div className="ios-glass-card p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-2 shadow-md">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === "hi" ? "लाइव ट्रेन रनिंग स्टेटस (GPS / RTIS)" : "Live Train Running Status (GPS / RTIS)"}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
            {language === "hi"
              ? "सैटेलाइट आधारित लोकोमोटिव ट्रैकिंग, गति, वर्तमान स्टेशन एवं आगमन समय"
              : "Real-time GPS locomotive tracking, current speed, upcoming station arrival, and platform numbers"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={language === "hi" ? "ट्रेन नंबर दर्ज करें (उदा. 22436, 12952)..." : "Enter Train Number (e.g. 22436, 12952)..."}
              value={trainInput}
              onChange={(e) => setTrainInput(e.target.value)}
              className="w-full px-5 py-4 text-base sm:text-lg font-black bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-sky-600/30 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer hover:scale-105"
          >
            <Search className="w-5 h-5" />
            <span>{loading ? "Tracking..." : "Track Train"}</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400 pt-2 font-medium">
          <span>Quick Select:</span>
          {TRAINS_DATABASE.slice(0, 4).map((t) => (
            <button
              key={t.trainNumber}
              type="button"
              onClick={() => {
                setTrainInput(t.trainNumber);
                fetchLiveStatus(t.trainNumber);
              }}
              className="font-bold text-sky-600 dark:text-sky-400 hover:underline ios-glass-pill px-3 py-1.5 rounded-xl cursor-pointer"
            >
              #{t.trainNumber} {t.trainName}
            </button>
          ))}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl text-sm font-bold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* LIVE STATUS CARD */}
      {liveData && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="ios-glass-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/10 pb-5">
              <div>
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                  ● RTIS SATELLITE LIVE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                  {liveData.trainName} (#{liveData.trainNumber})
                </h2>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                  Type: {liveData.trainType} • Updated {liveData.lastUpdated}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="ios-glass-pill px-4 py-2.5 rounded-2xl text-right">
                  <div className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400">Punctuality</div>
                  <div className="text-base font-black text-slate-900 dark:text-white">{liveData.statusText}</div>
                </div>
                <div className="ios-glass-pill px-4 py-2.5 rounded-2xl text-right">
                  <div className="text-xs uppercase font-bold text-sky-600 dark:text-sky-400">Speed</div>
                  <div className="text-base font-black text-slate-900 dark:text-white">{liveData.currentSpeedKmh} km/h</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 ios-glass-pill rounded-2xl">
                <span className="text-xs uppercase font-black text-slate-400">Current Station Passed</span>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{liveData.currentStation}</div>
                <div className="font-mono text-sky-600 dark:text-sky-400 font-bold">{liveData.currentStationCode} • Platform {liveData.platform}</div>
              </div>

              <div className="p-4 ios-glass-pill rounded-2xl">
                <span className="text-xs uppercase font-black text-slate-400">Next Approaching Station</span>
                <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{liveData.nextStation}</div>
                <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{liveData.nextStationCode}</div>
              </div>
            </div>
          </div>

          {/* TIMELINE */}
          <div className="ios-glass-card p-6 sm:p-8 space-y-5">
            <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-wider">
              Route & Station Progress
            </h3>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-1 before:bg-slate-200 dark:before:bg-slate-700">
              {liveData.stopsProgress?.map((stop: any, idx: number) => {
                const isPassed = stop.isPassed;
                const isCurrent = stop.isCurrent;

                return (
                  <div key={stop.stationCode} className="flex items-start gap-4 relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 z-10 ${
                        isCurrent
                          ? "bg-sky-600 text-white ring-4 ring-sky-300 dark:ring-sky-800 animate-pulse"
                          : isPassed
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isPassed ? "✓" : idx + 1}
                    </div>

                    <div className="flex-1 ios-glass-pill p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-black text-base text-slate-900 dark:text-white">{stop.stationName}</span>
                          <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">({stop.stationCode})</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                          {stop.distanceKm} km • Platform {stop.platform} • {stop.haltMinutes > 0 ? `${stop.haltMinutes}m Halt` : "Terminal"}
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="font-mono font-black text-sm text-slate-800 dark:text-slate-200">
                          Arr: {stop.actualArrival} • Dep: {stop.actualDeparture}
                        </div>
                        <div className={`text-xs font-black mt-0.5 ${isPassed ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>
                          {isCurrent ? "Departed Just Now" : isPassed ? "Station Departed" : "Scheduled"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LiveStatusPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Live Tracker...</div>}>
      <LiveStatusContent />
    </Suspense>
  );
}
