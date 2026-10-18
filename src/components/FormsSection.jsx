import React, { useState, useEffect } from 'react';
import { 
  Sparkles, UserCheck, Heart, Award, FileText, CheckCircle2, 
  Printer, Download, AlertCircle, RefreshCw, Eye 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRUST_INFO } from '../data/trustData';

export function FormsSection({ onRecordAdded }) {
  const [activeTab, setActiveTab] = useState('dhammadhikari'); // 'dhammadhikari' | 'matrimonial' | 'diksha' | 'marriageCert'
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  // Dhammadhikari Form State
  const [dhammaForm, setDhammaForm] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    gender: 'पुरुष (Male)',
    qualification: '',
    mobile: '',
    whatsapp: '',
    email: '',
    village: '',
    post: '',
    thana: '',
    block: '',
    district: '',
    state: 'उत्तर प्रदेश',
    pincode: '',
    currentResponsibility: '',
    pledgeAccepted: false
  });

  // Matrimonial Form State
  const [matriForm, setMatriForm] = useState({
    candidateType: 'वर (Groom)',
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    height: '',
    education: '',
    occupation: '',
    monthlyIncome: '',
    village: '',
    district: '',
    state: 'उत्तर प्रदेश',
    mobile: '',
    buddhistValues: 'हाँ, बौद्ध रीति-रिवाज से विवाह में पूर्ण आस्था है',
    dowryFreePledge: false
  });

  // Diksha Form State
  const [dikshaForm, setDikshaForm] = useState({
    fullName: '',
    fatherHusbandName: '',
    dob: '',
    gender: 'पुरुष (Male)',
    mobile: '',
    address: '',
    district: '',
    preferredDate: '',
    preferredLocation: 'सारनाथ, वाराणसी (Sarnath Center)',
    panchsheelPledge: false
  });

  // Marriage Certificate Form State
  const [certForm, setCertForm] = useState({
    groomName: '',
    groomFather: '',
    brideName: '',
    brideFather: '',
    marriageDate: '',
    marriagePlace: 'बौद्ध विहार / गृह स्थान',
    witnessName1: '',
    witnessName2: '',
    presidingBhikkhu: 'पूज्य भिक्खु संघ',
    contactMobile: ''
  });

  // Load drafts from localStorage
  useEffect(() => {
    const savedDhamma = localStorage.getItem('rbjjt_draft_dhamma');
    if (savedDhamma) {
      try { setDhammaForm(JSON.parse(savedDhamma)); } catch (e) {}
    }
  }, []);

  // Save drafts
  const handleDhammaChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    const updated = { ...dhammaForm, [name]: val };
    setDhammaForm(updated);
    localStorage.setItem('rbjjt_draft_dhamma', JSON.stringify(updated));
  };

  const handleMatriChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setMatriForm(prev => ({ ...prev, [name]: val }));
  };

  const handleDikshaChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setDikshaForm(prev => ({ ...prev, [name]: val }));
  };

  const handleCertChange = (e) => {
    const { name, value } = e.target;
    setCertForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit Handler for Dhammadhikari
  const handleDhammaSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!dhammaForm.fullName.trim()) newErrors.fullName = "कृपया पूरा नाम दर्ज करें";
    if (!dhammaForm.fatherName.trim()) newErrors.fatherName = "पिता/अभिभावक का नाम आवश्यक है";
    if (!dhammaForm.mobile.trim() || dhammaForm.mobile.length < 10) newErrors.mobile = "मान्य 10 अंकों का मोबाइल नंबर दर्ज करें";
    if (!dhammaForm.district.trim()) newErrors.district = "जनपद/जिला का नाम दर्ज करें";
    if (!dhammaForm.pledgeAccepted) newErrors.pledgeAccepted = "प्रतिज्ञा पत्र स्वीकार करना अनिवार्य है";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const appId = `RBJJT-DH-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'dhammadhikari',
      typeName: 'धर्माधिकारी आवेदन',
      name: dhammaForm.fullName,
      phone: dhammaForm.mobile,
      district: dhammaForm.district,
      state: dhammaForm.state,
      status: 'स्वीकृत (Approved)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `ब्लॉक: ${dhammaForm.block || 'एन/ए'}, शिक्षा: ${dhammaForm.qualification || 'एन/ए'}, गांव: ${dhammaForm.village || 'एन/ए'}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "धर्माधिकारी आवेदन सफलतापूर्वक पंजीकृत हुआ!",
      subtitle: "राष्ट्रीय बौद्ध जन जागरण ट्रस्ट की ओर से आपका हार्दिक अभिनंदन।",
      name: dhammaForm.fullName,
      fatherName: dhammaForm.fatherName,
      phone: dhammaForm.mobile,
      district: dhammaForm.district,
      date: new Date().toLocaleDateString('hi-IN'),
      type: "धर्माधिकारी पहचान पर्ची (ID Slip)"
    });
  };

  // Submit Handler for Matrimonial
  const handleMatriSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!matriForm.fullName.trim()) newErrors.matriName = "कृपया प्रत्याशी का नाम दर्ज करें";
    if (!matriForm.mobile.trim()) newErrors.matriMobile = "संपर्क नंबर दर्ज करें";
    if (!matriForm.dowryFreePledge) newErrors.dowryFreePledge = "दहेज-मुक्त संकल्प अनिवार्य है";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const appId = `RBJJT-MAT-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'matrimonial',
      typeName: 'विवाह पंजीकरण',
      name: matriForm.fullName,
      phone: matriForm.mobile,
      district: matriForm.district,
      state: matriForm.state,
      status: 'सक्रिय (Active)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `${matriForm.candidateType}, शिक्षा: ${matriForm.education}, व्यवसाय: ${matriForm.occupation}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "आवाह-विवाह बायोडाटा पंजीकरण सफल!",
      subtitle: "दहेज-मुक्त बौद्ध संस्कार वैवाहिक सूची में आपका नाम जोड़ दिया गया है।",
      name: matriForm.fullName,
      fatherName: matriForm.fatherName,
      phone: matriForm.mobile,
      district: matriForm.district,
      date: new Date().toLocaleDateString('hi-IN'),
      type: "वैवाहिक पंजीकरण पर्ची"
    });
  };

  // Submit Handler for Diksha
  const handleDikshaSubmit = (e) => {
    e.preventDefault();
    if (!dikshaForm.fullName.trim()) {
      setErrors({ dikshaName: "कृपया नाम दर्ज करें" });
      return;
    }
    if (!dikshaForm.mobile.trim()) {
      setErrors({ dikshaMobile: "मोबाइल नंबर दर्ज करें" });
      return;
    }
    if (!dikshaForm.panchsheelPledge) {
      setErrors({ panchsheelPledge: "पंचशील पालन का संकल्प अनिवार्य है" });
      return;
    }

    setErrors({});
    const appId = `RBJJT-DK-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'diksha',
      typeName: 'दीक्षा आवेदन',
      name: dikshaForm.fullName,
      phone: dikshaForm.mobile,
      district: dikshaForm.district || 'वाराणसी',
      state: 'उत्तर प्रदेश',
      status: 'पुष्टि प्रतीक्षारत',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `केंद्र: ${dikshaForm.preferredLocation}, इच्छुक तिथि: ${dikshaForm.preferredDate || 'जल्द ही'}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "दीक्षा संकल्प पत्र सफलतापूर्वक प्राप्त हुआ!",
      subtitle: "तथागत बुद्ध के शील, समाधि और प्रज्ञा मार्ग पर आपका स्वागत है।",
      name: dikshaForm.fullName,
      fatherName: dikshaForm.fatherHusbandName,
      phone: dikshaForm.mobile,
      district: dikshaForm.district,
      date: new Date().toLocaleDateString('hi-IN'),
      type: "दीक्षा संकल्प रसीद"
    });
  };

  // Submit Handler for Marriage Certificate
  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (!certForm.groomName.trim() || !certForm.brideName.trim()) {
      setErrors({ certNames: "वर एवं वधू दोनों का नाम दर्ज करना आवश्यक है" });
      return;
    }
    if (!certForm.contactMobile.trim()) {
      setErrors({ certMobile: "संपर्क नंबर दर्ज करें" });
      return;
    }

    setErrors({});
    const appId = `RBJJT-MC-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'marriageCert',
      typeName: 'विवाह प्रमाण-पत्र आवेदन',
      name: `${certForm.groomName} संग ${certForm.brideName}`,
      phone: certForm.contactMobile,
      district: 'सारनाथ, वाराणसी',
      state: 'उत्तर प्रदेश',
      status: 'प्रमाणित (Verified)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `विवाह तिथि: ${certForm.marriageDate || 'हाल ही में'}, साक्षी: ${certForm.witnessName1}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "विवाह प्रमाण-पत्र आवेदन सफलतापूर्वक दर्ज हुआ!",
      subtitle: "सत्यापन उपरांत अधिकृत बौद्ध विवाह प्रमाण-पत्र जारी किया जाएगा।",
      name: `${certForm.groomName} एवं ${certForm.brideName}`,
      fatherName: `वर पिता: ${certForm.groomFather || 'एन/ए'} | वधू पिता: ${certForm.brideFather || 'एन/ए'}`,
      phone: certForm.contactMobile,
      district: "सारनाथ, वाराणसी",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "विवाह प्रमाण-पत्र आवेदन रसीद"
    });
  };

  const saveRecord = (record) => {
    const existing = JSON.parse(localStorage.getItem('rbjjt_records') || '[]');
    const updated = [record, ...existing];
    localStorage.setItem('rbjjt_records', JSON.stringify(updated));
    if (onRecordAdded) onRecordAdded(updated.length);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section id="forms" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>डिजिटल सेवा एवं ऑनलाइन पंजीकरण</span>
          </div>
          <h2 className="section-title">ट्रस्ट ऑनलाइन आवेदन केंद्र (Online Forms)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            धर्माधिकारी पद हेतु आवेदन, दहेज-मुक्त बौद्ध विवाह बायोडाटा, धम्म दीक्षा एवं विवाह प्रमाण-पत्र हेतु अधिकृत फॉर्म भरें।
          </p>
        </div>

        {/* Form Card Container */}
        <div className="form-suite-card">
          {/* Form Tabs Header */}
          <div className="form-tabs-header">
            <button 
              className={`form-tab-btn ${activeTab === 'dhammadhikari' ? 'active' : ''}`}
              onClick={() => { setActiveTab('dhammadhikari'); setSubmissionSuccess(null); }}
            >
              <UserCheck size={18} />
              <span>1. धर्माधिकारी आवेदन</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'matrimonial' ? 'active' : ''}`}
              onClick={() => { setActiveTab('matrimonial'); setSubmissionSuccess(null); }}
            >
              <Heart size={18} />
              <span>2. आवाह-विवाह फार्म</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'diksha' ? 'active' : ''}`}
              onClick={() => { setActiveTab('diksha'); setSubmissionSuccess(null); }}
            >
              <Award size={18} />
              <span>3. दीक्षा आवेदन</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'marriageCert' ? 'active' : ''}`}
              onClick={() => { setActiveTab('marriageCert'); setSubmissionSuccess(null); }}
            >
              <FileText size={18} />
              <span>4. विवाह प्रमाण-पत्र</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="form-body">
            {/* SUCCESS SLIP VIEW */}
            {submissionSuccess ? (
              <div className="submission-slip-card">
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <CheckCircle2 size={36} />
                </div>

                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {submissionSuccess.type}
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-primary)', margin: '0.5rem 0' }}>
                  {submissionSuccess.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  {submissionSuccess.subtitle}
                </p>

                {/* Slip Details Box */}
                <div style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  maxWidth: '500px',
                  margin: '0 auto 2rem auto',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>आवेदन संख्या (App ID):</span>
                    <strong style={{ color: 'var(--color-primary)' }}>{submissionSuccess.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>आवेदक का नाम:</span>
                    <strong>{submissionSuccess.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>पिता / अभिभावक:</span>
                    <span>{submissionSuccess.fatherName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>पंजीकरण तिथि:</span>
                    <span>{submissionSuccess.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.6rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>मुख्यालय:</span>
                    <span style={{ color: 'var(--color-gold-dark)', fontWeight: 700 }}>सारनाथ, वाराणसी</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={handlePrintSlip} className="btn btn-primary">
                    <Printer size={18} />
                    <span>प्रिंट / सेव करें (Print Slip)</span>
                  </button>
                  <button 
                    onClick={() => setSubmissionSuccess(null)} 
                    className="btn btn-outline"
                  >
                    <RefreshCw size={17} />
                    <span>नया फॉर्म भरें</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* 1. DHAMMADHIKARI FORM */}
                {activeTab === 'dhammadhikari' && (
                  <form onSubmit={handleDhammaSubmit}>
                    <div className="form-instructions">
                      <strong>धर्माधिकारी आवेदन निर्देश:</strong> तथागत बुद्ध द्वारा प्रतिपादित धर्म को गांव-गांव तक पहुँचाने हेतु इस फॉर्म को भरें। सफल पंजीकरण पर आपको अधिकृत पहचान व दायित्व सौंपा जाएगा।
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">आवेदक का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="fullName"
                          className="form-input" 
                          placeholder="उदा. राहुल कुमार"
                          value={dhammaForm.fullName}
                          onChange={handleDhammaChange}
                        />
                        {errors.fullName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.fullName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">पिता / अभिभावक का नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="fatherName"
                          className="form-input" 
                          placeholder="पिता का नाम"
                          value={dhammaForm.fatherName}
                          onChange={handleDhammaChange}
                        />
                        {errors.fatherName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.fatherName}</span>}
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">जन्म तिथि</label>
                        <input 
                          type="date" 
                          name="dob"
                          className="form-input" 
                          value={dhammaForm.dob}
                          onChange={handleDhammaChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">लिंग (Gender)</label>
                        <select 
                          name="gender" 
                          className="form-select"
                          value={dhammaForm.gender}
                          onChange={handleDhammaChange}
                        >
                          <option>पुरुष (Male)</option>
                          <option>महिला (Female)</option>
                          <option>अन्य</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">शैक्षणिक योग्यता</label>
                        <input 
                          type="text" 
                          name="qualification"
                          className="form-input" 
                          placeholder="उदा. 12वीं / स्नातक / परास्नातक"
                          value={dhammaForm.qualification}
                          onChange={handleDhammaChange}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">मोबाइल नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          name="mobile"
                          className="form-input" 
                          placeholder="10 अंकों का फोन नंबर"
                          value={dhammaForm.mobile}
                          onChange={handleDhammaChange}
                        />
                        {errors.mobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.mobile}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">व्हाट्सएप नंबर (यदि अलग हो)</label>
                        <input 
                          type="tel" 
                          name="whatsapp"
                          className="form-input" 
                          placeholder="व्हाट्सएप नंबर"
                          value={dhammaForm.whatsapp}
                          onChange={handleDhammaChange}
                        />
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">ग्राम / मोहल्ला</label>
                        <input 
                          type="text" 
                          name="village"
                          className="form-input" 
                          placeholder="ग्राम"
                          value={dhammaForm.village}
                          onChange={handleDhammaChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">ब्लॉक (प्रखंड)</label>
                        <input 
                          type="text" 
                          name="block"
                          className="form-input" 
                          placeholder="ब्लॉक"
                          value={dhammaForm.block}
                          onChange={handleDhammaChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">जनपद / जिला <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="district"
                          className="form-input" 
                          placeholder="उदा. वाराणसी / भदोही / सोनभद्र"
                          value={dhammaForm.district}
                          onChange={handleDhammaChange}
                        />
                        {errors.district && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.district}</span>}
                      </div>
                    </div>

                    {/* Pledge Checkbox */}
                    <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          name="pledgeAccepted"
                          className="form-checkbox"
                          checked={dhammaForm.pledgeAccepted}
                          onChange={handleDhammaChange}
                        />
                        <span>
                          <strong>प्रतिज्ञा पत्र:</strong> मैं सत्यनिष्ठा से प्रतिज्ञा करता/करती हूँ कि मैं तथागत बुद्ध के कल्याणकारी सनातन धर्म, शील, समाधि, प्रज्ञा का आचरण करूँगा और राष्ट्रीय बौद्ध जन जागरण ट्रस्ट के संविधान व नियमों का निष्ठापूर्वक पालन करूँगा। <span className="required">*</span>
                        </span>
                      </label>
                      {errors.pledgeAccepted && <p style={{ color: 'var(--color-error)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.pledgeAccepted}</p>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                      <button type="submit" className="btn btn-primary btn-lg">
                        <UserCheck size={20} />
                        <span>धर्माधिकारी आवेदन सबमिट करें</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. MATRIMONIAL FORM */}
                {activeTab === 'matrimonial' && (
                  <form onSubmit={handleMatriSubmit}>
                    <div className="form-instructions">
                      <strong>आवाह-विवाह हेतु बायोडाटा पंजीकरण:</strong> ट्रस्ट द्वारा दहेज-मुक्त, सादगीपूर्ण एवं सम्मानजनक बौद्ध विवाह संबंधों को सुगम बनाने हेतु यह मंच संचालित किया जाता है।
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">प्रत्याशी प्रकार</label>
                        <select 
                          name="candidateType" 
                          className="form-select"
                          value={matriForm.candidateType}
                          onChange={handleMatriChange}
                        >
                          <option>वर (Groom)</option>
                          <option>वधू (Bride)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">प्रत्याशी का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="fullName"
                          className="form-input" 
                          placeholder="नाम"
                          value={matriForm.fullName}
                          onChange={handleMatriChange}
                        />
                        {errors.matriName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.matriName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">जन्म तिथि</label>
                        <input 
                          type="date" 
                          name="dob"
                          className="form-input" 
                          value={matriForm.dob}
                          onChange={handleMatriChange}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">पिता का नाम</label>
                        <input 
                          type="text" 
                          name="fatherName"
                          className="form-input" 
                          placeholder="पिता का नाम"
                          value={matriForm.fatherName}
                          onChange={handleMatriChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">माता का नाम</label>
                        <input 
                          type="text" 
                          name="motherName"
                          className="form-input" 
                          placeholder="माता का नाम"
                          value={matriForm.motherName}
                          onChange={handleMatriChange}
                        />
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">शैक्षणिक योग्यता</label>
                        <input 
                          type="text" 
                          name="education"
                          className="form-input" 
                          placeholder="उदा. B.Tech / B.A. / B.Ed"
                          value={matriForm.education}
                          onChange={handleMatriChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">व्यवसाय / पद</label>
                        <input 
                          type="text" 
                          name="occupation"
                          className="form-input" 
                          placeholder="उदा. शिक्षक / प्राइवेट सर्विस / व्यापार"
                          value={matriForm.occupation}
                          onChange={handleMatriChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">संपर्क फोन नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          name="mobile"
                          className="form-input" 
                          placeholder="फोन नंबर"
                          value={matriForm.mobile}
                          onChange={handleMatriChange}
                        />
                        {errors.matriMobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.matriMobile}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">गृह जनपद / शहर</label>
                      <input 
                        type="text" 
                        name="district"
                        className="form-input" 
                        placeholder="जिला एवं राज्य"
                        value={matriForm.district}
                        onChange={handleMatriChange}
                      />
                    </div>

                    <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          name="dowryFreePledge"
                          className="form-checkbox"
                          checked={matriForm.dowryFreePledge}
                          onChange={handleMatriChange}
                        />
                        <span>
                          <strong>दहेज-मुक्त संकल्प:</strong> हम दहेज प्रथा के सख्त विरोधी हैं और भगवान बुद्ध व बाबासाहब डॉ. आम्बेडकर के विचारों के अनुरूप सादगीपूर्ण संस्कार से विवाह करने का संकल्प लेते हैं। <span className="required">*</span>
                        </span>
                      </label>
                      {errors.dowryFreePledge && <p style={{ color: 'var(--color-error)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.dowryFreePledge}</p>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn btn-gold btn-lg">
                        <Heart size={20} fill="#FFF" />
                        <span>वैवाहिक बायोडाटा दर्ज करें</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* 3. DIKSHA FORM */}
                {activeTab === 'diksha' && (
                  <form onSubmit={handleDikshaSubmit}>
                    <div className="form-instructions">
                      <strong>दीक्षा आवेदन-पत्र:</strong> भगवान बुद्ध के त्रिरत्न (बुद्ध, धम्म, संघ) और पंचशील की पवित्र दीक्षा प्राप्त करने हेतु इस फॉर्म को भरें।
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">आवेदक का नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="fullName"
                          className="form-input" 
                          placeholder="नाम"
                          value={dikshaForm.fullName}
                          onChange={handleDikshaChange}
                        />
                        {errors.dikshaName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.dikshaName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">पिता / पति का नाम</label>
                        <input 
                          type="text" 
                          name="fatherHusbandName"
                          className="form-input" 
                          placeholder="अभिभावक का नाम"
                          value={dikshaForm.fatherHusbandName}
                          onChange={handleDikshaChange}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">संपर्क फोन नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          name="mobile"
                          className="form-input" 
                          placeholder="मोबाइल नंबर"
                          value={dikshaForm.mobile}
                          onChange={handleDikshaChange}
                        />
                        {errors.dikshaMobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.dikshaMobile}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">दीक्षा हेतु पसंदीदा केंद्र</label>
                        <select 
                          name="preferredLocation" 
                          className="form-select"
                          value={dikshaForm.preferredLocation}
                          onChange={handleDikshaChange}
                        >
                          <option>सारनाथ, वाराणसी (Sarnath Center)</option>
                          <option>भदोही धम्म केंद्र</option>
                          <option>सोनभद्र धम्म केंद्र</option>
                          <option>ग्राम सभा शिविर</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">पूरा पता</label>
                      <textarea 
                        name="address"
                        className="form-textarea"
                        placeholder="ग्राम, पोस्ट, ब्लॉक, जिला एवं पिनकोड"
                        value={dikshaForm.address}
                        onChange={handleDikshaChange}
                      ></textarea>
                    </div>

                    <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          name="panchsheelPledge"
                          className="form-checkbox"
                          checked={dikshaForm.panchsheelPledge}
                          onChange={handleDikshaChange}
                        />
                        <span>
                          <strong>पंचशील संकल्प:</strong> मैं हिंसा, चोरी, व्यभिचार, असत्य भाषण और मादक पदार्थों के सेवन से विरत रहने का संकल्प लेता/लेती हूँ। <span className="required">*</span>
                        </span>
                      </label>
                      {errors.panchsheelPledge && <p style={{ color: 'var(--color-error)', fontSize: '0.82rem', marginTop: '0.4rem' }}>{errors.panchsheelPledge}</p>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn btn-primary btn-lg">
                        <Award size={20} />
                        <span>दीक्षा आवेदन सबमिट करें</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* 4. MARRIAGE CERTIFICATE FORM */}
                {activeTab === 'marriageCert' && (
                  <form onSubmit={handleCertSubmit}>
                    <div className="form-instructions">
                      <strong>विवाह प्रमाण-पत्र आवेदन:</strong> जिन बौद्ध दम्पतियों का विवाह संस्कार बौद्ध रीति-रिवाज से संपन्न हुआ है, वे ट्रस्ट द्वारा अधिकृत विवाह प्रमाण-पत्र हेतु यहाँ आवेदन करें।
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">वर (Groom) का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="groomName"
                          className="form-input" 
                          placeholder="वर का नाम"
                          value={certForm.groomName}
                          onChange={handleCertChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">वर के पिता का नाम</label>
                        <input 
                          type="text" 
                          name="groomFather"
                          className="form-input" 
                          placeholder="वर पिता"
                          value={certForm.groomFather}
                          onChange={handleCertChange}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">वधू (Bride) का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="brideName"
                          className="form-input" 
                          placeholder="वधू का नाम"
                          value={certForm.brideName}
                          onChange={handleCertChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">वधू के पिता का नाम</label>
                        <input 
                          type="text" 
                          name="brideFather"
                          className="form-input" 
                          placeholder="वधू पिता"
                          value={certForm.brideFather}
                          onChange={handleCertChange}
                        />
                      </div>
                    </div>

                    {errors.certNames && <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginBottom: '1rem' }}>{errors.certNames}</p>}

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">विवाह संपन्न होने की तिथि</label>
                        <input 
                          type="date" 
                          name="marriageDate"
                          className="form-input" 
                          value={certForm.marriageDate}
                          onChange={handleCertChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">विवाह स्थल / स्थान</label>
                        <input 
                          type="text" 
                          name="marriagePlace"
                          className="form-input" 
                          placeholder="विहार / गृह स्थल"
                          value={certForm.marriagePlace}
                          onChange={handleCertChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">संपर्क मोबाइल नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          name="contactMobile"
                          className="form-input" 
                          placeholder="फोन नंबर"
                          value={certForm.contactMobile}
                          onChange={handleCertChange}
                        />
                        {errors.certMobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.certMobile}</span>}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">प्रथम साक्षी (Witness 1) का नाम</label>
                        <input 
                          type="text" 
                          name="witnessName1"
                          className="form-input" 
                          placeholder="साक्षी 1"
                          value={certForm.witnessName1}
                          onChange={handleCertChange}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">द्वितीय साक्षी (Witness 2) का नाम</label>
                        <input 
                          type="text" 
                          name="witnessName2"
                          className="form-input" 
                          placeholder="साक्षी 2"
                          value={certForm.witnessName2}
                          onChange={handleCertChange}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                      <button type="submit" className="btn btn-primary btn-lg">
                        <FileText size={20} />
                        <span>विवाह प्रमाण-पत्र आवेदन जमा करें</span>
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
