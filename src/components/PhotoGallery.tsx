
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

const PhotoGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const photos = [
    {
      id: 1,
      title: 'Before/After Installation',
      src: '/lovable-uploads/before-after-1.jpg',
      description: 'Amazing transformation in Nagpur'
    },
    {
      id: 2,
      title: 'Happy Customer Family',
      src: '/lovable-uploads/customer-testimonial-1.jpg',
      description: 'Sharma family saves ₹4,000/month'
    },
    {
      id: 3,
      title: 'Nagpur Installation',
      src: '/lovable-uploads/nagpur-installation-1.jpg',
      description: '5kW system in Civil Lines'
    },
    {
      id: 4,
      title: 'Technology Showcase',
      src: '/lovable-uploads/tech-showcase-1.jpg',
      description: 'Latest TOPCon panels'
    },
    {
      id: 5,
      title: 'Rooftop Installation',
      src: '/lovable-uploads/rooftop-install-1.jpg',
      description: 'Seamless rooftop integration'
    },
    {
      id: 6,
      title: 'Customer Celebration',
      src: '/lovable-uploads/customer-happy-1.jpg',
      description: 'First electricity bill after solar'
    }
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % photos.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? photos.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">📸 Photo Gallery</h3>
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <Card 
            key={photo.id}
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#FFC107]/30 hover:border-[#FFC107]"
            onClick={() => setSelectedImage(index)}
          >
            <CardContent className="p-0 relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                <img 
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden items-center justify-center text-gray-500">
                  <ImageIcon className="h-12 w-12" />
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-[#FFC107] rounded-full flex items-center justify-center shadow-lg">
                    <ImageIcon className="h-6 w-6 text-black" />
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white">
                <h4 className="font-bold text-[#1A3C34] mb-1 text-sm">{photo.title}</h4>
                <p className="text-xs text-gray-600">{photo.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </Button>
          
          <Button
            variant="ghost" 
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon" 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="max-w-4xl max-h-[90vh] flex flex-col">
            <img 
              src={photos[selectedImage].src}
              alt={photos[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-bold mb-2">{photos[selectedImage].title}</h3>
              <p className="text-gray-300">{photos[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
