import { marked } from "marked";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  return (
    <div
      className="prose prose-sm md:prose-base dark:prose-invert max-w-none h-full overflow-auto p-4"
      dangerouslySetInnerHTML={{ __html: marked(markdown) }}
    />
  );
}
