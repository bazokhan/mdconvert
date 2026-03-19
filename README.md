# md2docx

**Markdown to Word in one click.** Paste, upload, or drop your .md file—get a Word document. No accounts, no cloud. Everything runs in your browser.

[![Live](https://img.shields.io/badge/demo-md2docx.trugraph.io-blue)](https://md2docx.trugraph.io) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Features

- **Perfect formatting** — Preserves headings, tables, lists, bold, italic, and code blocks in Word
- **Privacy-first** — Works completely offline; your documents never leave your device
- **11 languages** — Arabic, Chinese, English, Farsi, French, German, Hindi, Portuguese, Russian, Spanish, Urdu
- **Dark mode** — Easy on the eyes in low-light environments
- **Drag & drop** — Upload Markdown files or paste directly into the editor
- **Live preview** — See your formatted document as you type
- **Example templates** — Get started with Headings, Tables, Lists, Code blocks, and more
- **Keyboard shortcuts** — Power-user friendly (e.g. Ctrl+S to download, ? for help)

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

---

## Usage

1. **Upload** a `.md` or `.txt` file, or **paste** Markdown into the editor
2. **Preview** the formatted output in real time
3. **Download** your document as DOCX with one click

---

## Tech Stack

Next.js 15 · React 19 · Monaco Editor · [marked](https://marked.js.org/) · [docx](https://docx.js.org/) · Tailwind CSS

---

## Development

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

---

## Contributing

- **Bug reports:** [Report a bug](mailto:admin@trugraph.io?subject=Bug%20Report%20-%20MD%20to%20DOCX%20Converter)
- **Feature requests:** [Request a feature](mailto:admin@trugraph.io?subject=Feature%20Request%20-%20MD%20to%20DOCX%20Converter)

---

## License

MIT © [Trugraph](https://trugraph.io)
