
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, TrendingUp, Zap, DollarSign, Leaf } from "lucide-react";

const BlogSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: "New Solar Subsidy Scheme Announced for Maharashtra!",
      excerpt: "Government increases subsidy amount to ₹78,000 for residential solar installations. Learn how to apply and benefit from this new scheme.",
      content: `The Maharashtra government has announced a significant increase in solar subsidies for residential installations. The new PM-KUSUM scheme now offers up to ₹78,000 subsidy for 3kW solar systems.

Key Benefits:
• Increased subsidy amount from ₹40,000 to ₹78,000
• Simplified application process through online portal
• Faster approval within 30 days
• Direct bank transfer of subsidy amount

Eligibility Criteria:
• Residential properties only
• Maximum 3kW capacity per household
• MSEDCL connection required
• Property ownership documents mandatory

How to Apply:
1. Visit the official MSEDCL portal
2. Upload required documents
3. Get technical feasibility approval
4. Complete installation with empanelled vendor
5. Apply for subsidy within 6 months

This is a great opportunity for Nagpur and Chandrapur residents to switch to solar energy at reduced costs. Contact SuryaSpark for assistance with the complete process.`,
      image: "/placeholder.svg",
      author: "Solar Policy Team",
      date: "June 08, 2025",
      category: "Policy Update",
      icon: DollarSign
    },
    {
      id: 2,
      title: "How Solar Panels Perform During Monsoon Season",
      excerpt: "Detailed analysis of solar panel efficiency during Maharashtra's monsoon months and tips for maximum output.",
      content: `Monsoon season in Maharashtra brings concerns about solar panel performance. Here's what you need to know about maintaining efficiency during rainy months.

Performance Facts:
• Solar panels still generate 10-25% electricity on cloudy days
• Rain actually helps clean panels naturally
• Modern panels are waterproof and monsoon-resistant
• Nagpur gets 300+ sunny days annually

Monsoon Maintenance Tips:
1. Regular cleaning after dust storms
2. Check for water accumulation
3. Trim nearby tree branches
4. Monitor inverter performance
5. Keep drainage systems clear

Expected Output:
• Sunny days: 100% rated capacity
• Cloudy days: 10-25% capacity
• Rainy days: 5-15% capacity
• Average monsoon efficiency: 60-70%

SuryaSpark provides monsoon-ready installations with proper drainage and mounting systems. Our AMC includes monsoon inspection visits.`,
      image: "/placeholder.svg",
      author: "Technical Team",
      date: "June 05, 2025",
      category: "Technical Guide",
      icon: Zap
    },
    {
      id: 3,
      title: "Success Story: Nagpur Family Saves ₹2 Lakh Annually",
      excerpt: "Meet the Sharma family from Civil Lines who reduced their electricity bill from ₹15,000 to ₹1,000 per month with solar power.",
      content: `The Sharma family from Civil Lines, Nagpur, installed a 12kW solar system through SuryaSpark and achieved remarkable savings.

Before Solar:
• Monthly electricity bill: ₹15,000
• Annual electricity cost: ₹1,80,000
• Rising tariff concerns
• Frequent power cuts

After Solar Installation:
• Monthly electricity bill: ₹1,000
• Monthly savings: ₹14,000
• Annual savings: ₹1,68,000
• Zero power cuts during day

Installation Details:
• System capacity: 12kW
• Number of panels: 30 (400W each)
• Installation cost: ₹7,20,000
• Government subsidy: ₹78,000
• Net investment: ₹6,42,000

Return on Investment:
• Payback period: 3.8 years
• 25-year total savings: ₹42 lakhs
• Environmental impact: 15 tons CO2 saved annually

"SuryaSpark made the entire process seamless. From initial consultation to post-installation support, everything was professional and transparent." - Mr. Anil Sharma

Ready to start your solar journey? Contact SuryaSpark for a free consultation.`,
      image: "/placeholder.svg",
      author: "Customer Success",
      date: "June 01, 2025",
      category: "Success Story",
      icon: TrendingUp
    },
    {
      id: 4,
      title: "Environmental Impact of Solar Energy in Nagpur",
      excerpt: "Discover how solar installations in Nagpur are contributing to cleaner air and reduced carbon emissions.",
      content: `Solar energy adoption in Nagpur is making a significant environmental impact. Here's how your solar installation contributes to a cleaner future.

Nagpur Solar Impact (2024):
• Total installations: 500+ systems
• Total capacity: 2,500kW
• Annual CO2 reduction: 3,750 tons
• Equivalent to planting 93,750 trees

Individual Impact (10kW system):
• Annual CO2 reduction: 15 tons
• Equivalent to planting 375 trees
• Pollution reduction: 1,200 kg annually
• Coal displacement: 7.5 tons/year

Air Quality Benefits:
• Reduced thermal power plant emissions
• Lower particulate matter (PM2.5)
• Decreased sulfur dioxide levels
• Cleaner air for future generations

Water Conservation:
• Thermal plants use 3-5 liters water per kWh
• Solar saves 45,000 liters water annually (10kW system)
• Crucial for drought-prone Maharashtra

Economic Benefits:
• Reduced healthcare costs due to cleaner air
• Job creation in solar industry
• Energy independence for the state
• Attraction of green industries

Join the movement! Every solar installation makes Nagpur cleaner and greener. SuryaSpark is committed to environmental sustainability.`,
      image: "/placeholder.svg",
      author: "Environmental Team",
      date: "May 28, 2025",
      category: "Environment",
      icon: Leaf
    }
  ];

  const categories = ["All", "Policy Update", "Technical Guide", "Success Story", "Environment"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    const Icon = article.icon;

    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => setSelectedArticle(null)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        <article className="space-y-6">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-2">
              <Icon className="h-3 w-3 mr-1" />
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-gray-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Icon className="h-24 w-24 text-white opacity-50" />
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {article.content}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">Ready to Go Solar?</h3>
              <p className="text-green-700 mb-4">
                Get your free solar consultation and start saving money while helping the environment.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Schedule Free Consultation
              </Button>
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Solar Updates & News</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay informed about the latest solar policies, technology updates, and success stories from Nagpur & Chandrapur.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => {
          const Icon = article.icon;
          return (
            <Card 
              key={article.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedArticle(article.id)}
            >
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-r from-green-400 to-blue-500 rounded-t-lg flex items-center justify-center">
                  <Icon className="h-16 w-16 text-white opacity-50" />
                </div>
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {article.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl leading-tight hover:text-green-600 transition-colors">
                  {article.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {article.excerpt}
                </CardDescription>
                <Button variant="ghost" className="mt-4 p-0 h-auto text-green-600 hover:text-green-700">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Newsletter Signup */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader className="text-center">
          <CardTitle className="text-green-800">Stay Updated</CardTitle>
          <CardDescription className="text-green-700">
            Subscribe to our newsletter for the latest solar news and exclusive offers
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Button className="bg-green-600 hover:bg-green-700">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogSection;
