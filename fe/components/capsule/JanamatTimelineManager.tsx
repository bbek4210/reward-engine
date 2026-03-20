"use client";

import { useEffect } from "react";
import { getTimelineEntries, updateTimelineEntry, seedMockTimeline } from "@/lib/storage";
import { useToast } from "@/contexts/ToastContext";

export default function JanamatTimelineManager() {
  const toast = useToast();

  useEffect(() => {
    // Initial seed
    seedMockTimeline();

    const checkReveals = () => {
      const now = Date.now();
      const entries = getTimelineEntries();
      let revealedCount = 0;

      entries.forEach((entry) => {
        if (!entry.revealed && now >= entry.revealAt) {
          updateTimelineEntry(entry.id, { revealed: true });
          // The toast message is now triggered for each revealed capsule
          toast(`A Janamat Timeline entry has been revealed!`, "success");
          revealedCount++;
        }
      });

      // The summary toast is removed as per the instruction's placement of the new toast
      // if (revealedCount > 0) {
      //   toast(`${revealedCount} past opinion${revealedCount > 1 ? "s are" : " is"} now revealed!`, "success");
      //   // Dispatch storage event to notify other components (like TimeCapsuleSection)
      //   window.dispatchEvent(new Event("storage"));
      // }

      // If any entries were revealed, dispatch the storage event
      if (revealedCount > 0) {
        // Dispatch storage event to notify other components (like JanamatTimelineSection)
        window.dispatchEvent(new Event("storage"));
      }
    };

    // Check immediately on mount
    checkReveals();

    const interval = setInterval(checkReveals, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, [toast]);

  return null;
}
