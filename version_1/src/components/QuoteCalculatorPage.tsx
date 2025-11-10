
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, TrendingUp, Calculator, Zap, Shield, Award } from "lucide-react";

interface QuoteCalculatorPageProps {
  onBack: () => void;
  onNavigate: (section: string) => void;
}

const QuoteCalculatorPage: React.FC<QuoteCalculatorPageProps> = ({ onBack, onNavigate }) => {
  const [calculatedQuote, setCalculatedQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to calculate quote
    const calculateQuote = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock calculation based on typical residential solar system
      const mockQuote = {
        systemSize: '3 kW',
        totalCost: 240000,
        subsidyAmount: 78000,
        netCost: 162000,
        monthlySavings: 2400,
        yearlyROI: 28800,
        paybackPeriod: 5.6,
        co2Reduction: 3.5
      };
      
      setCalculatedQuote(mockQuote);
      setLoading(false);
    };

    calculateQuote();
  }, []);

  const handleGetPersonalizedQuote = () => {
    // Navigate to the 5-step solar installation process
    onNavigate('booking');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FFC107] border-t-transparent mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-[#1A3C34] mb-2">Calculating Your Solar Quote...</h3>
            <p className="text-gray-600">Please wait while we process your details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA]">
      {/* Header */}
      <div className="bg-[#1A3C34] text-white py-6 px-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={onBack} variant="outline" className="text-white border-white hover:bg-white hover:text-[#1A3C34]">
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Sun className="h-8 w-8 text-[#FFC107]" />
              <div>
                <h1 className="text-2xl font-bold">Solar Panda</h1>
                <p className="text-sm text-gray-300">Nagpur's #1 Solar Partner</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#FFC107] mb-4">Your Solar Quote is Ready!</h2>
            <p className="text-xl text-gray-200">Here's what we calculated for your home</p>
          </div>
        </div>
      </div>

      {/* Quote Results */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Main Quote Card */}
          <Card className="bg-white shadow-2xl border-4 border-[#FFC107] mb-8">
            <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white text-center">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2">
                <Calculator className="h-8 w-8 text-[#FFC107]" />
                Your Personalized Solar Quote
              </CardTitle>
              <CardDescription className="text-gray-200 text-lg">
                Based on your electricity bill and location in Nagpur
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Sun className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">{calculatedQuote.systemSize}</h3>
                  <p className="text-blue-600 font-semibold">Recommended System Size</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">₹{calculatedQuote.monthlySavings.toLocaleString()}</h3>
                  <p className="text-green-600 font-semibold">Monthly Savings</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-purple-800 mb-2">₹{calculatedQuote.subsidyAmount.toLocaleString()}</h3>
                  <p className="text-purple-600 font-semibold">Government Subsidy</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-orange-800 mb-2">₹{calculatedQuote.netCost.toLocaleString()}</h3>
                  <p className="text-orange-600 font-semibold">Net Cost (After Subsidy)</p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-2 border-[#1A3C34]">
                  <CardHeader className="bg-[#1A3C34] text-white">
                    <CardTitle className="text-xl">Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total System Cost:</span>
                      <span className="font-bold text-[#1A3C34]">₹{calculatedQuote.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Government Subsidy:</span>
                      <span className="font-bold text-green-600">-₹{calculatedQuote.subsidyAmount.toLocaleString()}</span>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-bold text-[#1A3C34]">Net Amount:</span>
                      <span className="font-bold text-[#FF6200]">₹{calculatedQuote.netCost.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#1A3C34]">
                  <CardHeader className="bg-[#1A3C34] text-white">
                    <CardTitle className="text-xl">ROI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Yearly Savings:</span>
                      <span className="font-bold text-green-600">₹{calculatedQuote.yearlyROI.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Payback Period:</span>
                      <span className="font-bold text-[#1A3C34]">{calculatedQuote.paybackPeriod} years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">CO₂ Reduction:</span>
                      <span className="font-bold text-blue-600">{calculatedQuote.co2Reduction} tons/year</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits Section */}
              <div className="mt-12 bg-gradient-to-r from-[#FFC107]/20 to-[#FF6200]/20 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold text-[#1A3C34] text-center mb-8">Why Choose Solar Now?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💰</div>
                    <h4 className="font-bold text-[#1A3C34] mb-2">Massive Savings</h4>
                    <p className="text-gray-700">Save up to 90% on your electricity bills every month</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🌱</div>
                    <h4 className="font-bold text-[#1A3C34] mb-2">Go Green</h4>
                    <p className="text-gray-700">Reduce your carbon footprint and help the environment</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🏆</div>
                    <h4 className="font-bold text-[#1A3C34] mb-2">Government Support</h4>
                    <p className="text-gray-700">Get up to ₹78,000 subsidy from the government</p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-12 text-center">
                <h3 className="text-3xl font-bold text-[#1A3C34] mb-6">Ready to Get Started?</h3>
                <p className="text-xl text-gray-700 mb-8">
                  Get your personalized quote with brand choices and detailed specifications
                </p>
                
                <Button 
                  onClick={handleGetPersonalizedQuote}
                  className="h-20 px-12 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold text-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Quote Based on Your Brand Choice →
                </Button>
                
                <p className="text-sm text-gray-600 mt-4">
                  Choose from premium brands like Waaree, Adani, GoodWe, and more
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="bg-[#FFC107] text-black py-6 px-8 rounded-2xl">
            <div className="flex justify-center items-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="font-bold">MNRE Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6" />
                <span className="font-bold">500+ Installations</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6" />
                <span className="font-bold">25 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                <span className="font-bold">5.6 Year Payback</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteCalculatorPage;
