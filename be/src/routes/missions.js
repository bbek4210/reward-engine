import express from "express";

const router = express.Router();

/**
 * Mock mission data
 * In production, this would come from a database
 */
const mockMissions = [
  {
    id: "1",
    title: "Healthcare Accessibility Survey",
    description:
      "Help us understand healthcare access in your area. Share your experience with local health facilities and suggest improvements.",
    constituency: "KATHMANDU-3",
    category: "health",
    status: "active",
    country: "Nepal",
    bannerColor: "#FFE4E6",
    startDate: new Date("2026-03-01"),
    totalParticipants: 342,
    isFeatured: true,
    actions: [
      {
        id: "a1",
        type: "vote",
        label: "Vote on Priority Areas",
        points: 150,
        icon: "🗳️",
      },
      {
        id: "a2",
        type: "comment",
        label: "Share Your Experience",
        points: 50,
        icon: "💬",
      },
      {
        id: "a3",
        type: "proposal",
        label: "Submit Improvement Proposal",
        points: 100,
        icon: "📝",
      },
      {
        id: "a4",
        type: "upload",
        label: "Upload Photo Evidence",
        points: 75,
        icon: "📸",
      },
    ],
  },
  // Add more missions...
];

// GET /api/missions - Get all missions
router.get("/", (req, res) => {
  const { category, constituency, status, featured } = req.query;

  let filteredMissions = [...mockMissions];

  if (category) {
    filteredMissions = filteredMissions.filter((m) => m.category === category);
  }
  if (constituency) {
    filteredMissions = filteredMissions.filter(
      (m) => m.constituency === constituency,
    );
  }
  if (status) {
    filteredMissions = filteredMissions.filter((m) => m.status === status);
  }
  if (featured === "true") {
    filteredMissions = filteredMissions.filter((m) => m.isFeatured);
  }

  res.json({
    success: true,
    data: filteredMissions,
    total: filteredMissions.length,
  });
});

// GET /api/missions/:id - Get single mission
router.get("/:id", (req, res) => {
  const mission = mockMissions.find((m) => m.id === req.params.id);

  if (!mission) {
    return res.status(404).json({
      success: false,
      error: "Mission not found",
    });
  }

  res.json({
    success: true,
    data: mission,
  });
});

// POST /api/missions/:id/start - Start a mission
router.post("/:id/start", (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({
      success: false,
      error: "Wallet address is required",
    });
  }

  const mission = mockMissions.find((m) => m.id === req.params.id);

  if (!mission) {
    return res.status(404).json({
      success: false,
      error: "Mission not found",
    });
  }

  // In production, record mission start in database
  res.json({
    success: true,
    message: "Mission started successfully",
    data: {
      missionId: mission.id,
      walletAddress,
      startedAt: new Date().toISOString(),
    },
  });
});

// POST /api/missions/:id/complete - Complete a mission action
router.post("/:id/complete", (req, res) => {
  const { walletAddress, actionId } = req.body;

  if (!walletAddress || !actionId) {
    return res.status(400).json({
      success: false,
      error: "Wallet address and action ID are required",
    });
  }

  const mission = mockMissions.find((m) => m.id === req.params.id);

  if (!mission) {
    return res.status(404).json({
      success: false,
      error: "Mission not found",
    });
  }

  const action = mission.actions.find((a) => a.id === actionId);

  if (!action) {
    return res.status(404).json({
      success: false,
      error: "Action not found",
    });
  }

  // In production, record completion and award points via Solana transaction
  res.json({
    success: true,
    message: "Action completed successfully",
    data: {
      missionId: mission.id,
      actionId: action.id,
      pointsEarned: action.points,
      completedAt: new Date().toISOString(),
    },
  });
});

export default router;
