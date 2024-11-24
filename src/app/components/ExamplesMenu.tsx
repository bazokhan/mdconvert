import { useState } from "react";
import { Button } from "./Button";
import { markdownExamples } from "../utils/markdownExamples";
import type { MarkdownExample } from "../utils/markdownExamples";

interface ExamplesMenuProps {
  onSelectExample: (markdown: string) => void;
}

export function ExamplesMenu({ onSelectExample }: ExamplesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExampleSelect = (example: MarkdownExample) => {
    onSelectExample(example.markdown);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <span>Examples</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 rounded-md shadow-lg bg-background border border-secondary/20">
          <div className="rounded-md max-h-96 overflow-y-auto">
            <div className="py-1">
              {markdownExamples.map((example, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-2 hover:bg-secondary/10 focus:bg-secondary/10 transition-colors"
                  onClick={() => {
                    handleExampleSelect(example);
                  }}
                >
                  <div className="font-medium text-foreground">
                    {example.title}
                  </div>
                  <div className="text-sm text-secondary">
                    {example.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
