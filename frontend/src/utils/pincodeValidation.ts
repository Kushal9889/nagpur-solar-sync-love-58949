
interface PincodeData {
  pincode: string;
  city: string;
  state: string;
  district: string;
}

// Mock pincode data - in production, integrate with actual API
const mockPincodeData: Record<string, PincodeData> = {
  '02108': { pincode: '02108', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02109': { pincode: '02109', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02110': { pincode: '02110', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02111': { pincode: '02111', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02113': { pincode: '02113', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02114': { pincode: '02114', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02115': { pincode: '02115', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
  '02116': { pincode: '02116', city: 'Boston', state: 'Massachusetts', district: 'Suffolk' },
};

export const validatePincode = async (pincode: string): Promise<{ isValid: boolean; data?: PincodeData; error?: string }> => {
  try {
    // Clean pincode
    const cleanPincode = pincode.replace(/\D/g, '');
    
    if (cleanPincode.length !== 5) {
      return { isValid: false, error: 'Zip code must be exactly 5 digits' };
    }

    // Check in mock data first
    const mockData = mockPincodeData[cleanPincode];
    if (mockData) {
      return { isValid: true, data: mockData };
    }

    // In production, integrate with actual pincode API
    // For now, return mock validation for Massachusetts zip codes (starting with 0)
    if (cleanPincode.startsWith('0')) {
      return {
        isValid: true,
        data: {
          pincode: cleanPincode,
          city: 'Boston Area',
          state: 'Massachusetts',
          district: 'Suffolk County'
        }
      };
    }

    return { isValid: false, error: 'Service not available in this area' };
  } catch (error) {
    return { isValid: false, error: 'Failed to validate zip code' };
  }
};
