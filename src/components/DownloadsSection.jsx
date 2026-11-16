import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, BookOpen, Sparkles, Printer } from 'lucide-react';
import { OFFICIAL_DOWNLOADS } from '../data/trustData';

export function DownloadsSection() {
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const handleDownload = (doc) => {
    // If it's dhammadhikari form, scroll to forms
    if (doc.id === 'dhammadhikari-form' || doc.id === 'marriage-guide') {
      const el = document.getElementById('forms');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setDownloadSuccess(doc.title);
    setTimeout(() => {
      window.print();
      setDownloadSuccess(null);
    }, 800);
  };

  return (
    <section id="downloads" className="section downloads-section section-alt">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="badge-tag animate-bounce-subtle">
            <Download size={14} />
            <span>अधिकृत प्रपत्र, पुस्तिकाएं एवं साहित्य</span>
          </div>
          <h2 className="section-title">डाउनलोड केंद्र (Official Downloads)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            ट्रस्ट की विवरणिका, आवेदन प्रपत्र, 22 प्रतिज्ञाएं संकल्प पत्र, और दैनिक वंदना की प्रामाणिक PDF प्रतियां निःशुल्क डाउनलोड एवं प्रिंट करें।
          </p>
        </div>

        {downloadSuccess && (
          <div className="download-alert-banner">
            <CheckCircle2 size={18} color="#059669" />
            <span><strong>{downloadSuccess}</strong> तैयार हो रहा है... प्रिंट/सेव डायलॉग खुल रहा है।</span>
          </div>
        )}

        {/* Downloads Grid */}
        <div className="downloads-grid">
          {OFFICIAL_DOWNLOADS.map(doc => (
            <div key={doc.id} className="download-card">
              <div className="download-card-top">
                <div className="download-icon-box">
                  <FileText size={24} color="#7A1414" />
                </div>
                <div className="download-meta-pills">
                  <span className="pill-format">{doc.format}</span>
                  <span className="pill-size">{doc.size}</span>
                </div>
              </div>

              <span className="download-category">{doc.category}</span>
              <h4 className="download-card-title">{doc.title}</h4>
              <p className="download-card-desc">{doc.desc}</p>

              <div className="download-card-footer">
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="btn btn-primary btn-sm btn-block"
                >
                  <Download size={15} />
                  <span>डाउनलोड / प्रिंट करें</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

