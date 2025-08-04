export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatbotConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  showROI?: boolean;
}

export interface ROIInputs {
  currentMonthlyRevenue: number;
  currentMonthlyCosts: number;
  efficiencyImprovement: number;
  timeSavedPerWeek: number;
  hourlyRate: number;
}

export interface ROICalculation {
  monthlySavings: number;
  annualSavings: number;
  roiPercentage: number;
  paybackPeriod: number;
}
