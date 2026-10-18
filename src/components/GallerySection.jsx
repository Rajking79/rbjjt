import React, { useState } from 'react';
import { 
  Sparkles, X, Play, Video, Image as ImageIcon, BookOpen, 
  Quote, Volume2, ArrowRight, CheckCircle2, Calendar, BookMarked, Sun
} from 'lucide-react';
import { GALLERY_ITEMS, DHAMMA_VIDEOS, DHAMMA_DISCOURSES, BUDDHA_LITERATURE, UPOSATH_DAYS } from '../data/trustData';

export function GallerySection() {
  const [activeMainTab, setActiveMainTab] = useState('all'); // 'all' | 'videos' | 'discourses' | 'photos'
  const [photoCategory, setPhotoCategory] = useState('सभी (All)');
  const [lightboxItem, setLightboxItem] = useState(null);

  const photoCategories = ['सभी (All)', 'संस्कार', 'दीक्षा', 'विहार', 'शिक्षा', 'स्वास्थ्य', 'सुरक्षा'];

  const filteredPhotos = photoCategory === 'सभी (All)' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === photoCategory);

  return (
    <section id="gallery" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Sparkles size={14} />
            <span>चित्र, पावन वीडियो, धम्मदेशना व पावन साहित्य</span>
          </div>
          <h2 className="section-title">ट्रस्ट गतिविधि गैलरी व धम्मदेशना</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            विभिन्न क्षेत्रों में आयोजित दीक्षा समारोह, संस्कार विवाह, सारनाथ तीर्थ, तथागत बुद्ध पावन धम्मदेशना, उपोसथ साधना और विपश्यना ध्यान की पावन प्रेरणा
          </p>
        </div>

        {/* 4 Main Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          <button
            onClick={() => setActiveMainTab('all')}
            className={`btn ${activeMainTab === 'all' ? 'btn-gold' : 'btn-outline'}`}
            style={{ borderRadius: '30px', padding: '0.65rem 1.4rem' }}
          >
            <Sparkles size={18} />
            <span>🌟 सब कुछ देखें (All)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('videos')}
            className={`btn ${activeMainTab === 'videos' ? 'btn-gold' : 'btn-outline'}`}
            style={{ borderRadius: '30px', padding: '0.65rem 1.4rem' }}
          >
            <Video size={18} />
            <span>🎥 पावन वीडियो (Videos)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('discourses')}
            className={`btn ${activeMainTab === 'discourses' ? 'btn-gold' : 'btn-outline'}`}
            style={{ borderRadius: '30px', padding: '0.65rem 1.4rem' }}
          >
            <BookOpen size={18} />
            <span>📜 धम्मदेशना व साहित्य (Discourses)</span>
          </button>

          <button
            onClick={() => setActiveMainTab('photos')}
            className={`btn ${activeMainTab === 'photos' ? 'btn-gold' : 'btn-outline'}`}
            style={{ borderRadius: '30px', padding: '0.65rem 1.4rem' }}
          >
            <ImageIcon size={18} />
            <span>📸 फोटो गैलरी (Photos)</span>
          </button>
        </div>

        {/* SECTION 1: Video Gallery */}
        {(activeMainTab === 'all' || activeMainTab === 'videos') && (
          <div className="animate-fade-in" style={{ marginBottom: activeMainTab === 'all' ? '3rem' : '0' }}>
            {activeMainTab === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <Video size={20} color="var(--color-gold)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', margin: 0 }}>
                  पावन वीडियो दर्शन व ध्यान साधना (Official Videos)
                </h3>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '2rem'
            }}>
              {DHAMMA_VIDEOS.map((vid) => (
                <div 
                  key={vid.id}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                  }}
                  className="video-showcase-card"
                >
                  {/* Video Player */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
                    <video 
                      src={vid.videoUrl}
                      controls 
                      poster={vid.poster}
                      preload="metadata"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    >
                      आपका ब्राउज़र वीडियो को सपोर्ट नहीं करता।
                    </video>
                  </div>

                  {/* Video Details */}
                  <div style={{ padding: '1.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-gold-dark)', background: 'rgba(217,119,6,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
                        {vid.speaker}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                        ⏱ {vid.duration}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                      {vid.title}
                    </h4>

                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>
                      {vid.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Dhammadesana & Sacred Discourses */}
        {(activeMainTab === 'all' || activeMainTab === 'discourses') && (
          <div className="animate-fade-in" style={{ marginBottom: activeMainTab === 'all' ? '3.5rem' : '0' }}>
            {activeMainTab === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <BookOpen size={20} color="var(--color-gold)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', margin: 0 }}>
                  तथागत बुद्ध पावन धम्मदेशना व अमृतपद (Sacred Discourses)
                </h3>
              </div>
            )}

            {/* Sutta Gathas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.75rem',
              marginBottom: '2.5rem'
            }}>
              {DHAMMA_DISCOURSES.map((disc) => (
                <div 
                  key={disc.id}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.75rem 1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <span style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-gold))',
                      color: '#FFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '12px'
                    }}>
                      ☸ {disc.theme}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                      {disc.source}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
                    {disc.sutta}
                  </h4>

                  {/* Pali Gatha */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(122, 20, 20, 0.06), rgba(217, 119, 6, 0.1))',
                    borderLeft: '3px solid var(--color-gold)',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    padding: '0.75rem 1rem',
                    marginBottom: '1rem',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: '0.98rem',
                    fontStyle: 'italic',
                    lineHeight: 1.55
                  }}>
                    {disc.pali}
                  </div>

                  {/* Hindi Meaning */}
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', display: 'block', marginBottom: '0.25rem' }}>
                      📖 पावन हिंदी भावार्थ:
                    </strong>
                    <p style={{ color: 'var(--color-text-main)', fontSize: '0.94rem', lineHeight: 1.68, margin: 0 }}>
                      {disc.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Buddha Kaun Hain Literature Feature */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(122, 20, 20, 0.04) 0%, rgba(217, 119, 6, 0.08) 100%)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <BookMarked size={22} color="var(--color-gold)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {BUDDHA_LITERATURE.badge}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                {BUDDHA_LITERATURE.title}
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '850px' }}>
                {BUDDHA_LITERATURE.desc}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem'
              }}>
                {BUDDHA_LITERATURE.volumes.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      background: 'var(--color-gold-soft)',
                      color: 'var(--color-gold-dark)',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      marginBottom: '0.5rem'
                    }}>
                      {item.vol}
                    </span>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                      {item.title}
                    </h5>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Uposath Calendar Feature */}
            <div style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <Calendar size={22} color="var(--color-gold)" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  मासिक उपोसथ दिवस एवं अष्टांग शील साधना
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                उपोसथ साधना कैलेंडर (RBJJT Sarnath)
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                तथागत बुद्ध के धम्म मार्ग पर चलने वाले प्रत्येक उपासक व उपासिका के लिए माह के चार पावन दिन उपोसथ शील धारण करना परम कल्याणकारी माना गया है:
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem'
              }}>
                {UPOSATH_DAYS.map((uposath, idx) => (
                  <div key={idx} style={{
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    position: 'relative'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <Sun size={16} color="var(--color-gold)" />
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', color: 'var(--color-primary)', margin: 0 }}>
                        {uposath.phase}
                      </h5>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                      {uposath.tithi} • {uposath.rule}
                    </span>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                      {uposath.benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/* SECTION 3: Photo Gallery */}
        {(activeMainTab === 'all' || activeMainTab === 'photos') && (
          <div className="animate-fade-in">
            {activeMainTab === 'all' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <ImageIcon size={20} color="var(--color-gold)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-primary)', margin: 0 }}>
                  सेवा गतिविधि चित्र दीर्घा (Photo Gallery)
                </h3>
              </div>
            )}

            {/* Gallery Category Filter Buttons */}
            <div className="gallery-filters" style={{ marginBottom: '1.75rem' }}>
              {photoCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${photoCategory === cat ? 'active' : ''}`}
                  onClick={() => setPhotoCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="gallery-grid">
              {filteredPhotos.map((item) => (
                <div 
                  key={item.id} 
                  className="gallery-card"
                  onClick={() => setLightboxItem(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://rbjjt.com/wp-content/uploads/2026/01/1619887156_mulagandha_kuti_vihar.jpg.webp";
                    }}
                  />
                  <div className="gallery-overlay">
                    <span style={{ 
                      display: 'inline-block',
                      background: 'rgba(217, 119, 6, 0.9)', 
                      color: '#FFF', 
                      fontSize: '0.72rem', 
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      width: 'fit-content',
                      marginBottom: '0.3rem',
                      fontWeight: 700
                    }}>
                      {item.category}
                    </span>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Photos */}
      {lightboxItem && (
        <div className="modal-backdrop" onClick={() => setLightboxItem(null)}>
          <div className="modal-content" style={{ maxWidth: '820px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative' }}>
              <img 
                src={lightboxItem.image} 
                alt={lightboxItem.title} 
                style={{ width: '100%', maxHeight: '560px', objectFit: 'contain', backgroundColor: '#000' }}
              />
              <button 
                onClick={() => setLightboxItem(null)}
                className="modal-close-btn"
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', color: '#FFF' }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.25rem 1.5rem' }}>
              <span style={{ 
                display: 'inline-block',
                background: 'var(--color-gold)', 
                color: '#FFF', 
                fontSize: '0.75rem', 
                padding: '2px 8px', 
                borderRadius: '12px',
                fontWeight: 700,
                marginBottom: '0.4rem'
              }}>
                {lightboxItem.category}
              </span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary)', marginBottom: '0.4rem' }}>
                {lightboxItem.title}
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', margin: 0 }}>
                {lightboxItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
