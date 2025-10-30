
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Award, Users } from "lucide-react";

interface Dealer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  phone: string;
  experience: string;
  certifications: string[];
  completedProjects: number;
  priceRange: string;
  image: string;
}

interface DealerCardProps {
  dealer: Dealer;
  onContact: (dealerId: string) => void;
  onViewProfile: (dealerId: string) => void;
}

const DealerCard: React.FC<DealerCardProps> = ({ dealer, onContact, onViewProfile }) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{dealer.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {dealer.location}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{dealer.rating}</span>
              <span className="text-sm text-gray-500">({dealer.reviews})</span>
            </div>
            <div className="text-sm text-gray-600">{dealer.experience}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {dealer.certifications.map((cert, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              {cert}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span>{dealer.completedProjects} Projects</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">₹{dealer.priceRange}</span>
            <span className="text-gray-500">per kW</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewProfile(dealer.id)}
          >
            View Profile
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onContact(dealer.id)}
          >
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealerCard;
