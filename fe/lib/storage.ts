// LocalStorage utility functions with namespace
const STORAGE_PREFIX = 'janmat_';

export const storage = {
    // Get item from localStorage
    get: (key: string): string | null => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    // Set item in localStorage
    set: (key: string, value: string): boolean => {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    // Remove item from localStorage
    remove: (key: string): boolean => {
        if (typeof window === 'undefined') return false;
        try {
            localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    // Clear all app-specific items
    clear: (): boolean => {
        if (typeof window === 'undefined') return false;
        try {
            Object.keys(localStorage)
                .filter(key => key.startsWith(STORAGE_PREFIX))
                .forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
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
            console.error('Error stringifying JSON:', error);
            return false;
        }
    },
};

// Specific storage keys (for type safety and centralization)
export const STORAGE_KEYS = {
    WEEK_START_POINTS: 'week_start_points',
    USER_PREFERENCES: 'user_preferences',
    LAST_SYNC: 'last_sync',
} as const;
