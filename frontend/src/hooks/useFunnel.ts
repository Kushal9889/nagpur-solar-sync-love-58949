import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Run: npm install uuid @types/uuid

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/funnel';

export type FunnelState = {
  sessionId: string;
  selection: {
    systemType: 'basic_4kw' | 'standard_8kw' | 'premium_12kw' | null;
    basePrice: number;
    structureType: 'standard_roof' | 'elevated' | 'high_rise' | null;
    structureSurcharge: number;
    hardware?: {
      panelTechnology?: string;
      panelBrand?: string;
      inverterBrand?: string;
    };
  };
  finalQuote: {
    totalSystemCost: number;
    gstAmount: number;
    finalTotal: number;
    monthlyEMI: number;
  };
  stepCompleted: number;
};

export const useFunnel = () => {
  const [state, setState] = useState<FunnelState | null>(null);
  const [loading, setLoading] = useState(false);

  // 1. Initialize Session on Load
  useEffect(() => {
    const initSession = async () => {
      let sid = localStorage.getItem('solar_session_id');
      if (!sid) {
        sid = uuidv4();
        localStorage.setItem('solar_session_id', sid);
      }
      
      // Fetch current state from backend to ensure sync
      try {
        const res = await fetch(`${API_URL}/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: sid, updateType: 'FETCH' }) // Simple fetch
        });
        const data = await res.json();
        if (data.success) setState(data.session);
      } catch (err) {
        console.error("Failed to init session", err);
      }
    };
    initSession();
  }, []);

  // 2. The Universal Update Function
  const updateFunnel = async (type: 'PLAN_UPDATE' | 'STRUCTURE_UPDATE' | 'HARDWARE_UPDATE' | 'DOC_UPLOAD' | 'PAYMENT_METHOD_UPDATE', payload: any) => {
    setLoading(true);
    const sid = localStorage.getItem('solar_session_id');
    
    try {
      const res = await fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sid,
          updateType: type,
          data: payload
        })
      });

      const responseData = await res.json();
      
      if (responseData.success) {
        setState(responseData.session); // Update local state with the Backend's calculation
        return responseData.session;
      }
    } catch (error) {
      console.error("Funnel Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    state,
    loading,
    selectPlan: (planType: string) => updateFunnel('PLAN_UPDATE', { planType }),
    selectStructure: (structureType: string) => updateFunnel('STRUCTURE_UPDATE', { structureType }),
    selectHardware: (tech: string, brand: string, inverter: string) => 
        updateFunnel('HARDWARE_UPDATE', { 
            selectedTechnology: tech, 
            selectedBrand: brand, 
            selectedInverter: inverter 
        }),
    saveDocument: (docId: string, fileKey: string) => updateFunnel('DOC_UPLOAD', { docId, fileKey }),
    selectPaymentMethod: (method: string) => updateFunnel('PAYMENT_METHOD_UPDATE', { paymentMethod: method }),
  };
};
