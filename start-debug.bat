@echo off
echo 🔍 Starting MentraOS App in Debug Mode...
echo.
echo 📋 Environment Check:
echo NODE_ENV: %NODE_ENV%
echo.
echo 📦 Checking .env file...
if exist .env (
    echo ✅ .env file found
) else (
    echo ❌ .env file missing!
    echo Creating .env file...
    echo PORT=3000 > .env
    echo PACKAGE_NAME=com.imhaom.ai-glasses >> .env
    echo MENTRAOS_API_KEY=c9e62e65149291d861cc776a14c15c56852e6daa3805a3d87f9ebfed98c05ba3 >> .env
    echo ✅ .env file created
)
echo.
echo 🚀 Starting server...
bun run dev
pause
