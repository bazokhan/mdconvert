import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteMetadata } from "./utils/metadata";
import { LanguageProvider } from "./contexts/LanguageContext";
import { headers } from "next/headers";
import { Language } from "./utils/getTranslations";
import "./globals.css";
import { languageConfig } from "./i18n/config";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie") || "";
  const lang = (cookies.match(/NEXT_LOCALE=([^;]+)/)?.[1] || "en") as Language;
  const dir = languageConfig[lang].dir;
  return (
    <html lang={lang} dir={dir}>
      <head>
        {/* Structured Data for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "MD to DOCX Converter",
              applicationCategory: "DocumentConverter",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Convert Markdown to DOCX",
                "Preserve all formatting",
                "Support for tables and lists",
                "Works offline",
                "No registration required",
                "Free to use",
                "Dark mode support",
                "Instant preview",
                "File drag and drop",
                "Example templates",
              ],
            }),
          }}
        />
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          data-domains="md2docx.trugraph.io"
          src="https://analytics.umami.is/script.js"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
