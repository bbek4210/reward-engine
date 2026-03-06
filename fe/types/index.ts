// Core type definitions for Janamat Rewards

export interface Mission {
    id: string;
    title: string;
    description: string;
    constituency: string;
    category: MissionCategory;
    status: 'active' | 'upcoming' | 'completed';
    country: string;
    bannerColor: string;
    actions: MissionAction[];
    startDate: Date;
    endDate?: Date;
    totalParticipants: number;
    isFeatured?: boolean;
}

export interface MissionAction {
    id: string;
    type: 'vote' | 'comment' | 'proposal' | 'upload' | 'share' | 'survey' | 'referral';
    label: string;
    points: number;
    solReward?: number;   // direct SOL reward (e.g. 0.01 SOL for share actions)
    icon: string;
    completed?: boolean;
}

export type MissionCategory =
    | 'health'
    | 'education'
    | 'infrastructure'
    | 'environment'
    | 'governance'
    | 'social';

export interface User {
    id: string;
    walletAddress: string;
    citizenId?: string;
    username: string;
    displayName: string;
    avatar?: string;
    points: number;
    streak: number;
    weeklyRank: number;
    missionsCompleted: number;
    badges: Badge[];
    isVerified: boolean;
    joinedAt: Date;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    earnedAt: Date;
}

export interface LeaderboardEntry {
    rank: number;
    id: string;
    name: string;
    handle?: string;
    avatar?: string;
    points: number;
    change?: number; // rank change from previous period
    progress?: number; // 0-100 for visual progress bar
}

export interface ConstituencyLeaderboard extends LeaderboardEntry {
    type: 'constituency';
    missionsCount: number;
    topContributor?: string;
}

export interface CitizenLeaderboard extends LeaderboardEntry {
    type: 'citizen';
    constituency: string;
    streakDays: number;
    walletAddress?: string;
}

export interface Stats {
    yourPoints: number;
    currentStreak: number;
    weeklyRank: number;
    missionsCompleted: number;
}

export interface ConstituencySpotlight {
    constituency: string;
    pointsThisWeek: number;
    topContributor: string;
    activeUsers: number;
    activeMissions: number;
}

export type TimeFilter = 'weekly' | 'monthly' | 'all-time';
export type TabType = 'trending' | 'new' | 'constituencies' | 'categories' | 'all';

// Poll types
export type PollCategory = 'political' | 'education' | 'health' | 'environment' | 'governance' | 'social' | 'infrastructure' | 'other';
export type PollStatus = 'active' | 'closed' | 'upcoming' | 'inactive';
export type PollType = 'candidate' | 'referendum' | 'survey' | 'opinion';

export interface PollOption {
    id: string;
    label: string;
    votes: number;
    percentage: number;
    color?: string;
    image?: string;
}

export interface PollComment {
    id: string;
    author: string;
    avatar?: string;
    walletAddress: string;
    text: string;
    likes: number;
    createdAt: string;
    isLiked?: boolean;
}

export interface PollTrendPoint {
    date: string;
    [optionId: string]: number | string;
}

export interface Poll {
    id: string;
    pid: number;
    title: string;
    question: string;
    description?: string;
    category: PollCategory;
    type: PollType;
    status: PollStatus;
    constituency: string;
    country: string;
    bannerImage?: string;
    bannerLabel?: string;
    creator: string;
    createdAt: string;
    endsAt: string;
    daysLeft: number;
    totalVotes: number;
    options: PollOption[];
    comments: PollComment[];
    trendData: PollTrendPoint[];
    rules: string[];
    pointsForVoting: number;
    pointsForComment: number;
    pointsForShare: number;
    solRewardForShare?: number;  // direct SOL reward for sharing (e.g. 0.01)
}

// Referral types
export interface Referral {
    id: string;
    referrerAddress: string;
    refereeAddress?: string;
    referralCode: string;
    status: 'pending' | 'completed';
    pointsEarned: number;
    createdAt: string;
    completedAt?: string;
}

// Wallet types
export interface WalletState {
    connected: boolean;
    address: string | null;
    balance: number;
    provider: 'phantom' | 'solflare' | null;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
