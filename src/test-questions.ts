/**
 * Test different AI responses
 */

import { askAI } from './ai-service';

async function testDifferentQuestions() {
  console.log('🧪 Testing AI responses with different questions...\n');
  
  const testQuestions = [
    "How can I help you? Please let me know what you need assistance with.",
    "What's 2+2?",
    "What's the weather like?", 
    "Hello, how are you?",
    "Can you help me with programming?",
    "What time is it?"
  ];
  
  for (let i = 0; i < testQuestions.length; i++) {
    const question = testQuestions[i];
    console.log(`\n${i + 1}. Question: "${question}"`);
    
    try {
      const response = await askAI(question);
      console.log(`   Response: "${response}"`);
    } catch (error) {
      console.log(`   Error: ${error.message}`);
    }
    
    console.log('   ---');
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testDifferentQuestions().catch(console.error);
}

export { testDifferentQuestions };
