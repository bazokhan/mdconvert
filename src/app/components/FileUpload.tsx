import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./Button";

interface FileUploadProps {
  onFileContent: (content: string) => void;
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onFileContent(content);
        };
        reader.readAsText(file);
      }
    },
    [onFileContent]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [".md", ".markdown"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative
        cursor-pointer
        transition-all
        ${isDragActive ? "scale-105" : ""}
      `}
    >
      <input {...getInputProps()} />
      <Button variant="secondary" className="relative">
        <span className="flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload or Drag & Drop Markdown
        </span>
      </Button>
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/10 rounded-lg border-2 border-dashed border-primary">
          <p className="text-primary font-medium">Drop your file here</p>
        </div>
      )}
    </div>
  );
}
