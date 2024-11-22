import { marked } from "marked";
import { Button } from "./Button";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    try {
      marked.use({
        renderer: {
          heading(text, level) {
            return `<h${level} style="mso-style-name:Heading ${level}; margin-top:12.0pt; margin-bottom:3.0pt; color: black;">${text}</h${level}>`;
          },
          paragraph(text) {
            return `<p style="color: black;">${text}</p>`;
          },
          table(header, body) {
            return `<table border="1" style="border-collapse:collapse; mso-table-layout-alt:fixed; border:solid windowtext 1.0pt; mso-border-alt:solid windowtext .5pt; background: white;">
              ${header}${body}
            </table>`;
          },
          tablerow(content) {
            return `<tr style="mso-yfti-irow:0">${content}</tr>`;
          },
          tablecell(content, flags) {
            const tag = flags.header ? "th" : "td";
            return `<${tag} style="border:solid windowtext 1.0pt; mso-border-alt:solid windowtext .5pt; padding:5.0pt 5.0pt 5.0pt 5.0pt; color: black;">${content}</${tag}>`;
          },
          list(body, ordered) {
            const tag = ordered ? "ol" : "ul";
            return `<${tag} style="color: black;">${body}</${tag}>`;
          },
          listitem(text) {
            return `<li style="color: black;">${text}</li>`;
          },
        },
      });

      const htmlContent = `
        <html xmlns:w="urn:schemas-microsoft-com:office:word">
          <head>
            <meta charset="utf-8">
            <style>
              <!--@page WordSection1 {margin:1.0in 1.0in 1.0in 1.0in;}-->
              body { color: black; background: white; }
              h1 { mso-style-name:"Heading 1"; }
              h2 { mso-style-name:"Heading 2"; }
              h3 { mso-style-name:"Heading 3"; }
              h4 { mso-style-name:"Heading 4"; }
              h5 { mso-style-name:"Heading 5"; }
              h6 { mso-style-name:"Heading 6"; }
            </style>
          </head>
          <body>
            ${marked(markdown)}
          </body>
        </html>
      `;

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
