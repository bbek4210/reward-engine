# 🏛️ Janamat Rewards

> **Empowering Civic Engagement Through Blockchain Technology**

Janamat Rewards is a decentralized civic engagement platform built on Solana that incentivizes meaningful citizen participation in local governance. Earn reward points for completing civic missions like surveys, proposals, voting, and community contributions.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Solana](https://img.shields.io/badge/blockchain-Solana-purple)

---

## 📚 Documentation

| Document                                           | Description                                              |
| -------------------------------------------------- | -------------------------------------------------------- |
| **[QUICKSTART.md](./QUICKSTART.md)**               | Get running in under 5 minutes ⚡                        |
| **[INSTALLATION.md](./INSTALLATION.md)**           | Complete step-by-step installation guide                 |
| **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)**         | Design tokens, colors, components, and visual guidelines |
| **[COMPONENT_RECIPES.md](./COMPONENT_RECIPES.md)** | Ready-to-use Tailwind CSS class recipes                  |

---

## ✨ Features

### 🎯 Core Features

- **Mission System**: Complete civic tasks to earn reward points
- **Leaderboards**: Track top contributors by constituency and citizen
- **Wallet Integration**: Seamless Phantom wallet connection
- **Citizen Verification**: Verify your identity for trusted participation
- **Real-time Stats**: Track your points, streak, and weekly rank
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

### 🏆 Mission Types

- 🗳️ **Vote** on community priorities
- 💬 **Comment** and share feedback
- 📝 **Submit proposals** for improvements
- 📸 **Upload photo evidence** of issues
- 📊 **Complete surveys** on local topics
- 🔗 **Share** missions with your community

### 🎨 Design Features

- Modern civic-tech aesthetic
- Clean, trustworthy UI
- Accessible and inclusive design
- Smooth animations and transitions
- Consistent design system

---

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

**Linux/Mac:**

```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**

```batch
setup.bat
```

The script will automatically:

- ✅ Check Node.js version
- ✅ Install all dependencies
- ✅ Create environment files
- ✅ Show you the next steps

### Option 2: Manual Setup

See the detailed [INSTALLATION.md](./INSTALLATION.md) guide for step-by-step manual installation instructions.

### Starting the Application

**Terminal 1** (Backend):

```bash
cd be
npm run dev
```

Terminal 2 (Backend):

```bash
cd be
npm run dev
```

6. **Open in Browser**

```
Frontend: http://localhost:3000
Backend API: http://localhost:5000
```

---

## 📁 Project Structure

```
janamat-rewards/
├── fe/                          # Frontend (Next.js)
│   ├── app/                     # Next.js app directory
│   │   ├── dashboard/           # Dashboard page
│   │   ├── leaderboard/         # Leaderboard page
│   │   ├── page.tsx             # Home/redirect page
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── ui/                  # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Pill.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── IconButton.tsx
│   │   │   └── StatCard.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── Tabs.tsx
│   │   ├── mission/             # Mission components
│   │   │   ├── MissionCard.tsx
│   │   │   ├── MissionGrid.tsx
│   │   │   └── SectionHeader.tsx
│   │   └── leaderboard/         # Leaderboard components
│   │       ├── ConstituencySpotlight.tsx
│   │       ├── ConstituencyLeaderboardList.tsx
│   │       └── CitizenLeaderboardList.tsx
│   ├── config/                  # Configuration
│   │   └── design-tokens.ts     # Design system tokens
│   ├── hooks/                   # Custom React hooks
│   │   └── usePhantomWallet.ts  # Solana wallet hook
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts
│   │   └── mockData.ts
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   ├── tailwind.config.ts       # Tailwind configuration
│   ├── tsconfig.json
│   └── package.json
│
├── be/                          # Backend (Express.js)
│   ├── src/
│   │   ├── routes/              # API routes
│   │   │   ├── missions.js      # Mission endpoints
│   │   │   ├── leaderboard.js   # Leaderboard endpoints
│   │   │   ├── users.js         # User endpoints
│   │   │   └── wallet.js        # Wallet/Solana endpoints
│   │   └── index.js             # Server entry point
│   ├── .env.example             # Environment template
│   └── package.json
│
├── DESIGN_SYSTEM.md             # Complete design system docs
└── README.md                    # This file
```

---

## 🎨 Design System

### Color Palette

**Primary Brand (Deep Red)**

- Main: `#E11D48`
- Hover: `#BE123C`
- Light: `#FFF1F2`

**Secondary (Soft Indigo)**

- Main: `#6366F1`
- Hover: `#4F46E5`
- Light: `#EEF2FF`

**Backgrounds**

- Page: `#F7F4F2` (warm light gray)
- Card: `#FFFFFF` (white)

**Status Colors**

- Active: `#DCFCE7` (light green) + `#166534` (dark green)
- Warning: `#FEF3C7` + `#92400E`
- Error: `#FEE2E2` + `#991B1B`

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components

