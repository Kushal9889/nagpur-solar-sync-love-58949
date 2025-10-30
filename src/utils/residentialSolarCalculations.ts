
export interface ResidentialCalculatorData {
  bill: string;
  pincode: string;
  discom: string;
  roofSize: string;
  sanctionedLoad: string;
  panelBrand: string;
  walkway: boolean;
  elevatedStructure: boolean;
  capacity?: number;
  units?: number;
  requiredLoad?: number;
  plantCost?: number;
  customizationCost?: number;
  subsidies?: number;
  netCost?: number;
  monthlySavings?: number;
  roi?: number;
}

export const PANEL_COSTS = {
  waaree: 55000,
  adani: 57000
};

export const CUSTOMIZATION_COSTS = {
  walkway: 6000,
  elevated: 10000
};

export const DISCOM_RATES = {
  msedcl: 10.8,
  adani: 11.2,
  tata: 11.0,
  best: 10.5
};

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

export const calculateResidentialSolar = (data: ResidentialCalculatorData): ResidentialCalculatorData => {
  const bill = parseFloat(data.bill) || 0;
  const roofSize = parseFloat(data.roofSize) || 0;
  const sanctionedLoad = parseFloat(data.sanctionedLoad) || 0;
  
  // Get unit rate based on DISCOM
  const unitRate = DISCOM_RATES[data.discom as keyof typeof DISCOM_RATES] || 10.8;
  
  // Calculate units and capacity
  const units = Math.round(bill / unitRate);
  const requiredLoad = parseFloat((units * 1.1 / 30).toFixed(2));
  const capacity = Math.min(
    Math.round((requiredLoad / 4) / 0.8),
    Math.floor(roofSize / 108), // 108 sq ft per kW
    sanctionedLoad
  );
  
  // Calculate costs
  const baseCostPerKW = PANEL_COSTS[data.panelBrand as keyof typeof PANEL_COSTS] || PANEL_COSTS.waaree;
  let totalCostPerKW = baseCostPerKW;
  
  let customizationCost = 0;
  if (data.walkway) {
    customizationCost += capacity * CUSTOMIZATION_COSTS.walkway;
    totalCostPerKW += CUSTOMIZATION_COSTS.walkway;
  }
  if (data.elevatedStructure) {
    customizationCost += capacity * CUSTOMIZATION_COSTS.elevated;
    totalCostPerKW += CUSTOMIZATION_COSTS.elevated;
  }
  
  const plantCost = capacity * baseCostPerKW;
  const totalCost = capacity * totalCostPerKW;
  
  // Calculate subsidies (MNRE subsidy)
  const subsidies = Math.min(capacity * 18000, 78000);
  
  // Calculate net cost
  const netCost = totalCost - subsidies;
  
  // Calculate monthly savings
  const monthlySavings = Math.round(capacity * 4 * 30 * unitRate * 0.8);
  
  // Calculate ROI (years)
  const roi = parseFloat((netCost / (monthlySavings * 12)).toFixed(1));
  
  return {
    ...data,
    capacity,
    units,
    requiredLoad,
    plantCost,
    customizationCost,
    subsidies,
    netCost,
    monthlySavings,
    roi
  };
};
