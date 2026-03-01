# ⚡ Quick Start Guide

Get Janamat Rewards running in under 5 minutes.

---

## Prerequisites

- Node.js 18+
- npm
- Phantom Wallet extension

---

## Setup

### Automated (Recommended)

```bash
# Linux/Mac
./setup.sh

# Windows
setup.bat
```

### Manual

```bash
# Frontend
cd fe && npm install

# Backend
cd be && npm install

# Environment files
cp be/.env.example be/.env
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > fe/.env.local
echo "NEXT_PUBLIC_SOLANA_NETWORK=devnet" >> fe/.env.local
```

---

## Run

**Terminal 1 - Backend:**

```bash
cd be && npm run dev
```

→ Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd fe && npm run dev
```

→ App runs on `http://localhost:3000`

---

## Usage

1. Open `http://localhost:3000`
2. Click "Connect Wallet"
3. Approve connection in Phantom
4. Start exploring missions!

---

## Common Issues

**Port in use:**

```bash
# Kill process on port 3000
npx kill-port 3000
```

**Module not found:**

```bash
rm -rf node_modules package-lock.json && npm install
```

**Tailwind not working:**

```bash
rm -rf .next && npm run dev
```

---

## Next Steps

- 📖 Read [INSTALLATION.md](./INSTALLATION.md) for detailed setup
- 🎨 Check [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for design guidelines
- 🧩 Browse [COMPONENT_RECIPES.md](./COMPONENT_RECIPES.md) for UI components
- 📝 Read the full [README.md](./README.md)

---

**Need help?** Open an issue on GitHub or check the troubleshooting section in INSTALLATION.md.
