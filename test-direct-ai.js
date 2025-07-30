/**
 * Direct AI Test - No server needed
 */

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

async function testAI() {
    console.log('🤖 Testing Real OpenAI Integration\n');
    
    const apiKey = process.env.OPENAI_API_KEY;
    const openai = new OpenAI({ apiKey });
    
    try {
        // Test 1: Introduction
        console.log('📝 Test 1: "introduce yourself"');
        const response1 = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful AI assistant for smart glasses. Keep your responses concise and clear, suitable for audio/visual display on smart glasses. Limit responses to 2-3 sentences when possible.

PERSONAL CONTEXT:
- You are assisting a developer working on MentraOS smart glasses applications
- This user is building AI voice assistants and working with OpenAI integration
- When asked to introduce yourself, mention that you're their personal AI assistant running on smart glasses
- Be helpful with programming, AI, and technology questions`
                },
                {
                    role: "user",
                    content: "introduce yourself"
                }
            ],
            max_tokens: 150
        });
        
        console.log(`🤖 Response: ${response1.choices[0]?.message?.content}\n`);
        
        // Test 2: What can you help with
        console.log('📝 Test 2: "what can you help me with?"');
        const response2 = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a helpful AI assistant for smart glasses. Keep your responses concise and clear, suitable for audio/visual display on smart glasses. Limit responses to 2-3 sentences when possible.

PERSONAL CONTEXT:
- You are assisting a developer working on MentraOS smart glasses applications
- This user is building AI voice assistants and working with OpenAI integration
- When asked to introduce yourself, mention that you're their personal AI assistant running on smart glasses
- Be helpful with programming, AI, and technology questions`
                },
                {
                    role: "user",
                    content: "what can you help me with?"
                }
            ],
            max_tokens: 150
        });
        
        console.log(`🤖 Response: ${response2.choices[0]?.message?.content}\n`);
        
        console.log('✅ SUCCESS! Your OpenAI API is fully working!');
        console.log('🎉 Your voice assistant can now use real ChatGPT responses!');
        
    } catch (error) {
        console.log('❌ Error:', error.message);
    }
}

testAI();
