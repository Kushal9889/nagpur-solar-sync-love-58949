
import React, { useState, useEffect } from 'react';
import { useFunnel } from "@/hooks/useFunnel"; // We can use this to get the user ID if stored
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Users, 
  Sun, 
  TrendingUp, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Shield,
  Upload,
  FileText,
  CreditCard,
  Home,
  Receipt,
  BookOpen,
  Award,
  History
} from "lucide-react";

const EnhancedProfileSection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: boolean}>({});
  const [showMissingDocsAlert, setShowMissingDocsAlert] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [bookingHistory, setBookingHistory] = useState<any[]>([]);

  // Fetch User Profile on Mount
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // 1. Get User ID from Migration Response (Stored in localStorage ideally)
        // For now, let's assume we stored it as 'solar_user_id' after success
        const userId = localStorage.getItem('solar_user_id'); 
        
        if (!userId) {
             console.log("No user logged in");
             return; 
        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        // 2. Fetch User Profile & Docs
        const userRes = await fetch(`${API_URL}/api/users/${userId}`);
        const userData = await userRes.json();
        setUserProfile(userData);

        // Update uploaded docs UI
        if (userData.documents) {
            const newDocsState: any = {};
            userData.documents.forEach((doc: any) => {
                newDocsState[doc.type] = true; // Assumes doc has 'type' field
            });
            setUploadedDocs(prev => ({ ...prev, ...newDocsState }));
        }

        // 3. Fetch Orders
        const orderRes = await fetch(`${API_URL}/api/users/${userId}/orders`);
        const orderData = await orderRes.json();
        setBookingHistory(orderData);

      } catch (err) {
        console.error("Profile Load Error", err);
      }
    };

    fetchRealData();
  }, []);

  // Mock user data - enhanced with more details
  const userData = {
    name: userProfile?.name || 'Rajesh Kumar',
    phone: '+1-555-123-4567',
    email: 'rajesh.kumar@email.com',
    address: 'Beacon Hill, Boston, MA',
    pincode: '02108',
    joinDate: '15 Jan 2024',
    totalSavings: '$4,500',
    systemSize: userProfile?.planDetails?.capacity || '5kW',
    installationDate: '25 Feb 2024',
    monthlyBill: '$150',
    roofSize: '1500 sq ft',
    sanctionedLoad: '5 kW',
    memberSince: 'March 2024'
  };

  const referralData = {
    totalReferrals: 3,
    successfulReferrals: 2,
    pendingReferrals: 1,
    earnings: '$250',
    referralCode: 'RAJESH2024',
    referrals: [
      { name: 'Amit Sharma', status: 'Installed', date: '10 Mar 2024', earning: '$100' },
      { name: 'Priya Patel', status: 'Installed', date: '22 Mar 2024', earning: '$150' },
      { name: 'Suresh Jain', status: 'Pending', date: '5 Apr 2024', earning: '$0' }
    ]
  };

  const systemData = {
    capacity: '5kW',
    panels: 16,
    inverter: 'Luminous 5kW',
    batteryBackup: '10kWh',
    monthlyGeneration: '650 kWh',
    co2Saved: '8.5 tons',
    treesEquivalent: 212,
    status: 'Active',
    dailySavings: '$5',
    systemPerformance: '98.5% uptime',
    performance: '20 kWh/day'
  };

  const documents = [
    { id: 'state-id', name: 'State ID / Driver\'s License', required: true, icon: FileText },
    { id: 'utility-bill', name: 'Utility Bill', required: true, icon: Zap },
    { id: 'property-tax', name: 'Property Tax Receipt', required: false, icon: Home },
    { id: 'rooftop-photos', name: 'Rooftop Photos', required: true, icon: Upload },
    { id: 'ssn', name: 'SSN (Last 4 Digits)', required: true, icon: Shield }
  ];

  // Calculate progress based on uploaded documents
  useEffect(() => {
    const requiredDocs = documents.filter(doc => doc.required);
    const uploadedRequiredDocs = requiredDocs.filter(doc => uploadedDocs[doc.id]).length;
    const newProgress = (uploadedRequiredDocs / requiredDocs.length) * 100;
    setProgress(newProgress);

    // Show alert if documents missing for more than 2 days (simulated)
    const missingDocs = requiredDocs.some(doc => !uploadedDocs[doc.id]);
    if (missingDocs) {
      const timer = setTimeout(() => {
        setShowMissingDocsAlert(true);
      }, 2000); // Simulated 2 days as 2 seconds for demo
      return () => clearTimeout(timer);
    }
  }, [uploadedDocs]);

  const handleDocumentUpload = (docId: string) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docId]: true
    }));
  };

  const communityImpact = {
    users: '1,247',
    co2Saved: '156.7',
    communitySavings: '$4.5M',
    leadingCity: 'Boston'
  };

  return (
    <div className="min-h-screen bg-[#1C2526] py-8 px-4 animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        
        {/* Alert for Missing Documents */}
        {showMissingDocsAlert && (
          <div className="fixed top-20 right-4 bg-white border-2 border-[#FFA500] rounded-lg p-4 shadow-2xl z-50 w-80 animate-scale-in">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-[#FFA500]" />
              <h3 className="font-bold text-gray-800">Documents Required!</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Upload missing documents to complete your profile</p>
            <Button 
              size="sm" 
              onClick={() => setShowMissingDocsAlert(false)}
              className="w-full bg-[#FFA500] hover:bg-[#FF8C00]"
            >
              Upload Now
            </Button>
          </div>
        )}

        {/* Enhanced Header with Purple Background and Glow Effect */}
        <div 
          className="profile-header bg-[#800080] h-20 rounded-t-xl mb-8 flex items-center px-6 shadow-2xl animate-fade-in"
          style={{ 
            filter: 'drop-shadow(0 0 5px #006838)',
            background: 'linear-gradient(135deg, #800080 0%, #9932CC 100%)'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-full">
              <User className="h-8 w-8 text-[#800080]" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Profile Dashboard</h1>
              <p className="text-purple-200">Track your solar journey and earnings</p>
            </div>
          </div>
        </div>

        {/* User Info Card with Enhanced Design */}
        <Card className="mb-8 bg-white shadow-2xl border-0 animate-slide-in-right">
          <CardHeader className="bg-gradient-to-r from-[#006838] to-[#96CF24] text-white rounded-t-lg h-[100px]">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full">
                <img 
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24'%3E%3Ctext y='18' font-size='16'%3E👨‍💻%3C/text%3E%3C/svg%3E" 
                  alt="Avatar"
                  className="w-10 h-10 lazy-load"
                  loading="lazy"
                />
              </div>
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  {userData.name}
                  <Badge className="bg-white text-green-600">Member since {userData.memberSince}</Badge>
                </CardTitle>
                <CardDescription className="text-green-100 text-lg">
                  Solar Customer since {userData.joinDate}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-r from-[#006838] to-[#96CF24] text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Phone className="h-5 w-5" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Mail className="h-5 w-5" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <MapPin className="h-5 w-5" />
                <span className="text-sm">{userData.address}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Sun className="h-5 w-5" />
                <span>{userData.systemSize} Solar System</span>
              </div>
              {userProfile?.planDetails && (
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                  <Award className="h-5 w-5" />
                  <span>{userProfile.planDetails.category} Plan</span>
                </div>
              )}
            </div>
            
            {/* Additional User Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center bg-white/20 p-3 rounded-lg">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm">Referrals</div>
              </div>
              <div className="text-center bg-white/20 p-3 rounded-lg">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm">Bookings</div>
              </div>
              <div className="text-center bg-white/20 p-3 rounded-lg">
                <div className="text-2xl font-bold">$4,500</div>
                <div className="text-sm">Total Savings</div>
              </div>
              <div className="text-center bg-white/20 p-3 rounded-lg">
                <div className="text-2xl font-bold">8.5</div>
                <div className="text-sm">Tons CO2 Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Progress Bar */}
        <Card className="mb-8 bg-white shadow-xl animate-scale-in">
          <CardHeader className="bg-gradient-to-r from-[#FFA500] to-[#FF8C00] text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                🚀 Booking Progress
              </CardTitle>
              <div className="flex gap-2">
                <Badge className="bg-[#FFA500] text-white">90% Complete</Badge>
                <Badge className="bg-green-500 text-white">Almost Done! ✓</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-4">
              <Progress 
                value={progress} 
                className="h-5 bg-gray-200"
                style={{
                  background: 'linear-gradient(to right, #1E90FF, #006838)',
                  animation: progress > 80 ? 'pulse 2s infinite' : 'none'
                }}
              />
              <p className="text-center mt-2 text-gray-600">
                Complete the remaining steps to unlock your solar savings! ({Math.round(progress)}% complete)
              </p>
            </div>
            
            {/* Document Upload Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => {
                const Icon = doc.icon;
                const isUploaded = uploadedDocs[doc.id];
                return (
                  <div 
                    key={doc.id}
                    className={`border-2 border-dashed p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 ${
                      isUploaded 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 hover:border-[#1E90FF]'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <Icon className={`h-6 w-6 ${isUploaded ? 'text-green-600' : 'text-gray-600'}`} />
                      <div className="text-sm font-medium">{doc.name}</div>
                      <div className="text-xs text-gray-500">
                        {doc.required ? '(Required)' : '(Optional)'}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDocumentUpload(doc.id)}
                        disabled={isUploaded}
                        className={`w-full ${
                          isUploaded 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'bg-[#1E90FF] hover:bg-blue-600'
                        }`}
                      >
                        {isUploaded ? 'Uploaded ✓' : 'Click to Upload'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs with Enhanced Styling */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg p-1 shadow-lg">
            <TabsTrigger value="overview" className="text-sm font-medium data-[state=active]:bg-[#800080] data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="referrals" className="text-sm font-medium data-[state=active]:bg-[#800080] data-[state=active]:text-white">Referrals</TabsTrigger>
            <TabsTrigger value="system" className="text-sm font-medium data-[state=active]:bg-[#800080] data-[state=active]:text-white">My System</TabsTrigger>
            <TabsTrigger value="bookings" className="text-sm font-medium data-[state=active]:bg-[#800080] data-[state=active]:text-white">Bookings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Total Savings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userData.totalSavings}</div>
                  <p className="text-green-100">Since installation</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Referral Earnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{referralData.earnings}</div>
                  <p className="text-blue-100">From {referralData.successfulReferrals} referrals</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-300">Active</div>
                  <p className="text-purple-100">Generating {systemData.monthlyGeneration}/month</p>
                </CardContent>
              </Card>
            </div>

            {/* Eco Impact Section */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#006838]">
                  🌱 Eco Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">🌍</div>
                    <div className="text-lg font-bold text-green-600">CO2 Saved</div>
                    <div className="text-xl font-semibold">{systemData.co2Saved} lifetime</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">🌳</div>
                    <div className="text-lg font-bold text-green-600">Trees Equivalent</div>
                    <div className="text-xl font-semibold">{systemData.treesEquivalent} trees planted</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">♻️</div>
                    <div className="text-lg font-bold text-green-600">Daily CO2 Savings</div>
                    <div className="text-xl font-semibold">16.40 kg/day</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Savings Dashboard */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#1E90FF]">
                  📈 Savings Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">Daily Savings</div>
                    <div className="text-2xl font-semibold text-green-600">+$5</div>
                    <div className="text-sm text-gray-600">$5/day</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">Monthly Savings</div>
                    <div className="text-2xl font-semibold text-green-600">+$150</div>
                    <div className="text-sm text-gray-600">$150/month</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">System Performance</div>
                    <div className="text-2xl font-semibold text-orange-600">20 kWh/day</div>
                    <div className="text-sm text-gray-600">98.5% uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6 animate-fade-in">
            <Card className="bg-white shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  🎁 Referral Program
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Earn rewards for every successful referral
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Your Referral Code</div>
                    <div className="text-2xl font-bold text-purple-600 mb-2">{referralData.referralCode}</div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Share on WhatsApp
                      </Button>
                      <Button size="sm" variant="outline">
                        📋 Share
                      </Button>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Total Earnings</div>
                    <div className="text-3xl font-bold text-green-600 mb-2">$250</div>
                    <div className="text-sm text-gray-600">From 3 referrals</div>
                  </div>
                </div>

                {/* Referral Rewards */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h4 className="font-bold mb-4">Referral Rewards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <div>
                        <div className="font-medium">1 Referrals</div>
                        <div className="text-sm text-gray-600">Amazon Gift Card</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">$100</div>
                        <Badge className="bg-green-100 text-green-800">Earned</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded border">
                      <div>
                        <div className="font-medium">3 Referrals</div>
                        <div className="text-sm text-gray-600">Home Depot Gift Card</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">$250</div>
                        <Badge className="bg-green-100 text-green-800">Earned</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="mb-6">
                  <h4 className="font-bold mb-4">Achievement Badges</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">🌱</div>
                      <div className="font-medium">Eco Pioneer</div>
                      <div className="text-sm text-gray-600">First solar installation</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">Earned</Badge>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="font-medium">Solar Champion</div>
                      <div className="text-sm text-gray-600">Saved 5+ tons CO2</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">Earned</Badge>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <div className="text-2xl mb-2">⭐</div>
                      <div className="font-medium">Referral Star</div>
                      <div className="text-sm text-gray-600">3+ successful referrals</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">Earned</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    System Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Capacity:</span>
                    <span className="font-medium">{systemData.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar Panels:</span>
                    <span className="font-medium">{systemData.panels} panels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inverter:</span>
                    <span className="font-medium">{systemData.inverter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Battery Backup:</span>
                    <span className="font-medium">{systemData.batteryBackup}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monthly Generation:</span>
                    <span className="font-medium text-green-600">{systemData.monthlyGeneration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CO2 Saved:</span>
                    <span className="font-medium text-green-600">{systemData.co2Saved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trees Equivalent:</span>
                    <span className="font-medium text-green-600">{systemData.treesEquivalent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge className="bg-green-100 text-green-800">{systemData.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6 animate-fade-in">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📅 Order History & Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.length > 0 ? (
                    bookingHistory.map((order: any) => (
                      <div key={order.orderId || order.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4">
                        
                        {/* Column 1: System Info */}
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-xl">
                            🏠
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 capitalize">
                                {order.systemDetails?.systemType?.replace('_', ' ') || 'Solar System'}
                            </p>
                            <p className="text-sm text-gray-600">
                                {order.systemDetails?.hardware?.panelBrand} Panels + {order.systemDetails?.hardware?.inverterBrand} Inverter
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Order ID: <span className="font-mono">{order.orderId}</span>
                            </p>
                          </div>
                        </div>

                        {/* Column 2: The PRICE COLUMN (Requested) */}
                        <div className="flex flex-col items-end min-w-[150px]">
                           <div className="text-lg font-bold text-emerald-700">
                              ${order.financials?.totalAmount?.toLocaleString() || order.amount}
                           </div>
                           <div className="text-xs text-gray-500 text-right">
                              Base: ${order.financials?.basePrice?.toLocaleString() || '0'}
                              {order.financials?.structureSurcharge > 0 && (
                                  <span className="block text-orange-600">
                                    + Structure: ${order.financials?.structureSurcharge?.toLocaleString()}
                                  </span>
                              )}
                              <span className="block text-gray-400">
                                Tax: ${order.financials?.gstAmount?.toLocaleString()}
                              </span>
                           </div>
                        </div>

                        {/* Column 3: Status */}
                        <div className="text-right">
                          <Badge className={`${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              order.status === 'site_visit_scheduled' ? 'bg-blue-100 text-blue-800' : 
                              'bg-gray-100 text-gray-800'
                          }`}>
                            {(order.status || 'Processing').replace(/_/g, ' ').toUpperCase()}
                          </Badge>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No orders found. Book your first solar system today!
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Community Impact */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👥 Community Impact
                </CardTitle>
                <CardDescription>Collective impact of our solar community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{communityImpact.users}</div>
                    <div className="text-sm text-gray-600">Solar Panda Users</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{communityImpact.co2Saved}</div>
                    <div className="text-sm text-gray-600">Tons CO2 Saved</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{communityImpact.communitySavings}</div>
                    <div className="text-sm text-gray-600">Community Savings</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{communityImpact.leadingCity}</div>
                    <div className="text-sm text-gray-600">Leading City</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Booking History Button */}
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-[#1E90FF] hover:bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <History className="h-5 w-5 mr-2" />
            View Booking History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfileSection;
