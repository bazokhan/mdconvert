"use client";

import { useEffect, useCallback } from "react";

export interface ShortcutConfig {
  onDownload?: () => void;
  onClear?: () => void;
  onCopyHtml?: () => void;
  onCopyMarkdown?: () => void;
  onOpenFile?: () => void;
  onToggleTheme?: () => void;
  onTogglePreview?: () => void;
  onOpenExamples?: () => void;
  onShowShortcuts?: () => void;
  onToggleFormat?: () => void;
  onRunLint?: () => void;
  isModalOpen?: boolean;
}

const isModifier = (e: KeyboardEvent) => (e.ctrlKey || e.metaKey) && !e.altKey;

export function useKeyboardShortcuts(config: ShortcutConfig) {
  const {
    onDownload,
    onClear,
    onCopyHtml,
    onCopyMarkdown,
    onOpenFile,
    onToggleTheme,
    onTogglePreview,
    onOpenExamples,
    onShowShortcuts,
    onToggleFormat,
    onRunLint,
    isModalOpen = false,
  } = config;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "Escape") return;
      }

      const modifier = isModifier(e);

      if (e.key === "?") {
        if (!isModalOpen && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          onShowShortcuts?.();
        }
        return;
      }

      if (modifier && e.key === "s") {
        e.preventDefault();
        onDownload?.();
        return;
      }

      if (modifier && e.shiftKey && e.key === "C") {
        e.preventDefault();
        onCopyHtml?.();
        return;
      }

      if (modifier && e.shiftKey && e.key === "M") {
        e.preventDefault();
        onCopyMarkdown?.();
        return;
      }

      if (modifier && e.key === "l") {
        e.preventDefault();
        onClear?.();
        return;
      }

      if (modifier && e.key === "o") {
        e.preventDefault();
        onOpenFile?.();
        return;
      }

      if (modifier && e.key === "`") {
        e.preventDefault();
        onToggleTheme?.();
        return;
      }

      if (modifier && e.key === "/") {
        e.preventDefault();
        onTogglePreview?.();
        return;
      }

      if (modifier && e.key === "k") {
        e.preventDefault();
        onOpenExamples?.();
        return;
      }

      if (modifier && e.shiftKey && e.key === "F") {
        e.preventDefault();
        onToggleFormat?.();
        return;
      }

      if (modifier && e.shiftKey && e.key === "L") {
        e.preventDefault();
        onRunLint?.();
        return;
      }
    },
    [
      onDownload,
      onClear,
      onCopyHtml,
      onCopyMarkdown,
      onOpenFile,
      onToggleTheme,
      onTogglePreview,
      onOpenExamples,
      onShowShortcuts,
      onToggleFormat,
      onRunLint,
      isModalOpen,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

export function getShortcutLabel(key: string): string {
  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const cmd = isMac ? "⌘" : "Ctrl";
  const labels: Record<string, string> = {
    "mod+s": `${cmd}+S`,
    "mod+shift+c": `${cmd}+Shift+C`,
    "mod+shift+m": `${cmd}+Shift+M`,
    "mod+l": `${cmd}+L`,
    "mod+o": `${cmd}+O`,
    "mod+`": `${cmd}+\``,
    "mod+/": `${cmd}+/`,
    "mod+k": `${cmd}+K`,
    "mod+shift+f": `${cmd}+Shift+F`,
    "mod+shift+l": `${cmd}+Shift+L`,
    "?": "?",
  };
  return labels[key] ?? key;
}