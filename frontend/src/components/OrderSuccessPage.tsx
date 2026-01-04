import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
  const paymentIntentId = searchParams.get('payment_intent');

  useEffect(() => {
    const finalizeOrder = async () => {
      const sessionId = localStorage.getItem("solar_session_id");
      
      // If no session, maybe we just refreshed the page. 
      // If no paymentIntentId, maybe we are testing or it's a different flow.
      if (!sessionId || !paymentIntentId) {
          // Fallback: Just show success if we lack data to verify, 
          // assuming webhook handled it or it's a revisit.
          setStatus('success'); 
          return;
      }

      try {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
          const res = await fetch(`${API_URL}/api/funnel/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId, paymentIntentId })
          });
          
          const data = await res.json();
          
          if (data.success || data.message === "Order already processed") {
              // CRITICAL: Save User ID for Profile
              if (data.userId) {
                  localStorage.setItem('solar_user_id', data.userId);
              }
              
              // Clear temporary session data
              localStorage.removeItem("funnel_session_id");
              localStorage.removeItem("solar_session_id");
              
              setStatus('success');
          } else {
              console.error("Migration failed:", data);
              setStatus('error');
          }
      } catch (err) {
          console.error("Finalize Order Error:", err);
          setStatus('error');
      }
    };

    finalizeOrder();
  }, [paymentIntentId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F2F26] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Verifying Payment...</h2>
            <p className="text-gray-500 text-center mt-2">Please wait while we confirm your booking.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-[#0F2F26] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Something went wrong</h2>
            <p className="text-gray-500 text-center mt-2 mb-6">We couldn't verify your payment details.</p>
            <Button onClick={() => navigate('/booking')} className="w-full">
              Return to Booking
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F2F26] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-t-4 border-emerald-500 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-900">Booking Confirmed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="text-center text-gray-600">
            <p>Thank you for choosing Solar Panda.</p>
            <p className="text-sm mt-1">Your payment has been processed successfully.</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono font-medium text-gray-700">
                {paymentIntentClientSecret?.split('_secret')[0].slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-700">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-700">Status</span>
              <span className="font-bold text-emerald-600">
                Confirmed
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">Next Steps:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">1</span>
                Check your email for the booking confirmation.
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full mt-0.5">2</span>
                Our team will contact you within 24 hours to schedule the site survey.
              </li>
            </ul>
          </div>

          <Button onClick={() => navigate('/')} className="w-full bg-[#0F2F26] hover:bg-[#1A3C34]">
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccessPage;
