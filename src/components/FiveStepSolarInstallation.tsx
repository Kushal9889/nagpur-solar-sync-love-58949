import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Zap, IndianRupee, Sun, Calculator, ChevronRight, Building, Factory, Mountain, Home, Star, CheckCircle, Phone } from "lucide-react";
import { validatePhoneNumber, formatPhoneNumber } from '@/utils/phoneValidation';
import { validatePincode } from '@/utils/pincodeValidation';
import EnhancedStep4 from './solar-installation/EnhancedStep4';
import EnhancedStep5 from './solar-installation/EnhancedStep5';
import PaymentBookingPage from './solar-installation/PaymentBookingPage';

interface InstallationData {
  pincode: string;
  phoneNumber: string;
  provider: string;
  customProvider?: string;
  consumption: number;
  consumptionType: 'bill' | 'kw' | 'mw';
  serviceType: 'residential' | 'commercial' | 'industrial' | 'ground-mounted';
  selectedTechnology?: string;
  selectedBrand?: string;
  selectedInverter?: string;
  walkway?: boolean;
  elevatedStructure?: boolean;
  cityName?: string;
}

interface FiveStepSolarInstallationProps {
  serviceType: 'residential' | 'commercial' | 'industrial' | 'ground-mounted';
  onBack: () => void;
}

