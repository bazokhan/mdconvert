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
    default: "md2docx - Markdown to Word in one click",
    template: "%s | md2docx",
  },
  description:
    "Paste, upload, or drop your .md file. Get a Word document. No accounts, no uploads to our servers—everything runs in your browser. Free, fast, privacy-first.",
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
    "markdown editor",
    "md editor",
    "offline markdown converter",
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
    title: "md2docx - Markdown to Word in one click",
    description:
      "Paste, upload, or drop your .md file. Get a Word document. No accounts, no cloud. Everything runs in your browser.",
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
    title: "md2docx - Markdown to Word in one click",
    description:
      "Paste, upload, or drop your .md file. Get a Word document. No accounts, no cloud. Everything runs in your browser.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@trugraph",
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
};
