
export interface AuditData {
  id: string;
  type: 'financial' | 'performance';
  status: 'pending' | 'completed' | 'in-progress';
  createdAt: string;
  completedAt?: string;
  data: any;
}

export interface FinancialAuditData {
  plantCost: number;
  subsidies: number;
  payments: number;
  monthlySavings: number;
  roi: number;
  paybackPeriod: number;
}

export interface PerformanceAuditData {
  dailyGeneration: number;
  monthlyGeneration: number;
  uptime: number;
  performanceScore: number;
  alerts: string[];
  lastUpdated: string;
}

export interface AuditPrompt {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  prompt: string;
  dependencies?: string[];
  implemented: boolean;
}

export const generateFinancialAudit = (capacity: number, totalCost: number): FinancialAuditData => {
  const subsidies = Math.min(capacity * 18000, 78000);
  const monthlySavings = Math.round(capacity * 4 * 30 * 10.8 * 0.8);
  const netCost = totalCost - subsidies;
  const paybackPeriod = parseFloat((netCost / (monthlySavings * 12)).toFixed(1));
  
  return {
    plantCost: totalCost,
    subsidies,
    payments: 1000,
    monthlySavings,
    roi: paybackPeriod,
    paybackPeriod
  };
};

export const generatePerformanceAudit = (capacity: number): PerformanceAuditData => {
  const dailyGeneration = Math.round(capacity * 4 * 0.95);
  const monthlyGeneration = dailyGeneration * 30;
  
  return {
    dailyGeneration,
    monthlyGeneration,
    uptime: 95,
    performanceScore: 95,
    alerts: ['System performing optimally'],
    lastUpdated: new Date().toISOString()
  };
};

const mockPrompts: AuditPrompt[] = [
  {
    id: 'feature-001',
    title: 'Enhanced Video Gallery',
    description: 'Add comprehensive video showcase with before/after content',
    category: 'UI/UX',
    priority: 'HIGH',
    prompt: 'Create a video gallery component that showcases before/after installation videos, customer testimonials, and drone footage of solar installations.',
    dependencies: ['AWS S3', 'Video Player'],
    implemented: false
  },
  {
    id: 'feature-002',
    title: 'Real-time Weather Integration',
    description: 'Display weather data affecting solar generation',
    category: 'Data Integration',
    priority: 'MEDIUM',
    prompt: 'Integrate weather API to show current weather conditions and how they affect solar panel efficiency in real-time.',
    dependencies: ['Weather API', 'Location Services'],
    implemented: false
  },
  {
    id: 'feature-003',
    title: 'Advanced Analytics Dashboard',
    description: 'Detailed performance metrics and analytics',
    category: 'Analytics',
    priority: 'HIGH',
    prompt: 'Build a comprehensive analytics dashboard showing energy generation, savings, ROI calculations, and performance trends over time.',
    dependencies: ['Chart Library', 'Data Storage'],
    implemented: false
  }
];

class ApplicationAuditor {
  private prompts: AuditPrompt[];
  private implementedPrompts: Set<string>;

  constructor() {
    this.prompts = [...mockPrompts];
    this.implementedPrompts = new Set();
  }

  getProgress() {
    const total = this.prompts.length;
    const implemented = this.implementedPrompts.size;
    const percentage = total > 0 ? Math.round((implemented / total) * 100) : 0;
    
    return {
      total,
      implemented,
      percentage
    };
  }

  getUnimplementedPrompts(): AuditPrompt[] {
    return this.prompts.filter(prompt => !this.implementedPrompts.has(prompt.id));
  }

  getPromptsByPriority(priority: 'HIGH' | 'MEDIUM' | 'LOW'): AuditPrompt[] {
    return this.prompts.filter(prompt => 
      prompt.priority === priority && !this.implementedPrompts.has(prompt.id)
    );
  }

  markAsImplemented(promptId: string) {
    this.implementedPrompts.add(promptId);
  }

  generateImplementationLoop(): string[] {
    const unimplemented = this.getUnimplementedPrompts();
    const sorted = unimplemented.sort((a, b) => {
      const priorityOrder = { 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    return sorted.map(prompt => prompt.prompt);
  }
}

export const auditor = new ApplicationAuditor();

export const mockAudits: AuditData[] = [
  {
    id: 'audit-001',
    type: 'financial',
    status: 'completed',
    createdAt: '2024-12-01',
    completedAt: '2024-12-02',
    data: generateFinancialAudit(10, 550000)
  },
  {
    id: 'audit-002',
    type: 'performance',
    status: 'completed',
    createdAt: '2024-12-05',
    completedAt: '2024-12-06',
    data: generatePerformanceAudit(10)
  }
];
