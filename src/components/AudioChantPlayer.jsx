import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Music } from 'lucide-react';

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
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: 990,
      background: 'rgba(36, 26, 21, 0.92)',
      backdropFilter: 'blur(10px)',
      border: '1.5px solid var(--color-gold)',
      color: '#FFF',
      borderRadius: 'var(--radius-full)',
      padding: '0.45rem 1.1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      boxShadow: 'var(--shadow-gold)',
      transition: 'all 0.3s ease'
    }}>
      <button 
        onClick={toggleChant} 
        style={{ color: '#FBBF24', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        aria-label="Toggle Meditative Bell"
        title={isPlaying ? "शांति ध्वनि बंद करें" : "432Hz ध्यान घंटी बजाएं"}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FDF4E7' }}>
        {isPlaying ? "साधना घंटी: सक्रिय (432Hz)" : "ध्यान संगीत (Chant Bell)"}
      </span>

      {isPlaying && (
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block', animation: 'pulseGlow 1.5s infinite' }}></span>
      )}
    </div>
  );
}
