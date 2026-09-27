"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { STATIONS, Station } from "@/lib/stations";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeftRight,
  Calendar,
  Search,
  Train,
  MapPin,
  Sparkles,
} from "lucide-react";

interface SearchWidgetProps {
  initialFrom?: string;
  initialTo?: string;
  initialDate?: string;
  initialClass?: string;
  initialQuota?: string;
  compact?: boolean;
}

export default function SearchWidget({
  initialFrom = "NDLS",
  initialTo = "MMCT",
  initialDate,
  initialClass = "ALL",
  initialQuota = "GN",
  compact = false,
}: SearchWidgetProps) {
  const router = useRouter();
  const { language, t } = useLanguage();

  // Tomorrow's date default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split("T")[0];

  const [fromCode, setFromCode] = useState(initialFrom);
  const [toCode, setToCode] = useState(initialTo);
  const [date, setDate] = useState(initialDate || defaultDateStr);
  const [travelClass, setTravelClass] = useState(initialClass);
  const [quota, setQuota] = useState(initialQuota);

  // Search input state
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  // Selected station metadata
  const selectedFromStation = STATIONS.find((s) => s.code === fromCode);
  const selectedToStation = STATIONS.find((s) => s.code === toCode);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setIsFromOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setIsToOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterStations = (query: string) => {
    if (!query) return STATIONS.slice(0, 10);
    const q = query.toLowerCase().trim();
    return STATIONS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.nameHi.includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.cityHi.includes(q)
    ).slice(0, 8);
  };

  const handleSwapStations = () => {
    const temp = fromCode;
    setFromCode(toCode);
    setToCode(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from: fromCode,
      to: toCode,
      date,
      class: travelClass,
      quota,
    });
    router.push(`/search?${params.toString()}`);
  };

  const setQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setDate(d.toISOString().split("T")[0]);
  };

  return (
    <div className={`ios-glass-card transition-all duration-300 ${compact ? "p-5" : "p-6 sm:p-8"}`}>
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* FROM STATION */}
          <div className="lg:col-span-4 relative" ref={fromRef}>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              {t("fromStation")}
            </label>
            <div
              onClick={() => {
                setIsFromOpen(true);
                setFromSearch("");
              }}
              className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-sky-500 dark:hover:border-sky-400 cursor-pointer bg-slate-50/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg truncate">
                    {language === "hi" && selectedFromStation?.cityHi
                      ? selectedFromStation.cityHi
                      : selectedFromStation?.city || "Select"}
                  </span>
                  <span className="text-xs font-mono font-black text-sky-800 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-2 py-0.5 rounded-lg border border-sky-300/40">
                    {selectedFromStation?.code || fromCode}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 truncate">
                  {language === "hi" && selectedFromStation?.nameHi
                    ? selectedFromStation.nameHi
                    : selectedFromStation?.name || "Departure Station"}
                </div>
              </div>
            </div>

            {/* Dropdown Autocomplete */}
            {isFromOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 ios-glass rounded-2xl shadow-2xl border border-slate-200 dark:border-white/15 overflow-hidden max-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    autoFocus
                    placeholder={language === "hi" ? "शहर, स्टेशन नाम या कोड खोजें..." : "Search city, station name or code..."}
                    value={fromSearch}
                    onChange={(e) => setFromSearch(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>
                <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {filterStations(fromSearch).map((station) => (
                    <button
                      key={station.code}
                      type="button"
                      onClick={() => {
                        setFromCode(station.code);
                        setIsFromOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-sky-50 dark:hover:bg-slate-800/80 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                          {language === "hi" ? `${station.nameHi} (${station.cityHi})` : `${station.name} (${station.city})`}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {station.name} • {station.zone}
                        </div>
                      </div>
                      <span className="text-xs font-black font-mono px-2.5 py-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-100 dark:group-hover:bg-sky-950 text-slate-800 dark:text-slate-200 group-hover:text-sky-700 dark:group-hover:text-sky-300 rounded-lg">
                        {station.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SWAP BUTTON */}
          <div className="lg:col-span-1 flex justify-center -my-2 lg:my-0">
            <button
              type="button"
              onClick={handleSwapStations}
              title={t("swap")}
              className="w-12 h-12 rounded-2xl ios-glass-pill text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 flex items-center justify-center shadow-md hover:scale-110 active:rotate-180 transition-all duration-300 cursor-pointer"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* TO STATION */}
          <div className="lg:col-span-4 relative" ref={toRef}>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              {t("toStation")}
            </label>
            <div
              onClick={() => {
                setIsToOpen(true);
                setToSearch("");
              }}
              className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-400 cursor-pointer bg-slate-50/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg truncate">
                    {language === "hi" && selectedToStation?.cityHi
                      ? selectedToStation.cityHi
                      : selectedToStation?.city || "Select"}
                  </span>
                  <span className="text-xs font-mono font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-300/40">
                    {selectedToStation?.code || toCode}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 truncate">
                  {language === "hi" && selectedToStation?.nameHi
                    ? selectedToStation.nameHi
                    : selectedToStation?.name || "Arrival Station"}
                </div>
              </div>
            </div>

            {/* Dropdown Autocomplete */}
            {isToOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 ios-glass rounded-2xl shadow-2xl border border-slate-200 dark:border-white/15 overflow-hidden max-h-80 flex flex-col animate-in fade-in zoom-in-95 duration-100">
                <div className="p-3 border-b border-slate-200 dark:border-slate-800">
                  <input
                    type="text"
                    autoFocus
                    placeholder={language === "hi" ? "शहर, स्टेशन नाम या कोड खोजें..." : "Search city, station name or code..."}
                    value={toSearch}
                    onChange={(e) => setToSearch(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>
                <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {filterStations(toSearch).map((station) => (
                    <button
                      key={station.code}
                      type="button"
                      onClick={() => {
                        setToCode(station.code);
                        setIsToOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-slate-800/80 flex items-center justify-between transition-colors group cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                          {language === "hi" ? `${station.nameHi} (${station.cityHi})` : `${station.name} (${station.city})`}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {station.name} • {station.zone}
                        </div>
                      </div>
                      <span className="text-xs font-black font-mono px-2.5 py-1 bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950 text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 rounded-lg">
                        {station.code}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DATE PICKER */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              {t("journeyDate")}
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-sky-500 dark:hover:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-base font-black text-slate-900 dark:text-white bg-slate-50/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 transition-all shadow-xs cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Quick Dates, Quota, Class, and Submit */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/60 dark:border-white/10">
          {/* Quick Date Chips */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-600 dark:text-slate-400 font-extrabold">{t("quickDates")}</span>
            <button
              type="button"
              onClick={() => setQuickDate(0)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 font-bold transition-all text-xs cursor-pointer shadow-xs"
            >
              {t("today")}
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(1)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 font-bold transition-all text-xs cursor-pointer shadow-xs"
            >
              {t("tomorrow")}
            </button>
            <button
              type="button"
              onClick={() => setQuickDate(2)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-600 font-bold transition-all text-xs cursor-pointer shadow-xs"
            >
              {t("dayAfter")}
            </button>
          </div>

          {/* Class, Quota & Search CTA */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Travel Class Selector */}
            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 shadow-xs cursor-pointer"
            >
              <option value="ALL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t("allClasses")}</option>
              <option value="1A" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AC First Class (1A)</option>
              <option value="2A" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AC 2 Tier (2A)</option>
              <option value="3A" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AC 3 Tier (3A)</option>
              <option value="3E" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AC 3 Economy (3E)</option>
              <option value="CC" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AC Chair Car (CC)</option>
              <option value="EC" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Exec Chair Car (EC)</option>
              <option value="SL" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Sleeper Class (SL)</option>
            </select>

            {/* Quota Selector */}
            <select
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              className="text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 shadow-xs cursor-pointer"
            >
              <option value="GN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t("generalQuota")}</option>
              <option value="TQ" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t("tatkalQuota")}</option>
              <option value="LD" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t("ladiesQuota")}</option>
              <option value="SS" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t("seniorQuota")}</option>
            </select>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-sky-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>{t("searchTrainsBtn")}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
