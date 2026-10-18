import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, MessageCircle } from 'lucide-react';
import { TRUST_INFO } from '../data/trustData';

export function AudioChantPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorIntervalRef = useRef(null);

  // Synthesize a calming 432Hz Buddhist Singing Bowl & Bell harmonic
  const toggleChant = () => {
    if (isPlaying) {
      if (oscillatorIntervalRef.current) clearInterval(oscillatorIntervalRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const playSingingBowlChime = () => {
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          // 432Hz fundamental meditative bowl frequency
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(432, ctx.currentTime);
          // Harmonic overtone
          osc.frequency.exponentialRampToValueAtTime(216, ctx.currentTime + 3);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 4.6);
        };

        playSingingBowlChime();
        oscillatorIntervalRef.current = setInterval(playSingingBowlChime, 6000);
        setIsPlaying(true);
      } catch (e) {
        console.error("Audio synth error:", e);
      }
    }
  };

  return (
    <aside 
      className="floating-actions-dock"
      aria-label="Floating Action Dock"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 990,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem'
      }}
    >
      {/* 1. Meditative 432Hz Audio Bell Toggle (Right-aligned, never blocks text!) */}
      <button 
        onClick={toggleChant} 
        style={{
          background: isPlaying ? 'linear-gradient(135deg, #7A1414, #D97706)' : 'rgba(36, 26, 21, 0.92)',
          color: '#FFF',
          border: '1.5px solid var(--color-gold)',
          borderRadius: 'var(--radius-full)',
          padding: '0.5rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          fontSize: '0.85rem',
          fontWeight: 700,
          backdropFilter: 'blur(8px)',
          transition: 'all 0.25s ease'
        }}
        title={isPlaying ? "ध्यान ध्वनि बंद करें" : "432Hz पावन ध्यान घंटी बजाएं"}
      >
        {isPlaying ? (
          <>
            <Volume2 size={17} color="#FDE68A" />
            <span style={{ color: '#FDE68A' }}>ध्यान ध्वनि चालू</span>
          </>
        ) : (
          <>
            <VolumeX size={17} color="#D1BEAC" />
            <span>ध्यान संगीत</span>
          </>
        )}
      </button>

      {/* 2. Official WhatsApp Help Floating Button */}
      <a 
        href={`https://wa.me/${TRUST_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          width: '46px',
          height: '46px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#25D366',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.45)',
          transition: 'transform 0.25s ease',
          flexShrink: 0
        }}
        title="व्हाट्सएप पर संपर्क करें"
        aria-label="WhatsApp Contact"
      >
        <MessageCircle size={24} />
      </a>
    </aside>
  );
}
