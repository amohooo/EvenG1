import { ToolCall, AppSession } from '@mentra/sdk';
import { askAI } from './ai-service';

/**
 * Split text into chunks suitable for glasses display
 * Handles code blocks intelligently by keeping them intact
 * @param text - The text to split
 * @param maxLength - Maximum characters per chunk
 * @returns Array of text chunks
 */
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  
  // Check if text contains code blocks
  if (text.includes('💻') && text.includes('Code:')) {
    // Split on code blocks but keep them intact
    const parts = text.split(/(\n\n💻.*?Code:\n[\s\S]*?)(?=\n\n|$)/);
    
    let currentChunk = '';
    
    for (const part of parts) {
      if (part.trim().startsWith('💻') && part.includes('Code:')) {
        // This is a code block - always put it in its own chunk
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = '';
        }
        chunks.push(part.trim());
      } else if (part.trim()) {
        // Regular text - check if it fits in current chunk
        if (currentChunk.length + part.length > maxLength && currentChunk.trim()) {
          chunks.push(currentChunk.trim());
          currentChunk = part.trim();
        } else {
          currentChunk += part;
        }
      }
    }
    
    // Add the last chunk if it exists
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
  } else {
    // No code blocks - use original logic
    let currentChunk = '';
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if (!trimmedSentence) continue;
      
      // If adding this sentence would exceed the limit, start a new chunk
      if (currentChunk.length + trimmedSentence.length + 1 > maxLength && currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = trimmedSentence;
      } else {
        if (currentChunk) currentChunk += '. ';
        currentChunk += trimmedSentence;
      }
    }
    
    // Add the last chunk if it exists
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
  }
  
  return chunks;
}

/**
 * Display text chunks with auto-scrolling on smart glasses
 * @param session - The app session
 * @param chunks - Array of text chunks to display
 */
async function displayChunksWithAutoScroll(session: AppSession, chunks: string[]): Promise<void> {
  // Mark that we're in display mode to prevent interruptions
  (session as any)._isDisplayingAIResponse = true;
  (session as any)._lastActivityTime = Date.now();
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkIndicator = chunks.length > 1 ? ` (${i + 1}/${chunks.length})` : '';
    
    console.log(`📄 Displaying chunk ${i + 1}/${chunks.length}: "${chunk.substring(0, 30)}..."`);
    
    // Display current chunk
    session.layouts.showTextWall(`🤖${chunkIndicator} ${chunk}`);
    
    // Update activity timestamp
    (session as any)._lastActivityTime = Date.now();
    
    // Wait before showing next chunk (much slower auto-scroll timing)
    if (i < chunks.length - 1) {
      // Slower timing: 6-15 seconds based on text length (doubled from original)
      const scrollDelay = Math.min(6000 + (chunk.length * 60), 15000);
      console.log(`⏳ Auto-scrolling in ${scrollDelay}ms...`);
      await new Promise(resolve => setTimeout(resolve, scrollDelay));
    }
  }
  
  // Clear display mode flag after completion
  (session as any)._isDisplayingAIResponse = false;
  (session as any)._lastActivityTime = Date.now();
  
  console.log(`✅ Auto-scroll completed for ${chunks.length} chunks`);
}

/**
 * Handle a tool call
 * @param toolCall - The tool call from the server
 * @param userId - The user ID of the user who called the tool
 * @param session - The session object if the user has an active session
 * @returns A promise that resolves to the tool call result
 */
