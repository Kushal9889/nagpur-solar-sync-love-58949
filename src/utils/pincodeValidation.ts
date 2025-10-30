
interface PincodeData {
  pincode: string;
  city: string;
  state: string;
  district: string;
}

// Mock pincode data - in production, integrate with actual API
const mockPincodeData: Record<string, PincodeData> = {
  '440001': { pincode: '440001', city: 'Nagpur', state: 'Maharashtra', district: 'Nagpur' },
  '440002': { pincode: '440002', city: 'Nagpur', state: 'Maharashtra', district: 'Nagpur' },
  '440008': { pincode: '440008', city: 'Nagpur', state: 'Maharashtra', district: 'Nagpur' },
  '440010': { pincode: '440010', city: 'Nagpur', state: 'Maharashtra', district: 'Nagpur' },
  '442401': { pincode: '442401', city: 'Chandrapur', state: 'Maharashtra', district: 'Chandrapur' },
  '442402': { pincode: '442402', city: 'Chandrapur', state: 'Maharashtra', district: 'Chandrapur' },
  '441001': { pincode: '441001', city: 'Gondia', state: 'Maharashtra', district: 'Gondia' },
  '444001': { pincode: '444001', city: 'Washim', state: 'Maharashtra', district: 'Washim' },
};

export const validatePincode = async (pincode: string): Promise<{ isValid: boolean; data?: PincodeData; error?: string }> => {
  try {
    // Clean pincode
    const cleanPincode = pincode.replace(/\D/g, '');
    
    if (cleanPincode.length !== 6) {
      return { isValid: false, error: 'Pincode must be exactly 6 digits' };
    }

    // Check in mock data first
    const mockData = mockPincodeData[cleanPincode];
    if (mockData) {
      return { isValid: true, data: mockData };
    }

    // In production, integrate with actual pincode API
    // For now, return mock validation for Maharashtra pincodes (starting with 4)
    if (cleanPincode.startsWith('4')) {
      return {
        isValid: true,
        data: {
          pincode: cleanPincode,
          city: 'Maharashtra City',
          state: 'Maharashtra',
          district: 'Maharashtra District'
        }
      };
    }

    return { isValid: false, error: 'Service not available in this area' };
  } catch (error) {
    return { isValid: false, error: 'Failed to validate pincode' };
  }
};
