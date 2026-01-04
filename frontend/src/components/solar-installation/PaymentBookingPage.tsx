import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useFunnel } from "../../hooks/useFunnel";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { DocumentUpload } from "../DocumentUpload";
import { 
  CreditCard, 
  Upload, 
  Shield, 
  CheckCircle, 
  Sun,
  Calculator,
  Award,
  TrendingUp,
  Star,
  Gift,
  Smartphone,
  Building2,
  Banknote,
  ArrowLeft,
  Check
} from "lucide-react";

// Put your Public Key here (from Stripe Dashboard)
const stripePromise = loadStripe("pk_test_51Sk90F6f7qiXSMmaArxA3XIy9kYSIKmnWA4xRkCcZRFyN3e8jmp5MRF09gsvdiesrZstKFsqbxs0E1K3N52Dxz8300JQjGn6C1");

// INNER COMPONENT: The actual form
const CheckoutForm = ({ totalAmount }: { totalAmount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet.
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // 1. THE TRIGGER
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // [CRITICAL] This is the missing navigation link
        // It tells Stripe where to go after processing
        return_url: `${window.location.origin}/order-success`,
      },
    });

    // 2. ERROR HANDLING
    // If we get here, it means the payment failed immediately or required more actions.
    // (If it succeeded, Stripe would have already redirected the page)
    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    } else {
      // This block is rarely reached because of the redirect above
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <Button 
        type="submit" 
        className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-bold"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay $${totalAmount.toLocaleString()}`}
      </Button>
    </form>
  );
};

interface PaymentBookingPageProps {
  data: any;
  onBack: () => void;
}

