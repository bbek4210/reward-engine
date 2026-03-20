"use client";

import { useState, useEffect } from "react";
import { Lock, Unlock, Clock, Calendar, CheckCircle } from "lucide-react";
import { TimelineEntry } from "@/types";
import { cn } from "@/lib/utils";

interface JanamatTimelineCardProps {
  entry: TimelineEntry;
  onReveal?: (id: string) => void;
}

export default function JanamatTimelineCard({ entry, onReveal }: JanamatTimelineCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isNewReveal, setIsNewReveal] = useState(false);

  useEffect(() => {
    if (entry.revealed) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = entry.revealAt - now;

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        if (onReveal) onReveal(entry.id);
        setIsNewReveal(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const dStr = days > 0 ? `${days}d ` : "";
      const hStr = hours.toString().padStart(2, "0");
      const mStr = minutes.toString().padStart(2, "0");
      const sStr = seconds.toString().padStart(2, "0");

      setTimeLeft(`${dStr}${hStr}:${mStr}:${sStr}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [entry.revealAt, entry.revealed, entry.id, onReveal]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (entry.revealed) {
    return (
      <div className={cn(
        "bg-white rounded-2xl border-2 p-5 transition-all duration-700",
        isNewReveal ? "border-green-400 shadow-lg shadow-green-100 animate-in fade-in zoom-in duration-1000" : "border-gray-100 hover:border-rose-200"
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Unlock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Revealed</p>
              <p className="text-xs text-gray-500">{formatDate(entry.revealAt)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-[10px] font-bold uppercase tracking-tight">Then</span>
            <span className="px-2 py-1 bg-rose-100 text-rose-600 rounded-md text-[10px] font-bold uppercase tracking-tight">Now</span>
          </div>
        </div>

        {entry.pollQuestion && (
          <>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 animate-pulse">
              Revealed from Timeline
            </span>
            <p className="text-sm font-semibold text-gray-800 mb-3 border-l-4 border-rose-500 pl-3 py-1 bg-gray-50 rounded-r-lg">
              {entry.pollQuestion}
            </p>
          </>
        )}

        <p className="text-gray-700 text-sm leading-relaxed italic border-l-2 border-gray-100 pl-4 py-1">
          "{entry.text}"
        </p>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-medium">
            Saved {formatDate(entry.createdAt)}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold">
            <CheckCircle className="w-3 h-3" />
            Verified Opinion
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-5 relative overflow-hidden group hover:border-gray-300 transition-all">
      {/* Background decoration */}
      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:rotate-12 transition-transform duration-500">
        <Lock className="w-24 h-24 text-gray-900" />
      </div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Locked Entry</p>
            <p className="text-xs text-gray-500">Reveals on {formatDate(entry.revealAt)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="h-12 flex items-center gap-2 px-3 bg-gray-50 rounded-xl border border-gray-100">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="h-2 w-full bg-gray-200 rounded-full" />
            <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-4 text-center border-b-4 border-gray-700">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            Countdown
          </p>
          <p className="text-2xl font-mono font-bold text-white tracking-widest">
            {timeLeft || "LOCKED"}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
        <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(entry.createdAt)}
        </span>
        <span className="text-[10px] text-rose-500 font-bold uppercase tracking-tighter">
          Hidden from Timeline
        </span>
      </div>
    </div>
  );
}
