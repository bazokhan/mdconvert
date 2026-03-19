export default {
  title: "Markdown to Word in one click",
  subtitle:
    "Paste, upload, or drop your .md file. Get a Word document. No accounts, no uploads to our servers—everything runs in your browser.",
  buttons: {
    upload: "Upload Markdown",
    examples: "Examples",
    clear: "Clear",
    download: "Download DOCX",
    showPreview: "Show Preview",
    hidePreview: "Hide Preview",
    converting: "Converting...",
    reportBug: "Report Bug",
    requestFeature: "Request Feature",
  },
  features: {
    title: "Why md2docx",
    formatting: {
      title: "Full Markdown to Word support",
      description:
        "Headings (H1–H6), tables, ordered and unordered lists, blockquotes, and code blocks convert cleanly to Word styles. No manual reformatting.",
    },
    privacy: {
      title: "Client-side conversion only",
      description:
        "Conversion runs entirely in your browser. Your Markdown never uploads to any server—ideal for sensitive or confidential documents.",
    },
    smart: {
      title: "Live preview and templates",
      description:
        "See the Word-style result as you type. Syntax highlighting and starter templates for tables, lists, and common document patterns.",
    },
    darkMode: {
      title: "Dark and light themes",
      description:
        "Reduce eye strain with a dark theme. Toggle any time—preference applies to both editor and preview.",
    },
    dragAndDrop: {
      title: "Drag-and-drop .md files",
      description:
        "Open Markdown files by dragging them onto the editor. Works with .md, .markdown, and plain text. No file dialogs required.",
    },
    examples: {
      title: "Built-in Markdown examples",
      description:
        "One-click samples for tables, lists, code blocks, headings, and formatting. Jump-start any document or learn Markdown syntax.",
    },
    speed: {
      title: "Instant DOCX conversion",
      description:
        "No queues, no server round-trips. Convert as often as you like. Multi-megabyte docs process in seconds.",
    },
    free: {
      title: "Unlimited and free",
      description:
        "No signup, no paywalls, no usage caps. Free for personal and commercial use. No account required.",
    },
  },
  footer: {
    description: "md2docx by Trugraph",
    developedBy: "Trugraph",
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    download: "Download DOCX",
    clear: "Clear editor",
    copyHtml: "Copy as formatted HTML",
    openFile: "Open file",
    toggleTheme: "Toggle theme",
    togglePreview: "Toggle preview",
    openExamples: "Open examples",
    showShortcuts: "Show shortcuts",
    forShortcuts: "? for shortcuts",
  },
  faq: {
    title: "Questions",
    doINeedToCreateAnAccount: "Do I need an account?",
    doINeedToCreateAnAccountDescription:
      "No. Open the site, paste or upload your Markdown, and download. No signup.",
    doesItWorkOffline: "Does it work offline?",
    doesItWorkOfflineDescription:
      "Yes. Once the page is loaded, conversion runs entirely in your browser. No internet needed after that.",
    whatFormattingIsPreserved: "What carries over to Word?",
    whatFormattingIsPreservedDescription:
      "Headings (H1–H6), bold and italic, tables, ordered and unordered lists, blockquotes, and inline code. The basics, done right.",
    isThisConverterReallyFree: "Is it actually free?",
    isThisConverterReallyFreeDescription:
      "Yes. No trials, no limits. Use it as much as you want.",
  },
} as const;
