export interface KnowledgeDocument {
  id: string;
  category: "TATKAL" | "CANCELLATION" | "BERTH" | "FOOD" | "PNR" | "REFUND" | "TRAINS" | "RULES" | "CREATOR";
  keywords: string[];
  title: string;
  contentEn: string;
  contentHi: string;
  contentHinglish: string;
}

export const RAILWAY_RAG_KNOWLEDGE_BASE: KnowledgeDocument[] = [
  {
    id: "kb-creator",
    category: "CREATOR",
    keywords: ["creator", "developer", "ansh", "maurya", "who made", "contact", "linkedin", "github", "youtube", "portfolio"],
    title: "About Developer Ansh Maurya",
    contentEn: "RailModern was designed and engineered by senior full-stack developer Ansh Maurya. You can connect with Ansh on LinkedIn (https://www.linkedin.com/in/anshmaurya89/), GitHub (https://github.com/Maurya8960), X/Twitter (https://x.com/maurya1_ansh), YouTube (@AnshMaurya-o6j), WhatsApp (https://wa.me/qr/4M4PQCGRM6LXL1), or via email at maurya1.ansh@gmail.com and phone +91 94542 47006.",
    contentHi: "रेलमॉडर्न को सीनियर फुल-स्टैक डेवलपर अंश मौर्य द्वारा डिजाइन और विकसित किया गया है। आप अंश से लिंक्डइन (https://www.linkedin.com/in/anshmaurya89/), गिटहब (https://github.com/Maurya8960), एक्स (https://x.com/maurya1_ansh), यूट्यूब (@AnshMaurya-o6j) या व्हाट्सएप (+91 94542 47006) पर संपर्क कर सकते हैं।",
    contentHinglish: "RailModern ko Ansh Maurya ne design and develop kiya hai. Aap Ansh se LinkedIn (https://www.linkedin.com/in/anshmaurya89/), GitHub (https://github.com/Maurya8960), X/Twitter (https://x.com/maurya1_ansh), YouTube (@AnshMaurya-o6j), WhatsApp ya email (maurya1.ansh@gmail.com, +91 94542 47006) par connect kar sakte ho.",
  },
  {
    id: "kb-tatkal",
    category: "TATKAL",
    keywords: ["tatkal", "tatkal time", "ac tatkal", "sleeper tatkal", "tatkal opening", "tatkal charge", "tatkal booking"],
    title: "Tatkal Booking Rules & Timings",
    contentEn: "Tatkal booking opens exactly 1 day prior to the journey date from the train originating station. AC Tatkal (1A, 2A, 3A, 3E, CC, EC) opens at 10:00 AM IST. Non-AC Tatkal (Sleeper, 2S) opens at 11:00 AM IST. Charges: 10% of basic fare for 2S, 30% of basic fare for Sleeper and AC classes. No refund is granted on cancellation of confirmed Tatkal tickets.",
    contentHi: "तत्काल बुकिंग ट्रेन के प्रारंभिक स्टेशन से यात्रा तिथि से 1 दिन पहले खुलती है। एसी क्लास (1A, 2A, 3A, 3E, CC, EC) के लिए तत्काल सुबह 10:00 बजे और नॉन-एसी (स्लीपर/2S) के लिए सुबह 11:00 बजे शुरू होता है। कन्फर्म तत्काल टिकट रद्द करने पर कोई रिफंड नहीं मिलता है।",
    contentHinglish: "Tatkal booking journey date se 1 din pehle khulti hai. AC Tatkal (2A, 3A, CC, 3E) subah 10:00 AM baje open hota hai aur Non-AC Sleeper Tatkal 11:00 AM baje open hota hai. Confirm Tatkal ticket cancel karne par IRCTC se zero refund milta hai.",
  },
  {
    id: "kb-cancellation-slabs",
    category: "CANCELLATION",
    keywords: ["cancel", "cancellation", "refund", "deduction", "charges", "kitna katega", "refund policy", "tdr"],
    title: "Cancellation Charges & Refund Slabs",
    contentEn: "Under Indian Railways rules: 1) Cancelled > 48 hours prior to scheduled departure: Flat deduction per passenger (1A/EC: ₹240 + GST, 2A: ₹200 + GST, 3A/3E/CC: ₹180 + GST, Sleeper: ₹120, 2S: ₹60). 2) Cancelled 12 to 48 hours prior: 25% of fare (minimum flat fee applies). 3) Cancelled 4 to 12 hours prior: 50% of fare deducted. 4) Cancelled < 4 hours prior or after chart preparation: Zero refund.",
    contentHi: "भारतीय रेल के रद्दीकरण नियम: 1) प्रस्थान से 48 घंटे से पहले: फ्लैट शुल्क प्रति यात्री (1A/EC: ₹240, 2A: ₹200, 3A/3E/CC: ₹180, स्लीपर: ₹120). 2) 12 से 48 घंटे पहले: किराये का 25% काटा जाएगा. 3) 4 से 12 घंटे पहले: किराये का 50% काटा जाएगा. 4) 4 घंटे से कम समय रहने पर या चार्ट बनने के बाद: कोई रिफंड नहीं मिलता.",
    contentHinglish: "Indian Railways cancellation rules: 1) Agar departure se 48 hours pehle cancel karte ho to flat cancellation charge lagta hai (3A/CC ke liye ₹180, 2A ke liye ₹200, Sleeper ke liye ₹120). 2) 12 se 48 hours ke beech cancel karne par 25% fare deduct hota hai. 3) 4 se 12 hours ke beech 50% deduct hota hai. 4) Chart banne ke baad ya 4 hours se kam time bacha ho to koi refund nahi milta.",
  },
  {
    id: "kb-pnr-status",
    category: "PNR",
    keywords: ["pnr", "pnr status", "chart", "charting", "chart preparation", "rac", "waiting", "wl", "confirmation probability"],
    title: "PNR Status, RAC & Waitlist Rules",
    contentEn: "A 10-digit Passenger Name Record (PNR) tracks your ticket state. Status codes: CNF (Confirmed berth), RAC (Reservation Against Cancellation - half berth shared with travel guarantee), GNWL (General Waitlist - highest confirmation odds), RLWL (Remote Location Waitlist), PQWL (Pooled Quota Waitlist). Final chart preparation happens 4 hours prior to train departure at the originating station.",
    contentHi: "10 अंकों का पीएनआर नंबर आपकी टिकट स्थिति को ट्रैक करता है। CNF का अर्थ कन्फर्म सीट, RAC का अर्थ आधी सीट शेयरिंग (यात्रा की पूरी गारंटी) और WL का अर्थ वेटिंग लिस्ट है। ट्रेन प्रस्थान से 4 घंटे पहले पहला आरक्षण चार्ट तैयार किया जाता है।",
    contentHinglish: "10-digit PNR aapki seat status batata hai. CNF matlab Confirmed seat, RAC matlab aadhi berth milti hai par travel guaranteed hota hai, aur WL matlab waitlist. First reservation chart train departure se 4 ghante pehle banta hai.",
  },
  {
    id: "kb-vande-bharat",
    category: "TRAINS",
    keywords: ["vande bharat", "train 18", "semi high speed", "speed", "food", "cc", "ec", "delhi varanasi", "katra"],
    title: "Vande Bharat Express Services",
    contentEn: "Vande Bharat Express (Train 18) is India's premier semi-high speed indigenously built train operating at up to 160 km/h. It features AC Chair Car (CC) and Executive Chair Car (EC), rotating seats, bio-vacuum toilets, automatic sliding doors, onboard Wi-Fi infotainment, and premium catering. Flagship routes include New Delhi - Varanasi (22436), New Delhi - Katra (22439), and Mumbai - Ahmedabad.",
    contentHi: "वंदे भारत एक्सप्रेस (ट्रेन 18) भारत की पहली स्वदेशी सेमी-हाई स्पीड ट्रेन है। इसमें वातानुकूलित चेयर कार (CC) और एग्जीक्यूटिव क्लास (EC), 180 डिग्री घूमने वाली सीटें, स्वचालित दरवाजे और प्रीमियम खानपान की सुविधा उपलब्ध है।",
    contentHinglish: "Vande Bharat Express India ki semi-high speed train hai jo 160 km/h tak chal sakti hai. Isme AC Chair Car (CC) aur Executive Class (EC) coaches hote hain, premium catering milti hai aur automatic sliding doors hote hain.",
  },
  {
    id: "kb-berth-rules",
    category: "BERTH",
    keywords: ["berth", "seat", "lower berth", "senior citizen", "side lower", "middle berth", "sleeping time", "berth rules"],
    title: "Indian Railways Berth & Sleeping Timings",
    contentEn: "In Sleeper and AC 3-Tier coaches, the official sleeping hours are strictly from 10:00 PM to 06:00 AM. During 06:00 AM to 10:00 PM, middle berths must be folded down so passengers on lower berths can sit comfortably. Passengers above 60 years and pregnant women are granted priority lower berths under the Senior Citizen quota.",
    contentHi: "स्लीपर और 3-टियर एसी में सोने का आधिकारिक समय रात 10:00 बजे से सुबह 06:00 बजे तक है। सुबह 6:00 बजे से रात 10:00 बजे तक मिडिल बर्थ को नीचे मोड़ना होता है ताकि सभी यात्री बैठ सकें। वरिष्ठ नागरिकों (60+) को लोअर बर्थ प्राथमिकता दी जाती है।",
    contentHinglish: "Train me sone ka official time raat 10:00 PM se subah 06:00 AM tak hota hai. Din ke time (6 AM - 10 PM) middle berth wale passenger ko berth fold karni hoti hai taaki lower berth par sab baith sakein.",
  },
  {
    id: "kb-luggage-pet",
    category: "RULES",
    keywords: ["luggage", "baggage", "weight", "free allowance", "pet", "dog", "rules"],
    title: "Luggage Allowance & Pet Travel Rules",
    contentEn: "Free luggage allowance: 1A allows up to 70 kg, 2A allows 50 kg, 3A/CC allows 40 kg, and Sleeper allows 40 kg per passenger. Pets (dogs/cats) are only allowed in 1st AC (1A) coupe or cabin by booking the entire 2-berth or 4-berth compartment, or in the brake van guard compartment.",
    contentHi: "मुफ्त सामान की सीमा: 1A में 70 किग्रा, 2A में 50 किग्रा, 3A/CC में 40 किग्रा और स्लीपर में 40 किग्रा प्रति यात्री ले जा सकते हैं। पालतू कुत्तों/बिल्लियों को केवल फर्स्ट एसी (1A) कूपे में पूरा केबिन बुक करके ले जाने की अनुमति है।",
    contentHinglish: "Luggage allowance: 1A me 70 kg, 2A me 50 kg, 3A/CC me 40 kg aur Sleeper me 40 kg per person allowed hai. Pets ko sirf 1st AC coupe me poora cabin book karke ya guard van me le ja sakte ho.",
  },
];

