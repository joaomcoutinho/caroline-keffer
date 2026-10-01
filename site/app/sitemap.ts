import type { MetadataRoute } from "next";

/* Com `output: export` não há servidor para gerar isto sob demanda:
   precisa ser assado no build. */
export const dynamic = "force-static";
import { meta } from "@/content/site";
import { paginas } from "@/content/paginas";
import { politica, termos } from "@/content/documentos";

export default function sitemap(): MetadataRoute.Sitemap {
  /* A data das páginas internas é a da última revisão do conteúdo, e não a do
     build: `lastmod` que muda a cada deploy sem o conteúdo mudar ensina o
     Google a ignorar o campo. */
  const internas = Object.values(paginas).map((p) => ({
    url: `${meta.url}${p.caminho}/`,
    lastModified: new Date(p.revisao.data),
    changeFrequency: "monthly" as const,
    priority: p.pais ? 0.6 : 0.8,
  }));

  return [
    {
      url: `${meta.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...internas,
    ...[politica, termos].map((d) => ({
      url: `${meta.url}${d.caminho}/`,
      lastModified: new Date(d.atualizadaEm),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
