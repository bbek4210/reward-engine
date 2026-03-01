import express from "express";

const router = express.Router();

// Mock leaderboard data
const mockConstituencies = [
  {
    rank: 1,
    id: "1",
    name: "Kathmandu-3",
    points: 5842,
    missionsCount: 8,
    type: "constituency",
    progress: 100,
  },
  {
    rank: 2,
    id: "2",
    name: "Lalitpur-2",
    points: 4521,
    missionsCount: 6,
    type: "constituency",
    progress: 77,
  },
  {
    rank: 3,
    id: "3",
    name: "Bhaktapur-1",
    points: 3890,
    missionsCount: 5,
    type: "constituency",
    progress: 67,
  },
  // Add more...
];

const mockCitizens = [
  {
    rank: 1,
    id: "1",
    name: "Aayush Sharma",
    handle: "aayush",
    points: 2450,
    constituency: "Kathmandu-3",
    type: "citizen",
    streakDays: 15,
    progress: 100,
  },
  {
    rank: 2,
    id: "2",
    name: "Priya Thapa",
    handle: "priyat",
    points: 2210,
    constituency: "Lalitpur-2",
    type: "citizen",
    streakDays: 12,
    progress: 90,
  },
  // Add more...
];

// GET /api/leaderboard/constituencies - Get constituency leaderboard
router.get("/constituencies", (req, res) => {
  const { period = "weekly", limit = 10 } = req.query;

  res.json({
    success: true,
    data: mockConstituencies.slice(0, parseInt(limit)),
    period,
    total: mockConstituencies.length,
  });
});

// GET /api/leaderboard/citizens - Get citizen leaderboard
router.get("/citizens", (req, res) => {
  const { period = "weekly", limit = 10, constituency } = req.query;

  let filteredCitizens = [...mockCitizens];

  if (constituency) {
    filteredCitizens = filteredCitizens.filter(
      (c) => c.constituency === constituency,
    );
  }

  res.json({
    success: true,
    data: filteredCitizens.slice(0, parseInt(limit)),
    period,
    total: filteredCitizens.length,
  });
});

// GET /api/leaderboard/spotlight - Get constituency spotlight
router.get("/spotlight", (req, res) => {
  res.json({
    success: true,
    data: {
      constituency: "KATHMANDU-3",
      pointsThisWeek: 5842,
      topContributor: "Aayush",
      activeUsers: 342,
      activeMissions: 8,
    },
  });
});

export default router;
