"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@monaco-editor/react";
import { saveAs } from "file-saver";
import { Button } from "./Button";
import { MarkdownPreview } from "./MarkdownPreview";
import { convertToDocx } from "../utils/markdownUtils";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { getShortcutLabel } from "../hooks/useKeyboardShortcuts";
import { OPEN_EXAMPLES_EVENT } from "./ExamplesMenu";
import {
  ArrowDownTrayIcon,
  DocumentArrowUpIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const SHOW_SHORTCUTS_EVENT = "mdconvert:showShortcuts";

export function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const openFileDialogRef = useRef<(() => void) | null>(null);
  const previewRef = useRef<{ copyFormattedHtml: () => Promise<void> } | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    const handleSetMarkdown = (event: CustomEvent<string>) => {
      setMarkdown(event.detail);
    };

    const element = document.querySelector("[data-markdown-converter]");
    element?.addEventListener(
      "setMarkdown",
      handleSetMarkdown as EventListener
    );

    return () => {
      element?.removeEventListener(
        "setMarkdown",
        handleSetMarkdown as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const handler = () => setShortcutsModalOpen(true);
    document.addEventListener(SHOW_SHORTCUTS_EVENT, handler);
    return () => document.removeEventListener(SHOW_SHORTCUTS_EVENT, handler);
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = (e.target?.result as string) ?? "";
          setMarkdown(content);
        };
        reader.readAsText(file);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [".md", ".markdown"],
      "text/plain": [".txt"],
    },
    multiple: false,
    noClick: true,
  });

  useEffect(() => {
    openFileDialogRef.current = open;
  }, [open]);

  const handleConvertToDocx = useCallback(async () => {
    try {
      setIsConverting(true);
      setError(null);
      const blob = await convertToDocx(markdown);
      saveAs(blob, "converted-document.docx");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during conversion"
      );
    } finally {
      setIsConverting(false);
    }
  }, [markdown]);

  const handleCopyFormattedHtml = useCallback(async () => {
    try {
      await previewRef.current?.copyFormattedHtml();
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  useKeyboardShortcuts({
    onDownload: handleConvertToDocx,
    onClear: () => setMarkdown(""),
    onCopyHtml: handleCopyFormattedHtml,
    onOpenFile: () => openFileDialogRef.current?.(),
    onToggleTheme: toggleTheme,
    onTogglePreview: () => setPreviewVisible((v) => !v),
    onOpenExamples: () =>
      document.dispatchEvent(new CustomEvent(OPEN_EXAMPLES_EVENT)),
    onShowShortcuts: () => setShortcutsModalOpen(true),
    isModalOpen: shortcutsModalOpen,
  });

  const shortcuts = [
    { keys: getShortcutLabel("mod+s"), description: t.shortcuts.download },
    { keys: getShortcutLabel("mod+shift+c"), description: t.shortcuts.copyHtml },
    { keys: getShortcutLabel("mod+l"), description: t.shortcuts.clear },
    { keys: getShortcutLabel("mod+o"), description: t.shortcuts.openFile },
    { keys: getShortcutLabel("mod+`"), description: t.shortcuts.toggleTheme },
    { keys: getShortcutLabel("mod+/"), description: t.shortcuts.togglePreview },
    { keys: getShortcutLabel("mod+k"), description: t.shortcuts.openExamples },
    { keys: getShortcutLabel("?"), description: t.shortcuts.showShortcuts },
  ];

  return (
    <div
      data-markdown-converter
      className="space-y-5"
    >
      <div
        {...getRootProps()}
        className={`relative grid gap-4 [direction:ltr] ${
          previewVisible ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
        }`}
        style={{ minHeight: "clamp(400px, 55vh, 600px)" }}
      >
        <input {...getInputProps()} aria-hidden="true" tabIndex={-1} />
        {isDragActive && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl border-2 border-dashed border-primary bg-primary/5 backdrop-blur-sm">
            <p className="text-base font-medium text-primary">
              Drop your Markdown file here
            </p>
          </div>
        )}
        <div className="editor-panel flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <div className="flex items-center gap-2 border-b border-border bg-muted/[0.03] px-4 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              Markdown
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <Editor
              height="100%"
              defaultLanguage="markdown"
              theme={theme === "dark" ? "vs-dark" : "vs-light"}
              value={markdown}
              onChange={(value) => setMarkdown(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                lineHeight: 24,
                wordWrap: "on",
                padding: { top: 16, bottom: 16 },
                smoothScrolling: true,
                fontLigatures: true,
                scrollBeyondLastLine: false,
                renderLineHighlight: "line",
              }}
            />
          </div>
        </div>
        {previewVisible && (
          <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <MarkdownPreview ref={previewRef} markdown={markdown} />
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" onClick={open} size="md" className="gap-2">
          <DocumentArrowUpIcon className="h-4 w-4" strokeWidth={1.5} />
          {t.buttons.upload}
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="soft"
            size="md"
            onClick={() => setPreviewVisible((v) => !v)}
            className="gap-2"
          >
            {previewVisible ? (
              <>
                <EyeSlashIcon className="h-4 w-4" strokeWidth={1.5} />
                {t.buttons.hidePreview}
              </>
            ) : (
              <>
                <EyeIcon className="h-4 w-4" strokeWidth={1.5} />
                {t.buttons.showPreview}
              </>
            )}
          </Button>
          <Button variant="soft" size="md" onClick={() => setMarkdown("")} className="gap-2">
            <TrashIcon className="h-4 w-4" strokeWidth={1.5} />
            {t.buttons.clear}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleConvertToDocx}
            disabled={isConverting || !markdown}
            className="gap-2"
          >
            <ArrowDownTrayIcon className="h-4 w-4" strokeWidth={1.5} />
            {isConverting ? t.buttons.converting : t.buttons.download}
          </Button>
        </div>
      </div>

      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
        shortcuts={shortcuts}
        title={t.shortcuts.title}
      />
    </div>
  );
}
