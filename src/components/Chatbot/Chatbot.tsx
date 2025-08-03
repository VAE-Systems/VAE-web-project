import React, { useState, useEffect, useRef, useCallback } from 'react';
import MaterialIcon, { Icons } from '../ui/MaterialIcon';
import Orb from './Orb';
import ROICalculator from './ROICalculator';
import { getChatResponse, ChatMessage, UserRole } from './knowledgeBase';
import './Chatbot.css';

interface ChatbotProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'auto';
  primaryColor?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  position = 'bottom-right',
  theme = 'auto',
  primaryColor = '#00d4ff'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'de-DE';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    // Check for dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        content: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date(),
        role: userRole
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, userRole]);

  const getWelcomeMessage = () => {
    const messages = {
      visitor: "👋 Hallo! Ich bin VAE AI Assistant. Wie kann ich Ihnen helfen, Ihre Geschäftsprozesse zu optimieren?",
      ceo: "👋 Guten Tag! Als CEO interessieren Sie sich sicher für ROI und strategische Vorteile. Lassen Sie uns über Ihre Ziele sprechen.",
      cto: "👋 Moin! Als CTO möchten Sie sicher technische Details zu unserer KI-Plattform wissen. Fragen Sie mich gerne!",
      developer: "👋 Hey! Als Developer können Sie mich alles zu APIs, Integration und technischen Details fragen.",
      marketing: "👋 Hi! Als Marketing-Expert interessieren Sie sich für Use Cases und Erfolgsgeschichten. Lassen Sie uns starten!"
    };
    return messages[userRole] || messages.visitor;
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      role: userRole
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(inputValue, userRole);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        role: userRole,
        metadata: response.metadata
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (response.metadata?.action === 'show_roi_calculator') {
        setShowROICalculator(true);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung. Bitte versuchen Sie es erneut.',
        sender: 'bot',
        timestamp: new Date(),
        role: userRole
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, userRole]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const quickActions = [
    { label: 'ROI berechnen', action: () => setShowROICalculator(true) },
    { label: 'Use Cases', action: () => handleQuickAction('use cases') },
    { label: 'Technik', action: () => handleQuickAction('technik') },
    { label: 'Preise', action: () => handleQuickAction('preise') }
  ];

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const currentTheme = isDarkMode ? 'dark' : 'light';

  return (
    <>
      {/* Chat Widget */}
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {/* Orb Trigger */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="chatbot-trigger"
            aria-label="Chat öffnen"
          >
            <Orb size={60} isActive={true} />
            <div className="chatbot-notification">
              <Icons.Chat size={20} />
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className={`chatbot-window ${currentTheme}`}>
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-avatar">
                  <Orb size={32} isActive={true} />
                </div>
                <div className="chatbot-info">
                  <h3 className="chatbot-title">VAE AI Assistant</h3>
                  <p className="chatbot-subtitle">Ihre KI für Geschäftsprozesse</p>
                </div>
                <div className="chatbot-controls">
                  <button
                    onClick={() => setShowQuickActions(!showQuickActions)}
                    className="chatbot-control-btn"
                    aria-label="Quick Actions"
                  >
                    {showQuickActions ? 
                      <Icons.ExpandLess size={16} /> : 
                      <Icons.ExpandMore size={16} />
                    }
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="chatbot-control-btn"
                    aria-label="Chat schließen"
                  >
                    <Icons.Close size={16} />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              {showQuickActions && (
                <div className="chatbot-quick-actions">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="quick-action-btn"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender}`}
                >
                  <div className="message-avatar">
                    {message.sender === 'bot' ? 
                      <Icons.SmartToy size={16} /> : 
                      <Icons.Person size={16} />
                    }
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">
                      {message.timestamp.toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot typing">
                  <div className="message-avatar">
                    <Icons.SmartToy size={16} />
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chatbot-input-container">
              <div className="chatbot-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nachricht eingeben..."
                  className="chatbot-input"
                />
                <div className="chatbot-input-actions">
                  {recognitionRef.current && (
                    <button
                      onClick={toggleListening}
                      className={`chatbot-voice-btn ${isListening ? 'listening' : ''}`}
                      aria-label="Spracheingabe"
                    >
                      {isListening ? 
                        <Icons.MicOff size={16} /> : 
                        <Icons.Mic size={16} />
                      }
                    </button>
                  )}
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="chatbot-send-btn"
                    aria-label="Senden"
                  >
                    <Icons.Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ROI Calculator Modal */}
      {showROICalculator && (
        <div className="chatbot-modal-overlay" onClick={() => setShowROICalculator(false)}>
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chatbot-modal-header">
              <h3>ROI Rechner</h3>
              <button onClick={() => setShowROICalculator(false)}>
                <Icons.Close size={20} />
              </button>
            </div>
            <ROICalculator onClose={() => setShowROICalculator(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
