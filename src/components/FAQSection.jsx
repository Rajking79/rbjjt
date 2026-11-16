import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';
import { REAL_FAQS, TRUST_INFO } from '../data/trustData';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faqs" className="section faq-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <HelpCircle size={14} />
            <span>जिज्ञासा समाधान एवं अक्सर पूछे जाने वाले प्रश्न</span>
          </div>
          <h2 className="section-title">अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            धर्माधिकारी पद, विवाह संस्कार, दीक्षा प्रक्रिया, सारनाथ केंद्र एवं ट्रस्ट संचालन से संबंधित आपके सभी प्रश्नों के प्रामाणिक उत्तर।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-container">
          {REAL_FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item-card ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                >
                  <span className="faq-q-text">
                    <span className="faq-q-num">Q{idx + 1}.</span>
                    {faq.q}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`faq-arrow-icon ${isOpen ? 'rotated' : ''}`} 
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="faq-support-banner">
          <div className="support-banner-text">
            <h4>क्या आपका कोई अन्य प्रश्न है?</h4>
            <p>हमारी केंद्रीय सेवा समिति सारनाथ आपके हर प्रश्न का समाधान करने हेतु तत्पर है।</p>
          </div>
          <a 
            href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namo%20Buddhay%20ji,%20I%20have%20a%20question%20about%20RBJJT`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-sm"
          >
            <MessageCircle size={16} />
            <span>व्हाट्सएप पर पूछें</span>
          </a>
        </div>
      </div>
    </section>
  );
}

