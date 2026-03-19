import type { Metadata, Viewport } from "next";
import { SITE_DOMAIN } from "./contact";

const baseUrl = `https://${SITE_DOMAIN}`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f18" },
  ],
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "md2docx - Free Online Markdown to Word Document Converter",
    template: "%s | md2docx",
  },
  description:
    "Free online Markdown to DOCX converter. Convert MD files to Word documents instantly. Preserves formatting, headings, tables, and lists. No signup required, works offline, and free forever.",
  keywords: [
    "markdown to word",
    "md to docx",
    "markdown to docx converter",
    "markdown converter",
    "docx converter",
    "markdown to microsoft word",
    "online markdown converter",
    "free markdown converter",
    "convert markdown to word",
    "markdown to doc",
    "markdown editor",
    "md editor",
    "table converter",
    "offline markdown converter",
    "preserve formatting",
    "heading styles",
    "markdown table to word",
    "browser markdown converter",
    "privacy markdown converter",
  ],
  authors: [{ name: "Trugraph", url: "https://trugraph.io" }],
  creator: "Trugraph",
  publisher: "Trugraph",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "md2docx",
    title: "md2docx - Convert Markdown to Word Documents Online - Free & Easy",
    description:
      "Free online Markdown to DOCX converter. Preserve all formatting, including tables, headings, and lists. No account needed, works offline, unlimited conversions.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "md2docx - Markdown to Word converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "md2docx - Convert Markdown to Word Documents - Free Online Tool",
    description:
      "Transform Markdown files to perfectly formatted Word documents. Preserve all styling, tables, and lists. No registration required.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@trugraph",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
};
