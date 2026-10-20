import React, { useState } from 'react';
import { 
  Sparkles, Quote, Award, Heart, MessageCircle, ArrowRight, 
  GraduationCap, HeartHandshake, Compass, Users, BookOpen, Lightbulb, CheckCircle2
} from 'lucide-react';
import { FOUNDER_INFO, TRUST_INFO } from '../data/trustData';
import logoHD from '../assets/rbjjt-logo-hd.jpg';

export function FounderSection({ onOpenDonateModal }) {
  const [activeTab, setActiveTab] = useState('mission'); // 'mission' | 'milestones' | 'guidance'

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
    <section id="founder" className="section section-alt founder-section-compact">
      <div className="container">
        {/* Sleek, Tight Section Header (No excessive blank margins) */}
        <div className="section-header founder-header-tight">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>मार्गदर्शक एवं आध्यात्मिक प्रेरणास्रोत</span>
          </div>
          <h2 className="section-title">संस्थापक परिचय</h2>
          <div className="title-ornament title-ornament-compact">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            पूज्यनीय भिक्खु बुद्ध ज्योति जी के पावन सानिध्य में समता, शील और प्रबुद्ध भारत निर्माण का महाअभियान
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
            {/* Left Column: Dignified Portrait Card & Core Credentials */}
            <div className="founder-portrait-column">
              {/* Elegant Modern Portrait Card with Golden Aura */}
              <div className="founder-portrait-card">
                <div className="founder-portrait-badge">
                  <span className="dharma-wheel" style={{ fontSize: '0.9rem' }}>☸</span>
                  <span>सारनाथ पीठ</span>
                </div>

                <img 
                  src={FOUNDER_INFO.photo} 
                  alt={FOUNDER_INFO.name} 
                  className="founder-portrait-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/Bhnate-Buddha-jyoti-Ji-Official-Photo-200x300.png";
                  }}
                />

                {/* Subtle Name Overlay on bottom of photo */}
                <div className="founder-portrait-overlay">
                  <h3 className="founder-overlay-name">{FOUNDER_INFO.name} जी</h3>
                  <span className="founder-overlay-role">संस्थापक एवं मुख्य संरक्षक (RBJJT)</span>
                </div>
              </div>

              {/* Compact 2x2 Spiritual Credentials Grid (Non-repetitive) */}
              <div className="founder-stats-compact-grid">
                <div className="founder-stat-pill">
                  <span className="stat-pill-icon">📍</span>
                  <div className="stat-pill-info">
                    <strong>दीक्षा स्थली</strong>
                    <span>सारनाथ (ऋषिपत्तन)</span>
                  </div>
                </div>

                <div className="founder-stat-pill">
                  <span className="stat-pill-icon">☸️</span>
                  <div className="stat-pill-info">
                    <strong>धम्म सेवा</strong>
                    <span>20+ वर्ष निरंतर</span>
                  </div>
                </div>

                <div className="founder-stat-pill">
                  <span className="stat-pill-icon">📜</span>
                  <div className="stat-pill-info">
                    <strong>पंजीयन सं.</strong>
                    <span>069/16 (भारत सरकार)</span>
                  </div>
                </div>

                <div className="founder-stat-pill">
                  <span className="stat-pill-icon">🕊️</span>
                  <div className="stat-pill-info">
                    <strong>जीवन ध्येय</strong>
                    <span>प्रबुद्ध भारत निर्माण</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Wisdom & Impact Profile */}
            <div className="founder-content-column">
              {/* Header Badges */}
              <div className="founder-header-badge-row">
                <div className="founder-top-badge">
                  <Award size={15} color="var(--color-gold)" />
                  <span>आध्यात्मिक मार्गदर्शक एवं प्रबुद्ध भारत के शिल्पकार</span>
                </div>

                <div className="founder-office-badge">
                  <img src={logoHD} alt="RBJJT Emblem" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                  <strong>केंद्रीय कार्यालय सारनाथ</strong>
                </div>
              </div>

              <div className="founder-guru-tagline">
                हजारों भिक्षुओं के गुरु... लाखों उपासकों के पावन पथप्रदर्शक
              </div>

              <h2 className="founder-main-name">
                {FOUNDER_INFO.name} जी
              </h2>

              {/* 3 Distinct, Rich Interactive Tabs */}
              <div className="founder-tabs-bar">
                <button 
                  onClick={() => setActiveTab('mission')}
                  className={`founder-tab-item ${activeTab === 'mission' ? 'active' : ''}`}
                >
                  <Quote size={16} />
                  <span>1. पावन विचार व जीवन दर्शन</span>
                </button>
                <button 
                  onClick={() => setActiveTab('milestones')}
                  className={`founder-tab-item ${activeTab === 'milestones' ? 'active' : ''}`}
                >
                  <Award size={16} />
                  <span>2. सामाजिक क्रांति व उपलब्धियां</span>
                </button>
                <button 
                  onClick={() => setActiveTab('guidance')}
                  className={`founder-tab-item ${activeTab === 'guidance' ? 'active' : ''}`}
                >
                  <Lightbulb size={16} />
                  <span>3. समाज व युवाओं के नाम संदेश</span>
                </button>
              </div>

              {/* TAB 1: Sacred Vision & Philosophy */}
              {activeTab === 'mission' && (
                <div className="animate-fade-in">
                  {/* Ornate Sacred Scroll Quote */}
                  <div className="founder-sacred-scroll">
                    <Quote size={26} color="var(--color-gold)" style={{ opacity: 0.85, marginBottom: '0.35rem', transform: 'rotate(180deg)' }} />
                    <p className="founder-scroll-quote-text">
                      {FOUNDER_INFO.quote}
                    </p>
                    <span className="founder-scroll-author">
                      — पूज्य भिक्खु बुद्ध ज्योति जी के पावन विचार
                    </span>
                  </div>

                  {/* Spiritual Journey Narrative */}
                  <p className="founder-mission-desc">
                    भगवान बुद्ध की प्रथम उपदेश स्थली सारनाथ (ऋषिपत्तन) के पावन सानिध्य में पूज्य भन्ते जी ने अपना संपूर्ण जीवन समाज के वंचितों, निर्धनों और शोषितों के कल्याणार्थ समर्पित किया है। आपका संकल्प है कि समाज का प्रत्येक नागरिक जातिवाद, पाखंड, अशिक्षा और अंधविश्वास के बंधनों को तोड़कर बाबासाहेब डॉ. अम्बेडकर के प्रबुद्ध भारत के स्वप्न को साकार करे।
                  </p>

                  {/* 3 Core Guiding Pillars */}
                  <div className="founder-principles-grid">
                    <div className="founder-principle-card">
                      <div className="founder-principle-header">
                        <span className="principle-icon">📖</span>
                        <h4>स्वावलंबन व विद्यादान</h4>
                      </div>
                      <p>शिक्षा ही वह अस्त्र है जो मनुष्य को अज्ञानता और गरीबी के बंधनों से मुक्त कराता है। हर निर्धन बच्चे तक ज्ञान का दीप जलाना जीवन का ध्येय है।</p>
                    </div>

                    <div className="founder-principle-card">
                      <div className="founder-principle-header">
                        <span className="principle-icon">🕊️</span>
                        <h4>सदाचार व समता भाव</h4>
                      </div>
                      <p>जाति, वर्ण और जन्म के आधार पर नहीं, बल्कि कर्म और नैतिक आचरण के आधार पर श्रेष्ठ समाज का निर्माण करना ही तथागत का सच्चा मार्ग है।</p>
                    </div>

                    <div className="founder-principle-card">
                      <div className="founder-principle-header">
                        <span className="principle-icon">🌿</span>
                        <h4>अंधविश्वास व कुरीति मुक्ति</h4>
                      </div>
                      <p>पाखंड, फिजूलखर्ची और रूढ़ियों को त्यागकर वैज्ञानिक सोच और तर्कशील दृष्टिकोण अपनाना ताकि समाज स्वाभिमान के साथ आगे बढ़ सके।</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Historical Milestones & Concrete Social Impact */}
              {activeTab === 'milestones' && (
                <div className="animate-fade-in">
                  <div className="founder-milestones-grid">
                    <div className="founder-milestone-card">
                      <div className="milestone-badge-top">
                        <HeartHandshake size={20} color="#E11D48" />
                        <span className="milestone-stat">280+ विवाह</span>
                      </div>
                      <h4>दहेज-मुक्त आदर्श सामूहिक विवाह</h4>
                      <p>समाज में दहेज रूपी कुप्रथा और फिजूलखर्ची को समाप्त करने हेतु त्रिरत्न-पंचशील की साक्षी में बिना किसी लेन-देन के सैकड़ों कन्याओं का सम्मानपूर्वक विवाह संपन्न कराया।</p>
                    </div>

                    <div className="founder-milestone-card">
                      <div className="milestone-badge-top">
                        <GraduationCap size={20} color="var(--color-gold)" />
                        <span className="milestone-stat">1,200+ बच्चे</span>
                      </div>
                      <h4>निःशुल्क बाल शिक्षा व संस्कार शालाएं</h4>
                      <p>अत्यंत निर्धन और असहाय परिवारों के बच्चों को मुफ्त पुस्तकें, स्टेशनरी, स्कूल बैग तथा प्रतियोगी परीक्षाओं की तैयारी हेतु निरंतर मार्गदर्शन उपलब्ध कराना।</p>
                    </div>

                    <div className="founder-milestone-card">
                      <div className="milestone-badge-top">
                        <Compass size={20} color="var(--color-success)" />
                        <span className="milestone-stat">100+ शिविर</span>
                      </div>
                      <h4>नशामुक्ति एवं विपश्यना साधना शिविर</h4>
                      <p>शराब, जुआ और नशीले पदार्थों के चंगुल से भटके युवाओं को ध्यान-साधना से जोड़कर नए जीवन की राह दिखाई और परिवारों में सुख-शांति स्थापित की।</p>
                    </div>

                    <div className="founder-milestone-card">
                      <div className="milestone-badge-top">
                        <Users size={20} color="#8B5CF6" />
                        <span className="milestone-stat">500+ गांव</span>
                      </div>
                      <h4>ग्राम धम्म समितियां व चेतना केंद्र</h4>
                      <p>उत्तर प्रदेश, बिहार, मध्य प्रदेश सहित कई राज्यों में गांव-गांव जाकर स्थानीय बौद्ध विहारों को ज्ञान, शिक्षा और सामाजिक समरसता के जीवंत केंद्रों में बदला।</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Guidance & Message to Society */}
              {activeTab === 'guidance' && (
                <div className="animate-fade-in">
                  <div className="founder-guidance-grid">
                    <div className="founder-guidance-card">
                      <div className="guidance-target">
                        <span className="guidance-target-icon">🌟</span>
                        <h4>युवा पीढ़ी के नाम पावन संदेश</h4>
                      </div>
                      <p className="guidance-quote">
                        “अपनी बहुमूल्य ऊर्जा और समय को व्यसनों, आडंबर और सोशल मीडिया के भटकाव में व्यर्थ न गंवाएं। उच्च शिक्षा हासिल करें, तकनीकी ज्ञान में निपुण बनें और समाज के कमजोर वर्गों की मजबूत आवाज बनें।”
                      </p>
                    </div>

                    <div className="founder-guidance-card">
                      <div className="guidance-target">
                        <span className="guidance-target-icon">👨‍👩‍👧‍👦</span>
                        <h4>परिवारों एवं अभिभावकों के नाम संदेश</h4>
                      </div>
                      <p className="guidance-quote">
                        “अपने घरों में तथागत बुद्ध, संत कबीर, ज्योतिबा फुले और बाबासाहेब के विचारों की पुस्तकें रखें। बेटे और बेटी में कोई भेद न करें; बेटियों को शिक्षित, आत्मनिर्भर और सशक्त बनाएं।”
                      </p>
                    </div>

                    <div className="founder-guidance-card">
                      <div className="guidance-target">
                        <span className="guidance-target-icon">🤝</span>
                        <h4>समस्त प्रबुद्ध समाज के नाम संदेश</h4>
                      </div>
                      <p className="guidance-quote">
                        “आपसी मतभेद, ईर्ष्या और फूट को त्यागकर संगठन की शक्ति को पहचानें। जब तक हम संगठित होकर एक-दूसरे के सुख-दुख में सहभागी नहीं बनेंगे, तब तक समाज का सर्वांगीण उत्थान संभव नहीं।”
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="founder-action-buttons">
                <button onClick={onOpenDonateModal} className="btn btn-gold btn-lg pulse-animation">
                  <Heart size={18} fill="#FFF" />
                  <span>पुण्य कार्य में भागीदार बनें (सहयोग दान)</span>
                </button>

                <a 
                  href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namo%20Buddhay%20ji,%20I%20want%20to%20connect%20with%20Bhikkhu%20Buddha%20Jyoti%20Ji`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-lg founder-whatsapp-btn"
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

