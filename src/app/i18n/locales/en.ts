export default {
  title: "Markdown Converter — Word, PDF, HTML, TXT in your browser",
  subtitle:
    "Paste, upload, or drop your .md file. Convert to Word, PDF, HTML or TXT in one click. Nothing leaves your browser — no signup, no uploads, no limits.",
  brand: "Markdown Converter",
  hero: {
    title: "Markdown to anything.",
    subtitle:
      "Convert Markdown to Word, PDF, HTML or plain text. Browser-only, private, free. Drag a file in or start typing — the preview updates as you go.",
  },
  buttons: {
    upload: "Upload Markdown",
    examples: "Examples",
    clear: "Clear",
    download: "Download",
    downloadDocx: "Download Word (DOCX)",
    downloadPdf: "Download as PDF",
    downloadHtml: "Download HTML",
    downloadTxt: "Download plain text",
    copyMarkdown: "Copy as Markdown",
    copyFormatted: "Copy formatted",
    showPreview: "Show Preview",
    hidePreview: "Hide Preview",
    converting: "Converting...",
    reportBug: "Report Bug",
    requestFeature: "Request Feature",
    runLint: "Check Markdown",
    lintClean: "No issues",
    lintIssues: "issues",
    format: "Format",
    paste: "Paste",
    pasteDetected: "Markdown detected on your clipboard. Paste?",
    install: "Install app",
    installed: "Installed",
    copy: "Copy",
    copied: "Copied",
    selectAll: "Select all",
    deselectAll: "Clear selection",
    jumpTo: "Go to line",
    back: "Back",
    preview: "Preview",
    editor: "Editor",
    copiedToClipboard: "Copied to clipboard",
    pressEsc: "Press Esc to close",
    tabEditor: "Editor",
    tabPreview: "Preview",
    tabSettings: "Settings",
    defaultFormat: "Default download format",
    fileType: "File type",
    more: "More",
    less: "Less",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    dragFileAnywhere: "Drop your .md file anywhere on the page",
    otherTools: "Other tools by Trugraph",
  },
  formats: {
    docx: "Microsoft Word document with headings, tables and styles.",
    pdf: "Print-ready PDF via your browser's Save as PDF dialog.",
    html: "Standalone HTML file you can open, share or host.",
    txt: "Plain text with all Markdown formatting stripped.",
    clipboard: "Copy as rich text. Paste into Gmail, Docs, Slack, Notion.",
    lint: "Markdown lint report with line, severity and message.",
  },
  lint: {
    title: "Markdown Lint",
    noIssues: "No issues — your Markdown is clean.",
    issuesFound: "issue",
    issuesFoundPlural: "issues",
    severity: {
      error: "Error",
      warning: "Warning",
      info: "Info",
    },
    rules: {
      unbalancedFences: "Unbalanced code fences",
      trailingWhitespace: "Trailing whitespace",
      bareUrl: "Bare URL — wrap in <> or [text](url)",
      emptyHeading: "Empty heading",
      emptyLink: "Empty link text",
      missingAlt: "Image missing alt text",
      longLine: "Very long line",
      inconsistentHeading: "List marker inconsistency",
    },
  },
  features: {
    title: "Why Markdown Converter",
    exportAnywhere: {
      title: "Export anywhere",
      description:
        "Convert to Word, PDF, HTML, plain text or the clipboard — all in your browser, no server.",
    },
    privacy: {
      title: "Privacy first",
      description:
        "Conversion runs entirely in your browser. Your Markdown never uploads to any server — ideal for sensitive or confidential documents.",
    },
    smart: {
      title: "Live preview and templates",
      description:
        "See the formatted result as you type. Built-in samples for tables, lists, code blocks and common document patterns.",
    },
    darkMode: {
      title: "Dark and light themes",
      description:
        "Reduce eye strain with a dark theme. Toggle any time — preference applies to both editor and preview.",
    },
    dragAndDrop: {
      title: "Drag-and-drop .md files",
      description:
        "Drop a Markdown file anywhere on the page to load it. Works with .md, .markdown and plain text.",
    },
    examples: {
      title: "Built-in Markdown examples",
      description:
        "One-click samples for tables, lists, code blocks, headings and formatting. Jump-start any document.",
    },
    speed: {
      title: "Instant conversion",
      description:
        "No queues, no server round-trips. Convert as often as you like. Multi-megabyte docs process in seconds.",
    },
    free: {
      title: "Unlimited and free",
      description:
        "No signup, no paywalls, no usage caps. Free for personal and commercial use. No account required.",
    },
    pwa: {
      title: "Installable PWA",
      description:
        "Install on your device for one-tap access and full offline support. Launches in its own window.",
    },
  },
  footer: {
    description: "Markdown Converter by Trugraph",
    developedBy: "Trugraph",
    privacy: "Privacy",
    copyright: "All rights reserved.",
  },
  shortcuts: {
    title: "Keyboard Shortcuts",
    download: "Download (default format)",
    clear: "Clear editor",
    copyHtml: "Copy formatted",
    copyMarkdown: "Copy as Markdown",
    openFile: "Open file",
    toggleTheme: "Toggle theme",
    togglePreview: "Toggle preview",
    openExamples: "Open examples",
    showShortcuts: "Show shortcuts",
    forShortcuts: "? for shortcuts",
    toggleFormat: "Cycle default format",
    runLint: "Run lint",
  },
  faq: {
    title: "Frequently asked questions",
    doINeedToCreateAnAccount: "Do I need an account?",
    doINeedToCreateAnAccountDescription:
      "No. Open the site, paste or upload your Markdown, and download. No signup.",
    doesItWorkOffline: "Does it work offline?",
    doesItWorkOfflineDescription:
      "Yes. Once installed as a PWA or after the page is loaded, conversion runs entirely in your browser. No internet needed.",
    whatFormattingIsPreserved: "What carries over to Word?",
    whatFormattingIsPreservedDescription:
      "Headings (H1–H6), bold and italic, tables, ordered and unordered lists, nested lists, blockquotes, and inline code. The basics, done right.",
    isThisConverterReallyFree: "Is it actually free?",
    isThisConverterReallyFreeDescription:
      "Yes. No trials, no limits. Use it as much as you want.",
    canIExportToPdf: "Can I export to PDF?",
    canIExportToPdfDescription:
      "Yes. Pick 'Download as PDF' and your browser opens the Save as PDF dialog. The output is print-quality.",
    isMyFileUploaded: "Are my files uploaded?",
    isMyFileUploadedDescription:
      "Never. All conversion runs locally in your browser. Network requests are limited to loading the app itself.",
    whichLanguages: "Which languages are supported?",
    whichLanguagesDescription:
      "The interface is translated into English, Arabic, Chinese, Farsi, French, German, Hindi, Portuguese, Russian, Spanish and Urdu. RTL is supported.",
    installApp: "Can I install it as an app?",
    installAppDescription:
      "Yes. In Chrome, Edge or Safari, use 'Install' from the address bar. Once installed it opens in its own window and works offline.",
  },
} as const;