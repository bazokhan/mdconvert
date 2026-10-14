"use client";

import { useState, useEffect, createContext, useContext, useCallback, ReactNode } from "react";

type ToastKind = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextType {
  show: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, kind: ToastKind = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, kind }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 2400);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto inline-flex max-w-sm items-center gap-2 rounded-full border bg-surface px-4 py-2 text-sm shadow-soft-lg ring-1 ring-border ${
              t.kind === "error"
                ? "border-red-500/30 text-red-600 dark:text-red-400"
                : t.kind === "success"
                  ? "border-primary/30 text-foreground"
                  : "text-foreground"
            }`}
          >
            {t.kind === "success" ? (
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            ) : t.kind === "error" ? (
              <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden />
            ) : null}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}