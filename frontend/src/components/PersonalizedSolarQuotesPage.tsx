
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Zap, Star, CheckCircle } from "lucide-react";
import AnimatedSection from './AnimatedSection';

const PersonalizedSolarQuotesPage: React.FC = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('');
  const [monthlyBill, setMonthlyBill] = useState<number>(0);
  const [calculatedKW, setCalculatedKW] = useState<number>(0);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);
  const [systemCost, setSystemCost] = useState<number>(0);
  const [roi, setROI] = useState<number>(0);

  useEffect(() => {
    // Get data from localStorage
    const storedCategory = localStorage.getItem('selectedCategory') || '';
    const storedBill = Number(localStorage.getItem('monthlyBill')) || 0;
    const storedKW = Number(localStorage.getItem('calculatedKW')) || 0;
    
    setCategory(storedCategory);
    setMonthlyBill(storedBill);
    setCalculatedKW(storedKW);

    // Calculate system cost based on KW
    let cost = 0;
    if (storedKW <= 3) {
      cost = 200000; // ₹2L for 3kW
    } else if (storedKW <= 5) {
      cost = 300000; // ₹3L for 5kW
    } else {
      // Interpolate for other sizes
      cost = storedKW * 60000; // ₹60k per kW
    }
    setSystemCost(cost);

    // Calculate monthly savings (KW * 120 units * ₹12/unit)
    const savings = storedKW * 120 * 12;
    setMonthlySavings(Math.round(savings));

    // Calculate ROI (years to recover investment)
    const annualSavings = savings * 12;
    const roiYears = cost / annualSavings;
    setROI(Math.round(roiYears * 10) / 10);

    // GSAP animation
    if (typeof window !== 'undefined') {
      import('gsap').then(({ gsap }) => {
        gsap.from('.quote-card', {
          opacity: 0,
          y: 50,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out"
        });
      });
    }
  }, []);

  const handleGetBrandQuote = () => {
    // Store quote data
    localStorage.setItem('quoteData', JSON.stringify({
      category,
      monthlyBill,
      calculatedKW,
      monthlySavings,
      systemCost,
      roi
    }));
    
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <AnimatedSection animationType="fadeUp">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Your Personalized Solar Quote – Save Smart!
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Based on your {category} category and ₹{monthlyBill.toLocaleString()} monthly bill
            </p>
          </div>
        </AnimatedSection>

        {/* Quote Display */}
        <div className="max-w-4xl mx-auto">
          
          {/* System Details Card */}
          <div className="quote-card mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                  <Calculator className="h-8 w-8" />
                  Your Solar System Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-yellow-200 mb-2">
                      {calculatedKW} kW
                    </div>
                    <div className="text-lg">Recommended System Size</div>
                    <div className="text-sm text-blue-100 mt-1">
                      Based on your electricity usage
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-yellow-200 mb-2">
                      ₹{monthlySavings.toLocaleString()}
                    </div>
                    <div className="text-lg">Monthly Savings</div>
                    <div className="text-sm text-blue-100 mt-1">
                      At ₹12/unit electricity rate
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-yellow-200 mb-2">
                      {roi} Years
                    </div>
                    <div className="text-lg">Return on Investment</div>
                    <div className="text-sm text-blue-100 mt-1">
                      Complete payback period
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Breakdown Card */}
          <div className="quote-card mb-8">
            <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
              <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  Financial Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xl">
                    <span>System Cost:</span>
                    <span className="font-bold">₹{systemCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <span>Government Subsidy:</span>
                    <span className="font-bold text-green-600">- ₹78,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xl border-t pt-4">
                    <span>Net Investment:</span>
                    <span className="font-bold">₹{(systemCost - 78000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <span>Annual Savings:</span>
                    <span className="font-bold text-green-600">₹{(monthlySavings * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                    <span>25-Year Total Savings:</span>
                    <span className="text-green-600">₹{((monthlySavings * 12 * 25) / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ROI Progress Card */}
          <div className="quote-card mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-2xl border-0">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">ROI Progress Visualization</h3>
                  <p className="text-green-100">Your investment will pay for itself in {roi} years</p>
                </div>
                <div className="relative">
                  <div className="w-full bg-green-800 rounded-full h-6">
                    <div 
                      className="bg-yellow-400 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                      style={{ width: `${Math.min((5 / roi) * 100, 100)}%` }}
                    >
                      <span className="text-green-800 font-bold text-sm">
                        {Math.min((5 / roi) * 100, 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Start</span>
                    <span>{roi} Years (Full ROI)</span>
                    <span>25 Years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="quote-card mb-8">
            <Card className="bg-white shadow-2xl border-4 border-[#FFC107]">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Star className="h-6 w-6" />
                  Your Solar Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800">Government Subsidy</h4>
                        <p className="text-gray-600">Up to ₹78,000 direct benefit</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800">Net Metering</h4>
                        <p className="text-gray-600">Sell excess power back to grid</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800">25-Year Warranty</h4>
                        <p className="text-gray-600">Complete system protection</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800">Zero EMI Options</h4>
                        <p className="text-gray-600">Flexible payment plans available</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800">Free Installation</h4>
                        <p className="text-gray-600">Expert installation included</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800">Lifetime Support</h4>
                        <p className="text-gray-600">24/7 maintenance support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <AnimatedSection animationType="scaleIn">
            <div className="text-center">
              <Button 
                onClick={handleGetBrandQuote}
                className="h-20 px-16 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold text-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center gap-4">
                  <Zap className="h-8 w-8" />
                  Get Your Brand Quote Now!
                </span>
              </Button>
              <p className="text-white mt-4 text-lg">
                Choose from premium brands and lock in your 25-year savings
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedSolarQuotesPage;
