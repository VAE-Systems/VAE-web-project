// Enhanced Rules Engine for VAE Systems Chatbot
// Provides sophisticated conversation flow with role-based responses and use cases

export type ConversationStage =
  | 'welcome'
  | 'role'
  | 'usecase'
  | 'demo'
  | 'handoff'
  | 'generic'
  | 'technical'
  | 'pricing'
  | 'timeline';

export interface UseCase {
  title: string;
  description: string;
  timeSaved: string;
  industry: string;
}

export interface ActionButton {
  text: string;
  action: 'demo' | 'calendar' | 'contact' | 'usecase';
  data?: unknown;
}

export interface BotResponse {
  answer: string;
  suggestions?: string[];
  useCases?: UseCase[];
  actionButtons?: ActionButton[];
  interactiveElements?: { type: 'roi-calculator'; data?: unknown }[];
  newStage?: ConversationStage;
  detectedRole?: 'ceo' | 'cto' | 'developer' | 'marketing' | 'operations' | 'startup_founder' | 'management';
}

export interface RulesContext {
  stage: ConversationStage;
  role?: 'ceo' | 'cto' | 'developer' | 'marketing' | 'operations' | 'startup_founder' | 'management';
}

/**
 * Enhanced rules engine with sophisticated conversation flow
 * Maps user messages to intelligent responses based on context and role
 */
