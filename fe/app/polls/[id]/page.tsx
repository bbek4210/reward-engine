"use client";

import { useState, useRef, useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowLeft,
  BarChart2,
  Clock,
  Users,
  Share2,
  ChevronDown,
  ChevronUp,
  Heart,
  Send,
  CheckCircle,
} from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useUser } from "@/contexts/UserContext";
import Header from "@/components/layout/Header";
import { pollApi } from "@/lib/api";
import type { Poll } from "@/types";
import {
  incrementMissionProgress,
  savePollVote,
  getPollVote,
  savePollLocalVotes,
  getPollLocalVotes,
  savePollComments,
  getPollComments,
  savePollLiked,
  getPollLiked,
} from "@/lib/storage";
import type { PollComment } from "@/types";

type TimeFilter = "1H" | "24H" | "7D" | "All";

export default function PollDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const wallet = { connected, address: publicKey?.toString() ?? null };
  const { addPoints } = useUser();
  const toast = useToast();

  // Poll data fetched from backend
  const [poll, setPoll] = useState<Poll | null>(null);
  const [pollLoading, setPollLoading] = useState(true);

  const [timeFilter, setTimeFilter] = useState<TimeFilter>("All");
  const [voted, setVoted] = useState<string | null>(() => getPollVote(id));
  const [isVoting, setIsVoting] = useState(false);
  const [showRules, setShowRules] = useState(false);
  // Seed comments from localStorage for instant display before API responds
  const [comments, setComments] = useState<PollComment[]>(() =>
    getPollComments<PollComment>(id),
  );
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(() =>
    getPollLiked(id),
  );
  const [localVotes, setLocalVotes] = useState<Record<string, number>>(() =>
    getPollLocalVotes(id),
  );
  const [copied, setCopied] = useState(false);
  const commentIdRef = useRef(0);

  // Fetch poll data + backend vote state in parallel
  useEffect(() => {
    if (!id) return;
    setPollLoading(true);
    Promise.all([
      pollApi.getById(id),
      pollApi.getState(id, wallet.address || undefined),
    ])
      .then(([pollRes, stateRes]) => {
        // 1. Set poll definition
        if (pollRes.success && pollRes.data) {
          const pollData = pollRes.data as Poll;
          setPoll(pollData);
          // Seed comments from poll's built-in comments if no localStorage data
          setComments((prev) => {
            if (prev.length > 0) return prev;
            return pollData.comments || [];
          });
        }

        // 2. Override with authoritative backend state
        if (stateRes.success && stateRes.data) {
          const data = stateRes.data as {
            voteMap: Record<string, number>;
            userVote: string | null;
            comments: PollComment[];
          };

          if (data.userVote) {
            setVoted(data.userVote);
            savePollVote(id, data.userVote);
          }

          if (data.voteMap && pollRes.data) {
            const p = pollRes.data as Poll;
            const delta: Record<string, number> = {};
            for (const opt of p.options) {
              const dbCount = data.voteMap[opt.id] || 0;
              if (dbCount > 0) delta[opt.id] = dbCount;
            }
            setLocalVotes(delta);
            savePollLocalVotes(id, delta);
          }

          if (data.comments?.length) {
            setComments(data.comments);
            savePollComments(id, data.comments);
          }
        }
      })
      .catch(() => {
        // Backend unavailable — localStorage data already loaded
      })
      .finally(() => setPollLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, wallet.address]);

  const handleConnectWallet = async () => {
    if (!wallet.isPhantomInstalled) {
      toast(
        "Phantom wallet not found. Please install it from phantom.app",
        "error",
      );
      return;
    }
    await wallet.connect();
  };

  const handleDisconnectWallet = async () => {
    await wallet.disconnect();
  };

  if (pollLoading) {
    return (
      <div className="min-h-screen bg-[#F7F4F2] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">Loading poll…</p>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-[#F7F4F2] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Poll not found</p>
          <Link
            href="/polls"
            className="text-rose-600 hover:underline mt-2 block"
          >
            Back to Polls
          </Link>
        </div>
      </div>
    );
  }

  // Compute options with local vote adjustments
  const totalExtraVotes = Object.values(localVotes).reduce((s, v) => s + v, 0);
  const totalVotes = poll.totalVotes + totalExtraVotes;
  const displayOptions = poll.options.map((opt) => {
    const extra = localVotes[opt.id] || 0;
    const newVotes = opt.votes + extra;
    return {
      ...opt,
      votes: newVotes,
      percentage: Math.round((newVotes / totalVotes) * 100),
    };
  });

  // Filter trend data based on time
  const filteredTrend = (() => {
    const data = poll.trendData;
    if (timeFilter === "All") return data;
    if (timeFilter === "7D") return data.slice(-7);
    if (timeFilter === "24H") return data.slice(-2);
    if (timeFilter === "1H") return data.slice(-1);
    return data;
  })();

  const handleVote = async (optionId: string) => {
    if (!wallet.connected || !wallet.address) return;
    if (voted) return;
    setIsVoting(true);
    try {
      const res = (await pollApi.vote(
        id,
        wallet.address,
        optionId,
        poll.pointsForVoting,
      )) as {
        success: boolean;
        error?: string;
        data?: { optionId: string; voteMap: Record<string, number> };
      };
      if (res.success && res.data) {
        setVoted(optionId);
        const delta: Record<string, number> = {};
        for (const opt of poll.options)
          delta[opt.id] = res.data.voteMap[opt.id] || 0;
        setLocalVotes(delta);
        savePollVote(id, optionId);
        savePollLocalVotes(id, delta);
        addPoints(poll.pointsForVoting);
        // Track progress for "Weekly Voter Participation" (id:1) and "Daily Opinion Pulse" (id:3)
        incrementMissionProgress("1");
        incrementMissionProgress("3");
      } else {
        toast(res.error || "Failed to cast vote", "error");
      }
    } catch {
      // Fallback: optimistic local update
      setVoted(optionId);
      setLocalVotes((prev) => ({
        ...prev,
        [optionId]: (prev[optionId] || 0) + 1,
      }));
      savePollVote(id, optionId);
      addPoints(poll.pointsForVoting);
      incrementMissionProgress("1");
      incrementMissionProgress("3");
    }
    setIsVoting(false);
  };

  // True when the connected wallet has already posted a comment on this poll
  const hasCommented =
    !!wallet.address &&
    comments.some(
      (c) => c.walletAddress?.toLowerCase() === wallet.address!.toLowerCase(),
    );

  const handleComment = async () => {
    if (!wallet.connected || !wallet.address || !newComment.trim()) return;
    if (hasCommented) {
      toast("You have already commented on this poll", "error");
      return;
    }
    setIsCommenting(true);
    const authorLabel = wallet.address
      ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`
      : "Anonymous";
    try {
      const res = (await pollApi.addComment(
        id,
        wallet.address,
        authorLabel,
        newComment.trim(),
        poll.pointsForComment,
      )) as { success: boolean; error?: string; data?: PollComment };
      if (res.success && res.data) {
        setComments((prev) => [res.data!, ...prev]);
        setNewComment("");
        addPoints(poll.pointsForComment);
        // Comments also count toward weekly voter participation mission
        incrementMissionProgress("1");
      } else {
        toast(res.error || "Failed to post comment", "error");
      }
    } catch {
      // Fallback: optimistic local comment
      const comment: PollComment = {
        id: `new-${++commentIdRef.current}`,
        author: authorLabel,
        walletAddress: wallet.address || "unknown",
        text: newComment.trim(),
        likes: 0,
        createdAt: "Just now",
      };
      setComments((prev) => [comment, ...prev]);
      setNewComment("");
      addPoints(poll.pointsForComment);
      incrementMissionProgress("1");
    }
    setIsCommenting(false);
  };

  const toggleLike = async (commentId: string) => {
    if (!wallet.connected || !wallet.address) return;
    try {
      const res = (await pollApi.toggleLike(id, commentId, wallet.address)) as {
        success: boolean;
        data?: { liked: boolean; likes: number };
      };
      if (res.success && res.data) {
        setLikedComments((prev) => {
          const next = new Set(prev);
          if (res.data!.liked) {
            next.add(commentId);
          } else {
            next.delete(commentId);
          }
          savePollLiked(id, Array.from(next));
          return next;
        });
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: res.data!.likes } : c,
          ),
        );
      }
    } catch {
      // Fallback: optimistic local toggle
      setLikedComments((prev) => {
        const next = new Set(prev);
        if (next.has(commentId)) next.delete(commentId);
        else next.add(commentId);
        savePollLiked(id, Array.from(next));
        return next;
      });
    }
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (wallet.connected && poll.pointsForShare > 0)
      addPoints(poll.pointsForShare);
  };

  const optionColors = poll.options.map((o) => o.color || "#E11D48");

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      <Header
        variant="dashboard"
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
        walletConnected={wallet.connected}
        walletAddress={wallet.address || undefined}
      />

      <main className="max-w-[1280px] mx-auto px-4 py-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* LEFT — main content */}
          <div className="flex-1 space-y-5">
            {/* Poll Header Card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex gap-4 p-6">
                {/* Thumbnail */}
                <div className="w-40 h-28 bg-gradient-to-br from-gray-700 to-gray-500 rounded-xl flex-shrink-0 relative overflow-hidden">
                  <svg
                    viewBox="0 0 160 112"
                    className="absolute inset-0 w-full h-full opacity-20"
                  >
                    <path
                      d="M0 112 L40 30 L70 60 L100 10 L130 45 L160 25 L160 112Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xs bg-rose-600 px-2 py-1 rounded">
                      {poll.bannerLabel}
                    </span>
                  </div>
                </div>

                {/* Title & Meta */}
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-[#0F172A] leading-snug mb-3">
                    {poll.question}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white text-xs font-bold">
                        J
                      </div>
                      {poll.creator}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span>{poll.createdAt}</span>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <span className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      <BarChart2 className="w-3.5 h-3.5" />
                      {totalVotes.toLocaleString()} votes
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      {poll.daysLeft} days left
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              {/* Chart Controls */}
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-sm font-medium">
                    ♥ All outcomes
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  {(["1H", "24H", "7D", "All"] as TimeFilter[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeFilter(t)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        timeFilter === t
                          ? "bg-rose-600 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recharts Line Chart */}
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={filteredTrend}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fontSize: 11, fill: "#94A3B8" }}
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                  />
                  <Tooltip
                    formatter={(value: unknown) => [`${value}%`]}
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                    iconType="circle"
                    iconSize={8}
                  />
                  {poll.options.map((opt, i) => (
                    <Line
                      key={opt.id}
                      type="monotone"
                      dataKey={opt.id}
                      name={opt.label}
                      stroke={opt.color || optionColors[i]}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Rules */}
            <div className="bg-rose-50 rounded-2xl border border-rose-100 overflow-hidden">
              <button
                onClick={() => setShowRules(!showRules)}
                className="w-full flex items-center justify-between px-5 py-4 font-semibold text-gray-800"
              >
                <span className="flex items-center gap-2">
                  <span>★</span> Rules
                </span>
                {showRules ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {showRules && (
                <div className="px-5 pb-4 space-y-2">
                  {poll.rules.map((rule, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-rose-500 mt-0.5">•</span>
                      {rule}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Discussion */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                Discussion
                <span className="text-sm font-normal text-gray-400 ml-1">
                  ({comments.length})
                </span>
              </h2>

              {/* Comment input */}
              {wallet.connected ? (
                hasCommented ? (
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 text-center">
                    <p className="text-sm text-gray-500">
                      You have already commented on this poll.
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      {wallet.address?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleComment()}
                        placeholder="Share your thoughts..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                      <button
                        onClick={handleComment}
                        disabled={isCommenting || !newComment.trim()}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl text-sm font-medium flex items-center gap-1.5 transition-colors"
                      >
                        {isCommenting ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 mb-5 text-center">
                  <p className="text-sm text-gray-500">
                    Connect your wallet to join the discussion and earn{" "}
                    <span className="font-semibold text-rose-600">
                      +{poll.pointsForComment} pts
                    </span>
                  </p>
                </div>
              )}

              {/* Comments list */}
              {comments.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  Be the first to comment!
                </p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                        {comment.author.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-400">
                            {comment.createdAt}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                        <button
                          onClick={() => toggleLike(comment.id)}
                          className={`flex items-center gap-1 mt-2 text-xs transition-colors ${
                            likedComments.has(comment.id)
                              ? "text-rose-600"
                              : "text-gray-400 hover:text-rose-600"
                          }`}
                        >
                          <Heart
                            className="w-3.5 h-3.5"
                            fill={
                              likedComments.has(comment.id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                          {comment.likes +
                            (likedComments.has(comment.id) ? 1 : 0)}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — sidebar */}
          <div className="w-full lg:w-[340px] space-y-4">
            {/* Current Results */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-[#0F172A] mb-4">
                Current Results
              </h2>
              <div className="space-y-3">
                {displayOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className={`relative border-2 rounded-xl px-4 py-3 overflow-hidden transition-all ${
                      voted === opt.id
                        ? "border-rose-500 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    {/* Progress fill */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: opt.color || "#E11D48",
                        width: `${opt.percentage}%`,
                      }}
                    />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {voted === opt.id && (
                          <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-800">
                          {opt.label}
                        </span>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: opt.color || "#E11D48" }}
                      >
                        {opt.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {totalVotes.toLocaleString()} total votes
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {poll.daysLeft}d left
                </span>
              </div>
            </div>

            {/* Vote / Sign In */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              {wallet.connected ? (
                <>
                  {voted ? (
                    <div className="text-center py-2">
                      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-2" />
                      <p className="font-semibold text-gray-900">
                        Vote Recorded!
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        You earned{" "}
                        <span className="font-semibold text-rose-600">
                          +{poll.pointsForVoting} pts
                        </span>
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-[#0F172A] mb-3">
                        Cast Your Vote
                        <span className="ml-2 text-sm font-normal text-rose-600">
                          +{poll.pointsForVoting} pts
                        </span>
                      </h3>
                      <div className="space-y-2">
                        {poll.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleVote(opt.id)}
                            disabled={isVoting}
                            className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 transition-all disabled:opacity-50 text-left"
                          >
                            {isVoting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" />
                                Processing...
                              </div>
                            ) : (
                              opt.label
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <h3 className="font-bold text-[#0F172A] mb-1">
                    Sign in to Vote
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    You need to be signed in to vote in this platform.
                  </p>
                  <button
                    onClick={handleConnectWallet}
                    className="w-full py-3 bg-[#E11D48] hover:bg-rose-700 text-white font-semibold rounded-xl transition-colors"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share Poll
                  {wallet.connected && (
                    <span className="text-xs font-semibold text-amber-600">
                      {poll.solRewardForShare
                        ? `+${poll.solRewardForShare} SOL`
                        : poll.pointsForShare > 0
                          ? `+${poll.pointsForShare} pts`
                          : null}
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Poll Metadata */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[#0F172A]">Poll Metadata</h3>
                <span className="text-xs text-gray-400 font-mono">
                  PID #{poll.pid}
                </span>
              </div>
              <div className="space-y-2">
                {[
                  ["Status", poll.status.toUpperCase()],
                  [
                    "Category",
                    poll.category.charAt(0).toUpperCase() +
                      poll.category.slice(1),
                  ],
                  [
                    "Type",
                    poll.type.charAt(0).toUpperCase() + poll.type.slice(1),
                  ],
                  ["Constituency", poll.constituency],
                  ["Country", poll.country],
                  ["Created", poll.createdAt],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm">
                    <span className="text-gray-500">{k}</span>
                    <span
                      className={`font-medium ${
                        k === "Status"
                          ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs"
                          : "text-gray-800"
                      }`}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              {/* Reward Points Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  Earn Points
                </p>
                <div className="space-y-1.5">
                  {[
                    ["Vote", poll.pointsForVoting, null],
                    ["Comment", poll.pointsForComment, null],
                    [
                      "Share",
                      poll.pointsForShare,
                      poll.solRewardForShare ?? null,
                    ],
                  ].map(([action, pts, sol]) => (
                    <div
                      key={String(action)}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-500">{action}</span>
                      <span className="font-semibold text-rose-600">
                        {sol ? (
                          <span className="text-amber-600">
                            +{String(sol)} SOL
                          </span>
                        ) : (
                          `+${pts} pts`
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
