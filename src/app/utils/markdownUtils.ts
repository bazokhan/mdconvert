import { marked, Tokens } from "marked";
import type { Token } from "marked";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  TextRun,
  ExternalHyperlink,
} from "docx";

// ---------- marked renderer for Word-compatible HTML ----------
// ponytail: cast to `any` — marked v15 types want token-object args, but the
// runtime renderer still accepts the legacy (text, level) positional form
// and that is what this code uses. Cast once, no per-call noise.
export function configureMarkedRenderer() {
  marked.use({
    renderer: {
      heading(text: string, level: number) {
        return `<h${level} style="mso-style-name:Heading ${level}; margin-top:12.0pt; margin-bottom:3.0pt; color: black;">${text}</h${level}>`;
      },
      paragraph(text: string) {
        return `<p style="color: black;">${text}</p>`;
      },
      table(header: string, body: string) {
        return `<table border="1" style="border-collapse:collapse; mso-table-layout-alt:fixed; border:solid windowtext 1.0pt; mso-border-alt:solid windowtext .5pt; background: white;">
          ${header}${body}
        </table>`;
      },
      tablerow(content: string) {
        return `<tr style="mso-yfti-irow:0">${content}</tr>`;
      },
      tablecell(content: string, flags: { header: boolean }) {
        const tag = flags.header ? "th" : "td";
        return `<${tag} style="border:solid windowtext 1.0pt; mso-border-alt:solid windowtext .5pt; padding:5.0pt 5.0pt 5.0pt 5.0pt; color: black;">${content}</${tag}>`;
      },
      list(body: string, ordered: boolean) {
        const tag = ordered ? "ol" : "ul";
        return `<${tag} style="color: black;">${body}</${tag}>`;
      },
      listitem(text: string) {
        return `<li style="color: black;">${text}</li>`;
      },
    } as never,
  });
}

// ---------- Word-compatible HTML (single-page HTML file) ----------
export function generateWordHtml(markdown: string): string {
  configureMarkedRenderer();
  return `
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
        ${marked.parse(markdown, { async: false }) as string}
      </body>
    </html>
  `;
}

type ParagraphChild = TextRun | InstanceType<typeof ExternalHyperlink>;

function getPlainTextFromToken(t: Token): string {
  if ("text" in t && typeof (t as { text?: string }).text === "string")
    return (t as { text: string }).text;
  if ("tokens" in t && Array.isArray((t as { tokens?: Token[] }).tokens)) {
    return (t as { tokens: Token[] }).tokens
      .map(getPlainTextFromToken)
      .join("");
  }
  return "";
}

function inlineTokensToRuns(tokens: Token[]): ParagraphChild[] {
  const runs: ParagraphChild[] = [];
  for (const t of tokens) {
    switch (t.type) {
      case "text":
        if ("text" in t && t.text) {
          runs.push(new TextRun({ text: t.text }));
        }
        break;
      case "strong":
        runs.push(new TextRun({ text: getPlainTextFromToken(t), bold: true }));
        break;
      case "em":
        runs.push(new TextRun({ text: getPlainTextFromToken(t), italics: true }));
        break;
      case "codespan":
        if ("text" in t && t.text) {
          runs.push(
            new TextRun({
              text: t.text,
              font: "Consolas",
              shading: { fill: "F5F5F5" },
            })
          );
        }
        break;
      case "del":
        runs.push(new TextRun({ text: getPlainTextFromToken(t), strike: true }));
        break;
      case "link":
        runs.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: getPlainTextFromToken(t) || (t as Tokens.Link).href,
              }),
            ],
            link: (t as Tokens.Link).href,
          })
        );
        break;
      case "br":
        runs.push(new TextRun({ break: 1 }));
        break;
      case "image":
        runs.push(
          new TextRun({
            text: `[${(t as Tokens.Image).text || "Image"}]`,
            italics: true,
          })
        );
        break;
      default:
        runs.push(new TextRun({ text: getPlainTextFromToken(t) }));
    }
  }
  return runs;
}

