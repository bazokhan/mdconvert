"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { marked } from "marked";
import type { Tokens } from "marked";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  TextRun,
  convertInchesToTwip,
} from "docx";
import { saveAs } from "file-saver";
import { Button } from "./Button";
import { MarkdownPreview } from "./MarkdownPreview";
import { ThemeToggle } from "./ThemeToggle";

export function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdown(content);
    };
    reader.readAsText(file);
  };

  const createTableFromToken = (token: Tokens.Table) => {
    return new Table({
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      rows: [
        new TableRow({
          children: token.header.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph({ text: cell.text })],
                borders: {
                  bottom: { style: BorderStyle.SINGLE, size: 1 },
                },
              })
          ),
        }),
        ...token.rows.map(
          (row) =>
            new TableRow({
              children: row.map(
                (cell) =>
                  new TableCell({
                    children: [new Paragraph({ text: cell.text })],
                  })
              ),
            })
        ),
      ],
    });
  };

  const createListParagraph = (token: Tokens.List) => {
    return token.items.map(
      (item) =>
        new Paragraph({
          text: item.text,
          bullet: {
            level: 0,
          },
        })
    );
  };

  const convertToDocx = async () => {
    try {
      setIsConverting(true);
      setError(null);

      const tokens = marked.lexer(markdown);
      const docElements: (Paragraph | Table)[] = [];

      for (const token of tokens) {
        switch (token.type) {
          case "heading":
            docElements.push(
              new Paragraph({
                text: token.text,
                heading:
                  HeadingLevel[
                    `HEADING_${token.depth}` as keyof typeof HeadingLevel
                  ],
              })
            );
            break;

          case "paragraph":
            docElements.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: token.text,
                  }),
                ],
              })
            );
            break;

          case "table":
            if ("header" in token && "rows" in token) {
              docElements.push(createTableFromToken(token as Tokens.Table));
            }
            break;

          case "list":
            if ("items" in token) {
              docElements.push(...createListParagraph(token as Tokens.List));
            }
            break;

          // Add more cases as needed
        }
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: convertInchesToTwip(1),
                  right: convertInchesToTwip(1),
                  bottom: convertInchesToTwip(1),
                  left: convertInchesToTwip(1),
                },
              },
            },
            children: docElements,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "converted-document.docx");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during conversion"
      );
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <input
            type="file"
            accept=".md,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button className="cursor-pointer">Upload Markdown</Button>
          </label>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[60vh]">
        <div className="border border-secondary/20 rounded-lg overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage="markdown"
            theme="vs-dark"
            value={markdown}
            onChange={(value) => setMarkdown(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
            }}
          />
        </div>
        <div className="border border-secondary/20 rounded-lg overflow-hidden">
          <MarkdownPreview markdown={markdown} />
        </div>
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <div className="flex justify-end space-x-4">
        <Button onClick={() => setMarkdown("")}>Clear</Button>
        <Button
          variant="primary"
          onClick={convertToDocx}
          disabled={isConverting || !markdown}
        >
          {isConverting ? "Converting..." : "Convert to DOCX"}
        </Button>
      </div>
    </div>
  );
}
