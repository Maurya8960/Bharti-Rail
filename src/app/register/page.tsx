"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Train, User, Mail, Phone, Lock, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", name, email, phone, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("bharat_rail_user", JSON.stringify(data.user));
        window.location.href = "/";
      }
    } catch (e) {
      alert("Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
            <Train className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create RailModern ID</h1>
          <p className="text-xs text-slate-500">Sign up for priority Indian Railways reservation access</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Mobile Number</label>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-500 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 font-semibold"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-600 hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
