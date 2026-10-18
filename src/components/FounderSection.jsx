import React from 'react';
import { Sparkles, Quote, Award, Heart } from 'lucide-react';
import { FOUNDER_INFO } from '../data/trustData';

export function FounderSection({ onOpenDonateModal }) {
  return (
    <section id="founder" className="section section-alt">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>मार्गदर्शक एवं प्रेरणास्रोत</span>
          </div>
          <h2 className="section-title">संस्थापक परिचय</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            पूज्यनीय भिक्खु बुद्ध ज्योति जी के पावन मार्गदर्शन में समाज के कल्याण और धम्म जागृति का महाभियान
          </p>
        </div>

        {/* Founder Card */}
        <div className="founder-card">
          {/* Founder Image Frame */}
          <div className="founder-img-frame">
            <img 
              src={FOUNDER_INFO.photo} 
              alt={FOUNDER_INFO.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/Bhnate-Buddha-jyoti-Ji-Official-Photo-200x300.png";
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1rem',
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.85))',
              color: '#FFF',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', fontWeight: 700 }}>
                {FOUNDER_INFO.title}
              </span>
            </div>
          </div>

          {/* Founder Content */}
          <div className="founder-info-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-gold-dark)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <Award size={18} />
              <span>{FOUNDER_INFO.organization}</span>
            </div>

            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(1.8rem, 2.5vw, 2.3rem)', 
              color: 'var(--color-primary)', 
              fontWeight: 800,
              marginBottom: '0.8rem' 
            }}>
              {FOUNDER_INFO.name}
            </h3>

            {/* Inspiring Quote Box */}
            <div className="founder-quote-box">
              <Quote size={24} style={{ color: 'var(--color-gold)', transform: 'rotate(180deg)', marginBottom: '0.4rem' }} />
              <p>{FOUNDER_INFO.quote}</p>
            </div>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.2rem', fontSize: '1.02rem' }}>
              {FOUNDER_INFO.missionText}
            </p>

            {/* Core Values Badges */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)' }}>
                ✨ शील (Morality)
              </span>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)' }}>
                🧘 समाधि (Meditation)
              </span>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)' }}>
                💡 प्रज्ञा (Wisdom)
              </span>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)' }}>
                🤝 करुणा व मैत्री (Compassion)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={onOpenDonateModal} className="btn btn-gold">
                <Heart size={18} fill="#FFF" />
                <span>पुण्य कार्य में भागीदार बनें</span>
              </button>
              <a href="#about" className="btn btn-outline">
                <span>ट्रस्ट के बारे में विस्तार से पढ़ें</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
