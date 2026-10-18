import React from 'react';

export function MarqueeBanner() {
  const items = [
    "☸️ राष्ट्रीय बौद्ध जन जागरण ट्रस्ट (Reg. No. 069/16)",
    "🌸 तथागत बुद्ध का संदेश: शील, समाधि और प्रज्ञा",
    "📚 असहाय व निर्धन बच्चों हेतु निःशुल्क शिक्षा एवं प्रेरणा प्रकल्प",
    "💍 दहेज-मुक्त आदर्श बौद्ध विवाह संस्कार एवं अधिकृत प्रमाण-पत्र",
    "🧘 प्राकृतिक चिकित्सा, योग एवं विपश्यना ध्यान साधना शिविर",
    "🛡️ आत्मसम्मान व सुरक्षा हेतु मार्शल आर्ट्स व आत्मरक्षा प्रशिक्षण",
    "✨ भवतु सब्ब मंगलं • सर्वजन हिताय, सर्वजन सुखाय"
  ];

  return (
    <div className="marquee-wrapper" role="marquee" aria-label="Buddhist news and mantra marquee">
      <div className="marquee-content">
        {items.map((item, idx) => (
          <span key={`item-1-${idx}`} className="marquee-item">
            {item}
            <span className="marquee-separator">•</span>
          </span>
        ))}
      </div>
      <div className="marquee-content" aria-hidden="true">
        {items.map((item, idx) => (
          <span key={`item-2-${idx}`} className="marquee-item">
            {item}
            <span className="marquee-separator">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
