export interface SolarCalculationData {
  bill: string;
  pincode: string;
  discom: string;
  panelBrand: string;
  walkway: boolean;
  elevatedStructure: boolean;
  solarType: string;
  desiredCapacity?: string;
  capacity?: number;
  units?: number;
  requiredLoad?: number;
  approxCostRange?: {
    min: number;
    max: number;
  };
  monthlySavings?: number;
  monthlyRevenue?: number;
  roi?: number;
  subsidies?: number;
  plantCost?: number;
  customizationCost?: number;
  netCost?: number;
  finalCost?: number;
}

export const validatePincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

export const generateSavingsData = (monthlySavings: number) => {
  const data = [];
  for (let i = 1; i <= 60; i++) {
    data.push({
      month: `Month ${i}`,
      cumulative: monthlySavings * i
    });
  }
  return data;
};

export const calculateSolar = (data: SolarCalculationData): SolarCalculationData => {
  let bill = 0;
  let capacity = 0;
  
  if (data.solarType === 'ground-mounted' && data.desiredCapacity) {
    capacity = parseFloat(data.desiredCapacity) || 0;
  } else {
    bill = parseFloat(data.bill) || 0;
    
    // Calculate based on solar type
    let unitPrice = 10.8; // Default residential rate
    
    if (data.solarType === 'commercial') {
      unitPrice = 20;
    } else if (data.solarType === 'industrial') {
      unitPrice = 9;
    }
    
    const units = Math.round(bill / unitPrice);
    const requiredLoad = parseFloat((units * 1.1 / 30).toFixed(2));
    capacity = Math.round((requiredLoad / 4) / 0.8);
  }
  
  // Base cost per kW
  let baseCostPerKW = 55000; // Default residential
  if (data.panelBrand === 'adani') baseCostPerKW += 2000;
  
  if (data.solarType === 'commercial') {
    baseCostPerKW = 50000;
  } else if (data.solarType === 'industrial') {
    baseCostPerKW = 45000;
  } else if (data.solarType === 'ground-mounted') {
    baseCostPerKW = 40000;
  }
  
  // Add-on costs
  let customizationCost = 0;
  if (data.walkway) {
    customizationCost += capacity * 6000;
    baseCostPerKW += 6000;
  }
  if (data.elevatedStructure) {
    customizationCost += capacity * 10000;
    baseCostPerKW += 10000;
  }
  
  const plantCost = capacity * baseCostPerKW;
  const totalCost = plantCost;
  const costRange = {
    min: Math.round(totalCost * 0.9),
    max: Math.round(totalCost * 1.1)
  };
  
  // Calculate subsidies
  const subsidies = Math.min(capacity * 18000, 78000);
  
  // Calculate monthly savings/revenue
  let monthlySavings = 0;
  let monthlyRevenue = 0;
  
  if (data.solarType === 'ground-mounted') {
    // Ground-mounted generates revenue at ₹3/unit
    monthlyRevenue = Math.round(capacity * 4 * 30 * 3);
  } else {
    // Other types save on electricity bills
    let unitPrice = 10.8;
    if (data.solarType === 'commercial') unitPrice = 20;
    if (data.solarType === 'industrial') unitPrice = 9;
    
    monthlySavings = Math.round(capacity * 4 * 30 * unitPrice * 0.8);
  }
  
  // Calculate costs
  const netCost = totalCost - subsidies;
  const finalCost = netCost;
  
  // Calculate ROI
  const roi = parseFloat((netCost / ((monthlySavings || monthlyRevenue || 1) * 12)).toFixed(1));
  
  const units = bill ? Math.round(bill / 10.8) : 0;
  const requiredLoad = bill ? parseFloat((units * 1.1 / 30).toFixed(2)) : 0;
  
  return {
    ...data,
    capacity,
    units,
    requiredLoad,
    approxCostRange: costRange,
    monthlySavings,
    monthlyRevenue,
    roi,
    subsidies,
    plantCost,
    customizationCost,
    netCost,
    finalCost
  };
};
