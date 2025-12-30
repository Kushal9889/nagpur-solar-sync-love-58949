
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building, Factory, Mountain, ArrowLeft, ArrowRight } from "lucide-react";
import BackButton from './ui/back-button';

interface SelectYourPlanCategoryPageProps {
  onNavigate: (section: string) => void;
}

const SelectYourPlanCategoryPage: React.FC<SelectYourPlanCategoryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'residential',
      title: 'Residential Solar',
      subtitle: 'Perfect for homes and small properties',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      description: 'Ideal for houses, apartments, and small residential properties'
    },
    {
      id: 'commercial',
      title: 'Commercial Solar',
      subtitle: 'Smart solutions for businesses',
      icon: Building,
      color: 'from-green-500 to-green-600',
      description: 'Perfect for offices, shops, and commercial buildings'
    },
    {
      id: 'industrial',
      title: 'Industrial Solar',
      subtitle: 'Large-scale power for industries',
      icon: Factory,
      color: 'from-purple-500 to-purple-600',
      description: 'Designed for factories, warehouses, and industrial facilities'
    },
    {
      id: 'ground-mounted',
      title: 'Ground-Mounted Solar',
      subtitle: 'Massive solar farms and installations',
      icon: Mountain,
      color: 'from-orange-500 to-orange-600',
      description: 'Large-scale ground installations for maximum power generation'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      onNavigate('booking');
    }
  };

  const handleBack = () => {
    onNavigate('select-plan');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Your Plant Category
          </h1>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Choose the installation type that your property wants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className={`relative overflow-hidden cursor-pointer transform transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'scale-105 shadow-2xl ring-4 ring-yellow-400' 
                    : 'hover:scale-105 shadow-xl'
                } bg-gradient-to-br ${category.color} text-white border-0`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader className="relative pt-8 pb-6">
                  <div className="absolute top-4 right-4">
                    <Icon className="h-16 w-16 text-white/80" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-white/90 text-lg">
                    {category.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-white/90">{category.description}</p>
                  
                  <Button 
                    className={`w-full mt-6 font-bold py-3 text-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-yellow-400 text-green-900 hover:bg-yellow-300'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategorySelect(category.id);
                    }}
                  >
                    {selectedCategory === category.id ? 'Selected ✓' : 'Select Category'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
          {/* Continue Button */}
          <Button
            size="lg"
            className={`px-12 py-4 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 ${
              selectedCategory
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-green-900 hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105'
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            onClick={handleContinue}
            disabled={!selectedCategory}
          >
            {selectedCategory ? (
              <div className="flex items-center gap-2">
                <span>Continue with {categories.find(c => c.id === selectedCategory)?.title}</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            ) : (
              'Select a Category to Continue'
            )}
          </Button>

          {/* Back Button - Below main button */}
          <BackButton onClick={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default SelectYourPlanCategoryPage;
