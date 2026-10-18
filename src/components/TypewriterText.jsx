import React, { useState, useEffect } from 'react';

export function TypewriterText({ words = [], pauseDuration = 2600 }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in');

  useEffect(() => {
    if (!words || words.length === 0) return;

    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setFadeState('fade-in');
      }, 300);
    }, pauseDuration);

    return () => clearInterval(interval);
  }, [words, pauseDuration]);

  if (!words || words.length === 0) return null;

  return (
    <span className="typewriter-container" title="सनातन धम्म के कल्याणकारी संदेश">
      <span className={`typewriter-text ${fadeState}`}>
        {words[currentWordIndex]}
      </span>
      <span className="typewriter-cursor" aria-hidden="true">☸</span>
    </span>
  );
}
