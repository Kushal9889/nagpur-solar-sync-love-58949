
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, Factory, Mountain, Wrench, DollarSign, Droplets, Sparkles } from "lucide-react";
import ResidentialSolarBooking from './ResidentialSolarBooking';
import IndustrialSolarBooking from './IndustrialSolarBooking';
import CommercialSolarBooking from './CommercialSolarBooking';
import GroundMountedSolarBooking from './GroundMountedSolarBooking';

const SolarBookingMain: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setSelectedType('');
  };

  const handleBack = () => {
    if (selectedType) {
      setSelectedType('');
    } else {
      setSelectedService('');
    }
  };

  // Render specific booking component based on selection
  if (selectedService === 'new-solar' && selectedType === 'residential') {
    return <ResidentialSolarBooking onBack={handleBack} />;
  }
  
  if (selectedService === 'new-solar' && selectedType === 'industrial') {
    return <IndustrialSolarBooking onBack={handleBack} />;
  }
  
  if (selectedService === 'new-solar' && selectedType === 'commercial') {
    return <CommercialSolarBooking onBack={handleBack} />;
  }
  
  if (selectedService === 'new-solar' && selectedType === 'ground-mounted') {
    return <GroundMountedSolarBooking onBack={handleBack} />;
  }

  // Solar installation type selection
  if (selectedService === 'new-solar') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Button onClick={handleBack} variant="outline" className="mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            ← Back to Services
          </Button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Choose Your Solar Solution
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect solar installation type that matches your energy needs and space requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative"
              onClick={() => setSelectedType('residential')}
            >
              <div className="absolute inset-0 bg-white bg-opacity-10"></div>
              <CardHeader className="text-center relative z-10">
                <Home className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl font-bold">Residential</CardTitle>
                <CardDescription className="text-blue-100">Perfect for homes and small properties</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>3-10 kW systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Rooftop installation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Up to ₹78,000 subsidy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Net metering benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white overflow-hidden relative"
              onClick={() => setSelectedType('industrial')}
            >
              <div className="absolute inset-0 bg-white bg-opacity-10"></div>
              <CardHeader className="text-center relative z-10">
                <Factory className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl font-bold">Industrial</CardTitle>
                <CardDescription className="text-green-100">Large-scale solutions for industries</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>100kW+ systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Ground/rooftop mounting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Commercial financing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Energy management systems</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden relative"
              onClick={() => setSelectedType('commercial')}
            >
              <div className="absolute inset-0 bg-white bg-opacity-10"></div>
              <CardHeader className="text-center relative z-10">
                <Building2 className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl font-bold">Commercial Building</CardTitle>
                <CardDescription className="text-purple-100">Smart solutions for businesses</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>25-100 kW systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Building-integrated solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>CAPEX/OPEX models</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Energy savings guarantee</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white overflow-hidden relative"
              onClick={() => setSelectedType('ground-mounted')}
            >
              <div className="absolute inset-0 bg-white bg-opacity-10"></div>
              <CardHeader className="text-center relative z-10">
                <Mountain className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-2xl font-bold">Ground Mounted</CardTitle>
                <CardDescription className="text-orange-100">Massive solar farms and installations</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>500kW+ systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Open land installation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Solar tracking systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Grid-scale solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (selectedService) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button onClick={handleBack} variant="outline" className="mb-6">
          ← Back to Services
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{selectedService.charAt(0).toUpperCase() + selectedService.slice(1).replace('-', ' ')}</h2>
          <p className="text-gray-600">This service section is under development</p>
        </div>
      </div>
    );
  }

  // Main service selection page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Solar Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your energy future with our comprehensive solar solutions. Choose from our range of premium services designed to power your dreams.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative transform hover:-translate-y-2"
            onClick={() => handleServiceSelect('new-solar')}
          >
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <Home className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <CardTitle className="text-xl font-bold">New Solar</CardTitle>
              <CardDescription className="text-blue-100 text-sm">Complete installation packages</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-sm text-blue-100 leading-relaxed">Get a new solar system with government subsidies and flexible financing</p>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white overflow-hidden relative transform hover:-translate-y-2"
            onClick={() => handleServiceSelect('cleaning')}
          >
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <Droplets className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <CardTitle className="text-xl font-bold">Cleaning</CardTitle>
              <CardDescription className="text-green-100 text-sm">Automated & manual cleaning</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-sm text-green-100 leading-relaxed">Sprinkler systems and professional cleaning for optimal performance</p>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden relative transform hover:-translate-y-2"
            onClick={() => handleServiceSelect('loans')}
          >
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <DollarSign className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <CardTitle className="text-xl font-bold">Loans</CardTitle>
              <CardDescription className="text-purple-100 text-sm">Flexible financing solutions</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-sm text-purple-100 leading-relaxed">Easy loan options with competitive rates for solar installations</p>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-orange-500 to-red-500 text-white overflow-hidden relative transform hover:-translate-y-2"
            onClick={() => handleServiceSelect('maintenance')}
          >
            <div className="absolute inset-0 bg-white bg-opacity-10"></div>
            <CardHeader className="text-center relative z-10 pb-4">
              <Wrench className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <CardTitle className="text-xl font-bold">Maintenance</CardTitle>
              <CardDescription className="text-orange-100 text-sm">AMC & care services</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 pt-0">
              <p className="text-sm text-orange-100 leading-relaxed">₹5,000/year AMC with 3 visits, washing & monitoring</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SolarBookingMain;
