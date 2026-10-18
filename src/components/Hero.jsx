import React from 'react';
import { Heart, UserPlus, Sparkles, BookOpen, ShieldCheck, Play } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { TRUST_INFO } from '../data/trustData';

export function Hero({ onOpenDonateModal, onOpenVideoModal }) {
  const animatedWords = [
    "सनातन धम्म का प्रचार",
    "निःशुल्क बाल शिक्षा",
    "दहेज-मुक्त बौद्ध विवाह",
    "विपश्यना ध्यान व स्वास्थ्य",
    "शील व सदाचार दीक्षा"
  ];

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Content */}
          <div className="hero-content">
            {/* Top Blessed Tag with Floating Glow */}
            <div className="badge-tag animate-bounce-subtle">
              <Sparkles size={14} />
              <span>☸️ भवतु सब्ब मंगलं • सर्वजन हिताय, सर्वजन सुखाय</span>
            </div>

            {/* Sacred Quote Card */}
            <div className="hero-quote-card">
              <p>{TRUST_INFO.motto}</p>
            </div>

            {/* Grand Headline with Dynamic Live Animated Words */}
            <h1 className="hero-title">
              भगवान बुद्ध के कल्याणकारी <br className="hidden-mobile" />
              <span className="highlight-wrapper">
                <TypewriterText words={animatedWords} />
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-desc">
              <strong>राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT - Reg. No. 069/16)</strong> समाज में शांति, करुणा, मैत्री और समता के महान संदेशों को स्थापित करने के लिए समर्पित है। हमारा संकल्प है कि शिक्षा, दीक्षा, स्वास्थ्य, संस्कार और सुरक्षा के माध्यम से एक प्रबुद्ध भारत का निर्माण हो।
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group">
              <button 
                onClick={onOpenDonateModal} 
                className="btn btn-gold btn-lg pulse-animation"
              >
                <Heart size={18} fill="#FFF" />
                <span>पुण्य लाभ लें (दान करें)</span>
              </button>

              <a href="#forms" className="btn btn-primary btn-lg">
                <UserPlus size={18} />
                <span>ऑनलाइन फॉर्म्स</span>
              </a>

              {onOpenVideoModal && (
                <button 
                  onClick={onOpenVideoModal}
                  className="btn btn-outline btn-lg"
                  title="ट्रस्ट का परिचय वीडियो देखें"
                >
                  <Play size={17} fill="currentColor" />
                  <span>ट्रस्ट वीडियो देखें</span>
                </button>
              )}

              <a href="#pillars" className="btn btn-outline btn-lg">
                <BookOpen size={17} />
                <span>5 मुख्य आधार</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <div className="stat-number-wrapper">
                  <h3>500+</h3>
                  <span className="stat-icon-mini">📍</span>
                </div>
                <p>गांवों में धम्म प्रचार</p>
              </div>
              <div className="hero-stat-item">
                <div className="stat-number-wrapper">
                  <h3>1,200+</h3>
                  <span className="stat-icon-mini">🎓</span>
                </div>
                <p>निःशुल्क शिक्षित बच्चे</p>
              </div>
              <div className="hero-stat-item">
                <div className="stat-number-wrapper">
                  <h3>280+</h3>
                  <span className="stat-icon-mini">💍</span>
                </div>
                <p>दहेज-मुक्त संस्कार विवाह</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="hero-visual-card">
            <div className="hero-image-aura"></div>
            
            <div className="hero-visual-container">
              {/* Top Float Badge */}
              <div className="hero-badge-pill animate-float">
                <span className="wheel-spin">☸</span>
                <span>शील • समाधि • प्रज्ञा</span>
              </div>

              {/* Main Statue Frame */}
              <div className="hero-image-wrapper">
                <img 
                  src="https://rbjjt.com/wp-content/uploads/2026/01/1652464530_cdb65g4upihlrgv02knq6jy3taho_14_80_feet_buddha_statue_bodhgaya.webp" 
                  alt="Lord Buddha Bodhgaya Statue"
                  className="hero-main-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/01/1619887156_mulagandha_kuti_vihar.jpg.webp";
                  }}
                />
              </div>

              {/* Clean Integrated Meta Card Under Image */}
              <div className="hero-visual-meta-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.45rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span style={{ fontSize: '1rem' }}>📍</span>
                    <div>
                      <strong style={{ color: 'var(--color-primary)', fontSize: '0.88rem', display: 'block' }}>ऋषिपत्तन, सारनाथ (वाराणसी)</strong>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>धर्मचक्र प्रवर्तन की पावन तीर्थ भूमि</span>
                    </div>
                  </div>
                  <div className="meta-reg-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(217, 119, 6, 0.12)', border: '1px solid rgba(217, 119, 6, 0.35)', color: 'var(--color-gold-dark)', borderRadius: '20px', padding: '3px 10px', fontSize: '0.76rem', fontWeight: 700 }}>
                    <ShieldCheck size={14} color="var(--color-gold)" />
                    <span>{TRUST_INFO.regNo}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--color-bg)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--color-gold)', fontSize: '0.82rem', color: 'var(--color-text-main)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  <span>“इस मन से बड़ा कोई मित्र नहीं... इसे सही दिशा देना ही सच्चा कल्याण है।”</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
