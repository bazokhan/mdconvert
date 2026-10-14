import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "./utils/contact";
import { languageConfig } from "./i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${SITE_DOMAIN}`;
  const now = new Date();
  return Object.keys(languageConfig).map((code) => ({
    url: `${baseUrl}/?lang=${code}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: code === "en" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        Object.keys(languageConfig).map((c) => [c, `${baseUrl}/?lang=${c}`])
      ),
    },
  }));
}