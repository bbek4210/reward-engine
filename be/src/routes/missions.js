import express from "express";

const router = express.Router();

// ─── All civic engagement missions ───────────────────────────────────────────
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
    startDate: "2026-03-01",
    totalParticipants: 342,
    isFeatured: true,
    actions: [
      {
        id: "a1",
        type: "vote",
        label: "Vote on Priority Areas",
        points: 3,
        icon: "🗳️",
      },
      {
        id: "a2",
        type: "comment",
        label: "Share Your Experience",
        points: 2,
        icon: "💬",
      },
      {
        id: "a3",
        type: "proposal",
        label: "Submit Improvement Proposal",
        points: 5,
        icon: "📝",
      },
      {
        id: "a4",
        type: "upload",
        label: "Upload Photo Evidence",
        points: 4,
        icon: "📸",
      },
    ],
  },
  {
    id: "2",
    title: "Road Infrastructure Assessment",
    description:
      "Document road conditions and safety issues in your neighborhood. Your input will help prioritize infrastructure repairs.",
    constituency: "LALITPUR-2",
    category: "infrastructure",
    status: "active",
    country: "Nepal",
    bannerColor: "#FEF3C7",
    startDate: "2026-02-28",
    totalParticipants: 218,
    isFeatured: true,
    actions: [
      {
        id: "b1",
        type: "upload",
        label: "Report Road Issue",
        points: 4,
        icon: "📸",
      },
      {
        id: "b2",
        type: "vote",
        label: "Vote on Priority Roads",
        points: 3,
        icon: "🗳️",
      },
      {
        id: "b3",
        type: "comment",
        label: "Add Comments",
        points: 2,
        icon: "💬",
      },
      {
        id: "b4",
        type: "share",
        label: "Share with Community",
        points: 0,
        solReward: 0.01,
        icon: "🔗",
      },
    ],
  },
  {
    id: "3",
    title: "School Quality Feedback",
    description:
      "Rate your experience with local schools. Help improve education quality through community feedback and suggestions.",
    constituency: "BHAKTAPUR-1",
    category: "education",
    status: "active",
    country: "Nepal",
    bannerColor: "#EEF2FF",
    startDate: "2026-02-25",
    totalParticipants: 156,
    isFeatured: false,
    actions: [
      {
        id: "c1",
        type: "survey",
        label: "Complete Survey",
        points: 6,
        icon: "📊",
      },
      {
        id: "c2",
        type: "comment",
        label: "Provide Feedback",
        points: 2,
        icon: "💬",
      },
      {
        id: "c3",
        type: "proposal",
        label: "Suggest Improvements",
        points: 5,
        icon: "📝",
      },
      {
        id: "c4",
        type: "share",
        label: "Invite Parents",
        points: 0,
        solReward: 0.01,
        icon: "🔗",
      },
    ],
  },
  {
    id: "4",
    title: "Waste Management Initiative",
    description:
      "Join the effort to improve waste collection and recycling in your area. Track waste disposal issues and suggest solutions.",
    constituency: "KATHMANDU-3",
    category: "environment",
    status: "active",
    country: "Nepal",
    bannerColor: "#DCFCE7",
    startDate: "2026-02-20",
    totalParticipants: 289,
    isFeatured: false,
    actions: [
      {
        id: "d1",
        type: "upload",
        label: "Report Waste Issue",
        points: 4,
        icon: "📸",
      },
      {
        id: "d2",
        type: "vote",
        label: "Vote on Solutions",
        points: 3,
        icon: "🗳️",
      },
      {
        id: "d3",
        type: "proposal",
        label: "Propose New Collection Point",
        points: 5,
        icon: "📝",
      },
      {
        id: "d4",
        type: "comment",
        label: "Share Ideas",
        points: 2,
        icon: "💬",
      },
    ],
  },
  {
    id: "5",
    title: "Budget Transparency Review",
    description:
      "Review and comment on local budget allocations. Help ensure transparent and accountable use of public funds.",
    constituency: "POKHARA-1",
    category: "governance",
    status: "active",
    country: "Nepal",
    bannerColor: "#F3E8FF",
    startDate: "2026-02-15",
    totalParticipants: 412,
    isFeatured: false,
    actions: [
      {
        id: "e1",
        type: "vote",
        label: "Vote on Budget Priorities",
        points: 3,
        icon: "🗳️",
      },
      {
        id: "e2",
        type: "comment",
        label: "Add Comments",
        points: 2,
        icon: "💬",
      },
      {
        id: "e3",
        type: "proposal",
        label: "Suggest Allocation Changes",
        points: 5,
        icon: "📝",
      },
    ],
  },
  {
    id: "6",
    title: "Community Park Development",
    description:
      "Share your ideas for the new community park. Vote on features and help design a space for everyone to enjoy.",
    constituency: "LALITPUR-2",
    category: "social",
    status: "active",
    country: "Nepal",
    bannerColor: "#FFE4E6",
    startDate: "2026-02-10",
    totalParticipants: 195,
    isFeatured: false,
    actions: [
      {
        id: "f1",
        type: "vote",
        label: "Vote on Park Features",
        points: 3,
        icon: "🗳️",
      },
      {
        id: "f2",
        type: "proposal",
        label: "Submit Design Ideas",
        points: 5,
        icon: "📝",
      },
      {
        id: "f3",
        type: "comment",
        label: "Discuss with Community",
        points: 2,
        icon: "💬",
      },
      {
        id: "f4",
        type: "share",
        label: "Share Survey",
        points: 0,
        solReward: 0.01,
        icon: "🔗",
      },
    ],
  },
];

