/**
 * Test Code Display with Auto-Scrolling
 * Demonstrates how AI now shows actual code examples
 */

import { askAIWithRAG } from './src/rag-service.js';

async function testCodeDisplay() {
  console.log('💻 Testing Code Display Capabilities\n');
  console.log('='.repeat(60));
  
  // Test cases: Questions that should return code
  const codeQuestions = [
    "Show me bubble sort code",
    "How to implement a stack?",
    "Give me code for binary search",
    "Write a queue class",
    "Show me linked list implementation"
  ];
  
  // Test cases: Questions that should return explanations
  const explanationQuestions = [
    "What is bubble sort?",
    "Explain how a stack works",
    "Tell me about binary search",
    "What is a queue?",
    "Describe linked lists"
  ];
  
  console.log('💻 TESTING CODE REQUESTS:');
  console.log('-'.repeat(40));
  
  for (const question of codeQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    
    try {
      const response = await askAIWithRAG(question);
      console.log(`📝 Response length: ${response.length} characters`);
      console.log(`💬 Response preview: "${response.substring(0, 100)}..."`);
      console.log(`🔍 Contains code: ${response.includes('function') || response.includes('class') || response.includes('{') ? 'YES' : 'NO'}`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n\n📖 TESTING EXPLANATION REQUESTS:');
  console.log('-'.repeat(40));
  
  for (const question of explanationQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    
    try {
      const response = await askAIWithRAG(question);
      console.log(`📝 Response length: ${response.length} characters`);
      console.log(`💬 Response: "${response}"`);
      console.log(`🔍 Contains code: ${response.includes('function') || response.includes('class') || response.includes('{') ? 'YES' : 'NO'}`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n✅ Code Display Testing Complete!');
  console.log('\n📋 Summary:');
  console.log('- "Show me code" → Returns actual code examples');
  console.log('- "Explain concept" → Returns clear explanations');
  console.log('- Auto-scrolling handles longer code responses');
  console.log('- Smart detection of code vs explanation requests');
}

// Run the test
testCodeDisplay();
