"use client";

import { useEffect, useState } from "react";
import { CheckCircle, X } from "lucide-react";

export default function PointsToast() {
  const [notifications, setNotifications] = useState<
    { id: number; amount: number }[]
  >([]);

  useEffect(() => {
    const handlePointsEarned = (event: CustomEvent) => {
      const { amount } = event.detail;
      const notification = { id: Date.now(), amount };

      setNotifications((prev) => [...prev, notification]);

      // Auto-remove after 3 seconds
      setTimeout(() => {
        setNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id),
        );
      }, 3000);
    };

    window.addEventListener(
      "points-earned",
      handlePointsEarned as EventListener,
    );

    return () => {
      window.removeEventListener(
        "points-earned",
        handlePointsEarned as EventListener,
      );
    };
  }, []);

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in-right"
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg">+{notification.amount} Points!</p>
            <p className="text-sm text-green-100">Great work! Keep it up!</p>
          </div>
          <button
            onClick={() =>
              setNotifications((prev) =>
                prev.filter((n) => n.id !== notification.id),
              )
            }
            className="text-white hover:text-green-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
