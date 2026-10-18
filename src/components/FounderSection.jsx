import React from 'react';
import { Sparkles, Quote, Award, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { FOUNDER_INFO, TRUST_INFO } from '../data/trustData';

export function FounderSection({ onOpenDonateModal }) {
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
            पूज्यनीय भिक्खु बुद्ध ज्योति जी के पावन मार्गदर्शन में समाज के सर्वांगीण कल्याण और धम्म जागृति का महाभियान
          </p>
        </div>

        {/* Founder Card with Spacious Dignified Layout */}
        <div className="founder-card" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Founder Image Frame */}
          <div className="founder-img-frame animate-float-delayed">
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
              padding: '0.85rem 0.75rem',
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.92))',
              color: '#FFF',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.88rem', color: 'var(--color-gold-light)', fontWeight: 700, letterSpacing: '0.5px' }}>
                {FOUNDER_INFO.title}
              </span>
            </div>
          </div>

          {/* Founder Content */}
          <div className="founder-info-body">
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              color: 'var(--color-gold-dark)',
              fontWeight: 700,
              fontSize: '0.92rem',
              marginBottom: '0.5rem',
              background: 'var(--color-gold-soft)',
              padding: '5px 14px',
              borderRadius: '25px'
            }}>
              <Award size={18} color="var(--color-gold)" />
              <span>{FOUNDER_INFO.organization} • संस्थापक एवं मुख्य संरक्षक</span>
            </div>

            <div style={{
              color: 'var(--color-gold-dark)',
              fontSize: '0.96rem',
              fontWeight: 600,
              marginBottom: '0.6rem',
              letterSpacing: '0.3px'
            }}>
              हजारों भिक्षुओं के गुरु... लाखों श्रद्धालुओं के मार्गदर्शक
            </div>

            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(2rem, 2.7vw, 2.5rem)', 
              color: 'var(--color-primary)', 
              fontWeight: 800,
              marginBottom: '1rem',
              lineHeight: 1.25
            }}>
              {FOUNDER_INFO.name}
            </h3>

            {/* Inspiring Quote Box */}
            <div className="founder-quote-box">
              <Quote size={22} style={{ color: 'var(--color-gold)', transform: 'rotate(180deg)', marginBottom: '0.35rem', flexShrink: 0 }} />
              <p style={{ margin: 0 }}>{FOUNDER_INFO.quote}</p>
            </div>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.4rem', fontSize: '1.02rem' }}>
              {FOUNDER_INFO.missionText}
            </p>

            {/* Core Values Badges */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)', padding: '0.4rem 0.95rem' }}>
                ✨ शील (Morality)
              </span>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)', padding: '0.4rem 0.95rem' }}>
                🧘 समाधि (Meditation)
              </span>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)', padding: '0.4rem 0.95rem' }}>
                💡 प्रज्ञा (Wisdom)
              </span>
              <span className="badge-tag" style={{ margin: 0, backgroundColor: 'var(--color-surface)', padding: '0.4rem 0.95rem' }}>
                🤝 करुणा व मैत्री (Compassion)
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.95rem', flexWrap: 'wrap' }}>
              <button onClick={onOpenDonateModal} className="btn btn-gold btn-lg">
                <Heart size={18} fill="#FFF" />
                <span>पुण्य कार्य में भागीदार बनें</span>
              </button>

              <a 
                href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
                style={{ borderColor: '#25D366', color: '#15803d', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <MessageCircle size={19} color="#25D366" />
                <span>सीधे व्हाट्सएप परामर्श</span>
              </a>

              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, '#about')}
                className="btn btn-outline btn-lg"
              >
                <span>ट्रस्ट के बारे में जानें</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
