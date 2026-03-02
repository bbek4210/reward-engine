"use client";

import { useContext } from "react";
import { ToastContext, ToastType } from "@/contexts/ToastContext";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />,
  error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
  info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
};

const BORDERS: Record<ToastType, string> = {
  success: "border-l-4 border-green-500",
  error: "border-l-4 border-rose-500",
  warning: "border-l-4 border-amber-500",
  info: "border-l-4 border-blue-500",
};

export default function ToastContainer() {
  const ctx = useContext(ToastContext);
  if (!ctx || ctx.toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-9999 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {ctx.toasts.map((t) => (
        <div
          key={t.id}
          className={`bg-white rounded-xl shadow-xl px-4 py-3 flex items-start gap-3 pointer-events-auto animate-slide-up ${BORDERS[t.type]}`}
        >
          {ICONS[t.type]}
          <p className="text-sm text-gray-800 flex-1 leading-snug">
            {t.message}
          </p>
        </div>
      ))}
    </div>
  );
}
