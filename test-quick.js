/**
 * Quick OpenAI API Key Test
 */

import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

async function quickTest() {
    const apiKey = process.env.OPENAI_API_KEY;
    
    console.log('🔍 Quick API Key Test');
    console.log('Key ending with:', apiKey ? apiKey.slice(-10) : 'Not found');
    
    if (!apiKey) {
        console.log('❌ No API key found');
        return;
    }
    
    try {
        const openai = new OpenAI({ apiKey });
        
        console.log('🚀 Testing API connection...');
        
        // Set a timeout for the API call
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000);
        });
        
        const apiPromise = openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello" }],
            max_tokens: 5
        });
        
        const response = await Promise.race([apiPromise, timeoutPromise]);
        
        console.log('✅ SUCCESS! API Key is working!');
        console.log('🤖 Response:', response.choices[0]?.message?.content);
        
    } catch (error) {
        console.log('❌ API Test Failed:');
        console.log('Error:', error.message);
        
        if (error.message.includes('API key')) {
            console.log('💡 Your API key appears to be invalid');
        } else if (error.message.includes('quota')) {
            console.log('💡 API quota exceeded - check your OpenAI usage');
        } else if (error.message.includes('timeout')) {
            console.log('💡 Request timed out - network or server issue');
        } else if (error.message.includes('401')) {
            console.log('💡 Authentication failed - API key is incorrect');
        }
    }
}

quickTest();
