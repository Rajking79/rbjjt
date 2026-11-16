import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Copy, Check, BookOpen, Heart, Sun } from 'lucide-react';
import { DAILY_VANDANA_TEXTS } from '../data/trustData';

export function DailyVandanaSection() {
  const [activeVandana, setActiveVandana] = useState(DAILY_VANDANA_TEXTS[0].id);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = DAILY_VANDANA_TEXTS.find(v => v.id === activeVandana) || DAILY_VANDANA_TEXTS[0];

  const handleCopy = () => {
    const text = `${current.title}\n\n[पालि पाठ]\n${current.pali}\n\n[हिंदी भावार्थ]\n${current.hindi}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const playChime = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(216, ctx.currentTime + 3);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 3.6);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3600);
    } catch (e) {}
  };

  return (
    <section id="vandana" className="section daily-vandana-section">
      <div className="container">
        {/* Header */}
        <div className="section-header vandana-section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Sun size={14} />
            <span>दैनिक त्रिशरण, पंचशील एवं पालि बुद्ध वंदना</span>
          </div>
          <h2 className="section-title">नित्य पावन बुद्ध वंदना व धम्म पाठ</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            प्रातः एवं सायं चित्त की शुद्धि, मानसिक शांति व पुण्य संचय हेतु तथागत बुद्ध द्वारा उपदिष्ट त्रिपिटक के मूल पालि सूत्रों का सस्वर पाठ व हिंदी भावार्थ।
          </p>
        </div>

        {/* Vandana Tabs */}
        <div className="vandana-tabs-bar">
          {DAILY_VANDANA_TEXTS.map(v => (
            <button
              key={v.id}
              onClick={() => setActiveVandana(v.id)}
              className={`vandana-tab-btn ${activeVandana === v.id ? 'active' : ''}`}
            >
              <BookOpen size={15} />
              <span>{v.title}</span>
            </button>
          ))}
        </div>

        {/* Display Card */}
        <div className="vandana-display-card">
          <div className="vandana-card-top">
            <div className="vandana-head-left">
              <span className="vandana-badge">मूल पालि त्रिपिटक सूत्र</span>
              <h3 className="vandana-display-title">{current.title}</h3>
              <p className="vandana-display-desc">{current.desc}</p>
            </div>

            <div className="vandana-head-actions">
              <button 
                type="button" 
                onClick={playChime} 
                className={`btn btn-sm ${isPlaying ? 'btn-gold' : 'btn-outline'}`}
                title="ध्यान घंटी ध्वनि बजाएं"
              >
                {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{isPlaying ? 'ध्वनि जारी...' : 'पावन घंटी बजाएं'}</span>
              </button>

              <button 
                type="button" 
                onClick={handleCopy} 
                className="btn btn-outline btn-sm"
                title="गाथा कॉपी करें"
              >
                {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                <span>{copied ? 'कॉपी हो गया!' : 'गाथा कॉपी करें'}</span>
              </button>
            </div>
          </div>

          <div className="vandana-content-grid">
            {/* Pali Stanza */}
            <div className="vandana-pali-box">
              <div className="box-sub-label">
                <span className="dharma-dot">☸</span>
                <span>मूल पालि पाठ (Pali Chanting)</span>
              </div>
              <div className="pali-verse-text">
                {current.pali}
              </div>
            </div>

            {/* Hindi Meaning */}
            <div className="vandana-hindi-box">
              <div className="box-sub-label">
                <Heart size={14} color="#7A1414" />
                <span>सरल हिंदी भावार्थ (Hindi Meaning)</span>
              </div>
              <div className="hindi-verse-text">
                {current.hindi}
              </div>
            </div>
          </div>

          {/* Bottom Affirmation Strip */}
          <div className="vandana-card-bottom">
            <Sparkles size={16} color="#D97706" />
            <span>
              <strong>साधना निर्देश:</strong> शांत चित्त होकर आसन ग्रहण करें, दोनों हाथ जोड़कर मन में मैत्री और करुणा की भावना के साथ इन पावन सूत्रों का नित्य पाठ करें।
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

