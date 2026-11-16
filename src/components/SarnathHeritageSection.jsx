import React, { useState } from 'react';
import { 
  Sparkles, Landmark, MapPin, Compass, Calendar, Clock, 
  Eye, BookOpen, Heart, ShieldCheck, ChevronRight, X, 
  ExternalLink, Award, Info, CheckCircle2, Copy, Check,
  ScrollText, Flame, Users, Navigation, Train, Plane,
  Phone, MessageCircle, HeartHandshake, Building2
} from 'lucide-react';
import { SARNATH_HERITAGE, TRUST_INFO } from '../data/trustData';

// Local authentic high-res pilgrimage images
import bodhgayaImg from '../assets/pilgrimage/bodhgaya-mahabodhi.jpg';
import sarnathDhamekhStupa from '../assets/sarnath-dhamekh-stupa.jpg';
import sarnathMulagandha from '../assets/sarnath-mulagandha.webp';
import kushinagarImg from '../assets/pilgrimage/kushinagar-parinirvana.jpg';
import lumbiniImg from '../assets/pilgrimage/lumbini-mayadevi.jpg';
import shravastiImg from '../assets/pilgrimage/shravasti-jetavana.jpg';
import rajgirImg from '../assets/pilgrimage/rajgir-shanti-stupa.jpg';
import nalandaImg from '../assets/pilgrimage/nalanda-university.jpg';
import vaishaliImg from '../assets/pilgrimage/vaishali-kolhua.jpg';
import kesariyaImg from '../assets/pilgrimage/kesariya-stupa.jpg';
import sankisaImg from '../assets/pilgrimage/sankisa-elephant.jpg';
import ashokaPillarImg from '../assets/pilgrimage/ashoka-lion-capital.jpg';
import chaukhandiImg from '../assets/pilgrimage/chaukhandi-stupa.jpg';
import samratAshokImg from '../assets/samrat-ashok-portrait.png';

// Authentic Dhammacakkappavattana Sutta (धम्मचक्कप्पवत्तन सुत्त)
const DHAMMACAKKA_SUTTA = {
  titleHi: "धम्मचक्कप्पवत्तन सुत्त (धर्मचक्र प्रवर्तन सूत्र)",
  titlePali: "धम्मचक्कप्पवत्तन सुत्तं",
  location: "पवित्र इसिपतन मृगदाव, सारनाथ (वाराणसी)",
  sub: "तथागत बुद्ध का प्रथम पावन उपदेश • आषाढ़ पूर्णिमा",
  
  pali: [
    {
      heading: "॥ सुत्तारम्भो (सुत्त का आरम्भ) ॥",
      text: "एवं मे सुतं – एकं समयं भगवा बाराणसियं विहरति इसिपतने मिगदाये। तत्र खो भगवा पञ्चवग्गिये भिक्खू आमन्तेसि –"
    },
    {
      heading: "॥ द्वे अन्ता (दो अतियों का त्याग) ॥",
      text: "“द्वेमे, भिक्खवे, अन्ता पब्बजितेन न सेविंतब्बा। कतमे द्वे? यो चायं कामेसु कामसुखल्लिकानुयोगो हीनो गम्मो पोथुज्जनिको अनरियो अनत्थसंहितो, यो चायं अत्तकिलमथानुयोगो दुक्खो अनरियो अनत्थसंहितो।”"
    },
    {
      heading: "॥ मज्झिमा पटिपदा (मध्यम मार्ग) ॥",
      text: "“एते खो, भिक्खवे, उभो अन्ते अनुपगम्म मज्झिमा पटिपदा तथागतेन अभिसम्बुद्धा चक्खुकरणी ज्ञानकरणी उपसमाय अभिञ्ञाय सम्बोधाय निब्बानाय संवत्तति।”"
    },
    {
      heading: "॥ अरियो अट्ठङ्गिको मग्गो (आर्य अष्टांगिक मार्ग) ॥",
      text: "“कतमा च सा, भिक्खवे, मज्झिमा पटिपदा? अयमेव अरियो अट्ठङ्गिको मग्गो, सेय्यथीदं – सम्मादिट्ठि सम्मासङ्कप्पो सम्मावाचा सम्माकम्मन्तो सम्माआजीवो सम्मावायामो सम्मासति सम्मासमाधि।”"
    },
    {
      heading: "॥ चत्तारि अरियसच्चानि (चार आर्य सत्य) ॥",
      text: "“इदं खो पन, भिक्खवे, दुक्खं अरियसच्चं – जातिपि दुक्खा, जरापि दुक्खा, मरणम्पि दुक्खं...\nइदं खो पन, भिक्खवे, दुक्खसमुदयो अरियसच्चं – यायं तण्हा पोनोब्भविका...\nइदं खो पन, भिक्खवे, दुक्खनिरोधो अरियसच्चं – यो तस्सायेव तण्हाय असोसविरागनिरोधो...\nइदं खो पन, भिक्खवे, दुक्खनिरोधगामिनी पटिपदा अरियसच्चं – अयमेव अरियो अट्ठङ्गिको मग्गो।”"
    }
  ],

  hindi: [
    {
      heading: "॥ उपदेश का पावन प्रारंभ ॥",
      text: "ऐसा मैंने सुना – एक समय भगवान बुद्ध वाराणसी के पवित्र ऋषिपत्तन (मृगदाव - वर्तमान सारनाथ) में विहार कर रहे थे। वहाँ भगवान ने अपने पंचवर्गीय भिक्षुओं (कौण्डिन्य, भद्दिय, वप्प, महानाम और अस्सजि) को संबोधित करते हुए यह अमर उपदेश दिया –"
    },
    {
      heading: "॥ दो अतियों (चरम सीमाओं) का त्याग ॥",
      text: "“हे भिक्षुओं! सत्य के खोजी (प्रव्रजित) को जीवन में दो अतियों से बचना चाहिए:\n१. काम-वासनाओं व विषय सुखों में लिप्त होना – जो हीन, ग्राम्य और अनर्थकारी है।\n२. शरीर को व्यर्थ कठोर कष्ट (कायाक्लेश) देना – जो केवल कष्टदायक, दुखद और व्यर्थ है।”"
    },
    {
      heading: "॥ मध्यम मार्ग (मज्झिमा पटिपदा) ॥",
      text: "“इन दोनों अतियों का त्याग कर तथागत ने 'मध्यम मार्ग' (मज्झिमा पटिपदा) की खोज की है, जो प्रज्ञा और ज्ञान चक्षु देने वाला, आंतरिक शांति, संबोधि और निर्वाण की ओर ले जाने वाला है।”"
    },
    {
      heading: "॥ आर्य अष्टांगिक मार्ग (आठ सम्यक अंग) ॥",
      text: "“हे भिक्षुओं! वह मध्यम मार्ग यही 'आर्य अष्टांगिक मार्ग' है:\n१. सम्यक दृष्टि  २. सम्यक संकल्प  ३. सम्यक वाक्  ४. सम्यक कर्म\n५. सम्यक आजीव  ६. सम्यक व्यायाम  ७. सम्यक स्मृति  ८. सम्यक समाधि।”"
    },
    {
      heading: "॥ चार आर्य सत्य (जीवन के शाश्वत सत्य) ॥",
      text: "“हे भिक्षुओं! जगत के शाश्वत सत्य ये चार आर्य सत्य हैं:\n१. दुःख सत्य है – संसार में जन्म, वृद्धावस्था, रोग, मृत्यु, अप्रिय मिलन व प्रिय वियोग दुःख है।\n२. दुःख का कारण सत्य है – तृष्णा, वासना और अविद्या ही दुःख की उत्पत्ति हैं।\n३. दुःख निवारण (निरोध) सत्य है – तृष्णा के पूर्ण त्याग से ही परम शांति (निर्वाण) प्राप्त होती है।\n४. दुःख निवारण का मार्ग सत्य है – यह आर्य अष्टांगिक मार्ग ही दुःखों के अंत का कल्याणकारी मार्ग है।”"
    }
  ]
};

