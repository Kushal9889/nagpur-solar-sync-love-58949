
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, CreditCard, FileText, CheckCircle, AlertCircle, Clock, Smartphone } from "lucide-react";
import AnimatedSection from './AnimatedSection';

interface PaymentPageProps {
  onNavigate: (section: string) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const [documents, setDocuments] = useState({
    aadhaar: false,
    pan: false,
    electricityBill: false,
    bankStatement: false
  });
  const [dragActive, setDragActive] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  const requiredDocs = [
    { key: 'aadhaar', name: 'Aadhaar Card', icon: FileText },
    { key: 'pan', name: 'PAN Card', icon: FileText },
    { key: 'electricityBill', name: 'Latest Electricity Bill', icon: FileText },
    { key: 'bankStatement', name: 'Bank Statement (3 months)', icon: FileText }
  ];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    // Simulate document upload
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Simulate successful upload
      setDocuments(prev => ({ ...prev, aadhaar: true }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (docType: string) => {
    setDocuments(prev => ({ ...prev, [docType]: true }));
  };

  const completedDocs = Object.values(documents).filter(Boolean).length;
  const allDocsUploaded = completedDocs === requiredDocs.length;

  const paymentMethods = [
    { name: 'UPI', icon: Smartphone, popular: true },
    { name: 'Credit Card', icon: CreditCard, popular: false },
    { name: 'Net Banking', icon: CreditCard, popular: false },
    { name: 'EMI Options', icon: CreditCard, popular: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <AnimatedSection animationType="fadeUp">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Secure Your Solar Today – Save ₹18,000/Year!
            </h1>
            <p className="text-xl text-gray-200">
              Complete your booking with easy document upload and flexible payment options
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Document Upload */}
            <AnimatedSection animationType="slideLeft">
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                  <CardTitle className="flex items-center gap-3">
                    <Upload className="h-6 w-6" />
                    Upload Required Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  
                  {/* Drag & Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 mb-6 ${
                      dragActive ? 'border-[#FFC107] bg-[#FFC107]/10' : 'border-gray-300 hover:border-[#FFC107] hover:bg-gray-50'
                    }`}
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Drop documents here or click to upload
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, JPG, PNG (Max 5MB each)
                    </p>
                    <input 
                      type="file" 
                      multiple 
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => e.target.files && handleFileSelect('aadhaar')}
                    />
                  </div>

                  {/* Document Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requiredDocs.map((doc) => {
                      const Icon = doc.icon;
                      const isUploaded = documents[doc.key as keyof typeof documents];
                      
                      return (
                        <div
                          key={doc.key}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            isUploaded 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-300 hover:border-[#FFC107] hover:bg-[#FFC107]/10'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-gray-600" />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">{doc.name}</div>
                              <div className="text-sm text-gray-500">
                                {isUploaded ? 'Uploaded successfully' : 'Click to upload'}
                              </div>
                            </div>
                            {isUploaded ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : (
                              <button
                                onClick={() => handleFileSelect(doc.key)}
                                className="px-3 py-1 bg-[#FFC107] text-black rounded font-semibold hover:bg-[#FF6200] transition-colors"
                              >
                                Upload
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Payment Section */}
            <AnimatedSection animationType="slideLeft" delay={200}>
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6" />
                    Payment Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
                      <h3 className="font-bold text-green-800 mb-2">💰 Pay Only 10% Now!</h3>
                      <p className="text-green-700">
                        Secure your booking with just ₹15,000. Pay the remaining amount after installation.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.name}
                          className="p-4 rounded-lg border-2 border-gray-300 hover:border-[#FFC107] hover:bg-[#FFC107]/10 transition-all duration-300 relative"
                        >
                          {method.popular && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                              Popular
                            </Badge>
                          )}
                          <Icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                          <div className="font-semibold text-sm">{method.name}</div>
                        </button>
                      );
                    })}
                  </div>

                  <Button 
                    disabled={!allDocsUploaded}
                    className={`w-full h-14 font-bold text-xl transition-all duration-300 ${
                      allDocsUploaded
                        ? 'bg-[#FFC107] hover:bg-[#FF6200] text-black shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {allDocsUploaded ? 'Pay ₹15,000 Now (10% Booking Amount)' : 'Upload All Documents to Continue'}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Timeline */}
            <AnimatedSection animationType="slideLeft" delay={400}>
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="h-6 w-6" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <span><strong>Site Survey:</strong> Technical team visits in 3 days</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <span><strong>Installation:</strong> Complete setup in 30 days</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <span><strong>Subsidy Processing:</strong> Government subsidy in 90 days</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                      <span><strong>Start Saving:</strong> Immediate electricity bill reduction</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Final CTA */}
            <AnimatedSection animationType="scaleIn" delay={600}>
              <div className="text-center">
                <Button 
                  onClick={() => onNavigate('profile')}
                  disabled={!allDocsUploaded}
                  className={`h-20 px-12 font-bold text-2xl shadow-2xl transition-all duration-300 ${
                    allDocsUploaded
                      ? 'bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black hover:shadow-3xl transform hover:scale-110'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking Now – Enjoy Instant Savings!
                </Button>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Document Status */}
            <AnimatedSection animationType="slideRight">
              <Card className="bg-gray-800 text-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader>
                  <CardTitle className="text-[#FFC107]">Document Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {requiredDocs.map((doc) => {
                    const isUploaded = documents[doc.key as keyof typeof documents];
                    return (
                      <div key={doc.key} className="flex items-center justify-between">
                        <span className="text-sm">{doc.name}</span>
                        {isUploaded ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    );
                  })}
                  <div className="pt-4 border-t border-gray-600">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Progress</span>
                      <span className="font-semibold">{completedDocs}/{requiredDocs.length}</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-3">
                      <div 
                        className="bg-[#FFC107] h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(completedDocs / requiredDocs.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Urgency Banner */}
            <AnimatedSection animationType="slideRight" delay={200}>
              <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">⏰ Limited Time Offer!</h3>
                  <p className="mb-4">Limited Slots – Book Before July 15, 2025!</p>
                  <Badge className="bg-yellow-500 text-black px-4 py-2 font-bold animate-pulse">
                    Only 47 slots left in Nagpur!
                  </Badge>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Benefits Reminder */}
            <AnimatedSection animationType="slideRight" delay={400}>
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                  <CardTitle>Your Benefits</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>₹18,000/year guaranteed savings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Up to ₹78,000 government subsidy</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>25-year performance warranty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Free installation & maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>Net metering approval assistance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
