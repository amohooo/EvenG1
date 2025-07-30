/**
 * Check Coverage of Common Interview Questions
 */

import { retrieveKnowledge, isPersonalQuery } from './src/knowledge-base.js';

// Questions from the user's Q&A list
const commonQuestions = [
  "Tell me about yourself",
  "What are your greatest strengths as a developer", 
  "Tell me about a challenging project you've worked on",
  "How do you handle team conflicts or differences in opinion",
  "Describe a time when you helped a teammate who was struggling",
  "How do you approach learning new technologies",
  "What's your experience with version control and project management tools",
  "What's a recent technical problem you solved",
  "What's your experience with AI or machine learning",
  "Why should we hire you"
];

console.log('🔍 Analyzing Knowledge Base Coverage for Common Interview Questions\n');

commonQuestions.forEach((question, index) => {
  console.log(`${index + 1}. Question: "${question}"`);
  console.log(`   Personal query: ${isPersonalQuery(question)}`);
  
  const knowledge = retrieveKnowledge(question, 2);
  console.log(`   Knowledge found: ${knowledge.length} entries`);
  
  if (knowledge.length > 0) {
    console.log(`   Top matches: ${knowledge.map(k => k.id).join(', ')}`);
    console.log(`   ✅ COVERED\n`);
  } else {
    console.log(`   ❌ NOT COVERED - May need additional knowledge entry\n`);
  }
});

console.log('📊 Analysis complete!');
