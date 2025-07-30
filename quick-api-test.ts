/**
 * Quick Test for API Key Fix
 */

import { askAIWithRAG } from './src/rag-service.js';

async function quickTest() {
  console.log('🧪 Quick API Key Test\n');
  
  try {
    console.log('🔍 Testing: "Write a simple hello world in C"');
    const response = await askAIWithRAG("Write a simple hello world in C");
    
    console.log('\n✅ API Response received!');
    console.log('📝 Response preview:');
    console.log(response.substring(0, 200) + '...');
    
    // Check for code blocks
    const hasCodeBlocks = response.includes('```');
    console.log(`\n🔍 Contains code blocks: ${hasCodeBlocks ? '✅' : '❌'}`);
    
    if (hasCodeBlocks) {
      console.log('🎉 SUCCESS! Code will now display properly instead of [CODE]');
    } else {
      console.log('ℹ️ No code blocks in this response, but API is working');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

quickTest();
