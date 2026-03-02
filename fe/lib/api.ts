// API configuration and utility functions
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Generic fetch wrapper
async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "An error occurred",
            };
        }

        return {
            success: true,
            data: data.data || data,
        };
    } catch (error) {
        console.error("API Error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}

// Mission APIs
export const missionApi = {
    getAll: async (filters?: { status?: string; constituency?: string; category?: string }) => {
        const params = new URLSearchParams();
        if (filters?.status) params.append("status", filters.status);
        if (filters?.constituency) params.append("constituency", filters.constituency);
        if (filters?.category) params.append("category", filters.category);
        const query = params.toString();
        return apiFetch(`/missions${query ? `?${query}` : ""}`);
    },

    getById: async (id: string) => {
        return apiFetch(`/missions/${id}`);
    },

    // Recurring gamification tasks shown on the dashboard
    getTasks: async () => {
        return apiFetch("/missions/tasks");
    },

    // Filter option metadata (constituencies, categories)
    getMeta: async () => {
        return apiFetch("/missions/meta");
    },

    completeAction: async (missionId: string, actionId: string, walletAddress: string) => {
        return apiFetch(`/missions/${missionId}/actions/${actionId}`, {
            method: "POST",
            body: JSON.stringify({ walletAddress }),
        });
    },
};

// User APIs
export const userApi = {
    getProfile: async (walletAddress: string) => {
        return apiFetch(`/users/${walletAddress}`);
    },

    getStats: async (walletAddress: string) => {
        return apiFetch(`/users/${walletAddress}/stats`);
    },

    verify: async (walletAddress: string, citizenId: string) => {
        return apiFetch("/users/verify", {
            method: "POST",
            body: JSON.stringify({ walletAddress, citizenId }),
        });
    },

    updateProfile: async (walletAddress: string, data: Record<string, unknown>) => {
        return apiFetch(`/users/${walletAddress}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    addPoints: async (walletAddress: string, amount: number) => {
        return apiFetch(`/users/${walletAddress}/add-points`, {
            method: "POST",
            body: JSON.stringify({ amount }),
        });
    },

    deductPoints: async (walletAddress: string, amount: number) => {
        return apiFetch(`/users/${walletAddress}/deduct-points`, {
            method: "POST",
            body: JSON.stringify({ amount }),
        });
    },

    incrementMissionProgress: async (walletAddress: string, missionId: string) => {
        return apiFetch(`/users/${walletAddress}/mission-progress`, {
            method: "POST",
            body: JSON.stringify({ missionId }),
        });
    },

    getReferrals: async (walletAddress: string) => {
        return apiFetch(`/users/${walletAddress}/referrals`);
    },

    createReferral: async (referralCode: string, refereeAddress: string) => {
        return apiFetch("/users/referral", {
            method: "POST",
            body: JSON.stringify({ referralCode, refereeAddress }),
        });
    },
};

// Wallet APIs
export const walletApi = {
    verify: async (walletAddress: string) => {
        return apiFetch("/wallet/verify", {
            method: "POST",
            body: JSON.stringify({ walletAddress }),
        });
    },

    getBalance: async (walletAddress: string) => {
        return apiFetch(`/wallet/balance/${walletAddress}`);
    },

    redeem: async (walletAddress: string, points: number, sol: number) => {
        return apiFetch("/wallet/redeem", {
            method: "POST",
            body: JSON.stringify({ walletAddress, points, sol }),
        });
    },
};

// Leaderboard APIs
export const leaderboardApi = {
    getConstituencies: async (timeFilter: "weekly" | "monthly" | "all-time" = "weekly") => {
        return apiFetch(`/leaderboard/constituencies?timeFilter=${timeFilter}`);
    },

    getCitizens: async (
        constituency?: string,
        timeFilter: "weekly" | "monthly" | "all-time" = "weekly"
    ) => {
        const params = new URLSearchParams({ timeFilter });
        if (constituency) params.append("constituency", constituency);
        return apiFetch(`/leaderboard/citizens?${params.toString()}`);
    },

    getSpotlight: async () => {
        return apiFetch("/leaderboard/spotlight");
    },
};

// Poll APIs
export const pollApi = {
    // List polls with optional filters
    getList: async (filters?: { category?: string; status?: string; constituency?: string; sort?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category && filters.category !== "all") params.append("category", filters.category);
        if (filters?.status && filters.status !== "all") params.append("status", filters.status);
        if (filters?.constituency) params.append("constituency", filters.constituency);
        if (filters?.sort) params.append("sort", filters.sort);
        const query = params.toString();
        return apiFetch(`/polls${query ? `?${query}` : ""}`);
    },

    // Get single poll full data (question, options, rules, etc.)
    getById: async (pollId: string) => {
        return apiFetch(`/polls/${pollId}`);
    },

    getState: async (pollId: string, wallet?: string) => {
        const q = wallet ? `?wallet=${wallet}` : "";
        return apiFetch(`/polls/${pollId}/state${q}`);
    },

    vote: async (pollId: string, walletAddress: string, optionId: string, points: number) => {
        return apiFetch(`/polls/${pollId}/vote`, {
            method: "POST",
            body: JSON.stringify({ walletAddress, optionId, points }),
        });
    },

    addComment: async (pollId: string, walletAddress: string, author: string, text: string, points: number) => {
        return apiFetch(`/polls/${pollId}/comments`, {
            method: "POST",
            body: JSON.stringify({ walletAddress, author, text, points }),
        });
    },

    toggleLike: async (pollId: string, commentId: string, walletAddress: string) => {
        return apiFetch(`/polls/${pollId}/comments/${commentId}/like`, {
            method: "POST",
            body: JSON.stringify({ walletAddress }),
        });
    },
};

const apiExports = {
    missionApi,
    userApi,
    walletApi,
    leaderboardApi,
    pollApi,
};

export default apiExports;
