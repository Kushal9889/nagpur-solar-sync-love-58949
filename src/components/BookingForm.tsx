
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, User, Phone, CreditCard } from "lucide-react";

interface BookingFormProps {
  dealerName: string;
  onSubmit: (bookingData: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ dealerName, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    roofSize: '',
    monthlyBill: '',
    preferredDate: '',
    timeSlot: '',
    requirements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          Book Site Visit - {dealerName}
        </CardTitle>
        <CardDescription>
          Schedule a free site inspection and get personalized solar solution
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="pl-10"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  className="pl-10"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Property Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="address"
                placeholder="Enter complete address"
                className="pl-10"
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roofSize">Roof Size (sq ft)</Label>
              <Input
                id="roofSize"
                type="number"
                placeholder="Approximate roof area"
                value={formData.roofSize}
                onChange={(e) => handleInputChange('roofSize', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyBill">Monthly Bill (₹)</Label>
              <Input
                id="monthlyBill"
                type="number"
                placeholder="Current electricity bill"
                value={formData.monthlyBill}
                onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferredDate">Preferred Date</Label>
              <Input
                id="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeSlot">Time Slot</Label>
              <Select value={formData.timeSlot} onValueChange={(value) => handleInputChange('timeSlot', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                  <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Special Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="Any specific requirements or questions..."
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
            />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">Booking Fee: ₹1,000</span>
            </div>
            <p className="text-sm text-gray-600">
              Refundable booking fee to confirm your site visit. Will be adjusted in final payment.
            </p>
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
