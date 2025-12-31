import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Users, Award, TrendingUp, Phone, MapPin, Mail, Shield, Zap, Leaf } from "lucide-react";

const AboutUsSection: React.FC = () => {
  const navigate = useNavigate();
  const stats = [{
    icon: Users,
    value: '500+',
    label: 'Happy Customers'
  }, {
    icon: Sun,
    value: '180+',
    label: 'Solar Installations'
  }, {
    icon: Award,
    value: '15+',
    label: 'Verified Dealers'
  }, {
    icon: TrendingUp,
    value: '420+',
    label: 'CO2 Saved (Tons)'
  }];
  const teamMembers = [{
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    experience: '15+ years in renewable energy',
    avatar: '👨‍💼'
  }, {
    name: 'Priya Sharma',
    role: 'Technical Director',
    experience: '12+ years in solar technology',
    avatar: '👩‍🔬'
  }, {
    name: 'Amit Desai',
    role: 'Operations Manager',
    experience: '10+ years in project management',
    avatar: '👨‍💻'
  }];
  const certifications = [{
    name: 'NABCEP Certified',
    description: 'North American Board of Certified Energy Practitioners approved'
  }, {
    name: 'Eversource Approved',
    description: 'Eversource Energy Partner'
  }, {
    name: 'ISO 9001 Certified',
    description: 'Quality Management System certification'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">Solar Panda</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Empowering Massachusetts with sustainable solar solutions since 2013. We connect you with the best solar vendors and ensure quality installations.</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
          const Icon = stat.icon;
          return <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-lg">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-6 w-6" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">Making solar energy accessible to every home in Massachusetts. 
☀️ Our Promise: Solar made simple, affordable, and regret-free — for a lifetime. </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-blue-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-6 w-6" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-base">
              <p className="text-gray-700 leading-relaxed">
                To create a sustainable future where clean energy powers every home and business. 
                We envision Boston as a model green city, leading the renewable energy revolution 
                through innovative solar solutions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <Card className="mb-16 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardTitle className="text-3xl text-center">Why Choose Solar Panda?</CardTitle>
            <CardDescription className="text-green-100 text-center text-lg">
              We're not just another solar company - we're your trusted energy partners
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Trusted Network</h3>
                <p className="text-gray-600">
                  We work only with Eversource approved dealers and NABCEP certified installers 
                  to ensure quality and reliability.
                </p>
              </div>
              <div className="text-center">
                <Zap className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">End-to-End Support</h3>
                <p className="text-gray-600">
                  From initial consultation to post-installation maintenance, 
                  we support you throughout your solar journey.
                </p>
              </div>
              <div className="text-center">
                <Award className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                <p className="text-gray-600">
                  5-year warranty on installations, regular performance monitoring, 
                  and 24/7 customer support for complete peace of mind.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{cert.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mb-16 shadow-lg">
          <CardHeader className="bg-gray-800 text-white">
            <CardTitle className="text-2xl text-center">Get In Touch</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-gray-600">+1 (617) 555-0123</p>
              </div>
              <div>
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-gray-600">support@solarpanda.com</p>
              </div>
              <div>
                <MapPin className="h-8 w-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Visit Us</h3>
                <p className="text-gray-600">100 State Street, Boston, MA 02109</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section with updated button */}
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Solar Journey?</h2>
            <p className="text-xl text-green-100 mb-8">
              Join hundreds of satisfied customers who are saving money and protecting the environment.
            </p>
            {/* Updated Get Started Today button with reduced blinking and color change */}
            <Button size="lg" onClick={() => navigate('/booking')} className="bg-green-800 hover:bg-yellow-400 hover:text-green-800 text-yellow-400 font-bold text-lg px-12 py-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 animate-slow-pulse">
              <Sun className="h-6 w-6 mr-2" />
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for slow pulse animation */}
      <style>{`
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .animate-slow-pulse {
          animation: slow-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>;
};
export default AboutUsSection;