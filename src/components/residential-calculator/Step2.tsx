
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResidentialCalculatorData } from '../ResidentialSolarCalculator';
import { PANEL_COSTS } from '../../utils/residentialSolarCalculations';

interface Step2Props {
  data: ResidentialCalculatorData;
  updateData: (data: Partial<ResidentialCalculatorData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const ResidentialCalculatorStep2: React.FC<Step2Props> = ({ data, updateData, onNext, onPrevious }) => {
  const panelOptions = [
    {
      id: 'waaree',
      name: 'Waaree Solar',
      price: PANEL_COSTS.waaree,
      features: ['Tier-1 Manufacturer', '25 Year Warranty', 'High Efficiency', 'Made in India'],
      efficiency: '20.5%',
      type: 'Monocrystalline',
      popular: true,
    },
    {
      id: 'adani',
      name: 'Adani Solar',
      price: PANEL_COSTS.adani,
      features: ['Premium Quality', '25 Year Warranty', 'Weather Resistant', 'Advanced Technology'],
      efficiency: '21.0%',
      type: 'Monocrystalline',
      popular: false,
    },
  ];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="text-2xl">Step 2: Select Solar Panel Brand</CardTitle>
        <CardDescription>
          Choose from our certified panel brands for your solar installation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {panelOptions.map((panel) => (
            <div
              key={panel.id}
              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                data.panelBrand === panel.id
                  ? 'border-green-500 bg-green-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
              }`}
              onClick={() => updateData({ panelBrand: panel.id })}
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{panel.type}</span>
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

              {data.panelBrand === panel.id && (
                <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                  <p className="text-green-800 text-sm font-medium text-center">
                    ✓ Selected
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Quick Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Brand</th>
                  <th className="text-center py-2">Price/kW</th>
                  <th className="text-center py-2">Efficiency</th>
                  <th className="text-center py-2">Warranty</th>
                </tr>
              </thead>
              <tbody>
                {panelOptions.map((panel) => (
                  <tr key={panel.id} className="border-b last:border-b-0">
                    <td className="py-2 font-medium">{panel.name}</td>
                    <td className="py-2 text-center">₹{panel.price.toLocaleString()}</td>
                    <td className="py-2 text-center">{panel.efficiency}</td>
                    <td className="py-2 text-center">25 Years</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={onPrevious} variant="outline" size="lg" className="flex-1">
            ← Previous
          </Button>
          <Button onClick={onNext} className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
            Next: Customization →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
