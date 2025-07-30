/**
 * AI Service for handling OpenAI API calls
 */

// Store the last AI response for repeat functionality
let lastAiResponse: string = "";

/**
 * Simulate OpenAI response (fallback when OpenAI is not available)
 * @param question - The question to ask
 * @returns Promise that resolves to a mock AI response
 */
async function mockAiResponse(question: string): Promise<string> {
  const responses = [
    "That's an interesting question! Let me think about it.",
    "Based on what you asked, here's what I think...",
    "I understand your question. Here's my take on it.",
    "Good question! From my perspective...",
    "Let me help you with that inquiry.",
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  return `${randomResponse} (This is a mock response - please configure OpenAI API key for real AI responses)`;
}

/**
 * Ask AI a question and return the response
 * @param question - The question to ask
 * @returns Promise that resolves to the AI response
 */
export async function askAI(question: string): Promise<string> {
  try {
    console.log(`🤖 Asking AI: "${question}"`);
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.length < 10) {
      console.log('⚠️ OpenAI API key not configured properly, using mock response');
      console.log(`Current API key status: ${apiKey ? 'Set but invalid' : 'Not set'}`);
      const response = await mockAiResponse(question);
      lastAiResponse = response;
      return response;
    }

    // Try to use OpenAI (dynamic import to avoid build issues)
    try {
      const { default: OpenAI } = await import('openai');
      
      const openai = new OpenAI({
        apiKey: apiKey,
      });

      console.log('✅ Using real OpenAI API');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant for smart glasses. Keep your responses concise and clear, suitable for audio/visual display on smart glasses. Limit responses to 2-3 sentences when possible."
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
      lastAiResponse = response;
      console.log(`🤖 OpenAI Response: "${response}"`);
      return response;
      
    } catch (importError) {
      console.log('⚠️ OpenAI module not available, using mock response');
      const response = await mockAiResponse(question);
      lastAiResponse = response;
      return response;
    }
    
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
