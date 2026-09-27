"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (l: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    bookTrains: "Book Trains",
    pnrStatus: "PNR Status",
    liveStatus: "Live Running Status",
    myBookings: "My Bookings",
    audit: "IRCTC Audit",
    admin: "Admin Console",
    signIn: "Sign In",
    register: "Register",
    logout: "Logout",
    railMadad: "24x7 Rail Madad: 139",
    tagline: "Indian Railways Next-Gen Booking",
    
    // Hero
    heroBadge: "Next-Gen High Concurrency Reservation Engine",
    heroTitle1: "Train Booking,",
    heroTitle2: "Reimagined for Bharat",
    heroDesc: "No distorted captchas. No 3-minute timeouts. No clicking 8 times to check seat availability. Search, select, and confirm your Indian Railways journey in under 60 seconds.",
    quickPnrTitle: "Quick PNR:",
    quickPnrPlaceholder: "Enter 10-digit PNR (e.g. 2849103852)...",
    trackStatus: "Track Status",

    // Search Widget
    fromStation: "From Station",
    toStation: "To Station",
    journeyDate: "Journey Date",
    allClasses: "All Travel Classes",
    generalQuota: "General Quota (GN)",
    tatkalQuota: "Tatkal Quota (TQ)",
    ladiesQuota: "Ladies Quota (LD)",
    seniorQuota: "Senior Citizen (SS)",
    searchTrainsBtn: "Search Trains",
    quickDates: "Quick Dates:",
    today: "Today",
    tomorrow: "Tomorrow",
    dayAfter: "Day After",
    swap: "Swap Stations",

    // Popular corridors
    popularCorridors: "Popular Railway Corridors",
    popularDesc: "High-speed Vande Bharat and Rajdhani express routes with live seat availability",
    exploreAll: "Explore All Routes",

    // Train Card
    runsOn: "Runs on:",
    viewRoute: "View Route",
    onTimeScore: "On-Time Score",
    instantBook: "Instant Book",
    seatsLeft: "Available",
    farePerPax: "Fare per passenger:",
    cateringAvail: "Catering Available",

    // Booking Wizard
    passengerDetails: "Passenger Details",
    masterList: "Saved Master Passenger List",
    addPassenger: "Add Passenger",
    proceedToPayment: "Proceed to Payment",
    fareSummary: "Fare Summary",
    totalPayable: "Total Payable Amount",
    fullName: "Full Name (As on Govt ID)",
    age: "Age",
    gender: "Gender",
    berthPref: "Berth / Seat Preference",
    mealPref: "Meal Preference",
    contactMobile: "Mobile Number (For SMS & WhatsApp Ticket)",
    contactEmail: "Email Address (For Printable PDF E-Ticket)",

    // Payment
    selectPayment: "Select Payment Method",
    reservedHold: "Reserved Seats Held for Checkout",
    instantUpi: "Instant UPI / QR",
    cards: "Credit / Debit Card",
    railpay: "RailPay Wallet",
    netbanking: "NetBanking",
    scanPay: "Scan & Pay via any UPI App",
    simulateUpi: "Simulate UPI Approval & Confirm",

    // Ticket
    ersTitle: "INDIAN RAILWAYS E-TICKET",
    ersSubtitle: "Electronic Reservation Slip (ERS)",
    pnrLabel: "Passenger Reservation Number",
    bookingConfirmed: "Booking Confirmed (CNF)",
    printTicket: "Print E-Ticket",
    seatAllotment: "Passenger Seat Allotment Details",
    coach: "Coach",
    berth: "Berth / Seat",
    status: "Status",
  },
  hi: {
    // Nav
    bookTrains: "ट्रेन बुक करें",
    pnrStatus: "पीएनआर स्थिति",
    liveStatus: "लाइव ट्रेन स्थिति",
    myBookings: "मेरी बुकिंग्स",
    audit: "आईआरसीटीसी ऑडिट",
    admin: "एडमिन कंसोल",
    signIn: "लॉग इन",
    register: "पंजीकरण",
    logout: "लॉग आउट",
    railMadad: "24x7 रेल मदद: 139",
    tagline: "भारतीय रेल आधुनिक आरक्षण प्रणाली",

    // Hero
    heroBadge: "अगली पीढ़ी का उच्च गति रेल आरक्षण इंजन",
    heroTitle1: "ट्रेन टिकट बुकिंग,",
    heroTitle2: "नए भारत के लिए पुनर्कल्पित",
    heroDesc: "न अस्पष्ट कैप्चा, न 3 मिनट का तनावपूर्ण टाइमआउट, न सीट देखने के लिए 8 बार क्लिक करना। 60 सेकंड के भीतर अपनी भारतीय रेल यात्रा खोजें और तुरंत टिकट पाएं।",
    quickPnrTitle: "त्वरित पीएनआर:",
    quickPnrPlaceholder: "10 अंकों का पीएनआर दर्ज करें...",
    trackStatus: "स्थिति देखें",

    // Search Widget
    fromStation: "प्रस्थान स्टेशन (From)",
    toStation: "गंतव्य स्टेशन (To)",
    journeyDate: "यात्रा की तारीख",
    allClasses: "सभी श्रेणियां (All Classes)",
    generalQuota: "सामान्य कोटा (GN)",
    tatkalQuota: "तत्काल कोटा (TQ)",
    ladiesQuota: "महिला कोटा (LD)",
    seniorQuota: "वरिष्ठ नागरिक (SS)",
    searchTrainsBtn: "ट्रेन खोजें",
    quickDates: "त्वरित तारीखें:",
    today: "आज",
    tomorrow: "कल",
    dayAfter: "परसों",
    swap: "स्टेशन बदलें",

    // Popular corridors
    popularCorridors: "प्रमुख रेल मार्ग एवं गलियारे",
    popularDesc: "वंदे भारत एवं राजधानी एक्सप्रेस के उच्च-मांग वाले प्रमुख मार्ग",
    exploreAll: "सभी मार्ग देखें",

    // Train Card
    runsOn: "संचालन दिन:",
    viewRoute: "रूट देखें",
    onTimeScore: "समयबद्धता स्कोर",
    instantBook: "तुरंत बुक करें",
    seatsLeft: "उपलब्ध सीटें",
    farePerPax: "प्रति यात्री किराया:",
    cateringAvail: "खानपान उपलब्ध",

    // Booking Wizard
    passengerDetails: "यात्री का विवरण",
    masterList: "सहेजी गई मास्टर पैसेंजर सूची",
    addPassenger: "यात्री जोड़ें",
    proceedToPayment: "भुगतान के लिए आगे बढ़ें",
    fareSummary: "किराया सारांश",
    totalPayable: "कुल देय राशि",
    fullName: "पूरा नाम (सरकारी पहचान पत्र के अनुसार)",
    age: "आयु",
    gender: "लिंग",
    berthPref: "बर्थ / सीट प्राथमिकता",
    mealPref: "भोजन विकल्प",
    contactMobile: "मोबाइल नंबर (एसएमएस एवं व्हाट्सएप टिकट हेतु)",
    contactEmail: "ईमेल पता (पीडीएफ ई-टिकट हेतु)",

    // Payment
    selectPayment: "भुगतान विधि चुनें",
    reservedHold: "चेकआउट हेतु सीटें आरक्षित हैं",
    instantUpi: "तत्काल यूपीआई / क्यूआर",
    cards: "क्रेडिट / डेबिट कार्ड",
    railpay: "रेलपे सुपर वॉलेट",
    netbanking: "नेट बैंकिंग",
    scanPay: "किसी भी यूपीआई ऐप द्वारा स्कैन कर भुगतान करें",
    simulateUpi: "यूपीआई भुगतान अनुमोदित करें व पुष्टि करें",

    // Ticket
    ersTitle: "भारतीय रेल ई-टिकट",
    ersSubtitle: "इलेक्ट्रॉनिक आरक्षण पर्ची (ERS)",
    pnrLabel: "यात्री आरक्षण संख्या (पीएनआर)",
    bookingConfirmed: "आरक्षण की पुष्टि (CNF)",
    printTicket: "ई-टिकट प्रिंट करें",
    seatAllotment: "यात्री सीट एवं कोच आवंटन विवरण",
    coach: "कोच",
    berth: "बर्थ / सीट",
    status: "स्थिति",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("rail_lang") as Language | null;
    if (saved === "en" || saved === "hi") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("rail_lang", lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const t = (key: string): string => {
    return DICTIONARY[language]?.[key] || DICTIONARY.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
