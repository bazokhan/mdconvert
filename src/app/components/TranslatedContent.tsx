"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  BugAntIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { createMailtoLink } from "../utils/contact";

export function TranslatedContent() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const features = [
    { title: t.features.formatting.title, desc: t.features.formatting.description },
    { title: t.features.privacy.title, desc: t.features.privacy.description },
    { title: t.features.smart.title, desc: t.features.smart.description },
    { title: t.features.darkMode.title, desc: t.features.darkMode.description },
    { title: t.features.dragAndDrop.title, desc: t.features.dragAndDrop.description },
    { title: t.features.examples.title, desc: t.features.examples.description },
    { title: t.features.speed.title, desc: t.features.speed.description },
    { title: t.features.free.title, desc: t.features.free.description },
  ];

  const faqs = [
    { q: t.faq.isThisConverterReallyFree, a: t.faq.isThisConverterReallyFreeDescription },
    { q: t.faq.doINeedToCreateAnAccount, a: t.faq.doINeedToCreateAnAccountDescription },
    { q: t.faq.doesItWorkOffline, a: t.faq.doesItWorkOfflineDescription },
    { q: t.faq.whatFormattingIsPreserved, a: t.faq.whatFormattingIsPreservedDescription },
  ];

  return (
    <div className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-4">
          <a
            href={createMailtoLink("bug")}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
          >
            <BugAntIcon className="h-4 w-4" strokeWidth={1.5} />
            {t.buttons.reportBug}
          </a>
          <a
            href={createMailtoLink("feature")}
            className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/15"
          >
            <LightBulbIcon className="h-4 w-4" strokeWidth={1.5} />
            {t.buttons.requestFeature}
          </a>
        </div>

        <section className="mt-16">
          <h2 className="text-center text-xl font-semibold text-foreground">
            {t.features.title}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-background p-5 transition-colors hover:border-border-strong"
              >
                <div className="font-medium text-foreground">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 max-w-2xl">
          <h2 className="text-center text-xl font-semibold text-foreground">
            {t.faq.title}
          </h2>
          <div className="mt-8 space-y-1">
            {faqs.map((faq, i) => (
              <Disclosure key={i} as="div" className="rounded-lg border border-border bg-background">
                <DisclosureButton className="group flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/5">
                  <span className="text-sm font-medium text-foreground">{faq.q}</span>
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted transition-transform group-data-[open]:rotate-180" strokeWidth={1.5} />
                </DisclosureButton>
                <DisclosurePanel className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted">
                  {faq.a}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
