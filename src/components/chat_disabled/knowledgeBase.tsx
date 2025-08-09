// Einfache FAQ-Datenbank. Die Muster werden vor jeder KI-Anfrage geprüft.
// Passt diese Liste an eure häufigsten Fragen an. Wenn ein Pattern passt,
// sendet der Bot die zugehörige Antwort, ohne die Gemini API aufzurufen.

export interface KnowledgeEntry {
  patterns: RegExp[];
  answer: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    patterns: [/wer\s+ist\s+vae\s+systems/i, /was\s+ist\s+vae\s+systems/i],
    answer: 'VAE Systems ist ein deutsches Unternehmen f\u00fcr KI-gest\u00fctzte Automatisierungsl\u00f6sungen und individuelle Softwareentwicklung.'
  },
  {
    patterns: [/kontakt/i, /wie\s+kann\s+ich\s+.*vae\s+systems/i],
    answer: 'Du erreichst uns unter info@vae-systems.de oder telefonisch unter +49 123 4567890.'
  },
  {
    patterns: [/was\s+kostet/i, /preis/i],
    answer: 'Unsere Preise richten sich nach Umfang und Komplexit\u00e4t des Projekts. Kontaktiere uns f\u00fcr ein individuelles Angebot.'
  },
  {
    patterns: [/wie\s+schnell/i, /dauer.*umsetzung/i],
    answer: 'Viele Projekte setzen wir innerhalb weniger Wochen um. Ein genaues Timing h\u00e4ngt von deinen Anforderungen ab.'
  },
  {
    patterns: [/unterschied.*zapier|unterscheid.*make/i],
    answer: 'Im Gegensatz zu Zapier oder Make entwickeln wir ma\u00dfgeschneiderte Workflows auf Basis von Temporal f\u00fcr maximale Zuverl\u00e4ssigkeit.'
  }
];

export function searchKnowledgeBase(question: string): string | null {
  const normalized = question.trim().toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.patterns.some(p => p.test(normalized))) {
      return entry.answer;
    }
  }
  return null;
}

// Chatbot feature removed.
export {}