export function SarnathHeritageSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSite, setSelectedSite] = useState(null);
  const [comingSoonSite, setComingSoonSite] = useState(null);
  const [suttaTab, setSuttaTab] = useState('dual'); // 'pali' | 'hindi' | 'dual'
  const [isCopied, setIsCopied] = useState(false);
  const [isSuttaModalOpen, setIsSuttaModalOpen] = useState(false);

  // Tailored object-position so every sacred monument is 100% in the dead center and NEVER cropped!
  const getSiteObjectPosition = (siteId) => {
    switch(siteId) {
      case 'bodhgaya': return 'center 18%';      // Spire/Shikhara of Mahabodhi Temple in full view
      case 'ashoka-pillar': return 'center 8%';  // 4 Lions & Dharmachakra at the top in full view
      case 'sankisa': return 'center 12%';       // Elephant capital atop the pillar in full view
      case 'sarnath': return 'center 22%';       // Dhamekh Stupa dome & body in dead center
      case 'rajgir': return 'center 30%';        // Shanti Stupa dome & pinnacle in center
      case 'chaukhandi': return 'center 22%';    // Octagonal tower in dead center
      case 'lumbini': return 'center 36%';       // Maya Devi Temple in center
      case 'kushinagar': return 'center 50%';    // Reclining Buddha in center
      case 'kesariya': return 'center 45%';      // Stepped stupa in center
      case 'nalanda': return 'center 35%';       // University ruins in center
      case 'vaishali': return 'center 35%';      // Kolhua pillar in center
      case 'shravasti': return 'center 38%';     // Jetavana in center
      default: return 'center center';
    }
  };

  // Helper to resolve verified local image by site ID
  const getSiteImage = (siteId) => {
    switch(siteId) {
      case 'lumbini': return lumbiniImg;
      case 'bodhgaya': return bodhgayaImg;
      case 'sarnath': return sarnathDhamekhStupa;
      case 'rajgir': return rajgirImg;
      case 'shravasti': return shravastiImg;
      case 'vaishali': return vaishaliImg;
      case 'sankisa': return sankisaImg;
      case 'kesariya': return kesariyaImg;
      case 'kushinagar': return kushinagarImg;
      case 'nalanda': return nalandaImg;
      case 'ashoka-pillar': return ashokaPillarImg;
      case 'chaukhandi': return chaukhandiImg;
      default: return sarnathDhamekhStupa;
    }
  };

  const filters = [
    { id: 'all', label: 'सभी प्रमुख तीर्थ स्थल (All)' },
    { id: 'stupa', label: 'स्तूप व स्मारक (Stupas)' },
    { id: 'temple', label: 'मंदिर व महाविहार (Temples)' },
    { id: 'heritage', label: 'पुरातत्व व तपोभूमि (Heritage)' },
  ];

  const filteredSites = SARNATH_HERITAGE.sites.filter(site => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'stupa') return site.category === 'stupa' || site.subCategory === 'stupa';
    if (activeFilter === 'temple') return site.category === 'temple' || site.subCategory === 'temple';
    if (activeFilter === 'heritage') return site.category === 'heritage' || site.subCategory === 'heritage';
    return true;
  });

  const handleCopySutta = () => {
    const textToCopy = `☸ धम्मचक्कप्पवत्तन सुत्त (Dhammacakkappavattana Sutta) - सारनाथ\n\n[पालि मूल पाठ]\n${DHAMMACAKKA_SUTTA.pali.map(p => `${p.heading}\n${p.text}`).join('\n\n')}\n\n[सरल हिन्दी भावार्थ]\n${DHAMMACAKKA_SUTTA.hindi.map(h => `${h.heading}\n${h.text}`).join('\n\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2400);
  };

  const renderFacilityIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen size={18} color="#D97706" />;
      case 'Flame':
        return <Flame size={18} color="#D97706" />;
      case 'Users':
        return <Users size={18} color="#D97706" />;
      case 'HeartHandshake':
        return <HeartHandshake size={18} color="#D97706" />;
      default:
        return <Sparkles size={18} color="#D97706" />;
    }
  };

  const renderTipIcon = (iconName, color = '#7A1414') => {
    switch (iconName) {
      case 'Train':
        return <Train size={18} color={color} />;
      case 'Calendar':
        return <Calendar size={18} color={color} />;
      case 'Clock':
        return <Clock size={18} color={color} />;
      case 'Landmark':
        return <Landmark size={18} color={color} />;
      case 'HeartHandshake':
        return <HeartHandshake size={18} color={color} />;
      case 'ShieldCheck':
        return <ShieldCheck size={18} color={color} />;
      default:
        return <Compass size={18} color={color} />;
    }
  };

  return (
    <section id="sarnath" className="section sarnath-heritage-section">
      <div className="container" style={{ maxWidth: '1440px', padding: '0 1.25rem' }}>
        
        {/* Section Header with Tight Elegant Spacing */}
        <div className="section-header sarnath-section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Sparkles size={14} />
            <span>भगवान बुद्ध के पावन महातीर्थ एवं ऐतिहासिक धरोहर</span>
          </div>
          <h2 className="section-title">पवित्र बौद्ध तीर्थ दर्शन एवं ऐतिहासिक महातीर्थ</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            तथागत बुद्ध के जीवन से जुड़े 12 पावन महातीर्थ: बोधगया (संबोधि), सारनाथ (प्रथम उपदेश), कुशीनगर (महापरिनिर्वाण), लुम्बिनी (जन्मस्थली), श्रावस्ती, राजगीर, नालंदा, वैशाली, केसरिया व संकिसा का सचित्र पावन दर्शन व संपूर्ण प्रामाणिक इतिहास।
          </p>
        </div>

        {/* Featured Sarnath Hero Banner with Detailed History & Visual Sutta Module */}
        <div className="sarnath-grand-banner">
          {/* Left Column: Comprehensive Detailed History of Sarnath */}
          <div className="sarnath-banner-content">
            <div className="sarnath-banner-pill">
              <Landmark size={16} />
              <span>विश्व बौद्ध महातीर्थ • धर्मचक्र प्रवर्तन स्थली • RBJJT केंद्रीय मुख्यालय</span>
            </div>

            <h3 className="sarnath-banner-title">
              “धर्म का पहिया सारनाथ से घूमा, करुणा का प्रकाश सारे जगत में फैला”
            </h3>

            <div className="sarnath-history-narrative">
              <p className="sarnath-banner-desc">
                वाराणसी से मात्र 10 किमी उत्तर-पूर्व में स्थित <strong>ऋषिपत्तन (इसिपतन मृगदाव - वर्तमान सारनाथ)</strong> संपूर्ण मानवता के आध्यात्मिक इतिहास का सर्वोच्च जाग्रत केंद्र है। बोधगया में वैशाख पूर्णिमा को सम्यक सम्बोधि प्राप्त करने के उपरांत तथागत बुद्ध ने ‘सर्वजन हिताय, सर्वजन सुखाय’ की मंगल भावना से 250 किमी की पदयात्रा कर इसी पावन उपवन में पदार्पण किया था।
              </p>

              <p className="sarnath-banner-desc">
                आषाढ़ पूर्णिमा को तथागत ने अपने प्रथम 5 शिष्यों (<strong>पंचवर्गीय भिक्षु: कौण्डिन्य, भद्दिय, वप्प, महानाम, अस्सजि</strong>) को <strong>धम्मचक्कप्पवत्तन सुत्त (धर्मचक्र प्रवर्तन)</strong> का अमर उपदेश देकर मध्यम मार्ग और आर्य अष्टांगिक मार्ग का मार्ग प्रशस्त किया। इसी पावन धरा पर सम्राट अशोक ने प्रसिद्ध <strong>चतुर्मुखी सिंह स्तम्भ</strong> व 24 तीलियों वाला धर्मचक्र स्थापित किया जो आज स्वतंत्र भारत का <strong>आधिकारिक राष्ट्रीय प्रतीक</strong> है।
              </p>

              <p className="sarnath-banner-desc" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                भगवान बुद्ध की इसी ज्ञान ज्योति और पूज्य बाबासाहेब डॉ. बी.आर. अम्बेडकर की 22 प्रतिज्ञाओं को जन-जन तक पहुँचाने हेतु <strong>राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT)</strong> का केंद्रीय मुख्यालय इसी पवित्र धरा पर स्थापित है।
              </p>
            </div>

            {/* 4 Pillars of Sarnath Glory */}
            <div className="sarnath-glory-grid">
              <div className="sarnath-glory-item">
                <span className="glory-icon">☸</span>
                <div>
                  <strong>प्रथम धर्मोपदेश</strong>
                  <span>आषाढ़ पूर्णिमा (Dhammacakka Day)</span>
                </div>
              </div>
              <div className="sarnath-glory-item">
                <span className="glory-icon">👥</span>
                <div>
                  <strong>५ प्रथम शिष्य</strong>
                  <span>कौण्डिन्य, भद्दिय, वप्प, महानाम, अस्सजि</span>
                </div>
              </div>
              <div className="sarnath-glory-item">
                <span className="glory-icon">🏛️</span>
                <div>
                  <strong>धमेख महास्तूप</strong>
                  <span>143 फीट ऊँचा धर्मचक्र का स्मारक</span>
                </div>
              </div>
              <div className="sarnath-glory-item">
                <span className="glory-icon">🇮🇳</span>
                <div>
                  <strong>राष्ट्रीय प्रतीक</strong>
                  <span>अशोक सिंह स्तम्भ व 24 तीलियों का चक्र</span>
                </div>
              </div>
            </div>

            <div className="sarnath-quote-strip">
              <span className="dharma-quote-wheel">☸</span>
              <span>{SARNATH_HERITAGE.motto}</span>
            </div>

            {/* Sutta Trigger Button */}
            <button 
              type="button" 
              onClick={() => setIsSuttaModalOpen(true)}
              className="sutta-open-trigger-btn"
            >
              <div className="sutta-trigger-left">
                <span className="sutta-trigger-wheel">☸</span>
                <div className="sutta-trigger-text">
                  <strong>धम्मचक्कप्पवत्तन सुत्त संपूर्ण पाठ पढ़ें</strong>
                  <span>भगवान बुद्ध का प्रथम उपदेश • पालि गाथा एवं सरल हिन्दी भावार्थ</span>
                </div>
              </div>
              <div className="sutta-trigger-badge">
                <span>संपूर्ण पाठ खोलें</span>
                <ChevronRight size={16} />
              </div>
            </button>
          </div>

          {/* Right Column: Sarnath Visual Frame (Full Height Grand Showcase) */}
          <div className="sarnath-banner-visual">
            <div className="sarnath-visual-frame">
              <img 
                src={sarnathDhamekhStupa} 
                alt="Dhamekh Stupa Sarnath"
                className="sarnath-frame-img"
                style={{ objectPosition: 'center 22%' }}
              />
              <div className="sarnath-frame-top-pill">
                <span>🏛️ सम्राट अशोक कालीन पावन महास्तूप</span>
              </div>
              <div className="sarnath-frame-caption">
                <strong>धमेख स्तूप • पवित्र ऋषिपत्तन (सारनाथ)</strong>
                <span>ऊंचाई: 143 फीट (43.6 मीटर) • भगवान बुद्ध के प्रथम धर्मचक्र प्रवर्तन का शाश्वत पावन प्रतीक</span>
              </div>
            </div>

            {/* Mobile / Tablet Quick Sutta Trigger */}
            <button 
              type="button" 
              onClick={() => setIsSuttaModalOpen(true)}
              className="sutta-mobile-trigger-btn"
            >
              <span style={{ fontSize: '1.2rem', color: 'var(--color-gold)' }}>☸</span>
              <span>धम्मचक्कप्पवत्तन सुत्त संपूर्ण पालि व हिन्दी पाठ पढ़ें</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Filter Navigation Bar matching user's requested tabs */}
        <div className="sarnath-filter-bar">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`sarnath-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
            >
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* 12 Major Buddhist Heritage Sites Grid */}
        <div className="sarnath-sites-grid">
          {filteredSites.map(site => {
            const siteImgSrc = getSiteImage(site.id);
            return (
              <div 
                key={site.id} 
                className="sarnath-site-card"
                onClick={() => setComingSoonSite(site)}
              >
                {/* Image Container with Badges & Location Pill */}
                <div className="site-image-box">
                  {/* Ambient Backdrop - Color matching glow, no void */}
                  <img 
                    src={siteImgSrc} 
                    alt="" 
                    className="site-img-bg" 
                    aria-hidden="true" 
                  />

                  {/* Foreground Image - 100% full view, zero crop, perfectly centered */}
                  <img 
                    src={siteImgSrc} 
                    alt={site.nameHi}
                    className="site-img-main"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = site.fallbackImage || sarnathDhamekhStupa;
                    }}
                  />
                  
                  {/* Top Bar inside Image: Guaranteed No Collisions */}
                  <div className="site-image-top-bar">
                    <div className="site-serial-badge">
                      <span className="serial-num">#{String(site.serialNo).padStart(2, '0')}</span>
                      <span className="serial-stage">{site.stageShort}</span>
                    </div>

                    <span className="site-cat-pill">
                      {site.shortCategory}
                    </span>
                  </div>

                  {/* Location Pill on Bottom-Left */}
                  <div className="site-location-pill">
                    <MapPin size={11} style={{ flexShrink: 0 }} />
                    <span>{site.shortLocation || site.location}</span>
                  </div>
                </div>

                {/* Card Body with Detailed Info & Twin Metadata Boxes */}
                <div className="site-card-body">
                  {/* Metadata Row: Era & Height Side-by-Side (Clean Grid) */}
                  <div className="site-card-top-meta">
                    <div className="site-era-badge" title={site.era}>
                      <Clock size={11} style={{ flexShrink: 0 }} />
                      <span>{site.eraShort || site.era}</span>
                    </div>
                    {site.height && (
                      <div className="site-height-pill" title={site.height}>
                        <Landmark size={11} style={{ flexShrink: 0 }} />
                        <span>{site.heightShort || site.height}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & English Subtitle */}
                  <div className="site-title-container">
                    <h4 className="site-title">{site.nameHi}</h4>
                    <span className="site-title-en">({site.nameEn})</span>
                    <p className="site-subtitle">{site.subtitle}</p>
                  </div>

                  {/* Significance (Clean clamp, logical & verified) */}
                  <p className="site-desc">
                    {site.significance}
                  </p>

                  {/* Highlights Checklist (Exactly 2 clean items) */}
                  {site.highlights && (
                    <div className="site-highlights-box">
                      <span className="highlights-title">प्रमुख दर्शनीय धरोहर:</span>
                      <ul className="site-highlights-list">
                        {site.highlights.slice(0, 2).map((hl, hIdx) => (
                          <li key={hIdx} className="site-highlight-item">
                            <CheckCircle2 size={13} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Transit Information */}
                  {site.transit && (
                    <div className="site-transit-box" title={site.transit}>
                      <Train size={12} style={{ flexShrink: 0, color: 'var(--color-primary)', marginTop: '2px' }} />
                      <span className="transit-text">{site.transitShort || site.transit}</span>
                    </div>
                  )}

                  {/* Interactive Coming Soon Button at Bottom */}
                  <div className="site-card-footer">
                    <button 
                      type="button" 
                      className="site-coming-soon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setComingSoonSite(site);
                      }}
                    >
                      <div className="cs-btn-left">
                        <Clock size={13} className="coming-soon-clock-icon" />
                        <span>विस्तार से दर्शन मार्गदर्शिका</span>
                      </div>
                      <span className="coming-soon-pill-badge">Coming Soon</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sarnath & Buddhist Pilgrimage Guide Section */}
        <div className="sarnath-pilgrimage-box">
          {/* Section Main Header */}
          <div className="pilgrimage-header">
            <div className="pilgrimage-header-title-wrap">
              <div className="pilgrimage-icon-badge">
                <Compass size={24} color="#D97706" />
              </div>
              <div>
                <div className="pilgrimage-super-tag">पावन तपोभूमि एवं तीर्थ सहयोग</div>
                <h3 className="pilgrimage-title">बौद्ध तीर्थ यात्रा मार्गदर्शिका (Pilgrimage Travel Guide)</h3>
                <span className="pilgrimage-subtitle">
                  ऋषिपत्तन सारनाथ एवं समग्र बौद्ध सर्किट (बोधगया, कुशीनगर, लुम्बिनी) आने वाले उपासकों व तीर्थयात्रियों हेतु प्रामाणिक मार्गदर्शिका
                </span>
              </div>
            </div>

            <div className="pilgrimage-hq-pill">
              <MapPin size={15} color="#D97706" />
              <span>केंद्रीय मुख्यालय: ऋषिपत्तन मार्ग, सारनाथ (वाराणसी)</span>
            </div>
          </div>

          {/* FEATURED: Official RBJJT Pilgrim Welcome & Guidance Pavilion */}
          <div className="rbjjt-pilgrim-hq-card">
            <div className="rbjjt-hq-header">
              <div className="rbjjt-hq-brand">
                <div className="rbjjt-hq-emblem-wrap">
                  <span className="rbjjt-hq-wheel">☸</span>
                </div>
                <div>
                  <div className="rbjjt-hq-eyebrow">
                    <span className="hq-official-tag">आधिकारिक केंद्रीय तीर्थ सेवा केंद्र</span>
                    <span className="hq-reg-text">रजि. नं. 069/16 • नीति आयोग UP/2026/0398244 • 12A/80G प्रमाणित</span>
                  </div>
                  <h4 className="rbjjt-hq-title">
                    राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT) - केंद्रीय तीर्थ सेवा एवं मार्गदर्शन केंद्र, सारनाथ
                  </h4>
                  <p className="rbjjt-hq-desc">
                    {SARNATH_HERITAGE.rbjjtCenter.subtitle}
                  </p>
                </div>
              </div>

              <div className="rbjjt-hq-timing-badge">
                <Clock size={14} color="#059669" />
                <span>{SARNATH_HERITAGE.rbjjtCenter.timings}</span>
              </div>
            </div>

            {/* 4 Interactive Facility Cards */}
            <div className="rbjjt-hq-facilities-grid">
              {SARNATH_HERITAGE.rbjjtCenter.facilities.map((fac, fIdx) => (
                <div key={fIdx} className="rbjjt-facility-box">
                  <div className="facility-icon-circle">
                    {renderFacilityIcon(fac.icon)}
                  </div>
                  <div className="facility-content">
                    <h5 className="facility-title">{fac.title}</h5>
                    <p className="facility-desc">{fac.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address & Direct Pilgrim Assistance Bar */}
            <div className="rbjjt-hq-contact-strip">
              <div className="hq-address-info">
                <MapPin size={16} color="#7A1414" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>मुख्यालय पता:</strong> {SARNATH_HERITAGE.rbjjtCenter.address}
                </span>
              </div>

              <div className="hq-action-buttons">
                <a 
                  href={`tel:${SARNATH_HERITAGE.rbjjtCenter.phone}`} 
                  className="hq-contact-btn phone-btn"
                  title="तीर्थ हेल्पलाइन पर सीधे कॉल करें"
                >
                  <Phone size={14} />
                  <span>हेल्पलाइन: {SARNATH_HERITAGE.rbjjtCenter.phone}</span>
                </a>

                <a 
                  href={`https://wa.me/${SARNATH_HERITAGE.rbjjtCenter.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('नमो बुद्धाय! मैं सारनाथ बौद्ध तीर्थ यात्रा एवं RBJJT केंद्र दर्शन हेतु जानकारी चाहता हूँ।')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hq-contact-btn whatsapp-btn"
                  title="व्हाट्सएप पर तीर्थ सहायता प्राप्त करें"
                >
                  <MessageCircle size={14} />
                  <span>व्हाट्सएप तीर्थ सहायता</span>
                </a>

                <a 
                  href="https://maps.google.com/?q=Rishipattan+Marg,+Sarnath,+Varanasi" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hq-contact-btn maps-btn"
                  title="गूगल मैप्स पर रास्ता देखें"
                >
                  <Navigation size={14} />
                  <span>गूगल मैप्स दिशा</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Section Divider with Dhamma wheel */}
          <div className="pilgrimage-section-sep">
            <span className="sep-line"></span>
            <span className="sep-badge">
              <Sparkles size={13} color="#D97706" />
              <span>सारनाथ तीर्थ यात्रा आवश्यक जानकारी (६ मुख्य चरण)</span>
            </span>
            <span className="sep-line"></span>
          </div>

          {/* 6 Rich Pilgrimage Guide Cards Grid */}
          <div className="pilgrimage-grid">
            {SARNATH_HERITAGE.pilgrimageTips.map((tip) => (
              <div key={tip.id} className="pilgrimage-card" style={{ borderTop: `3px solid ${tip.accent || '#7A1414'}` }}>
                <div className="pilgrimage-card-top">
                  <div className="pilgrimage-num-badge" style={{ backgroundColor: tip.accent || '#7A1414' }}>
                    {tip.num}
                  </div>
                  <span className="pilgrimage-category-pill" style={{ color: tip.accent || '#7A1414', borderColor: tip.accent ? `${tip.accent}33` : undefined }}>
                    {tip.badge}
                  </span>
                  <div className="pilgrimage-icon-circle" style={{ backgroundColor: tip.accent ? `${tip.accent}14` : undefined }}>
                    {renderTipIcon(tip.icon, tip.accent || '#7A1414')}
                  </div>
                </div>

                <h5 className="pilgrimage-card-title">{tip.title}</h5>
                {tip.subtitle && (
                  <span className="pilgrimage-card-subtitle">{tip.subtitle}</span>
                )}
                <p className="pilgrimage-card-desc">{tip.desc}</p>
              </div>
            ))}
          </div>

          {/* Sarnath Action Bar */}
          <div className="pilgrimage-action-bar">
            <div className="action-bar-left">
              <ShieldCheck size={22} color="#7A1414" style={{ flexShrink: 0 }} />
              <div>
                <strong>सारनाथ आगमन पर RBJJT केंद्र में सादर स्वागत:</strong>
                <span> बौद्ध तीर्थ यात्रा, ध्यान साधना अथवा धम्म साहित्य सहयोग हेतु हमारे ऋषिपत्तन सारनाथ केंद्र पर पधारें।</span>
              </div>
            </div>

            <div className="action-bar-right">
              <a 
                href="https://maps.google.com/?q=Sarnath,+Varanasi" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                <MapPin size={15} />
                <span>सारनाथ गूगल मैप पर देखें</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Comprehensive Lightbox Modal for Full History & Pilgrimage Guidance */}
        {selectedSite && (
          <div className="sarnath-lightbox-backdrop" onClick={() => setSelectedSite(null)}>
            <div className="sarnath-lightbox-modal" onClick={e => e.stopPropagation()}>
              <button 
                type="button" 
                className="lightbox-close-btn"
                onClick={() => setSelectedSite(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="lightbox-image-wrap">
                <img 
                  src={getSiteImage(selectedSite.id)} 
                  alt={selectedSite.nameHi}
                  className="lightbox-img"
                  style={{ objectPosition: getSiteObjectPosition(selectedSite.id) }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = selectedSite.fallbackImage || sarnathDhamekhStupa;
                  }}
                />
                <span className="lightbox-tag">{selectedSite.tag}</span>
                <div className="lightbox-loc-badge">
                  <MapPin size={12} />
                  <span>{selectedSite.location}</span>
                </div>
              </div>

              <div className="lightbox-content">
                <div className="site-era-badge" style={{ marginBottom: '0.4rem' }}>
                  <Clock size={13} />
                  <span>{selectedSite.era}</span>
                </div>

                <h3 className="lightbox-title">{selectedSite.nameHi}</h3>
                <h4 className="lightbox-sub">{selectedSite.subtitle}</h4>

                {selectedSite.height && (
                  <div className="lightbox-stat-pill">
                    <strong>वास्तुशिल्प / माप:</strong> <span>{selectedSite.height}</span>
                  </div>
                )}

                <div className="lightbox-divider"></div>

                <div className="lightbox-body-text">
                  <h5 style={{ color: '#7A1414', fontWeight: 800, marginBottom: '0.35rem', fontSize: '1.05rem' }}>
                    धार्मिक एवं ऐतिहासिक महत्व:
                  </h5>
                  <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1rem' }}>
                    {selectedSite.significance}
                  </p>

                  {selectedSite.fullHistory && (
                    <>
                      <h5 style={{ color: '#7A1414', fontWeight: 800, marginBottom: '0.35rem', fontSize: '1.05rem' }}>
                        विस्तृत पावन इतिहास एवं संदर्भ:
                      </h5>
                      <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1.25rem' }}>
                        {selectedSite.fullHistory}
                      </p>
                    </>
                  )}

                  {selectedSite.highlights && (
                    <div style={{ background: 'var(--color-bg-alt)', padding: '0.85rem 1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                      <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                        प्रमुख दर्शनीय स्थल एवं विशेषताएं:
                      </strong>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingLeft: 0, margin: 0, listStyle: 'none' }}>
                        {selectedSite.highlights.map((hl, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-main)' }}>
                            <CheckCircle2 size={15} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedSite.transit && (
                    <div style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.25)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
                      <strong style={{ display: 'block', color: 'var(--color-gold-dark)', marginBottom: '0.3rem', fontSize: '0.88rem' }}>
                        पहुँचने का सुगम मार्ग (How to Reach):
                      </strong>
                      <span style={{ fontSize: '0.86rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                        {selectedSite.transit}
                      </span>
                    </div>
                  )}
                </div>

                <div className="lightbox-footer-actions" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedSite.nameHi + ' ' + selectedSite.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm"
                    style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
                  >
                    <MapPin size={15} />
                    <span>गूगल मैप पर लोकेशन देखें</span>
                    <ExternalLink size={13} />
                  </a>

                  <a 
                    href="#forms" 
                    onClick={() => setSelectedSite(null)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
                  >
                    <Sparkles size={15} />
                    <span>तीर्थ यात्रा सहयोग / पंजीकरण</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Sacred Dhammacakkappavattana Sutta Lightbox Modal */}
        {isSuttaModalOpen && (
          <div className="sarnath-lightbox-backdrop" onClick={() => setIsSuttaModalOpen(false)}>
            <div 
              className="sarnath-lightbox-modal sutta-modal-box"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sutta-modal-header">
                <div className="sutta-header-left">
                  <span className="sutta-modal-wheel">☸</span>
                  <div>
                    <h3 className="sutta-modal-title">धम्मचक्कप्पवत्तन सुत्त (Dhammacakkappavattana Sutta)</h3>
                    <span className="sutta-modal-sub">
                      भगवान बुद्ध का प्रथम पावन उपदेश • पवित्र इसिपतन मृगदाव, सारनाथ • आषाढ़ पूर्णिमा
                    </span>
                  </div>
                </div>

                <div className="sutta-modal-actions">
                  <button 
                    type="button" 
                    onClick={handleCopySutta}
                    className="sutta-copy-btn"
                    title="सुत्त पाठ कॉपी करें"
                  >
                    {isCopied ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                    <span>{isCopied ? 'कॉपी हो गया' : 'कॉपी करें'}</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setIsSuttaModalOpen(false)}
                    className="lightbox-close-btn"
                    title="बंद करें"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Language Switcher Tabs */}
              <div className="sutta-tabs-row sutta-modal-tabs">
                <button
                  type="button"
                  onClick={() => setSuttaTab('dual')}
                  className={`sutta-tab-btn ${suttaTab === 'dual' ? 'active' : ''}`}
                >
                  <ScrollText size={14} />
                  <span>पालि + हिन्दी (दोभाषीय Verse-by-Verse)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSuttaTab('pali')}
                  className={`sutta-tab-btn ${suttaTab === 'pali' ? 'active' : ''}`}
                >
                  <span>📿 मूल त्रिपिटक पालि पाठ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSuttaTab('hindi')}
                  className={`sutta-tab-btn ${suttaTab === 'hindi' ? 'active' : ''}`}
                >
                  <span>📖 सरल हिन्दी भावार्थ</span>
                </button>
              </div>

              {/* Sutta Modal Scroll Content - Clean, Generous Typography */}
              <div className="sutta-modal-scroll-body">
                {suttaTab === 'pali' && (
                  <div className="sutta-text-pane pali-pane">
                    <div className="sutta-pane-badge">मूल पालि त्रिपिटक पाठ (Original Pali Text)</div>
                    {DHAMMACAKKA_SUTTA.pali.map((sec, idx) => (
                      <div key={idx} className="sutta-section-block">
                        <h5 className="sutta-block-heading">{sec.heading}</h5>
                        <p className="sutta-block-text pali-text">{sec.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {suttaTab === 'hindi' && (
                  <div className="sutta-text-pane hindi-pane">
                    <div className="sutta-pane-badge">सरल हिन्दी भावार्थ (Hindi Translation & Meaning)</div>
                    {DHAMMACAKKA_SUTTA.hindi.map((sec, idx) => (
                      <div key={idx} className="sutta-section-block">
                        <h5 className="sutta-block-heading">{sec.heading}</h5>
                        <p className="sutta-block-text hindi-text">{sec.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {suttaTab === 'dual' && (
                  <div className="sutta-text-pane dual-pane">
                    <div className="sutta-pane-badge">पालि गाथा एवं सरल हिन्दी भावार्थ (Verse-by-Verse Bilingual)</div>
                    {DHAMMACAKKA_SUTTA.pali.map((sec, idx) => (
                      <div key={idx} className="sutta-dual-card">
                        <h5 className="sutta-block-heading">{sec.heading}</h5>
                        <div className="dual-pali-box">
                          <span className="lang-tag">मूल पालि गाथा:</span>
                          <p className="pali-text">{sec.text}</p>
                        </div>
                        <div className="dual-hindi-box">
                          <span className="lang-tag">सरल हिन्दी भावार्थ:</span>
                          <p className="hindi-text">{DHAMMACAKKA_SUTTA.hindi[idx]?.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer: 8-Fold Path */}
              <div className="sutta-footer-summary sutta-modal-footer">
                <span className="sutta-footer-icon">☸</span>
                <span>
                  <strong>आर्य अष्टांगिक मार्ग:</strong> सम्यक दृष्टि, सम्यक संकल्प, सम्यक वाक्, सम्यक कर्म, सम्यक आजीव, सम्यक व्यायाम, सम्यक स्मृति एवं सम्यक समाधि।
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Coming Soon Modal for Pilgrimage Sites */}
        {comingSoonSite && (
          <div className="sarnath-lightbox-backdrop" onClick={() => setComingSoonSite(null)}>
            <div className="coming-soon-modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="coming-soon-modal-header">
                <div className="coming-soon-icon-wrap">
                  <span className="coming-soon-wheel">☸</span>
                </div>
                <button 
                  type="button" 
                  className="lightbox-close-btn"
                  onClick={() => setComingSoonSite(null)}
                  title="बंद करें"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="coming-soon-modal-body">
                <span className="coming-soon-tag">शीघ्र उपलब्ध • Coming Soon</span>
                <h3 className="coming-soon-title">{comingSoonSite.nameHi}</h3>
                <p className="coming-soon-subtitle">({comingSoonSite.location})</p>
                
                <div className="coming-soon-desc-box">
                  <p>
                    तथागत बुद्ध के इस पावन महातीर्थ का संपूर्ण प्रामाणिक इतिहास, 360° वर्चुअल दर्शन, पुरातत्व साक्ष्य एवं ऑडियो धम्म गाइड डिजिटल रूप में ट्रस्ट के इस आधिकारिक पोर्टल पर <strong>शीघ्र ही उपलब्ध (Coming Soon)</strong> कराई जा रही है।
                  </p>
                </div>

                <div className="coming-soon-features-list">
                  <div className="cs-feat-item">
                    <span>🏛️</span>
                    <div>
                      <strong>360° सचित्र दर्शन</strong>
                      <span>वर्चुअल तीर्थ परिक्रमा</span>
                    </div>
                  </div>
                  <div className="cs-feat-item">
                    <span>🎧</span>
                    <div>
                      <strong>ऑडियो धम्म गाइड</strong>
                      <span>पालि गाथा एवं हिन्दी</span>
                    </div>
                  </div>
                  <div className="cs-feat-item">
                    <span>📜</span>
                    <div>
                      <strong>पुरातत्व शोध पत्र</strong>
                      <span>शिलालेख व इतिहास</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="btn btn-primary cs-close-btn"
                  onClick={() => setComingSoonSite(null)}
                >
                  <span>ठीक है, धन्यवाद (Got It)</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
