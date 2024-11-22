import { ThemeProvider } from './contexts/ThemeContext';
import { MarkdownConverter } from './components/MarkdownConverter';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Markdown to DOCX Converter
          </h1>
          <MarkdownConverter />
        </main>
      </div>
    </ThemeProvider>
  );
}