- **Buttons**: Rounded-full, 4 variants (primary, secondary, outline, ghost)
- **Cards**: Rounded-2xl with soft shadows
- **Pills**: Fully rounded badges for tags and statuses
- **Inputs**: Rounded-xl with focus states

For complete design system documentation, see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Phantom Wallet Integration

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Blockchain**: Solana Web3.js
- **Database**: MongoDB (optional, using mock data initially)

---

## 📖 API Documentation

### Base URL

```
Development: http://localhost:5000/api
```

### Endpoints

#### Missions

```
GET    /api/missions              # Get all missions
GET    /api/missions/:id          # Get single mission
POST   /api/missions/:id/start    # Start a mission
POST   /api/missions/:id/complete # Complete mission action
```

#### Leaderboard

```
GET    /api/leaderboard/constituencies  # Top constituencies
GET    /api/leaderboard/citizens        # Top citizens
GET    /api/leaderboard/spotlight       # Featured constituency
```

#### Users

```
GET    /api/users/:walletAddress        # Get user profile
GET    /api/users/:walletAddress/stats  # Get user stats
POST   /api/users/verify                # Verify citizen ID
```

#### Wallet

```
POST   /api/wallet/verify              # Verify wallet ownership
GET    /api/wallet/:address/balance    # Get SOL balance
POST   /api/wallet/airdrop             # Request devnet airdrop
```

---

## 🎯 Usage Examples

### Connecting Phantom Wallet

```typescript
import { usePhantomWallet } from '@/hooks/usePhantomWallet';

function MyComponent() {
  const wallet = usePhantomWallet();

  const handleConnect = async () => {
    if (!wallet.isPhantomInstalled) {
      alert('Please install Phantom wallet');
      return;
    }
    await wallet.connect();
  };

  return (
    <button onClick={handleConnect}>
      {wallet.connected ? wallet.address : 'Connect Wallet'}
    </button>
  );
}
```

### Using Design Tokens

```typescript
import { designTokens } from '@/config/design-tokens';

// Use in components
<div style={{
  backgroundColor: designTokens.colors.primary.DEFAULT,
  borderRadius: designTokens.radius.card,
  padding: designTokens.spacing.md
}}>
  Content
</div>
```

### Creating a Mission

```typescript
const mission: Mission = {
  id: "1",
  title: "Healthcare Survey",
  description: "Help improve local healthcare",
  constituency: "KATHMANDU-3",
  category: "health",
  status: "active",
  country: "Nepal",
  bannerColor: "#FFE4E6",
  startDate: new Date(),
  totalParticipants: 342,
  actions: [
    {
      id: "a1",
      type: "vote",
      label: "Vote on Priorities",
      points: 150,
      icon: "🗳️",
    },
  ],
};
```

---

## 🧪 Testing

### Frontend Testing

```bash
cd fe
npm run test
```

### Backend Testing

```bash
cd be
npm run test
```

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
cd fe
vercel
```

### Backend (Railway/Heroku)

```bash
cd be
# Set environment variables in platform
# Deploy via Git push
```

### Environment Variables for Production

- Set `NODE_ENV=production`
- Update `MONGODB_URI` to production database
- Change `JWT_SECRET` to secure random string
- Update `ALLOWED_ORIGINS` to production URL
- Set `SOLANA_NETWORK=mainnet-beta` for production

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for frontend
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages
- Add comments for complex logic

---

## 📝 Roadmap

### Phase 1: MVP (Current)

- [x] Basic mission system
- [x] Leaderboards
- [x] Phantom wallet integration
- [x] Dashboard and leaderboard pages
- [x] Design system implementation

### Phase 2: Enhanced Features

- [ ] Solana smart contract for rewards
- [ ] Real citizen verification system
- [ ] Mission creation by verified organizations
- [ ] Achievement badges (NFTs)
- [ ] Social sharing features
- [ ] Mobile app (React Native)

### Phase 3: Advanced Features

- [ ] DAO governance for platform decisions
- [ ] Token-based rewards (SPL tokens)
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Integration with local government systems
- [ ] Notification system

---

## ⚠️ Important Notes

### Security

- Never commit `.env` files with real credentials
- Always validate user input
- Use HTTPS in production
- Implement rate limiting
- Regular security audits

### Blockchain

- Currently using Solana devnet
- Switch to mainnet for production
- Test all transactions thoroughly
- Monitor gas fees

### Data Privacy

- Comply with local data protection laws
- Secure user personal information
- Implement proper consent mechanisms
- Regular data backups

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ for civic engagement by the Janamat team.

---

## 📞 Support

- **Documentation**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/janamat-rewards/issues)
- **Email**: support@janamat.org

---

## 🙏 Acknowledgments

- Solana Foundation for blockchain infrastructure
- Phantom Wallet for seamless wallet integration
- Inter font by Rasmus Andersson
- Tailwind CSS for styling framework
- Next.js team for the amazing framework

---

**Made with 🏛️ for better civic engagement**
