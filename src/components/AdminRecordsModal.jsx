import React, { useState, useEffect } from 'react';
import { 
  X, Database, Search, Download, Trash2, CheckCircle2, 
  Clock, Filter, ShieldCheck, RefreshCw, Settings, Save, Check 
} from 'lucide-react';
import { INITIAL_RECORDS, TRUST_INFO } from '../data/trustData';

export function AdminRecordsModal({ isOpen, onClose, onConfigSaved }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('records'); // 'records' | 'customizer'
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [saveAlert, setSaveAlert] = useState(false);

  // Live Customizable Config State
  const [customConfig, setCustomConfig] = useState({
    phone: TRUST_INFO.phone,
    whatsapp: TRUST_INFO.whatsapp,
    email: TRUST_INFO.email,
    accountNumber: TRUST_INFO.bankDetails.accountNumber,
    ifsc: TRUST_INFO.bankDetails.ifsc,
    upiId: TRUST_INFO.bankDetails.upiId,
    headquarters: TRUST_INFO.headquarters
  });

  useEffect(() => {
    const saved = localStorage.getItem('rbjjt_records');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setRecords(parsed.length > 0 ? parsed : INITIAL_RECORDS);
      } catch(e) {
        setRecords(INITIAL_RECORDS);
      }
    } else {
      setRecords(INITIAL_RECORDS);
      localStorage.setItem('rbjjt_records', JSON.stringify(INITIAL_RECORDS));
    }

    const savedConfig = localStorage.getItem('rbjjt_custom_info');
    if (savedConfig) {
      try {
        setCustomConfig(JSON.parse(savedConfig));
      } catch(e) {}
    }
  }, [isOpen]);

  const filteredRecords = records.filter(rec => {
    const matchesSearch = rec.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.phone?.includes(searchTerm) ||
                          rec.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.id?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || rec.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleExportCSV = () => {
    if (records.length === 0) {
      alert("कोई रिकॉर्ड उपलब्ध नहीं है");
      return;
    }
    const headers = ["ID", "Form Type", "Name", "Phone", "District", "Date", "Status", "Details"];
    const rows = records.map(r => [
      `"${r.id}"`,
      `"${r.typeName}"`,
      `"${r.name}"`,
      `"${r.phone}"`,
      `"${r.district}"`,
      `"${r.date}"`,
      `"${r.status}"`,
      `"${r.details || ''}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RBJJT_Records_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleStatus = (id) => {
    const updated = records.map(rec => {
      if (rec.id === id) {
        const newStatus = rec.status.includes('स्वीकृत') ? 'प्रतीक्षारत (Pending)' : 'स्वीकृत (Approved)';
        return { ...rec, status: newStatus };
      }
      return rec;
    });
    setRecords(updated);
    localStorage.setItem('rbjjt_records', JSON.stringify(updated));
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm("क्या आप इस रिकॉर्ड को हटाना चाहते हैं?")) {
      const updated = records.filter(r => r.id !== id);
      setRecords(updated);
      localStorage.setItem('rbjjt_records', JSON.stringify(updated));
    }
  };

  const handleSaveCustomConfig = (e) => {
    e.preventDefault();
    localStorage.setItem('rbjjt_custom_info', JSON.stringify(customConfig));
    setSaveAlert(true);
    if (onConfigSaved) onConfigSaved(customConfig);
    setTimeout(() => setSaveAlert(false), 3000);
  };

  const handleResetDefaults = () => {
    if (window.confirm("क्या आप सेटिंग्स को डिफ़ॉल्ट मानों पर रीसेट करना चाहते हैं?")) {
      const def = {
        phone: TRUST_INFO.phone,
        whatsapp: TRUST_INFO.whatsapp,
        email: TRUST_INFO.email,
        accountNumber: TRUST_INFO.bankDetails.accountNumber,
        ifsc: TRUST_INFO.bankDetails.ifsc,
        upiId: TRUST_INFO.bankDetails.upiId,
        headquarters: TRUST_INFO.headquarters
      };
      setCustomConfig(def);
      localStorage.setItem('rbjjt_custom_info', JSON.stringify(def));
      if (onConfigSaved) onConfigSaved(def);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '960px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Database size={22} color="var(--color-primary)" />
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.25rem' }}>
                ट्रस्ट पोर्टल प्रबंधन एवं कस्टमाइज़र (Admin CRM)
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                कुल आवेदन: {records.length} | डेटाबेस व सेटिंग्स कस्टमाइज़ेशन हब
              </span>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-alt)' }}>
          <button 
            onClick={() => setActiveTab('records')}
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'records' ? '3px solid var(--color-primary)' : '3px solid transparent',
              color: activeTab === 'records' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              background: activeTab === 'records' ? 'var(--color-surface)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Database size={16} />
            <span>पंजीकृत आवेदन रिकॉर्ड्स ({records.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('customizer')}
            style={{
              padding: '0.75rem 1.5rem',
              fontWeight: 700,
              fontSize: '0.92rem',
              borderBottom: activeTab === 'customizer' ? '3px solid var(--color-primary)' : '3px solid transparent',
              color: activeTab === 'customizer' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              background: activeTab === 'customizer' ? 'var(--color-surface)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer'
            }}
          >
            <Settings size={16} />
            <span>ट्रस्ट सेटिंग्स एवं कस्टमाइज़र</span>
          </button>
        </div>

        <div className="modal-body">
          {/* TAB 1: RECORDS CRM */}
          {activeTab === 'records' ? (
            <>
              {/* Controls Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '1.25rem',
                background: 'var(--color-bg-alt)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)'
              }}>
                {/* Search Input */}
                <div style={{ position: 'relative', flexGrow: 1, minWidth: '220px' }}>
                  <Search size={16} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--color-text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="नाम, फोन, जिला या ID खोजें..."
                    className="form-input"
                    style={{ paddingLeft: '2.4rem', fontSize: '0.9rem' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Filter Dropdown */}
                <select 
                  className="form-select" 
                  style={{ width: 'auto', minWidth: '160px', fontSize: '0.88rem' }}
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">सभी फॉर्म्स (All Forms)</option>
                  <option value="dhammadhikari">1. धर्माधिकारी आवेदन</option>
                  <option value="matrimonial">2. विवाह बायोडाटा</option>
                  <option value="diksha">3. दीक्षा आवेदन</option>
                  <option value="marriageCert">4. विवाह प्रमाण-पत्र</option>
                  <option value="health">5. स्वास्थ्य शिविर</option>
                </select>

                {/* Export CSV */}
                <button onClick={handleExportCSV} className="btn btn-gold btn-sm">
                  <Download size={15} />
                  <span>CSV एक्सपोर्ट</span>
                </button>
              </div>

              {/* Records Table */}
              <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', maxHeight: '420px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                    <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>ID & तिथि</th>
                      <th style={{ padding: '0.75rem 1rem' }}>प्रकार</th>
                      <th style={{ padding: '0.75rem 1rem' }}>आवेदक नाम</th>
                      <th style={{ padding: '0.75rem 1rem' }}>फोन व जिला</th>
                      <th style={{ padding: '0.75rem 1rem' }}>स्थिति</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>हटाएँ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--color-text-muted)' }}>
                          कोई रिकॉर्ड प्राप्त नहीं हुआ
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((rec) => (
                        <tr key={rec.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <strong style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>{rec.id}</strong>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rec.date}</span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{ 
                              fontSize: '0.76rem', 
                              fontWeight: 700, 
                              background: 'var(--color-gold-soft)', 
                              color: 'var(--color-gold-dark)', 
                              padding: '2px 8px', 
                              borderRadius: '10px' 
                            }}>
                              {rec.typeName}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <strong>{rec.name}</strong>
                            {rec.details && (
                              <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                {rec.details.slice(0, 35)}...
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <div>{rec.phone}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rec.district}</span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <button
                              onClick={() => handleToggleStatus(rec.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: 'none',
                                backgroundColor: rec.status.includes('स्वीकृत') || rec.status.includes('जारी') ? 'var(--color-success-bg)' : '#FEF3C7',
                                color: rec.status.includes('स्वीकृत') || rec.status.includes('जारी') ? 'var(--color-success)' : '#D97706'
                              }}
                              title="स्थिति बदलने के लिए क्लिक करें"
                            >
                              {rec.status.includes('स्वीकृत') || rec.status.includes('जारी') ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                              <span>{rec.status}</span>
                            </button>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                            <button 
                              onClick={() => handleDeleteRecord(rec.id)}
                              style={{ color: 'var(--color-error)', padding: '4px', cursor: 'pointer', background: 'transparent', border: 'none' }}
                              title="हटाएँ"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* TAB 2: LIVE TRUST SETTINGS CUSTOMIZER */
            <form onSubmit={handleSaveCustomConfig} style={{ padding: '0.5rem 0' }}>
              <div style={{ background: 'var(--color-primary-subtle)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', borderLeft: '4px solid var(--color-primary)' }}>
                <strong>ट्रस्ट कस्टमाइज़र निर्देश:</strong> यहाँ से आप वेबसाइट का फोन नंबर, बैंक खाता, यूपीआई आईडी व पता सीधे बदल सकते हैं। सेव करते ही पूरी वेबसाइट तुरंत अपडेट हो जाएगी।
              </div>

              {saveAlert && (
                <div style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} />
                  <span>बधाई! आपकी नई सेटिंग्स सफलतापूर्वक सहेज ली गईं और वेबसाइट पर लागू कर दी गईं।</span>
                </div>
              )}

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">ट्रस्ट हेल्पलाइन फोन नंबर</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={customConfig.phone}
                    onChange={(e) => setCustomConfig({ ...customConfig, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">व्हाट्सएप संपर्क नंबर</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={customConfig.whatsapp}
                    onChange={(e) => setCustomConfig({ ...customConfig, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">आधिकारिक ईमेल आईडी</label>
                  <input 
                    type="email" 
                    className="form-input"
                    value={customConfig.email}
                    onChange={(e) => setCustomConfig({ ...customConfig, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">दान हेतु यूपीआई आईडी (UPI ID)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={customConfig.upiId}
                    onChange={(e) => setCustomConfig({ ...customConfig, upiId: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">SBI खाता संख्या (Bank Account No.)</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={customConfig.accountNumber}
                    onChange={(e) => setCustomConfig({ ...customConfig, accountNumber: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">IFSC कोड</label>
                  <input 
                    type="text" 
                    className="form-input"
                    value={customConfig.ifsc}
                    onChange={(e) => setCustomConfig({ ...customConfig, ifsc: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">केंद्रीय कार्यालय का पता (Headquarters)</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={customConfig.headquarters}
                  onChange={(e) => setCustomConfig({ ...customConfig, headquarters: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={handleResetDefaults}
                  className="btn btn-outline"
                >
                  <RefreshCw size={16} />
                  <span>डिफ़ॉल्ट पर रीसेट करें</span>
                </button>

                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  <Save size={16} />
                  <span>सेव करें और वेबसाइट पर लागू करें</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
