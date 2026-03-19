import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { siteMetadata, viewport as viewportConfig } from "./utils/metadata";
import { LanguageProvider } from "./contexts/LanguageContext";
import { webAppSchema, faqSchema } from "./structuredData";
import { headers } from "next/headers";
import { Language } from "./utils/getTranslations";
import "./globals.css";
import { languageConfig } from "./i18n/config";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = viewportConfig;

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
        {/* Structured Data: WebApplication + FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
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
        className={`${dmSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased font-sans text-foreground`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
