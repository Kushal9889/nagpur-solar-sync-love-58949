
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, ChevronLeft, X, Info, Star, Zap, Gauge, Shield } from "lucide-react";

interface EnhancedStep4Props {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  serviceType: 'residential' | 'commercial' | 'industrial' | 'ground-mounted';
}

const EnhancedStep4: React.FC<EnhancedStep4Props> = ({ 
  data, 
  updateData, 
  onNext, 
  onPrevious, 
  serviceType 
}) => {
  const [activeTab, setActiveTab] = useState("technology");
  const [showModal, setShowModal] = useState(false);
  const [selectedTechForModal, setSelectedTechForModal] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const technologies = [
    {
      id: 'mono-bifacial',
      name: 'Mono Bifacial',
      efficiency: '22%',
      image: '/uploads/Bifacial.png',
      savings: '₹2,000/month',
      bestFor: 'Residential & Commercial',
      benefits: [
        '20% more output via dual-sided light capture',
        'Ideal for Nagpur\'s open rooftops',
        'Excellent in reflective environments',
        'Premium efficiency rating'
      ],
      detailedInfo: 'Bifacial panels capture sunlight from both front and rear sides, increasing energy generation by up to 20%. Perfect for installations with reflective surfaces like white rooftops or ground-mounted systems.'
    },
    {
      id: 'monocrystalline',
      name: 'Monocrystalline',
      efficiency: '21%',
      image: '/uploads/Monocrystalline.png',
      savings: '₹1,800/month',
      bestFor: 'Residential & Industrial',
      benefits: [
        'High efficiency in small spaces',
        'Perfect for Chandrapur\'s compact homes',
        'Excellent low-light performance',
        'Long-term reliability'
      ],
      detailedInfo: 'Made from single-crystal silicon, these panels offer the highest efficiency and perform well in high temperatures. Ideal for space-constrained installations where maximum power per square foot is crucial.'
    },
    {
      id: 'polycrystalline',
      name: 'Polycrystalline',
      efficiency: '18%',
      image: '/uploads/Polycrystalline.png',
      savings: '₹1,500/month',
      bestFor: 'Commercial & Ground-Mounted',
      benefits: [
        'Cost-effective solution',
        'Great for budget-conscious users',
        'Reliable performance',
        'Suitable for large installations'
      ],
      detailedInfo: 'Made from multiple silicon crystals, these panels offer good efficiency at a lower cost. Perfect for large-scale installations where space is not a constraint and cost-effectiveness is priority.'
    },
    {
      id: 'thin-film',
      name: 'Thin Film',
      efficiency: '15%',
      image: '/uploads/Thin Film.png',
      savings: '₹1,200/month',
      bestFor: 'Industrial',
      benefits: [
        'Lightweight and flexible',
        'Suits curved roofs',
        'Better shade tolerance',
        'Lower installation costs'
      ],
      detailedInfo: 'Ultra-thin photovoltaic cells that are lightweight and flexible. Excellent for industrial buildings with structural limitations or curved surfaces. Better performance in partial shading conditions.'
    },
    {
      id: 'topcon',
      name: 'TOPCon',
      efficiency: '23%',
      image: '/uploads/TOPCon.png',
      savings: '₹2,200/month',
      bestFor: 'Residential & Commercial',
      benefits: [
        'Cutting-edge technology',
        'Maximum output in Nagpur\'s heat',
        'Superior temperature coefficient',
        'Future-proof investment'
      ],
      detailedInfo: 'Tunnel Oxide Passivated Contact technology represents the latest advancement in solar cell design. Offers the highest efficiency with excellent temperature performance, perfect for hot climates like Nagpur.'
    }
  ];

  const brands = [
    { id: 'panasonic', name: 'Panasonic', premium: true },
    { id: 'luminous', name: 'Luminous', premium: false },
    { id: 'adani', name: 'Adani Solar', premium: false },
    { id: 'waaree', name: 'Waaree', premium: false },
    { id: 'tata', name: 'Tata Solar', premium: true },
    { id: 'vikram', name: 'Vikram Solar', premium: false }
  ];

  const inverters = [
    {
      id: 'goodwe',
      name: 'GoodWe',
      image: '/uploads/GoodWe.png',
      price: '₹22,000',
      features: ['WiFi Monitoring', '10 Year Warranty', 'German Technology']
    },
    {
      id: 'growatt',
      name: 'Growatt',
      image: '/uploads/Growatt.png',
      price: '₹20,000',
      features: ['App Control', '5 Year Warranty', 'High Efficiency']
    },
    {
      id: 'polycab',
      name: 'Polycab',
      image: '/uploads/Polycab.png',
      price: '₹21,000',
      features: ['Made in India', '5 Year Warranty', 'Robust Design']
    },
    {
      id: 'sofar',
      name: 'Sofar Solar',
      image: '/uploads/Sofar Solar.png',
      price: '₹19,000',
      features: ['Smart Monitoring', '5 Year Warranty', 'Compact Size']
    },
    {
      id: 'solis',
      name: 'Solis',
      image: '/uploads/Solis.png',
      price: '₹18,000',
      features: ['Cloud Monitoring', '5 Year Warranty', 'Wide MPPT Range']
    },
    {
      id: 'sungrow',
      name: 'Sungrow',
      image: '/uploads/Sungrow.png',
      price: '₹23,000',
      features: ['Premium Quality', '10 Year Warranty', 'Advanced MPPT']
    }
  ];

  const handleTechnologySelect = (techId: string) => {
    updateData({ selectedTechnology: techId });
    setTimeout(() => setActiveTab("brand"), 300);
  };

  const handleBrandSelect = (brandId: string) => {
    updateData({ selectedBrand: brandId });
    setTimeout(() => setActiveTab("inverter"), 300);
  };

  const handleInverterSelect = (inverterId: string) => {
    updateData({ selectedInverter: inverterId });
  };

  const openTechModal = (techId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTechForModal(techId);
    setShowModal(true);
  };

  const openTechModalFromKeyboard = (techId: string) => {
    setSelectedTechForModal(techId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTechForModal(null);
  };

  const selectedTech = selectedTechForModal ? technologies.find(t => t.id === selectedTechForModal) : null;

  const canProceed = data.selectedTechnology && data.selectedBrand && data.selectedInverter;

  return (
    <>
      <Card className="w-full max-w-7xl mx-auto shadow-2xl border-2 border-[#FFC107]">
        <CardHeader className="text-center bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-[#FFC107]" />
            <CardTitle className="text-3xl font-bold">Step 4: Select Solar Components</CardTitle>
          </div>
          <CardDescription className="text-gray-200 text-lg">
            Choose the perfect panel technology, brand, and inverter for your installation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8 bg-gradient-to-br from-[#D4EDDA] to-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-[#1A3C34] text-white">
              <TabsTrigger value="technology" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black">
                Panel Technology
              </TabsTrigger>
              <TabsTrigger value="brand" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black">
                Panel Brand
              </TabsTrigger>
              <TabsTrigger value="inverter" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black">
                Inverter Selection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="technology" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech) => (
                  <Card
                    key={tech.id}
                    className={`cursor-pointer transition-all duration-300 border-4 hover:shadow-xl transform hover:scale-105 ${
                      data.selectedTechnology === tech.id
                        ? 'border-[#FFC107] bg-gradient-to-br from-[#FFC107]/20 to-[#FF6200]/20 shadow-lg'
                        : 'border-gray-300 hover:border-[#FFC107]'
                    }`}
                    onClick={() => handleTechnologySelect(tech.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleTechnologySelect(tech.id))}
                    tabIndex={0}
                  >
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <img
                          src={tech.image}
                          alt={tech.name}
                          className={`w-full h-48 object-cover rounded-lg transition-transform duration-300 ${
                            hoveredImage === tech.id ? 'scale-110' : ''
                          }`}
                          onMouseEnter={() => setHoveredImage(tech.id)}
                          onMouseLeave={() => setHoveredImage(null)}
                        />
                        <Badge className="absolute top-2 right-2 bg-[#FFC107] text-black font-bold">
                          {tech.efficiency}
                        </Badge>
                        <Button
                          onClick={(e) => openTechModal(tech.id, e)}
                          onKeyDown={(e) => handleKeyDown(e, () => openTechModalFromKeyboard(tech.id))}
                          className="absolute bottom-2 right-2 p-2 bg-[#1A3C34] hover:bg-[#FFC107] text-white hover:text-black"
                          size="sm"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#1A3C34] mb-2">{tech.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">Best for: {tech.bestFor}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Monthly Savings:</span>
                          <span className="font-bold text-[#FF6200]">{tech.savings}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Efficiency:</span>
                          <span className="font-bold text-[#1A3C34]">{tech.efficiency}</span>
                        </div>
                      </div>

                      <ul className="space-y-1 mb-4">
                        {tech.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#FFC107] rounded-full mt-1.5 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={(e) => openTechModal(tech.id, e)}
                        onKeyDown={(e) => handleKeyDown(e, () => openTechModalFromKeyboard(tech.id))}
                        variant="outline"
                        className="w-full border-[#FFC107] text-[#1A3C34] hover:bg-[#FFC107] hover:text-black"
                      >
                        View More Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="brand" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands.map((brand) => {
                  const selectedTech = technologies.find(t => t.id === data.selectedTechnology);
                  return (
                    <Card
                      key={brand.id}
                      className={`cursor-pointer transition-all duration-300 border-4 hover:shadow-xl transform hover:scale-105 ${
                        data.selectedBrand === brand.id
                          ? 'border-[#FFC107] bg-gradient-to-br from-[#FFC107]/20 to-[#FF6200]/20 shadow-lg'
                          : 'border-gray-300 hover:border-[#FFC107]'
                      }`}
                      onClick={() => handleBrandSelect(brand.id)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleBrandSelect(brand.id))}
                      tabIndex={0}
                    >
                      <CardContent className="p-6">
                        <div className="relative mb-4">
                          <img
                            src={selectedTech?.image || '/uploads/default-panel.png'}
                            alt={`${brand.name} ${selectedTech?.name || 'Panel'}`}
                            className={`w-full h-48 object-cover rounded-lg transition-transform duration-300 ${
                              hoveredImage === brand.id ? 'scale-110' : ''
                            }`}
                            onMouseEnter={() => setHoveredImage(brand.id)}
                            onMouseLeave={() => setHoveredImage(null)}
                          />
                          {brand.premium && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                              Premium
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-[#1A3C34] mb-2 text-center">{brand.name}</h3>
                        <p className="text-sm text-gray-600 text-center mb-4">
                          {selectedTech?.name || 'Technology'} Panel
                        </p>
                        
                        <div className="flex items-center justify-center gap-2">
                          {brand.premium && <Star className="h-4 w-4 text-yellow-500" />}
                          <span className="text-sm text-[#1A3C34] font-medium">
                            {brand.premium ? 'Premium Quality' : 'Reliable Quality'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="inverter" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inverters.map((inverter) => (
                  <Card
                    key={inverter.id}
                    className={`cursor-pointer transition-all duration-300 border-4 hover:shadow-xl transform hover:scale-105 ${
                      data.selectedInverter === inverter.id
                        ? 'border-[#FFC107] bg-gradient-to-br from-[#FFC107]/20 to-[#FF6200]/20 shadow-lg'
                        : 'border-gray-300 hover:border-[#FFC107]'
                    }`}
                    onClick={() => handleInverterSelect(inverter.id)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleInverterSelect(inverter.id))}
                    tabIndex={0}
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <img
                          src={inverter.image}
                          alt={inverter.name}
                          className={`w-full h-48 object-contain rounded-lg transition-transform duration-300 ${
                            hoveredImage === inverter.id ? 'scale-110' : ''
                          }`}
                          onMouseEnter={() => setHoveredImage(inverter.id)}
                          onMouseLeave={() => setHoveredImage(null)}
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#1A3C34] mb-2 text-center">{inverter.name}</h3>
                      <p className="text-lg font-bold text-[#FF6200] text-center mb-4">{inverter.price}</p>
                      
                      <ul className="space-y-2">
                        {inverter.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <Shield className="h-3 w-3 text-[#FFC107]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mt-8">
            <Button 
              onClick={onPrevious}
              onKeyDown={(e) => handleKeyDown(e, onPrevious)}
              variant="outline" 
              className="flex-1 h-12 border-2 border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Previous: Consumption
            </Button>
            <Button 
              onClick={onNext}
              onKeyDown={(e) => handleKeyDown(e, onNext)}
              className="flex-1 h-12 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold shadow-lg"
              disabled={!canProceed}
            >
              Next: Customization
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Technology Detail Modal */}
      {showModal && selectedTech && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1A3C34]">{selectedTech.name} Technology</h2>
                <Button
                  onClick={closeModal}
                  onKeyDown={(e) => handleKeyDown(e, closeModal)}
                  variant="ghost"
                  className="p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedTech.image}
                    alt={selectedTech.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-[#FFC107]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#1A3C34]">{selectedTech.efficiency}</div>
                      <div className="text-sm text-gray-600">Efficiency</div>
                    </div>
                    <div className="text-center p-3 bg-[#FF6200]/20 rounded-lg">
                      <div className="text-lg font-bold text-[#FF6200]">{selectedTech.savings}</div>
                      <div className="text-sm text-gray-600">Monthly Savings</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-[#1A3C34] mb-2">Best For:</h4>
                    <p className="text-gray-600">{selectedTech.bestFor}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-[#1A3C34] mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  {selectedTech.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Gauge className="h-4 w-4 text-[#FFC107] mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-[#1A3C34] mb-3">Detailed Information:</h4>
                <p className="text-gray-700 leading-relaxed">{selectedTech.detailedInfo}</p>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Button
                  onClick={closeModal}
                  onKeyDown={(e) => handleKeyDown(e, closeModal)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleTechnologySelect(selectedTech.id);
                    closeModal();
                  }}
                  onKeyDown={(e) => handleKeyDown(e, () => {
                    handleTechnologySelect(selectedTech.id);
                    closeModal();
                  })}
                  className="flex-1 bg-[#FFC107] hover:bg-[#FF6200] text-black"
                >
                  Select This Technology
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedStep4;
