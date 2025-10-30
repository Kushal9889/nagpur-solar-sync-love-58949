
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Filter } from "lucide-react";
import DealerCard from './DealerCard';

const DealerDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  // Mock dealer data
  const dealers = [
    {
      id: '1',
      name: 'Waaree Solar Solutions',
      rating: 4.8,
      reviews: 156,
      location: 'Civil Lines, Nagpur',
      phone: '+91 98765 43210',
      experience: '8+ years',
      certifications: ['MNRE Certified', 'ISO 9001'],
      completedProjects: 245,
      priceRange: '65,000-70,000',
      image: ''
    },
    {
      id: '2',
      name: 'Luminous Power Technologies',
      rating: 4.6,
      reviews: 123,
      location: 'Sadar, Nagpur',
      phone: '+91 87654 32109',
      experience: '6+ years',
      certifications: ['MNRE Certified', 'BIS Approved'],
      completedProjects: 189,
      priceRange: '68,000-72,000',
      image: ''
    },
    {
      id: '3',
      name: 'Tata Power Solar',
      rating: 4.9,
      reviews: 234,
      location: 'Dharampeth, Nagpur',
      phone: '+91 76543 21098',
      experience: '10+ years',
      certifications: ['MNRE Certified', 'ISO 14001', 'OHSAS 18001'],
      completedProjects: 312,
      priceRange: '70,000-75,000',
      image: ''
    },
    {
      id: '4',
      name: 'Vikram Solar',
      rating: 4.5,
      reviews: 98,
      location: 'Hingna Road, Nagpur',
      phone: '+91 65432 10987',
      experience: '5+ years',
      certifications: ['MNRE Certified', 'Make in India'],
      completedProjects: 167,
      priceRange: '63,000-68,000',
      image: ''
    },
    {
      id: '5',
      name: 'Adani Solar',
      rating: 4.7,
      reviews: 178,
      location: 'Wardha Road, Nagpur',
      phone: '+91 54321 09876',
      experience: '7+ years',
      certifications: ['MNRE Certified', 'IEC Certified'],
      completedProjects: 203,
      priceRange: '66,000-71,000',
      image: ''
    },
    {
      id: '6',
      name: 'Green Energy Systems',
      rating: 4.4,
      reviews: 87,
      location: 'Ballarpur, Chandrapur',
      phone: '+91 43210 98765',
      experience: '4+ years',
      certifications: ['MNRE Certified'],
      completedProjects: 134,
      priceRange: '62,000-67,000',
      image: ''
    }
  ];

  const handleContact = (dealerId: string) => {
    console.log('Contacting dealer:', dealerId);
    // Implement contact functionality
  };

  const handleViewProfile = (dealerId: string) => {
    console.log('Viewing profile:', dealerId);
    // Implement view profile functionality
  };

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dealer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || dealer.location.includes(locationFilter);
    const matchesRating = ratingFilter === 'all' || dealer.rating >= parseFloat(ratingFilter);
    
    return matchesSearch && matchesLocation && matchesRating;
  });

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">MSEDCL Empanelled Solar Dealers</h2>
        <p className="text-gray-600">Connect with verified solar installers in Nagpur & Chandrapur</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search dealers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Nagpur">Nagpur</SelectItem>
              <SelectItem value="Chandrapur">Chandrapur</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4.0">4.0+ Stars</SelectItem>
              <SelectItem value="3.5">3.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDealers.map((dealer) => (
          <DealerCard
            key={dealer.id}
            dealer={dealer}
            onContact={handleContact}
            onViewProfile={handleViewProfile}
          />
        ))}
      </div>
      
      {filteredDealers.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">No dealers found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default DealerDirectory;
