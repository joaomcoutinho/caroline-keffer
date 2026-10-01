import type { Metadata } from "next";
import { PaginaDocumento } from "@/components/paginas/PaginaDocumento";
import { politica } from "@/content/documentos";
import { meta } from "@/content/site";

export const metadata: Metadata = {
  title: politica.seo.titulo,
  description: politica.seo.descricao,
  alternates: { canonical: `${politica.caminho}/` },
  openGraph: {
    title: politica.seo.titulo,
    description: politica.seo.descricao,
    url: `${meta.url}${politica.caminho}/`,
    siteName: "Clínica Pet Caroline Keffer",
    locale: "pt_BR",
    type: "website",
    images: [{ url: `${meta.url}/og.jpg`, width: 1200, height: 630 }],
  },
};

export default function PaginaPrivacidade() {
  return <PaginaDocumento doc={politica} />;
}
