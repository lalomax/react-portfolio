export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class ChatService {
  private static readonly API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
      ? 'https://earnest-perfection-production.up.railway.app/api'
      : 'http://localhost:3001/api');

  constructor() {
    console.log('ChatService initialized with API URL:', ChatService.API_URL);
    console.log('Environment mode:', import.meta.env.MODE);
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  }

  static async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${ChatService.API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let result = '';
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        result += decoder.decode(value, { stream: true });
      }

      return result;

    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  }

  static async streamMessage(message: string, onChunk: (chunk: string) => void): Promise<void> {
    try {
      const response = await fetch(`${ChatService.API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Since the backend sends the complete response as plain text,
      // we'll read it all at once and simulate streaming
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      let fullResponse = '';
      
      // Read the complete response
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          break;
        }

        const chunk = decoder.decode(value);
        fullResponse += chunk;
      }

      // Simulate streaming by sending the response character by character
      if (fullResponse) {
        const chars = fullResponse.split('');
        for (let i = 0; i < chars.length; i++) {
          onChunk(chars[i]);
          // Small delay to simulate streaming effect
          await new Promise(resolve => setTimeout(resolve, 20));
        }
      }

    } catch (error) {
      console.error('Chat streaming error:', error);
      throw error;
    }
  }

  static async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${ChatService.API_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
}
