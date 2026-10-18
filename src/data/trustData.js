// Central Data Store for RBJJT (राष्ट्रीय बौद्ध जन जागरण ट्रस्ट)

export const TRUST_INFO = {
  nameHi: "राष्ट्रीय बौद्ध जन जागरण ट्रस्ट",
  nameEn: "Rashtriya Bauddha Jan Jagaran Trust",
  shortName: "RBJJT",
  regNo: "Reg. No. 069/16",
  motto: "“उदाहरण तो अपने जीवन से प्रस्तुत करना पड़ता है” — तथागत बुद्ध",
  subMotto: "भवतु सब्ब मंगलं (सबका कल्याण हो)",
  headquarters: "ऋषिपत्तन मार्ग, सारनाथ, वाराणसी, उत्तर प्रदेश - 221007",
  email: "Info@rbjjt.com",
  altEmail: "rbjjt563@gmail.com",
  phone: "+91 8112630563",
  whatsapp: "+918112630563",
  workingHours: "सोमवार - रविवार | प्रातः 07:00 से सायं 07:00 तक",
  bankDetails: {
    bankName: "State Bank of India (SBI)",
    accountHolder: "RASHTRIYA BUDDHA JAN JAGRAN TRUST",
    accountNumber: "35803321944",
    ifsc: "SBIN0004560",
    branch: "AGR Development Branch, Rishipattan Marg, Sarnath, Varanasi, UP - 221007",
    upiId: "rbjjt@sbi", // UPI identifier for QR generation
  },
  socialLinks: {
    facebook: "https://facebook.com/rbjjt",
    youtube: "https://youtube.com/@rbjjt",
    whatsapp: "https://wa.me/918112630563",
  }
};

export const FOUNDER_INFO = {
  name: "पूज्यनीय भिक्खु बुद्ध ज्योति",
  nameEn: "Venerable Bhikkhu Buddha Jyoti",
  title: "संस्थापक एवं मुख्य संरक्षक",
  organization: "राष्ट्रीय बौद्ध जन जागरण ट्रस्ट",
  photo: "https://rbjjt.com/wp-content/uploads/2026/03/Bhnate-Buddha-jyoti-Ji-Official-Photo.png",
  quote: "“मनुष्य अपने कर्मों से ही श्रेष्ठ बनता है, जन्म से नहीं। जब तक समाज के अंतिम व्यक्ति तक शिक्षा, शील और करुणा का प्रकाश नहीं पहुँचेगा, तब तक समतामूलक समाज की कल्पना अधूरी है।”",
  missionText: "भगवान बुद्ध के कल्याणकारी सनातन धर्म को जन-जन तक पहुँचाना, जिससे मनुष्य के भीतर उपजी अज्ञानता व कुरीतियाँ दूर हों और समाज में समता, स्वतंत्रता, न्याय एवं बंधुत्व की भावना स्थापित हो सके।"
};

