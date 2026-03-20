"use client";

import { useState } from "react";
import { X, Clock, Calendar, Save } from "lucide-react";
import Button from "../ui/Button";
import { saveTimelineEntry } from "@/lib/storage";
import { useToast } from "@/contexts/ToastContext";
import { TimelineEntry } from "@/types";

interface JanamatTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  pollId?: string;
  pollQuestion?: string;
  revealAtDate?: string; // ISO string from poll.endsAt
  onSuccess?: () => void;
}

type RevealOption = "7days" | "30days" | "custom";

export default function JanamatTimelineModal({
  isOpen,
  onClose,
  pollId,
  pollQuestion,
  revealAtDate,
  onSuccess,
}: JanamatTimelineModalProps) {
  const [opinion, setOpinion] = useState("");
  const [revealOption, setRevealOption] = useState<RevealOption>("7days");
  const [customDate, setCustomDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!opinion.trim()) {
      toast("Please enter your opinion", "error");
      return;
    }

    let revealAt: number;
    const now = Date.now();

    if (revealOption === "7days") {
      revealAt = now + 7 * 24 * 60 * 60 * 1000;
    } else if (revealOption === "30days") {
      revealAt = now + 30 * 24 * 60 * 60 * 1000;
    } else {
      if (!customDate) {
        toast("Please select a reveal date", "error");
        return;
      }
      revealAt = new Date(customDate).getTime();
      if (revealAt <= now) {
        toast("Reveal date must be in the future", "error");
        return;
      }
    }

    setIsSaving(true);
    try {
      const newEntry: TimelineEntry = {
        id: `timeline-${Date.now()}`,
        text: opinion,
        createdAt: now,
        revealAt,
        revealed: false,
        pollId,
        pollQuestion,
      };

      saveTimelineEntry(newEntry);
      toast("Saved to Janamat Timeline", "success");
      onSuccess?.();
      onClose();
      setOpinion("");
    } catch (error) {
      toast("Failed to save to timeline", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-white/20 transform transition-all animate-in zoom-in-95 fade-in duration-300">
        {/* Header */}
        <div className="bg-linear-to-br from-rose-500 to-rose-600 px-8 py-8 text-white relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Save to Timeline</h3>
          </div>
          <p className="text-rose-100 text-sm opacity-90 leading-relaxed">
            Your opinion will be securely locked and revealed only after the date you choose.
          </p>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 py-8 space-y-8">
          {/* Poll Question Context */}
          {pollQuestion && (
            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100/50">
              <p className="text-xs font-bold text-rose-500 uppercase tracking-[0.1em] mb-2">Context: Poll Question</p>
              <p className="text-[15px] font-semibold text-slate-800 leading-snug">"{pollQuestion}"</p>
            </div>
          )}

          {/* Opinion Input */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1">Your Opinion / Prediction</label>
            <textarea
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              placeholder="What's your take? Why are you voting this way? Make a bold prediction..."
              className="w-full h-36 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all resize-none placeholder:text-slate-400"
            />
          </div>

          {/* Reveal Options */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-3 gap-3">
              {(["7days", "30days", "custom"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRevealOption(opt)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
                    revealOption === opt
                      ? "bg-rose-50 border-rose-500 text-rose-600 shadow-sm"
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                  }`}
                >
                  {opt === "7days" ? "7 Days" : opt === "30days" ? "30 Days" : "Custom"}
                </button>
              ))}
            </div>

            {(revealOption === "custom" || true) && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {revealOption === "custom" && (
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all font-medium"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-2 px-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <p className="text-xs font-medium">
                    Will reveal on:{" "}
                    <span className="font-bold text-slate-700">
                      {(() => {
                        let d: Date;
                        if (revealOption === "7days") d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                        else if (revealOption === "30days") d = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                        else if (customDate) d = new Date(customDate);
                        else return "Select a date";
                        
                        return d.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        });
                      })()}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center gap-4">
          <Button
            onClick={onClose}
            variant="ghost"
            className="flex-1 hover:bg-slate-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={isSaving}
            className="flex-1 shadow-xl shadow-rose-200/50 bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all py-6 rounded-2xl"
          >
            <Save className="w-5 h-5" />
            Save to Timeline
          </Button>
        </div>
      </div>
    </div>
  );
}
