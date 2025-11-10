
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wrench, Calendar, Phone, CheckCircle, Clock } from "lucide-react";

const AMCTracker: React.FC = () => {
  const amcData = {
    isActive: true,
    nextService: '2024-07-15',
    lastService: '2024-04-10',
    servicesCompleted: 1,
    totalServices: 3,
    amcStartDate: '2024-01-01',
    amcEndDate: '2024-12-31',
    technicianName: 'Ravi Kumar',
    technicianPhone: '+91 98765 43210',
    packageType: 'Premium AMC',
    packagePrice: '₹5,000',
    servicesIncluded: ['Panel Cleaning', 'Performance Check', 'Inverter Maintenance']
  };

  const progressPercentage = (amcData.servicesCompleted / amcData.totalServices) * 100;

  return (
    <Card className="shadow-xl border-2 border-cyan-200">
      <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <Wrench className="h-6 w-6" />
          AMC Service Tracking
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </Badge>
          <Badge variant="outline" className="text-cyan-100 border-cyan-200">
            {amcData.packageType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {/* Service Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Service Progress</span>
            <span>{amcData.servicesCompleted}/{amcData.totalServices} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-2" />
          <div className="text-xs text-gray-500">
            Next service due: {amcData.nextService}
          </div>
        </div>

        {/* Service Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-cyan-600" />
              <div>
                <div className="text-sm font-medium">Next Service</div>
                <div className="text-sm text-gray-600">{amcData.nextService}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <div className="text-sm font-medium">Last Service</div>
                <div className="text-sm text-gray-600">{amcData.lastService}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              <div>
                <div className="text-sm font-medium">Technician</div>
                <div className="text-sm text-gray-600">{amcData.technicianName}</div>
                <a href={`tel:${amcData.technicianPhone}`} className="text-xs text-blue-600 hover:underline">
                  {amcData.technicianPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Services Included */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Services Included:</div>
          <div className="flex flex-wrap gap-2">
            {amcData.servicesIncluded.map((service, index) => (
              <Badge key={index} variant="secondary" className="bg-cyan-50 text-cyan-700">
                {service}
              </Badge>
            ))}
          </div>
        </div>

        {/* AMC Period & Actions */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span>AMC Period: {amcData.amcStartDate} to {amcData.amcEndDate}</span>
            <span className="font-medium text-cyan-600">{amcData.packagePrice}</span>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              Schedule Service
            </Button>
            <Button size="sm" variant="outline">
              Contact Technician
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AMCTracker;
