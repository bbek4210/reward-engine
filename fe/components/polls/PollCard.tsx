"use client";

import Link from "next/link";
import { MapPin, Clock, Users } from "lucide-react";
import type { Poll } from "@/types";

interface PollCardProps {
  poll: Poll;
}

const BANNER_PATTERNS = [
  "from-gray-800 to-gray-600",
  "from-slate-800 to-slate-600",
  "from-zinc-800 to-zinc-600",
  "from-neutral-800 to-neutral-600",
];

export default function PollCard({ poll }: PollCardProps) {
  const bannerGradient =
    BANNER_PATTERNS[parseInt(poll.id, 10) % BANNER_PATTERNS.length];

  const topTwo = [...poll.options]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2);

  const categoryLabel = poll.type.charAt(0).toUpperCase() + poll.type.slice(1);

  return (
    <Link href={`/polls/${poll.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer group">
        {/* Banner */}
        <div
          className={`relative h-44 bg-gradient-to-br ${bannerGradient} flex items-end overflow-hidden`}
        >
          {/* Mountain/building sketch overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg
              viewBox="0 0 400 176"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M0 176 L80 60 L140 100 L200 20 L260 80 L320 40 L400 120 L400 176 Z"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M0 176 L60 90 L120 130 L180 50 L240 100 L300 60 L360 110 L400 80 L400 176 Z"
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>
          {/* Constituency Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-[#E11D48] text-white font-bold text-sm px-3 py-1.5 rounded">
              {poll.bannerLabel || poll.constituency}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              <MapPin className="w-3 h-3" />
              {poll.country}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="5" r="3" />
                <path d="M1 14s1-5 7-5 7 5 7 5" />
              </svg>
              {categoryLabel}
            </span>
          </div>

          {/* Question */}
          <h3 className="font-semibold text-[#0F172A] text-sm leading-snug line-clamp-2 group-hover:text-[#E11D48] transition-colors">
            {poll.question}
          </h3>

          {/* Options */}
          <div className="space-y-2">
            {topTwo.map((opt) => (
              <div
                key={opt.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2"
              >
                <span className="text-sm text-gray-800 truncate max-w-[55%]">
                  {opt.label.length > 15
                    ? opt.label.slice(0, 14) + "…"
                    : opt.label}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-bold"
                    style={{ color: opt.color || "#E11D48" }}
                  >
                    {opt.percentage}%
                  </span>
                  <span className="text-gray-400 text-xs">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5" />
              {poll.totalVotes.toLocaleString()} votes
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              {poll.daysLeft}d left
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
