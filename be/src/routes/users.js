import express from "express";
import User from "../models/User.js";
import Referral from "../models/Referral.js";

const router = express.Router();

// GET /api/users/:walletAddress - Get or create user profile
router.get("/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;

    let user = await User.findOne({ walletAddress });

    if (!user) {
      // Auto-create on first visit
      user = await User.create({
        walletAddress,
        username: walletAddress.slice(0, 6),
      });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch user" });
  }
});

// PUT /api/users/:walletAddress - Update user profile
router.put("/:walletAddress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const updates = req.body;

    const allowed = [
      "username",
      "points",
      "streak",
      "weeklyRank",
      "missionsCompleted",
      "isVerified",
      "constituency",
      "lastActiveAt",
    ];
    const sanitized = {};
    for (const key of allowed) {
      if (updates[key] !== undefined) sanitized[key] = updates[key];
    }

    const user = await User.findOneAndUpdate(
      { walletAddress },
      { $set: sanitized },
      { new: true, upsert: true },
    );

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, error: "Failed to update user" });
  }
});

// POST /api/users/:walletAddress/add-points
router.post("/:walletAddress/add-points", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return res
        .status(400)
        .json({ success: false, error: "amount must be a number" });
    }

    const user = await User.findOneAndUpdate(
      { walletAddress },
      { $inc: { points: amount }, $set: { lastActiveAt: new Date() } },
      { new: true, upsert: true },
    );

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Add points error:", error);
    res.status(500).json({ success: false, error: "Failed to add points" });
  }
});

// POST /api/users/:walletAddress/deduct-points
router.post("/:walletAddress/deduct-points", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return res
        .status(400)
        .json({ success: false, error: "amount must be a number" });
    }

    const user = await User.findOne({ walletAddress });
    if (!user || user.points < amount) {
      return res
        .status(400)
        .json({ success: false, error: "Insufficient points" });
    }

    user.points -= amount;
    await user.save();

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Deduct points error:", error);
    res.status(500).json({ success: false, error: "Failed to deduct points" });
  }
});

// POST /api/users/:walletAddress/mission-progress
router.post("/:walletAddress/mission-progress", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const { missionId } = req.body;

    if (!missionId) {
      return res
        .status(400)
        .json({ success: false, error: "missionId is required" });
    }

    const user = await User.findOneAndUpdate(
      { walletAddress },
      { $inc: { [`missionProgress.${missionId}`]: 1 } },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      data: { missionId, count: user.missionProgress.get(missionId) || 0 },
    });
  } catch (error) {
    console.error("Mission progress error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update mission progress" });
  }
});

// GET /api/users/:walletAddress/stats
router.get("/:walletAddress/stats", async (req, res) => {
  try {
    const { walletAddress } = req.params;

    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.json({
        success: true,
        data: {
          yourPoints: 0,
          currentStreak: 0,
          weeklyRank: 999,
          missionsCompleted: 0,
          missionProgress: {},
        },
      });
    }

    res.json({
      success: true,
      data: {
        yourPoints: user.points,
        currentStreak: user.streak,
        weeklyRank: user.weeklyRank,
        missionsCompleted: user.missionsCompleted,
        missionProgress: Object.fromEntries(user.missionProgress),
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch stats" });
  }
});

// POST /api/users/verify
router.post("/verify", async (req, res) => {
  try {
    const { walletAddress, citizenId } = req.body;

    if (!walletAddress || !citizenId) {
      return res.status(400).json({
        success: false,
        error: "Wallet address and citizen ID are required",
      });
    }

    const user = await User.findOneAndUpdate(
      { walletAddress },
      { $set: { isVerified: true } },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Citizen verification successful",
      data: user,
    });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ success: false, error: "Failed to verify citizen" });
  }
});

// GET /api/users/:walletAddress/referrals - Get referrals made by this user
router.get("/:walletAddress/referrals", async (req, res) => {
  try {
    const { walletAddress } = req.params;
    const referralCode = `JMT-${walletAddress.slice(2, 8).toUpperCase()}`;
    const referrals = await Referral.find({ referralCode })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ success: true, data: referrals });
  } catch (error) {
    console.error("Get referrals error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch referrals" });
  }
});

// POST /api/users/referral - Record a new referral (called when referee signs up)
router.post("/referral", async (req, res) => {
  try {
    const { referralCode, refereeAddress } = req.body;
    if (!referralCode || !refereeAddress) {
      return res
        .status(400)
        .json({
          success: false,
          error: "referralCode and refereeAddress required",
        });
    }

    // Prevent self-referral or duplicate
    const existing = await Referral.findOne({ referralCode, refereeAddress });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, error: "Referral already recorded" });
    }

    // Determine referrer wallet from code (JMT-XXXXXX → first 6 hex chars after '0x')
    const referral = await Referral.create({
      referrerAddress: "unknown", // will be resolved by the frontend/backend later
      refereeAddress,
      referralCode,
      status: "pending",
    });

    res.json({ success: true, data: referral });
  } catch (error) {
    console.error("Create referral error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to record referral" });
  }
});

// POST /api/users/referral/complete - Mark a referral as completed (after first vote)
router.post("/referral/complete", async (req, res) => {
  try {
    const { refereeAddress, referrerAddress, referralCode } = req.body;
    if (!refereeAddress || !referralCode) {
      return res
        .status(400)
        .json({
          success: false,
          error: "refereeAddress and referralCode required",
        });
    }

    const REFERRER_REWARD = 5;
    const REFEREE_REWARD = 2;

    const referral = await Referral.findOneAndUpdate(
      { referralCode, refereeAddress, status: "pending" },
      {
        $set: {
          status: "completed",
          completedAt: new Date(),
          pointsEarned: REFERRER_REWARD,
          referrerAddress,
        },
      },
      { new: true },
    );

    if (!referral) {
      return res
        .status(404)
        .json({ success: false, error: "Pending referral not found" });
    }

    // Award points to referrer
    if (referrerAddress) {
      await User.findOneAndUpdate(
        { walletAddress: referrerAddress },
        { $inc: { points: REFERRER_REWARD } },
        { upsert: true },
      );
    }
    // Award welcome bonus to referee
    await User.findOneAndUpdate(
      { walletAddress: refereeAddress },
      { $inc: { points: REFEREE_REWARD } },
      { upsert: true },
    );

    res.json({ success: true, data: referral });
  } catch (error) {
    console.error("Complete referral error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to complete referral" });
  }
});

export default router;
