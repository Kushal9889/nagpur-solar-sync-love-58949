
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Calculator, Settings, Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Solar Panda!",
      description: "Your gateway to clean, affordable solar energy in Nagpur & Chandrapur",
      icon: Sun,
      content: "Save ₹14,000/month with solar power. We help homeowners, businesses, and industries switch to renewable energy.",
      visual: "animated-solar-panels"
    },
    {
      title: "Step 1: Calculate Savings",
      description: "Discover how much you can save with our smart calculator",
      icon: Calculator,
      content: "Enter your electricity bill and get instant estimates for solar capacity, costs, and monthly savings.",
      visual: "calculator-demo"
    },
    {
      title: "Step 2: Customize Your System",
      description: "Design your perfect solar installation",
      icon: Settings,
      content: "Choose panel types, add walkways, elevated structures, and see 3D visualizations of your setup.",
      visual: "3d-customization"
    },
    {
      title: "Step 3: Book Installation",
      description: "Connect with verified installers in your area",
      icon: Calendar,
      content: "Select from MSEDCL empanelled dealers, schedule installation, and track your solar journey.",
      visual: "booking-process"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader className="text-center relative">
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-0"
            onClick={skip}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center">
              <Icon className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-2xl text-green-800">{step.title}</CardTitle>
          <p className="text-green-600">{step.description}</p>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          {/* Visual representation based on step */}
          <div className="h-40 bg-gradient-to-b from-sky-200 to-green-100 rounded-lg flex items-center justify-center">
            {step.visual === 'animated-solar-panels' && (
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((panel) => (
                  <div 
                    key={panel}
                    className="w-12 h-8 bg-blue-800 rounded animate-pulse"
                    style={{ animationDelay: `${panel * 0.2}s` }}
                  />
                ))}
              </div>
            )}
            
            {step.visual === 'calculator-demo' && (
              <div className="space-y-2">
                <div className="bg-white p-3 rounded-lg shadow">
                  <div className="text-sm text-gray-600">Monthly Bill</div>
                  <div className="text-xl font-bold text-green-600">₹10,000</div>
                </div>
                <div className="text-2xl">↓</div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="text-sm text-green-600">Monthly Savings</div>
                  <div className="text-xl font-bold text-green-800">₹14,256</div>
                </div>
              </div>
            )}
            
            {step.visual === '3d-customization' && (
              <div className="relative">
                <div className="w-24 h-16 bg-gray-400 rounded"></div>
                <div className="absolute top-2 left-2 right-2 h-2 bg-blue-800 rounded"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded"></div>
              </div>
            )}
            
            {step.visual === 'booking-process' && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">1</div>
                <div className="w-4 h-1 bg-green-300"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">2</div>
                <div className="w-4 h-1 bg-green-300"></div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">3</div>
              </div>
            )}
          </div>
          
          <p className="text-gray-700 leading-relaxed">{step.content}</p>
          
          {/* Progress indicators */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentStep ? 'bg-green-600' : 'bg-green-200'
                }`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button variant="ghost" onClick={skip} className="text-gray-500">
              Skip Tutorial
            </Button>
            
            <Button 
              onClick={nextStep}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
