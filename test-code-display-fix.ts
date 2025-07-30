/**
 * Test Enhanced Code Display
 */

// Simulate the AI response with code
const mockAIResponse = `Sure! Here is a simple algorithm in C to swap two numbers using a temporary variable:

\`\`\`c
#include <stdio.h>

int main() {
    int a = 5, b = 10, temp;

    printf("Before swapping: a = %d, b = %d\\n", a, b);

    temp = a;
    a = b;
    b = temp;

    printf("After swapping: a = %d, b = %d\\n", a, b);

    return 0;
}
\`\`\`

This algorithm uses a temporary variable to store one value while swapping occurs.`;

// Test the enhanced code processing
function testCodeProcessing() {
  console.log('🧪 Testing Enhanced Code Display Processing\n');
  
  console.log('📝 Original AI Response:');
  console.log(mockAIResponse);
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Simulate the new processing logic
  let cleanResponse = mockAIResponse;
  
  // Handle code blocks specially - extract and format them
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let match;
  let codeBlocks: string[] = [];
  
  // Extract code blocks and replace with placeholders
  while ((match = codeBlockRegex.exec(mockAIResponse)) !== null) {
    const language = match[1] || 'code';
    const code = match[2].trim();
    const placeholder = `[CODE_BLOCK_${codeBlocks.length}]`;
    codeBlocks.push(`💻 ${language.toUpperCase()} Code:\n${code}`);
    cleanResponse = cleanResponse.replace(match[0], placeholder);
  }
  
  console.log('🔧 After extracting code blocks:');
  console.log('Placeholders:', cleanResponse);
  console.log('\nExtracted code blocks:');
  codeBlocks.forEach((block, index) => {
    console.log(`  ${index}: "${block.substring(0, 50)}..."`);
  });
  
  // Clean up extra whitespace but preserve structure
  cleanResponse = cleanResponse
    .replace(/\n\s*\n/g, '\n')            // Reduce multiple line breaks to single
    .replace(/\s+/g, ' ')                 // Replace multiple spaces with single
    .trim();
  
  // Restore code blocks with proper formatting
  codeBlocks.forEach((codeBlock, index) => {
    cleanResponse = cleanResponse.replace(`[CODE_BLOCK_${index}]`, `\n\n${codeBlock}\n`);
  });
  
  console.log('\n📱 Final processed response:');
  console.log(cleanResponse);
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Test chunking
  console.log('✂️ Testing chunking with code blocks:');
  
  // Simulate the chunking (simplified version)
  const chunks: string[] = [];
  if (cleanResponse.includes('💻') && cleanResponse.includes('Code:')) {
    const parts = cleanResponse.split(/(\n\n💻.*?Code:\n[\s\S]*?(?=\n\n|$))/);
    
    let currentChunk = '';
    const maxLength = 200;
    
    for (const part of parts) {
      if (part.trim().startsWith('💻') && part.includes('Code:')) {
        // Code block - put in its own chunk
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        chunks.push(part.trim());
      } else if (part.trim()) {
        currentChunk += part;
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
  }
  
  console.log(`📄 Created ${chunks.length} chunks:`);
  chunks.forEach((chunk, index) => {
    console.log(`\nChunk ${index + 1} (${chunk.length} chars):`);
    console.log(`"${chunk.substring(0, 80)}${chunk.length > 80 ? '...' : ''}"`);
    
    if (chunk.includes('💻')) {
      console.log('  ✅ Contains code block');
    }
  });
}

console.log('🎯 ENHANCED CODE DISPLAY TEST');
console.log('='.repeat(50));
testCodeProcessing();
console.log('\n✅ Test completed! Code should now display properly instead of [CODE]');