const FiveStepSolarInstallation: React.FC<FiveStepSolarInstallationProps> = ({ serviceType, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<InstallationData>({
    pincode: '',
    phoneNumber: '',
    provider: '',
    consumption: 5000,
    consumptionType: 'bill',
    serviceType
  });
  const [showCustomProvider, setShowCustomProvider] = useState(false);
  const [isValidatingPincode, setIsValidatingPincode] = useState(false);
  const { toast } = useToast();

  const updateData = (newData: Partial<InstallationData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleNext = async () => {
    if (await validateCurrentStep()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateCurrentStep = async () => {
    switch (currentStep) {
      case 1:
        // Validate pincode
        if (!/^\d{6}$/.test(data.pincode)) {
          toast({
            title: "Invalid Pincode",
            description: "Please enter a valid 6-digit pincode",
            variant: "destructive"
          });
          return false;
        }

        // Validate phone number
        if (!validatePhoneNumber(data.phoneNumber)) {
          toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid 10-digit phone number",
            variant: "destructive"
          });
          return false;
        }

        // Validate pincode with API
        setIsValidatingPincode(true);
        const pincodeValidation = await validatePincode(data.pincode);
        setIsValidatingPincode(false);

        if (!pincodeValidation.isValid) {
          toast({
            title: "Invalid Pincode",
            description: pincodeValidation.error || "Service not available in this area",
            variant: "destructive"
          });
          return false;
        }

        // Update city name
        if (pincodeValidation.data) {
          updateData({ cityName: pincodeValidation.data.city });
        }

        // Send lead data to backend (mock implementation)
        console.log('Lead Data:', {
          pincode: data.pincode,
          phoneNumber: data.phoneNumber,
          serviceType: data.serviceType,
          cityName: pincodeValidation.data?.city,
          timestamp: new Date().toISOString()
        });

        toast({
          title: "Details Saved!",
          description: `Thank you! We'll contact you on ${data.phoneNumber}`,
        });

        return true;

      case 2:
        if (!data.provider) {
          toast({
            title: "Select Provider",
            description: "Please select your electricity provider",
            variant: "destructive"
          });
          return false;
        }
        return true;
      case 3:
        if (data.consumption <= 0) {
          toast({
            title: "Invalid Consumption",
            description: "Please enter a valid consumption amount",
            variant: "destructive"
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Auto-proceed on selection for better UX
  const handleProviderSelection = (providerId: string) => {
    updateData({ provider: providerId });
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const getProgressPercentage = () => (currentStep / 5) * 100;

  const getServiceIcon = () => {
    switch (serviceType) {
      case 'residential': return <Home className="h-6 w-6" />;
      case 'commercial': return <Building className="h-6 w-6" />;
      case 'industrial': return <Factory className="h-6 w-6" />;
      case 'ground-mounted': return <Mountain className="h-6 w-6" />;
    }
  };

  const getServiceTitle = () => {
    switch (serviceType) {
      case 'residential': return 'Residential Solar';
      case 'commercial': return 'Commercial Solar';
      case 'industrial': return 'Industrial Solar';
      case 'ground-mounted': return 'Ground-Mounted Solar';
    }
  };

  const getConsumptionRange = () => {
    switch (serviceType) {
      case 'residential': return { min: 1000, max: 50000, step: 500, unit: '₹' };
      case 'commercial': return { min: 20000, max: 500000, step: 5000, unit: '₹' };
      case 'industrial': return { min: 50000, max: 500000, step: 10000, unit: '₹' };
      case 'ground-mounted': return { min: 1, max: 100, step: 0.5, unit: data.consumptionType === 'mw' ? 'MW' : 'kW' };
    }
  };

  const calculateSavings = () => {
    const { consumption } = data;
    const savingsRate = serviceType === 'residential' ? 0.6 : serviceType === 'commercial' ? 0.7 : 0.8;
    return Math.round(consumption * savingsRate);
  };

  const providers = [
    {
      id: 'msedcl',
      name: 'MSEDCL',
      rate: '₹10.8/unit',
      logo: '/lovable-uploads/msedcl-logo.png'
    },
    {
      id: 'tata',
      name: 'Tata Power',
      rate: '₹11.0/unit',
      logo: '/lovable-uploads/tata-logo.png'
    },
    {
      id: 'adani',
      name: 'Adani Electricity',
      rate: '₹11.2/unit',
      logo: '/lovable-uploads/adani-logo.png'
    },
    {
      id: 'best',
      name: 'BEST',
      rate: '₹10.5/unit',
      logo: '/lovable-uploads/best-logo.png'
    }
  ];

  const renderStep1 = () => (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2 border-[#FFC107]">
      <CardHeader className="text-center bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MapPin className="h-8 w-8 text-[#FFC107]" />
          <CardTitle className="text-3xl font-bold">Step 1: Contact Details</CardTitle>
        </div>
        <CardDescription className="text-gray-200 text-lg">
          Enter your details so we can provide personalized solar solutions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 bg-gradient-to-br from-[#D4EDDA] to-white">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Label htmlFor="pincode" className="text-lg font-semibold text-[#1A3C34] mb-3 block">
                Pincode *
              </Label>
              <Input
                id="pincode"
                type="text"
                placeholder="e.g., 442401, 440001"
                value={data.pincode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  updateData({ pincode: value });
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className="h-14 text-lg border-2 border-[#FFC107] focus:border-[#1A3C34] bg-white"
                maxLength={6}
              />
              {data.cityName && (
                <p className="text-sm text-green-600 mt-2 font-semibold">
                  ✓ {data.cityName} - Service Available
                </p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="phone" className="text-lg font-semibold text-[#1A3C34] mb-3 block">
                Phone Number *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={data.phoneNumber}
                  onChange={(e) => {
                    const value = formatPhoneNumber(e.target.value);
                    updateData({ phoneNumber: value });
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="h-14 text-lg border-2 border-[#FFC107] focus:border-[#1A3C34] bg-white pl-12"
                  maxLength={10}
                />
              </div>
              {data.phoneNumber && validatePhoneNumber(data.phoneNumber) && (
                <p className="text-sm text-green-600 mt-2 font-semibold">
                  ✓ Valid phone number
                </p>
              )}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-[#FFC107]/20 to-[#FF6200]/20 border-2 border-[#FFC107] rounded-lg">
            <h4 className="font-bold text-[#1A3C34] mb-3 flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Solar Potential in Your Area
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Nagpur Region:</span>
                <div className="text-[#1A3C34]">5.5 kWh/m²/day</div>
              </div>
              <div>
                <span className="font-medium">Chandrapur Region:</span>
                <div className="text-[#1A3C34]">5.8 kWh/m²/day</div>
              </div>
              <div>
                <span className="font-medium">Sunny Days:</span>
                <div className="text-[#1A3C34]">300+ days/year</div>
              </div>
              <div>
                <span className="font-medium">Peak Generation:</span>
                <div className="text-[#1A3C34]">March-May</div>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleNext}
            onKeyDown={(e) => handleKeyDown(e, handleNext)}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            disabled={!/^\d{6}$/.test(data.pincode) || !validatePhoneNumber(data.phoneNumber) || isValidatingPincode}
          >
            {isValidatingPincode ? 'Validating...' : 'Next: Select Provider'}
            <ChevronRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-[#FFC107]">
      <CardHeader className="text-center bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="h-8 w-8 text-[#FFC107]" />
          <CardTitle className="text-3xl font-bold">Step 2: Electricity Provider</CardTitle>
        </div>
        <CardDescription className="text-gray-200 text-lg">
          Select your current electricity distribution company
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 bg-gradient-to-br from-[#D4EDDA] to-white">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                onClick={() => handleProviderSelection(provider.id)}
                onKeyDown={(e) => handleKeyDown(e, () => handleProviderSelection(provider.id))}
                className={`h-24 p-6 border-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  data.provider === provider.id
                    ? 'border-[#FFC107] bg-gradient-to-r from-[#FFC107] to-[#FF6200] text-black shadow-lg'
                    : 'border-[#1A3C34] bg-white hover:border-[#FFC107] text-[#1A3C34]'
                }`}
                variant="outline"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-lg font-bold">{provider.name}</div>
                  <div className="text-sm font-medium text-[#FF6200]">{provider.rate}</div>
                  {data.provider === provider.id && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => setShowCustomProvider(true)}
              onKeyDown={(e) => handleKeyDown(e, () => setShowCustomProvider(true))}
              variant="outline"
              className="border-2 border-[#1A3C34] text-[#1A3C34] hover:bg-[#FFC107] hover:text-black"
            >
              Other Provider
            </Button>
          </div>

          {showCustomProvider && (
            <div className="p-6 border-2 border-[#FFC107] rounded-lg bg-white">
              <Label className="text-lg font-semibold text-[#1A3C34] mb-3 block">
                Enter Provider Name
              </Label>
              <Input
                placeholder="Enter your electricity provider"
                value={data.customProvider || ''}
                onChange={(e) => updateData({ customProvider: e.target.value, provider: 'custom' })}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className="border-2 border-[#FFC107] focus:border-[#1A3C34]"
              />
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={handlePrevious}
              onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
              variant="outline" 
              className="flex-1 h-12 border-2 border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white"
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              onKeyDown={(e) => handleKeyDown(e, handleNext)}
              className="flex-1 h-12 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold shadow-lg"
              disabled={!data.provider}
            >
              Next: Energy Consumption
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => {
    const range = getConsumptionRange();
    const savings = calculateSavings();
    
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl border-2 border-[#FFC107]">
        <CardHeader className="text-center bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <IndianRupee className="h-8 w-8 text-[#FFC107]" />
            <CardTitle className="text-3xl font-bold">Step 3: Energy Consumption</CardTitle>
          </div>
          <CardDescription className="text-gray-200 text-lg">
            {serviceType === 'ground-mounted' 
              ? 'Enter your required capacity in kW or MW'
              : 'Enter your monthly electricity bill amount'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 bg-gradient-to-br from-[#D4EDDA] to-white">
          <div className="space-y-8">
            {serviceType === 'ground-mounted' && (
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  onClick={() => updateData({ consumptionType: 'kw' })}
                  className={`px-6 py-3 ${
                    data.consumptionType === 'kw'
                      ? 'bg-[#FFC107] text-black'
                      : 'bg-white border-2 border-[#1A3C34] text-[#1A3C34]'
                  }`}
                >
                  kW (Kilowatt)
                </Button>
                <Button
                  onClick={() => updateData({ consumptionType: 'mw' })}
                  className={`px-6 py-3 ${
                    data.consumptionType === 'mw'
                      ? 'bg-[#FFC107] text-black'
                      : 'bg-white border-2 border-[#1A3C34] text-[#1A3C34]'
                  }`}
                >
                  MW (Megawatt)
                </Button>
              </div>
            )}

            <div className="space-y-4">
              <Label className="text-xl font-bold text-[#1A3C34] block">
                {serviceType === 'ground-mounted' 
                  ? `Capacity Required (${range.unit})`
                  : `Monthly Bill Amount (${range.unit})`
                }
              </Label>
              
              <div className="px-4">
                <Slider
                  value={[data.consumption]}
                  onValueChange={(value) => updateData({ consumption: value[0] })}
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  className="w-full"
                />
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-[#1A3C34] mb-2">
                  {range.unit}{data.consumption.toLocaleString()}
                </div>
                <div className="text-lg text-[#FF6200] font-semibold">
                  Estimated Monthly Savings: ₹{savings.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handlePrevious}
                onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
                variant="outline" 
                className="flex-1 h-12 border-2 border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNext}
                onKeyDown={(e) => handleKeyDown(e, handleNext)}
                className="flex-1 h-12 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold shadow-lg"
              >
                Next: Select Components
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {getServiceIcon()}
            <h1 className="text-4xl font-bold text-white">{getServiceTitle()}</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Complete solar installation process in 5 easy steps
          </p>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300 text-white border-white hover:bg-white hover:text-[#1A3C34]">
            ← Back to Services
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-4 font-bold ${
                  step <= currentStep
                    ? 'bg-[#FFC107] border-[#FFC107] text-black'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <Progress value={getProgressPercentage()} className="h-3 bg-white/20" />
          <div className="flex justify-between mt-2 text-sm text-white font-medium">
            <span>Contact</span>
            <span>Provider</span>
            <span>Consumption</span>
            <span>Components</span>
            <span>Booking</span>
          </div>
          <div className="text-center mt-2">
            <Badge className="bg-[#FFC107] text-black font-bold px-4 py-2">
              {Math.round(getProgressPercentage())}% Complete
            </Badge>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && (
            <EnhancedStep4 
              data={data} 
              updateData={updateData} 
              onNext={handleNext}
              onPrevious={handlePrevious}
              serviceType={serviceType}
            />
          )}
          {currentStep === 5 && (
            <PaymentBookingPage 
              data={data} 
              onBack={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FiveStepSolarInstallation;
