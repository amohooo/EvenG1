/**
 * AI Service for handling OpenAI API calls with RAG capabilities
 */

import { askAIWithRAG } from './rag-service.js';

// Store the last AI response for repeat functionality
let lastAiResponse: string = "";

// Try to import OpenAI at module level
let OpenAI: any = null;
try {
  // Use require for better compatibility
  OpenAI = require('openai').default || require('openai');
} catch (error) {
  console.log('⚠️ OpenAI module could not be loaded:', error.message);
}

/**
 * Simulate OpenAI response (fallback when OpenAI is not available)
 * @param question - The question to ask
 * @returns Promise that resolves to a mock AI response
 */
async function mockAiResponse(question: string): Promise<string> {
  // More intelligent mock responses based on question content
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('help') || lowerQuestion.includes('assistance')) {
    return "I'm here to help! I can answer questions, provide explanations, solve problems, or have conversations. What would you like to know?";
  }
  
  if (lowerQuestion.includes('weather')) {
    return "I can't check real weather data, but I'd recommend checking a weather app or asking for the current conditions in your area.";
  }
  
  if (lowerQuestion.includes('time') || lowerQuestion.includes('date')) {
    const now = new Date();
    return `The current time is ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}.`;
  }
  
  if (lowerQuestion.includes('2+2') || lowerQuestion.includes('math')) {
    return "2+2 equals 4. I can help with basic math calculations and explanations.";
  }
  
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi ')) {
    return "Hello! Nice to meet you. I'm your AI assistant running on smart glasses. How can I help you today?";
  }
  
  // Default intelligent responses
  const responses = [
    "That's an interesting question! While I'm running in demo mode, I can still provide helpful responses.",
    "I understand what you're asking. In a real scenario, I'd give you a detailed answer about that topic.",
    "Good question! I'm currently in mock mode, but I can still engage meaningfully with your queries.",
    "Let me help you with that. Even in demo mode, I can provide useful guidance and information.",
    "I see what you need assistance with. I'm designed to be helpful across many different topics.",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return randomResponse;
}

/**
 * Ask AI a question and return the response (now with RAG capabilities)
 * @param question - The question to ask
 * @returns Promise that resolves to the AI response
 */
export async function askAI(question: string): Promise<string> {
  try {
    console.log(`🤖 Asking AI with RAG: "${question}"`);
    console.log(`📏 Question length: ${question.length} characters`);
    
    // Use the new RAG-enabled service
    const response = await askAIWithRAG(question);
    lastAiResponse = response;
    return response;
    
  } catch (error) {
    console.error('❌ AI API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return "Error: OpenAI API key is not configured properly. Please check your .env file.";
      } else if (error.message.includes('quota')) {
        return "Error: OpenAI API quota exceeded. Please check your account.";
      } else {
        return `Error: ${error.message}`;
      }
    }
    
    return "Sorry, I encountered an error while processing your request.";
  }
}

/**
 * Get the last AI response
 * @returns The last AI response or null if none exists
 */
export function getLastAiResponse(): string | null {
  return lastAiResponse || null;
}

/**
 * Clear the last AI response
 */
export function clearLastAiResponse(): void {
  lastAiResponse = "";
}
