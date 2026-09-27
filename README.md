# RailModern (Bharti-Rail) — Next-Gen Indian Railways Reservation System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38bdf8)](https://tailwindcss.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Maurya8960-181717?logo=github)](https://github.com/Maurya8960)

> **An ultra-modern, high-concurrency, iOS 27 Glassmorphic Indian Railways train booking platform engineered by [Ansh Maurya](https://github.com/Maurya8960) to eliminate the friction, clunky UX, and session timeouts of legacy IRCTC (NGeT).**

---

## 👨‍💻 Architect & Developer
**Ansh Maurya** — Senior Full-Stack & Systems Architect
- **GitHub:** [Maurya8960](https://github.com/Maurya8960)
- **LinkedIn:** [anshmaurya89](https://www.linkedin.com/in/anshmaurya89/)
- **X (Twitter):** [@maurya1_ansh](https://x.com/maurya1_ansh)
- **YouTube:** [@AnshMaurya-o6j](https://www.youtube.com/@AnshMaurya-o6j)
- **WhatsApp:** [+91 94542 47006](https://wa.me/qr/4M4PQCGRM6LXL1)
- **Email:** [maurya1.ansh@gmail.com](mailto:maurya1.ansh@gmail.com)

---

## ✨ Key Features & Innovations

1. **🎨 iOS 27 Glassmorphism & High-Contrast Light/Dark Mode**
   - Translucent frosted glass layers, dynamic ambient light orbs, and ultra-crisp typography in both Light and Dark modes.
2. **🌐 Bilingual Support: Hindi (हिंदी) & English**
   - Instant real-time UI toggle with bilingual station names (e.g., नई दिल्ली / New Delhi) and Devanagari typography.
3. **🤖 Intelligent AI RAG Passenger Assistant (RailSahayak AI)**
   - Context-aware Retrieval-Augmented Generation (RAG) assistant answering queries in **Hindi, Hinglish, and English** regarding Tatkal rules, cancellation refunds, live PNR tracking, and journey planning.
4. **⚡ Instant Multi-Class Seat Availability Matrix**
   - Eliminates the *N+1 click penalty*. View 1A, 2A, 3A, 3E, SL, CC, and EC availability, dynamic fares, and confirmation odds in a single glance.
5. **🚫 Zero-Captcha Friction & Smooth Checkout**
   - Say goodbye to unreadable captchas and 3-minute timeouts during Tatkal rush hours.
6. **🎫 Authentic Printable E-Ticket Slip (ERS)**
   - Official Indian Railways layout with scannable QR verification code, carriage coach & berth allotment, and print-ready CSS (`@media print`).
7. **📍 Live Satellite / RTIS GPS Train Tracker**
   - Real-time station-by-station journey progress, delay monitoring, locomotive speed (km/h), and upcoming platform numbers.
8. **💰 Instant Cancellation & Automated T+0 Refund Engine**
   - Realistic Indian Railways cancellation slab deductions (>48h, 12-48h, 4-12h, <4h) with instant simulated UPI / wallet reversals.
9. **🛡️ CRIS PRS Admin Dashboard**
   - Real-time gross platform revenue, booking volume, seat quota adjuster (General vs Tatkal allocation), and active reservation stream.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Backend (BFF):** Next.js Server Endpoints / REST API with TypeScript.
- **AI RAG Engine:** Multi-lingual semantic retrieval engine supporting Hindi, Hinglish, and English.
- **Styling:** iOS 27 Frosted Glassmorphism with CSS-based `@custom-variant dark`.
- **Database/State:** Atomic in-memory PRS state (pluggable with PostgreSQL / Supabase / MongoDB).

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v20.x recommended)
- **npm:** v9.0.0 or higher

### 2. Clone and Install
```bash
git clone https://github.com/Maurya8960/Bharti-Rail.git
cd Bharti-Rail
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/trains/search` | `GET` | Search trains by `from`, `to`, `date`, `class`, `quota` |
| `/api/trains/live-status` | `GET` | Real-time GPS running location for `trainNumber` |
| `/api/ai-rag` | `POST` | AI Passenger Assistant (Hindi, Hinglish, English) |
| `/api/booking` | `POST` | Reserve seats, allocate coach/berth, and generate 10-digit PNR |
| `/api/booking` | `GET` | List all bookings for authenticated user |
| `/api/booking/cancel` | `POST` | Calculate refund and cancel ticket |
| `/api/pnr/:pnr` | `GET` | Fetch live PNR record with charting and seat status |
| `/api/admin/stats` | `GET` | Real-time PRS revenue, booking volume, and health metrics |
| `/api/auth` | `POST` | User login and registration handler |

---

## 📄 License
This project is licensed under the MIT License. Developed with ❤️ by [Ansh Maurya](https://github.com/Maurya8960).
