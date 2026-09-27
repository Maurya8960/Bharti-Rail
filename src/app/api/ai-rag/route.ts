import { NextResponse } from "next/server";
import { retrieveRagContext } from "@/lib/ragKnowledge";
import { BOOKING_STORE } from "@/lib/store";
import { TRAINS_DATABASE } from "@/lib/trains";

export async function POST(request: Request) {
  try {
    const { query, language = "auto" } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { success: false, message: "Query text is required." },
        { status: 400 }
      );
    }

    const trimmed = query.trim();
    const lower = trimmed.toLowerCase();

    // 1. Detect language if auto
    let detectedLang: "en" | "hi" | "hinglish" = "en";
    const devanagariRegex = /[\u0900-\u097F]/;
    const hinglishMarkers = ["kya", "hai", "kaise", "bhai", "kitna", "hoga", "karo", "bataye", "mujhe", "ticket", "pehle", "milega", "chahiye", "ansh", "maurya"];

    if (devanagariRegex.test(trimmed)) {
      detectedLang = "hi";
    } else if (hinglishMarkers.some((m) => lower.split(/\s+/).includes(m))) {
      detectedLang = "hinglish";
    } else if (language === "hi" || language === "hinglish") {
      detectedLang = language;
    }

    // 2. Perform RAG Knowledge Base Retrieval
    const ragResult = retrieveRagContext(trimmed, detectedLang);

    // 3. Dynamic Tool Injections: Check for Live PNR inquiry (10 digits)
    const pnrMatch = trimmed.match(/\b\d{10}\b/);
    let livePnrContext: any = null;
    if (pnrMatch) {
      const pnrNum = pnrMatch[0];
      const booking = BOOKING_STORE.get(pnrNum);
      if (booking) {
        livePnrContext = {
          pnr: booking.pnr,
          train: `${booking.trainName} (#${booking.trainNumber})`,
          date: booking.journeyDate,
          status: booking.bookingStatus,
          seats: booking.passengers.map((p) => `${p.name}: Coach ${p.allocatedCoach}, Berth ${p.allocatedBerth} (${p.status})`).join(", "),
        };
      }
    }

    // 4. Generate intelligent AI response based on retrieved RAG context & live data
    let responseText = "";

    // Creator query
    if (lower.includes("ansh") || lower.includes("creator") || lower.includes("developer") || lower.includes("owner") || lower.includes("banaya")) {
      if (detectedLang === "hi") {
        responseText = `नमस्ते! RailModern (BharatRail) प्लेटफॉर्म को **अंश मौर्य (Ansh Maurya)** द्वारा डिज़ाइन एवं विकसित किया गया है। अंश एक सीनियर फुल-स्टैक इंजीनियर हैं। आप उनसे निम्नलिखित माध्यमों से संपर्क कर सकते हैं:\n\n• **LinkedIn:** https://www.linkedin.com/in/anshmaurya89/\n• **GitHub:** https://github.com/Maurya8960\n• **X (Twitter):** https://x.com/maurya1_ansh\n• **YouTube:** https://www.youtube.com/@AnshMaurya-o6j\n• **WhatsApp:** https://wa.me/qr/4M4PQCGRM6LXL1 (+91 94542 47006)\n• **Email:** maurya1.ansh@gmail.com`;
      } else if (detectedLang === "hinglish") {
        responseText = `RailModern ko senior full-stack developer **Ansh Maurya** ne banaya hai. Aap Ansh se connect kar sakte hain:\n\n• **LinkedIn:** https://www.linkedin.com/in/anshmaurya89/\n• **GitHub:** https://github.com/Maurya8960\n• **X (Twitter):** https://x.com/maurya1_ansh\n• **YouTube:** https://www.youtube.com/@AnshMaurya-o6j\n• **WhatsApp:** https://wa.me/qr/4M4PQCGRM6LXL1 (+91 94542 47006)\n• **Email:** maurya1.ansh@gmail.com\n\nNeeche 'Get In Touch' form se bhi aap direct message send kar sakte ho!`;
      } else {
        responseText = `RailModern was architected and built by senior full-stack software engineer **Ansh Maurya**. You can connect with Ansh via:\n\n• **LinkedIn:** https://www.linkedin.com/in/anshmaurya89/\n• **GitHub:** https://github.com/Maurya8960\n• **X (Twitter):** https://x.com/maurya1_ansh\n• **YouTube:** https://www.youtube.com/@AnshMaurya-o6j\n• **WhatsApp:** https://wa.me/qr/4M4PQCGRM6LXL1 (+91 94542 47006)\n• **Email:** maurya1.ansh@gmail.com`;
      }
    } else if (livePnrContext) {
      // Dynamic PNR lookup
      if (detectedLang === "hi") {
        responseText = `🔍 **पीएनआर #${livePnrContext.pnr} की लाइव स्थिति:**\n\n• **ट्रेन:** ${livePnrContext.train}\n• **यात्रा तिथि:** ${livePnrContext.date}\n• **आरक्षण स्थिति:** ${livePnrContext.status === "BOOKED" ? "पुष्ट (CONFIRMED)" : livePnrContext.status}\n• **आवंटित सीट:** ${livePnrContext.seats}\n• **चार्ट स्थिति:** प्रस्थान से 4 घंटे पहले चार्ट तैयार होगा।\n\nआप इस टिकट को ऊपर 'PNR Status' मेनू में भी देख सकते हैं।`;
      } else if (detectedLang === "hinglish") {
        responseText = `🔍 **Aapke PNR #${livePnrContext.pnr} ka Live Status:**\n\n• **Train:** ${livePnrContext.train}\n• **Journey Date:** ${livePnrContext.date}\n• **Booking Status:** ${livePnrContext.status === "BOOKED" ? "CONFIRMED (CNF)" : livePnrContext.status}\n• **Berth Allocation:** ${livePnrContext.seats}\n\nAapka ticket confirm hai aur chart train departure se 4 ghante pehle prepare hoga!`;
      } else {
        responseText = `🔍 **Live Status for PNR #${livePnrContext.pnr}:**\n\n• **Train:** ${livePnrContext.train}\n• **Travel Date:** ${livePnrContext.date}\n• **Status:** ${livePnrContext.status === "BOOKED" ? "CONFIRMED (CNF)" : livePnrContext.status}\n• **Seat Allotment:** ${livePnrContext.seats}\n• **Charting:** First chart will be prepared 4 hours prior to scheduled departure.`;
      }
    } else if (lower.includes("tatkal") || lower.includes("timing") || lower.includes("samay")) {
      // Tatkal rules
      if (detectedLang === "hi") {
        responseText = `⚡ **तत्काल टिकट बुकिंग नियम एवं समय:**\n\n1. **एसी क्लास (1A, 2A, 3A, 3E, CC, EC):** यात्रा तिथि से 1 दिन पहले सुबह **10:00 बजे** खुलती है।\n2. **नॉन-एसी क्लास (स्लीपर, 2S):** यात्रा तिथि से 1 दिन पहले सुबह **11:00 बजे** खुलती है।\n3. **चार्ज:** मूल किराये का 30% (एसी/स्लीपर हेतु)।\n4. **रिफंड नियम:** कन्फर्म तत्काल टिकट कैंसिल करने पर **शून्य (0) रिफंड** मिलता है। RailModern पर 1-क्लिक मास्टर पैसेंजर लिस्ट और इंस्टेंट यूपीआई द्वारा आप 30 सेकंड में तत्काल बुक कर सकते हैं!`;
      } else if (detectedLang === "hinglish") {
        responseText = `⚡ **Tatkal Booking Rules & Timings:**\n\n1. **AC Classes (2A, 3A, CC, 3E, 1A):** Journey date se 1 din pehle subah **10:00 AM** open hoti hai.\n2. **Non-AC Sleeper:** Subah **11:00 AM** open hoti hai.\n3. **Charges:** Basic fare ka 30% tatkal surcharge lagta hai.\n4. **Refund:** Confirm Tatkal ticket cancel karne par **0% refund** milta hai (no refund).\n\nRailModern par Tatkal me master list 1-click me load hoti hai taaki typing ka time bache aur fast booking ho sake!`;
      } else {
        responseText = `⚡ **Tatkal Booking Timings & Guidelines:**\n\n• **AC Classes (1A, 2A, 3A, 3E, CC, EC):** Opens daily at **10:00 AM IST** one day prior to journey date from train origin.\n• **Non-AC Sleeper & 2S:** Opens at **11:00 AM IST** one day prior.\n• **Tatkal Premium:** 30% surcharge on basic fare for Sleeper and AC classes.\n• **Cancellation:** No refund is granted for confirmed Tatkal ticket cancellations.`;
      }
    } else if (lower.includes("cancel") || lower.includes("refund") || lower.includes("paisa") || lower.includes("charge")) {
      // Cancellation rules
      if (detectedLang === "hi") {
        responseText = `📋 **भारतीय रेल टिकट रद्दीकरण एवं रिफंड नियम:**\n\n1. **प्रस्थान से 48 घंटे पूर्व:** फ्लैट कटौती प्रति यात्री:\n   • 1A/EC: ₹240 + GST\n   • 2A: ₹200 + GST\n   • 3A/3E/CC: ₹180 + GST\n   • स्लीपर: ₹120\n   • 2S: ₹60\n2. **12 से 48 घंटे के बीच:** कुल किराये का 25% काटा जाता है।\n3. **4 से 12 घंटे के बीच:** कुल किराये का 50% काटा जाता है।\n4. **4 घंटे से कम या चार्ट बनने के बाद:** कोई रिफंड नहीं मिलता।\n\n*RailModern पर रद्द टिकटों का रिफंड सीधे आपके खाते या RailPay वॉलेट में 60 सेकंड में क्रेडिट होता है!*`;
      } else if (detectedLang === "hinglish") {
        responseText = `📋 **IRCTC Ticket Cancellation & Refund Slabs:**\n\n1. **> 48 Hours pehle cancel karne par:** Flat cancellation charge per passenger:\n   • 1A / EC: ₹240 + GST\n   • 2A: ₹200 + GST\n   • 3A / 3E / CC: ₹180 + GST\n   • Sleeper: ₹120\n2. **12 se 48 Hours ke beech:** 25% fare deduct hota hai.\n3. **4 se 12 Hours ke beech:** 50% fare deduct hota hai.\n4. **< 4 Hours ya Chart banne ke baad:** Zero refund (No refund under IRCTC rules).\n\nRailModern par cancel karne par instant T+0 UPI reversal milta hai, koi 5-7 din ka wait nahi!`;
      } else {
        responseText = `📋 **Official Cancellation & Refund Rules:**\n\n1. **> 48 Hours Before Departure:** Flat clerkage fee per passenger (1A/EC: ₹240, 2A: ₹200, 3A/3E/CC: ₹180, Sleeper: ₹120).\n2. **Between 12 to 48 Hours:** 25% of the fare is deducted (subject to the flat minimum fee).\n3. **Between 4 to 12 Hours:** 50% of the fare is deducted.\n4. **Less than 4 Hours or After Charting:** No refund is admissible under Indian Railways rules.\n\n*On RailModern, refunds are processed instantly via UPI or RailPay wallet within 60 seconds.*`;
      }
    } else {
      // General RAG answer based on retrieved snippets
      const snippetContext = ragResult.matchedSnippets.join("\n\n");
      if (detectedLang === "hi") {
        responseText = `नमस्ते! भारतीय रेल सहायक (RailSahayak AI) में आपका स्वागत है।\n\n${snippetContext}\n\nआप मुझसे तत्काल समय, पीएनआर स्थिति, टिकट रद्दीकरण, वंदे भारत शेड्यूल या ट्रेन नियमों के बारे में हिंदी, हिंग्लिश या अंग्रेजी में कुछ भी पूछ सकते हैं!`;
      } else if (detectedLang === "hinglish") {
        responseText = `Hello! RailSahayak AI me aapka swagat hai.\n\n${snippetContext}\n\nAap mujhse Tatkal timings, live PNR status, cancellation refund calculation, Vande Bharat trains ya berth rules ke baare me pooch sakte ho!`;
      } else {
        responseText = `Hello! Welcome to RailSahayak AI passenger assistant.\n\n${snippetContext}\n\nYou can ask me about Tatkal booking rules, PNR confirmation odds, train cancellation refunds, Vande Bharat schedules, or developer details in English, Hindi, or Hinglish!`;
      }
    }

    return NextResponse.json({
      success: true,
      query: trimmed,
      language: detectedLang,
      response: responseText,
      ragSources: ragResult.documents.map((d) => d.title),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "RAG engine error" },
      { status: 500 }
    );
  }
}
