/**
 * RAG (Retrieval-Augmented Generation) Service
 * Combines personal knowledge base with OpenAI for comprehensive responses
 */

import 'dotenv/config';
import { retrieveKnowledge, isPersonalQuery, generateRAGResponse, type KnowledgeEntry } from './knowledge-base.js';

// Try to import OpenAI at module level
let OpenAI: any = null;
try {
  OpenAI = require('openai').default || require('openai');
} catch (error) {
  console.log('⚠️ OpenAI module could not be loaded for RAG:', error.message);
}

/**
 * Enhanced AI service with RAG capabilities
 * @param question - The question to ask
 * @returns Promise that resolves to the AI response
 */
export async function askAIWithRAG(question: string): Promise<string> {
  try {
    console.log(`🧠 RAG Processing: "${question}"`);
    
    // Step 1: Check if this is a personal query
    const isPersonal = isPersonalQuery(question);
    console.log(`👤 Personal query detected: ${isPersonal}`);
    
    if (isPersonal) {
      // Step 2: Retrieve relevant knowledge from personal knowledge base
      const relevantEntries = retrieveKnowledge(question, 2);
      console.log(`📚 Retrieved ${relevantEntries.length} relevant knowledge entries`);
      
      if (relevantEntries.length > 0) {
        // Step 3a: Use RAG for personal questions
        const ragResponse = generateRAGResponse(question, relevantEntries);
        console.log(`🎯 RAG Response: "${ragResponse}"`);
        return ragResponse;
      }
    }
    
    // Step 3b: Fall back to OpenAI for general questions or when no personal knowledge found
    return await askOpenAI(question);
    
  } catch (error) {
    console.error('❌ RAG Error:', error);
    return "Sorry, I encountered an error while processing your request.";
  }
}

/**
 * OpenAI API call (same as before but separated for RAG workflow)
 */
async function askOpenAI(question: string): Promise<string> {
  try {
    console.log('🌐 Using OpenAI for general question');
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'demo_mode' || apiKey.length < 20) {
      console.log('⚠️ OpenAI API key not configured, using mock response');
      return await mockGeneralResponse(question);
    }

    // Check if OpenAI is available
    if (!OpenAI) {
      console.log('⚠️ OpenAI module not available, using mock response');
      return await mockGeneralResponse(question);
    }

    // Use OpenAI for general questions
    const openai = new OpenAI({ apiKey });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant for smart glasses. Provide clear, practical responses including code when requested.

RESPONSE RULES:
- Provide code examples when specifically asked for code
- Keep code examples concise but functional (10-20 lines max)
- For explanations: Be clear and educational
- Use simple, readable formatting
- Auto-scrolling will handle longer responses

CODE FORMATTING:
- Use simple formatting without markdown blocks
- Show practical, working examples
- Keep variable names clear and simple

EXAMPLES:
- When asked "show me bubble sort code": Provide actual code
- When asked "explain bubble sort": Provide explanation
- When asked "how to implement X": Show code example`
        },
        {
          role: "user",
          content: question
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content?.trim() || "Sorry, I couldn't generate a response.";
    console.log(`🤖 OpenAI Response: "${response}"`);
    return response;
    
  } catch (openaiError) {
    console.log('⚠️ OpenAI API call failed, using mock response');
    console.log('Error details:', openaiError.message);
    return await mockGeneralResponse(question);
  }
}

/**
 * Mock responses for general questions when OpenAI is not available
 */
async function mockGeneralResponse(question: string): Promise<string> {
  const lowerQuestion = question.toLowerCase();
  
  // Check if user wants code specifically
  const wantsCode = lowerQuestion.includes('code') || lowerQuestion.includes('show me') || 
                   lowerQuestion.includes('implement') || lowerQuestion.includes('example');
  
  // Technical concepts with code examples
  if (lowerQuestion.includes('bubble sort')) {
    if (wantsCode) {
      return `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;
    } else {
      return "Bubble sort compares adjacent elements and swaps them if they're in wrong order. It repeats until the array is sorted.";
    }
  }
  
  if (lowerQuestion.includes('stack')) {
    if (wantsCode) {
      return `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`;
    } else {
      return "A stack follows LIFO (Last In, First Out) principle. Think of it like a stack of plates - you add and remove from the top.";
    }
  }
  
  if (lowerQuestion.includes('queue')) {
    if (wantsCode) {
      return `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}`;
    } else {
      return "A queue follows FIFO (First In, First Out) principle. Like a line at a store - first person in line gets served first.";
    }
  }
  
  if (lowerQuestion.includes('binary search')) {
    if (wantsCode) {
      return `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found target
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Not found
}`;
    } else {
      return "Binary search divides a sorted array in half repeatedly to find a target value. It's much faster than checking every element.";
    }
  }
  
  if (lowerQuestion.includes('linked list')) {
    if (wantsCode) {
      return `class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  
  append(val) {
    const newNode = new ListNode(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }
}`;
    } else {
      return "A linked list stores data in nodes, where each node points to the next one. It allows dynamic memory allocation.";
    }
  }
  
  // Programming languages
  if (lowerQuestion.includes('python')) {
    return "Python is great for beginners because of its simple syntax and readable code. It's widely used in AI and data science.";
  }
  
  if (lowerQuestion.includes('javascript')) {
    return "JavaScript runs in browsers and servers (Node.js). It's essential for web development and increasingly used everywhere.";
  }
  
  // General fallback
  return "I'm currently in demo mode for general questions. In a real scenario, I'd provide detailed explanations about technical topics.";
}
