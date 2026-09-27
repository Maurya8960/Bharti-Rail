"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Train,
  Ticket,
  Clock,
  Compass,
  User,
  ShieldCheck,
  Menu,
  X,
  FileSpreadsheet,
  LogOut,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bharat_rail_user");
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bharat_rail_user");
    setCurrentUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { label: t("bookTrains"), href: "/", icon: Train },
    { label: t("pnrStatus"), href: "/pnr-status", icon: Ticket },
    { label: t("liveStatus"), href: "/live-status", icon: Compass },
    { label: t("myBookings"), href: "/my-bookings", icon: Clock },
    { label: t("audit"), href: "/analysis", icon: FileSpreadsheet },
    { label: t("admin"), href: "/admin", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2">
      {/* iOS 27 Floating Glass Capsule Navbar */}
      <div className="ios-glass rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 py-3.5 transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Bilingual Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Rail<span className="text-sky-600 dark:text-sky-400">Modern</span>
                </span>
                <span className="text-xs bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-extrabold px-2 py-0.5 rounded-full border border-sky-300/40">
                  {language === "hi" ? "भारत" : "BHARAT"}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 -mt-0.5">
                {language === "hi" ? "भारतीय रेल आरक्षण" : "Indian Railways Next-Gen"}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links with Increased Typography */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/30 font-black"
                      : "text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-sky-600 dark:text-sky-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Theme Toggle + Language Switcher + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hindi / English Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              title="Toggle English / हिंदी"
              className="ios-glass-pill px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
            >
              <Languages className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{language === "en" ? "हिन्दी" : "English"}</span>
            </button>

            {/* Dark / Light Mode Pill Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Dark / Light Mode"
              className="ios-glass-pill p-2 sm:px-3 sm:py-1.5 rounded-2xl text-slate-800 dark:text-slate-100 flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline text-xs font-bold">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline text-xs font-bold">Dark</span>
                </>
              )}
            </button>

            {/* Auth Profile */}
            <div className="hidden sm:flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="ios-glass-pill px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100">
                    <div className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                      {currentUser.name ? currentUser.name.charAt(0) : "U"}
                    </div>
                    <span className="truncate max-w-[100px]">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-md shadow-sky-600/25 transition-all hover:scale-105"
                >
                  {t("signIn")}
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-2xl"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 space-y-1 animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold ${
                    isActive
                      ? "bg-sky-600 text-white font-black"
                      : "text-slate-800 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 flex gap-2">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 rounded-2xl"
                >
                  {t("logout")} ({currentUser.name})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold bg-sky-600 text-white rounded-2xl"
                >
                  {t("signIn")}
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
