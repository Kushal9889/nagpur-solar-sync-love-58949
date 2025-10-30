
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Upload, 
  FileText, 
  Calendar, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Sun,
  Calculator,
  Zap,
  Award,
  TrendingUp,
  Users,
  Star,
  Gift,
  Timer,
  Smartphone,
  Building2,
  Banknote
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
  const [confetti, setConfetti] = useState(false);
  const [liveBookings, setLiveBookings] = useState(12);
  const { toast } = useToast();

  useEffect(() => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
    
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
    { id: 'google-map', name: 'Google Map Link', required: false, icon: '🗺️' },
    { id: 'site-plan', name: 'Site Plan', required: false, icon: '📋' }
  ];

  const solarPlans = [
    {
      id: 'basic',
      name: 'Basic (1-2 kW)',
      range: '₹30,000-₹1,00,000',
      subtitle: 'Post-subsidy price',
      features: ['1-2 kW capacity', 'Net metering', 'Government subsidies', 'ROI in 3-4 years'],
      savings: '₹1,800/month',
      emi: '₹2,500/month'
    },
    {
      id: 'standard',
      name: 'Standard (3-5 kW)',
      range: '₹60,000-₹1,62,000',
      subtitle: 'Post-subsidy price',
      features: ['3-5 kW capacity', 'Reduce costs by 80%', 'Tax benefits', 'Green certification'],
      popular: true,
      savings: '₹3,200/month',
      emi: '₹4,200/month'
    },
    {
      id: 'premium',
      name: 'Premium (6-10 kW)',
      range: '₹1,02,000-₹3,22,000',
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
      title: "📄 Document Uploaded Successfully!",
      description: `${requiredDocuments.find(d => d.id === docId)?.name} has been uploaded`,
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
    setConfetti(true);
    toast({
      title: "🎉 Booking Confirmed Successfully!",
      description: "Survey will be scheduled in 3 days. You'll receive confirmation via SMS and email.",
    });
  };

  const completedDocs = Object.values(uploadedDocs).filter(Boolean).length;
  const totalDocs = requiredDocuments.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] relative overflow-hidden">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFC107]/20 to-transparent animate-pulse"></div>
        </div>
      )}

      {/* Header with Enhanced Celebration */}
      <div className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white py-8 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              onClick={onBack} 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-[#1A3C34] shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ← Back to Components
            </Button>
            <div className="flex items-center gap-2">
              <Sun className="h-10 w-10 text-[#FFC107] animate-spin" />
              <div>
                <h1 className="text-3xl font-bold">SuryaSpark</h1>
                <p className="text-sm text-gray-300">Nagpur's #1 Solar Partner</p>
              </div>
            </div>
            <Badge className="bg-red-600 text-white animate-pulse px-4 py-2 ml-auto">
              🔥 {liveBookings} people booking now!
            </Badge>
          </div>
          
          <div className="text-center">
            <h2 className="text-5xl font-bold text-[#FFC107] mb-4 animate-pulse">
              🎉 You're Almost There! Book Your Solar Project Today! 🎉
            </h2>
            <p className="text-2xl text-gray-200">Complete your booking and start saving from next month!</p>
          </div>
        </div>
      </div>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Enhanced Progress Bar */}
          <Card className="mb-8 border-4 border-[#FFC107] shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1A3C34]">🚀 Booking Progress</h3>
                <div className="flex gap-4">
                  <Badge className="bg-[#FFC107] text-black px-4 py-2 text-lg font-bold">
                    {bookingProgress}% Complete
                  </Badge>
                  <Badge className="bg-green-600 text-white px-4 py-2 text-lg font-bold">
                    Almost Done! 🎯
                  </Badge>
                </div>
              </div>
              <Progress value={bookingProgress} className="h-6 shadow-lg" />
              <div className="mt-4 text-center">
                <p className="text-lg text-[#1A3C34] font-semibold">
                  {bookingProgress < 100 ? 
                    "Complete the remaining steps to unlock your solar savings!" : 
                    "🎉 Congratulations! Your solar journey begins now!"
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Enhanced */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personalized Quotes with Psychology */}
              <Card className="shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                  <CardTitle className="text-3xl font-bold flex items-center gap-2">
                    <Calculator className="h-8 w-8 text-[#FFC107]" />
                    Your Personalized Solar Investment
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-200">
                    Based on your selections: {data?.selectedTechnology || 'TOPCon'}, {data?.selectedBrand || 'Waaree'}, {data?.selectedInverter || 'GoodWe'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {solarPlans.map((plan) => (
                      <Card 
                        key={plan.id} 
                        className={`border-4 relative overflow-hidden ${
                          plan.popular ? 
                          'border-[#FFC107] bg-gradient-to-br from-[#FFC107]/20 to-[#FF6200]/20 transform scale-105' : 
                          'border-gray-200 hover:border-[#FFC107] hover:scale-105'
                        } transition-all duration-300 shadow-lg hover:shadow-2xl`}
                      >
                        {plan.popular && (
                          <>
                            <div className="bg-gradient-to-r from-[#FFC107] to-[#FF6200] text-black text-center py-2 font-bold text-lg">
                              🏆 MOST POPULAR - BEST VALUE! 🏆
                            </div>
                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-b-[50px] border-b-red-600"></div>
                            <div className="absolute top-2 right-2 text-white text-xs font-bold transform rotate-45">
                              HOT
                            </div>
                          </>
                        )}
                        <CardContent className="p-6">
                          <h4 className="font-bold text-[#1A3C34] mb-3 text-xl">{plan.name}</h4>
                          <div className="text-3xl font-bold text-[#FF6200] mb-2">{plan.range}</div>
                          <div className="text-sm text-gray-600 mb-4">{plan.subtitle}</div>
                          
                          <div className="bg-green-50 p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-semibold text-green-800">Monthly Savings:</span>
                              <span className="text-2xl font-bold text-green-600">{plan.savings}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-blue-800">EMI Option:</span>
                              <span className="text-xl font-bold text-blue-600">{plan.emi}</span>
                            </div>
                          </div>
                          
                          <ul className="space-y-2 mb-4">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          {plan.popular && (
                            <div className="text-center p-3 bg-gradient-to-r from-[#FFC107] to-[#FF6200] text-black rounded-lg font-bold">
                              💰 Save ₹45,000 extra with this plan!
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Enhanced Government Subsidy Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-4 border-green-300">
                      <h4 className="font-bold text-[#1A3C34] mb-3 flex items-center gap-2">
                        <Gift className="h-6 w-6 text-green-600" />
                        💰 Government Subsidy Breakdown
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>MNRE Subsidy:</strong> ₹30,000/kW up to 3 kW</p>
                        <p><strong>Maximum Cap:</strong> ₹78,000 for 3-10 kW systems</p>
                        <p><strong>Processing Time:</strong> 30-90 days post-installation</p>
                        <p><strong>Your Estimated Subsidy:</strong> <span className="text-2xl font-bold text-green-600">₹65,000</span></p>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-4 border-purple-300">
                      <h4 className="font-bold text-[#1A3C34] mb-3 flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                        📈 Your Investment Returns
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Payback Period:</strong> 3.5 years</p>
                        <p><strong>25-Year Savings:</strong> ₹12,50,000</p>
                        <p><strong>Monthly Savings:</strong> ₹3,200+</p>
                        <p><strong>ROI:</strong> <span className="text-2xl font-bold text-purple-600">28.5%</span></p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Document Upload */}
              <Card className="shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                  <CardTitle className="text-3xl font-bold flex items-center gap-2">
                    <Upload className="h-8 w-8 text-[#FFC107]" />
                    📄 Document Upload ({completedDocs}/{totalDocs})
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-200">
                    Upload required documents for instant approval
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredDocuments.map((doc) => (
                      <div 
                        key={doc.id}
                        className={`border-4 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                          uploadedDocs[doc.id] ? 
                          'border-green-400 bg-green-50 shadow-lg' : 
                          'border-gray-300 hover:border-[#FFC107] hover:bg-[#FFC107]/10'
                        }`}
                        onClick={() => handleDocumentUpload(doc.id)}
                      >
                        {uploadedDocs[doc.id] ? (
                          <div className="text-green-600">
                            <CheckCircle className="h-12 w-12 mx-auto mb-3" />
                            <p className="font-bold text-lg">{doc.icon} {doc.name}</p>
                            <p className="text-sm font-semibold">✅ Uploaded Successfully!</p>
                          </div>
                        ) : (
                          <div className="text-gray-600 hover:text-[#1A3C34]">
                            <Upload className="h-12 w-12 mx-auto mb-3" />
                            <p className="font-bold text-lg">{doc.icon} {doc.name}</p>
                            <p className="text-sm">
                              {doc.required ? '(Required)' : '(Optional)'}
                            </p>
                            <div className="mt-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-[#FFC107] text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
                              >
                                Click to Upload
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Payment Options */}
              <Card className="shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                  <CardTitle className="text-3xl font-bold flex items-center gap-2">
                    <CreditCard className="h-8 w-8 text-[#FFC107]" />
                    💳 Choose Payment Method
                  </CardTitle>
                  <CardDescription className="text-xl text-gray-200">
                    Secure payment with multiple options
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {paymentOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer transition-all duration-300 border-4 ${
                          selectedPayment === option.id
                            ? 'border-[#FFC107] bg-gradient-to-r from-[#FFC107]/20 to-[#FF6200]/20 shadow-2xl scale-105'
                            : 'border-gray-200 hover:border-[#FFC107] hover:shadow-xl hover:scale-102'
                        } ${option.popular ? 'ring-4 ring-green-400' : ''} ${option.special ? 'ring-4 ring-purple-400' : ''}`}
                        onClick={() => setSelectedPayment(option.id)}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="flex justify-center mb-4">
                            {option.icon}
                          </div>
                          <h4 className="font-bold text-xl text-[#1A3C34] mb-2">{option.name}</h4>
                          <p className="text-gray-600 mb-3">{option.description}</p>
                          <Badge className="bg-green-600 text-white px-3 py-1">
                            {option.discount}
                          </Badge>
                          {option.popular && (
                            <div className="mt-2">
                              <Badge className="bg-[#FFC107] text-black px-3 py-1 font-bold">
                                🏆 MOST POPULAR
                              </Badge>
                            </div>
                          )}
                          {option.special && (
                            <div className="mt-2">
                              <Badge className="bg-purple-600 text-white px-3 py-1 font-bold">
                                💎 RECOMMENDED
                              </Badge>
                            </div>
                          )}
                          {selectedPayment === option.id && (
                            <div className="mt-4">
                              <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* EMI Section */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border-4 border-purple-300">
                    <h4 className="text-2xl font-bold text-[#1A3C34] mb-4 text-center">
                      💸 Want to pay in EMI as per your current electricity bill?
                    </h4>
                    <p className="text-lg text-center mb-6 text-gray-700">
                      Transform your monthly electricity bill into a solar EMI and start saving from day one!
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg shadow-lg">
                        <h5 className="font-bold text-lg text-[#1A3C34] mb-2">Current Bill</h5>
                        <p className="text-3xl font-bold text-red-600">₹4,200/month</p>
                        <p className="text-sm text-gray-600">Keep paying forever</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-lg">
                        <h5 className="font-bold text-lg text-[#1A3C34] mb-2">Solar EMI</h5>
                        <p className="text-3xl font-bold text-green-600">₹4,200/month</p>
                        <p className="text-sm text-gray-600">For 5 years, then FREE!</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowEMIGuide(true)}
                      className="w-full h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                    >
                      🏦 Try Our EMI & Loan Options
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Live Activity */}
              <Card className="border-4 border-green-400 shadow-2xl">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-lg text-[#1A3C34] mb-4">🔥 Live Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                      <span className="text-sm">Bookings today:</span>
                      <Badge className="bg-green-600 text-white">{liveBookings}</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                      <span className="text-sm">People viewing:</span>
                      <Badge className="bg-blue-600 text-white animate-pulse">47</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                      <span className="text-sm">Slots remaining:</span>
                      <Badge className="bg-orange-600 text-white">8</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="border-4 border-[#FFC107] shadow-2xl">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-[#1A3C34] mb-4 text-center">🛡️ Your Protection</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Shield className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-sm">25-Year Panel Warranty</p>
                        <p className="text-xs text-gray-600">Industry leading coverage</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Award className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">5-Year Inverter Warranty</p>
                        <p className="text-xs text-gray-600">Complete system protection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-sm">100% Satisfaction Guarantee</p>
                        <p className="text-xs text-gray-600">30-day money back</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What Happens Next */}
              <Card className="border-4 border-blue-400 shadow-2xl">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-[#1A3C34] mb-4 text-center">🗓️ What Happens Next?</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center text-black font-bold">1</div>
                      <div>
                        <p className="font-semibold text-sm">Survey & Site Assessment</p>
                        <p className="text-xs text-gray-600">Within 3 days of booking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center text-black font-bold">2</div>
                      <div>
                        <p className="font-semibold text-sm">Installation & Setup</p>
                        <p className="text-xs text-gray-600">2-3 days professional work</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#FFC107] rounded-full flex items-center justify-center text-black font-bold">3</div>
                      <div>
                        <p className="font-semibold text-sm">Subsidy Processing</p>
                        <p className="text-xs text-gray-600">30-90 days government process</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                      <div>
                        <p className="font-semibold text-sm">Start Saving Money!</p>
                        <p className="text-xs text-gray-600">Immediate electricity savings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Final Confirmation Button */}
          {bookingProgress < 100 && (
            <div className="mt-12 text-center">
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Energy Future?</h3>
                <p className="text-xl text-gray-200">Join 500+ satisfied customers who made the smart choice</p>
              </div>
              <Button 
                onClick={handleConfirmBooking}
                disabled={!selectedPayment}
                className="h-20 px-16 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold text-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative">🚀 Confirm Booking & Start Saving!</span>
              </Button>
              {!selectedPayment && (
                <p className="text-red-400 mt-4 text-lg">Please select a payment method to proceed</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* EMI Guide Modal */}
      {showEMIGuide && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-2xl font-bold">🏦 Complete EMI & Loan Guide</CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowEMIGuide(false)}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-[#1A3C34] mb-4">🏦 Bank Partners & Interest Rates</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Bank</th>
                          <th className="border border-gray-300 p-3 text-left">Interest Rate</th>
                          <th className="border border-gray-300 p-3 text-left">Processing Fee</th>
                          <th className="border border-gray-300 p-3 text-left">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bankPartners.map((bank) => (
                          <tr key={bank.name}>
                            <td className="border border-gray-300 p-3 font-semibold">{bank.name}</td>
                            <td className="border border-gray-300 p-3 text-green-600 font-bold">{bank.rate}</td>
                            <td className="border border-gray-300 p-3">{bank.processing}</td>
                            <td className="border border-gray-300 p-3">
                              <Button size="sm" className="bg-[#FFC107] text-black hover:bg-[#FF6200]">
                                Apply Now
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#1A3C34] mb-4">📋 Required Documents for Solar Loan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-semibold">Personal Documents:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>PAN Card</li>
                        <li>Aadhaar Card</li>
                        <li>Passport Size Photos</li>
                        <li>Signature Verification</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-semibold">Financial Documents:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Last 3 months salary slips</li>
                        <li>Bank statements (6 months)</li>
                        <li>Form 16 / ITR</li>
                        <li>Employment certificate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-[#1A3C34] mb-4">📈 EMI Calculator Example</h4>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Loan Amount</p>
                        <p className="text-2xl font-bold text-[#1A3C34]">₹2,00,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Interest Rate</p>
                        <p className="text-2xl font-bold text-[#1A3C34]">10.5%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly EMI</p>
                        <p className="text-2xl font-bold text-green-600">₹4,289</p>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-lg font-semibold text-[#1A3C34]">
                        Your current bill: ₹4,200 | Solar EMI: ₹4,289 | You save from month 1!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => setShowEMIGuide(false)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 text-lg hover:from-pink-600 hover:to-purple-600"
                  >
                    I'm Ready to Apply for Loan!
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PaymentBookingPage;
