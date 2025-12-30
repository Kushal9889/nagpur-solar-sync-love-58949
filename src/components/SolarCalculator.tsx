
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Zap, IndianRupee } from "lucide-react";

interface CalculatorResult {
  systemSize: number;
  subsidy: number;
  totalCost: number;
  postSubsidyCost: number;
  monthlySavings: number;
  co2Saved: number;
}

const SolarCalculator: React.FC = () => {
  const [roofSize, setRoofSize] = useState<string>('');
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculateSolar = () => {
    const roofSqFt = parseFloat(roofSize);
    const billAmount = parseFloat(monthlyBill);
    
    if (roofSqFt && billAmount) {
      // AI-driven calculation logic (simplified)
      const systemSize = Math.min(Math.max(billAmount / 1000, 3), 5); // 3-5 kW range
      const totalCost = systemSize * 70000; // ₹70k per kW
      const subsidy = systemSize * 26000; // ₹26k per kW subsidy
      const postSubsidyCost = totalCost - subsidy;
      const monthlySavings = billAmount * 0.8; // 80% bill reduction
      const co2Saved = systemSize * 1.5 * 12; // 1.5 tons CO2 per kW per year
      
      setResult({
        systemSize,
        subsidy,
        totalCost,
        postSubsidyCost,
        monthlySavings,
        co2Saved
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-yellow-500" />
          Solar Subsidy Calculator
        </CardTitle>
        <CardDescription>
          Calculate your solar system size, subsidies, and savings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="roofSize">Roof Size (sq ft)</Label>
            <Input
              id="roofSize"
              type="number"
              placeholder="Enter roof area"
              value={roofSize}
              onChange={(e) => setRoofSize(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyBill">Monthly Electricity Bill (₹)</Label>
            <Input
              id="monthlyBill"
              type="number"
              placeholder="Enter monthly bill"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
            />
          </div>
        </div>
        
        <Button onClick={calculateSolar} className="w-full" size="lg">
          <Zap className="h-4 w-4 mr-2" />
          Calculate Solar Potential
        </Button>

        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Solar Solution</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{result.systemSize} kW</div>
                <div className="text-sm text-gray-600">Recommended System</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5" />
                  {result.subsidy.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Government Subsidy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5" />
                  {result.postSubsidyCost.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Your Investment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5" />
                  {result.monthlySavings.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{result.co2Saved}</div>
                <div className="text-sm text-gray-600">Tons CO2 Saved/Year</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">5 Years</div>
                <div className="text-sm text-gray-600">Warranty</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolarCalculator;
