"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {
        // Silent fail — the app still works without SW.
      });
  }, []);
  return null;
}