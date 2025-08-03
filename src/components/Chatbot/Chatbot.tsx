// Haupt-Chatbot-Komponente für VAE Systems
// Nutzt React, TypeScript, Framer Motion und Lucide-Icons
// Bietet kontextbasierte, mehrstufige Konversation mit intelligenten Vorschlägen und Use Cases
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import Orb from './Orb';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User, Lightbulb, Clock, Target, ArrowRight, Zap } from 'lucide-react';

import './Chatbot.css';
import { searchKnowledgeBase } from './knowledgeBase';
import { applyRules } from './chatRules';
import type { ConversationStage } from './chatRules';
import { ApiProviderManager } from './apiProviders';

import ROICalculator from './ROICalculator';
// ===== UseCaseCard Component (memoized) =====
// Memoisierte Komponente für die Anzeige einzelner Use Cases (z.B. Automatisierungsbeispiele)
interface UseCaseCardProps { useCase: UseCase; }
const UseCaseCard: React.FC<UseCaseCardProps> = memo(({ useCase }) => (
    <motion.div className="use-case-card" whileHover={{ scale: 1.02 }}>
        <div className="use-case-header">
            <Zap size={16} />
            <strong style={{ marginLeft: '4px' }}>{useCase.title}</strong>
        </div>
        <p>{useCase.description}</p>
        <div className="use-case-meta">
            <span className="time-saved" title={`Zeit gespart: ${useCase.timeSaved}`}>
                <Clock size={12} style={{ marginRight: '4px' }} />
                {useCase.timeSaved}
            </span>
            <span className="industry" title={`Branche: ${useCase.industry}`}>
                <Target size={12} style={{ margin: '0 4px 0 12px' }} />
                {useCase.industry}
            </span>
        </div>
    </motion.div>
));

// Struktur für interaktive Elemente (z.B. ROI-Rechner)
interface InteractiveElement {
    type: 'roi-calculator';
    data?: unknown;
}

// Struktur für einzelne Chat-Nachrichten
interface Message {
    id: string; // Eindeutige ID für die Nachricht
    type: 'user' | 'bot' | 'system'; // Wer hat die Nachricht gesendet?
    content: string; // Textinhalt
    timestamp: Date; // Zeitstempel
    suggestions?: string[]; // Optionale Vorschläge für schnelle Antworten
    useCases?: UseCase[]; // Optionale Use Cases (z.B. Automatisierungsbeispiele)
    actionButtons?: ActionButton[]; // Optionale Aktions-Buttons (z.B. Demo, Kontakt)
    metadata?: {
        intent?: 'exploration' | 'pricing' | 'technical' | 'demo_request';
        confidence?: number;
        sentiment?: 'positive' | 'neutral' | 'negative';
    };
    interactiveElements?: InteractiveElement[];
}

// Struktur für einen Use Case (z.B. Automatisierungsbeispiel)
interface UseCase {
    title: string;
    description: string;
    timeSaved: string;
    industry: string;
}

// Struktur für Aktions-Buttons (z.B. Demo buchen, Kontakt aufnehmen)
interface ActionButton {
    text: string;
    action: 'demo' | 'calendar' | 'contact' | 'usecase';
    data?: unknown;
}

