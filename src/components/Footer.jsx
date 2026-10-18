import React from 'react';
import { 
  Heart, Shield, Phone, Mail, MapPin, 
  ExternalLink, ArrowUp, Database 
} from 'lucide-react';
import { TRUST_INFO } from '../data/trustData';

export function Footer({ onOpenDonateModal, onOpenAdminModal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="brand-logo-wrap" style={{ width: '46px', height: '46px' }}>
                <img 
                  src="https://rbjjt.com/wp-content/uploads/2025/12/RBJJT-Official-Logo-70x62.png" 
                  alt="RBJJT Logo" 
                  className="brand-logo-img" 
                />
              </div>
              <div>
                <h3 style={{ margin: 0, lineHeight: 1.2 }}>{TRUST_INFO.nameHi}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-light)', fontWeight: 700 }}>
                  {TRUST_INFO.regNo}
                </span>
              </div>
            </div>

            <p className="footer-desc">
              भगवान बुद्ध के कल्याणकारी सनातन धर्म, शील, समाधि, प्रज्ञा का जन-जन में प्रचार करने तथा समता, समानता और न्याय पर आधारित समाज के निर्माण हेतु निरंतर सेवारत।
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.06)',
              padding: '0.9rem 1.2rem',
              borderRadius: 'var(--radius-md)',
              borderLeft: '3px solid var(--color-gold)',
              fontSize: '0.88rem',
              fontStyle: 'italic',
              color: '#FBE8D3'
            }}>
              “भवतु सब्ब मंगलं, रक्खन्तु सब्ब देवता।<br />
              सब्ब बुद्धा/धम्मा/संघा नुभावेन सदा सोत्थी भवन्तु ते॥”
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-links-col">
            <h4>मुख्य पृष्ठ व अनुभाग</h4>
            <ul className="footer-links-list">
              <li><a href="#home" onClick={(e) => scrollToSection(e, '#home')}>मुख्य पृष्ठ (Home)</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')}>हमारे बारे में (About Us)</a></li>
              <li><a href="#founder" onClick={(e) => scrollToSection(e, '#founder')}>संस्थापक भिक्खु बुद्ध ज्योति</a></li>
              <li><a href="#pillars" onClick={(e) => scrollToSection(e, '#pillars')}>5 मुख्य आधार स्तंभ</a></li>
              <li><a href="#roadmap" onClick={(e) => scrollToSection(e, '#roadmap')}>5-स्तरीय कार्य योजना</a></li>
              <li><a href="#dhammadhikari" onClick={(e) => scrollToSection(e, '#dhammadhikari')}>धर्माधिकारी पदाधिकारी</a></li>
              <li><a href="#gallery" onClick={(e) => scrollToSection(e, '#gallery')}>चित्र दीर्घा (Gallery)</a></li>
            </ul>
          </div>

          {/* Col 3: Online Forms */}
          <div className="footer-links-col">
            <h4>ऑनलाइन फॉर्म्स</h4>
            <ul className="footer-links-list">
              <li><a href="#forms" onClick={(e) => scrollToSection(e, '#forms')}>धर्माधिकारी आवेदन पत्र</a></li>
              <li><a href="#forms" onClick={(e) => scrollToSection(e, '#forms')}>आवाह-विवाह बायोडाटा फॉर्म</a></li>
              <li><a href="#forms" onClick={(e) => scrollToSection(e, '#forms')}>दीक्षा आवेदन-पत्र</a></li>
              <li><a href="#forms" onClick={(e) => scrollToSection(e, '#forms')}>विवाह प्रमाण-पत्र आवेदन</a></li>
              <li>
                <button 
                  onClick={onOpenDonateModal} 
                  style={{ color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginTop: '0.5rem' }}
                >
                  <Heart size={14} fill="currentColor" />
                  <span>ऑनलाइन दान एवं रसीद</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenAdminModal} 
                  style={{ color: '#D4B895', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', marginTop: '0.5rem' }}
                >
                  <Database size={14} />
                  <span>रिकॉर्ड्स एवं CRM Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Bank & Headquarters */}
          <div className="footer-links-col">
            <h4>मुख्यालय एवं संपर्क</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: '#D3BCA6' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <MapPin size={17} color="var(--color-gold-light)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{TRUST_INFO.headquarters}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--color-gold-light)" />
                <a href={`tel:${TRUST_INFO.phone}`} style={{ color: '#FFF', fontWeight: 700 }}>
                  {TRUST_INFO.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={16} color="var(--color-gold-light)" />
                <span>{TRUST_INFO.email}</span>
              </div>
            </div>

            <button 
              onClick={onOpenDonateModal}
              className="btn btn-gold btn-sm"
              style={{ marginTop: '1.25rem', width: '100%' }}
            >
              <Heart size={15} fill="#FFF" />
              <span>सहयोग / दान करें (Donate)</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            <span>© {new Date().getFullYear()} {TRUST_INFO.nameHi} (RBJJT). सर्वाधिकार सुरक्षित।</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span style={{ fontSize: '0.82rem' }}>सारनाथ, वाराणसी (उ.प्र.) भारत</span>
            <button 
              onClick={scrollToTop}
              className="copy-btn"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: '#FFF' }}
              title="ऊपर जाएँ"
            >
              <ArrowUp size={15} />
              <span>शीर्ष पर जाएँ</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
