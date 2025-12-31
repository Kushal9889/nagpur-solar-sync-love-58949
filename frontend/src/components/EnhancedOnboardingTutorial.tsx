
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, X, Play, Gift } from "lucide-react";

interface EnhancedOnboardingTutorialProps {
  onComplete: () => void;
  onStartPlanSelection: () => void;
}

const EnhancedOnboardingTutorial: React.FC<EnhancedOnboardingTutorialProps> = ({ 
  onComplete, 
  onStartPlanSelection 
}) => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [showGiftButton, setShowGiftButton] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show close button after 5 seconds
    const closeButtonTimer = setTimeout(() => {
      setShowCloseButton(true);
    }, 5000);

    // Simulate video end after 50 seconds for demo
    const videoEndTimer = setTimeout(() => {
      setVideoEnded(true);
      setShowGiftButton(true);
    }, 50000);

    return () => {
      clearTimeout(closeButtonTimer);
      clearTimeout(videoEndTimer);
    };
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setShowGiftButton(true);
  };

  const handleClaimGift = () => {
    onComplete();
    onStartPlanSelection();
  };

  const handleClose = () => {
    // Both X button and gift claim lead to same destination
    onComplete();
    onStartPlanSelection();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-2xl lg:max-w-4xl bg-gradient-to-br from-green-50 to-blue-50 relative mx-2 max-h-[90vh] overflow-y-auto">
        {/* Close Button - Only show after 5 seconds */}
        {showCloseButton && (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 bg-white/80 hover:bg-white"
            onClick={handleClose}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        )}

        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center">
              <Sun className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-green-800 mb-2">Welcome to Solar Panda!</CardTitle>
          <p className="text-green-600 text-sm sm:text-base lg:text-lg">Your Solar Journey Starts Here</p>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          {/* Video Player Section */}
          <div className="mb-6 sm:mb-8 bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              {/* Simulated Video Player Interface */}
              <div className="w-full h-full relative bg-gradient-to-br from-blue-900 via-green-800 to-blue-900 flex flex-col items-center justify-center p-4">
                <div className="text-white text-center mb-4 sm:mb-8">
                  <Sun className="h-8 w-8 sm:h-12 lg:h-16 w-12 lg:w-16 mx-auto mb-2 sm:mb-4 animate-spin text-yellow-400" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">Discover Solar Power</h3>
                  <p className="text-sm sm:text-base lg:text-lg opacity-80">Transform Your Home, Save Money, Save Planet</p>
                </div>
                
                {/* Progress Bar */}
                <div className="w-3/4 bg-gray-700 rounded-full h-1.5 sm:h-2 mb-2 sm:mb-4">
                  <div 
                    className="bg-red-600 h-1.5 sm:h-2 rounded-full transition-all duration-1000"
                    style={{ width: videoEnded ? '100%' : '20%' }}
                  ></div>
                </div>
                
                {/* Video Controls */}
                <div className="flex items-center gap-2 sm:gap-4 text-white">
                  <Play className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">{videoEnded ? '0:50' : '0:10'} / 0:50</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Video Overlay Message */}
              {!videoEnded && (
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-black/70 text-white p-2 sm:p-3 rounded">
                  <p className="text-xs sm:text-sm text-center">
                    🎥 Please watch the complete video to unlock your special gift!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Gift Claim Section */}
          <div className="text-center">
            {showGiftButton ? (
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 sm:p-6 rounded-2xl shadow-xl">
                  <Gift className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 animate-bounce" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">🎉 Congratulations!</h3>
                  <p className="text-sm sm:text-base lg:text-lg mb-2 sm:mb-4">You've unlocked your exclusive solar gift!</p>
                  <p className="text-xs sm:text-sm opacity-80">Get $50 instant discount + Free consultation</p>
                </div>
                
                <Button 
                  onClick={handleClaimGift}
                  className="w-full h-12 sm:h-16 px-6 sm:px-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-sm sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <Gift className="h-4 w-4 sm:h-6 sm:w-6 mr-2 sm:mr-3 animate-pulse" />
                  🎁 Claim Your Gift & Start Solar Journey
                </Button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                <Button 
                  disabled
                  className="w-full h-12 sm:h-16 px-6 sm:px-12 bg-gray-400 text-gray-600 font-bold text-sm sm:text-lg lg:text-xl cursor-not-allowed opacity-50"
                >
                  <Gift className="h-4 w-4 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                  🎁 Watch Video to Unlock Gift
                </Button>
                <p className="text-xs sm:text-sm text-gray-600">
                  Complete the video to claim your exclusive solar discount
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedOnboardingTutorial;
