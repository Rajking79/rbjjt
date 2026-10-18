import React from 'react';
import { 
  Sparkles, Home, BookOpen, Building2, Landmark, 
  Award, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { ROADMAP_TARGETS } from '../data/trustData';

export function RoadmapSection() {
  const getStepIcon = (iconName) => {
    switch(iconName) {
      case 'Home': return <Home size={24} />;
      case 'BookOpen': return <BookOpen size={24} />;
      case 'Building2': return <Building2 size={24} />;
      case 'Landmark': return <Landmark size={24} />;
      case 'Award': return <Award size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  return (
    <section id="roadmap" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>दूरदर्शी कार्य योजना (5-Tier Roadmap)</span>
          </div>
          <h2 className="section-title">संस्था के 5 मुख्य लक्ष्य एवं कार्य योजना</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            ग्राम स्तर से लेकर मंडल स्तर तक धम्म प्रचार, शिक्षा, स्वास्थ्य एवं समाज सुधार का सुव्यवस्थित चरणबद्ध ढाँचा
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="roadmap-timeline">
          {ROADMAP_TARGETS.map((target, index) => (
            <div key={index} className="roadmap-card">
              {/* Step Number & Icon */}
              <div className="roadmap-step-badge">
                <span>{index + 1}</span>
              </div>

              {/* Card Content */}
              <div className="roadmap-content">
                <div className="roadmap-content-header">
                  <div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-gold-dark)', display: 'block', marginBottom: '0.2rem' }}>
                      {target.level}
                    </span>
                    <h4>{target.title}</h4>
                  </div>
                  <span className="roadmap-scope-tag">
                    {target.scope}
                  </span>
                </div>

                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.96rem', marginTop: '0.6rem' }}>
                  {target.description}
                </p>

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 700 }}>
                  <CheckCircle2 size={16} />
                  <span>प्रबंधन: स्थानीय नियुक्त धम्म अधिकारी व समिति</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '2.5rem',
          background: 'linear-gradient(135deg, var(--color-primary-subtle), var(--color-gold-soft))',
          borderRadius: 'var(--radius-xl)',
          border: '1.5px solid var(--color-border)'
        }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '0.6rem', fontSize: '1.4rem' }}>
            क्या आप भी अपने गांव या क्षेत्र में धम्म केंद्र स्थापित करना चाहते हैं?
          </h3>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
            राष्ट्रीय बौद्ध जन जागरण ट्रस्ट से जुड़कर अपने क्षेत्र में धर्माचार्य या परिचायक बनें और तथागत बुद्ध के संदेशों का प्रचार करें।
          </p>
          <a href="#forms" className="btn btn-primary btn-lg">
            <span>धर्माधिकारी हेतु ऑनलाइन आवेदन करें</span>
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
