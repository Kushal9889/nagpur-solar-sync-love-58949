
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Sun, Zap, TrendingUp, Users, Award } from "lucide-react";

const SolarCalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  const [monthlyBill, setMonthlyBill] = useState([150]);
  const [roofArea, setRoofArea] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateSolar = () => {
    const bill = monthlyBill[0];
    const estimatedCapacity = Math.round((bill / 1000) * 0.8 * 10) / 10;
    const systemCost = estimatedCapacity * 60000;
    const subsidyAmount = Math.min(systemCost * 0.4, 78000);
    const finalCost = systemCost - subsidyAmount;
    const annualSavings = bill * 12 * 0.8; // Fixed typo here
    const paybackYears = Math.round((finalCost / annualSavings) * 10) / 10;

    setResults({
      capacity: estimatedCapacity,
      systemCost,
      subsidyAmount,
      finalCost,
      annualSavings,
      paybackYears
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Solar Calculator</h1>
          <p className="text-xl text-gray-200">Calculate your solar potential and savings in Massachusetts</p>
        </div>

        <Card className="bg-white shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              Solar Savings Calculator
            </CardTitle>
            <CardDescription className="text-gray-200">
              Enter your details to get personalized solar recommendations
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            <div>
              <Label className="text-lg font-semibold text-[#1A3C34] mb-4 block">
                Monthly Electricity Bill ($)
              </Label>
              <Slider
                value={monthlyBill}
                onValueChange={setMonthlyBill}
                min={50}
                max={1000}
                step={10}
                className="w-full mb-4"
              />
              <div className="text-center">
                <span className="text-3xl font-bold text-[#1A3C34]">${monthlyBill[0].toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="roofArea" className="text-lg font-semibold text-[#1A3C34]">
                  Available Roof Area (sq ft)
                </Label>
                <Input
                  id="roofArea"
                  type="number"
                  value={roofArea}
                  onChange={(e) => setRoofArea(e.target.value)}
                  placeholder="e.g., 400"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="text-lg font-semibold text-[#1A3C34]">
                  Location
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Boston"
                  className="mt-2"
                />
              </div>
            </div>

            <Button
              onClick={calculateSolar}
              className="w-full h-14 bg-[#1A3C34] hover:bg-[#2D5A4D] text-white font-bold text-xl"
            >
              Calculate Solar Potential
            </Button>

            {results && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <h3 className="text-2xl font-bold text-[#1A3C34] mb-6 text-center">Your Solar Report</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold">Recommended Capacity</span>
                    </div>
                    <div className="text-2xl font-bold text-[#1A3C34]">{results.capacity} kW</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="font-semibold">Annual Savings</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">${results.annualSavings.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold">System Cost</span>
                    </div>
                    <div className="text-2xl font-bold text-[#1A3C34]">${results.systemCost.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-orange-500" />
                      <span className="font-semibold">Federal Tax Credit (30%)</span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">${results.subsidyAmount.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-[#1A3C34] text-white rounded-lg text-center">
                  <div className="text-lg mb-2">Final Cost After Tax Credit</div>
                  <div className="text-3xl font-bold text-[#FFC107]">${results.finalCost.toLocaleString()}</div>
                  <div className="text-sm mt-2">Payback Period: {results.paybackYears} years</div>
                </div>
                
                <Button
                  onClick={() => navigate('/booking')}
                  className="w-full mt-6 h-14 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold text-xl"
                >
                  Book Free Site Survey
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SolarCalculatorPage;
