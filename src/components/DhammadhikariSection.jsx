import React from 'react';
import { Sparkles, Phone, MessageCircle, MapPin, UserCheck, Shield } from 'lucide-react';
import { LEADERS } from '../data/trustData';

export function DhammadhikariSection() {
  return (
    <section id="dhammadhikari" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>धम्म सेवा में समर्पित पदाधिकारी</span>
          </div>
          <h2 className="section-title">प्रमुख धर्माधिकारी एवं उपासक गण</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            विभिन्न जनपदों व क्षेत्रों में ट्रस्ट की नीतियों, संस्कारों व समाज सेवा का कुशल नेतृत्व कर रहे हमारे प्रमुख पदाधिकारी
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="leaders-grid">
          {LEADERS.map((leader, index) => (
            <div key={index} className="leader-card">
              {/* Avatar Frame */}
              <div className="leader-avatar-wrap">
                <img 
                  src={leader.photo} 
                  alt={leader.name} 
                  className="leader-avatar-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://rbjjt.com/wp-content/uploads/2026/07/6-Copy-150x150.png";
                  }}
                />
              </div>

              {/* Leader Info */}
              <h3 className="leader-name">{leader.name}</h3>
              <span className="leader-role">{leader.role}</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.88rem', marginBottom: '0.8rem' }}>
                <MapPin size={15} color="var(--color-primary)" />
                <span>{leader.area}</span>
              </div>

              <p className="leader-bio">{leader.bio}</p>

              {/* Action Buttons */}
              <div className="leader-contact-bar">
                <a 
                  href={`tel:${leader.phone}`} 
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1 }}
                >
                  <Phone size={15} />
                  <span>कॉल करें</span>
                </a>
                <a 
                  href={`https://wa.me/${leader.phone.replace(/[^0-9]/g, '')}?text=Namo%20Buddhay%20ji,%20I%20want%20to%20know%20about%20RBJJT`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-gold btn-sm"
                  style={{ flex: 1 }}
                >
                  <MessageCircle size={15} />
                  <span>व्हाट्सएप</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join as Dhammadhikari Banner */}
        <div style={{
          marginTop: '3.5rem',
          background: 'var(--color-surface)',
          border: '1.5px solid var(--color-gold)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--color-gold), var(--color-primary))',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-gold)'
            }}>
              <Shield size={30} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.3rem' }}>
                आप भी राष्ट्रीय बौद्ध जन जागरण ट्रस्ट में धर्माधिकारी बन सकते हैं!
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                अपने गांव या ब्लॉक स्तर पर समाज सेवा व धर्म जागरण की जिम्मेदारी संभालने हेतु ऑनलाइन आवेदन करें।
              </p>
            </div>
          </div>

          <a href="#forms" className="btn btn-primary btn-lg">
            <UserCheck size={18} />
            <span>धर्माधिकारी फॉर्म खोलें</span>
          </a>
        </div>
      </div>
    </section>
  );
}
