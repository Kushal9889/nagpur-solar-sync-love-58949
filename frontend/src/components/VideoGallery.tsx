
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";

const VideoGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'how-solar-works',
      title: 'What and How Solar Works',
      thumbnail: '/uploads/solar-works-thumb.jpg',
      duration: '2:30',
      description: 'Complete guide to solar energy'
    },
    {
      id: 'customer-stories',
      title: 'Customer Success Stories',
      thumbnail: '/uploads/customer-stories-thumb.jpg',
      duration: '3:45',
      description: 'Real testimonials from Nagpur families'
    },
    {
      id: 'installation-process',
      title: 'Installation Process Time-lapse',
      thumbnail: '/uploads/installation-thumb.jpg',
      duration: '1:20',
      description: 'Watch complete installation in 1 minute'
    },
    {
      id: 'subsidy-guide',
      title: 'Subsidy Claim Guide',
      thumbnail: '/uploads/subsidy-guide-thumb.jpg',
      duration: '4:15',
      description: 'Step-by-step subsidy application'
    }
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6 text-center">📹 Video Gallery</h3>
      <div className="grid grid-cols-2 gap-4">
        {videos.map((video) => (
          <Card 
            key={video.id}
            className="group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-[#FFC107]/30 hover:border-[#FFC107]"
            onClick={() => setSelectedVideo(video.id)}
          >
            <CardContent className="p-0 relative">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-[#FFC107] rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg">
                    <Play className="h-8 w-8 text-black ml-1" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-bold text-[#1A3C34] mb-1 text-sm">{video.title}</h4>
                <p className="text-xs text-gray-600">{video.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">
                {videos.find(v => v.id === selectedVideo)?.title}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <p className="text-white">Video player would be integrated here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGallery;
