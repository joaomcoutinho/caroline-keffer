import type { MetadataRoute } from "next";

/* Com `output: export` não há servidor para gerar isto sob demanda:
   precisa ser assado no build. */
export const dynamic = "force-static";
import { meta } from "@/content/site";
import { paginas } from "@/content/paginas";
import { politica, termos } from "@/content/documentos";

export default function sitemap(): MetadataRoute.Sitemap {
  /* `lastmod` é a data da última revisão do conteúdo, inclusive na home, e
     nunca a do build: data que muda a cada deploy sem o conteúdo mudar ensina
     o Google a ignorar o sitemap inteiro. `changefreq` e `priority` ficaram de
     fora porque o Google os ignora (checklist-final, bloco 2). */
  const internas = Object.values(paginas).map((p) => ({
    url: `${meta.url}${p.caminho}/`,
    lastModified: new Date(p.revisao.data),
  }));

  return [
    { url: `${meta.url}/`, lastModified: new Date(meta.revisao) },
    ...internas,
    ...[politica, termos].map((d) => ({
      url: `${meta.url}${d.caminho}/`,
      lastModified: new Date(d.atualizadaEm),
    })),
  ];
}
