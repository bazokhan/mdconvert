"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

export function TranslatedContent() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const features = [
    { title: t.features.exportAnywhere.title, desc: t.features.exportAnywhere.description },
    { title: t.features.privacy.title, desc: t.features.privacy.description },
    { title: t.features.smart.title, desc: t.features.smart.description },
    { title: t.features.darkMode.title, desc: t.features.darkMode.description },
    { title: t.features.dragAndDrop.title, desc: t.features.dragAndDrop.description },
    { title: t.features.speed.title, desc: t.features.speed.description },
    { title: t.features.pwa.title, desc: t.features.pwa.description },
    { title: t.features.free.title, desc: t.features.free.description },
  ];

  const faqs = [
    { q: t.faq.isThisConverterReallyFree, a: t.faq.isThisConverterReallyFreeDescription },
    { q: t.faq.doINeedToCreateAnAccount, a: t.faq.doINeedToCreateAnAccountDescription },
    { q: t.faq.doesItWorkOffline, a: t.faq.doesItWorkOfflineDescription },
    { q: t.faq.whichLanguages, a: t.faq.whichLanguagesDescription },
    { q: t.faq.whatFormattingIsPreserved, a: t.faq.whatFormattingIsPreservedDescription },
    { q: t.faq.canIExportToPdf, a: t.faq.canIExportToPdfDescription },
    { q: t.faq.isMyFileUploaded, a: t.faq.isMyFileUploadedDescription },
    { q: t.faq.installApp, a: t.faq.installAppDescription },
  ];

  return (
    <div className="border-t border-border">
      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-14 grid items-end gap-6 sm:mb-20 lg:grid-cols-[1fr_2fr]">
          <p className="text-eyebrow">{t.features.title}</p>
          <p className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={i}
              className="surface group flex flex-col gap-4 p-6 transition-colors hover:bg-surface-2"
            >
              <span className="font-mono text-xs text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-lg leading-snug text-foreground">
                {f.title}
              </h3>
              <p className="mt-auto text-sm leading-relaxed text-muted">
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface-2/40">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-eyebrow text-center">{t.faq.title}</p>
          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface shadow-soft">
            {faqs.map((faq, i) => (
              <Disclosure key={i} as="div" className="px-5 sm:px-6">
                <DisclosureButton className="group flex w-full items-center justify-between gap-4 py-5 text-left transition-colors">
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base font-medium text-foreground">
                      {faq.q}
                    </span>
                  </span>
                  <PlusIcon
                    className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-data-[open]:rotate-45"
                    strokeWidth={1.5}
                  />
                </DisclosureButton>
                <DisclosurePanel className="pb-6 pl-9 pr-2 text-sm leading-relaxed text-muted">
                  {faq.a}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}