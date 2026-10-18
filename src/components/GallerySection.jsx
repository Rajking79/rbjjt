import React, { useState } from 'react';
import { Sparkles, X, ZoomIn, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/trustData';

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('सभी (All)');
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = ['सभी (All)', 'संस्कार', 'दीक्षा', 'विहार', 'शिक्षा', 'स्वास्थ्य', 'सुरक्षा'];

  const filteredItems = activeCategory === 'सभी (All)' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>चित्र दीर्घा एवं सेवा गतिविधियाँ</span>
          </div>
          <h2 className="section-title">ट्रस्ट गतिविधि गैलरी (Gallery)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            विभिन्न क्षेत्रों में आयोजित दीक्षा समारोह, संस्कार विवाह, विपश्यना ध्यान साधना और शिक्षा प्रकल्पों की प्रेरक झलकियाँ
          </p>
        </div>

        {/* Gallery Filter Buttons */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
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
                  background: 'rgba(217, 119, 6, 0.85)', 
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

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="modal-backdrop" onClick={() => setLightboxItem(null)}>
          <div className="modal-content" style={{ maxWidth: '800px', padding: 0, overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: 'relative' }}>
              <img 
                src={lightboxItem.image} 
                alt={lightboxItem.title} 
                style={{ width: '100%', maxHeight: '550px', objectFit: 'contain', backgroundColor: '#000' }}
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
            <div style={{ padding: '1.5rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span className="badge-tag" style={{ margin: 0 }}>{lightboxItem.category}</span>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary)' }}>
                  {lightboxItem.title}
                </h4>
              </div>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                {lightboxItem.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
