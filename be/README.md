# Janamat Rewards — Backend API

> Solana-based civic engagement & rewards platform backend.

## Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Runtime    | Node.js 20 (LTS)           |
| Framework  | Express 5                  |
| Database   | MongoDB + Mongoose         |
| Blockchain | Solana (`@solana/web3.js`) |
| Auth       | JWT + bcrypt               |
| Validation | express-validator          |

## Getting Started

### Prerequisites

- Node.js `>=20` (use `.nvmrc` → `nvm use`)
- MongoDB running locally or a connection string

### Install & Run

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start in development mode (hot-reload)
npm run dev

# Start in production mode
npm start
```

### Docker

```bash
# Build image
docker build -t janamat-backend .

# Run container
docker run -p 3000:3000 --env-file .env janamat-backend
```

## Project Structure

```
be/
├── src/
│   ├── index.js          # App entry point
│   ├── models/           # Mongoose data models
│   │   ├── User.js
│   │   ├── PollVote.js
│   │   ├── PollComment.js
│   │   └── Referral.js
│   └── routes/           # Express route handlers
│       ├── users.js
│       ├── wallet.js
│       ├── polls.js
│       ├── missions.js
│       └── leaderboard.js
├── .env.example          # Environment variable template
├── .nvmrc                # Node version pin
├── Dockerfile            # Multi-stage production Docker build
├── .dockerignore
├── nodemon.json          # Dev server config
├── jest.config.js        # Test configuration
├── .eslintrc.json        # Lint rules
└── .prettierrc           # Code formatting rules
```

## API Endpoints

| Method | Path                         | Description              |
| ------ | ---------------------------- | ------------------------ |
| GET    | `/api/users/:walletAddress`  | Fetch user profile       |
| POST   | `/api/users`                 | Create / upsert user     |
| GET    | `/api/wallet/:address`       | Wallet balance & history |
| GET    | `/api/polls`                 | List active polls        |
| POST   | `/api/polls/:id/vote`        | Cast a poll vote         |
| GET    | `/api/missions`              | List available missions  |
| POST   | `/api/missions/:id/complete` | Mark mission as complete |
| GET    | `/api/leaderboard`           | Top citizens by XP       |

## Environment Variables

See [.env.example](.env.example) for the full list of required variables.

## Scripts

| Command        | Description                      |
| -------------- | -------------------------------- |
| `npm start`    | Start production server          |
| `npm run dev`  | Start dev server with hot-reload |
| `npm test`     | Run test suite                   |
| `npm run lint` | Lint source files                |

## License

MIT
