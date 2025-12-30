
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, Star, CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";

interface PlanSelectionPageProps {
  onBack: () => void;
  onNext: () => void;
}

const PlanSelectionPage: React.FC<PlanSelectionPageProps> = ({ onBack, onNext }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: 'basic',
      name: 'Basic (2-3 kW)',
      subtitle: 'Small homes (200-300 units)',
      image: '/uploads/basic-solar.png',
      features: [
        'Runs: Lights, fans, TV, fridge',
        'Ideal for: 1BHK/2BHK, 2-4 people',
        '25-yr panel warranty',
        'Net metering'
      ],
      price: '₹1,20,000-₹2,40,000',
      priceSubtitle: '(pre-subsidy); ₹60,000-₹1,62,000 (post-subsidy)',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'standard',
      name: 'Standard (3-5 kW)',
      subtitle: 'Medium homes (300-500 units)',
      image: '/uploads/standard-solar.png',
      features: [
        'Runs: Above + 1 AC, washing machine',
        'Ideal for: 2-3BHK, 4-6 people',
        '25-yr panel warranty',
        'Net metering'
      ],
      price: '₹1,80,000-₹4,00,000',
      priceSubtitle: '(pre-subsidy); ₹1,02,000-₹3,22,000 (post-subsidy)',
      color: 'from-green-500 to-green-600',
      badge: 'Best Value',
      isPopular: true
    },
    {
      id: 'premium',
      name: 'Premium (6-10 kW)',
      subtitle: 'Large homes (600-1000 units)',
      image: '/uploads/premium-solar.png',
      features: [
        'Runs: Above + multiple ACs, pumps',
        'Ideal for: Villas, large families',
        '25-yr panel warranty',
        'Net metering'
      ],
      price: '₹3,60,000-₹8,00,000',
      priceSubtitle: '(pre-subsidy); ₹2,82,000-₹7,22,000 (post-subsidy)',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSelectPlan = () => {
    if (selectedPlan) {
      onNext();
    }
  };

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
            <h2 className="text-4xl font-bold text-[#FFC107] mb-4">Select Your Plan</h2>
            <p className="text-xl text-gray-200">Choose the perfect solar solution for your home</p>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === plan.id 
                    ? 'ring-4 ring-[#FFC107] shadow-2xl' 
                    : 'hover:shadow-xl'
                } ${plan.isPopular ? 'border-4 border-[#FFC107]' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.isPopular && (
                  <div className="bg-[#FFC107] text-black text-center py-2 font-bold">
                    {plan.badge}
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className="w-32 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img 
                      src={plan.image} 
                      alt={plan.name}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const fallbackDiv = target.nextElementSibling as HTMLElement;
                        target.style.display = 'none';
                        if (fallbackDiv) {
                          fallbackDiv.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="hidden items-center justify-center text-gray-500">
                      <Sun className="h-12 w-12" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-[#1A3C34]">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    {plan.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center space-y-2 pt-4 border-t">
                    <div className="text-2xl font-bold text-[#1A3C34]">
                      {plan.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {plan.priceSubtitle}
                    </div>
                  </div>

                  <Button 
                    className={`w-full h-12 font-bold text-lg transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'bg-[#FFC107] hover:bg-[#FF6200] text-black'
                        : 'bg-[#1A3C34] hover:bg-[#2D5A4D] text-white'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? 'Selected ✓' : 'Select Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          {selectedPlan && (
            <div className="mt-8 text-center">
              <Button 
                onClick={handleSelectPlan}
                className="h-16 px-12 bg-[#1A3C34] hover:bg-[#2D5A4D] text-white font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Continue with {plans.find(p => p.id === selectedPlan)?.name} →
              </Button>
            </div>
          )}

          {/* Trust Indicators - moved below continue button */}
          <div className="mt-8 bg-[#FFC107] text-black py-6 px-8 rounded-2xl">
            <div className="flex justify-center items-center gap-8 text-center">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                <span className="font-bold">MNRE Certified Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6" />
                <span className="font-bold">500+ Happy Families</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                <span className="font-bold">420+ Tons CO2 Saved</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6" />
                <span className="font-bold">5 Year Complete Warranty</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanSelectionPage;
