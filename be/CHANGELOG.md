# Changelog

All notable changes to the Janamat Rewards backend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Docker multi-stage build support
- Jest test configuration
- ESLint + Prettier code quality tooling

## [1.0.0] - 2026-03-03

### Added

- Express 5 REST API foundation
- MongoDB / Mongoose integration
- JWT-based authentication
- `User` model with Solana wallet address
- `PollVote` and `PollComment` models
- `Referral` model with reward tracking
- Routes: users, wallet, polls, missions, leaderboard
- `@solana/web3.js` integration for on-chain queries
- CORS, dotenv, express-validator middleware