export async function handleToolCall(toolCall: ToolCall, userId: string, session: AppSession|undefined): Promise<string | undefined> {
  console.log(`🛠️ Tool called: ${toolCall.toolId}`);
  console.log(`⏰ Tool call timestamp: ${toolCall.timestamp}`);
  console.log(`👤 Tool call userId: ${toolCall.userId}`);
  
  if (toolCall.toolParameters && Object.keys(toolCall.toolParameters).length > 0) {
    console.log("📋 Tool call parameters:", toolCall.toolParameters);
  } else {
    console.log("📋 No parameters provided");
  }

  try {
    if (toolCall.toolId === "ask_ai") {
      console.log("🤖 Processing AI request...");
      const question = toolCall.toolParameters?.question as string;
      
      console.log(`🔍 Raw question parameter: "${question}"`);
      console.log(`🔍 Question type: ${typeof question}`);
      console.log(`🔍 Question is undefined: ${question === undefined}`);
      console.log(`🔍 Question is empty: ${question === ""}`);
      
      // If no specific question is provided, generate a helpful response
      const finalQuestion = question || "How can I help you? Please let me know what you need assistance with.";
      
      console.log(`📝 Final question to process: "${finalQuestion}"`);
      console.log(`⚠️ Using default question: ${finalQuestion === "How can I help you? Please let me know what you need assistance with."}`);
      
      // Show loading message
      if (session) {
        // Update activity and clear sleep mode
        (session as any)._lastActivityTime = Date.now();
        (session as any)._isSleeping = false;
        
        session.layouts.showTextWall("🤖 Thinking...");
      }

      // Get AI response
      const aiResponse = await askAI(finalQuestion);
      console.log(`✅ AI response generated: "${aiResponse.substring(0, 50)}..."`);
      
      // Display the response on the glasses with auto-scrolling for long text
      if (session) {
        // Clean up the response for better glasses display while preserving code
        let cleanResponse = aiResponse;
        
        // Handle code blocks specially - extract and format them
        const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
        let match;
        let codeBlocks: string[] = [];
        
        // Extract code blocks and replace with placeholders
        while ((match = codeBlockRegex.exec(aiResponse)) !== null) {
          const language = match[1] || 'code';
          const code = match[2].trim();
          const placeholder = `[CODE_BLOCK_${codeBlocks.length}]`;
          codeBlocks.push(`💻 ${language.toUpperCase()} Code:\n${code}`);
          cleanResponse = cleanResponse.replace(match[0], placeholder);
        }
        
        // Clean up extra whitespace but preserve structure
        cleanResponse = cleanResponse
          .replace(/\n\s*\n/g, '\n')            // Reduce multiple line breaks to single
          .replace(/\s+/g, ' ')                 // Replace multiple spaces with single
          .trim();
        
        // Restore code blocks with proper formatting
        codeBlocks.forEach((codeBlock, index) => {
          cleanResponse = cleanResponse.replace(`[CODE_BLOCK_${index}]`, `\n\n${codeBlock}\n`);
        });
        
        console.log(`📱 Preparing to display: "${cleanResponse.substring(0, 100)}..."`);
        
        // Auto-scrolling implementation for long responses
        const maxChunkLength = 200; // Increased for code blocks
        
        if (cleanResponse.length <= maxChunkLength) {
          // Short response - display immediately
          (session as any)._lastActivityTime = Date.now();
          session.layouts.showTextWall(`🤖 ${cleanResponse}`);
        } else {
          // Long response - split into chunks and auto-scroll
          const chunks = splitTextIntoChunks(cleanResponse, maxChunkLength);
          console.log(`📄 Text split into ${chunks.length} chunks for auto-scrolling`);
          
          // Display chunks with auto-scrolling
          displayChunksWithAutoScroll(session, chunks);
        }
      }
      
      return aiResponse;
    }

    // Handle unknown tools
    const response = `Unknown tool: ${toolCall.toolId}`;
    console.log(`❓ ${response}`);
    if (session) {
      session.layouts.showTextWall(`❓ ${response}`);
    }
    return response;

  } catch (error) {
    console.error('❌ Error in handleToolCall:', error);
    const errorResponse = "Sorry, something went wrong while processing your request.";
    
    if (session) {
      session.layouts.showTextWall(`❌ ${errorResponse}`);
    }
    
    return errorResponse;
  }
}