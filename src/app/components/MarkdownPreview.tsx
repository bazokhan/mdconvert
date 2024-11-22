import { marked } from "marked";
import { Button } from "./Button";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      // Convert markdown to plain text (removing markdown syntax)
      const parsedHtml = await marked.parse(markdown);
      const plainText = parsedHtml
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/&[^;]+;/g, (match) => {
          // Convert HTML entities
          const textarea = document.createElement("textarea");
          textarea.innerHTML = match;
          return textarea.value;
        });

      await navigator.clipboard.writeText(plainText);
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
        className="absolute top-2 right-2 p-2"
        aria-label="Copy text"
      >
        <ClipboardDocumentIcon className="h-5 w-5" />
        {copySuccess && (
          <span className="absolute -bottom-8 right-0 text-xs bg-secondary px-2 py-1 rounded">
            Copied!
          </span>
        )}
      </Button>
      <div
        className="prose prose-sm md:prose-base dark:prose-invert max-w-none h-full overflow-auto p-4"
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}
