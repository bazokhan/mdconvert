import { ThemeProvider } from "./contexts/ThemeContext";
import { MarkdownConverter } from "./components/MarkdownConverter";
import { Navbar } from "./components/Navbar";
import { TranslatedContent } from "./components/TranslatedContent";
import { TranslatedFooter } from "./components/TranslatedFooter";
import { TranslatedHeader } from "./components/TranslatedHeader";

export default async function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <TranslatedHeader />
            <MarkdownConverter />
          </div>
          <TranslatedContent />
        </main>
        <TranslatedFooter />
      </div>
    </ThemeProvider>
  );
}
