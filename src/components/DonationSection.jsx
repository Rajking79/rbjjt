import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, Heart, ShieldCheck, QrCode, 
  Download, Building, ExternalLink, HelpCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRUST_INFO } from '../data/trustData';

export function DonationSection() {
  const [copiedField, setCopiedField] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('1100');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [selectedCause, setSelectedCause] = useState('शिक्षा एवं बाल सहायता (Education)');
  const [receiptGenerated, setReceiptGenerated] = useState(false);

  const amounts = ['251', '501', '1100', '2100', '5100', '11000'];

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const finalAmount = customAmount || selectedAmount;
  const upiLink = `upi://pay?pa=${TRUST_INFO.bankDetails.upiId}&pn=${encodeURIComponent(TRUST_INFO.bankDetails.accountHolder)}&am=${finalAmount}&cu=INR&tn=${encodeURIComponent(selectedCause)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}&color=7A1414&bgcolor=FFFFFF`;

  const handleGenerateReceipt = (e) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert("कृपया दानदाता का नाम दर्ज करें");
      return;
    }
    setReceiptGenerated(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch(err) {}
  };

  return (
    <section id="donate" className="section section-alt">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>पुण्य दान एवं सहयोग</span>
          </div>
          <h2 className="section-title">धम्म सेवा हेतु सहयोग एवं दान (Donate Now)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            “दानं देति सीलं रक्खति” — आपका छोटा सा सहयोग निर्धन बच्चों की शिक्षा, विपश्यना केंद्रों के संचालन और धम्म प्रचार में मील का पत्थर साबित होगा।
          </p>
        </div>

        {/* Donation Grid */}
        <div className="donation-grid">
          {/* Left: Bank Details Card */}
          <div className="bank-info-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-subtle)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Building size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary)' }}>
                  संस्था का अधिकृत बैंक खाता (Official Bank Account)
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  भारतीय स्टेट बैंक (State Bank of India)
                </span>
              </div>
            </div>

            {/* Bank Fields with 1-Click Copy */}
            <div>
              <div className="bank-detail-row">
                <span className="bank-detail-label">खाता धारक का नाम (Account Holder):</span>
                <span className="bank-detail-value" style={{ color: 'var(--color-primary)' }}>
                  {TRUST_INFO.bankDetails.accountHolder}
                </span>
              </div>

              <div className="bank-detail-row">
                <span className="bank-detail-label">खाता संख्या (A/C Number):</span>
                <div className="bank-detail-value">
                  <span style={{ letterSpacing: '1px', fontFamily: 'monospace', fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                    {TRUST_INFO.bankDetails.accountNumber}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(TRUST_INFO.bankDetails.accountNumber, 'acc')}
                    className="copy-btn"
                  >
                    {copiedField === 'acc' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                    <span>{copiedField === 'acc' ? "कॉपी हुआ!" : "कॉपी"}</span>
                  </button>
                </div>
              </div>

              <div className="bank-detail-row">
                <span className="bank-detail-label">IFSC कोड:</span>
                <div className="bank-detail-value">
                  <span style={{ fontFamily: 'monospace', fontSize: '1.15rem' }}>
                    {TRUST_INFO.bankDetails.ifsc}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(TRUST_INFO.bankDetails.ifsc, 'ifsc')}
                    className="copy-btn"
                  >
                    {copiedField === 'ifsc' ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                    <span>{copiedField === 'ifsc' ? "कॉपी हुआ!" : "कॉपी"}</span>
                  </button>
                </div>
              </div>

              <div className="bank-detail-row">
                <span className="bank-detail-label">बैंक का नाम:</span>
                <span className="bank-detail-value">{TRUST_INFO.bankDetails.bankName}</span>
              </div>

              <div className="bank-detail-row">
                <span className="bank-detail-label">शाखा का पता (Branch Address):</span>
                <span className="bank-detail-value" style={{ fontSize: '0.9rem', textAlign: 'right', maxWidth: '300px' }}>
                  {TRUST_INFO.bankDetails.branch}
                </span>
              </div>
            </div>

            {/* Donation Causes & Amount Selector */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                दान हेतु राशि चुनें (Select Amount):
              </label>

              <div className="amount-chips-grid">
                {amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`amount-chip ${selectedAmount === amt && !customAmount ? 'active' : ''}`}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">अन्य इच्छित राशि (₹):</label>
                  <input 
                    type="number"
                    className="form-input"
                    placeholder="कस्टम राशि"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">सहयोग प्रकल्प (Cause):</label>
                  <select 
                    className="form-select"
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                  >
                    <option>शिक्षा एवं बाल सहायता (Education)</option>
                    <option>विहार एवं विपश्यना केंद्र निर्माण</option>
                    <option>धम्म साहित्य व पुस्तक वितरण</option>
                    <option>सामूहिक विवाह संस्कार सहयोग</option>
                    <option>सामान्य धम्म कोष</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right: UPI QR Code & Fast Pay */}
          <div className="qr-code-card">
            <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Instant QR & UPI
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', margin: '0.4rem 0' }}>
              स्कैन कर दान करें (Scan to Pay)
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#FAD9C3' }}>
              Google Pay, PhonePe, Paytm, BHIM या किसी भी UPI ऐप से स्कैन करें
            </p>

            {/* QR Code Container */}
            <div className="qr-code-box">
              <img 
                src={qrUrl} 
                alt="Donation UPI QR Code" 
                style={{ width: '180px', height: '180px', display: 'block' }} 
              />
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', color: '#FFF' }}>
                राशि: ₹{finalAmount} ({selectedCause.slice(0, 20)}...)
              </span>
            </div>

            {/* Online Receipt Generator Form */}
            <div style={{ width: '100%', textAlign: 'left', background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                दान रसीद प्राप्त करें:
              </span>
              <input 
                type="text" 
                placeholder="दानदाता का नाम दर्ज करें"
                className="form-input" 
                style={{ background: '#FFF', color: '#241A15', marginBottom: '0.75rem', fontSize: '0.9rem' }}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
              <button 
                onClick={handleGenerateReceipt}
                className="btn btn-gold btn-sm"
                style={{ width: '100%' }}
              >
                <Download size={15} />
                <span>डिजिटल दान रसीद बनाएं</span>
              </button>
            </div>

            {/* Instant Receipt Popup in Card */}
            {receiptGenerated && (
              <div style={{
                marginTop: '1.25rem',
                background: '#FFF',
                color: '#241A15',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                width: '100%',
                textAlign: 'left',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #DDD', paddingBottom: '0.4rem', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>RBJJT दान रसीद</strong>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>{new Date().toLocaleDateString('hi-IN')}</span>
                </div>
                <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}><strong>दानदाता:</strong> {donorName}</p>
                <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}><strong>सहयोग राशि:</strong> ₹{finalAmount}</p>
                <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}><strong>प्रकल्प:</strong> {selectedCause}</p>
                <p style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, marginTop: '0.4rem' }}>
                  ✓ आपका बहुत-बहुत साधुवाद! भवतु सब्ब मंगलं।
                </p>
                <button 
                  onClick={() => window.print()}
                  className="btn btn-primary btn-sm"
                  style={{ width: '100%', marginTop: '0.6rem', fontSize: '0.8rem', padding: '0.4rem' }}
                >
                  <Download size={13} />
                  <span>रसीद प्रिंट / डाउनलोड करें</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
