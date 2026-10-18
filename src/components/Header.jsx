import React, { useState } from 'react';
import { 
  Sun, Moon, Menu, X, Heart, Shield, Phone, Mail, 
  MapPin, FileText, Database, Compass
} from 'lucide-react';
import { TRUST_INFO } from '../data/trustData';

export function Header({ 
  theme, 
  setTheme, 
  onOpenDonateModal, 
  onOpenAdminModal,
  submittedCount = 0 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('rbjjt_theme', newTheme);
  };

  const navLinks = [
    { name: "मुख्य पृष्ठ", href: "#home" },
    { name: "हमारे बारे में", href: "#about" },
    { name: "5 मुख्य स्तंभ", href: "#pillars" },
    { name: "कार्य योजना", href: "#roadmap" },
    { name: "धर्माधिकारी", href: "#dhammadhikari" },
    { name: "ऑनलाइन फॉर्म्स", href: "#forms" },
    { name: "गैलरी", href: "#gallery" },
    { name: "संपर्क", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-item">
              <Shield size={14} color="#FBBF24" />
              <strong>{TRUST_INFO.regNo}</strong>
            </span>
            <span className="top-bar-item">
              <MapPin size={14} color="#FBBF24" />
              <span>सारनाथ, वाराणसी (उ.प्र.)</span>
            </span>
          </div>

          <div className="top-bar-right">
            <a href={`tel:${TRUST_INFO.phone}`} className="top-bar-item">
              <Phone size={14} color="#FBBF24" />
              <span>{TRUST_INFO.phone}</span>
            </a>
            <a href={`mailto:${TRUST_INFO.email}`} className="top-bar-item">
              <Mail size={14} color="#FBBF24" />
              <span>{TRUST_INFO.email}</span>
            </a>
            <button 
              onClick={onOpenAdminModal}
              className="top-bar-item" 
              style={{ color: '#FDE68A', cursor: 'pointer', background: 'rgba(255,255,255,0.12)', padding: '2px 8px', borderRadius: '4px' }}
              title="पोर्टल रिकॉर्ड्स व CRM"
            >
              <Database size={13} />
              <span>पोर्टल रिकॉर्ड्स {submittedCount > 0 && `(${submittedCount})`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="navbar-sticky">
        <div className="container nav-container">
          {/* Brand Logo & Name */}
          <a href="#home" className="nav-brand">
            <div className="brand-logo-wrap">
              <img 
                src="https://rbjjt.com/wp-content/uploads/2025/12/RBJJT-Official-Logo-70x62.png" 
                alt="RBJJT Logo" 
                className="brand-logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://rbjjt.com/wp-content/uploads/2025/12/RBJJT-Official-Logo.png";
                }}
              />
            </div>
            <div className="brand-text">
              <h1>राष्ट्रीय बौद्ध जन जागरण ट्रस्ट</h1>
              <span>{TRUST_INFO.shortName} • {TRUST_INFO.regNo}</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav>
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="nav-actions">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? "लाइट मोड चालू करें" : "डार्क मोड चालू करें"}
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Donate CTA button */}
            <button 
              onClick={onOpenDonateModal} 
              className="btn btn-gold btn-sm pulse-animation btn-donate-desktop"
            >
              <Heart size={16} fill="#FFF" />
              <span>सहयोग / दान करें</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="hamburger-btn"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Menu */}
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="brand-logo-wrap" style={{ width: '42px', height: '42px' }}>
              <img src="https://rbjjt.com/wp-content/uploads/2025/12/RBJJT-Official-Logo-70x62.png" alt="RBJJT Logo" className="brand-logo-img" />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-primary)' }}>RBJJT</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)' }}>सारनाथ, वाराणसी</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="theme-toggle-btn"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav style={{ flexGrow: 1 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  onClick={handleLinkClick}
                  style={{ 
                    display: 'block', 
                    padding: '0.75rem 0.5rem', 
                    fontSize: '1.05rem', 
                    fontWeight: 600, 
                    borderBottom: '1px dashed var(--color-border-light)' 
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenDonateModal(); }} 
            className="btn btn-gold" 
            style={{ width: '100%' }}
          >
            <Heart size={18} fill="#FFF" />
            <span>सहयोग / दान करें</span>
          </button>

          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenAdminModal(); }} 
            className="btn btn-outline" 
            style={{ width: '100%' }}
          >
            <Database size={17} />
            <span>रिकॉर्ड्स व CRM Hub</span>
          </button>
        </div>
      </aside>
    </>
  );
}
