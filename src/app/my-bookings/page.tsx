"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  Train,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  FileText,
} from "lucide-react";
import { Booking } from "@/lib/store";
import { calculateCancellationRefund, CancellationRefundCalculation } from "@/lib/pricing";
import { useLanguage } from "@/context/LanguageContext";

export default function MyBookingsPage() {
  const { language, t } = useLanguage();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);
  const [refundPreview, setRefundPreview] = useState<CancellationRefundCalculation | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (e) {
      console.error("Error fetching bookings:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openCancelModal = (b: Booking) => {
    setSelectedBookingForCancel(b);
    setCancelSuccessMsg(null);
    const refund = calculateCancellationRefund(
      b.totalAmount,
      b.travelClass,
      72,
      b.passengers.length
    );
    setRefundPreview(refund);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingForCancel) return;
    setCancelling(true);

    try {
      const res = await fetch("/api/booking/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pnr: selectedBookingForCancel.pnr,
          reason: "Passenger initiated cancellation",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCancelSuccessMsg(`Ticket cancelled successfully. ₹${data.refundDetails.refundAmount} has been refunded to your original payment method.`);
        fetchBookings();
      } else {
        alert(data.message || "Failed to cancel ticket");
      }
    } catch (e) {
      alert("Error cancelling ticket");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {language === "hi" ? "मेरी ट्रेन बुकिंग्स एवं ई-टिकट" : "My Train Bookings & E-Tickets"}
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 font-medium">
            {language === "hi"
              ? "अपनी सभी यात्राएं प्रबंधित करें, आरक्षण पर्ची डाउनलोड करें या तत्काल रिफंड प्राप्त करें"
              : "Manage your journeys, download electronic reservation slips, or initiate instant refunds"}
          </p>
        </div>
        <Link
          href="/"
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-sm rounded-2xl shadow-md transition-all cursor-pointer hover:scale-105"
        >
          {t("bookTrains")}
        </Link>
      </div>

      {loading ? (
        <div className="p-16 text-center space-y-3 ios-glass-card">
          <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Retrieving Your Bookings from PRS...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="p-16 text-center space-y-4 ios-glass-card">
          <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Train className="w-8 h-8" />
          </div>
          <h3 className="font-black text-slate-800 dark:text-slate-100 text-xl">No Bookings Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            You have not booked any train tickets yet. Start exploring iconic routes like Vande Bharat or Rajdhani!
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-sky-600 text-white font-black text-sm rounded-2xl"
          >
            Search & Book Trains
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => {
            const isCancelled = booking.bookingStatus === "CANCELLED";

            return (
              <div
                key={booking.pnr}
                className={`ios-glass-card p-6 sm:p-7 transition-all ${
                  isCancelled ? "opacity-75" : "hover:shadow-xl"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/60 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                      isCancelled ? "bg-slate-100 dark:bg-slate-800 text-slate-500" : "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300"
                    }`}>
                      <Train className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">{booking.trainName}</span>
                        <span className="font-mono text-xs font-black text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950 px-2.5 py-0.5 rounded-lg border border-sky-300/40">
                          #{booking.trainNumber}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                        PNR: <strong className="font-mono text-slate-900 dark:text-white">#{booking.pnr}</strong> • Class: <strong className="text-slate-900 dark:text-white">{booking.travelClass}</strong> • Quota: <strong className="text-slate-900 dark:text-white">{booking.quota}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-black ${
                      isCancelled ? "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300/40" : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40"
                    }`}>
                      {isCancelled ? "CANCELLED" : "CONFIRMED"}
                    </span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      ₹{booking.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Journey & Passengers */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-center">
                  <div className="md:col-span-5 space-y-1">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      {booking.fromStationName} ({booking.fromStationCode}) → {booking.toStationName} ({booking.toStationCode})
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
                      Date: <strong className="text-slate-800 dark:text-slate-200">{booking.journeyDate}</strong> ({booking.departureTime} - {booking.arrivalTime})
                    </div>
                  </div>

                  <div className="md:col-span-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                    <span className="font-bold text-slate-900 dark:text-white">Passengers: </span>
                    {booking.passengers.map((p, idx) => (
                      <span key={idx} className="inline-block ios-glass-pill px-2.5 py-1 rounded-lg mr-1.5 mb-1 font-bold text-xs">
                        {p.name} ({p.allocatedCoach}-{p.allocatedBerth})
                      </span>
                    ))}
                  </div>

                  <div className="md:col-span-3 flex items-center justify-end gap-2.5">
                    <Link
                      href={`/ticket/${booking.pnr}`}
                      className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>E-Ticket</span>
                    </Link>

                    {!isCancelled && (
                      <button
                        onClick={() => openCancelModal(booking)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 rounded-xl text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>

                {isCancelled && booking.cancellationDetails && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs font-bold text-rose-700 dark:text-rose-300 flex justify-between items-center">
                    <div>
                      <strong>Refund Processed: </strong>
                      ₹{booking.cancellationDetails.refundAmount} credited. (Deduction: ₹{booking.cancellationDetails.cancellationCharges})
                    </div>
                    <span className="font-mono text-xs">
                      {new Date(booking.cancellationDetails.cancelledAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CANCELLATION MODAL */}
      {selectedBookingForCancel && refundPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="ios-glass-card max-w-md w-full p-7 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-lg">
                <RotateCcw className="w-6 h-6" />
                <span>Cancel Ticket & Refund</span>
              </div>
              <button
                onClick={() => setSelectedBookingForCancel(null)}
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {cancelSuccessMsg ? (
              <div className="p-5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 rounded-2xl text-sm space-y-3">
                <div className="flex items-center gap-2 font-black text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Cancellation Successful!</span>
                </div>
                <p>{cancelSuccessMsg}</p>
                <button
                  onClick={() => setSelectedBookingForCancel(null)}
                  className="w-full py-2.5 bg-emerald-600 text-white font-black rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="text-xs space-y-1 ios-glass-pill p-4 rounded-2xl">
                  <div className="font-black text-sm text-slate-900 dark:text-white">{selectedBookingForCancel.trainName} (#{selectedBookingForCancel.trainNumber})</div>
                  <div className="text-slate-500">PNR #{selectedBookingForCancel.pnr} • Class {selectedBookingForCancel.travelClass}</div>
                  <div className="text-slate-500">Passengers: {selectedBookingForCancel.passengers.length}</div>
                </div>

                <div className="space-y-2.5 text-sm ios-glass-pill p-4 rounded-2xl font-bold">
                  <div className="flex justify-between text-slate-600 dark:text-slate-300">
                    <span>Total Fare Paid</span>
                    <span className="font-black text-slate-900 dark:text-white">₹{refundPreview.totalPaid}</span>
                  </div>

                  <div className="flex justify-between text-rose-600 dark:text-rose-400">
                    <span>Cancellation Fee</span>
                    <span>- ₹{refundPreview.cancellationFee}</span>
                  </div>

                  <div className="flex justify-between text-rose-600 dark:text-rose-400">
                    <span>Clerkage & Insurance</span>
                    <span>- ₹{(refundPreview.clerkageFee + refundPreview.nonRefundableInsurance).toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex justify-between items-baseline font-black text-base">
                    <span className="text-slate-900 dark:text-white">Net Refund Credited:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 text-2xl font-black">₹{refundPreview.refundAmount}</span>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedBookingForCancel(null)}
                    className="flex-1 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                  >
                    Keep Booking
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirmCancel}
                    disabled={cancelling}
                    className="flex-1 py-3 text-xs font-black text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {cancelling ? "Processing..." : "Confirm Cancellation"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
