"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { OutputFormatId } from "../utils/formats";

interface SettingsContextType {
  defaultFormat: OutputFormatId;
  setDefaultFormat: (id: OutputFormatId) => void;
  previewVisible: boolean;
  setPreviewVisible: (v: boolean) => void;
  /** Toggles preview — preferred now. */
  togglePreview: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [defaultFormat, _setDefaultFormat] = useState<OutputFormatId>("docx");
  const [previewVisible, _setPreviewVisible] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("defaultFormat") as OutputFormatId | null;
      if (saved) _setDefaultFormat(saved);
      const savedPreview = localStorage.getItem("previewVisible");
      if (savedPreview !== null) _setPreviewVisible(savedPreview === "1");
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, []);

  const setDefaultFormat = (id: OutputFormatId) => {
    _setDefaultFormat(id);
    try {
      localStorage.setItem("defaultFormat", id);
    } catch { /* ignore */ }
  };

  const setPreviewVisible = (v: boolean) => {
    _setPreviewVisible(v);
    try {
      localStorage.setItem("previewVisible", v ? "1" : "0");
    } catch { /* ignore */ }
  };

  const togglePreview = () => setPreviewVisible(!previewVisible);

  return (
    <SettingsContext.Provider
      value={{ defaultFormat, setDefaultFormat, previewVisible, setPreviewVisible, togglePreview }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}