// ─── Recurring gamification tasks shown on the dashboard ─────────────────────
const activeTasks = [
  {
    id: "1",
    title: "Weekly Voter Participation",
    difficulty: "MEDIUM",
    resetTime: "in 3 days",
    progress: { current: 0, total: 5, percentage: 0 },
    points: 8,
    recurring: "weekly",
    route: "/polls",
    actions: [
      {
        id: "t1-a1",
        type: "vote",
        label: "Vote on Priority Issues",
        points: 3,
        icon: "🗳️",
      },
      {
        id: "t1-a2",
        type: "comment",
        label: "Share Your Opinion",
        points: 2,
        icon: "💬",
      },
    ],
  },
  {
    id: "2",
    title: "Community Referral Milestone",
    difficulty: "HIGH IMPACT",
    resetTime: "Monthly",
    progress: { current: 0, total: 10, percentage: 0 },
    points: 20,
    recurring: "monthly",
    route: "/referral",
    actions: [
      {
        id: "t2-a1",
        type: "referral",
        label: "Refer a Friend",
        points: 5,
        icon: "🔗",
      },
    ],
  },
  {
    id: "3",
    title: "Daily Opinion Pulse",
    difficulty: "EASY",
    resetTime: "daily",
    progress: { current: 0, total: 1, percentage: 0 },
    points: 2,
    recurring: "daily",
    route: "/polls",
    actions: [
      {
        id: "t3-a1",
        type: "vote",
        label: "Cast Your Daily Vote",
        points: 2,
        icon: "🗳️",
      },
    ],
  },
  {
    id: "4",
    title: "Monthly Health Survey",
    difficulty: "MEDIUM",
    resetTime: "in 15 days",
    progress: { current: 0, total: 3, percentage: 0 },
    points: 10,
    recurring: "monthly",
    route: "/polls",
    actions: [
      {
        id: "t4-a1",
        type: "survey",
        label: "Complete Health Survey",
        points: 6,
        icon: "📊",
      },
      {
        id: "t4-a2",
        type: "comment",
        label: "Share Feedback",
        points: 2,
        icon: "💬",
      },
      {
        id: "t4-a3",
        type: "proposal",
        label: "Submit Proposal",
        points: 5,
        icon: "📝",
      },
    ],
  },
];

// Derive available filter options from data
const constituencies = [...new Set(mockMissions.map((m) => m.constituency))];
const categories = [...new Set(mockMissions.map((m) => m.category))];

// GET /api/missions/tasks - Recurring dashboard gamification tasks
router.get("/tasks", (req, res) => {
  res.json({ success: true, data: activeTasks, total: activeTasks.length });
});

// GET /api/missions/meta - Available filter options derived from data
router.get("/meta", (req, res) => {
  res.json({ success: true, data: { constituencies, categories } });
});

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
