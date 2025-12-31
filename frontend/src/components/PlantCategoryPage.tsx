
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sun, MapPin, Phone, Calculator, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlantCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [billAmount, setBillAmount] = useState<number>(2000);
  const [pincode, setPincode] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const { toast } = useToast();

  const categories = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Best for open land, easy installation and maintenance.',
      features: [
        'Stable and cost-effective',
        'Easy to clean and access',
        'Ideal for Larger Plots'
      ],
      image: '/uploads/ground-mounted.png'
    },
    {
      id: 'standard',
      name: 'Standard',
      description: '6.5 -8.5 feet high, maximize and utilise rooftop space and for better home cooling.',
      features: [
        'No loss of terrace space',
        'Better cooling and efficiency',
        'Great for urban homes'
      ],
      image: '/uploads/elevated-structure.png'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Premium: Elevated with Giant structure 8.5 × 10.5 tall and walkway for easy cleaning and access.',
      features: [
        'Multi purpose functions and get-together party use over terrace',
        'Easy cleaning and maintenance',
        'Best for premium home location'
      ],
      image: '/uploads/elevated-walkway.png'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleShowQuote = () => {
    if (!selectedCategory) {
      toast({
        title: "Please select a plan category",
        description: "Choose Basic, Standard, or Premium to continue",
        variant: "destructive"
      });
      return;
    }

    if (!pincode || !phone) {
      toast({
        title: "Please fill all details",
        description: "Pincode and phone number are required",
        variant: "destructive"
      });
      return;
    }

    // Here you would send the data to your backend
    console.log('Quote Request:', {
      category: selectedCategory,
      billAmount,
      pincode,
      phone
    });

    toast({
      title: "Quote Generated Successfully!",
      description: "We'll call you within 24 hours with your personalized quote",
    });

    navigate('/personalized-quotes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA]">
      {/* Header */}
      <div className="bg-[#1A3C34] text-white py-6 px-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={() => navigate('/select-plan')} variant="outline" className="text-white border-white hover:bg-white hover:text-[#1A3C34]">
              ← Back
            </Button>
            <div className="flex items-center gap-2">
              <Sun className="h-8 w-8 text-[#FFC107]" />
              <div>
                <h1 className="text-2xl font-bold">Massachusetts' #1 Solar Partner</h1>
                <p className="text-sm text-gray-300">Solar Panda</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#FFC107] mb-4">Select Your Plant Category</h2>
            <p className="text-xl text-gray-200">Choose the installation type that your property wants</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id 
                    ? 'ring-4 ring-[#FFC107] shadow-2xl bg-gradient-to-br from-[#FFC107]/20 to-[#FF6200]/20 border-2 border-[#FFC107]' 
                    : 'hover:shadow-xl border-2 border-transparent'
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader className="text-center relative">
                  {selectedCategory === category.id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-8 w-8 text-[#FFC107] bg-white rounded-full" />
                    </div>
                  )}
                  
                  <div className="w-full h-32 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <span className="text-sm">No Image</span><br/>
                      <span className="text-xs">Upload</span>
                    </div>
                  </div>
                  
                  <CardTitle className={`text-xl font-bold ${selectedCategory === category.id ? 'text-[#FF6200]' : 'text-white'}`}>
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-gray-200">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedCategory === category.id ? 'bg-[#FF6200]' : 'bg-[#1A3C34]'}`}></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bill Amount Slider */}
          <Card className="bg-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-[#1A3C34] flex items-center justify-center gap-2">
                <Calculator className="h-6 w-6" />
                Enter Your Monthly Electricity Bill ($)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="px-4">
                  <Slider
                    value={[billAmount]}
                    onValueChange={(value) => setBillAmount(value[0])}
                    min={50}
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1A3C34] mb-2">
                    ${billAmount.toLocaleString()}
                  </div>
                  <div className="text-lg text-[#FF6200] font-semibold">
                    Estimated Monthly Savings: ${Math.round(billAmount * 0.9).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <Label htmlFor="pincode" className="text-lg font-semibold text-[#1A3C34] mb-2 block">
                    Pincode *
                  </Label>
                  <Input
                    id="pincode"
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="h-12 text-lg border-2 border-[#1A3C34] focus:border-[#FFC107]"
                    maxLength={6}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg font-semibold text-[#1A3C34] mb-2 block">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 text-lg border-2 border-[#1A3C34] focus:border-[#FFC107]"
                    maxLength={10}
                  />
                </div>
              </div>

              <Button 
                onClick={handleShowQuote}
                disabled={!selectedCategory}
                className={`w-full h-16 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 ${
                  !selectedCategory 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50' 
                    : 'bg-[#1A3C34] hover:bg-[#2D5A4D] text-white'
                }`}
              >
                Show Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default PlantCategoryPage;
