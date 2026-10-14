import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { ToastProvider } from "./components/Toast";
import { MarkdownConverter } from "./components/MarkdownConverter";
import { Navbar } from "./components/Navbar";
import { ServiceWorkerRegistrar } from "./components/ServiceWorkerRegistrar";
import { TranslatedContent } from "./components/TranslatedContent";
import { TranslatedFooter } from "./components/TranslatedFooter";
import { TranslatedHeader } from "./components/TranslatedHeader";

export default async function Home() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <ToastProvider>
          <ServiceWorkerRegistrar />
          <div className="bg-hero-glow min-h-screen">
            <Navbar />
            <main>
              <TranslatedHeader />
              <MarkdownConverter />
              <TranslatedContent />
            </main>
            <TranslatedFooter />
          </div>
        </ToastProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}