# VAE Chatbot - Technische Dokumentation & User Guide

## Übersicht

Der VAE Chatbot ist ein intelligenter, auf React basierter KI-Assistent, der speziell für die VAE-Website entwickelt wurde. Er kombiniert moderne Webtechnologien mit einer benutzerfreundlichen Schnittstelle und bietet interaktive Funktionen wie ROI-Berechnungen und kontextbasierte Gespräche.

## 🎯 Hauptfunktionen

- **Intelligente Konversationen**: Kontextbasierte Dialoge mit vordefinierten Antwortmustern
- **ROI-Rechner**: Interaktive Berechnung von Return-on-Investment für VAE-Dienstleistungen
- **Quick-Reply-System**: Schnellantwort-Buttons für häufige Fragen
- **Responsive Design**: Optimiert für Desktop und Mobile
- **Globale State-Verwaltung**: Zentrale Datenverwaltung mit React Context
- **Erweiterbare Wissensdatenbank**: Modular aufgebaut für einfache Erweiterungen

## 🏗️ System-Architektur

### Core-Komponenten

```
vae-web-project/src/components/Chatbot/
├── core/                    # Kern-System
│   ├── ChatbotContext.tsx   # Globaler State mit Context API
│   └── types.ts            # TypeScript-Interfaces
├── features/               # Erweiterbare Features
├── styles/                 # CSS-Komponenten
├── ui/                     # Wiederverwendbare UI-Komponenten
├── Chatbot.tsx            # Hauptkomponente
├── Orb.tsx               # Floating Action Button
├── ROICalculator.tsx     # ROI-Berechnungs-Widget
├── chatRules.ts          # Konversationslogik
├── knowledgeBase.tsx     # Wissensdatenbank
└── useChatbot.ts        # Custom Hook
```

### State-Management

Der Chatbot nutzt React Context API mit useReducer für vorhersagbare State-Updates:

```typescript
interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  userInput: string;
  context: {
    sessionId: string;
    userData?: UserData;
    previousMessages: Message[];
  };
}
```

## 🚀 Installation & Setup

### 1. Provider einrichten

In `src/main.tsx` oder `src/App.tsx` den ChatbotProvider hinzufügen:

```typescript
import { ChatbotProvider } from './components/Chatbot/core/ChatbotContext';

function App() {
  return (
    <ChatbotProvider>
      <YourApp />
    </ChatbotProvider>
  );
}
```

### 2. Komponenten einbinden

```typescript
import { Chatbot } from './components/Chatbot';
import { Orb } from './components/Chatbot/Orb';

function Layout() {
  return (
    <>
      <YourContent />
      <Chatbot />
      <Orb />
    </>
  );
}
```

## 💬 Konversations-System

### Nachrichten-Struktur

```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'roi' | 'quick-reply';
  data?: any; // Für ROI-Daten oder Quick-Reply-Optionen
}
```

### Antwort-Muster (chatRules.ts)

Die Konversationslogik basiert auf Pattern-Matching:

```typescript
const patterns = [
  {
    keywords: ['preis', 'kosten', 'budget', 'investition'],
    responses: ['Ich verstehe, dass Kosten ein wichtiger Faktor sind...'],
    followUp: 'roi-calc'
  }
];
```

### Wissensdatenbank erweitern

Neue Inhalte werden in `knowledgeBase.tsx` hinzugefügt:

```typescript
export const knowledgeBase = {
  services: {
    keywords: ['service', 'leistung', 'angebot'],
    content: 'Unsere Services umfassen...',
    quickReplies: ['Preise', 'Details', 'Beispiele']
  }
};
```

## 🧮 ROI-Rechner

### Verwendung

Der ROI-Rechner wird automatisch aktiviert, wenn Nutzer nach Preisen oder ROI fragen:

1. **Automatische Aktivierung**: Trigger-Wörter wie "preis", "kosten", "roi"
2. **Interaktive Eingabe**: Schritt-für-Schritt Eingabe von:
   - Monatlicher Umsatz
   - Aktuelle Conversion Rate
   - Durchschnittlicher Bestellwert
3. **Sofort-Ergebnis**: Live-Berechnung und Visualisierung

