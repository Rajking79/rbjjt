import React, { useState, useEffect } from 'react';
import { Sparkles, Quote, Award, Heart, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { FOUNDER_INFO, TRUST_INFO } from '../data/trustData';

export function FounderSection({ onOpenDonateModal }) {
  const titles = [
    "हजारों भिक्षुओं के गुरु... लाखों श्रद्धालुओं के मार्गदर्शक",
    "प्रबुद्ध समाज व सनातन धम्म पुनर्जागरण के अग्रदूत",
    "संस्थापक एवं मुख्य संरक्षक — पूज्य भिक्खु बुद्ध ज्योति"
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setTitleIdx((prev) => (prev + 1) % titles.length);
        setFadeState('fade-in');
      }, 300);
    }, 3200);

    return () => clearInterval(timer);
  }, []);

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

        {/* Founder Card with Animations */}
        <div className="founder-card" style={{ maxWidth: '1040px', margin: '0 auto' }}>
          {/* Founder Image Frame */}
          <div className="founder-img-frame animate-float-delayed" style={{ width: '250px', height: '310px', flexShrink: 0, margin: '0 auto', position: 'relative' }}>
            <img 
              src={FOUNDER_INFO.photo} 
              alt={FOUNDER_INFO.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
              padding: '0.65rem 0.5rem',
              background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.92))',
              color: '#FFF',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-light)', fontWeight: 700, letterSpacing: '0.5px' }}>
                {FOUNDER_INFO.title}
              </span>
            </div>
          </div>

          {/* Founder Content */}
          <div className="founder-info-body">
            {/* Dynamic Rotating Title Ticker */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(217, 119, 6, 0.1)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              borderRadius: '20px',
              padding: '4px 12px',
              fontSize: '0.82rem',
              color: 'var(--color-gold-dark)',
              fontWeight: 700,
              marginBottom: '0.65rem'
            }}>
              <Award size={15} color="var(--color-gold)" />
              <span className={`typewriter-text ${fadeState}`} style={{ minHeight: '1.2em' }}>
                {titles[titleIdx]}
              </span>
            </div>

            <h3 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(1.7rem, 2.4vw, 2.2rem)', 
              color: 'var(--color-primary)', 
              fontWeight: 800,
              marginBottom: '0.65rem',
              lineHeight: 1.3
            }}>
              {FOUNDER_INFO.name}
            </h3>

            {/* Inspiring Quote Box with Animation */}
            <div className="founder-quote-box">
              <Quote size={20} style={{ color: 'var(--color-gold)', transform: 'rotate(180deg)', marginBottom: '0.25rem' }} />
              <p style={{ lineHeight: 1.68 }}>{FOUNDER_INFO.quote}</p>
            </div>

            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.72, marginBottom: '1.15rem', fontSize: '0.98rem' }}>
              {FOUNDER_INFO.missionText}
            </p>

            {/* Core Values Badges */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
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

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button onClick={onOpenDonateModal} className="btn btn-gold">
                <Heart size={17} fill="#FFF" />
                <span>पुण्य कार्य में भागीदार बनें</span>
              </button>

              <a 
                href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ borderColor: '#25D366', color: '#15803d', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
              >
                <MessageCircle size={18} color="#25D366" />
                <span>सीधे व्हाट्सएप परामर्श</span>
              </a>

              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, '#about')}
                className="btn btn-outline"
              >
                <span>ट्रस्ट के बारे में जानें</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
