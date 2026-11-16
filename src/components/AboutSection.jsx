import React, { useState } from 'react';
import { 
  Sparkles, GraduationCap, HeartHandshake, HeartPulse, 
  ShieldCheck, Check, ArrowRight, X, Heart, ExternalLink,
  Home, BookOpen, Building2, Landmark, Award, ArrowDown, UserCheck
} from 'lucide-react';
import { PILLARS, ROADMAP_TARGETS } from '../data/trustData';

export function AboutSection({ onOpenDonateModal }) {
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const getPillarIcon = (iconName) => {
    switch(iconName) {
      case 'GraduationCap': return <GraduationCap size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'HeartPulse': return <HeartPulse size={22} />;
      case 'HeartHandshake': return <HeartHandshake size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  const getRoadmapIcon = (iconName) => {
    switch(iconName) {
      case 'Home': return <Home size={22} />;
      case 'BookOpen': return <BookOpen size={22} />;
      case 'Building2': return <Building2 size={22} />;
      case 'Landmark': return <Landmark size={22} />;
      case 'Award': return <Award size={22} />;
      default: return <Award size={22} />;
    }
  };

  return (
    <section id="pillars" className="section section-alt" style={{ position: 'relative', paddingTop: '2.5rem', paddingBottom: '1.25rem' }}>
      <div id="about" style={{ position: 'absolute', top: 0 }}></div>
      <div id="roadmap" style={{ position: 'absolute', top: 0 }}></div>

      <div className="container" style={{ maxWidth: '1480px', padding: '0 1.25rem' }}>
        
        {/* =========================================================
            SECTION HEADER: हमारे 5 मुख्य आधार स्तंभ (Our 5 Pillars)
           ========================================================= */}
        <div className="section-header" style={{ marginBottom: '2.25rem' }}>
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

        {/* =========================================================
            ROW 1: हमारे 5 मुख्य आधार स्तंभ (5 Pillars Cards - With Images)
           ========================================================= */}
        <div className="pillars-five-row">
          {PILLARS.map((pillar) => (
            <div key={pillar.id} className="pillar-five-card">
              
              {/* Media with Image */}
              <div className="pillar-five-media">
                <img 
                  src={pillar.image} 
                  alt={pillar.titleHi}
                  style={{ objectPosition: 'center center' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/icon_no_bg_256.png";
                  }}
                />
                <div className="pillar-five-badge" style={{ color: pillar.accentColor }}>
                  {getPillarIcon(pillar.icon)}
                </div>
              </div>

              {/* Body */}
              <div className="pillar-five-body">
                <div className="pillar-five-header">
                  <h3 className="pillar-five-title">
                    {pillar.titleHi}
                  </h3>
                  <span className="pillar-five-sub">
                    ({pillar.titleEn})
                  </span>
                </div>

                <span className="pillar-five-tagline">
                  {pillar.tagline}
                </span>

                <p className="pillar-five-desc">
                  {pillar.shortDesc || pillar.description}
                </p>

                {/* Key Points */}
                <ul className="pillar-five-points">
                  {(pillar.keyPills || pillar.points.slice(0, 2)).map((point, pIdx) => (
                    <li key={pIdx} className="pillar-five-point-item">
                      <Check size={14} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setSelectedPillar(pillar)}
                  className="btn btn-outline-gold btn-sm pillar-five-btn"
                >
                  <span>विस्तार से जानें व फॉर्म भरें</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* =========================================================
            DOWNWARD ARROWS CONNECTOR ROW (नीचे का तीर - 5 Columns)
           ========================================================= */}
        <div className="pillars-arrows-row">
          {ROADMAP_TARGETS.map((target, idx) => (
            <div key={idx} className="pillar-arrow-col">
              <div className="arrow-col-line"></div>
              <div 
                className="arrow-col-bubble"
                style={{ borderColor: target.accentColor, color: target.accentColor }}
              >
                <ArrowDown size={17} className="arrow-bounce-down" />
                <span className="arrow-col-text">Level {target.levelNum} क्रियान्वयन</span>
              </div>
              <div className="arrow-col-line"></div>
            </div>
          ))}
        </div>

        {/* =========================================================
            ROW 2: 5-स्तरीय धरातलीय कार्य योजना (NO IMAGES - Pure Clean Cards)
           ========================================================= */}
        <div className="pillars-five-row">
          {ROADMAP_TARGETS.map((target, idx) => (
            <div 
              key={target.id || idx} 
              className="pillar-five-card roadmap-clean-card"
              style={{ borderTop: `4px solid ${target.accentColor}` }}
            >
              
              {/* Mobile Only: Downward Arrow Pill */}
              <div className="roadmap-mobile-arrow-pill" style={{ color: target.accentColor }}>
                <ArrowDown size={14} className="arrow-bounce-down" />
                <span>स्तंभ {idx + 1} ({PILLARS[idx]?.titleHi}) का धरातलीय क्रियान्वयन</span>
              </div>

              {/* Clean Top Header Capsule matching exact design: Level, Scope & Icon (NO IMAGE) */}
              <div 
                className="roadmap-no-img-header"
                style={{ background: `linear-gradient(135deg, ${target.accentColor}12, rgba(217, 119, 6, 0.08))` }}
              >
                <div className="roadmap-scope-capsule">
                  <span className="capsule-num" style={{ background: target.accentColor }}>{idx + 1}</span>
                  <span className="capsule-text">{target.scope}</span>
                  <span className="capsule-icon" style={{ color: target.accentColor }}>
                    {getRoadmapIcon(target.icon)}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="pillar-five-body">
                <div className="pillar-five-header">
                  <span className="roadmap-level-tag" style={{ color: target.accentColor, fontWeight: 700, fontSize: '0.85rem' }}>
                    {target.level}
                  </span>
                  <h3 className="pillar-five-title roadmap-card-title">
                    {target.title}
                  </h3>
                  <span className="pillar-five-sub">
                    ({target.titleEn})
                  </span>
                </div>

                {/* Management Note */}
                <div className="roadmap-mgmt-box">
                  <span className="mgmt-lbl">प्रबंधन:</span>
                  <span className="mgmt-txt">{target.management}</span>
                </div>

                <p className="pillar-five-desc">
                  {target.description || target.shortDesc}
                </p>

                {/* Key Points */}
                <ul className="pillar-five-points">
                  {target.points.map((pt, pIdx) => (
                    <li key={pIdx} className="pillar-five-point-item">
                      <Check size={14} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setSelectedRoadmap(target)}
                  className="btn btn-outline-gold btn-sm pillar-five-btn"
                >
                  <span>विस्तार से जानें व आवेदन करें</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* =========================================================
          PILLAR DETAIL MODAL
         ========================================================= */}
      {selectedPillar && (
        <div className="modal-backdrop" onClick={() => setSelectedPillar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: selectedPillar.accentColor }}>
                  {getPillarIcon(selectedPillar.icon)}
                </div>
                <div>
                  <h3 className="modal-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                    {selectedPillar.titleHi} ({selectedPillar.titleEn})
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                    {selectedPillar.tagline}
                  </span>
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/03/icon_no_bg_256.png";
                  }}
                />
              </div>

              <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1.25rem', fontSize: '0.96rem' }}>
                {selectedPillar.description}
              </p>

              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 700 }}>
                मुख्य कार्य योजना व विशेषताएं:
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {selectedPillar.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                    <Check size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a 
                  href="#forms" 
                  onClick={() => setSelectedPillar(null)}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
                >
                  <span>संबंधित ऑनलाइन फॉर्म भरें</span>
                  <ExternalLink size={16} />
                </a>
                {onOpenDonateModal && (
                  <button 
                    onClick={() => { setSelectedPillar(null); onOpenDonateModal(); }} 
                    className="btn btn-gold"
                  >
                    <Heart size={16} fill="#FFF" />
                    <span>सहयोग करें</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          ROADMAP DETAIL MODAL
         ========================================================= */}
      {selectedRoadmap && (
        <div className="modal-backdrop" onClick={() => setSelectedRoadmap(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: selectedRoadmap.accentColor }}>
                  {getRoadmapIcon(selectedRoadmap.icon)}
                </div>
                <div>
                  <h3 className="modal-title" style={{ margin: 0, fontSize: '1.25rem' }}>
                    {selectedRoadmap.level}: {selectedRoadmap.title}
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 600 }}>
                    कार्यक्षेत्र: {selectedRoadmap.scope}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRoadmap(null)}
                className="modal-close-btn"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ padding: '0.85rem 1.15rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', borderLeft: `4px solid ${selectedRoadmap.accentColor}` }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-primary)', display: 'block', marginBottom: '0.25rem' }}>
                  प्रबंधन एवं संचालन:
                </span>
                <span style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', fontWeight: 600 }}>
                  {selectedRoadmap.management}
                </span>
              </div>

              <p style={{ lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '1.25rem', fontSize: '0.96rem' }}>
                {selectedRoadmap.description}
              </p>

              <h4 style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '0.75rem', fontWeight: 700 }}>
                प्रमुख धरातलीय उद्देश्य व क्रियान्वयन:
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                {selectedRoadmap.points.map((pt, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                    <Check size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a 
                  href="#forms" 
                  onClick={() => setSelectedRoadmap(null)}
                  className="btn btn-primary"
                  style={{ flex: 1, minWidth: '180px', justifyContent: 'center' }}
                >
                  <UserCheck size={16} />
                  <span>धर्माधिकारी हेतु ऑनलाइन आवेदन करें</span>
                </a>
                {onOpenDonateModal && (
                  <button 
                    onClick={() => { setSelectedRoadmap(null); onOpenDonateModal(); }} 
                    className="btn btn-gold"
                  >
                    <Heart size={16} fill="#FFF" />
                    <span>सहयोग करें</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