export const PILLARS = [
  {
    id: "education",
    titleHi: "शिक्षा (Education)",
    titleEn: "Education & Wisdom",
    tagline: "अज्ञानता का अंधकार मिटाकर ज्ञान का दीप जलाना",
    description: "बच्चों को प्रतियोगिता के दौर में असहाय व निर्धन परिवारों के बच्चों को निःशुल्क गुणवत्तापूर्ण शिक्षा दिलवाना, स्टेशनरी व किताबें उपलब्ध कराना और उन्हें उच्च पदों तक पहुँचने के लिए निरंतर प्रेरित करना।",
    points: [
      "असहाय व अनाथ बच्चों के लिए निःशुल्क शिक्षा व्यवस्था",
      "प्रतियोगी परीक्षाओं की तैयारी हेतु मार्गदर्शन व लाइब्रेरी",
      "आधुनिक व नैतिक शिक्षा का सुंदर समन्वय",
      "हर गांव व ब्लॉक स्तर पर अध्ययन केंद्रों की स्थापना"
    ],
    image: "https://rbjjt.com/wp-content/uploads/2026/03/Education-–-शिक्षा​.png",
    icon: "GraduationCap",
    accentColor: "#F59E0B"
  },
  {
    id: "initiation",
    titleHi: "दीक्षा (Initiation)",
    titleEn: "Initiation & Moral Conduct",
    tagline: "पंचशील और अष्टांगिक मार्ग का आत्मसात",
    description: "प्रत्येक मनुष्य के अंदर शील और सदाचार की दीक्षा देकर एक नेक, संवेदनशील और प्रबुद्ध मानव बनने में सहयोग प्रदान करना। आडंबर और अंधविश्वास से मुक्त कर वैज्ञानिक सोच का विकास करना।",
    points: [
      "पंचशील एवं त्रिशरण की सामूहिक दीक्षा कार्यक्रम",
      "नैतिक मूल्यों और सत्य-अहिंसा का दैनिक जीवन में पालन",
      "धम्म दीक्षा प्रमाण-पत्र वितरण",
      "युवाओं में मानसिक जागृति व चरित्र निर्माण"
    ],
    image: "https://rbjjt.com/wp-content/uploads/2025/12/Initiation-दीक्षा.png",
    icon: "Sparkles",
    accentColor: "#E11D48"
  },
  {
    id: "health",
    titleHi: "स्वास्थ्य (Health)",
    titleEn: "Holistic Health & Vipassana",
    tagline: "स्वस्थ तन और शांत मन — सच्चा कल्याण",
    description: "प्राकृतिक चिकित्सा व मनोचिकित्सा अर्थात योग और विपश्यना ध्यान के माध्यम से समाज को शारीरिक व मानसिक दोनों रूपों से निरोगी व तनावमुक्त बनाना।",
    points: [
      "विपश्यना ध्यान शिविरों का नियमित आयोजन",
      "प्राकृतिक व आयुर्वेदिक चिकित्सा परामर्श शिविर",
      "शारीरिक फिटनेस व तंदुरुस्ती हेतु 'फिट विहार'",
      "नशामुक्ति अभियान और मानसिक तनाव प्रबंधन"
    ],
    image: "https://rbjjt.com/wp-content/uploads/2026/03/Swasthy-Rbjjt.png",
    icon: "HeartPulse",
    accentColor: "#10B981"
  },
  {
    id: "sacraments",
    titleHi: "संस्कार (Sacraments)",
    titleEn: "Sacred Buddhist Ceremonies",
    tagline: "सादगी, गरिमा और बौद्ध संस्कारों का पुनर्जागरण",
    description: "उत्तम धार्मिक संस्कार (नामकरण, आवाह-विवाह, गृह प्रवेश, अंतिम संस्कार आदि) के माध्यम से प्रत्येक व्यक्ति व परिवार को धर्मवान, धर्मधर और अंधविश्वास मुक्त बनाना।",
    points: [
      "दहेज-मुक्त बौद्ध रीति-रिवाज से विवाह संस्कार",
      "वैवाहिक पंजीकरण एवं अधिकृत प्रमाण पत्र जारी करना",
      "पारिवारिक कलह निवारण व समरसता बैठकें",
      "धार्मिक संस्कारों में फिजूलखर्ची पर रोक"
    ],
    image: "https://rbjjt.com/wp-content/uploads/2026/08/Sacraments-संस्कार-of-RBJJT.jpeg",
    icon: "HeartHandshake",
    accentColor: "#8B5CF6"
  },
  {
    id: "security",
    titleHi: "सुरक्षा (Security)",
    titleEn: "Self Defense & Protection",
    tagline: "सशक्त नागरिक, सुरक्षित और भयमुक्त समाज",
    description: "आत्मसम्मान व सुरक्षा हेतु मार्शल आर्ट्स, आत्मरक्षा और अन्य विद्याओं द्वारा निर्दोष, कमजोर तथा महिलाओं-बच्चों को सुरक्षा और आत्मविश्वास प्रदान करना।",
    points: [
      "बेटियों व महिलाओं के लिए मार्शल आर्ट्स व आत्मरक्षा प्रशिक्षण",
      "विपत्ति में असहायों की कानूनी व सामाजिक मदद",
      "युवा सुरक्षा वाहिनी का गठन",
      "सकारात्मक ऊर्जा और निडरता का संचार"
    ],
    image: "https://rbjjt.com/wp-content/uploads/2025/12/Security-सुरक्षा-e1768782364226.png",
    icon: "ShieldCheck",
    accentColor: "#0284C7"
  }
];

