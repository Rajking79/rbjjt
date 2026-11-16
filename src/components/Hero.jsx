import React from 'react';
import { UserPlus, Sparkles, BookOpen, Play } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { TRUST_INFO } from '../data/trustData';
import sarnathDhamekh from '../assets/sarnath-dhamekh-stupa.jpg';
import sarnathMulagandha from '../assets/sarnath-mulagandha.webp';

export function Hero({ onOpenDonateModal, onOpenVideoModal }) {
  const animatedWords = [
    "सनातन धम्म का प्रचार",
    "निःशुल्क बाल शिक्षा",
    "दहेज-मुक्त आवाह-विवाह",
    "विपश्यना ध्यान व स्वास्थ्य",
    "शील व सदाचार दीक्षा"
  ];

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
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Content */}
          <div className="hero-content">
            {/* Top Blessed Tag with Floating Glow */}
            <div className="badge-tag animate-bounce-subtle">
              <Sparkles size={14} />
              <span>☸️ भवतु सब्ब मंगलं • सर्वजन हिताय, सर्वजन सुखाय</span>
            </div>

            {/* Sacred Quote Card */}
            <div className="hero-quote-card">
              <p>{TRUST_INFO.motto}</p>
            </div>

            {/* Grand Headline with Dynamic Live Animated Words */}
            <h1 className="hero-title">
              भगवान बुद्ध के कल्याणकारी <br className="hidden-mobile" />
              <span className="highlight-wrapper">
                <TypewriterText words={animatedWords} />
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-desc">
              <strong>राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (RBJJT - Reg. No. 069/16)</strong> समाज में शांति, करुणा, मैत्री और समता के महान संदेशों को स्थापित करने के लिए समर्पित है। हमारा संकल्प है कि शिक्षा, दीक्षा, स्वास्थ्य, संस्कार और सुरक्षा के माध्यम से एक प्रबुद्ध भारत का निर्माण हो।
            </p>

            {/* CTA Group (पुण्य लाभ दान बटन हटाया गया - ऑनलाइन फॉर्म्स व ट्रस्ट परिचय प्रमुख) */}
            <div className="hero-cta-group">
              <a
                href="#forms"
                onClick={(e) => scrollToSection(e, '#forms')}
                className="btn btn-primary btn-lg"
              >
                <UserPlus size={18} />
                <span>ऑनलाइन फॉर्म्स</span>
              </a>

              {onOpenVideoModal && (
                <button
                  onClick={onOpenVideoModal}
                  className="btn btn-gold btn-lg"
                  title="ट्रस्ट का परिचय वीडियो देखें"
                >
                  <Play size={17} fill="currentColor" />
                  <span>ट्रस्ट वीडियो देखें</span>
                </button>
              )}

              <a
                href="#pillars"
                onClick={(e) => scrollToSection(e, '#pillars')}
                className="btn btn-outline btn-lg"
              >
                <BookOpen size={17} />
                <span>5 मुख्य आधार</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame (सारनाथ का पावन चित्र) */}
          <div className="hero-visual-card">
            <div className="hero-image-aura"></div>

            <div className="hero-visual-container">
              {/* Top Float Badge */}
              <div className="hero-badge-pill animate-float">
                <span className="wheel-spin">☸</span>
                <span>ऋषिपत्तन • सारनाथ (वाराणसी)</span>
              </div>

              {/* Main Sarnath Stupa Frame */}
              <div className="hero-image-wrapper">
                <img
                  src={sarnathDhamekh}
                  alt="पावन धमेख स्तूप, सारनाथ (वाराणसी)"
                  className="hero-main-img"
                  style={{ objectPosition: 'center 22%' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = sarnathMulagandha;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
