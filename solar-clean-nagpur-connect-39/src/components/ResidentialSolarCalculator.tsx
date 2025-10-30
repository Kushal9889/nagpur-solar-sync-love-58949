
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, IndianRupee, Sun, Download, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ResidentialCalculatorStep1 } from './residential-calculator/Step1';
import { ResidentialCalculatorStep2 } from './residential-calculator/Step2';
import { ResidentialCalculatorStep3 } from './residential-calculator/Step3';
import { ResidentialCalculatorStep4 } from './residential-calculator/Step4';
import { calculateResidentialSolar } from '../utils/residentialSolarCalculations';

export interface ResidentialCalculatorData {
  // Step 1
  bill: string;
  pincode: string;
  discom: string;
  roofSize: string;
  sanctionedLoad: string;
  
  // Step 2
  panelBrand: string;
  
  // Step 3
  walkway: boolean;
  elevatedStructure: boolean;
  
  // Results
  units?: number;
  capacity?: number;
  plantCost?: number;
  subsidies?: number;
  customizationCost?: number;
  netCost?: number;
  monthlySavings?: number;
  roi?: number;
}

const ResidentialSolarCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<ResidentialCalculatorData>({
    bill: '',
    pincode: '',
    discom: '',
    roofSize: '',
    sanctionedLoad: '',
    panelBrand: 'waaree',
    walkway: false,
    elevatedStructure: false,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (newData: Partial<ResidentialCalculatorData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const results = calculateResidentialSolar(data);
      updateData(results);
      setCurrentStep(4);
      
      toast({
        title: "Calculation Complete!",
        description: "Your residential solar analysis is ready.",
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ResidentialCalculatorStep1
            data={data}
            updateData={updateData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ResidentialCalculatorStep2
            data={data}
            updateData={updateData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ResidentialCalculatorStep3
            data={data}
            updateData={updateData}
            onNext={handleCalculate}
            onPrevious={handlePrevious}
            loading={loading}
          />
        );
      case 4:
        return (
          <ResidentialCalculatorStep4
            data={data}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Calculator className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Residential Solar Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your solar capacity, subsidies, and savings for your home in Maharashtra
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span>MNRE Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span>MSEDCL Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-green-500" />
              <span>300+ Sunny Days in Maharashtra</span>
            </div>
          </div>
          
          {/* Urgency Banner */}
          <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-lg max-w-md mx-auto">
            <p className="text-orange-800 font-medium text-sm">
              ⚡ Only 50 subsidy slots left in Nagpur! Calculate now!
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  step <= currentStep
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-300 text-gray-500'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Panel Selection</span>
            <span>Customization</span>
            <span>Results</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ResidentialSolarCalculator;
