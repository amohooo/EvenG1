/**
 * Test optimized AI responses for glasses
 */

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

async function testOptimizedAI() {
    console.log('🤖 Testing Optimized AI for Glasses Display\n');
    
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey });
    
    const testQuestions = [
        "show me the bubble sort algorithm in C",
        "what is machine learning",
        "explain python programming",
        "how do neural networks work"
    ];
    
    for (const question of testQuestions) {
        console.log(`📝 Question: "${question}"`);
        
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `You are a helpful AI assistant for smart glasses. CRITICAL: Keep responses extremely concise for glasses display.

RESPONSE RULES:
- Maximum 2-3 sentences
- NO code blocks or long examples
- For coding questions: Explain concepts briefly, don't show full code
- For algorithms: Describe the logic in 1-2 sentences
- Use simple, clear language
- If user needs code, suggest they check their computer/phone

Example responses:
- "Bubble sort compares adjacent elements and swaps them if they're in wrong order. It repeats until the array is sorted."
- "Python is great for beginners because of its simple syntax and readable code."
- "Machine learning uses algorithms to find patterns in data and make predictions."`
                    },
                    {
                        role: "user",
                        content: question
                    }
                ],
                max_tokens: 80,
                temperature: 0.7
            });
            
            const aiResponse = response.choices[0]?.message?.content?.trim() || "No response";
            
            // Clean for glasses display
            const cleanResponse = aiResponse
                .replace(/```[\s\S]*?```/g, '[CODE]')
                .replace(/\n\s*\n/g, ' ')
                .replace(/\n/g, ' ')
                .trim();
            
            console.log(`🤖 Response: "${cleanResponse}"`);
            console.log(`📏 Length: ${cleanResponse.length} characters`);
            console.log(`📱 Glasses display: ${cleanResponse.length <= 200 ? '✅ Good length' : '⚠️ Too long'}\n`);
            
        } catch (error) {
            console.log(`❌ Error: ${error.message}\n`);
        }
    }
}

testOptimizedAI();
