# 🚀 Installation & Setup Guide

This guide will walk you through setting up Janamat Rewards on your local machine.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** ([Download](https://git-scm.com/))
- **Phantom Wallet** browser extension ([Install](https://phantom.app/))
- (Optional) **MongoDB** if you want to use a real database

Check your versions:

```bash
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
git --version
```

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/janamat-rewards.git
cd janamat-rewards
```

---

## Step 2: Install Frontend Dependencies

```bash
cd fe
npm install
```

This will install:

- Next.js 14 (React framework)
- TypeScript
- Tailwind CSS (styling)
- Solana Web3.js (blockchain integration)
- All other required dependencies

**Expected time:** 2-3 minutes

---

## Step 3: Install Backend Dependencies

```bash
cd ../be
npm install
```

This will install:

- Express.js (API server)
- Solana Web3.js (blockchain integration)
- CORS, dotenv (utilities)
- All other required dependencies

**Expected time:** 1-2 minutes

---

## Step 4: Environment Configuration

### Frontend Environment Variables

Create `fe/.env.local`:

```bash
cd ../fe
touch .env.local  # Linux/Mac
# or
echo. > .env.local  # Windows
```

Add the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

### Backend Environment Variables

Create `be/.env`:

```bash
cd ../be
touch .env  # Linux/Mac
# or
echo. > .env  # Windows
```

Add the following content (copy from `.env.example`):

```env
NODE_ENV=development
PORT=5000

# Database (optional - using mock data by default)
MONGODB_URI=mongodb://localhost:27017/janamat-rewards

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
```

---

## Step 5: Verify Tailwind Configuration

Check that `fe/tailwind.config.ts` exists and contains the proper configuration.

The file should import design tokens from `config/design-tokens.ts`.

---

## Step 6: Install Phantom Wallet (If Not Already Installed)

1. Open your web browser (Chrome, Firefox, Brave, or Edge)
2. Go to [phantom.app](https://phantom.app/)
3. Click "Download" and install the browser extension
4. Follow the setup wizard to create a new wallet
5. **Important**: Save your recovery phrase in a safe place!
6. Switch to **Devnet** in Phantom settings:
   - Open Phantom
   - Click Settings (gear icon)
   - Developer Settings
   - Change Network to "Devnet"

---

## Step 7: Start the Development Servers

You'll need **two terminal windows/tabs**.

### Terminal 1: Backend Server

```bash
cd be
npm run dev
```

You should see:

```
╔═══════════════════════════════════════════════════╗
║   🏛️  Janamat Rewards API Server                 ║
║   Port: 5000                                      ║
║   Environment: development                        ║
║   Network: devnet                                 ║
╚═══════════════════════════════════════════════════╝
```

**Backend will run on:** `http://localhost:5000`

### Terminal 2: Frontend Server

```bash
cd fe
npm run dev
```

You should see:

```
  ▲ Next.js 14.x
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

**Frontend will run on:** `http://localhost:3000`

---

## Step 8: Open the Application

1. Open your browser
2. Navigate to `http://localhost:3000`
3. You should see the loading screen, then be redirected to the Dashboard

---

## Step 9: Connect Your Wallet

1. Click the **"Connect Wallet"** button in the header
2. Phantom popup will appear asking for permission
3. Click **"Connect"**
4. Your wallet address will appear in the header
5. You're now ready to use the app!

---

## Troubleshooting

### Issue: "Phantom wallet not found"

**Solution:**

- Make sure Phantom extension is installed
- Refresh the page after installing Phantom
- Try restarting your browser

### Issue: Port 3000 or 5000 already in use

**Solution:**

```bash
# Find and kill the process (Linux/Mac)
lsof -ti:3000 | xargs kill
lsof -ti:5000 | xargs kill

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Or use different ports:

```bash
# Frontend (change port)
PORT=3001 npm run dev

# Backend (update .env)
PORT=5001
```

### Issue: Module not found errors

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tailwind styles not loading

**Solution:**

1. Stop the dev server (Ctrl+C)
2. Delete `.next` folder: `rm -rf .next`
3. Restart: `npm run dev`

### Issue: API calls failing (CORS errors)

**Solution:**

1. Check backend is running on port 5000
2. Verify `ALLOWED_ORIGINS` in backend `.env` includes `http://localhost:3000`
3. Check browser console for specific error messages

### Issue: TypeScript errors

**Solution:**

```bash
# Run type check
npm run type-check

# Most errors are auto-fixed on save if using VS Code
```

---

## Verification Checklist

Before you start developing, verify:

- ✅ Frontend runs without errors on `http://localhost:3000`
- ✅ Backend runs without errors on `http://localhost:5000`
- ✅ Phantom wallet is installed and connected
- ✅ You can see the Dashboard page with missions
- ✅ You can navigate to Leaderboard page
- ✅ All styles are loading correctly (no unstyled content)
- ✅ No console errors in browser DevTools
- ✅ Wallet connection works

---

## Next Steps

### 1. Explore the Application

- Browse missions on the Dashboard
- Check the Leaderboard
- Try filtering and searching
- Test responsive design (resize browser window)

### 2. Get SOL on Devnet (for testing)

```bash
# Using Solana CLI (if installed)
solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet

# Or use the backend API
curl -X POST http://localhost:5000/api/wallet/airdrop \
  -H "Content-Type: application/json" \
  -d '{"walletAddress": "YOUR_WALLET_ADDRESS", "amount": 1}'
```

### 3. Start Development

- Read the [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design guidelines
- Check [COMPONENT_RECIPES.md](./COMPONENT_RECIPES.md) for ready-to-use Tailwind classes
- Browse component files in `fe/components/`
- Review API endpoints in `be/src/routes/`

### 4. Make Your First Change

Try customizing the primary color:

1. Open `fe/config/design-tokens.ts`
2. Change `primary.DEFAULT` from `#E11D48` to your color
3. Save and see the changes instantly!

---

## Development Workflow

```bash
# Always run both servers during development

# Terminal 1: Backend (watches for changes)
cd be && npm run dev

# Terminal 2: Frontend (hot-reloading enabled)
cd fe && npm run dev

# Open http://localhost:3000 and start coding!
```

---

## Useful Commands

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types

# Backend
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

---

## IDE Setup (Recommended)

### VS Code Extensions

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**
- **TypeScript and JavaScript Language Features**

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **Solana Docs**: https://docs.solana.com/
- **Phantom Docs**: https://docs.phantom.app/
- **React Docs**: https://react.dev/

---

## Need Help?

- Check the [README.md](./README.md) for general information
- Review [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design guidelines
- Browse component files for implementation examples
- Create an issue on GitHub: [Issues](https://github.com/yourusername/janamat-rewards/issues)

---

**Happy coding! 🎉**

If you encounter any issues not covered here, please open an issue on GitHub.
