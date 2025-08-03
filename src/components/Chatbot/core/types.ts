/**
 * Chatbot Type Definitions
 * Zentrale TypeScript-Definitionen für den VAE-Chatbot
 */

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'roi' | 'quick-reply';
  metadata?: any;
}

export interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  userInput: string;
  context: ChatContext;
}

export interface ChatContext {
  currentIntent?: string;
  previousMessages: Message[];
  userData?: UserData;
  sessionId: string;
}

export interface UserData {
  name?: string;
  email?: string;
  company?: string;
  industry?: string;
}

export interface Intent {
  name: string;
  keywords: string[];
  response: string | ((context: ChatContext) => string);
  followUp?: string[];
  requiresInput?: boolean;
}

export interface QuickReply {
  text: string;
  action: string;
  payload?: any;
}

export interface ChatbotConfig {
  welcomeMessage: string;
  typingDelay: number;
  maxMessages: number;
  enableQuickReplies: boolean;
  enableROI: boolean;
}

export type ChatbotAction =
  | { type: 'OPEN_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_USER_INPUT'; payload: string }
  | { type: 'UPDATE_CONTEXT'; payload: Partial<ChatContext> }
  | { type: 'RESET_CHAT' };
