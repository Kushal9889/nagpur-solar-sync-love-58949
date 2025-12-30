
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Zap, IndianRupee, Building, Factory, House } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CalculatorResult {
  category: string;
  capacity: number;
  plantCost: number;
  centralSubsidy: number;
  stateSubsidy: number;
  netCost: number;
  savings: number;
  roi: number;
  costRange?: { min: number; max: number };
  isApproximate: boolean;
}

interface StatePolicy {
  state: string;
  discom: string;
  residentialSubsidy: number;
  commercialSubsidy: number;
  electricityRate: number;
}

const SubsidyCalculator: React.FC = () => {
  const [category, setCategory] = useState<string>('residential');
  const [capacity, setCapacity] = useState<string>('');
  const [pincode, setPincode] = useState<string>('');
  const [panelBrand, setPanelBrand] = useState<string>('waaree');
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [stateInfo, setStateInfo] = useState<StatePolicy | null>(null);
  const { toast } = useToast();

  // Panel rates per kW (IndiaMart 2025)
  const panelRates = {
    waaree: 45000, // ₹45,000/kW
    adani: 47000   // ₹47,000/kW
  };

  // State-specific policies (mock data - would fetch from API)
  const statePolicies: Record<string, StatePolicy> = {
    '440001': { state: 'Maharashtra', discom: 'MSEDCL', residentialSubsidy: 0, commercialSubsidy: 10, electricityRate: 8 },
    '380001': { state: 'Gujarat', discom: 'GUVNL', residentialSubsidy: 40, commercialSubsidy: 15, electricityRate: 7 },
    '110001': { state: 'Delhi', discom: 'BSES', residentialSubsidy: 0, commercialSubsidy: 0, electricityRate: 9 },
    '500001': { state: 'Telangana', discom: 'TSSPDCL', residentialSubsidy: 20, commercialSubsidy: 10, electricityRate: 6 },
    '600001': { state: 'Tamil Nadu', discom: 'TNEB', residentialSubsidy: 0, commercialSubsidy: 5, electricityRate: 7 }
  };

  const categories = [
    { id: 'residential', name: 'Residential', icon: House, description: 'Home rooftop systems' },
    { id: 'commercial', name: 'Commercial', icon: Building, description: 'Office & shop systems' },
    { id: 'industrial', name: 'Industrial', icon: Factory, description: 'Factory & warehouse systems' },
    { id: 'ground-mounted', name: 'Ground-Mounted', icon: Zap, description: 'Large field installations' }
  ];

  const calculateCentralSubsidy = (category: string, capacity: number): number => {
    switch (category) {
      case 'residential':
        if (capacity <= 2) return capacity * 30000;
        if (capacity <= 10) return 78000;
        return 117000; // Cap for residential
      case 'commercial':
      case 'industrial':
        return Math.min(capacity * 15000, capacity * 50000 * 0.3); // 30% of benchmark ₹50/W
      case 'ground-mounted':
        if (capacity <= 500) return capacity * 15000; // 30% subsidy
        return capacity * 10000; // 20% for >500kW
      default:
        return 0;
    }
  };

  const calculateStateSubsidy = (category: string, capacity: number, statePolicy: StatePolicy): number => {
    const plantCost = capacity * panelRates[panelBrand as keyof typeof panelRates];
    
    switch (category) {
      case 'residential':
        if (statePolicy.state === 'Gujarat') {
          if (capacity <= 3) return plantCost * 0.4;
          if (capacity <= 10) return plantCost * 0.2;
        }
        return plantCost * (statePolicy.residentialSubsidy / 100);
      case 'commercial':
      case 'industrial':
      case 'ground-mounted':
        return plantCost * (statePolicy.commercialSubsidy / 100);
      default:
        return 0;
    }
  };

  const fetchPincodeData = async (pincode: string): Promise<StatePolicy | null> => {
    // Mock API call - would use real API in production
    const policy = statePolicies[pincode];
    if (policy) {
      setStateInfo(policy);
      return policy;
    }
    
    // Default to Maharashtra if pincode not found
    const defaultPolicy = { state: 'Maharashtra', discom: 'MSEDCL', residentialSubsidy: 0, commercialSubsidy: 10, electricityRate: 8 };
    setStateInfo(defaultPolicy);
    return defaultPolicy;
  };

  const calculateSubsidies = async () => {
    if (!capacity || !pincode) {
      toast({
        title: "Missing Information",
        description: "Please enter capacity and pincode to calculate subsidies.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const capacityKW = parseFloat(capacity);
      const statePolicy = await fetchPincodeData(pincode);
      
      if (!statePolicy) {
        throw new Error('Invalid pincode');
      }

      const plantCost = capacityKW * panelRates[panelBrand as keyof typeof panelRates];
      const centralSubsidy = calculateCentralSubsidy(category, capacityKW);
      const stateSubsidy = calculateStateSubsidy(category, capacityKW, statePolicy);
      const totalSubsidy = centralSubsidy + stateSubsidy;
      const netCost = plantCost - totalSubsidy;
      
      // Calculate savings (kWh/day × days × rate)
      const dailyGeneration = capacityKW * 4; // 4 kWh/day per kW
      const monthlyGeneration = dailyGeneration * 30;
      const monthlySavings = monthlyGeneration * statePolicy.electricityRate;
      
      // Calculate ROI
      const roi = netCost / (monthlySavings * 12);

      const isResidential = category === 'residential';
      
      setResult({
        category,
        capacity: capacityKW,
        plantCost,
        centralSubsidy,
        stateSubsidy,
        netCost: isResidential ? netCost : Math.round(netCost),
        savings: monthlySavings,
        roi,
        costRange: isResidential ? undefined : { 
          min: Math.round(netCost * 0.9), 
          max: Math.round(netCost * 1.1) 
        },
        isApproximate: !isResidential
      });

      toast({
        title: "Calculation Complete!",
        description: `Your ${category} solar system analysis is ready.`,
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="flex items-center justify-center gap-2">
          <Calculator className="h-6 w-6 text-green-600" />
          Multi-Category Solar Subsidy Calculator
        </CardTitle>
        <CardDescription>
          Calculate subsidies and costs for Residential, Commercial, Industrial & Ground-Mounted solar plants
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* Category Selector */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Select Solar Category</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    category === cat.id
                      ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                  }`}
                >
                  <IconComponent className={`h-8 w-8 mx-auto mb-2 ${
                    category === cat.id ? 'text-green-600' : 'text-gray-500'
                  }`} />
                  <div className="text-sm font-medium">{cat.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{cat.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="capacity">Plant Capacity (kW)</Label>
            <Input
              id="capacity"
              type="number"
              placeholder="Enter capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              min="1"
              max="1000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              type="text"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Panel Brand</Label>
            <Select value={panelBrand} onValueChange={setPanelBrand}>
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="waaree">Waaree (₹45,000/kW)</SelectItem>
                <SelectItem value="adani">Adani (₹47,000/kW)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* State Information */}
        {stateInfo && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-sm">
              <strong>Detected:</strong> {stateInfo.state} ({stateInfo.discom})
            </div>
          </div>
        )}

        {/* Calculate Button */}
        <Button 
          onClick={calculateSubsidies} 
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" 
          size="lg"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
              Calculating...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4 mr-2" />
              Calculate Subsidies & Costs
            </>
          )}
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
            <h3 className="text-xl font-bold mb-6 text-center text-green-800">
              {result.category.charAt(0).toUpperCase() + result.category.slice(1)} Solar Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{result.capacity} kW</div>
                <div className="text-sm text-gray-600">System Capacity</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">{formatCurrency(result.plantCost)}</div>
                <div className="text-sm text-gray-600">Plant Cost</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(result.centralSubsidy + result.stateSubsidy)}</div>
                <div className="text-sm text-gray-600">Total Subsidy</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(result.savings)}</div>
                <div className="text-sm text-gray-600">Monthly Savings</div>
              </div>
            </div>

            {/* Subsidy Breakdown */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Subsidy Breakdown</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>Central Subsidy (MNRE)</span>
                  <span className="font-semibold text-green-600">{formatCurrency(result.centralSubsidy)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded">
                  <span>State Subsidy</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(result.stateSubsidy)}</span>
                </div>
              </div>
            </div>

            {/* Final Cost */}
            <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2 border-green-300">
              <div className="text-lg font-semibold mb-2">
                {result.isApproximate ? 'Approximate Cost Range' : 'Net Cost'}
              </div>
              {result.isApproximate && result.costRange ? (
                <div className="text-3xl font-bold text-green-700">
                  {formatCurrency(result.costRange.min)} - {formatCurrency(result.costRange.max)}
                </div>
              ) : (
                <div className="text-3xl font-bold text-green-700">
                  {formatCurrency(result.netCost)}
                </div>
              )}
              <div className="text-sm text-gray-600 mt-2">
                ROI: {result.roi.toFixed(1)} years
              </div>
              {result.isApproximate && (
                <div className="text-xs text-orange-600 mt-2">
                  *Final cost may vary based on site conditions and installation requirements
                </div>
              )}
            </div>

            {/* Book Now Button */}
            <div className="text-center mt-6">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3">
                Book {result.category.charAt(0).toUpperCase() + result.category.slice(1)} Installation
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubsidyCalculator;
