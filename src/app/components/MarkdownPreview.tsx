import { marked } from "marked";
import { Button } from "./Button";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { generateWordHtml } from "../utils/markdownUtils";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    try {
      const htmlContent = generateWordHtml(markdown);

      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "-9999px";
      container.innerHTML = htmlContent;
      document.body.appendChild(container);

      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(container);
      selection?.removeAllRanges();
      selection?.addRange(range);

      document.execCommand("copy");

      selection?.removeAllRanges();
      document.body.removeChild(container);

      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="relative h-full">
      <Button
        onClick={handleCopy}
        variant="secondary"
        className="absolute top-2 right-2 p-2 z-10"
        aria-label="Copy text"
      >
        <ClipboardDocumentIcon className="h-5 w-5" />
        {copySuccess && (
          <span className="absolute -bottom-8 right-0 text-xs bg-secondary px-2 py-1 rounded whitespace-nowrap">
            Copied with formatting!
          </span>
        )}
      </Button>
      <div
        className={`
          prose max-w-none h-full overflow-auto p-4
          ${theme === "dark" ? "prose-invert" : ""}
          prose-headings:!text-foreground
          prose-p:!text-foreground
          prose-strong:!text-foreground
          prose-ul:!text-foreground
          prose-ol:!text-foreground
          prose-li:!text-foreground
          prose-table:!text-foreground
          prose-blockquote:!text-foreground
        `}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}
