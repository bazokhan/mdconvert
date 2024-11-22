"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { marked } from "marked";
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { saveAs } from "file-saver";
import { Button } from "./Button";

export function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("");

  const convertToDocx = async () => {
    const tokens = marked.lexer(markdown);
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: tokens.map((token) => {
            if (token.type === "heading") {
              return new Paragraph({
                text: token.text,
                heading:
                  HeadingLevel[
                    `HEADING_${token.depth}` as keyof typeof HeadingLevel
                  ],
              });
            }
            if (token.type === "paragraph") {
              return new Paragraph({
                text: token.text,
              });
            }
            // Add more token type handlers here
            return new Paragraph({ text: "" });
          }),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "converted-document.docx");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="h-[60vh] border border-secondary/20 rounded-lg overflow-hidden">
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
      <div className="flex justify-end space-x-4">
        <Button onClick={() => setMarkdown("")}>Clear</Button>
        <Button variant="primary" onClick={convertToDocx}>
          Convert to DOCX
        </Button>
      </div>
    </div>
  );
}
