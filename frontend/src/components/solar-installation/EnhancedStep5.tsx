
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, AlertTriangle, Users, Droplets, Settings, Eye, RotateCcw } from "lucide-react";
import Solar3DVisualization from '../Solar3DVisualization';

interface EnhancedStep5Props {
  data: any;
  updateData: (data: any) => void;
  onPrevious: () => void;
  serviceType: 'residential' | 'commercial' | 'industrial' | 'ground-mounted';
}

const EnhancedStep5: React.FC<EnhancedStep5Props> = ({ 
  data, 
  updateData, 
  onPrevious, 
  serviceType 
}) => {
  const [viewing360, setViewing360] = useState(false);
  const [selectedView, setSelectedView] = useState<'walkway' | 'elevated' | null>(null);
  const [cleaningSchedule, setCleaningSchedule] = useState<'monthly' | 'quarterly'>('monthly');
  
  const walkwayCost = serviceType === 'residential' ? 10000 : serviceType === 'commercial' ? 15000 : 25000;
  const elevatedCost = serviceType === 'residential' ? 20000 : serviceType === 'commercial' ? 30000 : 50000;

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const toggleWalkway = () => {
    updateData({ walkway: !data.walkway });
  };

  const toggleElevated = () => {
    updateData({ elevatedStructure: !data.elevatedStructure });
  };

  const handle360View = (type: 'walkway' | 'elevated') => {
    setSelectedView(type);
    setViewing360(true);
  };

  const riskImages = [
    {
      src: '/uploads/risk-slipping.png',
      title: 'Worker Safety Risk',
      description: 'Slipping hazards without proper walkways'
    },
    {
      src: '/uploads/risk-dirty-panels.png', 
      title: 'Efficiency Loss',
      description: 'Dirty panels reduce output by 20-25%'
    },
    {
      src: '/uploads/risk-damage.png',
      title: 'Panel Damage',
      description: 'Improper cleaning can damage panels'
    }
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-2xl border-2 border-[#FFC107]">
      <CardHeader className="text-center bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Settings className="h-8 w-8 text-[#FFC107]" />
          <CardTitle className="text-3xl font-bold">Step 5: Customization & Safety</CardTitle>
        </div>
        <CardDescription className="text-gray-200 text-lg">
          Enhance your solar installation with safety features and premium options
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-8 bg-gradient-to-br from-[#D4EDDA] to-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 3D Visualization Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border-2 border-[#FFC107] shadow-lg">
              <h3 className="text-xl font-bold text-[#1A3C34] mb-4 flex items-center gap-2">
                <Eye className="h-6 w-6" />
                3D Installation Preview
              </h3>
              
              <Solar3DVisualization 
                walkway={data.walkway || false}
                elevatedStructure={data.elevatedStructure || false}
                className="mb-4"
              />
              
              <div className="flex gap-3">
                <Button
                  onClick={() => handle360View('walkway')}
                  onKeyDown={(e) => handleKeyDown(e, () => handle360View('walkway'))}
                  className="flex-1 bg-[#FFC107] hover:bg-[#FF6200] text-black font-bold"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  View Walkway 360°
                </Button>
                <Button
                  onClick={() => handle360View('elevated')}
                  onKeyDown={(e) => handleKeyDown(e, () => handle360View('elevated'))}
                  className="flex-1 bg-[#FFC107] hover:bg-[#FF6200] text-black font-bold"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  View Elevated 360°
                </Button>
              </div>
            </div>

            {/* Risk Section */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-300">
              <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Why Safety Features Matter
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                {riskImages.map((risk, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border border-red-200">
                    <div className="w-16 h-12 bg-red-100 rounded flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-red-800">{risk.title}</div>
                      <div className="text-sm text-red-600">{risk.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  ✅ Walkways ensure 95% efficiency vs. 80% without proper maintenance access!
                </p>
              </div>
            </div>
          </div>

          {/* Customization Options Column */}
          <div className="space-y-6">
            
            {/* Walkway Option */}
            <div className={`p-6 rounded-xl border-4 transition-all duration-300 cursor-pointer ${
              data.walkway 
                ? 'border-[#FFC107] bg-gradient-to-r from-[#FFC107]/20 to-[#FF6200]/20 shadow-lg'
                : 'border-gray-300 bg-white hover:border-[#FFC107]'
            }`}
            onClick={toggleWalkway}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#1A3C34] flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  Safety Walkway (6x8 ft)
                </h3>
                {data.walkway && <CheckCircle className="h-6 w-6 text-green-600" />}
              </div>
              
              <p className="text-gray-800 font-medium mb-4">
                Professional walkway system for safe panel maintenance and cleaning access.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="font-bold text-[#1A3C34]">Safety Rating</div>
                  <Badge className="bg-green-500 text-white">A+</Badge>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#1A3C34]">Efficiency Boost</div>
                  <Badge className="bg-[#FFC107] text-black">+15%</Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-700">
                  +₹{walkwayCost.toLocaleString()}
                </div>
                <div className="text-sm text-gray-800 font-medium">One-time installation cost</div>
              </div>
            </div>

            {/* Elevated Structure Option */}
            <div className={`p-6 rounded-xl border-4 transition-all duration-300 cursor-pointer ${
              data.elevatedStructure 
                ? 'border-[#FFC107] bg-gradient-to-r from-[#FFC107]/20 to-[#FF6200]/20 shadow-lg'
                : 'border-gray-300 bg-white hover:border-[#FFC107]'
            }`}
            onClick={toggleElevated}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#1A3C34]">
                  Elevated Structure (1.5m height)
                </h3>
                {data.elevatedStructure && <CheckCircle className="h-6 w-6 text-green-600" />}
              </div>
              
              <p className="text-gray-800 font-medium mb-4">
                Raised mounting system for optimal sun exposure, better cooling, and ground space utilization.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="font-bold text-[#1A3C34]">Output Boost</div>
                  <Badge className="bg-blue-500 text-white">+12%</Badge>
                </div>
                <div className="text-center">
                  <div className="font-bold text-[#1A3C34]">Cooling Effect</div>
                  <Badge className="bg-[#FFC107] text-black">Better</Badge>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-700">
                  +₹{elevatedCost.toLocaleString()}
                </div>
                <div className="text-sm text-gray-800 font-medium">One-time installation cost</div>
              </div>
            </div>

            {/* Cleaning Schedule */}
            <div className="p-6 bg-white rounded-xl border-2 border-[#FFC107] shadow-lg">
              <h3 className="text-xl font-bold text-[#1A3C34] mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Cleaning Schedule
              </h3>
              
              <div className="space-y-4">
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  cleaningSchedule === 'monthly'
                    ? 'border-[#FFC107] bg-[#FFC107]/20'
                    : 'border-gray-300 hover:border-[#FFC107]'
                }`}
                onClick={() => setCleaningSchedule('monthly')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A3C34]">Monthly Cleaning</div>
                      <div className="text-sm text-gray-600">12 visits per year</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FF6200]">₹500/month</div>
                      <div className="text-sm text-gray-600">₹6,000/year</div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  cleaningSchedule === 'quarterly'
                    ? 'border-[#FFC107] bg-[#FFC107]/20'
                    : 'border-gray-300 hover:border-[#FFC107]'
                }`}
                onClick={() => setCleaningSchedule('quarterly')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-[#1A3C34]">Quarterly Cleaning</div>
                      <div className="text-sm text-gray-600">4 visits per year</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#FF6200]">₹1,200/quarter</div>
                      <div className="text-sm text-gray-600">₹4,800/year</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="p-6 bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white rounded-xl">
              <h3 className="text-xl font-bold mb-4">Customization Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Installation</span>
                  <span>Included</span>
                </div>
                {data.walkway && (
                  <div className="flex justify-between">
                    <span>Safety Walkway</span>
                    <span>+₹{walkwayCost.toLocaleString()}</span>
                  </div>
                )}
                {data.elevatedStructure && (
                  <div className="flex justify-between">
                    <span>Elevated Structure</span>
                    <span>+₹{elevatedCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Annual Cleaning</span>
                  <span>₹{cleaningSchedule === 'monthly' ? '6,000' : '4,800'}/year</span>
                </div>
                <hr className="border-[#FFC107]" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Additional Cost</span>
                  <span className="text-[#FFC107]">
                    +₹{((data.walkway ? walkwayCost : 0) + (data.elevatedStructure ? elevatedCost : 0)).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Button 
            onClick={onPrevious}
            onKeyDown={(e) => handleKeyDown(e, onPrevious)}
            variant="outline" 
            className="flex-1 h-12 border-2 border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white"
          >
            Previous: Components
          </Button>
          <Button 
            className="flex-1 h-12 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold shadow-lg"
          >
            Complete Installation Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedStep5;
