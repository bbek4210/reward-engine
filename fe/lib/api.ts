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

    redeem: async (walletAddress: string, points: number) => {
        return apiFetch("/wallet/redeem", {
            method: "POST",
            body: JSON.stringify({ walletAddress, points }),
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

const apiExports = {
    missionApi,
    userApi,
    walletApi,
    leaderboardApi,
};

export default apiExports;
