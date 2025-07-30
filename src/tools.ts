import { ToolCall, AppSession } from '@mentra/sdk';
import { askAI } from './ai-service';

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
      
      // Display the response on the glasses
      if (session) {
        session.layouts.showTextWall(`🤖 ${aiResponse}`);
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