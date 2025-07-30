/**
 * Debug Voice Command Processing
 * Test question extraction logic
 */

// Test the same logic as in index.ts
function testQuestionExtraction(voiceInput) {
    console.log(`\n🧪 Testing: "${voiceInput}"`);
    
    const lowerText = voiceInput.toLowerCase().trim();
    
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
    
    let activationPhrase = activationPhrases.find(phrase => 
        lowerText.includes(phrase) || lowerText === phrase || lowerText === phrase + ','
    );
    
    if (activationPhrase) {
        console.log(`✅ Found activation phrase: "${activationPhrase}"`);
        
        let question = voiceInput;
        const phraseIndex = lowerText.indexOf(activationPhrase);
        console.log(`📍 Phrase index: ${phraseIndex}`);
        
        if (phraseIndex !== -1) {
            const afterPhrase = voiceInput.substring(phraseIndex + activationPhrase.length).trim();
            console.log(`✂️ Text after phrase: "${afterPhrase}"`);
            
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
                    if (voiceInput.includes('?') || lowerText.includes('what') || lowerText.includes('how') || lowerText.includes('when') || lowerText.includes('where') || lowerText.includes('why')) {
                        question = voiceInput;
                        console.log(`❓ Using full text as question: "${question}"`);
                    } else {
                        question = "How can I help you?";
                        console.log(`📝 Using default question`);
                    }
                }
            }
        }
        
        return { found: true, phrase: activationPhrase, question };
    } else {
        console.log(`❌ No activation phrase found`);
        return { found: false };
    }
}

// Test various voice inputs
const testCases = [
    "Hey AI, what's the weather?",
    "AI, tell me about quantum physics",
    "Can you help me with programming?",
    "What is machine learning?",
    "Hey AI introduce yourself",
    "AI",
    "Help me understand this",
    "Can you repeat?",  // Your specific case
    "Can you repeat that?",
    "Repeat please",
    "Help me",
    "What is the weather like today?",
    "Hey AI, how do I learn programming?",
    "AI, what can you tell me about Python?"
];

console.log('🔍 Testing Voice Command Processing\n');
console.log('='.repeat(50));

testCases.forEach(testCase => {
    testQuestionExtraction(testCase);
});

console.log('\n🏁 Testing completed!');
