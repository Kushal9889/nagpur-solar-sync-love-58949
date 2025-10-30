
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Home, Settings, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import AnimatedSection from './AnimatedSection';

interface ResidentialSolarPageProps {
  onNavigate: (section: string) => void;
}

const ResidentialSolarPage: React.FC<ResidentialSolarPageProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pincode: '',
    discom: '',
    consumption: 300,
    panelBrand: '',
    customization: ''
  });

  // Persist data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('solarJourneyData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('solarJourneyData', JSON.stringify(formData));
  }, [formData]);

  const totalSteps = 5;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const discomOptions = ['MSEDCL', 'BEST', 'Tata Power', 'Adani Electricity'];
  const panelBrands = ['Waaree', 'Tata Solar', 'Vikram Solar', 'Adani Solar'];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AnimatedSection animationType="slideLeft">
            <div className="step-1 flex flex-col items-center space-y-6">
              <MapPin className="h-16 w-16 text-[#FFC107] mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Step 1: Enter Your Pincode</h2>
              <p className="text-gray-200 text-center mb-6">Help us verify your location and check service availability</p>
              <Input
                type="text"
                placeholder="Enter your 6-digit pincode"
                value={formData.pincode}
                onChange={(e) => updateFormData('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-14 text-xl max-w-md text-center bg-white border-2 border-[#FFC107] focus:border-[#FF6200]"
                maxLength={6}
              />
              <Button 
                onClick={nextStep}
                disabled={formData.pincode.length !== 6}
                className="h-14 px-12 bg-[#FFC107] hover:bg-[#FF6200] text-black font-bold text-xl"
              >
                Next <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </AnimatedSection>
        );

      case 2:
        return (
          <AnimatedSection animationType="slideLeft">
            <div className="step-2 flex flex-col items-center space-y-6">
              <Zap className="h-16 w-16 text-[#FFC107] mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Step 2: Select Your Electricity Provider</h2>
              <p className="text-gray-200 text-center mb-6">Choose your current electricity distribution company</p>
              <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                {discomOptions.map((discom) => (
                  <button
                    key={discom}
                    onClick={() => {
                      updateFormData('discom', discom);
                      setTimeout(nextStep, 300);
                    }}
                    className={`h-14 rounded-lg border-2 transition-all duration-300 font-bold ${
                      formData.discom === discom
                        ? 'border-[#FFC107] bg-[#FFC107] text-black'
                        : 'border-white text-white hover:border-[#FFC107] hover:bg-[#FFC107]/20'
                    }`}
                  >
                    {discom}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button onClick={prevStep} variant="outline" className="h-12 px-8 text-white border-white hover:bg-white hover:text-black">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Back
                </Button>
              </div>
            </div>
          </AnimatedSection>
        );

      case 3:
        return (
          <AnimatedSection animationType="slideLeft">
            <div className="step-3 flex flex-col items-center space-y-6">
              <Home className="h-16 w-16 text-[#FFC107] mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Step 3: Monthly Energy Consumption</h2>
              <p className="text-gray-200 text-center mb-6">How many units do you consume monthly?</p>
              <div className="max-w-md w-full space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FFC107] mb-2">{formData.consumption} units</div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={formData.consumption}
                    onChange={(e) => updateFormData('consumption', Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-300 mt-2">
                    <span>100</span>
                    <span>550</span>
                    <span>1000</span>
                  </div>
                </div>
                <div className="text-center text-green-300">
                  <p className="text-lg">Recommended: {Math.ceil(formData.consumption / 120)} kW system</p>
                  <p className="text-sm">Estimated savings: ₹{Math.round((formData.consumption * 5) / 12).toLocaleString()}/month</p>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button onClick={prevStep} variant="outline" className="h-12 px-8 text-white border-white hover:bg-white hover:text-black">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Back
                </Button>
                <Button onClick={nextStep} className="h-12 px-8 bg-[#FFC107] hover:bg-[#FF6200] text-black font-bold">
                  Next <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </AnimatedSection>
        );

      case 4:
        return (
          <AnimatedSection animationType="slideLeft">
            <div className="step-4 flex flex-col items-center space-y-6">
              <Settings className="h-16 w-16 text-[#FFC107] mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Step 4: Choose Solar Panel Brand</h2>
              <p className="text-gray-200 text-center mb-6">Select your preferred solar panel manufacturer</p>
              <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                {panelBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      updateFormData('panelBrand', brand);
                      setTimeout(nextStep, 300);
                    }}
                    className={`h-14 rounded-lg border-2 transition-all duration-300 font-bold ${
                      formData.panelBrand === brand
                        ? 'border-[#FFC107] bg-[#FFC107] text-black'
                        : 'border-white text-white hover:border-[#FFC107] hover:bg-[#FFC107]/20'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                <Button onClick={prevStep} variant="outline" className="h-12 px-8 text-white border-white hover:bg-white hover:text-black">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Back
                </Button>
              </div>
            </div>
          </AnimatedSection>
        );

      case 5:
        return (
          <AnimatedSection animationType="scaleIn">
            <div className="step-5 flex flex-col items-center space-y-8">
              <CheckCircle className="h-20 w-20 text-green-500 mb-4" />
              <h2 className="text-4xl font-bold text-white mb-4">Step 5: Ready to Go Solar!</h2>
              <p className="text-gray-200 text-center mb-6 max-w-2xl">
                Great! We've customized the perfect solar solution for you. Review your details and proceed to secure your booking.
              </p>
              
              {/* Summary Card */}
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107] max-w-md w-full">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white text-center">
                  <CardTitle>Your Solar Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><strong>Pincode:</strong> {formData.pincode}</div>
                    <div><strong>Provider:</strong> {formData.discom}</div>
                    <div><strong>Consumption:</strong> {formData.consumption} units</div>
                    <div><strong>Panel Brand:</strong> {formData.panelBrand}</div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {Math.ceil(formData.consumption / 120)} kW System
                      </div>
                      <div className="text-lg text-gray-700">
                        Save ₹{Math.round((formData.consumption * 5)).toLocaleString()}/month
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{((Math.round((formData.consumption * 5)) * 12 * 25) / 100000).toFixed(1)}L saved over 25 years
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={() => onNavigate('payment')}
                className="h-16 px-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Book Now – Secure Your 25-Year Solar Future!
              </Button>
              
              <Button 
                onClick={prevStep} 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-black"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Customize
              </Button>
            </div>
          </AnimatedSection>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Header */}
        <AnimatedSection animationType="fadeUp">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Your Solar Journey – Start Saving Now!
            </h1>
            <p className="text-xl text-gray-200">
              Complete these simple steps to get your personalized solar solution
            </p>
          </div>
        </AnimatedSection>

        {/* Progress Bar */}
        <AnimatedSection animationType="fadeIn" delay={200}>
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge className="bg-[#FFC107] text-black px-4 py-2 text-lg font-bold">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-[#FFC107] to-[#FF6200] h-4 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-300 mt-2">
              <span>Location</span>
              <span>Provider</span>
              <span>Usage</span>
              <span>Panels</span>
              <span>Complete</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Step Content */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {renderStep()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResidentialSolarPage;
