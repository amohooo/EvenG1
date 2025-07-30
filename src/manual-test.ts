/**
 * Manual tool call trigger for testing
 */

import { handleToolCall } from './tools';

// Create a mock session object
const mockSession = {
  layouts: {
    showTextWall: (text: string) => {
      console.log(`📱 [GLASSES DISPLAY]: ${text}`);
    }
  }
};

async function triggerManualToolCall() {
  console.log('🔧 Manually triggering tool call...\n');
  
  const mockToolCall = {
    toolId: 'ask_ai',
    userId: 'test-user',
    timestamp: Date.now(),
    toolParameters: {
      question: undefined // Simulate "can you repeat" without specific question
    }
  };
  
  console.log('Simulating: User said "can you repeat"');
  console.log('Expected: AI should respond with helpful message\n');
  
  try {
    const result = await handleToolCall(mockToolCall as any, 'test-user', mockSession as any);
    console.log('\n✅ Tool call completed');
    console.log('Result:', result);
  } catch (error) {
    console.error('❌ Tool call failed:', error);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  triggerManualToolCall().catch(console.error);
}

export { triggerManualToolCall };
