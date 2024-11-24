"use client";

import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { saveAs } from "file-saver";
import { Button } from "./Button";
import { MarkdownPreview } from "./MarkdownPreview";
import { convertToDocx } from "../utils/markdownUtils";
import { FileUpload } from "./FileUpload";

export function MarkdownConverter() {
  const [markdown, setMarkdown] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSetMarkdown = (event: CustomEvent<string>) => {
      setMarkdown(event.detail);
    };

    const element = document.querySelector("[data-markdown-converter]");
    element?.addEventListener(
      "setMarkdown",
      handleSetMarkdown as EventListener
    );

    return () => {
      element?.removeEventListener(
        "setMarkdown",
        handleSetMarkdown as EventListener
      );
    };
  }, []);

  const handleFileContent = (content: string) => {
    setMarkdown(content);
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
    <div
      data-markdown-converter
      className="w-full max-w-7xl mx-auto p-4 space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <FileUpload onFileContent={handleFileContent} />
        </div>
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
          {isConverting ? "Converting..." : "Download DOCX"}
        </Button>
      </div>
    </div>
  );
}
