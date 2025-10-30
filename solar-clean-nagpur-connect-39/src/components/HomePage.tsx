
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Zap, Shield, Award, TrendingUp, Users, MapPin, Phone } from "lucide-react";
import SolarCalculator from './SolarCalculator';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Zap,
      title: 'Smart Solar Calculator',
      description: 'AI-powered calculator to estimate your solar potential and government subsidies'
    },
    {
      icon: Users,
      title: 'Verified Dealers',
      description: 'Connect with MSEDCL empanelled dealers in Nagpur & Chandrapur'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: '5-year warranty and certified installations by trusted professionals'
    },
    {
      icon: Award,
      title: 'Government Subsidies',
      description: 'Get up to ₹78,000 subsidy on 3kW solar systems through PM-KUSUM scheme'
    }
  ];

  const stats = [
    { label: 'Happy Customers', value: '250+', icon: Users },
    { label: 'Solar Installations', value: '180+', icon: Sun },
    { label: 'Verified Dealers', value: '15+', icon: Award },
    { label: 'CO2 Saved (Tons)', value: '420+', icon: TrendingUp }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-b from-green-50 to-blue-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Power Your Home with <span className="text-green-600">Solar Energy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified solar dealers in Nagpur & Chandrapur. Get government subsidies 
            up to ₹78,000 and reduce your electricity bills by 80%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('calculator')}>
              <Zap className="h-5 w-5 mr-2" />
              Calculate Solar Savings
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('dealers')}>
              <Users className="h-5 w-5 mr-2" />
              Find Dealers
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Solar Calculator Section */}
      <section className="py-12">
        <SolarCalculator />
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SolarCleanNagpur?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make solar adoption simple, affordable, and trustworthy for every home in Maharashtra.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white rounded-2xl">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
          <p className="text-green-100 mb-8 text-lg">
            Join 250+ satisfied customers who are saving money and protecting the environment.
            Get your free solar consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => onNavigate('dealers')}
            >
              <Phone className="h-5 w-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-green-600"
              onClick={() => onNavigate('calculator')}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Check Eligibility
            </Button>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Areas</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {['Nagpur', 'Chandrapur', 'Civil Lines', 'Dharampeth', 'Sadar', 'Hingna Road', 'Wardha Road', 'Ballarpur'].map((area) => (
            <span key={area} className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {area}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
