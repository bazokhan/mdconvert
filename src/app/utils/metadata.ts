import { Metadata } from "next";
import { SITE_DOMAIN } from './contact';

export const siteMetadata: Metadata = {
  title:
    "MD to DOCX Converter - Free Online Markdown to Word Document Converter",
  description:
    "Free online Markdown to DOCX converter. Convert MD files to Word documents instantly. Preserves formatting, headings, tables, and lists. No signup required, works offline, and free forever.",
  keywords: [
    "markdown to word",
    "md to docx",
    "markdown converter",
    "docx converter",
    "markdown to microsoft word",
    "online markdown converter",
    "free markdown converter",
    "markdown to doc",
    "convert markdown to word",
    "markdown editor",
    "table converter",
    "offline markdown converter",
    "preserve formatting",
    "heading styles",
    "markdown table to word",
  ].join(", "),
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${SITE_DOMAIN}`,
    siteName: "MD to DOCX Converter",
    title: "Convert Markdown to Word Documents Online - Free & Easy",
    description:
      "Free online Markdown to DOCX converter. Preserve all formatting, including tables, headings, and lists. No account needed, works offline, unlimited conversions.",
    images: [
      {
        url: `https://${SITE_DOMAIN}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "MD to DOCX Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Markdown to Word Documents - Free Online Tool",
    description:
      "Transform Markdown files to perfectly formatted Word documents. Preserve all styling, tables, and lists. No registration required.",
    images: ["https://your-domain.com/twitter-image.png"],
    creator: "@yourhandle",
  },
};
