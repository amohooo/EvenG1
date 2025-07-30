/**
 * Clean Test for Hiring Questions
 */

import { askAIWithRAG } from './src/rag-service.js';

async function testHiringResponse() {
  console.log('💼 Testing Enhanced Knowledge Base for Hiring Questions\n');
  
  const testQuestions = [
    "Why should we hire you?",
    "What unique value do you bring to our company?", 
    "What makes you different from other candidates?"
  ];
  
  for (const question of testQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    console.log('🤖 Response:');
    
    try {
      const response = await askAIWithRAG(question);
      console.log(response);
      console.log('\n' + '='.repeat(60));
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

testHiringResponse();
