import { marked } from "marked";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";
import { generateWordHtml } from "../utils/markdownUtils";

interface MarkdownPreviewProps {
  markdown: string;
}

export interface MarkdownPreviewHandle {
  copyFormattedHtml: () => Promise<void>;
}

export const MarkdownPreview = forwardRef<MarkdownPreviewHandle, MarkdownPreviewProps>(
  function MarkdownPreview({ markdown }, ref) {
    const [copySuccess, setCopySuccess] = useState(false);
    const { theme } = useTheme();

    const copyFormattedHtml = useCallback(async () => {
      const htmlContent = generateWordHtml(markdown);
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([htmlContent], { type: "text/html" }),
          "text/plain": new Blob([markdown], { type: "text/plain" }),
        }),
      ]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }, [markdown]);

    useImperativeHandle(ref, () => ({
      copyFormattedHtml,
    }), [copyFormattedHtml]);

    return (
      <div className="relative flex min-h-[320px] flex-col">
        <div className="flex items-center justify-between border-b border-border bg-muted/[0.03] px-4 py-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Preview
          </span>
          <button
            type="button"
            onClick={async () => {
              try {
                await copyFormattedHtml();
              } catch (err) {
                console.error("Failed to copy:", err);
              }
            }}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
            aria-label="Copy formatted HTML"
          >
            <ClipboardDocumentIcon className="h-4 w-4" strokeWidth={1.5} />
            {copySuccess ? (
              <span className="text-primary">Copied</span>
            ) : (
              "Copy"
            )}
          </button>
        </div>
        <div
          className={`
            prose prose-sm max-w-none flex-1 overflow-auto px-5 py-5
            ${theme === "dark" ? "prose-invert" : ""}
            prose-headings:!text-foreground prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:!text-xl prose-h2:!text-lg prose-h3:!text-base
            prose-p:!text-foreground prose-p:leading-[1.7] prose-p:my-3
            prose-strong:!text-foreground prose-strong:font-semibold
            prose-ul:!text-foreground prose-ul:my-3 prose-ol:!text-foreground prose-ol:my-3
            prose-li:!text-foreground prose-li:my-0.5
            prose-blockquote:!text-foreground prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:!text-foreground prose-code:bg-muted/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
            prose-pre:!bg-muted/10 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:px-4
            prose-table:!text-foreground prose-th:!text-foreground prose-td:!text-foreground prose-th:font-medium
          `}
          dangerouslySetInnerHTML={{
            __html: marked.parse(markdown, { async: false }) as string,
          }}
        />
      </div>
    );
  }
);
