
import React from 'react';
import { Sun } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold text-gray-800">SuryaSpark</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => onSectionChange('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onSectionChange('booking')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'booking'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Solar Installation
            </button>
            <button
              onClick={() => onSectionChange('audit')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'audit'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              🔍 Audit
            </button>
            <button
              onClick={() => onSectionChange('profile')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'profile'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => onSectionChange('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'contact'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
