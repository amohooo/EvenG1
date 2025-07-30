/**
 * Test the AI assistant with real OpenAI API
 */

console.log('🧪 Testing AI Assistant with Real OpenAI API\n');

// Use bun to run the TypeScript directly
import { spawn } from 'child_process';

// Start a quick test
const testProcess = spawn('bun', ['run', 'src/index.ts'], {
    cwd: process.cwd(),
    stdio: ['pipe', 'pipe', 'pipe']
});

let serverStarted = false;

testProcess.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`[SERVER] ${output.trim()}`);
    
    // Check if server started successfully
    if (output.includes('Server started successfully') && !serverStarted) {
        serverStarted = true;
        console.log('\n🎯 Server is ready! Testing AI responses...\n');
        
        // Test the AI service directly
        setTimeout(async () => {
            try {
                // Dynamic import for ES modules
                const { askAI } = await import('./src/ai-service.js');
                
                console.log('📝 Test 1: "introduce yourself"');
                const response1 = await askAI('introduce yourself');
                console.log(`🤖 Response: ${response1}\n`);
                
                console.log('📝 Test 2: "what can you help me with?"');
                const response2 = await askAI('what can you help me with?');
                console.log(`🤖 Response: ${response2}\n`);
                
                console.log('✅ AI Assistant is working with real OpenAI API!');
                
                // Kill the server
                testProcess.kill('SIGTERM');
                
            } catch (error) {
                console.error('❌ Test error:', error.message);
                testProcess.kill('SIGTERM');
            }
        }, 2000);
    }
});

testProcess.stderr.on('data', (data) => {
    console.error(`[ERROR] ${data.toString().trim()}`);
});

testProcess.on('close', (code) => {
    console.log('\n🏁 Test completed!');
    process.exit(0);
});

// Timeout after 15 seconds
setTimeout(() => {
    console.log('\n⏰ Test timeout');
    testProcess.kill('SIGTERM');
    process.exit(1);
}, 15000);
