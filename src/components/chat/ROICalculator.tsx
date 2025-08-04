import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { ROIInputs, ROICalculation } from './types';
import './ROICalculator.css';

export const ROICalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentMonthlyRevenue: 50000,
    currentMonthlyCosts: 30000,
    efficiencyImprovement: 25,
    timeSavedPerWeek: 10,
    hourlyRate: 50,
  });

  const [showResults, setShowResults] = useState(false);

  const calculateROI = (): ROICalculation => {
    const {
      currentMonthlyRevenue,
      currentMonthlyCosts,
      efficiencyImprovement,
      timeSavedPerWeek,
      hourlyRate,
    } = inputs;

    // Calculate cost savings from efficiency improvement
    const efficiencySavings = (currentMonthlyCosts * efficiencyImprovement) / 100;
    
    // Calculate time savings value
    const timeSavingsValue = timeSavedPerWeek * 4.33 * hourlyRate; // 4.33 weeks per month
    
    // Total monthly savings
    const monthlySavings = efficiencySavings + timeSavingsValue;
    const annualSavings = monthlySavings * 12;
    
    // Assume implementation cost is 3 months of savings
    const implementationCost = monthlySavings * 3;
    const roiPercentage = (annualSavings / implementationCost) * 100;
    const paybackPeriod = implementationCost / monthlySavings;
    
    return {
      monthlySavings,
      annualSavings,
      roiPercentage,
      paybackPeriod,
    };
  };

  const handleInputChange = (field: keyof ROIInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  const results = calculateROI();

  return (
    <div className="roi-calculator p-4 bg-gray-50">
      <div className="flex items-center mb-4">
        <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
        <h4 className="font-semibold text-gray-800">ROI Calculator</h4>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Monthly Revenue (€)
          </label>
          <input
            type="number"
            value={inputs.currentMonthlyRevenue}
            onChange={(e) => handleInputChange('currentMonthlyRevenue', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Monthly Costs (€)
          </label>
          <input
            type="number"
            value={inputs.currentMonthlyCosts}
            onChange={(e) => handleInputChange('currentMonthlyCosts', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Efficiency Improvement (%)
          </label>
          <input
            type="number"
            value={inputs.efficiencyImprovement}
            onChange={(e) => handleInputChange('efficiencyImprovement', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Saved Per Week (hours)
          </label>
          <input
            type="number"
            value={inputs.timeSavedPerWeek}
            onChange={(e) => handleInputChange('timeSavedPerWeek', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hourly Rate (€)
          </label>
          <input
            type="number"
            value={inputs.hourlyRate}
            onChange={(e) => handleInputChange('hourlyRate', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            min="0"
          />
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Calculate ROI
        </button>

        {showResults && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <h5 className="font-semibold text-gray-800 mb-3">Your Results</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-sm text-gray-600">Monthly Savings</span>
                </div>
                <span className="font-semibold text-green-600">
                  €{results.monthlySavings.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  <span className="text-sm text-gray-600">Annual Savings</span>
                </div>
                <span className="font-semibold text-blue-600">
                  €{results.annualSavings.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="text-sm text-gray-600">ROI</span>
                </div>
                <span className="font-semibold text-purple-600">
                  {results.roiPercentage.toFixed(0)}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-600" />
                  <span className="text-sm text-gray-600">Payback Period</span>
                </div>
                <span className="font-semibold text-orange-600">
                  {results.paybackPeriod.toFixed(1)} months
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
