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
    title: "What you get",
    formatting: {
      title: "Formatting that sticks",
      description:
        "Headings, tables, lists, bold, italic—all carried over into Word without a hitch.",
    },
    privacy: {
      title: "Stays on your machine",
      description:
        "Conversion happens in your browser. Your files never touch our servers.",
    },
    smart: {
      title: "Built for writers",
      description:
        "Live preview, syntax highlighting, templates, and shortcuts so you can stay in flow.",
    },
    darkMode: {
      title: "Dark mode",
      description:
        "Easy on the eyes when you're working late.",
    },
    dragAndDrop: {
      title: "Drag and drop",
      description:
        "Drop a .md file onto the editor. Done.",
    },
    examples: {
      title: "Starter templates",
      description:
        "Quick-start examples for tables, lists, code blocks, and more.",
    },
    speed: {
      title: "Fast",
      description:
        "No waiting in line. Convert as often as you like.",
    },
    free: {
      title: "Free",
      description:
        "No paywalls, no signup. Use it whenever you need it.",
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
