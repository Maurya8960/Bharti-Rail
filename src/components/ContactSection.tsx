"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactSection() {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 4500);
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/qr/4M4PQCGRM6LXL1",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/Maurya8960",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anshmaurya89/",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@AnshMaurya-o6j",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      url: "https://x.com/maurya1_ansh",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact-developer" className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="ios-glass-card p-8 sm:p-12 relative overflow-hidden">
        {/* Title Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto rounded-full"></div>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
            Have a question or want to work together?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Contact Information & Social Accounts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="ios-glass-pill p-6 rounded-3xl space-y-4">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-3.5 text-sm font-semibold">
                <a
                  href="mailto:maurya1.ansh@gmail.com"
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="truncate">maurya1.ansh@gmail.com</span>
                </a>

                <a
                  href="tel:+919454247006"
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 94542 47006</span>
                </a>
              </div>
            </div>

            {/* Follow Me Social Icons */}
            <div className="ios-glass-pill p-6 rounded-3xl space-y-4">
              <h3 className="font-black text-lg text-slate-900 dark:text-white">
                Follow Me
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-12 h-12 rounded-2xl ios-glass-pill hover:bg-sky-600 hover:text-white text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm cursor-pointer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7 ios-glass-pill p-6 sm:p-8 rounded-3xl">
            {submitted ? (
              <div className="p-8 text-center space-y-3 animate-in zoom-in-95">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
                  Thank you for reaching out. Ansh Maurya will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-bold">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 dark:text-white shadow-2xs resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
