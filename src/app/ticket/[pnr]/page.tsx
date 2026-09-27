"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Printer,
  Train,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Booking } from "@/lib/store";
import { useLanguage } from "@/context/LanguageContext";

export default function TicketConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const pnr = (params?.pnr as string) || "";
  const { language, t } = useLanguage();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const res = await fetch(`/api/pnr/${pnr}`);
        const data = await res.json();
        if (data.success) {
          setBooking(data.booking);
        }
      } catch (e) {
        console.error("Error fetching ticket:", e);
      } finally {
        setLoading(false);
      }
    }

    if (pnr) {
      fetchTicket();
    }
  }, [pnr]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-3">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-black text-base text-slate-700 dark:text-slate-300">
          Generating Official Indian Railways E-Ticket...
        </p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Booking Record Not Found</h2>
        <p className="text-sm text-slate-500">We could not retrieve any ticket for PNR #{pnr}</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-sky-600 text-white rounded-2xl text-sm font-black"
        >
          Return to Booking Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      {/* SUCCESS BANNER (Screen only) */}
      <div className="no-print ios-glass-card p-6 flex flex-wrap items-center justify-between gap-4 border-emerald-300/40 dark:border-emerald-500/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-lg shadow-emerald-600/30">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {t("bookingConfirmed")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold mt-0.5">
              PNR <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-black">#{booking.pnr}</strong> has been allocated and synced with CRIS PRS.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs sm:text-sm font-black rounded-2xl shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t("printTicket")}</span>
          </button>
          <Link
            href={`/pnr-status?pnr=${booking.pnr}`}
            className="flex items-center gap-1.5 px-5 py-2.5 ios-glass-pill text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-extrabold rounded-2xl shadow-sm transition-all"
          >
            <span>Live Status</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* AUTHENTIC PRINTABLE E-TICKET (ERS) */}
      <div className="ticket-container bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-300 dark:border-white/10 shadow-2xl overflow-hidden print:border-black print:rounded-none print:bg-white print:text-black">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8 print:bg-white print:text-black print:border-b-2 print:border-black">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 print:border print:border-black flex items-center justify-center text-white print:text-black">
                <Train className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight">{t("ersTitle")}</span>
                  <span className="text-xs bg-sky-400/30 text-sky-200 print:text-black px-2 py-0.5 rounded-md font-black">
                    OFFICIAL
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 print:text-black mt-0.5">
                  Centre for Railway Information Systems (CRIS) • RailModern NGeT
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs uppercase font-black tracking-wider text-slate-300 print:text-black">
                {t("pnrLabel")}
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-black text-amber-300 print:text-black tracking-wider">
                {booking.pnr}
              </div>
            </div>
          </div>
        </div>

        {/* Journey Meta */}
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/60 print:bg-white space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-sm">
            <div>
              <span className="text-xs uppercase font-black text-slate-400">Train Number & Name</span>
              <div className="font-black text-slate-900 dark:text-white text-base mt-0.5">{booking.trainName}</div>
              <div className="font-mono font-bold text-sky-600 dark:text-sky-400">#{booking.trainNumber} ({booking.trainType})</div>
            </div>

            <div>
              <span className="text-xs uppercase font-black text-slate-400">Date of Journey</span>
              <div className="font-black text-slate-900 dark:text-white text-base mt-0.5">{booking.journeyDate}</div>
              <div className="text-slate-500">Duration: {booking.duration}</div>
            </div>

            <div>
              <span className="text-xs uppercase font-black text-slate-400">Class & Quota</span>
              <div className="font-black text-slate-900 dark:text-white text-base mt-0.5">Class: {booking.travelClass}</div>
              <div className="text-slate-500">Quota: {booking.quota === "TQ" ? "Tatkal" : "General"}</div>
            </div>

            <div>
              <span className="text-xs uppercase font-black text-slate-400">Booking Status / Charting</span>
              <div className="font-black text-emerald-600 dark:text-emerald-400 text-base mt-0.5">
                {booking.bookingStatus === "BOOKED" ? "CONFIRMED (CNF)" : "CANCELLED"}
              </div>
              <div className="text-slate-500">
                Chart: {booking.chartPrepared ? "Prepared" : "Not Prepared"}
              </div>
            </div>
          </div>

          {/* Route Visual */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10 items-center">
            <div>
              <div className="text-xs uppercase font-black text-slate-400">Origin Departure</div>
              <div className="font-mono text-2xl font-black text-slate-900 dark:text-white">{booking.departureTime}</div>
              <div className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{booking.fromStationName} ({booking.fromStationCode})</div>
            </div>

            <div className="text-center text-xs text-slate-400">
              <div className="flex items-center justify-center gap-2">
                <div className="h-1 flex-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                <Train className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <div className="h-1 flex-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
              </div>
              <span className="font-bold">{booking.duration} Non-stop</span>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs uppercase font-black text-slate-400">Destination Arrival</div>
              <div className="font-mono text-2xl font-black text-slate-900 dark:text-white">{booking.arrivalTime}</div>
              <div className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">{booking.toStationName} ({booking.toStationCode})</div>
            </div>
          </div>
        </div>

        {/* PASSENGER ALLOCATION TABLE (Enlarged Typography) */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white uppercase tracking-wider">
              {t("seatAllotment")}
            </h3>
            <span className="text-sm text-slate-500 dark:text-slate-400 font-bold">{booking.passengers.length} Passenger(s)</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase font-black tracking-wider border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Passenger Name</th>
                  <th className="p-4">Age / Gender</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Coach</th>
                  <th className="p-4">Berth / Seat</th>
                  <th className="p-4">Berth Type</th>
                  <th className="p-4">Meal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold">
                {booking.passengers.map((p, idx) => (
                  <tr key={p.id || idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="p-4 text-slate-400 font-black">{idx + 1}</td>
                    <td className="p-4 font-black text-slate-900 dark:text-white text-base">{p.name}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{p.age} Yrs / {p.gender.charAt(0)}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        CNF
                      </span>
                    </td>
                    <td className="p-4 font-mono font-black text-sky-700 dark:text-sky-300 text-lg">
                      {p.allocatedCoach}
                    </td>
                    <td className="p-4 font-mono font-black text-slate-900 dark:text-white text-lg">
                      {p.allocatedBerth}
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-200">{p.allocatedBerthType}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 capitalize">{p.foodChoice.toLowerCase()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAYMENT DETAILS + QR CODE */}
        <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2 text-sm font-semibold">
            <h4 className="font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 text-xs">
              Payment & Tax Invoice
            </h4>
            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
              <div>Base Ticket Fare: <strong>₹{booking.baseFare}</strong></div>
              <div>IRCTC Convenience Fee: <strong>₹{booking.convenienceFee}</strong></div>
              <div>GST (5%): <strong>₹{booking.gstAmount}</strong></div>
              <div>Payment Mode: <strong>{booking.paymentMethod}</strong></div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-base font-black text-slate-900 dark:text-white flex justify-between max-w-sm">
              <span>Total Fare Collected:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black text-xl">₹{booking.totalAmount}</span>
            </div>
          </div>

          {/* QR */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-white/10 text-center">
            <div className="w-28 h-28 bg-slate-900 p-2 rounded-xl grid grid-cols-5 gap-0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${i % 2 === 0 || i % 3 === 0 ? "bg-white" : "bg-transparent"}`}
                ></div>
              ))}
            </div>
            <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 mt-2">
              Scan at TTE Terminal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
