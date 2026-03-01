@echo off
REM Janamat Rewards - Automated Setup Script for Windows
REM This script will install dependencies and set up the development environment

setlocal enabledelayedexpansion

echo.
echo ===================================================
echo    Janamat Rewards - Setup Script
echo ===================================================
echo.

REM Check Node.js version
echo [STEP] Checking Node.js version...
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js 18.x or higher
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=1 delims=v" %%i in ('node -v') do set NODE_VERSION_FULL=%%i
for /f "tokens=1 delims=." %%i in ("%NODE_VERSION_FULL:~1%") do set NODE_VERSION=%%i

if %NODE_VERSION% LSS 18 (
    echo [ERROR] Node.js 18.x or higher required. You have v%NODE_VERSION_FULL%
    pause
    exit /b 1
)

echo [SUCCESS] Node.js detected: %NODE_VERSION_FULL%

REM Check npm
echo [STEP] Checking npm...
where npm >nul 2>nul
if errorlevel 1 (
    echo [ERROR] npm not found. Please install npm
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo [SUCCESS] npm detected: v%NPM_VERSION%

REM Install frontend dependencies
echo.
echo [STEP] Installing frontend dependencies...
cd fe
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)
echo [SUCCESS] Frontend dependencies installed
cd ..

REM Install backend dependencies
echo.
echo [STEP] Installing backend dependencies...
cd be
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
echo [SUCCESS] Backend dependencies installed
cd ..

REM Create frontend .env.local if it doesn't exist
echo.
echo [STEP] Configuring frontend environment...
if not exist "fe\.env.local" (
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000
        echo NEXT_PUBLIC_SOLANA_NETWORK=devnet
    ) > "fe\.env.local"
    echo [SUCCESS] Created fe\.env.local
) else (
    echo [WARNING] fe\.env.local already exists, skipping
)

REM Create backend .env if it doesn't exist
echo.
echo [STEP] Configuring backend environment...
if not exist "be\.env" (
    if exist "be\.env.example" (
        copy "be\.env.example" "be\.env" >nul
        echo [SUCCESS] Created be\.env from .env.example
        echo [WARNING] Please review be\.env and update values as needed
    ) else (
        (
            echo NODE_ENV=development
            echo PORT=5000
            echo.
            echo # Database ^(optional - using mock data by default^)
            echo # MONGODB_URI=mongodb://localhost:27017/janamat-rewards
            echo.
            echo # JWT Secret ^(change in production!^)
            echo JWT_SECRET=your-super-secret-jwt-key-change-in-production
            echo.
            echo # Solana Configuration
            echo SOLANA_NETWORK=devnet
            echo SOLANA_RPC_URL=https://api.devnet.solana.com
            echo.
            echo # CORS
            echo ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
            echo.
            echo # Rate Limiting
            echo RATE_LIMIT_WINDOW_MS=900000
            echo RATE_LIMIT_MAX_REQUESTS=100
        ) > "be\.env"
        echo [SUCCESS] Created be\.env
    )
) else (
    echo [WARNING] be\.env already exists, skipping
)

REM Print success message
echo.
echo ===================================================
echo    Setup Complete!
echo ===================================================
echo.

REM Print next steps
echo Next Steps:
echo.
echo 1. Install Phantom Wallet browser extension:
echo    https://phantom.app/
echo.
echo 2. Start the backend server ^(Terminal 1^):
echo    cd be ^&^& npm run dev
echo.
echo 3. Start the frontend server ^(Terminal 2^):
echo    cd fe ^&^& npm run dev
echo.
echo 4. Open your browser:
echo    http://localhost:3000
echo.
echo 5. Connect your Phantom wallet and start exploring!
echo.
echo Documentation:
echo   - Installation Guide: INSTALLATION.md
echo   - Design System: DESIGN_SYSTEM.md
echo   - Component Recipes: COMPONENT_RECIPES.md
echo   - Project README: README.md
echo.
echo Happy coding!
echo.

pause
