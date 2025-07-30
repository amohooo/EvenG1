/**
 * Test RAG (Retrieval-Augmented Generation) System
 * Demonstrates hybrid personal knowledge + OpenAI responses
 */

import { askAIWithRAG } from './src/rag-service.js';
import { isPersonalQuery, retrieveKnowledge } from './src/knowledge-base.js';

async function testRAGSystem() {
  console.log('🧠 Testing RAG System - Personal Knowledge + OpenAI\n');
  console.log('='.repeat(60));
  
  // Test cases: Personal questions (should use RAG)
  const personalQuestions = [
    "Who are you?",
    "Tell me about yourself",
    "What are your skills?",
    "What projects are you working on?",
    "What are your interests?"
  ];
  
  // Test cases: General technical questions (should use OpenAI)
  const generalQuestions = [
    "What is a stack?",
    "Explain what a queue is",
    "How does bubble sort work?",
    "What is binary search?",
    "Explain recursion"
  ];
  
  console.log('👤 TESTING PERSONAL QUESTIONS (RAG):');
  console.log('-'.repeat(40));
  
  for (const question of personalQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    console.log(`🔍 Personal query: ${isPersonalQuery(question)}`);
    
    const knowledge = retrieveKnowledge(question, 2);
    console.log(`📚 Knowledge entries found: ${knowledge.length}`);
    
    try {
      const response = await askAIWithRAG(question);
      console.log(`💬 Response: "${response}"`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n\n🌐 TESTING GENERAL QUESTIONS (OpenAI):');
  console.log('-'.repeat(40));
  
  for (const question of generalQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    console.log(`🔍 Personal query: ${isPersonalQuery(question)}`);
    
    try {
      const response = await askAIWithRAG(question);
      console.log(`💬 Response: "${response}"`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n\n🔄 TESTING MIXED QUESTIONS:');
  console.log('-'.repeat(40));
  
  const mixedQuestions = [
    "What programming languages do you use?", // Personal + technical
    "Can you help me with Python?", // General but with "you"
    "Tell me about machine learning", // General
  ];
  
  for (const question of mixedQuestions) {
    console.log(`\n❓ Question: "${question}"`);
    console.log(`🔍 Personal query: ${isPersonalQuery(question)}`);
    
    try {
      const response = await askAIWithRAG(question);
      console.log(`💬 Response: "${response}"`);
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n✅ RAG Testing Complete!');
  console.log('\n📋 Summary:');
  console.log('- Personal questions → Use your knowledge base (RAG)');
  console.log('- Technical questions → Use OpenAI/ChatGPT');
  console.log('- Mixed questions → Intelligent routing based on context');
}

// Run the test
testRAGSystem();
