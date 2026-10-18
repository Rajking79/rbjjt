import React from 'react';
import { X, Play } from 'lucide-react';

export function VideoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        style={{ maxWidth: '800px', padding: 0, overflow: 'hidden', background: '#000' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 1.5rem',
          background: 'linear-gradient(90deg, #5C0E0E, #7A1414)',
          color: '#FFF'
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>☸️</span>
            <span>भगवान बुद्ध की प्रेरणा व ट्रस्ट परिचय वीडियो</span>
          </h3>
          <button 
            onClick={onClose}
            style={{ color: '#FFF', background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
            aria-label="Close Video"
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000' }}>
          <video 
            src="https://rbjjt.com/wp-content/uploads/2025/12/Buddha-About-Us-Video-RBJJt.mp4" 
            controls 
            autoPlay 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            आपका ब्राउज़र वीडियो टैग को सपोर्ट नहीं करता।
          </video>
        </div>
      </div>
    </div>
  );
}
