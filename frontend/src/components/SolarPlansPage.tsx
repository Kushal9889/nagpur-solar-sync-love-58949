
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Users, Zap, Home, Building, Factory } from "lucide-react";
import AnimatedSection from './AnimatedSection';

const SolarPlansPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // Animate cards on mount
    const timer = setTimeout(() => {
      setShowComparison(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const plans = [
    {
      id: 'basic',
      title: 'Basic Solar',
      subtitle: 'Perfect for small homes',
      icon: Home,
      capacity: '1-2 kW',
      cost: '₹30K-₹1L',
      savings: 'Save ₹12,000/year!',
      total25Year: '₹3L saved over 25 years',
      features: ['1-2 kW system', 'Rooftop installation', 'Basic warranty', 'Net metering'],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'standard',
      title: 'Standard Solar',
      subtitle: 'Most popular choice',
      icon: Building,
      capacity: '3-5 kW',
      cost: '₹60K-₹1.62L',
      savings: 'Save ₹18,000/year!',
      total25Year: '₹4.5L saved over 25 years',
      features: ['3-5 kW system', 'Premium panels', '5-year warranty', 'Smart monitoring'],
      color: 'from-green-500 to-emerald-500',
      popular: true
    },
    {
      id: 'premium',
      title: 'Premium Solar',
      subtitle: 'Maximum savings',
      icon: Factory,
      capacity: '6-10 kW',
      cost: '₹1.02L-₹3.22L',
      savings: 'Save ₹25,000/year!',
      total25Year: '₹6.25L saved over 25 years',
      features: ['6-10 kW system', 'Premium+ panels', '10-year warranty', 'AI optimization'],
      color: 'from-purple-500 to-pink-500',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <AnimatedSection animationType="fadeUp">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Unlock Your Perfect Solar Plan – Save Big Today!
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Choose the solar solution that fits your home and budget. Join 98,000+ families saving thousands every year!
            </p>
          </div>
        </AnimatedSection>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <AnimatedSection 
                key={plan.id} 
                animationType="scaleIn"
                delay={index * 200}
              >
                <Card 
                  className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br ${plan.color} text-white overflow-hidden relative transform hover:-translate-y-4 hover:scale-105 ${selectedPlan === plan.id ? 'ring-4 ring-[#FFC107]' : ''}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-10"></div>
                  
                  {plan.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#FFC107] text-black animate-pulse px-3 py-1 text-sm font-bold">
                        Most Popular! 🔥
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center relative z-10 pb-4">
                    <Icon className="h-16 w-16 mx-auto mb-4 group-hover:scale-125 transition-transform duration-500" />
                    <CardTitle className="text-2xl font-bold mb-2">{plan.title}</CardTitle>
                    <p className="text-lg text-white/80 mb-4">{plan.subtitle}</p>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">{plan.capacity}</div>
                      <div className="text-xl text-white/90">{plan.cost}</div>
                      <Badge className="bg-green-600 text-white px-4 py-2 text-lg font-bold animate-pulse">
                        {plan.savings}
                      </Badge>
                      <div className="text-yellow-200 font-bold text-sm">
                        {plan.total25Year}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pb-8">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-white flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full h-12 bg-white text-black hover:bg-gray-100 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/booking');
                      }}
                    >
                      Choose This Plan
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Comparison Toggle */}
        <AnimatedSection animationType="fadeIn" delay={600}>
          <div className="text-center mb-8">
            <Button
              onClick={() => setShowComparison(!showComparison)}
              variant="outline"
              className="bg-white text-[#1A3C34] border-2 border-[#FFC107] hover:bg-[#FFC107] hover:text-black font-bold text-lg px-8 py-3"
            >
              {showComparison ? 'Hide Comparison' : 'Compare All Plans'}
            </Button>
          </div>
        </AnimatedSection>

        {/* Comparison Table */}
        {showComparison && (
          <AnimatedSection animationType="slideLeft">
            <Card className="bg-white shadow-2xl border-4 border-[#FFC107] mb-12">
              <CardHeader className="bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white">
                <CardTitle className="text-2xl text-center">Plan Comparison</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-center">
                    <thead>
                      <tr className="border-b-2 border-[#1A3C34]">
                        <th className="py-4 font-bold">Features</th>
                        {plans.map(plan => (
                          <th key={plan.id} className="py-4 font-bold">{plan.title}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b">
                        <td className="py-3 font-semibold">Capacity</td>
                        {plans.map(plan => <td key={plan.id} className="py-3">{plan.capacity}</td>)}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">Cost Range</td>
                        {plans.map(plan => <td key={plan.id} className="py-3">{plan.cost}</td>)}
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 font-semibold">Annual Savings</td>
                        {plans.map(plan => <td key={plan.id} className="py-3 text-green-600 font-bold">{plan.savings}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Social Proof */}
        <AnimatedSection animationType="fadeUp" delay={800}>
          <div className="text-center mb-12">
            <Card className="bg-gradient-to-r from-[#FFC107] to-[#FF6200] text-black shadow-2xl border-0 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Star className="h-8 w-8 text-black" />
                  <span className="text-2xl font-bold">Customer Success Story</span>
                  <Star className="h-8 w-8 text-black" />
                </div>
                <blockquote className="text-xl italic mb-4">
                  "My family saves ₹15,000/year with Solar Panda! Best decision we ever made for our home."
                </blockquote>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">- Rajesh Kumar, Nagpur</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection animationType="scaleIn" delay={1000}>
          <div className="text-center">
            <Button 
              onClick={() => navigate('/booking')}
              className="h-20 px-16 bg-gradient-to-r from-[#FFC107] to-[#FF6200] hover:from-[#FF6200] hover:to-[#FFC107] text-black font-bold text-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative">Choose Your Plan Now – Lock in 25-Year Savings!</span>
            </Button>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
};

export default SolarPlansPage;
