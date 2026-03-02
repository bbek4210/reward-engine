import express from "express";

const router = express.Router();

// ─── Constituency leaderboard data ───────────────────────────────────────────
const mockConstituencies = [
  { rank: 1, id: "1", name: "Kathmandu-3", points: 5842, missionsCount: 8, type: "constituency", progress: 100 },
  { rank: 2, id: "2", name: "Lalitpur-2", points: 4521, missionsCount: 6, type: "constituency", progress: 77 },
  { rank: 3, id: "3", name: "Bhaktapur-1", points: 3890, missionsCount: 5, type: "constituency", progress: 67 },
  { rank: 4, id: "4", name: "Pokhara-1", points: 3412, missionsCount: 5, type: "constituency", progress: 58 },
  { rank: 5, id: "5", name: "Butwal",     points: 2988, missionsCount: 4, type: "constituency", progress: 51 },
  { rank: 6, id: "6", name: "Sarlahi-4", points: 2641, missionsCount: 4, type: "constituency", progress: 45 },
  { rank: 7, id: "7", name: "Gulmi-1",   points: 2310, missionsCount: 3, type: "constituency", progress: 40 },
  { rank: 8, id: "8", name: "Jhapa-5",   points: 1970, missionsCount: 3, type: "constituency", progress: 34 },
  { rank: 9, id: "9", name: "Chitwan-2", points: 1680, missionsCount: 2, type: "constituency", progress: 29 },
  { rank: 10, id: "10", name: "Sunsari-1", points: 1320, missionsCount: 2, type: "constituency", progress: 23 },
];

// ─── Citizen leaderboard data ─────────────────────────────────────────────────
const mockCitizens = [
  { rank: 1,  id: "1",  name: "Aayush Sharma",  handle: "aayush",  points: 2450, constituency: "Kathmandu-3", type: "citizen", streakDays: 15, progress: 100 },
  { rank: 2,  id: "2",  name: "Priya Thapa",     handle: "priyat",  points: 2210, constituency: "Lalitpur-2",  type: "citizen", streakDays: 12, progress: 90  },
  { rank: 3,  id: "3",  name: "Rajan Karki",     handle: "rajanK",  points: 2090, constituency: "Bhaktapur-1", type: "citizen", streakDays: 10, progress: 85  },
  { rank: 4,  id: "4",  name: "Sunita Limbu",    handle: "sunita",  points: 1870, constituency: "Pokhara-1",   type: "citizen", streakDays: 9,  progress: 76  },
  { rank: 5,  id: "5",  name: "Bikash Rai",      handle: "bikash",  points: 1740, constituency: "Butwal",      type: "citizen", streakDays: 8,  progress: 71  },
  { rank: 6,  id: "6",  name: "Anita Paudel",    handle: "anitap",  points: 1610, constituency: "Kathmandu-3", type: "citizen", streakDays: 7,  progress: 66  },
  { rank: 7,  id: "7",  name: "Hari Prasad",     handle: "harip",   points: 1520, constituency: "Sarlahi-4",   type: "citizen", streakDays: 7,  progress: 62  },
  { rank: 8,  id: "8",  name: "Kulman Fan",      handle: "kulman",  points: 1380, constituency: "Kathmandu-3", type: "citizen", streakDays: 6,  progress: 56  },
  { rank: 9,  id: "9",  name: "Sagar Thapa",     handle: "sagart",  points: 1240, constituency: "Gulmi-1",     type: "citizen", streakDays: 5,  progress: 51  },
  { rank: 10, id: "10", name: "Meena Shrestha",  handle: "meenas",  points: 1120, constituency: "Jhapa-5",     type: "citizen", streakDays: 4,  progress: 46  },
  { rank: 11, id: "11", name: "Dipesh Gurung",   handle: "dipesh",  points: 1010, constituency: "Chitwan-2",   type: "citizen", streakDays: 3,  progress: 41  },
  { rank: 12, id: "12", name: "Nisha Tamang",    handle: "nishat",  points:  920, constituency: "Sunsari-1",   type: "citizen", streakDays: 3,  progress: 38  },
];



// GET /api/leaderboard/constituencies - Get constituency leaderboard
router.get("/constituencies", (req, res) => {
  const { timeFilter = "weekly", limit = 10 } = req.query;

  res.json({
    success: true,
    data: mockConstituencies.slice(0, parseInt(limit)),
    timeFilter,
    total: mockConstituencies.length,
  });
});

// GET /api/leaderboard/citizens - Get citizen leaderboard
router.get("/citizens", (req, res) => {
  const { timeFilter = "weekly", limit = 10, constituency } = req.query;

  let filteredCitizens = [...mockCitizens];

  if (constituency) {
    filteredCitizens = filteredCitizens.filter(
      (c) => c.constituency === constituency,
    );
  }

  res.json({
    success: true,
    data: filteredCitizens.slice(0, parseInt(limit)),
    timeFilter,
    total: filteredCitizens.length,
  });
});

// GET /api/leaderboard/spotlight - Get constituency spotlight (top ranked)
router.get("/spotlight", (req, res) => {
  const top = mockConstituencies[0];
  const topCitizen = mockCitizens.find((c) => c.constituency === top.name);
  res.json({
    success: true,
    data: {
      constituency: top.name.toUpperCase(),
      pointsThisWeek: top.points,
      topContributor: topCitizen?.handle || topCitizen?.name.split(" ")[0] || "Anonymous",
      activeUsers: Math.floor(top.points / 15),
      activeMissions: top.missionsCount,
    },
  });
});

export default router;
