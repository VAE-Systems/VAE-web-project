// Pilot Scenario content (placeholder qualitative example, not a claimed client case)
export interface PilotScenario {
  title: string
  intro: string
  context: string
  goals: string[]
  approach: string[]
  resultQualitative: string[]
  nextSteps: string[]
  disclaimer: string
}

export const pilotScenario: PilotScenario = {
  title: 'Typisches erstes KI / Automations Pilot-Szenario',
  intro: 'So sieht ein neutraler, häufig sinnvoller Start aus – ohne künstliche Komplexität und mit schnellem Lernertrag.',
  context: 'Ausgangslage: Interne Wissensfragmente (Confluence / Files / E-Mail), wiederkehrende manuelle Antwort-/Rechercheaufwände, erste Ideen “Wir brauchen einen Chatbot?”.',
  goals: [
    'Schnelles internes Inkrement das echten Nutzen zeigt',
    'Grundlage für spätere Erweiterungen (weitere Datenquellen / Workflows)',
    'Messbare Qualität & Feedback statt Bauchgefühl'
  ],
  approach: [
    'Kurze Fokussierung des ersten Use-Cases (z.B. interne Wissensabfrage)',
    'Datenaufnahme + Strukturierung (Indexierung / Normalisierung)',
    'LLM Orchestrierung mit klaren Guardrails & Logging',
    'Evaluierung auf Stichproben & definierte Akzeptanzkriterien',
    'Iteration (Antwortpräzision / Latenz / Fehlklassifikation)' 
  ],
  resultQualitative: [
    'Interner Zugriff auf konsolidiertes Wissen (Antwortzeit < 10s Zielrahmen)',
    'Reduktion manueller Rückfragen / Nachschlagen (frühe Tendenz, Basis Tracking)',
    'Transparente Architektur & Runbook-Skelett bereits vorhanden'
  ],
  nextSteps: [
    'Anschluss weiterer Datenquellen (Tickets, CRM, Drive)',
    'Anreicherung mit Observability & Qualitätsmetriken',
    'Automatisierung einfacher Folgeaktionen (z.B. Ticket-Vorbefüllung)',
    'Schulung / Ownership Transfer an internes Team'
  ],
  disclaimer: 'Hinweis: Beispielhafte Struktur – keine versprochene Kennzahl & kein spezifischer Kundencase.'
}
