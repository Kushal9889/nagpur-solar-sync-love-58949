
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mountain, Calculator, Zap, IndianRupee, ArrowRight, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Solar3DVisualization from './Solar3DVisualization';
import { calculateSolar, type SolarCalculationData } from '../utils/solarCalculations';

interface GroundMountedSolarBookingProps {
  onBack: () => void;
}

const GroundMountedSolarBooking: React.FC<GroundMountedSolarBookingProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SolarCalculationData>({
    bill: '',
    pincode: '',
    discom: 'ground-mounted',
    panelBrand: 'waaree',
    walkway: false,
    elevatedStructure: false,
    solarType: 'ground-mounted',
    desiredCapacity: ''
  });
  
  const [calculation, setCalculation] = useState<SolarCalculationData | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const results = calculateSolar(formData);
      setCalculation(results);
      setStep(4);
      
      toast({
        title: "Ground-Mounted Solar Analysis Complete!",
        description: "Your ground-mounted solar solution is ready.",
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
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Mountain className="h-6 w-6" />
                Ground-Mounted Solar - Project Information
              </CardTitle>
              <CardDescription className="text-orange-100">Enter your ground-mounted project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div>
                <Label htmlFor="capacity" className="text-lg font-semibold">Desired Solar Capacity (kW) *</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.desiredCapacity}
                  onChange={(e) => setFormData({...formData, desiredCapacity: e.target.value})}
                  placeholder="e.g., 100"
                  className="mt-2 h-12 text-lg"
                  min="10"
                />
                <p className="text-sm text-gray-500 mt-1">Minimum 10 kW for ground-mounted systems</p>
              </div>
              
              <div>
                <Label htmlFor="pincode" className="text-lg font-semibold">Project Location Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="e.g., 440001"
                  className="mt-2 h-12 text-lg"
                  maxLength={6}
                />
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">🏞️ Ground-Mounted Benefits</h4>
                <p className="text-sm text-orange-700">
                  Revenue generation through government feed-in tariffs. Perfect for large land areas with maximum solar exposure.
                </p>
              </div>
              
              <Button 
                onClick={() => setStep(2)} 
                className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Next: Configure System <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle>Ground-Mounted Solar Configuration</CardTitle>
              <CardDescription className="text-orange-100">Select ground-mounted system components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div>
                <Label className="text-lg font-semibold">Ground-Mounted Panel Brand</Label>
                <Select value={formData.panelBrand} onValueChange={(value) => setFormData({...formData, panelBrand: value})}>
                  <SelectTrigger className="mt-2 h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waaree">Waaree Ground-Mount (₹45,000/kW)</SelectItem>
                    <SelectItem value="adani">Adani Ground-Mount (₹47,000/kW)</SelectItem>
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
                    formData.walkway ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setFormData({...formData, walkway: !formData.walkway})}
                >
                  <h3 className="text-lg font-semibold">Maintenance Pathways</h3>
                  <p className="text-sm text-gray-600 mt-1">Ground-level maintenance access</p>
                  <div className="text-xl font-bold text-orange-600 mt-2">+₹6,000/kW</div>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.elevatedStructure ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => setFormData({...formData, elevatedStructure: !formData.elevatedStructure})}
                >
                  <h3 className="text-lg font-semibold">Elevated Tracking System</h3>
                  <p className="text-sm text-gray-600 mt-1">Solar tracking for maximum efficiency</p>
                  <div className="text-xl font-bold text-orange-600 mt-2">+₹10,000/kW</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">💰 Revenue Model</h4>
                <p className="text-sm text-yellow-700">
                  Ground-mounted systems generate revenue through government feed-in tariffs at ₹3/unit for 25 years.
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                  ← Previous
                </Button>
                <Button 
                  onClick={handleCalculate} 
                  className="flex-1 bg-orange-600 hover:bg-orange-700" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Calculating...' : 'Calculate Revenue Potential →'}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        if (!calculation) return null;
        
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Your Ground-Mounted Solar Solution</CardTitle>
                <CardDescription className="text-orange-100">
                  Revenue analysis for {calculation.capacity} kW ground-mounted system
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{calculation.capacity} kW</div>
                  <div className="text-sm opacity-90">Solar Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{calculation.approxCostRange?.min.toLocaleString()} - ₹{calculation.approxCostRange?.max.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Investment Range</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{calculation.monthlyRevenue?.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Monthly Revenue</div>
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
                  <CardTitle>Revenue Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Daily Generation</span>
                    <span>{(calculation.capacity || 0) * 4} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Generation</span>
                    <span>{(calculation.capacity || 0) * 4 * 30} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Government Rate</span>
                    <span>₹3/unit</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-600">
                    <span>Monthly Revenue</span>
                    <span>₹{calculation.monthlyRevenue?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-600">
                    <span>Annual Revenue</span>
                    <span>₹{((calculation.monthlyRevenue || 0) * 12).toLocaleString()}</span>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>25-Year Revenue:</strong> ₹{((calculation.monthlyRevenue || 0) * 12 * 25).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Investment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Panel Technology</span>
                    <span className="capitalize">{calculation.panelBrand} Ground-Mount</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plant Cost</span>
                    <span>₹{calculation.plantCost?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Government Subsidies</span>
                    <span>₹{calculation.subsidies?.toLocaleString()}</span>
                  </div>
                  {calculation.customizationCost! > 0 && (
                    <div className="flex justify-between">
                      <span>Enhancements</span>
                      <span>₹{calculation.customizationCost?.toLocaleString()}</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>Net Investment</span>
                    <span>₹{((calculation.approxCostRange?.min || 0) + (calculation.approxCostRange?.max || 0)) / 2}</span>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-700">
                      <strong>Land Requirement:</strong> Approximately {Math.round((calculation.capacity || 0) * 4)} sq meters
                    </p>
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
                    title: "Ground-Mounted Quotation Downloaded!",
                    description: "Your detailed ground-mounted quotation has been downloaded.",
                  });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700" 
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Business Plan
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Ground-Mounted Project Started!",
                    description: "Redirecting to project booking form...",
                  });
                }}
                className="flex-1 bg-orange-600 hover:bg-orange-700" 
                size="lg"
              >
                Start Project →
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300">
            ← Back to Services
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Ground-Mounted Solar
          </h1>
          <p className="text-lg text-gray-600">Step {step} of 3 - Large-scale ground-mounted solar projects</p>
          
          {step <= 3 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-6 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500" 
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

export default GroundMountedSolarBooking;
