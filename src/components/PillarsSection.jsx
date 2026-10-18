import React, { useState } from 'react';
import { 
  Sparkles, GraduationCap, HeartHandshake, HeartPulse, 
  ShieldCheck, Check, ArrowRight, X, Heart, ExternalLink 
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
          <div className="badge-tag animate-bounce-subtle">
            <Sparkles size={14} />
            <span>पंचशील आधारित पंच आधार स्तंभ</span>
          </div>
          <h2 className="section-title">हमारे 5 मुख्य आधार स्तंभ (Our 5 Pillars)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            शिक्षा, दीक्षा, स्वास्थ्य, संस्कार और सुरक्षा — समाज के सर्वांगीण उत्थान एवं प्रबुद्ध भारत के निर्माण हेतु 5 बुनियादी सेवा स्तंभ।
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="pillars-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.75rem'
        }}>
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="pillar-card">
              {/* Media with Image */}
              <div className="pillar-media">
                <div className="pillar-media-img-wrap">
                  <img 
                    src={pillar.image} 
                    alt={pillar.titleHi}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/icon_no_bg_256.png";
                    }}
                  />
                </div>
                <div className="pillar-icon-badge" style={{ color: pillar.accentColor }}>
                  {getIcon(pillar.icon)}
                </div>
              </div>

              {/* Body */}
              <div className="pillar-body">
                <h3 className="pillar-title" style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>
                  {pillar.titleHi}
                </h3>
                <span className="pillar-tagline" style={{ display: 'block', color: 'var(--color-gold-dark)', fontWeight: 600, fontSize: '0.86rem', marginBottom: '0.65rem' }}>
                  {pillar.tagline}
                </span>
                <p className="pillar-desc" style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {pillar.description}
                </p>

                {/* Key Points */}
                <ul className="pillar-points" style={{ marginBottom: '1.2rem' }}>
                  {pillar.points.slice(0, 3).map((point, idx) => (
                    <li key={idx} className="pillar-point-item" style={{ fontSize: '0.88rem' }}>
                      <Check size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setSelectedPillar(pillar)}
                  className="btn btn-outline-gold btn-sm"
                  style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
                >
                  <span>विस्तार से जानें व फॉर्म भरें</span>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: selectedPillar.accentColor }}>
                  {getIcon(selectedPillar.icon)}
                </div>
                <div>
                  <h3 className="modal-title" style={{ margin: 0 }}>{selectedPillar.titleHi}</h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)' }}>{selectedPillar.tagline}</span>
                </div>
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
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: '220px', marginBottom: '1.25rem' }}>
                <img 
                  src={selectedPillar.image} 
                  alt={selectedPillar.titleHi} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1.25rem', fontSize: '0.98rem' }}>
                {selectedPillar.description}
              </p>

              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 700 }}>
                मुख्य कार्य योजना व विशेषताएं:
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {selectedPillar.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                    <Check size={16} color="var(--color-success)" style={{ flexShrink: 0 }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a 
                  href="#forms" 
                  onClick={() => setSelectedPillar(null)}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  <span>संबंधित ऑनलाइन फॉर्म भरें</span>
                  <ExternalLink size={16} />
                </a>
                <button 
                  onClick={() => { setSelectedPillar(null); if (onOpenDonateModal) onOpenDonateModal(); }} 
                  className="btn btn-gold"
                >
                  <Heart size={16} fill="#FFF" />
                  <span>सहयोग करें</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
