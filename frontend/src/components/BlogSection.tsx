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
      title: "New Solar Incentives Announced for Massachusetts!",
      excerpt: "Federal and state incentives now cover up to 40% of residential solar installation costs. Learn how to apply and benefit from these programs.",
      content: `The Massachusetts government has announced significant incentives for residential solar installations. The Federal Solar Tax Credit (ITC) combined with state SMART program offers substantial savings.

Key Benefits:
• Federal Tax Credit (ITC): 30% of system cost
• MA SMART Program: Performance-based incentives
• Net Metering: Earn credits for excess energy
• Property Tax Exemption: 20-year exemption on added value

Eligibility Criteria:
• Residential properties in Massachusetts
• System must be owned (cash or loan)
• Grid connection required
• Tax liability sufficient to use credits

How to Apply:
1. Consult with Solar Panda for eligibility check
2. Design system and sign contract
3. We handle all permitting and interconnection applications
4. Complete installation and inspection
5. Claim credits on your next tax return

This is a great opportunity for Boston and Cambridge residents to switch to solar energy at reduced costs. Contact Solar Panda for assistance with the complete process.`,
      image: "/placeholder.svg",
      author: "Solar Policy Team",
      date: "June 08, 2025",
      category: "Policy Update",
      icon: DollarSign
    },
    {
      id: 2,
      title: "How Solar Panels Perform During Boston Winters",
      excerpt: "Detailed analysis of solar panel efficiency during Boston's winter months and tips for maximum output.",
      content: `Winter season in Boston brings concerns about solar panel performance. Here's what you need to know about maintaining efficiency during snowy months.

Performance Facts:
• Solar panels still generate 10-25% electricity on cloudy days
• Snow actually helps clean panels naturally when it melts
• Modern panels are waterproof and winter-resistant
• Boston gets 200+ sunny days annually

Winter Maintenance Tips:
1. Regular cleaning after snow storms
2. Check for snow accumulation
3. Trim nearby tree branches
4. Monitor inverter performance
5. Keep drainage systems clear

Expected Output:
• Sunny days: 100% rated capacity
• Cloudy days: 10-25% capacity
• Rainy days: 5-15% capacity
• Average monsoon efficiency: 60-70%

Solar Panda provides winter-ready installations with proper drainage and mounting systems. Our AMC includes winter inspection visits.`,
      image: "/placeholder.svg",
      author: "Technical Team",
      date: "June 05, 2025",
      category: "Technical Guide",
      icon: Zap
    },
    {
      id: 3,
      title: "Success Story: Boston Family Saves $3,000 Annually",
      excerpt: "Meet the Smith family from Beacon Hill who reduced their electricity bill from $300 to $20 per month with solar power.",
      content: `The Smith family from Beacon Hill, Boston, installed a 10kW solar system through Solar Panda and achieved remarkable savings.

Before Solar:
• Monthly electricity bill: $300
• Annual electricity cost: $3,600
• Rising tariff concerns
• Frequent rate hikes

After Solar Installation:
• Monthly electricity bill: $20
• Monthly savings: $280
• Annual savings: $3,360
• Energy independence

Installation Details:
• System capacity: 10kW
• Number of panels: 25 (400W each)
• Installation cost: $30,000
• Federal Tax Credit: $9,000
• Net investment: $21,000

Return on Investment:
• Payback period: 6.2 years
• 25-year total savings: $84,000
• Environmental impact: 15 tons CO2 saved annually

"Solar Panda made the entire process seamless. From initial consultation to post-installation support, everything was professional and transparent." - Mr. John Smith

Ready to start your solar journey? Contact Solar Panda for a free consultation.`,
      image: "/placeholder.svg",
      author: "Customer Success",
      date: "June 01, 2025",
      category: "Success Story",
      icon: TrendingUp
    },
    {
      id: 4,
      title: "Environmental Impact of Solar Energy in Boston",
      excerpt: "Discover how solar installations in Boston are contributing to cleaner air and reduced carbon emissions.",
      content: `Solar energy adoption in Boston is making a significant environmental impact. Here's how your solar installation contributes to a cleaner future.

Boston Solar Impact (2024):
• Total installations: 500+ systems
• Total capacity: 2,500kW
• Annual CO2 reduction: 3,750 tons
• Equivalent to planting 93,750 trees

Individual Impact (10kW system):
• Annual CO2 reduction: 15 tons
• Equivalent to planting 375 trees
• Pollution reduction: 1,200 kg annually
• Fossil fuel displacement: 7.5 tons/year

Air Quality Benefits:
• Reduced thermal power plant emissions
• Lower particulate matter (PM2.5)
• Decreased sulfur dioxide levels
• Cleaner air for future generations

Water Conservation:
• Thermal plants use 3-5 liters water per kWh
• Solar saves 45,000 liters water annually (10kW system)
• Crucial for eco-conscious Massachusetts

Economic Benefits:
• Reduced healthcare costs due to cleaner air
• Job creation in solar industry
• Energy independence for the state
• Attraction of green industries

Join the movement! Every solar installation makes Boston cleaner and greener. Solar Panda is committed to environmental sustainability.`,
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
          Stay informed about the latest solar policies, technology updates, and success stories from Boston & Massachusetts.
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
