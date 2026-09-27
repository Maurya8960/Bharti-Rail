"use client";

import React from "react";
import Link from "next/link";
import { Train, ShieldCheck, PhoneCall, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="ios-glass border-t border-slate-200/60 dark:border-white/10 text-sm mt-20 relative z-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1 */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 font-black text-lg text-slate-900 dark:text-white">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <Train className="w-5 h-5" />
              </div>
              <span>RailModern (BharatRail)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Next-Gen high concurrency redesign of the Indian Railways booking experience.
              Zero captcha friction, sub-500ms seat matrix, and automated instant refund workflows.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              All 16 Indian Railway Zones Online & Synchronized
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-black text-xs tracking-wider uppercase">Passenger Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-sky-600 dark:hover:text-white transition-colors">Search & Book Trains</Link></li>
              <li><Link href="/pnr-status" className="hover:text-sky-600 dark:hover:text-white transition-colors">Live PNR Status & Charting</Link></li>
              <li><Link href="/live-status" className="hover:text-sky-600 dark:hover:text-white transition-colors">Live Train Running Tracker</Link></li>
              <li><Link href="/my-bookings" className="hover:text-sky-600 dark:hover:text-white transition-colors">Booking History & Cancellation</Link></li>
              <li><Link href="/analysis" className="hover:text-sky-600 dark:hover:text-white transition-colors">IRCTC Architecture & UX Audit</Link></li>
            </ul>
          </div>

          {/* Col 3: Developer & Social Accounts */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-black text-xs tracking-wider uppercase">Architect & Developer</h4>
            <div className="space-y-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
              <div className="font-black text-slate-900 dark:text-white text-sm">
                Ansh Maurya
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Senior Full-Stack & Systems Architect
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://www.linkedin.com/in/anshmaurya89/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 ios-glass-pill hover:bg-sky-600 hover:text-white rounded-lg text-xs font-black transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Maurya8960"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 ios-glass-pill hover:bg-slate-900 hover:text-white rounded-lg text-xs font-black transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/maurya1_ansh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 ios-glass-pill hover:bg-black hover:text-white rounded-lg text-xs font-black transition-colors"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://www.youtube.com/@AnshMaurya-o6j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 ios-glass-pill hover:bg-red-600 hover:text-white rounded-lg text-xs font-black transition-colors"
                >
                  YouTube
                </a>
                <a
                  href="https://wa.me/qr/4M4PQCGRM6LXL1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 ios-glass-pill hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-black transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Helpline */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-black text-xs tracking-wider uppercase">Helpline & Security</h4>
            <div className="p-4 ios-glass-pill rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold">
                <PhoneCall className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Rail Madad: <strong>139</strong> (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>256-bit Bank Grade Security</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Compliant with CRIS / Indian Railways PRS booking guidelines.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} RailModern Technologies. Engineered by{" "}
            <a
              href="https://www.linkedin.com/in/anshmaurya89/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 dark:text-sky-400 hover:underline font-black"
            >
              Ansh Maurya
            </a>
            .
          </div>
          <div className="flex items-center gap-4">
            <Link href="/analysis" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">IRCTC Audit</Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Admin Console</Link>
            <span>•</span>
            <a href="#contact-developer" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">Contact Ansh</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
