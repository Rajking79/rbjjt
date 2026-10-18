import React, { useState, useEffect } from 'react';
import { 
  Sparkles, UserCheck, Heart, Award, FileText, CheckCircle2, 
  Printer, Download, AlertCircle, RefreshCw, Upload, Camera, 
  Activity, ShieldCheck, QrCode 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRUST_INFO } from '../data/trustData';

export function FormsSection({ onRecordAdded }) {
  const [activeTab, setActiveTab] = useState('dhammadhikari'); // 'dhammadhikari' | 'matrimonial' | 'diksha' | 'marriageCert' | 'healthCamp'
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  // 1. Dhammadhikari Form State
  const [dhammaForm, setDhammaForm] = useState({
    fullName: '',
    fatherHusbandName: '',
    motherName: '',
    dob: '',
    gender: 'पुरुष (Male)',
    bloodGroup: 'B+',
    idType: 'आधार कार्ड (Aadhaar)',
    idNumber: '',
    qualification: 'स्नातक (Graduate)',
    occupation: '',
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
    previousExp: '',
    proposedRole: 'ग्राम धर्माधिकारी (Village In-charge)',
    photoUrl: '',
    pledgeAccepted: false
  });

  // 2. Matrimonial Form State
  const [matriForm, setMatriForm] = useState({
    candidateType: 'वर (Groom)',
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    age: '',
    height: '5 फीट 6 इंच',
    complexion: 'गेहुआं (Fair)',
    education: '',
    occupation: '',
    monthlyIncome: '',
    fatherOccupation: '',
    brothers: '1',
    sisters: '1',
    village: '',
    district: '',
    state: 'उत्तर प्रदेश',
    pincode: '',
    guardianMobile: '',
    candidateMobile: '',
    photoUrl: '',
    buddhistValues: 'हाँ, बुद्ध एवं बाबासाहब के विचारों में पूर्ण आस्था है',
    dowryFreePledge: false
  });

  // 3. Diksha Form State
  const [dikshaForm, setDikshaForm] = useState({
    fullName: '',
    fatherHusbandName: '',
    dob: '',
    age: '',
    gender: 'पुरुष (Male)',
    mobile: '',
    email: '',
    address: '',
    district: '',
    state: 'उत्तर प्रदेश',
    dikshaType: 'व्यक्तिगत दीक्षा (Individual)',
    familyMembersCount: '1',
    preferredDate: '',
    preferredLocation: 'ऋषिपत्तन, सारनाथ (वाराणसी)',
    panchsheelPledge: false
  });

  // 4. Marriage Certificate Form State
  const [certForm, setCertForm] = useState({
    groomName: '',
    groomFather: '',
    groomDob: '',
    groomAddress: '',
    brideName: '',
    brideFather: '',
    brideDob: '',
    brideAddress: '',
    marriageDate: '',
    marriagePlace: 'बौद्ध विहार / गृह स्थान',
    witnessName1: '',
    witnessPhone1: '',
    witnessName2: '',
    witnessPhone2: '',
    presidingBhikkhu: 'पूज्य भिक्खु संघ',
    contactMobile: '',
    couplePhotoUrl: '',
    marriagePledge: false
  });

  // 5. Health & Vipassana Camp Form State
  const [healthForm, setHealthForm] = useState({
    fullName: '',
    guardianName: '',
    age: '',
    gender: 'पुरुष (Male)',
    mobile: '',
    address: '',
    district: '',
    state: 'उत्तर प्रदेश',
    healthIssue: 'मानसिक तनाव एवं अनिद्रा (Stress & Insomnia)',
    campType: '10 दिवसीय विपश्यना ध्यान साधना शिविर (सारनाथ)',
    pastExperience: 'नहीं (प्रथम बार)',
    healthPledge: false
  });

  // Generic file/photo upload simulation with live preview
  const handlePhotoUpload = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === 'dhamma') setDhammaForm(prev => ({ ...prev, photoUrl: reader.result }));
        else if (formType === 'matri') setMatriForm(prev => ({ ...prev, photoUrl: reader.result }));
        else if (formType === 'cert') setCertForm(prev => ({ ...prev, couplePhotoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveRecord = (record) => {
    let existing = [];
    try {
      const saved = localStorage.getItem('rbjjt_records');
      if (saved) existing = JSON.parse(saved);
    } catch (e) {}

    const updated = [record, ...existing];
    localStorage.setItem('rbjjt_records', JSON.stringify(updated));
    if (onRecordAdded) onRecordAdded(updated.length);
  };

  const triggerCelebration = () => {
    try {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // 1. Submit Dhammadhikari
  const handleDhammaSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!dhammaForm.fullName.trim()) newErrors.fullName = "कृपया पूरा नाम दर्ज करें";
    if (!dhammaForm.fatherHusbandName.trim()) newErrors.fatherHusbandName = "पिता/पति का नाम आवश्यक है";
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
      details: `पद: ${dhammaForm.proposedRole}, ब्लॉक: ${dhammaForm.block || 'एन/ए'}, शिक्षा: ${dhammaForm.qualification}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "धर्माधिकारी आवेदन पत्र सफलतापूर्वक पंजीकृत हुआ!",
      subtitle: "राष्ट्रीय बौद्ध जन जागरण ट्रस्ट की ओर से आपका हार्दिक अभिनंदन। आपकी अधिकृत पहचान पर्ची तैयार है।",
      name: dhammaForm.fullName,
      fatherName: dhammaForm.fatherHusbandName,
      phone: dhammaForm.mobile,
      district: dhammaForm.district,
      state: dhammaForm.state,
      role: dhammaForm.proposedRole,
      photo: dhammaForm.photoUrl || "https://rbjjt.com/wp-content/uploads/2026/03/icon_no_bg_256.png",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "धर्माधिकारी पहचान पत्र (ID Slip)"
    });
  };

  // 2. Submit Matrimonial
  const handleMatriSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!matriForm.fullName.trim()) newErrors.matriName = "कृपया प्रत्याशी का नाम दर्ज करें";
    if (!matriForm.guardianMobile.trim()) newErrors.guardianMobile = "अभिभावक का फोन नंबर दर्ज करें";
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
      typeName: 'आवाह-विवाह बायोडाटा',
      name: matriForm.fullName,
      phone: matriForm.guardianMobile,
      district: matriForm.district,
      state: matriForm.state,
      status: 'स्वीकृत (Approved)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `${matriForm.candidateType}, शिक्षा: ${matriForm.education}, व्यवसाय: ${matriForm.occupation}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "बौद्ध वैवाहिक बायोडाटा पंजीकृत हुआ!",
      subtitle: "दहेज-मुक्त आदर्श बौद्ध वैवाहिक मिशन में आपका स्वागत है।",
      name: matriForm.fullName,
      fatherName: matriForm.fatherName,
      phone: matriForm.guardianMobile,
      district: matriForm.district,
      state: matriForm.state,
      role: `${matriForm.candidateType} - ${matriForm.education}`,
      photo: matriForm.photoUrl || "https://rbjjt.com/wp-content/uploads/2026/08/Sacraments-%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0-of-RBJJT.jpeg",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "वैवाहिक बायोडाटा रसीद"
    });
  };

  // 3. Submit Diksha
  const handleDikshaSubmit = (e) => {
    e.preventDefault();
    if (!dikshaForm.fullName.trim()) {
      setErrors({ dikshaName: "कृपया आवेदक का नाम भरें" });
      return;
    }
    if (!dikshaForm.mobile.trim()) {
      setErrors({ dikshaMobile: "मोबाइल नंबर आवश्यक है" });
      return;
    }

    setErrors({});
    const appId = `RBJJT-DK-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'diksha',
      typeName: 'धम्म दीक्षा आवेदन',
      name: dikshaForm.fullName,
      phone: dikshaForm.mobile,
      district: dikshaForm.district,
      state: dikshaForm.state,
      status: 'स्वीकृत (Approved)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `प्रकार: ${dikshaForm.dikshaType}, स्थल: ${dikshaForm.preferredLocation}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "बौद्ध धम्म दीक्षा आवेदन स्वीकृत हुआ!",
      subtitle: "पंचशील और त्रिशरण की पावन दीक्षा हेतु आपका पंजीकरण सफल रहा।",
      name: dikshaForm.fullName,
      fatherName: dikshaForm.fatherHusbandName,
      phone: dikshaForm.mobile,
      district: dikshaForm.district,
      state: dikshaForm.state,
      role: `दीक्षा स्थल: ${dikshaForm.preferredLocation}`,
      photo: "https://rbjjt.com/wp-content/uploads/2025/12/Initiation-%E0%A4%A6%E0%A5%80%E0%A4%95%E0%A5%8D%E0%A4%97%E0%A4%BE.png",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "धम्म दीक्षा पंजीकरण पत्र"
    });
  };

  // 4. Submit Marriage Certificate
  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (!certForm.groomName.trim() || !certForm.brideName.trim()) {
      setErrors({ certCouple: "वर एवं वधू दोनों का नाम दर्ज करें" });
      return;
    }
    if (!certForm.marriageDate) {
      setErrors({ certDate: "विवाह की तिथि आवश्यक है" });
      return;
    }

    setErrors({});
    const appId = `RBJJT-MC-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'marriageCert',
      typeName: 'विवाह प्रमाण-पत्र',
      name: `${certForm.groomName} संग ${certForm.brideName}`,
      phone: certForm.contactMobile,
      district: certForm.marriagePlace,
      state: "उत्तर प्रदेश",
      status: 'अधिकृत जारी (Issued)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `विवाह तिथि: ${certForm.marriageDate}, स्थल: ${certForm.marriagePlace}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "बौद्ध विवाह प्रमाण-पत्र जारी हुआ!",
      subtitle: "राष्ट्रीय बौद्ध जन जागरण ट्रस्ट द्वारा विधिवत प्रमाणित वैवाहिक प्रमाण-पत्र।",
      name: `${certForm.groomName} & ${certForm.brideName}`,
      fatherName: `वर पिता: ${certForm.groomFather || 'एन/ए'} | वधू पिता: ${certForm.brideFather || 'एन/ए'}`,
      phone: certForm.contactMobile,
      district: certForm.marriagePlace,
      state: "सारनाथ (वाराणसी)",
      role: `विवाह तिथि: ${certForm.marriageDate}`,
      photo: certForm.couplePhotoUrl || "https://rbjjt.com/wp-content/uploads/2026/08/Sacraments-%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0-of-RBJJT.jpeg",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "अधिकृत बौद्ध विवाह प्रमाण-पत्र (Official Certificate)"
    });
  };

  // 5. Submit Health Camp
  const handleHealthSubmit = (e) => {
    e.preventDefault();
    if (!healthForm.fullName.trim() || !healthForm.mobile.trim()) {
      setErrors({ healthRequired: "कृपया नाम और मोबाइल नंबर दर्ज करें" });
      return;
    }

    setErrors({});
    const appId = `RBJJT-HL-${Date.now().toString().slice(-6)}`;
    const record = {
      id: appId,
      type: 'health',
      typeName: 'स्वास्थ्य व विपश्यना शिविर',
      name: healthForm.fullName,
      phone: healthForm.mobile,
      district: healthForm.district,
      state: healthForm.state,
      status: 'पंजीकृत (Registered)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `समस्या: ${healthForm.healthIssue}, शिविर: ${healthForm.campType}`
    };

    saveRecord(record);
    triggerCelebration();

    setSubmissionSuccess({
      id: appId,
      title: "स्वास्थ्य एवं साधना शिविर पंजीकरण सफल!",
      subtitle: "विपश्यना ध्यान साधना व प्राकृतिक चिकित्सा केंद्र (सारनाथ) में आपका स्वागत है।",
      name: healthForm.fullName,
      fatherName: healthForm.guardianName,
      phone: healthForm.mobile,
      district: healthForm.district,
      state: healthForm.state,
      role: healthForm.campType,
      photo: "https://rbjjt.com/wp-content/uploads/2026/03/Swasthy-Rbjjt.png",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "शिविर प्रवेश पर्ची (Health Entry Pass)"
    });
  };

  return (
    <section id="forms" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-tag">
            <Sparkles size={14} />
            <span>डिजिटल सेवा एवं ऑनलाइन पंजीकरण पोर्टल</span>
          </div>
          <h2 className="section-title">ट्रस्ट ऑनलाइन आवेदन केंद्र (Official Forms)</h2>
          <div className="title-ornament">
            <span className="dharma-wheel">☸</span>
          </div>
          <p className="section-subtitle">
            धर्माधिकारी पद, दहेज-मुक्त बौद्ध विवाह, धम्म दीक्षा, विवाह प्रमाण-पत्र एवं विपश्यना स्वास्थ्य शिविर हेतु आधिकारिक फॉर्म भरें।
          </p>
        </div>

        {/* Form Card Container */}
        <div className="form-suite-card">
          {/* Form Tabs Header with 5 Full Official Forms */}
          <div className="form-tabs-header">
            <button 
              className={`form-tab-btn ${activeTab === 'dhammadhikari' ? 'active' : ''}`}
              onClick={() => { setActiveTab('dhammadhikari'); setSubmissionSuccess(null); }}
            >
              <UserCheck size={17} />
              <span>1. धर्माधिकारी आवेदन</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'matrimonial' ? 'active' : ''}`}
              onClick={() => { setActiveTab('matrimonial'); setSubmissionSuccess(null); }}
            >
              <Heart size={17} />
              <span>2. आवाह-विवाह बायोडाटा</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'diksha' ? 'active' : ''}`}
              onClick={() => { setActiveTab('diksha'); setSubmissionSuccess(null); }}
            >
              <Award size={17} />
              <span>3. धम्म दीक्षा आवेदन</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'marriageCert' ? 'active' : ''}`}
              onClick={() => { setActiveTab('marriageCert'); setSubmissionSuccess(null); }}
            >
              <FileText size={17} />
              <span>4. विवाह प्रमाण-पत्र</span>
            </button>
            <button 
              className={`form-tab-btn ${activeTab === 'healthCamp' ? 'active' : ''}`}
              onClick={() => { setActiveTab('healthCamp'); setSubmissionSuccess(null); }}
            >
              <Activity size={17} />
              <span>5. स्वास्थ्य व विपश्यना शिविर</span>
            </button>
          </div>

          {/* Form Body */}
          <div className="form-body">
            {/* SUCCESS SLIP / ID CARD VIEW */}
            {submissionSuccess ? (
              <div className="submission-slip-card" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  borderBottom: '2px solid var(--color-gold)',
                  paddingBottom: '1rem',
                  marginBottom: '1.25rem'
                }}>
                  <img src="https://rbjjt.com/wp-content/uploads/2025/12/RBJJT-Official-Logo-70x62.png" alt="Logo" style={{ width: '42px', height: '42px' }} />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.25rem', margin: 0 }}>
                      राष्ट्रीय बौद्ध जन जागरण ट्रस्ट
                    </h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                      Reg. No. 069/16 | केंद्रीय कार्यालय: सारनाथ, वाराणसी
                    </span>
                  </div>
                </div>

                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem auto'
                }}>
                  <CheckCircle2 size={32} />
                </div>

                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {submissionSuccess.type}
                </span>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--color-primary)', margin: '0.35rem 0' }}>
                  {submissionSuccess.title}
                </h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
                  {submissionSuccess.subtitle}
                </p>

                {/* Slip Details Box */}
                <div style={{
                  background: 'var(--color-bg)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem 1.5rem',
                  margin: '0 auto 1.5rem auto',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.65rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>पंजीकरण क्रमांक (ID):</span>
                      <strong style={{ color: 'var(--color-primary)', display: 'block', fontSize: '1.05rem' }}>{submissionSuccess.id}</strong>
                    </div>
                    {submissionSuccess.photo && (
                      <img 
                        src={submissionSuccess.photo} 
                        alt="Applicant Photo" 
                        style={{ width: '56px', height: '64px', objectFit: 'cover', borderRadius: '4px', border: '1.5px solid var(--color-gold)' }} 
                      />
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>आवेदक का नाम:</span>
                    <strong>{submissionSuccess.name}</strong>
                  </div>

                  {submissionSuccess.fatherName && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid var(--color-border)' }}>
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>पिता / अभिभावक:</span>
                      <span>{submissionSuccess.fatherName}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>स्थान व जनपद:</span>
                    <span>{submissionSuccess.district}, {submissionSuccess.state}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.55rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>पंजीकरण तिथि:</span>
                    <span>{submissionSuccess.date}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.65rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>सत्यापन स्थिति:</span>
                    <span style={{ color: 'var(--color-success)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <ShieldCheck size={16} /> अधिकृत मान्य
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => window.print()} className="btn btn-primary">
                    <Printer size={18} />
                    <span>प्रिंट / PDF सेव करें</span>
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

                    <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.1rem', margin: '1rem 0 0.85rem 0' }}>
                      भाग 1: व्यक्तिगत विवरण (Personal Details)
                    </h4>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">आवेदक का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="fullName"
                          className="form-input" 
                          placeholder="उदा. राहुल कुमार मौर्य"
                          value={dhammaForm.fullName}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, fullName: e.target.value })}
                        />
                        {errors.fullName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.fullName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">पिता / पति का नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          name="fatherHusbandName"
                          className="form-input" 
                          placeholder="पिता अथवा पति का नाम"
                          value={dhammaForm.fatherHusbandName}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, fatherHusbandName: e.target.value })}
                        />
                        {errors.fatherHusbandName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.fatherHusbandName}</span>}
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
                          onChange={(e) => setDhammaForm({ ...dhammaForm, dob: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">लिंग (Gender)</label>
                        <select 
                          name="gender" 
                          className="form-select"
                          value={dhammaForm.gender}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, gender: e.target.value })}
                        >
                          <option>पुरुष (Male)</option>
                          <option>महिला (Female)</option>
                          <option>अन्य</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">रक्त समूह (Blood Group)</label>
                        <select 
                          name="bloodGroup" 
                          className="form-select"
                          value={dhammaForm.bloodGroup}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, bloodGroup: e.target.value })}
                        >
                          <option>A+</option>
                          <option>B+</option>
                          <option>O+</option>
                          <option>AB+</option>
                          <option>A-</option>
                          <option>B-</option>
                          <option>O-</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">पहचान पत्र प्रकार</label>
                        <select 
                          name="idType" 
                          className="form-select"
                          value={dhammaForm.idType}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, idType: e.target.value })}
                        >
                          <option>आधार कार्ड (Aadhaar)</option>
                          <option>वोटर पहचान पत्र (Voter ID)</option>
                          <option>पैन कार्ड (PAN Card)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">पहचान पत्र क्रमांक</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. 1234 5678 9012"
                          value={dhammaForm.idNumber}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, idNumber: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">पासपोर्ट फोटो अपलोड</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="form-input" 
                          style={{ padding: '0.45rem' }}
                          onChange={(e) => handlePhotoUpload(e, 'dhamma')}
                        />
                      </div>
                    </div>

                    {/* Address & Contact Section */}
                    <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.1rem', margin: '1.5rem 0 0.85rem 0' }}>
                      भाग 2: संपर्क एवं निवास पता (Address & Contact)
                    </h4>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">मोबाइल नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="10 अंकों का फोन नंबर"
                          value={dhammaForm.mobile}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, mobile: e.target.value })}
                        />
                        {errors.mobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.mobile}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">व्हाट्सएप नंबर</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="व्हाट्सएप नंबर"
                          value={dhammaForm.whatsapp}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, whatsapp: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">ग्राम / मोहल्ला</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="ग्राम"
                          value={dhammaForm.village}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, village: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">ब्लॉक / तहसील</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="ब्लॉक"
                          value={dhammaForm.block}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, block: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">जनपद / जिला <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. सारनाथ / वाराणसी / भदोही"
                          value={dhammaForm.district}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, district: e.target.value })}
                        />
                        {errors.district && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.district}</span>}
                      </div>
                    </div>

                    {/* Role & Qualification */}
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">प्रस्तावित पद / दायित्व</label>
                        <select 
                          className="form-select"
                          value={dhammaForm.proposedRole}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, proposedRole: e.target.value })}
                        >
                          <option>ग्राम धर्माधिकारी (Village In-charge)</option>
                          <option>5 ग्राम सभा केंद्र प्रमुख (Cluster Head)</option>
                          <option>ब्लॉक धर्म परिचायक (Block Coordinator)</option>
                          <option>जिला धम्म प्रचारक (District Representative)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">उच्चतम योग्यता</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. इंटर / स्नातक / परास्नातक"
                          value={dhammaForm.qualification}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, qualification: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Pledge Checkbox */}
                    <div style={{ margin: '1.25rem 0', padding: '1rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          className="form-checkbox"
                          checked={dhammaForm.pledgeAccepted}
                          onChange={(e) => setDhammaForm({ ...dhammaForm, pledgeAccepted: e.target.checked })}
                        />
                        <span>
                          <strong>सत्यनिष्ठा प्रतिज्ञा पत्र:</strong> मैं प्रमाणित करता/करती हूँ कि दी गई सभी जानकारियाँ सत्य हैं। मैं तथागत बुद्ध के त्रिरत्न एवं पंचशील का आचरण करते हुए समाज को शील, समाधि, प्रज्ञा से प्रकाशित करने हेतु निष्काम भाव से कार्य करूँगा/करूँगी। <span className="required">*</span>
                        </span>
                      </label>
                      {errors.pledgeAccepted && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem', display: 'block', marginTop: '0.3rem' }}>{errors.pledgeAccepted}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      <UserCheck size={18} />
                      <span>धर्माधिकारी पद हेतु आवेदन पत्र जमा करें</span>
                    </button>
                  </form>
                )}

                {/* 2. MATRIMONIAL FORM */}
                {activeTab === 'matrimonial' && (
                  <form onSubmit={handleMatriSubmit}>
                    <div className="form-instructions">
                      <strong>दहेज-मुक्त बौद्ध वैवाहिक पंजीकरण:</strong> ट्रस्ट द्वारा संचालित विवाह संस्कार योजना में प्रत्याशी का बायोडाटा पंजीकृत करें।
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">प्रत्याशी का प्रकार <span className="required">*</span></label>
                        <select 
                          className="form-select"
                          value={matriForm.candidateType}
                          onChange={(e) => setMatriForm({ ...matriForm, candidateType: e.target.value })}
                        >
                          <option>वर (Groom - लड़का)</option>
                          <option>वधू (Bride - लड़की)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">प्रत्याशी का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="प्रत्याशी का नाम"
                          value={matriForm.fullName}
                          onChange={(e) => setMatriForm({ ...matriForm, fullName: e.target.value })}
                        />
                        {errors.matriName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.matriName}</span>}
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">पिता का नाम</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="पिता का नाम"
                          value={matriForm.fatherName}
                          onChange={(e) => setMatriForm({ ...matriForm, fatherName: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">कद / ऊंचाई (Height)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. 5 फीट 7 इंच"
                          value={matriForm.height}
                          onChange={(e) => setMatriForm({ ...matriForm, height: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">शैक्षणिक योग्यता</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. बी.टेक / बी.ए. / एम.ए."
                          value={matriForm.education}
                          onChange={(e) => setMatriForm({ ...matriForm, education: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">पेशा / व्यवसाय (Job/Occupation)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. सरकारी सेवा / प्राइवेट / व्यवसाय"
                          value={matriForm.occupation}
                          onChange={(e) => setMatriForm({ ...matriForm, occupation: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">अभिभावक का फोन नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="फोन नंबर"
                          value={matriForm.guardianMobile}
                          onChange={(e) => setMatriForm({ ...matriForm, guardianMobile: e.target.value })}
                        />
                        {errors.guardianMobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.guardianMobile}</span>}
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">स्थायी जिला व राज्य</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="उदा. वाराणसी, उत्तर प्रदेश"
                          value={matriForm.district}
                          onChange={(e) => setMatriForm({ ...matriForm, district: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">प्रत्याशी का फोटो अपलोड</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="form-input" 
                          style={{ padding: '0.45rem' }}
                          onChange={(e) => handlePhotoUpload(e, 'matri')}
                        />
                      </div>
                    </div>

                    {/* Dowry-Free Pledge */}
                    <div style={{ margin: '1.25rem 0', padding: '1rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
                      <label className="form-checkbox-label">
                        <input 
                          type="checkbox" 
                          className="form-checkbox"
                          checked={matriForm.dowryFreePledge}
                          onChange={(e) => setMatriForm({ ...matriForm, dowryFreePledge: e.target.checked })}
                        />
                        <span>
                          <strong>दहेज-मुक्त संकल्प:</strong> हम दहेज प्रथा के सख्त विरोधी हैं और भगवान बुद्ध व बाबासाहब डॉ. आम्बेडकर के विचारों के अनुरूप सादगीपूर्ण संस्कार से विवाह करने का संकल्प लेते हैं। <span className="required">*</span>
                        </span>
                      </label>
                      {errors.dowryFreePledge && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem', display: 'block', marginTop: '0.3rem' }}>{errors.dowryFreePledge}</span>}
                    </div>

                    <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%' }}>
                      <Heart size={18} fill="#FFF" />
                      <span>बायोडाटा सुरक्षित रूप से पंजीकृत करें</span>
                    </button>
                  </form>
                )}

                {/* 3. DIKSHA FORM */}
                {activeTab === 'diksha' && (
                  <form onSubmit={handleDikshaSubmit}>
                    <div className="form-instructions">
                      <strong>धम्म दीक्षा आवेदन:</strong> पंचशील, त्रिशरण व बाबासाहब की 22 प्रतिज्ञाओं के साथ प्रबुद्ध बौद्ध जीवन शैली अपनाने हेतु पंजीकरण।
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">प्रार्थी का पूरा नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="आवेदक का नाम"
                          value={dikshaForm.fullName}
                          onChange={(e) => setDikshaForm({ ...dikshaForm, fullName: e.target.value })}
                        />
                        {errors.dikshaName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.dikshaName}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">पिता / पति का नाम</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="पिता/पति का नाम"
                          value={dikshaForm.fatherHusbandName}
                          onChange={(e) => setDikshaForm({ ...dikshaForm, fatherHusbandName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">मोबाइल नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="फोन नंबर"
                          value={dikshaForm.mobile}
                          onChange={(e) => setDikshaForm({ ...dikshaForm, mobile: e.target.value })}
                        />
                        {errors.dikshaMobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.dikshaMobile}</span>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">दीक्षा का प्रकार</label>
                        <select 
                          className="form-select"
                          value={dikshaForm.dikshaType}
                          onChange={(e) => setDikshaForm({ ...dikshaForm, dikshaType: e.target.value })}
                        >
                          <option>व्यक्तिगत दीक्षा (Individual)</option>
                          <option>सपरिवार सामूहिक दीक्षा (Whole Family)</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">दीक्षा स्थल प्राथमिकता</label>
                        <select 
                          className="form-select"
                          value={dikshaForm.preferredLocation}
                          onChange={(e) => setDikshaForm({ ...dikshaForm, preferredLocation: e.target.value })}
                        >
                          <option>ऋषिपत्तन, सारनाथ (वाराणसी)</option>
                          <option>महाबोधि मंदिर, बोधगया</option>
                          <option>स्थानीय जिला/ब्लॉक बुद्ध विहार</option>
                          <option>अपने गृह स्थान पर</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">स्थायी पता व जिला</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="ग्राम, पोस्ट, जिला, राज्य"
                        value={dikshaForm.address}
                        onChange={(e) => setDikshaForm({ ...dikshaForm, address: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <Award size={18} />
                      <span>दीक्षा आवेदन पत्र जमा करें</span>
                    </button>
                  </form>
                )}

                {/* 4. MARRIAGE CERTIFICATE FORM */}
                {activeTab === 'marriageCert' && (
                  <form onSubmit={handleCertSubmit}>
                    <div className="form-instructions">
                      <strong>बौद्ध विवाह प्रमाण-पत्र जारी करने हेतु आवेदन:</strong> ट्रस्ट द्वारा अधिकृत पंजीयन क्रमांक एवं प्रमाण-पत्र जारी किया जाएगा।
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: '0.5rem 0' }}>
                      वर (Groom) का विवरण:
                    </h4>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">वर का नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="वर का नाम"
                          value={certForm.groomName}
                          onChange={(e) => setCertForm({ ...certForm, groomName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">वर के पिता का नाम</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="वर के पिता का नाम"
                          value={certForm.groomFather}
                          onChange={(e) => setCertForm({ ...certForm, groomFather: e.target.value })}
                        />
                      </div>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '1.05rem', margin: '0.5rem 0' }}>
                      वधू (Bride) का विवरण:
                    </h4>
                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">वधू का नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="वधू का नाम"
                          value={certForm.brideName}
                          onChange={(e) => setCertForm({ ...certForm, brideName: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">वधू के पिता का नाम</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="वधू के पिता का नाम"
                          value={certForm.brideFather}
                          onChange={(e) => setCertForm({ ...certForm, brideFather: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-3">
                      <div className="form-group">
                        <label className="form-label">विवाह तिथि <span className="required">*</span></label>
                        <input 
                          type="date" 
                          className="form-input" 
                          value={certForm.marriageDate}
                          onChange={(e) => setCertForm({ ...certForm, marriageDate: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">विवाह स्थल / विहार</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="विहार अथवा स्थान का नाम"
                          value={certForm.marriagePlace}
                          onChange={(e) => setCertForm({ ...certForm, marriagePlace: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">वर-वधू युगल फोटो</label>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="form-input" 
                          style={{ padding: '0.45rem' }}
                          onChange={(e) => handlePhotoUpload(e, 'cert')}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <FileText size={18} />
                      <span>विवाह प्रमाण-पत्र आवेदन जमा करें</span>
                    </button>
                  </form>
                )}

                {/* 5. HEALTH & VIPASSANA CAMP FORM */}
                {activeTab === 'healthCamp' && (
                  <form onSubmit={handleHealthSubmit}>
                    <div className="form-instructions">
                      <strong>स्वास्थ्य एवं प्राकृतिक चिकित्सा / विपश्यना शिविर पंजीकरण:</strong> मानसिक शांति, तनावमुक्ति, योग व निरोगी जीवन हेतु।
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">प्रार्थी का नाम <span className="required">*</span></label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="प्रार्थी का नाम"
                          value={healthForm.fullName}
                          onChange={(e) => setHealthForm({ ...healthForm, fullName: e.target.value })}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">मोबाइल नंबर <span className="required">*</span></label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="10 अंकों का फोन नंबर"
                          value={healthForm.mobile}
                          onChange={(e) => setHealthForm({ ...healthForm, mobile: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-grid-2">
                      <div className="form-group">
                        <label className="form-label">शिविर का प्रकार चुनें</label>
                        <select 
                          className="form-select"
                          value={healthForm.campType}
                          onChange={(e) => setHealthForm({ ...healthForm, campType: e.target.value })}
                        >
                          <option>10 दिवसीय विपश्यना ध्यान साधना शिविर (सारनाथ)</option>
                          <option>3 दिवसीय प्राकृतिक चिकित्सा व योग शिविर</option>
                          <option>नियमित योग एवं ध्यान केंद्र (साप्ताहिक)</option>
                          <option>नशामुक्ति एवं मानसिक परामर्श</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">स्वास्थ्य समस्या अथवा परामर्श विषय</label>
                        <select 
                          className="form-select"
                          value={healthForm.healthIssue}
                          onChange={(e) => setHealthForm({ ...healthForm, healthIssue: e.target.value })}
                        >
                          <option>मानसिक तनाव एवं अनिद्रा (Stress & Insomnia)</option>
                          <option>उच्च रक्तचाप एवं मधुमेह (BP & Diabetes)</option>
                          <option>जोड़ों का दर्द व गठिया (Joint & Arthritis Pain)</option>
                          <option>पाचन व पेट संबंधी विकार</option>
                          <option>सामान्य मानसिक शांति व ध्यान साधना</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">निवास पता व जिला</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="ग्राम/शहर, जिला, राज्य"
                        value={healthForm.address}
                        onChange={(e) => setHealthForm({ ...healthForm, address: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
                      <Activity size={18} />
                      <span>शिविर में स्थान आरक्षित करें</span>
                    </button>
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
