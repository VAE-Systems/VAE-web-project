export const defaultFAQCategories = [
  {
    category: 'Allgemein',
    questions: [
      {
        question: 'Was zeichnet Ihren Ansatz aus?',
        answer:
          'Architektur, Implementierung und Enablement verzahnt: Wir liefern nicht nur ein Artefakt, sondern schaffen betreibbare Systeme. Open Source & lokale Ausführbarkeit bleiben Grundprinzip.',
      },
      {
        question: 'Wie steigt man ein?',
        answer:
          'Meist mit einem fokussierten Use Case (Retrieval, Automatisierung, Dokumentenraum). Wir klären Ziel, Kontext & Restriktionen, dann folgt ein kleiner evaluierbarer Sprint statt monolithischem Konzeptpapier.',
      },
      {
        question: 'Welche Laufzeiten sind typisch?',
        answer:
          'Initiale Assessments 1–2 Wochen. MVP 3–5 Wochen. Skalierte Setups / Plattformebenen 3–6 Monate inkrementell. Frühe Teilnutzbarkeit hat Priorität.',
      },
    ],
  },
  {
    category: 'Technik & Betrieb',
    questions: [
      {
        question: 'Welche Modelle & Frameworks?',
        answer:
          'Lokale LLMs (gguf/ollama), Embedding-Stacks, LangChain, eigene Retrieval Layer, Temporal für Orchestrierung. Austauschbarkeit und beobachtbarer Betrieb sind Kernanforderung.',
      },
      {
        question: 'Compliance & Datenschutz?',
        answer:
          'Primär On-Prem / Sovereign Cloud. Keine stillen Dritt-API Calls. Auditable Pipelines, Zugriffsklassen, Protokollierung. DSGVO & AI Act Vororientierung werden früh mitgedacht.',
      },
      {
        question: 'Skalierung später möglich?',
        answer:
          'Ja. Komponenten modular verschaltbar: Index, Workflow, Observability, Evaluierung. Start lean – später erweitern ohne Neuaufbau.',
      },
    ],
  },
  {
    category: 'Service',
    questions: [
      {
        question: 'Support nach Go-Live?',
        answer:
          'Optionale Betriebs- und Verbesserungs-Sprints, SLAs für kritische Pfade, Wissensübergabe & Schulungen. Ziel: Interne Souveränität statt dauerhafte Abhängigkeit.',
      },
      {
        question: 'Trainingsumfang?',
        answer:
          'Role-based: Operator, Developer, Data/Knowledge Steward. Praxisnahe Labs & Artefakte (Playbooks, Evaluationsets). Wiederholbar und dokumentiert.',
      },
      {
        question: 'Roadmap VAE CORE?',
        answer:
          'Public Preview angezielt Q2 2026: Fokus zuerst auf Tool/MCP Workflow Stabilität, Policy & Multi‑Tenancy Hardening, Vector API Abstraktion, Gateway Routing & frühe Evaluierungsmetriken. Früh nutzbar via schrittweise Anbindung vorhandener Systeme.',
      },
    ],
  },
]
