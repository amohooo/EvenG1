/**
 * Test Environment Variable Loading
 */

import 'dotenv/config';

console.log('🔧 Testing Environment Variable Loading\n');

console.log('📋 Environment Variables:');
console.log(`PORT: ${process.env.PORT}`);
console.log(`PACKAGE_NAME: ${process.env.PACKAGE_NAME}`);
console.log(`MENTRAOS_API_KEY: ${process.env.MENTRAOS_API_KEY ? 'Set ✅' : 'Not set ❌'}`);
console.log(`OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? 'Set ✅' : 'Not set ❌'}`);

if (process.env.OPENAI_API_KEY) {
  const key = process.env.OPENAI_API_KEY;
  console.log(`\n🔑 OpenAI API Key Details:`);
  console.log(`Length: ${key.length} characters`);
  console.log(`Starts with: ${key.substring(0, 8)}...`);
  console.log(`Ends with: ...${key.substring(key.length - 4)}`);
  console.log(`Format check: ${key.startsWith('sk-') ? 'Valid format ✅' : 'Invalid format ❌'}`);
} else {
  console.log('\n❌ OPENAI_API_KEY is not loaded from .env file');
}

console.log('\n🎯 If the API key is properly loaded, your code display should work!');
