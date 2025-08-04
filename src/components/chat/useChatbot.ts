import { useState, useCallback } from 'react';
import { processMessage } from './chatRules';
import { Message } from './types';

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m VAE Assistant, your AI-powered business solutions expert. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await processMessage(content, messages);
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  }, [messages]);

  const resetConversation = useCallback(() => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m VAE Assistant, your AI-powered business solutions expert. How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const getSuggestedQuestions = useCallback(() => {
    return [
      'What services does VAE offer?',
      'How can AI improve my business?',
      'What is the ROI of implementing AI solutions?',
      'Can you help me calculate potential savings?',
      'What industries do you specialize in?',
    ];
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    resetConversation,
    getSuggestedQuestions,
  };
};
