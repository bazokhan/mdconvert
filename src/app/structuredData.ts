import { SITE_DOMAIN } from "./utils/contact";

const baseUrl = `https://${SITE_DOMAIN}`;

export const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "md2docx",
  description:
    "md2docx converts Markdown to Word (DOCX) in your browser. Headings, tables, lists, and code blocks map to Word styles. Client-side only—your files never leave your device. No signup, unlimited conversions.",
  url: baseUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Markdown to DOCX conversion",
    "Headings H1–H6, tables, ordered and unordered lists",
    "Blockquotes and code blocks to Word",
    "Client-side conversion—no server uploads",
    "Works offline after page load",
    "Drag-and-drop .md file support",
    "Live preview with Word-style output",
    "Dark and light themes",
    "Built-in Markdown examples and templates",
    "Keyboard shortcuts",
    "11 languages",
  ],
  author: {
    "@type": "Organization",
    name: "Trugraph",
    url: "https://trugraph.io",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an account to use the Markdown to Word converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Open md2docx, paste or upload your Markdown, and download the DOCX. No signup or account required.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Markdown to DOCX converter work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After the page loads, conversion runs entirely in your browser. No internet connection is needed.",
      },
    },
    {
      "@type": "Question",
      name: "What Markdown formatting converts to Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "md2docx preserves headings (H1–H6), bold and italic text, tables, ordered and unordered lists, blockquotes, and inline code blocks. All map to standard Word styles.",
      },
    },
    {
      "@type": "Question",
      name: "Is md2docx free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. No trials, no usage limits, no paywalls. Free for personal and commercial use.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files uploaded when converting Markdown to Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. md2docx runs entirely in your browser. Your Markdown never leaves your device—conversion is client-side only.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert Markdown tables to Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Markdown tables convert to Word tables with proper borders and cell formatting. Column alignment (left, center, right) is preserved.",
      },
    },
  ],
};
