import { notFound } from "next/navigation";
import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { bairros } from "@/content/paginas";

type Slug = keyof typeof bairros;

/* Export estático (GitHub Pages): só existem as rotas dos seis bairros, geradas no build. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(bairros).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/como-chegar/[slug]">) {
  const { slug } = await params;
  const pagina = bairros[slug as Slug];
  return pagina ? metadadosDe(pagina) : {};
}

export default async function PaginaBairro({ params }: PageProps<"/como-chegar/[slug]">) {
  const { slug } = await params;
  const pagina = bairros[slug as Slug];
  if (!pagina) notFound();
  return <PaginaSeo pagina={pagina} />;
}
