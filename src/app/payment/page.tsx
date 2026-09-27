"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  QrCode,
  CreditCard,
  Building,
  Wallet,
  Lock,
  Clock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function PaymentPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [bookingIntent, setBookingIntent] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "CARD" | "NETBANKING" | "WALLET">("UPI");
  const [processing, setProcessing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("1234");
  const [secondsRemaining, setSecondsRemaining] = useState(600);

  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8912");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("321");
  const [cardHolder, setCardHolder] = useState("RAHUL SHARMA");

  useEffect(() => {
    const raw = sessionStorage.getItem("rail_booking_intent");
    if (!raw) {
      router.push("/");
      return;
    }
    try {
      setBookingIntent(JSON.parse(raw));
    } catch (e) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleProcessPayment = async () => {
    if (!bookingIntent) return;
    setProcessing(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingIntent,
          paymentMethod:
            paymentMethod === "UPI"
              ? "UPI (BHIM / GPay)"
              : paymentMethod === "CARD"
              ? "Credit Card (Visa / Master)"
              : paymentMethod === "WALLET"
              ? "RailPay Fast Wallet"
              : "Net Banking (SBI)",
        }),
      });

      const data = await res.json();
      if (data.success) {
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        } catch (e) {}

        sessionStorage.removeItem("rail_booking_intent");
        localStorage.removeItem("rail_draft_passengers");
        router.push(`/ticket/${data.pnr}`);
      } else {
        alert(data.message || "Payment simulation failed.");
        setProcessing(false);
      }
    } catch (err) {
      alert("Network error processing payment.");
      setProcessing(false);
    }
  };

  if (!bookingIntent) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-slate-500 font-bold">
        Loading payment gateway...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      {/* 3-STEP PROGRESS STEPPER */}
      <div className="ios-glass-pill rounded-3xl p-4 sm:p-5">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              ✓
            </div>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 hidden sm:inline">Train Selected</span>
          </div>
          <div className="h-1 flex-1 bg-emerald-600 mx-4 rounded-full"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              ✓
            </div>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 hidden sm:inline">Passenger Details</span>
          </div>
          <div className="h-1 flex-1 bg-sky-600 mx-4 rounded-full"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-sky-600/30">
              3
            </div>
            <span className="text-sm font-black text-sky-600 dark:text-sky-400">Payment</span>
          </div>
        </div>
      </div>

      {/* TOP HOLD TIMER BAR (iOS Glass Capsule) */}
      <div className="ios-glass-card p-4 sm:p-5 flex items-center justify-between border-amber-300/40 dark:border-amber-500/30">
        <div className="flex items-center gap-3.5">
          <Clock className="w-6 h-6 text-amber-500 animate-pulse" />
          <div>
            <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {t("reservedHold")}
            </div>
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Complete checkout before timer expires to guarantee seat allocation
            </div>
          </div>
        </div>
        <div className="font-mono text-2xl font-black text-amber-600 dark:text-amber-400 ios-glass-pill px-4 py-1.5 rounded-2xl">
          {formatTimer(secondsRemaining)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* PAYMENT TABS & OPTIONS */}
        <div className="md:col-span-8 ios-glass-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-white/10 pb-4">
            <h2 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{t("selectPayment")}</span>
            </h2>
            <span className="text-xs font-bold text-slate-400">
              256-bit Encrypted
            </span>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "UPI", label: t("instantUpi"), icon: QrCode },
              { id: "CARD", label: t("cards"), icon: CreditCard },
              { id: "WALLET", label: t("railpay"), icon: Wallet },
              { id: "NETBANKING", label: t("netbanking"), icon: Building },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = paymentMethod === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPaymentMethod(tab.id as any)}
                  className={`p-3.5 rounded-2xl text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "ring-2 ring-sky-500 bg-sky-50/90 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 font-black shadow-md scale-102"
                      : "ios-glass-pill text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400"}`} />
                  <span className="text-xs sm:text-sm font-extrabold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* UPI TAB CONTENT */}
          {paymentMethod === "UPI" && (
            <div className="p-6 ios-glass-pill rounded-3xl text-center space-y-5">
              <div className="space-y-1">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t("scanPay")}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
                  Google Pay, PhonePe, Paytm, BHIM, Cred
                </p>
              </div>

              {/* Dynamic QR Box */}
              <div className="w-52 h-52 mx-auto bg-white p-4 rounded-3xl border-2 border-dashed border-sky-400 flex flex-col items-center justify-center shadow-xl relative group">
                <div className="grid grid-cols-6 gap-1 w-40 h-40 p-1.5 bg-slate-900 rounded-xl">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${i % 2 === 0 || i % 5 === 0 ? "bg-white" : "bg-transparent"}`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="text-sm font-mono font-black text-slate-800 dark:text-slate-100 ios-glass-pill py-1.5 px-4 rounded-xl inline-block">
                UPI ID: irctc.railways@icici
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={processing}
                  className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {processing ? "Confirming with CRIS PRS..." : t("simulateUpi")}
                </button>
              </div>
            </div>
          )}

          {/* CARD TAB */}
          {paymentMethod === "CARD" && (
            <div className="space-y-4 text-sm font-bold">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-mono font-black bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Valid Thru (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-mono font-black bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-mono font-black bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowOtpModal(true)}
                className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all cursor-pointer"
              >
                Pay via Card & 3D Secure
              </button>
            </div>
          )}

          {/* WALLET TAB */}
          {paymentMethod === "WALLET" && (
            <div className="p-6 ios-glass-pill rounded-3xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-black text-lg text-slate-900 dark:text-white">RailPay Super Wallet</span>
                </div>
                <span className="text-sm font-black text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-xl border border-emerald-300/40">
                  Balance: ₹12,450.00
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                Zero payment gateway redirects. Instant confirmation in 200ms with automated instant refund if cancelled.
              </p>
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={processing}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {processing ? "Confirming..." : "Pay Instantly via RailPay Wallet"}
              </button>
            </div>
          )}

          {/* NETBANKING */}
          {paymentMethod === "NETBANKING" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Punjab National Bank", "Bank of Baroda"].map((bank) => (
                <button
                  key={bank}
                  type="button"
                  onClick={handleProcessPayment}
                  className="p-4 ios-glass-pill hover:bg-sky-50 dark:hover:bg-slate-800 rounded-2xl text-center text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 transition-colors cursor-pointer"
                >
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="md:col-span-4 ios-glass-card p-6 space-y-4">
          <h3 className="font-black text-base text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
            Trip Breakdown
          </h3>

          <div className="text-sm space-y-1.5 font-semibold">
            <div className="font-black text-base text-slate-900 dark:text-white">{bookingIntent.trainName}</div>
            <div className="text-slate-500 dark:text-slate-400">#{bookingIntent.trainNumber} • Class: {bookingIntent.travelClass}</div>
            <div className="text-slate-700 dark:text-slate-300 pt-1">
              {bookingIntent.fromStationName} → {bookingIntent.toStationName}
            </div>
            <div className="text-slate-500">Date: {bookingIntent.journeyDate}</div>
            <div className="text-slate-500">Passengers: {bookingIntent.passengers.length}</div>
          </div>

          <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 space-y-2 text-sm font-semibold">
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Ticket Amount</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{bookingIntent.baseFare}</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Convenience + GST</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{Math.round(bookingIntent.convenienceFee + bookingIntent.gstAmount)}</span>
            </div>
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex justify-between items-baseline font-black">
              <span className="text-slate-900 dark:text-white text-base">Grand Total</span>
              <span className="text-2xl text-emerald-600 dark:text-emerald-400">₹{bookingIntent.totalAmount}</span>
            </div>
          </div>

          <div className="p-3.5 ios-glass-pill rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Official Indian Railways e-Ticket generated immediately upon payment.</span>
          </div>
        </div>
      </div>

      {/* 3D SECURE OTP MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="ios-glass-card max-w-sm w-full p-7 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-black text-base">
              <Smartphone className="w-5 h-5" />
              <span>3D-Secure Verification</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Enter the OTP sent to your registered mobile number for transaction of <strong>₹{bookingIntent.totalAmount}</strong>.
            </p>
            <div>
              <label className="block text-xs font-black uppercase text-slate-500 mb-1">
                Enter 4-Digit OTP
              </label>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest text-2xl font-mono font-black py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
              />
              <span className="text-xs text-slate-400 block text-center mt-1 font-bold">
                (Demo prefilled: 1234)
              </span>
            </div>

            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="flex-1 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOtpModal(false);
                  handleProcessPayment();
                }}
                className="flex-1 py-3 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg cursor-pointer"
              >
                Verify & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