// Hauptfunktionale Komponente für den Chatbot
const VAEIntelligentChatbot: React.FC = () => {
  // Fenstergrößen- und Position-State
  const [windowSize, setWindowSize] = useState(() => {
    const savedSize = localStorage.getItem('chatbotSize');
    return savedSize 
      ? JSON.parse(savedSize) 
      : { width: 380, height: 600 };
  });
  
  // Resizing-Zustand
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  
  // Sichtbarkeit des Chatbots (offen/geschlossen)
  const [isOpen, setIsOpen] = useState(false);
    // Track first free text input
    const [isFirstFreeInput, setIsFirstFreeInput] = useState(true);
    // Liste aller Nachrichten im Chatverlauf
    const [messages, setMessages] = useState<Message[]>([]);
    // Aktueller Wert des Eingabefelds
    const [inputValue, setInputValue] = useState('');
    // Zeigt an, ob der Bot gerade "tippt" (Antwort wird generiert)
    const [isTyping, setIsTyping] = useState(false);
    // Kontext des Nutzers (Rolle, Branche, Pain Points etc.)
    const [userContext, setUserContext] = useState<{
        role?: 'ceo' | 'cto' | 'developer' | 'marketing' | 'operations' | 'startup_founder' | 'management';

        industry?: string;
        companySize?: 'startup' | 'small' | 'medium' | 'enterprise';
        painPoints?: string[];
        budget?: 'low' | 'medium' | 'high';
        urgency?: 'low' | 'medium' | 'high';
        technicalLevel?: 'beginner' | 'intermediate' | 'expert';
        conversationScore: number;
        leadQuality: 'cold' | 'warm' | 'hot' | 'qualified';
        sessionDuration: number;
        messageCount: number;
        interests?: string[];
    }>({ conversationScore: 0, leadQuality: 'cold', sessionDuration: 0, messageCount: 0 });
    // Aktuelle Phase der Konversation (steuert Flow und Antworten)
    const [conversationStage, setConversationStage] = useState<ConversationStage>('welcome');

  // Merkt sich, ob der Nutzer einem automatischen Öffnen zugestimmt hat
  const [allowAutoOpen, setAllowAutoOpen] = useState(() =>
    localStorage.getItem('vaeAllowAutoOpen') === 'true'
  );

  // Persistiert die Fenstergröße in localStorage
  useEffect(() => {
    localStorage.setItem('chatbotSize', JSON.stringify(windowSize));
  }, [windowSize]);

    // Persistiert die Einstellung in localStorage
    useEffect(() => {
        localStorage.setItem('vaeAllowAutoOpen', allowAutoOpen ? 'true' : 'false');
    }, [allowAutoOpen]);

    // Referenzen für automatisches Scrollen und Fokussieren
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    /** Entfernt ein interaktives Element (z.B. ROI-Rechner) aus einer Nachricht */
    const dismissInteractiveElement = useCallback(
        (messageId: string, index: number) => {
            setMessages(prev =>
                prev.map(msg => {
                    if (msg.id !== messageId) return msg;
                    const remaining = msg.interactiveElements?.filter((_, i) => i !== index);
                    return { ...msg, interactiveElements: remaining };
                })
            );
        },
        []
    );


    // Zählt die Sitzungsdauer in Sekunden
    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            setUserContext(prev => ({ ...prev, sessionDuration: prev.sessionDuration + 1 }));
        }, 1000);
        return () => clearInterval(interval);
    }, [isOpen]);

    // Initialisiert die Konversation mit einer Willkommensnachricht und Vorschlägen
    const initializeConversation = useCallback(() => {
        const greetings = [
            'Hi, ich bin der VÆKTRA Assist – dein digitaler Sparringspartner.',
            'Willkommen bei VAE Systems. Ich helfe dir, Automatisierung verständlich zu machen.',
            'Hey \u{1F44B} Lust, herauszufinden, was in deinem Unternehmen automatisiert werden kann?'
        ];
        const welcomeMessage: Message = {
            id: 'welcome',
            type: 'bot',
            content: `${greetings[Math.floor(Math.random() * greetings.length)]}\n\nWas ist deine Rolle?`,
            timestamp: new Date(),
            suggestions: [
                'Ich bin CTO/Entwickler',
                'Marketing & Vertrieb',
                'Geschäftsführung',
                'Operations/Prozesse',
                'Noch am Erkunden...'
            ]
        };
        setMessages([welcomeMessage]);
        setConversationStage('welcome');
    }, []);




    // Öffnet den Chatbot automatisch nach 30 Sekunden (Onboarding)
    useEffect(() => {
        if (!allowAutoOpen) return;
        const timer = setTimeout(() => {
            if (!isOpen) {
                setIsOpen(true);
                initializeConversation();
            }
        }, 30000);
        return () => clearTimeout(timer);
    }, [isOpen, allowAutoOpen, initializeConversation]);


    // Scrollt automatisch zum letzten Chat-Eintrag
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);


    // Scrollt bei jeder neuen Nachricht nach unten
    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    // Fokussiert das Eingabefeld, wenn der Chat geöffnet wird
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);




    /**
     * Ruft die KI-API über den Multi-Provider auf, um eine intelligente Antwort zu generieren.
     * Fällt bei Fehlern auf eine Mock-Logik zurück.
     * System Prompt steuert den Stil, die Mission und die Konversationsphase.
     */
    const callAIAPI = async (
        message: string,
        context: Record<string, unknown>
    ): Promise<{ answer: string; suggestions?: string[]; useCases?: UseCase[]; actionButtons?: ActionButton[] }> => {
        try {
            const apiManager = ApiProviderManager.getInstance();
            const response = await apiManager.callApi(message, context);
            
            return {
                answer: response.answer,
                suggestions: response.suggestions,
                useCases: response.useCases,
                actionButtons: response.actionButtons
            };
        } catch (error) {
            console.warn('Verwende intelligente Mock-Antwort:', error);
            return getIntelligentMockResponse(message);
        }
    };


    /**
     * Intelligente Mock-Logik für lokale Entwicklung oder Fallback.
     * Simuliert KI-Antworten und steuert den Konversationsfluss (Discovery, Solution, Conversion).
     * Erkennt Schlüsselwörter und passt Vorschläge, Use Cases und Buttons dynamisch an.
     */
    const getIntelligentMockResponse = (
        message: string
    ): {
        answer: string;
        suggestions?: string[];
        useCases?: UseCase[];
        actionButtons?: ActionButton[];
    } => {
        const messageLower = message.toLowerCase();

        if (messageLower.includes('automatis')) {
            return {
                answer: 'Automatisierung kann viele Prozesse vereinfachen und Zeit sparen.',
                suggestions: ['Wie starte ich?', 'Gibt es Beispiele?'],
                useCases: [
                    {
                        title: 'E-Mail-Automatisierung',
                        description: 'Sortierung und Beantwortung von Standardanfragen.',
                        timeSaved: '1h/Tag',
                        industry: 'Allgemein'
                    }
                ],
                actionButtons: [{ text: 'Demo', action: 'demo' }]
            };
        }

        return {
            answer: 'Erzählen Sie mir mehr über Ihre Herausforderung.',
            suggestions: [
                'Welche Prozesse sind zeitaufwändig?',
                'Haben Sie bereits Tools im Einsatz?'
            ]
        };
    };


    /**
     * Sendet die Nutzereingabe als neue Nachricht, ruft die KI/Mock-Logik auf und fügt die Bot-Antwort hinzu.
     * Simuliert "Tippen"-Status für realistischere UX.
     */
    const sendMessage = async (customValue?: string) => {
        const valueToSend = customValue ?? inputValue;
        if (!valueToSend.trim()) return;

        // Check if this is the first free text input (not from suggestions)
        if (isFirstFreeInput) {
            setIsFirstFreeInput(false);
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: valueToSend.trim(),
            timestamp: new Date()
        };

        setUserContext(prev => ({ ...prev, messageCount: prev.messageCount + 1 }));
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const ruleResponse = applyRules(userMessage.content, {
                stage: conversationStage,
                role: userContext.role
            });

            if (ruleResponse) {
                if (ruleResponse.detectedRole) {
                    setUserContext(prev => ({ ...prev, role: ruleResponse.detectedRole }));
                }
                if (ruleResponse.newStage) {
                    setConversationStage(ruleResponse.newStage);
                }
                setUserContext(prev => ({ ...prev, conversationScore: prev.conversationScore + 10 }));
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'bot',
                    content: ruleResponse.answer,
                    timestamp: new Date(),
                    suggestions: ruleResponse.suggestions,
                    useCases: ruleResponse.useCases,
                    actionButtons: ruleResponse.actionButtons,
                    interactiveElements: ruleResponse.interactiveElements
                };
                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
                return;
            }

            const kbAnswer = searchKnowledgeBase(userMessage.content);
            if (kbAnswer) {
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'bot',
                    content: kbAnswer,
                    timestamp: new Date()
                };

                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
                setUserContext(prev => ({ ...prev, conversationScore: prev.conversationScore + 5 }));
                return;
            }

            const response = await callAIAPI(userMessage.content, userContext);

            setTimeout(() => {
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    type: 'bot',
                    content: response.answer,
                    timestamp: new Date(),
                    suggestions: response.suggestions,
                    useCases: response.useCases,
                    actionButtons: response.actionButtons
                };

                setMessages(prev => [...prev, botMessage]);
                setIsTyping(false);
            }, 1200 + Math.random() * 800); // Simuliert "Tippen"-Delay

        } catch (error) {
            console.error('Chatbot error:', error);
            setIsTyping(false);
        }
    };

    // Vorschlags-Handler anpassen:
    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        sendMessage(suggestion);
    };


    // Klick auf einen Aktions-Button (z.B. Demo, Kalender, Kontakt)
    const handleActionButton = (button: ActionButton) => {
        switch (button.action) {
            case 'demo':
                window.open('https://calendly.com/vae-systems/demo', '_blank');
                break;
            case 'calendar':
                window.open('https://calendly.com/vae-systems/beratung', '_blank');
                break;
            case 'contact':
                window.open('mailto:info@vae-systems.de', '_blank');
                break;
            default:
                handleSuggestionClick(`Mehr über ${button.text}`);
        }
    };


    // Enter-Taste sendet Nachricht (Shift+Enter für Zeilenumbruch)
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };


  // Öffnet/schließt den Chatbot, initialisiert ggf. die Konversation
  const handleToggle = () => {
      setIsOpen(!isOpen);
      if (!isOpen && messages.length === 0) {
          setTimeout(() => initializeConversation(), 300);
      }
  };

  // Startet das Resizing des Chatfensters
  const startResizing = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeDirection(direction);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing) return;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      
      // Berechne neue Größe basierend auf Richtung
      if (direction.includes('e')) {
        newWidth = startWidth + (moveEvent.clientX - startX);
      } else if (direction.includes('w')) {
        newWidth = startWidth - (moveEvent.clientX - startX);
      }
      
      if (direction.includes('s')) {
        newHeight = startHeight + (moveEvent.clientY - startY);
      } else if (direction.includes('n')) {
        newHeight = startHeight - (moveEvent.clientY - startY);
      }
      
      // Mindest- und Maximalgrößen einhalten
      newWidth = Math.max(300, Math.min(800, newWidth));
      newHeight = Math.max(400, Math.min(1000, newHeight));
      
      setWindowSize({
        width: newWidth,
        height: newHeight
      });
    };
    
    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

    // Free mode info modal
    const FreeModeInfoModal = () => (
        <motion.div 
            className="free-mode-modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
                position: 'fixed',
                bottom: '100px',
                right: '24px',
                background: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                maxWidth: '320px',
                zIndex: 10000
            }}
        >
            <h3 style={{ marginTop: 0 }}>Freier Modus aktiviert</h3>
            <p>Du kannst nun frei Fragen stellen und erhältst direkte Antworten von unserem KI-Assistenten.</p>
            <button 
                onClick={() => setIsFirstFreeInput(false)}
                style={{
                    background: '#00ffa5',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    marginTop: '12px',
                    cursor: 'pointer'
                }}
            >
                Verstanden
            </button>
        </motion.div>
    );

    // --- RENDERING & UI ---
    return (
        <>
            {/* Free mode info modal */}
            {isFirstFreeInput && isOpen && <FreeModeInfoModal />}

            {/* Orb-Effekt hinter dem Chatbot */}
            {!isOpen && (
              <Orb 
                hue={120}
                hoverIntensity={0.3}
                rotateOnHover={true}
                forceHoverState={false}
              />
            )}

            {/* Toggle-Button für den Chatbot (unten rechts, animiert) */}
            <motion.button
                className="chatbot-toggle"
                onClick={handleToggle}
                aria-label={isOpen ? 'Chatbot schließen' : 'Chatbot öffnen'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    display: isOpen ? 'none' : 'flex',
                    opacity: isOpen ? 0 : 1
                }}
                style={{
                    background: 'linear-gradient(135deg, #00ffa5 0%, #00ffa5 100%)',
                    boxShadow: '0 8px 25px rgba(0, 240, 170, 0.4)'
                }}
            >
                <Lightbulb size={24} />
                {/* Animierter Puls-Effekt */}
                <motion.div
                    className="pulse-ring"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        border: '2px solid #00ffa5',
                        pointerEvents: 'none'
                    }}
                />
            </motion.button>

            {/* Tooltip, solange Chatbot geschlossen ist */}
            {!isOpen && (
                <motion.div
                    className="chatbot-tooltip"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{
                        position: 'fixed',
                        bottom: '45px',
                        right: '100px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        zIndex: 9998
                    }}
                >
                    <Lightbulb size={16} style={{ marginRight: '4px' }} /> Finde heraus, was du automatisieren kannst
                    {!allowAutoOpen && (
                        <button
                            style={{ marginLeft: '8px', textDecoration: 'underline', background: 'none', border: 'none', color: '#00ffa5', cursor: 'pointer' }}
                            onClick={() => setAllowAutoOpen(true)}
                        >
                            Auto-Öffnung erlauben
                        </button>
                    )}
                </motion.div>
            )}

            {/* Haupt-Chatfenster mit Framer Motion Animationen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-container"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ 
                          width: `${windowSize.width}px`,
                          height: `${windowSize.height}px`
                        }}
                    >
                      {/* Resize Handles */}
                      <div 
                        className="resize-handle resize-nw" 
                        onMouseDown={startResizing('nw')}
                      />
                      <div 
                        className="resize-handle resize-ne" 
                        onMouseDown={startResizing('ne')}
                      />
                      <div 
                        className="resize-handle resize-sw" 
                        onMouseDown={startResizing('sw')}
                      />
                      <div 
                        className="resize-handle resize-se" 
                        onMouseDown={startResizing('se')}
                      />
                        {/* Header mit Statusanzeige und Close-Button */}
                        <div className="chatbot-header">
                            <div className="header-info">
                                <h3>VÆKTRA Assist</h3>
                                <p>Dein Automatisierungs-Berater</p>
                            </div>
                            <div className="header-controls">
                                <div className="status-indicator">
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#00ffa5',
                                            marginRight: '8px'
                                        }}
                                    />
                                    <span style={{ fontSize: '11px', opacity: 0.8 }}>Online</span>
                                </div>
                                <button
                                    className="close-button"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Chatbot schließen"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Nachrichtenbereich: Zeigt alle Nachrichten, Vorschläge, Use Cases, Buttons */}
                        <div className="chatbot-messages" role="log" aria-live="polite">
                          {isResizing && (
                            <div className="resize-indicator">
                              {windowSize.width}×{windowSize.height}px
                            </div>
                          )}
                          {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                className={`message ${message.type}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="message-avatar">
                                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                                </div>
                                <div className="message-content">
                                    <div className="message-text">
                                        {message.content.split('\n').map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                    </div>

                                    {/* Vorschläge als Chips */}
                                    {message.suggestions && (
                                        <div className="suggestions-container">
                                            {message.suggestions.map((suggestion, index) => (
                                                    <motion.button
                                                        key={index}
                                                        className="suggestion-chip"
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        {suggestion}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Use Cases als Karten */}
                                        {message.useCases && (
                                            <div className="use-cases-container">
                                                {message.useCases.map((useCase, index) => (
                                                    <UseCaseCard useCase={useCase} key={index} />
                                                ))}
                                            </div>
                                        )}

                                        {message.interactiveElements && (
                                            <div className="interactive-container">
                                                {message.interactiveElements.map((el, idx) => {
                                                    if (el.type === 'roi-calculator') {
                                                        return (
                                                            <ROICalculator
                                                                key={idx}
                                                                onClose={() =>
                                                                    dismissInteractiveElement(
                                                                        message.id,
                                                                        idx
                                                                    )
                                                                }
                                                                role={userContext.role}
                                                            />
                                                        );

                                                    }
                                                    return null;
                                                })}
                                            </div>
                                        )}

                                        {/* Aktions-Buttons (z.B. Demo, Kontakt) */}
                                        {message.actionButtons && (
                                            <div className="action-buttons-container">
                                                {message.actionButtons.map((button, index) => (
                                                    <motion.button
                                                        key={index}
                                                        className="action-button"
                                                        onClick={() => handleActionButton(button)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {button.text}
                                                        <ArrowRight size={14} />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}

                                        {/* Zeitstempel der Nachricht */}
                                        <div className="message-meta">
                                            <span className="timestamp">
                                                {message.timestamp.toLocaleTimeString('de-DE', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Tipp-Animation, wenn Bot "antwortet" */}
                            {isTyping && (
                                <motion.div
                                    className="message bot"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="message-avatar">
                                        <Bot size={16} />
                                    </div>
                                    <div className="message-content">
                                        <div className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Unsichtbares Element für automatisches Scrollen */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Eingabefeld für Nutzereingaben */}
                        <div className="chatbot-input">
                            <div className="input-container">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Erzähl mir von deinen Herausforderungen..."
                                    aria-label="Nachricht eingeben"
                                    maxLength={500}
                                    disabled={isTyping}
                                />
                                <button
                                    className="send-button"
                                    onClick={() => sendMessage()}
                                    aria-label="Nachricht senden"
                                    disabled={!inputValue.trim() || isTyping}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default memo(VAEIntelligentChatbot);
