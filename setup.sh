#!/bin/bash

# Janamat Rewards - Automated Setup Script
# This script will install dependencies and set up the development environment

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Print header
echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   🏛️  Janamat Rewards - Setup Script            ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Check Node.js version
print_step "Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 18 ]; then
        print_success "Node.js $(node -v) detected"
    else
        print_error "Node.js 18.x or higher required. You have $(node -v)"
        exit 1
    fi
else
    print_error "Node.js not found. Please install Node.js 18.x or higher"
    exit 1
fi

# Check npm
print_step "Checking npm..."
if command -v npm &> /dev/null; then
    print_success "npm $(npm -v) detected"
else
    print_error "npm not found. Please install npm"
    exit 1
fi

# Install frontend dependencies
print_step "Installing frontend dependencies..."
cd fe
if npm install; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Install backend dependencies
print_step "Installing backend dependencies..."
cd be
if npm install; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi
cd ..

# Create frontend .env.local if it doesn't exist
print_step "Configuring frontend environment..."
if [ ! -f "fe/.env.local" ]; then
    cat > fe/.env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOLANA_NETWORK=devnet
EOL
    print_success "Created fe/.env.local"
else
    print_warning "fe/.env.local already exists, skipping"
fi

# Create backend .env if it doesn't exist
print_step "Configuring backend environment..."
if [ ! -f "be/.env" ]; then
    if [ -f "be/.env.example" ]; then
        cp be/.env.example be/.env
        print_success "Created be/.env from .env.example"
        print_warning "Please review be/.env and update values as needed"
    else
        cat > be/.env << EOL
NODE_ENV=development
PORT=5000

# Database (optional - using mock data by default)
# MONGODB_URI=mongodb://localhost:27017/janamat-rewards

# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Solana Configuration
SOLANA_NETWORK=devnet
SOLANA_RPC_URL=https://api.devnet.solana.com

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOL
        print_success "Created be/.env"
    fi
else
    print_warning "be/.env already exists, skipping"
fi

# Print success message
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✓ Setup Complete!                              ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════╝${NC}"
echo ""

# Print next steps
echo -e "${BLUE}Next Steps:${NC}"
echo ""
echo "1. Install Phantom Wallet browser extension:"
echo "   https://phantom.app/"
echo ""
echo "2. Start the backend server (Terminal 1):"
echo -e "   ${YELLOW}cd be && npm run dev${NC}"
echo ""
echo "3. Start the frontend server (Terminal 2):"
echo -e "   ${YELLOW}cd fe && npm run dev${NC}"
echo ""
echo "4. Open your browser:"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "5. Connect your Phantom wallet and start exploring!"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo "  - Installation Guide: INSTALLATION.md"
echo "  - Design System: DESIGN_SYSTEM.md"
echo "  - Component Recipes: COMPONENT_RECIPES.md"
echo "  - Project README: README.md"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
echo ""
