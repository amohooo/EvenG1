import { ToolCall, AppServer, AppSession } from '@mentra/sdk';
import path from 'path';
import { setupExpressRoutes } from './webview';
import { handleToolCall } from './tools';
import { validateEnvironment } from './env-check';

// Validate environment before starting
console.log('🔧 Environment Check:');
validateEnvironment();

// Load environment variables
const PACKAGE_NAME = process.env.PACKAGE_NAME ?? (() => { throw new Error('PACKAGE_NAME is not set in .env file'); })();
const MENTRAOS_API_KEY = process.env.MENTRAOS_API_KEY ?? (() => { throw new Error('MENTRAOS_API_KEY is not set in .env file'); })();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PORT = parseInt(process.env.PORT || '3000');

class ExampleMentraOSApp extends AppServer {
  constructor() {
    super({
      packageName: PACKAGE_NAME,
      apiKey: MENTRAOS_API_KEY,
      port: PORT,
      publicDir: path.join(__dirname, '../public'),
    });

    console.log(`🚀 Initializing MentraOS App Server`);
    console.log(`📦 Package: ${PACKAGE_NAME}`);
    console.log(`🌐 Port: ${PORT}`);
    console.log(`📁 Public Dir: ${path.join(__dirname, '../public')}`);
    console.log(`🤖 OpenAI API: ${OPENAI_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
    
    // Log available tools from config
    try {
      const configPath = path.join(__dirname, '../app_config.json');
      const fs = require('fs');
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        console.log(`🛠️ Available tools: ${config.tools?.length || 0}`);
        config.tools?.forEach((tool: any) => {
          console.log(`   - ${tool.id}: ${tool.activationPhrases?.length || 0} phrases`);
        });
      }
    } catch (error) {
      console.log(`⚠️ Could not read app_config.json:`, error.message);
    }

    // Set up Express routes
    setupExpressRoutes(this);
  }

  /** Map to store active user sessions */
  private userSessionsMap = new Map<string, AppSession>();

  /**
   * Handles tool calls from the MentraOS system
   * @param toolCall - The tool call request
   * @returns Promise resolving to the tool call response or undefined
   */
  protected async onToolCall(toolCall: ToolCall): Promise<string | undefined> {
    console.log(`🔥 onToolCall triggered! Tool ID: ${toolCall.toolId}`);
    console.log(`🔥 Tool parameters:`, toolCall.toolParameters);
    
    const result = await handleToolCall(toolCall, toolCall.userId, this.userSessionsMap.get(toolCall.userId));
    console.log(`🔥 Tool call result:`, result);
    
    return result;
  }

  /**
   * Handles new user sessions
   * Sets up event listeners and displays welcome message
   * @param session - The app session instance
   * @param sessionId - Unique session identifier
   * @param userId - User identifier
   */
  protected async onSession(session: AppSession, sessionId: string, userId: string): Promise<void> {
    this.userSessionsMap.set(userId, session);

    // Show welcome message
    session.layouts.showTextWall("Example App loaded!");

    /**
     * Handles transcription display based on settings
     * @param text - The transcription text to display
     */
    const displayTranscription = (text: string): void => {
      const showLiveTranscription = session.settings.get<boolean>('show_live_transcription', true);
      if (showLiveTranscription) {
        console.log("Transcript received:", text);
        session.layouts.showTextWall("You said: " + text);
      }
    };

    // Listen for transcriptions
    session.events.onTranscription((data) => {
      if (data.isFinal) {
        console.log(`🎙️ Final transcription: "${data.text}"`);
        // Handle final transcription text
        displayTranscription(data.text);
      } else {
        console.log(`🎙️ Partial transcription: "${data.text}"`);
      }
    });

    // Listen for setting changes to update transcription display behavior
    session.settings.onValueChange(
      'show_live_transcription',
      (newValue: boolean, oldValue: boolean) => {
        console.log(`Live transcription setting changed from ${oldValue} to ${newValue}`);
        if (newValue) {
          console.log("Live transcription display enabled");
        } else {
          console.log("Live transcription display disabled");
        }
      }
    );

    // automatically remove the session when the session ends
    this.addCleanupHandler(() => this.userSessionsMap.delete(userId));
  }
}

// Start the server
const app = new ExampleMentraOSApp();

console.log('🔄 Starting MentraOS App Server...');

app.start()
  .then(() => {
    console.log(`✅ Server started successfully on port ${PORT}`);
    console.log(`🌐 Local access: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    console.log(`👁️ Webview: http://localhost:${PORT}/webview`);
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  });