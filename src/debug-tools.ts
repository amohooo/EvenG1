/**
 * Debug tool calls - simulate tool calls to test the system
 */

import { handleToolCall } from './tools';

// Mock ToolCall object
const mockToolCall = {
  toolId: 'ask_ai',
  userId: 'test-user',
  timestamp: Date.now(),
  toolParameters: {
    question: 'Test question for debugging'
  }
};

const mockToolCallNoParams = {
  toolId: 'ask_ai',
  userId: 'test-user', 
  timestamp: Date.now(),
  toolParameters: {}
};

async function testToolCalls() {
  console.log('🧪 Testing Tool Call System...\n');
  
  console.log('Test 1: Tool call with question parameter');
  try {
    const result1 = await handleToolCall(mockToolCall as any, 'test-user', undefined);
    console.log('Result:', result1);
  } catch (error) {
    console.error('Error:', error);
  }
  
  console.log('\n---\n');
  
  console.log('Test 2: Tool call without question parameter (simulates "can you repeat")');
  try {
    const result2 = await handleToolCall(mockToolCallNoParams as any, 'test-user', undefined);
    console.log('Result:', result2);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testToolCalls().catch(console.error);
}

export { testToolCalls };
