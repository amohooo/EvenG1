import { ToolCall, AppSession } from '@mentra/sdk';
import { askAI } from './ai-service';

/**
 * Split text into chunks suitable for glasses display
 * @param text - The text to split
 * @param maxLength - Maximum characters per chunk
 * @returns Array of text chunks
 */
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  let currentChunk = '';
  
  // Split by sentences first to avoid breaking mid-sentence
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
  
  return chunks;
}

/**
 * Display text chunks with auto-scrolling on smart glasses
 * @param session - The app session
 * @param chunks - Array of text chunks to display
 */
async function displayChunksWithAutoScroll(session: AppSession, chunks: string[]): Promise<void> {
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkIndicator = chunks.length > 1 ? ` (${i + 1}/${chunks.length})` : '';
    
    console.log(`📄 Displaying chunk ${i + 1}/${chunks.length}: "${chunk.substring(0, 30)}..."`);
    
    // Display current chunk
    session.layouts.showTextWall(`🤖${chunkIndicator} ${chunk}`);
    
    // Wait before showing next chunk (auto-scroll timing)
    if (i < chunks.length - 1) {
      const scrollDelay = Math.min(3000 + (chunk.length * 30), 8000); // 3-8 seconds based on text length
      console.log(`⏳ Auto-scrolling in ${scrollDelay}ms...`);
      await new Promise(resolve => setTimeout(resolve, scrollDelay));
    }
  }
  
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
        session.layouts.showTextWall("🤖 Thinking...");
      }

      // Get AI response
      const aiResponse = await askAI(finalQuestion);
      console.log(`✅ AI response generated: "${aiResponse.substring(0, 50)}..."`);
      
      // Display the response on the glasses with auto-scrolling for long text
      if (session) {
        // Clean up the response for better glasses display
        const cleanResponse = aiResponse
          .replace(/```[\s\S]*?```/g, '[CODE]')  // Replace code blocks with [CODE]
          .replace(/\n\s*\n/g, ' ')              // Remove extra line breaks
          .replace(/\n/g, ' ')                   // Replace line breaks with spaces
          .trim();
        
        console.log(`📱 Preparing to display: "${cleanResponse}"`);
        
        // Auto-scrolling implementation for long responses
        const maxChunkLength = 150; // Characters per chunk for glasses display
        
        if (cleanResponse.length <= maxChunkLength) {
          // Short response - display immediately
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