// RAG Retriever algorithm with semantic scoring
export function retrieveRagContext(query: string, language: "en" | "hi" | "hinglish" = "en"): {
  documents: KnowledgeDocument[];
  matchedSnippets: string[];
} {
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 2);

  const scoredDocs = RAILWAY_RAG_KNOWLEDGE_BASE.map((doc) => {
    let score = 0;
    // Check keywords
    doc.keywords.forEach((kw) => {
      if (normalizedQuery.includes(kw.toLowerCase())) {
        score += 8;
      }
    });
    // Check individual word matches
    words.forEach((w) => {
      if (doc.contentEn.toLowerCase().includes(w)) score += 2;
      if (doc.contentHinglish.toLowerCase().includes(w)) score += 2;
      if (doc.title.toLowerCase().includes(w)) score += 4;
    });

    return { doc, score };
  });

  // Sort descending by relevance
  scoredDocs.sort((a, b) => b.score - a.score);

  // Take top 2 documents
  const topDocs = scoredDocs.filter((item) => item.score > 0).slice(0, 2).map((item) => item.doc);

  // Fallback to top general documents if no direct keyword match
  const selectedDocs = topDocs.length > 0 ? topDocs : [RAILWAY_RAG_KNOWLEDGE_BASE[0], RAILWAY_RAG_KNOWLEDGE_BASE[1]];

  const matchedSnippets = selectedDocs.map((d) => {
    if (language === "hi") return `${d.title}: ${d.contentHi}`;
    if (language === "hinglish") return `${d.title}: ${d.contentHinglish}`;
    return `${d.title}: ${d.contentEn}`;
  });

  return {
    documents: selectedDocs,
    matchedSnippets,
  };
}
