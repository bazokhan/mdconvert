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
    default: "md2docx – Markdown to Word | Free, private, instant conversion",
    template: "%s | md2docx",
  },
  description:
    "Turn Markdown into Word docs in seconds. Headings, tables, lists, and code blocks convert cleanly. Client-side only—your files never leave your device. No signup, no limits.",
  keywords: [
    "markdown to word",
    "md to docx",
    "markdown to docx converter",
    "markdown to word converter",
    "convert markdown to word",
    "markdown converter online",
    "free markdown to docx",
    "markdown to microsoft word",
    "md to word",
    "markdown table to word",
    "markdown headings to word",
    "client-side markdown converter",
    "offline markdown converter",
    "privacy markdown converter",
    "browser markdown to docx",
    "markdown editor with word export",
    "md file to docx",
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
    title: "md2docx – Markdown to Word in seconds | No signup, your files stay private",
    description:
      "Convert MD to DOCX in your browser. Headings, tables, lists, and code convert to Word styles. Client-side only—nothing uploads. Free and unlimited.",
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
    title: "md2docx – Turn Markdown into Word docs. Free, private, no signup.",
    description:
      "Headings, tables, lists, code blocks—all convert to Word. Runs in your browser. Your files never leave your device.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@trugraph",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
};
