import { userApi } from "@/lib/api";

// LocalStorage utility functions with namespace
const STORAGE_PREFIX = "janmat_";

export const storage = {
  // Get item from localStorage
  get: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  },

  // Set item in localStorage
  set: (key: string, value: string): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
      return true;
    } catch (error) {
      console.error("Error writing to localStorage:", error);
      return false;
    }
  },

  // Remove item from localStorage
  remove: (key: string): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage:", error);
      return false;
    }
  },

  // Clear all app-specific items
  clear: (): boolean => {
    if (typeof window === "undefined") return false;
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .forEach((key) => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },

  // Get and parse JSON
  getJSON: <T>(key: string, defaultValue: T): T => {
    const item = storage.get(key);
    if (!item) return defaultValue;
    try {
      return JSON.parse(item) as T;
    } catch {
      return defaultValue;
    }
  },

  // Stringify and set JSON
  setJSON: <T>(key: string, value: T): boolean => {
    try {
      return storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error stringifying JSON:", error);
      return false;
    }
  },
};

// Specific storage keys (for type safety and centralization)
export const STORAGE_KEYS = {
  WEEK_START_POINTS: "week_start_points",
  USER_PREFERENCES: "user_preferences",
  LAST_SYNC: "last_sync",
  // Tracks { [missionId]: number } — actions completed per mission
  MISSION_PROGRESS: "mission_progress",
  // Poll persistence
  POLL_VOTES: "poll_votes", // { [pollId]: optionId }
  POLL_LOCAL_VOTES: "poll_local_votes", // { [pollId]: { [optionId]: number } }
  POLL_COMMENTS: "poll_comments", // { [pollId]: PollComment[] }
  POLL_LIKED: "poll_liked", // { [pollId]: string[] }
  REDEMPTION_HISTORY: "redemption_history", // RedemptionHistory[]
} as const;

/** Increment the stored action count for a mission and return the new count.
 *  Also syncs to backend if a walletAddress is provided. */
export function incrementMissionProgress(
  missionId: string,
  walletAddress?: string | null,
): number {
  const current = storage.getJSON<Record<string, number>>(
    STORAGE_KEYS.MISSION_PROGRESS,
    {},
  );
  const next = (current[missionId] ?? 0) + 1;
  storage.setJSON(STORAGE_KEYS.MISSION_PROGRESS, {
    ...current,
    [missionId]: next,
  });
  // Fire-and-forget sync to backend
  if (walletAddress) {
    userApi
      .incrementMissionProgress(walletAddress, missionId)
      .catch((e) => console.error("Mission progress sync failed:", e));
  }
  return next;
}

/** Read the stored action count for every mission. */
export function getMissionProgress(): Record<string, number> {
  return storage.getJSON<Record<string, number>>(
    STORAGE_KEYS.MISSION_PROGRESS,
    {},
  );
}

// ── Poll persistence helpers ──────────────────────────────────────────────────

/** Save the option the user voted for on a specific poll. */
export function savePollVote(pollId: string, optionId: string): void {
  const all = storage.getJSON<Record<string, string>>(
    STORAGE_KEYS.POLL_VOTES,
    {},
  );
  storage.setJSON(STORAGE_KEYS.POLL_VOTES, { ...all, [pollId]: optionId });
}

/** Return the optionId the user previously voted for, or null. */
export function getPollVote(pollId: string): string | null {
  const all = storage.getJSON<Record<string, string>>(
    STORAGE_KEYS.POLL_VOTES,
    {},
  );
  return all[pollId] ?? null;
}

/** Save the local vote-count deltas for a poll. */
export function savePollLocalVotes(
  pollId: string,
  localVotes: Record<string, number>,
): void {
  const all = storage.getJSON<Record<string, Record<string, number>>>(
    STORAGE_KEYS.POLL_LOCAL_VOTES,
    {},
  );
  storage.setJSON(STORAGE_KEYS.POLL_LOCAL_VOTES, {
    ...all,
    [pollId]: localVotes,
  });
}

/** Load previously saved local vote deltas for a poll. */
export function getPollLocalVotes(pollId: string): Record<string, number> {
  const all = storage.getJSON<Record<string, Record<string, number>>>(
    STORAGE_KEYS.POLL_LOCAL_VOTES,
    {},
  );
  return all[pollId] ?? {};
}

/** Save user-added comments for a poll (merged on top of the mock list). */
export function savePollComments<T>(pollId: string, comments: T[]): void {
  const all = storage.getJSON<Record<string, T[]>>(
    STORAGE_KEYS.POLL_COMMENTS,
    {},
  );
  storage.setJSON(STORAGE_KEYS.POLL_COMMENTS, { ...all, [pollId]: comments });
}

/** Load previously saved comments for a poll. */
export function getPollComments<T>(pollId: string): T[] {
  const all = storage.getJSON<Record<string, T[]>>(
    STORAGE_KEYS.POLL_COMMENTS,
    {},
  );
  return all[pollId] ?? [];
}

/** Save the set of liked comment IDs for a poll. */
export function savePollLiked(pollId: string, likedIds: string[]): void {
  const all = storage.getJSON<Record<string, string[]>>(
    STORAGE_KEYS.POLL_LIKED,
    {},
  );
  storage.setJSON(STORAGE_KEYS.POLL_LIKED, { ...all, [pollId]: likedIds });
}

/** Load the set of liked comment IDs for a poll. */
export function getPollLiked(pollId: string): Set<string> {
  const all = storage.getJSON<Record<string, string[]>>(
    STORAGE_KEYS.POLL_LIKED,
    {},
  );
  return new Set(all[pollId] ?? []);
}
