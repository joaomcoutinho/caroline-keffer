import { notFound } from "next/navigation";
import { PaginaSeo } from "@/components/paginas/PaginaSeo";
import { metadadosDe } from "@/components/paginas/metadados";
import { especialidadesFilhas } from "@/content/paginas";

type Slug = keyof typeof especialidadesFilhas;

/* Export estático (GitHub Pages): só existem as cinco rotas geradas no build. */
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(especialidadesFilhas).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/especialidades/[slug]">) {
  const { slug } = await params;
  const pagina = especialidadesFilhas[slug as Slug];
  return pagina ? metadadosDe(pagina) : {};
}

export default async function PaginaEspecialidade({ params }: PageProps<"/especialidades/[slug]">) {
  const { slug } = await params;
  const pagina = especialidadesFilhas[slug as Slug];
  if (!pagina) notFound();
  return <PaginaSeo pagina={pagina} />;
}
