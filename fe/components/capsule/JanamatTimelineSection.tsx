"use client";

import { useState, useEffect } from "react";
import { 
  getTimelineEntries, 
  updateTimelineEntry, 
  clearTimeline, 
  seedMockTimeline 
} from "@/lib/storage";
import { TimelineEntry } from "@/types";
import JanamatTimelineCard from "./JanamatTimelineCard";
import { useToast } from "@/contexts/ToastContext";
import { Clock, History, Search, Calendar, Sparkles, RotateCcw, LayoutGrid } from "lucide-react";

export default function JanamatTimelineSection() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "revealed">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  const loadEntries = () => {
    const all = getTimelineEntries();
    setEntries(all);
  };

  useEffect(() => {
    loadEntries();
    // Listen for storage changes in other tabs
    window.addEventListener("storage", loadEntries);
    return () => window.removeEventListener("storage", loadEntries);
  }, []);

  const handleReveal = (id: string) => {
    updateTimelineEntry(id, { revealed: true });
    loadEntries();
    toast("Your past opinion is now revealed!", "success");
  };

  const handleReset = () => {
    clearTimeline();
    seedMockTimeline();
    loadEntries();
    toast("Demo data reset successfully", "success");
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesTab = activeTab === "upcoming" ? !entry.revealed : entry.revealed;
    const matchesSearch = entry.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.pollQuestion?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const upcoming = filteredEntries.filter((c) => !c.revealed);
  const revealed = filteredEntries.filter((c) => c.revealed);

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-100 rounded-2xl">
            <Clock className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Janamat Timeline</h1>
            <p className="text-sm text-slate-500 font-medium mt-0.5">Your recorded opinions and predictions</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-400 hover:text-rose-500 transition-colors uppercase tracking-wider"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "upcoming"
                ? "bg-white text-rose-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Locked
            </div>
          </button>
          <button
            onClick={() => setActiveTab("revealed")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "revealed"
                ? "bg-white text-rose-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Revealed
            </div>
          </button>
        </div>

        <div className="relative flex-1 max-w-md ml-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search your entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <JanamatTimelineCard 
              key={entry.id} 
              entry={entry}
              onReveal={(id) => {
                // entries will be re-loaded by storage event listener
              }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            {searchQuery ? (
              <Search className="w-8 h-8 text-slate-300" />
            ) : (
              <Sparkles className="w-8 h-8 text-slate-300" />
            )}
          </div>
          <p className="text-slate-400 font-medium">No Janamat Timeline entries found yet.</p>
          <p className="text-sm text-slate-400 max-w-xs mx-auto mt-1">
            {activeTab === "upcoming"
              ? "You don't have any locked opinions. Start by saving your take on a poll!"
              : "No opinions have been revealed yet. They'll unlock automatically when the poll ends."}
          </p>
        </div>
      )}
    </div>
  );
}
