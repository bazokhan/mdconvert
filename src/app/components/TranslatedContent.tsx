"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { createMailtoLink } from "../utils/contact";
export function TranslatedContent() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <>
      {/* Feedback Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <a
          href={createMailtoLink("bug")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {t.buttons.reportBug}
        </a>
        <a
          href={createMailtoLink("feature")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {t.buttons.requestFeature}
        </a>
      </div>

      {/* Competitive Advantages Section */}
      <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">
            {t.features.formatting.title}
          </h2>
          <p className="text-secondary">{t.features.formatting.description}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{t.features.privacy.title}</h2>
          <p className="text-secondary">{t.features.privacy.description}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{t.features.smart.title}</h2>
          <p className="text-secondary">{t.features.smart.description}</p>
        </div>
      </section>

      {/* Features List */}
      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why Choose Our Converter?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            t.features.formatting.title,
            t.features.privacy.title,
            t.features.smart.title,
            t.features.darkMode.title,
            t.features.dragAndDrop.title,
            t.features.examples.title,
            t.features.speed.title,
            t.features.free.title,
          ].map((feature, index) => (
            <div key={index} className="p-3 bg-secondary/5 rounded-lg">
              {feature}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">
              {t.faq.isThisConverterReallyFree}
            </h3>
            <p className="text-secondary">
              {t.faq.isThisConverterReallyFreeDescription}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              {t.faq.doINeedToCreateAnAccount}
            </h3>
            <p className="text-secondary">
              {t.faq.doINeedToCreateAnAccountDescription}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Does it work offline?</h3>
            <p className="text-secondary">
              {t.faq.doesItWorkOfflineDescription}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">
              {t.faq.whatFormattingIsPreserved}
            </h3>
            <p className="text-secondary">
              {t.faq.whatFormattingIsPreservedDescription}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
