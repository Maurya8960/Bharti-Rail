"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Ticket,
  Clock,
  Train,
  AlertCircle,
} from "lucide-react";
import { Booking } from "@/lib/store";
import { useLanguage } from "@/context/LanguageContext";

function PnrStatusContent() {
  const searchParams = useSearchParams();
  const initialPnr = searchParams.get("pnr") || "";
  const { language, t } = useLanguage();

  const [pnrInput, setPnrInput] = useState(initialPnr);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPnr = async (searchPnr: string) => {
    if (!searchPnr || searchPnr.length < 10) {
      setError("Please enter a valid 10-digit Indian Railways PNR number.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/pnr/${searchPnr}`);
      const data = await res.json();
      if (data.success) {
        setBooking(data.booking);
      } else {
        setError(data.message || `No active record found for PNR ${searchPnr}`);
        setBooking(null);
      }
    } catch (e) {
      setError("Failed to connect to Indian Railways PRS database. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialPnr) {
      fetchPnr(initialPnr);
    }
  }, [initialPnr]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPnr(pnrInput.trim());
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
      {/* HEADER & SEARCH FORM (iOS 27 Glass Card) */}
      <div className="ios-glass-card p-6 sm:p-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-2 shadow-md">
            <Ticket className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === "hi" ? "भारतीय रेल लाइव पीएनआर स्थिति" : "Indian Railways Live PNR Status"}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
            {language === "hi"
              ? "वास्तविक समय आरक्षण स्थिति, कोच आवंटन एवं चार्ट बनने की स्थिति देखें"
              : "Real-time PRS tracking: Current confirmation status, coach layout position, and chart preparation"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              maxLength={10}
              placeholder={language === "hi" ? "10 अंकों का पीएनआर दर्ज करें (उदा. 2849103852)..." : "Enter 10-Digit PNR (e.g. 2849103852)..."}
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value.replace(/\D/g, ""))}
              className="w-full px-5 py-4 text-base sm:text-lg font-mono font-black tracking-wider bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-sky-600/30 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50 cursor-pointer hover:scale-105"
          >
            <Search className="w-5 h-5" />
            <span>{loading ? "Checking..." : t("trackStatus")}</span>
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 pt-2 font-medium">
          <span>Try Demo PNRs:</span>
          <button
            type="button"
            onClick={() => {
              setPnrInput("2849103852");
              fetchPnr("2849103852");
            }}
            className="font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline ios-glass-pill px-3 py-1 rounded-xl cursor-pointer"
          >
            2849103852 (Vande Bharat)
          </button>
          <button
            type="button"
            onClick={() => {
              setPnrInput("4920194821");
              fetchPnr("4920194821");
            }}
            className="font-mono font-bold text-sky-600 dark:text-sky-400 hover:underline ios-glass-pill px-3 py-1 rounded-xl cursor-pointer"
          >
            4920194821 (Rajdhani)
          </button>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-2xl text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* RESULT CARD */}
      {booking && (
        <div className="ios-glass-card space-y-6 p-6 sm:p-8 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{booking.trainName}</span>
                <span className="font-mono text-sm font-black text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-lg border border-sky-300/30">
                  #{booking.trainNumber}
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Journey Date: <strong className="text-slate-800 dark:text-slate-200">{booking.journeyDate}</strong> • Class: <strong className="text-slate-800 dark:text-slate-200">{booking.travelClass}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black ${
                booking.chartPrepared ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40" : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300/40"
              }`}>
                {booking.chartPrepared ? "Chart Prepared" : "Chart Not Prepared"}
              </span>
              <Link
                href={`/ticket/${booking.pnr}`}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl text-xs sm:text-sm font-black hover:opacity-90 transition-opacity"
              >
                View E-Ticket
              </Link>
            </div>
          </div>

          {/* Route Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center ios-glass-pill p-5 rounded-2xl">
            <div>
              <div className="text-xs uppercase font-black text-slate-400">Boarding Station</div>
              <div className="font-mono text-lg font-black text-slate-900 dark:text-white">{booking.departureTime}</div>
              <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{booking.fromStationName} ({booking.fromStationCode})</div>
            </div>

            <div className="text-center text-xs text-slate-400 font-bold">
              <span className="font-black text-sky-600 dark:text-sky-400">{booking.duration}</span>
              <div className="w-16 h-1 bg-slate-300 dark:bg-slate-700 mx-auto my-1 rounded-full"></div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs uppercase font-black text-slate-400">Destination Station</div>
              <div className="font-mono text-lg font-black text-slate-900 dark:text-white">{booking.arrivalTime}</div>
              <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{booking.toStationName} ({booking.toStationCode})</div>
            </div>
          </div>

          {/* PASSENGER ALLOCATION TABLE */}
          <div className="space-y-3">
            <h3 className="font-black text-base text-slate-900 dark:text-white uppercase tracking-wider">
              {t("seatAllotment")}
            </h3>

            <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-black tracking-wider border-b border-slate-200 dark:border-white/10">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Passenger</th>
                    <th className="p-4">Booking Status</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4">Coach</th>
                    <th className="p-4">Berth / Seat</th>
                    <th className="p-4">Berth Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                  {booking.passengers.map((p, idx) => (
                    <tr key={p.id || idx}>
                      <td className="p-4 text-slate-400 font-black">{idx + 1}</td>
                      <td className="p-4 font-black text-slate-900 dark:text-white text-base">{p.name}</td>
                      <td className="p-4 text-emerald-600 dark:text-emerald-400 font-black">CNF</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                          CONFIRMED
                        </span>
                      </td>
                      <td className="p-4 font-mono font-black text-sky-700 dark:text-sky-300 text-lg">{p.allocatedCoach}</td>
                      <td className="p-4 font-mono font-black text-slate-900 dark:text-white text-lg">{p.allocatedBerth}</td>
                      <td className="p-4 text-slate-700 dark:text-slate-300 font-extrabold">{p.allocatedBerthType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RAKE LAYOUT */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
              <span className="text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Coach Position in Train Rake
              </span>
              <span className="text-slate-400">
                Engine at Left Side →
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto p-4 ios-glass-pill rounded-2xl">
              <div className="px-3.5 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl shrink-0">
                LOCO ENGINE
              </div>
              <div className="px-3 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shrink-0">
                GEN
              </div>
              <div className="px-3 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shrink-0">
                C1
              </div>
              <div className="px-3 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shrink-0">
                C2
              </div>
              <div className="px-3 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shrink-0">
                C3
              </div>
              <div className="px-4 py-2.5 bg-emerald-600 text-white font-black text-sm rounded-xl shrink-0 ring-4 ring-emerald-400/40 animate-pulse">
                {booking.passengers[0]?.allocatedCoach || "C4"} (Your Coach)
              </div>
              <div className="px-3 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shrink-0">
                C5
              </div>
              <div className="px-3 py-2.5 bg-slate-900 text-white font-black text-xs rounded-xl shrink-0">
                GUARD
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PnrStatusPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading PNR Tracker...</div>}>
      <PnrStatusContent />
    </Suspense>
  );
}
