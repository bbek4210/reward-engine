"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard on initial load
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F7F4F2] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#475569] font-medium">Loading Janamat Rewards...</p>
      </div>
    </div>
  );
}