### Berechnungs-Formel

```typescript
const potentialRevenue = monthlyRevenue * (targetCR - currentCR) / 100;
const monthlyROI = potentialRevenue * avgOrderValue;
const yearlyROI = monthlyROI * 12;
```

## 🎨 Anpassung & Styling

### Design-System-Integration

Der Chatbot nutzt das bestehende VAE-Design-System:

- **Farben**: CSS-Variablen aus globals.css
- **Typografie**: Konsistent mit Website-Standards
- **Animationen**: GSAP für flüssige Übergänge
- **Responsive**: Mobile-first Ansatz

### CSS-Variablen anpassen

```css
:root {
  --chatbot-primary: var(--vae-turquoise);
  --chatbot-bg: var(--bg-darker);
  --chatbot-text: var(--text-primary);
  --chatbot-border: var(--border-color);
}
```

### Komponenten-Styling

Jede Komponente hat eigene CSS-Module:

- `Chatbot.css`: Haupt-Chat-Fenster
- `ROICalculator.css`: ROI-Rechner-Widget
- `styles/components/`: Wiederverwendbare UI-Elemente

## 🔧 Erweiterungsmöglichkeiten

### Neue Features hinzufügen

1. **Neue Komponente erstellen**:
```typescript
// src/components/Chatbot/features/NewFeature.tsx
export const NewFeature: React.FC = () => {
  const { addMessage } = useChatbotContext();
  // Implementierung
};
```

2. **In Chatbot.tsx integrieren**:
```typescript
case 'new-feature':
  return <NewFeature data={message.data} />;
```

### API-Integration

Für Backend-Anbindung `apiProviders.ts` erweitern:

```typescript
export const apiProviders = {
  openai: {
    sendMessage: async (message: string, context: any) => {
      // API-Call zu OpenAI
      return response;
    }
  }
};
```

## 📱 Mobile Optimierung

### Touch-Gesten
- Swipe-to-close für Mobile
- Optimierte Button-Größen (min. 44x44px)
- Reduzierte Animationen bei schwacher Hardware

### Breakpoints
```css
@media (max-width: 768px) {
  .chatbot-container {
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
}
```

## 🧪 Testing

### Unit Tests vorhanden für:
- `chatRules.test.ts`: Konversationslogik
- `knowledgeBase.test.ts`: Wissensdatenbank-Antworten

### Test ausführen:
```bash
npm test src/components/Chatbot
```

## 📊 Analytics & Tracking

### Automatische Events
- Chat geöffnet/geschlossen
- ROI-Rechner gestartet
- Quick-Reply ausgewählt
- Nachricht gesendet

### Custom Events hinzufügen:
```typescript
const trackEvent = (event: string, data?: any) => {
  // Analytics-Integration
  window.gtag?.('event', event, data);
};
```

## 🚨 Troubleshooting

### Häufige Probleme

**Problem**: Chatbot öffnet nicht
**Lösung**: Prüfe ob `ChatbotProvider` korrekt eingebunden ist

**Problem**: TypeScript-Fehler
**Lösung**: Stelle sicher dass alle Dependencies installiert sind:
```bash
npm install --save-dev @types/react @types/react-dom
```

**Problem**: Styles werden nicht geladen
**Lösung**: CSS-Import in Hauptdatei hinzufügen:
```typescript
import './components/Chatbot/Chatbot.css';
```

## 🔄 Deployment Checkliste

- [ ] ChatbotProvider in Root-Komponente
- [ ] Alle CSS-Files importiert
- [ ] Environment-Variablen gesetzt
- [ ] Mobile Testing durchgeführt
- [ ] Performance-Optimierung (Bundle-Size)
- [ ] Analytics-Tracking aktiviert

## 📞 Support & Weiterentwicklung

Bei Fragen oder Erweiterungswünschen:
- **Technische Dokumentation**: Diese Datei
- **Code-Kommentare**: Ausführlich in jeder Komponente
- **TypeScript-Types**: Vollständig typisiert für IDE-Support

---

**Letzte Aktualisierung**: 3. August 2025  
**Version**: 2.0.0  
**Autor**: VAE Development Team
