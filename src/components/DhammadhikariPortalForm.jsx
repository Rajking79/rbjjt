import React, { useState } from 'react';
import { 
  UserCheck, Camera, FileText, Upload, Check, Copy, AlertCircle, 
  CheckCircle2, RefreshCw, ArrowRight, ShieldCheck, HeartHandshake, 
  MapPin, Users, Award, CreditCard, Sparkles, Plus, Trash2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OfficialDhammadhikariFormPDF } from './OfficialDhammadhikariFormPDF';
import './OfficialDhammadhikariFormPDF.css';

export function DhammadhikariPortalForm({ onRecordAdded }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
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
      { id: 1, name: '', age: '', education: '', maritalStatus: '' },
      { id: 2, name: '', age: '', education: '', maritalStatus: '' },
      { id: 3, name: '', age: '', education: '', maritalStatus: '' },
      { id: 4, name: '', age: '', education: '', maritalStatus: '' },
    ],
    siblings: '',
    serviceYears: '',
    serviceMonths: '',
    serviceField: 'ग्राम धम्म प्रचार एवं बाल संस्कार',
    proposedRole: 'ग्राम धर्माधिकारी (Village In-charge)',
    donationAmount: '₹ 1000/-',
    dhammadhikariName: '',
    idNumber: '',
    formDate: new Date().toLocaleDateString('hi-IN'),
    signatureUrl: '',
    paymentScreenshotUrl: '',
    utrNumber: '',
    pledgeAccepted: false
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSameAddressChange = (e) => {
    const isChecked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsCurrent: isChecked,
      permanentAddress: isChecked ? prev.currentAddress : prev.permanentAddress
    }));
  };

  const handleChildChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.familyDetails];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, familyDetails: updated };
    });
  };

  const handleMaritalToggle = (idx, status) => {
    setFormData(prev => {
      const updated = [...prev.familyDetails];
      const current = updated[idx].maritalStatus;
      updated[idx] = { ...updated[idx], maritalStatus: current === status ? '' : status };
      return { ...prev, familyDetails: updated };
    });
  };

  const handleClearChildRow = (idx) => {
    setFormData(prev => {
      const updated = [...prev.familyDetails];
      updated[idx] = { id: idx + 1, name: '', age: '', education: '', maritalStatus: '' };
      return { ...prev, familyDetails: updated };
    });
  };

  const handleAddChildRow = () => {
    setFormData(prev => {
      const nextId = prev.familyDetails.length + 1;
      return {
        ...prev,
        familyDetails: [
          ...prev.familyDetails,
          { id: nextId, name: '', age: '', education: '', maritalStatus: '' }
        ]
      };
    });
  };

  const handleRemoveChildRow = (idx) => {
    setFormData(prev => {
      if (prev.familyDetails.length > 4) {
        const filtered = prev.familyDetails.filter((_, i) => i !== idx);
        const reindexed = filtered.map((c, i) => ({ ...c, id: i + 1 }));
        return { ...prev, familyDetails: reindexed };
      } else {
        const updated = [...prev.familyDetails];
        updated[idx] = { id: idx + 1, name: '', age: '', education: '', maritalStatus: '' };
        return { ...prev, familyDetails: updated };
      }
    });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleReset = () => {
    setFormData({
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
        { id: 1, name: '', age: '', education: '', maritalStatus: '' },
        { id: 2, name: '', age: '', education: '', maritalStatus: '' },
        { id: 3, name: '', age: '', education: '', maritalStatus: '' },
        { id: 4, name: '', age: '', education: '', maritalStatus: '' },
      ],
      siblings: '',
      serviceYears: '',
      serviceMonths: '',
      serviceField: 'ग्राम धम्म प्रचार एवं बाल संस्कार',
      proposedRole: 'ग्राम धर्माधिकारी (Village In-charge)',
      donationAmount: '₹ 1000/-',
      dhammadhikariName: '',
      idNumber: '',
      formDate: new Date().toLocaleDateString('hi-IN'),
      signatureUrl: '',
      paymentScreenshotUrl: '',
      utrNumber: '',
      pledgeAccepted: false
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "कृपया सदस्य का नाम दर्ज करें";
    if (!formData.fatherHusbandName.trim()) newErrors.fatherHusbandName = "पिता अथवा पति का नाम आवश्यक है";
    if (!formData.currentAddress.trim()) newErrors.currentAddress = "पत्र-व्यवहार का पूरा पता दर्ज करें";
    if (!formData.block.trim()) newErrors.block = "ब्लॉक / तहसील का नाम दर्ज करें";
    if (!formData.district.trim()) newErrors.district = "जनपद / जिला का नाम दर्ज करें";
    if (!formData.mobile.trim() || formData.mobile.length < 10) newErrors.mobile = "मान्य 10 अंकों का मोबाइल नंबर दर्ज करें";
    if (!formData.pledgeAccepted) newErrors.pledgeAccepted = "प्रतिज्ञा (शपथ) पत्र स्वीकार करना अनिवार्य है";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstField = Object.keys(newErrors)[0];
      const el = document.querySelector(`[name="${firstField}"]`);
      if (el) el.focus();
      return;
    }

    setErrors({});

    // Save Record to LocalStorage CRM
    let existing = [];
    try {
      const saved = localStorage.getItem('rbjjt_records');
      if (saved) existing = JSON.parse(saved);
    } catch (err) {}

    const submissionPayload = {
      ...formData,
      permanentAddress: formData.sameAsCurrent ? formData.currentAddress : (formData.permanentAddress || formData.currentAddress),
      formDate: formData.formDate || new Date().toLocaleDateString('hi-IN'),
      isOfficialDhammadhikari: true
    };

    const record = {
      id: formData.regNo,
      type: 'dhammadhikari',
      typeName: 'धर्माधिकारी आवेदन',
      name: formData.fullName,
      phone: formData.mobile,
      district: formData.district,
      state: 'उत्तर प्रदेश',
      status: 'स्वीकृत (Approved)',
      date: submissionPayload.formDate,
      details: `पद: ${formData.proposedRole}, ब्लॉक: ${formData.block}, दान: ₹1000`,
      fullData: submissionPayload
    };

    const updated = [record, ...existing.filter(r => r.id !== record.id)];
    localStorage.setItem('rbjjt_records', JSON.stringify(updated));

    if (onRecordAdded) onRecordAdded(updated.length);

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {}

    // Switch to PDF Generation View!
    setIsSubmitted(true);
    window.scrollTo({ top: document.getElementById('forms')?.offsetTop - 80 || 0, behavior: 'smooth' });
  };

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    'upi://pay?pa=9451442126@sbi&pn=RASHTRIYA BUDDHA JAN JAGRAN TRUST&am=1000&cu=INR&tn=Dhammadhikari Sahyog Dan'
  )}&color=000000&bgcolor=FFFFFF`;

  // IF SUBMITTED: RENDER THE 3-PAGE OFFICIAL PDF DOCUMENT!
  if (isSubmitted) {
    return (
      <OfficialDhammadhikariFormPDF 
        data={formData} 
        onEdit={() => setIsSubmitted(false)} 
        onNew={handleReset} 
      />
    );
  }

  // DEFAULT VIEW: GOVERNMENT PORTAL STYLE ONLINE APPLICATION FORM
  return (
    <form onSubmit={handleSubmit} className="govt-portal-application-form">
      {/* Portal Top Header Ribbon (Official Govt Portal Style) */}
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
              धर्माधिकारी ऑनलाइन आवेदन एवं नियुक्ति ई-प्रपत्र
            </h3>
            <span className="ribbon-subtitle">
              समता, शील एवं प्रबुद्ध भारत निर्माण महाभियान • आधिकारिक ऑनलाइन सेवा पोर्टल
            </span>
          </div>
        </div>

        <div className="ribbon-reg-box">
          <span className="reg-box-lbl">आवेदन क्रमांक (Application No.):</span>
          <strong className="reg-box-val">{formData.regNo}</strong>
          <span className="gov-status-live">🟢 सत्र 2026-27 • ऑनलाइन सक्रिय</span>
        </div>
      </div>

      {/* Official Government Portal Advisory (Clean & Prestigious) */}
      <div className="govt-portal-notice-box">
        <div className="govt-notice-header">
          <ShieldCheck size={18} color="#1E3A8A" />
          <span>धर्माधिकारी ई-आवेदन नागरिक दिशा-निर्देश (Official Portal Guidelines)</span>
        </div>
        <div className="govt-notice-grid">
          <div className="govt-notice-item">
            <span className="govt-notice-badge">1. दस्तावेज</span>
            <span>नाम, जन्मतिथि व शैक्षणिक योग्यता आधार कार्ड व प्रमाण-पत्र के अनुसार ही दर्ज करें।</span>
          </div>
          <div className="govt-notice-item">
            <span className="govt-notice-badge">2. प्रविष्टियां</span>
            <span>लाल स्टार (<strong style={{ color: '#DC2626' }}>*</strong>) से चिन्हित सभी कॉलम भरना अनिवार्य (Mandatory) है।</span>
          </div>
          <div className="govt-notice-item">
            <span className="govt-notice-badge">3. ई-प्रपत्र</span>
            <span>सबमिट करते ही अधिकृत 3-पेज आधिकारिक फॉर्म (आवेदन, शपथ व दान रसीद) स्वतः प्राप्त होगा।</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. व्यक्तिगत विवरण (Personal Details)                      */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">1</span>
          <div>
            <h4 className="portal-step-title">व्यक्तिगत विवरण (Personal Details)</h4>
            <span className="portal-step-sub">आवेदक का नाम, पिता/पति का नाम, जन्मतिथि व शैक्षणिक योग्यता</span>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              सदस्य का पूरा नाम <span className="required">*</span>
            </label>
            <input 
              type="text" 
              name="fullName"
              className="form-input" 
              placeholder="उदा. राहुल कुमार मौर्य"
              value={formData.fullName}
              onChange={(e) => handleFieldChange('fullName', e.target.value)}
            />
            {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              पिता या पति का नाम <span className="required">*</span>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select 
                className="form-select"
                style={{ width: '140px', flexShrink: 0 }}
                value={formData.fatherHusbandType}
                onChange={(e) => handleFieldChange('fatherHusbandType', e.target.value)}
              >
                <option value="आदरणीय">आदरणीय</option>
                <option value="स्मृतिशेष">स्मृतिशेष</option>
              </select>
              <input 
                type="text" 
                name="fatherHusbandName"
                className="form-input" 
                placeholder="पिता अथवा पति का नाम"
                value={formData.fatherHusbandName}
                onChange={(e) => handleFieldChange('fatherHusbandName', e.target.value)}
              />
            </div>
            {errors.fatherHusbandName && <span className="field-error-msg">{errors.fatherHusbandName}</span>}
          </div>
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">जन्मतिथि (Date of Birth)</label>
            <input 
              type="date" 
              className="form-input" 
              value={formData.dob}
              onChange={(e) => handleFieldChange('dob', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">उच्चतम शैक्षणिक योग्यता</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="उदा. हाईस्कूल / इंटर / स्नातक / परास्नातक"
              value={formData.qualification}
              onChange={(e) => handleFieldChange('qualification', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">पहचान पत्र क्रमांक (आधार / वोटर आईडी)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="उदा. 12 अंकों का आधार क्रमांक"
              value={formData.idNumber}
              onChange={(e) => handleFieldChange('idNumber', e.target.value)}
            />
          </div>
        </div>

        {/* Occupation Chips */}
        <div className="form-group" style={{ margin: '0.75rem 0 1rem 0' }}>
          <label className="form-label" style={{ marginBottom: '0.45rem', display: 'block' }}>
            व्यवसाय (Occupation):
          </label>
          <div className="occupation-chip-group">
            {['नौकरी', 'व्यापार', 'कृषि', 'अन्य'].map((occ) => (
              <button
                key={occ}
                type="button"
                className={`occupation-chip ${formData.occupation === occ ? 'active' : ''}`}
                onClick={() => handleFieldChange('occupation', occ)}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Passport Photo Upload */}
        <div className="photo-upload-container-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <Camera size={16} color="var(--color-primary)" />
                आवेदक का पासपोर्ट फोटो अपलोड करें
              </label>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                आवेदन-पत्र के फोटो फ्रेम में प्रदर्शित होगा (JPG / PNG, अधिकतम 2MB)
              </span>
              <div style={{ marginTop: '0.4rem' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-input" 
                  style={{ padding: '0.35rem' }}
                  onChange={(e) => handleFileUpload(e, 'photoUrl')}
                />
              </div>
            </div>

            {formData.photoUrl && (
              <div className="preview-thumb-frame">
                <img src={formData.photoUrl} alt="Uploaded Applicant" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. संपर्क एवं निवास पता (Address & Contact Details)        */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">2</span>
          <div>
            <h4 className="portal-step-title">संपर्क एवं निवास पता (Contact & Address Details)</h4>
            <span className="portal-step-sub">मोबाइल नंबर, पत्र-व्यवहार पता एवं स्थायी निवास</span>
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              फोन / मोबाइल नंबर <span className="required">*</span>
            </label>
            <input 
              type="tel" 
              name="mobile"
              className="form-input" 
              placeholder="10 अंकों का सक्रिय मोबाइल नंबर"
              value={formData.mobile}
              onChange={(e) => handleFieldChange('mobile', e.target.value)}
            />
            {errors.mobile && <span className="field-error-msg">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">व्हाट्सएप नंबर (वैकल्पिक)</label>
            <input 
              type="tel" 
              className="form-input" 
              placeholder="व्हाट्सएप नंबर"
              value={formData.whatsapp}
              onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              पत्र-व्यवहार का पूरा पता <span className="required">*</span>
            </label>
            <input 
              type="text" 
              name="currentAddress"
              className="form-input" 
              placeholder="मकान नं., गली, मोहल्ला / ग्राम"
              value={formData.currentAddress}
              onChange={(e) => handleFieldChange('currentAddress', e.target.value)}
            />
            {errors.currentAddress && <span className="field-error-msg">{errors.currentAddress}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">पिन कोड (Pincode)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="6 अंकों का पिन कोड"
              value={formData.pincode}
              onChange={(e) => handleFieldChange('pincode', e.target.value)}
            />
          </div>
        </div>

        <div style={{ margin: '0.4rem 0 0.75rem 0' }}>
          <label className="form-checkbox-label" style={{ fontSize: '0.88rem' }}>
            <input 
              type="checkbox" 
              className="form-checkbox"
              checked={formData.sameAsCurrent}
              onChange={handleSameAddressChange}
            />
            <span>मूल (स्थायी) पता पत्र-व्यवहार के पते जैसा ही है</span>
          </label>
        </div>

        {!formData.sameAsCurrent && (
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label className="form-label">मूल (स्थायी) पता</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="स्थायी निवास का पूरा पता"
              value={formData.permanentAddress}
              onChange={(e) => handleFieldChange('permanentAddress', e.target.value)}
            />
          </div>
        )}

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">ग्राम / मोहल्ला</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="ग्राम"
              value={formData.village}
              onChange={(e) => handleFieldChange('village', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">पोस्ट ऑफिस</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="पोस्ट"
              value={formData.post}
              onChange={(e) => handleFieldChange('post', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              ब्लॉक / तहसील का नाम <span className="required">*</span>
            </label>
            <input 
              type="text" 
              name="block"
              className="form-input" 
              placeholder="ब्लॉक का नाम"
              value={formData.block}
              onChange={(e) => handleFieldChange('block', e.target.value)}
            />
            {errors.block && <span className="field-error-msg">{errors.block}</span>}
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">
              जनपद / जिला <span className="required">*</span>
            </label>
            <input 
              type="text" 
              name="district"
              className="form-input" 
              placeholder="उदा. सारनाथ / वाराणसी / भदोही"
              value={formData.district}
              onChange={(e) => handleFieldChange('district', e.target.value)}
            />
            {errors.district && <span className="field-error-msg">{errors.district}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">राज्य (State)</label>
            <input 
              type="text" 
              className="form-input" 
              value={formData.state}
              onChange={(e) => handleFieldChange('state', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. पारिवारिक विवरण (Family Details Table)                  */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="portal-step-num">3</span>
            <div>
              <h4 className="portal-step-title">पारिवारिक विवरण (Family Details)</h4>
              <span className="portal-step-sub">बच्चों का नाम, उम्र, शिक्षा एवं वैवाहिक स्थिति (आधिकारिक प्रपत्र सारणी)</span>
            </div>
          </div>

          {/* Quick Counter & Add Button in Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              color: 'var(--color-primary)', 
              background: 'var(--color-primary-subtle)', 
              padding: '4px 10px', 
              borderRadius: '20px',
              border: '1px solid rgba(122, 20, 20, 0.15)'
            }}>
              कुल पंक्तियां: {formData.familyDetails.length}
            </span>

            <button
              type="button"
              onClick={handleAddChildRow}
              className="btn btn-gold btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                padding: '0.4rem 0.85rem'
              }}
              title="यदि 4 से अधिक बच्चे हैं तो नई पंक्ति जोड़ें"
            >
              <Plus size={16} />
              <span>+ और बच्चे जोड़ें</span>
            </button>
          </div>
        </div>

        <div className="official-table-wrapper">
          <table className="portal-official-family-table">
            <thead>
              <tr>
                <th style={{ width: '6%', textAlign: 'center' }}>क्र.</th>
                <th style={{ width: '36%' }}>बच्चों का नाम</th>
                <th style={{ width: '15%', textAlign: 'center' }}>बच्चों का उम्र</th>
                <th style={{ width: '18%' }}>शिक्षा</th>
                <th style={{ width: '25%', textAlign: 'center' }}>
                  वैवाहिक स्थिति <span className="th-sub">(टिक लगायें)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.familyDetails.map((child, idx) => (
                <tr key={child.id} className={child.name ? 'row-active' : ''}>
                  <td className="row-num-cell">{child.id}.</td>
                  <td>
                    <input 
                      type="text" 
                      className="portal-cell-input" 
                      placeholder={`बच्चे #${child.id} का पूरा नाम...`}
                      value={child.name}
                      onChange={(e) => handleChildChange(idx, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="portal-cell-input text-center" 
                      placeholder="उम्र"
                      value={child.age}
                      onChange={(e) => handleChildChange(idx, 'age', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="portal-cell-input" 
                      placeholder="शिक्षा (उदा. स्नातक)"
                      value={child.education}
                      onChange={(e) => handleChildChange(idx, 'education', e.target.value)}
                    />
                  </td>
                  <td>
                    <div className="portal-marital-radio-wrap">
                      <label 
                        className={`portal-radio-lbl ${child.maritalStatus === 'विवाहित' ? 'selected' : ''}`}
                        onClick={() => handleMaritalToggle(idx, 'विवाहित')}
                      >
                        <span className={`portal-radio-circle ${child.maritalStatus === 'विवाहित' ? 'checked' : ''}`}></span>
                        <span>विवाहित</span>
                      </label>

                      <label 
                        className={`portal-radio-lbl ${child.maritalStatus === 'अविवाहित' ? 'selected' : ''}`}
                        onClick={() => handleMaritalToggle(idx, 'अविवाहित')}
                      >
                        <span className={`portal-radio-circle ${child.maritalStatus === 'अविवाहित' ? 'checked' : ''}`}></span>
                        <span>अविवाहित</span>
                      </label>

                      {/* Clear button if <= 4, or Delete button if > 4 */}
                      {formData.familyDetails.length > 4 ? (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveChildRow(idx)}
                          className="btn-clear-row"
                          style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
                          title={`बच्चे #${child.id} की पंक्ति हटाएं`}
                        >
                          <Trash2 size={13} />
                        </button>
                      ) : (child.name || child.age || child.education || child.maritalStatus) ? (
                        <button 
                          type="button" 
                          onClick={() => handleClearChildRow(idx)}
                          className="btn-clear-row"
                          title="इस पंक्ति को खाली करें"
                        >
                          ✕
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Official Sibling Line (Exact Match of Page 1) */}
        <div className="portal-siblings-row">
          <label className="portal-siblings-label">भाई-बंधु :</label>
          <input 
            type="text" 
            className="portal-siblings-input" 
            placeholder="संख्या अथवा नाम विवरण (उदा. 2 भाई, 1 बहन अथवा नाम)..."
            value={formData.siblings}
            onChange={(e) => handleFieldChange('siblings', e.target.value)}
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. समाज सेवा एवं पद चयन (Service & Role Details)          */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">4</span>
          <div>
            <h4 className="portal-step-title">समाज सेवा अनुभव एवं पद चयन (Social Service & Post Selection)</h4>
            <span className="portal-step-sub">ट्रस्ट में योग्यता व सामर्थ्य अनुसार दायित्व का चुनाव करें</span>
          </div>
        </div>

        <div className="role-guideline-box">
          प्रत्येक धर्माधिकारी धम्म के विकास हेतु प्रदेश, मण्डल, जिला, ब्लॉक, क्षेत्रीय व ग्रामीण तथा उपयुक्त पदों को अपनी योग्यता व सामर्थ्य के अनुसार चुनाव करके ही भरें।
        </div>

        <div className="form-grid-3">
          <div className="form-group">
            <label className="form-label">समाज सेवा अनुभव (वर्ष)</label>
            <input 
              type="number" 
              min="0"
              className="form-input" 
              placeholder="वर्ष (उदा. 2)"
              value={formData.serviceYears}
              onChange={(e) => handleFieldChange('serviceYears', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">समाज सेवा अनुभव (माह)</label>
            <input 
              type="number" 
              min="0"
              max="11"
              className="form-input" 
              placeholder="माह (उदा. 6)"
              value={formData.serviceMonths}
              onChange={(e) => handleFieldChange('serviceMonths', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">किस क्षेत्र / संस्था से</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="उदा. ग्राम धम्म प्रचार एवं बाल संस्कार"
              value={formData.serviceField}
              onChange={(e) => handleFieldChange('serviceField', e.target.value)}
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">उस पद का नाम जिसको सम्भालने की योग्यता रखते हों</label>
            <select 
              className="form-select"
              value={formData.proposedRole}
              onChange={(e) => handleFieldChange('proposedRole', e.target.value)}
            >
              <option value="ग्राम धर्माधिकारी (Village In-charge)">ग्राम धर्माधिकारी (Village In-charge)</option>
              <option value="5 ग्राम सभा केंद्र प्रमुख (Cluster Head)">5 ग्राम सभा केंद्र प्रमुख (Cluster Head)</option>
              <option value="ब्लॉक धर्म परिचायक (Block Coordinator)">ब्लॉक धर्म परिचायक (Block Coordinator)</option>
              <option value="जिला धम्म प्रचारक (District Representative)">जिला धम्म प्रचारक (District Representative)</option>
              <option value="मंडल परिचायक (Divisional Head)">मंडल परिचायक (Divisional Head)</option>
              <option value="धम्म उपासक / प्रचारक (General Upasak)">धम्म उपासक / प्रचारक (General Upasak)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">धर्माधिकारी का नाम (अनुमोदक अथवा स्वयं)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="उदा. आवेदक का नाम अथवा अनुशंसक"
              value={formData.dhammadhikariName}
              onChange={(e) => handleFieldChange('dhammadhikariName', e.target.value)}
            />
          </div>
        </div>

        {/* Signature Upload */}
        <div className="photo-upload-container-box" style={{ marginTop: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <FileText size={16} color="var(--color-primary)" />
                आवेदक का हस्ताक्षर अपलोड करें (Signature)
              </label>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                हस्ताक्षर की साफ़ फ़ोटो (छोड़ने पर आधिकारिक डिजिटल मुहर अंकित होगी)
              </span>
              <div style={{ marginTop: '0.4rem' }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="form-input" 
                  style={{ padding: '0.35rem' }}
                  onChange={(e) => handleFileUpload(e, 'signatureUrl')}
                />
              </div>
            </div>

            {formData.signatureUrl && (
              <div style={{ width: '120px', height: '55px', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', background: '#FFF' }}>
                <img src={formData.signatureUrl} alt="Signature Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. प्रतिज्ञा (शपथ) पत्र (Sacred Pledges)                    */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">5</span>
          <div>
            <h4 className="portal-step-title">प्रतिज्ञा (शपथ) पत्र (Pledge Acceptance)</h4>
            <span className="portal-step-sub">नोट- किसी भी धर्माधिकारी को प्रशिक्षण लेने से पहले यह प्रतिज्ञा पत्र भरना अनिवार्य है।</span>
          </div>
        </div>

        <div className="pledge-interactive-box">
          <h5 style={{ fontFamily: 'var(--font-heading)', color: '#7A1414', fontSize: '1.05rem', margin: '0 0 0.5rem 0' }}>
            प्रतिज्ञा:-
          </h5>

          <ul className="pledge-quote-list">
            <li>
              <strong>(1)</strong>
              <span>मैं शाकाहारी एवं सदाचारी जीवन व्यतीत करूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।</span>
            </li>
            <li>
              <strong>(2)</strong>
              <span>मैं किसी भी प्रकार की नशीली वस्तुओं एवं मादक पदार्थों का सेवन नहीं करूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।</span>
            </li>
            <li>
              <strong>(3)</strong>
              <span>मैं झूठ बोलना, ठगना, झगड़ा या चुगली करना, निन्दा निरर्थक बातें करना, कठोर कड़वी अपशब्द बातें करना इन सबसे विरत रहते हुए, मधुर मैत्री युक्त वाणी का प्रयोग करूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।</span>
            </li>
            <li>
              <strong>(4)</strong>
              <span>मैं मन वचन एवं कर्म से मिथ्याचार एवं कामाचार से विरत रहते हुए अपने मधुर व्यवहार से मानव मात्र का विश्वास पात्र बनूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।</span>
            </li>
            <li>
              <strong>(5)</strong>
              <span>मैं किसी का सामान बिना पूछे नहीं उठाऊँगा तथा अपने सम्यक् आजीविका से परिवार का भरण-पोषण करते हुए अपने मान मर्यादा का ध्यान रखते हुए लोगों के अन्दर धर्म जागे, मंगल कामना करता रहूँगा मैं ऐसी प्रतिज्ञा करता हूँ।</span>
            </li>
            <li>
              <strong>(6)</strong>
              <span>मैं मिशन (ट्रस्ट) के नियमों का पालन मन, वचन एवं कर्म से करता रहूँगा मैं ऐसी प्रतिज्ञा करता हूँ।</span>
            </li>
          </ul>

          {/* Official Declaration Text (Directly Editable & Auto-Synced) */}
          <div className="declaration-official-card">
            <div className="declaration-text-body">
              मैं, 
              <input 
                type="text" 
                className="decl-inline-input name-input" 
                placeholder="यहाँ सदस्य का नाम लिखें..." 
                value={formData.fullName} 
                onChange={(e) => handleFieldChange('fullName', e.target.value)} 
              /> 
              पुत्र 
              <select 
                className="decl-inline-select"
                value={formData.fatherHusbandType}
                onChange={(e) => handleFieldChange('fatherHusbandType', e.target.value)}
              >
                <option value="आदरणीय">आदरणीय</option>
                <option value="स्मृतिशेष">स्मृतिशेष</option>
              </select>
              <input 
                type="text" 
                className="decl-inline-input father-input" 
                placeholder="पिता / पति का नाम लिखें..." 
                value={formData.fatherHusbandName} 
                onChange={(e) => handleFieldChange('fatherHusbandName', e.target.value)} 
              /> 
              ग्राम 
              <input 
                type="text" 
                className="decl-inline-input village-input" 
                placeholder="ग्राम का नाम..." 
                value={formData.village} 
                onChange={(e) => handleFieldChange('village', e.target.value)} 
              /> 
              पोस्ट 
              <input 
                type="text" 
                className="decl-inline-input post-input" 
                placeholder="पोस्ट ऑफिस..." 
                value={formData.post} 
                onChange={(e) => handleFieldChange('post', e.target.value)} 
              /> 
              ब्लाक 
              <input 
                type="text" 
                className="decl-inline-input block-input" 
                placeholder="ब्लॉक / तहसील..." 
                value={formData.block} 
                onChange={(e) => handleFieldChange('block', e.target.value)} 
              /> 
              जिला 
              <input 
                type="text" 
                className="decl-inline-input district-input" 
                placeholder="जनपद / जिला..." 
                value={formData.district} 
                onChange={(e) => handleFieldChange('district', e.target.value)} 
              /> 
              का निवासी हूँ, मैं लिखित रूप से घोषणा करता हूँ कि इस प्रतिज्ञा पत्र में लिखित सभी सीलों का पालन मन, वचन एवं कर्म से भली-भाँति पालन करता रहूँगा। मैं लिखित रूप से ऐसा घोषणा करता हूँ।
            </div>

            {/* Role, Date and Mobile row inside pledge card (Exact Replica of Image 2) */}
            <div className="pledge-inline-details-grid">
              <div className="pledge-inline-field">
                <label className="pledge-inline-label">पद का नाम :</label>
                <input 
                  type="text" 
                  className="decl-inline-input role-input" 
                  placeholder="प्रस्तावित पद का नाम" 
                  value={formData.proposedRole} 
                  onChange={(e) => handleFieldChange('proposedRole', e.target.value)} 
                />
              </div>

              <div className="pledge-inline-field">
                <label className="pledge-inline-label">दिनांक :</label>
                <input 
                  type="text" 
                  className="decl-inline-input date-input" 
                  value={formData.formDate} 
                  onChange={(e) => handleFieldChange('formDate', e.target.value)} 
                />
              </div>

              <div className="pledge-inline-field" style={{ gridColumn: '1 / -1' }}>
                <label className="pledge-inline-label">मोबाइल नं. :</label>
                <input 
                  type="tel" 
                  className="decl-inline-input phone-input" 
                  placeholder="10 अंकों का सक्रिय मोबाइल नंबर" 
                  value={formData.mobile} 
                  onChange={(e) => handleFieldChange('mobile', e.target.value)} 
                />
              </div>
            </div>
            
            <div className="declaration-card-helper">
              <span className="helper-icon">✍️</span>
              <span>
                <strong>निर्देश:</strong> आप उपरोक्त खाली स्थानों में सीधे क्लिक करके अपना विवरण भर सकते हैं।
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#7A1414', fontWeight: 600, marginTop: '0.6rem' }}>
            * यदि सील का पालन करने में अक्षम (असमर्थ) पाये जाने पर तथा प्रमाणित होने पर गरिमामयी पद से स्वयं निष्कासित होकर एक साधारण सदस्य के रूप में आजीवन बने रहेंगे।
          </p>
        </div>

        <div className="pledge-checkbox-container">
          <label className="form-checkbox-label">
            <input 
              type="checkbox" 
              name="pledgeAccepted"
              className="form-checkbox"
              checked={formData.pledgeAccepted}
              onChange={(e) => handleFieldChange('pledgeAccepted', e.target.checked)}
            />
            <span>
              <strong>सत्यनिष्ठा प्रतिज्ञा पत्र स्वीकृति:</strong> मैंने उपरोक्त सभी 6 प्रतिज्ञाओं को भली-भाँति पढ़ लिया है और मैं इनका मन, वचन व कर्म से पालन करने की शपथ लेता/लेती हूँ। <span className="required">*</span>
            </span>
          </label>
          {errors.pledgeAccepted && <span className="field-error-msg">{errors.pledgeAccepted}</span>}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. सहयोग दान एवं भुगतान रसीद (Donation & Payment Proof)    */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">6</span>
          <div>
            <h4 className="portal-step-title">सहयोग दान एवं भुगतान रसीद (Donation & Payment Proof)</h4>
            <span className="portal-step-sub">निर्धारित सहयोग दान राशि : ₹ 1000/- (ट्रस्ट बैंक खाता व QR कोड)</span>
          </div>
        </div>

        <div className="form-donation-grid">
          {/* Bank Details Card */}
          <div className="form-bank-card">
            <h5 style={{ fontFamily: 'var(--font-heading)', color: '#7A1414', fontSize: '1.05rem', margin: '0 0 0.8rem 0' }}>
              Trust Account Details (State Bank of India)
            </h5>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Bank Name:</span>
                <strong style={{ display: 'block', color: '#059669' }}>STATE BANK OF INDIA</strong>
              </div>

              <div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Account Holder Name:</span>
                <strong style={{ display: 'block', color: '#059669' }}>RASHTRIYA BUDDHA JAN JAGRAN TRUST</strong>
              </div>

              <div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Account Number:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: '#059669' }}>35803321944</strong>
                  <button type="button" onClick={() => copyToClipboard('35803321944', 'acc')} className="copy-pill-btn">
                    {copiedField === 'acc' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedField === 'acc' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>IFSC Code:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <strong style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#059669' }}>SBIN0004560</strong>
                  <button type="button" onClick={() => copyToClipboard('SBIN0004560', 'ifsc')} className="copy-pill-btn">
                    {copiedField === 'ifsc' ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedField === 'ifsc' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>Branch:</span>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  AGR Development Branch, Rishipattan Marg, Sarnath, Varanasi - 221007
                </p>
              </div>

              <div style={{ marginTop: '0.4rem', padding: '0.5rem 0.75rem', background: 'var(--color-gold-soft)', border: '1px solid var(--color-gold)', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-dark)', fontWeight: 700 }}>निर्धारित सहयोग दान राशि:</span>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: '#7A1414' }}>₹ 1000/-</strong>
              </div>
            </div>
          </div>

          {/* QR Code & Screenshot Upload */}
          <div className="form-qr-card">
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#7A1414', marginBottom: '0.4rem' }}>
              Scan QR Code For Donation (₹1000)
            </span>

            <div style={{ background: '#FFF', padding: '0.45rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <img src={upiQrUrl} alt="Donation UPI QR Code" style={{ width: '150px', height: '150px', display: 'block' }} />
            </div>

            <div style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}>
              <span>UPI ID: <strong>9451442126@sbi</strong></span>
              <button type="button" onClick={() => copyToClipboard('9451442126@sbi', 'upi')} className="copy-pill-btn" style={{ marginLeft: '0.4rem' }}>
                {copiedField === 'upi' ? <Check size={11} /> : <Copy size={11} />}
                <span>{copiedField === 'upi' ? 'कॉपी हुआ' : 'कॉपी'}</span>
              </button>
            </div>

            {/* Screenshot Upload with live preview */}
            <div style={{ width: '100%', marginTop: '0.85rem', textAlign: 'left' }}>
              <label className="form-label" style={{ fontSize: '0.85rem', marginBottom: '0.3rem', display: 'block' }}>
                💳 भुगतान रसीद / स्क्रीनशॉट अपलोड करें :
              </label>
              <input 
                type="file" 
                accept="image/*" 
                className="form-input" 
                style={{ padding: '0.35rem', fontSize: '0.82rem' }}
                onChange={(e) => handleFileUpload(e, 'paymentScreenshotUrl')}
              />

              {formData.paymentScreenshotUrl && (
                <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                  <img 
                    src={formData.paymentScreenshotUrl} 
                    alt="Payment Screenshot Preview" 
                    style={{ maxHeight: '90px', borderRadius: '4px', border: '1px solid var(--color-gold)', display: 'inline-block' }} 
                  />
                </div>
              )}

              <div style={{ marginTop: '0.5rem' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="यूटीआर / ट्रांजेक्शन नं. (वैकल्पिक)"
                  style={{ fontSize: '0.82rem', padding: '0.4rem 0.6rem' }}
                  value={formData.utrNumber}
                  onChange={(e) => handleFieldChange('utrNumber', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Training Note */}
        <div style={{
          background: 'var(--color-primary-subtle)',
          border: '1px solid var(--color-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '0.8rem 1rem',
          fontSize: '0.85rem',
          color: '#7A1414',
          fontWeight: 700,
          textAlign: 'center'
        }}>
          नोट :- सर्वप्रथम व्यक्ति आवेदन-पत्र भरने के बाद एक साधारण सदस्य के रूप में सम्मलित हो जाता है। पदासीन होने के लिए उस व्यक्ति का प्रशिक्षण होना आवश्यक है।
        </div>
      </div>

      {/* Submit Action Bar */}
      <div className="portal-submit-bar">
        <button 
          type="submit" 
          className="btn btn-primary btn-lg" 
          style={{ flex: 1, padding: '1.1rem', fontSize: '1.15rem', boxShadow: 'var(--shadow-lg)' }}
        >
          <UserCheck size={20} />
          <span>आवेदन पत्र जमा करें एवं अधिकृत 3-पेज PDF देखें (Submit & Generate PDF)</span>
          <ArrowRight size={20} />
        </button>

        <button 
          type="button" 
          onClick={handleReset} 
          className="btn btn-outline"
          style={{ padding: '1rem 1.5rem' }}
        >
          <RefreshCw size={16} />
          <span>रीसेट</span>
        </button>
      </div>
    </form>
  );
}

