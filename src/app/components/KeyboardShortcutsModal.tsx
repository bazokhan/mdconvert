"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

export interface ShortcutItem {
  keys: string;
  description: string;
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: ShortcutItem[];
  title: string;
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  shortcuts,
  title,
}: KeyboardShortcutsModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        aria-labelledby="keyboard-shortcuts-title"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-surface shadow-soft-lg ring-1 ring-border transition-all">
                <Dialog.Title
                  id="keyboard-shortcuts-title"
                  className="px-6 pt-6 text-lg font-semibold text-foreground"
                >
                  {title}
                </Dialog.Title>
                <div className="px-6 py-4">
                  <dl className="space-y-3">
                    {shortcuts.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4"
                      >
                        <dt className="text-sm text-foreground">
                          {item.description}
                        </dt>
                        <dd>
                          <kbd className="inline-flex items-center rounded-md border border-border bg-muted/10 px-2.5 py-1 font-mono text-xs text-foreground">
                            {item.keys}
                          </kbd>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-xs text-muted">
                    Press{" "}
                    <kbd className="rounded border border-border bg-muted/10 px-1 py-0.5 font-mono">
                      Esc
                    </kbd>{" "}
                    to close
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