export const ROADMAP_TARGETS = [
  {
    level: "प्रथम लक्ष्य (Level 1)",
    scope: "प्रत्येक ग्राम स्तर (Village)",
    title: "धर्माचार्य व लघु बुद्ध विहार स्थापना",
    description: "प्रत्येक गांव में धर्माचार्य तैयार करना, जिससे तथागत बुद्ध द्वारा प्रतिपादित धर्म को संस्कारों के माध्यम से जन-जन तक पहुंचाया जा सके। लघु बुद्ध विहार व ध्यान (विपश्यना) केंद्र की स्थापना, जिसका प्रबंधन धर्माचार्य ही संभालेंगे।",
    icon: "Home",
    badge: "ग्राम स्तर"
  },
  {
    level: "द्वितीय लक्ष्य (Level 2)",
    scope: "प्रत्येक 5 ग्राम सभा (5 Gram Sabhas)",
    title: "लघु धम्म केंद्र, साहित्य व फिट विहार",
    description: "पांच ग्राम सभाओं के समूह में एक लघु धम्म केंद्र खुलवाना, धार्मिक पुस्तकें व पूजन सामग्री उपलब्ध कराना और स्वास्थ्य संवर्धन हेतु 'फिट विहार' की स्थापना करना। इसका प्रबंधन केंद्र उपासक या उपासिका करेंगे।",
    icon: "BookOpen",
    badge: "5 ग्राम सभा"
  },
  {
    level: "तृतीय लक्ष्य (Level 3)",
    scope: "ब्लॉक स्तर (Block)",
    title: "ब्लॉक धर्म परिचायक व संस्कार स्कूल",
    description: "सनातन धर्म की समृद्धि व निरंतरता के लिए ब्लॉक स्तर पर 'ब्लॉक धर्म परिचायक' की नियुक्ति करना तथा बच्चों में उत्तम आचरण व धर्म के विकास हेतु विद्यालयों का निर्माण व संचालन करना।",
    icon: "Building2",
    badge: "ब्लॉक स्तर"
  },
  {
    level: "चतुर्थ लक्ष्य (Level 4)",
    scope: "जिला स्तर (District)",
    title: "जिला धर्म परिचायक व इंटर कॉलेज",
    description: "प्रत्येक जिले में एक जिला धर्म परिचायक होंगे जो समस्त ब्लॉक व ग्राम कमेटियों का मार्गदर्शन करेंगे। प्रत्येक जिले में एक इंटर कॉलेज स्थापित होगा, जिसका प्रबंधन जिला परिचायक के मार्गदर्शन में होगा।",
    icon: "Landmark",
    badge: "जिला स्तर"
  },
  {
    level: "पांचवा लक्ष्य (Level 5)",
    scope: "मंडल स्तर (Divisional)",
    title: "उच्च शिक्षण संस्थान (डिग्री, मेडिकल, इंजीनियरिंग)",
    description: "प्रत्येक मंडल में डिग्री कॉलेज, इंजीनियरिंग व मेडिकल कॉलेज खोलना, जिससे आर्थिक रूप से कमजोर व योग्य बच्चों को उच्च शिक्षा का अवसर मिल सके। इसका प्रबंधन मंडल परिचायक करेंगे।",
    icon: "Award",
    badge: "मंडल स्तर"
  }
];