export function applyRules(
  message: string,
  context: RulesContext
): BotResponse | null {
  const lower = message.toLowerCase().trim();

  // Welcome stage: detect user role with enhanced responses
  if (context.stage === 'welcome') {
    if (/cto|entwickler|tech|technik|programmierer/.test(lower)) {
      return {
        answer: 'Perfekt! Als Techniker verstehst du die Herausforderungen komplexer Workflows. Welche Prozesse verschlingen aktuell die meiste Zeit in deinem Team?',
        suggestions: [
          'CI/CD Pipeline optimieren',
          'Monitoring & Alerting automatisieren',
          'Datenmigrationen vereinfachen',
          'Legacy System Integration'
        ],
        newStage: 'technical',
        detectedRole: 'developer'
      };
    }
    
    if (/marketing|vertrieb|sales|growth/.test(lower)) {
      return {
        answer: 'Als Marketing- oder Sales-Profi kennst du die Herausforderungen mit Lead-Qualifizierung und Reporting. Welche Prozesse würdest du gerne automatisieren?',
        suggestions: [
          'Lead-Scoring automatisieren',
          'Reportings erstellen',
          'E-Mail Kampagnen optimieren',
          'CRM-Daten synchronisieren'
        ],
        newStage: 'usecase',
        detectedRole: 'marketing'
      };
    }
    
    if (/geschäftsführung|ceo|teamlead|gründer|founder/.test(lower)) {
      return {
        answer: 'Als Geschäftsführer stehst du vor der Herausforderung, Effizienz zu steigern und Kosten zu reduzieren. Lass uns deine größten Zeitfresser identifizieren.',
        suggestions: [
          'Zeige mir ROI-Berechnungen',
          'Use Cases für meine Branche',
          'Zeit- und Kosteneinsparungen',
          'Skalierungsstrategien'
        ],
        newStage: 'usecase',
        detectedRole: 'management'
      };
    }
    
    if (/operations|prozesse|prozess/.test(lower)) {
      return {
        answer: 'Als Operations-Experte kennst du die täglichen Herausforderungen ineffizienter Prozesse. Welche Workflows würdest du gerne optimieren?',
        suggestions: [
          'Dokumentenverarbeitung',
          'Genehmigungsprozesse',
          'Daten-Integration',
          'Qualitätssicherung'
        ],
        newStage: 'usecase',
        detectedRole: 'operations'
      };
    }
  }

  // Technical deep-dive for developers
  if (context.role === 'developer' && /ci|cd|pipeline|deploy|build/.test(lower)) {
    return {
      answer: 'CI/CD-Automatisierung kann Build-Zeiten um 60-80% reduzieren. Unsere Temporal-basierten Workflows sind skalierbar und fehlertolerant.',
      useCases: [
        {
          title: 'Multi-Stage Deployment',
          description: 'Automatisierte Tests, Security-Scans und Deployments mit Rollback-Funktionalität.',
          timeSaved: '2h/Deployment',
          industry: 'Software'
        },
        {
          title: 'Infrastructure as Code',
          description: 'Automatische Provisionierung und Konfiguration von Cloud-Ressourcen.',
          timeSaved: '4h/Woche',
          industry: 'DevOps'
        },
        {
          title: 'Monitoring & Alerting',
          description: 'Intelligente Alerts basierend auf Metriken und automatische Eskalation.',
          timeSaved: '1h/Tag',
          industry: 'Operations'
        }
      ],
      suggestions: ['Wie funktioniert Temporal?', 'Zeig mir Code-Beispiele', 'Preismodell verstehen'],
      newStage: 'technical'
    };
  }

  // Marketing automation examples
  if (context.role === 'marketing' && /lead|scoring|crm/.test(lower)) {
    return {
      answer: 'Lead-Scoring und -Qualifizierung lassen sich vollständig automatisieren. Unsere Kunden sehen durchschnittlich 40% mehr Conversions.',
      useCases: [
        {
          title: 'Intelligentes Lead-Scoring',
          description: 'Automatische Bewertung und Segmentierung von Leads basierend auf Verhalten und Daten.',
          timeSaved: '3h/Tag',
          industry: 'B2B SaaS'
        },
        {
          title: 'Personalisierte E-Mail-Kampagnen',
          description: 'Automatisierte E-Mail-Sequenzen basierend auf Nutzerverhalten und Profildaten.',
          timeSaved: '5h/Woche',
          industry: 'E-Commerce'
        },
        {
          title: 'Cross-Channel Attribution',
          description: 'Automatische Zuordnung von Conversions zu Marketing-Kanälen.',
          timeSaved: '2h/Tag',
          industry: 'Performance Marketing'
        }
      ],
      actionButtons: [{ text: 'Marketing-Demo buchen', action: 'demo' }],
      newStage: 'demo'
    };
  }

  // ROI and cost calculations - enhanced with role-specific calculations
  if (/roi|einsparung|rentabilit|kosten|preis|budget|sparen|zeit|effizienz/.test(lower)) {
    const roleSpecificContext = context.role ? {
      ceo: 'Als Geschäftsführer kannst du durch Automatisierung durchschnittlich 30-50% der administrativen Kosten einsparen.',
      cto: 'Als CTO reduzierst du Entwicklungs- und Operations-Kosten um 40-60% durch intelligente Automatisierung.',
      developer: 'Als Entwickler sparst du 2-4 Stunden täglich durch automatisierte Workflows.',
      marketing: 'Im Marketing kannst du 20-30% der Kampagnenkosten einsparen und gleichzeitig die Conversion-Rate steigern.',
      operations: 'In der Operations sparst du durchschnittlich 15-25 Stunden pro Woche pro automatisierter Prozess.',
      startup_founder: 'Als Gründer kannst du durch Automatisierung 50-70% der operativen Kosten reduzieren und dich auf Wachstum konzentrieren.',
      management: 'Im Management reduzierst du Berichts- und Koordinationsaufwand um 30-40%.'
    }[context.role] : 'Unternehmen sparen durchschnittlich 30-40% der Prozesskosten durch intelligente Automatisierung.';

    return {
      answer: `${roleSpecificContext}\n\nLass uns gemeinsam berechnen, wie viel du konkret sparen kannst. Der ROI-Rechner passt sich an deine Rolle und Branche an.`,
      interactiveElements: [{ type: 'roi-calculator', data: { role: context.role } }],
      suggestions: [
        'Zeig mir typische Einsparungen',
        'Wie lange dauert die Amortisation?',
        'Gibt es Referenzen aus meiner Branche?'
      ],
      newStage: 'pricing'
    };
  }

  // Timeline and implementation questions
  if (/dauer|zeitraum|umsetzung|schnell|timeline/.test(lower)) {
    return {
      answer: 'Die Implementierungszeit hängt von der Komplexität ab. Einfache Workflows: 1-2 Wochen, komplexe Integrationen: 4-8 Wochen.',
      useCases: [
        {
          title: 'Quick-Win Automatisierung',
          description: 'Einfache Workflows wie E-Mail-Automatisierung in 5-10 Tagen.',
          timeSaved: 'Sofort nach Go-Live',
          industry: 'Alle Branchen'
        },
        {
          title: 'Enterprise Integration',
          description: 'Komplexe Multi-System-Integrationen mit vollem Testing.',
          timeSaved: 'Nach 6-8 Wochen',
          industry: 'Großunternehmen'
        }
      ],
      suggestions: ['Was brauche ich zur Vorbereitung?', 'Wie läuft das Projekt ab?'],
      newStage: 'timeline'
    };
  }

  // Demo or example intent - enhanced
  if (/demo|beispiel|zeigen|use case|anwendungsfall/.test(lower)) {
    const useCasesByRole: Record<string, UseCase[]> = {
      developer: [
        {
          title: 'GitHub Actions + Slack Integration',
          description: 'Automatische Benachrichtigungen bei Build-Fehlern mit detaillierten Logs.',
          timeSaved: '30m/Build',
          industry: 'Software Development'
        },
        {
          title: 'Database Migration Workflows',
          description: 'Automatisierte Datenbank-Updates mit Rollback-Funktionalität.',
          timeSaved: '2h/Deployment',
          industry: 'DevOps'
        },
        {
          title: 'API Rate Limiting',
          description: 'Intelligente API-Steuerung basierend auf Nutzungsmustern.',
          timeSaved: '1h/Tag',
          industry: 'Backend Services'
        }
      ],
      marketing: [
        {
          title: 'Social Media Automation',
          description: 'Automatisierte Posts und Engagement-Tracking über alle Kanäle.',
          timeSaved: '3h/Woche',
          industry: 'Digital Marketing'
        },
        {
          title: 'Lead Nurturing Sequences',
          description: 'Personalisierte E-Mail-Ketten basierend auf Nutzerverhalten.',
          timeSaved: '4h/Woche',
          industry: 'B2B Marketing'
        },
        {
          title: 'Campaign Performance Dashboard',
          description: 'Automatisierte Reports und Alerts für KPI-Änderungen.',
          timeSaved: '2h/Tag',
          industry: 'Performance Marketing'
        }
      ],
      management: [
        {
          title: 'Financial Reporting Automation',
          description: 'Monatliche Reports werden automatisch erstellt und verteilt.',
          timeSaved: '8h/Monat',
          industry: 'Finance'
        },
        {
          title: 'Employee Onboarding',
          description: 'Vollautomatisiertes Onboarding mit Dokumenten und Zugängen.',
          timeSaved: '3h/Mitarbeiter',
          industry: 'HR'
        },
        {
          title: 'Customer Support Routing',
          description: 'Intelligente Ticket-Zuweisung basierend auf Komplexität.',
          timeSaved: '1h/Tag',
          industry: 'Customer Service'
        }
      ],
      operations: [
        {
          title: 'Invoice Processing',
          description: 'Automatische Verarbeitung und Archivierung von Rechnungen.',
          timeSaved: '2h/Tag',
          industry: 'Finance'
        },
        {
          title: 'Inventory Management',
          description: 'Automatische Bestandsüberwachung und Nachbestellung.',
          timeSaved: '1h/Tag',
          industry: 'E-Commerce'
        },
        {
          title: 'Quality Assurance',
          description: 'Automatisierte Tests und Berichte für Qualitätskontrolle.',
          timeSaved: '4h/Woche',
          industry: 'Manufacturing'
        }
      ],
      startup_founder: [
        {
          title: 'Investor Reporting',
          description: 'Automatisierte monatliche Reports für Investoren.',
          timeSaved: '4h/Monat',
          industry: 'Startups'
        },
        {
          title: 'Customer Onboarding',
          description: 'Automatisierte Kunden-Onboarding-Prozesse.',
          timeSaved: '2h/Kunde',
          industry: 'SaaS'
        },
        {
          title: 'Financial KPI Tracking',
          description: 'Automatische Überwachung wichtiger Geschäftszahlen.',
          timeSaved: '1h/Tag',
          industry: 'Startups'
        }
      ]
    };

    const relevantUseCases = context.role && useCasesByRole[context.role] 
      ? useCasesByRole[context.role] 
      : useCasesByRole.management;

    return {
      answer: `Hier sind konkrete Beispiele für ${context.role ? 'deine Rolle' : 'deine Branche'}:`,
      useCases: relevantUseCases,
      actionButtons: [{ text: 'Persönliche Demo buchen', action: 'demo' }],
      newStage: 'demo'
    };
  }

  // Contact intent - enhanced
  if (/kontakt|termin|sprechen|anrufen|beratung|gespräch/.test(lower)) {
    return {
      answer: 'Perfekt! Unser Team steht dir für eine unverbindliche Beratung zur Verfügung. Wir zeigen dir konkret, wie Automatisierung in deinem Unternehmen funktioniert.',
      actionButtons: [
        { text: 'Kostenlose Beratung buchen', action: 'calendar' },
        { text: 'Direkt anrufen: +49 30 12345678', action: 'contact' },
        { text: 'E-Mail: info@vae-systems.de', action: 'contact' }
      ],
      newStage: 'handoff'
    };
  }

  // Zapier/Make comparison - enhanced
  if (/zapier|make|n8n|automation|alternative/.test(lower)) {
    return {
      answer: 'Im Gegensatz zu Zapier, Make oder n8n nutzen wir Temporal Workflows - das bietet dir Enterprise-Grade Zuverlässigkeit und Skalierbarkeit. Keine Rate-Limits, keine Timeouts, keine Datenverluste.',
      suggestions: [
        'Was ist Temporal genau?',
        'Technische Vorteile erklären',
        'Preisvergleich anzeigen'
      ],
      newStage: 'technical'
    };
  }

  // Technical questions
  if (/temporal|workflow|skalierbar|sicherheit|datenschutz/.test(lower)) {
    return {
      answer: 'Temporal ist eine Open-Source Workflow-Engine, die von Unternehmen wie Netflix, Uber und Stripe eingesetzt wird. Sie garantiert 99.99% Verfügbarkeit und verhindert Datenverluste durch automatische Retries.',
      suggestions: [
        'Technische Architektur erklären',
        'Sicherheitsfeatures',
        'Compliance-Zertifizierungen'
      ],
      newStage: 'technical'
    };
  }

  // Generic fallback with smart suggestions
  return {
    answer: 'Ich verstehe dein Interesse! Lass uns gemeinsam herausfinden, welche Prozesse in deinem Unternehmen automatisiert werden können.',
    suggestions: [
      'Zeig mir typische Use Cases',
      'Wie funktioniert die Preisgestaltung?',
      'Wie schnell kann ich starten?',
      'Gibt es Referenzen aus meiner Branche?'
    ],
    newStage: 'generic'
  };
}
