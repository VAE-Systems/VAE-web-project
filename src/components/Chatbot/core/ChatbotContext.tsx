import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatbotState, ChatbotAction, ChatbotConfig, UserData } from './types';

// Message Interface direkt definieren
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'roi' | 'quick-reply';
  data?: any;
}

/**
 * Chatbot Context
 * Globale State-Verwaltung für den VAE-Chatbot
 * Nutzt React Context API + useReducer für saubere State-Verwaltung
 */

const initialConfig: ChatbotConfig = {
  welcomeMessage: "Hallo! 👋 Ich bin Ihr VAE-Assistent. Wie kann ich Ihnen helfen?",
  typingDelay: 1000,
  maxMessages: 100,
  enableQuickReplies: true,
  enableROI: true,
};

const initialState: ChatbotState = {
  isOpen: false,
  messages: [],
  isTyping: false,
  userInput: '',
  context: {
    previousMessages: [],
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  },
};

/**
 * Reducer für Chatbot-State
 * Handhabt alle State-Änderungen zentral und vorhersagbar
 */
function chatbotReducer(state: ChatbotState, action: ChatbotAction): ChatbotState {
  switch (action.type) {
    case 'OPEN_CHAT':
      return {
        ...state,
        isOpen: true,
        messages: state.messages.length === 0 
          ? [{
              id: `msg_${Date.now()}`,
              text: initialConfig.welcomeMessage,
              sender: 'bot',
              timestamp: new Date(),
            }]
          : state.messages,
      };
    
    case 'CLOSE_CHAT':
      return { ...state, isOpen: false };
    
    case 'ADD_MESSAGE':
      const newMessages = [...state.messages, action.payload];
      return {
        ...state,
        messages: newMessages.slice(-initialConfig.maxMessages),
        context: {
          ...state.context,
          previousMessages: newMessages,
        },
      };
    
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    
    case 'SET_USER_INPUT':
      return { ...state, userInput: action.payload };
    
    case 'UPDATE_CONTEXT':
      return {
        ...state,
        context: { ...state.context, ...action.payload },
      };
    
    case 'RESET_CHAT':
      return {
        ...initialState,
        context: {
          ...initialState.context,
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        },
      };
    
    default:
      return state;
  }
}

interface ChatbotContextType {
  state: ChatbotState;
  dispatch: React.Dispatch<ChatbotAction>;
  config: ChatbotConfig;
  openChat: () => void;
  closeChat: () => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (typing: boolean) => void;
  updateUserInput: (input: string) => void;
  updateContext: (context: Partial<ChatbotState['context']>) => void;
  resetChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

/**
 * Chatbot Provider
 * Umschließt die App und stellt den Chatbot-State bereit
 */
export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);

  const openChat = () => dispatch({ type: 'OPEN_CHAT' });
  const closeChat = () => dispatch({ type: 'CLOSE_CHAT' });
  const setTyping = (typing: boolean) => dispatch({ type: 'SET_TYPING', payload: typing });
  const updateUserInput = (input: string) => dispatch({ type: 'SET_USER_INPUT', payload: input });
  const updateContext = (context: Partial<ChatbotState['context']>) => 
    dispatch({ type: 'UPDATE_CONTEXT', payload: context });
  const resetChat = () => dispatch({ type: 'RESET_CHAT' });

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const fullMessage: Message = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };
    dispatch({ type: 'ADD_MESSAGE', payload: fullMessage });
  };

  const value: ChatbotContextType = {
    state,
    dispatch,
    config: initialConfig,
    openChat,
    closeChat,
    addMessage,
    setTyping,
    updateUserInput,
    updateContext,
    resetChat,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
}

/**
 * Hook für Chatbot Context
 * Vereinfacht den Zugriff auf den Chatbot-State
 */
export function useChatbotContext() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider');
  }
  return context;
}
