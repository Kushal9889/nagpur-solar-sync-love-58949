
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResidentialCalculatorData } from '../ResidentialSolarCalculator';
import { validatePincode } from '../../utils/residentialSolarCalculations';
import { useToast } from "@/hooks/use-toast";

interface Step1Props {
  data: ResidentialCalculatorData;
  updateData: (data: Partial<ResidentialCalculatorData>) => void;
  onNext: () => void;
}

export const ResidentialCalculatorStep1: React.FC<Step1Props> = ({ data, updateData, onNext }) => {
  const { toast } = useToast();

  const handleNext = () => {
    // Validation
    const bill = parseFloat(data.bill);
    const roofSize = parseFloat(data.roofSize);
    const sanctionedLoad = parseFloat(data.sanctionedLoad);

    if (!data.bill || bill < 500 || bill > 50000) {
      toast({
        title: "Invalid Bill Amount",
        description: "Please enter a bill amount between ₹500 and ₹50,000",
        variant: "destructive"
      });
      return;
    }

    if (!data.pincode || !validatePincode(data.pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit Indian pincode",
        variant: "destructive"
      });
      return;
    }

    if (!data.discom) {
      toast({
        title: "Select DISCOM",
        description: "Please select your electricity distribution company",
        variant: "destructive"
      });
      return;
    }

    if (!data.roofSize || roofSize < 100 || roofSize > 10000) {
      toast({
        title: "Invalid Roof Size",
        description: "Please enter roof size between 100 and 10,000 sq ft",
        variant: "destructive"
      });
      return;
    }

    if (!data.sanctionedLoad || sanctionedLoad < 1 || sanctionedLoad > 20) {
      toast({
        title: "Invalid Sanctioned Load",
        description: "Please enter sanctioned load between 1 and 20 kW",
        variant: "destructive"
      });
      return;
    }

    onNext();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="text-2xl">Step 1: Basic Information</CardTitle>
        <CardDescription>
          Enter your electricity bill details and property information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bill">Monthly Electricity Bill (₹) *</Label>
            <Input
              id="bill"
              type="number"
              placeholder="e.g., 10000"
              value={data.bill}
              onChange={(e) => updateData({ bill: e.target.value })}
              min="500"
              max="50000"
            />
            <p className="text-xs text-gray-500">Range: ₹500 - ₹50,000</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode *</Label>
            <Input
              id="pincode"
              type="text"
              placeholder="e.g., 440001"
              value={data.pincode}
              onChange={(e) => updateData({ pincode: e.target.value })}
              maxLength={6}
            />
            <p className="text-xs text-gray-500">6-digit Indian pincode</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discom">Electricity Distribution Company (DISCOM) *</Label>
          <Select value={data.discom} onValueChange={(value) => updateData({ discom: value })}>
            <SelectTrigger>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="roofSize">Available Roof Size (sq ft) *</Label>
            <Input
              id="roofSize"
              type="number"
              placeholder="e.g., 1500"
              value={data.roofSize}
              onChange={(e) => updateData({ roofSize: e.target.value })}
              min="100"
              max="10000"
            />
            <p className="text-xs text-gray-500">Range: 100 - 10,000 sq ft</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sanctionedLoad">Sanctioned Load (kW) *</Label>
            <Input
              id="sanctionedLoad"
              type="number"
              placeholder="e.g., 15"
              value={data.sanctionedLoad}
              onChange={(e) => updateData({ sanctionedLoad: e.target.value })}
              min="1"
              max="20"
              step="0.1"
            />
            <p className="text-xs text-gray-500">Range: 1 - 20 kW</p>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 Tip</h4>
            <p className="text-sm text-blue-700">
              Your monthly bill helps us calculate your current electricity consumption and determine the right solar capacity for your home.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🏠 Roof Space</h4>
            <p className="text-sm text-green-700">
              Each kW of solar requires approximately 108 sq ft of roof space. We'll check if your roof can accommodate the recommended system.
            </p>
          </div>
        </div>

        <Button onClick={handleNext} className="w-full bg-green-600 hover:bg-green-700" size="lg">
          Next: Select Panel Brand →
        </Button>
      </CardContent>
    </Card>
  );
};