function createRunsForBlock(
  text: string,
  inlineTokens?: Token[]
): ParagraphChild[] {
  if (inlineTokens && inlineTokens.length > 0) {
    return inlineTokensToRuns(inlineTokens);
  }
  const runs: ParagraphChild[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|~~[^~]+~~|`[^`]+`)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIndex) {
      runs.push(new TextRun({ text: text.slice(lastIndex, m.index) }));
    }
    const seg = m[1];
    if (seg.startsWith("**") && seg.endsWith("**")) {
      runs.push(new TextRun({ text: seg.slice(2, -2), bold: true }));
    } else if (seg.startsWith("*") && seg.endsWith("*")) {
      runs.push(new TextRun({ text: seg.slice(1, -1), italics: true }));
    } else if (seg.startsWith("~~") && seg.endsWith("~~")) {
      runs.push(new TextRun({ text: seg.slice(2, -2), strike: true }));
    } else if (seg.startsWith("`") && seg.endsWith("`")) {
      runs.push(
        new TextRun({
          text: seg.slice(1, -1),
          font: "Consolas",
          shading: { fill: "F5F5F5" },
        })
      );
    } else {
      runs.push(new TextRun({ text: seg }));
    }
    lastIndex = m.index + seg.length;
  }
  if (lastIndex < text.length) {
    runs.push(new TextRun({ text: text.slice(lastIndex) }));
  }
  return runs.length > 0 ? runs : [new TextRun({ text })];
}

function processBlockquote(quoteToken: Tokens.Blockquote): (Paragraph | Table)[] {
  const inner: (Paragraph | Table)[] = [];
  for (const t of quoteToken.tokens) {
    if (t.type === "paragraph") {
      inner.push(
        new Paragraph({
          children: createRunsForBlock(t.text, t.tokens),
          indent: { left: 720 },
        })
      );
    } else if (t.type === "heading") {
      inner.push(
        new Paragraph({
          children: createRunsForBlock(t.text, t.tokens),
          heading:
            HeadingLevel[`HEADING_${t.depth}` as keyof typeof HeadingLevel],
          style: `Heading${t.depth}`,
          indent: { left: 720 },
        })
      );
    } else if (t.type === "list") {
      inner.push(...processListItems((t as Tokens.List).items, 0, 720));
    } else if (t.type === "code") {
      inner.push(
        new Paragraph({
          children: [
            new TextRun({
              text: (t as Tokens.Code).text,
              font: "Consolas",
              shading: { fill: "F5F5F5" },
            }),
          ],
          shading: { fill: "F5F5F5" },
          indent: { left: 720 },
        })
      );
    }
  }
  return inner;
}

function getListItemContent(item: Tokens.ListItem): ParagraphChild[] {
  const blockTokens = "tokens" in item ? (item as { tokens?: Token[] }).tokens : undefined;
  if (blockTokens?.length) {
    const first = blockTokens[0];
    if (first && (first.type === "paragraph" || first.type === "text")) {
      const text = (first as { text: string }).text;
      const inlineTokens = "tokens" in first ? (first as { tokens?: Token[] }).tokens : undefined;
      return createRunsForBlock(text, inlineTokens);
    }
  }
  return createRunsForBlock(item.text);
}

function processListItems(
  items: Tokens.ListItem[],
  level: number,
  indentLeft?: number
): (Paragraph | Table)[] {
  const result: (Paragraph | Table)[] = [];
  for (const item of items) {
    result.push(
      new Paragraph({
        children: getListItemContent(item),
        bullet: { level },
        indent: indentLeft !== undefined ? { left: indentLeft } : undefined,
      })
    );
    const blockTokens = "tokens" in item ? (item as { tokens?: Token[] }).tokens : undefined;
    if (blockTokens) {
      for (const t of blockTokens) {
        if (t.type === "list") {
          result.push(
            ...processListItems((t as Tokens.List).items, level + 1, indentLeft)
          );
        }
      }
    }
  }
  return result;
}

// ---------- DOCX ----------
export async function convertToDocx(markdown: string): Promise<Blob> {
  configureMarkedRenderer();
  const tokens = marked.lexer(markdown);
  const docElements: (Paragraph | Table)[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "heading":
        docElements.push(
          new Paragraph({
            children: createRunsForBlock(token.text, token.tokens),
            heading:
              HeadingLevel[
                `HEADING_${token.depth}` as keyof typeof HeadingLevel
              ],
            style: `Heading${token.depth}`,
          })
        );
        break;

      case "paragraph":
        docElements.push(
          new Paragraph({
            children: createRunsForBlock(token.text, token.tokens),
          })
        );
        break;

      case "blockquote":
        docElements.push(...processBlockquote(token as Tokens.Blockquote));
        break;

      case "code":
        docElements.push(
          new Paragraph({
            children: [
              new TextRun({
                text: (token as Tokens.Code).text,
                font: "Consolas",
                shading: { fill: "F5F5F5" },
              }),
            ],
            shading: { fill: "F5F5F5" },
          })
        );
        break;

      case "hr":
        docElements.push(new Paragraph({ thematicBreak: true }));
        break;

      case "list":
        docElements.push(...processListItems(token.items, 0));
        break;

      case "table": {
        const rows = [
          new TableRow({
            children: token.header.map(
              (cell: Tokens.TableCell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: createRunsForBlock(cell.text, cell.tokens),
                    }),
                  ],
                  borders: {
                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                  },
                })
            ),
          }),
          ...token.rows.map(
            (row: Tokens.TableCell[]) =>
              new TableRow({
                children: row.map(
                  (cell) =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: createRunsForBlock(cell.text, cell.tokens),
                        }),
                      ],
                    })
                ),
              })
          ),
        ];

        docElements.push(new Table({ rows }));
        break;
      }
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children: docElements }],
  });

  return Packer.toBlob(doc);
}

// ---------- PDF (browser print-to-PDF, zero deps) ----------
export function convertToPdf(markdown: string): void {
  if (typeof window === "undefined") return;
  const html = marked.parse(markdown, { async: false }) as string;
  const printRoot = document.createElement("div");
  printRoot.id = "print-root";
  printRoot.innerHTML = html;
  document.body.appendChild(printRoot);
  const restore = () => {
    printRoot.remove();
    window.removeEventListener("afterprint", restore);
  };
  window.addEventListener("afterprint", restore);
  // ponytail: rely on browser-native dialog. Add server-side PDF only if
  // headless users need it.
  window.print();
}

// ---------- Standalone HTML file ----------
export function convertToHtml(markdown: string): Blob {
  const body = marked.parse(markdown, { async: false }) as string;
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Markdown document</title>
<style>
  :root { color-scheme: light dark; }
  body {
    max-width: 760px;
    margin: 40px auto;
    padding: 0 24px;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.65;
    color: #0f172a;
    background: #fafafa;
  }
  h1, h2, h3, h4, h5, h6 { line-height: 1.25; margin-top: 1.4em; }
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.2rem; }
  p { margin: 0.8em 0; }
  code {
    background: #f1f5f9; padding: 0.1em 0.3em; border-radius: 4px;
    font-family: "JetBrains Mono", Consolas, monospace; font-size: 0.92em;
  }
  pre {
    background: #f1f5f9; padding: 14px; border-radius: 8px; overflow-x: auto;
  }
  blockquote {
    border-left: 3px solid #6366f1; padding-left: 14px;
    margin: 1em 0; color: #475569; font-style: italic;
  }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
  th { background: #f1f5f9; }
  a { color: #6366f1; }
  img { max-width: 100%; }
  @media (prefers-color-scheme: dark) {
    body { color: #f1f5f9; background: #0c0f18; }
    code, pre { background: #1e293b; }
    blockquote { color: #94a3b8; }
    th, td { border-color: #334155; }
    th { background: #1e293b; }
  }
</style>
</head>
<body>
${body}
</body>
</html>`;
  return new Blob([html], { type: "text/html;charset=utf-8" });
}

