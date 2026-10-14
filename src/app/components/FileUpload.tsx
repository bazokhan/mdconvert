"use client";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Button } from "./Button";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

interface FileUploadProps {
  onFileContent: (content: string) => void;
  onReady?: (open: () => void) => void;
}

export function FileUpload({ onFileContent, onReady }: FileUploadProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);

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

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "text/markdown": [".md", ".markdown"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  useEffect(() => {
    onReady?.(open);
  }, [open, onReady]);

  return (
    <div
      {...getRootProps()}
      className={`relative transition-all ${isDragActive ? "scale-[1.02]" : ""}`}
    >
      <input {...getInputProps()} aria-label={t.buttons.upload} />
      <Button variant="outline" className="gap-2" type="button" onClick={open}>
        <ArrowUpTrayIcon className="h-4 w-4" strokeWidth={1.5} />
        {t.buttons.upload}
      </Button>
      {isDragActive && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/10">
          <p className="font-medium text-primary">{t.buttons.dragFileAnywhere}</p>
        </div>
      )}
    </div>
  );
}
