"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchWidget from "@/components/SearchWidget";
import { POPULAR_ROUTES } from "@/lib/stations";
import { useLanguage } from "@/context/LanguageContext";
import ContactSection from "@/components/ContactSection";
import {
  Zap,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Ticket,
  Train,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const [quickPnr, setQuickPnr] = useState("");

  const handlePnrSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPnr.trim()) return;
    router.push(`/pnr-status?pnr=${quickPnr.trim()}`);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION WITH IOS 27 GLASS & AMBIENT GLOW */}
      <section className="relative pt-8 sm:pt-14 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-5 mb-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full ios-glass-pill text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-extrabold shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{t("heroBadge")}</span>
            </div>

            {/* Main Headline - Large Typography */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight text-slate-900 dark:text-white">
              <span className="text-slate-900 dark:text-white">{t("heroTitle1")}</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-700 dark:from-sky-400 dark:via-teal-300 dark:to-amber-300">
                {t("heroTitle2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto font-bold leading-relaxed">
              {t("heroDesc")}
            </p>
          </div>

          {/* Core Search Widget Hero */}
          <div className="max-w-5xl mx-auto">
            <SearchWidget />
          </div>

          {/* Quick PNR Lookup Bar (iOS 27 Glass Capsule) */}
          <div className="max-w-xl mx-auto mt-8">
            <form
              onSubmit={handlePnrSearch}
              className="ios-glass p-2 rounded-3xl flex items-center gap-2 shadow-lg"
            >
              <div className="pl-3.5 flex items-center gap-2 text-slate-700 dark:text-slate-200 text-sm font-black">
                <Ticket className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                <span>{t("quickPnrTitle")}</span>
              </div>
              <input
                type="text"
                maxLength={10}
                placeholder={t("quickPnrPlaceholder")}
                value={quickPnr}
                onChange={(e) => setQuickPnr(e.target.value.replace(/\D/g, ""))}
                className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-mono tracking-wider font-extrabold"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-md cursor-pointer hover:scale-105"
              >
                {t("trackStatus")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* POPULAR RAILWAY CORRIDORS */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("popularCorridors")}
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">
              {t("popularDesc")}
            </p>
          </div>
          <Link
            href="/search?from=NDLS&to=MMCT"
            className="text-sm font-extrabold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1.5 group cursor-pointer"
          >
            <span>{t("exploreAll")}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_ROUTES.map((route, i) => (
            <Link
              key={i}
              href={`/search?from=${route.from}&to=${route.to}`}
              className="ios-glass-card p-5 hover:scale-[1.02] hover:shadow-xl transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300/30">
                  {language === "hi" ? route.tagHi : route.tag}
                </span>
                <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold">
                  {route.trainCount} {language === "hi" ? "दैनिक ट्रेनें" : "Daily Trains"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {language === "hi" ? route.fromCityHi : route.fromCity}
                  </div>
                  <div className="text-xs font-mono font-black text-slate-400">{route.from}</div>
                </div>
                <div className="flex flex-col items-center px-3">
                  <Train className="w-5 h-5 text-sky-500 group-hover:translate-x-1.5 transition-transform" />
                  <div className="w-14 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1.5"></div>
                </div>
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {language === "hi" ? route.toCityHi : route.toCity}
                  </div>
                  <div className="text-xs font-mono font-black text-slate-400">{route.to}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6 PILLARS / ARCHITECTURAL BREAKTHROUGHS */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 ios-glass-pill px-3.5 py-1.5 rounded-full">
            {language === "hi" ? "आर्किटेक्चर एवं यूएक्स नवाचार" : "Architecture & UX Breakthrough"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {language === "hi" ? "आईआरसीटीसी की प्रमुख समस्याओं का समाधान" : "Fixing IRCTC’s Biggest Pain Points"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {language === "hi"
              ? "तत्काल बुकिंग की दौड़, बार-बार होने वाले टाइमआउट और अप्रचलित यूआई को जड़ से समाप्त करने के लिए तैयार किया गया आधुनिक प्लेटफॉर्म।"
              : "Engineered from first principles to overcome the legacy bottlenecks of the NGeT reservation portal."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ios-glass-card p-6 sm:p-7 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              {language === "hi" ? "तत्काल सीट मैट्रिक्स" : "Instant Seat Matrix"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "1A, 2A, 3A, SL की अलग-अलग जांच करने के बजाय, रेलमॉडर्न एक ही कॉल में सभी कोचों की सीटें व किराया प्रदर्शित करता है।"
                : "Legacy IRCTC requires clicking 1A, 2A, 3A, SL individually with spinners. RailModern fetches the entire coach matrix in a single consolidated edge call."}
            </p>
          </div>

          <div className="ios-glass-card p-6 sm:p-7 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              {language === "hi" ? "शून्य-कैप्चा सुरक्षा" : "Zero-Captcha Security"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "अस्पष्ट कैप्चा के स्थान पर अत्याधुनिक बायोमेट्रिक पासकी और टोकनाइज्ड सुरक्षा, जिससे तत्काल में सीट न छूटे।"
                : "Replaces unreadable distorted captchas with background risk analysis and modern biometric passkeys, preventing Tatkal dropouts."}
            </p>
          </div>

          <div className="ios-glass-card p-6 sm:p-7 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              {language === "hi" ? "तत्काल T+0 रिफंड" : "Instant T+0 Refunds"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "5-7 दिनों का इंतजार खत्म। टिकट रद्द होने पर सीधे यूपीआई या रेलपे वॉलेट में 60 सेकंड के भीतर रिफंड।"
                : "Say goodbye to 5–7 day wait times. Cancelled tickets trigger instant UPI reversals or credit to RailPay wallet within 60 seconds."}
            </p>
          </div>

          <div className="ios-glass-card p-6 sm:p-7 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              {language === "hi" ? "कोई सेशन टाइमआउट नहीं" : "No Session Timeouts"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "यात्रियों के नाम भरते समय सेशन एक्सपायर होने की परेशानी खत्म। डेटा स्थानीय रूप से सुरक्षित रहता है।"
                : "No more losing entered passenger names due to arbitrary 3-minute timers. Draft state is securely maintained locally."}
            </p>
          </div>

          <div className="ios-glass-card p-6 sm:p-7 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              {language === "hi" ? "एआई वेटलिस्ट प्रायिकता" : "Waitlist AI Odds"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "वेटलिस्ट कन्फर्मेशन की ऐतिहासिक संभावना सीधे किराये के पास दिखाई देती है (उदा. WL 12 - 94% संभावना)।"
                : "Stop guessing what WL 14 means. Real-time predictive analytics show historical confirmation probabilities right next to the fare."}
            </p>
          </div>

          <div className="ios-glass-card p-6 sm:p-7 space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white">
              {language === "hi" ? "आईफोन 27 ग्लासी यूआई" : "iOS 27 Glassmorphic"}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {language === "hi"
                ? "विज्ञापन-मुक्त, सुंदर फ्रॉस्टेड ग्लास इफेक्ट, डार्क और लाइट मोड तथा सुस्पष्ट बड़े फोंट।"
                : "Zero clutter, zero spammy third-party ads, ultra-slick frosted glass, light/dark themes, and large readable fonts."}
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="ios-glass-card overflow-hidden">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black">{language === "hi" ? "प्रत्यक्ष तुलनात्मक विश्लेषण" : "Direct Platform Comparison"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{language === "hi" ? "आईआरसीटीसी बनाम रेलमॉडर्न" : "Evaluating core performance and usability metrics"}</p>
            </div>
            <Link
              href="/analysis"
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs sm:text-sm rounded-2xl transition-all"
            >
              {language === "hi" ? "पूर्ण ऑडिट पढ़ें" : "Read Full Audit"}
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/70 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-200/60 dark:border-white/10">
                <tr>
                  <th className="p-4 sm:p-5 font-black">{language === "hi" ? "सुविधा / मापदंड" : "Feature / Metric"}</th>
                  <th className="p-4 sm:p-5 font-black text-rose-600 dark:text-rose-400">{language === "hi" ? "आईआरसीटीसी (NGeT)" : "Legacy IRCTC"}</th>
                  <th className="p-4 sm:p-5 font-black text-emerald-600 dark:text-emerald-400">{language === "hi" ? "रेलमॉडर्न (नया सिस्टम)" : "RailModern (Our Platform)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-white/10 font-semibold">
                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-slate-800 dark:text-slate-100">
                    {language === "hi" ? "सीट उपलब्धता जांच" : "Availability Checking"}
                  </td>
                  <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 shrink-0" />
                      <span>{language === "hi" ? "प्रत्येक क्लास पर अलग क्लिक (N+1 समस्या)" : "Separate clicks for every class (N+1 penalty)"}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>{language === "hi" ? "एक ही स्क्रीन पर सभी क्लास की लाइव स्थिति" : "Unified multi-class matrix displayed instantly"}</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-slate-800 dark:text-slate-100">
                    {language === "hi" ? "कैप्चा एवं बॉट सुरक्षा" : "Bot Mitigation & Captcha"}
                  </td>
                  <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 shrink-0" />
                      <span>{language === "hi" ? "कठिन व अस्पष्ट अल्फा कैप्चा" : "Distorted alphanumeric images causing drops"}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>{language === "hi" ? "अदृश्य बैकग्राउंड सुरक्षा व पासकी" : "Frictionless background tokenized verification"}</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-slate-800 dark:text-slate-100">
                    {language === "hi" ? "रिफंड प्रोसेसिंग" : "Refund Processing"}
                  </td>
                  <td className="p-4 sm:p-5 text-rose-600 dark:text-rose-400">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 shrink-0" />
                      <span>{language === "hi" ? "3 से 7 कार्य दिवस (NEFT)" : "3 to 7 business days through NEFT"}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>{language === "hi" ? "तत्काल यूपीआई व रेलपे वॉलेट में क्रेडिट" : "Instant T+0 UPI reversal / RailPay wallet"}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* DEVELOPER GET IN TOUCH & SOCIAL ACCOUNTS */}
      <ContactSection />
    </div>
  );
}
