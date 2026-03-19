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

// Configure marked renderer for Word-compatible HTML
export function configureMarkedRenderer() {
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
}

// Generate Word-compatible HTML
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

/** Get plain text from an inline token (for link text, etc.) */
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

/** Convert marked inline tokens to docx Paragraph children (TextRun, ExternalHyperlink) */
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
        runs.push(
          new TextRun({
            text: getPlainTextFromToken(t),
            bold: true,
          })
        );
        break;
      case "em":
        runs.push(
          new TextRun({
            text: getPlainTextFromToken(t),
            italics: true,
          })
        );
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
        runs.push(
          new TextRun({
            text: getPlainTextFromToken(t),
            strike: true,
          })
        );
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
        // Images: use alt text as placeholder in Word
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

/** Create paragraph children from block token text, using inline tokens when available */
function createRunsForBlock(
  text: string,
  inlineTokens?: Token[]
): ParagraphChild[] {
  if (inlineTokens && inlineTokens.length > 0) {
    return inlineTokensToRuns(inlineTokens);
  }
  // Fallback: regex for **bold** and *italic*
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

/** Process blockquote: render inner blocks recursively */
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

/** Get item content: first paragraph/text block's content, or fallback to item text */
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

/** Process list items recursively, including nested lists */
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

// Convert markdown to DOCX document
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

      case "table":
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

        docElements.push(
          new Table({
            rows,
          })
        );
        break;
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: docElements,
      },
    ],
  });

  return Packer.toBlob(doc);
}
