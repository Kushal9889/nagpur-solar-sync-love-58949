
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Download, Zap, IndianRupee, Sun, Calculator } from "lucide-react";
import { ResidentialCalculatorData } from '../ResidentialSolarCalculator';
import { generateSavingsData } from '../../utils/residentialSolarCalculations';

interface Step4Props {
  data: ResidentialCalculatorData;
  onPrevious: () => void;
}

export const ResidentialCalculatorStep4: React.FC<Step4Props> = ({ data, onPrevious }) => {
  const savingsData = data.monthlySavings ? generateSavingsData(data.monthlySavings) : [];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const chartConfig = {
    cumulative: {
      label: "Cumulative Savings",
      color: "#10b981",
    },
  };

  const handleBookNow = () => {
    // This would integrate with the booking system
    window.open('#booking', '_blank');
  };

  const handleDownloadQuotation = () => {
    // This would generate and download a PDF quotation
    const quotationData = {
      ...data,
      timestamp: new Date().toISOString(),
      quotationId: `RSC-${Date.now()}`,
    };
    
    console.log('Generating quotation PDF:', quotationData);
    alert('Quotation download will be implemented with PDF generation library');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Calculator className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-800">Calculation Complete!</CardTitle>
          </div>
          <CardDescription className="text-lg">
            Your residential solar system analysis is ready. Here's what we recommend for your home.
          </CardDescription>
          
          {/* Solar Starter Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-100 border border-orange-300 rounded-full">
            <Sun className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">🎉 Solar Starter Badge Earned!</span>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{data.capacity} kW</div>
          <div className="text-sm text-gray-600">Recommended System</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(data.subsidies || 0)}</div>
          <div className="text-sm text-gray-600">Total Subsidies</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">{formatCurrency(data.netCost || 0)}</div>
          <div className="text-sm text-gray-600">Your Investment</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{data.roi} years</div>
          <div className="text-sm text-gray-600">Return on Investment</div>
        </Card>
      </div>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-green-600" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>Plant Cost ({data.panelBrand === 'waaree' ? 'Waaree' : 'Adani'} Panels)</span>
                <span className="font-semibold">{formatCurrency(data.plantCost || 0)}</span>
              </div>
              
              {data.customizationCost && data.customizationCost > 0 && (
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Customization Cost</span>
                  <span className="font-semibold">+{formatCurrency(data.customizationCost)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <span>Central Subsidy (MNRE)</span>
                <span className="font-semibold text-green-600">-{formatCurrency(data.subsidies || 0)}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-2 border-blue-300">
                  <span className="font-semibold">Net Cost</span>
                  <span className="text-xl font-bold text-blue-600">{formatCurrency(data.netCost || 0)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              System Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium">Monthly Consumption</div>
                <div className="text-lg text-blue-600">{data.units} kWh</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium">Monthly Generation</div>
                <div className="text-lg text-green-600">{data.capacity ? data.capacity * 4 * 30 : 0} kWh</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium">Monthly Savings</div>
                <div className="text-lg text-purple-600">{formatCurrency(data.monthlySavings || 0)}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="font-medium">Annual Savings</div>
                <div className="text-lg text-orange-600">{formatCurrency((data.monthlySavings || 0) * 12)}</div>
              </div>
            </div>
            
            {/* Customizations */}
            {(data.walkway || data.elevatedStructure) && (
              <div className="mt-4 p-3 bg-blue-50 rounded">
                <div className="font-medium mb-2">Selected Customizations:</div>
                <div className="space-y-1 text-sm">
                  {data.walkway && <div>✓ Walkway around panels</div>}
                  {data.elevatedStructure && <div>✓ Elevated 6x8 ft structure</div>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 5-Year Savings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>5-Year Cumulative Savings Projection</CardTitle>
          <CardDescription>
            Expected savings over the next 5 years based on current electricity rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  formatter={(value) => [formatCurrency(value as number), "Cumulative Savings"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulative" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 text-center text-sm text-gray-600">
            Total 5-year savings: <span className="font-bold text-green-600">
              {formatCurrency((data.monthlySavings || 0) * 60)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button onClick={onPrevious} variant="outline" size="lg">
          ← Modify Inputs
        </Button>
        <Button onClick={handleDownloadQuotation} variant="outline" size="lg" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Quotation
        </Button>
        <Button onClick={handleBookNow} className="bg-orange-600 hover:bg-orange-700" size="lg">
          Book Installation Now →
        </Button>
      </div>

      {/* Trust Indicators */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Why Choose Solar Panda?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                <span>MNRE Certified Installer</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>25 Year Warranty</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <IndianRupee className="h-4 w-4 text-green-500" />
                <span>100% Subsidy Assistance</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
