import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Zap, DollarSign, Sun, ChevronRight, Building, Factory, Mountain, Home, CheckCircle, Phone, ArrowLeft } from "lucide-react";
import { validatePhoneNumber, formatPhoneNumber } from '@/utils/phoneValidation';
import EnhancedStep4 from './solar-installation/EnhancedStep4';
import PaymentBookingPage from './solar-installation/PaymentBookingPage';

// [ELITE-K] IMPORT THE BRAIN
import { useFunnel } from "@/hooks/useFunnel";

interface InstallationData {
  pincode: string;
  phoneNumber: string;
  provider: string;
  customProvider?: string;
  consumption: number;
  consumptionType: 'bill' | 'kw' | 'mw';
  serviceType: 'residential' | 'commercial' | 'industrial' | 'ground-mounted';
  cityName?: string;
  // Step 4 Data
  selectedTechnology?: string;
  selectedBrand?: string;
  selectedInverter?: string;
}

interface FiveStepSolarInstallationProps {
  serviceType: 'residential' | 'commercial' | 'industrial' | 'ground-mounted';
  onBack: () => void;
}

const FiveStepSolarInstallation: React.FC<FiveStepSolarInstallationProps> = ({ serviceType, onBack }) => {
  const { state: funnelState } = useFunnel(); // Hook into the backend session
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidatingPincode, setIsValidatingPincode] = useState(false);
  const { toast } = useToast();

  // [SMART STATE] Initialize with LocalStorage if available (Persist across refreshes)
  const [data, setData] = useState<InstallationData>(() => {
    const saved = localStorage.getItem('solar_flow_data');
    const initial = saved ? JSON.parse(saved) : {};
    return {
      pincode: initial.pincode || '',
      phoneNumber: initial.phoneNumber || '',
      provider: initial.provider || '',
      consumption: initial.consumption || 200,
      consumptionType: initial.consumptionType || 'bill',
      serviceType: serviceType, // Always enforce prop serviceType
      cityName: initial.cityName || '',
      ...initial
    };
  });

  const [showCustomProvider, setShowCustomProvider] = useState(false);

  // [ELITE-K LOGIC] THE "SMART START" EFFECT
  // This decides exactly where the user should be based on what we know.
  useEffect(() => {
    const saved = localStorage.getItem('solar_flow_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // TREE OF THOUGHTS DECISION MATRIX:
      // 1. Do we have contact info?
      const hasContact = parsed.pincode?.length === 5 && parsed.phoneNumber?.length >= 10;
      
      // 2. Do we have a provider?
      const hasProvider = !!parsed.provider;

      // 3. Do we have usage info?
      const hasUsage = parsed.consumption > 0;

      if (hasContact && !hasProvider) {
         // Known User -> Force Provider Selection
         setCurrentStep(2); 
      } else if (hasContact && hasProvider && !hasUsage) {
         // Known Provider -> Force Usage Input
         setCurrentStep(3);
      } else if (hasContact && hasProvider && hasUsage) {
         // Ready for System Design (But don't skip Step 4 validation)
         setCurrentStep(4);
      } else {
         // New/Unknown -> Start at Step 1
         setCurrentStep(1);
      }
    }
  }, []); // Run once on mount

  // [PERSISTENCE] Save to local memory on every change
  useEffect(() => {
    localStorage.setItem('solar_flow_data', JSON.stringify(data));
  }, [data]);

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
        // Validate Zip (US 5 digits)
        if (!/^\d{5}$/.test(data.pincode)) {
          toast({ title: "Invalid Zip", description: "Enter 5-digit zip code", variant: "destructive" });
          return false;
        }
        // Validate Phone (10 digits)
        const cleanPhone = data.phoneNumber.replace(/\D/g, '');
        if (!/^\d{10}$/.test(cleanPhone)) {
          toast({ title: "Invalid Phone", description: "Enter 10-digit number", variant: "destructive" });
          return false;
        }

        // [REAL BACKEND SAVE]
        try {
            setIsValidatingPincode(true);
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            
            // 1. Capture Lead in DB
            await fetch(`${API_URL}/api/funnel/lead`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: cleanPhone,
                    pincode: data.pincode,
                    source: 'five_step_flow'
                })
            });

            // 2. Mock City Lookup (Replace with real API later)
            updateData({ cityName: 'Boston' });
            
            toast({ title: "Profile Verified", description: "Proceeding to energy analysis." });
            return true;
        } catch (e) {
            console.error(e);
            return true; // Allow proceed even if network glitched, to not block user
        } finally {
            setIsValidatingPincode(false);
        }

      case 2:
        if (!data.provider) {
          toast({ title: "Provider Required", description: "Who supplies your electricity?", variant: "destructive" });
          return false;
        }
        return true;
      
      case 3:
        if (data.consumption <= 0) {
          toast({ title: "Usage Required", description: "Please enter monthly bill or usage.", variant: "destructive" });
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

  const handleProviderSelection = (providerId: string) => {
    updateData({ provider: providerId });
    // UX: Small delay to show selection before moving
    setTimeout(() => {
      // Manually trigger next logic to ensure validation passes
      if (currentStep === 2) {
          setCurrentStep(3);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
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
    { id: 'eversource', name: 'Eversource', rate: '$0.28/kWh' },
    { id: 'nationalgrid', name: 'National Grid', rate: '$0.29/kWh' },
    { id: 'unitil', name: 'Unitil', rate: '$0.31/kWh' },
    { id: 'municipal', name: 'Municipal Light', rate: '$0.18/kWh' }
  ];

  // RENDER STEP 1
  const renderStep1 = () => (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 overflow-hidden rounded-2xl animate-fade-in">
      <CardHeader className="text-center bg-[#0F2F26] text-white py-8 relative">
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
            </div>
          </div>

          <Button 
            onClick={handleNext}
            className="w-full h-14 text-lg font-bold bg-[#FFC107] hover:bg-[#FFD54F] text-[#0F2F26] shadow-lg rounded-xl"
            disabled={!/^\d{5}$/.test(data.pincode) || !validatePhoneNumber(data.phoneNumber) || isValidatingPincode}
          >
            {isValidatingPincode ? 'Validating...' : 'Continue to Provider'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // RENDER STEP 2
  const renderStep2 = () => (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden rounded-2xl animate-fade-in">
      <CardHeader className="text-center bg-[#0F2F26] text-white py-8 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <CardTitle className="text-3xl font-bold tracking-tight relative z-10">Electricity Provider</CardTitle>
        <CardDescription className="text-gray-300 relative z-10">Select your current electricity distribution company</CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-10 bg-white">
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                onClick={() => handleProviderSelection(provider.id)}
                className={`h-auto py-6 px-4 border-2 rounded-xl flex flex-col items-center gap-3 ${
                  data.provider === provider.id
                    ? 'border-[#FFC107] bg-[#FFC107]/10 text-[#0F2F26]'
                    : 'border-gray-200 bg-white hover:border-[#FFC107] text-slate-600'
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
              </Button>
            ))}
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handlePrevious} variant="outline" className="flex-1 h-14 rounded-xl">Back</Button>
            <Button 
              onClick={handleNext}
              className="flex-1 h-14 font-bold bg-[#FFC107] text-[#0F2F26] rounded-xl"
              disabled={!data.provider}
            >
              Continue <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // RENDER STEP 3 (Usage)
  const renderStep3 = () => {
    const range = getConsumptionRange();
    const savings = calculateSavings();
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-2xl border-0 overflow-hidden rounded-2xl animate-fade-in">
        <CardHeader className="text-center bg-[#0F2F26] text-white py-8">
          <CardTitle className="text-3xl font-bold">Energy Consumption</CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-10 bg-white">
          <div className="space-y-10">
            <div className="text-center">
              <Label className="text-lg text-gray-500 block mb-2">Monthly Bill Amount</Label>
              <div className="text-5xl font-bold text-[#0F2F26]">{range.unit}{data.consumption.toLocaleString()}</div>
            </div>
            
            <div className="px-4 py-6 bg-gray-50 rounded-2xl border border-gray-100">
              <Slider
                value={[data.consumption]}
                onValueChange={(value) => updateData({ consumption: value[0] })}
                min={range.min} max={range.max} step={range.step}
                className="w-full cursor-pointer"
              />
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
              <div className="text-sm font-medium text-green-600 uppercase">Estimated Monthly Savings</div>
              <div className="text-3xl font-bold text-green-700">${savings.toLocaleString()}</div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handlePrevious} variant="outline" className="flex-1 h-14 rounded-xl">Back</Button>
              <Button onClick={handleNext} className="flex-1 h-14 font-bold bg-[#FFC107] text-[#0F2F26] rounded-xl">
                See Components <ChevronRight className="ml-2 h-5 w-5" />
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
        {/* Header & Progress (Kept clean for brevity, same as before) */}
        <div className="text-center mb-8 relative">
          <Button onClick={onBack} variant="ghost" className="absolute left-0 top-0 text-white/70 hidden md:flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" /> Back
          </Button>
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-4">
             <div className="text-[#FFC107]">{getServiceIcon()}</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{getServiceTitle()}</h1>
        </div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[#FFC107] -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            />
            <div className="relative flex justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className={`flex flex-col items-center gap-2 ${step <= currentStep ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 font-bold text-sm ${
                      step <= currentStep ? 'bg-[#FFC107] border-[#FFC107] text-[#0F2F26]' : 'bg-[#0F2F26] border-white/20 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  <span className="text-xs font-medium hidden sm:block text-[#FFC107]">
                    {['Contact', 'Provider', 'Usage', 'System', 'Book'][step - 1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Routing */}
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
            <PaymentBookingPage data={data} onBack={handlePrevious} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FiveStepSolarInstallation;