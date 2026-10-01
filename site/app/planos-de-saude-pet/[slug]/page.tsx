import { notFound } from "next/navigation";
import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { planosFilhos } from "@/content/paginas";

type Slug = keyof typeof planosFilhos;

/* Export estático (GitHub Pages): só existem as rotas dos cinco planos, geradas no build. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(planosFilhos).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/planos-de-saude-pet/[slug]">) {
  const { slug } = await params;
  const pagina = planosFilhos[slug as Slug];
  return pagina ? metadadosDe(pagina) : {};
}

export default async function PaginaPlano({ params }: PageProps<"/planos-de-saude-pet/[slug]">) {
  const { slug } = await params;
  const pagina = planosFilhos[slug as Slug];
  if (!pagina) notFound();
  return <PaginaSeo pagina={pagina} />;
}
