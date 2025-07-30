/**
 * Test "Why Should We Hire You?" RAG Responses
 */

import { retrieveKnowledge, isPersonalQuery, generateRAGResponse } from './src/knowledge-base.js';

async function testHiringQuestions() {
  console.log('💼 Testing "Why Should We Hire You?" Question Handling\n');
  console.log('='.repeat(70));
  
  // Common hiring-related questions
  const hiringQuestions = [
    "Why should we hire you?",
    "What value can you bring to our company?",
    "What makes you different from other candidates?",
    "Why are you the best fit for this role?",
    "What unique strengths do you have?",
    "How would you contribute to our team?",
    "What's your biggest competitive advantage?",
    "Tell me about your value proposition"
  ];
  
  console.log('🎯 TESTING HIRING VALUE QUESTIONS:');
  console.log('-'.repeat(50));
  
  for (const question of hiringQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    console.log(`🔍 Personal query: ${isPersonalQuery(question)}`);
    
    // Retrieve relevant knowledge
    const knowledge = retrieveKnowledge(question, 3);
    console.log(`📚 Knowledge entries found: ${knowledge.length}`);
    
    if (knowledge.length > 0) {
      console.log(`📖 Top matches: ${knowledge.map(k => k.id).join(', ')}`);
      
      // Generate response
      const response = generateRAGResponse(question, knowledge);
      console.log(`💬 Response (${response.length} chars):`);
      console.log(`    "${response}"`);
      
      // Analyze response quality
      const hasMetrics = response.includes('%') || response.includes('top 5') || response.includes('100%');
      const hasSpecifics = response.includes('23,000') || response.includes('87%') || response.includes('Dean');
      const hasImpact = response.includes('value') || response.includes('contribution') || response.includes('impact');
      
      console.log(`📊 Response Analysis:`);
      console.log(`    ✅ Contains metrics: ${hasMetrics ? 'YES' : 'NO'}`);
      console.log(`    ✅ Contains specifics: ${hasSpecifics ? 'YES' : 'NO'}`);
      console.log(`    ✅ Shows impact/value: ${hasImpact ? 'YES' : 'NO'}`);
    } else {
      console.log(`💬 No relevant knowledge found`);
    }
    
    console.log('-'.repeat(60));
  }
  
  // Test comprehensive value proposition
  console.log('\n🚀 COMPREHENSIVE VALUE PROPOSITION TEST:');
  console.log('='.repeat(50));
  
  const comprehensiveQuestion = "Give me a complete overview of why we should hire you, including your technical skills, leadership experience, and what value you'd bring to our company.";
  
  console.log(`❓ Complex Question: "${comprehensiveQuestion}"`);
  
  const allKnowledge = retrieveKnowledge(comprehensiveQuestion, 6); // Get more entries
  console.log(`📚 Knowledge entries retrieved: ${allKnowledge.length}`);
  console.log(`📖 Categories covered: ${[...new Set(allKnowledge.map(k => k.category))].join(', ')}`);
  
  // Create comprehensive response
  const comprehensiveResponse = allKnowledge.map(k => k.content).join(' ');
  console.log(`\n💼 COMPREHENSIVE HIRING RESPONSE (${comprehensiveResponse.length} chars):`);
  console.log(`"${comprehensiveResponse.substring(0, 500)}..."`);
  
  // Analyze coverage
  console.log(`\n📊 COMPREHENSIVE RESPONSE ANALYSIS:`);
  console.log(`✅ Technical skills: ${comprehensiveResponse.includes('Python') || comprehensiveResponse.includes('React') ? 'COVERED' : 'MISSING'}`);
  console.log(`✅ Academic excellence: ${comprehensiveResponse.includes('GPA') || comprehensiveResponse.includes('Dean') ? 'COVERED' : 'MISSING'}`);
  console.log(`✅ Leadership experience: ${comprehensiveResponse.includes('team') || comprehensiveResponse.includes('lead') ? 'COVERED' : 'MISSING'}`);
  console.log(`✅ Business impact: ${comprehensiveResponse.includes('value') || comprehensiveResponse.includes('60%') ? 'COVERED' : 'MISSING'}`);
  console.log(`✅ Problem-solving: ${comprehensiveResponse.includes('problem') || comprehensiveResponse.includes('legacy') ? 'COVERED' : 'MISSING'}`);
  console.log(`✅ Cultural fit: ${comprehensiveResponse.includes('collaboration') || comprehensiveResponse.includes('mentoring') ? 'COVERED' : 'MISSING'}`);
  
  console.log('\n✅ RAG HIRING RESPONSE CAPABILITY ASSESSMENT COMPLETE!');
}

// Run the test
testHiringQuestions();
