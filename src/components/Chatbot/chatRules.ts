import { Message } from './types';

interface ChatContext {
  previousMessages: Message[];
  userIntent?: string;
  entities?: string[];
}

export const processMessage = async (
  message: string,
  conversationHistory: Message[]
): Promise<string> => {
  const context: ChatContext = {
    previousMessages: conversationHistory,
    userIntent: detectIntent(message),
    entities: extractEntities(message),
  };

  // Route to appropriate handler based on intent
  const response = await generateResponse(message, context);
  return response;
};

const detectIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Service inquiries
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    return 'service_inquiry';
  }
  
  // ROI/Calculator
  if (lowerMessage.includes('roi') || 
      lowerMessage.includes('calculator') || 
      lowerMessage.includes('savings') ||
      lowerMessage.includes('cost')) {
    return 'roi_inquiry';
  }
  
  // Pricing
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
    return 'pricing_inquiry';
  }
  
  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return 'contact_inquiry';
  }
  
  // General greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return 'greeting';
  }
  
  // Default
  return 'general_inquiry';
};

const extractEntities = (message: string): string[] => {
  const entities: string[] = [];
  const lowerMessage = message.toLowerCase();
  
  // Industry keywords
  const industries = ['healthcare', 'finance', 'retail', 'manufacturing', 'logistics', 'education'];
  industries.forEach(industry => {
    if (lowerMessage.includes(industry)) {
      entities.push(industry);
    }
  });
  
  // Technology keywords
  const technologies = ['ai', 'machine learning', 'automation', 'data', 'analytics'];
  technologies.forEach(tech => {
    if (lowerMessage.includes(tech)) {
      entities.push(tech);
    }
  });
  
  return entities;
};

const generateResponse = async (message: string, context: ChatContext): Promise<string> => {
  const { userIntent, entities } = context;
  
  switch (userIntent) {
    case 'service_inquiry':
      return `VAE offers comprehensive AI-powered business solutions including:
      
• **AI Strategy Consulting** - Custom AI roadmaps for your business
• **Process Automation** - Streamline operations with intelligent automation
• **Data Analytics & Insights** - Transform data into actionable intelligence
• **Custom AI Development** - Tailored solutions for unique challenges
• **Integration Services** - Seamlessly integrate AI into existing systems

Would you like to explore any of these services in detail?`;
    
    case 'roi_inquiry':
      return `I'd be happy to help you calculate the potential ROI of AI implementation! 

Our clients typically see:
• 30-50% reduction in operational costs
• 2-5x increase in process efficiency
• 25-40% improvement in decision-making speed

You can use the ROI calculator above to get personalized estimates based on your specific business metrics. Would you like me to guide you through it?`;
    
    case 'pricing_inquiry':
      return `Our pricing is tailored to your specific needs and scale. Factors we consider:

• Business size and complexity
• Scope of AI implementation
• Integration requirements
• Support and maintenance needs

The best way to get accurate pricing is to schedule a consultation where we can understand your requirements. Would you like me to help you get in touch with our team?`;
    
    case 'contact_inquiry':
      return `You can reach us through:

📧 **Email**: hello@vae.ai
📞 **Phone**: +49 30 12345678
🌐 **Website**: vae.ai/contact

Or simply leave your details and I'll make sure our team gets back to you within 24 hours. What's the best way to reach you?`;
    
    case 'greeting':
      return `Hello! Welcome to VAE - your partner in AI-powered business transformation. 

I'm here to help you understand how artificial intelligence can drive growth, efficiency, and innovation in your organization. 

What specific challenge are you looking to solve with AI?`;
    
    default:
      return `Thank you for your interest in VAE! I'm here to help you explore how AI can transform your business.

I can assist you with:
• Understanding our AI services and solutions
• Calculating potential ROI and savings
• Getting pricing information
• Connecting you with our expert team

What would you like to know more about?`;
  }
};

// Export for testing
export const testHelpers = {
  detectIntent,
  extractEntities,
};
