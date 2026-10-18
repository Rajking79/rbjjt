import React, { useState } from 'react';
import { X, Copy, Check, Heart, Building, Download, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRUST_INFO } from '../data/trustData';

export function DonationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copiedField, setCopiedField] = useState(null);
  const [amount, setAmount] = useState('1100');
  const [donorName, setDonorName] = useState('');
  const [cause, setCause] = useState('शिक्षा एवं बाल सहायता (Education)');
  const [receiptReady, setReceiptReady] = useState(false);

  const amounts = ['251', '501', '1100', '2100', '5100', '11000'];

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const upiLink = `upi://pay?pa=${TRUST_INFO.bankDetails.upiId}&pn=${encodeURIComponent(TRUST_INFO.bankDetails.accountHolder)}&am=${amount}&cu=INR&tn=${encodeURIComponent(cause)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiLink)}&color=7A1414&bgcolor=FFFFFF`;

  const handleCreateReceipt = (e) => {
    e.preventDefault();
    if (!donorName.trim()) {
      alert("कृपया दानदाता का नाम भरें");
      return;
    }
    setReceiptReady(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch(err) {}
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Heart size={22} fill="var(--color-primary)" color="var(--color-primary)" />
            <h3 className="modal-title">सहयोग एवं दान (Donate Online)</h3>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Quick Bank Summary */}
          <div style={{
            background: 'var(--color-bg)',
            border: '1.5px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>खाता धारक:</span>
              <strong style={{ color: 'var(--color-primary)', fontSize: '0.92rem' }}>
                {TRUST_INFO.bankDetails.accountHolder}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>खाता संख्या (A/C):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--color-primary)' }}>
                  {TRUST_INFO.bankDetails.accountNumber}
                </strong>
                <button 
                  onClick={() => copyToClipboard(TRUST_INFO.bankDetails.accountNumber, 'acc')}
                  className="copy-btn"
                >
                  {copiedField === 'acc' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                  <span>{copiedField === 'acc' ? "कॉपी" : "कॉपी"}</span>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>IFSC कोड:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong style={{ fontFamily: 'monospace', fontSize: '1rem' }}>
                  {TRUST_INFO.bankDetails.ifsc}
                </strong>
                <button 
                  onClick={() => copyToClipboard(TRUST_INFO.bankDetails.ifsc, 'ifsc')}
                  className="copy-btn"
                >
                  {copiedField === 'ifsc' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                  <span>{copiedField === 'ifsc' ? "कॉपी" : "कॉपी"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Amount Selector */}
          <label className="form-label" style={{ marginBottom: '0.4rem', display: 'block' }}>
            सहयोग राशि चुनें (Amount):
          </label>
          <div className="amount-chips-grid" style={{ marginBottom: '1.25rem' }}>
            {amounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`amount-chip ${amount === amt ? 'active' : ''}`}
                onClick={() => setAmount(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          {/* QR Code Frame */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--color-primary-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1.5px dashed var(--color-gold)',
            marginBottom: '1.5rem'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-gold-dark)', marginBottom: '0.5rem' }}>
              UPI QR SCAN (₹{amount})
            </span>
            <div style={{ background: '#FFF', padding: '0.6rem', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
              <img src={qrUrl} alt="Donation QR Code" style={{ width: '160px', height: '160px', display: 'block' }} />
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.6rem' }}>
              GPay, PhonePe, Paytm, BHIM द्वारा स्कैन करें
            </span>
          </div>

          {/* Donor Receipt Generator */}
          {receiptReady ? (
            <div style={{
              background: '#FFF',
              border: '1px solid #10B981',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              color: '#241A15',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '0.4rem', marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--color-primary)' }}>RBJJT डिजिटल दान रसीद</strong>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>{new Date().toLocaleDateString('hi-IN')}</span>
              </div>
              <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}><strong>दानदाता:</strong> {donorName}</p>
              <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}><strong>राशि:</strong> ₹{amount}</p>
              <p style={{ fontSize: '0.85rem', margin: '0.2rem 0' }}><strong>प्रकल्प:</strong> {cause}</p>
              <p style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700, marginTop: '0.4rem' }}>
                ✓ साधुवाद! आपका योगदान समाज कल्याण में उपयोग होगा।
              </p>
              <button 
                onClick={() => window.print()}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', marginTop: '0.6rem' }}
              >
                <Download size={14} />
                <span>रसीद प्रिंट करें</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateReceipt} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input 
                type="text" 
                placeholder="दानदाता का नाम (रसीद हेतु)"
                className="form-input"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
              />
              <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
                <Download size={16} />
                <span>डिजिटल दान रसीद प्राप्त करें</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
