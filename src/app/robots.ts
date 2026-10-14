import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "./utils/contact";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${SITE_DOMAIN}`;
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}