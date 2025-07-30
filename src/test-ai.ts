import { askAI, getLastAiResponse } from './ai-service';

/**
 * Test the AI functionality
 */
async function testAI() {
  console.log('🧪 Testing AI Service...\n');
  
  // Test 1: Ask a simple question
  console.log('Test 1: Asking AI a simple question');
  const response1 = await askAI("What is 2+2?");
  console.log('Response:', response1);
  console.log('---\n');
  
  // Test 2: Test repeat functionality
  console.log('Test 2: Testing repeat functionality');
  const lastResponse = getLastAiResponse();
  console.log('Last response:', lastResponse);
  console.log('---\n');
  
  // Test 3: Ask a more complex question
  console.log('Test 3: Asking a complex question');
  const response2 = await askAI("Explain quantum computing in simple terms");
  console.log('Response:', response2);
  console.log('---\n');
  
  // Test 4: Test repeat again
  console.log('Test 4: Testing repeat after complex question');
  const lastResponse2 = getLastAiResponse();
  console.log('Last response:', lastResponse2);
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAI().catch(console.error);
}

export { testAI };
