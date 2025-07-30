/**
 * Voice Recognition Debug Script
 * Tests voice activation phrase detection
 */

const testPhrases = [
    "Hey AI, what's the weather?",
    "Can you repeat that explanation?", 
    "AI help me with this problem",
    "Tell me about machine learning",
    "How do I solve this equation?",
    "What is quantum physics?",
    "Help me understand this concept",
    "AI, can you explain this?",
    "Please help with my homework",
    "Ask AI about programming"
];

// Activation phrases from config
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

function testVoiceRecognition(text) {
    const lowerText = text.toLowerCase().trim();
    
    // Check if any activation phrase is present
    let activationPhrase = activationPhrases.find(phrase => 
        lowerText.includes(phrase) || lowerText === phrase || lowerText === phrase + ','
    );
    
    if (activationPhrase) {
        console.log(`✅ MATCH: "${text}"`);
        console.log(`   Trigger: "${activationPhrase}"`);
        
        // Extract the question part after the activation phrase
        let question = text;
        const phraseIndex = lowerText.indexOf(activationPhrase);
        if (phraseIndex !== -1) {
            const afterPhrase = text.substring(phraseIndex + activationPhrase.length).trim();
            if (afterPhrase && afterPhrase.length > 2) {
                question = afterPhrase;
                console.log(`   Question: "${question}"`);
            } else {
                question = "How can I help you?";
                console.log(`   Question: (default) "${question}"`);
            }
        }
        console.log('');
        return { matched: true, phrase: activationPhrase, question };
    } else {
        console.log(`❌ NO MATCH: "${text}"`);
        console.log('');
        return { matched: false };
    }
}

console.log('🧪 Testing Voice Recognition Patterns\n');
console.log('='.repeat(50));

testPhrases.forEach(phrase => {
    testVoiceRecognition(phrase);
});

console.log('🏁 Test completed!');
