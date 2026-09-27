import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AiRagAssistant from "@/components/AiRagAssistant";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "RailModern | Next-Gen Indian Railways Reservation System (IRCTC Redesign)",
  description:
    "An ultra-fast, modern, frictionless iOS 27 glassmorphic train booking platform for Indian Railways. Zero captchas, instant availability matrix, 3-step booking, bilingual Hindi & English, and AI RAG Passenger Assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('rail_theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white relative overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            {/* Ambient Background Glowing Orbs for iOS 27 Glassmorphism */}
            <div className="ambient-glow-orb w-96 h-96 bg-sky-400/25 dark:bg-sky-600/15 top-0 left-1/4 -translate-y-1/2"></div>
            <div className="ambient-glow-orb w-[30rem] h-[30rem] bg-indigo-500/20 dark:bg-indigo-600/15 top-1/3 -right-20"></div>
            <div className="ambient-glow-orb w-80 h-80 bg-amber-400/15 dark:bg-amber-600/10 bottom-1/4 left-10"></div>

            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              {/* Global AI RAG Passenger Assistant with Hindi, Hinglish & English */}
              <AiRagAssistant />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
