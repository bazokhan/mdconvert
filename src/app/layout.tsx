import type { Metadata, Viewport } from "next";
import {
  Inter_Tight,
  Fraunces,
  JetBrains_Mono,
  Readex_Pro,
  Noto_Sans_SC,
  Noto_Sans_Devanagari,
} from "next/font/google";
import { siteMetadata, viewport as viewportConfig } from "./utils/metadata";
import { LanguageProvider } from "./contexts/LanguageContext";
import { webAppSchema, faqSchema, organizationSchema } from "./structuredData";
import { headers } from "next/headers";
import { Language } from "./utils/getTranslations";
import { languageConfig } from "./i18n/config";
import { SITE_DOMAIN } from "./utils/contact";
import "./globals.css";

const inter = Inter_Tight({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Modern variable font for Arabic, Farsi, Urdu. Latin subset keeps editorial
// Latin (titles, digits) visually consistent with the Arabic glyphs.
const readexPro = Readex_Pro({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-cjk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
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
  const baseUrl = `https://${SITE_DOMAIN}`;

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${readexPro.variable} ${notoSC.variable} ${notoDevanagari.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        {Object.entries(languageConfig).map(([code, cfg]) => (
          <link
            key={code}
            rel="alternate"
            hrefLang={cfg.code}
            href={`${baseUrl}/?lang=${code}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            data-domains={SITE_DOMAIN}
            src="https://analytics.umami.is/script.js"
          />
        ) : null}
        <script
          defer
          src="https://analytics.trugraph.io/script.js"
          data-website-id="e14d0f30-71e6-4d1b-8e71-9916e8167640"
        />
      </head>
      <body className="antialiased font-sans text-foreground">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
