"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import { userApi } from "@/lib/api";
import Header from "@/components/layout/Header";
import {
  Copy,
  CheckCircle,
  Users,
  Gift,
  Share2,
  Twitter,
  Link as LinkIcon,
  Trophy,
  ArrowRight,
  Star,
} from "lucide-react";

interface Referral {
  _id?: string;
  refereeAddress: string | null;
  status: "pending" | "completed";
  pointsEarned: number;
  createdAt?: string;
  completedAt?: string | null;
}

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Get Your Link",
    desc: "Copy your unique referral link from your dashboard.",
    icon: LinkIcon,
    color: "bg-rose-100 text-rose-600",
  },
  {
    step: "2",
    title: "Share with Friends",
    desc: "Share the link with friends, family, or on social media.",
    icon: Share2,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    step: "3",
    title: "They Sign Up",
    desc: "Your friend connects their wallet and completes their first vote.",
    icon: Users,
    color: "bg-amber-100 text-amber-600",
  },
  {
    step: "4",
    title: "You Both Earn",
    desc: "You get 5 pts. Your friend gets a 2 pts welcome bonus.",
    icon: Gift,
    color: "bg-green-100 text-green-600",
  },
];

const TIERS = [
  {
    count: 1,
    reward: "5 pts",
    badge: "Referrer",
    color: "bg-gray-100 text-gray-700",
  },
  {
    count: 5,
    reward: "25 pts + 0.01 SOL",
    badge: "Connector",
    color: "bg-blue-100 text-blue-700",
  },
  {
    count: 10,
    reward: "50 pts + 0.05 SOL + Badge",
    badge: "Ambassador",
    color: "bg-purple-100 text-purple-700",
  },
  {
    count: 25,
    reward: "0.25 SOL + Rare Badge",
    badge: "Champion",
    color: "bg-amber-100 text-amber-700",
  },
  {
    count: 50,
    reward: "1.0 SOL + Exclusive Badge",
    badge: "Legend",
    color: "bg-rose-100 text-rose-700",
  },
];

