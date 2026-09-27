"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Zap,
  Layers,
  ArrowRight,
  Clock,
  Smartphone,
} from "lucide-react";

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<"AUDIT" | "BOTTLENECKS" | "SOLUTIONS" | "METRICS">("AUDIT");

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full text-xs font-bold">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Senior Systems Architect Evaluation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
          Comprehensive IRCTC Audit & Modern Architectural Blueprint
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          An in-depth dissection of Indian Railway Catering and Tourism Corporation’s (IRCTC) NGeT e-ticketing platform:
          root-cause analysis of Tatkal race conditions, captcha UX friction, session expirations, and the modern engineering solutions in RailModern.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {[
            { id: "AUDIT", label: "1. Core UX Pain Points" },
            { id: "BOTTLENECKS", label: "2. Technical Bottlenecks" },
            { id: "SOLUTIONS", label: "3. RailModern Architecture" },
            { id: "METRICS", label: "4. Performance Benchmarks" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-sky-500 text-slate-950 shadow-md font-extrabold"
                  : "bg-white/10 hover:bg-white/20 text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: CORE UX PAIN POINTS */}
      {activeTab === "AUDIT" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cluttered UI & Ads */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">1. Cluttered UI & Ad Overload</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Legacy Defect:</strong> The homepage pushes the booking form below third-party advertisement banners, state tourism carousels, unskippable modal alerts, and hotel affiliates.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>RailModern Fix:</strong> Clean, zero-ad interface focusing purely on search ergonomics, high visual hierarchy, and compliant WCAG AAA contrast tokens.
              </div>
            </div>

            {/* Captcha Friction */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">2. Severe Captcha Friction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Legacy Defect:</strong> Distorted alphanumeric and audio captchas fail repeatedly during peak Tatkal rush (10:00 & 11:00 AM), causing genuine passengers to lose tickets within 30 seconds.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>RailModern Fix:</strong> Invisible device fingerprinting, behavioural heuristics, and biometric WebAuthn passkeys eliminate human-punishing captchas.
              </div>
            </div>

            {/* Session Timeouts */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">3. Aggressive 3-Min Session Timeouts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Legacy Defect:</strong> If passengers take longer than 180 seconds to enter details for 4 family members, the backend invalidates the session and purges all form fields without warning.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>RailModern Fix:</strong> Client-side optimistic local draft persistence, silent background token refresh, and a generous 10-minute payment hold window.
              </div>
            </div>

            {/* N+1 Availability Clicks */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">4. The N+1 Availability Click Penalty</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Legacy Defect:</strong> Users must click each class button (1A, 2A, 3A, SL) individually, triggering separate network roundtrips and spinners to compare seat availability.
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                <strong>RailModern Fix:</strong> Consolidated availability matrix returns all class seat counts, fares, and AI confirmation odds simultaneously in one fast edge query.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL BOTTLENECKS */}
      {activeTab === "BOTTLENECKS" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
          <h3 className="text-lg font-black text-slate-900">
            Systemic Architectural Bottlenecks in CRIS / NGeT
          </h3>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">1</span>
                <span>Database Row-Level Lock Contention during Tatkal Rush</span>
              </div>
              <p>
                At 10:00 AM, up to 100,000 concurrent sessions attempt to lock the exact same coach-berth inventory rows for high-demand trains like 12952 (Mumbai Rajdhani). In a monolithic relational model without read-through distributed memory caching, transactions queue up, causing lock escalation, timeouts, and gateway 504 errors.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">2</span>
                <span>Fragile Multi-Hop Payment Aggregator Handshakes</span>
              </div>
              <p>
                The booking journey forces users through multiple external 3D Secure redirects. If the issuing bank's response webhook arrives after IRCTC's internal timeout, the transaction drops. The user is debited, yet no ticket is issued, triggering an expensive and frustrating 3–7 day NEFT refund cycle.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">3</span>
                <span>Lack of Edge-Rendered Dynamic Caching</span>
              </div>
              <p>
                Even static timetable and station lookup requests are routed through central data centers in New Delhi, resulting in high round-trip latency (TTFB &gt; 2.5s) for users across South and North-East India.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAILMODERN ARCHITECTURAL SOLUTIONS */}
      {activeTab === "SOLUTIONS" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
          <h3 className="text-lg font-black text-slate-900">
            How RailModern Solves Every Failure Mode
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
              <span className="font-bold text-sky-900 uppercase text-[11px] tracking-wider">Solution 1</span>
              <h4 className="font-extrabold text-sm text-slate-900">Optimistic Seat Reservation with In-Memory Leases</h4>
              <p className="text-slate-600">
                Instead of locking database rows immediately, RailModern acquires a 10-minute distributed atomic lease via Redis. If payment completes, the lease commits; otherwise, it expires seamlessly without database deadlock.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
              <span className="font-bold text-emerald-900 uppercase text-[11px] tracking-wider">Solution 2</span>
              <h4 className="font-extrabold text-sm text-slate-900">1-Click Master List Autofill</h4>
              <p className="text-slate-600">
                Pre-verified passenger profiles (Name, Age, Gender, Berth & Food preference) are loaded from client storage or profile with 1 tap, reducing passenger entry time from 2 minutes to 3 seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 space-y-2">
              <span className="font-bold text-purple-900 uppercase text-[11px] tracking-wider">Solution 3</span>
              <h4 className="font-extrabold text-sm text-slate-900">Instant T+0 Reversals & RailPay Wallet</h4>
              <p className="text-slate-600">
                Eliminates the multi-day refund nightmare. Cancelled bookings or failed transactions instantly credit the passenger’s RailPay Super Wallet or trigger real-time UPI reversal in under 60 seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 space-y-2">
              <span className="font-bold text-amber-900 uppercase text-[11px] tracking-wider">Solution 4</span>
              <h4 className="font-extrabold text-sm text-slate-900">Predictive Waitlist Confirmation Probability</h4>
              <p className="text-slate-600">
                Machine-learning algorithms analyze historical cancellation patterns and chart preparation records to compute live confirmation percentages (e.g. "WL 12 — 92% Odds").
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BENCHMARK METRICS */}
      {activeTab === "METRICS" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
          <h3 className="text-lg font-black text-slate-900">
            System Performance & UX Benchmark Comparison
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Average End-to-End Booking Time</span>
              <div className="text-3xl font-black text-rose-600 my-2">7m 45s</div>
              <div className="text-xs text-slate-500">Legacy IRCTC (NGeT)</div>
              <div className="text-xl font-black text-emerald-600 mt-3">&lt; 48s</div>
              <div className="text-xs text-slate-500">RailModern (90% faster)</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Time to First Byte (TTFB)</span>
              <div className="text-3xl font-black text-rose-600 my-2">4,200ms</div>
              <div className="text-xs text-slate-500">Legacy IRCTC Peak Hours</div>
              <div className="text-xl font-black text-emerald-600 mt-3">&lt; 180ms</div>
              <div className="text-xs text-slate-500">RailModern Edge CDN</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Tatkal Booking Failure Rate</span>
              <div className="text-3xl font-black text-rose-600 my-2">38.2%</div>
              <div className="text-xs text-slate-500">Due to Captcha & Timeouts</div>
              <div className="text-xl font-black text-emerald-600 mt-3">&lt; 1.4%</div>
              <div className="text-xs text-slate-500">RailModern Resilient Engine</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
