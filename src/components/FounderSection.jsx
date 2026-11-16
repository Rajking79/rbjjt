import React from 'react';
import { Sparkles, Quote } from 'lucide-react';
import { FOUNDER_INFO, TRUST_INFO } from '../data/trustData';

export function FounderSection({ onOpenDonateModal }) {
  return (
    <section id="founder" className="founder-section-serene">
      <div className="container">
        {/* Section Header */}
        <div className="section-header founder-header-serene">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>मार्गदर्शक एवं आध्यात्मिक प्रेरणास्रोत</span>
          </div>
          <h2 className="section-title">पूज्यनीय भिक्खु बुद्ध ज्योति जी</h2>
          <div className="title-ornament title-ornament-compact">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            संस्थापक एवं मुख्य संरक्षक — राष्ट्रीय बौद्ध जन जागरण ट्रस्ट, सारनाथ (वाराणसी)
          </p>
        </div>

        {/* Masterpiece Spiritual Showcase Card */}
        <div className="founder-card-serene">
          <div className="founder-card-grid">
            {/* Left Column: Portrait & Key Credentials */}
            <div className="founder-photo-col">
              <div className="founder-photo-frame">
                <img 
                  src={FOUNDER_INFO.photo} 
                  alt={FOUNDER_INFO.name} 
                  className="founder-photo-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/Bhnate-Buddha-jyoti-Ji-Official-Photo-200x300.png";
                  }}
                />
                <div className="founder-photo-strip">
                  <strong>{FOUNDER_INFO.name} जी</strong>
                  <span>संस्थापक एवं मुख्य संरक्षक</span>
                </div>
              </div>

              {/* 2 Clean Horizontal Credentials */}
              <div className="founder-cred-stack">
                <div className="founder-cred-badge">
                  <span className="cred-emoji">📜</span>
                  <div className="cred-info">
                    <span className="cred-lbl">अधिकृत पंजीयन</span>
                    <strong className="cred-val">069/16 (भारत सरकार)</strong>
                  </div>
                </div>

                <div className="founder-cred-badge">
                  <span className="cred-emoji">☸️</span>
                  <div className="cred-info">
                    <span className="cred-lbl">धम्म सेवा व साधना</span>
                    <strong className="cred-val">20+ वर्ष निरंतर समता मिशन</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Wisdom, Life Mission & Social Impact */}
            <div className="founder-details-col">
              {/* Spiritual Kicker Tagline */}
              <div className="founder-kicker-tag">
                <span className="kicker-star">✦</span>
                <span>हजारों भिक्षुओं के गुरु • लाखों उपासकों के पावन पथप्रदर्शक</span>
                <span className="kicker-star">✦</span>
              </div>

              {/* Dignified Sacred Quote Box */}
              <div className="founder-quote-banner">
                <Quote size={28} className="founder-quote-glyph" />
                <blockquote className="founder-quote-body">
                  “मनुष्य अपने कर्मों से ही श्रेष्ठ बनता है, जन्म से नहीं। जब तक समाज के अंतिम व्यक्ति तक शिक्षा, शील और करुणा का प्रकाश नहीं पहुँचेगा, तब तक समतामूलक समाज की कल्पना अधूरी है।”
                </blockquote>
                <cite className="founder-quote-attribution">
                  — पूज्य भिक्खु बुद्ध ज्योति जी के पावन विचार
                </cite>
              </div>

              {/* Mission Narrative Paragraph */}
              <p className="founder-narrative-text">
                भगवान बुद्ध की प्रथम उपदेश स्थली सारनाथ (ऋषिपत्तन) के पावन सानिध्य में पूज्य भन्ते जी ने अपना संपूर्ण जीवन समाज के वंचितों, निर्धनों और शोषितों के कल्याणार्थ समर्पित किया है। आपका संकल्प है कि समाज का प्रत्येक नागरिक जातिवाद, पाखंड, अशिक्षा और अंधविश्वास के बंधनों को तोड़कर बाबासाहेब डॉ. अम्बेडकर के प्रबुद्ध भारत के स्वप्न को साकार करे।
              </p>

              {/* 3 Core Impact Highlights */}
              <div className="founder-impact-trio">
                <div className="founder-impact-card">
                  <div className="impact-card-head">
                    <span className="impact-icon">📖</span>
                    <h4>स्वावलंबन व बाल शिक्षा</h4>
                  </div>
                  <p>1,200+ निर्धन बच्चों को निःशुल्क पुस्तकें, शिक्षण सामग्री, संस्कार शालाएं व प्रतियोगी परीक्षा मार्गदर्शन।</p>
                </div>

                <div className="founder-impact-card">
                  <div className="impact-card-head">
                    <span className="impact-icon">💍</span>
                    <h4>दहेज-मुक्त सामूहिक आवाह-विवाह</h4>
                  </div>
                  <p>280+ निर्धन कन्याओं का त्रिरत्न-पंचशील की साक्षी में बिना किसी दहेज के सादगीपूर्ण व सम्मानजनक विवाह।</p>
                </div>

                <div className="founder-impact-card">
                  <div className="impact-card-head">
                    <span className="impact-icon">🕊️</span>
                    <h4>नशामुक्ति व प्रबुद्ध जागरण</h4>
                  </div>
                  <p>100+ विपश्यना साधना शिविर एवं 500+ ग्रामों में तथागत बुद्ध और बाबासाहेब के विचारों का निरंतर प्रचार।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
