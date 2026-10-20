import React, { useState } from 'react';
import { 
  Sparkles, Quote, Award, Heart, MessageCircle, ArrowRight, 
  GraduationCap, ShieldCheck, Sun, Compass, HeartHandshake 
} from 'lucide-react';
import { FOUNDER_INFO, TRUST_INFO } from '../data/trustData';
import logoHD from '../assets/rbjjt-logo-hd.jpg';

export function FounderSection({ onOpenDonateModal }) {
  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'initiatives' | 'virtues'

  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 80;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <section id="founder" className="section section-alt">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Sparkles size={14} />
            <span>मार्गदर्शक एवं आध्यात्मिक प्रेरणास्रोत</span>
          </div>
          <h2 className="section-title">संस्थापक परिचय</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            पूज्यनीय भिक्खु बुद्ध ज्योति जी के पावन मार्गदर्शन में समाज के सर्वांगीण कल्याण, समता और धम्म जागृति का महाभियान
          </p>
        </div>

        {/* Grand Spiritual Founder Showcase Card */}
        <div className="founder-grand-showcase">
          {/* Top Sacred Regal Ribbon */}
          <div className="founder-sacred-ribbon">
            <div className="founder-sacred-ribbon-left">
              <span className="dharma-wheel">☸</span>
              <span>धर्मचक्र प्रवर्तन स्थली, सारनाथ (वाराणसी) • पावन आध्यात्मिक सानिध्य</span>
            </div>
            <div className="founder-sacred-ribbon-right">
              <span>{TRUST_INFO.nameHi}</span>
              <span>•</span>
              <span>{TRUST_INFO.regNo}</span>
            </div>
          </div>

          {/* Main 2-Column Split Body */}
          <div className="founder-split-grid">
            {/* Left Column: Portrait, Halo Frame & Credentials */}
            <div className="founder-portrait-column">
              {/* Arched Halo Frame */}
              <div className="founder-arch-frame animate-float-delayed">
                <img 
                  src={FOUNDER_INFO.photo} 
                  alt={FOUNDER_INFO.name} 
                  className="founder-portrait-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/Bhnate-Buddha-jyoti-Ji-Official-Photo-200x300.png";
                  }}
                />
              </div>

              {/* Golden Plaque */}
              <div className="founder-plaque">
                <h3 className="founder-plaque-name">{FOUNDER_INFO.name}</h3>
                <span className="founder-plaque-title">संस्थापक एवं मुख्य संरक्षक (RBJJT)</span>
              </div>

              {/* Credentials List */}
              <div className="founder-credentials-list">
                <div className="founder-credential-item">
                  <span style={{ fontSize: '1.1rem' }}>📍</span>
                  <span>सारनाथ (ऋषिपत्तन), वाराणसी</span>
                </div>
                <div className="founder-credential-item">
                  <span style={{ fontSize: '1.1rem' }}>☸️</span>
                  <span>20+ वर्ष निरंतर धम्म प्रचार व सेवा</span>
                </div>
                <div className="founder-credential-item">
                  <span style={{ fontSize: '1.1rem' }}>💍</span>
                  <span>दहेज-मुक्त बौद्ध संस्कार विवाह प्रणेता</span>
                </div>
                <div className="founder-credential-item">
                  <span style={{ fontSize: '1.1rem' }}>🎓</span>
                  <span>निःशुल्क बाल शिक्षा व दीक्षा संरक्षक</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Wisdom Profile */}
            <div className="founder-content-column">
              {/* Header Epithet */}
              <div className="founder-header-badge-row">
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--color-gold-soft)',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  color: 'var(--color-gold-dark)',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}>
                  <Award size={16} color="var(--color-gold)" />
                  <span>आध्यात्मिक मार्गदर्शक एवं प्रबुद्ध भारत के शिल्पकार</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  <img src={logoHD} alt="RBJJT Emblem" style={{ width: '22px', height: '22px', borderRadius: '50%' }} />
                  <strong>केंद्रीय कार्यालय सारनाथ</strong>
                </div>
              </div>

              <div className="founder-guru-tagline">
                हजारों भिक्षुओं के गुरु... लाखों श्रद्धालुओं के पथप्रदर्शक
              </div>

              <h2 className="founder-main-name">
                {FOUNDER_INFO.name} जी
              </h2>

              {/* 3 Interactive Wisdom Tabs */}
              <div className="founder-tabs-bar">
                <button 
                  onClick={() => setActiveTab('message')}
                  className={`founder-tab-item ${activeTab === 'message' ? 'active' : ''}`}
                >
                  <Quote size={16} />
                  <span>1. अमृतवाणी व जीवन दर्शन</span>
                </button>
                <button 
                  onClick={() => setActiveTab('initiatives')}
                  className={`founder-tab-item ${activeTab === 'initiatives' ? 'active' : ''}`}
                >
                  <Award size={16} />
                  <span>2. 4 मुख्य सेवा मिशन</span>
                </button>
                <button 
                  onClick={() => setActiveTab('virtues')}
                  className={`founder-tab-item ${activeTab === 'virtues' ? 'active' : ''}`}
                >
                  <Compass size={16} />
                  <span>3. चतुर्विध धम्म स्तम्भ</span>
                </button>
              </div>

              {/* TAB 1: Sacred Message & Vision */}
              {activeTab === 'message' && (
                <div className="animate-fade-in">
                  {/* Ornate Sacred Scroll */}
                  <div className="founder-sacred-scroll">
                    <Quote size={28} color="var(--color-gold)" style={{ opacity: 0.8, marginBottom: '0.35rem', transform: 'rotate(180deg)' }} />
                    <p className="founder-scroll-quote-text">
                      {FOUNDER_INFO.quote}
                    </p>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 700, textAlign: 'right' }}>
                      — पूज्य भिक्खु बुद्ध ज्योति जी के पावन विचार
                    </span>
                  </div>

                  {/* Mission Description */}
                  <p className="founder-mission-desc">
                    भगवान बुद्ध के कल्याणकारी सनातन धर्म, समता, स्वतंत्रता, बंधुत्व और न्याय के महान आदर्शों को जन-जन में प्रतिष्ठित करना ही पूज्य भन्ते जी के जीवन का संकल्प है। आपके पावन मार्गदर्शन में सारनाथ से लेकर पूरे राष्ट्र के सैकड़ों गांवों में शिक्षा, दीक्षा, स्वास्थ्य और संस्कार केंद्रों का निरंतर विस्तार हो रहा है।
                  </p>

                  {/* 4 Core Virtues Strip */}
                  <div className="founder-virtues-strip">
                    <div className="founder-virtue-chip">
                      <div className="founder-virtue-icon" style={{ background: 'rgba(217, 119, 6, 0.12)', color: 'var(--color-gold)' }}>
                        🕊️
                      </div>
                      <div>
                        <span className="founder-virtue-title">शील (Morality)</span>
                        <span className="founder-virtue-sub">पंचशील व नैतिक आचरण</span>
                      </div>
                    </div>

                    <div className="founder-virtue-chip">
                      <div className="founder-virtue-icon" style={{ background: 'rgba(5, 150, 105, 0.12)', color: 'var(--color-success)' }}>
                        🧘
                      </div>
                      <div>
                        <span className="founder-virtue-title">समाधि (Meditation)</span>
                        <span className="founder-virtue-sub">विपश्यना व मानसिक शांति</span>
                      </div>
                    </div>

                    <div className="founder-virtue-chip">
                      <div className="founder-virtue-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3B82F6' }}>
                        💡
                      </div>
                      <div>
                        <span className="founder-virtue-title">प्रज्ञा (Wisdom)</span>
                        <span className="founder-virtue-sub">वैज्ञानिक सोच व अज्ञानमुक्ति</span>
                      </div>
                    </div>

                    <div className="founder-virtue-chip">
                      <div className="founder-virtue-icon" style={{ background: 'rgba(225, 29, 72, 0.12)', color: '#E11D48' }}>
                        🤝
                      </div>
                      <div>
                        <span className="founder-virtue-title">करुणा (Compassion)</span>
                        <span className="founder-virtue-sub">सर्वजन हिताय, सर्वजन सुखाय</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 4 Key Initiatives & Social Reform */}
              {activeTab === 'initiatives' && (
                <div className="animate-fade-in">
                  <div className="founder-initiatives-grid">
                    <div className="founder-initiative-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                        <GraduationCap size={20} color="var(--color-gold)" />
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          निःशुल्क बाल शिक्षा
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        असहाय व निर्धन परिवारों के 1,200+ बच्चों को मुफ्त किताबें, कॉपियां, स्कूल बैग एवं प्रतियोगी परीक्षाओं की तैयारी हेतु मार्गदर्शन।
                      </p>
                    </div>

                    <div className="founder-initiative-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                        <HeartHandshake size={20} color="#E11D48" />
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          दहेज-मुक्त विवाह संस्कार
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        280+ से अधिक बौद्ध परिवारों के विवाह सादगी और त्रिरत्न-पंचशील की साक्षी में संपन्न कराकर समाज में दहेज प्रथा पर प्रहार।
                      </p>
                    </div>

                    <div className="founder-initiative-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                        <Sun size={20} color="var(--color-success)" />
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          विपश्यना व स्वास्थ्य शिविर
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        शारीरिक व मानसिक आरोग्य हेतु 10-दिवसीय विपश्यना ध्यान साधना और प्राकृतिक चिकित्सा के माध्यम से नशामुक्ति जनजागरण।
                      </p>
                    </div>

                    <div className="founder-initiative-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                        <ShieldCheck size={20} color="#8B5CF6" />
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          500+ गांव धम्म केंद्र
                        </h4>
                      </div>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        हर गांव व ब्लॉक स्तर पर धर्माधिकारियों की नियुक्ति तथा स्थानीय बौद्ध विहारों को ज्ञान व संस्कार केंद्र के रूप में विकसित करना।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: 4 Pillars of Dhamma */}
              {activeTab === 'virtues' && (
                <div className="animate-fade-in">
                  <div className="founder-dhamma-pillars-grid">
                    <div className="founder-dhamma-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🕊️</span>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          शील (Pāpa-Viramana)
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                        सदाचार एवं अहिंसा
                      </span>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        हिंसा, चोरी, असत्य, नशा और व्यभिचार से विरत रहकर पवित्र और संवेदनशील जीवन जीना।
                      </p>
                    </div>

                    <div className="founder-dhamma-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🧘</span>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          समाधि (Citta-Bhāvanā)
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                        चित्त एकाग्रता व शांति
                      </span>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        आनापानसति और विपश्यना ध्यान द्वारा मन के विकारों को दूर कर आंतरिक शांति की अनुभूति।
                      </p>
                    </div>

                    <div className="founder-dhamma-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>💡</span>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          प्रज्ञा (Paññā)
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                        सत्य व विवेक दृष्टि
                      </span>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        अंधविश्वास और पाखंड से मुक्ति। वस्तुस्थिति को जैसी है वैसी देखकर प्रबुद्ध निर्णय लेना।
                      </p>
                    </div>

                    <div className="founder-dhamma-card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>🤝</span>
                        <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: 0 }}>
                          करुणा (Mettā-Karuṇā)
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                        मैत्री एवं परोपकार
                      </span>
                      <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                        प्राणी मात्र के प्रति कल्याण भाव और असहाय लोगों के दुखों को दूर करने का निस्वार्थ प्रयास।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="founder-action-buttons">
                <button onClick={onOpenDonateModal} className="btn btn-gold btn-lg pulse-animation">
                  <Heart size={18} fill="#FFF" />
                  <span>पुण्य कार्य में भागीदार बनें (दान)</span>
                </button>

                <a 
                  href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namo%20Buddhay%20ji,%20I%20want%20to%20connect%20with%20Bhikkhu%20Buddha%20Jyoti%20Ji`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg"
                  style={{ borderColor: '#25D366', color: '#15803d', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <MessageCircle size={19} color="#25D366" />
                  <span>भन्ते जी से सीधे व्हाट्सएप परामर्श</span>
                </a>

                <a 
                  href="#pillars" 
                  onClick={(e) => scrollToSection(e, '#pillars')}
                  className="btn btn-outline btn-lg"
                >
                  <span>5 मुख्य आधार देखें</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
