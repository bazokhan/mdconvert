"use client";

import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { saveAs } from "file-saver";
import { Button } from "./Button";
import { MarkdownPreview } from "./MarkdownPreview";
import { ThemeToggle } from "./ThemeToggle";
import { convertToDocx } from "../utils/markdownUtils";

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

  const handleConvertToDocx = async () => {
    try {
      setIsConverting(true);
      setError(null);

      const blob = await convertToDocx(markdown);
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
          onClick={handleConvertToDocx}
          disabled={isConverting || !markdown}
        >
          {isConverting ? "Converting..." : "Convert to DOCX"}
        </Button>
      </div>
    </div>
  );
}
