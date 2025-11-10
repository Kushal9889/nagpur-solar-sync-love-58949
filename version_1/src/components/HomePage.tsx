import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Zap, Shield, Award, TrendingUp, Users, MapPin, Phone, Home, Building, Factory, Mountain, Play } from "lucide-react";
import SolarCalculator from './SolarCalculator';
import EnhancedCountdownTimer from './EnhancedCountdownTimer';
import VideoGallery from './VideoGallery';
interface HomePageProps {
  onNavigate: (section: string) => void;
}
const HomePage: React.FC<HomePageProps> = ({
  onNavigate
}) => {
  const features = [{
    icon: Zap,
    title: 'Smart Solar Calculator',
    description: 'AI-powered calculator to estimate your solar potential and government subsidies'
  }, {
    icon: Users,
    title: 'Verified Dealers',
    description: 'Connect with MSEDCL empanelled dealers in Nagpur & Chandrapur'
  }, {
    icon: Shield,
    title: 'Quality Assurance',
    description: '5-year warranty and certified installations by trusted professionals'
  }, {
    icon: Award,
    title: 'Government Subsidies',
    description: 'Get up to ₹78,000 subsidy on 3kW solar systems through PM-KUSUM scheme'
  }];
  const stats = [{
    label: 'Happy Customers',
    value: '250+',
    icon: Users
  }, {
    label: 'Solar Installations',
    value: '180+',
    icon: Sun
  }, {
    label: 'Verified Dealers',
    value: '15+',
    icon: Award
  }, {
    label: 'CO2 Saved (Tons)',
    value: '420+',
    icon: TrendingUp
  }];
  const solarPlans = [{
    id: 'residential',
    title: 'Residential Solar',
    subtitle: 'Perfect for homes and small properties',
    savings: 'Save ₹18,000/year',
    totalSavings: '25-Year Total Savings: ₹4.5L',
    features: ['3-10 kW systems', 'Rooftop installation', 'Up to ₹78,000 subsidy', 'Net metering benefits'],
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    badge: 'Only 52 slots left this month!',
    badgeColor: 'bg-red-500'
  }, {
    id: 'commercial',
    title: 'Commercial Solar',
    subtitle: 'Smart solutions for businesses',
    savings: 'Save ₹25,000/month',
    totalSavings: '25-Year Total Savings: ₹7.5L',
    features: ['25-100 kW systems', 'Building-integrated solutions', 'CAPEX/OPEX models', 'Energy savings guarantee'],
    icon: Building,
    color: 'from-green-500 to-green-600',
    badge: 'Good business growth Guarantee',
    badgeColor: 'bg-green-500'
  }, {
    id: 'industrial',
    title: 'Industrial Solar',
    subtitle: 'Large-scale power for industries',
    savings: 'Save ₹2,00,000/month',
    totalSavings: '25-Year Total Savings: ₹50L',
    features: ['100kW+ systems', 'Ground/rooftop mounting', 'Commercial financing', 'Energy management systems'],
    icon: Factory,
    color: 'from-purple-500 to-purple-600',
    badge: 'Limited government Incentives',
    badgeColor: 'bg-purple-500'
  }, {
    id: 'ground-mounted',
    title: 'Ground-Mounted Solar',
    subtitle: 'Massive solar farms and installations',
    savings: 'Save ₹5,00,000/month',
    totalSavings: '25-Year Total Savings: ₹1.5Cr',
    features: ['500kW+ systems', 'Open land installation', 'Solar tracking systems', 'Grid-scale solutions'],
    icon: Mountain,
    color: 'from-orange-500 to-orange-600',
    badge: 'Exclusive partnership deals',
    badgeColor: 'bg-orange-500'
  }];
  const handleGetQuoteClick = () => {
    onNavigate('select-plan');
    setTimeout(() => {
      const element = document.getElementById('select-plan-section');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  const horizontalGalleryItems = [{
    type: 'video',
    title: 'What and How Solar Works',
    duration: '2:30',
    description: 'Complete guide to solar energy'
  }, {
    type: 'photo',
    title: 'Before/After Installation',
    description: 'Before transformation in Nagpur'
  }, {
    type: 'video',
    title: 'Customer Success Stories',
    duration: '3:45',
    description: 'Real testimonials from Nagpur families'
  }, {
    type: 'photo',
    title: 'Happy Customer Family',
    description: 'Saving family deals 12500/month'
  }];
  return <div className="space-y-16">
      {/* Green Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-green-900 py-2 px-4 text-center text-sm font-semibold relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        <div className="flex items-center justify-center gap-4 relative z-10">
          <span className="animate-pulse">🔥 Join 98,000+ families saving ₹18,000/year with solar!</span>
          <Button size="sm" onClick={() => onNavigate('select-plan')} className="bg-green-800 text-white hover:bg-green-900 text-xs px-3 py-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-pulse">
            Claim Your Free Quote Now – Save 10,000/ Month
          </Button>
        </div>
      </div>

      {/* Hero Section with Enhanced Styling */}
      <section className="relative text-center py-16 bg-gradient-to-br from-green-50 via-blue-50 to-green-100 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-400/10 to-green-400/10 bg-gray-300"></div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Transform Your Home with <span className="text-orange-600">Solar</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-orange-600 mb-6">Save ₹1 Lakh / Yr for 25 Years!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Join 98,000+ Smarter Families Who Saves 1 Lakh/ Yr with Solar!
          </p>
          <p className="text-md text-gray-600 mb-8">
            <span className="font-bold text-red-600">Zero Investment Stress!</span> GET UP TO ₹78,000 government subsidy, 5-year complete warranty, and lock in your 25-year solar future today.
          </p>
          <p className="text-gray-600 mb-8 text-sm font-medium">Why Choose Solar? No upfront investment, Pay your Bill amount to us - We pay your entire bill for next 25 YRS !</p>

          {/* Rating and Certification Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold text-lg">
              4.9/5 Rating (98,000+ Reviews)
            </div>
            <div className="bg-green-700 text-white px-6 py-2 rounded-full font-bold">
              98,000+ Happy Families Saved upto 1Lakh /Yr Each!
            </div>
            <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
              🏆 MNRE Certified
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden group" onClick={handleGetQuoteClick}>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <span>Get Quote in a Single Click</span>
                <div className="ml-2 px-2 py-1 bg-yellow-400 text-green-900 text-sm rounded-full font-bold animate-pulse">
                  CLICK
                </div>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold" onClick={() => onNavigate('calculator')}>
              Discover Your Solar Size Today – Power Your Family!
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <EnhancedCountdownTimer />
          </div>

          {/* Limited Time Offer */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-2">⚡ LIMITED TIME OFFER! ⚡</h3>
            <p className="text-lg font-semibold">
              Book Before July 15, 2025 – Lock in 25-Year Solar Savings!
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Gallery Section - 1x4 Grid */}
      <section className="py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Our Work & Success Stories</h3>
          <p className="text-gray-300">Watch our journey and customer testimonials</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {horizontalGalleryItems.map((item, index) => <Card key={index} className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#FFC107]/30 hover:border-[#FFC107]">
              <CardContent className="p-0 relative">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === 'video' ? <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg">
                        <Play className="h-8 w-8 text-black ml-1" />
                      </div> : <div className="w-16 h-16 bg-gray-600 rounded flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                        <span className="text-gray-400 text-2xl">📷</span>
                      </div>}
                  </div>
                  {item.duration && <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {item.duration}
                    </div>}
                </div>
                <div className="p-4 bg-white">
                  <h4 className="font-bold text-[#1A3C34] mb-1 text-sm">Sprinklers Systems</h4>
                  <p className="text-xs text-gray-600">{item.description}</p>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* Solar Plans Section - Choose Your Plan Now */}
      <section className="py-12" id="select-plan-section">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan Now – Lock in 25-Year Savings!</h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Select the perfect solar solution that matches your energy needs and start saving today
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {solarPlans.map((plan, index) => {
          const Icon = plan.icon;
          return <Card key={plan.id} className={`relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${plan.color} text-white border-0 shadow-2xl`} onClick={() => onNavigate('select-plan')}>
                {/* Badge */}
                <div className={`absolute top-4 left-4 ${plan.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold z-10`}>
                  {plan.badge}
                </div>

                <CardHeader className="relative pt-16 pb-6">
                  <div className="absolute top-4 right-4">
                    <Icon className="h-16 w-16 text-white/80" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{plan.title}</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    {plan.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300 mb-1">
                      {plan.savings}
                    </div>
                    <div className="text-lg font-semibold text-white/90">
                      {plan.totalSavings}
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => <li key={idx} className="flex items-center gap-2 text-white/90">
                        <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                        {feature}
                      </li>)}
                  </ul>

                  <Button className="w-full mt-6 bg-white text-gray-800 hover:bg-gray-100 font-bold py-3 text-lg" onClick={e => {
                e.stopPropagation();
                onNavigate('select-plan');
              }}>
                    Choose Your Plan Now – Lock in 25-Year Savings!
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-yellow-400/30"></div>
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Solar Journey Today!
          </h2>
          <p className="text-gray-800 text-lg mb-6">
            Join 98,000+ Happy Families Who Locked in 25-Year Solar Savings
          </p>
          <p className="text-red-700 font-semibold mb-8">🔥 Your Neighbours paid only 3 lakhs... and Saved ₹25 lakhs. What are you waiting for?</p>
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300" onClick={() => onNavigate('booking')}>
            Secure Your 25-Year Solar Future Now!
          </Button>
        </div>
      </section>

      {/* Premium Solar Brands Section */}
      <section className="py-12 text-center text-red-950">
        <h3 className="text-3xl font-bold text-white mb-4">Premium Solar Brands We Offer</h3>
        <p className="text-gray-300 mb-8">Trusted by 98,000+ satisfied customers across Maharashtra </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {['Luminous', 'Vikram Solar', 'Panasonic', 'LONGI', 'JA Solar', 'Waaree'].map((brand, index) => <div key={index} className="bg-white p-4 rounded-lg shadow-lg min-w-[120px]">
              <div className="text-gray-600 font-semibold">{brand}</div>
            </div>)}
        </div>
      </section>

      {/* Know About Us Section - 2x4 Grid */}
      <section className="py-12 text-center">
        <h3 className="text-3xl font-bold text-white mb-4">Know about us and our 12 YRS Journey</h3>
        <p className="text-gray-300 mb-8">Watch our work & Customer success stories</p>
        
        <div className="max-w-7xl mx-auto">
          {/* Video Gallery - 2x2 Grid */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-white mb-4">📹 Video Gallery</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
              title: 'What and How Solar Works',
              duration: '2:30',
              desc: 'Complete guide to solar energy'
            }, {
              title: 'Customer Success Stories',
              duration: '3:45',
              desc: 'Real testimonials from Nagpur families'
            }, {
              title: 'Installation Process Time-lapse',
              duration: '1:20',
              desc: 'Watch complete installation in 1 minute'
            }, {
              title: 'Subsidy Claim Guide',
              duration: '4:15',
              desc: 'Step-by-step subsidy application'
            }].map((video, index) => <Card key={index} className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#FFC107]/30 hover:border-[#FFC107]">
                  <CardContent className="p-0 relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg">
                          <Play className="h-8 w-8 text-black ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h5 className="text-[#1A3C34] font-semibold text-sm mb-1">{video.title}</h5>
                      <p className="text-gray-600 text-xs">{video.desc}</p>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>

          {/* Photo Gallery - 2x2 Grid */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">📷 Photo Gallery</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[{
              title: 'Before/After Installation',
              desc: 'Before transformation in Nagpur'
            }, {
              title: 'Happy Customer Family',
              desc: 'Saving family deals 12500/month'
            }, {
              title: 'Installation Progress',
              desc: 'Live installation process'
            }, {
              title: 'Completed Projects',
              desc: 'Successfully completed installations'
            }].map((photo, index) => <Card key={index} className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#FFC107]/30 hover:border-[#FFC107]">
                  <CardContent className="p-0 relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-600 rounded flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                          <span className="text-gray-400 text-2xl">📷</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h5 className="text-[#1A3C34] font-semibold text-sm mb-1">{photo.title}</h5>
                      <p className="text-gray-600 text-xs">{photo.desc}</p>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          return <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>;
        })}
        </div>
      </section>

      {/* Solar Calculator Section */}
      <section className="py-12">
        <SolarCalculator />
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose SolarCleanNagpur?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We make solar adoption simple, affordable, and trustworthy for every home in Maharashtra.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>;
        })}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            Stay Connected & Lock in Your 25-Year Savings
          </h3>
          <p className="text-gray-800 mb-6">
            Join 98,000+ smart homeowners getting exclusive solar deals and savings updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input type="email" placeholder="Enter email for solar" className="px-4 py-3 rounded-lg border-2 border-gray-300 flex-1" />
            <Button className="bg-black text-white hover:bg-gray-800 px-6 py-3 font-bold">
              Join 98,000+ Solar Families
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Service Areas</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Nagpur', 'Chandrapur', 'Civil Lines', 'Dharampeth', 'Sadar', 'Hingna Road', 'Wardha Road', 'Ballarpur'].map(area => <span key={area} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {area}
            </span>)}
        </div>
      </section>
    </div>;
};
export default HomePage;