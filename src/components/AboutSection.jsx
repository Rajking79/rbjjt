import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Compass, HeartHandshake, Eye } from 'lucide-react';
import { TRUST_INFO } from '../data/trustData';

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>संस्था का परिचय एवं दृष्टि</span>
          </div>
          <h2 className="section-title">राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            “जहाँ करुणा ही धर्म है और मानवता ही सर्वोच्च कर्तव्य” — भगवान बुद्ध के शांति, करुणा और अहिंसा के संदेशों से प्रेरित एक लोक-कल्याणकारी सामाजिक एवं आध्यात्मिक ट्रस्ट।
          </p>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
          {/* Card 1: Mission */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-gold-soft)',
              color: 'var(--color-gold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Compass size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.8rem' }}>
              हमारा पावन उद्देश्य (Mission)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
              तथागत बुद्ध द्वारा प्रतिपादित सनातन धम्म को जन-जन तक पहुँचाना। मनुष्य के अंदर उपजी बुराइयों, भेदभाव और कुरीतियों को दूर कर समता, समानता, न्याय व बंधुत्व की भावना को समाज के हर कोने में स्थापित करना।
            </p>
          </div>

          {/* Card 2: Vision */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary-subtle)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Eye size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.8rem' }}>
              हमारी दृष्टि (Vision)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
              एक ऐसा समाज जहाँ कोई बच्चा शिक्षा से वंचित न रहे, हर व्यक्ति शील व सदाचार से युक्त हो, तन-मन से स्वस्थ रहे और भयमुक्त वातावरण में स्वाभिमान के साथ जी सके। अंधविश्वास रहित प्रबुद्ध भारत का निर्माण।
            </p>
          </div>

          {/* Card 3: Values */}
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(5, 150, 105, 0.12)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <HeartHandshake size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.8rem' }}>
              मूल सिद्धांत (Core Principles)
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: '0.98rem' }}>
              त्रिरत्न (बुद्ध, धम्म, संघ) और पंचशील के आधार पर जीवन का संचालन। प्राणी मात्र के प्रति करुणा और मैत्री भाव। सादगीपूर्ण वैवाहिक संस्कार और निःस्वार्थ जनसेवा को ही सर्वोपरि साधना मानना।
            </p>
          </div>
        </div>

        {/* Detailed Trust Registration & Philosophy Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(122, 20, 20, 0.05), rgba(217, 119, 6, 0.08))',
          border: '1.5px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <ShieldCheck size={22} color="var(--color-gold)" />
              <strong style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>अधिकृत पंजीकृत संस्था (Registered Trust)</strong>
            </div>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              राष्ट्रीय बौद्ध जन जागरण ट्रस्ट, भारतीय न्यास अधिनियम के अंतर्गत विधिवत पंजीकृत है (<strong>पंजीकरण संख्या: {TRUST_INFO.regNo}</strong>)। इसका केंद्रीय कार्यालय भगवान बुद्ध की प्रथम उपदेश स्थली <strong>सारनाथ, वाराणसी</strong> में स्थित है, जहाँ से उत्तर प्रदेश व अन्य राज्यों में सेवा कार्य संचालित होते हैं।
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={20} color="var(--color-success)" />
              <span>प्रत्येक गांव में धम्म केंद्र व विपश्यना साधना की स्थापना</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={20} color="var(--color-success)" />
              <span>दहेज-मुक्त सामूहिक बौद्ध विवाह व वैवाहिक प्रमाणपत्र</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={20} color="var(--color-success)" />
              <span>गरीब छात्र-छात्राओं को छात्रवृत्ति व निःशुल्क पुस्तकालय</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
              <CheckCircle2 size={20} color="var(--color-success)" />
              <span>प्राकृतिक स्वास्थ्य एवं नशामुक्ति जनजागरण अभियान</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
