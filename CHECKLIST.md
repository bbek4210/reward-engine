# ✅ Janamat Rewards - Project Checklist

Use this checklist to track your progress from setup to deployment.

---

## 🏗️ Initial Setup

- [ ] Node.js 18+ installed
- [ ] npm installed and working
- [ ] Git installed
- [ ] Repository cloned locally
- [ ] Phantom Wallet extension installed
- [ ] Frontend dependencies installed (`cd fe && npm install`)
- [ ] Backend dependencies installed (`cd be && npm install`)
- [ ] Frontend `.env.local` created
- [ ] Backend `.env` created
- [ ] Both servers can start without errors

---

## 👨‍💻 Development Environment

- [ ] VS Code (or preferred IDE) opened
- [ ] Recommended VS Code extensions installed:
  - [ ] Tailwind CSS IntelliSense
  - [ ] ESLint
  - [ ] Prettier
  - [ ] ES7+ React/Redux/React-Native snippets
- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] No console errors in browser DevTools
- [ ] Phantom wallet connects successfully

---

## 📖 Documentation Review

- [ ] Read QUICKSTART.md
- [ ] Read INSTALLATION.md
- [ ] Reviewed DESIGN_SYSTEM.md
- [ ] Reviewed COMPONENT_RECIPES.md
- [ ] Read main README.md
- [ ] Understand project structure

---

## 🎨 Design System

- [ ] Understand color palette (red primary, indigo secondary)
- [ ] Familiar with spacing scale (8px base)
- [ ] Know how to use design tokens
- [ ] Can apply shadow styles
- [ ] Understand component variants
- [ ] Can create new components following patterns

---

## 🧩 Component Library

### Base UI Components

- [ ] Understand Button component (4 variants, 3 sizes)
- [ ] Understand Card component (hover states)
- [ ] Understand Pill component (6 variants)
- [ ] Understand Input component
- [ ] Understand IconButton component
- [ ] Understand StatCard component

### Layout Components

- [ ] Understand Header component (2 variants)
- [ ] Understand SearchBar component
- [ ] Understand Tabs component

### Feature Components

- [ ] Understand MissionCard component
- [ ] Understand MissionGrid component
- [ ] Understand SectionHeader component
- [ ] Understand ConstituencySpotlight component
- [ ] Understand ConstituencyLeaderboardList component
- [ ] Understand CitizenLeaderboardList component

---

## 📄 Pages

- [ ] Dashboard page works
- [ ] Leaderboard page works
- [ ] Navigation between pages works
- [ ] Responsive design works (test on mobile/tablet)
- [ ] All interactions work (tabs, filters, search)

---

## 🔗 Blockchain Integration

- [ ] Phantom wallet detection works
- [ ] Wallet connection works
- [ ] Wallet disconnection works
- [ ] Wallet address displays correctly
- [ ] Network set to Devnet in Phantom
- [ ] Solana Web3.js imported correctly
- [ ] Understand Solana transaction flow

---

## 🛠️ Backend API

- [ ] Understand API structure (`be/src/`)
- [ ] Know available endpoints:
  - [ ] `/api/missions` - Mission CRUD
  - [ ] `/api/leaderboard` - Leaderboard data
  - [ ] `/api/users` - User profiles
  - [ ] `/api/wallet` - Wallet operations
- [ ] Can test endpoints with Postman/curl
- [ ] Understand mock data structure

---

## 🔄 Data Flow

- [ ] Understand how missions are fetched
- [ ] Understand how leaderboard updates
- [ ] Understand user profile structure
- [ ] Know where mock data is defined
- [ ] Can modify mock data for testing

---

## 🎯 Feature Development

### Before Adding New Features

- [ ] Design system tokens defined
- [ ] Component patterns identified
- [ ] API endpoints planned
- [ ] TypeScript types created

### During Development

- [ ] Components are reusable
- [ ] Props are properly typed
- [ ] Styles follow design system
- [ ] Code is documented
- [ ] Error handling implemented

### After Development

- [ ] Feature tested locally
- [ ] Responsive on all breakpoints
- [ ] No console errors
- [ ] Code reviewed
- [ ] TypeScript compiles without errors

---

## 🧪 Testing

- [ ] Can connect/disconnect wallet
- [ ] Can view missions on Dashboard
- [ ] Can filter missions by category
- [ ] Can search missions
- [ ] Can view leaderboards
- [ ] Can switch leaderboard time filters
- [ ] Responsive design tested
- [ ] All buttons have hover states
- [ ] All links work
- [ ] Loading states work

---

## 🚀 Pre-Deployment

- [ ] Environment variables configured for production
- [ ] Frontend builds successfully (`npm run build`)
- [ ] Backend tested in production mode
- [ ] Database configured (if using real DB)
- [ ] Solana network switched to mainnet (if needed)
- [ ] API URLs updated for production
- [ ] CORS configured for production domain
- [ ] JWT secret changed from default
- [ ] Rate limiting configured
- [ ] Error logging set up

---

## 📦 Deployment

### Frontend

- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set environment variables
- [ ] Deploy frontend
- [ ] Test deployed frontend
- [ ] Custom domain configured (optional)

### Backend

- [ ] Choose hosting platform (Railway, Render, AWS, etc.)
- [ ] Configure deployment settings
- [ ] Set environment variables
- [ ] Deploy backend
- [ ] Test deployed backend
- [ ] Configure CORS for frontend domain
- [ ] Set up monitoring/logging

### Database (if applicable)

- [ ] Choose database provider
- [ ] Create production database
- [ ] Configure connection string
- [ ] Migrate schema
- [ ] Seed initial data

---

## 🔒 Security

- [ ] JWT secret is secure
- [ ] Environment variables not committed to Git
- [ ] API rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention (if using SQL)
- [ ] XSS prevention
- [ ] CORS configured properly
- [ ] HTTPS enabled in production
- [ ] Wallet signature verification implemented

---

## 📊 Monitoring

- [ ] Error tracking set up (Sentry, etc.)
- [ ] Analytics configured (optional)
- [ ] Performance monitoring
- [ ] Uptime monitoring
- [ ] Logs accessible
- [ ] Alerts configured for critical errors

---

## 📝 Documentation

- [ ] README.md updated with live URLs
- [ ] API documentation created
- [ ] Deployment guide written
- [ ] Contributing guidelines created
- [ ] License file added
- [ ] Code comments added where needed

---

## 🎉 Launch

- [ ] All tests passing
- [ ] No critical bugs
- [ ] Performance is acceptable
- [ ] Mobile experience tested
- [ ] Phantom wallet works on live site
- [ ] All pages accessible
- [ ] SEO basics configured
- [ ] Social media cards configured
- [ ] Announced to users!

---

## 🔄 Post-Launch

- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Gather user feedback
- [ ] Plan next features
- [ ] Keep dependencies updated
- [ ] Regular security audits

---

**Notes:**

- Not all items may apply to your project
- Add your own custom checklist items as needed
- Track progress as you develop
- Revisit this checklist regularly

---

**Last Updated:** $(date)
**Project Version:** 1.0.0
