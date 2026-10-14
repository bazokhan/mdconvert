"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import {
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { LogoMark } from "./LogoMark";
import { MarkdownPreview } from "./MarkdownPreview";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useSettings } from "../contexts/SettingsContext";
import { useToast } from "./Toast";
import { getTranslations } from "../utils/getTranslations";
import { useKeyboardShortcuts, getShortcutLabel } from "../hooks/useKeyboardShortcuts";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { FormatPicker } from "./FormatPicker";
import { LintPanel } from "./LintPanel";
import { DownloadButton } from "./DownloadButton";
import { CopyMenu } from "./CopyMenu";
import {
  lintMarkdown,
  type LintReport,
  generateWordHtml,
} from "../utils/markdownUtils";
import { OUTPUT_FORMATS, type OutputFormatId } from "../utils/formats";
import { OPEN_EXAMPLES_EVENT } from "./ExamplesMenu";

const SHOW_SHORTCUTS_EVENT = "mdconvert:showShortcuts";
const SET_MARKDOWN_EVENT = "setMarkdown";
const MD_DROP_TARGET_SELECTOR = "[data-markdown-converter]";

const looksLikeMarkdown = (s: string) =>
  /(^|\n)(#{1,6}\s|\*\s|\-\s|\d+\.\s|```|>|\|)/.test(s.slice(0, 4096));

export function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("");
  const [shortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [lintPanelOpen, setLintPanelOpen] = useState(false);
  const [lintReport, setLintReport] = useState<LintReport | null>(null);
  const [windowDragActive, setWindowDragActive] = useState(false);
  const [pastePrompt, setPastePrompt] = useState<string | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<"editor" | "preview">(
    "editor"
  );
  const editorRef = useRef<unknown>(null);

  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  const { previewVisible, togglePreview, defaultFormat, setDefaultFormat } =
    useSettings();
  const t = getTranslations(language);
  const { show } = useToast();

  useEffect(() => {
    const handleSetMarkdown = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      setMarkdown(detail ?? "");
    };
    const element = document.querySelector(MD_DROP_TARGET_SELECTOR);
    element?.addEventListener(SET_MARKDOWN_EVENT, handleSetMarkdown as EventListener);
    return () => {
      element?.removeEventListener(SET_MARKDOWN_EVENT, handleSetMarkdown as EventListener);
    };
  }, []);

  useEffect(() => {
    const handler = () => setShortcutsModalOpen(true);
    document.addEventListener(SHOW_SHORTCUTS_EVENT, handler);
    return () => document.removeEventListener(SHOW_SHORTCUTS_EVENT, handler);
  }, []);

  // Window-level drag overlay
  useEffect(() => {
    let depth = 0;
    const isFile = (e: DragEvent) =>
      !!e.dataTransfer && Array.from(e.dataTransfer.types).includes("Files");
    const onDragEnter = (e: DragEvent) => {
      if (!isFile(e)) return;
      depth++;
      setWindowDragActive(true);
    };
    const onDragLeave = () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) setWindowDragActive(false);
    };
    const onDrop = () => {
      depth = 0;
      setWindowDragActive(false);
    };
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  // Paste detection
  useEffect(() => {
    if (markdown) return;
    const handler = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      if (text && looksLikeMarkdown(text)) {
        setPastePrompt(text);
      }
    };
    document.addEventListener("paste", handler);
    return () => document.removeEventListener("paste", handler);
  }, [markdown]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = (e.target?.result as string) ?? "";
        setMarkdown(content);
        show(`${file.name} loaded`, "success");
      };
      reader.readAsText(file);
    },
    [show]
  );

  const onWindowDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      onDrop([file]);
    },
    [onDrop]
  );

  const runLint = useCallback(() => {
    const report = lintMarkdown(markdown);
    setLintReport(report);
    setLintPanelOpen(true);
  }, [markdown]);

  const cycleFormat = useCallback(() => {
    const order: OutputFormatId[] = OUTPUT_FORMATS.map((f) => f.id);
    const idx = order.indexOf(defaultFormat);
    const next = order[(idx + 1) % order.length];
    setDefaultFormat(next);
    show(`${t.buttons.format}: ${next.toUpperCase()}`, "info");
  }, [defaultFormat, setDefaultFormat, show, t.buttons.format]);

  const shortcuts = [
    { keys: getShortcutLabel("mod+s"), description: t.shortcuts.download },
    { keys: getShortcutLabel("mod+shift+f"), description: t.shortcuts.toggleFormat },
    { keys: getShortcutLabel("mod+shift+c"), description: t.shortcuts.copyHtml },
    { keys: getShortcutLabel("mod+shift+m"), description: t.shortcuts.copyMarkdown },
    { keys: getShortcutLabel("mod+shift+l"), description: t.shortcuts.runLint },
    { keys: getShortcutLabel("mod+l"), description: t.shortcuts.clear },
    { keys: getShortcutLabel("mod+o"), description: t.shortcuts.openFile },
    { keys: getShortcutLabel("mod+`"), description: t.shortcuts.toggleTheme },
    { keys: getShortcutLabel("mod+/"), description: t.shortcuts.togglePreview },
    { keys: getShortcutLabel("mod+k"), description: t.shortcuts.openExamples },
    { keys: getShortcutLabel("?"), description: t.shortcuts.showShortcuts },
  ];

  useKeyboardShortcuts({
    onDownload: () =>
      document.querySelector<HTMLButtonElement>('[data-action="primary-download"]')?.click(),
    onClear: () => setMarkdown(""),
    onCopyHtml: () =>
      navigator.clipboard
        .write([
          new ClipboardItem({
            "text/html": new Blob([generateWordHtml(markdown)], { type: "text/html" }),
            "text/plain": new Blob([markdown], { type: "text/plain" }),
          }),
        ])
        .then(() => show(t.buttons.copiedToClipboard, "success"))
        .catch(() => show(t.buttons.converting, "error")),
    onCopyMarkdown: () =>
      navigator.clipboard
        .writeText(markdown)
        .then(() => show(t.buttons.copiedToClipboard, "success"))
        .catch(() => show(t.buttons.converting, "error")),
    onOpenFile: () =>
      document.querySelector<HTMLInputElement>('[data-action="file-input"]')?.click(),
    onToggleTheme: toggleTheme,
    onTogglePreview: togglePreview,
    onOpenExamples: () =>
      document.dispatchEvent(new CustomEvent(OPEN_EXAMPLES_EVENT)),
    onShowShortcuts: () => setShortcutsModalOpen(true),
    onToggleFormat: cycleFormat,
    onRunLint: runLint,
    isModalOpen: shortcutsModalOpen || lintPanelOpen,
  });

  const onPickFile = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".md,.markdown,.txt,text/markdown,text/plain";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = (ev.target?.result as string) ?? "";
        setMarkdown(content);
        show(`${file.name} loaded`, "success");
      };
      reader.readAsText(file);
    };
    input.click();
  }, [show]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-6">
      <div
        data-markdown-converter
        className="surface relative overflow-hidden shadow-soft animate-fade-up delay-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onWindowDrop}
      >
        {/* Top toolbar — glass, single line */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-surface/40 px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-1">
            <span className="mr-2 hidden h-6 items-center gap-1.5 rounded-full bg-primary-soft pl-1 pr-2.5 text-[11px] font-medium text-primary sm:inline-flex">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-fg">
                <LogoMark className="h-2.5 w-2.5" />
              </span>
              {t.brand}
            </span>
            <button
              type="button"
              onClick={onPickFile}
              className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-foreground-soft transition-colors hover:bg-muted/5 hover:text-foreground"
              aria-label={t.buttons.upload}
            >
              <ArrowUpTrayIcon className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">{t.buttons.upload}</span>
            </button>
            <button
              type="button"
              onClick={() => setMarkdown("")}
              disabled={!markdown}
              className="inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm text-foreground-soft transition-colors hover:bg-muted/5 hover:text-foreground disabled:opacity-40"
              aria-label={t.buttons.clear}
            >
              <TrashIcon className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">{t.buttons.clear}</span>
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <FormatPicker value={defaultFormat} onChange={setDefaultFormat} />
            <DownloadButton markdown={markdown} />
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="flex gap-1 border-b border-border bg-surface-2/50 p-2 lg:hidden">
          {(["editor", "preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveMobileTab(tab)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeMobileTab === tab
                  ? "bg-surface text-foreground shadow-soft"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {tab === "editor" ? t.buttons.tabEditor : t.buttons.tabPreview}
            </button>
          ))}
        </div>

        {/* Editor + preview */}
        <div
          className={`grid gap-px bg-border ${
            previewVisible ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
          style={{ minHeight: "clamp(440px, 64vh, 720px)" }}
        >
          <div
            className={`editor-panel relative flex min-h-[440px] flex-col bg-surface ${
              previewVisible && activeMobileTab === "preview" ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="flex h-9 items-center justify-between border-b border-border bg-surface px-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                {t.buttons.editor}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-faint">
                {markdown.split("\n").length} ln
              </span>
            </div>
            <div className="min-h-0 flex-1">
              <Editor
                height="100%"
                defaultLanguage="markdown"
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
                value={markdown}
                onChange={(value) => setMarkdown(value || "")}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                options={{
                  minimap: { enabled: false },
                  fontSize: 15,
                  lineHeight: 24,
                  wordWrap: "on",
                  padding: { top: 18, bottom: 18 },
                  smoothScrolling: true,
                  fontLigatures: true,
                  scrollBeyondLastLine: false,
                  renderLineHighlight: "line",
                  lineNumbersMinChars: 0,
                  guides: { indentation: false },
                  overviewRulerLanes: 0,
                }}
              />
            </div>
          </div>

          {previewVisible && (
            <div
              className={`relative flex min-h-[440px] flex-col bg-surface ${
                activeMobileTab === "editor" ? "hidden lg:flex" : "flex"
              }`}
            >
              <div className="flex h-9 items-center justify-between border-b border-border bg-surface px-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {t.buttons.preview}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={runLint}
                    disabled={!markdown}
                    className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs text-muted transition-colors hover:bg-muted/5 hover:text-foreground disabled:opacity-40"
                  >
                    <ClipboardDocumentCheckIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {t.buttons.runLint}
                  </button>
                  <CopyMenu markdown={markdown} />
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-auto">
                <MarkdownPreview markdown={markdown} />
              </div>
            </div>
          )}
        </div>

        {/* Bottom action row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface-2/40 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 text-xs text-muted">
            {previewVisible ? (
              <button
                type="button"
                onClick={togglePreview}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-muted/5 hover:text-foreground"
              >
                <EyeSlashIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t.buttons.hidePreview}
              </button>
            ) : (
              <button
                type="button"
                onClick={togglePreview}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-muted/5 hover:text-foreground"
              >
                <EyeIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {t.buttons.showPreview}
              </button>
            )}
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="hidden items-center gap-1 sm:inline-flex">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
                {getShortcutLabel("mod+s")}
              </kbd>
              <span>{t.shortcuts.download}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <ArrowDownTrayIcon className="h-4 w-4 text-muted" strokeWidth={1.5} />
            <span className="text-xs text-muted">
              {defaultFormat.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Paste prompt */}
        {pastePrompt ? (
          <div className="m-4 flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary-soft/60 p-3 text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <ClipboardDocumentCheckIcon className="h-4 w-4 text-primary" strokeWidth={1.5} />
              {t.buttons.pasteDetected}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setMarkdown(pastePrompt);
                  setPastePrompt(null);
                }}
                className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-fg transition-colors hover:bg-primary-hover"
              >
                {t.buttons.paste}
              </button>
              <button
                type="button"
                onClick={() => setPastePrompt(null)}
                className="inline-flex h-8 items-center rounded-md px-2.5 text-sm text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
              >
                {t.buttons.back}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Trust row */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-primary" />
          {t.faq.doesItWorkOffline}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-primary" />
          {t.faq.isMyFileUploaded}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-primary" />
          {t.faq.installApp}
        </span>
      </div>

      {/* Window drop overlay */}
      {windowDragActive ? (
        <div
          className="pointer-events-none fixed inset-6 z-50 flex items-center justify-center rounded-3xl border-2 border-dashed border-primary bg-primary/10 backdrop-blur-md"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-2 text-primary">
            <ArrowUpTrayIcon className="h-10 w-10" strokeWidth={1.25} />
            <p className="font-display text-lg">{t.buttons.dragFileAnywhere}</p>
          </div>
        </div>
      ) : null}

      <KeyboardShortcutsModal
        isOpen={shortcutsModalOpen}
        onClose={() => setShortcutsModalOpen(false)}
        shortcuts={shortcuts}
        title={t.shortcuts.title}
        escHint={t.buttons.pressEsc}
      />

      <LintPanel
        isOpen={lintPanelOpen}
        onClose={() => setLintPanelOpen(false)}
        report={lintReport}
        onJumpToLine={(line) => {
          const ed = editorRef.current as
            | {
                revealLineInCenter?: (n: number) => void;
                setPosition?: (p: { lineNumber: number; column: number }) => void;
              }
            | null;
          ed?.revealLineInCenter?.(line);
          ed?.setPosition?.({ lineNumber: line, column: 1 });
        }}
      />

      <input
        data-action="file-input"
        type="file"
        accept=".md,.markdown,.txt"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => setMarkdown((ev.target?.result as string) ?? "");
          reader.readAsText(file);
          e.target.value = "";
        }}
      />
    </section>
  );
}