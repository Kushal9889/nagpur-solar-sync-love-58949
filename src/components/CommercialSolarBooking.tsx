
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Calculator, Zap, IndianRupee, ArrowRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Solar3DVisualization from './Solar3DVisualization';
import { calculateSolar, type SolarCalculationData, generateSavingsData, validatePincode } from '../utils/solarCalculations';

interface CommercialSolarBookingProps {
  onBack: () => void;
}

const CommercialSolarBooking: React.FC<CommercialSolarBookingProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SolarCalculationData>({
    bill: '',
    pincode: '',
    discom: 'commercial',
    panelBrand: 'waaree',
    walkway: false,
    elevatedStructure: false,
    solarType: 'commercial'
  });
  
  const [calculation, setCalculation] = useState<SolarCalculationData | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const results = calculateSolar(formData);
      setCalculation(results);
      setStep(4);
      
      toast({
        title: "Commercial Solar Analysis Complete!",
        description: "Your commercial solar solution is ready.",
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
    switch (step) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Commercial Solar - Business Information
              </CardTitle>
              <CardDescription className="text-purple-100">Enter your commercial electricity details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div>
                <Label htmlFor="bill" className="text-lg font-semibold">Monthly Electricity Bill (₹) *</Label>
                <Input
                  id="bill"
                  type="number"
                  value={formData.bill}
                  onChange={(e) => setFormData({...formData, bill: e.target.value})}
                  placeholder="e.g., 50000"
                  className="mt-2 h-12 text-lg"
                  min="5000"
                />
                <p className="text-sm text-gray-500 mt-1">Commercial rate: ₹20/unit average</p>
              </div>
              
              <div>
                <Label htmlFor="pincode" className="text-lg font-semibold">Business Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="e.g., 440001"
                  className="mt-2 h-12 text-lg"
                  maxLength={6}
                />
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">🏢 Commercial Benefits</h4>
                <p className="text-sm text-purple-700">
                  Higher subsidies available for commercial installations. Reduced operational costs and enhanced green credentials.
                </p>
              </div>
              
              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Next: Select Configuration <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle>Commercial Solar Configuration</CardTitle>
              <CardDescription className="text-purple-100">Select panels and customizations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              {/* Panel Selection */}
              <div>
                <Label className="text-lg font-semibold">Solar Panel Brand</Label>
                <Select value={formData.panelBrand} onValueChange={(value) => setFormData({...formData, panelBrand: value})}>
                  <SelectTrigger className="mt-2 h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waaree">Waaree Solar (₹45,000/kW)</SelectItem>
                    <SelectItem value="adani">Adani Solar (₹47,000/kW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 3D Animation Preview */}
              <Solar3DVisualization 
                walkway={formData.walkway}
                elevatedStructure={formData.elevatedStructure}
                className="mb-6"
              />

              {/* Customization Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.walkway ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setFormData({...formData, walkway: !formData.walkway})}
                >
                  <h3 className="text-lg font-semibold">Maintenance Walkway</h3>
                  <p className="text-sm text-gray-600 mt-1">Safe access for commercial maintenance</p>
                  <div className="text-xl font-bold text-purple-600 mt-2">+₹6,000/kW</div>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.elevatedStructure ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setFormData({...formData, elevatedStructure: !formData.elevatedStructure})}
                >
                  <h3 className="text-lg font-semibold">Elevated Structure</h3>
                  <p className="text-sm text-gray-600 mt-1">Enhanced efficiency and cooling</p>
                  <div className="text-xl font-bold text-purple-600 mt-2">+₹10,000/kW</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                  ← Previous
                </Button>
                <Button 
                  onClick={handleCalculate} 
                  className="flex-1 bg-purple-600 hover:bg-purple-700" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Calculate Commercial Solution →'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        if (!calculation) return null;
        
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Results Summary */}
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Your Commercial Solar Solution</CardTitle>
                <CardDescription className="text-purple-100">
                  Analysis for ₹{calculation.bill} monthly commercial bill
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{calculation.capacity} kW</div>
                  <div className="text-sm opacity-90">Solar Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{calculation.approxCostRange?.min.toLocaleString()} - ₹{calculation.approxCostRange?.max.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Cost Range</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{calculation.monthlySavings?.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Monthly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{calculation.roi} years</div>
                  <div className="text-sm opacity-90">Payback Period</div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commercial Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Units</span>
                    <span>{calculation.units} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Load</span>
                    <span>{calculation.requiredLoad} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Central Subsidy (30%)</span>
                    <span>₹{Math.round((calculation.subsidies || 0) * 0.75).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>State Subsidy (10%)</span>
                    <span>₹{Math.round((calculation.subsidies || 0) * 0.25).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Subsidies</span>
                    <span>₹{calculation.subsidies?.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Panel Brand</span>
                    <span className="capitalize">{calculation.panelBrand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Walkway</span>
                    <span>{calculation.walkway ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Elevated Structure</span>
                    <span>{calculation.elevatedStructure ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700">
                      <strong>Note:</strong> Final cost may vary based on site conditions and installation complexity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                ← Modify Configuration
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Commercial Quotation Downloaded!",
                    description: "Your detailed commercial quotation has been downloaded.",
                  });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700" 
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Quotation
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Commercial Booking Started!",
                    description: "Redirecting to commercial booking form...",
                  });
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700" 
                size="lg"
              >
                Book Commercial Installation →
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300">
            ← Back to Services
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Commercial Solar Installation
          </h1>
          <p className="text-lg text-gray-600">Step {step} of 3 - Smart solar solutions for your business</p>
          
          {/* Progress bar */}
          {step <= 3 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-6 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" 
                style={{width: `${(step / 3) * 100}%`}}
              ></div>
            </div>
          )}
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default CommercialSolarBooking;
