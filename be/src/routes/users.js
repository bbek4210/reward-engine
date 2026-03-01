import express from "express";

const router = express.Router();

// Mock user data
const mockUsers = {};

// GET /api/users/:walletAddress - Get user profile
router.get("/:walletAddress", (req, res) => {
  const { walletAddress } = req.params;

  // Mock user data
  const user = mockUsers[walletAddress] || {
    walletAddress,
    username: walletAddress.slice(0, 6),
    points: 0,
    streak: 0,
    weeklyRank: 999,
    missionsCompleted: 0,
    isVerified: false,
    joinedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    data: user,
  });
});

// POST /api/users/verify - Verify citizen
router.post("/verify", (req, res) => {
  const { walletAddress, citizenId, verificationData } = req.body;

  if (!walletAddress || !citizenId) {
    return res.status(400).json({
      success: false,
      error: "Wallet address and citizen ID are required",
    });
  }

  // In production, verify citizen ID against government database
  res.json({
    success: true,
    message: "Citizen verification successful",
    data: {
      walletAddress,
      citizenId,
      isVerified: true,
      verifiedAt: new Date().toISOString(),
    },
  });
});

// GET /api/users/:walletAddress/stats - Get user stats
router.get("/:walletAddress/stats", (req, res) => {
  const { walletAddress } = req.params;

  res.json({
    success: true,
    data: {
      yourPoints: 2450,
      currentStreak: 12,
      weeklyRank: 12,
      missionsCompleted: 24,
    },
  });
});

export default router;
