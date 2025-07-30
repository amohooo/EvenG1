#!/usr/bin/env node

/**
 * Comprehensive Voice Assistant Test
 * This script starts the server and provides a testing interface
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Starting Comprehensive Voice Assistant Test\n');

// Start the server
console.log('🚀 Starting MentraOS server...');
const serverProcess = spawn('bun', ['src/index.ts'], {
  cwd: __dirname,
  stdio: ['inherit', 'pipe', 'pipe']
});

// Log server output
serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  console.log(`[SERVER] ${output.trim()}`);
});

serverProcess.stderr.on('data', (data) => {
  const output = data.toString();
  console.error(`[SERVER ERROR] ${output.trim()}`);
});

// Handle server exit
serverProcess.on('close', (code) => {
  console.log(`\n🔴 Server process exited with code ${code}`);
  process.exit(code);
});

// Test scenarios
const testScenarios = [
  "Hey AI, what's the weather?",
  "Can you repeat that?",
  "Help me with programming",
  "What is machine learning?",
  "AI, tell me a joke"
];

// Wait for server to start, then show test instructions
setTimeout(() => {
  console.log('\n' + '='.repeat(60));
  console.log('🎤 VOICE ASSISTANT READY FOR TESTING');
  console.log('='.repeat(60));
  console.log('\n📋 Test these voice commands through MentraOS:');
  
  testScenarios.forEach((scenario, index) => {
    console.log(`   ${index + 1}. "${scenario}"`);
  });
  
  console.log('\n🔍 Monitor the console output above for:');
  console.log('   ✅ "AUTOMATIC TOOL CALL" - MentraOS detected voice');
  console.log('   🔧 "MANUAL FALLBACK" - Fallback system activated');
  console.log('   🤖 AI responses displayed on glasses');
  
  console.log('\n🌐 Server running at: http://localhost:3001');
  console.log('👁️ Webview available at: http://localhost:3001/webview');
  
  console.log('\n⏹️ Press Ctrl+C to stop the server\n');
  
}, 3000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  serverProcess.kill('SIGINT');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
});
