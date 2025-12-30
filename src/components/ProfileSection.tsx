
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield
} from "lucide-react";

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - replace with real data from your backend
  const userData = {
    name: 'Rajesh Kumar',
    phone: '+91-9876543210',
    email: 'rajesh.kumar@email.com',
    address: 'Civil Lines, Nagpur, Maharashtra',
    joinDate: '15 Jan 2024',
    totalSavings: '₹45,000',
    systemSize: '5kW',
    installationDate: '25 Feb 2024'
  };

  const referralData = {
    totalReferrals: 8,
    successfulReferrals: 5,
    pendingReferrals: 3,
    earnings: '₹15,000',
    referrals: [
      { name: 'Amit Sharma', status: 'Installed', date: '10 Mar 2024', earning: '₹3,000' },
      { name: 'Priya Patel', status: 'Installed', date: '22 Mar 2024', earning: '₹3,000' },
      { name: 'Suresh Jain', status: 'Pending', date: '5 Apr 2024', earning: '₹0' },
      { name: 'Kavita Singh', status: 'Installed', date: '18 Apr 2024', earning: '₹3,000' },
      { name: 'Ravi Gupta', status: 'Pending', date: '2 May 2024', earning: '₹0' }
    ]
  };

  const systemData = {
    capacity: '5kW',
    panels: 16,
    inverter: 'Luminous 5kW',
    batteryBackup: '10kWh',
    monthlyGeneration: '650 kWh',
    co2Saved: '2.5 tons',
    treesEquivalent: 120,
    status: 'Active'
  };

  const bookingHistory = [
    { id: 'BK001', service: 'Solar Installation', date: '25 Feb 2024', status: 'Completed', amount: '₹2,85,000' },
    { id: 'BK002', service: 'AMC Service', date: '15 Apr 2024', status: 'Completed', amount: '₹5,000' },
    { id: 'BK003', service: 'System Upgrade', date: '10 May 2024', status: 'Pending', amount: '₹45,000' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Profile Dashboard</h1>
          <p className="text-xl text-gray-200">Track your solar journey and earnings</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8 bg-white shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl">{userData.name}</CardTitle>
                <CardDescription className="text-green-100">
                  Solar Customer since {userData.joinDate}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span>{userData.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-gray-600" />
                <span>{userData.systemSize} Solar System</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-lg p-1">
            <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
            <TabsTrigger value="referrals" className="text-sm font-medium">Referrals</TabsTrigger>
            <TabsTrigger value="system" className="text-sm font-medium">My System</TabsTrigger>
            <TabsTrigger value="bookings" className="text-sm font-medium">Bookings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
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

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
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

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
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

            {/* Recent Activity */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">System maintenance completed</p>
                      <p className="text-sm text-gray-600">Your solar system is operating at 100% efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Gift className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Referral bonus earned</p>
                      <p className="text-sm text-gray-600">₹3,000 credited for Kavita Singh's installation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-green-600">{referralData.totalReferrals}</div>
                <div className="text-sm text-gray-600">Total Referrals</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-blue-600">{referralData.successfulReferrals}</div>
                <div className="text-sm text-gray-600">Successful</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-orange-600">{referralData.pendingReferrals}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </Card>
              <Card className="text-center p-4">
                <div className="text-2xl font-bold text-purple-600">{referralData.earnings}</div>
                <div className="text-sm text-gray-600">Total Earned</div>
              </Card>
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Referral History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralData.referrals.map((referral, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-gray-400" />
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-sm text-gray-600">{referral.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={referral.status === 'Installed' ? 'default' : 'secondary'}>
                          {referral.status}
                        </Badge>
                        <p className="text-sm font-medium text-green-600">{referral.earning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
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

              <Card className="bg-white">
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
          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-gray-600">ID: {booking.id} • {booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{booking.amount}</p>
                        <Badge variant={booking.status === 'Completed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSection;
