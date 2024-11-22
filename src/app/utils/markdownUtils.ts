import { marked, Tokens } from "marked";
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
        ${marked(markdown)}
      </body>
    </html>
  `;
}

// Helper function to parse text and create TextRun elements
function createTextRuns(text: string): TextRun[] {
  // Split the text by bold markers
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // Remove the ** markers and create bold text
      return new TextRun({
        text: part.slice(2, -2),
        bold: true,
      });
    } else {
      // Regular text
      return new TextRun({
        text: part,
      });
    }
  });
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
            children: createTextRuns(token.text),
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
            children: createTextRuns(token.text),
          })
        );
        break;

      case "list":
        token.items.forEach((item: Tokens.ListItem) => {
          docElements.push(
            new Paragraph({
              children: createTextRuns(item.text),
              bullet: {
                level: 0,
              },
            })
          );
        });
        break;

      case "table":
        const rows = [
          new TableRow({
            children: token.header.map(
              (cell: Tokens.TableCell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: createTextRuns(cell.text),
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
                          children: createTextRuns(cell.text),
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
