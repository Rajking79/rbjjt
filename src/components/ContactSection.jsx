import React, { useState } from 'react';
import { 
  Sparkles, MapPin, Phone, Mail, Clock, Send, 
  MessageSquare, CheckCircle2, MessageCircle 
} from 'lucide-react';
import { TRUST_INFO } from '../data/trustData';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      alert("कृपया नाम, मोबाइल नंबर और संदेश दर्ज करें");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>संपर्क सूत्र एवं सहायता केंद्र</span>
          </div>
          <h2 className="section-title">हमसे संपर्क करें (Contact Us)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            किसी भी प्रकार की जानकारी, धम्म आयोजन, वैवाहिक परामर्श अथवा सहयोग हेतु हमारे सेवा केंद्र से सीधे संपर्क करें।
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left: Contact Info List */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.8rem' }}>
              केंद्रीय कार्यालय विवरण
            </h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              आप सारनाथ स्थित हमारे केंद्रीय कार्यालय में आकर मिल सकते हैं या नीचे दिए गए फोन व ईमेल द्वारा जुड़ सकते हैं।
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <MapPin size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
                    मुख्यालय का पता (Headquarters):
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    {TRUST_INFO.headquarters}
                  </span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Phone size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
                    आधिकारिक हेल्पलाइन (Helpline):
                  </strong>
                  <a href={`tel:${TRUST_INFO.phone}`} style={{ color: 'var(--color-text-main)', fontWeight: 700, fontSize: '1.05rem' }}>
                    {TRUST_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Mail size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
                    आधिकारिक ईमेल (Email):
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    {TRUST_INFO.email} / {TRUST_INFO.altEmail}
                  </span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-box">
                  <Clock size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--color-primary)', marginBottom: '0.2rem' }}>
                    कार्यालय समय (Timings):
                  </strong>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    {TRUST_INFO.workingHours}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Card */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: '#25D366',
              color: '#FFF',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 15px rgba(37, 211, 102, 0.35)'
            }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800 }}>सीधे व्हाट्सएप पर चैट करें</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>तुरंत उत्तर व परामर्श हेतु हमारे हेल्पलाइन से जुड़ें</p>
              </div>
              <a 
                href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=Namo%20Buddhay%20ji,%20I%20want%20to%20connect%20with%20RBJJT`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
                style={{ backgroundColor: '#FFF', color: '#128C7E', fontWeight: 800 }}
              >
                <MessageCircle size={16} />
                <span>व्हाट्सएप खोलें</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Contact Form & Map */}
          <div>
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '1.2rem' }}>
                ऑनलाइन संदेश भेजें (Send a Message)
              </h3>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>संदेश प्राप्त हुआ!</h4>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginTop: '0.4rem' }}>
                    राष्ट्रीय बौद्ध जन जागरण ट्रस्ट की टीम शीघ्र ही आपसे संपर्क करेगी।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">आपका पूरा नाम <span className="required">*</span></label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="नाम"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">फोन नंबर <span className="required">*</span></label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="मोबाइल नंबर"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">ईमेल पता (वैकल्पिक)</label>
                      <input 
                        type="email" 
                        className="form-input" 
                        placeholder="ईमेल"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">विषय (Subject)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="उदा. धम्म दीक्षा / विवाह संस्कार / शाखा स्थापना"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">आपका संदेश / विवरण <span className="required">*</span></label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="अपना संदेश यहाँ लिखें..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    <Send size={18} />
                    <span>संदेश प्रेषित करें (Send Message)</span>
                  </button>
                </form>
              )}
            </div>

            {/* Google Map Embed */}
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '220px', border: '1px solid var(--color-border)' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Sarnath%20Varanasi%20Uttar%20Pradesh&t=m&z=13&output=embed&iwloc=near"
                title="RBJJT Sarnath Office Map"
                style={{ width: '100%', height: '100%', border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
