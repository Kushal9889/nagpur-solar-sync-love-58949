
export const validatePhoneNumber = (phone: string): boolean => {
  // Remove all non-digits
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's exactly 10 digits
  if (cleanPhone.length !== 10) return false;
  
  // Check if it starts with valid prefixes (6, 7, 8, 9)
  const validPrefixes = ['6', '7', '8', '9'];
  return validPrefixes.includes(cleanPhone[0]);
};

export const formatPhoneNumber = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.slice(0, 10);
};
