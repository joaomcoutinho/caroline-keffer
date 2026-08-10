import type { MetadataRoute } from "next";

/* Com `output: export` não há servidor para gerar isto sob demanda:
   precisa ser assado no build. */
export const dynamic = "force-static";
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
