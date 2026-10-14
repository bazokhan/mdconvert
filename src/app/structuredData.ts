import { SITE_DOMAIN, BRAND_NAME, TRUGRAPH_URL } from "./utils/contact";

const baseUrl = `https://${SITE_DOMAIN}`;

export const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${baseUrl}/#webapp`,
  name: BRAND_NAME,
  alternateName: "Markdown Converter",
  description:
    `${BRAND_NAME} converts Markdown to Word (DOCX), PDF, HTML, TXT and the clipboard in your browser. Headings, tables, lists and code blocks map to the target format. 100% client-side — your files never leave your device. No signup, unlimited conversions.`,
  url: baseUrl,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Markdown to DOCX (Word) conversion",
    "Markdown to PDF via browser print",
    "Markdown to standalone HTML",
    "Markdown to plain text TXT",
    "Markdown to rich-text clipboard (paste into Gmail, Docs, etc.)",
    "Markdown lint report",
    "Headings H1–H6, tables, ordered and unordered lists",
    "Blockquotes, fenced and inline code to Word",
    "Client-side conversion — no server uploads",
    "Works offline after page load (PWA)",
    "Drag-and-drop .md files anywhere on the page",
    "Live preview",
    "Dark and light themes",
    "11 languages: Arabic, Chinese, English, Farsi, French, German, Hindi, Portuguese, Russian, Spanish, Urdu",
    "Keyboard shortcuts",
    "Installable as a PWA",
  ],
  softwareHelp: `${baseUrl}/#faq`,
  author: {
    "@type": "Organization",
    name: "Trugraph",
    url: TRUGRAPH_URL,
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${TRUGRAPH_URL}#organization`,
  name: "Trugraph",
  url: TRUGRAPH_URL,
  logo: `${TRUGRAPH_URL}/logo.png`,
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an account to use the Markdown Converter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Open the site, paste or upload your Markdown, and download. No signup or account required.",
      },
    },
    {
      "@type": "Question",
      name: "Does the Markdown Converter work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After the page loads, conversion runs entirely in your browser. You can install it as a PWA and use it offline.",
      },
    },
    {
      "@type": "Question",
      name: "Which formats can I export Markdown to?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DOCX (Word), PDF (via browser print), standalone HTML, plain TXT, and the clipboard for rich-text pasting into Gmail, Google Docs, Slack, Notion, etc. There is also a built-in Markdown lint report.",
      },
    },
    {
      "@type": "Question",
      name: "What Markdown formatting is preserved in Word?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Headings (H1–H6), bold and italic, tables with column alignment, ordered and unordered lists, nested lists, blockquotes, inline code and fenced code blocks all map to standard Word styles.",
      },
    },
    {
      "@type": "Question",
      name: "Is Markdown Converter free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. No trials, no usage limits, no paywalls. Free for personal and commercial use.",
      },
    },
    {
      "@type": "Question",
      name: "Are my files uploaded when converting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Everything runs in your browser. Your Markdown never leaves your device — conversion is client-side only.",
      },
    },
    {
      "@type": "Question",
      name: "Can I install Markdown Converter as an app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It's an installable PWA. In Chrome, Edge, or Safari, use 'Install app' from the address bar or browser menu. Once installed, it launches in its own window and works offline.",
      },
    },
    {
      "@type": "Question",
      name: "Does Markdown Converter support languages other than English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The interface is fully translated into 11 languages: English, Arabic, Chinese, Farsi, French, German, Hindi, Portuguese, Russian, Spanish, and Urdu. RTL languages are supported.",
      },
    },
  ],
};