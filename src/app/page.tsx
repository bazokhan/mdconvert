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
        <main className="container mx-auto py-8 px-4">
          <TranslatedHeader />
          <MarkdownConverter />
          <TranslatedContent />
        </main>
        <TranslatedFooter />
      </div>
    </ThemeProvider>
  );
}
