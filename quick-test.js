console.log('Testing "Can you repeat?" case:');

const voiceInput = "Can you repeat?";
const lowerText = voiceInput.toLowerCase().trim();
const activationPhrase = "can you repeat";

console.log('Voice input:', voiceInput);
console.log('Activation phrase:', activationPhrase);

const phraseIndex = lowerText.indexOf(activationPhrase);
const afterPhrase = voiceInput.substring(phraseIndex + activationPhrase.length).trim();

console.log('After phrase:', `"${afterPhrase}"`);
console.log('After phrase length:', afterPhrase.length);

if (afterPhrase && afterPhrase.length > 2) {
    console.log('Would extract:', afterPhrase);
} else {
    if (activationPhrase === 'can you repeat') {
        console.log('✅ Would use: "Please repeat your last response"');
    } else {
        console.log('❌ Would use default');
    }
}
