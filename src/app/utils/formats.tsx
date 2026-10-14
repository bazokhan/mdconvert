import type { ReactNode } from "react";
import {
  DocumentTextIcon,
  DocumentIcon,
  CodeBracketIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export type OutputFormatId = "docx" | "pdf" | "html" | "txt" | "clipboard" | "lint";

export const OUTPUT_FORMATS: {
  id: OutputFormatId;
  icon: ReactNode;
}[] = [
  { id: "docx", icon: <DocumentTextIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { id: "pdf", icon: <DocumentIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { id: "html", icon: <CodeBracketIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { id: "txt", icon: <DocumentTextIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { id: "clipboard", icon: <ClipboardDocumentIcon className="h-4 w-4" strokeWidth={1.5} /> },
  { id: "lint", icon: <CheckCircleIcon className="h-4 w-4" strokeWidth={1.5} /> },
];

export const DOWNLOAD_FORMATS: OutputFormatId[] = ["docx", "pdf", "html", "txt"];
export const COPY_FORMATS: OutputFormatId[] = ["clipboard"];