"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Train as TrainIcon, Clock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Train, ClassAvailability } from "@/lib/trains";
import { useLanguage } from "@/context/LanguageContext";

interface TrainCardProps {
  train: Train & { availability?: Record<string, ClassAvailability> };
  travelDate: string;
  quota: string;
  selectedClass?: string;
}

export default function TrainCard({
  train,
  travelDate,
  quota,
  selectedClass: initialSelectedClass,
}: TrainCardProps) {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [selectedClass, setSelectedClass] = useState<string>(
    initialSelectedClass && train.classes.includes(initialSelectedClass)
      ? initialSelectedClass
      : train.classes[0]
  );
  const [showRouteModal, setShowRouteModal] = useState(false);

  const availabilityMap = train.availability || {};
  const currentClassData = availabilityMap[selectedClass];

  const handleBook = () => {
    if (!currentClassData) return;
    const query = new URLSearchParams({
      trainId: train.id,
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      trainType: train.trainType,
      from: train.fromStationCode,
      fromName: train.fromStationName,
      to: train.toStationCode,
      toName: train.toStationName,
      deptTime: train.departureTime,
      arrTime: train.arrivalTime,
      duration: train.duration,
      date: travelDate,
      class: selectedClass,
      quota,
      fare: currentClassData.fare.toString(),
    });
    router.push(`/book?${query.toString()}`);
  };

  const getTrainTypeBadgeColor = (type: string) => {
    switch (type) {
      case "VANDE BHARAT":
        return "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black";
      case "RAJDHANI":
        return "bg-gradient-to-r from-red-600 to-rose-700 text-white font-black";
      case "SHATABDI":
        return "bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black";
      case "DURONTO":
        return "bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black";
      default:
        return "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold";
    }
  };

  return (
    <div className="ios-glass-card hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Train Header */}
      <div className="p-5 sm:p-6 border-b border-slate-200/60 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-black shadow-md shadow-sky-500/25">
            <TrainIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-black text-lg sm:text-2xl text-slate-900 dark:text-white">
                {language === "hi" && train.trainNameHi ? train.trainNameHi : train.trainName}
              </h3>
              <span className="font-mono text-sm font-black text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-lg border border-sky-300/40">
                #{train.trainNumber}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
              <span className={`text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getTrainTypeBadgeColor(train.trainType)}`}>
                {train.trainType}
              </span>
              <span>•</span>
              <button
                type="button"
                onClick={() => setShowRouteModal(true)}
                className="text-sky-600 dark:text-sky-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>{t("viewRoute")} ({train.stops.length} Stops)</span>
              </button>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">
                {train.onTimeRating}% {t("onTimeScore")}
              </span>
            </div>
          </div>
        </div>

        {/* Running Days */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 dark:text-slate-500 font-bold mr-1 hidden sm:inline">{t("runsOn")}</span>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => {
            const runs = train.runningDays.includes(d);
            return (
              <span
                key={d}
                className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  runs
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600"
                }`}
              >
                {d.charAt(0)}
              </span>
            );
          })}
        </div>
      </div>

      {/* Train Schedule Timings (Big Typography) */}
      <div className="p-5 sm:p-7">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Departure */}
          <div className="md:col-span-3">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {train.departureTime}
            </div>
            <div className="font-extrabold text-slate-800 dark:text-slate-100 text-base sm:text-lg mt-0.5">
              {train.fromStationName}
            </div>
            <div className="text-sm font-mono font-black text-sky-600 dark:text-sky-400">
              {train.fromStationCode}
            </div>
          </div>

          {/* Duration Graphic */}
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center px-2">
            <div className="text-sm font-black text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{train.duration}</span>
            </div>
            <div className="w-full flex items-center gap-2 my-2">
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
              <div className="w-3 h-3 rounded-full bg-sky-500 shadow-md shadow-sky-500/50"></div>
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500">
              {train.distanceKm} km • Direct Route
            </div>
          </div>

          {/* Arrival */}
          <div className="md:col-span-3 text-left md:text-right">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {train.arrivalTime}
            </div>
            <div className="font-extrabold text-slate-800 dark:text-slate-100 text-base sm:text-lg mt-0.5">
              {train.toStationName}
            </div>
            <div className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
              {train.toStationCode}
            </div>
          </div>

          {/* Catering badge */}
          <div className="md:col-span-2 flex flex-col items-start md:items-end justify-center text-xs text-slate-500 dark:text-slate-400">
            {train.pantryAvailable && (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded-xl mb-1.5 border border-emerald-300/30">
                🍲 {t("cateringAvail")}
              </span>
            )}
            <span className="text-xs font-semibold text-slate-400">
              Cleanliness ★ 4.8/5
            </span>
          </div>
        </div>

        {/* SEAT AVAILABILITY MATRIX (iOS 27 Frosted Tiles) */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/10">
          <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
            <span>Seat Availability & Fare Matrix</span>
            <span className="text-xs font-semibold text-slate-400">
              Updated Real-Time
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {train.classes.map((cls) => {
              const cData = availabilityMap[cls];
              if (!cData) return null;
              const isSelected = selectedClass === cls;

              let badgeText = "AVAILABLE";
              let badgeColor = "bg-emerald-600 text-white";

              if (cData.status === "AVAILABLE") {
                badgeText = `AVAILABLE - ${cData.seatsLeft || 12}`;
              } else if (cData.status === "RAC") {
                badgeText = `RAC ${cData.racNumber || 4}`;
                badgeColor = "bg-amber-500 text-white";
              } else {
                badgeText = `WL ${cData.wlNumber || 18}`;
                badgeColor = "bg-rose-600 text-white";
              }

              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 relative cursor-pointer ${
                    isSelected
                      ? "ring-2 ring-sky-500 bg-sky-50/90 dark:bg-sky-950/70 border-sky-400 shadow-md scale-102"
                      : "ios-glass-pill hover:bg-white dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-black text-base text-slate-900 dark:text-white">{cls}</span>
                    <span className="font-black text-base text-slate-900 dark:text-white">₹{cData.fare}</span>
                  </div>

                  <div className={`text-xs font-black px-2 py-1 rounded-lg text-center truncate ${badgeColor}`}>
                    {badgeText}
                  </div>

                  {cData.status === "WL" && cData.confirmationProbability && (
                    <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 text-center font-semibold">
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">{cData.confirmationProbability}%</span> odds
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* BOOKING ACTION BAR */}
        {currentClassData && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-teal-500/10 border border-sky-300/30 dark:border-sky-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm sm:text-base">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">{t("farePerPax")} </span>
              <strong className="text-slate-900 dark:text-white text-lg font-black">₹{currentClassData.fare}</strong>
              <span className="text-slate-400 mx-2">|</span>
              <span className="text-slate-600 dark:text-slate-300 font-bold">{currentClassData.className}</span>
            </div>

            <button
              type="button"
              onClick={handleBook}
              className="flex items-center gap-2.5 px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{t("instantBook")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* TIMETABLE MODAL */}
      {showRouteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="ios-glass-card max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-gradient-to-r from-slate-900 to-blue-950 text-white flex justify-between items-center">
              <div>
                <h4 className="font-black text-lg">{train.trainName} (#{train.trainNumber})</h4>
                <p className="text-xs text-slate-300">{language === "hi" && train.trainNameHi ? train.trainNameHi : "Complete Intermediate Timetable"}</p>
              </div>
              <button
                onClick={() => setShowRouteModal(false)}
                className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3.5">
              {train.stops.map((stop, i) => (
                <div key={stop.stationCode} className="flex items-start gap-3.5 pb-3 border-b border-slate-200/60 dark:border-white/10 last:border-b-0">
                  <div className="w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-extrabold text-base text-slate-900 dark:text-white">{stop.stationName}</span>
                      <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">{stop.stationCode}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>Arr: <strong>{stop.arrivalTime}</strong> • Dep: <strong>{stop.departureTime}</strong></span>
                      <span>{stop.haltMinutes > 0 ? `${stop.haltMinutes}m Halt` : "Origin/Dest"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-white/10 text-right">
              <button
                onClick={() => setShowRouteModal(false)}
                className="px-5 py-2.5 bg-slate-900 dark:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Timetable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
