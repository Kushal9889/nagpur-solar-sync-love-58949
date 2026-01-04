import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Zap, DollarSign, Sun, Calculator, ChevronRight, Building, Factory, Mountain, Home, Star, CheckCircle, Phone, ArrowLeft } from "lucide-react";
import { validatePhoneNumber, formatPhoneNumber } from '@/utils/phoneValidation';
import { validatePincode } from '@/utils/pincodeValidation';
import EnhancedStep4 from './solar-installation/EnhancedStep4';
import PaymentBookingPage from './solar-installation/PaymentBookingPage';
import { useFunnel } from "@/hooks/useFunnel";

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
  const { state } = useFunnel(); // Get backend state

  // [NEW] HYDRATION EFFECT
  // If backend says we are on Step 4, Jump to Step 4 automatically.
  useEffect(() => {
    if (state && state.stepCompleted > 0) {
      // If we haven't manually moved yet, sync with backend
      // But only jump forward, never force backward if they are exploring
      if (currentStep < state.stepCompleted + 1) {
         setCurrentStep(state.stepCompleted + 1);
      }
    }
  }, [state]); 

  const [data, setData] = useState<InstallationData>({
    pincode: '',
    phoneNumber: '',
    provider: '',
    consumption: 200,
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
        // Validate pincode (US Zip Code - 5 digits)
        if (!/^\d{5}$/.test(data.pincode)) {
          toast({
            title: "Invalid Zip Code",
            description: "Please enter a valid 5-digit zip code",
            variant: "destructive"
          });
          return false;
        }

        // Validate phone number (US - 10 digits)
        if (!/^\d{10}$/.test(data.phoneNumber.replace(/\D/g, ''))) {
          toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid 10-digit phone number",
            variant: "destructive"
          });
          return false;
        }

        // Validate pincode with API
        setIsValidatingPincode(true);
        // Mock validation for US context
        const pincodeValidation = { isValid: true, data: { city: 'Boston', state: 'MA' }, error: null };
        setIsValidatingPincode(false);

        if (!pincodeValidation.isValid) {
          toast({
            title: "Invalid Zip Code",
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
      case 'residential': return { min: 50, max: 1000, step: 10, unit: '$' };
      case 'commercial': return { min: 500, max: 10000, step: 100, unit: '$' };
      case 'industrial': return { min: 2000, max: 50000, step: 500, unit: '$' };
      case 'ground-mounted': return { min: 1, max: 100, step: 0.5, unit: data.consumptionType === 'mw' ? 'MW' : 'kW' };
    }
  };

  const calculateSavings = () => {
    const { consumption } = data;
    const savingsRate = serviceType === 'residential' ? 0.9 : serviceType === 'commercial' ? 0.85 : 0.8;
    return Math.round(consumption * savingsRate);
  };

  const providers = [
    {
      id: 'eversource',
      name: 'Eversource',
      rate: '$0.28/kWh',
      logo: '/uploads/eversource-logo.png'
    },
    {
      id: 'nationalgrid',
      name: 'National Grid',
      rate: '$0.29/kWh',
      logo: '/uploads/nationalgrid-logo.png'
    },
    {
      id: 'unitil',
      name: 'Unitil',
      rate: '$0.31/kWh',
      logo: '/uploads/unitil-logo.png'
    },
    {
      id: 'municipal',
      name: 'Municipal Light',
      rate: '$0.18/kWh',
      logo: '/uploads/municipal-logo.png'
    }
  ];

  const renderStep1 = () => (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 overflow-hidden rounded-2xl">
      <CardHeader className="text-center bg-[#0F2F26] text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
            <MapPin className="h-8 w-8 text-[#FFC107]" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight relative z-10">Contact Details</CardTitle>
        <CardDescription className="text-gray-300 text-lg mt-2 relative z-10">
          We need your location to calculate solar potential
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-10 bg-white">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label htmlFor="pincode" className="text-base font-semibold text-gray-900">
                Zip Code <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <Input
                  id="pincode"
                  type="text"
                  placeholder="e.g. 440001"
                  value={data.pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                    updateData({ pincode: value });
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="h-14 text-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0F2F26] focus:ring-2 focus:ring-[#0F2F26]/20 transition-all rounded-xl"
                  maxLength={6}
                />
                {data.cityName && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-green-700 text-sm font-medium bg-green-100 px-3 py-1 rounded-full animate-fade-in">
                    <CheckCircle className="h-3 w-3" />
                    {data.cityName}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base font-semibold text-gray-900">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0F2F26] transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="98765 43210"
                  value={data.phoneNumber}
                  onChange={(e) => {
                    const value = formatPhoneNumber(e.target.value);
                    updateData({ phoneNumber: value });
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="h-14 text-lg pl-12 border-gray-200 bg-gray-50 focus:bg-white focus:border-[#0F2F26] focus:ring-2 focus:ring-[#0F2F26]/20 transition-all rounded-xl"
                  maxLength={10}
                />
              </div>
              {data.phoneNumber && validatePhoneNumber(data.phoneNumber) && (
                <p className="text-sm text-green-600 mt-2 font-medium flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Valid phone number
                </p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-[#0F2F26] mb-4 flex items-center gap-2 text-lg">
              <div className="p-2 bg-amber-100 rounded-full">
                <Sun className="h-5 w-5 text-amber-600" />
              </div>
              Solar Potential in Your Area
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="font-bold text-slate-800">Boston Region</span>
                <span className="font-extrabold text-[#0F2F26]">4.5 kWh/m²/day</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="font-bold text-slate-800">Massachusetts</span>
                <span className="font-extrabold text-[#0F2F26]">4.2 kWh/m²/day</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="font-bold text-slate-800">Sunny Days</span>
                <span className="font-extrabold text-[#0F2F26]">200+ days/year</span>
              </div>
              <div className="flex justify-between items-center border-b border-amber-100 pb-2">
                <span className="font-bold text-slate-800">Peak Generation</span>
                <span className="font-extrabold text-[#0F2F26]">May-August</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleNext}
            onKeyDown={(e) => handleKeyDown(e, handleNext)}
            className="w-full h-14 text-lg font-bold bg-[#FFC107] hover:bg-[#FFD54F] text-[#0F2F26] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
            disabled={!/^\d{6}$/.test(data.pincode) || !validatePhoneNumber(data.phoneNumber) || isValidatingPincode}
          >
            {isValidatingPincode ? 'Validating Location...' : 'Continue to Provider'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden rounded-2xl">
      <CardHeader className="text-center bg-[#0F2F26] text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
            <Zap className="h-8 w-8 text-[#FFC107]" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight relative z-10">Electricity Provider</CardTitle>
        <CardDescription className="text-gray-300 text-lg mt-2 relative z-10">
          Select your current electricity distribution company
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-10 bg-white">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                onClick={() => handleProviderSelection(provider.id)}
                onKeyDown={(e) => handleKeyDown(e, () => handleProviderSelection(provider.id))}
                className={`h-auto py-6 px-4 border-2 rounded-xl transition-all duration-300 flex flex-col items-center gap-3 hover:-translate-y-1 ${
                  data.provider === provider.id
                    ? 'border-[#FFC107] bg-[#FFC107]/10 text-[#0F2F26] shadow-md ring-1 ring-[#FFC107]'
                    : 'border-gray-200 bg-white hover:border-[#FFC107] hover:bg-gray-50 text-slate-600'
                }`}
                variant="ghost"
              >
                <div className={`p-3 rounded-full ${data.provider === provider.id ? 'bg-[#FFC107]' : 'bg-gray-100'}`}>
                  <Zap className={`h-6 w-6 ${data.provider === provider.id ? 'text-[#0F2F26]' : 'text-gray-400'}`} />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{provider.name}</div>
                  <div className="text-sm font-medium text-amber-600 mt-1">{provider.rate}</div>
                </div>
                {data.provider === provider.id && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </Button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500 font-medium">Or select other</span>
            </div>
          </div>

          <div className="text-center">
            {!showCustomProvider ? (
              <Button
                onClick={() => setShowCustomProvider(true)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowCustomProvider(true))}
                variant="outline"
                className="border-2 border-gray-200 text-gray-600 hover:border-[#0F2F26] hover:text-[#0F2F26] h-12 px-8 rounded-xl"
              >
                Other Provider
              </Button>
            ) : (
              <div className="max-w-md mx-auto p-6 border border-amber-200 rounded-xl bg-amber-50/50 animate-fade-in">
                <Label className="text-base font-semibold text-[#0F2F26] mb-3 block text-left">
                  Enter Provider Name
                </Label>
                <Input
                  placeholder="Enter your electricity provider"
                  value={data.customProvider || ''}
                  onChange={(e) => updateData({ customProvider: e.target.value, provider: 'custom' })}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  className="h-12 border-amber-200 focus:border-[#0F2F26] focus:ring-[#0F2F26] bg-white"
                  autoFocus
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handlePrevious}
              onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
              variant="outline" 
              className="flex-1 h-14 text-lg font-medium border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#0F2F26] rounded-xl"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              onKeyDown={(e) => handleKeyDown(e, handleNext)}
              className="flex-1 h-14 text-lg font-bold bg-[#FFC107] hover:bg-[#FFD54F] text-[#0F2F26] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
              disabled={!data.provider}
            >
              Continue
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
      <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 overflow-hidden rounded-2xl">
        <CardHeader className="text-center bg-[#0F2F26] text-white py-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-center gap-3 mb-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              <DollarSign className="h-8 w-8 text-[#FFC107]" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight relative z-10">Energy Consumption</CardTitle>
          <CardDescription className="text-gray-300 text-lg mt-2 relative z-10">
            {serviceType === 'ground-mounted' 
              ? 'Enter your required capacity in kW or MW'
              : 'Enter your monthly electricity bill amount'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-10 bg-white">
          <div className="space-y-10">
            {serviceType === 'ground-mounted' && (
              <div className="flex justify-center gap-4 mb-6 p-1 bg-gray-100 rounded-xl w-fit mx-auto">
                <Button
                  onClick={() => updateData({ consumptionType: 'kw' })}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    data.consumptionType === 'kw'
                      ? 'bg-white text-[#0F2F26] shadow-sm font-bold'
                      : 'bg-transparent text-gray-500 hover:text-[#0F2F26]'
                  }`}
                  variant="ghost"
                >
                  kW (Kilowatt)
                </Button>
                <Button
                  onClick={() => updateData({ consumptionType: 'mw' })}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    data.consumptionType === 'mw'
                      ? 'bg-white text-[#0F2F26] shadow-sm font-bold'
                      : 'bg-transparent text-gray-500 hover:text-[#0F2F26]'
                  }`}
                  variant="ghost"
                >
                  MW (Megawatt)
                </Button>
              </div>
            )}

            <div className="space-y-8">
              <div className="text-center">
                <Label className="text-lg font-medium text-gray-500 block mb-2">
                  {serviceType === 'ground-mounted' 
                    ? `Capacity Required`
                    : `Monthly Bill Amount`
                  }
                </Label>
                <div className="text-5xl font-bold text-[#0F2F26] tracking-tight">
                  {range.unit}{data.consumption.toLocaleString()}
                </div>
              </div>
              
              <div className="px-4 py-6 bg-gray-50 rounded-2xl border border-gray-100">
                <Slider
                  value={[data.consumption]}
                  onValueChange={(value) => updateData({ consumption: value[0] })}
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between mt-4 text-sm text-gray-400 font-medium">
                  <span>{range.unit}{range.min.toLocaleString()}</span>
                  <span>{range.unit}{range.max.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
                <div className="text-sm font-medium text-green-600 uppercase tracking-wide mb-1">Estimated Monthly Savings</div>
                <div className="text-3xl font-bold text-green-700">
                  ${savings.toLocaleString()}
                </div>
                <p className="text-xs text-green-600/80 mt-2">Based on average solar generation in your area</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handlePrevious}
                onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
                variant="outline" 
                className="flex-1 h-14 text-lg font-medium border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#0F2F26] rounded-xl"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                onKeyDown={(e) => handleKeyDown(e, handleNext)}
                className="flex-1 h-14 text-lg font-bold bg-[#FFC107] hover:bg-[#FFD54F] text-[#0F2F26] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
              >
                See Components
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F2F26] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="absolute left-0 top-0 text-white/70 hover:text-white hover:bg-white/10 hidden md:flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full backdrop-blur-sm mb-6 border border-white/10">
            <div className="text-[#FFC107]">
              {getServiceIcon()}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{getServiceTitle()}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Complete your solar installation journey in 5 simple steps
          </p>
        </div>

        {/* Mobile Back Button */}
        <div className="md:hidden mb-8">
          <Button onClick={onBack} variant="outline" className="w-full text-white border-white/20 bg-white/5 hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[#FFC107] -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
            <div className="relative flex justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-4 font-bold text-sm transition-all duration-300 ${
                      step <= currentStep
                        ? 'bg-[#FFC107] border-[#FFC107] text-[#0F2F26] scale-110 shadow-lg shadow-[#FFC107]/20'
                        : 'bg-[#0F2F26] border-white/20 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block transition-colors duration-300 ${
                    step <= currentStep ? 'text-[#FFC107]' : 'text-gray-500'
                  }`}>
                    {['Contact', 'Provider', 'Usage', 'System', 'Book'][step - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="transition-all duration-500 ease-in-out">
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