// ---------- Plain text ----------
export function convertToTxt(markdown: string): Blob {
  const html = marked.parse(markdown, { async: false }) as string;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  // Walk and add double newlines around block elements so output is readable.
  let out = "";
  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      const el = node as HTMLElement;
      const text = el.textContent ?? "";
      if (["P", "LI", "BLOCKQUOTE", "PRE", "TR", "H1", "H2", "H3", "H4", "H5", "H6"].includes(el.tagName)) {
        out += text.trim() + "\n\n";
      } else {
        out += text;
      }
    } else if (node.nodeType === 3) {
      out += (node.textContent ?? "").trim();
    }
  });
  return new Blob([out.replace(/\n{3,}/g, "\n\n").trim() + "\n"], {
    type: "text/plain;charset=utf-8",
  });
}

// ---------- Clipboard ----------
export async function copyMarkdown(markdown: string): Promise<void> {
  await navigator.clipboard.writeText(markdown);
}

export async function copyFormatted(markdown: string): Promise<void> {
  const htmlContent = generateWordHtml(markdown);
  await navigator.clipboard.write([
    new ClipboardItem({
      "text/html": new Blob([htmlContent], { type: "text/html" }),
      "text/plain": new Blob([markdown], { type: "text/plain" }),
    }),
  ]);
}

