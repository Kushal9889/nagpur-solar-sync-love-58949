
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Shield, Wrench, Calendar, Phone, Sun } from "lucide-react";

const SolarCleaningAMCPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    systemSize: '',
    serviceType: ''
  });

  const services = [
    {
      id: 'cleaning',
      title: 'Solar Panel Cleaning',
      subtitle: 'Professional cleaning service',
      price: '$50-$150',
      features: [
        'Professional cleaning equipment',
        'Water & eco-friendly solutions',
        'Performance improvement up to 25%',
        'Same day service available'
      ],
      icon: Sun,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'amc',
      title: 'Annual Maintenance Contract',
      subtitle: 'Complete peace of mind',
      price: '$200-$800/year',
      features: [
        '4 scheduled cleanings per year',
        'System health monitoring',
        'Preventive maintenance',
        '24/7 helpline support'
      ],
      icon: Shield,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'repair',
      title: 'Repair & Maintenance',
      subtitle: 'Expert technical support',
      price: '$100-$500',
      features: [
        'Inverter servicing & repair',
        'Panel troubleshooting',
        'Wiring & connection checks',
        'Performance optimization'
      ],
      icon: Wrench,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('AMC Form submitted:', formData);
    alert('Thank you! We will contact you within 24 hours for your solar maintenance needs.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Solar AMC & Cleaning Services</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Keep your solar system performing at its best with our professional maintenance services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id}
                className={`cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${service.color} text-white overflow-hidden relative transform hover:-translate-y-2 hover:scale-105`}
                onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id }))}
              >
                <div className="absolute inset-0 bg-white bg-opacity-10"></div>
                
                <CardHeader className="text-center relative z-10 pb-4">
                  <Icon className="h-16 w-16 mx-auto mb-4" />
                  <CardTitle className="text-2xl font-bold mb-2">{service.title}</CardTitle>
                  <p className="text-lg text-white/80 mb-4">{service.subtitle}</p>
                  <div className="text-3xl font-bold">{service.price}</div>
                </CardHeader>
                
                <CardContent className="relative z-10 pb-8">
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFormData(prev => ({ ...prev, serviceType: service.id }));
                    }}
                  >
                    Select Service
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Booking Form */}
        <Card className="bg-white shadow-2xl max-w-2xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              Book Your Service
            </CardTitle>
            <CardDescription className="text-gray-200 text-center">
              Fill out the form below and we'll contact you within 24 hours
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-semibold text-[#1A3C34]">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="mt-2 h-12 text-lg border-2 border-[#1A3C34] focus:border-[#FFC107]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-lg font-semibold text-[#1A3C34]">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    className="mt-2 h-12 text-lg border-2 border-[#1A3C34] focus:border-[#FFC107]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-lg font-semibold text-[#1A3C34]">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter your location"
                    className="mt-2 h-12 text-lg border-2 border-[#1A3C34] focus:border-[#FFC107]"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="systemSize" className="text-lg font-semibold text-[#1A3C34]">
                    System Size (kW)
                  </Label>
                  <Input
                    id="systemSize"
                    type="text"
                    value={formData.systemSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, systemSize: e.target.value }))}
                    placeholder="e.g., 3kW, 5kW"
                    className="mt-2 h-12 text-lg border-2 border-[#1A3C34] focus:border-[#FFC107]"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full h-16 bg-[#1A3C34] hover:bg-[#2D5A4D] text-white font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="h-6 w-6 mr-3" />
                Book Service Now
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <div className="mt-12 bg-[#FFC107] text-black py-8 px-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Why Choose Our AMC Services?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 mb-3" />
              <span className="font-bold">5+ Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 mb-3" />
              <span className="font-bold">98% Customer Satisfaction</span>
            </div>
            <div className="flex flex-col items-center">
              <Calendar className="h-12 w-12 mb-3" />
              <span className="font-bold">Flexible Scheduling</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-12 w-12 mb-3" />
              <span className="font-bold">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarCleaningAMCPage;
