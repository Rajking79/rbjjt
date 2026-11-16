import React, { useState } from 'react';
import { 
  Printer, ArrowLeft, RefreshCw, CheckCircle2, Download, Copy, Check, Eye 
} from 'lucide-react';
import logoHD from '../assets/rbjjt-logo-hd.jpg';
import samratAshokImg from '../assets/samrat-ashok-portrait.png';
import sealStampImg from '../assets/rbjjt-seal-stamp.png';

export function OfficialDhammadhikariFormPDF({ data = {}, onEdit, onNew }) {
  const [activePageView, setActivePageView] = useState('all'); // 'all' | '1' | '2' | '3'
  const [copiedUpi, setCopiedUpi] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('9451442126@sbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    'upi://pay?pa=9451442126@sbi&pn=RASHTRIYA BUDDHA JAN JAGRAN TRUST&am=1000&cu=INR&tn=Dhammadhikari Sahyog Dan'
  )}&color=000000&bgcolor=FFFFFF`;

  return (
    <div className="official-pdf-wrapper">
      {/* Sticky Action Toolbar on Screen */}
      <div className="pdf-actions-bar no-print">
        <div className="pdf-actions-left">
          <button type="button" onClick={onEdit} className="btn btn-outline btn-sm">
            <ArrowLeft size={16} />
            <span>फॉर्म में सुधार करें (Edit Form)</span>
          </button>
          <button type="button" onClick={onNew} className="btn btn-outline btn-sm">
            <RefreshCw size={15} />
            <span>नया फॉर्म (New Form)</span>
          </button>
        </div>

        {/* View Tabs */}
        <div className="pdf-page-tabs">
          <button 
            type="button"
            className={`pdf-tab ${activePageView === 'all' ? 'active' : ''}`}
            onClick={() => setActivePageView('all')}
          >
            सभी 3 पेज (Full Form)
          </button>
          <button 
            type="button"
            className={`pdf-tab ${activePageView === '1' ? 'active' : ''}`}
            onClick={() => setActivePageView('1')}
          >
            1. आवेदन-पत्र
          </button>
          <button 
            type="button"
            className={`pdf-tab ${activePageView === '2' ? 'active' : ''}`}
            onClick={() => setActivePageView('2')}
          >
            2. प्रतिज्ञा-पत्र
          </button>
          <button 
            type="button"
            className={`pdf-tab ${activePageView === '3' ? 'active' : ''}`}
            onClick={() => setActivePageView('3')}
          >
            3. दान व रसीद
          </button>
        </div>

        <div className="pdf-actions-right">
          <button type="button" onClick={handlePrint} className="btn btn-primary btn-sm">
            <Printer size={16} />
            <span>PDF डाउनलोड / प्रिंट करें</span>
          </button>
        </div>
      </div>

      {/* Confirmation Banner */}
      <div className="pdf-info-alert no-print">
        <CheckCircle2 size={19} color="#059669" />
        <span>
          <strong>आवेदन सफलतापूर्वाक पंजीकृत हुआ!</strong> नीचे आपका अधिकृत 3-पेज फॉर्म तैयार है। इसे सुरक्षित रखने के लिए ऊपर <strong>"PDF डाउनलोड / प्रिंट करें"</strong> बटन दबाएँ।
        </span>
      </div>

      {/* ============================================================== */}
      {/* 3-PAGE OFFICIAL DOCUMENT CONTAINER (Prints as 3 separate pages) */}
      {/* ============================================================== */}
      <div className="official-document-sheet">

        {/* ========================================================== */}
        {/* PAGE 1: धर्माधिकारी आवेदन-पत्र (EXACT REPLICA OF IMAGE 1)  */}
        {/* ========================================================== */}
        {(activePageView === 'all' || activePageView === '1') && (
          <div className={`official-page page-1 ${data.familyDetails && data.familyDetails.length > 4 ? 'has-many-children' : ''}`}>
            <div className="official-border-outer">
              <div className="official-border-inner">

                {/* Top Sacred Words */}
                <div className="official-header-triratna">
                  <span className="triratna-word">शील</span>
                  <span className="triratna-word">समाधि</span>
                  <span className="triratna-word">प्रज्ञा</span>
                </div>

                {/* Trust Logo and Title Header */}
                <div className="official-trust-header">
                  <div className="official-logo-wrap">
                    <img src={logoHD} alt="RBJJT Official Logo" className="official-trust-logo" />
                  </div>
                  <h1 className="official-trust-title">राष्ट्रीय बौद्ध जन जागरण ट्रस्ट</h1>
                  <h2 className="official-trust-subtitle">- प्रधान धम्म केन्द्र -</h2>
                  <p className="official-trust-address">दामोदरपुर (नई बाज़ार), सारनाथ, वाराणसी</p>
                  <p className="official-trust-contact">मो. : 8112630563, वेबसाइट : www.rbjjt.com</p>

                  {/* Header Pill & Serial No Row */}
                  <div className="official-title-bar-row">
                    <div className="official-pill-title">
                      धर्माधिकारी आवेदन-पत्र
                    </div>
                    <div className="official-serial-no">
                      क्र.: <strong>{data.regNo || 'RBJJT/2026/0015'}</strong>
                    </div>
                  </div>

                  {/* Instruction Bar */}
                  <div className="official-instruction-bar">
                    कृपया आवेदन-पत्र भरते समय भारतीय भाषा में साफ-साफ अक्षरों में अवश्य लिखें।
                  </div>
                </div>

                {/* Upper Section: Details Left + Ashoka / Photo Right */}
                <div className="official-form-top-grid">
                  {/* Left Column: Details on Dotted Underlines */}
                  <div className="official-details-column">
                    <div className="dotted-field-row">
                      <span className="field-label">सदस्य का नाम :</span>
                      <span className="dotted-line-value">{data.fullName || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">पिता या पति का नाम :</span>
                      <span className="field-prefix">{data.fatherHusbandType || 'स्मृतिशेष/आदरणीय'}</span>
                      <span className="dotted-line-value">{data.fatherHusbandName || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">पत्र-व्यवहार का पता :</span>
                      <span className="dotted-line-value">{data.currentAddress || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">पिन कोड</span>
                      <span className="dotted-line-value">{data.pincode || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">मूल (स्थायी) पता :</span>
                      <span className="dotted-line-value">{data.permanentAddress || data.currentAddress || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">ब्लॉक का नाम :</span>
                      <span className="dotted-line-value">{data.block || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">फोन / मोबाइल नं. :</span>
                      <span className="dotted-line-value">{data.mobile || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">जन्मतिथि :</span>
                      <span className="dotted-line-value">{data.dob || '—'}</span>
                    </div>

                    <div className="dotted-field-row">
                      <span className="field-label">शिक्षा :</span>
                      <span className="dotted-line-value">{data.qualification || '—'}</span>
                    </div>

                    {/* Occupation Radios (Matching Screenshot 1) */}
                    <div className="dotted-field-row occupation-row">
                      <span className="field-label">व्यवसाय :</span>
                      <div className="official-radio-options">
                        <span className="radio-opt">
                          नौकरी <span className={`radio-dot ${data.occupation === 'नौकरी' ? 'checked' : ''}`}></span>
                        </span>
                        <span className="radio-opt">
                          व्यापार <span className={`radio-dot ${data.occupation === 'व्यापार' ? 'checked' : ''}`}></span>
                        </span>
                        <span className="radio-opt">
                          कृषि <span className={`radio-dot ${data.occupation === 'कृषि' ? 'checked' : ''}`}></span>
                        </span>
                        {data.occupation && !['नौकरी', 'व्यापार', 'कृषि'].includes(data.occupation) && (
                          <span className="radio-opt">
                            अन्य ({data.occupation}) <span className="radio-dot checked"></span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Emperor Ashoka Artwork Box (Image 1) */}
                  <div className="official-photo-column">
                    <div className="official-photo-card">
                      <div className="photo-card-inner">
                        {data.photoUrl ? (
                          <img src={data.photoUrl} alt="Applicant" className="applicant-photo-img" />
                        ) : (
                          <img src={samratAshokImg} alt="Samrat Ashok" className="applicant-photo-img" />
                        )}
                      </div>
                      {data.photoUrl && (
                        <div className="photo-caption-strip">
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#7A1414' }}>आवेदक फोटो</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Family Details Table (Image 1) */}
                <div className="official-family-section">
                  <h3 className="official-section-heading">पारिवारिक विवरण :</h3>

                  <table className={`official-family-table ${data.familyDetails && data.familyDetails.length > 4 ? 'compact-table' : ''}`}>
                    <thead>
                      <tr>
                        <th style={{ width: '8%' }}>क्र.</th>
                        <th style={{ width: '38%' }}>बच्चों का नाम</th>
                        <th style={{ width: '16%' }}>बच्चों का उम्र</th>
                        <th style={{ width: '18%' }}>शिक्षा</th>
                        <th style={{ width: '20%' }}>वैवाहिक स्थिति<br /><span style={{ fontSize: '0.68rem', fontWeight: 'normal' }}>(टिक लगायें)</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(data.familyDetails && data.familyDetails.length > 0 ? data.familyDetails : [1, 2, 3, 4]).map((child, idx) => {
                        const num = idx + 1;
                        const name = typeof child === 'object' ? child.name : '';
                        const age = typeof child === 'object' ? child.age : '';
                        const edu = typeof child === 'object' ? child.education : '';
                        const status = typeof child === 'object' ? child.maritalStatus : '';

                        return (
                          <tr key={num}>
                            <td className="text-center">{num}.</td>
                            <td>{name || ''}</td>
                            <td className="text-center">{age || ''}</td>
                            <td>{edu || ''}</td>
                            <td className="marital-status-cell">
                              <span className="radio-opt-sm">
                                विवाहित <span className={`radio-dot-sm ${status === 'विवाहित' ? 'checked' : ''}`}></span>
                              </span>
                              <span className="radio-opt-sm">
                                अविवाहित <span className={`radio-dot-sm ${status === 'अविवाहित' || (!status && name) ? 'checked' : ''}`}></span>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Sibling & Service Details */}
                <div className="official-service-details">
                  <div className="dotted-field-row">
                    <span className="field-label">भाई-बंधु :</span>
                    <span className="dotted-line-value">{data.siblings || '—'}</span>
                  </div>

                  <div className="dotted-field-row">
                    <span className="field-label">समाज सेवा :</span>
                    <span className="dotted-line-value">
                      {data.serviceYears ? `${data.serviceYears} वर्ष ` : ''} 
                      {data.serviceMonths ? `${data.serviceMonths} माह से ` : ''} 
                      {data.serviceField || data.serviceFrom || '—'}
                    </span>
                  </div>

                  <p className="official-role-guideline">
                    प्रत्येक धर्माधिकारी धम्म के विकास हेतु प्रदेश, मण्डल, जिला, ब्लॉक, क्षेत्रीय व ग्रामीण तथा उपयुक्त पदों को अपनी योग्यता व सामर्थ्य के अनुसार चुनाव करके ही भरें।
                  </p>

                  <div className="dotted-field-row">
                    <span className="field-label">उस पद का नाम जिसको सम्भालने की योग्यता रखते हों :</span>
                    <span className="dotted-line-value" style={{ fontWeight: 700, color: '#7A1414' }}>
                      {data.proposedRole || '—'}
                    </span>
                  </div>

                  <div className="dotted-field-row">
                    <span className="field-label">सहयोग दान राशि :</span>
                    <span className="dotted-line-value" style={{ fontWeight: 800, color: '#7A1414' }}>
                      ₹ 1000/-
                    </span>
                  </div>
                </div>

                {/* Bottom Signature & Verification Row */}
                <div className="official-footer-grid">
                  <div className="official-footer-left">
                    <div className="dotted-field-row-compact">
                      <span className="field-label">धर्माधिकारी का नाम :</span>
                      <span className="dotted-line-value">{data.dhammadhikariName || data.fullName || '—'}</span>
                    </div>

                    <div className="dotted-field-row-compact">
                      <span className="field-label">आई.डी. नं. :</span>
                      <span className="dotted-line-value">{data.idNumber || '—'}</span>
                    </div>

                    <div className="dotted-field-row-compact">
                      <span className="field-label">मोबाइल :</span>
                      <span className="dotted-line-value">{data.mobile || '—'}</span>
                    </div>

                    <div className="dotted-field-row-compact">
                      <span className="field-label">दिनांक :</span>
                      <span className="dotted-line-value">{data.formDate || new Date().toLocaleDateString('hi-IN')}</span>
                    </div>
                  </div>

                  <div className="official-footer-right">
                    <span className="field-label" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>
                      आवेदक का हस्ताक्षर :
                    </span>
                    <div className="official-signature-box">
                      {data.signatureUrl ? (
                        <img src={data.signatureUrl} alt="Signature" className="signature-img" />
                      ) : (
                        <img src={sealStampImg} alt="RBJJT Seal" className="signature-img" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Maroon Strip Note */}
                <div className="official-bottom-banner-strip">
                  नोट : ट्रस्ट के जो भी धर्म सम्बन्धित नियम होंगे उनका पालन करना होगा।
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 2: प्रतिज्ञा (शपथ) पत्र (EXACT REPLICA OF IMAGE 2)    */}
        {/* ========================================================== */}
        {(activePageView === 'all' || activePageView === '2') && (
          <div className="official-page page-2">
            <div className="official-border-outer">
              <div className="official-border-inner">

                {/* Pill Title */}
                <div className="pledge-header-wrap">
                  <div className="rule-line-flank"></div>
                  <div className="pledge-pill-title">
                    प्रतिज्ञा (शपथ) पत्र
                  </div>
                  <div className="rule-line-flank"></div>
                </div>

                <p className="pledge-sub-note">
                  नोट- किसी भी धर्माधिकारी को प्रशिक्षण लेने से पहले यह प्रतिज्ञा पत्र भरना अनिवार्य है।
                </p>

                <h3 className="pledge-heading">प्रतिज्ञा:-</h3>

                {/* 6 Sacred Pledges (Image 2) */}
                <div className="pledge-list-exact">
                  <p className="pledge-p">
                    (1) मैं शाकाहारी एवं सदाचारी जीवन व्यतीत करूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।
                  </p>
                  <p className="pledge-p">
                    (2) मैं किसी भी प्रकार की नशीली वस्तुओं एवं मादक पदार्थों का सेवन नहीं करूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।
                  </p>
                  <p className="pledge-p">
                    (3) मैं झूठ बोलना, ठगना, झगड़ा या चुगली करना, निन्दा निरर्थक बातें करना, कठोर कड़वी अपशब्द बातें करना इन सबसे विरत रहते हुए, मधुर मैत्री युक्त वाणी का प्रयोग करूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।
                  </p>
                  <p className="pledge-p">
                    (4) मैं मन वचन एवं कर्म से मिथ्याचार एवं कामाचार से विरत रहते हुए अपने मधुर व्यवहार से मानव मात्र का विश्वास पात्र बनूँगा, मैं ऐसी प्रतिज्ञा करता हूँ।
                  </p>
                  <p className="pledge-p">
                    (5) मैं किसी का सामान बिना पूछे नहीं उठाऊँगा तथा अपने सम्यक् आजीविका से परिवार का भरण-पोषण करते हुए अपने मान मर्यादा का ध्यान रखते हुए लोगों के अन्दर धर्म जागे, मंगल कामना करता रहूँगा मैं ऐसी प्रतिज्ञा करता हूँ।
                  </p>
                  <p className="pledge-p">
                    (6) मैं मिशन (ट्रस्ट) के नियमों का पालन मन, वचन एवं कर्म से करता रहूँगा मैं ऐसी प्रतिज्ञा करता हूँ।
                  </p>
                </div>

                {/* Filled Formal Declaration Paragraph (Exact Scan Replica) */}
                <div className="pledge-declaration-paragraph">
                  मैं, <span className="highlight-field">{data.fullName || '...........................................'}</span> पुत्र {data.fatherHusbandName ? (
                    <>
                      <span>{data.fatherHusbandType || 'आदरणीय'} </span>
                      <span className="highlight-field">{data.fatherHusbandName}</span>
                    </>
                  ) : (
                    <span>स्मृतिशेष/आदरणीय ...........................................</span>
                  )} ग्राम <span className="highlight-field">{data.village || data.currentAddress || '...................................'}</span> पोस्ट <span className="highlight-field">{data.post || '...................................'}</span> ब्लाक <span className="highlight-field">{data.block || '...................................'}</span> जिला <span className="highlight-field">{data.district || '...................................'}</span> का निवासी हूँ, मैं लिखित रूप से घोषणा करता हूँ कि इस प्रतिज्ञा पत्र में लिखित सभी सीलों का पालन मन, वचन एवं कर्म से भली-भाँति पालन करता रहूँगा। मैं लिखित रूप से ऐसा घोषणा करता हूँ।
                </div>

                {/* Post, Date & Mobile */}
                <div className="pledge-details-grid">
                  <div className="dotted-field-row">
                    <span className="field-label">पद का नाम :</span>
                    <span className="dotted-line-value">{data.proposedRole || '—'}</span>
                  </div>
                  <div className="dotted-field-row">
                    <span className="field-label">दिनांक :</span>
                    <span className="dotted-line-value">{data.formDate || new Date().toLocaleDateString('hi-IN')}</span>
                  </div>
                  <div className="dotted-field-row" style={{ gridColumn: '1 / -1' }}>
                    <span className="field-label">मोबाइल नं. :</span>
                    <span className="dotted-line-value">{data.mobile || '—'}</span>
                  </div>
                </div>

                {/* Disqualification Note in Red */}
                <div className="pledge-warning-card">
                  <p className="pledge-warning-text">
                    यदि सील का पालन करने में अक्षम (असमर्थ) पाये जाने पर तथा प्रमाणित होने पर गरिमामयी पद से स्वयं निष्कासित होकर एक साधारण सदस्य के रूप में आजीवन बने रहेंगे। पहचान-पत्र दिखाने पर ट्रस्ट की जो सुविधायें रहेंगी, वह सदैव मिलती रहेगी।
                  </p>
                  <p className="pledge-thanks">धन्यवाद</p>
                </div>

                {/* Bottom Signature Row */}
                <div className="pledge-footer-row">
                  <div className="pledge-date-wrap">
                    <span className="field-label">दिनांक :</span>
                    <span className="dotted-line-value" style={{ width: '180px' }}>
                      {data.formDate || new Date().toLocaleDateString('hi-IN')}
                    </span>
                  </div>

                  <div className="pledge-signature-wrap">
                    <span className="field-label" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>
                      आवेदक का हस्ताक्षर
                    </span>
                    <div className="official-signature-box">
                      {data.signatureUrl ? (
                        <img src={data.signatureUrl} alt="Signature" className="signature-img" />
                      ) : (
                        <img src={sealStampImg} alt="RBJJT Seal" className="signature-img" />
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* PAGE 3: सहयोग दान एवं भुगतान रसीद (EXACT REPLICA OF IMAGE 3) */}
        {/* ========================================================== */}
        {(activePageView === 'all' || activePageView === '3') && (
          <div className="official-page page-3">
            <div className="official-border-outer">
              <div className="official-border-inner">

                {/* Two-Column Donation Sheet */}
                <div className="donation-page-grid">

                  {/* Left Column: Bank Account Details with Green Text */}
                  <div className="donation-bank-column">
                    <h2 className="donation-head-main">Donate Now</h2>
                    <h3 className="donation-head-sub">Trust Account Details</h3>

                    <div className="bank-detail-group">
                      <span className="bank-meta-label">Bank Name:</span>
                      <strong className="bank-meta-val-green">STATE BANK OF INDIA</strong>
                    </div>

                    <div className="bank-detail-group">
                      <span className="bank-meta-label">Bank Account Holder Name:</span>
                      <strong className="bank-meta-val-green">RASHTRIYA BUDDHA JAN JAGRAN TRUST</strong>
                    </div>

                    <div className="bank-detail-group">
                      <span className="bank-meta-label">Bank Account Number:</span>
                      <strong className="bank-meta-val-green font-mono">35803321944</strong>
                    </div>

                    <div className="bank-detail-group">
                      <span className="bank-meta-label">Bank IFSC Code:</span>
                      <strong className="bank-meta-val-green font-mono">SBIN0004560</strong>
                    </div>

                    <div className="bank-detail-group">
                      <span className="bank-meta-label">Bank Address:</span>
                      <p className="bank-meta-val-green" style={{ fontSize: '0.88rem', lineHeight: '1.35' }}>
                        AGR DEVELOPMENT BRANCH, RISHIPATTAN MARG, SARNATH VARANASI, UTTAR PRADESH 221007
                      </p>
                    </div>

                    <div className="donation-amount-badge">
                      <span>सहयोग दान राशि :</span>
                      <strong style={{ fontSize: '1.25rem' }}>₹ 1000/-</strong>
                    </div>

                    {data.utrNumber && (
                      <div className="bank-detail-group" style={{ marginTop: '0.6rem', background: '#FDF2F2', padding: '0.4rem 0.6rem', borderRadius: '4px' }}>
                        <span className="bank-meta-label">यूटीआर / ट्रांजेक्शन नं.:</span>
                        <strong style={{ color: '#7A1414', fontFamily: 'monospace' }}>{data.utrNumber}</strong>
                      </div>
                    )}
                  </div>

                  {/* Right Column: QR Code & Payment Receipt Screenshot */}
                  <div className="donation-qr-column">
                    <h2 className="donation-qr-head">Scan QR Code For Donation</h2>

                    <div className="qr-image-wrapper">
                      <img src={upiQrUrl} alt="UPI QR Code" className="donation-qr-img" />
                    </div>

                    <div className="upi-id-pill">
                      <span>UPI ID: <strong>9451442126@sbi</strong></span>
                      <button type="button" onClick={copyUpi} className="no-print upi-copy-btn" title="कॉपी करें">
                        {copiedUpi ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                      </button>
                    </div>

                    {/* Payment Receipt / Screenshot Box */}
                    <div className="receipt-upload-display-box">
                      <div className="receipt-box-label">
                        💳 भुगतान रसीद / स्क्रीनशॉट :
                      </div>

                      <div className="receipt-preview-inner">
                        {data.paymentScreenshotUrl ? (
                          <img 
                            src={data.paymentScreenshotUrl} 
                            alt="Payment Receipt Screenshot" 
                            className="uploaded-receipt-img" 
                          />
                        ) : data.photoUrl ? (
                          <div className="receipt-placeholder">
                            <img src={data.photoUrl} alt="Applicant" className="uploaded-receipt-img" />
                          </div>
                        ) : (
                          <div className="receipt-placeholder">
                            <span style={{ fontSize: '0.85rem', color: '#888' }}>
                              [ भुगतान रसीद / स्क्रीनशॉट संलग्न ]
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Training Note Strip */}
                <div className="official-bottom-banner-strip training-note">
                  नोट :- सर्वप्रथम व्यक्ति आवेदन-पत्र भरने के बाद एक साधारण सदस्य के रूप में सम्मलित हो जाता है। पदासीन होने के लिए उस व्यक्ति का प्रशिक्षण होना आवश्यक है।
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
