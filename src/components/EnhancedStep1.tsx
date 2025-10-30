
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { validatePhoneNumber } from '@/utils/phoneValidation';
import { validatePincode } from '@/utils/pincodeValidation';

interface EnhancedStep1Props {
  onNext: (data: { pincode: string; phone: string; city: string; }) => void;
  onBack?: () => void;
}

const EnhancedStep1: React.FC<EnhancedStep1Props> = ({ onNext, onBack }) => {
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [pincodeValidation, setPincodeValidation] = useState<{
    isValid: boolean;
    loading: boolean;
    error?: string;
  }>({ isValid: false, loading: false });
  const [phoneValidation, setPhoneValidation] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  // Auto-validate pincode
  useEffect(() => {
    if (pincode.length === 6) {
      setPincodeValidation({ isValid: false, loading: true });
      
      validatePincode(pincode)
        .then(result => {
          if (result.isValid && result.data) {
            setCity(result.data.city);
            setPincodeValidation({ isValid: true, loading: false });
          } else {
            setPincodeValidation({ 
              isValid: false, 
              loading: false, 
              error: result.error || 'Invalid pincode'
            });
            setCity('');
          }
        })
        .catch(() => {
          setPincodeValidation({ 
            isValid: false, 
            loading: false, 
            error: 'Failed to validate pincode'
          });
          setCity('');
        });
    } else {
      setPincodeValidation({ isValid: false, loading: false });
      setCity('');
    }
  }, [pincode]);

  // Auto-validate phone
  useEffect(() => {
    setPhoneValidation(validatePhoneNumber(phone));
  }, [phone]);

  // Check if can proceed
  useEffect(() => {
    setCanProceed(pincodeValidation.isValid && phoneValidation && Boolean(city));
  }, [pincodeValidation.isValid, phoneValidation, city]);

  // Auto-navigate when both fields are valid
  useEffect(() => {
    if (canProceed) {
      const timer = setTimeout(() => {
        handleNext();
      }, 500); // 500ms delay for better UX

      return () => clearTimeout(timer);
    }
  }, [canProceed]);

  const handleNext = () => {
    if (canProceed) {
      // Send data to backend for lead capture
      console.log('Lead captured:', { pincode, phone, city });
      
      onNext({ pincode, phone, city });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3C34] via-[#2D5A4D] to-[#D4EDDA] py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge className="bg-[#FFC107] text-black px-4 py-2 text-lg font-bold">
              Step 1 of 5: Location & Contact
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-[#FFC107] to-[#FF6200] h-3 rounded-full transition-all duration-500" style={{ width: '20%' }}></div>
          </div>
        </div>

        <Card className="shadow-2xl border-4 border-[#FFC107] bg-white">
          <CardHeader className="text-center bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold mb-4">
              🏠 Enter Your Location & Contact Details
            </CardTitle>
            <p className="text-lg text-gray-200">
              We'll verify your location and send you personalized solar quotes
            </p>
          </CardHeader>

          <CardContent className="p-8 space-y-6">
            {/* Pincode Field */}
            <div className="space-y-3">
              <Label htmlFor="pincode" className="text-lg font-bold text-[#1A3C34] flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Pincode *
              </Label>
              <div className="relative">
                <Input
                  id="pincode"
                  type="text"
                  placeholder="Enter your 6-digit pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={handleKeyPress}
                  className="h-14 text-xl border-2 border-[#1A3C34] focus:border-[#FFC107] pl-4 pr-12"
                  maxLength={6}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {pincodeValidation.loading && <Loader className="h-6 w-6 animate-spin text-blue-500" />}
                  {pincodeValidation.isValid && <CheckCircle className="h-6 w-6 text-green-500" />}
                  {!pincodeValidation.loading && !pincodeValidation.isValid && pincode.length === 6 && (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  )}
                </div>
              </div>
              
              {city && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 font-semibold">
                    ✅ Verified Location: {city}
                  </p>
                </div>
              )}
              
              {pincodeValidation.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 font-semibold">
                    ❌ {pincodeValidation.error}
                  </p>
                </div>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-3">
              <Label htmlFor="phone" className="text-lg font-bold text-[#1A3C34] flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Number *
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  onKeyDown={handleKeyPress}
                  className="h-14 text-xl border-2 border-[#1A3C34] focus:border-[#FFC107] pl-4 pr-12"
                  maxLength={10}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {phoneValidation && <CheckCircle className="h-6 w-6 text-green-500" />}
                  {!phoneValidation && phone.length > 0 && <AlertCircle className="h-6 w-6 text-red-500" />}
                </div>
              </div>
              
              {phoneValidation && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 font-semibold">
                    ✅ Valid phone number
                  </p>
                </div>
              )}
              
              {!phoneValidation && phone.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 font-semibold">
                    ❌ Please enter a valid 10-digit mobile number
                  </p>
                </div>
              )}
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-[#FFC107]/20 to-[#FF6200]/20 rounded-lg p-6 border-2 border-[#FFC107]">
              <h3 className="text-lg font-bold text-[#1A3C34] mb-3">
                🎯 What happens next?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Instant location verification & service availability check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Personalized solar quote based on your location</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Direct contact from verified local solar experts</span>
                </li>
              </ul>
            </div>

            {/* Auto-Navigation Indicator */}
            {canProceed && (
              <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center animate-pulse">
                <p className="text-green-800 font-bold text-lg">
                  ✅ Details verified! Auto-proceeding to next step...
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              {onBack && (
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 h-14 text-lg font-bold border-2 border-[#1A3C34] text-[#1A3C34] hover:bg-[#1A3C34] hover:text-white"
                >
                  ← Back
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex-1 h-14 text-lg font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 ${
                  canProceed 
                    ? 'bg-gradient-to-r from-[#1A3C34] to-[#2D5A4D] hover:from-[#2D5A4D] hover:to-[#1A3C34] text-white hover:scale-105' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {canProceed ? 'Continue to Solar Plans →' : 'Enter Valid Details to Continue'}
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-sm text-gray-600 pt-4">
              <p>💡 Tip: Press Enter to quickly navigate to the next step once details are valid</p>
              <p className="mt-2">🔒 Your information is secure and will only be shared with verified solar partners</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedStep1;
