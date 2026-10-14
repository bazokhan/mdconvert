import type { Metadata, Viewport } from "next";
import { SITE_DOMAIN, BRAND_NAME } from "./contact";

const baseUrl = `https://${SITE_DOMAIN}`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${BRAND_NAME} – Convert Markdown to Word, PDF, HTML, TXT & more`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Convert Markdown to Word, PDF, HTML, TXT and clipboard. Headings, tables, lists and code blocks stay intact. 100% client-side, private, instant. No signup, no limits, installable as a PWA.",
  keywords: [
    "markdown converter",
    "markdown to word",
    "markdown to pdf",
    "markdown to html",
    "markdown to txt",
    "md to docx",
    "md to pdf",
    "online markdown editor",
    "markdown to docx converter",
    "markdown to word converter",
    "convert markdown",
    "free markdown converter",
    "privacy markdown converter",
    "offline markdown converter",
    "client-side markdown converter",
    "browser markdown converter",
    "pwa markdown editor",
    "installable markdown converter",
    "markdown to microsoft word",
    "markdown table to word",
    "markdown headings to word",
    "markdown lint",
    "markdown validator",
  ],
  authors: [{ name: "Trugraph", url: "https://trugraph.io" }],
  creator: "Trugraph",
  publisher: "Trugraph",
  applicationName: BRAND_NAME,
  appleWebApp: {
    capable: true,
    title: BRAND_NAME,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} – Markdown to Word, PDF, HTML, TXT`,
    description:
      "Convert Markdown to Word, PDF, HTML or TXT in your browser. Headings, tables, lists and code blocks stay intact. Nothing uploads. Free, offline-capable PWA.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} – markdown to Word, PDF, HTML, TXT`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} – Markdown to Word, PDF, HTML, TXT`,
    description:
      "Browser-only Markdown converter. DOCX, PDF, HTML, TXT + clipboard. Private, free, installable PWA.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@trugraph",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/icon-192.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
};