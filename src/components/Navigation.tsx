import React, { useState } from 'react';
import { Sun, Search, Gift, Bell, BarChart3, Users, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EnhancedOnboardingTutorial from './EnhancedOnboardingTutorial';
interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}
const Navigation = ({
  activeSection,
  onSectionChange
}: NavigationProps) => {
  const [showSolarDropdown, setShowSolarDropdown] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const handleVideoComplete = () => {
    setShowVideoPopup(false);
    onSectionChange('select-plan');
  };
  const handleDropdownItemClick = (section: string) => {
    setShowSolarDropdown(false);
    onSectionChange(section);
  };
  return <div className="navigation-container">
      {showVideoPopup && <EnhancedOnboardingTutorial onComplete={handleVideoComplete} onStartPlanSelection={handleVideoComplete} />}

      <nav className="shadow-xl sticky top-0 z-50 border-b-2 border-yellow-400 bg-lime-900">
        <div className="container mx-auto px-4 bg-fuchsia-950">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onSectionChange('home')}>
              <div className="relative">
                <Sun className="h-10 w-10 text-yellow-400 group-hover:animate-spin transition-all duration-300" />
                <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
              <div>
                <span className="text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                  SuryaSpark
                </span>
                <div className="text-xs text-yellow-300 font-medium">
                  98,000+ Families Saved ₹4.5L Each!
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {/* New User CTA - Updated */}
              <Button onClick={() => setShowVideoPopup(true)} variant="outline" size="sm" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 animate-pulse shadow-lg hover:shadow-xl transition-all duration-300 font-bold">
                <Gift className="h-4 w-4 mr-2" />
                New User Free Gift Here!
              </Button>

              {/* Navigation Items - Updated Structure */}
              <button onClick={() => onSectionChange('home')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'home' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                🏠 Home
              </button>

              <button onClick={() => onSectionChange('select-plan')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'select-plan' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                📋 Select Your Plan
              </button>

              <button onClick={() => onSectionChange('about')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'about' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                👥 Why Choose Us
              </button>
              
              {/* Get Solar Now Dropdown - Updated */}
              <div className="relative" onMouseEnter={() => setShowSolarDropdown(true)} onMouseLeave={() => setShowSolarDropdown(false)}>
                <button onClick={() => onSectionChange('booking')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'booking' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                  🔥 Get Solar Now ▼
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    HOT
                  </span>
                </button>
                
                {/* Updated Dropdown */}
                {showSolarDropdown && <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-green-300 min-w-64 overflow-hidden" style={{
                zIndex: 9999
              }}>
                    <div className="py-2">
                      <div className="px-4 py-3 text-xs font-semibold text-white bg-green-600 border-b border-gray-200">
                        🏠 SOLAR SERVICES
                      </div>
                      <button onClick={() => handleDropdownItemClick('booking')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-200">
                        🏠 Residential Solar
                      </button>
                      <button onClick={() => handleDropdownItemClick('booking')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-200">
                        🏢 Commercial Solar
                      </button>
                      <button onClick={() => handleDropdownItemClick('solar-cleaning')} className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors duration-200">
                        🧽 AMC and Cleaning
                      </button>
                    </div>
                  </div>}
              </div>

              <button onClick={() => onSectionChange('contact')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'contact' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                📞 Contact Us
              </button>

              <button onClick={() => onSectionChange('audit')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'audit' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                <BarChart3 className="h-4 w-4 mr-1 inline" />
                📊 Audit Dashboard
              </button>

              <button onClick={() => onSectionChange('profile')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 nav-glow-effect ${activeSection === 'profile' ? 'text-yellow-400 bg-green-700 border-b-2 border-yellow-400 shadow-lg' : 'text-white hover:text-yellow-400 hover:bg-green-700'}`}>
                <User className="h-4 w-4 mr-1 inline text-purple-400" />
                👤 Profile
              </button>

              <button onClick={() => onSectionChange('contact')} className="text-white hover:text-yellow-400 transition-colors hover:shadow-lg hover:shadow-yellow-400/50 p-2 rounded-lg" title="Search FAQs">
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-yellow-400 focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="bg-green-700 h-1">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-1 transition-all duration-500 shadow-lg" style={{
          width: activeSection === 'home' ? '20%' : activeSection === 'select-plan' ? '40%' : activeSection === 'select-plan-category' ? '60%' : activeSection === 'booking' ? '80%' : activeSection === 'contact' ? '90%' : '100%'
        }}></div>
        </div>
      </nav>
    </div>;
};
export default Navigation;