import { ThemeProvider } from "./contexts/ThemeContext";
import { MarkdownConverter } from "./components/MarkdownConverter";
import { createMailtoLink } from "./utils/contact";
import { Navbar } from "./components/Navbar";
import { getTranslations, Language } from "./utils/getTranslations";
import { headers } from "next/headers";
import { TranslatedContent } from "./components/TranslatedContent";

export default async function Home() {
  // Get language from cookie on server side
  const headersList = await headers();
  const cookies = headersList.get("cookie") || "";
  const lang = (cookies.match(/NEXT_LOCALE=([^;]+)/)?.[1] || "en") as Language;

  // Get translations on server side for SEO content
  const t = getTranslations(lang);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t.title}
          </h1>
          <p className="text-center text-lg mb-8 text-secondary max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <MarkdownConverter />
          <TranslatedContent />
        </main>

        {/* Footer for additional SEO content */}
        <footer className="mt-16 py-8 bg-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 text-secondary">
              <p className="mb-4">{t.footer.description}</p>
            </div>

            {/* Attribution */}
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-secondary/80">
              <a
                href="https://trugraph.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {t.footer.developedBy}
              </a>
              <div className="flex items-center gap-4">
                <a
                  href={createMailtoLink("bug")}
                  className="hover:text-primary transition-colors"
                >
                  {t.buttons.reportBug}
                </a>
                <span>•</span>
                <a
                  href={createMailtoLink("feature")}
                  className="hover:text-primary transition-colors"
                >
                  {t.buttons.requestFeature}
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
