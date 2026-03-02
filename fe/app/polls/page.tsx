"use client";

import { useState, useEffect, useMemo } from "react";
import { usePhantomWallet } from "@/hooks/usePhantomWallet";
import { useToast } from "@/contexts/ToastContext";
import { pollApi } from "@/lib/api";
import Header from "@/components/layout/Header";
import PollCard from "@/components/polls/PollCard";
import { Search, TrendingUp, Clock, Star } from "lucide-react";
import type { Poll, PollCategory } from "@/types";

const CATEGORIES: { id: PollCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "political", label: "Political" },
  { id: "education", label: "Education" },
  { id: "health", label: "Health" },
  { id: "environment", label: "Environment" },
  { id: "governance", label: "Governance" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "social", label: "Social" },
  { id: "other", label: "Other" },
];

const SORTS = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "newest", label: "Newest", icon: Clock },
  { id: "mostVoted", label: "Most Voted", icon: Star },
];

export default function PollsPage() {
  const wallet = usePhantomWallet();
  const toast = useToast();

  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PollCategory | "all">("all");
  const [sort, setSort] = useState("trending");
  const [status, setStatus] = useState<"all" | "active" | "closed">("all");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    pollApi
      .getList({ sort })
      .then((res) => {
        if (cancelled) return;
        if (res.success && res.data) setPolls(res.data as Poll[]);
        else toast("Failed to load polls", "error");
      })
      .catch(() => { if (!cancelled) toast("Failed to load polls", "error"); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [sort]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    let list = [...polls];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (status !== "all") list = list.filter((p) => p.status === status);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.question.toLowerCase().includes(q) ||
          p.constituency.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return list;
  }, [polls, category, status, search]);

  const activeCount = polls.filter((p) => p.status === "active").length;
  const totalVotes = polls.reduce((s, p) => s + p.totalVotes, 0);
  const pointsAvailable = polls.reduce(
    (s, p) => s + (p.pointsForVoting || 0) + (p.pointsForComment || 0),
    0,
  );

  const handleConnectWallet = async () => {
    if (!wallet.isPhantomInstalled) {
      toast("Phantom wallet not found. Please install it from phantom.app", "error");
      return;
    }
    await wallet.connect();
  };

  const handleDisconnectWallet = async () => { await wallet.disconnect(); };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      <Header
        variant="dashboard"
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        walletConnected={wallet.connected}
        walletAddress={wallet.address || undefined}
      />

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A]">Community Polls</h1>
          <p className="text-[#64748B] mt-1">
            Vote on issues that matter. Earn JMT points for every participation.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Polls", value: loading ? "…" : activeCount.toString() },
            { label: "Total Votes", value: loading ? "…" : totalVotes.toLocaleString() },
            { label: "Points Available", value: loading ? "…" : `${pointsAvailable}+` },
            { label: "Your Votes", value: wallet.connected ? "0" : "—" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <p className="text-2xl font-bold text-[#E11D48]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6 space-y-4">
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search polls, constituencies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            <div className="flex gap-2">
              {SORTS.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      sort === s.id
                        ? "bg-rose-600 text-white border-rose-600"
                        : "text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    category === cat.id
                      ? "bg-[#0F172A] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "all" | "active" | "closed")}
              className="px-3 py-1.5 border border-gray-200 rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> polls
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 animate-pulse h-64" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No polls found</p>
            <p className="text-gray-400 text-sm mt-1">Try changing your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