export default function ReferralPage() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const wallet = { connected, address: publicKey?.toString() ?? null };
  useUser();
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralsLoading, setReferralsLoading] = useState(false);

  // Fetch referrals when wallet connects
  useEffect(() => {
    if (!wallet.connected || !wallet.address) {
      setReferrals([]);
      return;
    }
    setReferralsLoading(true);
    userApi
      .getReferrals(wallet.address)
      .then((res) => {
        if (res.success && res.data) setReferrals(res.data as Referral[]);
      })
      .catch(() => {})
      .finally(() => setReferralsLoading(false));
  }, [wallet.connected, wallet.address]);

  const handleConnectWallet = () => setVisible(true);

  const handleDisconnectWallet = async () => {
    await disconnect();
  };

  const referralCode = wallet.address
    ? `JMT-${wallet.address.slice(2, 8).toUpperCase()}`
    : "JMT-XXXXXX";

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}?ref=${referralCode}`
      : `https://janamat.app?ref=${referralCode}`;

  const completedReferrals = referrals.filter(
    (r) => r.status === "completed",
  ).length;
  const totalEarned = referrals
    .filter((r) => r.status === "completed")
    .reduce((s, r) => s + r.pointsEarned, 0);

  const currentTier = TIERS.filter((t) => completedReferrals >= t.count).pop();
  const nextTier = TIERS.find((t) => completedReferrals < t.count);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(
      `I'm participating in civic governance on Janamat Rewards Engine! Join me and earn points for voting on community polls. Use my referral link: ${referralLink}`,
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      <Header
        variant="dashboard"
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={handleDisconnectWallet}
      />

      <main className="max-w-[1200px] mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#E11D48] to-[#7C3AED] rounded-2xl p-8 text-white overflow-hidden relative">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white opacity-5 rounded-full" />
          <div className="absolute -right-4 -bottom-8 w-48 h-48 bg-white opacity-5 rounded-full" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Refer & Earn</h1>
            <p className="text-white/80 text-lg mb-6">
              Invite friends to Janamat Rewards Engine. You earn{" "}
              <span className="font-bold text-white">5 pts</span> per successful
              referral. They get a{" "}
              <span className="font-bold text-white">2 pts</span> welcome bonus.
              Reach milestones to earn{" "}
              <span className="font-bold text-white">SOL directly</span>.
            </p>

            {/* Referral Link Box */}
            {wallet.connected ? (
              <div className="bg-white/15 backdrop-blur rounded-xl p-4">
                <p className="text-xs text-white/70 mb-2 uppercase font-semibold">
                  Your Referral Link
                </p>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/20 rounded-lg px-4 py-2.5 text-sm font-mono text-white truncate">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-rose-700 font-semibold rounded-lg text-sm hover:bg-white/90 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-white/60">Code:</span>
                  <span className="font-mono font-bold text-white text-sm">
                    {referralCode}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="bg-white text-rose-700 font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-colors"
              >
                Connect Wallet to Get Your Link
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        {wallet.connected && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Referrals",
                value: referralsLoading ? "…" : referrals.length.toString(),
                icon: Users,
                color: "text-blue-600",
              },
              {
                label: "Completed",
                value: completedReferrals.toString(),
                icon: CheckCircle,
                color: "text-green-600",
              },
              {
                label: "Points Earned",
                value: `${totalEarned} pts`,
                icon: Star,
                color: "text-rose-600",
              },
              {
                label: "Current Tier",
                value: currentTier?.badge || "None",
                icon: Trophy,
                color: "text-amber-600",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl p-5 border border-gray-100"
                >
                  <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* How it works */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-5">
                How It Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HOW_IT_WORKS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.step}
                      className="flex gap-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                Share Your Link
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </button>
                <button
                  onClick={handleTwitterShare}
                  className="flex items-center gap-2 px-5 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-xl text-sm font-medium text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Share on X
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(
                      `Join me on Janamat Rewards! ${referralLink}`,
                    );
                    window.open(`https://wa.me/?text=${text}`, "_blank");
                  }}
                  className="flex items-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#22c55e] rounded-xl text-sm font-medium text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.561 4.12 1.534 5.845L.054 23.25a.75.75 0 00.918.919l5.445-1.481A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.667-.514-5.19-1.41l-.37-.22-3.83 1.04 1.01-3.73-.24-.39A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Referral History */}
            {wallet.connected && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                  Referral History
                </h2>
                {referrals.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-6">
                    No referrals yet. Share your link to start earning!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {referrals.map((ref, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                            {ref.refereeAddress
                              ? ref.refereeAddress.slice(0, 2).toUpperCase()
                              : "?"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {ref.refereeAddress
                                ? `${ref.refereeAddress.slice(0, 6)}…${ref.refereeAddress.slice(-4)}`
                                : "Pending"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {ref.createdAt
                                ? new Date(ref.createdAt).toLocaleDateString()
                                : "—"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              ref.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {ref.status === "completed"
                              ? "Completed"
                              : "Pending"}
                          </span>
                          {ref.pointsEarned > 0 && (
                            <span className="text-sm font-bold text-rose-600">
                              +{ref.pointsEarned} pts
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT — Tier System */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Referral Tiers
              </h2>
              <div className="space-y-3">
                {TIERS.map((tier) => {
                  const isReached = completedReferrals >= tier.count;
                  const isCurrent = currentTier?.count === tier.count;
                  return (
                    <div
                      key={tier.count}
                      className={`relative p-3 rounded-xl border-2 transition-all ${
                        isCurrent
                          ? "border-rose-400 bg-rose-50"
                          : isReached
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200"
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute -top-2 -right-2 text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                          CURRENT
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tier.color}`}
                        >
                          {tier.badge}
                        </span>
                        <span className="text-xs text-gray-500">
                          {tier.count} referral{tier.count > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-rose-600">
                        {tier.reward}
                      </p>
                      {isReached && (
                        <CheckCircle className="absolute right-3 bottom-3 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  );
                })}
              </div>

              {nextTier && wallet.connected && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">
                    Progress to{" "}
                    <span className="font-semibold text-gray-700">
                      {nextTier.badge}
                    </span>
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-rose-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (completedReferrals / nextTier.count) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {completedReferrals}/{nextTier.count} referrals
                  </p>
                </div>
              )}
            </div>

            {/* Bonus Info */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-5">
              <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Bonus Rewards
              </h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  Your friend gets <strong>2 pts</strong> welcome bonus
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  You earn <strong>5 pts</strong> per completed referral
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />5
                  referrals unlocks <strong>0.01 SOL</strong> direct reward
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  50 referrals earns <strong>1.0 SOL + Exclusive Badge</strong>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  Top referrers featured on the <strong>leaderboard</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
