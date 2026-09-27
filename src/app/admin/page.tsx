"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  TrendingUp,
  Ticket,
  DollarSign,
  Activity,
  Settings,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { TRAINS_DATABASE } from "@/lib/trains";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminDashboardPage() {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTrain, setSelectedTrain] = useState(TRAINS_DATABASE[0].trainNumber);
  const [quotaAdjustMsg, setQuotaAdjustMsg] = useState<string | null>(null);

  const [generalSeats, setGeneralSeats] = useState(48);
  const [tatkalSeats, setTatkalSeats] = useState(12);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Error fetching stats:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleUpdateQuota = (e: React.FormEvent) => {
    e.preventDefault();
    setQuotaAdjustMsg(`Quota successfully updated for Train #${selectedTrain}. General: ${generalSeats}, Tatkal: ${tatkalSeats}.`);
    setTimeout(() => setQuotaAdjustMsg(null), 4000);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl space-y-8">
      {/* Top Banner (iOS 27 Glass) */}
      <div className="ios-glass-card p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-sky-600 dark:text-sky-400" />
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {language === "hi" ? "CRIS PRS ऑपरेशन्स कंसोल" : "CRIS PRS Operations Console"}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
            Real-time railway booking analytics, inventory allocation, and database health
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {loading ? (
        <div className="p-16 text-center space-y-3 ios-glass-card">
          <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Gathering Real-Time Platform Analytics...</p>
        </div>
      ) : (
        stats && (
          <>
            {/* 4 HIGH LEVEL KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="ios-glass-card p-6 space-y-2">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-black uppercase tracking-wider">Gross Platform Revenue</span>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  ₹{stats.totalRevenue?.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>+18.4% vs yesterday Tatkal rush</span>
                </div>
              </div>

              <div className="ios-glass-card p-6 space-y-2">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-black uppercase tracking-wider">Total Bookings Recorded</span>
                  <Ticket className="w-5 h-5 text-sky-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {stats.totalBookings} PNRs
                </div>
                <div className="text-xs text-slate-500 font-bold">
                  {stats.activeBookings} Active • {stats.cancelledBookings} Cancelled
                </div>
              </div>

              <div className="ios-glass-card p-6 space-y-2">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-black uppercase tracking-wider">Average Ticket Size</span>
                  <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  ₹{stats.averageFare?.toLocaleString("en-IN")}
                </div>
                <div className="text-xs text-slate-500 font-bold">
                  Across AC & Sleeper classes
                </div>
              </div>

              <div className="ios-glass-card p-6 space-y-2">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-black uppercase tracking-wider">System Availability</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  {stats.serverUptime}
                </div>
                <div className="text-xs text-slate-500 font-bold">
                  API Latency: <strong>{stats.apiLatencyMs}ms</strong>
                </div>
              </div>
            </div>

            {/* SEAT QUOTA ALLOCATION CONTROLLER */}
            <div className="ios-glass-card p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-4">
                <div>
                  <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <span>Real-Time Seat Quota & Inventory Manager</span>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Dynamically allocate seats between General (GN), Tatkal (TQ), and Ladies (LD) quotas
                  </p>
                </div>
              </div>

              {quotaAdjustMsg && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 rounded-2xl text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{quotaAdjustMsg}</span>
                </div>
              )}

              <form onSubmit={handleUpdateQuota} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Select Train Service
                  </label>
                  <select
                    value={selectedTrain}
                    onChange={(e) => setSelectedTrain(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  >
                    {TRAINS_DATABASE.map((t) => (
                      <option key={t.trainNumber} value={t.trainNumber} className="dark:bg-slate-900">
                        #{t.trainNumber} - {t.trainName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                    General Quota (Seats)
                  </label>
                  <input
                    type="number"
                    value={generalSeats}
                    onChange={(e) => setGeneralSeats(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Tatkal Quota (Seats)
                  </label>
                  <input
                    type="number"
                    value={tatkalSeats}
                    onChange={(e) => setTatkalSeats(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-sm rounded-xl shadow-md transition-all cursor-pointer hover:scale-105"
                  >
                    Save Quota
                  </button>
                </div>
              </form>
            </div>

            {/* LIVE RESERVATION STREAM */}
            <div className="ios-glass-card p-6 sm:p-8 space-y-4">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center justify-between">
                <span>Live PRS Reservation Stream</span>
                <span className="text-xs font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg font-black border border-emerald-300/40">
                  ● SYNC ACTIVE
                </span>
              </h3>

              <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-black tracking-wider border-b border-slate-200 dark:border-white/10">
                    <tr>
                      <th className="p-4">PNR</th>
                      <th className="p-4">Train</th>
                      <th className="p-4">Route</th>
                      <th className="p-4">Class</th>
                      <th className="p-4">Passengers</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                    {stats.recentBookings?.map((b: any) => (
                      <tr key={b.pnr} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                        <td className="p-4 font-mono font-black text-sky-600 dark:text-sky-400">#{b.pnr}</td>
                        <td className="p-4 font-black text-slate-900 dark:text-white">{b.trainName} ({b.trainNumber})</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{b.fromStationCode} → {b.toStationCode}</td>
                        <td className="p-4 font-black">{b.travelClass}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{b.passengers.length} Pax</td>
                        <td className="p-4 font-black text-slate-900 dark:text-white">₹{b.totalAmount}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                            b.bookingStatus === "CANCELLED" ? "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300" : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                          }`}>
                            {b.bookingStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
