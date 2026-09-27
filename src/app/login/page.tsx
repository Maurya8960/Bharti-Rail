"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Train, Lock, Mail, ArrowRight, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rahul.sharma@railmodern.in");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("bharat_rail_user", JSON.stringify(data.user));
        window.location.href = "/";
      }
    } catch (e) {
      alert("Login error");
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = (type: "USER" | "ADMIN") => {
    const demoUser = {
      id: type === "ADMIN" ? "usr-admin-1" : "usr-demo-1",
      name: type === "ADMIN" ? "ADMINISTRATOR (CRIS)" : "Rahul Sharma",
      email: type === "ADMIN" ? "admin@cris.gov.in" : "rahul.sharma@railmodern.in",
      role: type,
      token: "demo_jwt_token_" + Date.now(),
    };
    localStorage.setItem("bharat_rail_user", JSON.stringify(demoUser));
    window.location.href = type === "ADMIN" ? "/admin" : "/";
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
            <Train className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to RailModern</h1>
          <p className="text-xs text-slate-500">Access saved passengers, rapid Tatkal booking, and PNR history</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Account"}
          </button>
        </form>

        {/* 1-CLICK DEMO LOGINS */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Or Sign In with 1-Click Demo
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => loginAsDemo("USER")}
              className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Demo Passenger
            </button>
            <button
              type="button"
              onClick={() => loginAsDemo("ADMIN")}
              className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              Demo Admin (CRIS)
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 pt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-sky-600 hover:underline font-bold">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
