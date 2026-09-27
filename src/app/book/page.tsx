"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Train,
  User,
  Users,
  Plus,
  Trash2,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  BookmarkCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PassengerInput {
  name: string;
  age: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  berthPreference: "LOWER" | "MIDDLE" | "UPPER" | "SIDE_LOWER" | "SIDE_UPPER" | "WINDOW" | "NO_PREFERENCE";
  foodChoice: "VEG" | "NON_VEG" | "JAIN" | "NO_FOOD";
}

const DEFAULT_PASSENGER: PassengerInput = {
  name: "",
  age: "",
  gender: "MALE",
  berthPreference: "NO_PREFERENCE",
  foodChoice: "VEG",
};

const MASTER_LIST = [
  { name: "Rahul Sharma", age: "32", gender: "MALE" as const, berthPreference: "LOWER" as const, foodChoice: "NON_VEG" as const },
  { name: "Pooja Sharma", age: "29", gender: "FEMALE" as const, berthPreference: "WINDOW" as const, foodChoice: "VEG" as const },
  { name: "Sunita Sharma", age: "61", gender: "FEMALE" as const, berthPreference: "LOWER" as const, foodChoice: "VEG" as const },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();

  const trainNumber = searchParams.get("trainNumber") || "22436";
  const trainName = searchParams.get("trainName") || "Vande Bharat Express";
  const trainType = searchParams.get("trainType") || "VANDE BHARAT";
  const fromCode = searchParams.get("from") || "NDLS";
  const fromName = searchParams.get("fromName") || "New Delhi";
  const toCode = searchParams.get("to") || "BSB";
  const toName = searchParams.get("toName") || "Varanasi Junction";
  const deptTime = searchParams.get("deptTime") || "06:00";
  const arrTime = searchParams.get("arrTime") || "14:00";
  const duration = searchParams.get("duration") || "8h 00m";
  const journeyDate = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const travelClass = searchParams.get("class") || "CC";
  const quota = searchParams.get("quota") || "GN";
  const baseFarePerPax = parseFloat(searchParams.get("fare") || "1750");

  const [passengers, setPassengers] = useState<PassengerInput[]>([
    { name: "Rahul Sharma", age: "32", gender: "MALE", berthPreference: "WINDOW", foodChoice: "VEG" },
  ]);

  const [email, setEmail] = useState("passenger@railmodern.in");
  const [phone, setPhone] = useState("9876543210");
  const [autoUpgrade, setAutoUpgrade] = useState(true);
  const [travelInsurance, setTravelInsurance] = useState(true);

  // Restore draft
  useEffect(() => {
    const saved = localStorage.getItem("rail_draft_passengers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPassengers(parsed);
        }
      } catch (e) {}
    }
  }, []);

  const handlePassengerChange = (index: number, field: keyof PassengerInput, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
    localStorage.setItem("rail_draft_passengers", JSON.stringify(updated));
  };

  const addPassenger = () => {
    if (passengers.length >= 6) {
      alert("Maximum 6 passengers allowed per booking.");
      return;
    }
    const updated = [...passengers, { ...DEFAULT_PASSENGER }];
    setPassengers(updated);
    localStorage.setItem("rail_draft_passengers", JSON.stringify(updated));
  };

  const removePassenger = (index: number) => {
    if (passengers.length <= 1) return;
    const updated = passengers.filter((_, i) => i !== index);
    setPassengers(updated);
    localStorage.setItem("rail_draft_passengers", JSON.stringify(updated));
  };

  const addFromMasterList = (pax: typeof MASTER_LIST[0]) => {
    if (passengers.some((p) => p.name === pax.name)) {
      alert(`${pax.name} is already added.`);
      return;
    }
    if (passengers.length >= 6) {
      alert("Maximum 6 passengers allowed.");
      return;
    }
    if (passengers.length === 1 && !passengers[0].name.trim()) {
      setPassengers([pax]);
      localStorage.setItem("rail_draft_passengers", JSON.stringify([pax]));
      return;
    }
    const updated = [...passengers, pax];
    setPassengers(updated);
    localStorage.setItem("rail_draft_passengers", JSON.stringify(updated));
  };

  // Calculations
  const totalBaseFare = baseFarePerPax * passengers.length;
  const convenienceFee = 35.40;
  const insuranceFee = travelInsurance ? 0.45 * passengers.length : 0;
  const tatkalFee = quota === "TQ" ? Math.round(baseFarePerPax * 0.3) * passengers.length : 0;
  const gst = Math.round(totalBaseFare * 0.05);
  const grandTotal = Math.round(totalBaseFare + convenienceFee + insuranceFee + tatkalFee + gst);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name.trim()) {
        alert(`Please enter Passenger ${i + 1} Name.`);
        return;
      }
      const ageNum = parseInt(passengers[i].age, 10);
      if (isNaN(ageNum) || ageNum <= 0 || ageNum > 125) {
        alert(`Please enter a valid age for Passenger ${i + 1}.`);
        return;
      }
    }

    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const bookingIntent = {
      trainNumber,
      trainName,
      trainType,
      fromStationCode: fromCode,
      fromStationName: fromName,
      toStationCode: toCode,
      toStationName: toName,
      journeyDate,
      departureTime: deptTime,
      arrivalTime: arrTime,
      duration,
      travelClass,
      quota,
      passengers,
      contactEmail: email,
      contactPhone: phone,
      baseFare: totalBaseFare,
      convenienceFee,
      insuranceFee,
      tatkalCharge: tatkalFee,
      gstAmount: gst,
      totalAmount: grandTotal,
      autoUpgrade,
    };

    sessionStorage.setItem("rail_booking_intent", JSON.stringify(bookingIntent));
    router.push("/payment");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      {/* 3-STEP PROGRESS STEPPER */}
      <div className="ios-glass-pill rounded-3xl p-4 sm:p-5">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
              ✓
            </div>
            <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 hidden sm:inline">Train Selected</span>
          </div>
          <div className="h-1 flex-1 bg-sky-600 mx-4 rounded-full"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-sky-600/30">
              2
            </div>
            <span className="text-sm font-black text-sky-600 dark:text-sky-400">{t("passengerDetails")}</span>
          </div>
          <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 mx-4 rounded-full"></div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-400 flex items-center justify-center font-black text-sm">
              3
            </div>
            <span className="text-sm font-bold text-slate-400 hidden sm:inline">Payment & E-Ticket</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: PASSENGER ENTRY & FORM */}
        <div className="lg:col-span-8 space-y-6">
          {/* Train Journey Summary Banner */}
          <div className="ios-glass-card p-6 sm:p-7 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  {language === "hi" ? "यात्रा सारांश" : "Journey Summary"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                  {trainName} (#{trainNumber})
                </h2>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-1 font-semibold">
                  Class: <strong className="text-slate-900 dark:text-white">{travelClass}</strong> • Quota: <strong className="text-slate-900 dark:text-white">{quota}</strong>
                </div>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-sm font-mono font-black border border-sky-300/40">
                {journeyDate}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 dark:border-white/10 items-center">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-black text-sky-600 dark:text-sky-400">{deptTime}</div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{fromName}</div>
                <div className="text-xs font-mono font-bold text-slate-400">{fromCode}</div>
              </div>
              <div className="text-center text-xs text-slate-500 dark:text-slate-400 font-bold">
                <span>{duration}</span>
                <div className="w-16 h-1 bg-sky-500 mx-auto my-1 rounded-full"></div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">{arrTime}</div>
                <div className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">{toName}</div>
                <div className="text-xs font-mono font-bold text-slate-400">{toCode}</div>
              </div>
            </div>
          </div>

          {/* MASTER PASSENGER LIST AUTOFILL */}
          <div className="ios-glass-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white">
                <BookmarkCheck className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span>{t("masterList")}</span>
              </div>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-black">1-Click Fast Autofill</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {MASTER_LIST.map((pax) => (
                <button
                  key={pax.name}
                  type="button"
                  onClick={() => addFromMasterList(pax)}
                  className="px-3.5 py-2 ios-glass-pill hover:scale-105 rounded-xl text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>{pax.name} ({pax.age}, {pax.gender.charAt(0)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* PASSENGER FORMS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                <span>{t("passengerDetails")} ({passengers.length}/6)</span>
              </h3>
              <button
                type="button"
                onClick={addPassenger}
                disabled={passengers.length >= 6}
                className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>{t("addPassenger")}</span>
              </button>
            </div>

            {passengers.map((p, index) => (
              <div
                key={index}
                className="ios-glass-card p-5 sm:p-6 space-y-4 relative"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-black flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider">
                      Passenger {index + 1}
                    </span>
                  </div>

                  {passengers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePassenger(index)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                      title="Remove Passenger"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                      {t("fullName")} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={p.name}
                      onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                      className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Age */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                      {t("age")} *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      required
                      placeholder="Age"
                      value={p.age}
                      onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                      className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Gender */}
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                      {t("gender")} *
                    </label>
                    <select
                      value={p.gender}
                      onChange={(e) => handlePassengerChange(index, "gender", e.target.value as any)}
                      className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="MALE" className="dark:bg-slate-900">Male</option>
                      <option value="FEMALE" className="dark:bg-slate-900">Female</option>
                      <option value="OTHER" className="dark:bg-slate-900">Transgender</option>
                    </select>
                  </div>

                  {/* Berth Preference */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                      {t("berthPref")}
                    </label>
                    <select
                      value={p.berthPreference}
                      onChange={(e) => handlePassengerChange(index, "berthPreference", e.target.value as any)}
                      className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="NO_PREFERENCE" className="dark:bg-slate-900">No Preference</option>
                      {travelClass === "CC" || travelClass === "EC" ? (
                        <>
                          <option value="WINDOW" className="dark:bg-slate-900">Window Seat</option>
                          <option value="MIDDLE" className="dark:bg-slate-900">Aisle Seat</option>
                        </>
                      ) : (
                        <>
                          <option value="LOWER" className="dark:bg-slate-900">Lower Berth</option>
                          <option value="MIDDLE" className="dark:bg-slate-900">Middle Berth</option>
                          <option value="UPPER" className="dark:bg-slate-900">Upper Berth</option>
                          <option value="SIDE_LOWER" className="dark:bg-slate-900">Side Lower</option>
                          <option value="SIDE_UPPER" className="dark:bg-slate-900">Side Upper</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Food Choice */}
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                      {t("mealPref")}
                    </label>
                    <select
                      value={p.foodChoice}
                      onChange={(e) => handlePassengerChange(index, "foodChoice", e.target.value as any)}
                      className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white cursor-pointer"
                    >
                      <option value="VEG" className="dark:bg-slate-900">Vegetarian Meal</option>
                      <option value="NON_VEG" className="dark:bg-slate-900">Non-Vegetarian Meal</option>
                      <option value="JAIN" className="dark:bg-slate-900">Jain Meal</option>
                      <option value="NO_FOOD" className="dark:bg-slate-900">No Meal Required</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CONTACT DETAILS & PERKS */}
          <div className="ios-glass-card p-6 space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white">
              Ticket Delivery & Notification Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                  {t("contactMobile")} *
                </label>
                <div className="flex">
                  <span className="px-3.5 py-3 bg-slate-100 dark:bg-slate-800 border border-r-0 border-slate-300 dark:border-slate-700 rounded-l-xl text-sm font-black text-slate-600 dark:text-slate-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-r-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1">
                  {t("contactEmail")} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm font-bold bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoUpgrade}
                  onChange={(e) => setAutoUpgrade(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  Consider for Free Auto-Upgradation to higher class if vacant at chart preparation
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={travelInsurance}
                  onChange={(e) => setTravelInsurance(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">
                  Opt for Travel Insurance (₹0.45 per passenger - ₹10 Lakhs accident coverage)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT: FARE BREAKDOWN (Sticky iOS Glass) */}
        <div className="lg:col-span-4 ios-glass-card p-6 space-y-5 sticky top-24">
          <h3 className="font-black text-lg text-slate-900 dark:text-white border-b border-slate-200/60 dark:border-white/10 pb-3">
            {t("fareSummary")}
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-300 font-semibold">
              <span>Base Fare ({passengers.length} × ₹{baseFarePerPax})</span>
              <span className="font-black text-slate-900 dark:text-white">₹{totalBaseFare}</span>
            </div>

            {quota === "TQ" && (
              <div className="flex justify-between text-amber-600 dark:text-amber-400 font-bold">
                <span>Tatkal Quota Premium</span>
                <span>₹{tatkalFee}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600 dark:text-slate-300 font-semibold">
              <span>IRCTC Convenience Fee</span>
              <span className="font-black text-slate-900 dark:text-white">₹{convenienceFee.toFixed(2)}</span>
            </div>

            {travelInsurance && (
              <div className="flex justify-between text-slate-600 dark:text-slate-300 font-semibold">
                <span>Travel Insurance</span>
                <span className="font-black text-slate-900 dark:text-white">₹{insuranceFee.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600 dark:text-slate-300 font-semibold">
              <span>GST (5%)</span>
              <span className="font-black text-slate-900 dark:text-white">₹{gst}</span>
            </div>

            <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex justify-between items-baseline">
              <div>
                <div className="text-base font-black text-slate-900 dark:text-white">{t("totalPayable")}</div>
                <div className="text-xs text-slate-400">Includes all taxes</div>
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                ₹{grandTotal}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleProceedToPayment}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{t("proceedToPayment")}</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="p-3.5 ios-glass-pill rounded-2xl text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div className="font-black text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Instant Confirmation Lock</span>
            </div>
            <p>Your berth reservation hold is guaranteed for 10 minutes upon moving to payment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
