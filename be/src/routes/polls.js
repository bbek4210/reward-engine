import express from "express";
import PollVote from "../models/PollVote.js";
import PollComment from "../models/PollComment.js";
import User from "../models/User.js";

const router = express.Router();

// ─── Static poll catalogue (single source of truth) ─────────────────────────
const pollsData = [
  {
    id: "1",
    pid: 504,
    title: "Who should represent Jhapa-5?",
    question: "Who should represent Jhapa-5?",
    description:
      "Cast your vote for the representative of Jhapa-5 constituency in the upcoming elections.",
    category: "political",
    type: "referendum",
    status: "active",
    constituency: "JHAPA-5",
    country: "Nepal",
    bannerLabel: "JHAPA-5",
    creator: "@superteamnepal",
    createdAt: "6 days ago",
    endsAt: "2026-03-06",
    daysLeft: 4,
    totalVotes: 510,
    options: [
      {
        id: "o1",
        label: "Balen Shah",
        votes: 434,
        percentage: 85,
        color: "#E11D48",
      },
      {
        id: "o2",
        label: "K.P. Sharma Oli",
        votes: 51,
        percentage: 10,
        color: "#818CF8",
      },
      { id: "o3", label: "Others", votes: 25, percentage: 5, color: "#94A3B8" },
    ],
    trendData: [
      { date: "Feb 23", o1: 0, o2: 0, o3: 0 },
      { date: "Feb 24", o1: 72, o2: 18, o3: 10 },
      { date: "Feb 25", o1: 74, o2: 16, o3: 10 },
      { date: "Feb 26", o1: 76, o2: 14, o3: 10 },
      { date: "Feb 27", o1: 78, o2: 13, o3: 9 },
      { date: "Mar 1", o1: 82, o2: 11, o3: 7 },
      { date: "Mar 2", o1: 85, o2: 10, o3: 5 },
    ],
    comments: [
      {
        id: "c1",
        author: "Aayush Sharma",
        walletAddress: "aayush...7x3k",
        text: "Balen has done great work for Kathmandu. He deserves to represent Jhapa-5 as well!",
        likes: 14,
        createdAt: "2 days ago",
      },
      {
        id: "c2",
        author: "Priya Thapa",
        walletAddress: "priya...9m2s",
        text: "I think we need new leadership. The old parties have failed us repeatedly.",
        likes: 8,
        createdAt: "3 days ago",
      },
      {
        id: "c3",
        author: "Rajan K.",
        walletAddress: "rajan...4t5a",
        text: "Transparency and accountability should be the priority.",
        likes: 21,
        createdAt: "5 days ago",
      },
    ],
    rules: [
      "One vote per wallet address.",
      "Votes are final and cannot be changed.",
      "Results are publicly visible in real time.",
      "Earn 5 JMT points for casting your vote.",
      "Earn 2 JMT points for each comment.",
      "Share this poll to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 5,
    pointsForComment: 2,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "2",
    pid: 505,
    title: "Who should represent Gulmi-1?",
    question: "Who should represent Gulmi-1?",
    description:
      "Vote for the best candidate to represent Gulmi-1 in the upcoming elections.",
    category: "political",
    type: "candidate",
    status: "active",
    constituency: "GULMI-1",
    country: "Nepal",
    bannerLabel: "GULMI-1",
    creator: "@superteamnepal",
    createdAt: "6 days ago",
    endsAt: "2026-03-06",
    daysLeft: 4,
    totalVotes: 229,
    options: [
      {
        id: "o1",
        label: "Sagar Dhakal",
        votes: 215,
        percentage: 94,
        color: "#E11D48",
      },
      {
        id: "o2",
        label: "Pradeep Gyawali",
        votes: 7,
        percentage: 3,
        color: "#818CF8",
      },
      { id: "o3", label: "Others", votes: 7, percentage: 3, color: "#94A3B8" },
    ],
    trendData: [
      { date: "Feb 23", o1: 0, o2: 0, o3: 0 },
      { date: "Feb 24", o1: 88, o2: 7, o3: 5 },
      { date: "Feb 25", o1: 90, o2: 6, o3: 4 },
      { date: "Feb 26", o1: 91, o2: 5, o3: 4 },
      { date: "Feb 27", o1: 92, o2: 5, o3: 3 },
      { date: "Mar 1", o1: 93, o2: 4, o3: 3 },
      { date: "Mar 2", o1: 94, o2: 3, o3: 3 },
    ],
    comments: [
      {
        id: "c1",
        author: "Sunita Limbu",
        walletAddress: "suni...8b2c",
        text: "Sagar Dhakal has been working hard for our constituency. Clear choice!",
        likes: 18,
        createdAt: "1 day ago",
      },
    ],
    rules: [
      "One vote per wallet address.",
      "Results are publicly visible in real time.",
      "Earn 5 JMT points for casting your vote.",
      "Earn 2 JMT points for each comment.",
      "Share to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 5,
    pointsForComment: 2,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "3",
    pid: 506,
    title: "Who should represent Sarlahi-4?",
    question: "Who should represent Sarlahi-4?",
    description:
      "Vote for the best candidate to represent Sarlahi-4 in the upcoming elections.",
    category: "political",
    type: "candidate",
    status: "active",
    constituency: "SARLAHI-4",
    country: "Nepal",
    bannerLabel: "SARLAHI-4",
    creator: "@superteamnepal",
    createdAt: "6 days ago",
    endsAt: "2026-03-06",
    daysLeft: 4,
    totalVotes: 151,
    options: [
      {
        id: "o1",
        label: "Amaresh Kumar Singh",
        votes: 85,
        percentage: 56,
        color: "#E11D48",
      },
      {
        id: "o2",
        label: "Gagan Thapa",
        votes: 54,
        percentage: 36,
        color: "#818CF8",
      },
      { id: "o3", label: "Others", votes: 12, percentage: 8, color: "#94A3B8" },
    ],
    trendData: [
      { date: "Feb 23", o1: 0, o2: 0, o3: 0 },
      { date: "Feb 24", o1: 45, o2: 40, o3: 15 },
      { date: "Feb 25", o1: 48, o2: 40, o3: 12 },
      { date: "Feb 26", o1: 50, o2: 39, o3: 11 },
      { date: "Feb 27", o1: 53, o2: 37, o3: 10 },
      { date: "Mar 1", o1: 54, o2: 37, o3: 9 },
      { date: "Mar 2", o1: 56, o2: 36, o3: 8 },
    ],
    comments: [],
    rules: [
      "One vote per wallet address.",
      "Earn 5 JMT points for casting your vote.",
      "Share to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 5,
    pointsForComment: 2,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "4",
    pid: 507,
    title: "Who should represent Kathmandu-3?",
    question: "Who should represent Kathmandu-3?",
    description: "Vote for the best candidate to represent Kathmandu-3.",
    category: "political",
    type: "candidate",
    status: "active",
    constituency: "KATHMANDU-3",
    country: "Nepal",
    bannerLabel: "KATHMANDU-3",
    creator: "@superteamnepal",
    createdAt: "6 days ago",
    endsAt: "2026-03-06",
    daysLeft: 4,
    totalVotes: 102,
    options: [
      {
        id: "o1",
        label: "Kulman Ghising",
        votes: 77,
        percentage: 75,
        color: "#E11D48",
      },
      {
        id: "o2",
        label: "Rajunath Pandey",
        votes: 21,
        percentage: 21,
        color: "#818CF8",
      },
      { id: "o3", label: "Others", votes: 4, percentage: 4, color: "#94A3B8" },
    ],
    trendData: [
      { date: "Feb 23", o1: 0, o2: 0, o3: 0 },
      { date: "Feb 24", o1: 65, o2: 28, o3: 7 },
      { date: "Feb 25", o1: 68, o2: 26, o3: 6 },
      { date: "Feb 26", o1: 70, o2: 24, o3: 6 },
      { date: "Feb 27", o1: 72, o2: 23, o3: 5 },
      { date: "Mar 1", o1: 74, o2: 22, o3: 4 },
      { date: "Mar 2", o1: 75, o2: 21, o3: 4 },
    ],
    comments: [
      {
        id: "c1",
        author: "Kulman Fan",
        walletAddress: "kulm...3f5q",
        text: "Finally some real leadership in Kathmandu!",
        likes: 9,
        createdAt: "2 days ago",
      },
    ],
    rules: [
      "One vote per wallet address.",
      "Earn 5 JMT points for casting your vote.",
      "Share to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 5,
    pointsForComment: 2,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "5",
    pid: 508,
    title:
      "Should Butwal Kalika Campus make internal assessment marks fully transparent?",
    question:
      "Should Butwal Kalika Campus make internal assessment marks fully transparent?",
    description:
      "A poll to gauge public opinion on whether academic institutions should publish full internal marking breakdowns.",
    category: "education",
    type: "referendum",
    status: "active",
    constituency: "BUTWAL",
    country: "Nepal",
    bannerLabel: "EDUCATION",
    creator: "@superteamnepal",
    createdAt: "6 days ago",
    endsAt: "2026-03-10",
    daysLeft: 8,
    totalVotes: 98,
    options: [
      {
        id: "o1",
        label: "Publish full marking breakdown",
        votes: 62,
        percentage: 63,
        color: "#818CF8",
      },
      {
        id: "o2",
        label: "Show individual marks only",
        votes: 21,
        percentage: 21,
        color: "#FB923C",
      },
      {
        id: "o3",
        label: "Keep current system",
        votes: 15,
        percentage: 15,
        color: "#34D399",
      },
    ],
    trendData: [
      { date: "Feb 23", o1: 0, o2: 0, o3: 0 },
      { date: "Feb 24", o1: 72, o2: 25, o3: 3 },
      { date: "Feb 25", o1: 74, o2: 22, o3: 4 },
      { date: "Feb 26", o1: 74, o2: 21, o3: 5 },
      { date: "Feb 27", o1: 76, o2: 18, o3: 6 },
      { date: "Mar 1", o1: 65, o2: 20, o3: 15 },
      { date: "Mar 2", o1: 63, o2: 21, o3: 16 },
    ],
    comments: [
      {
        id: "c1",
        author: "Bikash Rai",
        walletAddress: "bika...9x2p",
        text: "Transparency is crucial for academic trust. Students deserve to know how they are evaluated!",
        likes: 12,
        createdAt: "4 days ago",
      },
      {
        id: "c2",
        author: "Anita Paudel",
        walletAddress: "anit...7k1m",
        text: "Some privacy in marking is also important. Full breakdown might cause unnecessary disputes.",
        likes: 7,
        createdAt: "5 days ago",
      },
      {
        id: "c3",
        author: "Hari Prasad",
        walletAddress: "hari...5n8j",
        text: "The current system is broken. We need full transparency to hold teachers accountable.",
        likes: 19,
        createdAt: "6 days ago",
      },
    ],
    rules: [
      "One vote per wallet address.",
      "Votes are final and cannot be changed.",
      "Results are publicly visible in real time.",
      "Earn 3 JMT points for casting your vote.",
      "Earn 1 JMT point for each accepted comment.",
      "Share this poll to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 3,
    pointsForComment: 1,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "6",
    pid: 509,
    title: "Should Kathmandu implement paid parking zones?",
    question:
      "Should Kathmandu implement paid parking zones in the city center?",
    description:
      "Help decide whether Kathmandu should introduce paid parking to reduce traffic congestion.",
    category: "infrastructure",
    type: "opinion",
    status: "active",
    constituency: "KATHMANDU",
    country: "Nepal",
    bannerLabel: "INFRASTRUCTURE",
    creator: "@janamatcivic",
    createdAt: "3 days ago",
    endsAt: "2026-03-09",
    daysLeft: 7,
    totalVotes: 203,
    options: [
      {
        id: "o1",
        label: "Yes, implement paid parking",
        votes: 122,
        percentage: 60,
        color: "#E11D48",
      },
      {
        id: "o2",
        label: "No, keep it free",
        votes: 61,
        percentage: 30,
        color: "#818CF8",
      },
      {
        id: "o3",
        label: "Hybrid model",
        votes: 20,
        percentage: 10,
        color: "#34D399",
      },
    ],
    trendData: [
      { date: "Feb 28", o1: 55, o2: 35, o3: 10 },
      { date: "Mar 1", o1: 57, o2: 33, o3: 10 },
      { date: "Mar 2", o1: 60, o2: 30, o3: 10 },
    ],
    comments: [],
    rules: [
      "One vote per wallet address.",
      "Earn 3 JMT points for casting your vote.",
      "Earn 1 JMT point for each comment.",
      "Share to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 3,
    pointsForComment: 1,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "7",
    pid: 510,
    title: "Best approach to manage Bagmati River pollution?",
    question: "What is the best approach to manage Bagmati River pollution?",
    description: "Vote on the best strategy to tackle Bagmati River pollution.",
    category: "environment",
    type: "survey",
    status: "active",
    constituency: "KATHMANDU",
    country: "Nepal",
    bannerLabel: "ENVIRONMENT",
    creator: "@greennepal",
    createdAt: "5 days ago",
    endsAt: "2026-03-12",
    daysLeft: 10,
    totalVotes: 318,
    options: [
      {
        id: "o1",
        label: "Industrial discharge ban",
        votes: 159,
        percentage: 50,
        color: "#34D399",
      },
      {
        id: "o2",
        label: "Community cleanup drives",
        votes: 96,
        percentage: 30,
        color: "#60A5FA",
      },
      {
        id: "o3",
        label: "Government-led restoration",
        votes: 63,
        percentage: 20,
        color: "#FBBF24",
      },
    ],
    trendData: [
      { date: "Feb 25", o1: 48, o2: 32, o3: 20 },
      { date: "Feb 26", o1: 49, o2: 31, o3: 20 },
      { date: "Feb 27", o1: 50, o2: 30, o3: 20 },
      { date: "Mar 1", o1: 50, o2: 30, o3: 20 },
      { date: "Mar 2", o1: 50, o2: 30, o3: 20 },
    ],
    comments: [],
    rules: [
      "One vote per wallet address.",
      "Earn 3 JMT points for casting your vote.",
      "Share to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 3,
    pointsForComment: 1,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
  {
    id: "8",
    pid: 511,
    title: "Should Nepal legalize cryptocurrency trading?",
    question: "Should Nepal legalize and regulate cryptocurrency trading?",
    description:
      "Share your opinion on legalizing and regulating cryptocurrency trading in Nepal.",
    category: "governance",
    type: "referendum",
    status: "active",
    constituency: "NATIONAL",
    country: "Nepal",
    bannerLabel: "GOVERNANCE",
    creator: "@cryptonepal",
    createdAt: "2 days ago",
    endsAt: "2026-03-15",
    daysLeft: 13,
    totalVotes: 512,
    options: [
      {
        id: "o1",
        label: "Yes, legalize & regulate",
        votes: 358,
        percentage: 70,
        color: "#818CF8",
      },
      {
        id: "o2",
        label: "No, keep current ban",
        votes: 77,
        percentage: 15,
        color: "#E11D48",
      },
      {
        id: "o3",
        label: "Study further first",
        votes: 77,
        percentage: 15,
        color: "#94A3B8",
      },
    ],
    trendData: [
      { date: "Mar 1", o1: 68, o2: 16, o3: 16 },
      { date: "Mar 2", o1: 70, o2: 15, o3: 15 },
    ],
    comments: [],
    rules: [
      "One vote per wallet address.",
      "Earn 4 JMT points for casting your vote.",
      "Earn 2 JMT points for each comment.",
      "Share to earn 0.01 SOL directly.",
    ],
    pointsForVoting: 4,
    pointsForComment: 2,
    pointsForShare: 0,
    solRewardForShare: 0.01,
  },
];

// GET /api/polls - List polls with optional filters
router.get("/", (req, res) => {
  const { category, status, constituency, sort } = req.query;
  let list = [...pollsData];
  if (category && category !== "all")
    list = list.filter((p) => p.category === category);
  if (status && status !== "all")
    list = list.filter((p) => p.status === status);
  if (constituency)
    list = list.filter(
      (p) => p.constituency.toLowerCase() === constituency.toLowerCase(),
    );
  if (sort === "newest") list.sort((a, b) => b.pid - a.pid);
  else list.sort((a, b) => b.totalVotes - a.totalVotes);
  res.json({ success: true, data: list, total: list.length });
});

// GET /api/polls/:id - Get single poll data (full details, no vote state)
router.get("/:pollId", (req, res) => {
  const poll = pollsData.find((p) => p.id === req.params.pollId);
  if (!poll)
    return res.status(404).json({ success: false, error: "Poll not found" });
  res.json({ success: true, data: poll });
});

// GET /api/polls/:pollId/state?wallet=... - Get vote + comments for a poll
// Returns the user's vote (if wallet provided) and all DB comments
router.get("/:pollId/state", async (req, res) => {
  try {
    const { pollId } = req.params;
    const { wallet } = req.query;

    // Aggregate vote counts per option
    const voteCounts = await PollVote.aggregate([
      { $match: { pollId } },
      { $group: { _id: "$optionId", count: { $sum: 1 } } },
    ]);
    const voteMap = {};
    for (const v of voteCounts) voteMap[v._id] = v.count;

    // User's own vote
    let userVote = null;
    if (wallet) {
      const vote = await PollVote.findOne({ pollId, walletAddress: wallet });
      if (vote) userVote = vote.optionId;
    }

    // All comments newest-first
    const comments = await PollComment.find({ pollId })
      .sort({ createdAt: -1 })
      .lean();

    const formattedComments = comments.map((c) => ({
      id: c._id.toString(),
      author: c.author,
      walletAddress: c.walletAddress,
      text: c.text,
      likes: c.likes,
      likedBy: c.likedBy,
      createdAt: new Date(c.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    res.json({
      success: true,
      data: {
        voteMap, // { [optionId]: count }
        userVote, // optionId or null
        comments: formattedComments,
      },
    });
  } catch (error) {
    console.error("Poll state error:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch poll state" });
  }
});

// POST /api/polls/:pollId/vote - Cast a vote
router.post("/:pollId/vote", async (req, res) => {
  try {
    const { pollId } = req.params;
    const { walletAddress, optionId, points } = req.body;

    if (!walletAddress || !optionId) {
      return res
        .status(400)
        .json({ success: false, error: "walletAddress and optionId required" });
    }

    // Check already voted
    const existing = await PollVote.findOne({ pollId, walletAddress });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, error: "Already voted on this poll" });
    }

    await PollVote.create({ pollId, walletAddress, optionId });

    // Award points
    if (points && typeof points === "number" && points > 0) {
      await User.findOneAndUpdate(
        { walletAddress },
        { $inc: { points }, $set: { lastActiveAt: new Date() } },
        { upsert: true },
      );
    }

    // Return new vote counts
    const voteCounts = await PollVote.aggregate([
      { $match: { pollId } },
      { $group: { _id: "$optionId", count: { $sum: 1 } } },
    ]);
    const voteMap = {};
    for (const v of voteCounts) voteMap[v._id] = v.count;

    res.json({ success: true, data: { optionId, voteMap } });
  } catch (error) {
    console.error("Vote error:", error);
    res.status(500).json({ success: false, error: "Failed to cast vote" });
  }
});

// POST /api/polls/:pollId/comments - Add a comment
router.post("/:pollId/comments", async (req, res) => {
  try {
    const { pollId } = req.params;
    const { walletAddress, author, text, points } = req.body;

    if (!walletAddress || !text?.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "walletAddress and text required" });
    }

    // Enforce one comment per wallet per poll
    const existing = await PollComment.findOne({ pollId, walletAddress });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: "You have already commented on this poll",
      });
    }

    const comment = await PollComment.create({
      pollId,
      walletAddress,
      author:
        author || `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
      text: text.trim(),
    });

    // Award points
    if (points && typeof points === "number" && points > 0) {
      await User.findOneAndUpdate(
        { walletAddress },
        { $inc: { points }, $set: { lastActiveAt: new Date() } },
        { upsert: true },
      );
    }

    res.json({
      success: true,
      data: {
        id: comment._id.toString(),
        author: comment.author,
        walletAddress: comment.walletAddress,
        text: comment.text,
        likes: 0,
        likedBy: [],
        createdAt: "Just now",
      },
    });
  } catch (error) {
    console.error("Comment error:", error);
    res.status(500).json({ success: false, error: "Failed to add comment" });
  }
});

// POST /api/polls/:pollId/comments/:commentId/like - Toggle like on a comment
router.post("/:pollId/comments/:commentId/like", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res
        .status(400)
        .json({ success: false, error: "walletAddress required" });
    }

    const comment = await PollComment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, error: "Comment not found" });
    }

    const alreadyLiked = comment.likedBy.includes(walletAddress);
    if (alreadyLiked) {
      comment.likedBy = comment.likedBy.filter((w) => w !== walletAddress);
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      comment.likedBy.push(walletAddress);
      comment.likes += 1;
    }
    await comment.save();

    res.json({
      success: true,
      data: { liked: !alreadyLiked, likes: comment.likes },
    });
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ success: false, error: "Failed to toggle like" });
  }
});

export default router;
