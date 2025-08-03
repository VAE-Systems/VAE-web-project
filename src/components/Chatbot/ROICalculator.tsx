import React, { useState, useEffect } from 'react';
import './ROICalculator.css';

interface ROICalculatorProps {
  onClose: () => void;
  role?: string;
  onComplete?: (results: ROIResults) => void;
}

interface ROIResults {
  monthlySavings: number;
  yearlySavings: number;
  hoursSaved: number;
  roiPercentage: number;
  paybackMonths: number;
}

interface RoleDefaults {
  hourlyRate: number;
  hoursPerWeek: number;
  processCount: number;
  industryMultiplier: number;
}

const ROLE_DEFAULTS: Record<string, RoleDefaults> = {
  ceo: { hourlyRate: 150, hoursPerWeek: 10, processCount: 5, industryMultiplier: 1.5 },
  cto: { hourlyRate: 120, hoursPerWeek: 15, processCount: 8, industryMultiplier: 1.3 },
  developer: { hourlyRate: 80, hoursPerWeek: 8, processCount: 4, industryMultiplier: 1.2 },
  marketing: { hourlyRate: 70, hoursPerWeek: 12, processCount: 6, industryMultiplier: 1.1 },
  operations: { hourlyRate: 60, hoursPerWeek: 20, processCount: 10, industryMultiplier: 1.0 },
  startup_founder: { hourlyRate: 100, hoursPerWeek: 25, processCount: 12, industryMultiplier: 1.4 },
  management: { hourlyRate: 90, hoursPerWeek: 15, processCount: 7, industryMultiplier: 1.2 }
};

const INDUSTRIES = [
  { value: 'software', label: 'Software/IT', multiplier: 1.4 },
  { value: 'finance', label: 'Finanzdienstleistungen', multiplier: 1.3 },
  { value: 'healthcare', label: 'Gesundheitswesen', multiplier: 1.2 },
  { value: 'manufacturing', label: 'Fertigung', multiplier: 1.1 },
  { value: 'retail', label: 'Einzelhandel', multiplier: 1.0 },
  { value: 'consulting', label: 'Beratung', multiplier: 1.3 },
  { value: 'marketing', label: 'Marketing/Agentur', multiplier: 1.2 },
  { value: 'logistics', label: 'Logistik', multiplier: 1.1 },
  { value: 'education', label: 'Bildung', multiplier: 0.9 },
  { value: 'other', label: 'Sonstige', multiplier: 1.0 }
];

const TEAM_SIZES = [
  { value: 'solo', label: 'Einzelperson', multiplier: 1.0 },
  { value: 'small', label: '2-10 Mitarbeiter', multiplier: 1.5 },
  { value: 'medium', label: '11-50 Mitarbeiter', multiplier: 2.5 },
  { value: 'large', label: '51-200 Mitarbeiter', multiplier: 4.0 },
  { value: 'enterprise', label: '200+ Mitarbeiter', multiplier: 8.0 }
];

