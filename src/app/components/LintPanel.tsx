"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import type { LintReport, LintSeverity } from "../utils/markdownUtils";

interface LintPanelProps {
  isOpen: boolean;
  onClose: () => void;
  report: LintReport | null;
  onJumpToLine?: (line: number) => void;
}

const severityStyles: Record<LintSeverity, string> = {
  error: "bg-red-500/10 text-red-600 dark:text-red-400",
  warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export function LintPanel({ isOpen, onClose, report, onJumpToLine }: LintPanelProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const issues = report?.issues ?? [];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-foreground/30 backdrop-blur-sm" aria-hidden />
        </Transition.Child>
        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in duration-150"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="flex h-full w-screen max-w-md flex-col bg-surface shadow-soft-lg ring-1 ring-border">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Dialog.Title className="text-base font-semibold text-foreground">
                  {t.lint.title}
                </Dialog.Title>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.buttons.pressEsc}
                  className="rounded-md p-1.5 text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
                >
                  <XMarkIcon className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4">
                {issues.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                    <span className="text-3xl">✨</span>
                    <p className="text-sm text-muted">{t.lint.noIssues}</p>
                    <p className="text-xs text-muted">{t.buttons.lintClean}</p>
                  </div>
                ) : (
                  <>
                    <p className="mb-3 text-sm text-muted">
                      {issues.length}{" "}
                      {issues.length === 1
                        ? t.lint.issuesFound
                        : t.lint.issuesFoundPlural}
                    </p>
                    <ul className="space-y-2">
                      {issues.map((iss, i) => (
                        <li
                          key={i}
                          className={`rounded-lg border border-border p-3 ${severityStyles[iss.severity]}`}
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => onJumpToLine?.(iss.line)}
                              className="font-mono text-xs text-foreground underline-offset-2 hover:underline"
                            >
                              {iss.line}:{iss.column}
                            </button>
                            <span className="text-xs uppercase tracking-wider">
                              {t.lint.severity[iss.severity]}
                            </span>
                          </div>
                          <p className="mt-1 text-sm">{iss.message}</p>
                          <p className="mt-1 text-xs text-muted">
                            {t.lint.rules[iss.rule]}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}