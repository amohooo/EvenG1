/**
 * Quick AI Test with Bun
 */

console.log('🤖 Quick OpenAI Test with Bun\n');

// Test if we can load environment and make a simple call
const apiKey = process.env.OPENAI_API_KEY || Bun.env.OPENAI_API_KEY;

if (!apiKey) {
    console.log('❌ No API key found');
    process.exit(1);
}

console.log('✅ API Key loaded, ending with:', apiKey.slice(-10));

// Simple fetch-based test (faster than OpenAI SDK)
try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful AI assistant for smart glasses. Keep responses to 1-2 sentences.'
                },
                {
                    role: 'user', 
                    content: 'Say hello and introduce yourself briefly'
                }
            ],
            max_tokens: 50
        })
    });

    if (response.ok) {
        const data = await response.json();
        console.log('✅ SUCCESS! OpenAI API is working!');
        console.log('🤖 Response:', data.choices[0]?.message?.content);
        console.log('\n🎉 Your voice assistant can now use real ChatGPT!');
    } else {
        const error = await response.text();
        console.log('❌ API Error:', response.status, error);
    }
} catch (error) {
    console.log('❌ Network Error:', error.message);
}
