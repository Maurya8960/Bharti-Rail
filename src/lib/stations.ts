export interface Station {
  code: string;
  name: string;
  nameHi: string;
  city: string;
  cityHi: string;
  state: string;
  zone: string;
}

export const STATIONS: Station[] = [
  { code: "NDLS", name: "New Delhi", nameHi: "नई दिल्ली", city: "Delhi", cityHi: "दिल्ली", state: "Delhi", zone: "Northern Railway (NR)" },
  { code: "MMCT", name: "Mumbai Central", nameHi: "मुंबई सेंट्रल", city: "Mumbai", cityHi: "मुंबई", state: "Maharashtra", zone: "Western Railway (WR)" },
  { code: "CSMT", name: "Chhatrapati Shivaji Maharaj Terminus", nameHi: "छत्रपति शिवाजी महाराज टर्मिनस", city: "Mumbai", cityHi: "मुंबई", state: "Maharashtra", zone: "Central Railway (CR)" },
  { code: "HWH", name: "Howrah Junction", nameHi: "हावड़ा जंक्शन", city: "Kolkata", cityHi: "कोलकाता", state: "West Bengal", zone: "Eastern Railway (ER)" },
  { code: "MAS", name: "Chennai Central", nameHi: "चेन्नई सेंट्रल", city: "Chennai", cityHi: "चेन्नई", state: "Tamil Nadu", zone: "Southern Railway (SR)" },
  { code: "SBC", name: "KSR Bengaluru City", nameHi: "केएसआर बेंगलुरु सिटी", city: "Bengaluru", cityHi: "बेंगलुरु", state: "Karnataka", zone: "South Western Railway (SWR)" },
  { code: "ADI", name: "Ahmedabad Junction", nameHi: "अहमदाबाद जंक्शन", city: "Ahmedabad", cityHi: "अहमदाबाद", state: "Gujarat", zone: "Western Railway (WR)" },
  { code: "PUNE", name: "Pune Junction", nameHi: "पुणे जंक्शन", city: "Pune", cityHi: "पुणे", state: "Maharashtra", zone: "Central Railway (CR)" },
  { code: "LKO", name: "Lucknow Charbagh", nameHi: "लखनऊ चारबाग", city: "Lucknow", cityHi: "लखनऊ", state: "Uttar Pradesh", zone: "Northern Railway (NR)" },
  { code: "BSB", name: "Varanasi Junction", nameHi: "वाराणसी जंक्शन", city: "Varanasi", cityHi: "वाराणसी", state: "Uttar Pradesh", zone: "Northern Railway (NR)" },
  { code: "PNBE", name: "Patna Junction", nameHi: "पटना जंक्शन", city: "Patna", cityHi: "पटना", state: "Bihar", zone: "East Central Railway (ECR)" },
  { code: "JP", name: "Jaipur Junction", nameHi: "जयपुर जंक्शन", city: "Jaipur", cityHi: "जयपुर", state: "Rajasthan", zone: "North Western Railway (NWR)" },
  { code: "HYB", name: "Hyderabad Deccan", nameHi: "हैदराबाद डेक्कन", city: "Hyderabad", cityHi: "हैदराबाद", state: "Telangana", zone: "South Central Railway (SCR)" },
  { code: "SC", name: "Secunderabad Junction", nameHi: "सिकंदराबाद जंक्शन", city: "Hyderabad", cityHi: "हैदराबाद", state: "Telangana", zone: "South Central Railway (SCR)" },
  { code: "CNB", name: "Kanpur Central", nameHi: "कानपुर सेंट्रल", city: "Kanpur", cityHi: "कानपुर", state: "Uttar Pradesh", zone: "North Central Railway (NCR)" },
  { code: "GKP", name: "Gorakhpur Junction", nameHi: "गोरखपुर जंक्शन", city: "Gorakhpur", cityHi: "गोरखपुर", state: "Uttar Pradesh", zone: "North Eastern Railway (NER)" },
  { code: "BPL", name: "Bhopal Junction", nameHi: "भोपाल जंक्शन", city: "Bhopal", cityHi: "भोपाल", state: "Madhya Pradesh", zone: "West Central Railway (WCR)" },
  { code: "NGP", name: "Nagpur Junction", nameHi: "नागपुर जंक्शन", city: "Nagpur", cityHi: "नागपुर", state: "Maharashtra", zone: "Central Railway (CR)" },
  { code: "GHY", name: "Guwahati", nameHi: "गुवाहाटी", city: "Guwahati", cityHi: "गुवाहाटी", state: "Assam", zone: "Northeast Frontier Railway (NFR)" },
  { code: "ASR", name: "Amritsar Junction", nameHi: "अमृतसर जंक्शन", city: "Amritsar", cityHi: "अमृतसर", state: "Punjab", zone: "Northern Railway (NR)" },
  { code: "CDG", name: "Chandigarh Junction", nameHi: "चंडीगढ़ जंक्शन", city: "Chandigarh", cityHi: "चंडीगढ़", state: "Chandigarh", zone: "Northern Railway (NR)" },
  { code: "JAT", name: "Jammu Tawi", nameHi: "जम्मू तवी", city: "Jammu", cityHi: "जम्मू", state: "Jammu and Kashmir", zone: "Northern Railway (NR)" },
  { code: "TVC", name: "Thiruvananthapuram Central", nameHi: "तिरुवनंतपुरम सेंट्रल", city: "Thiruvananthapuram", cityHi: "तिरुवनंतपुरम", state: "Kerala", zone: "Southern Railway (SR)" },
  { code: "BBS", name: "Bhubaneswar", nameHi: "भुवनेश्वर", city: "Bhubaneswar", cityHi: "भुवनेश्वर", state: "Odisha", zone: "East Coast Railway (ECoR)" },
  { code: "DLI", name: "Old Delhi Junction", nameHi: "पुरानी दिल्ली जंक्शन", city: "Delhi", cityHi: "दिल्ली", state: "Delhi", zone: "Northern Railway (NR)" },
  { code: "NZM", name: "Hazrat Nizamuddin", nameHi: "हज़रत निज़ामुद्दीन", city: "Delhi", cityHi: "दिल्ली", state: "Delhi", zone: "Northern Railway (NR)" },
  { code: "ANVT", name: "Anand Vihar Terminal", nameHi: "आनंद विहार टर्मिनल", city: "Delhi", cityHi: "दिल्ली", state: "Delhi", zone: "Northern Railway (NR)" },
  { code: "BDTS", name: "Bandra Terminus", nameHi: "बांद्रा टर्मिनस", city: "Mumbai", cityHi: "मुंबई", state: "Maharashtra", zone: "Western Railway (WR)" },
  { code: "SDAH", name: "Sealdah", nameHi: "सियालदह", city: "Kolkata", cityHi: "कोलकाता", state: "West Bengal", zone: "Eastern Railway (ER)" },
  { code: "AGC", name: "Agra Cantt", nameHi: "आगरा कैंट", city: "Agra", cityHi: "आगरा", state: "Uttar Pradesh", zone: "North Central Railway (NCR)" },
  { code: "GWL", name: "Gwalior Junction", nameHi: "ग्वालियर जंक्शन", city: "Gwalior", cityHi: "ग्वालियर", state: "Madhya Pradesh", zone: "North Central Railway (NCR)" },
  { code: "VGLJ", name: "Virangana Lakshmibai Jhansi", nameHi: "वीरांगना लक्ष्मीबाई झांसी", city: "Jhansi", cityHi: "झांसी", state: "Uttar Pradesh", zone: "North Central Railway (NCR)" },
  { code: "PRYJ", name: "Prayagraj Junction", nameHi: "प्रयागराज जंक्शन", city: "Prayagraj", cityHi: "प्रयागराज", state: "Uttar Pradesh", zone: "North Central Railway (NCR)" },
  { code: "SVDK", name: "SMVD Katra", nameHi: "श्री माता वैष्णो देवी कटरा", city: "Katra", cityHi: "कटरा", state: "Jammu and Kashmir", zone: "Northern Railway (NR)" },
  { code: "MAO", name: "Madgaon Junction (Goa)", nameHi: "मडगांव जंक्शन (गोवा)", city: "Madgaon", cityHi: "मडगांव", state: "Goa", zone: "Konkan Railway (KR)" },
  { code: "UDZ", name: "Udaipur City", nameHi: "उदयपुर सिटी", city: "Udaipur", cityHi: "उदयपुर", state: "Rajasthan", zone: "North Western Railway (NWR)" },
];