export default function ROICalculator({ onClose, role, onComplete }: ROICalculatorProps) {
  const defaults = ROLE_DEFAULTS[role || 'management'];
  
  const [hourlyRate, setHourlyRate] = useState(defaults?.hourlyRate || 80);
  const [hoursPerWeek, setHoursPerWeek] = useState(defaults?.hoursPerWeek || 10);
  const [processCount, setProcessCount] = useState(defaults?.processCount || 5);
  const [industry, setIndustry] = useState('software');
  const [teamSize, setTeamSize] = useState('small');
  const [automationLevel, setAutomationLevel] = useState(0.7);
  const [results, setResults] = useState<ROIResults | null>(null);

  const selectedIndustry = INDUSTRIES.find(i => i.value === industry);
  const selectedTeamSize = TEAM_SIZES.find(s => s.value === teamSize);
  
  const industryMultiplier = selectedIndustry?.multiplier || 1.0;
  const teamMultiplier = selectedTeamSize?.multiplier || 1.0;
  const roleMultiplier = defaults?.industryMultiplier || 1.0;

  useEffect(() => {
    calculateROI();
  }, [hourlyRate, hoursPerWeek, processCount, industry, teamSize, automationLevel]);

  const calculateROI = () => {
    const baseHourlySavings = hourlyRate * hoursPerWeek * 4.33; // Monthly
    const processMultiplier = Math.sqrt(processCount) * 0.8 + 0.2;
    const totalMultiplier = industryMultiplier * teamMultiplier * roleMultiplier * processMultiplier;
    
    const monthlySavings = baseHourlySavings * automationLevel * totalMultiplier;
    const yearlySavings = monthlySavings * 12;
    const hoursSaved = hoursPerWeek * 4.33 * automationLevel * processCount;
    
    // Assume implementation cost based on complexity
    const implementationCost = 5000 + (processCount * 1000) + (teamMultiplier * 2000);
    const roiPercentage = ((yearlySavings - implementationCost) / implementationCost) * 100;
    const paybackMonths = implementationCost / monthlySavings;

    setResults({
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      hoursSaved: Math.round(hoursSaved),
      roiPercentage: Math.round(roiPercentage),
      paybackMonths: Math.round(paybackMonths * 10) / 10
    });
  };

  const handleComplete = () => {
    if (results && onComplete) {
      onComplete(results);
    }
  };

  return (
    <div className="roi-calculator">
      <div className="roi-calculator-header">
        <h3 className="roi-calculator-title">ROI-Rechner</h3>
        <button className="roi-close-button" onClick={onClose} title="Schließen">
          ×
        </button>
      </div>

      <div className="roi-role-selector">
        <button 
          className={`roi-role-button ${role === 'ceo' ? 'active' : ''}`}
          onClick={() => setHourlyRate(ROLE_DEFAULTS.ceo.hourlyRate)}
        >
          CEO
        </button>
        <button 
          className={`roi-role-button ${role === 'cto' ? 'active' : ''}`}
          onClick={() => setHourlyRate(ROLE_DEFAULTS.cto.hourlyRate)}
        >
          CTO
        </button>
        <button 
          className={`roi-role-button ${role === 'developer' ? 'active' : ''}`}
          onClick={() => setHourlyRate(ROLE_DEFAULTS.developer.hourlyRate)}
        >
          Developer
        </button>
        <button 
          className={`roi-role-button ${role === 'marketing' ? 'active' : ''}`}
          onClick={() => setHourlyRate(ROLE_DEFAULTS.marketing.hourlyRate)}
        >
          Marketing
        </button>
        <button 
          className={`roi-role-button ${role === 'operations' ? 'active' : ''}`}
          onClick={() => setHourlyRate(ROLE_DEFAULTS.operations.hourlyRate)}
        >
          Operations
        </button>
      </div>

      <div className="roi-input-group">
        <label>Stundensatz (€)</label>
        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
          min="20"
          max="500"
        />
      </div>

      <div className="roi-input-group">
        <label>Stunden pro Woche für manuelle Prozesse</label>
        <input
          type="number"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          min="1"
          max="60"
        />
      </div>

      <div className="roi-input-group">
        <label>Anzahl zu automatisierender Prozesse</label>
        <input
          type="number"
          value={processCount}
          onChange={(e) => setProcessCount(Number(e.target.value))}
          min="1"
          max="50"
        />
      </div>

      <div className="roi-input-group">
        <label>Branche</label>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          {INDUSTRIES.map(ind => (
            <option key={ind.value} value={ind.value}>{ind.label}</option>
          ))}
        </select>
      </div>

      <div className="roi-input-group">
        <label>Teamgröße</label>
        <select value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
          {TEAM_SIZES.map(size => (
            <option key={size.value} value={size.value}>{size.label}</option>
          ))}
        </select>
      </div>

      <div className="roi-input-group">
        <label>Automatisierungsgrad: {Math.round(automationLevel * 100)}%</label>
        <input
          type="range"
          min="0.3"
          max="0.9"
          step="0.1"
          value={automationLevel}
          onChange={(e) => setAutomationLevel(Number(e.target.value))}
        />
      </div>

      {results && (
        <div className="roi-results">
          <div className="roi-result-item">
            <span>Monatliche Einsparung:</span>
            <span>€{results.monthlySavings.toLocaleString()}</span>
          </div>
          <div className="roi-result-item">
            <span>Jährliche Einsparung:</span>
            <span>€{results.yearlySavings.toLocaleString()}</span>
          </div>
          <div className="roi-result-item">
            <span>Zeitersparnis pro Monat:</span>
            <span>{results.hoursSaved} Stunden</span>
          </div>
          <div className="roi-result-item">
            <span>Amortisation:</span>
            <span>{results.paybackMonths} Monate</span>
          </div>
          <div className="roi-result-item">
            <span>Jährlicher ROI:</span>
            <span>{results.roiPercentage}%</span>
          </div>
        </div>
      )}

      <div className="action-buttons-container">
        <button className="action-button" onClick={handleComplete}>
          Ergebnisse speichern und Beratung buchen
        </button>
      </div>
    </div>
  );
}
