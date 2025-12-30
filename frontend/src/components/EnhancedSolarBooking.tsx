
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Factory, Building, Mountain, Droplets, Wrench } from "lucide-react";
import FiveStepSolarInstallation from './FiveStepSolarInstallation';
import SolarCleaningAMC from './SolarCleaningAMC';

const EnhancedSolarBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (selectedService && ['residential', 'commercial', 'industrial', 'ground-mounted'].includes(selectedService)) {
    return (
      <FiveStepSolarInstallation 
        serviceType={selectedService as 'residential' | 'commercial' | 'industrial' | 'ground-mounted'}
        onBack={() => setSelectedService(null)}
      />
    );
  }

  if (selectedService === 'cleaning-amc') {
    return (
      <SolarCleaningAMC onBack={() => setSelectedService(null)} />
    );
  }

  const solarTypes = [
    {
      id: 'residential',
      title: 'Residential Solar',
      description: 'Perfect for homes and apartments',
      icon: Sun,
      features: ['1-10 kW capacity', 'Net metering', 'Government subsidies', 'ROI in 3-4 years'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'commercial',
      title: 'Commercial Solar',
      description: 'Ideal for offices and businesses',
      icon: Building,
      features: ['10-100 kW capacity', 'Reduce operational costs', 'Corporate sustainability', 'Tax benefits'],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'industrial',
      title: 'Industrial Solar',
      description: 'Large-scale solar for factories',
      icon: Factory,
      features: ['100+ kW capacity', 'Massive cost savings', 'Grid stability', 'Long-term contracts'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'ground-mounted',
      title: 'Ground-Mounted Solar',
      description: 'Utility-scale solar farms',
      icon: Mountain,
      features: ['MW capacity', 'Land leasing', 'Government revenue', '25-year PPA'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const additionalServices = [
    {
      id: 'cleaning-amc',
      title: 'Solar Cleaning & AMC',
      description: 'Maintenance services for existing systems',
      icon: Droplets,
      features: ['Panel cleaning', 'Annual maintenance', 'Performance optimization', '24/7 support'],
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={() => navigate('/')} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300">
            ← Back to Home
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Solar Installation Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect solar solution for your needs. From residential rooftops to industrial-scale installations.
          </p>
        </div>

        {/* Solar Installation Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Solar Installation Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solarTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card 
                  key={type.id}
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-green-400"
                  onClick={() => setSelectedService(type.id)}
                >
                  <CardHeader className={`bg-gradient-to-r ${type.color} text-white rounded-t-lg`}>
                    <Icon className="h-12 w-12 mx-auto mb-4" />
                    <CardTitle className="text-xl text-center">{type.title}</CardTitle>
                    <CardDescription className="text-gray-100 text-center">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      Get Started →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Services */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Additional Services</h2>
          <div className="max-w-2xl mx-auto">
            {additionalServices.map((service) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={service.id}
                  className="cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-cyan-400"
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardHeader className={`bg-gradient-to-r ${service.color} text-white rounded-t-lg`}>
                    <div className="flex items-center gap-4">
                      <Icon className="h-12 w-12" />
                      <div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <CardDescription className="text-gray-100 text-lg">
                          {service.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                      Explore Services →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Updated Ready to Go Solar Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-4">Ready to Go Solar?</h3>
              <p className="text-xl text-green-100 mb-6">
                Join 500+ satisfied customers in Nagpur who are saving money and protecting the environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 font-bold border-2 border-white"
                  onClick={() => setSelectedService('residential')}
                >
                  Start with Residential
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold border-2 border-white"
                  onClick={() => setSelectedService('commercial')}
                >
                  Explore Commercial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSolarBooking;
