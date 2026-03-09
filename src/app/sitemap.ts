import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export const dynamic = "force-static";

const SITE_ROUTES = [
  "/",
  "/how-it-works/",
  "/our-philosophy/",
  "/team/",
  "/industries/",
  "/industries/agencies/",
  "/industries/biotech/",
  "/industries/logistics/",
  "/services/outbound-engine/",
  "/services/automation/",
  "/services/revops/",
  "/contact/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITE_ROUTES.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
