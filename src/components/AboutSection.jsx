import React from 'react';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Compass, HeartHandshake, Eye, 
  BookOpen, Users, Award, Landmark 
} from 'lucide-react';
import { TRUST_INFO, STATS } from '../data/trustData';

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Sparkles size={14} />
            <span>संस्था का पावन इतिहास, विज़न एवं उद्देश्य</span>
          </div>
          <h2 className="section-title">राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            “जहाँ करुणा ही धर्म है और मानवता ही सर्वोच्च कर्तव्य” — भगवान बुद्ध के शांति, करुणा और अहिंसा के संदेशों से प्रेरित एक लोक-कल्याणकारी सामाजिक एवं आध्यात्मिक ट्रस्ट।
          </p>
        </div>

        {/* 4 Core Purpose Cards Grid */}
        <div className="about-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {/* Card 1: Mission */}
          <div className="about-card">
            <div className="about-card-icon" style={{ background: 'var(--color-gold-soft)', color: 'var(--color-gold-dark)' }}>
              <Compass size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.6rem' }}>
              हमारा पावन उद्देश्य (Mission)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.68, fontSize: '0.94rem' }}>
              तथागत बुद्ध द्वारा प्रतिपादित सनातन धम्म को जन-जन तक पहुँचाना। मनुष्य के अंदर उपजी अज्ञानता, भेदभाव और कुरीतियों को दूर कर समता, समानता, न्याय व बंधुत्व की भावना को समाज के हर कोने में स्थापित करना।
            </p>
          </div>

          {/* Card 2: Vision */}
          <div className="about-card">
            <div className="about-card-icon" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
              <Eye size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.6rem' }}>
              हमारी दृष्टि (Vision)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.68, fontSize: '0.94rem' }}>
              एक ऐसा समाज जहाँ कोई बच्चा शिक्षा से वंचित न रहे, हर व्यक्ति शील व सदाचार से युक्त हो, तन-मन से स्वस्थ रहे और भयमुक्त वातावरण में स्वाभिमान के साथ जी सके। अंधविश्वास रहित प्रबुद्ध भारत का निर्माण।
            </p>
          </div>

          {/* Card 3: Values */}
          <div className="about-card">
            <div className="about-card-icon" style={{ background: 'rgba(5, 150, 105, 0.12)', color: 'var(--color-success)' }}>
              <HeartHandshake size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.6rem' }}>
              मूल सिद्धांत (Core Principles)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.68, fontSize: '0.94rem' }}>
              त्रिरत्न (बुद्ध, धम्म, संघ) और पंचशील के आधार पर जीवन का संचालन। प्राणी मात्र के प्रति करुणा और मैत्री भाव। सादगीपूर्ण वैवाहिक संस्कार और निःस्वार्थ जनसेवा को ही सर्वोपरि साधना मानना।
            </p>
          </div>

          {/* Card 4: 22 Pledges & Social Reform */}
          <div className="about-card">
            <div className="about-card-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#8B5CF6' }}>
              <BookOpen size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '0.6rem' }}>
              22 प्रतिज्ञाएं व समाज सुधार
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.68, fontSize: '0.94rem' }}>
              बाबासाहेब डॉ. बी.आर. अम्बेडकर की 22 प्रतिज्ञाओं का आचरण, पाखंड व अंधविश्वासों से मुक्ति, महिला सशक्तिकरण और दहेज प्रथा जैसी सामाजिक बुराइयों के विरुद्ध जनजागरण अभियान चलाना।
            </p>
          </div>
        </div>

        {/* Impact Numbers Banner */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary), #5C0E0E)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 1.5rem',
          color: '#FFF',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: 'var(--color-gold-light)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              ☸ सामाजिक प्रभाव व उपलब्धियां
            </span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#FFF', marginTop: '0.3rem' }}>
              सारनाथ से प्रारंभ, पूरे राष्ट्र में प्रबुद्ध क्रांति
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.1rem', fontWeight: 800, color: 'var(--color-gold-light)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#FFF', marginTop: '0.2rem' }}>
                  {stat.labelHi}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Trust Registration & Philosophy Banner */}
        <div className="about-info-banner">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
              <ShieldCheck size={24} color="var(--color-gold)" />
              <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>अधिकृत पंजीकृत संस्था (Registered Trust)</strong>
            </div>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.94rem' }}>
              राष्ट्रीय बौद्ध जन जागरण ट्रस्ट, भारतीय न्यास अधिनियम के अंतर्गत विधिवत पंजीकृत है (<strong>पंजीकरण संख्या: {TRUST_INFO.regNo}</strong>)। इसका केंद्रीय कार्यालय भगवान बुद्ध की प्रथम उपदेश स्थली <strong>ऋषिपत्तन, सारनाथ (वाराणसी)</strong> में स्थित है, जहाँ से उत्तर प्रदेश व अन्य राज्यों में सेवा कार्य निरंतर संचालित हो रहे हैं।
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.94rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <span>प्रत्येक गांव में धम्म केंद्र व विपश्यना साधना की स्थापना</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <span>दहेज-मुक्त सामूहिक बौद्ध विवाह व अधिकृत वैवाहिक प्रमाणपत्र</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <span>मेधावी व असहाय छात्र-छात्राओं को छात्रवृत्ति व निःशुल्क पुस्तकालय</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
              <span>प्राकृतिक स्वास्थ्य, योग, विपश्यना एवं नशामुक्ति जनजागरण अभियान</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
