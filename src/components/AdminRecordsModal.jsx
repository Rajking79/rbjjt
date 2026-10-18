import React, { useState, useEffect } from 'react';
import { 
  X, Database, Search, Download, Trash2, CheckCircle2, 
  Clock, Filter, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { INITIAL_RECORDS } from '../data/trustData';

export function AdminRecordsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '920px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Database size={22} color="var(--color-primary)" />
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.25rem' }}>
                ट्रस्ट पोर्टल रिकॉर्ड्स एवं CRM Hub
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                कुल प्रविष्टियाँ: {records.length} | वास्तविक समय में लोकल स्टोरेज व डेटाबेस प्रबंधन
              </span>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '1.5rem',
            background: 'var(--color-bg-alt)',
            padding: '1rem',
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
              <option value="all">सभी फॉर्म्स (All)</option>
              <option value="dhammadhikari">धर्माधिकारी आवेदन</option>
              <option value="matrimonial">विवाह पंजीकरण</option>
              <option value="diksha">दीक्षा आवेदन</option>
              <option value="marriageCert">विवाह प्रमाण-पत्र</option>
            </select>

            {/* Export CSV */}
            <button onClick={handleExportCSV} className="btn btn-gold btn-sm">
              <Download size={15} />
              <span>CSV एक्सपोर्ट</span>
            </button>
          </div>

          {/* Records Table */}
          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ padding: '0.8rem 1rem' }}>ID & तिथि</th>
                  <th style={{ padding: '0.8rem 1rem' }}>प्रकार</th>
                  <th style={{ padding: '0.8rem 1rem' }}>आवेदक नाम</th>
                  <th style={{ padding: '0.8rem 1rem' }}>फोन व जनपद</th>
                  <th style={{ padding: '0.8rem 1rem' }}>स्थिति (Status)</th>
                  <th style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>क्रियाएँ</th>
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
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <strong style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>{rec.id}</strong>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rec.date}</span>
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <span style={{ 
                          fontSize: '0.78rem', 
                          fontWeight: 700, 
                          background: 'var(--color-gold-soft)', 
                          color: 'var(--color-gold-dark)', 
                          padding: '2px 8px', 
                          borderRadius: '10px' 
                        }}>
                          {rec.typeName}
                        </span>
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <strong>{rec.name}</strong>
                        {rec.details && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            {rec.details.slice(0, 35)}...
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <div>{rec.phone}</div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rec.district}</span>
                      </td>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <button
                          onClick={() => handleToggleStatus(rec.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '3px 8px',
                            borderRadius: '12px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            backgroundColor: rec.status.includes('स्वीकृत') || rec.status.includes('प्रमाणित') ? 'var(--color-success-bg)' : '#FEF3C7',
                            color: rec.status.includes('स्वीकृत') || rec.status.includes('प्रमाणित') ? 'var(--color-success)' : '#D97706'
                          }}
                          title="स्थिति बदलने के लिए क्लिक करें"
                        >
                          {rec.status.includes('स्वीकृत') ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                          <span>{rec.status}</span>
                        </button>
                      </td>
                      <td style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>
                        <button 
                          onClick={() => handleDeleteRecord(rec.id)}
                          style={{ color: 'var(--color-error)', padding: '4px', cursor: 'pointer' }}
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
        </div>
      </div>
    </div>
  );
}
