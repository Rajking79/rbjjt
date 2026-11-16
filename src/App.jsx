import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Hero } from './components/Hero';
import { FounderSection } from './components/FounderSection';
import { AboutSection } from './components/AboutSection';
import { SarnathHeritageSection } from './components/SarnathHeritageSection';
import { DailyVandanaSection } from './components/DailyVandanaSection';
import { DhammadhikariSection } from './components/DhammadhikariSection';
import { FormsSection } from './components/FormsSection';
import { DonationSection } from './components/DonationSection';
import { EventsCalendarSection } from './components/EventsCalendarSection';
import { GallerySection } from './components/GallerySection';
import { DownloadsSection } from './components/DownloadsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { AdminRecordsModal } from './components/AdminRecordsModal';
import { AudioChantPlayer } from './components/AudioChantPlayer';
import { VideoModal } from './components/VideoModal';
import { ScrollToTop } from './components/ScrollToTop';
import { INITIAL_RECORDS } from './data/trustData';

export function App() {
  const [theme, setTheme] = useState('light');
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [recordCount, setRecordCount] = useState(INITIAL_RECORDS.length);

  // Initialize theme and records
  useEffect(() => {
    const savedTheme = localStorage.getItem('rbjjt_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const savedRecords = localStorage.getItem('rbjjt_records');
    if (savedRecords) {
      try {
        const parsed = JSON.parse(savedRecords);
        setRecordCount(parsed.length);
      } catch(e) {}
    } else {
      localStorage.setItem('rbjjt_records', JSON.stringify(INITIAL_RECORDS));
      setRecordCount(INITIAL_RECORDS.length);
    }
  }, []);

  const handleRecordAdded = (newCount) => {
    setRecordCount(newCount);
  };

  return (
    <div className="app-layout">
      {/* Navigation Header */}
      <Header 
        theme={theme}
        setTheme={setTheme}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        submittedCount={recordCount}
      />

      {/* Live Continuous Marquee Ticker */}
      <MarqueeBanner />

      <main>
        {/* 1. Hero Section */}
        <Hero 
          onOpenDonateModal={() => setIsDonateModalOpen(true)} 
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
        />

        {/* 2. Founder Section */}
        <FounderSection 
          onOpenDonateModal={() => setIsDonateModalOpen(true)} 
        />

        {/* 3. 5 Core Pillars & Legal Credentials Combined (Compact Cards) */}
        <AboutSection 
          onOpenDonateModal={() => setIsDonateModalOpen(true)} 
        />

        {/* 4. Sacred Rishipattan Sarnath Heritage & Center */}
        <SarnathHeritageSection />

        {/* 4.1 Daily Buddha Vandana & Pali Chants */}
        <DailyVandanaSection />

        {/* 5. Dhammadhikaris & Upasaks Showcase */}
        <DhammadhikariSection />

        {/* 7. Comprehensive Forms Suite */}
        <FormsSection 
          onRecordAdded={handleRecordAdded} 
        />

        {/* 8. Dedicated Donation Section */}
        <DonationSection />

        {/* 8.1 Upcoming Events & Annual Festivals */}
        <EventsCalendarSection />

        {/* 9. Activity Gallery */}
        <GallerySection />

        {/* 9.1 Official Downloads Center */}
        <DownloadsSection />

        {/* 9.2 Frequently Asked Questions (FAQs) */}
        <FAQSection />

        {/* 10. Contact & Location */}
        <ContactSection />
      </main>

      {/* Royal Footer */}
      <Footer 
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* Pop-up Modals */}
      <DonationModal 
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />

      <AdminRecordsModal 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />

      {/* Meditative Ambient Chime Player & Floating Support Dock */}
      <AudioChantPlayer />
    </div>
  );
}

export default App;
