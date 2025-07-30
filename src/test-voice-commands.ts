/**
 * Test voice commands configuration
 */

import { readFileSync } from 'fs';
import path from 'path';

function testVoiceCommands() {
  console.log('🎙️ Testing Voice Commands Configuration...\n');
  
  try {
    // Read app_config.json
    const configPath = path.join(process.cwd(), 'app_config.json');
    const configContent = readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);
    
    console.log('📋 Available Tools:');
    config.tools.forEach((tool: any, index: number) => {
      console.log(`\n${index + 1}. Tool ID: ${tool.id}`);
      console.log(`   Description: ${tool.description}`);
      console.log(`   Activation Phrases:`);
      tool.activationPhrases.forEach((phrase: string) => {
        console.log(`   - "${phrase}"`);
      });
      
      if (tool.parameters && Object.keys(tool.parameters).length > 0) {
        console.log(`   Parameters:`, Object.keys(tool.parameters));
      }
    });
    
    console.log('\n🎯 Test Commands:');
    console.log('1. Say: "Ask AI what is 2+2?"');
    console.log('2. Say: "Can you repeat"');
    console.log('3. Say: "Hey AI, tell me a joke"');
    console.log('4. Say: "Repeat please"');
    
    console.log('\n✅ Voice commands configuration loaded successfully!');
    
  } catch (error) {
    console.error('❌ Error reading configuration:', error);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testVoiceCommands();
}

export { testVoiceCommands };
