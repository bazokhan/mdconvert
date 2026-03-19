import { SITE_DOMAIN } from "./utils/contact";

const baseUrl = `https://${SITE_DOMAIN}`;

export const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "md2docx",
  description:
    "Convert Markdown to Word documents in one click. Paste, upload, or drop your .md file. No accounts, no cloud—everything runs in your browser.",
  url: baseUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Convert Markdown to DOCX",
    "Preserve headings, tables, lists, formatting",
    "Works offline in browser",
    "No registration required",
    "Free with no limits",
    "Dark mode",
    "Live preview",
    "Drag and drop",
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
      name: "Do I need an account to use md2docx?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Open the site, paste or upload your Markdown, and download. No signup required.",
      },
    },
    {
      "@type": "Question",
      name: "Does md2docx work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Once the page is loaded, conversion runs entirely in your browser. No internet needed after that.",
      },
    },
    {
      "@type": "Question",
      name: "What formatting is preserved when converting to Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Headings (H1–H6), bold and italic, tables, ordered and unordered lists, blockquotes, and inline code.",
      },
    },
    {
      "@type": "Question",
      name: "Is md2docx free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. No trials, no limits. Use it as much as you want.",
      },
    },
  ],
};
