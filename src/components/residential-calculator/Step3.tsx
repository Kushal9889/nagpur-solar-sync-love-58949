
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResidentialCalculatorData } from '../ResidentialSolarCalculator';
import { CUSTOMIZATION_COSTS } from '../../utils/residentialSolarCalculations';

interface Step3Props {
  data: ResidentialCalculatorData;
  updateData: (data: Partial<ResidentialCalculatorData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  loading: boolean;
}

export const ResidentialCalculatorStep3: React.FC<Step3Props> = ({ data, updateData, onNext, onPrevious, loading }) => {
  const customizationOptions = [
    {
      id: 'walkway',
      name: 'Walkway Around Panels',
      description: 'Safe walkway space around solar panels for maintenance and cleaning access',
      cost: CUSTOMIZATION_COSTS.walkway,
      benefits: ['Easy maintenance access', 'Safer cleaning', 'Better aesthetics', 'Code compliance'],
      selected: data.walkway,
      onChange: (selected: boolean) => updateData({ walkway: selected }),
    },
    {
      id: 'elevated',
      name: 'Elevated 6x8 ft Structure',
      description: 'Raised mounting structure for optimal sun exposure and better cooling',
      cost: CUSTOMIZATION_COSTS.elevated,
      benefits: ['Improved efficiency', 'Better cooling', 'Easier cleaning', 'Enhanced durability'],
      selected: data.elevatedStructure,
      onChange: (selected: boolean) => updateData({ elevatedStructure: selected }),
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50">
        <CardTitle className="text-2xl">Step 3: Customize Your Installation</CardTitle>
        <CardDescription>
          Optional features to enhance your solar system performance and accessibility
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        
        {/* Animated Preview Section */}
        <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border">
          <h3 className="text-lg font-semibold mb-4 text-center">Installation Preview</h3>
          <div className="relative mx-auto w-64 h-48 bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg overflow-hidden">
            {/* Roof */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-lg"></div>
            
            {/* Solar Panels */}
            <div className="absolute bottom-8 left-4 right-4 grid grid-cols-4 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-6 bg-gradient-to-b from-blue-800 to-blue-900 rounded-sm shadow-sm"></div>
              ))}
            </div>
            
            {/* Walkway */}
            {data.walkway && (
              <div className="absolute bottom-8 left-2 right-2 h-1 bg-yellow-400 opacity-80 rounded"></div>
            )}
            
            {/* Elevated Structure */}
            {data.elevatedStructure && (
              <>
                <div className="absolute bottom-6 left-8 right-8 h-2 bg-gray-400 rounded"></div>
                <div className="absolute bottom-7 left-12 w-1 h-8 bg-gray-400"></div>
                <div className="absolute bottom-7 right-12 w-1 h-8 bg-gray-400"></div>
              </>
            )}
            
            {/* Sun */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3">
            {data.walkway || data.elevatedStructure ? 'Custom Installation Preview' : 'Standard Installation'}
          </p>
        </div>

        {/* Customization Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customizationOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                option.selected
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300'
              }`}
              onClick={() => option.onChange(!option.selected)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{option.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  option.selected ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}>
                  {option.selected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xl font-bold text-green-600">
                  +₹{option.cost.toLocaleString()}/kW
                </div>
                <div className="text-sm text-gray-500">Additional cost</div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-800 text-sm">Benefits:</h4>
                <ul className="space-y-1">
                  {option.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Summary */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">💰 Customization Cost Summary</h4>
          <div className="text-sm text-blue-700">
            {data.walkway && (
              <div>• Walkway: +₹{CUSTOMIZATION_COSTS.walkway.toLocaleString()}/kW</div>
            )}
            {data.elevatedStructure && (
              <div>• Elevated Structure: +₹{CUSTOMIZATION_COSTS.elevated.toLocaleString()}/kW</div>
            )}
            {!data.walkway && !data.elevatedStructure && (
              <div>No customizations selected - Standard installation only</div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={onPrevious} variant="outline" size="lg" className="flex-1">
            ← Previous
          </Button>
          <Button 
            onClick={onNext} 
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
};
