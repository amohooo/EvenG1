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
    console.log(`🔥 AUTOMATIC TOOL CALL: ${toolCall.toolId}`);
    console.log(`🔥 User ID: ${toolCall.userId}`);
    console.log(`🔥 Timestamp: ${new Date(toolCall.timestamp).toLocaleTimeString()}`);
    console.log(`🔥 Parameters:`, toolCall.toolParameters);
    
    const session = this.userSessionsMap.get(toolCall.userId);
    if (!session) {
      console.log(`⚠️ No session found for user ${toolCall.userId}`);
    }
    
    try {
      const result = await handleToolCall(toolCall, toolCall.userId, session);
      console.log(`✅ AUTOMATIC TOOL CALL COMPLETED: "${result?.substring(0, 50) || 'No response'}..."`);
      return result;
    } catch (error) {
      console.error(`❌ AUTOMATIC TOOL CALL ERROR:`, error);
      return "Sorry, I encountered an error processing your request.";
    }
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
     * Handles transcription display and manual fallback for voice commands
     * @param text - The transcription text to display
     */
    const displayTranscription = (text: string): void => {
      const showLiveTranscription = session.settings.get<boolean>('show_live_transcription', true);
      if (showLiveTranscription) {
        console.log("📝 Transcript received:", text);
        session.layouts.showTextWall("You said: " + text);
      }
      
      // Log for debugging but let MentraOS handle tool calls automatically first
      console.log(`👂 Voice input: "${text}"`);
      console.log(`🔍 Checking if MentraOS will handle this automatically...`);
      
      // Manual fallback trigger after a short delay (only if MentraOS doesn't handle it)
      setTimeout(() => {
        const lowerText = text.toLowerCase().trim();
        
        // Define activation phrases that match app_config.json
        const activationPhrases = [
          'ask ai',
          'hey ai',
          'ai help',
          'question ai',
          'can you repeat',
          'repeat please',
          'repeat that',
          'say that again',
          'i didn\'t understand',
          'explain that',
          'what do you mean',
          'ai',
          'help me',
          'help',
          'what is',
          'tell me about',
          'how do i',
          'can you',
          'please help'
        ];
        
        // Check if any activation phrase is present
        let activationPhrase = activationPhrases.find(phrase => 
          lowerText.includes(phrase) || lowerText === phrase || lowerText === phrase + ','
        );
        
        if (activationPhrase) {
          console.log(`🔧 MANUAL FALLBACK: MentraOS didn't handle "${activationPhrase}", triggering manually`);
          console.log(`🎙️ Original text: "${text}"`);
          console.log(`🔤 Lowercase text: "${lowerText}"`);
          console.log(`🎯 Found activation phrase: "${activationPhrase}"`);
          
          // Extract the question part after the activation phrase
          let question = text;
          const phraseIndex = lowerText.indexOf(activationPhrase);
          console.log(`📍 Phrase index: ${phraseIndex}`);
          
          if (phraseIndex !== -1) {
            const afterPhrase = text.substring(phraseIndex + activationPhrase.length).trim();
            console.log(`✂️ Text after phrase: "${afterPhrase}"`);
            console.log(`📏 After phrase length: ${afterPhrase.length}`);
            
            if (afterPhrase && afterPhrase.length > 2) {
              question = afterPhrase;
              console.log(`📝 Extracted question: "${question}"`);
            } else {
              // Handle cases where the activation phrase IS the complete command
              if (activationPhrase === 'can you repeat' || activationPhrase === 'repeat please' || activationPhrase === 'repeat that') {
                question = "Please repeat your last response";
                console.log(`🔄 Repeat command detected, using: "${question}"`);
              } else if (lowerText.includes('help') || activationPhrase === 'help me' || activationPhrase === 'help') {
                question = "What can you help me with?";
                console.log(`❓ Help command detected, using: "${question}"`);
              } else if (activationPhrase === 'ai' && afterPhrase.length <= 2) {
                question = "Hello, how can I assist you today?";
                console.log(`👋 Simple AI greeting detected, using: "${question}"`);
              } else {
                // Use the full original text as the question if it makes sense
                if (text.includes('?') || text.includes('what') || text.includes('how') || text.includes('when') || text.includes('where') || text.includes('why')) {
                  question = text;
                  console.log(`❓ Using full text as question: "${question}"`);
                } else {
                  question = "How can I help you?";
                  console.log(`📝 Using default question`);
                }
              }
            }
          }
          
          // Create manual tool call
          const toolCall = {
            toolId: 'ask_ai',
            userId: userId,
            timestamp: Date.now(),
            toolParameters: { question: question }
          };
          
          // Process manually
          handleToolCall(toolCall as any, userId, session)
            .then(result => {
              console.log(`✅ Manual fallback completed: "${result?.substring(0, 50) || 'No response'}..."`);
            })
            .catch(error => {
              console.error('❌ Manual fallback error:', error);
            });
        } else {
          console.log(`✅ Voice input processed (no activation phrase or handled by MentraOS)`);
        }
      }, 1000); // Give MentraOS 1 second to handle automatically
    };

    // Listen for transcriptions
    session.events.onTranscription((data) => {
      if (data.isFinal) {
        console.log(`🎙️ Final transcription: "${data.text}"`);
        console.log(`🔍 Processing for voice commands...`);
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