export const LEADERS = [
  {
    name: "प्रदीप मौर्य",
    nameEn: "Pradeep Maurya",
    role: "जिला उपासक (District Upasak)",
    area: "भदोही (Bhadohi, UP)",
    phone: "+91 7800573040",
    photo: "https://rbjjt.com/wp-content/uploads/2026/03/WhatsApp-Image-2025-02-19-at-3.00.48-AM-650x650.jpeg",
    bio: "भदोही जनपद में धम्म प्रचार, विवाह संस्कार और सामाजिक समरसता कार्यक्रमों के मुख्य समन्वयक।"
  },
  {
    name: "संजय कुमार",
    nameEn: "Sanjay Kumar",
    role: "ब्लॉक उपासक (Block Upasak)",
    area: "ब्लॉक इकाई (Block Unit)",
    phone: "+91 7398244210",
    photo: "https://rbjjt.com/wp-content/uploads/2026/07/6-Copy-650x650.png",
    bio: "युवा संगठन, विपश्यना ध्यान शिविर और जन-जागरण अभियानों के कुशल मार्गदर्शक।"
  },
  {
    name: "संजय कुमार मौर्य",
    nameEn: "Sanjay Kumar Maurya",
    role: "जिला उपासक (District Upasak)",
    area: "सोनभद्र (Sonebhadra, UP)",
    phone: "+91 7398244210",
    photo: "https://rbjjt.com/wp-content/uploads/2025/06/pexels-photo-1222271-1222271-scaled-150x150.jpg",
    bio: "सोनभद्र क्षेत्र में धम्म केंद्रों की स्थापना व निःशुल्क बाल शिक्षा प्रकल्प के प्रमुख।"
  }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "बौद्ध संस्कार एवं वैवाहिक रस्में",
    category: "संस्कार",
    image: "https://rbjjt.com/wp-content/uploads/2026/08/Sacraments-संस्कार-of-RBJJT.jpeg",
    desc: "दहेज-मुक्त सादगीपूर्ण बौद्ध विवाह संस्कार व आशीर्वाद समारोह"
  },
  {
    id: 2,
    title: "दीक्षा एवं पंचशील शपथ",
    category: "दीक्षा",
    image: "https://rbjjt.com/wp-content/uploads/2025/12/Initiation-दीक्षा.png",
    desc: "सैकड़ों उपासकों द्वारा शील व सदाचार की पवित्र दीक्षा ग्रहण"
  },
  {
    id: 3,
    title: "सारनाथ मूलगंध कुटी विहार तीर्थ",
    category: "विहार",
    image: "https://rbjjt.com/wp-content/uploads/2026/01/1619887156_mulagandha_kuti_vihar.jpg.webp",
    desc: "पवित्र ऋषिपत्तन सारनाथ में ध्यान साधना एवं धर्म चर्चा"
  },
  {
    id: 4,
    title: "बोधगया महाबोधि बुद्ध प्रतिमा",
    category: "विहार",
    image: "https://rbjjt.com/wp-content/uploads/2026/01/1652464530_cdb65g4upihlrgv02knq6jy3taho_14_80_feet_buddha_statue_bodhgaya.webp",
    desc: "बोधगया में आयोजित राष्ट्रीय बौद्ध जन जागरण सम्मेलन"
  },
  {
    id: 5,
    title: "बाल शिक्षा एवं प्रेरणा कार्यक्रम",
    category: "शिक्षा",
    image: "https://rbjjt.com/wp-content/uploads/2026/03/Education-–-शिक्षा​.png",
    desc: "मेधावी व असहाय बच्चों को निःशुल्क पाठ्य सामग्री वितरण"
  },
  {
    id: 6,
    title: "योग, विपश्यना एवं स्वास्थ्य शिविर",
    category: "स्वास्थ्य",
    image: "https://rbjjt.com/wp-content/uploads/2026/03/Swasthy-Rbjjt.png",
    desc: "प्राकृतिक चिकित्सा व मानसिक शांति हेतु सामूहिक साधना"
  },
  {
    id: 7,
    title: "आत्मरक्षा एवं मार्शल आर्ट्स प्रशिक्षण",
    category: "सुरक्षा",
    image: "https://rbjjt.com/wp-content/uploads/2025/12/Security-सुरक्षा-e1768782364226.png",
    desc: "युवाओं व बहनों के लिए आत्मसम्मान व सुरक्षा कार्यशाला"
  },
  {
    id: 8,
    title: "राजगीर शांति स्तूप यात्रा",
    category: "विहार",
    image: "https://rbjjt.com/wp-content/uploads/2026/01/rajgir-banner3.webp",
    desc: "धम्म यात्रा एवं भिक्खु संघ का विशेष अभिनंदन"
  }
];

export const STATS = [
  { value: "500+", labelHi: "गांवों में धम्म प्रचार", labelEn: "Villages Reached" },
  { value: "1,200+", labelHi: "निःशुल्क शिक्षित बच्चे", labelEn: "Free Educated Children" },
  { value: "450+", labelHi: "सदाचारी दीक्षा संपन्न", labelEn: "Initiations Given" },
  { value: "280+", labelHi: "दहेज-मुक्त विवाह संस्कार", labelEn: "Buddhist Marriages" },
  { value: "35+", labelHi: "धम्म केंद्र व विपश्यना शिविर", labelEn: "Dhamma Centers" },
];

export const INITIAL_RECORDS = [
  {
    id: "REG-2026-001",
    type: "dhammadhikari",
    typeName: "धर्माधिकारी आवेदन",
    name: "रामेश्वर प्रसाद",
    phone: "9876543210",
    district: "वाराणसी",
    state: "उत्तर प्रदेश",
    status: "स्वीकृत (Approved)",
    date: "14-10-2026",
    details: "ग्राम: शिवपुर, शिक्षा: स्नातक, प्रतिज्ञा: शील व धम्म प्रचार हेतु समर्पित।"
  },
  {
    id: "REG-2026-002",
    type: "matrimonial",
    typeName: "विवाह पंजीकरण",
    name: "संगीता गौतम",
    phone: "9123456780",
    district: "भदोही",
    state: "उत्तर प्रदेश",
    status: "प्रतीक्षारत (Pending)",
    date: "16-10-2026",
    details: "वर/वधू: वधू, आयु: 24 वर्ष, शिक्षा: M.A., दहेज-मुक्त बौद्ध संस्कार समर्थक।"
  },
  {
    id: "REG-2026-003",
    type: "diksha",
    typeName: "दीक्षा आवेदन",
    name: "दिनेश कुमार मौर्य",
    phone: "9450123456",
    district: "सोनभद्र",
    state: "उत्तर प्रदेश",
    status: "स्वीकृत (Approved)",
    date: "17-10-2026",
    details: "पंचशील ग्रहण की इच्छा, सारनाथ केंद्र में दीक्षा की तिथि निर्धारित।"
  }
];
