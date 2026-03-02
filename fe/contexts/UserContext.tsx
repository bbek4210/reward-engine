"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { userApi } from "@/lib/api";

interface UserContextType {
  points: number;
  streak: number;
  weeklyRank: number;
  missionsCompleted: number;
  isVerified: boolean;
  addPoints: (amount: number) => void;
  refreshUserData: () => Promise<void>;
  loading: boolean;
}

interface UserData {
  walletAddress: string;
  points: number;
  streak: number;
  weeklyRank: number;
  missionsCompleted: number;
  isVerified: boolean;
  joinedAt: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { connected, publicKey } = useWallet();
  const wallet = { connected, address: publicKey?.toString() ?? null };
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [weeklyRank, setWeeklyRank] = useState(999);
  const [missionsCompleted, setMissionsCompleted] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshUserData = async () => {
    if (!wallet.address) return;

    setLoading(true);
    try {
      const result = await userApi.getProfile(wallet.address);
      if (result.success && result.data) {
        const userData = result.data as UserData;
        setPoints(userData.points || 0);
        setStreak(userData.streak || 0);
        setWeeklyRank(userData.weeklyRank || 999);
        setMissionsCompleted(userData.missionsCompleted || 0);
        setIsVerified(userData.isVerified || false);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);

    // Sync to DB (fire-and-forget — don't block UI)
    if (wallet.address) {
      if (amount > 0) {
        userApi
          .addPoints(wallet.address, amount)
          .catch((e) => console.error("addPoints sync failed:", e));
      } else if (amount < 0) {
        userApi
          .deductPoints(wallet.address, Math.abs(amount))
          .catch((e) => console.error("deductPoints sync failed:", e));
      }
    }

    if (typeof window !== "undefined") {
      const event = new CustomEvent("points-earned", { detail: { amount } });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    if (wallet.connected && wallet.address) {
      refreshUserData();
    } else if (!wallet.connected) {
      // Reset user data when wallet disconnects
      setPoints(0);
      setStreak(0);
      setWeeklyRank(999);
      setMissionsCompleted(0);
      setIsVerified(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.connected, wallet.address]);

  return (
    <UserContext.Provider
      value={{
        points,
        streak,
        weeklyRank,
        missionsCompleted,
        isVerified,
        addPoints,
        refreshUserData,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
