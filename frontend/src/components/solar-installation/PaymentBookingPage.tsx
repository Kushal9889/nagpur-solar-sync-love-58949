
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(Math.floor(Math.random() * 20) + 8);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const requiredDocuments = [
    { id: 'aadhaar', name: 'Aadhaar Card', required: true, icon: '🆔' },
    { id: 'pan', name: 'PAN Card', required: true, icon: '📄' },
    { id: 'electricity-bill', name: 'Electricity Bill', required: true, icon: '⚡' },
    { id: 'house-tax', name: 'House Tax Receipt', required: false, icon: '🏠' },
    { id: 'bank-passbook', name: 'Bank Passbook', required: true, icon: '🏦' },
    { id: 'rooftop-photos', name: 'Rooftop Photos', required: true, icon: '📸' },
  ];

  const solarPlans = [
    {
      id: 'basic',
      name: 'Basic (1-2 kW)',
      range: '₹30,000 - ₹1,00,000',
      subtitle: 'Post-subsidy price',
      features: ['1-2 kW capacity', 'Net metering', 'Government subsidies', 'ROI in 3-4 years'],
      savings: '₹1,800/month',
      emi: '₹2,500/month'
    },
    {
      id: 'standard',
      name: 'Standard (3-5 kW)',
      range: '₹60,000 - ₹1,62,000',
      subtitle: 'Post-subsidy price',
      features: ['3-5 kW capacity', 'Reduce costs by 80%', 'Tax benefits', 'Green certification'],
      popular: true,
      savings: '₹3,200/month',
      emi: '₹4,200/month'
    },
    {
      id: 'premium',
      name: 'Premium (6-10 kW)',
      range: '₹1,02,000 - ₹3,22,000',
      subtitle: 'Post-subsidy price',
      features: ['6-10 kW capacity', 'Maximum savings', 'Premium components', 'Extended warranty'],
      savings: '₹5,500/month',
      emi: '₹7,800/month'
    }
  ];

  const paymentOptions = [
    { 
      id: 'upi', 
      name: 'UPI Payment', 
      icon: <Smartphone className="h-8 w-8" />, 
      description: 'Paytm, Google Pay, PhonePe',
      discount: '2% cashback',
      popular: true
    },
    { 
      id: 'card', 
      name: 'Card Payment', 
      icon: <CreditCard className="h-8 w-8" />, 
      description: 'Visa, Mastercard, RuPay',
      discount: '1% cashback'
    },
    { 
      id: 'netbanking', 
      name: 'Net Banking', 
      icon: <Building2 className="h-8 w-8" />, 
      description: 'All major banks supported',
      discount: 'Instant processing'
    },
    { 
      id: 'emi', 
      name: 'EMI Options', 
      icon: <Banknote className="h-8 w-8" />, 
      description: 'Pay as per your electricity bill',
      discount: 'No processing fee',
      special: true
    }
  ];

  const bankPartners = [
    { name: 'SBI', rate: '10.5%', processing: 'Free' },
    { name: 'HDFC', rate: '11.2%', processing: '₹500' },
    { name: 'ICICI', rate: '11.8%', processing: '₹750' },
    { name: 'Axis Bank', rate: '12.1%', processing: '₹1000' }
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
                      <h4 className="font-bold text-white">Subsidy Benefit</h4>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">Estimated Subsidy Amount</p>
                    <p className="text-2xl font-bold text-green-400">₹65,000</p>
                    <p className="text-xs text-gray-400 mt-2">Direct bank transfer within 30-90 days</p>
                  </div>
                  <div className="bg-[#0F2F26] rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                      <h4 className="font-bold text-white">ROI Projection</h4>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-300 mb-1">Payback Period</p>
                        <p className="text-2xl font-bold text-purple-400">3.5 Years</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300 mb-1">25yr Savings</p>
                        <p className="text-lg font-bold text-purple-400">₹12.5L</p>
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
                      <CardDescription>Upload for instant approval ({completedDocs}/{totalDocs})</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requiredDocuments.map((doc) => (
                    <div 
                      key={doc.id}
                      onClick={() => handleDocumentUpload(doc.id)}
                      className={`
                        relative group cursor-pointer rounded-xl border-2 border-dashed p-4 transition-all
                        ${uploadedDocs[doc.id] 
                          ? 'border-green-500 bg-green-900/20' 
                          : 'border-gray-600 bg-[#0F2F26] hover:border-[#FFC107] hover:bg-[#1A3C34]'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          p-2 rounded-lg text-xl
                          ${uploadedDocs[doc.id] ? 'bg-green-100' : 'bg-white/10 shadow-sm'}
                        `}>
                          {doc.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-white">{doc.name}</h5>
                            {uploadedDocs[doc.id] && <CheckCircle className="h-5 w-5 text-green-500" />}
                          </div>
                          <p className="text-xs font-bold text-gray-300 mt-1">
                            {uploadedDocs[doc.id] ? 'Uploaded successfully' : (doc.required ? 'Required document' : 'Optional')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      onClick={() => setSelectedPayment(option.id)}
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
                        <h4 className="text-xl font-bold mb-2 text-[#FFC107]">Zero Cost EMI Available</h4>
                        <p className="text-white font-medium text-sm max-w-md">
                          Convert your electricity bill into solar EMI. Pay the same amount you pay for electricity, but own the system!
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
                    <p className="text-xs text-gray-400">#1 Solar installer in Nagpur</p>
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

            {/* Action Button */}
            <div className="sticky top-24">
              <Button 
                onClick={handleConfirmBooking}
                disabled={!selectedPayment}
                className="w-full h-14 text-lg font-bold bg-[#FFC107] hover:bg-[#FFD54F] text-[#0F2F26] shadow-lg hover:shadow-xl transition-all"
              >
                Confirm Booking
              </Button>
              <p className="text-xs text-center text-white/60 mt-3">
                By confirming, you agree to our terms of service
              </p>
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
