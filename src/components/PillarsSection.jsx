import React, { useState } from 'react';
import { 
  Sparkles, GraduationCap, HeartHandshake, HeartPulse, 
  ShieldCheck, Check, ArrowRight, X, Heart 
} from 'lucide-react';
import { PILLARS } from '../data/trustData';

export function PillarsSection({ onOpenDonateModal }) {
  const [selectedPillar, setSelectedPillar] = useState(null);

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'GraduationCap': return <GraduationCap size={24} />;
      case 'Sparkles': return <Sparkles size={24} />;
      case 'HeartPulse': return <HeartPulse size={24} />;
      case 'HeartHandshake': return <HeartHandshake size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  return (
    <section id="pillars" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>पंचशील आधारित पंच आधार स्तंभ</span>
          </div>
          <h2 className="section-title">हमारे 5 मुख्य आधार स्तंभ (Our 5 Pillars)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            राष्ट्रीय बौद्ध जन जागरण ट्रस्ट का संपूर्ण सेवा तंत्र इन 5 बुनियादी स्तंभों पर मजबूती से खड़ा है, जो समाज के सर्वांगीण उत्थान के लिए समर्पित हैं।
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="pillars-grid">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="pillar-card">
              {/* Media with Image */}
              <div className="pillar-media">
                <img 
                  src={pillar.image} 
                  alt={pillar.titleHi}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/icon_no_bg_256.png";
                  }}
                />
                <div className="pillar-icon-badge" style={{ color: pillar.accentColor }}>
                  {getIcon(pillar.icon)}
                </div>
              </div>

              {/* Body */}
              <div className="pillar-body">
                <h3 className="pillar-title">{pillar.titleHi}</h3>
                <span className="pillar-tagline">{pillar.tagline}</span>
                <p className="pillar-desc">{pillar.description}</p>

                {/* Key Points */}
                <ul className="pillar-points">
                  {pillar.points.slice(0, 3).map((point, idx) => (
                    <li key={idx} className="pillar-point-item">
                      <Check size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setSelectedPillar(pillar)}
                  className="btn btn-outline-gold btn-sm"
                  style={{ marginTop: '1.25rem', width: '100%' }}
                >
                  <span>विस्तार से जानें</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Detail Modal */}
      {selectedPillar && (
        <div className="modal-backdrop" onClick={() => setSelectedPillar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: selectedPillar.accentColor }}>
                  {getIcon(selectedPillar.icon)}
                </div>
                <h3 className="modal-title">{selectedPillar.titleHi}</h3>
              </div>
              <button 
                onClick={() => setSelectedPillar(null)}
                className="modal-close-btn"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '220px', marginBottom: '1.5rem' }}>
                <img 
                  src={selectedPillar.image} 
                  alt={selectedPillar.titleHi}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h4 style={{ color: 'var(--color-gold-dark)', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                {selectedPillar.tagline}
              </h4>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {selectedPillar.description}
              </p>

              <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '0.8rem', fontSize: '1.1rem' }}>
                मुख्य कार्य एवं योजनाएँ:
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                {selectedPillar.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.95rem' }}>
                    <Check size={18} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => { setSelectedPillar(null); onOpenDonateModal(); }} 
                  className="btn btn-gold"
                >
                  <Heart size={18} fill="#FFF" />
                  <span>इस प्रकल्प में दान करें</span>
                </button>
                <a 
                  href="#forms" 
                  onClick={() => setSelectedPillar(null)} 
                  className="btn btn-primary"
                >
                  <span>धर्माधिकारी फॉर्म भरें</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
