import React from 'react';
import { 
  ShieldCheck, CheckCircle2, Sparkles, BookOpen, ChevronRight
} from 'lucide-react';
import { LEGAL_CREDENTIALS } from '../data/trustData';

// Completely Unique, Sacred Teachings of Lord Buddha from the Dhammapada (Never used elsewhere on website)
const BUDDHA_UNIQUE_TEACHINGS = [
  {
    id: 'averena',
    accent: 'gold',
    theme: 'शाश्वत सनातन धम्म',
    paliVerse: '“न हि वेरेन वेराणि, सम्मन्तीध कुदाचनं।\nअवेरेन च सम्मन्ति, एस धम्मो सनन्तनो॥”',
    source: 'धम्मपद • गाथा ५',
    hindiMeaning: 'संसार में वैर से कभी वैर शांत नहीं होता; केवल मैत्री और प्रेम से ही वैर शांत होता है।',
    sansthaWork: 'जाति-भेद मिटाकर गांव-गांव सामाजिक समरसता, मैत्री और शांति का प्रसार।'
  },
  {
    id: 'pasannena',
    accent: 'green',
    theme: 'शुद्ध चित्त व सुख',
    paliVerse: '“मनोपुब्बङ्गमा धम्मा, मनोसेट्ठा मनोमया।\nमनसा चे पसन्नेन, भासति वा करोति वा।\nततो नं सुखमन्वेति, छायव अनपायिनी॥”',
    source: 'धम्मपद • गाथा २',
    hindiMeaning: 'जो व्यक्ति शुद्ध व प्रसन्न मन से कार्य करता है, सुख परछाईं की तरह सदा उसके साथ रहता है।',
    sansthaWork: 'विपश्यना ध्यान शिविर, चित्त की शुद्धि, नशामुक्ति और सदाचारी जीवन शैली।'
  },
  {
    id: 'jeyyamattanam',
    accent: 'red',
    theme: 'आत्म-विजय — सच्चा वीर',
    paliVerse: '“यो सहस्सं सहस्सेन, सङ्गामे मानुसे जिने।\nएकञ्च जेय्यमत्तानं, स वे सङ्गामजुत्तमो॥”',
    source: 'धम्मपद • गाथा १०३',
    hindiMeaning: 'लाखों लोगों को जीतने से कहीं श्रेष्ठ वह है जो अपने मन और दुर्गुणों को जीत लेता है।',
    sansthaWork: 'युवाओं में आत्म-संयम, चरित्र-निर्माण, बाल शिक्षा और आत्मरक्षा का प्रशिक्षण।'
  },
  {
    id: 'arogya',
    accent: 'blue',
    theme: 'परम संपदा व सुख',
    paliVerse: '“आरोग्यपरमा लाभा, सन्तुट्ठिपरमं धनं।\nविस्सासपरमा ञाती, निब्बानं परमं सुखं॥”',
    source: 'धम्मपद • गाथा २०४',
    hindiMeaning: 'आरोग्य सबसे बड़ा लाभ है, संतोष सबसे बड़ा धन है, और मन की परम शांति ही सर्वोच्च सुख है।',
    sansthaWork: 'प्राकृतिक स्वास्थ्य शिविर, दहेज-मुक्त आवाह-विवाह और सादगीपूर्ण जीवन।'
  }
];

export function TrustCertificatesSection() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const elem = document.querySelector(id);
    if (elem) {
      const navHeight = 70;
      const top = elem.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="trust-legal" className="section trust-certificates-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <ShieldCheck size={14} />
            <span>सत्यापित वैधानिक पंजीकरण एवं पारदर्शिता</span>
          </div>
          <h2 className="section-title">अधिकृत पंजीकरण एवं वैधानिक मान्यताएं</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT) एक पूर्णतः पंजीकृत, पारदर्शी और भारत सरकार के नीति आयोग द्वारा सत्यापित राष्ट्रीय सामाजिक-आध्यात्मिक संस्था है।
          </p>
        </div>

        {/* 4 Credentials Grid (Centered) */}
        <div className="credentials-grid">
          {LEGAL_CREDENTIALS.map((cred, idx) => (
            <div key={idx} className="credential-card text-center">
              <div className="cred-card-top">
                <div className="cred-icon-box">
                  <ShieldCheck size={26} color="#7A1414" />
                </div>
                <div className="cred-valid-pill">
                  <CheckCircle2 size={13} color="#059669" />
                  <span>{cred.validity}</span>
                </div>
              </div>

              <h4 className="cred-title">{cred.title}</h4>
              
              <div className="cred-reg-box">
                <strong className="cred-reg-number">{cred.regNo}</strong>
              </div>

              <p className="cred-authority">
                <strong>अधिकृत प्राधिकारी:</strong> {cred.authority}
              </p>

              <p className="cred-desc">{cred.desc}</p>
            </div>
          ))}
        </div>

        {/* Sacred Buddha Teachings & Sanstha Work (Clean, Compact & Highly Visible) */}
        <div className="teachings-clean-card">
          {/* Compact Centered Header */}
          <div className="teachings-compact-header">
            <div className="teachings-top-badge">
              <span className="badge-wheel">☸</span>
              <span>धम्मपद के पावन अमृत वचन • संस्था का धम्म कार्य एवं सामाजिक संकल्प</span>
            </div>

            <h3 className="teachings-compact-quote">
              “अप्पमादो अमतपदं, पमादो मच्चुनो पदं”
            </h3>

            <p className="teachings-compact-sub">
              <strong>भावार्थ:</strong> सजगता और सत्कर्म ही अमरत्व का मार्ग है — <strong>धम्मपद (गाथा २१)</strong>
            </p>
          </div>

          {/* 4 Clean, Proportional Cards (No Nested Box Clutter) */}
          <div className="teachings-clean-grid">
            {BUDDHA_UNIQUE_TEACHINGS.map((item, index) => (
              <div key={item.id} className={`clean-teach-item border-${item.accent}`}>
                <div className="item-top-row">
                  <span className="item-num">०{index + 1}</span>
                  <span className="item-theme">{item.theme}</span>
                </div>

                <p className="item-pali-text">{item.paliVerse}</p>
                <span className="item-source">{item.source}</span>

                <div className="item-divider"></div>

                <div className="item-section">
                  <span className="item-label">सरल भावार्थ:</span>
                  <p className="item-hindi-text">{item.hindiMeaning}</p>
                </div>

                <div className="item-section item-work-section">
                  <span className="item-label work-color">
                    <CheckCircle2 size={13} />
                    <span>संस्था का संकल्प:</span>
                  </span>
                  <p className="item-work-text">{item.sansthaWork}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Compact Centered Footer Strip */}
          <div className="teachings-compact-footer">
            <span className="footer-note-text">
              ☸ तथागत बुद्ध के इन पावन वचनों को अपने जीवन और समाज में उतारने हेतु संस्था से जुड़ें:
            </span>

            <div className="footer-btn-row">
              <a 
                href="#pillars" 
                onClick={(e) => scrollTo(e, '#pillars')}
                className="btn btn-outline btn-sm"
              >
                <BookOpen size={14} />
                <span>५ मुख्य आधार</span>
              </a>

              <a 
                href="#forms" 
                onClick={(e) => scrollTo(e, '#forms')}
                className="btn btn-primary btn-sm"
              >
                <Sparkles size={14} />
                <span>धर्माधिकारी बनें (आवेदन)</span>
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
