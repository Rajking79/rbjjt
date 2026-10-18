import React from 'react';
import { Heart, UserPlus, ArrowRight, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { TRUST_INFO, STATS } from '../data/trustData';

export function Hero({ onOpenDonateModal }) {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Content */}
          <div className="hero-content">
            {/* Top Blessed Tag */}
            <div className="badge-tag">
              <Sparkles size={15} />
              <span>☸️ भवतु सब्ब मंगलं • सर्वजन हिताय, सर्वजन सुखाय</span>
            </div>

            {/* Sacred Quote Card */}
            <div className="hero-quote-card">
              <p>{TRUST_INFO.motto}</p>
            </div>

            {/* Grand Headline */}
            <h1 className="hero-title">
              भगवान बुद्ध के कल्याणकारी <span className="highlight">सनातन धम्म</span> को जन-जन तक पहुँचाना
            </h1>

            {/* Subtext */}
            <p className="hero-desc">
              <strong>राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT)</strong> समाज में शांति, करुणा, मैत्री और समता के महान संदेशों को स्थापित करने के लिए समर्पित है। हमारा संकल्प है कि शिक्षा, दीक्षा, स्वास्थ्य, संस्कार और सुरक्षा के माध्यम से एक प्रबुद्ध भारत का निर्माण हो।
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group">
              <button 
                onClick={onOpenDonateModal} 
                className="btn btn-gold btn-lg pulse-animation"
              >
                <Heart size={20} fill="#FFF" />
                <span>पुण्य लाभ लें (दान करें)</span>
              </button>

              <a href="#forms" className="btn btn-primary btn-lg">
                <UserPlus size={20} />
                <span>धर्माधिकारी बनें</span>
              </a>

              <a href="#pillars" className="btn btn-outline btn-lg">
                <BookOpen size={18} />
                <span>5 मुख्य स्तंभ</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <h3>500+</h3>
                <p>गांवों में धम्म प्रचार</p>
              </div>
              <div className="hero-stat-item">
                <h3>1,200+</h3>
                <p>निःशुल्क शिक्षित बच्चे</p>
              </div>
              <div className="hero-stat-item">
                <h3>280+</h3>
                <p>बौद्ध संस्कार विवाह</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="hero-visual-card">
            <div className="hero-image-aura"></div>
            
            <div className="hero-image-wrapper">
              <img 
                src="https://rbjjt.com/wp-content/uploads/2026/01/1652464530_cdb65g4upihlrgv02knq6jy3taho_14_80_feet_buddha_statue_bodhgaya.webp" 
                alt="Lord Buddha Bodhgaya Statue"
                style={{ width: '100%', height: '480px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://rbjjt.com/wp-content/uploads/2026/01/1619887156_mulagandha_kuti_vihar.jpg.webp";
                }}
              />
              
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(36, 10, 10, 0.85) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem'
              }}>
                <span style={{ color: 'var(--color-gold-light)', fontWeight: 700, fontSize: '0.9rem' }}>
                  ऋषिपत्तन, सारनाथ (वाराणसी)
                </span>
                <h3 style={{ color: '#FFF', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
                  धर्मचक्र प्रवर्तन की पवित्र भूमि
                </h3>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="hero-badge-floating">
              <ShieldCheck size={22} color="var(--color-gold)" />
              <div>
                <span>पंजीकृत ट्रस्ट: {TRUST_INFO.regNo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
