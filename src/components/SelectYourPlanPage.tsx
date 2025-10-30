
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

interface SelectYourPlanPageProps {
  onNavigate: (section: string) => void;
}

const SelectYourPlanPage: React.FC<SelectYourPlanPageProps> = ({ onNavigate }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      capacity: '2–3 kW',
      forHomes: 'Small homes (200–300 units)',
      details: 'Lights, fans, TV, fridge',
      idealFor: '1BHK/2BHK, 2–3 people',
      price: '₹30K-₹1L',
      savings: 'Save ₹12,000/year!',
      features: [
        '2-3 kW system',
        '25-year panel warranty',
        'Net metering',
        'Rooftop installation'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'standard',
      name: 'Standard',
      capacity: '3–5 kW',
      forHomes: 'Medium homes (300–500 units)',
      details: 'Above + 2 AC, washing machine',
      idealFor: '2–3BHK, 3–5 people',
      price: '₹60K-₹1.62L',
      savings: 'Save ₹18,000/year!',
      features: [
        '3-5 kW system',
        '25-year panel warranty',
        'Net metering',
        'Premium panels'
      ],
      color: 'from-green-500 to-green-600',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      capacity: '6–10 kW',
      forHomes: 'Large homes (600–1000 units)',
      details: 'Above + multiple ACs, pumps',
      idealFor: 'Villas, large families',
      price: '₹1.2L-₹2.5L',
      savings: 'Save ₹30,000/year!',
      features: [
        '6-10 kW system',
        '25-year panel warranty',
        'Net metering',
        'Premium optimization'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      onNavigate('select-plan-category');
    }
  };

  const handleBack = () => {
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your Perfect Plan – Save Today!
          </h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Choose the solar solution that matches your home and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? 'scale-105 shadow-2xl ring-4 ring-yellow-400' 
                  : 'hover:scale-105 shadow-xl'
              } bg-gradient-to-br ${plan.color} text-white border-0`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold z-10">
                  Most Popular! 👑
                </div>
              )}

              {/* Selected Badge */}
              {selectedPlan === plan.id && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold z-10 flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  Selected ✓
                </div>
              )}

              <CardHeader className="relative pt-16 pb-6">
                <CardTitle className="text-2xl font-bold mb-2">{plan.name} Solar</CardTitle>
                <CardDescription className="text-white/90 text-lg font-semibold">
                  {plan.capacity} System
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>For:</strong> {plan.forHomes}
                  </div>
                  <div className="text-sm">
                    <strong>Details:</strong> {plan.details}
                  </div>
                  <div className="text-sm">
                    <strong>Ideal for:</strong> {plan.idealFor}
                  </div>
                </div>

                <div className="text-center py-4">
                  <div className="text-2xl font-bold text-yellow-300 mb-1">
                    {plan.price}
                  </div>
                  <div className="text-lg font-semibold text-white/90">
                    {plan.savings}
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-white/90 text-sm">
                      <Check className="w-4 h-4 text-yellow-300" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full mt-6 font-bold py-3 text-lg transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'bg-yellow-400 text-green-900 hover:bg-yellow-300'
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect(plan.id);
                  }}
                >
                  {selectedPlan === plan.id ? 'Selected ✓' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          {/* Continue Button */}
          <Button
            size="lg"
            className={`px-12 py-4 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 ${
              selectedPlan
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-green-900 hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!selectedPlan}
          >
            {selectedPlan ? (
              <div className="flex items-center gap-2">
                <span>Continue with {plans.find(p => p.id === selectedPlan)?.name}</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            ) : (
              'Select a Plan to Continue'
            )}
          </Button>

          {/* Back Button - Below main button */}
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all duration-300"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
        </div>

        {/* Plan Comparison Note */}
        {selectedPlan && (
          <div className="mt-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-white font-bold text-lg mb-2">
                Great Choice! {plans.find(p => p.id === selectedPlan)?.name} Plan Selected
              </h3>
              <p className="text-white/90">
                Next, you'll choose your installation type and get a personalized quote.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectYourPlanPage;
