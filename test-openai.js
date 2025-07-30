/**
 * Test script to verify OpenAI API key validity
 */

// Load environment variables (ES module style)
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

async function testOpenAIKey() {
    console.log('🔍 Testing OpenAI API Key...');
    
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
        console.log('❌ No API key found in environment');
        return;
    }
    
    console.log(`📋 API Key format: ${apiKey.substring(0, 20)}...`);
    console.log(`📏 API Key length: ${apiKey.length} characters`);
    
    try {
        // Try to use OpenAI
        const openai = new OpenAI({ apiKey });
        
        console.log('🚀 Attempting to connect to OpenAI...');
        
        // Test with a simple API call
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Say 'Hello, API key is working!'" }],
            max_tokens: 20
        });
        
        console.log('✅ SUCCESS! OpenAI API Key is valid and working!');
        console.log('🤖 Response:', response.choices[0]?.message?.content);
        
    } catch (error) {
        console.log('❌ API Key test failed:');
        console.log('Error:', error.message);
        
        if (error.message.includes('API key')) {
            console.log('💡 This suggests your API key might be invalid or revoked');
        } else if (error.message.includes('quota')) {
            console.log('💡 This suggests you\'ve exceeded your usage quota');
        } else if (error.message.includes('billing')) {
            console.log('💡 This suggests a billing issue with your OpenAI account');
        }
    }
}

testOpenAIKey();
