"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  RotateCcw,
  Languages,
  Train,
  MessageCircle,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  sources?: string[];
  timestamp: string;
}

export default function AiRagAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState<"auto" | "en" | "hi" | "hinglish">("auto");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "ai",
      text:
        language === "hi"
          ? "नमस्ते! मैं आपका **भारतीय रेल सहायक (RailSahayak AI)** हूँ। आप मुझसे तत्काल नियम, सीट उपलब्धता, पीएनआर स्टेटस, रद्दीकरण रिफंड या डेवलपर अंश मौर्य के बारे में **हिंदी, हिंग्लिश या इंग्लिश** में कुछ भी पूछ सकते हैं!"
          : "Hello! I am your **RailSahayak AI Passenger Assistant** powered by Indian Railways RAG. Ask me anything about Tatkal rules, live PNR tracking, cancellation refunds, Vande Bharat schedules, or developer Ansh Maurya in **English, Hindi, or Hinglish**!",
      sources: ["Official CRIS & PRS Guidelines", "Developer Ansh Maurya Profile"],
      timestamp: "Just now",
    },
  ]);

  const quickQuestions = [
    { label: "⚡ Tatkal timing kya hai?", query: "Tatkal timing kya hai aur kitna charge lagta hai?" },
    { label: "💰 Cancellation refund rules", query: "3A ticket cancel karne par kitna refund milega?" },
    { label: "🔍 Check PNR 2849103852", query: "Check my PNR 2849103852 status" },
    { label: "👨‍💻 About Creator Ansh Maurya", query: "Who created RailModern? Share Ansh Maurya's LinkedIn and GitHub." },
    { label: "🚄 Vande Bharat Express", query: "Vande Bharat train features and Delhi to Varanasi timing" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || loading) return;

    const userMsg: Message = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-rag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, language: selectedLang }),
      });
      const data = await res.json();

      if (data.success) {
        const aiMsg: Message = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: data.response,
          sources: data.ragSources,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: "err-" + Date.now(),
            sender: "ai",
            text: "Sorry, I could not retrieve information right now. Please try again.",
            timestamp: "Just now",
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "ai",
          text: "Connection error with RailSahayak AI RAG engine.",
          timestamp: "Just now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING LAUNCHER PILL (Bottom Right) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in-90 duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white rounded-full shadow-2xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all font-black text-sm cursor-pointer border border-white/20"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span>💬 Ask RailSahayak AI</span>
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Hindi • Hinglish • Eng
            </span>
          </button>
        </div>
      )}

      {/* EXPANDED CHAT WINDOW (iOS 27 Ultra-Glassmorphic) */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[95vw] sm:w-[26rem] h-[34rem] max-h-[88vh] ios-glass-card shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200 border-2 border-white/40 dark:border-white/15">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-6 h-6 text-pink-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-base">RailSahayak AI</h3>
                  <span className="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-black border border-emerald-400/30">
                    RAG ONLINE
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-semibold">
                  Passenger AI • Hindi / Hinglish / English
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: "init",
                      sender: "ai",
                      text: "Chat cleared. What can I help you with?",
                      timestamp: "Just now",
                    },
                  ])
                }
                title="Reset conversation"
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Language Selector Pill Strip */}
          <div className="px-3 py-1.5 bg-slate-100/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Language:</span>
            </div>
            <div className="flex gap-1">
              {(["auto", "en", "hi", "hinglish"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLang(l)}
                  className={`px-2 py-0.5 rounded-md uppercase text-[10px] font-black transition-colors cursor-pointer ${
                    selectedLang === l
                      ? "bg-sky-600 text-white shadow-xs"
                      : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                  }`}
                >
                  {l === "auto" ? "Auto" : l === "hi" ? "हिन्दी" : l === "hinglish" ? "Hinglish" : "ENG"}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((m) => {
              const isUser = m.sender === "user";
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed ${
                      isUser
                        ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-tr-xs shadow-md"
                        : "ios-glass-pill text-slate-800 dark:text-slate-100 font-semibold rounded-tl-xs shadow-xs"
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.sources && m.sources.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold px-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>RAG Sources: {m.sources.join(" • ")}</span>
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-bold">
                    {m.timestamp}
                  </span>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 p-3 ios-glass-pill rounded-2xl max-w-[70%]">
                <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Retrieving PRS Knowledge & Answering...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 border-t border-slate-200/60 dark:border-white/10 flex gap-1.5 overflow-x-auto bg-slate-50/50 dark:bg-slate-900/50">
            {quickQuestions.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="px-2.5 py-1 ios-glass-pill hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-[11px] font-bold shrink-0 transition-colors cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white/90 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={
                  selectedLang === "hi"
                    ? "पूछें (उदा. तत्काल समय, पीएनआर स्थिति)..."
                    : selectedLang === "hinglish"
                    ? "Poochhein (e.g. Tatkal timing kya hai?)..."
                    : "Ask in English, Hindi, or Hinglish..."
                }
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="p-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-2xl shadow-md transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
