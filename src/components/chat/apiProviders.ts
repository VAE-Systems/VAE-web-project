// API Provider Configuration and Management
export type ApiProvider = 'deepseek' | 'gemini' | 'openai' | 'mock';

export interface ApiConfig {
  provider: ApiProvider;
  apiKey: string;
  model: string;
  baseUrl?: string;
}

export interface ApiResponse {
  answer: string;
  suggestions?: string[];
  useCases?: Array<{
    title: string;
    description: string;
    timeSaved: string;
    industry: string;
  }>;
  actionButtons?: Array<{
    text: string;
    action: 'demo' | 'calendar' | 'contact' | 'usecase';
    data?: unknown;
  }>;
  metadata?: {
    provider: ApiProvider;
    model: string;
    responseTime: number;
    cached?: boolean;
  };
}

export class ApiProviderManager {
  private static instance: ApiProviderManager;
  private currentProvider: ApiProvider = 'deepseek';
  private configs: Map<ApiProvider, ApiConfig> = new Map();

  private constructor() {
    this.initializeProviders();
  }

  public static getInstance(): ApiProviderManager {
    if (!ApiProviderManager.instance) {
      ApiProviderManager.instance = new ApiProviderManager();
    }
    return ApiProviderManager.instance;
  }

  private initializeProviders() {
    // Deepseek Configuration
    this.configs.set('deepseek', {
      provider: 'deepseek',
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-c98205fc09b243c59885d892589bd31c',
      model: 'deepseek-chat',
      baseUrl: 'https://api.deepseek.com/v1'
    });

    // Gemini Configuration
    this.configs.set('gemini', {
      provider: 'gemini',
      apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
      model: 'gemini-pro'
    });

    // OpenAI Configuration
    this.configs.set('openai', {
      provider: 'openai',
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      model: 'gpt-3.5-turbo'
    });

    // Mock Configuration
    this.configs.set('mock', {
      provider: 'mock',
      apiKey: 'mock-key',
      model: 'mock-model'
    });
  }

  public setProvider(provider: ApiProvider): void {
    this.currentProvider = provider;
  }

  public getCurrentProvider(): ApiProvider {
    return this.currentProvider;
  }

  public getConfig(provider?: ApiProvider): ApiConfig {
    const targetProvider = provider || this.currentProvider;
    return this.configs.get(targetProvider)!;
  }

  public getAvailableProviders(): ApiProvider[] {
    return Array.from(this.configs.keys()).filter(provider => {
      const config = this.configs.get(provider)!;
      return provider === 'mock' || config.apiKey;
    });
  }

  public async callApi(
    message: string,
    context: Record<string, unknown>,
    provider?: ApiProvider
  ): Promise<ApiResponse> {
    const targetProvider = provider || this.currentProvider;
    const config = this.getConfig(targetProvider);
    const startTime = Date.now();

    try {
      switch (targetProvider) {
        case 'deepseek':
          return await this.callDeepseek(message, context, config, startTime);
        case 'gemini':
          return await this.callGemini(message, context, config, startTime);
        case 'openai':
          return await this.callOpenAI(message, context, config, startTime);
        case 'mock':
        default:
          return await this.callMock(message, context, config, startTime);
      }
    } catch (error) {
      console.error(`API call failed for ${targetProvider}:`, error);
      // Fallback to mock if API fails
      return await this.callMock(message, context, this.getConfig('mock'), startTime);
    }
  }

  private async callDeepseek(
    message: string,
    context: Record<string, unknown>,
    config: ApiConfig,
    startTime: number
  ): Promise<ApiResponse> {
    const systemPrompt = this.buildSystemPrompt(context);
    
    const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.status}`);
    }

    const data = await response.json();
    const responseTime = Date.now() - startTime;

    return {
      answer: data.choices[0]?.message?.content || 'Keine Antwort erhalten',
      metadata: {
        provider: 'deepseek',
        model: config.model,
        responseTime
      }
    };
  }

  private async callGemini(
    message: string,
    context: Record<string, unknown>,
    config: ApiConfig,
    startTime: number
  ): Promise<ApiResponse> {
    const systemPrompt = this.buildSystemPrompt(context);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent?key=${config.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: systemPrompt },
              { text: message }
            ]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const responseTime = Date.now() - startTime;

    return {
      answer: data.candidates[0]?.content?.parts[0]?.text || 'Keine Antwort erhalten',
      metadata: {
        provider: 'gemini',
        model: config.model,
        responseTime
      }
    };
  }

  private async callOpenAI(
    message: string,
    context: Record<string, unknown>,
    config: ApiConfig,
    startTime: number
  ): Promise<ApiResponse> {
    const systemPrompt = this.buildSystemPrompt(context);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const responseTime = Date.now() - startTime;

    return {
      answer: data.choices[0]?.message?.content || 'Keine Antwort erhalten',
      metadata: {
        provider: 'openai',
        model: config.model,
        responseTime
      }
    };
  }

  private async callMock(
    message: string,
    context: Record<string, unknown>,
    config: ApiConfig,
    startTime: number
  ): Promise<ApiResponse> {
    // Simulate API delay 
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const responseTime = Date.now() - startTime;
    
    const mockResponses = [
      "Ich verstehe deine Frage. Lass mich dir helfen, die besten Automatisierungsmöglichkeiten für dein Unternehmen zu finden.",
      "Das ist eine interessante Herausforderung! Basierend auf deiner Branche könnte eine maßgeschneiderte Lösung Sinn machen.",
      "Ich habe einige konkrete Use Cases gefunden, die zu deiner Situation passen könnten.",
      "Lass uns gemeinsam deine Prozesse analysieren und Optimierungspotenzial identifizieren."
    ];

    return {
      answer: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      suggestions: ["Mehr erfahren", "Demo anfordern", "ROI berechnen"],
      metadata: {
        provider: 'mock',
        model: config.model,
        responseTime,
        cached: false
      }
    };
  }

  private buildSystemPrompt(context: Record<string, unknown>): string {
    return `Du bist VÆKTRA, der intelligente Assistent von VAE Systems. 
    Deine Mission: Unternehmen dabei helfen, Automatisierungspotenzial zu erkennen und umzusetzen.
    
    Kontext: ${JSON.stringify(context, null, 2)}
    
    Antworte immer auf Deutsch, sei hilfreich und professionell. 
    Zeige konkrete Use Cases und ROI-Potenziale auf.
    Wenn möglich, nutze vorhandene Knowledge-Base-Daten für präzise Antworten.`;
  }
}
