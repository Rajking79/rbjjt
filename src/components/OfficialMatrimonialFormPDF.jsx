import React, { useRef } from 'react';
import { Printer, Download, Edit3, PlusCircle, CheckCircle2, Shield, Heart } from 'lucide-react';
import logoHD from '../assets/rbjjt-logo-hd.jpg';
import samratAshokImg from '../assets/samrat-ashok-portrait.png';
import './OfficialDhammadhikariFormPDF.css';

export function OfficialMatrimonialFormPDF({ data = {}, onEdit, onNew }) {
  const printRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const copyUpi = () => {
    navigator.clipboard.writeText('9451442126@sbi');
    alert('UPI ID (9451442126@sbi) क्लिपबोर्ड पर कॉपी हो गया!');
  };

  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    'upi://pay?pa=9451442126@sbi&pn=RASHTRIYA BUDDHA JAN JAGRAN TRUST&am=500&cu=INR&tn=Matrimonial Registration RBJJT'
  )}&color=000000&bgcolor=FFFFFF`;

  const siblings = data.siblingsList && data.siblingsList.length > 0 
    ? data.siblingsList 
    : [
        { id: 1, name: '', education: '', age: '', maritalStatus: '' },
        { id: 2, name: '', education: '', age: '', maritalStatus: '' },
        { id: 3, name: '', education: '', age: '', maritalStatus: '' },
        { id: 4, name: '', education: '', age: '', maritalStatus: '' }
      ];

  const hasManySiblings = siblings.length > 4;

  return (
    <div className="official-pdf-wrapper animate-fade-in" ref={printRef}>
      {/* Action Toolbar */}
      <div className="official-pdf-toolbar no-print">
        <div className="toolbar-status-badge">
          <CheckCircle2 size={18} color="#059669" />
          <span>आवाह-विवाह पंजीकरण प्रपत्र (100% आधिकारिक प्रारूप)</span>
        </div>

        <div className="toolbar-buttons-cluster">
          <button 
            type="button" 
            onClick={handlePrint}
            className="btn btn-gold btn-sm toolbar-action-btn"
            title="आधिकारिक A4 प्रपत्र प्रिंट करें"
          >
            <Printer size={16} />
            <span>प्रपत्र प्रिंट करें (Print)</span>
          </button>

          <button 
            type="button" 
            onClick={handlePrint}
            className="btn btn-outline btn-sm toolbar-action-btn"
            title="PDF के रूप में सहेजें"
          >
            <Download size={16} />
            <span>PDF डाउनलोड करें</span>
          </button>

          {onEdit && (
            <button 
              type="button" 
              onClick={onEdit}
              className="btn btn-outline btn-sm toolbar-action-btn"
              title="विवरण में सुधार करें"
            >
              <Edit3 size={16} />
              <span>फॉर्म संपादित करें</span>
            </button>
          )}

          {onNew && (
            <button 
              type="button" 
              onClick={onNew}
              className="btn btn-outline btn-sm toolbar-action-btn"
              title="नया आवेदन पत्र भरें"
            >
              <PlusCircle size={16} />
              <span>नया पंजीकरण</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Single Page Document */}
      <div className="official-document-sheet">
        <div className={`official-page page-matrimonial ${hasManySiblings ? 'has-many-children' : ''}`}>
          <div className="official-border-outer">
            <div className="official-border-inner">

              {/* Top Sacred Words */}
              <div className="official-header-triratna">
                <span className="triratna-word">शील</span>
                <span className="triratna-word">समाधि</span>
                <span className="triratna-word">प्रज्ञा</span>
              </div>

              {/* Trust Logo and Title Header */}
              <div className="official-header-main">
                <div className="official-emblem-wrap">
                  <img src={logoHD} alt="RBJJT Official Emblem" className="official-emblem-img" />
                </div>
                <h1 className="official-trust-heading">राष्ट्रीय बौद्ध जन जागरण ट्रस्ट</h1>
                <p className="official-trust-subtitle">प्रधान कार्यालय - सारनाथ, वाराणसी (उत्तर प्रदेश)</p>
                <p className="official-trust-contact">मो. : 8112630563, वेबसाइट : www.rbjjt.com</p>
              </div>

              {/* Title Bar Row */}
              <div className="official-title-bar-row">
                <div className="official-pill-title">
                  आवाह-विवाह हेतु रजिस्ट्रेशन फॉर्म
                </div>
                <div className="official-serial-no">
                  <span>क्र. : </span>
                  <strong>{data.regNo || 'RBJJT/MAT/2026/0101'}</strong>
                </div>
              </div>

              {/* Instruction Bar */}
              <div className="official-instruction-bar">
                नोट :- हिन्दी या अंग्रेजी में साफ-साफ अक्षरों में अवश्य भरा जाय।
              </div>

              {/* Top Section: Left Details + Right Photo Box */}
              <div className="matrimonial-top-grid">
                <div className="matrimonial-fields-col">
                  {/* Field 1: Name */}
                  <div className="dotted-field-row">
                    <span className="field-label">1. वर या कन्या का नाम :</span>
                    <span className="dotted-line-value candidate-name-highlight">
                      {data.candidateName || '—'} 
                      {data.candidateType && <span className="candidate-gender-pill">({data.candidateType})</span>}
                    </span>
                  </div>

                  {/* Field 2: Parents */}
                  <div className="dotted-field-row">
                    <span className="field-label">2. पिता एवं माता का नाम :</span>
                    <span className="field-prefix">{data.parentsPrefix || 'आदरणीय'}</span>
                    <span className="dotted-line-value">{data.parentsName || '—'}</span>
                  </div>

                  {/* Field 3: Address & Pincode */}
                  <div className="dotted-field-row">
                    <span className="field-label">3. मूल पता पिन कोड के साथ :</span>
                    <span className="dotted-line-value">
                      {data.address || '—'} {data.pincode ? `(पिन कोड: ${data.pincode})` : ''}
                    </span>
                  </div>

                  {/* Field 4: Parents Education */}
                  <div className="dotted-field-row">
                    <span className="field-label">4. माता एवं पिता की शिक्षा :</span>
                    <span className="dotted-line-value">{data.parentsEducation || '—'}</span>
                  </div>

                  {/* Field 5: Parents Contribution */}
                  <div className="dotted-field-row">
                    <span className="field-label">5. माता या पिता की सामाजिक योगदान :</span>
                    <span className="dotted-line-value">{data.parentsContribution || 'धम्म व सामाजिक जागृति में सक्रिय'}</span>
                  </div>

                  {/* Field 6: Candidate Education */}
                  <div className="dotted-field-row">
                    <span className="field-label">6. वर एवं कन्या की शिक्षा :</span>
                    <span className="dotted-line-value">{data.candidateEducation || '—'}</span>
                    <span className="field-sub-note">(प्रमाण-पत्र के साथ)</span>
                  </div>

                  {/* Field 7: Candidate Age & DOB */}
                  <div className="dotted-field-row">
                    <span className="field-label">7. वर एवं कन्या की उम्र :</span>
                    <span className="dotted-line-value">
                      {data.candidateAge ? `${data.candidateAge} वर्ष` : '—'} {data.dob ? `(जन्म: ${data.dob})` : ''}
                    </span>
                    <span className="field-sub-note">(आयु प्रमाण-पत्र, वोटर कार्ड या अन्य)</span>
                  </div>
                </div>

                {/* Right Photo Column */}
                <div className="matrimonial-photo-box">
                  {data.photoUrl ? (
                    <img src={data.photoUrl} alt="Candidate Portrait" className="matrimonial-photo-img" />
                  ) : (
                    <div className="matrimonial-photo-placeholder">
                      <div className="photo-placeholder-icon">☸</div>
                      <span>वर / कन्या का नवीनतम फोटो यहाँ चिपकायें</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Field 8: Sibling Table */}
              <div className="matrimonial-sibling-section">
                <div className="sibling-header-row">
                  <span className="field-label">8. घर में भाई-बहन की संख्या :</span>
                  <span className="sibling-count-text">
                    {data.siblingCount ? `${data.siblingCount}` : `${siblings.filter(s => s.name).length || '—'}`}
                  </span>
                </div>

                <table className={`official-family-table ${hasManySiblings ? 'compact-table' : ''}`}>
                  <thead>
                    <tr>
                      <th style={{ width: '8%' }}>क्र.सं.</th>
                      <th style={{ width: '38%' }}>भाई-बहन का नाम (क्रम से)</th>
                      <th style={{ width: '20%' }}>शिक्षा</th>
                      <th style={{ width: '14%' }}>उम्र</th>
                      <th style={{ width: '20%' }}>
                        वैवाहिक स्थिति <br />
                        <span style={{ fontSize: '0.68rem', fontWeight: 'normal' }}>(टिक लगायें)</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {siblings.map((sib, idx) => {
                      const num = idx + 1;
                      const name = typeof sib === 'object' ? sib.name : '';
                      const edu = typeof sib === 'object' ? sib.education : '';
                      const age = typeof sib === 'object' ? sib.age : '';
                      const status = typeof sib === 'object' ? sib.maritalStatus : '';

                      return (
                        <tr key={num}>
                          <td className="text-center">{num}.</td>
                          <td>{name || ''}</td>
                          <td>{edu || ''}</td>
                          <td className="text-center">{age || ''}</td>
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

              {/* Field 9: Complexion, Height & Weight */}
              <div className="dotted-field-row" style={{ marginTop: '0.35rem' }}>
                <span className="field-label">9. वर या कन्या का रंग :</span>
                <span className="dotted-line-value" style={{ flex: '0 0 160px' }}>{data.complexion || 'गेहुंआ'}</span>
                
                <span className="field-label" style={{ marginLeft: '1rem' }}>वजन और ऊँचाई :</span>
                <span className="field-prefix">वजन</span>
                <span className="dotted-line-value text-center" style={{ flex: '0 0 70px' }}>{data.weight || '—'}</span>
                <span className="field-prefix">किग्रा., फीट</span>
                <span className="dotted-line-value text-center" style={{ flex: '0 0 50px' }}>{data.heightFeet || '—'}</span>
                <span className="field-prefix">इंच</span>
                <span className="dotted-line-value text-center" style={{ flex: '0 0 50px' }}>{data.heightInches || '—'}</span>
              </div>

              {/* Field 10: Disability / Physical Weakness */}
              <div className="dotted-field-row">
                <span className="field-label">10. शरीर में किसी प्रकार की कमी या अपंगता हो तो उसे अवश्य दर्शायें :</span>
                <span className="dotted-line-value">{data.disability || 'कोई नहीं (पूर्णतः स्वस्थ)'}</span>
              </div>

              {/* Field 11: Body Build Radios */}
              <div className="dotted-field-row">
                <span className="field-label">11. शरीर की शारीरिक बनावट :</span>
                <div className="official-radio-options" style={{ marginLeft: '0.5rem' }}>
                  <span className="radio-opt">
                    (क) मोटा <span className={`radio-dot ${data.bodyBuild === 'मोटा' ? 'checked' : ''}`}></span>
                  </span>
                  <span className="radio-opt">
                    (ख) पतला <span className={`radio-dot ${data.bodyBuild === 'पतला' ? 'checked' : ''}`}></span>
                  </span>
                  <span className="radio-opt">
                    (ग) सामान्य <span className={`radio-dot ${data.bodyBuild === 'सामान्य' || !data.bodyBuild ? 'checked' : ''}`}></span>
                  </span>
                </div>
              </div>

              {/* Field 12: Other Talents & Attributes */}
              <div className="dotted-field-row">
                <span className="field-label">12. वर या कन्या के अन्य गुण एवं प्रतिभा :</span>
                <span className="dotted-line-value">{data.talents || 'सदाचारी, गृहकार्य व सामाजिक संस्कार में निपुण'}</span>
              </div>

              {/* Field 13: Social Work Inclination */}
              <div className="dotted-field-row">
                <span className="field-label">13. वर या कन्या का सामाजिक कार्यों में रुझान :</span>
                <div className="official-radio-options" style={{ marginLeft: '0.5rem' }}>
                  <span className="radio-opt">
                    हाँ <span className={`radio-dot ${data.socialWorkInterest !== 'नहीं' ? 'checked' : ''}`}></span>
                  </span>
                  <span className="radio-opt">
                    नहीं <span className={`radio-dot ${data.socialWorkInterest === 'नहीं' ? 'checked' : ''}`}></span>
                  </span>
                </div>
              </div>

              {/* Field 14: Partner Expectations Matrix */}
              <div className="matrimonial-partner-pref-section">
                <span className="field-label">14. शैक्षणिक विवरण (वर या कन्या कैसा चाहिए) :</span>
                
                <table className="matrimonial-pref-table">
                  <tbody>
                    <tr>
                      <td className="pref-category-td">शिक्षा</td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          हाईस्कूल / इण्टरमीडिएट <span className={`radio-dot ${data.prefEducation === 'हाईस्कूल/इण्टर' ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          ग्रेजुएट / पोस्ट ग्रेजुएट <span className={`radio-dot ${data.prefEducation === 'ग्रेजुएट/पोस्ट ग्रेजुएट' || !data.prefEducation ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          डाक्टर / इंजीनियर <span className={`radio-dot ${data.prefEducation === 'डाक्टर/इंजीनियर' ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pref-category-td">पेशा</td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          नौकरी <span className={`radio-dot ${data.prefOccupation === 'नौकरी' || !data.prefOccupation ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          व्यापार <span className={`radio-dot ${data.prefOccupation === 'व्यापार' ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          कृषि-उद्योग <span className={`radio-dot ${data.prefOccupation === 'कृषि-उद्योग' ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pref-category-td">रंग</td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          गोरा <span className={`radio-dot ${data.prefComplexion === 'गोरा' ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          गेहुंआ <span className={`radio-dot ${data.prefComplexion === 'गेहुंआ' || !data.prefComplexion ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                      <td className="pref-option-td">
                        <span className="radio-opt">
                          सांवला <span className={`radio-dot ${data.prefComplexion === 'सांवला' ? 'checked' : ''}`}></span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Field 15 & 16: Status & Caste Preference */}
              <div className="dotted-field-row" style={{ marginTop: '0.35rem' }}>
                <span className="field-label">15. हैसियत :</span>
                <div className="official-radio-options" style={{ marginLeft: '0.4rem', marginRight: '1.5rem' }}>
                  <span className="radio-opt">
                    गरीब <span className={`radio-dot ${data.financialStatus === 'गरीब' ? 'checked' : ''}`}></span>
                  </span>
                  <span className="radio-opt">
                    सामान्य <span className={`radio-dot ${data.financialStatus === 'सामान्य' || !data.financialStatus ? 'checked' : ''}`}></span>
                  </span>
                  <span className="radio-opt">
                    हाई-फाई <span className={`radio-dot ${data.financialStatus === 'हाई-फाई' ? 'checked' : ''}`}></span>
                  </span>
                </div>

                <span className="field-label">16. वर या कन्या :</span>
                <div className="official-radio-options" style={{ marginLeft: '0.4rem' }}>
                  <span className="radio-opt">
                    स्वजातीय <span className={`radio-dot ${data.marriageType === 'स्वजातीय' || !data.marriageType ? 'checked' : ''}`}></span>
                  </span>
                  <span className="radio-opt">
                    अन्तर्जातीय <span className={`radio-dot ${data.marriageType === 'अन्तर्जातीय' ? 'checked' : ''}`}></span>
                  </span>
                </div>
              </div>

              {/* Payment Section (Matching Scan Exactly) */}
              <div className="matrimonial-donation-card">
                <div className="matrimonial-donation-header">
                  सहयोग राशि जमा करने का विवरण
                </div>
                
                <div className="matrimonial-donation-grid">
                  {/* Left Bank Details */}
                  <div className="donation-bank-column">
                    <div className="bank-detail-line">
                      <strong>Bank Name:</strong>
                      <span>STATE BANK OF INDIA</span>
                    </div>
                    <div className="bank-detail-line">
                      <strong>Account Holder:</strong>
                      <span>RASHTRIYA BUDDHA JAN JAGRAN TRUST</span>
                    </div>
                    <div className="bank-detail-line">
                      <strong>Account Number:</strong>
                      <span className="highlight-account">35803321944</span>
                    </div>
                    <div className="bank-detail-line">
                      <strong>Bank IFSC Code:</strong>
                      <span>SBIN0004560</span>
                    </div>
                    <div className="bank-detail-line">
                      <strong>Bank Address:</strong>
                      <span>AGR DEVELOPMENT BRANCH, RISHIPATTAN MARG, SARNATH, VARANASI 221007</span>
                    </div>
                    <div className="bank-detail-line">
                      <strong>UPI ID:</strong>
                      <span className="highlight-upi">9451442126@sbi</span>
                    </div>
                  </div>

                  {/* Right QR Code Column */}
                  <div className="donation-qr-box">
                    <span className="qr-title-sm">UPI से भुगतान करने के लिए QR स्कैन करें</span>
                    <img src={upiQrUrl} alt="UPI QR Code" className="matrimonial-qr-img" />
                    <span className="upi-handle-sm">UPI ID: 9451442126@sbi</span>
                    
                    {data.paymentScreenshotUrl && (
                      <div className="receipt-preview-pill">
                        <img src={data.paymentScreenshotUrl} alt="Payment Receipt" className="receipt-thumb" />
                        <span>रसीद संलग्न</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 17. Note (Official Mandatory Rules) */}
              <div className="matrimonial-rules-note">
                <strong>17. नोट :-</strong>
                <p>(क) वर या कन्या हेतु रजिस्ट्रेशन करवाते समय उनका वास्तविक फोटो युक्त फाइल में देना अनिवार्य है।</p>
                <p>(ख) वर या कन्या हेतु रजिस्ट्रेशन करवाते समय शिक्षा या अन्य कोई और सर्टिफिकेट हो तो उसका फोटो कॉपी लगाना तथा संलग्न करना अनिवार्य है।</p>
                <p>(ग) किसी तथ्य को छिपाने पर सारी जिम्मेदारी आवेदक की होगी।</p>
                <p>(घ) आवेदन करते समय आवेदक को सहयोग राशि रूप की रसीद बनवा कर संलग्न करना अनिवार्य है।</p>
              </div>

              {/* Signatures & Footer */}
              <div className="matrimonial-footer-row">
                <div className="sig-column">
                  <div className="sig-dotted-line">
                    {data.officerName || '—'}
                  </div>
                  <span className="sig-caption">पदाधिकारी का नाम एवं दिनांक</span>
                </div>

                <div className="sig-column text-center">
                  <div className="sig-dotted-line">
                    <strong>{data.mobile || data.guardianMobile || '—'}</strong>
                  </div>
                  <span className="sig-caption">आवेदक का मोबाइल नं.</span>
                </div>

                <div className="sig-column text-right">
                  <div className="sig-dotted-line">
                    {data.signatureUrl ? (
                      <img src={data.signatureUrl} alt="Signature" className="sig-preview-img" />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-heading)', color: '#7A1414', fontWeight: 800 }}>
                        {data.candidateName || 'हस्ताक्षर'}
                      </span>
                    )}
                  </div>
                  <span className="sig-caption">आवेदक का हस्ताक्षर</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

