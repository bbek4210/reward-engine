"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface Notification {
  id: number;
  message: string;
  type: ToastType;
  timestamp: Date;
  read: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  notifications: Notification[];
  unreadCount: number;
  toast: (message: string, type?: ToastType) => void;
  markAllRead: () => void;
  clearNotifications: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setNotifications((prev) =>
      [
        { id, message, type, timestamp: new Date(), read: false },
        ...prev,
      ].slice(0, 50),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <ToastContext.Provider
      value={{
        toasts,
        notifications,
        unreadCount,
        toast,
        markAllRead,
        clearNotifications,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}

export function useNotifications() {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error("useNotifications must be used within ToastProvider");
  return {
    notifications: ctx.notifications,
    unreadCount: ctx.unreadCount,
    markAllRead: ctx.markAllRead,
    clearNotifications: ctx.clearNotifications,
  };
}
