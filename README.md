# Markdown Converter

**Markdown → Word, PDF, HTML, TXT in your browser.** Paste, upload, or drop your `.md` file — convert in one click. No accounts, no cloud, no uploads. Everything runs locally. Free, installable PWA.

[![Live](https://img.shields.io/badge/demo-markdown.trugraph.io-blue)](https://markdown.trugraph.io) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Multiple export formats** — DOCX (Word), PDF (browser Save as PDF), standalone HTML, plain TXT, and rich-text clipboard paste for Gmail, Docs, Slack, Notion
- **Markdown lint** — catch unbalanced code fences, bare URLs, missing alt text, etc.
- **Privacy-first** — runs 100% in your browser; nothing uploads, ever
- **Installable PWA** — install on any device, works offline
- **11 languages** — Arabic, Chinese, English, Farsi, French, German, Hindi, Portuguese, Russian, Spanish, Urdu (RTL supported)
- **Dark + light themes**
- **Drag & drop** — drop a `.md` file anywhere on the page
- **Live preview**
- **Built-in examples** — Headings, Tables, Lists, Code blocks, etc.
- **Keyboard shortcuts** — `Ctrl+S` download, `Ctrl+Shift+F` cycle format, `?` for help

---

## Quick Start

```bash
git clone https://github.com/bazokhan/mdconvert.git
cd mdconvert
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For analytics (optional), copy `example.env` to `.env` and add your `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.

To regenerate PWA icons / OG image:

```bash
node scripts/gen-icons.mjs
```

---

## Tech Stack

Next.js 15 · React 19 · Monaco Editor · [marked](https://marked.js.org/) · [docx](https://docx.js.org/) · Tailwind CSS · Headless UI

---

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl+S` | Download (default format) |
| `Ctrl+Shift+F` | Cycle default format |
| `Ctrl+Shift+C` | Copy as formatted (HTML) |
| `Ctrl+Shift+M` | Copy as Markdown |
| `Ctrl+Shift+L` | Run lint |
| `Ctrl+L` | Clear editor |
| `Ctrl+O` | Open file |
| `Ctrl+K` | Open examples |
| `Ctrl+/` | Toggle preview |
| `Ctrl+\`` | Toggle theme |
| `?` | Show shortcuts |

On macOS, replace `Ctrl` with `Cmd`.

---

## Development

| Script | Description |
| --- | --- |
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest |
| `node scripts/gen-icons.mjs` | Regenerate icons |

---

## License

MIT © [Trugraph](https://trugraph.io)