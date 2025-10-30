
import React from 'react';
import { Sun, Phone, Mail, MapPin, ArrowUp, Share2, Award, Users, Leaf, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavigation = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    }
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Transform your home with solar energy in Nagpur! Join 500+ happy customers saving 80% on electricity bills.";
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter signup logic
    alert('Thank you for subscribing! You\'ll receive solar tips and exclusive offers.');
  };

  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white py-16 mt-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-yellow-500 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Trust Indicators Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 py-4 px-6 rounded-xl mb-12 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>MNRE Certified Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>500+ Happy Families</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              <span>420+ Tons CO2 Saved</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              <span>5 Year Complete Warranty</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info with Psychological Messaging */}
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Sun className="h-10 w-10 text-yellow-400 animate-pulse" />
              <span className="text-3xl font-bold text-white">Solar Panda</span>
            </div>
            
            {/* Psychological Trust Building */}
            <div className="space-y-4">
              <p className="text-sm text-gray-200 leading-relaxed">
                <strong className="text-yellow-400">Your Solar Journey Starts Here!</strong><br/>
                Join 500+ Nagpur families who chose us and now save ₹3,000+ monthly on electricity bills. 
                <span className="text-yellow-300 font-semibold"> Zero regrets, lifetime satisfaction guaranteed!</span>
              </p>
              
              <div className="bg-green-700 p-4 rounded-lg border-l-4 border-yellow-400">
                <p className="text-xs text-yellow-200 font-medium">
                  "Finally found exactly what I needed! No hidden costs, complete transparency, 
                  and the best solar guidance in Maharashtra." - Satisfied Customer
                </p>
              </div>
            </div>
            
            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Trusted Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'MNRE Verified Partner',
                  'MSEDCL Empanelled',
                  'ISO 9001:2015 Certified',
                  'Make in India Approved'
                ].map((cert, index) => (
                  <span key={index} className="px-3 py-1 bg-green-600 rounded-full text-xs hover:bg-green-500 transition-colors cursor-pointer">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links with Psychological CTAs */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-semibold text-yellow-400">Start Your Solar Journey</h4>
            <ul className="space-y-3">
              {[
                { label: '🏠 Home - Your Solar Hub', section: 'home', cta: 'Start Here!' },
                { label: '⚡ Get Solar Now - Save ₹3000/Month', section: 'booking', cta: 'Popular!' },
                { label: '👥 About Us - Why 500+ Choose Us', section: 'about', cta: 'Trust' },
                { label: '📞 Contact - Free Consultation', section: 'contact', cta: 'Free!' },
                { label: '📊 Your Generation - Track Savings', section: 'generation', cta: 'Monitor' },
                { label: '🛡️ Privacy Policy - Your Data Safe', section: 'privacy', cta: 'Secure' }
              ].map((link, index) => (
                <li key={index} className="group">
                  <button 
                    onClick={() => handleNavigation(link.section)}
                    className="text-sm text-gray-300 hover:text-yellow-400 hover:underline transition-all duration-300 text-left group-hover:translate-x-2 flex items-center justify-between w-full"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs bg-yellow-400 text-green-900 px-2 py-1 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.cta}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info with Local Appeal */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h4 className="text-lg font-semibold text-yellow-400">Reach Your Local Solar Experts</h4>
            <div className="space-y-4">
              <div className="bg-green-700 p-4 rounded-lg">
                <p className="text-yellow-300 font-semibold text-sm mb-2">
                  🔥 Limited Time: Only 50 Subsidy Slots Left in Nagpur!
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">support@solarpanda.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">+91-7887627220</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">Serving Nagpur & Chandrapur with Pride</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social Media */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <h4 className="text-lg font-semibold text-yellow-400">Stay Connected & Save More</h4>
            
            {/* Newsletter Signup */}
            <form onSubmit={handleNewsletterSignup} className="space-y-3">
              <p className="text-sm text-gray-300">Get exclusive solar tips & offers</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-green-700 border-green-600 text-white placeholder-gray-400 text-sm"
                  required
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="bg-yellow-400 text-green-900 hover:bg-yellow-300 font-semibold"
                >
                  Join
                </Button>
              </div>
            </form>

            {/* Social Media with One-Tap Sharing */}
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Share Solar Panda with friends:</p>
              <div className="flex space-x-3">
                {[
                  { name: 'WhatsApp', icon: '📱', platform: 'whatsapp', color: 'hover:bg-green-600' },
                  { name: 'Twitter', icon: '🐦', platform: 'twitter', color: 'hover:bg-blue-600' },
                  { name: 'Facebook', icon: '📘', platform: 'facebook', color: 'hover:bg-blue-700' }
                ].map((social, index) => (
                  <button
                    key={index}
                    onClick={() => handleShare(social.platform)}
                    className={`w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-yellow-400 ${social.color} hover:scale-110 transition-all duration-300 group`}
                    title={`Share on ${social.name}`}
                  >
                    <span className="text-lg group-hover:animate-pulse">{social.icon}</span>
                  </button>
                ))}
                <button
                  onClick={() => navigator.share?.({ title: 'Solar Panda', url: window.location.href })}
                  className="w-12 h-12 bg-green-700 rounded-full flex items-center justify-center text-yellow-400 hover:bg-purple-600 hover:scale-110 transition-all duration-300"
                  title="Share via system"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="border-t border-green-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 text-center md:text-left">
              © 2024 Solar Panda. All rights reserved. | 
              <span className="text-yellow-400 font-semibold"> Making solar energy accessible to every home in Maharashtra.</span>
            </p>
            
            {/* Back to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="bg-transparent border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
          
          {/* Final Trust Message */}
          <div className="mt-6 text-center">
            <p className="text-yellow-300 font-medium text-sm">
              🌟 <strong>Promise:</strong> We provide everything you need for solar, leaving no reason for dissatisfaction for the lifetime of your solar system.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
