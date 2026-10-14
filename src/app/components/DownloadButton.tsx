"use client";

import { useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { saveAs } from "file-saver";
import { Button } from "./Button";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { useToast } from "./Toast";
import {
  convertToDocx,
  convertToHtml,
  convertToTxt,
  convertToPdf,
} from "../utils/markdownUtils";
import { useSettings } from "../contexts/SettingsContext";
import type { OutputFormatId } from "../utils/formats";

interface DownloadButtonProps {
  markdown: string;
  disabled?: boolean;
}

export function DownloadButton({ markdown, disabled }: DownloadButtonProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const { show } = useToast();
  const { defaultFormat, setDefaultFormat } = useSettings();
  const [loading, setLoading] = useState(false);

  const handle = async (fmt: OutputFormatId) => {
    setDefaultFormat(fmt);
    try {
      setLoading(true);
      const filenameBase = "markdown-converter";
      switch (fmt) {
        case "docx": {
          const blob = await convertToDocx(markdown);
          saveAs(blob, `${filenameBase}.docx`);
          show(t.buttons.downloadDocx, "success");
          break;
        }
        case "pdf":
          convertToPdf(markdown);
          show(t.buttons.downloadPdf, "success");
          break;
        case "html": {
          const blob = convertToHtml(markdown);
          saveAs(blob, `${filenameBase}.html`);
          show(t.buttons.downloadHtml, "success");
          break;
        }
        case "txt": {
          const blob = convertToTxt(markdown);
          saveAs(blob, `${filenameBase}.txt`);
          show(t.buttons.downloadTxt, "success");
          break;
        }
      }
    } catch (err) {
      show(
        err instanceof Error ? err.message : t.buttons.converting,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const labelKey = `download${defaultFormat.charAt(0).toUpperCase() + defaultFormat.slice(1)}` as
    | "downloadDocx"
    | "downloadPdf"
    | "downloadHtml"
    | "downloadTxt";
  const label = t.buttons[labelKey] as string;

  return (
    <div className="inline-flex items-center">
      <Button
        variant="primary"
        onClick={() => handle(defaultFormat)}
        disabled={disabled || loading || !markdown}
        loading={loading}
        className="rounded-r-none border-r border-white/15"
      >
        <ArrowDownTrayIcon className="h-4 w-4" strokeWidth={1.75} />
        {label}
      </Button>
      <Menu as="div" className="relative -ml-px">
        <MenuButton
          disabled={disabled || loading || !markdown}
          className="inline-flex h-9 items-center justify-center rounded-r-md bg-primary px-2 text-primary-fg transition-colors hover:bg-primary-hover disabled:opacity-50"
          aria-label={t.buttons.more}
        >
          <ChevronDownIcon className="h-4 w-4 transition-transform data-[open]:rotate-180" strokeWidth={1.75} />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom end"
          className="z-50 mt-1.5 w-60 origin-top-right rounded-xl bg-surface py-1.5 shadow-soft-lg ring-1 ring-border focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out"
        >
          {(["docx", "pdf", "html", "txt"] as OutputFormatId[]).map((fmt) => {
            const key = `download${fmt.charAt(0).toUpperCase() + fmt.slice(1)}` as
              | "downloadDocx"
              | "downloadPdf"
              | "downloadHtml"
              | "downloadTxt";
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => handle(fmt)}
                className={`flex w-full items-start gap-2 px-3 py-2 text-left transition-colors data-[focus]:bg-muted/10 ${
                  defaultFormat === fmt
                    ? "bg-primary/10 text-primary"
                    : "text-foreground"
                }`}
              >
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {t.buttons[key]}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {t.formats[fmt as keyof typeof t.formats]}
                  </span>
                </span>
              </button>
            );
          })}
        </MenuItems>
      </Menu>
    </div>
  );
}
