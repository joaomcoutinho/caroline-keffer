import type { Metadata } from "next";
import { PaginaDocumento } from "@/components/paginas/PaginaDocumento";
import { termos } from "@/content/documentos";
import { meta, ogImagem } from "@/content/site";

export const metadata: Metadata = {
  title: termos.seo.titulo,
  description: termos.seo.descricao,
  alternates: { canonical: `${termos.caminho}/` },
  openGraph: {
    title: termos.seo.titulo,
    description: termos.seo.descricao,
    url: `${meta.url}${termos.caminho}/`,
    siteName: "Clínica Pet Caroline Keffer",
    locale: "pt_BR",
    type: "website",
    images: [ogImagem],
  },
};

export default function PaginaTermos() {
  return <PaginaDocumento doc={termos} />;
}
