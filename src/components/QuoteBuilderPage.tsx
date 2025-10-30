
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, MapPin, Zap, Home, Star } from "lucide-react";
import AnimatedSection from './AnimatedSection';

interface QuoteBuilderPageProps {
  onNavigate: (section: string) => void;
}

const QuoteBuilderPage: React.FC<QuoteBuilderPageProps> = ({ onNavigate }) => {
  const [quoteData, setQuoteData] = useState({
    address: '',
    pincode: '',
    roofArea: '',
    systemSize: '',
    panelType: 'mono',
    budget: ''
  });

  const [estimatedCost, setEstimatedCost] = useState(0);
  const [estimatedSavings, setEstimatedSavings] = useState(0);

  useEffect(() => {
    // Calculate estimated cost and savings based on system size
    const size = parseFloat(quoteData.systemSize) || 0;
    const costPerKW = quoteData.panelType === 'mono' ? 60000 : 50000;
    const cost = size * costPerKW;
    const annualSavings = size * 18000; // ₹18,000 per kW per year
    
    setEstimatedCost(cost);
    setEstimatedSavings(annualSavings);
  }, [quoteData.systemSize, quoteData.panelType]);

  useEffect(() => {
    // GSAP animation for form sections
    if (typeof window !== 'undefined') {
      import('gsap').then(({ gsap }) => {
        gsap.from('.quote-section', {
          opacity: 0,
          x: -50,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out"
        });
      });
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setQuoteData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <AnimatedSection animationType="fadeUp">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Build Your Quote – Tailored for You!
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Get a personalized solar quote based on your specific requirements
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Quote Form */}
          <div className="space-y-8">
            
            {/* Address Section */}
            <div className="quote-section">
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-6 w-6" />
                    Installation Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <Label className="text-lg font-bold text-[#1A3C34] mb-2 block">
                      Full Address
                    </Label>
                    <Input
                      placeholder="Enter your complete address"
                      value={quoteData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="h-12 text-lg border-2 border-gray-300 focus:border-[#FFC107]"
                    />
                  </div>
                  <div>
                    <Label className="text-lg font-bold text-[#1A3C34] mb-2 block">
                      Pincode
                    </Label>
                    <Input
                      placeholder="Enter pincode"
                      value={quoteData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      className="h-12 text-lg border-2 border-gray-300 focus:border-[#FFC107]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Details */}
            <div className="quote-section">
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    System Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div>
                    <Label className="text-lg font-bold text-[#1A3C34] mb-2 block">
                      Roof Area (sq ft)
                    </Label>
                    <Input
                      placeholder="Available roof area"
                      value={quoteData.roofArea}
                      onChange={(e) => handleInputChange('roofArea', e.target.value)}
                      className="h-12 text-lg border-2 border-gray-300 focus:border-[#FFC107]"
                    />
                  </div>
                  <div>
                    <Label className="text-lg font-bold text-[#1A3C34] mb-2 block">
                      System Size (kW)
                    </Label>
                    <Input
                      placeholder="Desired system size"
                      value={quoteData.systemSize}
                      onChange={(e) => handleInputChange('systemSize', e.target.value)}
                      className="h-12 text-lg border-2 border-gray-300 focus:border-[#FFC107]"
                    />
                  </div>
                  <div>
                    <Label className="text-lg font-bold text-[#1A3C34] mb-2 block">
                      Panel Type
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleInputChange('panelType', 'mono')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          quoteData.panelType === 'mono' 
                            ? 'border-[#FFC107] bg-[#FFC107]/20 text-[#1A3C34]' 
                            : 'border-gray-300 hover:border-[#FFC107]'
                        }`}
                      >
                        <div className="font-semibold">Monocrystalline</div>
                        <div className="text-sm text-gray-600">Higher efficiency</div>
                      </button>
                      <button
                        onClick={() => handleInputChange('panelType', 'poly')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          quoteData.panelType === 'poly' 
                            ? 'border-[#FFC107] bg-[#FFC107]/20 text-[#1A3C34]' 
                            : 'border-gray-300 hover:border-[#FFC107]'
                        }`}
                      >
                        <div className="font-semibold">Polycrystalline</div>
                        <div className="text-sm text-gray-600">Cost effective</div>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quote Summary */}
          <div className="space-y-8">
            
            {/* Cost Breakdown */}
            <div className="quote-section">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-2xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Calculator className="h-8 w-8" />
                    Your Quote Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-xl">
                      <span>System Size:</span>
                      <span className="font-bold">{quoteData.systemSize || '0'} kW</span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                      <span>Estimated Cost:</span>
                      <span className="font-bold">₹{estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl">
                      <span>Annual Savings:</span>
                      <span className="font-bold text-yellow-200">₹{estimatedSavings.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/30 pt-4">
                      <div className="flex justify-between items-center text-2xl font-bold">
                        <span>25-Year Savings:</span>
                        <span className="text-yellow-200">₹{(estimatedSavings * 25 / 100000).toFixed(1)}L</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="quote-section">
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardTitle>🌟 Your Benefits</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-[#FFC107] mt-1" />
                      <span>Government subsidy up to ₹78,000</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-[#FFC107] mt-1" />
                      <span>25-year warranty and support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-[#FFC107] mt-1" />
                      <span>Net metering benefits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-5 w-5 text-[#FFC107] mt-1" />
                      <span>Free installation and maintenance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Family Image */}
            <div className="quote-section">
              <Card className="bg-white shadow-2xl border-4 border-[#FFC107] overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-[#FFC107] to-[#FF6200] flex items-center justify-center">
                    <div className="text-4xl">🏠⚡👨‍👩‍👧‍👦</div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-lg font-bold">Secure Your Family's Future</h3>
                      <p className="text-sm">Join 98,000+ families saving with solar</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA */}
            <div className="quote-section">
              <Button 
                onClick={() => onNavigate('payment')}
                disabled={!quoteData.address || !quoteData.systemSize}
                className="w-full h-16 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Quote – Start Saving Now!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBuilderPage;
