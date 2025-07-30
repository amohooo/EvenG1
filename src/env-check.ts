/**
 * Environment validation script
 */

function validateEnvironment() {
  console.log('🔍 Validating Environment Configuration...\n');
  
  const requiredVars = [
    'PACKAGE_NAME',
    'MENTRAOS_API_KEY', 
    'OPENAI_API_KEY'
  ];
  
  const issues: string[] = [];
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    
    if (!value) {
      issues.push(`❌ ${varName} is not set`);
    } else if (value.includes('your_') || value.includes('_here')) {
      issues.push(`⚠️ ${varName} appears to be a placeholder value`);
    } else {
      console.log(`✅ ${varName}: ${varName === 'OPENAI_API_KEY' || varName === 'MENTRAOS_API_KEY' ? 
        value.substring(0, 8) + '...' : value}`);
    }
  });
  
  // Check optional PORT
  const port = process.env.PORT;
  console.log(`ℹ️ PORT: ${port || '3000 (default)'}`);
  
  if (issues.length > 0) {
    console.log('\n🚨 Configuration Issues Found:');
    issues.forEach(issue => console.log(issue));
    console.log('\n📋 Please check your environment variables:');
    console.log('- Local development: Update .env file');
    console.log('- Railway deployment: Update Variables in Railway dashboard');
    console.log('- See RAILWAY_DEPLOYMENT.md for detailed instructions');
    return false;
  }
  
  console.log('\n✅ All environment variables are properly configured!');
  return true;
}

// Check if running in Railway
if (process.env.RAILWAY_ENVIRONMENT) {
  console.log('🚂 Running on Railway');
} else {
  console.log('💻 Running in local environment');
}

// Run validation
validateEnvironment();

export { validateEnvironment };
