import type { Metadata } from "next";
import { meta, ogImagem } from "@/content/site";
import type { Pagina } from "@/content/paginas";

/**
 * Metadados de página interna: título e descrição próprios, canônica própria
 * (com a barra final, igual ao `trailingSlash` do next.config) e card de
 * compartilhamento com o título da página, não o da home.
 *
 * `robots` não é declarado aqui de propósito: herda do layout, que bloqueia a
 * indexação enquanto o site for proposta (`ehProposta`).
 */
export function metadadosDe(pagina: Pagina): Metadata {
  const url = `${meta.url}${pagina.caminho}/`;
  const imagem = ogImagem;

  return {
    title: pagina.seo.titulo,
    description: pagina.seo.descricao,
    alternates: { canonical: `${pagina.caminho}/` },
    openGraph: {
      title: pagina.seo.titulo,
      description: pagina.seo.descricao,
      url,
      siteName: "Clínica Pet Caroline Keffer",
      locale: "pt_BR",
      type: "website",
      images: [imagem],
    },
    twitter: {
      card: "summary_large_image",
      title: pagina.seo.titulo,
      description: pagina.seo.descricao,
      images: [imagem.url],
    },
  };
}
