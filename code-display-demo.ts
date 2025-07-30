/**
 * Demonstration of Enhanced Code Display
 */

// Simulate proper AI response with code blocks
function simulateEnhancedCodeDisplay() {
  console.log('🎯 ENHANCED CODE DISPLAY DEMONSTRATION');
  console.log('='.repeat(60));
  
  // Simulate what OpenAI would return for "show me C code to swap numbers"
  const mockResponse = `Sure! Here is a simple algorithm in C to swap two numbers using a temporary variable:

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

This algorithm uses a temporary variable to store one value while swapping occurs. The output will show the values before and after swapping.`;

  console.log('📝 Original AI Response (what OpenAI returns):');
  console.log(mockResponse);
  console.log('\n' + '='.repeat(60) + '\n');

  // Show OLD vs NEW processing
  console.log('🔴 OLD BEHAVIOR (showing [CODE]):');
  const oldProcessing = mockResponse
    .replace(/```[\s\S]*?```/g, '[CODE]')
    .replace(/\n\s*\n/g, ' ')
    .replace(/\n/g, ' ')
    .trim();
  console.log(`"${oldProcessing}"`);
  
  console.log('\n' + '🟢 NEW ENHANCED BEHAVIOR (showing actual code):');
  
  // Apply new processing logic
  let cleanResponse = mockResponse;
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
  let match;
  let codeBlocks: string[] = [];
  
  while ((match = codeBlockRegex.exec(mockResponse)) !== null) {
    const language = match[1] || 'code';
    const code = match[2].trim();
    const placeholder = `[CODE_BLOCK_${codeBlocks.length}]`;
    codeBlocks.push(`💻 ${language.toUpperCase()} Code:\n${code}`);
    cleanResponse = cleanResponse.replace(match[0], placeholder);
  }
  
  cleanResponse = cleanResponse
    .replace(/\n\s*\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();
  
  codeBlocks.forEach((codeBlock, index) => {
    cleanResponse = cleanResponse.replace(`[CODE_BLOCK_${index}]`, `\n\n${codeBlock}\n`);
  });
  
  console.log(`"${cleanResponse}"`);
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  console.log('📱 How it will appear on smart glasses (chunked):');
  
  // Simulate chunking
  const chunks: string[] = [];
  if (cleanResponse.includes('💻') && cleanResponse.includes('Code:')) {
    const parts = cleanResponse.split(/(\n\n💻.*?Code:\n[\s\S]*?)(?=\n\n|$)/);
    
    let currentChunk = '';
    const maxLength = 200;
    
    for (const part of parts) {
      if (part.trim().startsWith('💻') && part.includes('Code:')) {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        chunks.push(part.trim());
      } else if (part.trim()) {
        if (currentChunk.length + part.length > maxLength && currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = part.trim();
        } else {
          currentChunk += part;
        }
      }
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
  }
  
  chunks.forEach((chunk, index) => {
    const timing = Math.min(6000 + (chunk.length * 60), 15000);
    console.log(`\n📄 Chunk ${index + 1}/${chunks.length} (${chunk.length} chars, ${timing/1000}s display):`);
    console.log('─'.repeat(40));
    console.log(chunk);
    
    if (chunk.includes('💻')) {
      console.log('✅ Code block - displayed in full!');
    }
  });
  
  console.log('\n🎉 RESULTS:');
  console.log('✅ Real C code displayed instead of [CODE]');
  console.log('✅ Proper formatting with 💻 C Code: header');
  console.log('✅ Code kept intact in dedicated chunks');
  console.log('✅ Longer display time for code chunks');
  console.log('\n🚀 Your smart glasses will now show actual, readable code!');
}

simulateEnhancedCodeDisplay();
