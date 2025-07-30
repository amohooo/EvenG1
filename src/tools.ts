import { ToolCall, AppSession } from '@mentra/sdk';
import { askAI, getLastAiResponse } from './ai-service';

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
    if (toolCall.toolId === "repeat_question") {
      console.log("🔄 Processing repeat request...");
      const lastResponse = getLastAiResponse();
      
      if (lastResponse) {
        console.log("✅ Found previous response to repeat");
        // Display the last AI response again
        if (session) {
          session.layouts.showTextWall(`🔄 Repeating: ${lastResponse}`);
        }
        return `I said: ${lastResponse}`;
      } else {
        console.log("⚠️ No previous response found");
        const response = "I haven't said anything yet. Please ask me a question first.";
        if (session) {
          session.layouts.showTextWall(`ℹ️ ${response}`);
        }
        return response;
      }
    }

    if (toolCall.toolId === "ask_ai") {
      console.log("🤖 Processing AI question request...");
      const question = toolCall.toolParameters?.question as string;
      
      if (!question) {
        console.log("⚠️ No question provided in parameters");
        const response = "Please provide a question to ask AI.";
        if (session) {
          session.layouts.showTextWall(`⚠️ ${response}`);
        }
        return response;
      }

      console.log(`📝 Question received: "${question}"`);
      
      // Show loading message
      if (session) {
        session.layouts.showTextWall("🤖 Thinking...");
      }

      // Get AI response
      const aiResponse = await askAI(question);
      console.log(`✅ AI response generated: "${aiResponse.substring(0, 50)}..."`);
      
      // Display the response on the glasses
      if (session) {
        session.layouts.showTextWall(`🤖 AI: ${aiResponse}`);
      }
      
      return aiResponse;
    }

    // Handle unknown tools
    const response = `Unknown tool: ${toolCall.toolId}`;
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