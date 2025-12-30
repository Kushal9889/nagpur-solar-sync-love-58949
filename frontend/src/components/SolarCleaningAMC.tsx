
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Brush, Zap, CheckCircle, Phone, Calendar, ArrowLeft, Wrench, Star } from "lucide-react";

interface SolarCleaningAMCProps {
  onBack: () => void;
}

const SolarCleaningAMC: React.FC<SolarCleaningAMCProps> = ({ onBack }) => {
  const [selectedCleaning, setSelectedCleaning] = useState<string | null>(null);
  const [selectedAMC, setSelectedAMC] = useState<boolean>(false);

  const cleaningOptions = [
    {
      id: 'speaker',
      title: 'Speaker Cleaning',
      description: 'Uses sound waves to remove dust',
      icon: Zap,
      features: ['No water damage', '95% efficiency', 'Safe for all panels', 'Eco-friendly method'],
      price: '₹500 per session',
      color: 'from-blue-500 to-blue-600',
      bestFor: 'Dry Areas'
    },
    {
      id: 'physical',
      title: 'Physical Cleaning',
      description: 'Manual cleaning with soft brushes',
      icon: Brush,
      features: ['Manual cleaning', '95% efficiency', 'Safe for all panels', 'Extends panel lifespan'],
      price: '₹800 per session',
      color: 'from-green-500 to-green-600',
      bestFor: 'Regular Maintenance'
    },
    {
      id: 'jetspray',
      title: 'Jet Spray Cleaning',
      description: 'High-pressure water spray',
      icon: Droplets,
      features: ['High-pressure water', '95% efficiency', 'Safe for all panels', 'Removes tough dirt effectively'],
      price: '₹1,200 per session',
      color: 'from-cyan-500 to-cyan-600',
      bestFor: 'Heavy Dust'
    }
  ];

  const amcPackage = {
    title: 'Annual Maintenance Contract (AMC)',
    description: 'Complete solar system maintenance for peace of mind',
    price: '₹5,000',
    duration: '12 months',
    services: [
      '3 Professional Cleaning Sessions',
      '1 Deep Panel Washing',
      'Quarterly Performance Check',
      'Inverter Maintenance',
      '24/7 Support Helpline',
      'Priority Service Response'
    ],
    benefits: [
      'Save ₹1,400 compared to individual services',
      'Guaranteed 95%+ panel efficiency',
      'Extended equipment lifespan',
      'Performance monitoring'
    ]
  };

  const bookCleaning = (type: string) => {
    setSelectedCleaning(type);
    // Mock booking confirmation
    alert(`Booking confirmed for ${cleaningOptions.find(opt => opt.id === type)?.title}! Our team will contact you within 24 hours.`);
  };

  const bookAMC = () => {
    setSelectedAMC(true);
    // Mock AMC booking confirmation
    alert('AMC package booked successfully! You will receive a confirmation call within 2 hours.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Solar Services
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Solar Cleaning & AMC Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Keep your solar panels performing at peak efficiency with our professional cleaning and maintenance services.
          </p>
        </div>

        {/* Cleaning Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Professional Cleaning Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cleaningOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card 
                  key={option.id}
                  className="hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-cyan-400"
                >
                  <CardHeader className={`bg-gradient-to-r ${option.color} text-white rounded-t-lg`}>
                    <Icon className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-xl text-center">{option.title}</CardTitle>
                    <CardDescription className="text-gray-100 text-center">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-cyan-600">{option.price}</div>
                      <Badge variant="outline" className="mt-2">Best for: {option.bestFor}</Badge>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                      onClick={() => bookCleaning(option.id)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Comparison Table */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Cleaning Methods Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Method</th>
                      <th className="text-center p-3">Efficiency</th>
                      <th className="text-center p-3">Safety</th>
                      <th className="text-center p-3">Price</th>
                      <th className="text-center p-3">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cleaningOptions.map((option, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{option.title}</td>
                        <td className="p-3 text-center">95%</td>
                        <td className="p-3 text-center">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">High</Badge>
                        </td>
                        <td className="p-3 text-center font-semibold text-cyan-600">{option.price}</td>
                        <td className="p-3 text-center">{option.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AMC Package */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Annual Maintenance Contract (AMC)</h2>
          <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-orange-300">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{amcPackage.title}</CardTitle>
                  <CardDescription className="text-orange-100 text-lg">
                    {amcPackage.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{amcPackage.price}</div>
                  <div className="text-orange-200">for {amcPackage.duration}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <Wrench className="h-5 w-5 mr-2 text-orange-500" />
                    Services Included
                  </h4>
                  <ul className="space-y-3">
                    {amcPackage.services.map((service, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-orange-500" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    {amcPackage.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border-l-4 border-orange-500">
                <h5 className="text-lg font-semibold text-orange-800 mb-2">Special Offer!</h5>
                <p className="text-orange-700">
                  Book your AMC today and get <span className="font-bold">first cleaning session absolutely FREE!</span> 
                  Save ₹1,400 compared to booking individual services.
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold"
                  onClick={bookAMC}
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book AMC Package
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call for Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Need Custom Service?</h3>
            <p className="text-xl text-cyan-100 mb-6">
              Have specific requirements? Our team can create a customized cleaning and maintenance plan for your solar installation.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-cyan-600 hover:bg-gray-100 font-bold"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Our Experts
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SolarCleaningAMC;