// ---------- Lint ----------
export type LintSeverity = "error" | "warning" | "info";

export interface LintIssue {
  line: number; // 1-based
  column: number; // 1-based
  rule: keyof typeof LINT_RULES;
  severity: LintSeverity;
  message: string;
}

export interface LintReport {
  issues: LintIssue[];
}

export const LINT_RULES = {
  unbalancedFences: "unbalancedFences",
  trailingWhitespace: "trailingWhitespace",
  bareUrl: "bareUrl",
  emptyHeading: "emptyHeading",
  emptyLink: "emptyLink",
  missingAlt: "missingAlt",
  longLine: "longLine",
  inconsistentHeading: "inconsistentHeading",
} as const;

export function lintMarkdown(markdown: string): LintReport {
  const issues: LintIssue[] = [];
  const lines = markdown.split(/\r?\n/);
  let fenceOpen = false;
  let fenceMarker = "";
  let lastMarkerChar = "";

  lines.forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    const line = rawLine;

    // trailing whitespace
    if (/[ \t]+$/.test(line)) {
      issues.push({
        line: lineNo,
        column: line.search(/[ \t]+$/g) + 1,
        rule: "trailingWhitespace",
        severity: "info",
        message: "Trailing whitespace.",
      });
    }

    // very long line
    if (line.length > 200) {
      issues.push({
        line: lineNo,
        column: 1,
        rule: "longLine",
        severity: "info",
        message: "Line exceeds 200 characters.",
      });
    }

    // code fences
    const fenceMatch = line.match(/^(\s*)(```+|~~~+)/);
    if (fenceMatch) {
      const marker = fenceMatch[2].slice(0, 3);
      if (!fenceOpen) {
        fenceOpen = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        fenceOpen = false;
      }
    }

    // empty heading
    const heading = line.match(/^(#+)\s*$/);
    if (heading) {
      issues.push({
        line: lineNo,
        column: heading[1].length + 1,
        rule: "emptyHeading",
        severity: "warning",
        message: "Empty heading.",
      });
    }

    // empty link
    if (/\[\s*\]\(\s*\)/.test(line)) {
      const m = line.match(/\[\s*\]\(\s*\)/)!;
      issues.push({
        line: lineNo,
        column: (m.index ?? 0) + 1,
        rule: "emptyLink",
        severity: "warning",
        message: "Link has no text or URL.",
      });
    }

    // image missing alt
    const imgMatch = line.match(/!\[(.*?)\]\(/);
    if (imgMatch && imgMatch[1].trim() === "") {
      issues.push({
        line: lineNo,
        column: (imgMatch.index ?? 0) + 1,
        rule: "missingAlt",
        severity: "warning",
        message: "Image is missing alt text.",
      });
    }

    // bare URL (http/https only)
    const bareUrl = line.match(/(^|[\s(])(https?:\/\/[^\s)]+)(?!\))/);
    if (bareUrl && !/[\[(]\s*$/.test(line.slice(0, (bareUrl.index ?? 0) + 2))) {
      issues.push({
        line: lineNo,
        column: (bareUrl.index ?? 0) + 2,
        rule: "bareUrl",
        severity: "info",
        message: "Bare URL — wrap in <> or [text](url).",
      });
    }

    // list marker inconsistency
    const liMatch = line.match(/^(\s*)([-*+]|\d+\.)\s/);
    if (liMatch) {
      const marker = liMatch[2];
      const key = marker.replace(/\d+/, "n");
      if (lastMarkerChar && lastMarkerChar !== key) {
        // only flag at the same indent level, so track first-seen marker
        // per indent depth.
      }
      lastMarkerChar = key;
    }
  });

  if (fenceOpen) {
    issues.push({
      line: lines.length,
      column: 1,
      rule: "unbalancedFences",
      severity: "error",
      message: "Unbalanced code fence — opening fence has no closing fence.",
    });
  }

  return { issues };
}