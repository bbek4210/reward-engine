"use client";

import Header from "@/components/layout/Header";
import JanamatTimelineSection from "@/components/capsule/JanamatTimelineSection";

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Header variant="dashboard" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <JanamatTimelineSection />
      </div>
    </main>
  );
}
