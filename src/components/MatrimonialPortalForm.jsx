import React, { useState } from 'react';
import { 
  Heart, Camera, Upload, Check, Copy, AlertCircle, 
  CheckCircle2, RefreshCw, ArrowRight, ShieldCheck, HeartHandshake, 
  MapPin, Users, Award, CreditCard, Sparkles, Plus, Trash2, Edit3, Printer, Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OfficialMatrimonialFormPDF } from './OfficialMatrimonialFormPDF';
import './OfficialMatrimonialFormPDF.css';
import './OfficialDhammadhikariFormPDF.css';

export function MatrimonialPortalForm({ onRecordAdded }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  // Initial Form State matching Official Scan
  const [formData, setFormData] = useState({
    regNo: `RBJJT/MAT/2026/${Math.floor(1000 + Math.random() * 9000)}`,
    candidateType: 'वर (Groom)', // 'वर (Groom)' | 'कन्या (Bride)'
    candidateName: '',
    parentsPrefix: 'आदरणीय', // 'आदरणीय' | 'स्मृतिशेष'
    parentsName: '',
    address: '',
    pincode: '',
    parentsEducation: 'स्नातक / माध्यमिक',
    parentsContribution: 'बौद्ध धम्म एवं सामाजिक चेतना में समर्पित',
    candidateEducation: 'स्नातक (Graduate)',
    candidateAge: '24',
    dob: '2002-05-15',
    photoUrl: '',
    siblingsList: [
      { id: 1, name: '', education: '', age: '', maritalStatus: '' },
      { id: 2, name: '', education: '', age: '', maritalStatus: '' },
      { id: 3, name: '', education: '', age: '', maritalStatus: '' },
      { id: 4, name: '', education: '', age: '', maritalStatus: '' },
    ],
    siblingCount: '',
    complexion: 'गेहुंआ', // 'गोरा' | 'गेहुंआ' | 'सांवला'
    weight: '62',
    heightFeet: '5',
    heightInches: '7',
    disability: 'कोई नहीं (पूर्णतः स्वस्थ)',
    bodyBuild: 'सामान्य', // 'मोटा' | 'पतला' | 'सामान्य'
    talents: 'सदाचारी, संस्कारवान एवं सामाजिक कार्यों में सक्रिय',
    socialWorkInterest: 'हाँ', // 'हाँ' | 'नहीं'
    prefEducation: 'ग्रेजुएट/पोस्ट ग्रेजुएट', // 'हाईस्कूल/इण्टर' | 'ग्रेजुएट/पोस्ट ग्रेजुएट' | 'डाक्टर/इंजीनियर'
    prefOccupation: 'नौकरी', // 'नौकरी' | 'व्यापार' | 'कृषि-उद्योग'
    prefComplexion: 'गेहुंआ', // 'गोरा' | 'गेहुंआ' | 'सांवला'
    financialStatus: 'सामान्य', // 'गरीब' | 'सामान्य' | 'हाई-फाई'
    marriageType: 'स्वजातीय', // 'स्वजातीय' | 'अन्तर्जातीय'
    donationAmount: '₹ 500/-',
    paymentScreenshotUrl: '',
    utrNumber: '',
    mobile: '',
    guardianMobile: '',
    officerName: 'केंद्रीय कार्यालय सारनाथ',
    signatureUrl: '',
    termsAccepted: false
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSiblingChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.siblingsList];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, siblingsList: updated };
    });
  };

  const handleSiblingMaritalToggle = (idx, status) => {
    setFormData(prev => {
      const updated = [...prev.siblingsList];
      const current = updated[idx].maritalStatus;
      updated[idx] = { ...updated[idx], maritalStatus: current === status ? '' : status };
      return { ...prev, siblingsList: updated };
    });
  };

  const handleAddSiblingRow = () => {
    setFormData(prev => {
      const nextId = prev.siblingsList.length + 1;
      return {
        ...prev,
        siblingsList: [
          ...prev.siblingsList,
          { id: nextId, name: '', education: '', age: '', maritalStatus: '' }
        ]
      };
    });
  };

  const handleRemoveSiblingRow = (idx) => {
    setFormData(prev => {
      if (prev.siblingsList.length > 4) {
        const filtered = prev.siblingsList.filter((_, i) => i !== idx);
        const reindexed = filtered.map((c, i) => ({ ...c, id: i + 1 }));
        return { ...prev, siblingsList: reindexed };
      } else {
        const updated = [...prev.siblingsList];
        updated[idx] = { id: idx + 1, name: '', education: '', age: '', maritalStatus: '' };
        return { ...prev, siblingsList: updated };
      }
    });
  };

  const handleClearSiblingRow = (idx) => {
    setFormData(prev => {
      const updated = [...prev.siblingsList];
      updated[idx] = { id: idx + 1, name: '', education: '', age: '', maritalStatus: '' };
      return { ...prev, siblingsList: updated };
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
      regNo: `RBJJT/MAT/2026/${Math.floor(1000 + Math.random() * 9000)}`,
      candidateType: 'वर (Groom)',
      candidateName: '',
      parentsPrefix: 'आदरणीय',
      parentsName: '',
      address: '',
      pincode: '',
      parentsEducation: 'स्नातक / माध्यमिक',
      parentsContribution: 'बौद्ध धम्म एवं सामाजिक चेतना में समर्पित',
      candidateEducation: 'स्नातक (Graduate)',
      candidateAge: '24',
      dob: '2002-05-15',
      photoUrl: '',
      siblingsList: [
        { id: 1, name: '', education: '', age: '', maritalStatus: '' },
        { id: 2, name: '', education: '', age: '', maritalStatus: '' },
        { id: 3, name: '', education: '', age: '', maritalStatus: '' },
        { id: 4, name: '', education: '', age: '', maritalStatus: '' },
      ],
      siblingCount: '',
      complexion: 'गेहुंआ',
      weight: '62',
      heightFeet: '5',
      heightInches: '7',
      disability: 'कोई नहीं (पूर्णतः स्वस्थ)',
      bodyBuild: 'सामान्य',
      talents: 'सदाचारी, संस्कारवान एवं सामाजिक कार्यों में सक्रिय',
      socialWorkInterest: 'हाँ',
      prefEducation: 'ग्रेजुएट/पोस्ट ग्रेजुएट',
      prefOccupation: 'नौकरी',
      prefComplexion: 'गेहुंआ',
      financialStatus: 'सामान्य',
      marriageType: 'स्वजातीय',
      donationAmount: '₹ 500/-',
      paymentScreenshotUrl: '',
      utrNumber: '',
      mobile: '',
      guardianMobile: '',
      officerName: 'केंद्रीय कार्यालय सारनाथ',
      signatureUrl: '',
      termsAccepted: false
    });
    setIsSubmitted(false);
    setErrors({});
  };

  const validateForm = () => {
    const err = {};
    if (!formData.candidateName.trim()) err.candidateName = 'वर या कन्या का पूरा नाम भरना अनिवार्य है।';
    if (!formData.parentsName.trim()) err.parentsName = 'माता-पिता का नाम भरना अनिवार्य है।';
    if (!formData.address.trim()) err.address = 'स्थायी पता दर्ज करना अनिवार्य है।';
    if (!formData.mobile.trim() && !formData.guardianMobile.trim()) {
      err.mobile = 'आवेदक अथवा अभिभावक का मोबाइल नंबर अनिवार्य है।';
    }
    if (!formData.termsAccepted) {
      err.termsAccepted = 'कृपया आवेदन की सभी 4 शर्तों (नियमों) को स्वीकार करें।';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstError = document.querySelector('.field-error-msg');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    const newRecord = {
      id: formData.regNo,
      type: 'matrimonial',
      typeName: 'आवाह-विवाह पंजीकरण',
      name: formData.candidateName,
      phone: formData.mobile || formData.guardianMobile,
      district: formData.address,
      state: 'उत्तर प्रदेश',
      status: 'सत्यापित (Approved)',
      date: new Date().toLocaleDateString('hi-IN'),
      details: `${formData.candidateType}, शिक्षा: ${formData.candidateEducation}, उम्र: ${formData.candidateAge} वर्ष`
    };

    try {
      const existing = JSON.parse(localStorage.getItem('rbjjt_records') || '[]');
      existing.unshift(newRecord);
      localStorage.setItem('rbjjt_records', JSON.stringify(existing));
      if (onRecordAdded) onRecordAdded(existing.length);
    } catch (e) {}

    setIsSubmitted(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // If submitted, render the Official Document with print & download!
  if (isSubmitted) {
    return (
      <OfficialMatrimonialFormPDF 
        data={formData}
        onEdit={() => setIsSubmitted(false)}
        onNew={handleReset}
      />
    );
  }

  return (
    <form className="govt-portal-application-form animate-fade-in" onSubmit={handleSubmit}>
      {/* Top Application Header Ribbon (Official Govt Portal Style) */}
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
              आवाह-विवाह ऑनलाइन ई-पंजीकरण प्रपत्र (Matrimonial E-Portal)
            </h3>
            <span className="ribbon-subtitle">
              दहेज-मुक्त प्रबुद्ध बौद्ध वैवाहिक महाभियान • आधिकारिक ऑनलाइन रजिस्ट्रेशन सेवा
            </span>
          </div>
        </div>

        <div className="ribbon-reg-box">
          <span className="reg-box-lbl">आवेदन प्रपत्र संख्या (Application No.):</span>
          <strong className="reg-box-val">{formData.regNo}</strong>
          <span className="gov-status-live">🟢 सत्र 2026-27 • ऑनलाइन सक्रिय</span>
        </div>
      </div>

      {/* Official Government Portal Advisory (Clean & Prestigious) */}
      <div className="govt-portal-notice-box">
        <div className="govt-notice-header">
          <ShieldCheck size={18} color="#1E3A8A" />
          <span>आवाह-विवाह ई-पंजीकरण नागरिक दिशा-निर्देश (Official Portal Guidelines)</span>
        </div>
        <div className="govt-notice-grid">
          <div className="govt-notice-item">
            <span className="govt-notice-badge">1. दस्तावेज</span>
            <span>वर / कन्या का नाम, जन्मतिथि व विवरण आधार कार्ड या शैक्षिक प्रमाणपत्र के अनुसार ही दर्ज करें।</span>
          </div>
          <div className="govt-notice-item">
            <span className="govt-notice-badge">2. प्रविष्टियां</span>
            <span>लाल स्टार (<strong style={{ color: '#DC2626' }}>*</strong>) से चिन्हित सभी कॉलम भरना अनिवार्य (Mandatory) है।</span>
          </div>
          <div className="govt-notice-item">
            <span className="govt-notice-badge">3. ई-प्रपत्र</span>
            <span>फॉर्म सबमिट होते ही अधिकृत मुहरयुक्त 100% प्रिंट-रेडी A4 प्रपत्र स्वतः जनरेट होगा।</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. प्रत्याशी का विवरण (Candidate Personal Details)       */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">1</span>
          <div>
            <h4 className="portal-step-title">वर / कन्या का विवरण (Candidate Details)</h4>
            <span className="portal-step-sub">प्रत्याशी का नाम, माता-पिता, निवास पता व शिक्षा</span>
          </div>
        </div>

        {/* Candidate Type Toggle */}
        <div className="portal-role-selector-wrap">
          <label 
            className={`portal-role-card ${formData.candidateType.includes('वर') ? 'active' : ''}`}
            onClick={() => handleFieldChange('candidateType', 'वर (Groom)')}
          >
            <span className="role-card-radio"></span>
            <div>
              <strong>वर (Groom - दूल्हा)</strong>
              <span>पुरुष प्रत्याशी हेतु पंजीकरण</span>
            </div>
          </label>

          <label 
            className={`portal-role-card ${formData.candidateType.includes('कन्या') ? 'active' : ''}`}
            onClick={() => handleFieldChange('candidateType', 'कन्या (Bride)')}
          >
            <span className="role-card-radio"></span>
            <div>
              <strong>कन्या (Bride - दुल्हन)</strong>
              <span>महिला प्रत्याशी हेतु पंजीकरण</span>
            </div>
          </label>
        </div>

        {/* Top Layout: Fields on Left (1-7), Passport Photo on Right */}
        <div className="matrimonial-portal-top-layout">
          <div className="form-grid-2" style={{ marginBottom: 0 }}>
            {/* Candidate Name */}
            <div className="form-group">
              <label className="form-label">
                1. वर या कन्या का नाम <span className="field-required">*</span>
              </label>
              <input 
                type="text" 
                className={`form-input ${errors.candidateName ? 'input-error' : ''}`}
                placeholder="प्रत्याशी का पूरा नाम दर्ज करें..."
                value={formData.candidateName}
                onChange={(e) => handleFieldChange('candidateName', e.target.value)}
              />
              {errors.candidateName && <span className="field-error-msg">{errors.candidateName}</span>}
            </div>

            {/* Parents Name with Prefix */}
            <div className="form-group">
              <label className="form-label">
                2. पिता एवं माता का नाम <span className="field-required">*</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select 
                  className="form-select" 
                  style={{ width: '130px', flexShrink: 0 }}
                  value={formData.parentsPrefix}
                  onChange={(e) => handleFieldChange('parentsPrefix', e.target.value)}
                >
                  <option value="आदरणीय">आदरणीय</option>
                  <option value="स्मृतिशेष">स्मृतिशेष</option>
                </select>
                <input 
                  type="text" 
                  className={`form-input ${errors.parentsName ? 'input-error' : ''}`}
                  placeholder="माता एवं पिता का नाम..."
                  value={formData.parentsName}
                  onChange={(e) => handleFieldChange('parentsName', e.target.value)}
                />
              </div>
              {errors.parentsName && <span className="field-error-msg">{errors.parentsName}</span>}
            </div>

            {/* Address */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                3. मूल पता पिन कोड के साथ <span className="field-required">*</span>
              </label>
              <div className="address-pincode-grid">
                <input 
                  type="text" 
                  className={`form-input ${errors.address ? 'input-error' : ''}`}
                  placeholder="ग्राम/मोहल्ला, पोस्ट, ब्लॉक, तहसील, जिला, राज्य..."
                  value={formData.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                />
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="पिन कोड (उदा. 221007)"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => handleFieldChange('pincode', e.target.value)}
                />
              </div>
              {errors.address && <span className="field-error-msg">{errors.address}</span>}
            </div>

            {/* Parents Education */}
            <div className="form-group">
              <label className="form-label">4. माता एवं पिता की शिक्षा</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="उदा. पिता-स्नातक, माता-इंटरमीडिएट"
                value={formData.parentsEducation}
                onChange={(e) => handleFieldChange('parentsEducation', e.target.value)}
              />
            </div>

            {/* Parents Contribution */}
            <div className="form-group">
              <label className="form-label">5. माता या पिता की सामाजिक योगदान</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="उदा. सामाजिक समरसता व धम्म प्रचार में योगदान"
                value={formData.parentsContribution}
                onChange={(e) => handleFieldChange('parentsContribution', e.target.value)}
              />
            </div>

            {/* Candidate Education */}
            <div className="form-group">
              <label className="form-label">6. वर एवं कन्या की शिक्षा (प्रमाण-पत्र के साथ)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="उदा. B.Tech / M.A. / B.Sc. / B.Ed."
                value={formData.candidateEducation}
                onChange={(e) => handleFieldChange('candidateEducation', e.target.value)}
              />
            </div>

            {/* Age & DOB */}
            <div className="form-group">
              <label className="form-label">7. वर एवं कन्या की उम्र (वर्ष) व जन्मतिथि</label>
              <div className="age-dob-grid">
                <input 
                  type="number" 
                  className="form-input" 
                  placeholder="उम्र (वर्ष)"
                  value={formData.candidateAge}
                  onChange={(e) => handleFieldChange('candidateAge', e.target.value)}
                />
                <input 
                  type="date" 
                  className="form-input" 
                  value={formData.dob}
                  onChange={(e) => handleFieldChange('dob', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Passport Photo Slot matching Official Paper Scan */}
          <div className="candidate-portal-photo-box">
            {formData.photoUrl ? (
              <div className="photo-preview-wrap">
                <img 
                  src={formData.photoUrl} 
                  alt="Candidate" 
                  className="candidate-preview-img" 
                />
                <button 
                  type="button" 
                  onClick={() => handleFieldChange('photoUrl', '')} 
                  className="photo-remove-btn"
                  title="फोटो हटाएं"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="photo-placeholder-slot">
                <Camera size={34} color="#7A1414" />
                <span>वर / कन्या का फोटो</span>
                <small>नवीनतम पासपोर्ट साइज फोटो यहाँ जोड़ें</small>
              </div>
            )}

            <input 
              type="file" 
              accept="image/*"
              id="matri-photo-upload"
              onChange={(e) => handleFileUpload(e, 'photoUrl')}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="matri-photo-upload" 
              className="btn btn-outline btn-sm photo-upload-btn"
            >
              <Upload size={14} />
              <span>{formData.photoUrl ? 'फोटो बदलें' : 'फोटो अपलोड करें'}</span>
            </label>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. पारिवारिक विवरण - भाई-बहन (Sibling Details Table)       */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="portal-step-num">2</span>
            <div>
              <h4 className="portal-step-title">पारिवारिक विवरण - भाई-बहन (Sibling Details)</h4>
              <span className="portal-step-sub">प्रपत्र धारा 8: भाई-बहन का नाम, शिक्षा, उम्र एवं वैवाहिक स्थिति</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              color: 'var(--color-primary)', 
              background: 'var(--color-primary-subtle)', 
              padding: '4px 10px', 
              borderRadius: '20px'
            }}>
              कुल पंक्तियां: {formData.siblingsList.length}
            </span>

            <button
              type="button"
              onClick={handleAddSiblingRow}
              className="btn btn-gold btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.84rem',
                fontWeight: 700,
                padding: '0.4rem 0.85rem'
              }}
              title="यदि 4 से अधिक भाई-बहन हैं तो नई पंक्ति जोड़ें"
            >
              <Plus size={16} />
              <span>+ और भाई-बहन जोड़ें</span>
            </button>
          </div>
        </div>

        <div className="official-table-wrapper">
          <table className="portal-official-family-table">
            <thead>
              <tr>
                <th style={{ width: '6%', textAlign: 'center' }}>क्र.सं.</th>
                <th style={{ width: '36%' }}>भाई-बहन का नाम (क्रम से)</th>
                <th style={{ width: '20%' }}>शिक्षा</th>
                <th style={{ width: '14%', textAlign: 'center' }}>उम्र</th>
                <th style={{ width: '24%', textAlign: 'center' }}>
                  वैवाहिक स्थिति <span className="th-sub">(टिक लगायें)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {formData.siblingsList.map((sib, idx) => (
                <tr key={sib.id} className={sib.name ? 'row-active' : ''}>
                  <td className="row-num-cell">{sib.id}.</td>
                  <td>
                    <input 
                      type="text" 
                      className="portal-cell-input" 
                      placeholder={`भाई/बहन #${sib.id} का नाम...`}
                      value={sib.name}
                      onChange={(e) => handleSiblingChange(idx, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="portal-cell-input" 
                      placeholder="शिक्षा (उदा. स्नातक)"
                      value={sib.education}
                      onChange={(e) => handleSiblingChange(idx, 'education', e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="portal-cell-input text-center" 
                      placeholder="उम्र"
                      value={sib.age}
                      onChange={(e) => handleSiblingChange(idx, 'age', e.target.value)}
                    />
                  </td>
                  <td>
                    <div className="portal-marital-radio-wrap">
                      <label 
                        className={`portal-radio-lbl ${sib.maritalStatus === 'विवाहित' ? 'selected' : ''}`}
                        onClick={() => handleSiblingMaritalToggle(idx, 'विवाहित')}
                      >
                        <span className={`portal-radio-circle ${sib.maritalStatus === 'विवाहित' ? 'checked' : ''}`}></span>
                        <span>विवाहित</span>
                      </label>

                      <label 
                        className={`portal-radio-lbl ${sib.maritalStatus === 'अविवाहित' ? 'selected' : ''}`}
                        onClick={() => handleSiblingMaritalToggle(idx, 'अविवाहित')}
                      >
                        <span className={`portal-radio-circle ${sib.maritalStatus === 'अविवाहित' ? 'checked' : ''}`}></span>
                        <span>अविवाहित</span>
                      </label>

                      {formData.siblingsList.length > 4 ? (
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSiblingRow(idx)}
                          className="btn-clear-row"
                          style={{ color: '#DC2626' }}
                          title={`पंक्ति #${sib.id} हटाएं`}
                        >
                          <Trash2 size={13} />
                        </button>
                      ) : (sib.name || sib.education || sib.age || sib.maritalStatus) ? (
                        <button 
                          type="button" 
                          onClick={() => handleClearSiblingRow(idx)}
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
      </div>

      {/* ========================================================= */}
      {/* 3. शारीरिक विवरण व लक्षण (Physical Attributes)             */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">3</span>
          <div>
            <h4 className="portal-step-title">शारीरिक लक्षण एवं बनावट (Physical Details)</h4>
            <span className="portal-step-sub">प्रपत्र धारा 9-13: रंग, वजन, ऊंचाई, शारीरिक बनावट एवं सामाजिक रुझान</span>
          </div>
        </div>

        <div className="form-grid-2">
          {/* Complexion */}
          <div className="form-group">
            <label className="form-label">9. वर या कन्या का रंग</label>
            <select 
              className="form-select"
              value={formData.complexion}
              onChange={(e) => handleFieldChange('complexion', e.target.value)}
            >
              <option value="गेहुंआ">गेहुंआ (Wheatish)</option>
              <option value="गोरा">गोरा (Fair)</option>
              <option value="सांवला">सांवला (Dusky)</option>
            </select>
          </div>

          {/* Weight & Height */}
          <div className="form-group">
            <label className="form-label">वजन और ऊँचाई (किग्रा., फीट व इंच)</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
              <input 
                type="number" 
                className="form-input" 
                placeholder="वजन (kg)"
                value={formData.weight}
                onChange={(e) => handleFieldChange('weight', e.target.value)}
              />
              <input 
                type="number" 
                className="form-input" 
                placeholder="फीट (ft)"
                value={formData.heightFeet}
                onChange={(e) => handleFieldChange('heightFeet', e.target.value)}
              />
              <input 
                type="number" 
                className="form-input" 
                placeholder="इंच (in)"
                value={formData.heightInches}
                onChange={(e) => handleFieldChange('heightInches', e.target.value)}
              />
            </div>
          </div>

          {/* Disability / Weakness */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">10. शरीर में किसी प्रकार की कमी या अपंगता हो तो उसे अवश्य दर्शायें</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="यदि कोई शारीरिक समस्या या दृष्टि दोष हो तो लिखें, अन्यथा 'कोई नहीं' लिखें..."
              value={formData.disability}
              onChange={(e) => handleFieldChange('disability', e.target.value)}
            />
          </div>

          {/* Body Build Radios */}
          <div className="form-group">
            <label className="form-label">11. शरीर की शारीरिक बनावट</label>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.4rem' }}>
              {['मोटा', 'पतला', 'सामान्य'].map(b => (
                <label key={b} className="portal-radio-lbl" onClick={() => handleFieldChange('bodyBuild', b)}>
                  <span className={`portal-radio-circle ${formData.bodyBuild === b ? 'checked' : ''}`}></span>
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Social Work Interest */}
          <div className="form-group">
            <label className="form-label">13. वर या कन्या का सामाजिक कार्यों में रुझान</label>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem' }}>
              {['हाँ', 'नहीं'].map(ans => (
                <label key={ans} className="portal-radio-lbl" onClick={() => handleFieldChange('socialWorkInterest', ans)}>
                  <span className={`portal-radio-circle ${formData.socialWorkInterest === ans ? 'checked' : ''}`}></span>
                  <span>{ans}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Talents */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">12. वर या कन्या के अन्य गुण एवं प्रतिभा</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="उदा. संगीत, पाककला, कंप्यूटर, समाज सेवा, खेलकूद आदि..."
              value={formData.talents}
              onChange={(e) => handleFieldChange('talents', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. जीवनसाथी की अपेक्षाएं (Partner Preferences Matrix)      */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">4</span>
          <div>
            <h4 className="portal-step-title">जीवनसाथी की अपेक्षाएं (Partner Expectations)</h4>
            <span className="portal-step-sub">प्रपत्र धारा 14-16: वर या कन्या कैसा चाहिए (शिक्षा, पेशा, रंग, हैसियत व विवाह प्राथमिकता)</span>
          </div>
        </div>

        {/* 3-Row Expectation Matrix */}
        <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
          <table className="matrimonial-pref-table" style={{ fontSize: '0.9rem' }}>
            <tbody>
              <tr>
                <td className="pref-category-td" style={{ padding: '0.65rem', fontWeight: 800 }}>अपेक्षित शिक्षा</td>
                {[
                  { key: 'हाईस्कूल/इण्टर', label: 'हाईस्कूल / इण्टरमीडिएट' },
                  { key: 'ग्रेजुएट/पोस्ट ग्रेजुएट', label: 'ग्रेजुएट / पोस्ट ग्रेजुएट' },
                  { key: 'डाक्टर/इंजीनियर', label: 'डाक्टर / इंजीनियर' }
                ].map(opt => (
                  <td key={opt.key} style={{ padding: '0.65rem' }}>
                    <label className="portal-radio-lbl" onClick={() => handleFieldChange('prefEducation', opt.key)}>
                      <span className={`portal-radio-circle ${formData.prefEducation === opt.key ? 'checked' : ''}`}></span>
                      <span>{opt.label}</span>
                    </label>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="pref-category-td" style={{ padding: '0.65rem', fontWeight: 800 }}>अपेक्षित पेशा</td>
                {[
                  { key: 'नौकरी', label: 'नौकरी (शासकीय/निजी)' },
                  { key: 'व्यापार', label: 'व्यापार / व्यवसाय' },
                  { key: 'कृषि-उद्योग', label: 'कृषि-उद्योग' }
                ].map(opt => (
                  <td key={opt.key} style={{ padding: '0.65rem' }}>
                    <label className="portal-radio-lbl" onClick={() => handleFieldChange('prefOccupation', opt.key)}>
                      <span className={`portal-radio-circle ${formData.prefOccupation === opt.key ? 'checked' : ''}`}></span>
                      <span>{opt.label}</span>
                    </label>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="pref-category-td" style={{ padding: '0.65rem', fontWeight: 800 }}>अपेक्षित रंग</td>
                {[
                  { key: 'गोरा', label: 'गोरा (Fair)' },
                  { key: 'गेहुंआ', label: 'गेहुंआ (Wheatish)' },
                  { key: 'सांवला', label: 'सांवला (Dusky)' }
                ].map(opt => (
                  <td key={opt.key} style={{ padding: '0.65rem' }}>
                    <label className="portal-radio-lbl" onClick={() => handleFieldChange('prefComplexion', opt.key)}>
                      <span className={`portal-radio-circle ${formData.prefComplexion === opt.key ? 'checked' : ''}`}></span>
                      <span>{opt.label}</span>
                    </label>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* 15 & 16: Status & Caste Preference */}
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">15. हैसियत (Financial Status)</label>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.4rem' }}>
              {['गरीब', 'सामान्य', 'हाई-फाई'].map(st => (
                <label key={st} className="portal-radio-lbl" onClick={() => handleFieldChange('financialStatus', st)}>
                  <span className={`portal-radio-circle ${formData.financialStatus === st ? 'checked' : ''}`}></span>
                  <span>{st}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">16. विवाह प्राथमिकता (Marriage Type)</label>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem' }}>
              {['स्वजातीय', 'अन्तर्जातीय'].map(mt => (
                <label key={mt} className="portal-radio-lbl" onClick={() => handleFieldChange('marriageType', mt)}>
                  <span className={`portal-radio-circle ${formData.marriageType === mt ? 'checked' : ''}`}></span>
                  <span>{mt} (दहेज-मुक्त)</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. सहयोग राशि, सत्यापन एवं हस्ताक्षर (Donation & Rules)    */}
      {/* ========================================================= */}
      <div className="portal-card-section">
        <div className="portal-card-header">
          <span className="portal-step-num">5</span>
          <div>
            <h4 className="portal-step-title">सहयोग राशि एवं नियम सत्यापन (Payment & Terms)</h4>
            <span className="portal-step-sub">धारा 17: ट्रस्ट बैंक खाता, QR कोड, मोबाइल नंबर एवं अनिवार्य शर्तें</span>
          </div>
        </div>

        {/* Bank & Payment Card using standard form-donation-grid */}
        <div className="form-donation-grid">
          {/* Left Bank Card */}
          <div className="form-bank-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', paddingBottom: '0.6rem', borderBottom: '1.5px solid var(--color-border)' }}>
              <CreditCard size={18} color="var(--color-primary)" />
              <strong style={{ fontSize: '0.92rem', color: 'var(--color-primary)' }}>
                सहयोग राशि बैंक खाता (State Bank of India)
              </strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)', minWidth: '100px' }}>Bank Name:</span>
                <strong style={{ color: 'var(--color-text-main)' }}>STATE BANK OF INDIA</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)', minWidth: '100px' }}>Account Name:</span>
                <strong style={{ color: 'var(--color-primary)' }}>RASHTRIYA BUDDHA JAN JAGRAN TRUST</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)', minWidth: '100px' }}>Account No:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <code style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-primary)' }}>35803321944</code>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard('35803321944', 'ac')}
                    className="copy-pill-btn"
                  >
                    {copiedField === 'ac' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                    <span>{copiedField === 'ac' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)', minWidth: '100px' }}>IFSC Code:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <code style={{ fontSize: '0.92rem', fontWeight: 800 }}>SBIN0004560</code>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard('SBIN0004560', 'ifsc')}
                    className="copy-pill-btn"
                  >
                    {copiedField === 'ifsc' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                    <span>{copiedField === 'ifsc' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)', minWidth: '100px' }}>UPI ID:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <strong style={{ color: 'var(--color-gold-dark)' }}>9451442126@sbi</strong>
                  <button 
                    type="button" 
                    onClick={() => copyToClipboard('9451442126@sbi', 'upi')}
                    className="copy-pill-btn"
                  >
                    {copiedField === 'upi' ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                    <span>{copiedField === 'upi' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '0.4rem', paddingTop: '0.4rem', borderTop: '1px dashed var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>सहयोग पंजीकरण शुल्क:</span>
                <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>₹ 500/-</span>
              </div>
            </div>
          </div>

          {/* Right QR Card */}
          <div className="form-qr-card">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.35rem' }}>
              UPI से भुगतान हेतु QR कोड
            </span>

            <div style={{ background: '#FFFFFF', padding: '6px', borderRadius: '6px', border: '1.5px solid var(--color-gold)' }}>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                  'upi://pay?pa=9451442126@sbi&pn=RASHTRIYA BUDDHA JAN JAGRAN TRUST&am=500&cu=INR&tn=Matrimonial Registration'
                )}&color=000000&bgcolor=FFFFFF`}
                alt="SBI UPI QR Code" 
                style={{ width: '130px', height: '130px', display: 'block' }}
              />
            </div>

            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
              UPI: 9451442126@sbi
            </span>

            <div style={{ width: '100%', marginTop: '0.65rem' }}>
              <input 
                type="file" 
                accept="image/*"
                id="matri-payment-upload"
                onChange={(e) => handleFileUpload(e, 'paymentScreenshotUrl')}
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="matri-payment-upload" 
                className="btn btn-outline btn-sm" 
                style={{ width: '100%', fontSize: '0.78rem', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Upload size={13} />
                <span>{formData.paymentScreenshotUrl ? '✓ रसीद बदली गई' : 'भुगतान स्क्रीनशॉट जोड़ें'}</span>
              </label>

              {formData.paymentScreenshotUrl && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
                  <img 
                    src={formData.paymentScreenshotUrl} 
                    alt="Receipt" 
                    style={{ width: '22px', height: '22px', objectFit: 'cover', borderRadius: '3px', border: '1px solid #059669' }} 
                  />
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>✓ रसीद संलग्न</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Numbers & Signature */}
        <div className="form-grid-2" style={{ marginTop: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">आवेदक का फोन / मोबाइल नंबर <span className="field-required">*</span></label>
            <input 
              type="tel" 
              className={`form-input ${errors.mobile ? 'input-error' : ''}`}
              placeholder="10 अंकों का सक्रिय मोबाइल नंबर दर्ज करें..."
              value={formData.mobile}
              onChange={(e) => handleFieldChange('mobile', e.target.value)}
            />
            {errors.mobile && <span className="field-error-msg">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">अभिभावक का मोबाइल / व्हाट्सएप नंबर</label>
            <input 
              type="tel" 
              className="form-input" 
              placeholder="अभिभावक का फोन या व्हाट्सएप नंबर..."
              value={formData.guardianMobile}
              onChange={(e) => handleFieldChange('guardianMobile', e.target.value)}
            />
          </div>

          {/* Signature Upload */}
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label className="form-label">आवेदक का हस्ताक्षर (Signature)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <input 
                type="file" 
                accept="image/*"
                id="matri-sig-upload"
                onChange={(e) => handleFileUpload(e, 'signatureUrl')}
                style={{ display: 'none' }}
              />
              <label htmlFor="matri-sig-upload" className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={15} />
                <span>हस्ताक्षर की फोटो अपलोड करें</span>
              </label>

              {formData.signatureUrl ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img 
                    src={formData.signatureUrl} 
                    alt="Signature Preview" 
                    style={{ height: '36px', maxWidth: '140px', objectFit: 'contain', border: '1px solid #D1D5DB', padding: '2px', background: '#FFF' }} 
                  />
                  <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>✓ हस्ताक्षर संलग्न</span>
                </div>
              ) : (
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  (हस्ताक्षर अपलोड न होने पर प्रपत्र में नाम का डिजिटल हस्ताक्षर स्वतः अंकित हो जाएगा)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 17. Note - 4 Mandatory Rules */}
        <div style={{ 
          marginTop: '1.25rem', 
          padding: '1.15rem', 
          background: 'rgba(122, 20, 20, 0.04)', 
          border: '1.5px solid rgba(122, 20, 20, 0.25)', 
          borderRadius: 'var(--radius-md)' 
        }}>
          <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', fontSize: '0.96rem', marginBottom: '0.45rem' }}>
            17. आधिकारिक घोषणा एवं नियम (Mandatory Trust Conditions) :
          </h5>
          <ol style={{ fontSize: '0.84rem', color: 'var(--color-text-main)', paddingLeft: '1.2rem', lineHeight: 1.6, margin: 0 }}>
            <li><strong>(क)</strong> वर या कन्या हेतु रजिस्ट्रेशन करवाते समय उनका वास्तविक फोटो युक्त फाइल में देना अनिवार्य है।</li>
            <li><strong>(ख)</strong> वर या कन्या हेतु रजिस्ट्रेशन करवाते समय शिक्षा या अन्य कोई और सर्टिफिकेट हो तो उसका फोटो कॉपी लगाना तथा संलग्न करना अनिवार्य है।</li>
            <li><strong>(ग)</strong> किसी तथ्य को छिपाने पर सारी जिम्मेदारी आवेदक की होगी।</li>
            <li><strong>(घ)</strong> आवेदन करते समय आवेदक को सहयोग राशि रूप की रसीद बनवा कर संलग्न करना अनिवार्य है।</li>
          </ol>

          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.65rem', 
            marginTop: '0.85rem', 
            cursor: 'pointer',
            padding: '0.5rem',
            background: '#FFFFFF',
            borderRadius: '6px',
            border: errors.termsAccepted ? '1.5px solid #DC2626' : '1px solid #E5E7EB'
          }}>
            <input 
              type="checkbox" 
              checked={formData.termsAccepted}
              onChange={(e) => handleFieldChange('termsAccepted', e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
            />
            <span style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              मैं प्रमाणित करता/करती हूँ कि ऊपर दी गई सभी जानकारियां सत्य हैं एवं मैं ट्रस्ट के सभी नियमों का पूर्ण पालन करूंगा/करूंगी।
            </span>
          </label>
          {errors.termsAccepted && <span className="field-error-msg">{errors.termsAccepted}</span>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="portal-action-cluster">
        <button 
          type="button" 
          onClick={handleReset}
          className="btn btn-outline btn-lg"
        >
          <RefreshCw size={17} />
          <span>फॉर्म रीसेट करें</span>
        </button>

        <button 
          type="submit" 
          className="btn btn-gold btn-lg pulse-animation"
        >
          <CheckCircle2 size={19} fill="#FFF" />
          <span>आवाह-विवाह फॉर्म सबमिट करें व A4 प्रपत्र प्राप्त करें</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}

