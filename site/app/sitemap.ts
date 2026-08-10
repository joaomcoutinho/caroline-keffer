import type { MetadataRoute } from "next";
import { meta } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: meta.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
