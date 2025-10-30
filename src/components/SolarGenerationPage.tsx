
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, AlertTriangle, Download, Leaf, Sun, Activity, Calendar } from "lucide-react";

const SolarGenerationPage: React.FC = () => {
  const [liveData, setLiveData] = useState({
    dailyGeneration: 44,
    monthlyGeneration: 1320,
    uptime: 95,
    co2Saved: 2.1,
    currentPower: 8.5,
    peakPower: 11.2
  });

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Output dropped 25% – Clean panels recommended', priority: 'medium' },
    { id: 2, type: 'info', message: 'Monthly target achieved: 103% of expected generation', priority: 'low' },
    { id: 3, type: 'success', message: 'System running optimally for 7 consecutive days', priority: 'low' }
  ]);

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        currentPower: Math.max(0, prev.currentPower + (Math.random() - 0.5) * 2),
        dailyGeneration: prev.dailyGeneration + Math.random() * 0.1
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mockChartData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    generation: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 10 + Math.random() * 2)
  }));

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'success': return <TrendingUp className="h-5 w-5 text-green-500" />;
      default: return <Activity className="h-5 w-5 text-blue-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'success': return 'bg-green-100 border-green-500 text-green-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-green-800 mb-4">Track Your Solar Generation</h1>
          <p className="text-xl text-yellow-600 mb-6">Monitor your system's performance with Solarman Smart</p>
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            <Activity className="h-5 w-5 mr-2" />
            System Online
          </Badge>
        </div>

        {/* Live Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Current Power",
              value: `${liveData.currentPower.toFixed(1)} kW`,
              icon: Sun,
              color: "text-yellow-500",
              bgColor: "from-yellow-50 to-orange-50",
              change: "+2.3%",
              pulse: true
            },
            {
              title: "Daily Generation",
              value: `${liveData.dailyGeneration.toFixed(1)} kWh`,
              icon: Zap,
              color: "text-blue-500",
              bgColor: "from-blue-50 to-cyan-50",
              change: "+5.2%"
            },
            {
              title: "Monthly Generation",
              value: `${liveData.monthlyGeneration} kWh`,
              icon: Calendar,
              color: "text-green-500",
              bgColor: "from-green-50 to-emerald-50",
              change: "+12.8%"
            },
            {
              title: "System Uptime",
              value: `${liveData.uptime}%`,
              icon: Activity,
              color: "text-purple-500",
              bgColor: "from-purple-50 to-indigo-50",
              change: "Excellent"
            },
            {
              title: "CO₂ Saved This Month",
              value: `${liveData.co2Saved} tons`,
              icon: Leaf,
              color: "text-green-600",
              bgColor: "from-green-50 to-lime-50",
              change: "+8.7%"
            },
            {
              title: "Peak Power Today",
              value: `${liveData.peakPower} kW`,
              icon: TrendingUp,
              color: "text-orange-500",
              bgColor: "from-orange-50 to-red-50",
              change: "12:30 PM"
            }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${metric.bgColor} border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in ${metric.pulse ? 'animate-pulse' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${metric.color}`} />
                    <Badge variant="outline" className="text-xs">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Generation Chart */}
        <Card className="mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <CardHeader>
            <CardTitle className="text-2xl text-green-800 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Today's Generation Pattern
            </CardTitle>
            <CardDescription>Hourly solar power generation (kW)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-t from-green-800 to-green-600 rounded-lg p-4 relative overflow-hidden">
              {/* Mock Chart */}
              <div className="absolute inset-4 flex items-end justify-between">
                {mockChartData.map((data, index) => (
                  <div 
                    key={index}
                    className="bg-yellow-400 rounded-t opacity-80 hover:opacity-100 transition-opacity duration-200 flex-1 mx-px"
                    style={{ 
                      height: `${(data.generation / 12) * 100}%`,
                      minHeight: '2px'
                    }}
                    title={`${data.hour}:00 - ${data.generation.toFixed(1)} kW`}
                  ></div>
                ))}
              </div>
              <div className="absolute bottom-2 left-4 text-white text-sm">0</div>
              <div className="absolute bottom-2 right-4 text-white text-sm">23</div>
              <div className="absolute top-4 left-4 text-yellow-200 text-sm">12 kW</div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts and Inverter Compatibility */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Alerts */}
          <Card className="animate-fade-in" style={{ animationDelay: '1s' }}>
            <CardHeader>
              <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)} flex items-start gap-3 hover:shadow-md transition-shadow duration-200`}
                >
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {alert.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Inverter Compatibility */}
          <Card className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
            <CardHeader>
              <CardTitle className="text-xl text-green-800">Inverter Compatibility</CardTitle>
              <CardDescription>Your system works with all major inverter brands</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700">
                Compatible with all major inverters including SolarEdge, SMA, Fronius, and more.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {['SolarEdge', 'SMA', 'Fronius', 'ABB'].map((brand, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      ✓
                    </div>
                    <span className="font-medium text-gray-800">{brand}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold">
                <Download className="h-5 w-5 mr-2" />
                View Full Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="mt-12 bg-gradient-to-r from-green-800 to-emerald-600 text-white animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Excellent Performance!</h3>
            <p className="text-xl text-green-100 mb-6">
              Your solar system is generating 103% of expected output this month
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">₹18,750</div>
                <div className="text-green-100">Money Saved This Month</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">15 Trees</div>
                <div className="text-green-100">Equivalent CO₂ Saved</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">4.2 Years</div>
                <div className="text-green-100">Estimated Payback</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default SolarGenerationPage;
