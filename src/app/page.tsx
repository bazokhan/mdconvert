import { ThemeProvider } from "./contexts/ThemeContext";
import { MarkdownConverter } from "./components/MarkdownConverter";
import { createMailtoLink } from "./utils/contact";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Convert Markdown to Word Documents Online
          </h1>
          <p className="text-center text-lg mb-8 text-secondary max-w-2xl mx-auto">
            Free online tool to convert Markdown to perfectly formatted Word documents. 
            No signup required, works offline, and preserves all formatting.
          </p>
          
          <MarkdownConverter />

          {/* Feedback Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={createMailtoLink('bug')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Report Bug
            </a>
            <a
              href={createMailtoLink('feature')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Request Feature
            </a>
          </div>

          {/* Competitive Advantages Section */}
          <section className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">✨ Perfect Formatting</h2>
              <p className="text-secondary">
                Maintains all heading styles, tables, lists, and formatting exactly as intended.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">🔒 Privacy First</h2>
              <p className="text-secondary">
                Works completely offline. Your documents never leave your device.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">💡 Smart Features</h2>
              <p className="text-secondary">
                Live preview, dark mode, drag & drop, and example templates included.
              </p>
            </div>
          </section>

          {/* Features List */}
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Choose Our Converter?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "✓ Preserves all heading styles",
                "✓ Perfect table conversion",
                "✓ Maintains lists and formatting",
                "✓ Works offline",
                "✓ No account needed",
                "✓ Unlimited conversions",
                "✓ Instant preview",
                "✓ Dark mode support",
                "✓ Drag and drop files",
                "✓ Example templates",
                "✓ Fast and reliable",
                "✓ Free forever"
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
                <h3 className="font-semibold mb-2">Is this converter really free?</h3>
                <p className="text-secondary">Yes, our Markdown to DOCX converter is completely free with no limitations.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do I need to create an account?</h3>
                <p className="text-secondary">No registration required. Just upload your Markdown file and convert instantly.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Does it work offline?</h3>
                <p className="text-secondary">Yes, the converter works entirely in your browser. No internet needed after loading.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What formatting is preserved?</h3>
                <p className="text-secondary">All Markdown formatting including headings, tables, lists, bold, italic, links, and more.</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer for additional SEO content */}
        <footer className="mt-16 py-8 bg-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 text-secondary">
              <p className="mb-4">
                The fastest and most reliable Markdown to DOCX converter. 
                Perfect for documentation, articles, and any text formatting needs.
              </p>
              <p>
                Convert your Markdown files to perfectly formatted Word documents instantly.
                Free, online, and no registration required.
              </p>
            </div>
            
            {/* Attribution */}
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-secondary/80">
              <a 
                href="https://trugraph.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Developed by Trugraph.io
              </a>
              <div className="flex items-center gap-4">
                <a
                  href={createMailtoLink('bug')}
                  className="hover:text-primary transition-colors"
                >
                  Report Bug
                </a>
                <span>•</span>
                <a
                  href={createMailtoLink('feature')}
                  className="hover:text-primary transition-colors"
                >
                  Request Feature
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
