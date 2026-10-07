import type { MetadataRoute } from "next";

/* Com `output: export` não há servidor para gerar isto sob demanda:
   precisa ser assado no build. */
export const dynamic = "force-static";
import { meta, ehProposta } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // A prévia (github.io) não é indexada: competiria na busca com o domínio da
  // clínica. A indexação liga sozinha quando o workflow publica no domínio
  // próprio (variável SITE_DOMINIO; ver .github/workflows/deploy.yml).
  if (ehProposta) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${meta.url}/sitemap.xml`,
  };
}
