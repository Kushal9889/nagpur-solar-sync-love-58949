
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const ContactUsSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109"],
      color: "text-green-500"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@solarpanda.com", "support@solarpanda.com"],
      color: "text-blue-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Nagpur, Maharashtra", "Chandrapur, Maharashtra"],
      color: "text-purple-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Sat: 9:00 AM - 7:00 PM", "Sun: 10:00 AM - 5:00 PM"],
      color: "text-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 via-emerald-700 to-green-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">Get In Touch</h1>
          <p className="text-2xl text-green-100 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Ready to start your solar journey? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/95 backdrop-blur-lg shadow-2xl border-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Request Consultation</CardTitle>
              <CardDescription className="text-green-100 text-lg">
                Fill out the form and we'll call you soon!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 text-lg">We'll call you soon to discuss your solar needs.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      className="mt-2 h-12 text-lg border-2 border-gray-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Enter your phone number"
                      className="mt-2 h-12 text-lg border-2 border-gray-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-700">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email address"
                      className="mt-2 h-12 text-lg border-2 border-gray-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-lg font-semibold text-gray-700">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your solar requirements..."
                      rows={4}
                      className="mt-2 text-lg border-2 border-gray-200 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 transition-all duration-300"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full h-14 text-xl bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Request
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-white/20">
                        <Icon className={`h-8 w-8 ${info.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-green-100 text-lg">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Map Placeholder */}
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Our Service Areas</h3>
                <div className="h-40 bg-gradient-to-br from-green-200 to-emerald-200 rounded-lg flex items-center justify-center text-6xl">
                  🗺️
                </div>
                <p className="text-green-100 text-center mt-4">
                  Serving Nagpur, Chandrapur, and surrounding areas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Happy Customers", value: "1,500+", icon: "😊" },
            { label: "Solar Installations", value: "1,200+", icon: "⚡" },
            { label: "Partner Vendors", value: "25+", icon: "🤝" },
            { label: "Cities Covered", value: "8+", icon: "🏙️" }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 text-white text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.value}</div>
                <div className="text-green-100 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ContactUsSection;
