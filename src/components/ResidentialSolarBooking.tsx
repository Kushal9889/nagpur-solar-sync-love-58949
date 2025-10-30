
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, IndianRupee, ArrowRight, Home, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Solar3DVisualization from './Solar3DVisualization';
import { calculateSolar, type SolarCalculationData, generateSavingsData, validatePincode } from '../utils/solarCalculations';

interface ResidentialSolarBookingProps {
  onBack: () => void;
}

const ResidentialSolarBooking: React.FC<ResidentialSolarBookingProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SolarCalculationData>({
    bill: '',
    pincode: '',
    discom: '',
    panelBrand: 'waaree',
    walkway: false,
    elevatedStructure: false,
    solarType: 'residential'
  });
  
  const [calculation, setCalculation] = useState<SolarCalculationData | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const results = calculateSolar(formData);
      setCalculation(results);
      setStep(5);
      
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

  const validateStep1 = () => {
    const bill = parseFloat(formData.bill);
    
    if (!formData.bill || bill < 500 || bill > 50000) {
      toast({
        title: "Invalid Bill Amount",
        description: "Please enter a bill amount between ₹500 and ₹50,000",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.pincode || !validatePincode(formData.pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit Indian pincode",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.discom) {
      toast({
        title: "Select DISCOM",
        description: "Please select your electricity distribution company",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Home className="h-6 w-6" />
                Residential Solar - Basic Information
              </CardTitle>
              <CardDescription className="text-green-100">Enter your electricity bill details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div>
                <Label htmlFor="bill" className="text-lg font-semibold">Monthly Electricity Bill (₹) *</Label>
                <Input
                  id="bill"
                  type="number"
                  value={formData.bill}
                  onChange={(e) => setFormData({...formData, bill: e.target.value})}
                  placeholder="e.g., 10000"
                  className="mt-2 h-12 text-lg"
                  min="500"
                  max="50000"
                />
                <p className="text-sm text-gray-500 mt-1">Range: ₹500 - ₹50,000</p>
              </div>
              
              <div>
                <Label htmlFor="pincode" className="text-lg font-semibold">Pincode *</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  placeholder="e.g., 440001"
                  className="mt-2 h-12 text-lg"
                  maxLength={6}
                />
                <p className="text-sm text-gray-500 mt-1">6-digit Indian pincode</p>
              </div>
              
              <div>
                <Label className="text-lg font-semibold">Electricity Distribution Company (DISCOM) *</Label>
                <Select value={formData.discom} onValueChange={(value) => setFormData({...formData, discom: value})}>
                  <SelectTrigger className="mt-2 h-12 text-lg">
                    <SelectValue placeholder="Select your DISCOM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="msedcl">MSEDCL (₹10.8/unit)</SelectItem>
                    <SelectItem value="adani">Adani Electricity (₹11.2/unit)</SelectItem>
                    <SelectItem value="tata">Tata Power (₹11.0/unit)</SelectItem>
                    <SelectItem value="best">BEST (₹10.5/unit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Smart Calculation</h4>
                <p className="text-sm text-blue-700">
                  We'll automatically calculate your required load and roof space based on your electricity bill. No need to measure!
                </p>
              </div>
              
              <Button 
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }} 
                className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Next: Select Panel Brand <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle>Step 2: Select Solar Panel Brand</CardTitle>
              <CardDescription className="text-green-100">Choose from our certified panel brands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: 'waaree',
                    name: 'Waaree Solar',
                    price: 45000,
                    features: ['Tier-1 Manufacturer', '25 Year Warranty', 'High Efficiency', 'Made in India'],
                    efficiency: '20.5%',
                    popular: true,
                  },
                  {
                    id: 'adani',
                    name: 'Adani Solar',
                    price: 47000,
                    features: ['Premium Quality', '25 Year Warranty', 'Weather Resistant', 'Advanced Technology'],
                    efficiency: '21.0%',
                    popular: false,
                  },
                ].map((panel) => (
                  <div
                    key={panel.id}
                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                      formData.panelBrand === panel.id
                        ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setFormData({...formData, panelBrand: panel.id})}
                  >
                    {panel.popular && (
                      <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{panel.name}</h3>
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        ₹{panel.price.toLocaleString()}/kW
                      </div>
                      <div className="text-sm text-gray-600">Including installation</div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="font-medium">{panel.efficiency}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
                      <ul className="space-y-1">
                        {panel.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {formData.panelBrand === panel.id && (
                      <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                        <p className="text-green-800 text-sm font-medium text-center">
                          ✓ Selected
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1">
                  ← Previous
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
                  Next: Customization →
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle>Step 3: Customize Your Installation</CardTitle>
              <CardDescription className="text-green-100">Optional features to enhance your solar system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              
              {/* 3D Animation Preview */}
              <Solar3DVisualization 
                walkway={formData.walkway}
                elevatedStructure={formData.elevatedStructure}
                className="mb-8"
              />

              {/* Customization Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.walkway
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setFormData({...formData, walkway: !formData.walkway})}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Walkway Around Panels</h3>
                      <p className="text-sm text-gray-600 mt-1">Horizontal walkway for maintenance access</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.walkway ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {formData.walkway && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xl font-bold text-green-600">+₹6,000/kW</div>
                    <div className="text-sm text-gray-500">Additional cost</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 text-sm">Benefits:</h4>
                    <ul className="space-y-1">
                      {['Easy maintenance access', 'Safer cleaning', 'Better aesthetics', 'Code compliance'].map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                    formData.elevatedStructure
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setFormData({...formData, elevatedStructure: !formData.elevatedStructure})}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Elevated 6x8 ft Structure</h3>
                      <p className="text-sm text-gray-600 mt-1">Raised mounting for optimal sun exposure</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.elevatedStructure ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {formData.elevatedStructure && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xl font-bold text-green-600">+₹10,000/kW</div>
                    <div className="text-sm text-gray-500">Additional cost</div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 text-sm">Benefits:</h4>
                    <ul className="space-y-1">
                      {['Improved efficiency', 'Better cooling', 'Space underneath', 'Enhanced durability'].map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1">
                  ← Previous
                </Button>
                <Button 
                  onClick={handleCalculate} 
                  className="flex-1 bg-green-600 hover:bg-green-700" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Calculating...
                    </>
                  ) : (
                    'Calculate Results →'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        if (!calculation) return null;
        
        const savingsData = generateSavingsData(calculation.monthlySavings || 0);
        
        return (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Results Summary */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Your Residential Solar Solution</CardTitle>
                <CardDescription className="text-green-100">
                  Complete analysis based on your ₹{calculation.bill} monthly bill
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{calculation.capacity} kW</div>
                  <div className="text-sm opacity-90">Solar Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹{calculation.finalCost?.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Final Cost</div>
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

            {/* Detailed Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cost Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5" />
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Plant Cost ({calculation.capacity} kW)</span>
                    <span>₹{calculation.plantCost?.toLocaleString()}</span>
                  </div>
                  {calculation.customizationCost! > 0 && (
                    <div className="flex justify-between">
                      <span>Customization Cost</span>
                      <span>₹{calculation.customizationCost?.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-green-600">
                    <span>Government Subsidies</span>
                    <span>-₹{calculation.subsidies?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Installation & Misc</span>
                    <span>₹{((calculation.finalCost || 0) - (calculation.netCost || 0)).toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Final Cost</span>
                    <span>₹{calculation.finalCost?.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    System Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Units Consumed</span>
                    <span>{calculation.units} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Load</span>
                    <span>{calculation.requiredLoad} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar Capacity (with buffer)</span>
                    <span>{calculation.capacity} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Panel Brand</span>
                    <span className="capitalize">{calculation.panelBrand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Generation</span>
                    <span>{calculation.capacity! * 4 * 30} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customizations</span>
                    <span>
                      {calculation.walkway && calculation.elevatedStructure && 'Walkway + Elevated'}
                      {calculation.walkway && !calculation.elevatedStructure && 'Walkway Only'}
                      {!calculation.walkway && calculation.elevatedStructure && 'Elevated Only'}
                      {!calculation.walkway && !calculation.elevatedStructure && 'Standard'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 5-Year Savings Graph */}
            <Card>
              <CardHeader>
                <CardTitle>5-Year Savings Projection</CardTitle>
                <CardDescription>Your monthly and cumulative savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {savingsData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div className="text-xs mb-1">₹{Math.round(data.cumulative / 1000)}k</div>
                      <div 
                        className="bg-gradient-to-t from-green-500 to-green-300 w-full rounded-t"
                        style={{ height: `${(data.cumulative / (savingsData[11]?.cumulative || 1)) * 200}px` }}
                      ></div>
                      <div className="text-xs mt-1">{data.month}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-lg font-semibold">
                    Total 5-Year Savings: ₹{(savingsData[11]?.cumulative * 5).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button onClick={() => setStep(3)} variant="outline" size="lg" className="flex-1">
                ← Modify Configuration
              </Button>
              <Button 
                onClick={() => {
                  // Generate PDF quotation logic here
                  toast({
                    title: "Quotation Downloaded!",
                    description: "Your detailed quotation has been downloaded as PDF.",
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
                    title: "Booking Started!",
                    description: "Redirecting to booking form...",
                  });
                }}
                className="flex-1 bg-green-600 hover:bg-green-700" 
                size="lg"
              >
                Book Installation →
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={onBack} variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-300">
            ← Back to Services
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Residential Solar Installation
          </h1>
          <p className="text-lg text-gray-600">Step {step} of 3 - Smart solar solutions for your home</p>
          
          {/* Progress bar */}
          {step <= 3 && (
            <div className="w-full bg-gray-200 rounded-full h-3 mt-6 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500" 
                style={{width: `${(step / 3) * 100}%`}}
              ></div>
            </div>
          )}
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>MNRE Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-blue-500" />
              <span>Smart Load Calculation</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-green-500" />
              <span>No Roof Measurement Needed</span>
            </div>
          </div>
          
          {/* Urgency Banner */}
          <div className="mt-4 p-3 bg-orange-100 border border-orange-300 rounded-lg max-w-md mx-auto">
            <p className="text-orange-800 font-medium text-sm">
              ⚡ Only 50 subsidy slots left in Maharashtra! Calculate now!
            </p>
          </div>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default ResidentialSolarBooking;
