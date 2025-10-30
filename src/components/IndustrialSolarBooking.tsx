
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Factory, Calculator, Zap, IndianRupee, ArrowRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Solar3DVisualization from './Solar3DVisualization';
import { calculateSolar, type SolarCalculationData } from '../utils/solarCalculations';

interface IndustrialSolarBookingProps {
  onBack: () => void;
}

const IndustrialSolarBooking: React.FC<IndustrialSolarBookingProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SolarCalculationData>({
    bill: '',
    pincode: '',
    discom: 'industrial',
    panelBrand: 'waaree',
    walkway: false,
    elevatedStructure: false,
    solarType: 'industrial'
  });
  
  const [calculation, setCalculation] = useState<SolarCalculationData | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const results = calculateSolar(formData);
      setCalculation(results);
      setStep(4);
      
      toast({
        title: "Industrial Solar Analysis Complete!",
        description: "Your industrial solar solution is ready.",
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
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-6 w-6" />
                Industrial Solar - Facility Information
              </CardTitle>
              <CardDescription className="text-green-100">Enter your industrial electricity details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div>
                <Label htmlFor="bill" className="text-lg font-semibold">Monthly Electricity Bill (₹) *</Label>
                <Input
                  id="bill"
                  type="number"
                  value={formData.bill}
                  onChange={(e) => setFormData({...formData, bill: e.target.value})}
                  placeholder="e.g., 100000"
                  className="mt-2 h-12 text-lg"
                  min="10000"
                />
                <p className="text-sm text-gray-500 mt-1">Industrial rate: ₹9/unit average</p>
              </div>
              
              <div>
                <Label htmlFor="pincode" className="text-lg font-semibold">Factory Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="e.g., 440001"
                  className="mt-2 h-12 text-lg"
                  maxLength={6}
                />
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🏭 Industrial Advantages</h4>
                <p className="text-sm text-green-700">
                  Lowest electricity rates and highest subsidies available. Reduce operational costs significantly and improve sustainability metrics.
                </p>
              </div>
              
              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                Next: Configure System <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle>Industrial Solar Configuration</CardTitle>
              <CardDescription className="text-green-100">Select industrial-grade components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div>
                <Label className="text-lg font-semibold">Industrial Panel Brand</Label>
                <Select value={formData.panelBrand} onValueChange={(value) => setFormData({...formData, panelBrand: value})}>
                  <SelectTrigger className="mt-2 h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waaree">Waaree Industrial (₹45,000/kW)</SelectItem>
                    <SelectItem value="adani">Adani Industrial (₹47,000/kW)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Solar3DVisualization 
                walkway={formData.walkway}
                elevatedStructure={formData.elevatedStructure}
                className="mb-6"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.walkway ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setFormData({...formData, walkway: !formData.walkway})}
                >
                  <h3 className="text-lg font-semibold">Industrial Walkway</h3>
                  <p className="text-sm text-gray-600 mt-1">Heavy-duty maintenance access</p>
                  <div className="text-xl font-bold text-green-600 mt-2">+₹6,000/kW</div>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.elevatedStructure ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setFormData({...formData, elevatedStructure: !formData.elevatedStructure})}
                >
                  <h3 className="text-lg font-semibold">Elevated Industrial Structure</h3>
                  <p className="text-sm text-gray-600 mt-1">Maximum cooling and efficiency</p>
                  <div className="text-xl font-bold text-green-600 mt-2">+₹10,000/kW</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                  ← Previous
                </Button>
                <Button 
                  onClick={handleCalculate} 
                  className="flex-1 bg-green-600 hover:bg-green-700" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Calculate Industrial Solution →'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        if (!calculation) return null;
        
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Your Industrial Solar Solution</CardTitle>
                <CardDescription className="text-green-100">
                  Analysis for ₹{calculation.bill} monthly industrial bill
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Industrial Benefits</CardTitle>
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
                    <span>Low Industrial Rate</span>
                    <span>₹9/unit</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600">
                    <span>Total Subsidies</span>
                    <span>₹{calculation.subsidies?.toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Eco Impact:</strong> This system will offset approximately {Math.round((calculation.capacity || 0) * 4 * 365 * 0.7 / 1000)} tons of CO2 annually.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Panel Technology</span>
                    <span className="capitalize">{calculation.panelBrand} Industrial</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Generation</span>
                    <span>{(calculation.capacity || 0) * 4} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Generation</span>
                    <span>{Math.round((calculation.capacity || 0) * 4 * 365).toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance Access</span>
                    <span>{calculation.walkway ? 'Walkway Included' : 'Standard Access'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Structure Type</span>
                    <span>{calculation.elevatedStructure ? 'Elevated' : 'Standard'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                ← Modify Configuration
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Industrial Quotation Downloaded!",
                    description: "Your detailed industrial quotation has been downloaded.",
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
                    title: "Industrial Booking Started!",
                    description: "Redirecting to industrial booking form...",
                  });
                }}
                className="flex-1 bg-green-600 hover:bg-green-700" 
                size="lg"
              >
                Book Industrial Installation →
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300">
            ← Back to Services
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Industrial Solar Installation
          </h1>
          <p className="text-lg text-gray-600">Step {step} of 3 - Large-scale solar solutions for industry</p>
          
          {step <= 3 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-6 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" 
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

export default IndustrialSolarBooking;
