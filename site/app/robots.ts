import type { MetadataRoute } from "next";
import { meta, ehProposta } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // Enquanto for proposta (spec), o site não pode ser indexado: ele leva o nome,
  // o logo e o telefone de um negócio real que ainda não contratou. Indexado, ele
  // competiria com a própria clínica na busca. Só libera quando ela aprovar.
  if (ehProposta) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${meta.url}/sitemap.xml`,
  };
}
