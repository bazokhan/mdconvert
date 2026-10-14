"use client";

import { marked } from "marked";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const html = marked.parse(markdown, { async: false }) as string;

  if (!markdown) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div className="max-w-xs">
          <p className="font-display text-lg text-muted">{t.buttons.preview}</p>
          <p className="mt-2 text-sm text-faint">{t.subtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        prose prose-sm max-w-none px-7 py-7
        ${theme === "dark" ? "prose-invert" : ""}
        prose-headings:!text-foreground prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:!text-2xl prose-h2:!text-xl prose-h3:!text-base
        prose-p:!text-foreground prose-p:leading-[1.7] prose-p:my-3
        prose-strong:!text-foreground prose-strong:font-semibold
        prose-ul:!text-foreground prose-ul:my-3 prose-ol:!text-foreground prose-ol:my-3
        prose-li:!text-foreground prose-li:my-0.5
        [&_li_ul]:pl-6 [&_li_ol]:pl-6 [&_li_ul]:mt-1 [&_li_ol]:mt-1
        prose-blockquote:!text-foreground prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:not-italic
        prose-code:!text-foreground prose-code:bg-muted/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
        prose-pre:!bg-surface-2 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:px-4
        prose-table:!text-foreground prose-th:!text-foreground prose-td:!text-foreground prose-th:font-medium
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}