const PaymentBookingPage: React.FC<PaymentBookingPageProps> = ({ data, onBack }) => {
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: boolean}>({});
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [bookingProgress, setBookingProgress] = useState(90);
  const [showEMIGuide, setShowEMIGuide] = useState(false);
  const [liveBookings, setLiveBookings] = useState(12);
  const [cachedPlan, setCachedPlan] = useState<any>(null);
  const [cachedCategory, setCachedCategory] = useState<any>(null);
  const { toast } = useToast();
  const { state, saveDocument, selectPaymentMethod } = useFunnel();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // 1. Get the Client Secret when user is ready to pay
  const handleInitiatePayment = async () => {
    if (!state?.sessionId) {
      toast({
        title: "Session Error",
        description: "No active session found. Please restart the process.",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedPayment) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to proceed",
        variant: "destructive"
      });
      return;
    }

    // Only proceed with Stripe for Card payments for now, or generic
    // For this demo, we'll assume "card" or any selection triggers Stripe
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/funnel/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: state.sessionId })
      });
      const data = await res.json();
      if (data.success) {
        setClientSecret(data.clientSecret);
        setBookingProgress(100); // Move progress to 100% as we enter payment
      } else {
        toast({
          title: "Payment Error",
          description: data.error || "Could not initiate payment",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error("Payment Start Error", err);
      toast({
        title: "Network Error",
        description: "Failed to connect to payment server",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(Math.floor(Math.random() * 20) + 8);
    }, 5000);

    // Retrieve cached selections
    const savedPlan = localStorage.getItem('selectedSolarPlan');
    const savedCategory = localStorage.getItem('selectedSolarCategory');
    
    if (savedPlan) setCachedPlan(JSON.parse(savedPlan));
    if (savedCategory) setCachedCategory(JSON.parse(savedCategory));

    return () => clearInterval(interval);
  }, []);

  const requiredDocuments = [
    { id: 'state-id', name: 'State ID / Driver\'s License', required: true, icon: '🆔' },
    { id: 'ssn', name: 'SSN (Last 4 Digits)', required: true, icon: '�' },
    { id: 'utility-bill', name: 'Utility Bill', required: true, icon: '⚡' },
    { id: 'property-tax', name: 'Property Tax Bill', required: false, icon: '🏠' },
    { id: 'voided-check', name: 'Voided Check', required: true, icon: '🏦' },
    { id: 'rooftop-photos', name: 'Rooftop Photos', required: true, icon: '📸' },
  ];

  const solarPlans = [
    {
      id: 'basic',
      name: 'Basic (4 kW)',
      range: '$12,000 - $15,000',
      subtitle: 'Post-incentive price',
      features: ['4 kW capacity', 'Net metering', 'Federal Tax Credit (30%)', 'ROI in 5-6 years'],
      savings: '$150/month',
      emi: '$200/month'
    },
    {
      id: 'standard',
      name: 'Standard (8 kW)',
      range: '$18,000 - $24,000',
      subtitle: 'Post-incentive price',
      features: ['8 kW capacity', 'Reduce costs by 90%', 'Tax benefits', 'Green certification'],
      popular: true,
      savings: '$300/month',
      emi: '$350/month'
    },
    {
      id: 'premium',
      name: 'Premium (12 kW)',
      range: '$30,000 - $45,000',
      subtitle: 'Post-incentive price',
      features: ['12 kW capacity', 'Maximum savings', 'Premium components', 'Extended warranty'],
      savings: '$450/month',
      emi: '$500/month'
    }
  ];

  const paymentOptions = [
    { 
      id: 'ach', 
      name: 'ACH Transfer', 
      icon: <Building2 className="h-8 w-8" />, 
      description: 'Direct bank transfer',
      discount: 'No fees',
      popular: true
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card', 
      icon: <CreditCard className="h-8 w-8" />, 
      description: 'Visa, Mastercard, Amex',
      discount: '1% cashback'
    },
    { 
      id: 'zelle', 
      name: 'Zelle / Venmo', 
      icon: <Smartphone className="h-8 w-8" />, 
      description: 'Instant mobile payment',
      discount: 'Fast processing'
    },
    { 
      id: 'loan', 
      name: 'Solar Loan', 
      icon: <Banknote className="h-8 w-8" />, 
      description: 'Low interest financing',
      discount: 'No money down',
      special: true
    }
  ];

  const bankPartners = [
    { name: 'Chase', rate: '5.99%', processing: 'Free' },
    { name: 'Bank of America', rate: '6.25%', processing: '$100' },
    { name: 'Wells Fargo', rate: '6.50%', processing: '$150' },
    { name: 'Citi', rate: '6.75%', processing: '$200' }
  ];

  const handleDocumentUpload = (docId: string) => {
    setUploadedDocs(prev => ({ ...prev, [docId]: true }));
    const newProgress = Math.min(bookingProgress + 2, 98);
    setBookingProgress(newProgress);
    toast({
      title: "Document Uploaded",
      description: "File uploaded successfully.",
    });
  };

  const handleConfirmBooking = () => {
    if (!selectedPayment) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to proceed",
        variant: "destructive"
      });
      return;
    }

    setBookingProgress(100);
    toast({
      title: "Booking Confirmed!",
      description: "Survey will be scheduled in 3 days.",
    });
  };

  const completedDocs = Object.values(uploadedDocs).filter(Boolean).length;
  const totalDocs = requiredDocuments.length;

  return (
    <div className="min-h-screen bg-[#0F2F26] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack} 
              variant="ghost" 
              className="text-slate-600 hover:text-[#0F2F26] hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="bg-[#0F2F26] p-2 rounded-lg">
                <Sun className="h-5 w-5 text-[#FFC107]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#0F2F26] leading-none">Solar Panda</h1>
                <p className="text-xs text-slate-500">Booking & Payment</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-red-50 text-red-600 border-red-100 hidden md:flex">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              {liveBookings} people booking
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Progress Section */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0F2F26]">Final Step</h2>
              <p className="text-[#0F2F26] font-medium">Complete your booking to secure your solar installation slot.</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-[#FFC107]">{bookingProgress}%</span>
              <p className="text-xs text-[#0F2F26] font-bold uppercase tracking-wide">Completed</p>
            </div>
          </div>
          <Progress value={bookingProgress} className="h-3 bg-gray-100 [&>div]:bg-[#FFC107]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Order Summary Card - NEW SECTION */}
            {(cachedPlan || cachedCategory) && (
              <Card className="border-blue-100 shadow-sm">
                <CardHeader className="bg-blue-50/50 pb-4">
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <CheckCircle className="h-5 w-5" />
                    Your Solar Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* 1. PLAN DETAILS (From Session State or Cache) */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-700">Selected Plan</h3>
                      <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-lg text-blue-700">
                             {state?.selection?.systemType ? state.selection.systemType.replace('_', ' ').toUpperCase() : (cachedPlan?.name || 'Standard System')}
                          </span>
                          <Badge variant="secondary">{cachedPlan?.capacity || 'Capacity TBD'}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                          <TrendingUp className="h-3 w-3" />
                          {cachedPlan?.savings || 'High Efficiency'}
                        </div>
                      </div>
                    </div>

                    {/* 2. [NEW] HARDWARE SELECTION (The Missing Piece) */}
                    {state?.selection?.hardware && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-700">Hardware Configuration</h3>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm space-y-2">
                          
                          {/* Panel Tech */}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Technology:</span>
                            <span className="font-bold text-[#0F2F26] capitalize">
                              {state.selection.hardware.panelTechnology?.replace('-', ' ') || 'Standard'}
                            </span>
                          </div>

                          {/* Panel Brand */}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Panel Brand:</span>
                            <span className="font-bold text-[#0F2F26] capitalize">
                              {state.selection.hardware.panelBrand || 'Tier-1 Brand'}
                            </span>
                          </div>

                          {/* Inverter */}
                          <div className="flex justify-between text-sm border-t border-dashed pt-2 mt-2">
                            <span className="text-gray-500">Inverter:</span>
                            <span className="font-bold text-[#FFC107] capitalize">
                              {state.selection.hardware.inverterBrand || 'Smart Inverter'}
                            </span>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* 3. STRUCTURE DETAILS (Keep existing logic) */}
                    {cachedCategory && (
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-700">Installation Type</h3>
                        <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-lg text-green-700">{cachedCategory.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{cachedCategory.description}</p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            {cachedCategory.features?.slice(0, 2).map((f: string, i: number) => (
                              <li key={i} className="flex items-center gap-1">
                                <Check className="h-3 w-3 text-green-500" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 4. FINANCIAL BREAKDOWN (The Backend Calculator) */}
                  {state && state.finalQuote && (
                    <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>System Base Price</span>
                        <span>${state.selection.basePrice?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-orange-600">
                        <span>Structure Surcharge</span>
                        <span>+ ${state.selection.structureSurcharge?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>GST / Tax (5%)</span>
                        <span>${state.finalQuote.gstAmount?.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
                        <div className="text-sm font-medium text-gray-700">Total To Pay</div>
                        <div className="text-xl font-bold text-emerald-700">
                          ${state.finalQuote.finalTotal?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Investment Summary */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <Calculator className="h-5 w-5 text-[#0F2F26]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-[#0F2F26]">Investment Summary</CardTitle>
                    <CardDescription>Based on your selection: {data?.selectedTechnology || 'TOPCon'}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {solarPlans.map((plan) => (
                    <div 
                      key={plan.id} 
                      className={`relative rounded-xl border-2 p-4 transition-all ${
                        plan.popular 
                        ? 'border-[#FFC107] bg-[#0F2F26]' 
                        : 'border-gray-600 bg-[#0F2F26] hover:border-gray-500'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFC107] text-[#0F2F26] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          BEST VALUE
                        </div>
                      )}
                      <h4 className="font-bold text-white mb-1">{plan.name}</h4>
                      <p className="text-lg font-extrabold text-white mb-2">{plan.range}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-gray-300">Savings</span>
                          <span className="font-bold text-green-400">{plan.savings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="font-bold text-gray-300">EMI</span>
                          <span className="font-bold text-blue-400">{plan.emi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0F2F26] rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-5 w-5 text-green-400" />
                      <h4 className="font-bold text-white">Federal Tax Credit</h4>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">Estimated Tax Credit (30%)</p>
                    <p className="text-2xl font-bold text-green-400">$9,000</p>
                    <p className="text-xs text-gray-400 mt-2">Claim on your next tax return</p>
                  </div>
                  <div className="bg-[#0F2F26] rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                      <h4 className="font-bold text-white">ROI Projection</h4>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Payback Period</p>
                        <p className="text-2xl font-bold text-purple-400">5.5 Years</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300 mb-1">25yr Savings</p>
                        <p className="text-lg font-bold text-purple-400">$50,000</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <Upload className="h-5 w-5 text-[#0F2F26]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-[#0F2F26]">Required Documents</CardTitle>
                      <CardDescription>Upload for instant approval</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* REAL FUNCTIONAL UPLOADS */}
                  <DocumentUpload 
                    label="Driver's License / State ID" 
                    sessionId={state?.sessionId}
                    onUploadComplete={(key) => {
                      setUploadedDocs(prev => ({...prev, 'state-id': true}));
                      saveDocument('state-id', key);
                    }}
                  />
                  <DocumentUpload 
                    label="Utility Bill (Latest)" 
                    docType="utility-bill"
                    sessionId={state?.sessionId}
                    onUploadComplete={(key) => {
                      setUploadedDocs(prev => ({...prev, 'utility-bill': true}));
                      saveDocument('utility-bill', key);
                    }}
                    onDeleteComplete={() => {
                      setUploadedDocs(prev => ({...prev, 'utility-bill': false}));
                    }}
                  />
                  <DocumentUpload 
                    label="Property Tax Receipt" 
                    docType="property-tax"
                    sessionId={state?.sessionId}
                    onUploadComplete={(key) => {
                      setUploadedDocs(prev => ({...prev, 'property-tax': true}));
                      saveDocument('property-tax', key);
                    }}
                    onDeleteComplete={() => {
                      setUploadedDocs(prev => ({...prev, 'property-tax': false}));
                    }}
                  />
                  <DocumentUpload 
                    label="Rooftop Photos" 
                    docType="rooftop-photos"
                    sessionId={state?.sessionId}
                    onUploadComplete={(key) => {
                      setUploadedDocs(prev => ({...prev, 'rooftop-photos': true}));
                      saveDocument('rooftop-photos', key);
                    }}
                    onDeleteComplete={() => {
                      setUploadedDocs(prev => ({...prev, 'rooftop-photos': false}));
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <CreditCard className="h-5 w-5 text-[#0F2F26]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-[#0F2F26]">Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment option</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {paymentOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => {
                        setSelectedPayment(option.id);
                        selectPaymentMethod(option.id);
                      }}
                      className={`
                        relative cursor-pointer rounded-xl border-2 p-4 transition-all
                        ${selectedPayment === option.id
                          ? 'border-[#FFC107] bg-[#0F2F26] ring-1 ring-[#FFC107]'
                          : 'border-gray-600 bg-[#0F2F26] hover:border-[#FFC107] hover:bg-[#1A3C34]'
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg bg-white/10 shadow-sm text-[#FFC107]`}>
                          {option.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{option.name}</h4>
                          <p className="text-xs font-bold text-gray-300 mt-1">{option.description}</p>
                          {option.discount && (
                            <Badge variant="secondary" className="mt-2 bg-green-900/50 text-green-400 border border-green-800">
                              {option.discount}
                            </Badge>
                          )}
                        </div>
                        {selectedPayment === option.id && (
                          <div className="absolute top-4 right-4">
                            <div className="h-5 w-5 bg-[#FFC107] rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-black" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* EMI Banner */}
                <div className="bg-gradient-to-r from-[#0F2F26] to-[#0A201B] rounded-xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-[#FFC107]">$0 Down Solar Loans</h4>
                        <p className="text-white font-medium text-sm max-w-md">
                          Replace your electric bill with a lower solar payment. Own your system for less than you pay the utility company!
                        </p>
                      </div>
                      <Button 
                        onClick={() => setShowEMIGuide(true)}
                        className="bg-white text-[#0F2F26] hover:bg-gray-100 font-bold whitespace-nowrap"
                      >
                        Check Eligibility
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Plan Summary */}
            {cachedPlan && (
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="pb-2 border-b border-gray-100">
                  <CardTitle className="text-base font-bold text-[#0F2F26]">Selected Plan</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">System Size</span>
                    <span className="text-sm font-bold text-[#0F2F26]">{cachedPlan.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Plan Type</span>
                    <span className="text-sm font-bold text-[#0F2F26]">{cachedPlan.name}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-base font-bold text-[#0F2F26]">Total Cost</span>
                    <span className="text-base font-bold text-[#FFC107]">{cachedPlan.price}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trust Card */}
            <Card className="border-0 shadow-sm bg-[#0F2F26]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-white">Why Solar Panda?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-green-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-white">25-Year Warranty</p>
                    <p className="text-xs text-gray-400">Performance guarantee on panels</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Award className="h-5 w-5 text-[#FFC107] shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-white">Top Rated Partner</p>
                    <p className="text-xs text-gray-400">#1 Solar installer in Boston</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Star className="h-5 w-5 text-purple-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-white">Premium Components</p>
                    <p className="text-xs text-gray-400">Tier-1 brands only</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-0 shadow-sm bg-[#0F2F26]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold text-white">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4 border-l-2 border-gray-600 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-[#FFC107] ring-4 ring-[#0F2F26]"></div>
                    <p className="text-sm font-bold text-white">Site Survey</p>
                    <p className="text-xs text-gray-400">Within 48 hours</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-gray-600 ring-4 ring-[#0F2F26]"></div>
                    <p className="text-sm font-bold text-gray-400">Design & Approval</p>
                    <p className="text-xs text-gray-500">3-5 days</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-0 h-3 w-3 rounded-full bg-gray-600 ring-4 ring-[#0F2F26]"></div>
                    <p className="text-sm font-bold text-gray-400">Installation</p>
                    <p className="text-xs text-gray-500">1 day process</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Button / Stripe Payment */}
            <div className="sticky top-24">
              {!clientSecret ? (
                <>
                  <Button 
                    onClick={handleInitiatePayment}
                    disabled={!selectedPayment}
                    className="w-full h-14 text-lg font-bold bg-[#FFC107] hover:bg-[#FFD54F] text-[#0F2F26] shadow-lg hover:shadow-xl transition-all"
                  >
                    Proceed to Secure Payment
                  </Button>
                  <p className="text-xs text-center text-white/60 mt-3">
                    By confirming, you agree to our terms of service
                  </p>
                </>
              ) : (
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="pb-2 bg-emerald-50 rounded-t-xl">
                    <CardTitle className="text-base font-bold text-emerald-800 flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Secure Checkout
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm totalAmount={state?.finalQuote?.finalTotal || 0} />
                    </Elements>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* EMI Modal */}
      {showEMIGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl bg-[#0F2F26] border-gray-600">
            <CardHeader className="bg-[#0F2F26] text-white border-b border-gray-600">
              <div className="flex justify-between items-center">
                <CardTitle>EMI & Loan Options</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowEMIGuide(false)} className="text-white hover:bg-white/10">
                  <span className="text-xl">×</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <h4 className="font-bold text-white mb-4">Partner Banks</h4>
              <div className="space-y-3 mb-6">
                {bankPartners.map((bank) => (
                  <div key={bank.name} className="flex items-center justify-between p-3 bg-[#1A3C34] rounded-lg border border-gray-600">
                    <span className="font-bold text-white">{bank.name}</span>
                    <div className="text-right">
                      <span className="block text-sm font-bold text-green-400">{bank.rate} Interest</span>
                      <span className="text-xs text-gray-400">Proc. Fee: {bank.processing}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={() => setShowEMIGuide(false)} className="w-full bg-white text-[#0F2F26] hover:bg-gray-200 font-bold">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentBookingPage;