export const POPULAR_ROUTES = [
  { from: "NDLS", to: "MMCT", fromCity: "New Delhi", fromCityHi: "नई दिल्ली", toCity: "Mumbai", toCityHi: "मुंबई", trainCount: 18, tag: "High Demand", tagHi: "अत्यधिक मांग" },
  { from: "NDLS", to: "BSB", fromCity: "New Delhi", fromCityHi: "नई दिल्ली", toCity: "Varanasi", toCityHi: "वाराणसी", trainCount: 14, tag: "Vande Bharat", tagHi: "वंदे भारत" },
  { from: "MMCT", to: "ADI", fromCity: "Mumbai", fromCityHi: "मुंबई", toCity: "Ahmedabad", toCityHi: "अहमदाबाद", trainCount: 22, tag: "Bullet Corridor", tagHi: "हाई-स्पीड" },
  { from: "HWH", to: "NDLS", fromCity: "Kolkata", fromCityHi: "कोलकाता", toCity: "New Delhi", toCityHi: "नई दिल्ली", trainCount: 16, tag: "Rajdhani Route", tagHi: "राजधानी मार्ग" },
  { from: "SBC", to: "MAS", fromCity: "Bengaluru", fromCityHi: "बेंगलुरु", toCity: "Chennai", toCityHi: "चेन्नई", trainCount: 19, tag: "Express", tagHi: "एक्सप्रेस" },
  { from: "NDLS", to: "SVDK", fromCity: "New Delhi", fromCityHi: "नई दिल्ली", toCity: "Katra (Vaishno Devi)", toCityHi: "कटरा (वैष्णो देवी)", trainCount: 11, tag: "Pilgrimage", tagHi: "तीर्थयात्रा" },
];
