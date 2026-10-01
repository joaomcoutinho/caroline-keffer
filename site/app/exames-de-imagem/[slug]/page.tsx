import { notFound } from "next/navigation";
import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { examesFilhos } from "@/content/paginas";

type Slug = keyof typeof examesFilhos;

/* Export estático (GitHub Pages): só existem as rotas dos três exames, geradas no build. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(examesFilhos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/exames-de-imagem/[slug]">) {
  const { slug } = await params;
  const pagina = examesFilhos[slug as Slug];
  return pagina ? metadadosDe(pagina) : {};
}

export default async function PaginaExame({ params }: PageProps<"/exames-de-imagem/[slug]">) {
  const { slug } = await params;
  const pagina = examesFilhos[slug as Slug];
  if (!pagina) notFound();
  return <PaginaSeo pagina={pagina} />;
}
