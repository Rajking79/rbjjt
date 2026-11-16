import React, { useState, useEffect } from 'react';
import { 
  Sparkles, UserCheck, Heart, Award, FileText, CheckCircle2, 
  Printer, Download, AlertCircle, RefreshCw, Upload, Camera, 
  Activity, ShieldCheck, QrCode, Check, Copy, ChevronRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TRUST_INFO } from '../data/trustData';
import logoHD from '../assets/rbjjt-logo-hd.jpg';
import { OfficialDhammadhikariFormPDF } from './OfficialDhammadhikariFormPDF';
import { DhammadhikariPortalForm } from './DhammadhikariPortalForm';
import { MatrimonialPortalForm } from './MatrimonialPortalForm';
import './OfficialDhammadhikariFormPDF.css';
import './OfficialMatrimonialFormPDF.css';

export function FormsSection({ onRecordAdded }) {
  const [activeTab, setActiveTab] = useState('dhammadhikari'); // 'dhammadhikari' | 'matrimonial' | 'diksha' | 'marriageCert' | 'healthCamp'
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errors, setErrors] = useState({});
  const [copiedBankField, setCopiedBankField] = useState(null);

  // 1. Comprehensive Dhammadhikari Form State (Reflecting Official 3-Page Physical Form)
  const [dhammaForm, setDhammaForm] = useState({
    regNo: `RBJJT/2026/${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: '',
    fatherHusbandType: 'आदरणीय', // 'आदरणीय' | 'स्मृतिशेष'
    fatherHusbandName: '',
    currentAddress: '',
    pincode: '',
    permanentAddress: '',
    sameAsCurrent: false,
    village: '',
    post: '',
    block: '',
    district: '',
    state: 'उत्तर प्रदेश',
    mobile: '',
    whatsapp: '',
    dob: '',
    qualification: 'स्नातक (Graduate)',
    occupation: 'नौकरी', // 'नौकरी' | 'व्यापार' | 'कृषि' | 'अन्य'
    photoUrl: '',
    familyDetails: [
      { id: 1, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
      { id: 2, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
      { id: 3, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
      { id: 4, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
    ],
    siblings: '',
    serviceYears: '1',
    serviceMonths: '6',
    serviceField: 'ग्राम धम्म प्रचार एवं बाल संस्कार',
    proposedRole: 'ग्राम धर्माधिकारी (Village In-charge)',
    donationAmount: '1000',
    dhammadhikariName: '',
    idNumber: '',
    formDate: new Date().toLocaleDateString('hi-IN'),
    signatureUrl: '',
    paymentScreenshotUrl: '',
    utrNumber: '',
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

  // File/photo/screenshot upload handler with live preview
  const handlePhotoUpload = (e, formType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (formType === 'dhamma') setDhammaForm(prev => ({ ...prev, photoUrl: reader.result }));
        else if (formType === 'dhammaSig') setDhammaForm(prev => ({ ...prev, signatureUrl: reader.result }));
        else if (formType === 'dhammaPayment') setDhammaForm(prev => ({ ...prev, paymentScreenshotUrl: reader.result }));
        else if (formType === 'matri') setMatriForm(prev => ({ ...prev, photoUrl: reader.result }));
        else if (formType === 'cert') setCertForm(prev => ({ ...prev, couplePhotoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChildChange = (index, field, value) => {
    setDhammaForm(prev => {
      const updated = [...prev.familyDetails];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, familyDetails: updated };
    });
  };

  const handleSameAddressChange = (e) => {
    const isChecked = e.target.checked;
    setDhammaForm(prev => ({
      ...prev,
      sameAsCurrent: isChecked,
      permanentAddress: isChecked ? prev.currentAddress : prev.permanentAddress
    }));
  };

  const handleResetDhammaForm = () => {
    setDhammaForm({
      regNo: `RBJJT/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: '',
      fatherHusbandType: 'आदरणीय',
      fatherHusbandName: '',
      currentAddress: '',
      pincode: '',
      permanentAddress: '',
      sameAsCurrent: false,
      village: '',
      post: '',
      block: '',
      district: '',
      state: 'उत्तर प्रदेश',
      mobile: '',
      whatsapp: '',
      dob: '',
      qualification: 'स्नातक (Graduate)',
      occupation: 'नौकरी',
      photoUrl: '',
      familyDetails: [
        { id: 1, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
        { id: 2, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
        { id: 3, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
        { id: 4, name: '', age: '', education: '', maritalStatus: 'अविवाहित' },
      ],
      siblings: '',
      serviceYears: '1',
      serviceMonths: '6',
      serviceField: 'ग्राम धम्म प्रचार एवं बाल संस्कार',
      proposedRole: 'ग्राम धर्माधिकारी (Village In-charge)',
      donationAmount: '1000',
      dhammadhikariName: '',
      idNumber: '',
      formDate: new Date().toLocaleDateString('hi-IN'),
      signatureUrl: '',
      paymentScreenshotUrl: '',
      utrNumber: '',
      pledgeAccepted: false
    });
    setSubmissionSuccess(null);
    setErrors({});
  };

  const copyBankDetail = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedBankField(field);
    setTimeout(() => setCopiedBankField(null), 2000);
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
      confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
    } catch (e) {}
  };

  // 1. Submit Dhammadhikari Form & Generate Official 3-Page Document
  const handleDhammaSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!dhammaForm.fullName.trim()) newErrors.fullName = "कृपया सदस्य का नाम दर्ज करें";
    if (!dhammaForm.fatherHusbandName.trim()) newErrors.fatherHusbandName = "पिता अथवा पति का नाम आवश्यक है";
    if (!dhammaForm.currentAddress.trim()) newErrors.currentAddress = "पत्र-व्यवहार का पता दर्ज करें";
    if (!dhammaForm.mobile.trim() || dhammaForm.mobile.length < 10) newErrors.mobile = "मान्य 10 अंकों का मोबाइल नंबर दर्ज करें";
    if (!dhammaForm.district.trim()) newErrors.district = "जनपद / जिला का नाम दर्ज करें";
    if (!dhammaForm.pledgeAccepted) newErrors.pledgeAccepted = "प्रतिज्ञा (शपथ) पत्र स्वीकार करना अनिवार्य है";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstKey = Object.keys(newErrors)[0];
      const targetInput = document.querySelector(`[name="${firstKey}"]`);
      if (targetInput) targetInput.focus();
      return;
    }

    setErrors({});
    const regId = dhammaForm.regNo || `RBJJT/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    const fullDhammadhikariData = {
      ...dhammaForm,
      regNo: regId,
      permanentAddress: dhammaForm.sameAsCurrent ? dhammaForm.currentAddress : (dhammaForm.permanentAddress || dhammaForm.currentAddress),
      formDate: dhammaForm.formDate || new Date().toLocaleDateString('hi-IN'),
      isOfficialDhammadhikari: true
    };

    const record = {
      id: regId,
      type: 'dhammadhikari',
      typeName: 'धर्माधिकारी आवेदन',
      name: dhammaForm.fullName,
      phone: dhammaForm.mobile,
      district: dhammaForm.district,
      state: dhammaForm.state,
      status: 'स्वीकृत (Approved)',
      date: fullDhammadhikariData.formDate,
      details: `पद: ${dhammaForm.proposedRole}, ब्लॉक: ${dhammaForm.block || 'एन/ए'}, शिक्षा: ${dhammaForm.qualification}, दान: ₹1000`,
      fullData: fullDhammadhikariData
    };

    saveRecord(record);
    triggerCelebration();

    // Trigger full 3-page official PDF view
    setSubmissionSuccess(fullDhammadhikariData);
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
      title: "आवाह-विवाह प्रमाण-पत्र जारी हुआ!",
      subtitle: "राष्ट्रीय बौद्ध जन जागरण ट्रस्ट द्वारा विधिवत प्रमाणित वैवाहिक प्रमाण-पत्र।",
      name: `${certForm.groomName} & ${certForm.brideName}`,
      fatherName: `वर पिता: ${certForm.groomFather || 'एन/ए'} | वधू पिता: ${certForm.brideFather || 'एन/ए'}`,
      phone: certForm.contactMobile,
      district: certForm.marriagePlace,
      state: "सारनाथ (वाराणसी)",
      role: `विवाह तिथि: ${certForm.marriageDate}`,
      photo: certForm.couplePhotoUrl || "https://rbjjt.com/wp-content/uploads/2026/08/Sacraments-%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0-of-RBJJT.jpeg",
      date: new Date().toLocaleDateString('hi-IN'),
      type: "अधिकृत आवाह-विवाह प्रमाण-पत्र (Official Certificate)"
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
            धर्माधिकारी पद, दहेज-मुक्त आवाह-विवाह, धम्म दीक्षा, विवाह प्रमाण-पत्र एवं विपश्यना स्वास्थ्य शिविर हेतु आधिकारिक फॉर्म भरें।
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
              <span>2. आवाह-विवाह पंजीकरण</span>
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
            {/* SUCCESS SLIP FOR OTHER FORMS (MATRIMONIAL, DIKSHA, ETC.) */}
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
                  <img src={logoHD} alt="RBJJT Official Logo" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
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
                {/* 1. DHAMMADHIKARI FORM (GOVERNMENT PORTAL APPLICATION FORM -> 3-PAGE OFFICIAL PDF) */}
                {activeTab === 'dhammadhikari' && (
                  <DhammadhikariPortalForm onRecordAdded={onRecordAdded} />
                )}

                {/* 2. MATRIMONIAL FORM (आदर्श विवाह हेतु रजिस्ट्रेशन फॉर्म -> 100% OFFICIAL A4 PDF) */}
                {activeTab === 'matrimonial' && (
                  <MatrimonialPortalForm onRecordAdded={onRecordAdded} />
                )}

                {/* 3. DIKSHA FORM (GOVERNMENT/TRUST E-PORTAL APPLICATION) */}
                {activeTab === 'diksha' && (
                  <form onSubmit={handleDikshaSubmit} className="govt-portal-application-form animate-fade-in">
                    {/* Top Application Header Ribbon */}
                    <div className="portal-form-header-ribbon">
                      <div className="ribbon-brand-block">
                        <div className="gov-emblem-seal">
                          <span className="dharma-wheel">☸</span>
                        </div>
                        <div>
                          <span className="gov-pre-heading">
                            राष्ट्रीय बौद्ध जन जागरण ट्रस्ट • Reg. No. 069/16 | केंद्रीय कार्यालय: सारनाथ, वाराणसी (उ.प्र.)
                          </span>
                          <h3 className="ribbon-title">
                            धम्म दीक्षा ऑनलाइन ई-आवेदन प्रपत्र (Dhamma Diksha E-Portal)
                          </h3>
                          <span className="ribbon-subtitle">
                            पंचशील, त्रिशरण एवं पूज्य बाबासाहब की 22 प्रतिज्ञाओं के साथ प्रबुद्ध जीवन शैली
                          </span>
                        </div>
                      </div>

                      <div className="ribbon-reg-box">
                        <span className="reg-box-lbl">आवेदन संख्या (Application No.):</span>
                        <strong className="reg-box-val">{`RBJJT/DK/2026/${Math.floor(1000 + Math.random() * 9000)}`}</strong>
                        <span className="gov-status-live">🟢 सत्र 2026-27 • ऑनलाइन सक्रिय</span>
                      </div>
                    </div>

                    {/* Official Government Portal Advisory */}
                    <div className="govt-portal-notice-box">
                      <div className="govt-notice-header">
                        <ShieldCheck size={18} color="#1E3A8A" />
                        <span>धम्म दीक्षा ई-पंजीकरण नागरिक दिशा-निर्देश (Official Guidelines)</span>
                      </div>
                      <div className="govt-notice-grid">
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">1. संकल्प</span>
                          <span>बुद्ध धम्म, पंचशील, त्रिशरण व बाबासाहब की 22 प्रतिज्ञाओं में पूर्ण आस्था होना अनिवार्य है।</span>
                        </div>
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">2. विवरण</span>
                          <span>नाम व संपर्क विवरण आधार कार्ड के अनुसार ही दर्ज करें।</span>
                        </div>
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">3. प्रमाणपत्र</span>
                          <span>दीक्षा उपरांत ट्रस्ट द्वारा अधिकृत मुहरयुक्त धम्म दीक्षा प्रमाण-पत्र प्रदान किया जाएगा।</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Personal Details */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">1</span>
                        <div>
                          <h4 className="portal-step-title">प्रार्थी का व्यक्तिगत विवरण (Personal Details)</h4>
                          <span className="portal-step-sub">आवेदक का पूरा नाम, पिता/पति का नाम, जन्मतिथि व शैक्षणिक योग्यता</span>
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">प्रार्थी का पूरा नाम (Full Name as per Aadhaar) <span className="required">*</span></label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="आवेदक का पूरा नाम दर्ज करें..."
                            value={dikshaForm.fullName}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, fullName: e.target.value })}
                          />
                          {errors.dikshaName && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.dikshaName}</span>}
                        </div>

                        <div className="form-group">
                          <label className="form-label">पिता / पति का नाम (Father's / Husband's Name)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="पिता अथवा पति का नाम दर्ज करें..."
                            value={dikshaForm.fatherHusbandName}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, fatherHusbandName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-grid-3">
                        <div className="form-group">
                          <label className="form-label">जन्मतिथि (Date of Birth)</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={dikshaForm.dob}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, dob: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">लिंग (Gender)</label>
                          <select 
                            className="form-select"
                            value={dikshaForm.gender}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, gender: e.target.value })}
                          >
                            <option>पुरुष (Male)</option>
                            <option>महिला (Female)</option>
                            <option>अन्य (Other)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">सक्रिय मोबाइल नंबर <span className="required">*</span></label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            placeholder="10 अंकों का मोबाइल नंबर..."
                            value={dikshaForm.mobile}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, mobile: e.target.value })}
                          />
                          {errors.dikshaMobile && <span style={{ color: 'var(--color-error)', fontSize: '0.8rem' }}>{errors.dikshaMobile}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Address & Location */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">2</span>
                        <div>
                          <h4 className="portal-step-title">संपर्क एवं स्थायी निवास पता (Contact & Address Details)</h4>
                          <span className="portal-step-sub">पत्र-व्यवहार पता, जनपद, राज्य एवं पिन कोड</span>
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">ग्राम / मोहल्ला व पोस्ट पता</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="मकान संख्या, ग्राम/मोहल्ला, पोस्ट ऑफिस..."
                            value={dikshaForm.address}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, address: e.target.value })}
                          />
                        </div>

                        <div className="form-grid-2">
                          <div className="form-group">
                            <label className="form-label">जनपद / जिला</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              placeholder="उदा. वाराणसी / सारनाथ"
                              value={dikshaForm.district}
                              onChange={(e) => setDikshaForm({ ...dikshaForm, district: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">राज्य (State)</label>
                            <input 
                              type="text" 
                              className="form-input" 
                              value={dikshaForm.state}
                              onChange={(e) => setDikshaForm({ ...dikshaForm, state: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Diksha Preferences */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">3</span>
                        <div>
                          <h4 className="portal-step-title">धम्म दीक्षा प्राथमिकता एवं विवरण (Diksha Preferences)</h4>
                          <span className="portal-step-sub">दीक्षा का प्रकार, स्थान प्राथमिकता एवं संभावित तिथि</span>
                        </div>
                      </div>

                      <div className="form-grid-3">
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

                        <div className="form-group">
                          <label className="form-label">अपेक्षित दीक्षा तिथि</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={dikshaForm.preferredDate}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, preferredDate: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Oath Checkbox */}
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#FFFDF5', border: '1.5px solid var(--color-gold)', borderRadius: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={dikshaForm.panchsheelPledge}
                            onChange={(e) => setDikshaForm({ ...dikshaForm, panchsheelPledge: e.target.checked })}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                          />
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                            मैं तथागत बुद्ध के त्रिशरण, पंचशील एवं बोधिसत्व बाबासाहब डॉ. भीमराव अंबेडकर जी की 22 प्रतिज्ञाओं को जीवन भर स्वीकार व पालन करने का सत्य संकल्प लेता/लेती हूँ।
                          </span>
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                      <CheckCircle2 size={19} />
                      <span>धम्म दीक्षा ई-आवेदन सबमिट करें एवं आधिकारिक पावती प्राप्त करें</span>
                    </button>
                  </form>
                )}

                {/* 4. MARRIAGE CERTIFICATE FORM (GOVERNMENT/TRUST E-PORTAL APPLICATION) */}
                {activeTab === 'marriageCert' && (
                  <form onSubmit={handleCertSubmit} className="govt-portal-application-form animate-fade-in">
                    {/* Top Application Header Ribbon */}
                    <div className="portal-form-header-ribbon">
                      <div className="ribbon-brand-block">
                        <div className="gov-emblem-seal">
                          <span className="dharma-wheel">☸</span>
                        </div>
                        <div>
                          <span className="gov-pre-heading">
                            राष्ट्रीय बौद्ध जन जागरण ट्रस्ट • Reg. No. 069/16 | केंद्रीय कार्यालय: सारनाथ, वाराणसी (उ.प्र.)
                          </span>
                          <h3 className="ribbon-title">
                            आवाह-विवाह प्रमाण-पत्र ऑनलाइन ई-प्रपत्र (Marriage Certificate Portal)
                          </h3>
                          <span className="ribbon-subtitle">
                            ट्रस्ट द्वारा अधिकृत पंजीकृत आवाह-विवाह प्रमाण-पत्र जारी करने हेतु आधिकारिक सेवा
                          </span>
                        </div>
                      </div>

                      <div className="ribbon-reg-box">
                        <span className="reg-box-lbl">प्रमाण-पत्र आवेदन क्र. (App No.):</span>
                        <strong className="reg-box-val">{`RBJJT/MC/2026/${Math.floor(1000 + Math.random() * 9000)}`}</strong>
                        <span className="gov-status-live">🟢 सत्र 2026-27 • ऑनलाइन सक्रिय</span>
                      </div>
                    </div>

                    {/* Official Government Portal Advisory */}
                    <div className="govt-portal-notice-box">
                      <div className="govt-notice-header">
                        <ShieldCheck size={18} color="#1E3A8A" />
                        <span>आवाह-विवाह प्रमाण-पत्र जारी करने हेतु दिशा-निर्देश (Official Certificate Guidelines)</span>
                      </div>
                      <div className="govt-notice-grid">
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">1. दस्तावेज</span>
                          <span>वर एवं वधू दोनों का नाम, जन्मतिथि व पिता का नाम आधार कार्ड अनुसार ही भरें।</span>
                        </div>
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">2. गवाह</span>
                          <span>विवाह संस्कार में उपस्थित कम से कम दो गवाहों (साक्षीगण) का विवरण दर्ज करें।</span>
                        </div>
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">3. प्रमाण पत्र</span>
                          <span>आवेदन स्वीकृत होते ही ट्रस्ट की आधिकारिक मुहरयुक्त आवाह-विवाह प्रमाण-पत्र जारी होगा।</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Groom Details */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">1</span>
                        <div>
                          <h4 className="portal-step-title">वर (Groom) का विवरण</h4>
                          <span className="portal-step-sub">वर का पूरा नाम, पिता का नाम, जन्मतिथि, आयु व पता</span>
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">वर का नाम (Groom's Full Name) <span className="required">*</span></label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="वर का पूरा नाम दर्ज करें..."
                            value={certForm.groomName}
                            onChange={(e) => setCertForm({ ...certForm, groomName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">वर के पिता का नाम (Father's Name)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="वर के पिता का नाम..."
                            value={certForm.groomFather}
                            onChange={(e) => setCertForm({ ...certForm, groomFather: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">वर की जन्मतिथि (Groom's DOB)</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={certForm.groomDob}
                            onChange={(e) => setCertForm({ ...certForm, groomDob: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">वर का स्थायी निवास पता</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="ग्राम, पोस्ट, जिला, राज्य, पिन कोड..."
                            value={certForm.groomAddress}
                            onChange={(e) => setCertForm({ ...certForm, groomAddress: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Bride Details */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">2</span>
                        <div>
                          <h4 className="portal-step-title">वधू (Bride) का विवरण</h4>
                          <span className="portal-step-sub">वधू का पूरा नाम, पिता का नाम, जन्मतिथि, आयु व पता</span>
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">वधू का नाम (Bride's Full Name) <span className="required">*</span></label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="वधू का पूरा नाम दर्ज करें..."
                            value={certForm.brideName}
                            onChange={(e) => setCertForm({ ...certForm, brideName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">वधू के पिता का नाम (Father's Name)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="वधू के पिता का नाम..."
                            value={certForm.brideFather}
                            onChange={(e) => setCertForm({ ...certForm, brideFather: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">वधू की जन्मतिथि (Bride's DOB)</label>
                          <input 
                            type="date" 
                            className="form-input" 
                            value={certForm.brideDob}
                            onChange={(e) => setCertForm({ ...certForm, brideDob: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">वधू का स्थायी निवास पता</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="ग्राम, पोस्ट, जिला, राज्य, पिन कोड..."
                            value={certForm.brideAddress}
                            onChange={(e) => setCertForm({ ...certForm, brideAddress: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Marriage Ceremony & Witnesses */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">3</span>
                        <div>
                          <h4 className="portal-step-title">विवाह संस्कार एवं साक्षीगण (Ceremony & Witnesses)</h4>
                          <span className="portal-step-sub">विवाह संपन्न होने की तिथि, स्थल व गवाहों का विवरण</span>
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
                            placeholder="बौद्ध विहार अथवा गृह स्थान का नाम..."
                            value={certForm.marriagePlace}
                            onChange={(e) => setCertForm({ ...certForm, marriagePlace: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">संस्कार कराने वाले भिक्खु संघ</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={certForm.presidingBhikkhu}
                            onChange={(e) => setCertForm({ ...certForm, presidingBhikkhu: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ marginTop: '0.75rem' }}>
                        <div className="form-group">
                          <label className="form-label">साक्षी 1 (गवाह 1 का नाम व फोन)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="गवाह 1 का नाम व मोबाइल नंबर..."
                            value={certForm.witnessName1}
                            onChange={(e) => setCertForm({ ...certForm, witnessName1: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">साक्षी 2 (गवाह 2 का नाम व फोन)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="गवाह 2 का नाम व मोबाइल नंबर..."
                            value={certForm.witnessName2}
                            onChange={(e) => setCertForm({ ...certForm, witnessName2: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Photo Upload */}
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#F9FAFB', border: '1.5px dashed var(--color-border)', borderRadius: '8px' }}>
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Camera size={16} color="var(--color-primary)" />
                          <span>वर-वधू युगल फोटो अपलोड करें (Couple Photo)</span>
                        </label>
                        <input 
                          type="file" 
                          accept="image/*"
                          className="form-input" 
                          style={{ padding: '0.45rem', marginTop: '0.35rem' }}
                          onChange={(e) => handlePhotoUpload(e, 'cert')}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                      <FileText size={19} />
                      <span>विवाह प्रमाण-पत्र आवेदन सबमिट करें एवं डिजिटल पावती प्राप्त करें</span>
                    </button>
                  </form>
                )}

                {/* 5. HEALTH & VIPASSANA CAMP FORM (GOVERNMENT/TRUST E-PORTAL APPLICATION) */}
                {activeTab === 'healthCamp' && (
                  <form onSubmit={handleHealthSubmit} className="govt-portal-application-form animate-fade-in">
                    {/* Top Application Header Ribbon */}
                    <div className="portal-form-header-ribbon">
                      <div className="ribbon-brand-block">
                        <div className="gov-emblem-seal">
                          <span className="dharma-wheel">☸</span>
                        </div>
                        <div>
                          <span className="gov-pre-heading">
                            राष्ट्रीय बौद्ध जन जागरण ट्रस्ट • Reg. No. 069/16 | केंद्रीय कार्यालय: सारनाथ, वाराणसी (उ.प्र.)
                          </span>
                          <h3 className="ribbon-title">
                            स्वास्थ्य एवं विपश्यना ध्यान शिविर ई-पंजीकरण (Health & Camp Portal)
                          </h3>
                          <span className="ribbon-subtitle">
                            मानसिक शांति, तनावमुक्ति, योग व प्राकृतिक चिकित्सा शिविर (ऋषिपत्तन, सारनाथ)
                          </span>
                        </div>
                      </div>

                      <div className="ribbon-reg-box">
                        <span className="reg-box-lbl">शिविर पंजीयन क्र. (Camp No.):</span>
                        <strong className="reg-box-val">{`RBJJT/HL/2026/${Math.floor(1000 + Math.random() * 9000)}`}</strong>
                        <span className="gov-status-live">🟢 सत्र 2026-27 • ऑनलाइन सक्रिय</span>
                      </div>
                    </div>

                    {/* Official Government Portal Advisory */}
                    <div className="govt-portal-notice-box">
                      <div className="govt-notice-header">
                        <ShieldCheck size={18} color="#1E3A8A" />
                        <span>शिविरार्थी हेतु महत्वपूर्ण दिशा-निर्देश (Camp Guidelines & Code of Conduct)</span>
                      </div>
                      <div className="govt-notice-grid">
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">1. अनुशासन</span>
                          <span>शिविर अवधि में आर्य मौन (Noble Silence) एवं आश्रम अनुशासन का पूर्ण पालन करना अनिवार्य है।</span>
                        </div>
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">2. स्वास्थ्य</span>
                          <span>यदि कोई गंभीर स्वास्थ्य या बीपी/डायबिटीज की समस्या हो तो सही विवरण अवश्य दर्ज करें।</span>
                        </div>
                        <div className="govt-notice-item">
                          <span className="govt-notice-badge">3. प्रवेश पत्र</span>
                          <span>आवेदन सबमिट करने पर शिविर प्रवेश अनुमति पत्र (Entry Pass Slip) तुरंत जनरेट होगा।</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Applicant Details */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">1</span>
                        <div>
                          <h4 className="portal-step-title">साधक / प्रार्थी का व्यक्तिगत विवरण (Sadhak Details)</h4>
                          <span className="portal-step-sub">नाम, पिता/अभिभावक का नाम, उम्र, लिंग एवं व्यवसाय</span>
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">प्रार्थी का पूरा नाम (Full Name) <span className="required">*</span></label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="साधक का पूरा नाम दर्ज करें..."
                            value={healthForm.fullName}
                            onChange={(e) => setHealthForm({ ...healthForm, fullName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">पिता / अभिभावक का नाम (Guardian Name)</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="पिता या अभिभावक का नाम..."
                            value={healthForm.guardianName}
                            onChange={(e) => setHealthForm({ ...healthForm, guardianName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-grid-3">
                        <div className="form-group">
                          <label className="form-label">उम्र (Age in Years)</label>
                          <input 
                            type="number" 
                            className="form-input" 
                            placeholder="उदा. 35"
                            value={healthForm.age}
                            onChange={(e) => setHealthForm({ ...healthForm, age: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">लिंग (Gender)</label>
                          <select 
                            className="form-select"
                            value={healthForm.gender}
                            onChange={(e) => setHealthForm({ ...healthForm, gender: e.target.value })}
                          >
                            <option>पुरुष (Male)</option>
                            <option>महिला (Female)</option>
                            <option>अन्य (Other)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">मोबाइल नंबर <span className="required">*</span></label>
                          <input 
                            type="tel" 
                            className="form-input" 
                            placeholder="10 अंकों का फोन नंबर..."
                            value={healthForm.mobile}
                            onChange={(e) => setHealthForm({ ...healthForm, mobile: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Camp Selection & Health Issues */}
                    <div className="portal-card-section">
                      <div className="portal-card-header">
                        <span className="portal-step-num">2</span>
                        <div>
                          <h4 className="portal-step-title">शिविर चयन एवं स्वास्थ्य स्थिति (Camp & Health Profile)</h4>
                          <span className="portal-step-sub">शिविर का प्रकार, स्वास्थ्य समस्या एवं पूर्व ध्यान अनुभव</span>
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

                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">पूर्व ध्यान / विपश्यना अनुभव</label>
                          <select 
                            className="form-select"
                            value={healthForm.pastExperience}
                            onChange={(e) => setHealthForm({ ...healthForm, pastExperience: e.target.value })}
                          >
                            <option>नहीं (प्रथम बार / New Student)</option>
                            <option>हाँ, पूर्व साधक (Old Student)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">स्थायी निवास पता व जिला</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="ग्राम/शहर, जिला, राज्य..."
                            value={healthForm.address}
                            onChange={(e) => setHealthForm({ ...healthForm, address: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Code of Conduct Checkbox */}
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={healthForm.healthPledge}
                            onChange={(e) => setHealthForm({ ...healthForm, healthPledge: e.target.checked })}
                            style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
                          />
                          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                            मैं शिविर की पूरी अवधि में नियमों, आर्य मौन एवं आचार्य जी के निर्देशों का निष्ठापूर्वक पालन करने की सहमति देता/देती हूँ।
                          </span>
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-gold btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                      <Activity size={19} />
                      <span>शिविर में स्थान आरक्षित करें एवं प्रवेश पर्ची प्राप्त करें</span>
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
