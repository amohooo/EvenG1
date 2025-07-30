/**
 * Test Auto-Scrolling Display for Smart Glasses
 */

// Mock session for testing
const mockSession = {
    layouts: {
        showTextWall: (text) => {
            console.log(`📱 [GLASSES DISPLAY]: ${text}`);
        }
    }
};

/**
 * Split text into chunks suitable for glasses display
 */
function splitTextIntoChunks(text, maxLength) {
    const chunks = [];
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
 * Display text chunks with auto-scrolling simulation
 */
async function displayChunksWithAutoScroll(chunks) {
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkIndicator = chunks.length > 1 ? ` (${i + 1}/${chunks.length})` : '';
        
        console.log(`\n📄 Chunk ${i + 1}/${chunks.length} (${chunk.length} chars):`);
        
        // Display current chunk
        mockSession.layouts.showTextWall(`🤖${chunkIndicator} ${chunk}`);
        
        // Wait before showing next chunk (auto-scroll timing)
        if (i < chunks.length - 1) {
            const scrollDelay = Math.min(2000 + (chunk.length * 20), 5000); // 2-5 seconds for demo
            console.log(`⏳ Auto-scrolling in ${scrollDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, scrollDelay));
        }
    }
    
    console.log(`\n✅ Auto-scroll demonstration completed!`);
}

async function testAutoScrolling() {
    console.log('🧪 Testing Auto-Scrolling for Smart Glasses Display\n');
    
    // Test with a long response (like your bubble sort example)
    const longResponse = `Here is a simple implementation of the Bubble Sort algorithm in C. The bubble sort algorithm works by repeatedly stepping through the list, comparing adjacent elements and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm gets its name from the way smaller elements "bubble" to the top of the list. Bubble sort is a simple sorting algorithm but not efficient for large datasets. It has a time complexity of O(n²) in the worst case. For practical use, other sorting algorithms like quicksort or mergesort are preferred for better performance.`;
    
    console.log('📝 Original response length:', longResponse.length, 'characters');
    console.log('📝 Original response:', `"${longResponse.substring(0, 100)}..."`);
    
    // Split into chunks
    const maxChunkLength = 150;
    const chunks = splitTextIntoChunks(longResponse, maxChunkLength);
    
    console.log(`\n📄 Split into ${chunks.length} chunks:`);
    chunks.forEach((chunk, index) => {
        console.log(`   ${index + 1}. (${chunk.length} chars) "${chunk.substring(0, 50)}..."`);
    });
    
    console.log('\n🎬 Starting auto-scroll demonstration...');
    console.log('='.repeat(60));
    
    await displayChunksWithAutoScroll(chunks);
}

testAutoScrolling();
