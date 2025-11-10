
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import SolarPlansPage from '@/components/SolarPlansPage';
import SelectYourPlanPage from '@/components/SelectYourPlanPage';
import SelectYourPlanCategoryPage from '@/components/SelectYourPlanCategoryPage';
import PersonalizedSolarQuotesPage from '@/components/PersonalizedSolarQuotesPage';
import PlantCategoryPage from '@/components/PlantCategoryPage';
import SolarCalculatorPage from '@/components/SolarCalculatorPage';
import EnhancedSolarBooking from '@/components/EnhancedSolarBooking';
import AboutUsSection from '@/components/AboutUsSection';
import ContactUsSection from '@/components/ContactUsSection';
import SolarGenerationPage from '@/components/SolarGenerationPage';
import AuditDashboard from '@/components/AuditDashboard';
import EnhancedProfileSection from '@/components/EnhancedProfileSection';
import BlogSection from '@/components/BlogSection';
import SolarCleaningAMCPage from '@/components/SolarCleaningAMCPage';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Scroll to top whenever section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage onNavigate={setActiveSection} />;
      case 'solar-plans':
        return <SolarPlansPage onNavigate={setActiveSection} />;
      case 'select-plan':
        return <SelectYourPlanPage onNavigate={setActiveSection} />;
      case 'select-plan-category':
        return <PlantCategoryPage onBack={() => setActiveSection('select-plan')} onNext={() => setActiveSection('personalized-quotes')} />;
      case 'personalized-quotes':
        return <PersonalizedSolarQuotesPage onNavigate={setActiveSection} />;
      case 'calculator':
        return <SolarCalculatorPage onNavigate={setActiveSection} />;
      case 'booking':
        return <EnhancedSolarBooking onBack={() => setActiveSection('home')} />;
      case 'about':
        return <AboutUsSection onNavigate={setActiveSection} />;
      case 'contact':
        return <ContactUsSection />;
      case 'generation':
        return <SolarGenerationPage />;
      case 'audit':
        return <AuditDashboard />;
      case 'profile':
        return <EnhancedProfileSection />;
      case 'blog':
        return <BlogSection />;
      case 'solar-cleaning':
        return <SolarCleaningAMCPage />;
      default:
        return <HomePage onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] flex flex-col">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      
      <main className="flex-1">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
